<template>
  <el-cascader
    :options="option"
    style="width: 100%;"
    clearable
    filterable
    v-model="defaultValue"
    @change="handleChange">
  </el-cascader>
</template>

<script>
import { getProvinceList, getCityList } from '@/api/public'
import { listConvertTree } from '@/utils/formatter'

export default {
  data () {
    return {
      provinceList: [],
      cityList: [],
      option: null,
      getDone: false,
      defaultValue: []
    }
  },
  watch: {
    addressCode() {
      this.defaultValue = this.addressCode ? this.addressCode : []
    }
  },
  created () {
    this.getProvince(this.getCity)
  },
  props: {
    addressCode: {
      type: Array
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('hasChange', value)
    },
    async getProvince (callback) {
      const res = await getProvinceList()
      this.provinceList = res.data
      callback && callback() // 获取省后再获取城市
    },
    async getCity () {
      const res = await getCityList()
      this.cityList = res.data
      this.getDone = true
      if (this.getDone) {
        this.option = listConvertTree(this.provinceList, this.cityList)
        console.log(this.option)
      }
    }
  }
}
</script>

<style>

</style>