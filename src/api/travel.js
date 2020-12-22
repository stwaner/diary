import { request } from '@/utils/request'

const travelApi = {
  travelList: '/api/travel/list', // 游记列表
  saveTravel: '/api/travel/save', // 保存游记
  traveDetail: '/api/travel/detail' // 游记详情
}

export function Traveling (params) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: travelApi.travelList,
    method: 'get',
    params: params
  })
}

export function saveTravel (params) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: travelApi.saveTravel,
    method: 'get',
    params: params
  })
}

export function traveDetail (params) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: travelApi.traveDetail,
    method: 'get',
    params: params
  })
}
