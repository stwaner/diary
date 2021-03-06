import { request } from '@/utils/request'

const LearnApi = {
  list: '/api/learn/findLearn', // 列表
  learnDetail: '/api/learn/detail', // 学习详情
  saveLearn: '/api/learn/save'
}

export function findLearn (params) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: LearnApi.list,
    method: 'post',
    params: params
  })
}

export function learnDetail (data) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: LearnApi.learnDetail,
    method: 'post',
    params: data
  })
}

export function saveLearn (data) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: LearnApi.saveLearn,
    method: 'post',
    params: data
  })
}
