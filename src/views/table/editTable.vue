<template>
  <yu-layout title="可编辑表格">
    <template #body>
      <div class="section-container">
        <el-divider content-position="left">Element Plus Table</el-divider>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
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

          <el-table-column min-width="300px" label="Title">
            <template #default="{ row }">
              <template v-if="row.edit">
                <el-input v-model="row.title" class="edit-input" size="small" />
                <el-button class="cancel-btn" size="small" type="warning" @click="cancelEdit(row)"> cancel </el-button>
              </template>
              <span v-else>{{ row.title }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="Actions" width="120">
            <template #default="{ row }">
              <vxe-button
                size="mini"
                status="success"
                v-if="row.edit"
                icon="el-icon-circle-check-outline"
                @click="confirmEdit(row)"
                >Ok</vxe-button
              >

              <vxe-button
                size="mini"
                status="primary"
                v-else
                icon="el-icon-circle-check-outline"
                @click="row.edit = !row.edit"
                >Edit</vxe-button
              >
            </template>
          </el-table-column>
        </el-table>

        <el-divider content-position="left">Vxe Table</el-divider>
        <vxe-table round border :data="list" :loading="listLoading" style="width: 100%">
          <vxe-column align="center" field="id" title="ID" width="65" />

          <vxe-column align="center" field="timestamp" title="Date" width="180px">
            <template #default="{ row }">
              <span>{{ parseTime(row.timestamp, '{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </vxe-column>

          <vxe-column align="center" field="author" title="Author" width="110px" />

          <vxe-column width="100px" title="Importance">
            <template #default="{ row }">
              <svg-icon v-for="n in row.importance" :key="n" icon-class="star" class="icon-star" />
            </template>
          </vxe-column>

          <vxe-column align="center" title="Readings" width="95">
            <template #default="{ row }">
              <span>{{ row.pageviews }}</span>
            </template>
          </vxe-column>

          <vxe-column class-name="status-col" label="Status" width="110">
            <template #default="{ row }">
              <el-tag :type="statusFilter(row.status)">{{ row.status }}</el-tag>
            </template>
          </vxe-column>

          <vxe-column min-width="300px" title="Title">
            <template #default="{ row }">
              <template v-if="row.edit">
                <el-input v-model="row.title" class="edit-input" size="small" />
                <el-button class="cancel-btn" size="small" type="warning" @click="cancelEdit(row)"> cancel </el-button>
              </template>
              <span v-else>{{ row.title }}</span>
            </template>
          </vxe-column>

          <vxe-column align="center" title="Actions" width="120">
            <template #default="{ row }">
              <vxe-button
                size="mini"
                status="success"
                v-if="row.edit"
                icon="el-icon-circle-check-outline"
                @click="confirmEdit(row)"
                >Ok</vxe-button
              >

              <vxe-button
                size="mini"
                status="primary"
                v-else
                icon="el-icon-circle-check-outline"
                @click="row.edit = !row.edit"
                >Edit</vxe-button
              >
            </template>
          </vxe-column>
        </vxe-table>
      </div>
    </template>
  </yu-layout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { parseTime } from '/@/utils'
import { getArticle } from '/@/api/article'
import YuLayout from '/@/components/YuLayout'
import { ElMessage } from 'element-plus'

const list = ref( null )
const listLoading = ref( true )
const listQuery = reactive( {
  page : 1,
  limit : 10
} )

const statusFilter = status => {
  const statusMap = {
    published : 'success',
    draft : 'info',
    deleted : 'danger'
  }
  return statusMap[status]
}

const getList = async() => {
  listLoading.value = true
  const { data } = await getArticle( listQuery )
  const items = data.items

  list.value = items.map( v => {
    return {
      ...v,
      edit : false,
      originalTitle : v.title
    }
  } )
  listLoading.value = false
}

const cancelEdit = row => {
  row.title = row.originalTitle
  row.edit = false
  ElMessage( {
    message : 'The title has been restored to the original value',
    type : 'warning'
  } )
}

const confirmEdit = row => {
  row.edit = false
  row.originalTitle = row.title
  ElMessage( {
    message : 'The title has been edited',
    type : 'success'
  } )
}

getList()

defineOptions( {
  name : 'EditTable'
} )
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
