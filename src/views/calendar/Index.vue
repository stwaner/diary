<template>
  <div class="calendar">
    <el-calendar>
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template
        slot="dateCell"
        slot-scope="{date, data}">
        {{ data.day.split('-').slice(1).join('-') }} <br/>
        <template v-for="item in eventList">
          <p
            v-if="item.planTime.indexOf(data.day.split('-').join('/')) > -1"
            :key="item.eventId"
            :class="item.planTime.indexOf(data.day.split('-').join('/')) > -1 ? 'is-selected' : ''"
            @click.stop="handleClickEvent(item, item.planTime)"
          >
            <el-popover
              placement="right-start"
              width="200"
              trigger="hover"
              :content="item.eventContext">
              <span slot="reference" class="calen-text">{{ item.eventContext }}</span>
            </el-popover>
          </p>
        </template>
        <div class="plus-wrap">
          <el-button icon="el-icon-plus" size="mini" circle @click.stop="handleClickEvent(null, data.day.split('-').join('/'))" title="新增事件"></el-button>
        </div>
      </template>
    </el-calendar>

    <!-- 新增事件弹窗 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body :before-close="cancel">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="事件标题" prop="eventContext">
          <el-input v-model="form.eventContext" placeholder="请输入事件标题" />
        </el-form-item>
        <el-form-item label="消耗时长" prop="timeCost">
          <el-input v-model="form.timeCost" placeholder="请输入消耗时长" />
        </el-form-item>
        <el-form-item label="提醒">
          <el-switch
            v-model="form.remind"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="提醒时间" prop="remindTime" v-if="form.remind">
          <el-date-picker
            clearable
            size="small"
            style="width: 100%"
            v-model="form.remindTime"
            type="datetime"
            format="yyyy/MM/dd HH:mm:ss"
            value-format="yyyy/MM/dd HH:mm:ss"
            placeholder="选择提醒时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button type="danger" v-if="this.eventId" @click="deleteEvent">删除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findEventList, saveEvent, delEvent } from '@/api/events'
export default {
  data () {
    return {
      eventId: null,
      planTime: undefined,
      eventList: [],
      orderCause: 2, // 1正序2倒序
      page: {
        pageNo: 1, // 当前页码
        length: 30 // 每页条数
      },
      loading: true,
      title: '',
      open: false,
      // 表单参数
      form: {
        eventContext: undefined,
        timeCost: undefined,
        remind: false,
        remindTime: undefined
      },
      rules: { // 表单校验
        eventContext: [
          { required: true, message: '事件内容不能为空', trigger: 'blur' }
        ],
        timeCost: [
          { required: true, message: '消耗时间不能为空', trigger: 'blur' }
        ],
        remindTime: [
          { required: true, message: '提醒时间不能为空', trigger: 'change' }
        ]
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
    getList () {
      this.loading = true
      findEventList().then(res => {
        this.eventList = res.data
      })
    },
    // 取消按钮
    cancel () {
      this.open = false
      this.eventId = null
      this.reset()
    },
    // 表单重置
    reset () {
      this.form = {
        eventContext: undefined,
        timeCost: undefined,
        // remind: false,
        remindTime: undefined
      }
    },
    changeSwitch () {
    },
    /** 提交 */
    submitForm: function () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.userId = this.userId
          this.form.planTime = this.planTime
          let msg = ''
          if (this.eventId) {
            this.form.eventId = this.eventId
            msg = '修改成功'
          } else {
            msg = '添加成功'
          }
          if (this.form.remind) {
            this.form.remind = 1
          } else {
            this.form.remind = 0
          }
          saveEvent(this.form).then(res => {
            if (res.code === 200) {
              this.open = false
              this.$message.success(msg)
              this.getList()
              setTimeout(() => {
                this.reset()
              }, 50)
            }
          })
        }
      })
    },
    /** 编辑事件操作 */
    handleClickEvent (obj, time) {
      if (obj && obj.eventId) {
        this.title = '编辑事件'
        this.eventId = obj.eventId
        this.planTime = obj.planTime
        this.form = {
          eventContext: obj.eventContext,
          timeCost: obj.timeCost,
          remind: obj.remind
        }
        if (obj.remind === 1) {
          this.form.remindTime = obj.remindTime
        }
      } else {
        this.title = '新增事件'
        this.planTime = time + ' 00:00:00'
      }
      this.open = true
    },
    /** 删除事件 */
    deleteEvent () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delEvent({ eventId: this.eventId, userId: this.userId }).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功！')
            this.open = false
            this.reset()
            this.getList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }

}
</script>

<style lang="scss">
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
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
