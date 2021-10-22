<!--

<template>
  <div class="section-container p12">
    <div class="button-box clearflex">
      <el-button size="mini" type="primary" icon="el-icon-plus" @click="addMenu('0')">新增根菜单</el-button>
    </div>

    &lt;!&ndash; 由于此处菜单跟左侧列表一一对应所以不需要分页 limit默认999 &ndash;&gt;
    <el-table :data="tableData" border row-key="ID" stripe v-loading="loading">
      <el-table-column label="id" width="60" prop="id" align="center" />
      <el-table-column label="分组名称" min-width="160" prop="name" />
      <el-table-column fixed="right" label="操作" width="300">
        <template #default="scope">
          <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="showAddMenu(scope.row)"
          >添加子分组</el-button>
          <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="showEditMenu(scope.row)"
          >编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteMenu(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :before-close="handleClose" :title="dialogTitle" v-model="dialogFormVisible">
      <el-form
          ref="menuForm"
          :inline="true"
          :model="form"
          :rules="rules"
      >
        <el-form-item label="父节点ID:" prop="pid" label-width="100px" >
          <el-cascader
              :options="menuOption"
              v-model="form.pid"
              :disabled="dialogType === 'create1'"
              :props="{ checkStrictly: true,label:'name',value:'id',disabled:'disabled',emitPath:false}"
              :show-all-levels="true"
              filterable
          />
        </el-form-item>

        <el-form-item label="分组名称:" prop="name" label-width="100px" >
          <el-input
              name="name"
              v-model="form.name"
              maxlength="100"
              placeholder="请输入分组名字，最多100个字符"
              autocomplete="off"
              clearable
              show-word-limit
              @change="changeName"
          />
        </el-form-item>

      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="enterDialog">确 定</el-button>
        </div>
      </template>

    </el-dialog>
  </div>
</template>

<script>
  // https://www.imooc.com/article/303667
  import { updateBaseMenu, getMenuList, addBaseMenu, deleteBaseMenu, getBaseMenuById} from '/@/api/menu'
  import { getGroupList } from '/@/api/group'
  import {ref, defineComponent, onMounted, onBeforeMount, unref, watch, reactive, computed, toRefs} from "vue"
  import { ElMessageBox } from 'element-plus'

  const menuOpt = [
    {
      id: 0,
      name: '根分组'
    }
  ]

  const menuOpt1 = [
    {
      id: 'zhinan',
      name: '指南',
      children: [
        {
          id: 'shejiyuanze',
          name: '设计原则',
          children: [
            {
              id: 'yizhi',
              name: '一致'
            },
            {
              id: 'fankui',
              name: '反馈'
            },
            {
              id: 'xiaolv',
              name: '效率'
            },
            {
              id: 'kekong',
              name: '可控'
            }
          ]
        },
        {
          id: 'daohang',
          name: '导航',
          children: [
            {
              id: 'cexiangdaohang',
              name: '侧向导航'
            },
            {
              id: 'dingbudaohang',
              name: '顶部导航'
            }
          ]
        }
      ]
    },
    {
      id: 'zujian',
      name: '组件',
      children: []
    },
    {
      id: 'ziyuan',
      name: '资源',
      children: []
    }
  ]

  export default defineComponent ({
    name : 'Group',
    setup() {
      const page = ref(1);
      const total = ref(10);
      const limit = ref(10);
      const tableData = ref([]);

      const loading = ref(false)
      const menuForm = ref()
      const dialogFormVisible = ref(false)
      const dialogTitle = ref('新增菜单')
      const dialogType = ref('create')

      const menuOption = ref(menuOpt)
      const isEdit = ref(false)

      const form = ref({
        id: 0,
        pid: '',
        name: '',
      })
      const rules = {
        name: [
          { required: true, message: '请输入分组名称', trigger: 'blur' }
        ],
      }

      onBeforeMount( async () => {
        await getTableData()
      } )
      // 获取列表
      async function getTableData( data ) {
        loading.value = true
        try {
          if ( data ) {
            page.value = data.page
            limit.value = data.limit
          }
          const params = {
            page : page.value,
            limit : limit.value
          }
          const { code, data : rData } = await getGroupList( params )
          console.log( '获取列表', rData )
          if ( code === 200 ) {
            tableData.value = rData.list
            total.value = rData.total
            page.value = rData.page
            limit.value = rData.limit
          }
        } catch (e) {

        } finally {
          loading.value = false
        }
      }
      // 添加菜单方法，id为 0则为添加根菜单
      function showAddMenu( item ) {
        dialogTitle.value = '新增菜单'
        form.value.pid = String( item.id )
        dialogType.value = 'create'
        setOptions()
        dialogFormVisible.value = true
      }
      // 修改菜单方法
      async function editMenu( item ) {
        dialogTitle.value = '编辑菜单'
        const res = await getBaseMenuById({ id })
        form.value = res.data.menu
        isEdit.value = true
        setOptions()
        dialogFormVisible.value = true
      }

      function setOptions() {
        menuOption.value = menuOpt
        setMenuOptions(tableData.value, menuOption.value, false)
      }
      function setMenuOptions(menuData, optionsData, disabled) {
        if(!menuData) return

        menuData.map(item => {
          if (item.children && item.children.length) {
            const option = {
              name: item.name,
              id: String(item.id),
              disabled: disabled || item.id === form.value.id,
              children: []
            }
            setMenuOptions(
                item.children,
                option.children,
                disabled || item.id === form.value.id
            )
            optionsData.push(option)
          } else {
            const option = {
              name: item.name,
              id: String(item.id),
              disabled: disabled || item.id === form.value.id
            }
            optionsData.push(option)
          }
        })
      }

      function addParameter(form) {
        if (!form.parameters) {
          form.parameters = []
        }
        form.parameters.push({
          type: 'query',
          key: '',
          value: ''
        })
      }
      function deleteParameter(parameters, index) {
        parameters.splice(index, 1)
      }
      function changeName() {
        form.value.path = form.value.name
      }

      function handleClose(done) {
        initForm()
        done()
      }
      // 懒加载子菜单
      function load(tree, treeNode, resolve) {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }
      // 删除菜单
      function deleteMenu(ID) {
        ElMessageBox.confirm(
            '此操作将永久删除所有角色下该菜单, 是否继续?',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
            .then(async() => {
              const res = await deleteBaseMenu({ ID })
              if (res.code === 0) {
                ElMessageBox.message({
                  type: 'success',
                  message: '删除成功!'
                })
                if (tableData.value.length === 1 && page.value > 1) {
                  page.value&#45;&#45;
                }
                getTableData()
              }
            })
            .catch(() => {
              ElMessageBox.message({
                type: 'info',
                message: '已取消删除'
              })
            })
      }
      // 初始化弹窗内表格方法
      function initForm() {
        menuForm.value.resetFields()
        form.value = {
          ID: 0,
          path: '',
          name: '',
          hidden: '',
          parentId: '',
          component: '',
          meta: {
            title: '',
            icon: '',
            defaultMenu: false,
            keepAlive: ''
          }
        }
      }
      // 关闭弹窗
      function closeDialog() {
        initForm()
        dialogFormVisible.value = false
      }
      // 添加menu
      async function enterDialog() {
        menuForm.value.validate(async valid => {
          if (valid) {
            let res
            if (isEdit.value) {
              res = await updateBaseMenu(form.value)
            } else {
              res = await addBaseMenu(form.value)
            }
            if (res.code === 0) {
              ElMessageBox.message({
                type: 'success',
                message: isEdit.value ? '编辑成功' : '添加成功!'
              })
              getTableData()
            }
            initForm()
            dialogFormVisible.value = false
          }
        })
      }

      return {
        page,
        total,
        limit,
        tableData,

        menuForm,
        loading,

        dialogFormVisible,
        dialogTitle,
        menuOption,
        dialogType,
        form,
        rules,

        getTableData,
        showAddMenu,
        editMenu,

        addParameter,
        deleteParameter,
        changeName,
        setOptions,
        setMenuOptions,
        handleClose,
        load,
        deleteMenu,
        initForm,
        closeDialog,
        enterDialog,

      }
    }
  })
</script>

<style scoped lang="scss">
  .section-container {
    background: #fff;
  }
  .button-box {
    padding: 10px 20px;
    .el-button {
      float: right;
    }
  }
  .warning {
    color: #dc143c;
  }
</style>
-->
