<template>
  <div class="travels-wrapper">
    <h2 class="travels-title">我的旅行游记</h2>
    <a-map :markers="markers" @updateData="getTravel" />
    <div class="travel-list-wrap">
      <div class="btn-wrap">
        <el-button class="add-btn" style="width:100%" icon="el-icon-plus" @click="handleAddCities">添加城市</el-button>
      </div>
      <div class="block">
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in activities"
            :key="index"
            :timestamp="item.created"
            placement="top"
          >
            <el-card>
              <div class="travels-info">
                <img class="travel-img" :src="item.fileUrl ? item.fileUrl : defaultFileUrl" alt="">
                <div class="city">
                  <p class="title"><i class="el-icon-price-tag"></i>{{ item.provinceName }}{{ item.cityName }}</p>
                  <p class="eng">{{ item.travelTitle }}</p>
                </div>
              </div>
              <div class="manage">
                <i class="el-icon-setting" @click="handleDetail(item.travelId)"></i>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import { Traveling } from '@/api/travel.js'
import AMap from './map.vue'

export default {
  data () {
    return {
      markers: [],
      activities: [],
      defaultFileUrl: require('../../assets/images/post-image/post-image.jpg')
    }
  },
  components: { AMap },
  created () {
    this.getTravel()
  },
  methods: {
    // 游记详情
    handleDetail (id) {
      this.$router.push({ path: '/travels/detail', query: { travelId: id } })
    },
    handleAddCities () {
      this.$router.push({ path: '/travels/detail' })
    },
    // 获取游记标记
    async getTravel () {
      const res = await Traveling()
      if (res.code === 200) {
        console.log(res.data)
        this.activities = this.markers = res.data
      }
    }
  }
}
</script>

<style lang="scss">
.travels-wrapper{
  margin-right: 24px;
  .travels-title{
    font-size: 28px;
    color: #A1A8AF;
    font-weight: normal;
    text-align: center;
    margin-top: 24px;
  }
  .travel-list-wrap{
    margin-left: 1000px;
  }
  .btn-wrap{
    margin: 20px 0;
    text-align: right;
  }
  .el-timeline{
    height: 450px;
    overflow: auto;
    .el-card__body{
      display: flex;
      justify-content: space-between;
      .travels-info{
        display: flex;
        align-items: center;
        flex: 3;
        .travel-img{
          width: 80px;
          height: 80px;
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
          font-size: 28px;
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
    .el-timeline-item__wrapper{
      padding-right: 20px;
    }
  }
}
</style>
