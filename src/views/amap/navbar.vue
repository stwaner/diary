<template>
  <div class="location-navbar">
    <el-button class="location-btn" @click="handleSelfLocation" circle><img src="../../assets/img/icon/location-icon.png" /></el-button>
    <el-button circle icon="el-icon-search"></el-button>
  </div>
</template>

<script>
export default {
  methods: {
    // 重新定位
    handleSelfLocation () {
      this.$store.dispatch('location/setSelfLocation')
    }
  }
}
</script>

<style lang="scss">
.location-navbar{
  display: flex;
  justify-content: center;
  align-items: center;
  .location-btn{
    padding: 8px;
    img{
      width: 22px;
    }
  }
}
</style>