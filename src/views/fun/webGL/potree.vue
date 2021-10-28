<template>
  <div v-loading="loading" class="view-model-wrapper" element-loading-text="模型加载中...">
    <div ref="modelWrapper" class="model-wrapper" />
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  watch,
  nextTick,
  onBeforeUnmount
} from 'vue'
import { WEBGL } from './utils/webgl'

const props = defineProps( {
  baseUrl : {
    type : String,
    request : true,
    default : '/static/potree/data/test2/cloud.js'
  },
  name : {
    type : String,
    default : 'point_cloud'
  },
  entryFile : {
    type : String,
    request : true,
    default : 'cloud.js'
  },
  activeAttributeName : {
    type : String,
    default : 'rgba'
  },
} )
const loading = ref( false )
const modelWrapper = ref()
const unSupport = ref( '' )

function initPotree( el ) {
  if( !el ) return false
  window.viewer = new Potree.Viewer( el )
  
  viewer.setEDLEnabled( true )
  viewer.setFOV( 60 )
  viewer.setPointBudget( 2000000 )
  viewer.loadSettingsFromURL()
  
  const url = props.baseUrl + props.entryFile
  const name = props.name || ''
  
  Potree.loadPointCloud( url, name, e => {
    const scene = viewer.scene
    const pointcloud = e.pointcloud
    // pointcloud.applyMatrix((new THREE.Matrix4).set(1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1))
    
    const material = pointcloud.material
    material.activeAttributeName = props.activeAttributeName // matcap position-cartesian
    material.minSize = 1
    material.pointSizeType = Potree.PointSizeType.FIXED
  
    // viewer.scene.view.setView(
    //   [0, 4, 0],
    //   [0, 0, 0],
    // )
    
    scene.addPointCloud( pointcloud )
  } )
}

onMounted( async() => {
  const isSupport = WEBGL.isWebGLAvailable()
  if ( !isSupport ) {
    unSupport.value = WEBGL.getWebGLErrorMessage().message
  }
  const el = modelWrapper.value
  initPotree( el )
} )

watch(
  () => [props.baseUrl, props.name, props.entryFile, props.activeAttributeName],
  () => {
    nextTick( () => {
      const el = modelWrapper.value
      initPotree( el )
    } )
  },
  { deep : true, immediate : true }
)

onBeforeUnmount( async() => {

} )

</script>

<style lang="scss" scoped>
.view-model-wrapper {
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
  background: rgba(255, 255, 255, 0.3);
}
.model-wrapper {
  @extend .view-model-wrapper;
}
</style>
