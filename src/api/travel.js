import { request } from '@/utils/request'

const travelApi = {
  travelList: '/api/travel/list' // 登录
}

export function getTravelList (params) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: travelApi.travelList,
    method: 'get',
    params: params
  })
}
