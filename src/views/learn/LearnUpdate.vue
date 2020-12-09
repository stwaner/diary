<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix">
      <a href="javascript:;" @click="goBack"> <i class="el-icon-arrow-left"></i> 学习列表</a>
    </div>
    <div class="text item">
      <div class="Learn-update-wrapper">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="学习主题" prop="learnTitle">
            <el-input v-model="ruleForm.learnTitle" :value="learnObj.learnTitle"></el-input>
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
          <el-form-item label="学习内容" prop="learnHtml">
            <editor @input="inputChange" :value="ruleForm.learnHtml"></editor>
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
import { learnDetail, saveLearn } from '@/api/learn'

export default {
  data () {
    return {
      learnId: this.$route.query.learnId,
      learnObj: {},
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
  components: {
    Editor
  },
  created () {
    if (this.learnId) {
      this.getLearnDetail()
    }
  },
  methods: {
    async getLearnDetail () {
      const res = await learnDetail({ learnId: this.learnId })
      if (res.code === 200) {
        this.learnObj = res.data
        this.initData()
      }
    },
    initData () {
      this.ruleForm.learnTitle = this.learnObj.learnTitle
      this.ruleForm.learnHtml = this.learnObj.learnHtml
      for (const key in this.learnObj.label) {
        this.dynamicTags.push(this.learnObj.label[key].labelContext)
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
    inputChange (val) {
      this.ruleForm.learnHtml = val
    },
    submitForm (formName) {
      this.$refs[formName].validate(async (valid, values) => {
        if (valid) {
          const data = {}
          let msg = ''
          data.userId = this.$store.state.login.userInfo.userId || this.userId
          data.learnTitle = this.ruleForm.learnTitle
          data.tag = this.dynamicTags.join(',')
          data.learnHtml = this.ruleForm.learnHtml
          data.learnContext = this.ruleForm.learnHtml.replace(/<[^>]+>/g, '')
          if (this.learnId) {
            data.learnId = this.learnId
            msg = '修改成功'
          } else {
            msg = '添加成功'
          }
          const res = await saveLearn(data)
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
      // this.$confirm('该文件未保存，要保留更改吗?', 'DO YOU WANT TO SAVE?', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   this.$router.back(-1)
      // }).catch(() => {
      //   // this.submitForm('ruleForm')
      // })
      this.$router.back(-1)
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
