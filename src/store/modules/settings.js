import { defineStore } from 'pinia'
import variables from '/@/styles/element-variables.scss'
import { localStorageHandle } from '/@/utils/storage'
import defaultSettings from '/@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const useSettingsStore = defineStore( {
  id : 'settings',
  state : () => {
    return {
      theme : variables.theme,
      showSettings,
      tagsView : localStorageHandle.get( 'tagsView' ) ? !!+localStorageHandle.get( 'tagsView' ) : tagsView,
      fixedHeader : localStorageHandle.get( 'fixedHeader' ) ? !!+localStorageHandle.get( 'fixedHeader' ) : fixedHeader,
      sidebarLogo : localStorageHandle.get( 'sidebarLogo' ) ? !!+localStorageHandle.get( 'sidebarLogo' ) : sidebarLogo,
      layoutMod : localStorageHandle.get( 'layoutMod' ) == 'horizontal' ? 'horizontal' : 'vertical'
    }
  },
  actions : {
    CHANGE_SETTING( { key, value } ) {
      // eslint-disable-next-line no-prototype-builtins
      if ( this.hasOwnProperty( key ) ) {
        this[key] = value
        localStorageHandle.set( key, +value )
      }
    },
    CHANGE_LAYOUT_MOD( val = 'vertical' ) {
      const mod = val == 'vertical' ? 'vertical' : 'horizontal'
      localStorageHandle.set( 'layoutMod', mod )
      this.layoutMod = mod
    }
  }
} )
export default useSettingsStore
