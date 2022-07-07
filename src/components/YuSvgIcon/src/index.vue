<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" />
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { isExternal as isExternalLink } from '/@/utils/validate'
import { computed } from 'vue'

const props = defineProps( {
  iconClass : {
    type : String,
    required : true
  },
  className : {
    type : String,
    default : ''
  }
} )

const isExternal = computed( () => {
  return isExternalLink( props.iconClass )
} )
const iconName = computed( () => {
  return `#icon-${props.iconClass}`
} )
const svgClass = computed( () => {
  if ( props.className ) {
    return 'svg-icon ' + props.className
  } else {
    return 'svg-icon'
  }
} )
const styleExternalIcon = computed( () => {
  return {
    mask : `url(${props.iconClass}) no-repeat 50% 50%`,
    '-webkit-mask' : `url(${props.iconClass}) no-repeat 50% 50%`
  }
} )

defineOptions( {
  name : 'YuSvgIcon'
} )
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  display: inline-block;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
