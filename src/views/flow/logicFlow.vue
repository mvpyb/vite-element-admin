<template>
  <YuLayout title="LogicFlow">
    <template #head>
      流程图组件 LogicFlow。
      <el-link type="primary" href="http://logic-flow.org/" target="_blank" :underline="false">点我查看更多</el-link>
    </template>
    <template #body>
      <div class="app-container"></div>
    </template>
  </YuLayout>
</template>

<script setup>
// import { ref, reactive, nextTick, unref } from 'vue'
import YuLayout from '/@/components/YuLayout'
// import LogicFlow from '@logicflow/core'
// import "@logicflow/core/dist/style/index.css"

defineOptions( {
  name : 'LogicFlow'
} )
</script>

<style scoped lang="scss">
yu-layout {
  ::v-deep(.body) {
    background: #fff;
  }
}
</style>
