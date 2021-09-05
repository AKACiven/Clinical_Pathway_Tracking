import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/home/list',
    method: 'get',
    params
  })
}

export function getList2(params) {
  return request({
    url: '/home/listf',
    method: 'get',
    params
  })
}

export function getPath(params) {
  return request({
    url: '/path/overall',
    method: 'get',
    params
  })
}

export function getScan(params) {
  return request({
    url: '/path/scan',
    method: 'get',
    params
  })
}
