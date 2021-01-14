<template>
  <div class="cost-wrapper">
    <div class="search-wrap">
      <el-form :inline="true" class="cost-form-inline">
        <el-form-item>
          <el-input v-model="keywords" clearable placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-plus" @click="handleClickAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrap">
      <el-table
        :data="tableData"
        :default-sort="{prop: 'created', order: 'descending'}"
        show-summary
        :stripe="stripe"
        :current-page.sync="page.pageNo"
      >
        <el-table-column type="index" :index="indexMethod"></el-table-column>
        <el-table-column prop="costContext" label="消费名称" width="210"></el-table-column>
        <el-table-column prop="costMoney" sortable label="消费金额" width="160"></el-table-column>
        <el-table-column prop="created" sortable label="创建时间" width="200"></el-table-column>
        <el-table-column prop="tag" label="标签">
          <template slot-scope="scope">
            <span v-if="scope.row.tag">
              <el-tag v-for="(tag, i) in scope.row.tag.split(',')" :key="i" type="success" disable-transitions>{{tag}}</el-tag>
            </span>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column align="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
               type="primary"
               plain
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 15, 20]"
          :page-size="page.length"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <template v-if="feeVisible">
      <fee-modal :feeVisible.sync="feeVisible" :title="title" :costObj="costObj" @ok="handleFeeOk"></fee-modal>
    </template>
  </div>
</template>

<script>
import { findCostList, getCostDetail, saveCost } from '@/api/cost'
import feeModal from './components/feeModal.vue'
export default {
  data () {
    return {
      costObj: null,
      keywords: '',
      cid: this.$route.query.cid,
      stripe:true,//是否为斑马纹 table
      tableData: [],
      page: {
        pageNo: 1,
        length: 10
      },
      total:0,
      title: '',
      feeVisible: false
    }
  },
  components: { feeModal },
  created () {
    if (this.cid) {
      this.getDetailById()
    } else {
      this.init()
    }
  },
  methods: {
    async init () {
      let data = {}
      data.keywords = this.keywords
      data['page.pageNo'] = this.page.pageNo
      data['page.length'] = this.page.length
      const res = await findCostList(data)
      if (res.code === 200) {
        this.total = res.adds.count
        this.tableData = res.data
      }
    },
    getDetailById () {
      getCostDetail({ cid: this.cid }).then(res=>{
        if (res.code === 200) {
          this.total = 1
          this.tableData.push(res.data)
        }
      })
    },
    handleSizeChange(val) {
      this.page.length = val
      this.init()
    },
    handleCurrentChange(val) {
      this.page.pageNo = val
      this.init()
    },
    indexMethod(index) {
      return index + 1
    },
    handleClickAdd () {
      this.title = '新增消费记录'
      this.feeVisible = true
    },
    handleEdit(row) {
      this.title = '编辑消费记录'
      this.costObj = row
      this.feeVisible = true
    },
    handleSearch() {
      this.init()
    },
    handleFeeOk () {
      this.feeVisible = false
      this.init()
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
  [class*="column"] + [class*="column"]:last-child{
    float: none;
  }
  .el-tag{
    margin-right: 8px;
    &:last-child{
      margin-right: 0;
    }
  }
  .el-table__footer-wrapper tbody td, .el-table__header-wrapper tbody td{
    background-color: #fff;
  }
  .pagination{
    margin-top: 35px;
  }
}
</style>