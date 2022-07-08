<template>
  <div class="icons-container">
    <el-tabs type="border-card">
      <el-tab-pane label="Svg Icons">
        <div
          v-for="item in svgIcons"
          :key="item"
          v-clipboard:copy="handleClipboard(item)"
          v-clipboard:success="clipboardSuccess"
        >
          <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top">
            <template #content>{{ item }}</template>
            <div class="icon-item">
              <svg-icon :icon-class="item" class-name="disabled" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Element Icons">
        <div
          v-for="component in ElementIcons"
          :key="component.name"
          :ref="component.name"
          v-clipboard:copy="handleClipboardE(component)"
          v-clipboard:success="clipboardSuccess"
        >
          <el-tooltip class="item" effect="dark" placement="top">
            <template #content>{{ component.name }}</template>
            <div class="icon-item">
              <ElIcon :size="30">
                <component :is="component" />
              </ElIcon>
              <span>{{ component.name }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Vxe Icons">
        <div
          v-for="icon in vxeIcons"
          :key="icon.icon"
          :ref="icon.icon"
          v-clipboard:copy="handleClipboardV(icon)"
          v-clipboard:success="clipboardSuccess"
        >
          <el-tooltip class="item" effect="dark" placement="top">
            <template #content>{{ icon.icon }}</template>
            <div class="icon-item">
              <i :class="'vxe-icon--' + icon.icon"></i>
              <span>{{ icon.icon }}</span>
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
import { ElMessage } from 'element-plus'
import * as ElementIcons from '@element-plus/icons-vue'

const vxeIcons = ref( [
  {
    icon : 'caret-top'
  },
  {
    icon : 'caret-bottom'
  },
  {
    icon : 'caret-left'
  },
  {
    icon : 'caret-right'
  },
  {
    icon : 'arrow-top'
  },
  {
    icon : 'arrow-bottom'
  },
  {
    icon : 'arrow-left'
  },
  {
    icon : 'arrow-right'
  },
  {
    icon : 'd-arrow-left'
  },
  {
    icon : 'd-arrow-right'
  },
  {
    icon : 'menu'
  },
  {
    icon : 'edit-outline'
  },
  {
    icon : 'more'
  },
  {
    icon : 'check'
  },
  {
    icon : 'close'
  },
  {
    icon : 'plus'
  },
  {
    icon : 'minus'
  },
  {
    icon : 'refresh'
  },
  {
    icon : 'refresh roll'
  },
  {
    icon : 'funnel'
  },
  {
    icon : 'question'
  },
  {
    icon : 'info'
  },
  {
    icon : 'warning'
  },
  {
    icon : 'success'
  },
  {
    icon : 'error'
  },
  {
    icon : 'remove'
  },
  {
    icon : 'circle-plus'
  },
  {
    icon : 'zoomin'
  },
  {
    icon : 'zoomout'
  },
  {
    icon : 'upload'
  },
  {
    icon : 'download'
  },
  {
    icon : 'eye'
  },
  {
    icon : 'eye-slash'
  },
  {
    icon : 'calendar'
  },
  {
    icon : 'dot'
  },
  {
    icon : 'print'
  },
  {
    icon : 'search'
  }
] )

const svgIcons = ref( svgs )

const handleClipboard = text => {
  return `<svg-icon icon-class="${text}" />`
}
const handleClipboardE = text => {
  return `<el-icon > <${text.name}/> </el-icon>`
}
const handleClipboardV = text => {
  return `<i class="vxe-icon--${text.icon}" />`
}
const clipboardSuccess = ( text, e ) => {
  ElMessage.success( '复制成功' )
}

defineOptions( {
  name : 'Icons'
} )
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
    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }

    [class*='vxe-icon--'],
    [class^='vxe-icon--'] {
      color: #606266;
      border-color: #606266;
    }
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    display: inline-block;
    pointer-events: none;
  }
}
</style>
