<template>
  <div>
    <page-header></page-header>
    <router-view></router-view>
    <page-footer></page-footer>
  </div>
</template>

<script>
import pageHeader from '@/components/Header.vue'
import pageFooter from '@/components/Footer.vue'
export default {
  name: 'Index',
  components: {
    pageHeader,
    pageFooter
  }
}
</script>

<style lang="scss">
  @import '../assets/css/default.css';
  @import '../assets/css/layout.css';
</style>
