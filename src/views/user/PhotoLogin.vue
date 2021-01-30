<template>
  <div class="tracking">
      <video id="video" width="318" height="270" preload autoplay loop muted></video>
      <canvas id="canvas" width="318" height="270" ></canvas>
      <div style="text-align:center;">
        <img :src="dataUrl" alt="" id="img1">
      </div>
      <div class="buttonDiv">
        <el-button type="primary" @click="openCamera">重新拍照</el-button>
      </div>
    x: {{x}} - y: {{y}}<br/>
    w: {{w}} - h: {{h}}
  </div>
</template>

<script>
import tracking from '../../assets/js/tracking-min.js'
import '../../assets/js/face-min.js'
export default {
  name: 'testTracking',
  data () {
    return {
      trackerTask: null,
      trackering: null,
      mediaStreamTrack: null,
      dataUrl: '',
      loginSucc: false,
      x: 0,
      y: 0,
      w: 0,
      h: 0
    }
  },
  mounted () {
    // this.getCompetence()
    this.openCamera()
  },
  methods: {
    openCamera () {
      let faceflag = false // 是否进行拍照
      let isCheck = true // 是否检测
      const _this = this
      var video = document.getElementById('video')
      var canvas = document.getElementById('canvas')
      var context = canvas.getContext('2d')
      // 使用监听人脸的包
      const tracker = new window.tracking.ObjectTracker('face')
      tracker.setInitialScale(4)
      tracker.setStepSize(2)
      tracker.setEdgesDensity(0.1)
      // 启动摄像头初始化
      this.trackerTask = window.tracking.track('#video', tracker, { camera: true })
      // 创建监听 每帧都会触发
      tracker.on('track', function (event) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        if (isCheck) {
          if (event.data.length === 0) {
            // 未检测到人脸
            context.fillText('未检测到人脸，请对准摄像头', 150, 15)
          } else if (event.data.length === 1) { // 长度为多少代表检测到几张人脸
            // 给检测到的人脸绘制矩形
            event.data.forEach(function (rect) {
              faceflag = true
              context.strokeStyle = '#a64ceb'
              context.font = '11px Helvetica'
              context.strokeRect(rect.x, rect.y, rect.width, rect.height) // 绘制矩形
              context.fillText('已识别到人脸', 150, 15)
              // context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11)
              // context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22)
              _this.x = rect.x
              _this.y = rect.y
              _this.w = rect.width
              _this.h = rect.height
            })
            if (faceflag) { // 检测到人脸进行拍照，延迟1秒
              isCheck = false
              faceflag = false
              _this.$message.info('正在拍照，请勿乱动~')
              setTimeout(() => {
                _this.submit() // 拍照
              }, 1000)
            }
          } else {
            // 检测到多张人脸
            _this.$message.info('只可一人进行人脸识别！')
          }
        }
      })
    },
    submit () {
      const that = this
      const canvas = document.getElementById('canvas')
      const context = canvas.getContext('2d')
      const video = document.getElementById('video')
      // setTimeout(function () {
      // context.drawImage(video, (that.x + that.w), (that.y + that.h), (that.x + that.w), (that.y + that.h), (that.x), that.y, (that.w), (that.h))
      context.drawImage(video, (that.x + that.w), (that.y + that.h), (that.x + that.w), (that.y + that.h), 0, 0, that.x, that.y)
      const dataUrl = canvas.toDataURL('image/png')
      that.dataUrl = dataUrl
      console.log(dataUrl)
      // }, 1000)
      // that.$store.dispatch('LoginByFaceID', { face_img: dataURL.slice(23) }).then(res => {
      //   let type = 'success'
      //   if (res.code === 200) {
      //     that.$router.push({ path: '/' })
      //   } else { // 登录失败重新进行人脸检测
      //     type = 'error'
      //     setTimeout(() => {
      //       that.isCheck = false
      //       that.faceflag = true
      //     }, 1500)
      //   }
      //   that.$message({
      //     message: res.message,
      //     type,
      //     center: true
      //   })
      // }).catch(error => {
      //   console.log(error)
      // })
      // canvas.toBlob((blob) => {
      // console.log(blob)
      // axios.post({ faceUrl: URL.createObjectURL(blob) }).then(res => {
      // })
    // })
    },
    destroyed () {
      console.log('销毁')
      // // 停止侦测
      // this.trackerTask.stop()
      // // 关闭摄像头
      // this.trackerTask.closeCamera()
    }
  }
}
</script>

<style lang="scss">
.tracking {
  width: 100%;
  position: relative;
  video{
    position: relative;
    margin-left: 40px;
  }
  canvas{
    position: absolute;
    left: 40px;
    top: 0;
  }
  .buttonDiv {
    bottom: 10px;
    text-align: center;
  }
  img{
    display: inline-block;
    // max-width: 120px;
    margin-bottom: 20px;
    // border: 1px solid #ededed;
  }
}
</style>
