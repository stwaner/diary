<template>
  <div>
    <div class="amap-page-container">
      <div id="container" class="amap-container"></div>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap' // 引入高德地图
import { SelfLocation } from '../amap/location'

export default {
  name: 'amap',
  data () {
    return {
      map: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const _this = this
      this.map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 13
      })
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
        _this.map.addControl(new AMap.ToolBar())
        _this.map.addControl(new AMap.Scale())
      })
      this.map.on('complete', function () {
        _this.selfLocation()
      })
    },
    // 获取定位
    selfLocation () {
      console.log('定位中..............')
      SelfLocation({
        map: this.map,
        complete: (val) => this.onComplete(val),
        error: (err) => this.onError(err)
      })
    },
    onComplete (data) {
      console.log('定位成功信息：', data)
      var position = [data.position.lng, data.position.lat]
      this.map.setCenter(position)
    },
    // eslint-disable-next-line handle-callback-err
    onError (data) {
      console.log('定位失败错误：', data)
      this.getLngLatLocation()
    },
    // 根据ip定位
    getLngLatLocation () {
      AMap.plugin('AMap.CitySearch', function () {
        var citySearch = new AMap.CitySearch()
        citySearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            console.log('通过ip获取当前城市：', result)
            // 此时，只是获取到了地址的经纬度，要想更详细饿地址信息，就要使用逆向解析
            // 逆向地理编码
            AMap.plugin('AMap.Geocoder', function () {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode
              })
              var lnglat = result.rectangle.split(';')[0].split(',')
              geocoder.getAddress(lnglat, function (status, data) {
                if (status === 'complete' && data.info === 'OK') {
                  // result为对应的地理位置详细信息
                  console.log(data)
                }
              })
            })
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
.amap-container {
  width: 1000px;
  height: 600px;
  margin: 0 auto;
}
</style>
