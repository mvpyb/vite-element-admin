<template>
  <yu-layout title="动态表格">
    <template #body>
      <div class="section-container">
        <div style="margin: 0 0 5px 20px">固定表头, 按照表头顺序排序</div>
        <FixedThead />

        <div style="margin: 30px 0 5px 20px">不固定表头, 按照点击顺序排序</div>
        <UnfixedThead />
      </div>
    </template>
  </yu-layout>
</template>

<script setup>
import FixedThead from './components/FixedThead'
import UnfixedThead from './components/UnfixedThead'
import YuLayout from '/@/components/YuLayout'
defineOptions( {
  name : 'DynamicTable'
} )
</script>

<style scoped lang="scss">
.yu-layout {
  ::v-deep(.body) {
    background: #fff;
  }
}
</style>
