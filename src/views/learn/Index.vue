<template>
  <learn-tab :learnList="learnList"></learn-tab>
</template>

<script>
import { findLearn } from "@/api/learn"
import LearnTab from './LearnListItem.vue'

export default {
  data () {
    return {
      learnList: []
    }
  },
  components: {
    LearnTab
  },
  created () {
    this.getLearnList()
  },
  methods: {
    // 获取学习天地列表
    getLearnList () {
      findLearn().then(res => {
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

<style>

</style>