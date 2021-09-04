import request from '@/utils/request'

export function submittee(data) {
  return request({
    url: '/recorder/docsubmit',
    method: 'post',
    data
  })
}

export function submitregi(data) {
  return request({
    url: '/registration/submit',
    method: 'post',
    data
  })
}

export function recordtail(params) {
  return request({
    url: '/recorder/detail',
    method: 'get',
    params
  })
}
