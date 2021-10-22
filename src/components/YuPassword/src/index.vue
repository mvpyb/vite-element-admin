<template>
  <div class="pwd-container">
    <ul class="pwd-list" @click="focusPwd">
      {{
        currentIndex
      }}
      <li v-for="(item, index) in pwdData" :key="index">
        <input
          :type="showPwd ? 'text' : 'password'"
          :class="{ active: currentIndex === index }"
          :ref="setItemRef"
          maxlength="1"
          v-model="item.val"
          :readonly="currentIndex !== index"
          @keyup="keyup(index, $event)"
          @keydown="keydown(index, $event)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, computed, ref, watch, onBeforeUpdate } from 'vue'
import { isArray } from '/@/utils/validate.js'

export default defineComponent( {
  name : 'Password',
  props : {
    initial : {
      type : String,
      default : ''
    },
    pureNum : {
      type : Boolean,
      default : false
    },
    showPwd : {
      type : Boolean,
      default : false
    }
  },
  emits : ['getFullPwd'],
  setup( props, { emit } ) {
    const pwdData = ref( [
      {
        val : ''
      },
      {
        val : ''
      },
      {
        val : ''
      },
      {
        val : ''
      },
      {
        val : ''
      },
      {
        val : ''
      }
    ] )
    const fullPwd = ref( '' )
    let itemRefs = []
    const setItemRef = ( el ) => {
      itemRefs.push( el )
    }
    onBeforeUpdate( () => {
      itemRefs = []
    } )

    // 把非数字替换为空
    function replaceNum( data ) {
      if ( isArray( data ) ) {
        data.forEach( ( item ) => {
          item.val = item.val.replace( /[^\d]/g, '' )
        } )
      }
    }
    // 回填初始密码
    function initPwd() {
      const initial = props.initial
      if ( props.pureNum ) {
        if ( /^\d+$/.test( initial ) ) {
          fillPwd( initial )
        } else {
          console.error( '初始密码包含非数字' )
        }
      } else {
        fillPwd( initial )
      }
    }
    // 填充密码
    function fillPwd( val ) {
      for ( let i = 0; i < val.length; i++ ) {
        pwdData['value'][i]['val'] = val.charAt( i )
      }
      getFullPwd()
    }
    initPwd()

    // 如果 pureNum == true, 则密码会替换非数字
    watch(
      () => pwdData.value,
      ( data ) => {
        itemRefs = []
        if ( props.pureNum ) {
          replaceNum( data )
        }
      },
      { deep : true, immediate : true }
    )

    // 获取当前聚焦索引
    const currentIndex = computed( () => {
      const index = pwdData.value.findIndex( ( item ) => item.val === '' )
      // console.log( 'currentIndex index', index )
      let cIndex = index > -1 ? index : 5
      // console.log( 'currentIndex cIndex', cIndex )
      cIndex = Math.min( cIndex, 5 )
      cIndex = Math.max( cIndex, 0 )
      return cIndex
    } )

    // 设置聚焦元素
    function focusPwd() {
      const cIndex = currentIndex.value
      const cEl = itemRefs[cIndex]
      cEl && cEl.focus()
    }

    // 输入密码
    function keyup() {
      focusPwd()
      getFullPwd()
    }

    // 删除密码
    function keydown( index, { keyCode } ) {
      if ( keyCode === 8 || keyCode === 46 ) {
        // console.log( 'pwdData', pwdData.value )
        // console.log( 'currentIndex', currentIndex.value )
        pwdData.value.forEach( ( item, index ) => {
          if ( index >= currentIndex.value - 1 ) {
            item.val = ''
          }
        } )
      }
    }

    // 输完获取密码
    function getFullPwd() {
      fullPwd.value = pwdData.value.reduce( ( a, b ) => a + b.val, '' )
      emit( 'getFullPwd', fullPwd.value )
    }

    return {
      focusPwd,
      keyup,
      keydown,
      getFullPwd,

      currentIndex,
      setItemRef,
      pwdData,
      fullPwd
    }
  }
} )
</script>

<style lang="scss" scoped>
.pwd-container {
  ul,
  li {
    list-style: none;
  }
  li {
    width: 40px;
    height: 40px;
    display: inline-block;
    margin: 0 15px;
    line-height: 40px;
    text-align: center;
    border: none;
    input {
      @extend li;
      margin: 0;
      outline: none;
      border: 1px solid transparent;
      &.active {
        border-color: #1d8ce0;
        &:focus {
          border-color: #00d00d;
        }
      }
    }
  }
}
</style>
