<template>
  <yu-layout title="点云渲染器" :subtitle="subtitle">
    <template #body>
      <div class="section-container">
  
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="双离合变速箱" name="transmission_case" />
          <el-tab-pane label="金翅鸟和毗湿奴" name="winged_bird" />
          <el-tab-pane label="lion_takanawa_normals" name="lion_takanawa_normals" />
          <el-tab-pane label="lion_takanawa_las" name="lion_takanawa_las" />
          <el-tab-pane label="lion_takanawa_laz" name="lion_takanawa_laz" />
        </el-tabs>
        
        <potree
            :baseUrl="baseUrl"
            :entryFile="entryFile"
            :name="name"
            :activeAttributeName="activeAttributeName"
        />

      </div>
    </template>
  </yu-layout>
</template>

<script setup>
import { ref } from 'vue'
import YuLayout from '/@/components/YuLayout'
import potree from './potree.vue'

const activeName = ref( 'transmission_case' )

const subtitle = ref(
  `
  Potree 是基于 WebGL 的开源大规模点云渲染器，其由维也纳工业大学计算机图形与算法研究中心（Institute of Computer Graphics and Algorithms, TU Wien）开发。
  官网点击这里：<a href="http://www.potree.org/">前往</a>
  PotreeConverter 点击这里：<a href="https://github.com/potree/PotreeConverter">前往</a>
` )

const baseUrl = ref( '/static/potree/data/transmission_case/' )
const name = ref( 'transmission_case' )

const entryFile = ref( 'cloud.js' )
const activeAttributeName = ref( 'rgba' )

function handleClick( tab ){
  baseUrl.value = '/static/potree/data/' + tab.paneName + '/'
  name.value = tab.paneName
}

</script>

<style lang="scss" scoped>
.section-container {
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
