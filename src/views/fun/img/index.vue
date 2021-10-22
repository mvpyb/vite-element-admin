<template>
  <yu-layout title="图片相关组件" subtitle="图片相关组件的简单封装">
    <template #body>
      <div class="section-container">
        <el-card class="box-card">
          <template #header>
            <div class="cropper-head">
              <h6>头像裁剪</h6>
            </div>
          </template>
          <div class="cropper-body">
            <div class="img-container clearfix">
              <div class="circle item-view-item">
                <img :src="avatar" :draggable="false" alt="" v-if="avatar" />
              </div>
              <div class="square item-view-item">
                <img :src="avatar" :draggable="false" alt="" v-if="avatar" />
              </div>
              <div class="info item-view-item">
                裁剪信息 ：{{ cropperInfo }}
              </div>
            </div>
            <el-button class="select-btn" type="primary" @click="showModal"
              >选择图片</el-button
            >
          </div>
        </el-card>

        <Cropper
          v-if="modalVisible"
          :src="avatar"
          @changeFile="handleChange"
          @cropend="handleCropend"
          @ready="handleReady"
          @hideCropper="handleHide"
        />
      </div>
    </template>
  </yu-layout>
</template>

<script setup>
import { ref } from 'vue'
import YuLayout from '/@/components/YuLayout'
import Cropper from './Cropper.vue'

const avatar = ref(
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
)
const cropperUrl = ref( '' )
const cropperInfo = ref( '' )

const modalVisible = ref( false )

function handleChange( url ) {
  avatar.value = url
}

function handleCropend( { src, info } ) {
  cropperUrl.value = src
  cropperInfo.value = info
}

function handleReady( cropperInstance ) {
  cropperUrl.value = cropperInstance
}

function handleHide() {
  modalVisible.value = false
  // avatar.value = ''
}

function showModal() {
  modalVisible.value = true
  // avatar.value = ''
}
</script>

<style lang="scss" scoped>
.cropper-body {
}
.img-container {
}
.item-view-item {
  display: inline-block;
  margin: 0 20px;
  width: 200px;
  height: 200px;
  float: left;
  &.info {
    width: 400px;
    /*display: block;*/
    /*float:none;*/
    /*margin: 15px 0;*/
  }
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  &.circle {
    border-radius: 50%;
    overflow: hidden;
  }
}
.select-btn {
  margin-top: 30px;
}
</style>
