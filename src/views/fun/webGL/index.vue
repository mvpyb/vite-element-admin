
<template>
  <yu-layout title="threeJs" :subtitle="subtitle">
    <template #body>
      <div class="section-container">
        <el-descriptions title="基础模型使用" :column="6">
          <el-descriptions-item label="">
            <el-button type="primary" size="small" @click="loadFbx( 1 )">fbx - 兽人</el-button>
          </el-descriptions-item>
          <el-descriptions-item label="">
            <el-button type="primary" size="small" @click="loadFbx( 2 )">fbx - 机器人</el-button>
          </el-descriptions-item>
          <el-descriptions-item label="">
            <el-button type="primary" size="small" @click="loadObj( 1 )">obj - 树</el-button>
          </el-descriptions-item>
          <el-descriptions-item label="">
            <el-button type="primary" size="small" @click="loadObj( 2 )">obj - 人物</el-button>
          </el-descriptions-item>
          <el-descriptions-item label="">
            <el-button type="primary" size="small" @click="loadObj( 3 )">obj - 雕塑</el-button>
          </el-descriptions-item>
          <el-descriptions-item label="">
            <el-button type="primary" size="small" @click="loadJSON( 1 )">json - 1</el-button>
          </el-descriptions-item>
        </el-descriptions>
        
        <div v-loading="loading" class="view-model-wrapper" element-loading-text="模型加载中...">
          <div id="model-wrapper" ref="modelWrapper" />
        </div>
      </div>
    </template>
  </yu-layout>
</template>

