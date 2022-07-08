<template>
  <yu-layout title="自定义指令" subtitle="非常实用的Vue自定义指令">
    <template #body>
      <div class="section-container">
        <el-row :gutter="25">
          <el-col :span="12">
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>复制 v-copy</span>
                </div>
              </template>
              <div class="h50">
                <el-row :gutter="10">
                  <el-col :span="18">
                    <el-input placeholder="请输入" v-model="value" />
                  </el-col>
                  <el-col :span="6">
                    <el-button
                      type="primary"
                      v-clipboard:copy="value"
                      v-clipboard:success="clipboardSuccess"
                      v-clipboard:error="clipboardError"
                    >
                      复制
                    </el-button>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>水波纹动效 v-waves</span>
                </div>
              </template>
              <div class="h50">
                <el-button type="primary" v-wave> 点我点我快点我 </el-button>
              </div>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>长按指令 v-longpress</span>
                </div>
              </template>
              <div class="h50">
                <el-button type="primary" v-longpress="longPressClick"> 长按我1s以上 </el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>防抖指令 v-dobounce</span>
                </div>
              </template>
              <div class="h50">
                <el-button type="primary" v-dobounce="debounceClick"> 点我看看 </el-button>
              </div>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>水印 v-waterMarker</span>
                </div>
              </template>
              <div
                class="water-marker h200"
                v-waterMarker="{
                  text: '小灰灰版权所有',
                  textColor: 'rgba(239,53,54,0.4)',
                }"
              ></div>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>拖拽指令 v-draggable</span>
                </div>
              </template>
              <div class="drag-container h200">
                <div class="drag-box" v-draggable></div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="24">
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>权限指令 v-permission</span>
                </div>
              </template>

              <el-button style="margin: 10px 0" type="primary" @click="togglePermission" size="small">
                切换权限
              </el-button>

              <div :key="currentRoleIndex">
                <el-tag class="permission-sourceCode" type="info"> 当前权限 ：{{ currentRole.join('_') }} </el-tag>
                <div class="item">
                  <el-button type="success" size="small" v-permission="['admin']"> 有权限 admin </el-button>
                </div>
                <div class="item">
                  <el-button type="warning" size="small" v-permission="['editor']"> 有权限 editor </el-button>
                </div>
                <div class="item">
                  <el-button type="danger" size="small" v-permission="['admin', 'editor']">
                    有权限 admin + editor</el-button
                  >
                </div>
                <div class="item">
                  <el-button type="primary" size="small" v-permission="['user']">有权限 user</el-button>
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="24">
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>coming soon</span>
                </div>
              </template>
              <div class="h50">即将推出一些其他常用指令，如懒加载等</div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </template>
  </yu-layout>
</template>

<script setup>
import { ref, unref } from 'vue'
import { usePermissionStore } from '/@/store'
import { ElMessage } from 'element-plus/lib'
import YuLayout from '/@/components/YuLayout'

const permissionStore = usePermissionStore()

const clipboardSuccess = () => {
  ElMessage.success( '复制成功' )
}
const clipboardError = () => {
  ElMessage.error( '复制失败' )
}
const longPressClick = () => {
  ElMessage.error( '你按疼我了...' )
}
const debounceClick = () => {
  ElMessage.warning( '嗯，你说的都对。。。' )
}

const value = ref( '' )
const currentRole = ref( [] )
const currentRoleIndex = ref( 0 )

const togglePermission = async() => {
  const roleData = ['admin', 'editor', 'user']
  currentRoleIndex.value++
  if ( currentRoleIndex.value > 2 ) currentRoleIndex.value = 0
  currentRole.value = roleData.splice( currentRoleIndex.value, 1 )
  await permissionStore.SET_DIRECTIVE_ROLE( unref( currentRole ) )
}

defineOptions( {
  name : 'Directive'
} )
</script>

<style lang="scss" scoped>
.h50 {
  height: 50px;
}
.h200 {
  height: 200px;
}
.drag-container {
  position: relative;
  .drag-box {
    width: 100px;
    height: 100px;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
  }
}
.item {
  margin: 10px 0;
}

:deep(.el-col) {
  margin-bottom: 10px;
}
</style>
