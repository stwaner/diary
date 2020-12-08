<template>
  <div>
    <div class="amap-page-container">
      <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :mapStyle="mapStyle" :events="events" class="amap-demo">
        <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
        <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
      </el-amap>
      <div class="toolbar">
        <p v-if="loaded">
          location: lng = {{ lng }} lat = {{ lat }}
        </p>
        <p v-else>正在定位...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getTravelList } from '@/api/travel.js'

import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap'
const amapManager = new AMapManager()

export default {
  name: 'amap',
  data () {
    const self = this
    return {
      map: null,
      amapManager,
      contextMenuPositon: null,
      zoom: 10,
      mapStyle: 'light', // dark, fresh
      center: [121.59996, 31.197646],
      markers: [],
      windows: [],
      window: '',
      lng: 0,
      lat: 0,
      loaded: false,
      events: {
        init: (o) => {
          lazyAMapApiLoaderInstance.load().then(() => {
            self.initMap()
            self.initMarker()
          })
          // self.initMarker()
          // console.log(this.$refs.map.$$getCenter())
          // console.log(this.$refs.map.$$getInstance())
          // o.getCity(result => {
          //   console.log(result)
          // })
        },
        moveend: () => {
        },
        rightclick: (e) => {
          this.rightClickFun(e)
        },
        click: (e) => {
          console.log(e.lnglat.lng, e.lnglat.lat)
        }
      },
      plugin: [
        'ToolBar',
        'Scale',
        {
          pName: 'MapType', // 图层切换，用于几个常用图层切换显示
          defaultType: 0,
          events: {
            init (o) {
            }
          }
        }, {
          pName: 'Geolocation', // 定位，提供了获取用户当前准确位置、所在城市的方法
          events: {
            init (o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng
                  self.lat = result.position.lat
                  self.center = [self.lng, self.lat]
                  self.loaded = true
                  self.$nextTick()
                }
              })
            }
          }
        }
      ]
    }
  },
  created () {
    // this.initMarker()
  },
  methods: {
    initMap () {
      this.map = amapManager.getMap()
      // 地图初始化完成回调
      // this.$meit('callbackComponent', {
      //   function: 'loadMap'
      // })
      this.selfLocation()
    },
    // 自身定位
    selfLocation () {
      SelfLocation({
        map: this.map,
        complete: (val) => this.onComplete(val)
      })
    },
    onComplete (data) {
      const lng = data.position.lng
      const lat = data.position.lat
      console.log(lng, lat)
    },
    // 获取游记列表
    async initMarker () {
      const res = await getTravelList()
      if (res.code === 200) {
        this.point(res.data)
      }
    },
    // 地图上添加标记点和详细信息
    point (data) {
      const markers = []
      const windows = []
      const self = this

      data.forEach((ele, index) => {
        markers.push({
          position: [ele.longitude, ele.latitude],
          events: {
            click: () => {
              self.windows.forEach(window => {
                window.visible = false
              })
              self.window = self.windows[index]
              self.$nextTick(() => {
                self.window.visible = true
              })
            }
          },
          visible: true,
          offset: [0, 0], // 窗体偏移
          draggable: false, // 不可移动
          title: `<span>${ele.travelTitle}</span>`
        })
        windows.push({
          position: [ele.longitude, ele.latitude],
          // offset: [5, -15], // 窗体偏移
          visible: false,
          content: `<div class="prompt">
                      <span class="title">${ele.travelTitle}</span>
                    </div>`
        })
      })
      this.markers = markers
      this.windows = windows
    },
    // 地图绑定鼠标右击事件——弹出右键菜单
    rightClickFun (e) {
      // console.log(e)
      // 创建右键菜单
      const menu = new VueAMap.ContextMenu(this.map)
      this.contextMenuPositon = null
      var content = []
      content.push("<div class='info context_menu'>")
      content.push("  <p onclick='menu.zoomMenu(0)'>缩小</p>")
      content.push("  <p class='split_line' onclick='menu.zoomMenu(1)'>放大</p>")
      content.push("  <p class='split_line' onclick='menu.distanceMeasureMenu()'>距离量测</p>")
      content.push("  <p onclick='menu.addMarkerMenu()'>添加标记</p>")
      content.push('</div>')
      // 通过content自定义右键菜单内容
      this.contextMenu = new VueAMap.ContextMenu({ isCustom: true, content: content.join('') })

      menu.contextMenu.open(this.map, e.lnglat)
      menu.contextMenuPositon = e.lnglat // 右键菜单位置

      // ContextMenu.prototype.zoomMenu = function zoomMenu (tag) { // 右键菜单缩放地图
      //   if (tag === 0) {
      //     map.zoomOut()
      //   }
      //   if (tag === 1) {
      //     map.zoomIn()
      //   }
      //   this.contextMenu.close()
      // }
      // ContextMenu.prototype.distanceMeasureMenu = function () { // 右键菜单距离量测
      //   // this.mouseTool.rule()
      //   this.contextMenu.close()
      // }
      // ContextMenu.prototype.addMarkerMenu = function () { // 右键菜单添加Marker标记
      //   // this.mouseTool.close()
      //   var marker = new AMap.Marker({
      //     map: map,
      //     position: this.contextMenuPositon // 基点位置
      //   })
      //   this.contextMenu.close()
      // }
      // menu.contextMenu.open(map, e.lnglat)
    }
  }
}
</script>

<style lang="scss">
.amap-page-container{
  .amap-demo {
    width: 1000px;
    height: 650px;
    margin: 0 auto;
    .amap-info-content{
      padding: 15px 25px;
    }
    .prompt {
      color: #333;
    }
    .amap-info-close{
      // display: none;
    }
  }
  .amap-controls{
    .amap-maptype-list{
      height: 33px!important;
    }
  }
}
</style>
