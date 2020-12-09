<template>
  <div>
    <div class="amap-page-container">
      <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :events="events" :plugin="plugin" class="amap-demo">
        <!-- 覆盖物 - 圆 - 当前位置 -->
        <el-amap-circle
          v-for="(circle, i) in circles"
          :key="'circle'+i"
          :center="circle.center"
          :radius="circle.radius"
          :fillColor="circle.fillColor"
          :strokeColor="circle.strokeColor"
          :strokeOpacity="circle.strokeOpacity"
          :strokeWeight="circle.strokeWeight"
        ></el-amap-circle>
        <el-amap-marker
          v-for="(marker, m) in markers"
          :key="'marker'+m"
          :position="marker.position"
          :events="marker.events"
          :visible="marker.visible"
          :draggable="marker.draggable"
          :content="marker.content"
          :label="marker.markerLabel"
          :title="marker.travelTitle"
          :vid="'marker'+m"
        ></el-amap-marker>
        <el-amap-info-window v-if="!JSON.stringify(promptInfo) === '{}'" :position="promptInfo.position" :visible="promptInfo.visible" :content="promptInfo.content" :closeWhenClickMap="closeWhenClickMap"></el-amap-info-window>
      </el-amap>
      <nav-bar />
    </div>
  </div>
</template>

<script>
import navBar from './navbar.vue'
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap'
import { SelfLocation } from './location'
const amapManager = new AMapManager()

export default {
  name: 'amap',
  props: {
    markers: {
      type: Array,
      default: []
    },
    prompt: {
      type: Array,
      default: []
    },
    promptInfo: {
      type: Object
    }
  },
  data () {
    const self = this
    return {
      map: null,
      amapManager,
      center: [121.59996, 31.197646],
      zoom: 13,
      closeWhenClickMap: true,
      circles: [
        {
          center: [0, 0],
          radius: "4",
          fillColor: "#393e43",
          strokeColor: "#393e43",
          strokeOpacity: "0.2",
          strokeWeight: "30"
        }
      ],
      // contextMenuPositon: null,
      events: {
        // 地图初始化
        init (o) {
          // 兼容高德地图
          lazyAMapApiLoaderInstance.load().then(() => {
            self.initMap()
          })
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
        }
      ]
    }
  },
  components: { navBar },
  watch: {
    '$store.state.location.selfLocation'(val) {
      this.selfLocation()
    }
  },
  methods: {
    initMap () {
      this.map = amapManager.getMap() // 地图实例
      // 地图初始化完成回调
      this.$emit('callbackComponent', {
        function: 'loadMap'
      })
      setTimeout(() => {
        this.selfLocation()
      }, 100);
    },
    // 自身定位
    selfLocation () {
      console.log('定位中................')
      SelfLocation({
        map: this.map,
        complete: (val) => this.onComplete(val),
        error: (err) => this.onError(err)
      })
    },
    onComplete (data) {
      const lng = data.position.lng
      const lat = data.position.lat
      this.circles[0].center = [lng, lat]
    },
    onError (err) {
      this.$message.error('定位失败')
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
  position: relative;
  .amap-demo {
    width: 1000px;
    height: 600px;
    margin: 0 auto;
    .amap-info-content{
      padding: 15px 25px;
    }
    .prompt {
      color: #333;
    }
    .amap-marker-label{
      left: 17px !important;
      background: transparent;
      color: #fff;
      border: none;
      font-size: 15px;

    }
  }
  .location-navbar{
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    text-align: center;
  }
  .amap-controls{
    .amap-maptype-list{
      height: 33px!important;
    }
  }
}
</style>
