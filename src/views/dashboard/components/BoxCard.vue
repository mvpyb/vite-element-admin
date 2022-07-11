<template>
  <el-card class="box-card-component" style="margin-left: 8px">
    <template #header>
      <div class="box-card-header">
        <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png" />
      </div>
    </template>

    <div style="position: relative">
      <YuThumb :image="set.avatar" class="yuThumb" />
      <TextHover class-name="mallki-text" />
      <div style="padding-top: 35px" class="progress-item">
        <span>Vue</span>
        <el-progress :percentage="90" />
      </div>
      <div class="progress-item">
        <span>JavaScript</span>
        <el-progress :percentage="95" />
      </div>
      <div class="progress-item">
        <span>React</span>
        <el-progress :percentage="70" />
      </div>
      <div class="progress-item">
        <span>Vite</span>
        <el-progress :percentage="60" />
      </div>
      <div class="progress-item">
        <span>Pinia</span>
        <el-progress :percentage="90" />
      </div>
      <div class="progress-item">
        <span>Vue Router</span>
        <el-progress :percentage="88" />
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { reactive, computed } from 'vue'
import YuThumb from '/@/components/YuThumb'
import TextHover from '/@/components/YuTextHover'
import { useUserStore } from '/@/store'

const userStore = useUserStore()

const set = reactive( {
  name : computed( () => {
    return userStore.name
  } ),

  avatar : computed( () => {
    return userStore.avatar
  } ),

  roles : computed( () => {
    return userStore.roles
  } )
} )

defineOptions( {
  name : 'BoxCard'
} )
</script>

<style lang="scss">
.box-card-component {
  .el-card__header {
    padding: 0px !important;
  }
}
</style>
<style lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }
  .yuThumb {
    z-index: 100;
    height: 70px !important;
    width: 70px !important;
    position: absolute !important;
    top: -45px;
    left: 0;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none !important;
    :deep(.pan-info) {
      box-shadow: none !important;
    }
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
  @media only screen and (max-width: 1510px) {
    .mallki-text {
      display: none;
    }
  }
}
</style>
