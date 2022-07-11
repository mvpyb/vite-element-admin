<template>
  <div class="screen-full">
    <svg-icon class-name="icons" :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="click" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import screenfull from 'screenfull'
const isFullscreen = ref( false )

onMounted( () => {
  init()
} )

onUnmounted( () => {
  destory()
} )

const click = () => {
  if ( !screenfull.isEnabled ) {
    ElMessage( {
      message : '你的浏览器不支持全屏',
      type : 'warning'
    } )
    return false
  }
  screenfull.toggle()
}
const init = () => {
  if ( screenfull.isEnabled ) {
    screenfull.on( 'change', change )
  }
}
const destory = () => {
  if ( screenfull.isEnabled ) {
    screenfull.off( 'change', change )
  }
}
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

defineOptions( {
  name : 'Screenfull'
} )
</script>

<style scoped lang="scss">
.screen-full {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  &:hover {
    cursor: pointer;
    background: #f0f0f0;
  }
}
</style>
