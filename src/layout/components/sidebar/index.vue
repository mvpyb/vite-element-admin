
<template>
  <div :class="{'has-logo' : set.showLogo}">
    <Logo
      v-if="set.showLogo"
      :collapse="set.isCollapse"
    />

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :active-text-color="variables.menuActiveText"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :default-active="set.activeMenu"
        :collapse="set.isCollapse"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
        class="sidebar-menus"
      >
        <SidebarItem
          v-for="item in set.routerLists"
          :key="item.path"
          :item="item"
          :base-path="item.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import Logo from './Logo'
import variables from '/@/styles/variables.module.scss'
import SidebarItem from './SidebarItem'

import { useRoute } from 'vue-router'
import { useAppStore, useSettingsStore, usePermissionStore } from '/@/store'

const route = useRoute()
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()

const set = reactive( {
  showLogo : computed( () => {
    return settingsStore.sidebarLogo
  } ),
  isCollapse : computed( () => {
    return !appStore.sidebar.opened
  } ),
  activeMenu : computed( () => {
    const { meta, path } = route
    if ( meta.activeMenu ) {
      return meta.activeMenu
    }
    return path
  } ),
  routerLists : computed( () => {
    return permissionStore.routes
  } )
} )
</script>

<style>

</style>
