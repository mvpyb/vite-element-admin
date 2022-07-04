<template>
  <YuLayout title="新手引导">
    <template #head>
      引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能特点。该平台是基于
      <el-link type="primary" href="https://github.com/kamranahmedse/driver.js" target="_blank" :underline="false">driver.js</el-link>
    </template>
    <template #body>
      <div class="section-container">
        <el-button :icon="QuestionFilled" type="primary" @click.prevent.stop="guide">
          开启引导
        </el-button>
      </div>
    </template>
  </YuLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './steps'
import { QuestionFilled } from '@element-plus/icons-vue'
import YuLayout from '/@/components/YuLayout'

const driver = ref()

onMounted( () => {
  driver.value = new Driver()
} )

const guide = () => {
  if ( driver.value ) {
    driver.value.defineSteps( steps )
    driver.value.start()
  }
}

defineOptions( {
  name : 'Guide'
} )
</script>
