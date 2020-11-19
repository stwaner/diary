<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix">
      <a href="javascript:;" @click="goBack"> <i class="el-icon-arrow-left"></i> 日记列表</a>
    </div>
    <div class="text item">
      <div class="Learn-update-wrapper">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          {{journalObj}}
          <el-form-item label="日期" prop="dialyDate">
            <el-date-picker
              v-model="ruleForm.dialyDate"
              type="datetime"
              style="width: 100%"
              format="yyyy/MM/dd hh:mm:ss "
              value-format="yyyy/MM/dd hh:mm:ss"
              placeholder="选择日记时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="天气">
            <el-input v-model="ruleForm.weather" :value="journalObj.weather"></el-input>
          </el-form-item>
          <el-form-item label="心情" prop="mood">
            <el-input v-model="ruleForm.mood" :value="journalObj.mood"></el-input>
          </el-form-item>
          <el-form-item label="气温" prop="temperature">
            <el-input v-model="ruleForm.temperature" :value="journalObj.temperature"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="diaryHtml">
            <!-- <el-input type="textarea" v-model="ruleForm.diaryContext"></el-input> -->
            <editor @input="inputChange" :value="ruleForm.diaryHtml"></editor>
          </el-form-item>
          <el-form-item label="是否公开" prop="statusId">
            <el-radio-group :value="journalObj ? journalObj.statusId : ruleForm.statusId">
              <el-radio :label="0">私密</el-radio>
              <el-radio :label="1">公开</el-radio>
            </el-radio-group>
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
  data () {
    return {
      diaryId: this.$route.query.diaryId,
      journalObj: {},
      dialyDate: null,
      inputValue: '',
      diaryContext: '',
      ruleForm: {
        dialyDate: null,
        weather: '',
        mood: '',
        temperature: '',
        diaryHtml: '',
        statusId: 0
      },
      rules: {
        dialyDate: [
          { required: true, message: '请填写日记时间', trigger: 'blur' }
        ],
        diaryHtml: [
          { required: true, message: '请填写内容', trigger: 'blur' }
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
        // this.initData()
      }
    },
    inputChange (val) {
      this.ruleForm.diaryHtml = val
    },
    initData () {
      this.ruleForm.learnTitle = this.journalObj.learnTitle
      this.ruleForm.learnHtml = this.journalObj.learnHtml
      for (const key in this.journalObj.label) {
        this.dynamicTags.push(this.journalObj.label[key].labelContext)
      }
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
    handleInputConfirm () {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    submitForm (formName) {
      this.$refs[formName].validate(async (valid, values) => {
        if (valid) {
          const data = {}
          let msg = ''
          data.userId = this.$store.state.userInfo.userId || this.userId
          data.dialyDate = this.ruleForm.dialyDate
          data.mood = this.ruleForm.mood
          data.weather = this.ruleForm.weather
          data.temperature = this.ruleForm.temperature
          data.statusId = this.ruleForm.statusId
          data.diaryHtml = this.ruleForm.diaryHtml
          data.diaryContext = this.ruleForm.diaryHtml.replace(/<[^>]+>/g, '')
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
      // this.$confirm('该文件未保存，要保留更改吗?', 'DO YOU WANT TO SAVE?', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   this.$router.back(-1)
      // }).catch(() => {
      //   this.$router.back(-1)
      //   // this.submitForm('ruleForm')
      // })
    }
  }
}
</script>

<style lang="scss">
  .Learn-update-wrapper{
    .el-form-item__label{
      margin: 0;

    }
    .el-form-item__content{
      .el-tag{
        margin-right: 12px;
      }
    }
  }
</style>
