<template>
  <YuLayout title="Vditor">
    <template #head>
      富文本 Vditor
      <el-link type="primary"
href="https://ld246.com/article/1549638745630"
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
              <span>Vditor</span>
            </div>
          </template>
          <div id="vditor" />
        </el-card>
      </div>
    </template>
  </YuLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import YuLayout from '/@/components/YuLayout'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

const vditor = ref( null )

onMounted( () => {
  vditor.value = new Vditor( 'vditor', {
    height : 360,
    placeholder : '9527，你就没什么想对秋香说的吗？',
    toolbarConfig : {
      pin : true
    },
    cache : {
      enable : false
    },
    // "value": "## 即时渲染（IR）\n即时渲染模式对熟悉 Typora 的用户应该不会感到陌生，理论上这是最优雅的 Markdown 编辑方式。",
    after : () => {
      // // vditor.value is a instance of Vditor now and thus can be safely used here
      // vditor.value.setValue('Vue Composition API + Vditor');
    }
  } )
} )

defineOptions( {
  name : 'Vditor'
} )
</script>
