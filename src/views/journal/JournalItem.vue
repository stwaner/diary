<template>
  <div>
    <div class="row diary-wrap">
      <div class="diary-item" v-for="item in journalList" :key="item.diaryId">
        <h3 class="title">{{ item.created }}</h3>
        <p class="icon">
          <!-- 0晴 1阴 2多云 3雪 4雨 -->
           <!-- :title="'天气 '+item.weather" -->
           <a href="javascript:" :title=" item.mood ? item.mood : '无'">
            <span class="weather-icon" v-if="item.moodType === 0"> <img src="@/assets/img/emoticon/0.png" :alt="item.mood"> </span>
            <span class="weather-icon" v-if="item.moodType === 1"> <img src="@/assets/img/emoticon/1.png" :alt="item.mood"> </span>
            <span class="weather-icon" v-if="item.moodType === 2"> <img src="@/assets/img/emoticon/2.png" :alt="item.mood"> </span>
            <span class="weather-icon" v-if="item.moodType === 3"> <img src="@/assets/img/emoticon/3.png" :alt="item.mood"> </span>
            <span class="weather-icon" v-if="item.moodType === 4"> <img src="@/assets/img/emoticon/4.png" :alt="item.mood"> </span>
          </a>
          <a href="javascript:">
            <span class="weather-icon" v-if="item.weatherType === 0" title="晴"> <i class="el-icon-sunny"></i> </span>
            <span class="weather-icon" v-if="item.weatherType === 1" title="阴"> <i class="el-icon-cloudy"></i> </span>
            <span class="weather-icon" v-if="item.weatherType === 2" title="多云"> <i class="el-icon-cloudy-and-sunny"></i> </span>
            <span class="weather-icon" v-if="item.weatherType === 3" title="雪"> <i class="el-icon-light-rain"></i> </span>
            <span class="weather-icon" v-if="item.weatherType === 4" title="雨"> <i class="el-icon-heavy-rain"></i> </span>
          </a>
        </p>
        <p class="diary-content line-clamp3" v-html="item.diaryContext"></p>
        <div class="footer">
          <p>{{item.dialyDate}} {{ item.nickName }}</p>
          <!-- <el-tag type="info" v-for="(subItem, index) in item.label" :key="index">{{ subItem.labelContext }}</el-tag> -->
          <router-link :to="{path: '/journal/update', query: { diaryId: item.diaryId }}">阅读全文</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JournalItem',
  data () {
    return {
    }
  },
  props: {
    journalList: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
.diary-wrap{
  margin-top: 24px;
  .diary-item{
    position: relative;
    margin-bottom: 20px;
    padding: 24px;
    background: #fff;
    &:last-child{
     margin-bottom: 34px;
    }
    .title{
      font-weight: 500;
      font-size: 16px;
    }
    .icon{
      position: absolute;
      right: 24px;
      top: 24px;
      i{
        font-size: 24px;
      }
      img{
        width: 24px;
      }
      a{
        margin-left: 16px;
      }
    }
    .diary-content{
      font-size: 14px;
      color: #666;
      margin-top: 30px;
      max-height: 95px;
    }
    .footer{
      clear: both;
      overflow: hidden;
      line-height: 36px;
      height: 36px;
      font-size: 13px;
      color: #838383;
      display: flex;
      justify-content: space-between;
    }
    .el-tag{
      margin-left: 12px;
    }
    .line-clamp3{
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
