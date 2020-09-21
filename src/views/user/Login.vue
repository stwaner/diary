<template>
  <div class="formDiv login_form">
    <h2 class="text-center">登录</h2>
    <el-form ref="loginForm" :rules="rules" :model="ruleForm" label-width="0">
      <el-form-item prop="loginName">
        <el-input prefix-icon="el-icon-user" clearable v-model="ruleForm.loginName" placeholder="手机号码或邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input prefix-icon="el-icon-lock" clearable v-model="ruleForm.password" placeholder="密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn-block" type="primary"  @click="submitForm">登录</el-button>
      </el-form-item>
      <div class="gap">
        <div class="pull-right">
          <a href="javascript:;" class="link">忘记密码 ？</a>
          <span class="split-space">|</span>
          <router-link tag="a" class="link" :to="{name:'Register'}">新用户注册</router-link>
        </div>
        <div class="pretty-box">
          <el-checkbox v-model="isRember">记住我</el-checkbox>
        </div>
      </div>
      <el-divider content-position="center">第三方账号登录</el-divider>
      <div class="third-auth">
        <a title="用钉钉登录" class="dt" href="javascript:;"></a>
        <a title="用微信账户登录" class="wx" href="javascript:;"></a>
        <a title="用QQ账户登录" class="qq" href="javascript:;"></a>
      </div>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/login'
export default {
  name: 'Login',
  data () {
    return {
      isRember: false,
      ruleForm: {
        loginName: '',
        password: ''
      },
      rules: {
        loginName: [
          { required: true, message: '请输入手机号或邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const res = await login({ loginName:this.ruleForm.loginName, pwd: this.ruleForm.password })
          if (res.code == 200) {
            this.$message.success('登录成功')
            this.$router.push({path:'/home'})
          } else {
            this.$message.error(res.msg)
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
