<template>
  <div>
    <div class="amap-page-container">
      <div id="container" class="amap-container"></div>
    </div>
    <el-dialog
      custom-class="amap-dialog"
      :title="null"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="() => { dialogVisible=false }">
      <el-form :model="form">
        <el-form-item label="游记标题" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="游记心得" :label-width="formLabelWidth">
          <el-input v-model="form.note" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AMap from 'AMap' // 引入高德地图
import { SelfLocation } from '../amap/location'
import { saveTravel } from '../../api/travel'

export default {
  name: 'amap',
  data () {
    return {
      map: null,
      infoWindow: null,
      contextMenu: null,
      contextMenuPositon: null,
      lnglat: [0, 0],
      dialogVisible: false,
      form: {
        name: '',
        note: ''
      },
      formLabelWidth: '90px'
    }
  },
  computed: {
    userId () {
      return (JSON.parse(window.localStorage.getItem('userInfo'))).userId
    }
  },
  props: {
    markers: Array
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const _this = this
      this.map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 10
      })
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
        _this.map.addControl(new AMap.ToolBar())
        _this.map.addControl(new AMap.Scale())
      })
      // 地图加载完后
      this.map.on('complete', function () {
        _this.selfLocation()
        _this.getMarkers()
        // 创建右键菜单
        _this.contextMenu = new AMap.ContextMenu()
        _this.openRightMenu()
      })
      // 地图绑定鼠标右击事件——弹出右键菜单
      this.map.on('rightclick', function (e) {
        _this.lnglat = [e.lnglat.lng, e.lnglat.lat]
        _this.contextMenu.open(_this.map, e.lnglat)
        _this.contextMenuPositon = e.lnglat
      })
    },
    // 右键菜单
    openRightMenu () {
      const _this = this
      // 右键添加Marker标记
      this.contextMenu.addItem('添加标记', function (e) {
        _this.dialogVisible = true
        // const data = {}
        // data.userId = _this.$store.state.login.userInfo.userId || this.userId
        // data.longitude = _this.lnglat[0]
        // data.latitude = _this.lnglat[1]
        // data.travelTitle = '嘿嘿'
        // data.travelNote = '嘿嘿'
        // saveTravel(data).then(res => {
        //   console.log(res)
        //   if (res.code === 200) {
        //     var marker = new AMap.Marker({
        //       map: _this.map,
        //       position: _this.contextMenuPositon // 基点位置
        //     })
        //   }
        // })
      }, 0)
      // 右键放大
      this.contextMenu.addItem('放大一级', function () {
        _this.map.zoomIn()
      }, 1)
      // 右键缩小
      this.contextMenu.addItem('缩小一级', function () {
        _this.map.zoomOut()
      }, 2)
      // 右键显示全国范围
      this.contextMenu.addItem('缩放至全国范围', function (e) {
        _this.map.setZoomAndCenter(4, [108.946609, 34.262324])
      }, 3)
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
    // 获取覆盖物
    getMarkers () {
      // 创建信息窗体
      this.infoWindow = new AMap.InfoWindow({
        closeWhenClickMap: true, // 当点击地图时关闭窗体
        offset: new AMap.Pixel(0, -35) // 偏移
      })
      var markers = []
      for (var i = 0; i < this.markers.length; i++) {
        var item = this.markers[i]
        // 创建点实例
        var marker = new AMap.Marker({
          position: new AMap.LngLat(item.longitude, item.latitude),
          label: { content: i + 1, offset: new AMap.Pixel(0, -6), direction: 'center' },
          title: item.travelTitle,
          clickable: true,
          animation: 'AMAP_ANIMATION_DROP',
          extData: {
            id: i + 1
          }
        })
        marker.content = `<p class="name">${item.travelTitle}</p>` // 给信息窗体设置显示内容
        marker.on('click', this.markerClick)
        marker.emit('click', { target: marker })
        markers.push(marker)
      }
      // 创建覆盖物群组，并将 marker 传给 OverlayGroup
      var overlayGroups = new AMap.OverlayGroup(markers)
      this.map.add(overlayGroups)
    },
    // 点击显示信息窗体
    markerClick (e) {
      this.infoWindow.setContent(e.target.content)
      this.infoWindow.open(this.map, e.target.getPosition())
      // this.map.setFitView() //自适应
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
.amap-page-container {
  .amap-container{
    width: 1000px;
    height: 600px;
    margin: 0 auto;
  }
  .amap-marker-label{
    background-color: transparent;
    border: none;
    color: #fff;
    padding: 0;
    cursor: pointer;
  }
  .amap-info-content{
    .name{
      padding: 5px 15px;
    }
    .amap-info-close{
      right: 10px!important;
    }
  }
  .amap-menu{
    li{
      margin-bottom: 0;
    }
  }
}
.amap-dialog{
  .el-dialog__header{
    display: none;
  }
  .el-dialog__body{
    padding-bottom: 0;
    .el-form-item{
      .el-form-item__label{
        text-align: left;
      }
    }
  }
}
</style>
