<template>
  <div>
    <div class="row search-wrap">
      <el-input class="keywords-inpupt" placeholder="请输入关键字搜索" v-model="keywords">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button class="add-btn" icon="el-icon-plus" type="primary" @click="handleAdd">新增</el-button>
    </div>
    <learn-tab :learnList="learnList"></learn-tab>
    <el-pagination
      background
      layout="total,sizes, prev, pager, next"
      :total="total"
      :page-size="page.length"
      :current-page="page.pageNo"
      :page-sizes="[5, 10, 15, 20]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :hide-on-single-page="true"
    >
    </el-pagination>
  </div>
</template>

<script>
import { findLearn } from '@/api/learn'
import LearnTab from './LearnListItem.vue'

export default {
  data () {
    return {
      learnList: [],
      total: 0,
      keywords: '',
      orderCause: 2,
      page: {
        pageNo: 1, // 当前页码
        length: 5 // 每页条数
      }
    }
  },
  computed: {
    userId () {
      return (JSON.parse(window.localStorage.getItem('userInfo'))).userId
    }
  },
  components: {
    LearnTab
  },
  created () {
    this.getLearnList()
  },
  methods: {
    handleSizeChange (val) {
      this.page.length = val
      this.getLearnList()
    },
    handleCurrentChange (val) {
      this.page.pageNo = val
      this.getLearnList()
    },
    handleAdd () {
      this.$router.push({ name: 'LearnUpdate' })
    },
    // 获取学习天地列表
    getLearnList () {
      const data = {}
      data.userId = this.userId
      data.keywords = this.keywords
      data['page.pageNo'] = this.page.pageNo
      data['page.length'] = this.page.length
      data.orderCause = this.orderCause
      findLearn(data).then(res => {
        if (res.code === 200) {
          this.total = res.adds.count
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
.search-wrap{
  margin-top: 30px;
  width: 100%;
  text-align: right;
  .keywords-inpupt{
    width: 280px;
  }
  .add-btn{
    margin-left: 30px;
  }
}
</style>
