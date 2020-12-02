<template>
  <div>
    <!-- 8d168cf9262841cf32d4e72fbfd49c49 -->
    <div class="amap-page-container">
      <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :events="events" class="amap-demo">
        <!-- <el-amap-marker vid="component-marker" :position="componentMarker.position" :content-render="componentMarker.contentRender" ></el-amap-marker> -->
        <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
      </el-amap>
      <div class="toolbar">
        <button @click="getMap()">get map</button>
      </div>
    </div>
  </div>
</template>

<script>
import VueAMap from 'vue-amap'
const amapManager = new VueAMap.AMapManager()
export default {
  name: 'demo',
  data () {
    return {
      amapManager,
      zoom: 12,
      center: [116.512782, 39.792023],
      markers: [
        {
          position: [116.512782, 39.792023],
          events: {
            click: () => {
              alert('click marker')
            },
            // 点标记拖拽移动结束触发事件
            dragend: (e) => {
              console.log('---event---: dragend', e.lnglat.lng, e.lnglat.lat)
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
            }
          },
          visible: true,
          draggable: true,
          template: '<span>1</span>'
        }
      ],
      events: {
        init: (o) => {
          console.log(this.$refs.map.$$getCenter())
          console.log(this.$refs.map.$$getInstance())
          o.getCity(result => {
            console.log(result)
          })
        },
        moveend: () => {
        },
        zoomchange: () => {
        },
        click: (e) => {
          alert('map clicked')
        }
      },
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
        events: {
          init (o) {
            console.log(o)
          }
        }
      }]
    }
  },
  methods: {
    getMap () {
      // amap vue component
      console.log(amapManager._componentMap)
      // gaode map instance
      console.log(amapManager._map)
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
  }
}
</style>
