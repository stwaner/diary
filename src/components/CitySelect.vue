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
import { listConvertTree } from '@/utils/formatter'

export default {
  data () {
    return {
      provinceList: JSON.parse(localStorage.getItem('provinceList')) || [],
      cityList: JSON.parse(localStorage.getItem('cityList')) || [],
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
  mounted () {
    this.option = listConvertTree(this.provinceList, this.cityList)
    // console.log(this.option)
  },
  props: {
    addressCode: {
      type: Array
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('hasChange', value)
    }
  }
}
</script>

<style>

</style>