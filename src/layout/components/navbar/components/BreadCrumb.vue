<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group appear name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{
          item.meta.title
        }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { compile } from 'path-to-regexp'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const levelList = ref( [] )
const route = useRoute()
const router = useRouter()

const isDashboard = route => {
  const name = route && route.name
  if ( !name ) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}

const getBreadcrumb = () => {
  let matched = route.matched.filter( item => item.meta && item.meta.title )
  const first = matched[0]
  if ( !isDashboard( first ) ) {
    matched = [{ path : '/', meta : { title : '首页' }}].concat( matched )
  }
  levelList.value = matched.filter( item => item.meta && item.meta.title && item.meta.breadcrumb !== false )
}

const pathCompile = path => {
  const { params } = route
  const toPath = compile( path )
  return toPath( params )
}

const handleLink = item => {
  const { redirect, path } = item
  if ( redirect ) {
    router.push( redirect.toString() )
    return
  }
  router.push( pathCompile( path ) )
}

getBreadcrumb()

watch(
  () => route.path,
  path => {
    if ( path.startsWith( '/redirect/' ) ) {
      return
    }
    getBreadcrumb()
  },
  {
    immediate : true
  }
)

defineOptions( {
  name : 'BreadCrumb'
} )
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
