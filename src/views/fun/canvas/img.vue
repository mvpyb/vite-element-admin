<template>
  <div class="section-container">
    <tui-image-editor
      :include-ui="useDefaultUI"
      :options="options"
    ></tui-image-editor>
  </div>
</template>

<script>
import {
  ref,
  defineComponent
} from 'vue'
import 'tui-color-picker/dist/tui-color-picker.css'
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/vue-image-editor/src/ImageEditor.vue'

export default defineComponent( {
  name : 'Img',
  components : { 'tui-image-editor' : ImageEditor },
  setup() {
    const useDefaultUI = ref( true )
    const options = ref( {
      cssMaxWidth : 700,
      cssMaxHeight : 500
    } )
    return {
      useDefaultUI,
      options
    }
  }
} )
</script>

<style lang="scss" scoped></style>
