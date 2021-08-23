<template>
  <page-layout
      title="动画组件的简单使用"
      subtitle="非常实用的Vue动画组件(本页面所用css 均来自于 ： https://emilkowalski.github.io/css-effects-snippets/)">
    <template #body>
      <div class="section-container ">
        <el-tabs v-model="activeName">
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
            <div v-if="activeName === 'second'">
              <el-row :gutter="40" class="panel-group">
                <el-col :span="8" class="card-panel-col">
                  默认：
                  <CountTo
                      :duration="2000"
                      :start-val="1"
                      :end-val="9527"
                  />
                </el-col>
                <el-col :span="8" class="card-panel-col">
                  示例一：
                  <CountTo
                      prefix="￥"
                      :duration="2000"
                      :color="'#f4516c'"
                      :fontSize="'2.5em'"
                      :start-val="0"
                      :end-val="9527"
                  />
                </el-col>
                <el-col :span="8" class="card-panel-col">
                  示例二：
                  <CountTo
                      suffix="-test"
                      :duration="2000"
                      :color="'red'"
                      :fontSize="'2.5em'"
                      :start-val="0"
                      :end-val="9527"
                  />
                </el-col>
              </el-row>
              <el-row :gutter="40" class="panel-group">
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <panel-card icon="application" :start="0" :end="9527" :duration="2600" message="App Nums" @handleClick="handleClick" />
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <panel-card icon="money" :start="0" :end="9527000" :duration="4000" type="money" message="Revenue" />
                </el-col>
    
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <panel-card icon="peoples" :start="0" :end="81212" :duration="3000" type="message" message="User Nums" />
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <panel-card icon="shopping" :start="0" :end="13600" :duration="3600" type="shopping" message="Product Nums" />
                </el-col>
              </el-row>
            </div>
            
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </page-layout>
</template>

<script>
  import {ref, defineComponent, onMounted, getCurrentInstance } from "vue"
  import { ElMessage } from 'element-plus'
  import clipboard from '/@/directive/clipboard/clipboard'
  import PageLayout from '/@/components/layout/index.vue'
  import effects from "./utils"
  import CountTo from "/@/components/CountTo/index.vue"
  import PanelCard from "/@/components/PanelCard/index.vue"
  
  export default defineComponent ({
    name : 'Animate',
    components : { PageLayout, CountTo, PanelCard },
    directives : { copy: clipboard },
    setup() {
      const { ctx: _this } = getCurrentInstance()
      const activeName = ref( 'first' )
      const animateList = ref( effects )
      onMounted( () => {
      
      } )
      function handleClick() {
        console.log( 'handleClick' )
        // _this.$forceUpdate()
      }
      function copySuccess() {
        ElMessage.success( '复制成功' )
      }
      return {
        animateList, copySuccess, activeName,
        handleClick
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
  .panel-group {
    margin-top: 18px;
    .card-panel-col {
      margin-bottom: 32px;
    }
  }
</style>
