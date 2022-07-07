<template>
  <div class="logo-contanier">
    <img :src="logo" alt="" />
  </div>
</template>

<script setup>
import logo from '/@/assets/imgs/logo.png'
defineOptions( {
  name : 'Logo'
} )
</script>

<style lang="scss" scoped>
.logo-contanier {
  width: 120px;
  height: 120px;
  vertical-align: middle;
}
img {
  width: 100%;
  height: 100%;
  display: inline-block;
}
</style>
