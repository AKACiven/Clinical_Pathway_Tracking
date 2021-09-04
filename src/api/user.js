import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function adminmod(data) {
  return request({
    url: '/user/adminmod',
    method: 'post',
    data
  })
}

export function adminadd(data) {
  return request({
    url: '/user/adminadd',
    method: 'post',
    data
  })
}

export function getUserlist(params) {
  return request({
    url: '/adminedit/userlist',
    method: 'get',
    params
  })
}

export function getUserinfo(params) {
  return request({
    url: '/adminedit/userinfo',
    method: 'get',
    params
  })
}

