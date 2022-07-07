<template>
  <div :class="{ show: show }" class="header-search">
    <svg-icon class-name="search-icon" icon-class="search" @click.stop="click" />
    <span style="display: inline-block; color: red; width: 40px; height: 30px; line-height: 30px">
      {{ options.length }}</span
    >
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change"
    >
      <el-option
        v-for="item in options"
        :key="item.item.path"
        :value="item.item"
        :label="item.item.title ? item.item.title.join(' > ') : item.item.title"
      />
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import Fuse from 'fuse.js'
import path from 'path-browserify'
import { usePermissionStore } from '/@/store'
import { useRouter } from 'vue-router'

const router = useRouter()
const permissionStore = usePermissionStore()
const show = ref( false )
const search = ref( '' )
const options = ref( [] )
const searchPool = ref( [] )
const fuse = ref( null )
const headerSearchSelect = ref( null )

const routes = computed( () => permissionStore.routes )

const generateRoutes = ( routerList, basePath = '/', prefixTitle = [] ) => {
  let res = []

  for ( const item of routerList ) {
    // skip hidden item
    if ( item.hidden ) {
      continue
    }

    const data = {
      path : path.resolve( basePath, item.path ),
      title : [...prefixTitle]
    }

    if ( item.meta && item.meta.title ) {
      data.title = [...data.title, item.meta.title]

      if ( item.redirect !== 'noRedirect' ) {
        // only push the routes with title
        // special case: need to exclude parent router without redirect
        res.push( data )
      }
    }

    // recursive child routerList
    if ( item.children ) {
      const tempRoutes = generateRoutes( item.children, data.path, data.title )
      if ( tempRoutes.length >= 1 ) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}
const querySearch = query => {
  if ( query !== '' ) {
    options.value = fuse.value.search( query )
  } else {
    options.value = []
  }
}

const click = () => {
  show.value = !show.value
  if ( show.value ) {
    headerSearchSelect.value && headerSearchSelect.value.focus()
  }
}
const close = () => {
  headerSearchSelect.value && headerSearchSelect.value.blur()
  options.value = []
  show.value = false
}
const change = val => {
  router.push( val.path )
  search.value = ''
  options.value = []
  nextTick( () => {
    show.value = false
  } )
}
const initFuse = list => {
  fuse.value = new Fuse( list, {
    shouldSort : true,
    threshold : 0.4,
    location : 0,
    distance : 100,
    maxPatternLength : 32,
    minMatchCharLength : 1,
    keys : [
      {
        name : 'title',
        weight : 0.7
      },
      {
        name : 'path',
        weight : 0.3
      }
    ]
  } )
}

watch(
  routes,
  async() => {
    searchPool.value = generateRoutes( routes.value )
  }
  // { immediate : true }
)
watch(
  searchPool,
  async list => {
    initFuse( list )
  }
  // { immediate : true }
)
watch(
  show,
  async value => {
    if ( value ) {
      document.body.addEventListener( 'click', close )
    } else {
      document.body.removeEventListener( 'click', close )
    }
  }
  // { immediate : true }
)

onMounted( () => {
  searchPool.value = generateRoutes( routes.value )
} )

defineOptions( {
  name : 'HeaderSearch'
} )
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;

  &:hover {
    background: #f6f6f6;
  }

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep(.el-input__inner) {
      /*:deep(.el-input__inner) {*/
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
    /*  ::v-slotted(.foo) {}
      ::v-global(.foo) {}*/
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
