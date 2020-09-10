<template>
  <div>
    <button @click="fn">注册</button>
  </div>
</template>

<script>
import { findAll } from '@/api/login'
export default {
  name: 'Register',
  methods: {
    fn () {
      findAll().then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style>

</style>