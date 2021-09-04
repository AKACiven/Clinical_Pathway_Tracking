import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/record/all',
    method: 'get',
    params
  })
}

export function getDepList(token) {
  return request({
    url: '/record/dep',
    method: 'get',
    params: { token }
  })
}

export function getpatList(token) {
  return request({
    url: '/record/pat',
    method: 'get',
    params: { token }
  })
}

export function recordel(data) {
  return request({
    url: '/record/delete',
    method: 'post',
    data
  })
}

export function getuserinfo(data) {
  return request({
    url: '/table/userinfo',
    method: 'post',
    data
  })
}
