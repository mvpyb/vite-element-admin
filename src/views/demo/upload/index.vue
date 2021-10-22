<template>
  <yu-layout
    title="上传组件"
    subtitle="上传组件的简单使用，包括Element Plus 原生upload 组件、大文件上传组件"
  >
    <template #body>
      <div class="section-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth"
            >定时任务补偿</el-tab-pane
          >
        </el-tabs>
      </div>
    </template>
  </yu-layout>
</template>

<script>
import {
  ref,
  defineComponent
} from 'vue'
import YuLayout from '/@/components/YuLayout'

export default defineComponent( {
  name : 'Upload',
  components : { YuLayout },
  setup() {
    const activeName = ref( 'base' )
    function handleClick( tab, event ) {
      // console.log( tab, event )
    }

    return {
      activeName,
      handleClick
    }
  }
} )
</script>

<style lang="scss" scoped></style>
