<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix">
      <a href="javascript:;" @click="goBack"> <i class="el-icon-arrow-left"></i> 游记列表</a>
    </div>
    <div class="text item">
      <div class="Learn-update-wrapper">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="游记主图" prop="travelImg">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="游记主题" prop="travelTitle">
            <el-input v-model="ruleForm.travelTitle" :value="travelObj.travelTitle"></el-input>
          </el-form-item>
          <el-form-item label="游记心得" prop="travelNote">
            <el-input v-model="ruleForm.travelNote" :value="travelObj.travelNote"></el-input>
          </el-form-item>
          <el-form-item label="游记地址">
            <city-Select @hasChange="handleChange" :addressCode="ruleForm.addressCode"></city-Select>
          </el-form-item>
          <el-form-item label="游记标签">
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
          </el-form-item>
          <el-form-item label="游记内容" prop="travelHtml">
            <editor @input="inputChange" :value="ruleForm.travelHtml"></editor>
          </el-form-item>
          <el-form-item label="游记地址" prop="address">
            <div class="map-wrap">
              <div id="travle-map"></div>
            </div>
          </el-form-item>
          <el-form-item style="text-align:center;">
            <el-button type="info" @click="selfLocation">获取我的位置</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="$router.go(-1)">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-card>
</template>

<script>
import { traveDetail, saveTravel } from '@/api/travel.js'
import { getQueryString } from '@/utils/getUrlValue'
import { SelfLocation } from '../amap/location'
import Editor from '../../components/in_editor/index.vue'
import citySelect from '@/components/CitySelect.vue'

export default {
  data () {
    return {
      map: null,
      travelId: getQueryString('travelId'),
      travelObj: {},
      imageUrl: '',
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      center: [],
      ruleForm: {
        travelImg: '',
        travelTitle: '',
        travelNote: '',
        travelHtml: '',
        addressCode: []
      },
      rules: {
        travelImg: [{ required: true, message: '请输入游记主图', trigger: 'blur' }],
        travelTitle: [
          { required: true, message: '请输入游记主题', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        travelNote: [
          { required: true, message: '请填写游记心得', trigger: 'blur' }
        ],
        travelHtml: [
          { required: true, message: '请填写学习内容', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    userId () {
      return (JSON.parse(window.localStorage.getItem('userInfo'))).userId
    }
  },
  created () {
    this.getTravelDetail(this.init)
  },
  components: { citySelect, Editor },
  methods: {
    init () {
      const _this = this
      this.map = new AMap.Map('travle-map', {
        resizeEnable: true,
        center: _this.center,
        zoom: 15
      })
      // 地图加载完后
      this.map.on('complete', function () {
        // 创建一个 Marker 实例：
        var marker = new AMap.Marker({
          position: _this.map.getCenter(),
          title: _this.travelObj.provinceName ? _this.travelObj.provinceName : '' + ' ' + _this.travelObj.cityName ? _this.travelObj.cityName : '',
          draggable: true,
          cursor: 'move'
        })
        // 将创建的点标记添加到已有的地图实例：
        _this.map.add(marker)
        marker.on('dragend', _this.markerDraged)
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    markerDraged (e) {
      const lnglat = e.lnglat
      this.center = [ lnglat.lng, lnglat.lat]
    },
    handleChange (value) {
      this.travelObj.provinceCode = value[0]
      this.travelObj.cityCode = value[1]
    },
    inputChange (val) {
      this.ruleForm.travelHtml = val
    },
    async getTravelDetail (callback) {
      const res = await traveDetail({ travelId: this.travelId, userId: this.$store.state.login.userInfo.userId || this.userId })
      if (res.code === 200) {
        this.travelObj = res.data
        this.center = [res.data.longitude, res.data.latitude]
        this.initData()
        callback && callback()
      }
    },
    initData () {
      this.ruleForm.travelImg = this.travelObj.travelImg
      this.ruleForm.travelTitle = this.travelObj.travelTitle
      this.ruleForm.travelNote = this.travelObj.travelNote
      this.ruleForm.travelHtml = this.travelObj.travelHtml
      this.ruleForm.addressCode = [this.travelObj.provinceCode, this.travelObj.cityCode]
      for (const key in this.travelObj.label) {
        this.dynamicTags.push(this.travelObj.label[key].labelContext)
      }
    },
    // 获取定位
    selfLocation () {
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
      // this.getLngLatLocation()
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    submitForm (formName) {
      this.$refs[formName].validate(async (valid, values) => {
        if (valid) {
          const data = {}
          let msg = ''
          data.userId = this.$store.state.login.userInfo.userId || this.userId
          data.travelImg = this.ruleForm.travelImg
          data.travelTitle = this.ruleForm.travelTitle
          data.travelNote = this.ruleForm.travelNote
          data.travelHtml = this.ruleForm.travelHtml
          data.tag = this.dynamicTags.join(',')
          data.longitude = this.center[0]
          data.latitude = this.center[1]
          data.cityCode = this.travelObj.cityCode
          data.provinceCode = this.travelObj.provinceCode
          console.log(data)
          if (this.travelId) {
            data.travelId = this.travelId
            msg = '修改成功'
          } else {
            msg = '添加成功'
          }
          console.log(data)
          const res = await saveTravel(data)
          if (res.code === 200) {
            this.$message.success(msg)
            this.$router.go(-1)
          } else {
            this.$message.error(res.msg)
          }
        } else {
          return false
        }
      })
    },
    goBack () {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="scss">
.map-wrap{
  padding: 10px;
  border: 1px solid #DCDFE6;
}
#travle-map{
  width: 100%;
  height: 350px;
  .amap-icon{
    img {
      width: 32px;
    }
  }
}
.el-form-item__content{
  .el-tag{
    margin-right: 12px;
  }
}
</style>