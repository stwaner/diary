<template>
  <div class="main-warp">
    <div class="main-content">
      <div class="formDiv">
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
              <a href="javascript:;" class="link">忘记密码</a>
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
    </div>
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
        ],
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const res = await login({loginName:this.ruleForm.loginName, pwd: this.ruleForm.password})
          if(res.code == 200){
            this.$message.success('登录成功')
            this.$router.push({path:'/home'})
          }else{
            this.$message.error(res.msg)
          }
        } else {
          return false;
        }
      });
    }
    
  }
}
</script>

<style lang="scss" scoped>
.main-warp {
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  overflow: auto;
  background: #fff url(../../assets/img/loginback.png) no-repeat;
  background-size: cover;
  .main-content {
    margin-left: auto;
    margin-right: auto;
    background: #fff;
    margin-bottom: 50px;
    .formDiv{
      h2 {
        padding: 10px 0 20px;
        font-size: 20px;
        color: #545454;
        text-align: center;
        font-weight: 500;
      }
      .gap {
        margin: 20px 0 40px;
        .split-space {
          color: #649efd;
          margin: 0 10px;
        }
      }
      .el-divider .el-divider__text{
        color:#757474;
      }
      .btn-block {
        display: block;
        width: 100%;
      }
      .pull-right {
        float: right;
      }
      a.link {
        color: #649efd;
      }
      a:focus, a:visited {
        text-decoration: none;
      }
      .third-auth{
        text-align: center;
        a {
          color: #666;
          margin: 15px 20px 0 30px;
          width: 40px;
          height: 40px;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          display: inline-block;
          border-radius: 4px;
          zoom: 1;
          background: #fff url(../../assets/img/authn.png) no-repeat center center;
          &.dt{
            background-position: right;
          }
          &.wx{
            background-position: center;
          }
          &.qq {
            background-position: 0 0;
          }
        }
      }
    } 
  }
}
@media (max-width: 768px){
  .main-warp{
    background-image: none;
    .main-content{
      padding: 50px 20px;
    }
  }
}
@media (max-width: 1024px) and (min-width: 769px){
  .main-content {
    width: 500px;
    margin-top: 100px;
    padding: 20px 50px;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(0,0,0,.2);
  }
}
@media (min-width: 1025px){
  .main-content {
    width: 500px;
    margin-top: 100px;
    padding: 20px 50px;
    border-radius: 4px;
  }
}

</style>