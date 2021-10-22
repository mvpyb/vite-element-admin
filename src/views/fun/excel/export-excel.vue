<template>
  <yu-layout title="表格" subtitle="表格的简单使用">
    <template #body>
      <div class="app-container">
        <div>
          <div style="display: inline-block">
            <label class="radio-label" style="padding-left: 0">文件名: </label>
            <el-input
              v-model="filename"
              placeholder="请输入导出的文件名"
              style="width: 345px"
              prefix-icon="el-icon-document"
            />
          </div>
          <div style="display: inline-block">
            <label class="radio-label">导出类型: </label>
            <el-select v-model="fileType" style="width: 120px">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>

          <el-button
            :loading="downloadLoading"
            style="margin: 0 0 20px 20px"
            type="primary"
            icon="el-icon-document"
            @click="handleDownload"
          >
            导出
          </el-button>

          <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading..."
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="Id" width="95">
              <template #default="scope">
                {{ scope.$index }}
              </template>
            </el-table-column>
            <el-table-column label="Title">
              <template #default="scope">
                {{ scope.row.title }}
              </template>
            </el-table-column>
            <el-table-column label="Author" width="110" align="center">
              <template #default="scope">
                <el-tag>{{ scope.row.author }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="Readings" width="115" align="center">
              <template #default="scope">
                {{ scope.row.pageviews }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="Date" width="220">
              <template #default="scope">
                <i class="el-icon-time" />
                <span>{{ scope.row.timestamp }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </template>
  </yu-layout>
</template>

<script>
import { ref, defineComponent, onMounted, onBeforeUnmount } from 'vue'
// import { ElMessage } from 'element-plus'
import * as ELEMENT from 'element-plus'
const { ElMessage } = ELEMENT
import { tableList } from '/@/api/demo'
import YuLayout from '/@/components/YuLayout'
import { parseTime } from '/@/utils/index'

export default defineComponent( {
  name : 'ExportExcel',
  components : { YuLayout },
  setup() {
    const filename = ref( '' )
    const fileType = ref( 'xlsx' )
    const options = ref( ['xlsx', 'csv', 'txt'] )
    const downloadLoading = ref( false )
    const listLoading = ref( false )
    const list = ref( [] )

    function formatJson( filterVal, jsonData ) {
      return jsonData.map( ( v ) =>
        filterVal.map( ( j ) => {
          if ( j === 'timestamp' ) {
            return parseTime( v[j] )
          } else {
            return v[j]
          }
        } )
      )
    }

    function handleDownload() {
      downloadLoading.value = true
      import( '/@/vendor/Export2Excel' ).then( ( excel ) => {
        const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
        const filterVal = [
          'id',
          'title',
          'author',
          'pageviews',
          'display_time'
        ]
        const tbList = list.value
        const data = formatJson( filterVal, tbList )
        excel.export_json_to_excel( {
          header : tHeader,
          data,
          filename : filename.value,
          bookType : fileType.value
        } )
        downloadLoading.value = false
      } )
    }

    async function getList() {
      listLoading.value = true
      try {
        const { data } = await tableList( {} )
        list.value = data
      } catch ( e ) {
        list.value = []
        ElMessage.error( '获取列表出错' )
      } finally {
        listLoading.value = false
      }
    }

    onMounted( async() => {
      await getList()
    } )
    onBeforeUnmount( () => {} )

    const tableData = ref( [
      {
        id : 10001,
        name : 'Test1',
        role : 'Develop',
        sex : 'Man',
        address : 'Shenzhen'
      },
      {
        id : 10002,
        name : 'Test2',
        role : 'Test',
        sex : 'Man',
        address : 'Guangzhou'
      },
      { id : 10003, name : 'Test3', role : 'PM', sex : 'Man', address : 'Shanghai' }
    ] )

    return {
      filename,
      fileType,
      options,
      downloadLoading,
      list,
      listLoading,
      handleDownload,
      tableData
    }
  }
} )
</script>

<style>
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>
