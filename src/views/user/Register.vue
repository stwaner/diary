<template>
  <div class="formDiv register_form">
    <h2 class="text-center">注册</h2>
    <el-form ref="regForm" :rules="rules" :model="ruleForm" label-width="0">
      <el-form-item prop="email">
        <el-input prefix-icon="el-icon-user" clearable v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="code" class="code-input">
        <el-input prefix-icon="el-icon-chat-line-square" size="medium" clearable v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
        <el-button @click="handleSendCode" :disabled="disabled">{{ sendText }}</el-button>
      </el-form-item>
      <el-form-item prop="password">
        <el-input prefix-icon="el-icon-lock" clearable v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn-block" type="primary"  @click="submitForm">注册</el-button>
      </el-form-item>
      <div class="gap">
        <router-link tag="a" class="link" :to="{name:'Login'}">已有账号? 点击登录</router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import { register, getCode } from '@/api/login'
export default {
  name: 'Register',
  data () {
    const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    var validateEmail = (reule, value, callback) => {
      if (!reg.test(this.ruleForm.email)) {
        callback(new Error('请输入正确的邮箱格式'))
      } else {
        callback()
      }
    }
    return {
      disabled: false,
      timmer: null,
      sendText: '获取验证码',
      ruleForm: {
        email: '',
        code: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 发送验证码
    async handleSendCode () {
      const email = this.ruleForm.email
      if (!email) {
        this.$message.info('请输入邮箱')
        return
      }
      const res = await getCode({ email: email })
      if (res.code === 200) {
        this.$message.success('发送成功')
        this.countDown(100)
      }
    },
    countDown (time = 60) {
      if (time === 0) {
        this.sendText = '获取验证码'
        this.disabled = false
        return
      } else {
        this.sendText = `重新发送(${time})`
        this.disabled = true
        time--
      }
      this.timmer = setTimeout(() => {
        this.countDown(time)
      }, 1000)
    },
    submitForm () {
      const _this = this
      this.$refs.regForm.validate(async (valid) => {
        if (valid) {
          const res = await register({ email: this.ruleForm.email, pwd: this.ruleForm.password, code: this.ruleForm.code })
          if (res.code === 200) {
            _this.$message.success('注册成功')
            _this.$router.push({ path: '/login' })
          } else {
            _this.$message.error(res.msg)
          }
        } else {
          return false
        }
      })
    },
    beforeDestroy () {
      clearTimeout(this.timmer)
      this.timmer = null
    }
  }
}
</script>

<style lang="scss">
.main-warp .main-content .formDiv.register_form {
  .gap{
    margin: 30px 0;
    text-align: center;
  }
  .code-input .el-form-item__content{
    display: flex;
    .el-button{
      margin-left: 20px;
    }
  }
}
</style>