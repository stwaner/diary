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
      <el-divider content-position="center">其他方式登录</el-divider>
      <div class="third-auth">
        <a title="人脸登录" class="dt" href="javascript:;" @click="toPhotoLogin"></a>
        <a title="微信账户登录" class="wx" href="javascript:;"></a>
        <a title="QQ账户登录" class="qq" href="javascript:;"></a>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getCookie } from '@/utils/cookie'
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
    toPhotoLogin () {
      this.$router.push({path: '/user/photoLogin'})
    },
    submitForm () {
      const _this = this
      _this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const res = await login({ loginName: this.ruleForm.loginName, pwd: this.ruleForm.password })
          if (res.code === 200) {
            // console.log(res.data)
            _this.$message.success('登录成功')
            const token = getCookie('JSESSIONID')
            _this.$store.dispatch('login/setToken', token)
            // _this.$store.dispatch('setIsLogin', true)
            _this.$router.push({ path: '/' })
          } else {
            _this.$message.error(res.msg)
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
