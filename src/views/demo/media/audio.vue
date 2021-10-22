<template>
  <yu-layout title="音频组件" subtitle="音频组件的简单使用">
    <template #body>
      <div class="section-container">音频播放器</div>
    </template>
  </yu-layout>
</template>

<script>
import { defineComponent, onMounted, nextTick } from 'vue'
import YuLayout from '/@/components/YuLayout'

export default defineComponent( {
  name : 'Audio',
  components : { YuLayout },
  setup() {
    onMounted( () => {
      nextTick( () => {} )
    } )
    return {}
  }
} )
</script>

<style lang="scss" scoped></style>
