
<template>
  <page-layout title="音频组件" subtitle="音频组件的简单使用">
    <template #body>
      <div class="section-container ">
         音频播放器
      </div>
    </template>
  </page-layout>
</template>

<script>
  import { defineComponent, onMounted, nextTick } from "vue"
import PageLayout from '/@/components/layout/index.vue'
  
  export default defineComponent ({
    name : 'Audio',
    components : { PageLayout },
    setup() {
      onMounted( () => {
        nextTick(() => {
        
        } )
      } )
      return {
      
      }
    },
  })
</script>

<style lang="scss" scoped>

</style>
