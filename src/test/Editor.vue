<template>
  <div id="ClassicEditor">
  <ckeditor :editor="editor" id="editor" :value="editorData" :config="editorConfig"></ckeditor>
  </div>
</template>

<script>

import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn' // 中文包
import CKEditor from '@ckeditor/ckeditor5-vue'
// import ClassicEditor from '@/components/in_editor/core/ckeditor'

// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

// ⚠️ NOTE: We don't use @ckeditor/ckeditor5-build-classic any more!
// Since we're building CKEditor from source, we use the source version of ClassicEditor.
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'

import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials'
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold'
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic'
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link'
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph'

export default {
  name: 'ClassicEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    }
  },
  data () {
    return {
      // 编辑器组件需要获取编辑器实例
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        plugins: [
          EssentialsPlugin,
          BoldPlugin,
          ItalicPlugin,
          LinkPlugin,
          ParagraphPlugin
        ],
        toolbar: {
          items: [
            'bold',
            'italic',
            'link',
            'undo',
            'redo'
          ]
        },
        language: 'zh-cn',
        // 可以控制编辑器的提示文本
        placeholder: this.placeholder
      }
    }
  },
  watch: {
    'value' (val) {
      if (!this.editor) {
        return
      }
      // 外部内容发生变化时，将新值赋予编辑器
      if (val && val !== this.editorData) {
        this.editorData = this.value
      }
    },
    'editorData' (val) {
      if (val && val !== this.value) {
        // 编辑器内容发生变化时，告知外部，实现 v-model 双向监听效果
        this.$emit('input', val)
      }
    }
  },
  created () {
    // 编辑器组件创建时将外部传入的值直接赋予编辑器
    this.editorData = this.value
    alert($("#editor"))
  },
  components: {
    // 编辑器组件的局部注册方式
    ckeditor: CKEditor.component
  },
  mounted () {
  },
  methods: {
    onReady (editor) {
      // Insert the toolbar before the editable area.
      editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      )
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/css/content-styles.css'
</style>
