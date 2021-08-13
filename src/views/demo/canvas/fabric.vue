
<template>
  <div class="section-container ">
    <el-tag> canvas 基础应用，选择元素后按 delete| backspace 可以删除 </el-tag>
    <el-row :gutter="25" style="margin-bottom: 50px;">
      <el-col :span="4">
        <el-button type="primary" size="mini" @click="drawRect">添加矩形</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="mini" @click="drawCircle">添加圆形</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="mini" @click="drawTriangle">添加三角形</el-button>
      </el-col>
  
      <el-col :span="4">
        <el-button type="warning" size="mini" @click="drawImage">添加图片</el-button>
      </el-col>
  
      <el-col :span="4">
        <el-button type="warning" size="mini" @click="drawTxt">添加文字</el-button>
      </el-col>
  
      <el-col :span="4">
        <el-button type="danger" size="mini" @click="clearAll">清空所有</el-button>
      </el-col>
    </el-row>
   
    <canvas
        id="canvas"
        width="1000"
        height="700"
        style="border: 1px solid rgb(170, 170, 170); touch-action: none; user-select: none;"
        class="lower-canvas"></canvas>
   
  </div>
</template>

<script>
  import {ref, defineComponent, onMounted, onBeforeUnmount } from "vue"
  import { ElMessage } from 'element-plus'
  import { Mark } from './utils'
  const markHandle = new Mark()
  
  export default defineComponent ({
    name : 'Fabric',
    
    setup() {
      const canvas = ref( null )
  
      function drawRect() {
        markHandle.addRect()
      }
      function drawCircle() {
        markHandle.addCircle()
      }
      function drawTriangle() {
        markHandle.addTriangle()
      }
  
      function onChange(options) {
        options.target.setCoords()
        canvas.value.forEachObject(function(obj) {
          if (obj === options.target) return
          obj.set('opacity' ,options.target.intersectsWithObject(obj) ? 0.5 : 1)
        })
      }
      
      function removeActive() {
        const activeObject = canvas.value.getActiveObject()
        if ( !activeObject || !activeObject.name ) {
          ElMessage.warning( '请先选中一个有效元素' )
          return false
        }
        markHandle.removeObj( activeObject )
      }
      
      function handleKeyup( event ) {
        const e = event || window.event || arguments.callee.caller.arguments[0]
        if ( !e ) return false
        const keyCode = e.keyCode || e.which || e.charCode
        switch ( keyCode ) {
          case 46:
            removeActive()
            break;
          case 8:
            removeActive()
            break;
        }
      }
  
      function drawImage() {
        markHandle.addImage( '/static/pug_small.jpg' )
      }
      function drawTxt() {
        markHandle.addTxt( '我是一段测试文字', {
          fill: '#fff',
          fontSize: 16,
          fontFamily: 'Open Sans',
          textBackgroundColor: '#002244'
        } )
      }
  
      function clearAll() {
        markHandle.clear()
      }
     
      onMounted( () => {
        canvas.value = markHandle.init( 'canvas' )
        canvas.value.on({
          'object:moving': onChange,
          'object:scaling': onChange,
          'object:rotating': onChange,
        })
        markHandle.addRect()
        window.addEventListener( 'keyup', e => {
          handleKeyup( e )
        } )
      } )
      onBeforeUnmount( () => {
        clearAll()
        window.removeEventListener( 'keyup', e => {
          handleKeyup( e )
        } )
      } )
      
      return {
        canvas,
        drawCircle,
        drawRect,
        drawTriangle,
        clearAll,
        drawImage,
        drawTxt,
      };
    },
  })
</script>

<style lang="scss" scoped>

</style>
