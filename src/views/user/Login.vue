<template>
  <div>
    <!-- <button @click="fn">登录</button> -->
    <el-button type="primary" @click="fn">默认按钮</el-button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    fn () {
      this.$router.push({path:'/register'})
    }
  }
}
</script>

<style>

</style>