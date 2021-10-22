<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
  />
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { isExternal } from '/@/utils/validate'
import { computed, reactive, toRefs } from 'vue'

export default {
  name : 'YuSvgIcon',
  props : {
    iconClass : {
      type : String,
      required : true
    },
    className : {
      type : String,
      default : ''
    }
  },
  setup( props, ctx ) {
    const set = reactive( {
      isExternal : computed( () => {
        return isExternal( props.iconClass )
      } ),
      iconName : computed( () => {
        return `#icon-${props.iconClass}`
      } ),
      svgClass : computed( () => {
        if ( props.className ) {
          return 'svg-icon ' + props.className
        } else {
          return 'svg-icon'
        }
      } ),
      styleExternalIcon : computed( () => {
        return {
          mask : `url(${props.iconClass}) no-repeat 50% 50%`,
          '-webkit-mask' : `url(${props.iconClass}) no-repeat 50% 50%`
        }
      } )
    } )
    return {
      ...toRefs( set )
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
