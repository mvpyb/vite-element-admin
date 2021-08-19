<template>
  <section class="app-main">
    <router-view :key="key" v-slot="{ Component }">
      <transition appear name="fade" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script>
import { computed, defineComponent } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "vuex"
export default defineComponent({
  name: "AppMain",
  setup() {
    const route = useRoute()
    const store = useStore()
    const key = computed(() => route.path)
    const cachedViews = computed(() => store.state.tagsView.cachedViews)
    return { key, cachedViews }
  }
});
</script>


<style lang="scss" scoped>
  .app-main {
    /* 50= navbar  50  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
    background: #F0F2F5;
  }
  .fixed-header+.app-main {
    padding-top: 50px;
  }
  .hasTagsView {
    .app-main {
      min-height: calc(100vh - 84px);
    }
    .fixed-header+.app-main {
      padding-top: 84px;
    }
  }
</style>

<style lang="scss">
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 15px;
    }
  }
</style>
