<template>
  <div class="icons-container">
    <el-tabs type="border-card">
      <el-tab-pane label="Icons">
        <div v-for="item in svgIcons" :key="item" >
          <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top">
            <template #content>{{item}}</template>
            <div class="icon-item">
              <svg-icon :icon-class="item" class-name="disabled" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {ref, defineComponent} from "vue"
  import svgs from './svg-icons.js'
  import SvgIcon from '/@/components/SvgIcon/index.vue'
  
  export default defineComponent ({
    name : 'Icons',
    components : { SvgIcon },
    setup() {
      const svgIcons = ref(svgs)
      const generateIconCode = () => {
        return `<svg-icon icon-class="${symbol}" />`
      }
      
      return {
        svgIcons, generateIconCode
      }
    }
  })
</script>

<style lang="scss" scoped>
  .icons-container {
    margin: 10px 20px 0;
    overflow: hidden;
    
    .icon-item {
      margin: 20px;
      height: 85px;
      text-align: center;
      width: 100px;
      float: left;
      font-size: 30px;
      color: #24292e;
      cursor: pointer;
    }
    
    span {
      display: block;
      font-size: 16px;
      margin-top: 10px;
    }
    
    .disabled {
      pointer-events: none;
    }
  }
</style>
