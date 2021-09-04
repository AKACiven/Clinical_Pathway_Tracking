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
  },

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  {
    path: '/',
    component: Layout,
    redirect: '/Welcome',
    meta: {
      title: '欢迎',
      icon: 'form'
    },
    children: [
      {
        path: 'Welcome',
        name: 'Welcome',
        component: () => import('@/views/welcome/index'),
        meta: { title: '欢迎使用系统', icon: 'el-icon-s-home' }
      }
    ]
  },

  {
    path: '/Registration',
    component: Layout,
    meta: {
      roles: ['admin', 'patient'],
      title: '挂号相关',
      icon: 'el-icon-s-ticket'
    },
    children: [
      {
        path: 'Action',
        name: 'handleRegistration',
        component: () => import('@/views/registration/action'),
        meta: { roles: ['admin', 'patient'], title: '请挂号', icon: 'el-icon-s-order' }
      },
      {
        path: 'Index',
        name: 'Registration',
        component: () => import('@/views/registration/index'),
        meta: { roles: ['admin', 'patient'], title: '查看历史挂号', icon: 'el-icon-s-management' }
      }
    ]
  },

  {
    path: '/Record',
    component: Layout,
    meta: { title: '查看记录', icon: 'el-icon-notebook-1' },
    children: [
      {
        path: 'All',
        name: 'allRecord',
        component: () => import('@/views/record/index'),
        meta: { roles: ['admin'], title: '全部记录', icon: 'el-icon-notebook-2' }
      },
      {
        path: 'Department',
        name: 'depRecord',
        component: () => import('@/views/record/department'),
        meta: { roles: ['admin', 'doctor'], title: '科室挂号单', icon: 'el-icon-notebook-2' }
      },
      {
        path: 'Patient',
        name: 'patRecord',
        component: () => import('@/views/record/patient'),
        meta: { roles: ['admin', 'patient'], title: '患者就医记录', icon: 'el-icon-notebook-2' }
      }
    ]
  },

  {
    path: '/Recorder',
    component: Layout,
    meta: { title: '记录表单', icon: 'el-icon-video-camera-solid' },
    children: [
      {
        path: 'Index',
        name: 'Recorder',
        component: () => import('@/views/recorder/index'),
        meta: { roles: ['admin', 'doctor'], title: '医生记录界面', icon: 'el-icon-video-camera' }
      },
      {
        path: 'Conrecorder',
        name: 'ConRecorder',
        component: () => import('@/views/recorder/conrecorder'),
        meta: { roles: ['admin', 'patient'], title: '患者确认界面', icon: 'el-icon-video-camera' }
      },
      {
        path: 'Recordetail',
        name: 'RecorDetail',
        component: () => import('@/views/recorder/recordetail'),
        meta: { roles: ['admin'], title: '记录修改界面', icon: 'el-icon-video-camera' }
      }
    ]
  },

  {
    path: '/Adminedit',
    component: Layout,
    meta: { roles: ['admin'], title: 'ConRecorder', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'Index',
        name: '修改用户信息',
        component: () => import('@/views/admininfoedit/index'),
        meta: { roles: ['admin'], title: '管理员修改用户信息', icon: 'el-icon-user-solid' }
      },
      {
        path: 'Userlist',
        name: '用户名单',
        component: () => import('@/views/admininfoedit/userlist'),
        meta: { roles: ['admin'], title: '用户名单', icon: 'el-icon-s-custom' }
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
