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
        <p :class="rqi.indexOf(data.day) > -1 ? 'is-selected' : ''" @click="handleClickEvent(data.day)">
          {{ data.day.split('-').slice(1).join('-') }} <br/>
          <el-popover
            placement="right-start"
            width="200"
            trigger="hover"
            content="这里显示详细信息">
            <span slot="reference" class="calen-text">{{ rqi.indexOf(data.day) > -1 ? rqineirong[data.day].jqmc : '无事件'}}</span>
          </el-popover>
        </p>
        <div class="plus-wrap">
          <el-button icon="el-icon-plus" size="mini" circle @click="handleClickEvent()" title="新增事件"></el-button>
        </div>
      </template>
    </el-calendar>

    <!-- 新增事件弹窗 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="事件标题" prop="eventContext">
          <el-input v-model="form.eventContext" placeholder="请输入事件标题" />
        </el-form-item>
        <el-form-item label="计划时间" prop="planTime">
          <el-date-picker
            clearable
            size="small"
            style="width: 100%"
            v-model="form.planTime"
            type="datetime"
            format="yyyy/MM/dd hh:mm:ss"
            value-format="yyyy/MM/dd hh:mm:ss"
            placeholder="选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="消耗时长" prop="timeCost">
          <el-input v-model="form.timeCost" placeholder="请输入消耗时长" />
        </el-form-item>
        <el-form-item label="提醒">
          <el-switch
            v-model="form.remind">
          </el-switch>
        </el-form-item>
        <el-form-item label="提醒时间" prop="remindTime" v-if="form.remind">
          <el-date-picker
            clearable
            size="small"
            style="width: 100%"
            v-model="form.remindTime"
            type="datetime"
            format="yyyy/MM/dd hh:mm:ss"
            value-format="yyyy/MM/dd hh:mm:ss"
            placeholder="选择提醒时间">
          </el-date-picker>
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
import { findEventList, saveEvent } from '@/api/events'
export default {
  data () {
    return {
      eventId: null,
      rqi:[],
      rqineirong:{}, // 日期内容
      orderCause: 2, // 1正序2倒序
      page: {
        pageNo: 1, // 当前页码
        length: 30 // 每页条数
      },
      loading: true,
      title: "",
      open: false,
      // 表单参数
      form: {
        remind: false
      },
      rules: { // 表单校验
        eventContext: [
          { required: true, message: "事件内容不能为空", trigger: "blur" }
        ],
        timeCost: [
          { required: true, message: "消耗时间不能为空", trigger: "blur" }
        ],
        planTime: [
          { required: true, message: "计划时间不能为空", trigger: "blur" }
        ],
        remindTime: [
          { required: true, message: "提醒时间不能为空", trigger: "change" }
        ],
      }
    }
  },
  computed: {
    userId () {
      return (JSON.parse(window.localStorage.getItem('userInfo'))).userId
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /** 查询事件列表 */
    getList() {
      this.loading = true
      const data = {}
      // data.keywords = this.keywords
      data['page.pageNo'] = this.page.pageNo
      data['page.length'] = this.page.length
      data.orderCause = this.orderCause
      findEventList(data).then(res => {
        console.log(res)
        // this.rqi = []
        // this.rqineirong = {}
        // for(let i=0;i<res.length;i++){
        //   for(var key in res[i]){
        //     this.rqi.push(key)
        //     this.rqineirong[key] = res[i][key]
        //   }
        // }
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
        eventContext: undefined,
        timeCost: undefined,
        planTime: undefined,
        remind: false,
        remindTime: undefined
      }
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form['userId'] = this.userId
          if (this.eventId) {
            this.form['eventId'] = this.eventId
          }
          if (this.form.remind) {
            this.form.remind = 1
          } else {
            this.form.remind = 0
          }
          console.log(this.form)
          saveEvent(this.form).then(res => {
            console.log(res)
            if (res.code === 200) {
              this.open = false
              this.$message.success('添加成功')
              this.reset()
              // this.getList()
            }
          })
        }
      })
    },
    /** 编辑日期操作 */
    handleClickEvent(day) {
      if(day){
        this.title = '编辑事件'
      }else{
        let obj = {}
        // obj.kssj = day.valueOf()
        this.title = '新增事件'
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
    .plus-wrap{
      text-align: center;
    }
  }
}
</style>