<script>
  import {ref, defineComponent, onMounted, reactive, onBeforeUnmount } from "vue"
  import ThreeHandle from './utils/threeHandle.js'
  import { WEBGL } from './utils/webgl'
  import YuLayout from '/@/components/YuLayout'

  export default defineComponent ({
    name : 'Editor',
    components : { YuLayout },
    setup() {
      const subtitle = ref( `Three.js是基于原生WebGL封装运行的三维引擎，在所有WebGL引擎中，Three.js是国内文资料最多、使用最广泛的三维引擎。官方文档地址：<a href="https://threejs.org/">点我前往 https://threejs.org/</a> ` )
      const loading = ref( false )
      const modelWrapper = ref()
      const unSupport = ref( '' )
      const THREES = reactive( {
        clock : null,
        renderer : null,
        scene : null,
        camera : null,
        mixer : null,
        stats : null,
      } )
  
      const addFbx = async ( { url, image }, fn ) => {
        ThreeHandle.loadFbx( url, object => {
          THREES.mixer = ThreeHandle.addAnimateFbx( object )
          ThreeHandle.setScaleToFitSize( object )
          object.traverse( function( child ) {
            if ( image && image.length > 0 ) {
              const material = ThreeHandle.loadImage( image[0] )
              child.material = material
            }
            if ( child.isMesh ) {
              child.castShadow = true
              child.receiveShadow = true
            }
          } )
          THREES.scene.add( object )
          fn && fn( object )
        } )
      }
  
      const addObj = async ( { url, image }, fn ) => {
        const baseUrl = ''
        if ( image && image.length > 0 ) {
          const result = /^(.*\/)([^/]*)$/.exec(image[0]);
          const mtlPath = result[1];
          const mtlSrc = result[2];
          
          // ThreeHandle.loadMtl( baseUrl, image[0], materials => {
          ThreeHandle.loadMtl( mtlPath, mtlSrc, materials => {
            ThreeHandle.loadObj( baseUrl, url, materials, object => {
              ThreeHandle.setScaleToFitSize( object )
              fn && fn( object )
              THREES.scene.add( object )
            } )
          } )
        } else {
          ThreeHandle.loadObj( baseUrl, url, '', object => {
            ThreeHandle.setScaleToFitSize( object )
            fn && fn( object )
            THREES.scene.add( object )
          } )
        }
      }
  
      const addJson = async ( { url }, fn ) => {
        ThreeHandle.loadJSON( url, object => {
          fn && fn( object )
          THREES.scene.add( object )
        } )
      }
  
      // const addStl = async ( { url }, fn ) => {
      //   ThreeHandle.loadStl( url, object => {
      //     fn && fn( object )
      //     THREES.scene.add( object )
      //   } )
      // }
      
      const addGeometry = async( { width, height, depth } ) => {
        try {
          const cube = await ThreeHandle.drawCubeByLines( { width, height, depth } )
          cube.scale.set( 1, 1, 1 )
        } catch ( e ) {
          // cube = undefined
        }
      }
      
      const animate = () => {
        requestAnimationFrame( animate )
        ThreeHandle.render()
        if ( THREES.clock ) {
          ThreeHandle.fbxAnimate()
        }
      }
  
      onMounted( async () => {
        const isSupport = WEBGL.isWebGLAvailable()
        if ( !isSupport ) {
          unSupport.value = WEBGL.getWebGLErrorMessage().message
        }
        const el = modelWrapper.value
        const width = el.offsetWidth
        const height = el.offsetHeight
        const response = await ThreeHandle.init( {
          container : el,
          width,
          height
        } )
        const { scene, light, camera, renderer, controls, stats, clock } = response
        THREES.clock = clock
        THREES.renderer = renderer
        THREES.scene = scene
        THREES.camera = camera
        THREES.stats = stats
  
        loadObj( 2 )
      } )
  
      onBeforeUnmount( async () => {
        ThreeHandle.clearScene()
        ThreeHandle.distoryEvent()
      } )
      
      const loadFbxFn = async ( url, image ) => {
        ThreeHandle.clearScene()
        await addFbx( { url, image }, async( object ) => {
          animate()
          const { boxSize } = await ThreeHandle.getSize( object )
          const scaleValue = 1
          addGeometry( {
            width : boxSize.x * scaleValue,
            height : boxSize.y * scaleValue,
            depth : boxSize.z * scaleValue
          } )
          loading.value = false
        } )
      }
      const loadObjFn = async ( url, image ) => {
        ThreeHandle.clearScene()
        await addObj( { url, image }, async( object ) => {
          animate()
          const { boxSize } = await ThreeHandle.getSize( object )
          const scaleValue = 1
          addGeometry( {
            width : boxSize.x * scaleValue,
            height : boxSize.y * scaleValue,
            depth : boxSize.z * scaleValue
          } )
          loading.value = false
        } )
      }
      const loadJSONFn = async ( url ) => {
        ThreeHandle.clearScene()
        await addJson( { url }, async( object ) => {
          object.scale.set( 30, 30, 30 );
          const { boxSize } = await ThreeHandle.getSize( object )
          const scaleValue = 1
          addGeometry( {
            width : boxSize.x * scaleValue,
            height : boxSize.y * scaleValue,
            depth : boxSize.z * scaleValue
          } )
          loading.value = false
        } )
      }
      // const loadStlFn = async ( url ) => {
      //   ThreeHandle.clearScene()
      //   await addStl( { url }, async( object ) => {
      //     // object.scale.set( 15, 15, 15 );
      //     const { boxSize } = await ThreeHandle.getSize( object )
      //     const scaleValue = 1
      //     addGeometry( {
      //       width : boxSize.x * scaleValue,
      //       height : boxSize.y * scaleValue,
      //       depth : boxSize.z * scaleValue
      //     } )
      //   } )
      // }
  
      const loadFbx = async ( type = 1 ) => {
        loading.value = true
        await ThreeHandle.loadManager( 'tga' )
        let url, image
        switch( type ) {
          case 1:
            url = '/static/model/fbx/showren/shouren.fbx'
            image = [
              '/static/model/fbx/showren/Female Gorgon 02 Red.png',
              '/static/model/fbx/shouren/Helmet 03 Blue.tga',
              '/static/model/fbx/shouren/Sword 01 White.tga',
            ]
            break;
          case 2:
            url = '/static/model/fbx/dancing.fbx'
            image = []
            break;
          default :
            url = '/static/model/fbx/dancing.fbx'
            image = []
            break;
        }
        loadFbxFn( url, image )
      }
      const loadObj = async ( type = 1 ) => {
        loading.value = true
        await ThreeHandle.loadManager( 'dds' )
        let url, image
        switch( type ) {
          case 1:
            url = '/static/model/obj/tree.obj'
            image = []
            break;
          case 2:
            url = '/static/model/obj/male02/male02.obj'
            image = [
              '/static/model/obj/male02/male02.mtl',
              '/static/model/obj/male02/male-02-1noCulling.dds',
              '/static/model/obj/male02/01_-_Default1noCulling.dds',
              '/static/model/obj/male02/orig_02_-_Defaul1noCulling.dds',
            ]
            break;
          case 3:
            url = '/static/model/obj/LeePerrySmith.obj'
            image = []
            break;
          default :
            url = '/static/model/obj/tree.obj'
            image = []
            break;
        }
        loadObjFn( url, image )
      }
      const loadJSON = async ( type = 1 ) => {
        loading.value = true
        let url, image
        switch( type ) {
          case 1:
            url = '/static/model/json/scene.json'
            image = []
            break;
          default :
            url = '/static/model/json/scene.json'
            image = []
            break;
        }
        loadJSONFn( url, image )
      }
      
      // const loadStl = async ( type = 1 ) => {
      //   let url
      //   switch( type ) {
      //     case 1:
      //       url = '/static/model/stl/colored.stl'
      //       break;
      //     case 2:
      //       url = '/static/model/stl/gear.stl'
      //       break;
      //     default :
      //       url = '/static/model/stl/colored.stl'
      //       break;
      //   }
      //   loadStlFn( url )
      // }
      
      return {
        subtitle,
        loading,
        modelWrapper,
        loadFbxFn,
        loadObjFn,
        loadFbx,
        loadObj,
        loadJSON
      }
    },
  })
</script>

<style lang="scss" scoped>
  .section-container {
    width: 100%;
    height: calc(100vh - 84px);
  }
  .view-model-wrapper {
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
    background: rgba(255,255,255,0.3);
  }
  #model-wrapper{
    @extend .view-model-wrapper;
  }

  :deep .el-descriptions__body {
    background: #F0F2F5;
  }
  .el-button {
    width: 92px;
  }
</style>
