<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix">
      <a href="javascript:;" @click="goBack"> <i class="el-icon-arrow-left"></i> 游记列表</a>
    </div>
    {{travelObj}}
    <div class="text item">
      <div class="Learn-update-wrapper">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="游记主题" prop="learnTitle">
            <el-input v-model="ruleForm.learnTitle" :value="travelObj.travelTitle"></el-input>
          </el-form-item>
          <el-form-item label="游记心得" prop="learnTitle">
            <el-input v-model="ruleForm.learnTitle" :value="travelObj.travelNote"></el-input>
          </el-form-item>
          <el-form-item label="学习标签">
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
          </el-form-item>
          <el-form-item style="text-align:center;">
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="$router.go(-1)">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-card>
</template>

<script>
import { traveDetail } from '@/api/travel.js'
import { getQueryString } from '@/utils/getUrlValue'
export default {
  data () {
    return {
      travelId: getQueryString('travelId'),
      travelObj: {},
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      ruleForm: {
        learnTitle: '',
        learnHtml: ''
      },
      rules: {
        learnTitle: [
          { required: true, message: '请输入学习标题', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        learnHtml: [
          { required: true, message: '请填写学习内容', trigger: 'blur' }
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
    this.getTravelDetail()
  },
  methods: {
    async getTravelDetail () {
      const res = await traveDetail({ travelId: this.travelId, userId: this.$store.state.login.userInfo.userId || this.userId })
      if (res.code === 200) {
        console.log(res)
        this.travelObj = res.data
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
          this.$message.success(ok)
          // const data = {}
          // let msg = ''
          // data.userId = this.$store.state.login.userInfo.userId || this.userId
          // data.learnTitle = this.ruleForm.learnTitle
          // data.tag = this.dynamicTags.join(',')
          // data.learnHtml = this.ruleForm.learnHtml
          // data.learnContext = this.ruleForm.learnHtml.replace(/<[^>]+>/g, '')
          // if (this.learnId) {
          //   data.learnId = this.learnId
          //   msg = '修改成功'
          // } else {
          //   msg = '添加成功'
          // }
          // const res = await saveLearn(data)
          // if (res.code === 200) {
          //   this.$message.success(msg)
          //   this.$router.go(-1)
          // } else {
          //   this.$message.error(res.msg)
          // }
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

<style>

</style>