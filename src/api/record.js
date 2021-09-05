import request from '@/utils/request'

export function pathSubmit(data) {
  return request({
    url: '/path/submit',
    method: 'post',
    data
  })
}
