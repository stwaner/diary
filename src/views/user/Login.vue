<template>
  <div>
    <button @click="fn">登录</button>
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