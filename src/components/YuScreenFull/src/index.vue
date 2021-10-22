<template>
  <div class="screen-full" @click="toggle">
    <i
      :title="isFullscreen ? '退出全屏' : '全屏'"
      class="iconfont icon-quanping"
    ></i>
  </div>
</template>

<script>
import { useFullscreen } from '@vueuse/core'
import { defineComponent } from 'vue'

export default defineComponent( {
  name : 'YuScreenFull',
  setup() {
    const { isFullscreen, toggle } = useFullscreen()

    return {
      isFullscreen,
      toggle
    }
  }
} )
</script>

<style lang="scss" scoped>
.screen-full {
  width: 40px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  &:hover {
    cursor: pointer;
    background: #f0f0f0;
  }
  i {
    font-family: iconfont !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
  }
}
</style>
