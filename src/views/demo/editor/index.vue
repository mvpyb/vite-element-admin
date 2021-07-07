
<template>
  <div class="section-container ">
    <div class="body fix-width">
      <tinymce :value="form.contents" :height="500" @input="getEditorContent" />
<!--      <tinymce v-model="form.contents" @change="handleChange" />-->
    </div>
  </div>
</template>

<script>
  import { defineComponent, reactive } from "vue";
  import Tinymce from '/@/components/Tinymce/index.vue'
  
  export default defineComponent ({
    name : 'Editor',
    components : { Tinymce },
    setup() {
      const form = reactive( {
        contents : '初始内容填充'
      } )
      // 富文本更新内容
      const getEditorContent = ( info ) => {
        form.contents = info
        console.log( info )
      }
      // function handleChange( info ) {
      //   form.contents = info
      //   console.log( info );
      // }
      return {
        form, getEditorContent,
        // value, handleChange
      }
    },
  })
</script>

<style lang="scss" scoped>

</style>
