<template>
  <el-card class="box-card-component" style="margin-left: 8px">
    <template #header>
      <div class="box-card-header">
        <img
            src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
        />
      </div>
    </template>

    <div style="position: relative">
      <yu-thumb :image="avatar" class="yuThumb" />
      <mallki class-name="mallki-text" text="vue-element-admin" />
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
        <span>Vuex</span>
        <el-progress :percentage="90" />
      </div>
      <div class="progress-item">
        <span>Vue Router</span>
        <el-progress :percentage="88" />
      </div>
    </div>
  </el-card>
</template>

<script>
import { ref, reactive, computed, toRefs } from 'vue'
import { useStore } from 'vuex'
import YuThumb from '/@/components/YuThumb'
import Mallki from '/@/components/TextHoverEffect/index.vue'

export default {
  name : 'TodoList',
  components : { YuThumb, Mallki },
  setup() {
    const store = useStore()

    const statisticsData = ref( {
      article_count : 1024,
      pageviews_count : 1024
    } )

    const set = reactive( {
      name : computed( () => {
        return store.getters.name
      } ),

      avatar : computed( () => {
        return store.getters.avatar
      } ),

      roles : computed( () => {
        return store.getters.roles
      } )
    } )
    return {
      ...toRefs( set ),
      statisticsData
    }
  }
}
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
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none !important;
    :deep .pan-info {
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
