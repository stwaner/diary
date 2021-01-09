import { request } from '@/utils/request'

const costApi = {
  list: '/api/cost/findMyCost', // 消费列表
  costSave: '/api/cost/save' // 消费编辑/添加
}

export function findCostList (params) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: costApi.list,
    method: 'post',
    params: params
  })
}

export function saveCost (data) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: costApi.costSave,
    method: 'post',
    params: data
  })
}

