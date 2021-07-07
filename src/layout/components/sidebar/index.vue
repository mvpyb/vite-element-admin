<template>
  <div :class="{'has-logo': showLogo}">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!--
      :active-text-color="variables.menuActiveText"
      :unique-opened="false"-->
      
      <el-menu
          :collapse-transition="false"
          mode="vertical"
          :default-active="activeMenu"
          :collapse="isCollapse"
          unique-opened
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import {computed, defineComponent, ref, unref, nextTick, onBeforeMount, reactive, toRefs} from "vue"
import { toRaw } from '@vue/reactivity'
import { useRoute, useRouter } from "vue-router"
import { useStore } from "vuex"

import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import { localStorageHandle } from '/@/utils/storages'
// import variables from '/@/styles/variables.scss'

export default defineComponent({
  name: "Sidebar",
  components: { Logo, SidebarItem },
  setup() {
    const store = useStore()
    const router = useRouter()
    const routes = router.options.routes
    const route = useRoute()
  
    const set = reactive({
      permission_routes: computed(() => {
        return toRaw(store.getters.permission_routes)
      }),
      
      sidebar: computed(() => {
        return store.getters.sidebar
      }),
      
      showLogo: computed(() => {
        return store.state.settings.sidebarLogo
      }),
      
      isCollapse: computed(() => {
        return !store.getters.sidebar.opened
      }),
  
      variables : {
        menuText: '#bfcbd9',
        menuActiveText: '#409EFF',
        subMenuActiveText: '#f4f4f5',
        menuBg: '#304156',
        menuHover: '#263445',
        subMenuBg: '#1f2d3d',
        subMenuHover: '#001528',
        sideBarWidth: '210px',
      }
    });
  
    const activeMenu = computed(() => {
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    })
    
    return {
      ...toRefs(set),
      activeMenu
    };
  }
});
</script>
