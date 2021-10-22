<template>
  <yu-layout title="zip" subtitle="上传组件的简单使用">
    <template #body>
      <div class="app-container">
        <el-tabs v-model="activeName">
          <el-tab-pane label="plupload + OSS 上传" name="uploads">
            <div>
              <upload />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </yu-layout>
</template>

<script setup>
import { ref } from 'vue'
import upload from './upload.vue'
import YuLayout from '/@/components/YuLayout'

const activeName = ref( 'uploads' )
</script>
