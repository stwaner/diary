import axios from 'axios' // 引入axios
import router from '../router/index'
import { Message } from 'element-ui'
import Storage from '@/utils/storage.js'

export function request (options) {
  return new Promise((resolve, reject) => {
    // instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
    const instance = axios.create({
      // baseURL: process.env.VUE_APP_BASE_URL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      timeout: 12 * 1000 // 12秒超时
    })
    instance(options).then(response => {
      if (response.data.code === 200) {
        resolve(response.data) // 把请求到的数据发到引用请求的地方
      }
      if (response.data.code === 100) {
        Message.error('登陆超时, 请重新登陆')
        Storage.localRemove('token') // 删除已经失效或过期的token
        setTimeout(() => {
          router.push({ path: '/login' })
        }, 2000)
      }
    }).catch(error => {
      console.log(options)
      console.log('请求异常信息：' + error)
      reject(error)
    })
    axios.defaults.withCredentials = true
  })
}
