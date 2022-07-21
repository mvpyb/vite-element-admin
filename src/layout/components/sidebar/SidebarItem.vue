<template>
  <div v-if="!props.item.meta?.hidden">
    <template
      v-if="
        hasOneShowingChild(props.item.children, props.item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !props.item.meta?.alwaysShow
      "
    >
      <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !props.isNest }">
          <svg-icon
            class-name="menu-icons"
            v-if="onlyOneChild.meta.icon || (props.item.meta && props.item.meta.icon)"
            :icon-class="onlyOneChild.meta.icon || (props.item.meta && props.item.meta.icon)"
          />
          <template #title>
            <span> {{ onlyOneChild.meta.title }} </span>
          </template>
        </el-menu-item>
      </AppLink>
    </template>

    <el-sub-menu v-else ref="subMenu" popper-class="sub-menu-test" :index="resolvePath(props.item.path)">
      <template #title>
        <svg-icon
          class-name="menu-icons"
          v-if="props.item.meta && props.item.meta.icon"
          :icon-class="props.item.meta && props.item.meta.icon"
        />
        <span> {{ props.item.meta.title }} </span>
      </template>
      <SidebarItem
        v-for="child in props.item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import path from 'path-browserify'
import { isExternal } from '/@/utils/validate'
import AppLink from './Link.vue'

// eslint-disable-next-line no-undef
const props = defineProps( {
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

const onlyOneChild = ref( null )
const subMenu = ref( null )

function hasOneShowingChild( children = [], parent ) {
  const showingChildren = children.filter( item => {
    if ( item.meta?.hidden ) {
      return false
    } else {
      onlyOneChild.value = item
      return true
    }
  } )
  if ( showingChildren.length === 1 ) {
    return true
  }
  if ( showingChildren.length === 0 ) {
    onlyOneChild.value = { ...parent, path : '', noShowingChildren : true }
    return true
  }
  return false
}

const resolvePath = routePath => {
  if ( isExternal( routePath ) ) {
    return routePath
  }
  if ( isExternal( props.basePath ) ) {
    return props.basePath
  }
  return path.resolve( props.basePath, routePath )
}

defineOptions( {
  name : 'SidebarItem'
} )
</script>
