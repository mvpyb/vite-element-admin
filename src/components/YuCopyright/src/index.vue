<template>
  <div class="copyright-container">
    <div class="title syRegular">
      <div class="copyright-items">帮助</div>
      <div class="copyright-items">隐私</div>
      <div class="copyright-items">条款</div>
    </div>
    <span>
      <i>copyright</i>
      <svg-icon icon-class="copyright" class="icon" />
      <i>{{ currentYear }} 沪ICP备XXXXXXXX号</i>
    </span>
    <span style="margin-top: 5px"> XXXXXXXXX </span>
  </div>
</template>

<script setup>
import SvgIcon from '/@/components/YuSvgIcon'
import { ref, onBeforeMount } from 'vue'

const currentYear = ref( 2021 )
onBeforeMount( () => {
  currentYear.value = new Date().getFullYear()
} )

defineOptions( {
  name : 'YuCopyright'
} )
</script>

<style lang="scss" scoped>
.copyright-container {
  position: absolute;
  bottom: 20px;
  text-align: center;
  left: 0;
  width: 100%;
  .copyright-items {
    display: inline-block;
    margin: 0 20px;
    color: #87888a;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
  }
  .title {
    margin-bottom: 10px;
  }
  span {
    color: #8e8f91;
    font-size: 14px;
    line-height: 20px;
    display: inline-block;
    width: 100%;
    i {
      @extend span;
      width: auto;
      font-style: normal;
      vertical-align: middle;
    }
    .icon {
      width: 18px;
      height: 18px;
      color: #8e8f91;
      vertical-align: middle;
      margin-right: 4px;
    }
    a {
      margin-left: 6px;
      display: inline-block;
      vertical-align: middle;
      cursor: default;
    }
  }
}

.notice-container {
  z-index: 999;
}
// 适配移动端
@media screen and (max-width: 768px) {
  .copyright-container {
    display: none;
  }
}
</style>
