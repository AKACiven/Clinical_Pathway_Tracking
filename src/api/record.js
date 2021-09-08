import request from '@/utils/request'

export function pathSubmit(data) {
  return request({
    url: '/path/submit',
    method: 'post',
    data
  })
}

export function addtoPath(data) {
  return request({
    url: '/home/addtopath',
    method: 'post',
    data
  })
}
