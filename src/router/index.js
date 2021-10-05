import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [

  {
    path: '/Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/Register',
    component: () => import('@/views/login/register'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  {
    path: '/',
    component: Layout,
    redirect: '/Home',
    meta: {
      title: '主页',
      icon: 'form'
    },
    children: [
      {
        path: 'Home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '患者列表', icon: 'el-icon-s-home' }
      },
      {
        path: 'AddPatient',
        name: 'AddPatient',
        hidden: true,
        component: () => import('@/views/home/addpatient'),
        meta: { title: '添加患者', icon: 'el-icon-s-home' }
      }
    ]
  },

  {
    path: '/Path',
    component: Layout,
    redirect: '/Home',
    meta: {
      title: '路径管理',
      icon: 'form'
    },
    children: [
      {
        path: 'Overall',
        name: 'Overall',
        component: () => import('@/views/cpath/overall'),
        meta: { title: '路径总览', icon: 'el-icon-s-order' }
      },
      {
        path: 'Scan0',
        name: 'Scan0',
        hidden: true,
        component: () => import('@/views/cpath/scan0'),
        meta: { title: '第1阶段', icon: 'el-icon-s-ticket' }
      },
      {
        path: 'Scan1',
        name: 'Scan1',
        hidden: true,
        component: () => import('@/views/cpath/scan1'),
        meta: { title: '第2阶段', icon: 'el-icon-s-ticket' }
      },
      {
        path: 'Scan2',
        name: 'Scan2',
        hidden: true,
        component: () => import('@/views/cpath/scan2'),
        meta: { title: '第3阶段', icon: 'el-icon-s-ticket' }
      },
      {
        path: 'Scan3',
        name: 'Scan3',
        hidden: true,
        component: () => import('@/views/cpath/scan3'),
        meta: { title: '第4阶段', icon: 'el-icon-s-ticket' }
      }
    ]
  },

  {
    path: '/Evaluate',
    name: 'Evaluate',
    component: Layout,
    redirect: '/Home',
    hidden: true,
    meta: { title: '评估', icon: 'el-icon-s-home' },
    children: [
      {
        path: 'Index',
        name: 'Index',
        component: () => import('@/views/evaluate/index'),
        meta: { title: 'test', icon: 'el-icon-s-home' }
      },
      {
        path: 'Ground',
        name: 'Ground',
        hidden: true,
        component: () => import('@/views/evaluate/ground'),
        meta: { title: '变异原因', icon: 'el-icon-s-ticket' }
      }
    ]
  },

  {
    path: '/test',
    name: 'Test',
    component: Layout,
    // hidden: true,
    meta: { title: 'Test', icon: 'el-icon-s-home' },
    children: [
      {
        path: 'time',
        name: 'time',
        component: () => import('@/views/test/time'),
        meta: { title: 'test', icon: 'el-icon-s-home' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
