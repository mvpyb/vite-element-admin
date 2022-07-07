<template>
  <div class="third-login-contanier">
    <svg-icon class-name="icons " icon-class="wechat" @click="weChatLogin" />
  </div>
</template>

<script setup>
import { WX_APPID } from '/@/config/constant'
import { useRoute } from 'vue-router'
const route = useRoute()

const weChatLogin = () => {
  const { redirect } = route.query
  const { origin, pathname } = window.location
  const url = redirect ? `${origin}${pathname}#/relation?redirect=${redirect}` : `${origin}${pathname}#/relation`
  const scope = 'snsapi_login'
  const state = Math.ceil( Math.random() * 1000 )
  const redirect_uri = encodeURIComponent( decodeURIComponent( url ) )
  const urls = `https://open.weixin.qq.com/connect/qrconnect?appid=${WX_APPID}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`
  window.open( urls, '_blank' )
}
</script>

<style lang="scss" scoped>
.third-login-contanier {
  text-align: center;
}
.icons {
  display: inline-block;
  cursor: pointer;
  width: 34px;
  height: 34px;
  font-size: 34px;
  color: #00d00d;
}
</style>
