<template>
  <yu-layout title="个人中心" subtitle="个人中心">
    <template #body>
      <div class="section-container center-container">
        <el-row :gutter="20" class="table-list">
          <el-col :span="6">
            <el-card class="box-card">
              <div class="user-head clearfix">
                <span class="fr remark"></span>
              </div>

              <div class="user-body clearfix">
                <div class="icon fl">
                  <el-button class="custom-btn purple-btn circle">
                    <svg-icon icon-class="phone" class-name="card-icon" />
                  </el-button>
                </div>
                <div class="fl info">
                  <h4 class="ellipsis">绑定手机</h4>
                  <p class="ellipsis">未绑定，请尽快绑定</p>
                </div>
              </div>
              <div class="user-foot">
                <el-button class="custom-btn purple-btn">更换手机</el-button>
              </div>
            </el-card>
          </el-col>

          <el-col :span="6">
            <el-card class="box-card">
              <div class="user-head clearfix">
                <span class="fr remark"></span>
              </div>

              <div class="user-body clearfix">
                <div class="icon fl">
                  <el-button class="custom-btn yellow-btn circle">
                    <svg-icon icon-class="dunpai" class-name="card-icon" />
                  </el-button>
                </div>
                <div class="fl info">
                  <h4 class="ellipsis">实名认证</h4>
                  <p class="ellipsis">未绑定，请尽快实名认证</p>
                </div>
              </div>

              <div class="user-foot">
                <el-button class="custom-btn yellow-btn">去实名认证</el-button>
              </div>
            </el-card>
          </el-col>

          <el-col :span="6">
            <el-card class="box-card">
              <div class="user-head clearfix">
                <span class="fr remark"></span>
              </div>

              <div class="user-body clearfix">
                <div class="icon fl">
                  <el-button class="custom-btn green-btn circle">
                    <svg-icon icon-class="email" class-name="card-icon" />
                  </el-button>
                </div>
                <div class="fl info">
                  <h4 class="ellipsis">绑定邮箱</h4>
                  <p class="ellipsis">未绑定，请尽快绑定</p>
                </div>
              </div>

              <div class="user-foot">
                <el-button class="custom-btn green-btn">绑定邮箱</el-button>
              </div>
            </el-card>
          </el-col>

          <el-col :span="6">
            <el-card class="box-card">
              <div class="user-head clearfix">
                <span class="fr remark"></span>
              </div>

              <div class="user-body clearfix">
                <div class="icon fl">
                  <el-button class="custom-btn blue-btn circle">
                    <svg-icon icon-class="form" class-name="card-icon" />
                  </el-button>
                </div>
                <div class="fl info">
                  <h4 class="ellipsis">个人信息</h4>
                  <p class="ellipsis">个人信息还未完善</p>
                </div>
              </div>

              <div class="user-foot">
                <el-button class="custom-btn blue-btn">去完善信息</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!---->
      <el-card class="box-card">
        <el-tabs v-model="activeName">
          <el-tab-pane label="资讯列表" name="first">
            <activity />
          </el-tab-pane>
          <el-tab-pane label="Timeline" name="timeline">
            <timeline />
          </el-tab-pane>
          <!--<el-tab-pane label="Account" name="account">
                      <account :user="user" />
          </el-tab-pane>-->
        </el-tabs>
      </el-card>
    </template>
  </yu-layout>
</template>

<script setup>
import { ref } from 'vue'
import YuLayout from '/@/components/YuLayout'

import Activity from './components/Activity.vue'
import Timeline from './components/Timeline.vue'
// import Account from './components/Account.vue'

// const user = reactive( {
//   name : 'this.name',
//   role : 'admin',
//   email : 'admin@test.com',
//   avatar : ''
// } )
const activeName = ref( 'first' )
</script>

<style lang="scss" scoped>
.custom-btn {
  display: inline-block;
  width: 110px;
  height: 30px;
  min-height: 30px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  margin: 0;
  &.circle {
    text-align: center;
    padding: 0;
    width: 44px;
    height: 44px;
    min-height: 44px;
    line-height: 44px;
    border-radius: 50%;
  }
}

.box-card {
  margin-top: 20px;
  border-radius: 10px;
  position: relative;
  .user-head {
    position: absolute;
    right: 20px;
    top: 10px;
    .remark {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #fb6363;
    }
  }

  .user-body {
    .icon {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #b260ea;
      text-align: center;
      margin-right: 15px;
      /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);*/
    }

    .info {
      width: calc(100% - 44px - 15px);
    }
    .card-icon {
      color: #fff;
      width: 24px;
      height: 24px;
      margin-top: 10px;
      margin-bottom: 8px;
    }
    h4 {
      width: 100%;
      color: #687284;
      font-size: 16px;
      line-height: 24px;
      height: 24px;
    }
    p {
      width: 100%;
      color: #a5b5d2;
      font-size: 12px;
      line-height: 18px;
      height: 18px;
    }
  }

  .user-foot {
    margin-top: 24px;
    text-align: right;
  }
}
</style>
