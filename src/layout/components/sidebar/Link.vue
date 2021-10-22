<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '/@/utils/validate'
import { computed, defineComponent, reactive, unref, toRefs } from 'vue'

export default defineComponent( {
  name : 'Link',
  props : {
    to : {
      type : String,
      required : true
    }
  },
  setup( props ) {
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

    const linkProps = ( to ) => {
      if ( unref( set.isOuterLink ) ) {
        return {
          href : to,
          target : '_blank',
          rel : 'noopener'
        }
      }
      return {
        to : to
      }
    }

    return {
      type : 'router-link',
      ...toRefs( set ),
      linkProps
    }
  }
} )
</script>
