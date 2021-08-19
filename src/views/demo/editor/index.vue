
<template>
  <page-layout title="富文本编辑器 - tinymce" :subtitle="subtitle">
    <template #body>
      <div class="section-container fix-width">
        <tinymce :value="form.contents" :height="500" @input="getEditorContent" />
      </div>
    </template>
  </page-layout>
</template>

<script>
  import { defineComponent, reactive, ref } from "vue";
  import Tinymce from '/@/components/Tinymce/index.vue'
  import PageLayout from '/@/components/layout/index.vue'
  
  export default defineComponent ({
    name : 'Editor',
    components : { PageLayout, Tinymce },
    setup() {
      const form = reactive( {
        contents : '初始内容填充'
      } )
      const subtitle = ref( `TinyMCE是一款易用、且功能强大的所见即所得的富文本编辑器。同类程序有：UEditor、Kindeditor、Simditor、CKEditor、wangEditor、Suneditor、froala等等。官方文档地址：<a href="https://www.tiny.cloud/docs/">点我前往 https://www.tiny.cloud/docs/</a> ` )
      // 富文本更新内容
      const getEditorContent = ( info ) => {
        form.contents = info
      }
      return {
        form, getEditorContent, subtitle
      }
    },
  })
</script>

<style lang="scss" scoped>

</style>
