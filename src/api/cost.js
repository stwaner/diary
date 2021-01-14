import { request } from '@/utils/request'

const costApi = {
  list: '/api/cost/findMyCost', // 消费列表
  costDetail: '/api/cost/getcost', // 消费详情
  costSave: '/api/cost/save', // 消费编辑/添加
  costStatic: '/api/cost/sumClassify4Cost' // 消费统计
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

export function getCostDetail (params) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: costApi.costDetail,
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

export function costSumClassify (data) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: costApi.costStatic,
    method: 'post',
    params: data
  })
}
