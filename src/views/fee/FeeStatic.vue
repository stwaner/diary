<template>
  <div class="cost-wrapper">
    <div class="search-wrap">
      <el-form :inline="true" class="cost-form-inline">
        <el-popover
          placement="bottom"
          width="250"
          trigger="hover"
          content="年份选择器只针对于周统计哟~">
          <i slot="reference" class="el-icon-question"></i>
        </el-popover>
        <el-form-item>
          <el-date-picker
            v-model="thisYear"
            value-format="yyyy"
            type="year"
            placeholder="选择年份"
            @change="handleYearChange"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="timeType" placeholder="请选择" @change="handleTimeChange">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleStati">统计</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="echarts-wrap">
      <p class="text">累计消费<span class="money">{{ totalMoney }}</span>（元）</p>
      <div id="echarts"></div>
    </div>
  </div>
</template>

<script>
import { costSumClassify } from '@/api/cost'
export default {
  data () {
    return {
      myChart: null,
      typeList: [{
        value: '3',
        label: '按周统计'
      }, {
        value: '2',
        label: '按月统计'
      }, {
        value: '1',
        label: '按年统计'
      }],
      timeType: '3',
      thisYear: new Date().getFullYear().toString(),
      timeList: [],
      moneyList: [],
      totalMoney: 0,
      weekYear: new Date().getFullYear().toString() + '/01/01' // 周统计的年份格式 2020/01/01
    }
  },
  created () {
    this.getCostList()
  },
  mounted () {
    this.drawChart()
  },
  methods: {
    drawChart() {
      let _this = this
      // 基于准备好的dom，初始化echarts实例
      _this.myChart = this.$echarts.init(document.getElementById("echarts"))
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "消费统计图"
        },
        tooltip: {
          trigger: 'axis',
          // axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          //   type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          // },
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        xAxis: {
          type: 'category',
          data: [],
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: {
          axisLabel: {
            formatter: '{value} 元'
          }
        },
        series: [
          {
            name: "消费金额",
            type: "bar",
            data: []
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      _this.myChart.setOption(option)
    },
    async getCostList () {
      let data = {}
      data.timeType = this.timeType
      if (this.timeType == 3) { // 周统计需要选择年份
        data.thisYear = this.weekYear
      }
      const res = await costSumClassify(data)
      if (res.code === 200) {
        this.timeList = []
        this.moneyList = []
        const data = res.data
        if (data.length == 0) {
          this.$message.info('没有查询到该条件的统计数据，换换别的吧~')
          return
        }
        data.forEach((item, index) => {
          if (item && index!==data.length-1) {
            this.timeList.push(item.timeStr)
            this.moneyList.push(item.sumMoney)
            // 填入数据
            this.myChart.setOption({
              xAxis: {
                data: this.timeList
              },
              series: [{
                // 根据名字对应到相应的系列
                name: '消费金额',
                data: this.moneyList
              }]
            })
          }
          this.totalMoney = data[data.length - 1].sumMoney
        })
      }
    },
    handleStati () {
      this.getCostList()
    },
    handleYearChange (value) {
      this.weekYear = value + '/01/01'
    },
    handleTimeChange (value) {
      this.timeType = value
    }
  }
}
</script>

<style lang="scss">
.cost-wrapper{
  width: 1100px;
  margin: 45px auto;
  .search-wrap{
    text-align: right;
  }
  .echarts-wrap{
    margin-top: 25px;
    #echarts{
      width: 600px;
      height: 400px;
      margin: 35px auto 0;
    }
    .text{
      color: #666;
      font-size: 16px;
      line-height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .money{
      color: rgb(255, 102, 0);
      font-size: 24px;
      margin-left: 5px;
    }
  }
  .el-icon-question{
    cursor: pointer;
    margin-right: 10px;
    margin-top: 14px;
  }
}
</style>