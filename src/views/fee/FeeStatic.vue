<template>
  <div class="cost-wrapper">
    <div class="search-wrap">
      <el-form :inline="true" class="cost-form-inline">
        <el-form-item>
          <el-select v-model="timeType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleStati">统计</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: '1',
        label: '按周统计'
      }, {
        value: '2',
        label: '按月统计'
      }, {
        value: '3',
        label: '按年统计'
      }],
      timeType: '1',
    }
  },
  methods: {
    handleStati () {
      console.log('统计')
    }
  }
}
</script>

<style>

</style>