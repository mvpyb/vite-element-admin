
<template>
  <yu-layout title="图片相关组件" subtitle="图片相关组件的简单封装">
    <template #body>
      <div class="section-container">
        211
      </div>
    </template>
  </yu-layout>
</template>

<script>
  import {ref, defineComponent } from "vue"
  import YuLayout from '/@/components/YuLayout'
  
  export default defineComponent ({
    name : 'Img',
    components : { YuLayout },
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
