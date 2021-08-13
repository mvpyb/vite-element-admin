<template>
  <div class="section-container ">
    <el-row :gutter="25">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>复制</span>
            </div>
          </template>
          <div>
            <el-row :gutter="10">
              <el-col :span="18">
                <el-input placeholder="请输入" v-model="value" />
              </el-col>
              <el-col :span="6">
                <el-button
                    type="primary"
                    v-copy:copy="value"
                    v-copy:success="clipboardSuccess"
                    v-copy:error="clipboardError"
                > 复制 </el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
  
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>水波纹</span>
            </div>
          </template>
          <div>
            <el-button type="primary" v-waves> 点我点我快点我 </el-button>
          </div>
        </el-card>
      </el-col>
  
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>长按事件</span>
            </div>
          </template>
          <div>
            <el-button type="primary" v-longpress="longPressClick"> 长按我1s以上 </el-button>
          </div>
        </el-card>
      </el-col>
  
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>防抖指令</span>
            </div>
          </template>
          <div>
            <el-button type="primary" v-dobounce="debounceClick"> 点我看看 </el-button>
          </div>
        </el-card>
      </el-col>
  
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>水印指令</span>
            </div>
          </template>
          <div class="water-marker h200" v-waterMarker="{text:'小灰灰版权所有',textColor:'rgba(239,53,54,0.4)'}">
          </div>
        </el-card>
      </el-col>
  
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>拖拽指令</span>
            </div>
          </template>
          <div class="drag-container">
            <div class="drag-box" v-draggable></div>
          </div>
        </el-card>
      </el-col>
  
      <el-col :span="24">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>权限指令</span>
            </div>
          </template>
      
          <el-button style="margin: 10px 0;" type="primary" @click="togglePermission" size="mini"> 切换权限 </el-button>
      
          <div :key="currentRoleIndex">
            <el-tag class="permission-sourceCode" type="info">
              当前权限 ：{{ currentRole.join( '_' ) }}
            </el-tag>
            <div class="item"> <el-button type="success" size="mini" v-permission="['admin']"> 有权限 admin </el-button> </div>
            <div class="item"> <el-button type="warning" size="mini" v-permission="['editor']"> 有权限 editor </el-button> </div>
            <div class="item"> <el-button type="danger" size="mini" v-permission="['admin','editor']"> 有权限  admin + editor</el-button> </div>
            <div class="item"> <el-button type="primary" size="mini" v-permission="['user']"> 有权限  user</el-button> </div>
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
        </el-card>
      </el-col>
      
    </el-row>
  </div>
</template>

<script>
  import {ref, defineComponent, unref } from "vue"
  import {useStore} from "vuex"
  import { ElMessage } from 'element-plus'
  import clipboard from '/@/directive/clipboard/clipboard'
  import waves from '/@/directive/wave/waves'
  import longpress from '/@/directive/longpress'
  import dobounce from '/@/directive/dobounce'
  import waterMarker from '/@/directive/waterMarker'
  import draggable from '/@/directive/draggable'
  import permission from '/@/directive/permission'
  
  
  export default defineComponent ({
    name : 'Copy',
    directives: {
      copy: clipboard,
      waves,
      longpress,
      dobounce,
      waterMarker,
      draggable,
      permission,
    },
    setup() {
      const valueRef = ref('')
      const store = useStore()
      
      const clipboardSuccess = () => {
        ElMessage.success('复制成功')
      }
      const clipboardError = () => {
        ElMessage.error('复制失败')
      }
      const longPressClick = () => {
        ElMessage.error('你按疼我了...')
      }
      const debounceClick = () => {
        ElMessage.warning('嗯，你说的都对。。。')
      }
      
      const currentRole = ref( [] )
      const currentRoleIndex = ref( 0 )
      
      const togglePermission = async () => {
        const roleData = ['admin', 'editor', 'user']
        currentRoleIndex.value++
        if ( currentRoleIndex.value > 2 ) currentRoleIndex.value = 0
        currentRole.value = roleData.splice( currentRoleIndex.value, 1 )
        await store.dispatch( 'permission/setDirectivePermission', unref( currentRole ) )
      }
      
      return {
        clipboardSuccess,
        clipboardError,
        longPressClick,
        debounceClick,
        togglePermission,
        currentRole,
        currentRoleIndex,
        value : valueRef
      }
    },
  })
</script>

<style lang="scss" scoped>
  .h200 {
    height: 200px;
  }
  .drag-container {
    height: 200px;
    position: relative;
    .drag-box {
      width: 100px;
      height: 100px;
      background: rgba(0,0,0,0.5);
      position: absolute;
      top: 0;
      left: 0;
      
    }
  }
  
  .item {
    margin: 10px 0;
  }

</style>
