import { getProvinceList, getCityList } from '@/api/public'
import Storage from '@/utils/storage.js'

export default{
  async getProvinceCode () {
    console.log('全局获取provincecode')
    const res = await getProvinceList()
    Storage.localSet('provinceList', res.data)
  },
  async getCityCode () {
    console.log('全局获取citycode')
    const res = await getCityList()
    Storage.localSet('cityList', res.data)
  }
}