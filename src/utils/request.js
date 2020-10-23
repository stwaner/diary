import axios from 'axios';//引入axios
import router from '../router/index'
import { Message } from 'element-ui';
export function request(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({  //instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
      // baseURL: process.env.VUE_APP_BASE_URL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      timeout: 12 * 1000 // 12秒超时
    })
    instance(options).then(response => {
      if(response.data.code == 200){
        // if (response.headers['set-cookie']) {  //获取响应头里面的数据，**Authorization根据你响应头里面的数据获取，并不是唯一值**
        //   let cookie = response.headers['set-cookie'].split(';')[0].split('=')[1]
        //   document.cookie = `token=${cookie}`
        // }
        resolve(response.data) // 把请求到的数据发到引用请求的地方
      }
      if(response.data.code == 100){
        Message.error('登陆超时, 请重新登陆')
        setTimeout(()=>{
          router.push({
            path: '/login'
          })
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
