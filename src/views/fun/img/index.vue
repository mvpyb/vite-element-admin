
<template>
  <page-layout title="图片相关组件" subtitle="图片相关组件的简单封装">
    <template #body>
      <div class="section-container">
        211
      </div>
    </template>
  </page-layout>
</template>

<script>
  import {ref, defineComponent, onMounted, onBeforeUnmount } from "vue"
  import { ElMessage } from 'element-plus'
  import PageLayout from '/@/components/layout/index.vue'
  import { PanThumb } from '/@/components/PanThumb/index.vue'
  
  export default defineComponent ({
    name : 'Img',
    components : { PageLayout },
    setup() {
      const canvas = ref( null )
      
      return {
        canvas,
      }
    },
  })
</script>

<style lang="scss" scoped>

</style>
