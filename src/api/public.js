import { request } from '@/utils/request'

const common = {
  provinceList: '/api/select/province', // 获取省份
  cityList: '/api/select/city' // 获取城市
}

export function getProvinceList (params) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: common.provinceList,
    method: 'get',
    params: params
  })
}

export function getCityList (params) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: common.cityList,
    method: 'get',
    params: params
  })
}
