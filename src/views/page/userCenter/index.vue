<template>
  <div class="account-container flex-row flex-level-center">
    <!--  -->
    <div class="center-box">
      <!-- 基础信息 -->
      <div class="flex-row">
        <!--绑定手机-->
        <div class="card purple">
          <div class="flex-row flex-vertical-center">
            <div class="circle">
              <svg-icon icon-class="phone_1" class="icon" />
            </div>
            <div class="tips-info flex-column flex-vertical-center">
              <div class="f1">
                绑定手机
                <svg-icon v-if="set.phone" icon-class="ok" class="status-ok" />
                <svg-icon v-else icon-class="warning_1" class="status-warning" />
              </div>
              <div class="f2">
                {{ set.phone ? '已绑定手机' : '未绑定，请尽快绑定' }}
              </div>
            </div>
          </div>
          <el-button class="btn" type="info" @click="bindHandle(1)">{{ set.phone ? '更换手机' : '去绑定' }}</el-button>
        </div>
        <!--实名认证-->
        <div class="card orange">
          <div class="flex-row flex-vertical-center">
            <div class="circle">
              <svg-icon icon-class="safe" class="icon" />
            </div>
            <div class="tips-info flex-column flex-vertical-center">
              <div class="f1">
                实名认证
                <svg-icon v-if="set.identity" icon-class="ok" class="status-ok" />
                <svg-icon v-else icon-class="warning_1" class="status-warning" />
              </div>
              <div class="f2">
                {{ set.identity ? '已实名认证' : '请尽快完成实名认证' }}
              </div>
            </div>
          </div>
          <el-button v-if="!set.identity" class="btn" type="info" @click="bindHandle(2)">去认证</el-button>
        </div>
        <!--绑定邮箱-->
        <div class="card green">
          <div class="flex-row flex-vertical-center">
            <div class="circle">
              <svg-icon icon-class="msg_1" class="icon" />
            </div>
            <div class="tips-info flex-column flex-vertical-center">
              <div class="f1">
                绑定邮箱
                <svg-icon v-if="set.phone" icon-class="ok" class="status-ok" />
                <svg-icon v-else icon-class="warning_1" class="status-warning" />
              </div>
              <div class="f2">
                {{ set.email ? '已绑定邮箱' : '未绑定，请尽快绑定' }}
              </div>
            </div>
          </div>
          <el-button class="btn" type="info" @click="bindHandle(3)">{{ set.email ? '更换邮箱' : '去绑定' }}</el-button>
        </div>
        <!--个人信息-->
        <div class="card blue">
          <div class="flex-row flex-vertical-center">
            <div class="circle">
              <svg-icon icon-class="text" class="icon" />
            </div>
            <div class="tips-info flex-column flex-vertical-center">
              <div class="f1">
                个人信息
                <svg-icon v-if="set.isPerfect" icon-class="ok" class="status-ok" />
                <svg-icon v-else icon-class="warning_1" class="status-warning" />
              </div>
              <div class="f2">
                {{ set.isPerfect ? '个人信息已完善' : '个人信息未完善' }}
              </div>
            </div>
          </div>
          <el-button class="btn" type="info" v-if="!set.isPerfect" @click="bindHandle(4)">去完善</el-button>
        </div>
      </div>

      <!-- 登录历史 -->
      <div class="card-section" v-loading="loading">
        <div class="login-title flex-row flex-between flex-vertical-center">
          <el-tooltip class="box-item" effect="dark" content="此处模拟了10W条数据" placement="top-start">
            <span class="title">登录历史</span></el-tooltip
          >
          <p style="cursor: pointer">
            <span class="right-tips" @click="router.push('/user/history')">查看更多</span>
            <el-icon color="#1890ff"> <ArrowRight /> </el-icon>
          </p>
        </div>
        <!-- Element 虚拟表格-->
        <el-table-v2
          class="login-history-table"
          :columns="columns"
          :data="tableData"
          :width="910"
          :height="210"
          :fixed="false"
        />

        <!-- Element 基础table -->
        <!--<el-table
            :data="tableData"
            ref="table"
            height="210"
            style="width: 100%"
        >
          <el-table-column
              prop="method"
              label="登录方式"
              width="106"
              align="center"
          >
            <template #default="{ row }">
              {{ LoginMethod[row.method] }}
            </template>
          </el-table-column>
          <el-table-column
              prop="deviceType"
              label="设备名称"
              width="231"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="deviceOs"
              label="系统"
              width="110"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="loginAddr"
              label="登录地点"
              width="231"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="loginTime"
              label="最后登录时间"
              width="231"
              align="center"
          >
          </el-table-column>
        </el-table>-->
      </div>

      <!--  -->
      <div class="card-section" style="height: 330px" />
    </div>
    <!--  -->
    <div class="avatar-box flex-column flex-level-center flex-vertical-center">
      <YuThumb width="150px" height="150px" :image="set.avatar">Vite Element Admin Admin Admin Admin</YuThumb>
      <span class="user-name ellipsis"> Hi,{{ set.name || '小灰灰' }} </span>
      <span class="phone">
        <span v-if="set.phone">{{ encryptionPhone(set.phone) }}</span>
        <span v-else> 你还未绑定手机 </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="jsx">
