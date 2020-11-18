<template>
  <div class="calendar">
    <el-calendar>
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template
        slot="dateCell"
        slot-scope="{date, data}">
        <!-- <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
        </p> -->
        <p :class="rqi.indexOf(data.day) > -1 ? 'is-selected' : ''" @click="handleBianJi(data.day)">
          {{ data.day.split('-').slice(1).join('-') }} <br/>
          <el-popover
            placement="right-start"
            width="200"
            trigger="hover"
            content="这里显示详细信息">
            <span slot="reference" class="calen-text">{{ rqi.indexOf(data.day) > -1 ? rqineirong[data.day].jqmc : '无事件'}}</span>
          </el-popover>
        </p>
      </template>
    </el-calendar>
    <!-- 添加或修改节假日管理 - 法定节假日对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="假期名称" prop="jqmc">
          <el-input v-model="form.jqmc" placeholder="请输入假期名称" />
        </el-form-item>
        <el-form-item label="开始时间" prop="kssj">
          <el-date-picker
            clearable
            size="small"
            style="width: 100%"
            v-model="form.kssj"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="jssj">
          <el-date-picker
            clearable
            size="small"
            style="width: 100%"
            v-model="form.jssj"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="类型" prop="lx">
          <el-select v-model="form.lx" placeholder="请选择类型" clearable :style="{ width: '100%' }">
            <el-option
              v-for="dict in jjrlxOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="title == '编辑节假日'" @click="deleteForm" :style="{ background: 'red',color:'white'}">删除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rqi:[],
      rqineirong:{}, // 日期内容
      // 遮罩层
      loading: true,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        jqmc: [
          { required: true, message: "假期名称不能为空", trigger: "blur" }
        ],
        kssj: [
          { required: true, message: "开始时间不能为空", trigger: "blur" }
        ],
        jssj: [
          { required: true, message: "结束时间不能为空", trigger: "blur" }
        ],
        lx: [
          { required: true, message: "假期类型不能为空", trigger: "change" }
        ],
      },
      // 节假日类型
      jjrlxOptions: []
    }
  },
  created () {
    // this.getList()
    // 获取节假日类型
    // this.getDicts("jjr_fdjjr_lx").then(response => {
    //   this.jjrlxOptions = response.data
    // })
  },
  methods: {
    /** 查询节假日管理 - 法定节假日列表 */
    getList() {
      this.loading = true
      listFdjjr(this.queryParams).then(res => {
        this.rqi = []
        this.rqineirong = {}
        for(let i=0;i<res.length;i++){
          for(var key in res[i]){
            this.rqi.push(key)
            this.rqineirong[key] = res[i][key]
          }
        }
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        jqmc: undefined,
        kssj: undefined,
        jssj: undefined,
        lx: undefined
      }
      this.resetForm("form")
    },
    /** 搜索按钮操作 */
    handleQuery(day) {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateFdjjr(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功")
                this.open = false
                this.reset()
                this.getList()
              }
            })
          } else {
            addFdjjr(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功")
                this.open = false
                this.reset()
                this.getList()
              }
            })
          }
        }
      })
    },
    /** 编辑日期操作 */
    handleBianJi(day) {
      if(this.rqineirong[day]){
        console.log(this.rqineirong[day])
        this.form = this.rqineirong[day]
        this.title = '编辑节假日'
      }else{
        let obj = {}
        obj.kssj = day.valueOf()
        obj.jssj = day.valueOf()
        this.form = obj
        this.form = obj
        this.title = '新增节假日'
      }
      this.open = true
    },
    deleteForm(){
      let ids = []
      ids.push(this.form.id)
      delFdjjr(ids).then(response => {
        if (response.code === 200) {
          this.msgSuccess("删除成功")
          this.open = false
          this.reset()
          this.getList()
        }
      })
    }
  }

}
</script>

<style lang="scss">
.is-selected {
  // color: orange;
}
.calendar{
  max-width: 1200px;
  margin: 50px auto 20px;
  .is-today{
    background-color: #F2F8FE;
  }
  .calen-text{
    padding: 2px 5px;
    margin-bottom: 8px;
    box-shadow: 2px 2px 2px #ededed;
    background: #fff;
    display: block;
  }
  .el-calendar-table .el-calendar-day{
    overflow: auto;
    min-height: 120px;
    &::-webkit-scrollbar {
      width: 4px;    
      /*height: 4px;*/
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: rgba(0,0,0,0.2);
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 5px;
      background: rgba(0,0,0,0.1);
    }
  }
}
</style>
