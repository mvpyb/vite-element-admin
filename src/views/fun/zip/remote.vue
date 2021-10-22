<template>
  <div v-loading="loading">
    <el-alert
      title="此处代码段警告参考，须配置文件下载请求"
      type="warning"
      style="margin: 30px"
    />

    <el-input
      placeholder="请输入远程zip地址"
      v-model="url"
      clearable
      style="margin-bottom: 30px"
    />
    <el-button type="primary" @click="unzip" style="margin-bottom: 30px"
      >解压文件</el-button
    >
    <el-alert v-if="error" title="文件解压出错" type="error"> </el-alert>

    <div class="file-info">
      <el-table :data="fileList" style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="name" label="name"> </el-table-column>
        <el-table-column prop="path" label="path" width="100">
        </el-table-column>
        <el-table-column prop="url" label="url" width="100"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ReaderZip from './readerZip'
import { getObjectURL } from '/@/utils/file'

const loading = ref( false )
const url = ref( '' )
const error = ref( false )
const fileList = ref( [] )

async function unzip() {
  const path = url.value
  if ( !path ) return
  loading.value = true
  try {
    const { zipReader, files } = await ReaderZip.readRemote( url )
    await handleZip( zipReader, files )
    error.value = false
  } catch ( e ) {
    error.value = true
  } finally {
    loading.value = false
  }
}
async function handleZip( zipReader, files ) {
  const fileObj = {}
  const fileObjs = {}

  zipReader.filter( ( path, file ) => {
    if ( !path.endsWith( '/' ) ) {
      fileObj[path] = file
    }
  } )
  const keyData = Object.keys( fileObj )
  await Promise.all(
    keyData.map( async( item ) => {
      const nameData = item.split( '/' )
      const name = nameData[nameData.length - 1]
      const { blobZip } = await ReaderZip.readBase64( zipReader, files[item] )
      const { url } = await getObjectURL( blobZip )
      fileList.value.push( {
        name,
        path : nameData,
        blob : blobZip,
        url
      } )
      fileObjs[name] = blobZip
    } )
  )
}
</script>
