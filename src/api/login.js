import { request } from '@/utils/request'

const userApi = {
  // 测试接口
  findAll: '/user/findAll'
}

export function findAll () {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: userApi.findAll,
    method: 'get'
  })
}


