<template>
  <div>
    <div style="text-align:center;margin-bottom:20px;">
      <el-button type="primary" id="capture" @click="catchPhoto">点击拍照</el-button>
    </div>
    <video id="videoCamera-face" controls></video>
    <canvas id="canvas" width="400" height="320"></canvas>
    <canvas id="canvas-face-upload" width="400" height="320"></canvas>
  </div>
</template>

<script>
import { tracking } from '@/assets/js/tracking-min.js'
import '@/assets/js/face-min.js'
export default {
  data () {
    return {
      trackerTask: null,
      trackering: null,
      mediaStreamTrack: null
    }
  },
  mounted () {
    // this.getPhoto()
    this.getCompetence()
  },
  methods: {
    getCompetence() {
      let flag = true;
      const _this = this;
      const video = this.mediaStreamTrack = document.getElementById('videoCamera-face');
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');

      const tracker = new window.tracking.ObjectTracker('face');
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);
      // 启动摄像头初始化
      this.trackerTask = tracking.track('#videoCamera-face', tracker, {
        camera: true
      })
      tracker.on('track', function(event) {
        console.log(event)
        context.clearRect(0, 0, canvas.width, canvas.height);
        event.data.forEach(function(rect) {
          context.strokeStyle = '#ff0000';
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
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
        navigator.mediaDevices.getUserMedia = function(constraints) {
          // 首先，如果有getUserMedia的话，就获得它
          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia
          // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
          if (!getUserMedia) {
            return Promise.reject(new Error('对不起，您的浏览器暂不支持该功能'))
          }
          // 否则，为老的navigator.getUserMedia方法包裹一个Promise
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          })
        }
      }
      navigator.mediaDevices.getUserMedia({video : {width: 400, height: 320}}).then(function(stream) {
        var video = document.querySelector('videoCamera-face')
        // 旧的浏览器可能没有srcObject
        if ("srcObject" in video) {
          video.srcObject = stream
        } else {
          // 防止在新的浏览器里使用它，应为它已经不再支持了
          video.src = window.URL.createObjectURL(stream)
        }
        video.onloadedmetadata = function(e) {
          video.play()
        }
        // stream.getTracks().forEach(track => track.stop()) // 关闭相机
      }).catch(function(err) {
        console.log(err.name + ": " + err.message);
      })
    },
    catchPhoto () {
      let canvas = document.getElementById('canvas')
      let context = canvas.getContext('2d')
      let video = document.querySelector('videoCamera-face')
      context.drawImage(video, 0, 0, 400, 320);
    },
    destroyed () {
      if(!this.mediaStreamTrack){
        return
      }
      // 关闭摄像头和侦测
      this.mediaStreamTrack.srcObject.getTracks()[0].stop();
      this.trackerTask.stop()
    }
  }
}
</script>

<style>
video{
  position: fixed;
  left: 0;
  top: 0;
  width: 20%;
}
</style>