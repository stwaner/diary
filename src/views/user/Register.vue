<template>
  <div class="formDiv register_form">
    <h2 class="text-center">注册</h2>
    <el-form ref="regForm" :rules="rules" :model="ruleForm" label-width="0">
      <el-form-item prop="userName">
        <el-input prefix-icon="el-icon-user" clearable v-model="ruleForm.userName" placeholder="手机号码或邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input prefix-icon="el-icon-lock" clearable v-model="ruleForm.password" placeholder="密码" show-password></el-input>
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
import { register } from '@/api/login'
export default {
  name: 'Register',
  data () {
    return {
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
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
      this.$refs.regForm.validate(async (valid) => {
        if (valid) {
          const res = await register({ username: this.ruleForm.userName, pwd: this.ruleForm.password })
          if (res.code == 200) {
            this.$message.success('注册成功')
            this.$router.push({ path:'login' })
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

<style lang="scss">
.main-warp .main-content .formDiv.register_form {
  .gap{
    margin: 30px 0;
    text-align: center;
  }
}
</style>