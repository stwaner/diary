import { request } from '@/utils/request'

const userApi = {
  login: '/user/login', // 登录
  register: '/user/reg', // 注册
  findAll: '/api/user/findAll' // 测试接口
}

export function login () {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: userApi.login,
    method: 'get'
  })
}

export function findAll () {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: userApi.findAll,
    method: 'get'
  })
}


