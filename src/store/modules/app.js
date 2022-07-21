import { defineStore } from 'pinia'
import cookies from '/@/utils/cookies'

const useAppStore = defineStore( {
  id : 'app',
  state : () => {
    return {
      sidebar : {
        opened : cookies.get( 'sidebarStatus' ) ? !!+cookies.get( 'sidebarStatus' ) : true,
        withoutAnimation : false
      },
      device : 'desktop',
      size : cookies.get( 'size' ) || 'default',
      lang : cookies.get( 'lang' ) || 'zh'
    }
  },
  actions : {
    TOGGLE_SIDEBAR() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      if ( this.sidebar.opened ) {
        cookies.set( 'sidebarStatus', 1 )
      } else {
        cookies.set( 'sidebarStatus', 0 )
      }
    },
    CLOSE_SIDEBAR( withoutAnimation ) {
      cookies.set( 'sidebarStatus', 0 )
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE( device ) {
      this.device = device
    },
    SET_SIZE( size ) {
      this.size = size
      cookies.set( 'size', size )
    },
    SET_LANG( lang ) {
      this.lang = lang
      cookies.set( 'lang', lang )
    }
  }
} )

export default useAppStore
