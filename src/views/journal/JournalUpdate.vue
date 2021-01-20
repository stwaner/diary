<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix">
      <a href="javascript:;" @click="goBack"> <i class="el-icon-arrow-left"></i> 日记列表</a>
    </div>
    <div class="text item">
      <div class="Learn-update-wrapper">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item class="inline-item" label="日期">
            <el-date-picker
              v-model="ruleForm.dialyDate"
              type="datetime"
              format="yyyy/MM/dd HH:mm:ss"
              value-format="yyyy/MM/dd HH:mm:ss"
              :disabled="journalObj.dialyDate ? true : false"
              placeholder="选择日记时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="inline-item" label="气温">
            <el-input-number controls-position="right" v-model="ruleForm.temperature"></el-input-number>
          </el-form-item>
          <el-form-item class="inline-item" label="心情等级">
            <el-rate
              v-model="ruleForm.mood_type"
              :icon-classes="iconClasses"
              void-icon-class="icon-rate-face-off"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
          </el-form-item>
          <el-form-item class="inline-item" label="心情描述">
            <el-input v-model="ruleForm.mood"></el-input>
          </el-form-item>
          <el-form-item class="inline-item" label="天气">
            <el-radio-group v-model="ruleForm.weather_type">
              <el-radio :label="0"><i class="el-icon-sunny" title="晴"></i></el-radio>
              <el-radio :label="1"><i class="el-icon-cloudy" title="阴"></i></el-radio>
              <el-radio :label="2"><i class="el-icon-cloudy-and-sunny" title="多云"></i></el-radio>
              <el-radio :label="3"><i class="el-icon-light-rain" title="雪"></i></el-radio>
              <el-radio :label="4"><i class="el-icon-heavy-rain" title="雨"></i></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="inline-item" label="是否公开">
            <el-radio-group v-model="ruleForm.statusId">
              <el-radio :label="0">私密</el-radio>
              <el-radio :label="1">公开</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="内容" prop="diaryHtml"> -->
          <el-form-item label="内容">
            <editor @input="inputChange" v-model="ruleForm.diaryHtml"></editor>
          </el-form-item>
          <el-form-item style="text-align:center;">
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="$router.go(-1)">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-card>
</template>

<script>
import Editor from '../../components/in_editor/index.vue'
import { journalDetail, saveJournal } from '@/api/journal'

export default {
  inject: ['reload'],
  data () {
    return {
      journalObj: {},
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
      ruleForm: {
        dialyDate: null,
        weather_type: null,
        mood: '',
        mood_type: null,
        temperature: undefined,
        diaryHtml: '',
        statusId: 0
      },
      rules: {
        diaryHtml: [
          { required: true, message: '请填写内容', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    '$route' (to, from) {
      location.reload()
    }
  },
  computed: {
    userId () {
      return (JSON.parse(window.localStorage.getItem('userInfo'))).userId
    },
    diaryId () {
      return this.$route.query.diaryId
    }
  },
  created () {
    if (this.diaryId) {
      this.getJournalDetail()
    }
  },
  components: {
    Editor
  },
  methods: {
    async getJournalDetail () {
      const res = await journalDetail({ diaryId: this.diaryId, userId: this.userId })
      if (res.code === 200) {
        this.journalObj = res.data
        this.initData()
      }
    },
    inputChange (val) {
      this.ruleForm.diaryHtml = val
    },
    initData () {
      this.ruleForm.dialyDate = this.journalObj.dialyDate
      this.ruleForm.temperature = this.journalObj.temperature
      this.ruleForm.mood = this.journalObj.mood
      this.ruleForm.mood_type = this.journalObj.moodType
      this.ruleForm.statusId = this.journalObj.statusId
      this.ruleForm.weather_type = this.journalObj.weatherType
      this.ruleForm.diaryHtml = this.journalObj.diaryHtml
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate(async (valid, values) => {
        if (valid) {
          const data = {}
          data.userId = this.$store.state.login.userInfo.userId || this.userId
          data.dialyDate = this.ruleForm.dialyDate.replaceAll('-', '/')
          data.mood = this.ruleForm.mood
          data.moodType = this.ruleForm.mood_type
          data.weatherType = this.ruleForm.weather_type
          data.temperature = this.ruleForm.temperature
          data.statusId = this.ruleForm.statusId
          data.diaryHtml = this.ruleForm.diaryHtml
          data.diaryContext = this.ruleForm.diaryHtml.replace(/<[^>]+>/g, '')
          console.log(data)
          let msg = ''
          if (this.diaryId) {
            data.diaryId = this.diaryId
            msg = '修改成功'
          } else {
            msg = '添加成功'
          }
          const res = await saveJournal(data)
          if (res.code === 200) {
            this.$message.success(msg)
            this.$router.go(-1)
          } else {
            this.$message.error(res.msgg)
          }
        } else {
          return false
        }
      })
    },
    goBack () {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="scss">
  @import url('../../assets/fonts/style.css');
  @media screen and (max-width: 1200px) {
    .inline-item{
      width: 100%;
    }
  }
  .Learn-update-wrapper{
    padding: 0 150px;
    .el-rate {
      height: 40px;
      line-height: 40px;
      .el-rate__item {
        line-height: initial;
      }
      .el-rate__text{
        margin-left: 12px;
      }
    }
    .el-input__inner{
      width: 320px;
    }
    .el-input-number{
      width: auto;
    }
    .inline-item{
      width: 50%;
      display: inline-block;
    }
    .el-input-number .el-input__inner{
      text-align-last: left;
    }
    .el-form-item__label{
      margin: 0;
      text-align: left;
      .el-radio__label{
        i{
          font-size: 17px;
        }
      }
    }
    .el-form-item__content{
      .el-tag{
        margin-right: 12px;
      }
    }
  }
</style>
