<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix">
      <router-link to>
        <a @click="$router.back(-1)"> <i class="el-icon-arrow-left"></i> 学习列表</a>
      </router-link>
    </div>
    <div class="text item">
      <div class="Learn-update-wrapper">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="学习主题" prop="learnTitle">
            <el-input v-model="ruleForm.learnTitle"></el-input>
          </el-form-item>
          <el-form-item label="学习标签">
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
          <el-form-item label="学习内容" prop="learnContext">
            <editor @input="inputChange" :value="ruleForm.learnContext"></editor>
          </el-form-item>
          <el-form-item style="text-align:center;">
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-card>
</template>

<script>
  import Editor from '../../components/in_editor/index.vue'
  import { saveLearn } from '@/api/learn'

  export default {
    data() {
      return {
        dynamicTags: ['javascript', 'vue', 'html'],
        inputVisible: false,
        inputValue: '',
        learnHtml: '',
        ruleForm: {
          learnTitle: '',
          learnContext: ''
        },
        rules: {
          learnTitle: [
            { required: true, message: '请输入学习标题', trigger: 'blur' },
            { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          learnContext: [
            { required: true, message: '请填写学习内容', trigger: 'blur' }
          ]
        }
      };
    },
    components: {
      Editor
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      inputChange (val) {
        this.ruleForm.learnContext = val
        this.$nextTick(() => {
          this.learnHtml = val.replace(/<[^>]+>/g, "")
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid, values) => {
          if (valid) {
            let data = {}
            data.userId = this.$store.state.userInfo.userId
            data.learnTitle = this.ruleForm.learnTitle
            data.tag = this.dynamicTags.join(',')
            data.learnHtml = this.learnHtml
            data.learnContext = this.ruleForm.learnContext
            console.log(data)
            const res = await saveLearn(data)
            console.log(res)
            if (res.code === 200) {
              this.$message.success('添加成功')
              this.$router.go(-1)
            } else {
              this.$message.error(res.msgg)
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss">
  .Learn-update-wrapper{
    .el-form-item__label{
      margin: 0;
      
    }
    .el-form-item__content{
      .el-tag{
        margin-right: 12px;
      }
    }
  }
</style>