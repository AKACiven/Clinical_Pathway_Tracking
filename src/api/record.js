import request from '@/utils/request'

export function submittee(data) {
  return request({
    url: '/recorder/docsubmit',
    method: 'post',
    data
  })
}
