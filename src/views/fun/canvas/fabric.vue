<template>
  <yu-layout title="canvas神器 - fabric" :subtitle="subtitle">
    <template #head>
      <ul style="padding-left: 15px">
        <li>
          在Canvas上创建、填充图形（包括图片、文字、规则图形和复杂路径组成图形）。
        </li>
        <li>给图形填充渐变颜色。</li>
        <li>组合图形（包括组合图形、图形文字、图片等）。</li>
        <li>设置图形动画集用户交互。</li>
        <li>生成JSON, SVG数据等。</li>
        <li>生成Canvas对象自带拖拉拽功能。</li>
      </ul>
    </template>

    <template #body>
      <div class="section-container">
        <el-descriptions
          title="canvas 基础应用，选择元素后按 delete| backspace 可以删除"
          :column="3"
        >
          <el-descriptions-item label="">
            <el-button type="primary" size="mini" @click="drawRect"
              >添加矩形</el-button
            >
          </el-descriptions-item>
          <el-descriptions-item label="">
            <el-button type="primary" size="mini" @click="drawCircle"
              >添加圆形</el-button
            >
          </el-descriptions-item>
          <el-descriptions-item label="">
            <el-button type="primary" size="mini" @click="drawTriangle"
              >添加三角形</el-button
            >
          </el-descriptions-item>
          <el-descriptions-item label="">
            <el-button type="warning" size="mini" @click="drawImage"
              >添加图片</el-button
            >
          </el-descriptions-item>
          <el-descriptions-item label="">
            <el-button type="warning" size="mini" @click="drawTxt"
              >添加文字</el-button
            >
          </el-descriptions-item>
          <el-descriptions-item label="">
            <el-button type="danger" size="mini" @click="clearAll"
              >清空所有</el-button
            >
          </el-descriptions-item>
        </el-descriptions>

        <canvas
          id="canvas"
          width="1000"
          height="700"
          style="
            border: 1px solid rgb(170, 170, 170);
            touch-action: none;
            user-select: none;
          "
          class="lower-canvas"
        ></canvas>
      </div>
    </template>
  </yu-layout>
</template>

<script>
import { ref, defineComponent, onMounted, onBeforeUnmount } from 'vue'
// import { ElMessage } from 'element-plus'
import * as ELEMENT from 'element-plus'
const { ElMessage } = ELEMENT
import { Mark } from './utils'
const markHandle = new Mark()
import YuLayout from '/@/components/YuLayout'

export default defineComponent( {
  name : 'Fabric',
  components : { YuLayout },
  setup() {
    const canvas = ref( null )
    const subtitle = ref(
      `Fabric.js是一个可以简化Canvas程序编写的库。 Fabric.js为Canvas提供所缺少的对象模型, svg parser, 交互和一整套其他不可或缺的工具。官方文档地址：<a href="http://fabricjs.com/">点我前往 http://fabricjs.com/</a> `
    )

    function drawRect() {
      markHandle.addRect()
    }
    function drawCircle() {
      markHandle.addCircle()
    }
    function drawTriangle() {
      markHandle.addTriangle()
    }

    function onChange( options ) {
      options.target.setCoords()
      canvas.value.forEachObject( function( obj ) {
        if ( obj === options.target ) return
        obj.set( 'opacity', options.target.intersectsWithObject( obj ) ? 0.5 : 1 )
      } )
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
      // eslint-disable-next-line no-caller
      const e = event || window.event || arguments.callee.caller.arguments[0]
      if ( !e ) return false
      const keyCode = e.keyCode || e.which || e.charCode
      // eslint-disable-next-line default-case
      switch ( keyCode ) {
        case 46:
          removeActive()
          break
        case 8:
          removeActive()
          break
      }
    }

    function drawImage() {
      markHandle.addImage( '/static/pug_small.jpg' )
    }
    function drawTxt() {
      markHandle.addTxt( '我是一段测试文字', {
        fill : '#fff',
        fontSize : 16,
        fontFamily : 'Open Sans',
        textBackgroundColor : '#002244'
      } )
    }

    function clearAll() {
      markHandle.clear()
    }

    onMounted( () => {
      canvas.value = markHandle.init( 'canvas' )
      canvas.value.on( {
        'object:moving' : onChange,
        'object:scaling' : onChange,
        'object:rotating' : onChange
      } )
      markHandle.addRect()
      window.addEventListener( 'keyup', ( e ) => {
        handleKeyup( e )
      } )
    } )
    onBeforeUnmount( () => {
      clearAll()
      window.removeEventListener( 'keyup', ( e ) => {
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
      subtitle
    }
  }
} )
</script>

<style lang="scss" scoped>
:deep .el-descriptions__body {
  background: #f0f2f5;
}
.el-button {
  width: 92px;
}
</style>
