import { defineStore } from 'pinia'

const useTagsViewStore = defineStore( {
  id : 'tagsView',
  state : () => {
    return {
      visitedViews : [],
      cachedViews : [],
      currentClose : ''
    }
  },
  actions : {
    ADD_VIEW( view ) {
      this.ADD_VISITED_VIEW( view )
      this.ADD_CACHED_VIEW( view )
    },
    DEL_VIEW( view ) {
      return new Promise( resolve => {
        this.DEL_VISITED_VIEW( view )
        this.DEL_CACHED_VIEW( view )
        resolve( {
          visitedViews : [...this.visitedViews],
          cachedViews : [...this.cachedViews]
        } )
      } )
    },
    DEL_OTHERS_VIEWS( view ) {
      return new Promise( resolve => {
        this.DEL_OTHERS_VISITED_VIEWS( view )
        this.DEL_OTHERS_CACHED_VIEWS( view )
        resolve( [...this.visitedViews] )
      } )
    },
    DEL_ALL_VIEWS( view ) {
      return new Promise( resolve => {
        this.DEL_ALL_VISITED_VIEWS( view )
        this.DEL_ALL_CACHED_VIEWS( view )
        resolve( {
          visitedViews : [...this.visitedViews],
          cachedViews : [...this.cachedViews]
        } )
      } )
    },

    ADD_VISITED_VIEW( view ) {
      if ( this.visitedViews.some( v => v.path === view.path ) ) return
      this.visitedViews.push(
        Object.assign( {}, view, {
          title : view.meta.title || 'no-name'
        } )
      )
    },
    ADD_CACHED_VIEW( view ) {
      if ( this.cachedViews.includes( view.name ) ) return
      if ( !view.meta.noCache ) {
        this.cachedViews.push( view.name )
      }
    },

    DEL_VISITED_VIEW( view ) {
      for ( const [i, v] of this.visitedViews.entries() ) {
        if ( v.path === view.path ) {
          this.visitedViews.splice( i, 1 )
          break
        }
      }
    },
    DEL_CACHED_VIEW( view ) {
      const index = this.cachedViews.indexOf( view.name )
      index > -1 && this.cachedViews.splice( index, 1 )
    },

    DEL_OTHERS_VISITED_VIEWS( view ) {
      this.visitedViews = this.visitedViews.filter( v => {
        return v.meta.affix || v.path === view.path
      } )
    },
    DEL_OTHERS_CACHED_VIEWS( view ) {
      const index = this.cachedViews.indexOf( view.name )
      if ( index > -1 ) {
        this.cachedViews = this.cachedViews.slice( index, index + 1 )
      } else {
        this.cachedViews = []
      }
    },

    DEL_ALL_VISITED_VIEWS() {
      const affixTags = this.visitedViews.filter( tag => tag.meta.affix )
      this.visitedViews = affixTags
    },
    DEL_ALL_CACHED_VIEWS() {
      this.cachedViews = []
    },

    UPDATE_VISITED_VIEW( view ) {
      for ( let v of this.visitedViews ) {
        if ( v.path === view.path ) {
          v = Object.assign( v, view )
          break
        }
      }
    },
    CURRENT_CLOSE( name ) {
      this.currentClose = name || ''
    }
  }
} )
export default useTagsViewStore
