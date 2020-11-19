<template>
  <div>
    <div class="row diary-wrap">
      <div class="diary-item" v-for="item in journalList" :key="item.diaryId">
        <h3 class="title">{{ item.weather }} {{ item.mood }}</h3>
        <p class="diary-content" v-html="item.diaryContext"></p>
        <div class="footer">
          <p>{{item.created}}</p>
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
    margin-bottom: 20px;
    padding: 24px;
    background: #fbfbfb;
    &:last-child{
     margin-bottom: 0;
    }
    .title{
      margin: 0 0 20px 0;
      font-weight: 500;
      font-size: 18px;
    }
    .diary-content{
      font-size: 13px;
      color: #666;
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
  }
}
</style>
