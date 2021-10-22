<template>
  <div v-loading="loading">
    <el-button type="primary" @click="unzipLocal" style="margin-bottom: 30px"
      >选择文件</el-button
    >
    <el-alert v-if="error" title="文件解压出错" type="error"> </el-alert>
    <input
      class="fileInp"
      type="file"
      ref="local"
      accept="application/zip"
      @change="selectLocal"
    />

    <div class="file-info">
      <el-table :data="fileList" style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="name" label="文件路径"> </el-table-column>
        <el-table-column prop="dir" label="是否是目录" width="100">
        </el-table-column>
        <el-table-column prop="date" label="文件创建时间"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ReaderZip from './readerZip'

const loading = ref( false )
const local = ref( null )
const error = ref( false )
const fileList = ref( [] )
async function unzipLocal() {
  const el = local.value && local.value
  el && el.click()
}
async function selectLocal( event ) {
  loading.value = true
  error.value = false
  try {
    fileList.value = []
    const el = event.target
    const file = el.files[0]
    console.log( 'file', file )
    if ( file ) {
      const { files } = await ReaderZip.read( file )
      console.log( 'files', files )
      fileList.value = Object.values( files )
    }
    error.value = false
  } catch ( e ) {
    error.value = true
  } finally {
    loading.value = false
  }
}
</script>

<style>
.fileInp {
  display: none;
}
</style>
