<template>
  <div class="icons-container">
    <el-tabs type="border-card">
      <el-tab-pane label="Icons">
        <div
          v-for="item in svgIcons"
          :key="item"
          v-clipboard:copy="handleClipboard(item)"
          v-clipboard:success="clipboardSuccess"
        >
          <el-tooltip
            class="item"
            effect="dark"
            content="Top Left 提示文字"
            placement="top"
          >
            <template #content>{{ item }}</template>
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

<script setup>
import { ref } from 'vue'
import svgs from './svg-icons.js'
// import { ElMessage } from 'element-plus'
import * as ELEMENT from 'element-plus'
const { ElMessage } = ELEMENT

const svgIcons = ref( svgs )

const handleClipboard = ( text ) => {
  return `<svg-icon icon-class="${text}" />`
}
const clipboardSuccess = ( text ) => {
  ElMessage.success( '复制成功' )
}
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
