import { getProvinceList, getCityList } from '@/api/public'
import Storage from '@/utils/storage.js'

export default{
  async getProvinceCode () {
    const res = await getProvinceList()
    Storage.localSet('provinceList', res.data)
  },
  async getCityCode () {
    const res = await getCityList()
    Storage.localSet('cityList', res.data)
  }
}