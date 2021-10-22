<template>
  <div :class="classObject" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside(false)"
    />
    <sidebar class="sidebar-container" v-if="!containerHiddenSideBar" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import {
  ref,
  unref,
  reactive,
  computed,
  toRefs,
  watch,
  watchEffect,
  onMounted,
  onBeforeMount
} from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import { toggleClass } from '/@/utils/operate'
const hiddenMainContainer = 'hidden-main-container'
import { useEventListener } from '@vueuse/core'

export default {
  name : 'Layout',
  components : { Navbar, Sidebar, AppMain, TagsView },
  setup() {
    const store = useStore()
    const route = useRoute()
    const WIDTH = ref( 992 )
    const containerHiddenSideBar = ref( false )

    const set = reactive( {
      sidebar : computed( () => {
        return store.getters.sidebar
      } ),

      device : computed( () => {
        return store.getters.device
      } ),

      fixedHeader : computed( () => {
        return store.getters.fixedHeader
      } ),

      needTagsView : computed( () => {
        return store.state.settings.tagsView
      } ),

      classObject : computed( () => {
        return {
          hideSidebar : !set.sidebar.opened,
          openSidebar : set.sidebar.opened,
          withoutAnimation : set.sidebar.withoutAnimation,
          mobile : set.device === 'mobile'
        }
      } )
    } )

    const handleClickOutside = ( params ) => {
      store.dispatch( 'app/closeSideBar', { withoutAnimation : params } )
    }

    watchEffect( () => {
      if ( set.device === 'mobile' && !set.sidebar.opened ) {
        handleClickOutside( false )
      }
    } )

    watch(
      route,
      async() => {
        if ( set.device === 'mobile' && set.sidebar.opened ) {
          store.dispatch( 'app/closeSideBar', { withoutAnimation : false } )
        }
      },
      { immediate : true }
    )

    const $_isMobile = () => {
      const rect = document.body.getBoundingClientRect()
      return rect.width - 1 < WIDTH.value
    }

    const $_resizeHandler = () => {
      if ( !document.hidden ) {
        const isMobile = $_isMobile()
        store.dispatch( 'app/toggleDevice', isMobile ? 'mobile' : 'desktop' )
        if ( isMobile ) {
          handleClickOutside( true )
        }
      }
    }

    function onFullScreen() {
      if ( unref( containerHiddenSideBar ) ) {
        containerHiddenSideBar.value = false
        toggleClass(
          false,
          hiddenMainContainer,
          document.querySelector( '.main-container' )
        )
      } else {
        containerHiddenSideBar.value = true
        toggleClass(
          true,
          hiddenMainContainer,
          document.querySelector( '.main-container' )
        )
      }
    }

    onMounted( () => {
      const isMobile = $_isMobile()
      if ( isMobile ) {
        store.dispatch( 'app/toggleDevice', 'mobile' )
        handleClickOutside( true )
      }
      toggleClass(
        unref( containerHiddenSideBar ),
        hiddenMainContainer,
        document.querySelector( '.main-container' )
      )
    } )

    onBeforeMount( () => {
      useEventListener( 'resize', $_resizeHandler )
    } )

    return {
      ...toRefs( set ),
      handleClickOutside,
      containerHiddenSideBar,
      onFullScreen
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/mixin.scss";
@import "../styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
