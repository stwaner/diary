<template>
  <div class="journal-wrapper">
    <div class="row search-wrap">
      <el-button class="add-btn" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      <el-input class="keywords-inpupt" @keyup.enter.native="getJournalList" placeholder="请输入关键字搜索" v-model="keywords">
        <el-button slot="append" icon="el-icon-search" @click="getJournalList"></el-button>
      </el-input>
    </div>
    <journal-item :journalList="journalList"></journal-item>
    <el-pagination
      background
      layout="total,sizes, prev, pager, next"
      :total="total"
      :page-size="page.length"
      :current-page="page.pageNo"
      :page-sizes="[10, 15, 20, 30]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :hide-on-single-page="true"
    >
    </el-pagination>
  </div>
</template>

<script>
import { findJournalList } from '@/api/journal'
import JournalItem from './JournalItem.vue'

export default {
  data () {
    return {
      journalList: [],
      total: 0,
      keywords: '',
      orderCause: 2, // 1正序2倒序
      page: {
        pageNo: 1, // 当前页码
        length: 10 // 每页条数
      }
    }
  },
  computed: {
    userId () {
      return (JSON.parse(window.localStorage.getItem('userInfo'))).userId
    }
  },
  components: {
    JournalItem
  },
  created () {
    this.getJournalList()
  },
  methods: {
    handleSizeChange (val) {
      this.page.length = val
      this.getJournalList()
    },
    handleCurrentChange (val) {
      this.page.pageNo = val
      this.getJournalList()
    },
    handleAdd () {
      this.$router.push({ name: 'JournalUpdate' })
    },
    // 获取日记列表
    getJournalList () {
      const data = {}
      data.userId = this.userId
      data.keywords = this.keywords
      data['page.pageNo'] = this.page.pageNo
      data['page.length'] = this.page.length
      data.orderCause = this.orderCause
      findJournalList(data).then(res => {
        if (res.code === 200) {
          this.total = res.adds.count
          this.journalList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.journal-wrapper{
  background: #fbfbfb;
  .search-wrap{
    padding-top: 30px;
    width: 100%;
    .keywords-inpupt{
      width: 25%;
      float: right;
    }
    .add-btn{
      width: 70%;
      margin-right: 30px;
      float: left;
    }
  }
}
</style>
