<template>
  <div class="tracking">
    <video id="video" width="318" height="300" preload autoplay loop muted></video>
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
      let tipFlag = true // 是否检测
      let faceflag = false // 是否进行拍照
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
        if (tipFlag) {
          if (event.data.length === 0) {
            // 未检测到人脸
            context.fillText('未检测到人脸', 150, 15)
          } else if (event.data.length === 1) { // 长度为多少代表检测到几张人脸
            // 检测到一张人脸
            // 给检测到的人脸绘制矩形
            event.data.forEach(function (rect) {
              faceflag = true
              context.font = '11px Helvetica'
              context.fillText('已识别到人脸', 150, 15)
              context.strokeStyle = '#ff4d4f'
              context.strokeRect(rect.x, rect.y, rect.width, rect.height) // 绘制矩形
              _this.x = rect.x
              _this.y = rect.y
              _this.w = rect.width
              _this.h = rect.height
            })
            if (faceflag) { // 检测到人脸进行拍照，延迟两秒
              tipFlag = false
              faceflag = false
              _this.$message.info('正在拍照，请勿乱动~')
              setTimeout(() => {
                _this.submit() // 拍照
              }, 2000)
            }
          } else {
            // 检测到多张人脸
            _this.$message.info('只可一人进行人脸识别！')
            return
          }
        }
      })
    },
    submit () {
      const that = this
      const canvas = document.getElementById('canvas')
      const context = canvas.getContext('2d')
      const video = document.getElementById('video')
      setTimeout(function () {
        // context.drawImage(video, (that.x + that.w), (that.y + that.h), (that.x + that.w), (that.y + that.h), (that.x), that.y, (that.w), (that.h))
        context.drawImage(video, (that.x + that.w), (that.y + that.h),  (that.x + that.w), (that.y + that.h), 0, 0,  (that.x + that.w), (that.y + that.h))
        // context.drawImage(video, that.x, that.y,  120, 120, 0, 0, 120, 120)
        const dataUrl = canvas.toDataURL('image/png')
        console.log('dataUrl----', dataUrl)
        that.dataUrl = dataUrl
      }, 1000)
      // context.drawImage(video, 0, 0, 500, 400)
      canvas.toBlob((blob) => {
        console.log(blob)
        // axios.post({ faceUrl: URL.createObjectURL(blob) }).then(res => {
        //   let type = 'success'
        //   // 登录成功跳转到首页
        //   if (res.data.code === 200) {
        //     that.$router.push({ path: '/' })
        //   }
        //   // 登录失败重新进行人脸检测
        //   else {
        //     type = 'error'
        //     // setTimeout(() => {
        //     //   flag = true
        //     // }, 1500)
        //   }
        //   that.$message({
        //     message: res.data.message,
        //     type,
        //     center: true
        //   })
        // })
      })
    },
    // getCompetence () {
    //   let flag = true
    //   const _this = this
    //   const video = this.mediaStreamTrack = document.getElementById('videoCamera-face')
    //   const canvas = document.getElementById('canvas')
    //   const context = canvas.getContext('2d')

    //   const tracker = new window.tracking.ObjectTracker('face')
    //   tracker.setInitialScale(4)
    //   tracker.setStepSize(2)
    //   tracker.setEdgesDensity(0.1)
    //   // 启动摄像头初始化
    //   this.trackerTask = tracking.track('#videoCamera-face', tracker, {
    //     camera: true
    //   })
    //   tracker.on('track', function (event) {
    //     console.log(event)
    //     context.clearRect(0, 0, canvas.width, canvas.height)
    //     event.data.forEach(function (rect) {
    //       context.strokeStyle = '#ff0000'
    //       context.strokeRect(rect.x, rect.y, rect.width, rect.height)
    //     })
    //     if (event.data.length) {
    //       // 会不停的去检测人脸，所以这里需要做个锁
    //       if (flag) {
    //         // 裁剪出人脸并绘制下来
    //         const canvasUpload = document.getElementById('canvas-face-upload')
    //         const contextUpload = canvasUpload.getContext('2d')
    //         contextUpload.drawImage(video, 0, 0, 105, 105)
    //         flag = false
    //         // 人脸的basa64
    //         const dataURL = canvasUpload.toDataURL('image/jpeg')
    //         console.log(dataURL)
    //         // ajax请求
    //         // _this.$store.dispatch('LoginByFaceID', {
    //         //     face_img: dataURL.slice(23) // 我们后台需要的basa64不要前缀
    //         // }).then(res => {
    //         //     let type = 'success'
    //         //     // 登录成功跳转到首页
    //         //     if (res.data.code === 200) {
    //         //         _this.$router.push({
    //         //             path: '/'
    //         //         });
    //         //     }
    //         //     // 登录失败重新进行人脸检测
    //         //     else {
    //         //         type = 'error'
    //         //         setTimeout(() => {
    //         //             flag = true
    //         //         }, 1500)
    //         //     }
    //         //     _this.$message({
    //         //         message: res.data.message,
    //         //         type,
    //         //         center: true
    //         //     });
    //         // }).catch(error => {
    //         //     console.log(error)
    //         // })
    //       }
    //     }
    //   })
    // },
    destroyed () {
      // console.log('销毁')
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
    max-width: 120px;
    margin-bottom: 20px;
    border: 1px solid #ededed;
  }
}
</style>
