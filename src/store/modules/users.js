import { defineStore } from 'pinia'
import cookies from '@/utils/cookies'
import { TOKEN, AVATAR } from '@/config/constant'
import { logout, getInfo } from '@/api/user'
import { resetRouter } from '@/router'
import useTagsViewStore from './tagsView'

const useUserStore = defineStore( {
  id : 'users',
  state : () => {
    return {
      token : cookies.get( TOKEN ),
      uid : '9527',
      avatar : AVATAR,
      name : '灰是小灰灰的灰',
      phone : '15988888888',
      email : '454539387@qq.com',
      identity : '',
      roles : []
    }
  },
  actions : {
    SET_TOKEN( token = '' ) {
      token ? cookies.set( TOKEN, token ) : cookies.remove( TOKEN )
      this.token = token
    },
    async GET_USER_INFO() {
      try {
        const { code, data } = await getInfo()
        if ( code == 200 ) {
          const { id, name, avatar, roles, phone, email, identity } = data
          this.uid = id || '9527'
          this.name = name || ''
          this.phone = phone || ''
          this.email = email || ''
          this.identity = identity || ''
          this.avatar = avatar || AVATAR
          this.roles = roles || ['editor']
          return {
            ...data,
            uid : this.uid,
            roles : this.roles
          }
        }
      } catch ( error ) {
        return error
      }
    },
    async LOGIN_OUT() {
      try {
        const { code } = await logout( this.token )
        if ( code == 200 ) {
          this.token = ''
          this.name = ''
          this.avatar = ''
          this.phone = ''
          this.email = ''
          this.identity = ''
          this.roles = []
          this.RESET_INFO()
        }
      } catch ( error ) {
        return error
      }
    },
    // 清空所有登录信息
    RESET_INFO() {
      return new Promise( resolve => {
        const tagsViewStore = useTagsViewStore()
        cookies.clearAll()
        resetRouter()
        tagsViewStore.DEL_ALL_VIEWS( null )
        resolve()
      } )
    }
  }
} )
export default useUserStore
