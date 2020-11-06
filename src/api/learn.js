import { request } from '@/utils/request'

const LearnApi = {
  list: '/api/learn/findLearn', // 列表
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
