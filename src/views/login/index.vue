
<template>
  <div class="section-container login-container syNormal un-select">
    <div class="body fix-width w380">
      <div class="top">
        <logo class="logos center mb10" />
        <div class="top-title syRegular">账号密码登录</div>
      </div>
      <div class="main">
        <login-pwd />
        <div class="foot-link clearfix" style="margin-top: 10px;">
        </div>
        <div v-if="isShowWX" class="foot-link syRegular">
          <el-divider content-position="center">其他方式登录</el-divider>
          <we-chat-login />
        </div>
      </div>
    </div>
    <copyright />
  </div>
</template>

<script>
  import { ref, defineComponent, onBeforeMount } from "vue"
  import { isMobile } from '/@/utils/device'
  import Logo from './components/logo.vue'
  import Copyright from '/@/components/copyright/index.vue'
  import WeChatLogin from './components/weChatLogin.vue'
  import LoginPwd from './components/loginPwd.vue'
  
  export default defineComponent ({
    name : 'AccountLogin',
    components : { Logo, Copyright, WeChatLogin, LoginPwd },
    setup() {
      let isShowWX = ref( true )
      
      const getQueryParams = ( query ) => {
        let str = ''
        if ( query ) {
          for ( const key in query ) {
            if ( query[key] ) {
              str = str ? `${str}&${key}=${query[key]}` : `${key}=${query[key]}`
            }
          }
        }
        return str
      }
  
      onBeforeMount(() => {
        isShowWX.value = !isMobile()
        getQueryParams()
      });
      
      return {
        isShowWX,
        getQueryParams
      };
    },
  })
</script>

<style lang="scss" scoped>
  @import "./logins.scss";
</style>
