<template>
  <yu-layout title="zip" subtitle="zip组件的简单使用">
    <template #body>
      <div class="app-container">
        <el-tabs v-model="activeName">
          <el-tab-pane label="zip导出" name="export">
            <div>
              <zip />
            </div>
          </el-tab-pane>
          <el-tab-pane label="本地zip解压" name="unzip">
            <div>
              <local />
            </div>
          </el-tab-pane>
          <el-tab-pane label="远程zip解压" name="remote">
            <remote />
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </yu-layout>
</template>

<script setup>
import { ref } from 'vue'
import zip from './zip.vue'
import local from './local.vue'
import remote from './remote.vue'
import YuLayout from '/@/components/YuLayout'

// const activeName = ref( 'export' )
const activeName = ref( 'unzip' )
</script>
