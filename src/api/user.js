import request from './request'

/**
 * 登录接口
 * @param {*} data 登录信息
 */
export function postLogin(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = (data) => {
  return request({
    url: '/sys/profile'
  })
}
