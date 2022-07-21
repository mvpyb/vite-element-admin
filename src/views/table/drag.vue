<template>
  <yu-layout title="拖拽表格">
    <template #body>
      <div class="section-container">
        <el-divider content-position="left">Element Plus Table</el-divider>

        <el-table
          ref="dragTable"
          v-loading="listLoading"
          :data="list"
          row-key="id"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column align="center" label="ID" width="65">
            <template #default="{ row }">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column width="180px" align="center" label="Date">
            <template #default="{ row }">
              <span>{{ parseTime(row.timestamp, '{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>

          <el-table-column min-width="300px" label="Title">
            <template #default="{ row }">
              <span>{{ row.title }}</span>
            </template>
          </el-table-column>

          <el-table-column width="110px" align="center" label="Author">
            <template #default="{ row }">
              <span>{{ row.author }}</span>
            </template>
          </el-table-column>

          <el-table-column width="100px" label="Importance">
            <template #default="{ row }">
              <svg-icon v-for="n in row.importance" :key="n" icon-class="star" class="icon-star" />
            </template>
          </el-table-column>

          <el-table-column align="center" label="Readings" width="95">
            <template #default="{ row }">
              <span>{{ row.pageviews }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="Status" width="110">
            <template #default="{ row }">
              <el-tag :type="statusFilter(row.status)">{{ row.status }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column align="center" label="Drag" width="80">
            <template #default>
              <svg-icon class="drag-handler" icon-class="drag" />
            </template>
          </el-table-column>
        </el-table>

        <el-divider content-position="left">Vxe Table</el-divider>
        <vxe-table round border :data="list" :loading="listLoading" ref="dragVxeTable" style="width: 100%">
          <vxe-column align="center" field="id" title="ID" width="65" />

          <vxe-column align="center" field="timestamp" title="Date" width="180">
            <template #default="{ row }">
              <span>{{ parseTime(row.timestamp, '{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </vxe-column>

          <vxe-column align="center" field="title" title="Title" min-width="300px" />

          <vxe-column align="left" field="author" title="Author" width="110px" />

          <vxe-column align="center" field="importance" width="100px" title="Importance">
            <template #default="{ row }">
              <svg-icon v-for="n in row.importance" :key="n" icon-class="star" class="icon-star" />
            </template>
          </vxe-column>

          <vxe-column align="center" title="Readings" width="95">
            <template #default="{ row }">
              <span>{{ row.pageviews }}</span>
            </template>
          </vxe-column>

          <vxe-column class-name="status-col" title="Status" width="110">
            <template #default="{ row }">
              <el-tag :type="statusFilter(row.status)">{{ row.status }}</el-tag>
            </template>
          </vxe-column>

          <vxe-column align="center" title="Drag" width="80">
            <template #default>
              <svg-icon class="drag-handler" icon-class="drag" />
            </template>
          </vxe-column>
        </vxe-table>

        <div class="show-d"><el-tag>The default order :</el-tag> {{ oldList }}</div>
        <div class="show-d"><el-tag>The after dragging order :</el-tag> {{ newList }}</div>
      </div>
    </template>
  </yu-layout>
</template>

<script setup>
import { ref, reactive, shallowRef, nextTick } from 'vue'
import { parseTime } from '/@/utils'
import { getArticle } from '/@/api/article'
import Sortable from 'sortablejs'
import YuLayout from '/@/components/YuLayout'
import { isNullAndUnDef } from '/@/utils/validate'

const dragTable = ref( null )
const dragVxeTable = ref( null )
const list = ref( null )
const total = ref( null )
const listLoading = ref( true )
const listQuery = reactive( {
  page : 1,
  limit : 10
} )
const sortable = shallowRef( null )
const oldList = ref( [] )
const newList = ref( [] )

const sortableVxe = shallowRef( null )

const getList = async() => {
  listLoading.value = true
  const { data } = await getArticle( listQuery )
  list.value = data.items
  total.value = data.total
  listLoading.value = false
  oldList.value = list.value.map( v => v.id )
  newList.value = oldList.value.slice()
  nextTick( () => {
    setSort()
  } )
}

const statusFilter = status => {
  const statusMap = {
    published : 'success',
    draft : 'info',
    deleted : 'danger'
  }
  return statusMap[status]
}

const setSort = () => {
  const el = dragTable.value.$el.querySelectorAll( '.el-table__inner-wrapper .el-table__body-wrapper table > tbody' )[0]
  const vxeEl = dragVxeTable.value.$el.querySelectorAll(
    '.vxe-table--main-wrapper .vxe-table--body-wrapper table > tbody'
  )[0]

  const options = {
    ghostClass : 'sortable-ghost', // Class name for the drop placeholder,
    setData : function( dataTransfer ) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData( 'Text', '' )
    },
    onEnd : evt => {
      const { oldIndex, newIndex } = evt
      if ( isNullAndUnDef( oldIndex ) || isNullAndUnDef( newIndex ) || oldIndex === newIndex ) {
        return
      }
      const targetRow = list.value.splice( oldIndex, 1 )[0]
      list.value.splice( newIndex, 0, targetRow )

      const tempIndex = newList.value.splice( oldIndex, 1 )[0]
      newList.value.splice( newIndex, 0, tempIndex )
    }
  }

  sortable.value = Sortable.create( el, options )
  sortableVxe.value = Sortable.create( vxeEl, options )
}

getList()

defineOptions( {
  name : 'DragTable'
} )
</script>

<style>
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>

<style scoped>
.icon-star {
  margin-right: 2px;
}
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d {
  margin-top: 15px;
}
</style>
