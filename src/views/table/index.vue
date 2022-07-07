<template>
  <yu-layout title="vxe-table">
    <template #head>
      更强大的table组件，解决复杂的表格业务，提高开发效率以及渲染性能。vxe-table
      利用虚拟滚动，仅渲染用户可视的部分，其他部分不渲染，这对于表格的性能有比较大的提升
      <el-link type="primary"
href="https://vxetable.cn/#/table/start/install"
target="_blank"
:underline="false"
        >点我查看更多</el-link
      >
    </template>

    <template #body>
      <div>
        <vxe-button status="primary" v-wave content="主要颜色" />
        <vxe-table border :column-config="{ resizable: true }" :tree-config="{ transform: true }" :data="tableData">
          <vxe-column field="name" title="Name" tree-node></vxe-column>
          <vxe-column type="expand" title="Details" width="80">
            <template #content="{ row }">
              <ul class="expand-wrapper">
                <li>
                  <span>ID：</span>
                  <span>{{ row.id }}</span>
                </li>
                <li>
                  <span>Name：</span>
                  <span>{{ row.name }}</span>
                </li>
                <li>
                  <span>Date</span>
                  <span>{{ row.date }}</span>
                </li>
              </ul>
            </template>
          </vxe-column>
          <vxe-column field="size" title="Size"></vxe-column>
          <vxe-column field="type" title="Type"></vxe-column>
          <vxe-column field="date" title="Date"></vxe-column>
        </vxe-table>
      </div>
    </template>
  </yu-layout>
</template>

<script setup>
import { ref } from 'vue'
import YuLayout from '/@/components/YuLayout'
const tableData = ref( [
  { id : 10000, parentId : null, name : 'test abc1', type : 'mp3', size : 1024, date : '2020-08-01' },
  { id : 10050, parentId : null, name : 'Test2', type : 'mp4', size : null, date : '2021-04-01' },
  { id : 24300, parentId : 10050, name : 'Test3', type : 'avi', size : 1024, date : '2020-03-01' },
  { id : 20045, parentId : 24300, name : 'test abc4', type : 'html', size : 600, date : '2021-04-01' },
  { id : 10053, parentId : 24300, name : 'test abc96', type : 'avi', size : null, date : '2021-04-01' },
  { id : 24330, parentId : 10053, name : 'test abc5', type : 'txt', size : 25, date : '2021-10-01' },
  { id : 21011, parentId : 10053, name : 'Test6', type : 'pdf', size : 512, date : '2020-01-01' },
  { id : 22200, parentId : 10053, name : 'Test7', type : 'js', size : 1024, date : '2021-06-01' },
  { id : 23666, parentId : null, name : 'Test8', type : 'xlsx', size : 2048, date : '2020-11-01' },
  { id : 23677, parentId : 23666, name : 'Test7', type : 'js', size : 1024, date : '2021-06-01' },
  { id : 23671, parentId : 23677, name : 'Test7', type : 'js', size : 1024, date : '2021-06-01' },
  { id : 23672, parentId : 23677, name : 'Test7', type : 'js', size : 1024, date : '2021-06-01' },
  { id : 23688, parentId : 23666, name : 'Test7', type : 'js', size : 1024, date : '2021-06-01' },
  { id : 23681, parentId : 23688, name : 'Test7', type : 'js', size : 1024, date : '2021-06-01' },
  { id : 23682, parentId : 23688, name : 'Test7', type : 'js', size : 1024, date : '2021-06-01' },
  { id : 24555, parentId : null, name : 'test abc9', type : 'avi', size : 224, date : '2020-10-01' },
  { id : 24566, parentId : 24555, name : 'Test7', type : 'js', size : 1024, date : '2021-06-01' },
  { id : 24577, parentId : 24555, name : 'Test7', type : 'js', size : 1024, date : '2021-06-01' }
] )

defineOptions( {
  name : 'Table'
} )
</script>

<style lang="scss" scoped></style>
