import { request } from '@/utils/request'

const common = {
  provinceList: '/api/select/province', // 获取省份
  cityList: '/api/select/city', // 获取城市
  upload: '/api/file/image', // 文件上传统一接口
  website: '/api/select/website' // 全站搜索
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

export function upload (params) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: common.upload,
    method: 'get',
    params: params
  })
}

export function searchWebsite (params) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: common.website,
    method: 'get',
    params: params
  })
}
