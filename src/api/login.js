import { request } from '@/utils/request'

const userApi = {
  login: '/api/user/login', // 登录
  getCode: '/api/user/reg/get/code', // 注册获取验证码
  register: '/api/user/reg', // 注册
  logout: '/api/user/logout', // 登出
  getInfo: '/api/user/info' // 获取用户信息
}

export function login (params) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: userApi.login,
    method: 'get',
    params: params
  })
}

export function register (params) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: userApi.register,
    method: 'get',
    params: params
  })
}

export function getCode (params) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: userApi.getCode,
    method: 'get',
    params: params
  })
}

export function logout () {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: userApi.logout,
    method: 'get'
  })
}

export function getInfo () {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: userApi.getInfo,
    method: 'get'
  })
}
