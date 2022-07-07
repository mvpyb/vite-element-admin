<template>
  <yu-layout title="腾讯地图">
    <template #head>
      <el-link
        type="primary"
        href="https://lbs.amap.com/api/jsapi-v2/guide/overlays/vector-overlay"
        target="_blank"
        :underline="false"
        >点我查看更多</el-link
      >
    </template>
    <template #body>
      <div class="section-container">
        <div id="container" ref="container"></div>
      </div>
    </template>
  </yu-layout>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { tencentMap } from './utils'
import YuLayout from '/@/components/YuLayout'

const container = ref()
const ak = 'VBIBZ-VEA6U-RRXVP-4MSZS-WDNAS-YDFXM'

onMounted( () => {
  nextTick( () => {
    tencentMap( ak )
      .then( () => {
        const center = new TMap.LatLng( 39.984104, 116.307503 )
        // eslint-disable-next-line no-new
        new TMap.Map( container.value, {
          rotation : 20,
          pitch : 30,
          zoom : 12,
          center
        } )
      } )
      .catch( err => {
        console.log( 'err', err )
      } )
  } )
} )
</script>

<style lang="scss" scoped>
.info {
  height: 30px;
  line-height: 30px;
}
#container {
  width: 100vw;
  height: calc(100vh - 120px);
}
</style>
