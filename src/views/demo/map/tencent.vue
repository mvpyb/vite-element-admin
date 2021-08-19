
<template>
  <page-layout title="腾讯地图" subtitle="腾讯地图的简单使用">
    <template #body>
      <div class="section-container ">
        <div id="container" ref="container"></div>
      </div>
    </template>
  </page-layout>
</template>

<script>
  // 文档 ： https://lbs.amap.com/api/jsapi-v2/guide/overlays/vector-overlay
  import {ref, defineComponent, onMounted, nextTick} from "vue"
  import { tencentMap } from './utils'
  import PageLayout from '/@/components/layout/index.vue'

  export default defineComponent ({
    name : 'Tencent',
    components : { PageLayout },
    setup() {
      const container = ref()
      const ak = 'VBIBZ-VEA6U-RRXVP-4MSZS-WDNAS-YDFXM'
      
      onMounted( () => {
        nextTick(() => {
          tencentMap( ak )
              .then( () => {
                const center = new TMap.LatLng(39.984104, 116.307503);
                const map = new TMap.Map( container.value, {
                  rotation: 20,
                  pitch:30,
                  zoom:12,
                  center: center
                } )
              })
              .catch( err => {
                console.log( 'err', err )
              } )
        } )
      } )
      
      return {
        container,
      };
    },
  })
</script>

<style lang="scss" scoped>
  .info {
    height: 30px;
    line-height: 30px;
  }
  #container {
    width: 100vw;
    height: calc( 100vh - 120px );
  }
</style>
