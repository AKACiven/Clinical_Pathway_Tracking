import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/home/list',
    method: 'get',
    params
  })
}
