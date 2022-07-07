<template>
  <LoginHistory title="登录历史">
    <template #head>
      <div class="card-title flex-row flex-vertical-center">
        <span>以下是您最近4个月的登录历史，如有异常请尽快</span>
        <el-link type="primary" :underline="false">修改密码</el-link>
      </div>
    </template>
    <template #body>
      <!-- Element 虚拟表格-->
      <el-table-v2
        v-loading="loading"
        class="login-history-table"
        :columns="columns"
        :data="tableData"
        :width="985"
        :height="300"
        :fixed="false"
      />
    </template>
    <template #foot>
      <div class="line" />
    </template>
  </LoginHistory>
</template>

<script setup lang="jsx">
import { ref } from 'vue'
import { loginHistory } from '/@/api/user'
import LoginHistory from './components/infoLayout'

const loading = ref( false )

const LoginMethod = {
  0 : '未知',
  1 : '密码登录',
  2 : '验证码登录',
  3 : '第三方登录'
}

const columns = ref( [
  {
    key : 'method',
    title : '登录方式',
    dataKey : 'method',
    align : 'center',
    width : 106,
    cellRenderer : ( { rowData } ) => {
      return <div>{LoginMethod[rowData.method]}</div>
    }
  },
  {
    key : 'deviceType',
    title : '设备名称',
    dataKey : 'deviceType',
    align : 'center',
    width : 231
  },
  {
    key : 'deviceOs',
    title : '系统',
    dataKey : 'deviceOs',
    align : 'center',
    width : 110
  },
  {
    key : 'loginAddr',
    title : '登录地点',
    dataKey : 'loginAddr',
    align : 'center',
    width : 231
  },
  {
    key : 'loginTime',
    title : '最后登录时间',
    dataKey : 'loginTime',
    align : 'center',
    width : 231
  }
] )
const tableData = ref( [] )

const getHistory = async() => {
  loading.value = true
  try {
    // 模拟了10w条数据，使用element 虚拟表格渲染
    const { code, data } = await loginHistory()
    if ( code == 200 ) {
      tableData.value = data
    }
  } catch ( e ) {
  } finally {
    loading.value = false
  }
}
getHistory()

defineOptions( {
  name : 'LoginHistory'
} )
</script>

<style lang="scss" scoped>
::v-deep(.center-box) {
  margin: 80px 140px 0 70px;
  .card-title {
    color: rgba(109, 119, 136, 1);
    font-size: 16px;
    margin-bottom: 49px;
    .el-link {
      font-size: 16px;
    }
  }
  .line {
    margin-top: 170px;
    width: 985px;
    height: 1px;
    border-bottom: 1px solid rgba(237, 239, 242, 1);
  }
}

.login-history-table {
  margin: 0 auto;
  ::v-deep(.el-table-v2__row-cell) {
    color: #606266;
  }
}
</style>
