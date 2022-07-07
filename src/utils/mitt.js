import { head, toArray } from 'lodash-unified'
import mitt from 'mitt'

export const emitter = mitt()

export default {
  install( Vue, options ) {
    const _emitter = mitt()

    // 全局发布
    Vue.config.globalProperties.$pub = ( ...args ) => {
      _emitter.emit( head( args ), args.slice( 1 ) )
    }

    // 全局订阅
    Vue.config.globalProperties.$sub = function( event, callback ) {
      Reflect.apply( _emitter.on, _emitter, toArray( arguments ) )
    }

    // 取消订阅
    Vue.config.globalProperties.$unsub = function( event, callback ) {
      Reflect.apply( _emitter.off, _emitter, toArray( arguments ) )
    }
  }
}
