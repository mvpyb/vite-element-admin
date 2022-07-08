<template>
  <div class="section-container login-container un-select">
    <div class="body fix-width">
      <div class="top">
        <logo class="logos" />
        <div class="top-title">账号密码登录</div>
      </div>
      <div class="main">
        <login-pwd />
        <div class="foot-link clearFix" />
        <div v-if="isShowWX" class="foot-link">
          <el-divider content-position="center">其他方式登录</el-divider>
          <we-chat-login />
        </div>
      </div>
    </div>
    <yu-copyright />
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onUnmounted } from 'vue'
import { isMobile } from '/@/utils/device'
import { debounce } from 'lodash-unified'

import YuCopyright from '/@/components/YuCopyright'
import Logo from './components/logo.vue'
import WeChatLogin from './components/weChatLogin'
import LoginPwd from './loginPwd.vue'

const isShowWX = ref( true )

const resizeCb = debounce( () => {
  isShowWX.value = !isMobile()
}, 50 )

onBeforeMount( () => {
  isShowWX.value = !isMobile()
} )

onMounted( () => {
  window.addEventListener( 'resize', resizeCb )
} )

onUnmounted( () => {
  window.removeEventListener( 'resize', resizeCb )
} )

defineOptions( {
  name : 'Login'
} )
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  min-height: 100vh;
  padding: 15vh 0 100px;
  position: relative;
  background: #fff;
}
.body {
  padding: 30px 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #e6ebf5;
  background-color: #fff;
  vertical-align: middle;
  min-width: 260px;
  width: 380px;
  margin: 0 auto;
}

.logos {
  margin: 0 auto 20px;
}
.top-title {
  color: rgba(16, 16, 16, 1);
  font-size: 20px;
  height: 29px;
  line-height: 29px;
  text-align: center;
}
.main {
  margin-top: 20px;
  .foot-link {
    text-align: center;
    margin-top: 1px;
    .link-item {
      margin: 0;
      font-size: 12px;
      line-height: 18px;
      color: #1890ff;
    }
  }
}

.foot-link {
  .el-button {
    font-size: 12px;
  }
}

// 适配移动端
@media screen and (max-width: 768px) {
  .body {
    padding: 0 30px;
    box-shadow: none;
    border: 0;
    background: transparent;
    border-radius: 0;
  }
  .w380 {
    margin: 0 auto;
    width: 100vw;
    min-width: 100vw;
  }
}
</style>
