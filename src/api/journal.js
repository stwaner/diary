import { request } from '@/utils/request'

const journalApi = {
  list: '/api/diary/list', // 列表
  journalDetail: '/api/diary/detail', // 学习详情
  saveJournal: '/api/diary/save'
}

export function findJournalList (params) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: journalApi.list,
    method: 'post',
    params: params
  })
}

export function journalDetail (data) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: journalApi.journalDetail,
    method: 'post',
    params: data
  })
}

export function saveJournal (data) {
  return request({
    xhrFields: { withCredentials: true },
    crossDomain: true,
    url: journalApi.saveJournal,
    method: 'post',
    params: data
  })
}