import { ref, reactive, computed } from 'vue'
import { useUserStore } from '/@/store'
import { loginHistory } from '/@/api/user'
import { encryptionPhone } from '/@/utils'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import YuThumb from '/@/components/YuThumb'

const router = useRouter()

const loading = ref( false )

const userStore = useUserStore()

const LoginMethod = {
  0 : '未知',
  1 : '密码登录',
  2 : '验证码登录',
  3 : '第三方登录'
}

const set = reactive( {
  avatar : computed( () => {
    return userStore.avatar
  } ),
  name : computed( () => {
    return userStore.name
  } ),
  phone : computed( () => {
    return userStore.phone
  } ),
  email : computed( () => {
    return userStore.email
  } ),
  identity : computed( () => {
    return userStore.identity
  } ),
  isPerfect : computed( () => {
    return userStore.avatar && userStore.name && userStore.phone && userStore.email && userStore.identity
  } )
} )

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

// 1 绑定手机, 2 实名认证, 3 绑定邮箱, 4 完善个人信息
const bindHandle = async step => {
  if ( step != 2 ) {
    ElMessage( {
      message : '此组件还未开发',
      type : 'warning'
    } )
    return
  }
  router.push( '/user/attestation' )
}

defineOptions( {
  name : 'UserCenter'
} )
</script>

<style lang="scss" scoped>
.account-container {
  padding: 20px;
}
.center-box {
  min-width: 920px;
  margin-right: 10px;
  .card {
    padding: 20px 0 0 20px;
    background: #fff;
    width: 222px;
    height: 134px;
    border-radius: 10px;
    box-shadow: 0 4px 6px 0 rgba(152, 160, 179, 0.13);
    box-sizing: border-box;
    margin-left: 10px;
    .circle {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      width: 44px;
      height: 44px;
    }

    .tips-info {
      margin-left: 15px;
      .f1 {
        width: 100%;
        margin-bottom: 6px;
        color: rgba(104, 114, 132, 1);
        font-size: 16px;
        text-align: left;
        font-family: 'syRegular';
        .status-ok {
          color: #2fdc23;
          width: 20px;
          height: 20px;
        }
        .status-warning {
          color: #ffbe2c;
          width: 20px;
          height: 20px;
        }
      }
      .f2 {
        width: 100%;
        color: rgba(165, 181, 210, 1);
        font-size: 12px;
        text-align: left;
      }
    }

    .icon {
      color: #fff;
      width: 24px;
      height: 24px;
    }

    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 94px;
      height: 30px;
      border-radius: 5px;
      float: right;
      margin-right: 14px;
      margin-top: 25px;
      border: none;
    }

    &:first-child {
      margin-left: 0;
    }
    &.purple {
      .circle {
        background-color: #b260ea;
        box-shadow: 0 0 10px 4px rgba(194, 127, 240, 0.26);
      }
      .btn {
        background-color: rgba(178, 96, 234, 100);
      }
    }
    &.orange {
      .circle {
        background-color: rgb(255, 158, 1);
        box-shadow: rgb(247 172 101 / 36%) 0 0 10px 4px;
      }
      .btn {
        background-color: rgb(255, 158, 1);
      }
    }
    &.green {
      .circle {
        background-color: rgb(96, 203, 176);
        box-shadow: rgb(125 230 203 / 38%) 0 0 10px 4px;
      }
      .btn {
        background-color: rgb(96, 203, 176);
      }
    }
    &.blue {
      .circle {
        background-color: rgb(1, 196, 226);
        box-shadow: rgb(1 196 226 / 28%) 0 0 10px 4px;
      }
      .btn {
        background-color: rgb(1, 196, 226);
      }
    }
  }
}

.card-section {
  background: #fff;
  margin-top: 10px;
  width: 920px;
  height: 315px;
  border-radius: 10px;
  box-shadow: 0 4px 6px 0 rgba(152, 160, 179, 0.13);
  .login-title {
    padding: 20px 0 14px 0;
    margin: 0 20px;
    border-bottom: 1px solid rgba(237, 239, 242, 1);
    .title {
      color: rgba(104, 114, 132, 1);
      font-size: 20px;
    }
    .right-tips {
      color: rgba(24, 144, 255, 1);
      font-size: 14px;
      margin-right: 10px;
    }
    .el-icon {
      position: relative;
      top: 2px;
    }
  }
}

.login-history-table {
  margin: 0 auto;
  ::v-deep(.el-table-v2__empty) {
    .el-empty__image {
      width: 80px;
    }
  }
  ::v-deep(.el-table-v2__row-cell) {
    color: #606266;
  }
}

.avatar-box {
  background: #fff;
  min-width: 250px;
  height: 315px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px 0 rgba(152, 160, 179, 0.13);
  .user-name {
    margin: 30px 0 12px 0;
    color: rgba(104, 114, 132, 1);
    font-size: 20px;
    width: 200px;
  }
  .phone {
    color: rgba(166, 179, 202, 1);
    font-size: 16px;
    text-align: left;
  }
}
</style>
