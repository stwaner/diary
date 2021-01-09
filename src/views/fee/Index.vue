<template>
  <div class="cost-wrapper">
    <div class="search-wrap">
      <el-form :inline="true" class="cost-form-inline">
        <el-form-item>
          <el-select v-model="timeType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="keywords" clearable placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleClickAdd">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleStati">统计</el-button>
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
        <el-table-column prop="costContext" label="消费名称" width="180"></el-table-column>
        <el-table-column prop="costMoney" sortable label="消费金额" width="160"></el-table-column>
        <el-table-column prop="created" sortable label="创建时间"></el-table-column>
        <el-table-column prop="tag" label="标签">
          <template slot-scope="scope">
            <el-tag v-for="(tag, i) in scope.row.tag.split(',')" :key="i" type="success" disable-transitions>{{tag}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
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
import { findCostList, saveCost } from '@/api/cost'
import feeModal from './components/feeModal.vue'
export default {
  data () {
    return {
      options: [{
        value: '1',
        label: '按周统计'
      }, {
        value: '2',
        label: '按月统计'
      }, {
        value: '3',
        label: '按年统计'
      }],
      costObj: null,
      timeType: '1',
      keywords: '',
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
    this.init()
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
    handleSizeChange(val) {
      this.page.length = val
    },
    handleCurrentChange(val) {
      this.page.pageNo = val
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
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSearch() {
      this.init()
      console.log('搜索')
    },
    handleStati () {
      console.log('统计')
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
  }
  .el-table__footer-wrapper tbody td, .el-table__header-wrapper tbody td{
    background-color: #fff;
  }
  .pagination{
    margin-top: 35px;
  }
}
</style>