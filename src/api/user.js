import request from './request'

export function postLogin(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
