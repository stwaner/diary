<template>
  <div>
    <div class="amap-page-container">
      <!-- :plugin="plugin"  -->
      <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :events="events" class="amap-demo">
        <!-- 覆盖物 - 圆 -->
        <el-amap-circle
          v-for="(circle, i) in circles"
          :key="i"
          :center="circle.center"
          :radius="circle.radius"
          :fillColor="circle.fillColor"
          :strokeColor="circle.strokeColor"
          :strokeOpacity="circle.strokeOpacity"
          :strokeWeight="circle.strokeWeight"
        ></el-amap-circle>
        <!-- <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker> -->
        <!-- <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window> -->
      </el-amap>
      <!-- <div class="toolbar">
        <p v-if="loaded">
          location: lng = {{ lng }} lat = {{ lat }}
        </p>
        <p v-else>正在定位...</p>
      </div> -->
    </div>
  </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap'
const amapManager = new AMapManager()

export default {
  name: 'amap',
  data () {
    const self = this
    return {
      map: null,
      amapManager,
      center: [121.59996, 31.197646],
      zoom: 18,
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
      markers: [],
      windows: [],
      window: '',
      lng: 0,
      lat: 0,
      loaded: false,
      events: {
        // 地图初始化
        init (o) {
          // 兼容高德地图
          lazyAMapApiLoaderInstance.load().then(() => {
            self.initMap()
            // self.initMarker()
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
      // plugin: [
      //   'ToolBar',
      //   'Scale',
      //   {
      //     pName: 'MapType', // 图层切换，用于几个常用图层切换显示
      //     defaultType: 0,
      //     events: {
      //       init (o) {
      //       }
      //     }
      //   }, {
      //     pName: 'Geolocation', // 定位，提供了获取用户当前准确位置、所在城市的方法
      //     events: {
      //       init (o) {
      //         // o 是高德地图定位插件实例
      //         o.getCurrentPosition((status, result) => {
      //           if (result && result.position) {
      //             self.lng = result.position.lng
      //             self.lat = result.position.lat
      //             self.center = [self.lng, self.lat]
      //             self.loaded = true
      //             self.$nextTick()
      //           }
      //         })
      //       }
      //     }
      //   }
      // ]
    }
  },
  created () {
    // this.initMarker()
  },
  methods: {
    initMap () {
      this.map = amapManager.getMap() // 地图实例

      // 地图初始化完成回调
      this.$emit('callbackComponent', {
        function: 'loadMap'
      })

      // 浏览器定位
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：5s
        buttonPosition:'RB',    //定位按钮的停靠位置
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
        markerOptions: {
          content: ' '
        }
      })
      this.map.addControl(geolocation)
      geolocation.getCurrentPosition((status,result)=>{
        if(status=='complete'){
          const lng = result.position.lng
          const lat = result.position.lat
          this.circles[0].center = [lng, lat]
          // onComplete(result)
        }else{
          // onError(result)
          this.$message.err('定位失败')
        }
      })
      
      // this.selfLocation()
    },
    // 自身定位
    // selfLocation () {
    //   SelfLocation({
    //     map: this.map,
    //     complete: (val) => this.onComplete(val)
    //   })
    // },
    // onComplete (data) {
    //   const lng = data.position.lng
    //   const lat = data.position.lat
    //   console.log(lng, lat)
    // },
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
    height: 600px;
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
