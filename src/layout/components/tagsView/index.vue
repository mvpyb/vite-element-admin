<template>
  <div id="tags-view-container" class="tags-view-container">
    <el-scrollbar
      wrap-class="tags-view-wrapper"
      class="scroll-container"
      ref="scrollPaneEl"
      @scroll="handleScroll"
      @wheel.prevent="scrollHandle"
      :tagRefList="tagRefList"
    >
      <router-link
        :ref="setTagRef"
        v-for="tag in visitedViews"
        :key="tag.path"
        :class="isActive(tag) ? 'active un-select' : 'un-select'"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </el-scrollbar>

    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭
      </li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul>
  </div>
</template>

<script>
import path from 'path'
import {
  ref,
  reactive,
  computed,
  toRefs,
  watch,
  nextTick,
  onMounted,
  onBeforeMount,
  getCurrentInstance,
  onBeforeUpdate
} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name : 'TagsView',
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const { ctx } = getCurrentInstance()
    const tagAndTagSpacing = 4

    const scrollPaneEl = ref( null )
    const tag = ref( null )
    let tagRefList = []
    const setTagRef = ( el ) => {
      tagRefList.push( el )
    }
    onBeforeUpdate( () => {
      tagRefList = []
    } )

    const visible = ref( false )
    const top = ref( 0 )
    const left = ref( 0 )
    const selectedTag = ref( {} )
    const affixTags = ref( [] )

    const set = reactive( {
      visitedViews : computed( () => {
        const result = store.state.tagsView.visitedViews
        return result
      } ),
      routes : computed( () => {
        return store.state.permission.routes
      } )
    } )

    watch(
      () => visible.value,
      ( value ) => {
        if ( value ) {
          document.body.addEventListener( 'click', closeMenu )
        } else {
          document.body.removeEventListener( 'click', closeMenu )
        }
      }
    )

    watch( route, () => {
      tagRefList = []
      addTags()
      moveToCurrentTag()
    } )

    function closeMenu() {
      visible.value = false
    }
    function addTags() {
      const { name } = route
      if ( name ) {
        store.dispatch( 'tagsView/addView', route )
      }
      return false
    }
    function moveToCurrentTag() {
      nextTick( () => {
        // if ( !tagRefList && !Array.isArray( tagRefList ) ) return false
        for ( const item of tagRefList ) {
          if ( item.to.path === route.path ) {
            moveToTarget( item )
            if ( item.to.fullPath !== route.fullPath ) {
              store.dispatch( 'tagsView/updateVisitedView', route )
            }
            break
          }
        }
      } )
    }
    function moveToTarget( currentTag ) {
      const $container = scrollPaneEl.value.$el
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = scrollWrapper.value
      const tagList = tagRefList

      let firstTag = null
      let lastTag = null

      if ( tagList.length > 0 ) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }

      if ( firstTag === currentTag ) {
        $scrollWrapper.scrollLeft = 0
      } else if ( lastTag === currentTag ) {
        $scrollWrapper.scrollLeft =
          $scrollWrapper.scrollWidth - $containerWidth
      } else {
        const currentIndex = tagList.findIndex( ( item ) => item === currentTag )
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft =
          nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft =
          prevTag.$el.offsetLeft - tagAndTagSpacing

        if (
          afterNextTagOffsetLeft >
          $scrollWrapper.scrollLeft + $containerWidth
        ) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
        } else if ( beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft ) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
        }
      }
    }
    function initTags() {
      const affixs = ( affixTags.value = filterAffixTags( set.routes ) )
      for ( const item of affixs ) {
        if ( item.name ) {
          store.dispatch( 'tagsView/addVisitedView', item )
        }
      }
    }
    function filterAffixTags( routes, basePath = '/' ) {
      let tags = []
      routes.forEach( ( route ) => {
        if ( route.meta && route.meta.affix ) {
          const tagPath = path.resolve( basePath, route.path )
          tags.push( {
            fullPath : tagPath,
            path : tagPath,
            name : route.name,
            meta : { ...route.meta }
          } )
        }
        if ( route.children ) {
          const tempTags = filterAffixTags( route.children, route.path )
          if ( tempTags.length >= 1 ) {
            tags = [...tags, ...tempTags]
          }
        }
      } )
      return tags
    }

    function isActive( currentRoute ) {
      return currentRoute.path === route.path
    }
    function isAffix( item ) {
      return item && item.meta && item.meta.affix
    }
    function refreshSelectedTag( view ) {
      store.dispatch( 'tagsView/delCachedView', view ).then( () => {
        const { fullPath } = view
        nextTick( () => {
          router.replace( {
            path : '/redirect' + fullPath
          } )
        } )
      } )
    }
    function closeSelectedTag( view ) {
      store.dispatch( 'tagsView/delView', view ).then( ( { visitedViews } ) => {
        if ( isActive( view ) ) {
          toLastView( visitedViews, view )
        }
      } )
    }
    function closeOthersTags() {
      router.push( selectedTag.value )
      store.dispatch( 'tagsView/delOthersViews', selectedTag.value ).then( () => {
        moveToCurrentTag()
      } )
    }
    function closeAllTags( view ) {
      store.dispatch( 'tagsView/delAllViews' ).then( ( { visitedViews } ) => {
        if ( affixTags.value.some( ( item ) => item.path === view.path ) ) {
          return
        }
        toLastView( visitedViews, view )
      } )
    }
    function toLastView( visitedViews, view ) {
      const latestView = visitedViews.slice( -1 )[0]
      if ( latestView ) {
        router.push( latestView.fullPath )
      } else {
        if ( view.name === 'Dashboard' ) {
          router.replace( { path : '/redirect' + view.fullPath } )
        } else {
          router.push( '/' )
        }
      }
    }
    function openMenu( item, e ) {
      const menuMinWidth = 105
      const offsetLeft = ctx.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = ctx.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const l = e.clientX - offsetLeft + 15 // 鼠标相对于父级的left 值

      if ( l > maxLeft ) {
        left.value = maxLeft
      } else {
        left.value = l
      }

      top.value = e.clientY
      visible.value = true
      selectedTag.value = item
    }
    function handleScroll() {
      closeMenu()
    }
    function scrollHandle( e ) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = scrollWrapper.value
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
    }

    const scrollWrapper = computed( () => {
      return scrollPaneEl.value.$refs.wrap
    } )

    onMounted( () => {
      initTags()
      addTags()
      scrollWrapper.value.addEventListener( 'scroll', handleScroll, true )
    } )

    onBeforeMount( () => {
      // useEventListener("resize", $_resizeHandler);
    } )

    return {
      ...toRefs( set ),
      scrollPaneEl,
      tag,
      setTagRef,
      tagRefList,

      visible,
      top,
      left,
      selectedTag,
      affixTags,

      closeMenu,
      addTags,
      moveToCurrentTag,
      initTags,
      filterAffixTags,
      isActive,
      isAffix,
      refreshSelectedTag,
      closeSelectedTag,
      closeOthersTags,
      closeAllTags,
      toLastView,
      openMenu,
      handleScroll,
      scrollHandle,
      moveToTarget,

      scrollWrapper
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  .el-scrollbar__bar {
    bottom: 0px;
  }
  .el-scrollbar__wrap {
    height: 49px;
  }
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      background-color: #42b983;
      color: #fff;
      border-color: #42b983;
      &::before {
        content: "";
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 2px;
      }
    }
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
