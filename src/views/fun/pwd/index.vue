<template>
  <yu-layout title="密码组件" subtitle="密码组件的简单使用">
    <template #body>
      <div class="section-container">
        <el-divider content-position="left"
          >密码输入组件 -- 纯数字密码</el-divider
        >
        <YuPassword
          @getFullPwd="getFullPwd1"
          :initial="initial1"
          :pureNum="true"
          :showPwd="showPwd1"
        />
        <el-button @click="toggleShow1" type="primary"
          >显示/ 隐藏密码</el-button
        >
        <el-button type="primary">当前密码 {{ fullPwd1 }}</el-button>

        <el-divider content-position="left"
          >密码输入组件 -- 复杂密码</el-divider
        >
        <YuPassword
          @getFullPwd="getFullPwd2"
          :initial="initial2"
          :pureNum="false"
          :showPwd="showPwd2"
        />
        <el-button @click="toggleShow2" type="primary"
          >显示/ 隐藏密码</el-button
        >
        <el-button type="primary">当前密码 {{ fullPwd2 }}</el-button>

        <el-divider content-position="left">密码强度组件</el-divider>
        <YuStrength @scoreChange="scoreChange" @change="change" />
      </div>
    </template>
  </yu-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import YuLayout from '/@/components/YuLayout'
import { YuPassword, YuStrength } from '/@/components/YuPassword'
import focus from '/@/directive/focus'

export default defineComponent( {
  name : 'Video',
  props : {
    value : {
      type : String,
      default : ''
    },
    showInput : {
      type : Boolean,
      default : true
    },
    disabled : {
      type : Boolean,
      default : false
    }
  },
  components : { YuLayout, YuPassword, YuStrength },
  directives : { focus },
  setup() {
    // 密码强度组件
    function scoreChange( score ) {
      console.log( '密码强度', score )
    }
    function change( val ) {
      console.log( '当前密码', val )
    }

    // 仿支付宝密码输入组件
    const fullPwd1 = ref( '' )
    const fullPwd2 = ref( '' )
    const initial1 = ref( '952788' )
    const initial2 = ref( '95啊啊27' )
    const showPwd1 = ref( false )
    const showPwd2 = ref( false )
    function toggleShow1( val ) {
      showPwd1.value = !showPwd1.value
    }
    function toggleShow2( val ) {
      showPwd2.value = !showPwd2.value
    }
    function getFullPwd1( val ) {
      fullPwd1.value = val || ''
    }
    function getFullPwd2( val ) {
      fullPwd2.value = val || ''
    }

    return {
      scoreChange,
      change,

      getFullPwd1,
      getFullPwd2,
      initial1,
      initial2,
      toggleShow1,
      toggleShow2,
      showPwd1,
      showPwd2,
      fullPwd1,
      fullPwd2
    }
  }
} )
</script>

<style lang="scss" scoped></style>
