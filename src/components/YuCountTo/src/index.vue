<template>
  <span :style="styleObj">{{ displayValue }}</span>
</template>

<script>
import { reactive, computed, watch, onMounted, unref, toRefs, ref, defineComponent } from 'vue'
import { isNumber } from '/@/utils/validate'
import { requestAnimationFrame, cancelAnimationFrame } from './requestAnimationFrame.js'

export default defineComponent( {
  name : 'YuCountTo',
  props : {
    startVal : {
      type : Number,
      required : false,
      default : 0
    },
    endVal : {
      type : Number,
      required : false,
      default : 2021
    },
    duration : {
      type : Number,
      required : false,
      default : 3000
    },
    autoplay : {
      type : Boolean,
      required : false,
      default : true
    },
    decimals : {
      type : Number,
      required : false,
      default : 0,
      validator( value ) {
        return value >= 0
      }
    },

    color : {
      type : String,
      default : ''
    },
    fontSize : {
      type : String,
      default : ''
    },

    decimal : {
      type : String,
      required : false,
      default : '.'
    },
    separator : {
      type : String,
      required : false,
      default : ','
    },
    prefix : {
      type : String,
      required : false,
      default : ''
    },
    suffix : {
      type : String,
      required : false,
      default : ''
    },
    useEasing : {
      type : Boolean,
      required : false,
      default : true
    },
    easingFn : {
      type : Function,
      default( t, b, c, d ) {
        return ( c * ( -Math.pow( 2, ( -10 * t ) / d ) + 1 ) * 1024 ) / 1023 + b
      }
    }
  },
  emits : ['mounted', 'callback'],
  setup( props, { emit } ) {
    const state = reactive( {
      localStartVal : props.startVal,
      displayValue : formatNumber( props.startVal ),
      printVal : null,
      paused : false,
      localDuration : props.duration,
      startTime : null,
      timestamp : null,
      remaining : null,
      rAF : null,
      color : null,
      fontSize : '16px'
    } )

    const getCountDown = computed( () => {
      return props.startVal > props.endVal
    } )

    watch( [() => props.startVal, () => props.endVal], () => {
      if ( props.autoplay ) {
        start()
      }
    } )

    function start() {
      const { startVal, duration, color, fontSize } = props
      state.localStartVal = startVal
      state.startTime = null
      state.localDuration = duration
      state.paused = false
      state.color = color
      state.fontSize = fontSize
      state.rAF = requestAnimationFrame( count )
    }

    // eslint-disable-next-line no-unused-vars
    function pauseResume() {
      if ( state.paused ) {
        resume()
        state.paused = false
      } else {
        pause()
        state.paused = true
      }
    }

    function pause() {
      cancelAnimationFrame( state.rAF )
    }

    function resume() {
      state.startTime = null
      state.localDuration = +state.remaining
      state.localStartVal = +state.printVal
      requestAnimationFrame( count )
    }

    // eslint-disable-next-line no-unused-vars
    function reset() {
      state.startTime = null
      cancelAnimationFrame( state.rAF )
      state.displayValue = formatNumber( props.startVal )
    }

    function count( timestamp ) {
      const { useEasing, easingFn, endVal } = props
      if ( !state.startTime ) state.startTime = timestamp
      state.timestamp = timestamp
      const progress = timestamp - state.startTime
      state.remaining = state.localDuration - progress

      if ( useEasing ) {
        if ( unref( getCountDown ) ) {
          state.printVal =
            state.localStartVal - easingFn( progress, 0, state.localStartVal - endVal, state.localDuration )
        } else {
          state.printVal = easingFn( progress, state.localStartVal, endVal - state.localStartVal, state.localDuration )
        }
      } else {
        if ( unref( getCountDown ) ) {
          state.printVal = state.localStartVal - ( state.localStartVal - endVal ) * ( progress / state.localDuration )
        } else {
          state.printVal = state.localStartVal + ( endVal - state.localStartVal ) * ( progress / state.localDuration )
        }
      }
      if ( unref( getCountDown ) ) {
        state.printVal = state.printVal < endVal ? endVal : state.printVal
      } else {
        state.printVal = state.printVal > endVal ? endVal : state.printVal
      }
      state.displayValue = formatNumber( state.printVal )
      if ( progress < state.localDuration ) {
        state.rAF = requestAnimationFrame( count )
      } else {
        emit( 'callback' )
      }
    }

    function formatNumber( num ) {
      const { decimals, decimal, separator, suffix, prefix } = props
      num = Number( num ).toFixed( decimals )
      num += ''
      const x = num.split( '.' )
      let x1 = x[0]
      const x2 = x.length > 1 ? decimal + x[1] : ''
      const rgx = /(\d+)(\d{3})/
      if ( separator && !isNumber( separator ) ) {
        while ( rgx.test( x1 ) ) {
          x1 = x1.replace( rgx, '$1' + separator + '$2' )
        }
      }
      return prefix + x1 + x2 + suffix
    }

    onMounted( () => {
      if ( props.autoplay ) {
        start()
      }
      emit( 'mounted' )
    } )

    const styleObj = ref( {
      color : props.color,
      fontSize : props.fontSize
    } )

    return {
      styleObj,
      ...toRefs( state )
    }
  }
} )
</script>

<style scoped></style>
