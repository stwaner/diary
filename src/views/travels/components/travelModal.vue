<template>
  <el-dialog
    custom-class="amap-dialog"
    :title="null"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="() => { dialogVisible=false }">
    <el-form :model="form" ref="ruleForm" :rules="rules">
      <el-form-item label="游记标题" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="游记心得" :label-width="formLabelWidth" prop="note">
        <el-input v-model="form.note" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
        <div id="travle-map"></div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        name: '',
        note: '',
        citycode: '',
        address: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入游记主题', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        note: [
          { required: true, message: '请输入游记心得', trigger: 'blur' }
        ]
      },
      formLabelWidth: '90px'
    }
  },
  methods: {
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {}
          data.userId = _this.$store.state.login.userInfo.userId || _this.userId
          data.longitude = _this.lnglat[0]
          data.latitude = _this.lnglat[1]
          data.travelTitle = _this.form.name
          data.travelNote = _this.form.note
          data.citycode = _this.form.citycode
          saveTravel(data).then(res => {
            console.log(res)
            if (res.code === 200) {
              var marker = new AMap.Marker({
                map: _this.map,
                position: _this.contextMenuPositon // 基点位置
              })
              _this.dialogVisible = false
              _this.$emit('updateData')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
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