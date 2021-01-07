<template>
  <div>
    <div class="home">
      <calendar/>
      <div class="journal">
        <div class="row">
          <div class="twelve columns align-center">
            <h1 class="parg-title">学习天地</h1>
          </div>
        </div>
        <div class="row">
          <p class="more">
            <router-link :to="{path: '/learn'}" tag="a">更多</router-link>
          </p>
        </div>
        <learn-part :learnList="learnList"></learn-part>
      </div>
    </div>
  </div>
</template>

<script>

import calendar from './calendar/Index.vue'
import LearnPart from './learn/LearnListItem.vue'
import { findLearn } from '@/api/learn'

export default {
  name: 'Home',
  data () {
    return {
      learnList: []
    }
  },
  computed: {
    userId () {
      return (JSON.parse(window.localStorage.getItem('userInfo'))).userId
    }
  },
  components: {
    calendar,
    LearnPart
  },
  created () {
    this.getLearnList()
  },
  methods: {
    // 获取学习天地列表
    getLearnList () {
      const data = {}
      data.userId = this.userId
      data['page.pageNo'] = 1
      data['page.length'] = 5
      data.orderCause = 2
      findLearn(data).then(res => {
        if (res.code === 200) {
          this.learnList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>
