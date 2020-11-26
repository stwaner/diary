import { request } from '@/utils/request'

const eventApi = {
  list: '/api/event/eventList', // 事件列表
  eventSave: '/api/event/save', // 事件编辑/添加
  eventDel: '/api/event/delete' // 事件删除
}

export function findEventList (params) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: eventApi.list,
    method: 'post',
    params: params
  })
}

export function saveEvent (data) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: eventApi.eventSave,
    method: 'post',
    params: data
  })
}

export function delEvent (data) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: eventApi.eventDel,
    method: 'post',
    params: data
  })
}
