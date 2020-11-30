<template>
  <div>
    <!-- 8d168cf9262841cf32d4e72fbfd49c49 -->
    <h3 class="title">{{ msg }}</h3>
    <div class="amap-page-container">
      <!-- <el-amap vid="amapDemo"  :center="center" :map-manager="amapManager" :zoom="zoom" :events="events" class="amap-demo"> -->
      <!-- </el-amap> -->
    </div>
  </div>
</template>

<script>
// let amapManager = new VueAMap.AMapManager();
export default {
  data () {
    return {
      msg: 'vue-amap向你问好！',
      // zoom: 12,
      // center: [121.59996, 31.197646],
      // amapManager,
      // events: {
      //   init(map) {
      //     AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
      //       const marker = new SimpleMarker({
      //         iconLabel: 'A',
      //         iconStyle: 'red',
      //         map: map,
      //         position: map.getCenter()
      //       })
      //     })
      //   }
      // }
    }
  }
}
</script>

<style>
.amap-demo {
  height: 300px;
}
</style>
