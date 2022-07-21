<template>
  <YuLayout title="Tui-Image-Editor">
    <template #head>
      图片编辑器 ImageEditor
      <el-link type="primary" href="http://nhn.github.io/tui.image-editor/latest/" target="_blank" :underline="false">
        点我查看更多
      </el-link>
    </template>
    <template #body>
      <div class="app-container">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>ImageEditor</span>
            </div>
          </template>
          <ImageEditor ref="editor" />
        </el-card>
      </div>
    </template>
  </YuLayout>
</template>

<script setup>
import { ref } from 'vue'
import YuLayout from '/@/components/YuLayout'
import ImageEditor from '/@/components/YuImageEditor'

const editor = ref()

// const uploadFiles = ( ) => {
//   const { getFile, uploadImg } = editor.value
//   uploadImg()
// }

defineOptions( {
  name : 'ImageEditor'
} )
</script>

<style>
.tui-image-editor-container {
  margin: 50px auto;
}
</style>
