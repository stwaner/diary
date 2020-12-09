<template>
  <div class="travels-wrapper">
    <Map :markers="markers" :prompt="prompt" :promptInfo="promptInfo" @callbackComponent="callbackComponent" />
    <h2 class="travels-title">我的旅行游记</h2>
    <div class="btn-wrap">
      <el-button class="add-btn" icon="el-icon-plus" @click="handleAddCities">添加城市</el-button>
    </div>
    <div class="block">
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in activities"
          :key="index"
          :timestamp="item.timestamp"
          placement="top"
        >
          <el-card>
            <div class="travels-info">
              <img class="travel-img" src="../../assets/images/portfolio/into-the-light.jpg" alt="">
              <div class="city">
                <p class="title"><i class="el-icon-price-tag"></i> {{ item.country }}{{ item.city }}</p>
                <p class="eng">{{ item.english }}</p>
              </div>
            </div>
            <div class="manage">
              <i class="el-icon-setting"></i>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import Map from '../amap/index.vue'
import { Traveling } from '@/api/travel.js'

export default {
  data () {
    return {
      markers: [],
      prompt: [],
      promptInfo: {},
      activities: [{
        country: '湖北',
        city: '黄冈',
        english: 'HuangGang',
        timestamp: '2018-04-12 20:46'
      }, {
        country: '湖北',
        city: '黄冈',
        english: 'HuangGang',
        timestamp: '2018-04-03 20:46'
      }, {
        country: '湖北',
        city: '黄冈',
        english: 'HuangGang',
        timestamp: '2018-04-03 20:46'
      }, {
        country: '湖北',
        city: '黄冈',
        english: 'HuangGang',
        timestamp: '2018-04-03 20:46'
      }]
    }
  },
  components: { Map },
  methods: {
    handleAddCities () {
      this.$message.info('添加城市')
    },
    callbackComponent (params) {
      params.function && this[params.function](params.data)
    },
    // 地图初始化完成回调
    loadMap () {
      this.getTravel()
    },
    // 获取游记标记
    async getTravel () {
      const markers = []
      const prompt = []
      const that = this
      const res = await Traveling()
      if (res.code === 200) {
        let data = res.data
        data.forEach((ele, index) => {
          ele.position = [ele.longitude, ele.latitude],
          ele.events = {
            click: () => {
              console.log(that.prompt)
              that.prompt.forEach(item => {
                item.visible = false
              })
              that.promptInfo = that.prompt[index]
              that.$nextTick(() => {
                that.promptInfo.visible = true
              })
            }
          },
          ele.visible = true,
          ele.offset = [0, 0], // 窗体偏移
          ele.draggable = false // 不可移动
          ele.markerLabel = {content: index+1,offset: [10, 10]},
          ele.content = '<img src="'+ require('@/assets/img/icon/marker-icon.png') +'" />'
          prompt.push({
            position: [ele.longitude, ele.latitude],
            offset: [-10, -15], // 窗体偏移
            visible: false,
            content: `<div class="prompt">
                        <span class="title">${ele.travelTitle}</span>
                      </div>`
          })
        })
        this.markers = data
        this.prompt = prompt
      }
    }
  }
}
</script>

<style lang="scss">
.travels-wrapper{
  // width: 1200px;
  margin: 40px auto;
  .travels-title{
    font-size: 28px;
    color: #A1A8AF;
    font-weight: normal;
    text-align: center;
  }
  .btn-wrap{
    margin: 20px 0;
    text-align: right;
  }
  .el-timeline{
    .el-card__body{
      display: flex;
      justify-content: space-between;
      .travels-info{
        display: flex;
        align-items: center;
        flex: 3;
        .travel-img{
          width: 80px;
        }
        .city{
          margin-left: 24px;
          .title{
            font-size: 20px;
            font-family: cursive;
            margin-bottom: 8px;
          }
          .eng{
            letter-spacing: 2px;
          }
        }
      }
      .manage{
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        border-left: 1px solid #ededed;
        i{
          font-size: 38px;
          color: #8a8686;
          cursor: pointer;
          transition: all .2s ease-in-out;
          &:hover{
            color: $theme-color;
            transform: scale(1.1);
          }
        }
      }
    }
  }
}
</style>
