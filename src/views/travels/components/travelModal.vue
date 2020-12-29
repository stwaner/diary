<template>
  <el-dialog
    custom-class="amap-dialog"
    :title="null"
    :close-on-click-modal="false"
    :visible="dialogVisible"
    width="40%"
    :before-close="handleClose">
    <el-form :model="form" ref="ruleForm" :rules="rules">
      <el-form-item label="游记标题" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" placeholder="请输入" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="游记心得" :label-width="formLabelWidth" prop="note">
        <el-input v-model="form.note" placeholder="请输入" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="游记地址" :label-width="formLabelWidth">
        <city-Select @hasChange="handleChange"></city-Select>
        <p class="tips">如果输入了地址，最终将会以该地址进行显示</p>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import citySelect from '@/components/CitySelect.vue'

export default {
  data () {
    return {
      form: {
        name: '',
        note: '',
        addressCode: []
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
      formLabelWidth: '90px',
      getDone: false
    }
  },
  props: {
    dialogVisible: {
      type: Boolean
    }
  },
  components: { citySelect },
  computed: {
    userId () {
      return (JSON.parse(window.localStorage.getItem('userInfo'))).userId
    }
  },
  methods: {
    handleChange(value) {
      this.form.addressCode = [value[0], value[1]]
    },
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.$emit('handleSubmitForm', _this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClose () {
      this.$emit('update:dialogVisible', false)
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