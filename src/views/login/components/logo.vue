<template>
  <div class="logo-contanier">
    <img :src="logo" alt="" />
  </div>
</template>

<script>
import logo from '/@/assets/imgs/logo.png'
export default {
  name : 'Logo',
  setup() {
    return {
      logo
    }
  }
}
</script>

<style lang="scss" scoped>
.mb10 {
  margin-bottom: 10px;
}
.logo-contanier.center {
  text-align: center;
}
img {
  display: inline-block;
  width: 44px;
  height: 44px;
  vertical-align: middle;
}
.name {
  vertical-align: middle;
  font-weight: 400;
  font-size: 26px;
  color: rgba(156, 52, 41, 1);
  font-style: normal;
  letter-spacing: 0;
  line-height: 42px;
  text-decoration: none;
}
.name1 {
  margin: 0 5px;
}
.name2 {
  color: rgba(22, 23, 22, 1);
}
</style>
