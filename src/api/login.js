import { request } from '@/utils/request'

const userApi = {
  login: '/api/user/login', // 登录
  register: '/api/user/reg', // 注册
  findAll: '/api/user/findAll' // 测试接口
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

export function findAll () {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: userApi.findAll,
    method: 'get'
  })
}


