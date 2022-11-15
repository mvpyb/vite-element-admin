<template>
  <YuLayout title="LogicFlow">
    <template #head>
      表单编辑器 vue-form-create2。
      <el-link type="primary"
href="https://www.npmjs.com/package/vue-form-create2"
target="_blank"
:underline="false"
        >点我查看更多</el-link
      >
    </template>
    <template #body>
      <div class="app-container">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>El 表单设计器</span>
              <el-button class="button" text>Operation button</el-button>
            </div>
          </template>
          <ElDesignForm v-loading="loading" style="height: 600px" />
        </el-card>

        <div style="margin: 20px auto" />

        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>El 表单生成器</span>
            </div>
          </template>
          <ElGenerateForm :data="generateJson" style="height: 600px" />
        </el-card>
      </div>
    </template>
  </YuLayout>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import YuLayout from '/@/components/YuLayout'
import { loader } from '/@/utils/loader'
import generateJson from './components/generateJson.json'
import { ElDesignForm, ElGenerateForm } from 'vue-form-create2'
// import {
//   AntdDesignForm,
//   ElDesignForm,
//   AntdGenerateForm,
//   ElGenerateForm
// } from 'vue-form-create'

const loading = ref( true )
onBeforeMount( () => {
  loader.loadJS( 'https://unpkg.com/ace-builds/src-noconflict/ace.js' ).then( () => {
    loading.value = false
  } )
} )

defineOptions( {
  name : 'FormEditor'
} )
</script>

<style scoped lang="scss">
.yu-layout {
  ::v-deep(.body) {
    background: #fff;
  }
}
</style>
