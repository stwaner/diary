<template>
  <div class="tracking">
    <video id="video" width="318" height="270" preload autoplay loop muted></video>
    <canvas id="canvas" width="318" height="270" ></canvas>
    <img :src="dataUrl" alt="" id="img1">
    <div class="buttonDiv">
      <el-button type="primary" @click="submit">上传照片</el-button>
      <el-button type="primary" @click="openCamera">点击拍照</el-button>
    </div>
  </div>
</template>

<script>
import 'tracking/build/tracking-min.js'
import 'tracking/build/data/face-min.js'
// import 'tracking/examples/assets/stats.min.js'
// require('tracking/build/tracking-min.js')
// require('tracking/build/data/face-min.js')
// require('tracking/examples/assets/stats.min.js')
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
    // this.getPhoto()
    // this.getCompetence()
    this.openCamera()
  },
  methods: {
    openCamera () {
      let tipFlag = false // 是否检测
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
      console.log(tracker)
      // 创建监听 每帧都会触发
      tracker.on('track', function (event) {
        console.log(event)
        context.clearRect(0, 0, canvas.width, canvas.height)
        if (!tipFlag) {
          if (event.data.length === 0) {
            // 未检测到人脸
            if (!faceflag) {
              console.log('未检测到人脸')
            }
          } else if (event.data.length === 1) { // 长度为多少代表检测到几张人脸
            // 检测到一张人脸
            if (!tipFlag) {
              console.log('识别成功，正在拍照，请勿乱动~')
              // 给检测到的人脸绘制矩形
              event.data.forEach(function (rect) {
                // console.log(rect)
                context.font = '11px Helvetica'
                context.fillText('已识别到人脸', 100, 40)
                context.strokeStyle = '#ff0000'
                context.strokeRect(rect.x, rect.y, rect.width, rect.height)
                _this.x = rect.x
                _this.y = rect.y
                _this.w = rect.width
                _this.h = rect.height
              })
              if (!faceflag) { // 检测到人脸进行拍照，延迟两秒
                faceflag = true
                setTimeout(() => {
                  this.submit() // 拍照
                  tipFlag = true
                }, 2000)
              }
            }
          } else {
            // 检测到多张人脸
            if (!faceflag) {
              console.log('只可一人进行人脸识别！')
            }
          }
        }
      })
      console.log(222)
    },
    submit () {
      const that = this
      const canvas = document.getElementById('canvas')
      const context = canvas.getContext('2d')
      const video = document.getElementById('video')
      setTimeout(function () {
        context.drawImage(video, (that.x + that.w), (that.y + that.h), (that.x + that.w), (that.y + that.h), (that.x), that.y, (that.w), (that.h))
        const dataUrl = canvas.toDataURL('image/png')
        console.log(dataUrl)
        that.dataUrl = dataUrl
      }, 1000)
      context.drawImage(video, 0, 0, 500, 400)
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
    getCompetence () {
      let flag = true
      const _this = this
      const video = this.mediaStreamTrack = document.getElementById('videoCamera-face')
      const canvas = document.getElementById('canvas')
      const context = canvas.getContext('2d')

      const tracker = new window.tracking.ObjectTracker('face')
      tracker.setInitialScale(4)
      tracker.setStepSize(2)
      tracker.setEdgesDensity(0.1)
      // 启动摄像头初始化
      this.trackerTask = tracking.track('#videoCamera-face', tracker, {
        camera: true
      })
      tracker.on('track', function (event) {
        console.log(event)
        context.clearRect(0, 0, canvas.width, canvas.height)
        event.data.forEach(function (rect) {
          context.strokeStyle = '#ff0000'
          context.strokeRect(rect.x, rect.y, rect.width, rect.height)
        })
        if (event.data.length) {
          // 会不停的去检测人脸，所以这里需要做个锁
          if (flag) {
            // 裁剪出人脸并绘制下来
            const canvasUpload = document.getElementById('canvas-face-upload')
            const contextUpload = canvasUpload.getContext('2d')
            contextUpload.drawImage(video, 0, 0, 105, 105)
            flag = false
            // 人脸的basa64
            const dataURL = canvasUpload.toDataURL('image/jpeg')
            console.log(dataURL)
            // ajax请求
            // _this.$store.dispatch('LoginByFaceID', {
            //     face_img: dataURL.slice(23) // 我们后台需要的basa64不要前缀
            // }).then(res => {
            //     let type = 'success'
            //     // 登录成功跳转到首页
            //     if (res.data.code === 200) {
            //         _this.$router.push({
            //             path: '/'
            //         });
            //     }
            //     // 登录失败重新进行人脸检测
            //     else {
            //         type = 'error'
            //         setTimeout(() => {
            //             flag = true
            //         }, 1500)
            //     }
            //     _this.$message({
            //         message: res.data.message,
            //         type,
            //         center: true
            //     });
            // }).catch(error => {
            //     console.log(error)
            // })
          }
        }
      })
    },
    // h5拍照
    getPhoto () {
      // 老的浏览器可能根本没有实现 mediaDevices，所以我们可以先设置一个空的对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {}
      }
      // 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia
      // 因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          // 首先，如果有getUserMedia的话，就获得它
          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia
          // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
          if (!getUserMedia) {
            return Promise.reject(new Error('对不起，您的浏览器暂不支持该功能'))
          }
          // 否则，为老的navigator.getUserMedia方法包裹一个Promise
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject)
          })
        }
      }
      navigator.mediaDevices.getUserMedia({ video: { width: 400, height: 320 } }).then(function (stream) {
        var video = document.querySelector('videoCamera-face')
        // 旧的浏览器可能没有srcObject
        if ('srcObject' in video) {
          video.srcObject = stream
        } else {
          // 防止在新的浏览器里使用它，应为它已经不再支持了
          video.src = window.URL.createObjectURL(stream)
        }
        video.onloadedmetadata = function (e) {
          video.play()
        }
        // stream.getTracks().forEach(track => track.stop()) // 关闭相机
      }).catch(function (err) {
        console.log(err.name + ': ' + err.message)
      })
    },
    destroyed () {
      console.log('销毁')
      // 停止侦测
      this.trackerTask.stop()
      // 关闭摄像头
      this.trackerTask.closeCamera()
    }
  }
}
</script>

<style lang="scss">
video{
  position: fixed;
  left: 0;
  top: 0;
  // width: 20%;
  border: 1px solid;
}
.tracking {
  width: 100%;
  text-align: center;
  position: relative;
  .buttonDiv {
    bottom: 10px;
  }
  img{
    display: inline-block;
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
    border: 1px solid #ededed;
  }
}
</style>
