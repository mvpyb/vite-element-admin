<template>
  <div class="third-login-contanier">
    <!--    <i class="icons iconfont icon-weixin" @click="weChatLogin" ></i>-->
    <svg-icon class-name="icons " icon-class="wechat" @click="wechatLogin" />
  </div>
</template>

<script>
import { WX_APPID } from '/@/api/constant'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent( {
  name : 'WeChatLogin',
  setup() {
    const route = useRoute()

    const weChatLogin = () => {
      const { redirect } = route.query
      const { origin, pathname } = window.location
      const url = redirect
        ? `${origin}${pathname}#/relation?redirect=${redirect}`
        : `${origin}${pathname}#/relation`
      const scope = 'snsapi_login'
      const state = Math.ceil( Math.random() * 1000 )
      const redirect_uri = encodeURIComponent( decodeURIComponent( url ) )
      const urls = `https://open.weixin.qq.com/connect/qrconnect?appid=${WX_APPID}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`
      window.open( urls, '_blank' )
    }

    return {
      weChatLogin
    }
  }
} )
</script>

<style lang="scss" scoped>
.icons {
  cursor: pointer;
  width: 34px;
  height: 34px;
  font-size: 34px;
  color: #00d00d;
}
</style>
