<template>
  <YuLayout title="表格综合示例">
    <template #body>
      <div class="app-container">
        <div class="filter-container">
          <el-input
            v-model="set.listQuery.title"
            placeholder="标题"
            style="width: 200px"
            class="filter-item"
            @keyup.enter="handleFilter"
          />
          <el-select
            v-model="set.listQuery.importance"
            placeholder="权重"
            clearable
            style="width: 90px"
            class="filter-item"
          >
            <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
          </el-select>
          <el-select v-model="set.listQuery.type" placeholder="类型" clearable class="filter-item" style="width: 130px">
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name + '(' + item.key + ')'"
              :value="item.key"
            />
          </el-select>
          <el-select v-model="set.listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
            <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
          <el-button v-wave class="filter-item" type="primary" :icon="Search" @click="handleFilter"> 搜索 </el-button>
          <el-button class="filter-item" style="margin-left: 10px" type="primary" :icon="EditPen" @click="handleCreate">
            添加
          </el-button>
          <el-button
            v-wave
            :loading="downloadLoading"
            class="filter-item"
            type="primary"
            :icon="Download"
            @click="handleDownload"
          >
            导出
          </el-button>
          <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left: 15px"> 审核人 </el-checkbox>
        </div>

        <el-table
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%"
          @sort-change="sortChange"
        >
          <el-table-column
            label="ID"
            prop="id"
            sortable="custom"
            align="center"
            width="80"
            :class-name="getSortClass('id')"
          >
            <template #default="{ row }">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Date" width="150px" align="center">
            <template #default="{ row }">
              <span>{{ parseTime(row.timestamp, '{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Title" min-width="150px">
            <template #default="{ row }">
              <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
              <el-tag>{{ typeFilter(row.type) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="预览图" width="150px" align="center">
            <template #default="{ row }">
              <el-image
                style="width: 100px; height: 100px"
                :src="row.image_uri"
                loading="lazy"
                :preview-src-list="[row.image_uri]"
                :initial-index="4"
                :z-index="3000"
                fit="cover"
              />
            </template>
          </el-table-column>
          <el-table-column label="Author" width="110px" align="center">
            <template #default="{ row }">
              <span>{{ row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="showReviewer" label="Reviewer" width="110px" align="center">
            <template #default="{ row }">
              <span style="color: red">{{ row.reviewer }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Imp" width="80px">
            <template #default="{ row }">
              <svg-icon v-for="n in row.importance" :key="n" icon-class="star" class="meta-item__icon" />
            </template>
          </el-table-column>
          <el-table-column label="Readings" align="center" width="95">
            <template #default="{ row }">
              <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{
                row.pageviews
              }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column label="Status" class-name="status-col" width="100">
            <template #default="{ row }">
              <el-tag :type="statusFilter(row.status)">{{ row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
            <template #default="{ row, $index }">
              <el-button type="primary" size="small" @click="handleUpdate(row)"> Edit </el-button>
              <el-button
                v-if="row.status != 'published'"
                size="small"
                type="success"
                @click="handleModifyStatus(row, 'published')"
              >
                Publish
              </el-button>
              <el-button v-if="row.status != 'draft'" size="small" @click="handleModifyStatus(row, 'draft')">
                Draft
              </el-button>
              <el-button v-if="row.status != 'deleted'" size="small" type="danger" @click="handleDelete(row, $index)">
                Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          class="pagination-center"
          :total="total"
          :hide-on-single-page="true"
          v-model:currentPage="set.listQuery.page"
          v-model:page-size="set.listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="getList"
          @current-change="getList"
        />

        <el-dialog :title="set.textMap[dialogStatus]" v-model="dialogFormVisible">
          <el-form
            ref="dataForm"
            :rules="set.rules"
            :model="set.temp"
            label-position="left"
            label-width="70px"
            style="width: 400px; margin-left: 50px"
          >
            <el-form-item label="Type" prop="type">
              <el-select v-model="set.temp.type" class="filter-item" placeholder="Please select">
                <el-option
                  v-for="item in calendarTypeOptions"
                  :key="item.key"
                  :label="item.display_name"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Date" prop="timestamp">
              <el-date-picker v-model="set.temp.timestamp" type="datetime" placeholder="Please pick a date" />
            </el-form-item>
            <el-form-item label="Title" prop="title">
              <el-input v-model="set.temp.title" />
            </el-form-item>
            <el-form-item label="Status">
              <el-select v-model="set.temp.status" class="filter-item" placeholder="Please select">
                <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item label="Imp">
              <el-rate
                v-model="set.temp.importance"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                :max="3"
                style="margin-top: 8px"
              />
            </el-form-item>
            <el-form-item label="Remark">
              <el-input
                v-model="set.temp.remark"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                placeholder="Please input"
              />
            </el-form-item>
          </el-form>

          <template #footer>
            <div class="dialog-footer">
              <el-button @click="hideDialog"> Cancel </el-button>
              <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">
                Confirm
              </el-button>
            </div>
          </template>
        </el-dialog>

        <el-dialog v-model="dialogPvVisible" title="Reading statistics">
          <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
            <el-table-column prop="key" label="Channel" />
            <el-table-column prop="pv" label="Pv" />
          </el-table>
          <template #footer>
            <span class="dialog-footer">
              <el-button type="primary" @click="hideDialogPv">Confirm</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </template>
  </YuLayout>
</template>

<script setup>
import { ref, reactive, nextTick, unref } from 'vue'
import { getArticle, getPv, createArticle, updateArticle } from '/@/api/article'
import { parseTime } from '/@/utils'
import { ElMessage, ElNotification } from 'element-plus'
import { Search, EditPen, Download } from '@element-plus/icons-vue'
import YuLayout from '/@/components/YuLayout'

const calendarTypeOptions = ref( [
  { key : 'CN', display_name : 'China' },
  { key : 'US', display_name : 'USA' },
  { key : 'JP', display_name : 'Japan' },
  { key : 'EU', display_name : 'Eurozone' }
] )
const calendarTypeKeyValue = calendarTypeOptions.value.reduce( ( acc, cur ) => {
  acc[cur.key] = cur.display_name
  return acc
}, {} )

const dataForm = ref( null )
const total = ref( 0 )
const list = ref( null )
const listLoading = ref( true )

const importanceOptions = ref( [1, 2, 3] )

const sortOptions = ref( [
  {
    label : 'ID 升序',
    key : '+id'
  },
  {
    label : 'ID 降序',
    key : '-id'
  }
] )
const statusOptions = ref( ['published', 'draft', 'deleted'] )
const showReviewer = ref( false )
const dialogFormVisible = ref( false )
const dialogStatus = ref( '' )
const dialogPvVisible = ref( false )
const pvData = ref( [] )
const downloadLoading = ref( false )

const set = reactive( {
  listQuery : {
    page : 1,
    limit : 20,
    importance : undefined,
    title : undefined,
    type : undefined,
    sort : '+id'
  },
  temp : {
    id : undefined,
    importance : 1,
    remark : '',
    timestamp : new Date(),
    title : '',
    type : '',
    status : 'published',
    author : 'vite element admin'
  },
  textMap : {
    update : 'Edit',
    create : 'Create'
  },
  rules : {
    type : [{ required : true, message : 'type is required', trigger : 'change' }],
    timestamp : [{ type : 'date', required : true, message : 'timestamp is required', trigger : 'change' }],
    title : [{ required : true, message : 'title is required', trigger : 'blur' }]
  }
} )

const hideDialog = () => {
  dialogFormVisible.value = false
}
const hideDialogPv = () => {
  dialogPvVisible.value = false
}

const getList = async() => {
  listLoading.value = true
  const { data } = await getArticle( set.listQuery )

  if ( set.listQuery.sort == '+id' ) {
    list.value = data.items.sort( ( a, b ) => a.id - b.id )
  } else {
    list.value = data.items.sort( ( a, b ) => b.id - a.id )
  }

  total.value = data.total

  setTimeout( () => {
    listLoading.value = false
  }, 1.5 * 1000 )
}

const statusFilter = status => {
  const statusMap = {
    published : 'success',
    draft : 'info',
    deleted : 'danger'
  }
  return statusMap[status]
}

const typeFilter = type => {
  return calendarTypeKeyValue[type]
}

const handleFilter = () => {
  set.listQuery.page = 1
  getList()
}

const handleModifyStatus = ( row, status ) => {
  ElMessage( {
    message : '操作Success',
    type : 'success'
  } )
  row.status = status
}

const sortByID = order => {
  if ( order === 'ascending' ) {
    set.listQuery.sort = '+id'
  } else {
    set.listQuery.sort = '-id'
  }
  handleFilter()
}

const resetTemp = () => {
  set.temp = {
    id : 0,
    importance : 1,
    remark : '',
    timestamp : new Date(),
    title : '',
    status : 'published',
    type : '',
    author : 'vite element admin'
  }
}

const handleCreate = () => {
  resetTemp()
  dialogStatus.value = 'create'
  dialogFormVisible.value = true
  nextTick( () => {
    dataForm.value && dataForm.value.clearValidate()
  } )
}

const createData = () => {
  dataForm.value &&
    dataForm.value.validate( valid => {
      if ( valid ) {
        set.temp.id = parseInt( Math.random() * 100 ) + 1024 // mock a id
        set.temp.author = 'vite element admin'
        createArticle( unref( set.temp ) ).then( () => {
          list.value.unshift( unref( set.temp ) )
          hideDialog()
          ElNotification( {
            title : 'Success',
            message : 'Created Successfully',
            type : 'success',
            duration : 2000
          } )
        } )
      }
    } )
}

const handleUpdate = row => {
  set.temp = Object.assign( {}, row ) // copy obj
  set.temp.timestamp = new Date( set.temp.timestamp )
  dialogStatus.value = 'update'
  dialogFormVisible.value = true
  nextTick( () => {
    dataForm.value && dataForm.value.clearValidate()
  } )
}

const updateData = () => {
  dataForm.value?.validate( valid => {
    if ( valid ) {
      const tempData = {
        ...set.temp
        // timestamp : +new Date( tempData.timestamp )
      }
      updateArticle( tempData ).then( () => {
        const index = list.value.findIndex( v => v.id === set.temp.id )
        list.value.splice( index, 1, set.temp )
        hideDialog()
        ElNotification( {
          title : 'Success',
          message : 'Update Successfully',
          type : 'success',
          duration : 2000
        } )
      } )
    }
  } )
}

const handleDelete = ( row, index ) => {
  ElNotification( {
    title : 'Success',
    message : 'Delete Successfully',
    type : 'success',
    duration : 2000
  } )
  list.value.splice( index, 1 )
}

const handleFetchPv = pv => {
  getPv( pv ).then( response => {
    pvData.value = response.data.pvData
    dialogPvVisible.value = true
  } )
}

const handleDownload = () => {
  downloadLoading.value = true
  import( '/@/vendor/Export2Excel' ).then( excel => {
    const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
    const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
    const data = formatJson( filterVal )
    excel.export_json_to_excel( {
      header : tHeader,
      data,
      filename : 'table-list'
    } )
    downloadLoading.value = false
  } )
}

const formatJson = filterVal => {
  return list.value.map( v =>
    filterVal.map( j => {
      if ( j === 'timestamp' ) {
        return parseTime( v[j] )
      } else {
        return v[j]
      }
    } )
  )
}

const getSortClass = key => {
  const sort = set.listQuery.sort
  return sort === `+${key}` ? 'ascending' : 'descending'
}

const sortChange = data => {
  const { prop, order } = data
  if ( prop === 'id' ) {
    sortByID( order )
  }
}

getList()

defineOptions( {
  name : 'ComplexTable'
} )
</script>

<style scoped lang="scss">
.filter-container {
  padding-bottom: 10px;

  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
  }
}

.pagination-center {
  margin: 60px 0 30px;
}

/*el-table el-table-column 组件中 使用插槽 加载 el-image 组件预览图片 层级过低问题*/
.el-table {
  & ::v-deep(th.el-table__cell),
  ::v-deep(td.el-table__cell) {
    // 设置position 使得子元素不与其产生新的层叠关系
    position: static;
  }
}
.yu-layout {
  ::v-deep(.body) {
    background: #fff;
  }
}
</style>
