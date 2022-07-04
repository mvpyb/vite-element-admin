
import { defineStore } from 'pinia'

const useCountStore = defineStore( {
  id : 'test', // id必填，且需要唯一
  // state
  state : () => {
    return {
      count : 0
    }
  },
  // getters
  getters : {
    doubleCount : state => {
      return state.count * 2
    }
  },
  // actions
  actions : {
    // actions 同样支持异步写法
    countAdd() {
      // 可以通过 this 访问 state 中的内容
      this.count++
    },
    plus( state, v ) {
      console.log( 'state', state, v )
      // 可以通过 this 访问 state 中的内容
      this.count = this.count + 5
      console.log( 'sss', this.count )
      // this.count += state
    },
    countReduce() {
      this.count--
    }
  }
} )

export default useCountStore
