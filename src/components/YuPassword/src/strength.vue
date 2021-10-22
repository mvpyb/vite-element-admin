<template>
  <el-input
    placeholder="请输入密码"
    v-model="input"
    show-password
    @change="handleChange"
  ></el-input>
  <div class="pwd-strength-bar">
    <div
      class="pwd-strength-bar-bar--fill"
      :data-score="getPasswordStrength"
    ></div>
  </div>
</template>

<script>
import { defineComponent, computed, ref, unref } from 'vue'
import { zxcvbn } from '@zxcvbn-ts/core'
import focus from '/@/directive/focus'

export default defineComponent( {
  name : 'Strength',
  props : {
    value : {
      type : String,
      default : ''
    },
    showInput : {
      type : Boolean,
      default : true
    },
    disabled : {
      type : Boolean,
      default : false
    }
  },
  directives : { focus },
  emits : ['scoreChange', 'change'],
  setup( props, { emit } ) {
    const input = ref( '' )
    const getPasswordStrength = computed( () => {
      const { disabled } = props
      if ( disabled ) return -1
      const innerValue = unref( input )
      const score = innerValue ? zxcvbn( unref( input ) ).score : -1
      emit( 'scoreChange', score )
      return score
    } )

    function handleChange( e ) {
      emit( 'change', input.value )
    }

    return {
      input,
      handleChange,
      getPasswordStrength
    }
  }
} )
</script>

<style lang="scss" scoped>
.pwd-strength-bar {
  position: relative;
  height: 6px;
  margin: 10px auto 6px;
  border-radius: 6px;
  background-color: #000;

  &::before,
  &::after {
    position: absolute;
    z-index: 10;
    display: block;
    width: 20%;
    height: inherit;
    background-color: transparent;
    border-color: #fff;
    border-style: solid;
    border-width: 0 5px 0 5px;
    content: "";
  }

  &::before {
    left: 20%;
  }

  &::after {
    right: 20%;
  }

  .pwd-strength-bar-bar--fill {
    position: absolute;
    width: 0;
    height: inherit;
    background-color: transparent;
    border-radius: inherit;
    transition: width 0.5s ease-in-out, background 0.25s;

    &[data-score="0"] {
      width: 20%;
      background-color: #e74242;
    }

    &[data-score="1"] {
      width: 40%;
      background-color: #ed6f6f;
    }

    &[data-score="2"] {
      width: 60%;
      background-color: #efbd47;
    }

    &[data-score="3"] {
      width: 80%;
      background-color: #55d18780;
    }

    &[data-score="4"] {
      width: 100%;
      background-color: #55d187;
    }
  }
}
</style>
