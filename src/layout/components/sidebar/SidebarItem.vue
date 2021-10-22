<template>
  <template
    v-if="
      hasOneShowingChild(item.children, item) &&
      (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
      !item.alwaysShow
    "
  >
    <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
      <el-menu-item
        :index="resolvePath(onlyOneChild.path)"
        :class="{ 'submenu-title-noDropdown': !isNest }"
      >
        <i
          v-if="onlyOneChild.meta.icon.includes('el-icon')"
          :class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
        />
        <svg-icon
          v-else
          :icon-class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
        />
        <template #title>
          <span>{{ onlyOneChild.meta.title }}</span>
        </template>
      </el-menu-item>
    </app-link>
  </template>

  <el-sub-menu
    v-else
    ref="subMenu"
    :index="resolvePath(item.path)"
    popper-append-to-body
  >
    <template #title>
      <i
        v-if="onlyOneChild.meta.icon.includes('el-icon')"
        :class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
      />
      <svg-icon v-else :icon-class="item.meta && item.meta.icon" />
      <span> {{ item.meta.title }} </span>
    </template>
    <sidebar-item
      v-for="child in item.children"
      :key="child.path"
      :is-nest="true"
      :item="child"
      :base-path="resolvePath(child.path)"
      class="nest-menu"
    />
  </el-sub-menu>
</template>

<script setup>
import { ref } from 'vue'
import path from 'path'
import { isExternal } from '/@/utils/validate'
import AppLink from './Link.vue'

// eslint-disable-next-line no-undef
const props = defineProps( {
  class : {
    type : String,
    required : ''
  },
  item : {
    type : Object,
    required : true
  },
  isNest : {
    type : Boolean,
    default : false
  },
  basePath : {
    type : String,
    default : ''
  }
} )

const onlyOneChild = ref( {} )
const subMenu = ref( null )

function hasOneShowingChild( children = [], parent ) {
  const showingChildren = children.filter( ( item ) => {
    if ( item.hidden ) {
      // 不显示hidden属性为true的菜单
      return false
    } else {
      // TEMP SET（如果只有一个显示的child，将被使用）
      onlyOneChild.value = item
      return true
    }
  } )
  // 当只有一个子路由器时，默认情况下会显示子路由器
  if ( showingChildren.length === 1 ) {
    return true
  }
  // 如果没有子路由器要显示, 显示父级
  if ( showingChildren.length === 0 ) {
    onlyOneChild.value = { ...parent, path : '', noShowingChildren : true }
    return true
  }
  return false
}

const resolvePath = ( routePath ) => {
  if ( isExternal( routePath ) ) {
    return routePath
  }
  if ( isExternal( props.basePath ) ) {
    return props.basePath
  }

  // console.log( 'routePath', routePath)
  // console.log( 'props.basePath', props.basePath)
  // return routePath
  return path.resolve( props.basePath, routePath )
}
</script>
