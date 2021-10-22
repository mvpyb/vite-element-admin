<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse-transition="false"
        mode="vertical"
        :default-active="activeMenu"
        :collapse="isCollapse"
        unique-opened
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { toRaw } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'

export default defineComponent( {
  name : 'Sidebar',
  components : { Logo, SidebarItem },
  setup() {
    const store = useStore()
    const route = useRoute()

    const set = reactive( {
      permission_routes : computed( () => {
        const permissionRoutes = toRaw( store.getters.permission_routes )

        const filterRouter = filterAsyncRoutes( permissionRoutes )

        return filterRouter
        // return toRaw(store.getters.permission_routes)
      } ),

      sidebar : computed( () => {
        return store.getters.sidebar
      } ),

      showLogo : computed( () => {
        return store.state.settings.sidebarLogo
      } ),

      isCollapse : computed( () => {
        return !store.getters.sidebar.opened
      } ),

      variables : {
        menuText : '#bfcbd9',
        menuActiveText : '#409EFF',
        subMenuActiveText : '#f4f4f5',
        menuBg : '#304156',
        menuHover : '#263445',
        subMenuBg : '#1f2d3d',
        subMenuHover : '#001528',
        sideBarWidth : '210px'
      }
    } )

    const activeMenu = computed( () => {
      const { meta, path } = route
      if ( meta.activeMenu ) {
        return meta.activeMenu
      }
      return path
    } )

    const filterAsyncRoutes = ( datas ) => {
      const res = []
      datas.forEach( ( item ) => {
        if ( !item.hidden ) {
          const tmp = { ...item }
          if ( tmp.children ) {
            tmp.children = filterAsyncRoutes( tmp.children )
          }
          res.push( tmp )
        }
      } )
      return res
    }

    return {
      ...toRefs( set ),
      activeMenu
    }
  }
} )
</script>
