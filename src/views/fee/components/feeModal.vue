<template>
  <el-dialog
    custom-class="amap-dialog"
    :title="title"
    :close-on-click-modal="false"
    :visible="feeVisible"
    width="40%"
    :before-close="handleClose">
    <el-form :model="form" ref="ruleForm" :rules="rules">
      <el-form-item label="消费内容" :label-width="formLabelWidth" prop="costContext">
        <el-input v-model="form.costContext" placeholder="请输入" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="消费金额" :label-width="formLabelWidth" prop="costMoney">
        <el-input v-model="form.costMoney" placeholder="请输入" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="游记标签" :label-width="formLabelWidth">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleDelTag(tag)">
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
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveCost } from '@/api/cost'
export default {
  data () {
    return {
      form: {
        costContext: '',
        costMoney: ''
      },
      rules: {
        costContext: [
          { required: true, message: '请输入消费内容', trigger: 'blur' },
        ],
        costMoney: [
          { required: true, message: '请输入消费金额', trigger: 'blur' },
          // { type: 'number', message: '消费金额必须为数字值'}
        ]
      },
      formLabelWidth: '90px',
      dynamicTags: [],
      inputValue: '',
      inputVisible: false
    }
  },
  props: {
    feeVisible: {
      type: Boolean
    },
    title: {
      type: String
    },
    costObj: {
      type: Object
    }
  },
  computed: {
    userId () {
      return (JSON.parse(window.localStorage.getItem('userInfo'))).userId
    }
  },
  created () {
    if (this.costObj) {
      this.initData()
    }
  },
  methods: {
    initData () {
      this.form.costContext = this.costObj.costContext
      this.form.costMoney = this.costObj.costMoney
      for (const key in this.costObj.label) {
        this.dynamicTags.push(this.costObj.label[key].labelContext)
      }
    },
    handleDelTag (tag) {
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
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let data = {}
          data.userId = this.userId
          data.costContext = this.form.costContext
          data.costMoney = this.form.costMoney
          data.tag = this.dynamicTags.join(',')
          let msg = ''
          if (this.costObj.costId) {
            data.costId = this.costObj.costId
            msg = '修改成功'
          } else {
            msg = '添加成功'
          }
          const res = await saveCost(data)
          if (res.code === 200) {
            this.$message.success(msg)
            this.$emit('ok')
          } else {
            this.$message.error(res.msg)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClose () {
      this.$emit('update:feeVisible', false)
    }
  }
}
</script>

<style lang="scss">

</style>