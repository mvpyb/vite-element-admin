<template>
  <page-layout
      title="动画组件的简单使用"
      subtitle="非常实用的Vue动画组件(本页面所用css 均来自于 ： https://emilkowalski.github.io/css-effects-snippets/)">
    <template #body>
      <div class="section-container ">
        <el-tabs v-model="activeName" >
          <el-tab-pane label="常用css动画" name="first">
            <el-row :gutter="10">
              <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4" v-for="item in animateList" :key="item.className">
                <div class="animate-item" v-copy:copy="item.css" v-copy:success="copySuccess">
                  <div :class="item.className" v-html="item.html"></div>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="数字动画" name="second">
          
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </page-layout>
</template>

<script>
  import {ref, defineComponent, onMounted } from "vue"
  import { ElMessage } from 'element-plus'
  import clipboard from '/@/directive/clipboard/clipboard'
  import PageLayout from '/@/components/layout/index.vue'
  import effects from "./utils"
  
  export default defineComponent ({
    name : 'Animate',
    components : { PageLayout },
    directives : { copy: clipboard },
    setup() {
      const activeName = ref( 'second' )
      const animateList = ref( effects )
      onMounted( () => {
      
      } )
      function copySuccess() {
        ElMessage.success( '复制成功' )
      }
      return {
        animateList, copySuccess, activeName
      }
    },
  })
</script>

<style lang="scss" scoped>
  .animate-item {
    height: 4rem;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    display: flex;
    margin: 30px 0;
  }
  
</style>
