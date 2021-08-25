<template>
  <page-layout title="密码组件" subtitle="密码组件的简单使用">
    <template #body>
      <div class="section-container">
        <el-divider content-position="left">密码输入组件 -- 纯数字密码</el-divider>
        <Password @getFullPwd="getFullPwd1" :initial="initial1" :pureNum="true" :showPwd="showPwd1" />
        <el-button @click="toggleShow1" type="primary">显示/ 隐藏密码</el-button>
        <el-button type="primary">当前密码 {{fullPwd1}}</el-button>
        
        <el-divider content-position="left">密码输入组件 -- 复杂密码</el-divider>
        <Password @getFullPwd="getFullPwd2" :initial="initial2" :pureNum="false" :showPwd="showPwd2" />
        <el-button @click="toggleShow2" type="primary">显示/ 隐藏密码</el-button>
        <el-button type="primary">当前密码 {{fullPwd2}}</el-button>
  
        <el-divider content-position="left">密码强度组件</el-divider>
        <Strength @scoreChange="scoreChange" @change="change" />
       
      </div>
    </template>
  </page-layout>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import PageLayout from '/@/components/layout/index.vue'
  import Password from '/@/components/password/index.vue'
  import Strength from '/@/components/password/strength.vue'
  import focus from '/@/directive/focus'
  
  export default defineComponent ({
    name : 'Video',
    props: {
      value: {
        type : String,
        default : ''
      },
      showInput: {
        type : Boolean,
        default : true
      },
      disabled: {
        type : Boolean,
        default : false
      }
    },
    components : { PageLayout, Password, Strength },
    directives: { focus },
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
        
        getFullPwd1, getFullPwd2,
        initial1, initial2,
        toggleShow1, toggleShow2,
        showPwd1, showPwd2,
        fullPwd1, fullPwd2,
      
      }
    },
  })
</script>

<style lang="scss" scoped>
  /*.pwd-strength-bar {
    position: relative;
    height: 6px;
    margin: 10px auto 6px;
    border-radius: 6px;
    background-color: #000;
    
    &::before,
    &::after {
      position: absolute;
      z-index: 10;
      display: block;
      width: 20%;
      height: inherit;
      background-color: transparent;
      border-color: #fff;
      border-style: solid;
      border-width: 0 5px 0 5px;
      content: '';
    }
    
    &::before {
      left: 20%;
    }
    
    &::after {
      right: 20%;
    }
    
    .pwd-strength-bar-bar--fill {
      position: absolute;
      width: 0;
      height: inherit;
      background-color: transparent;
      border-radius: inherit;
      transition: width 0.5s ease-in-out, background 0.25s;
      
      &[data-score='0'] {
        width: 20%;
        background-color: #e74242
      }
      
      &[data-score='1'] {
        width: 40%;
        background-color: #ed6f6f;
      }
      
      &[data-score='2'] {
        width: 60%;
        background-color: #efbd47;
      }
      
      &[data-score='3'] {
        width: 80%;
        background-color: #55d18780;
      }
      
      &[data-score='4'] {
        width: 100%;
        background-color: #55d187;
      }
    }
  }*/
</style>
