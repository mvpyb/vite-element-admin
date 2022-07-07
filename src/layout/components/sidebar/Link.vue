<template>
  <component :is="set.type" v-bind="linkProps(props.to)">
    <slot />
  </component>
</template>

<script setup>
import { isExternal } from '/@/utils/validate'
import { computed, reactive, unref } from 'vue'

const props = defineProps( {
  to : {
    type : String,
    required : true
  }
} )

const set = reactive( {
  isOuterLink : computed( () => {
    return isExternal( props.to )
  } ),
  type : computed( () => {
    if ( unref( set.isOuterLink ) ) {
      return 'a'
    }
    return 'router-link'
  } )
} )

const linkProps = to => {
  if ( unref( set.isOuterLink ) ) {
    return {
      href : to,
      target : '_blank',
      rel : 'noopener'
    }
  }
  return {
    to
  }
}

defineOptions( {
  name : 'Link'
} )
</script>
