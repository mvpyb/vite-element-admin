import { login, logout, getInfo } from '/@/api/user'
import { getCookieByKey, setCookie, removeCookieByKey, clearAllCookies } from '/@/utils/cookies'
import { COOKIE_PREFIX } from '/@/api/constant'
import router, { resetRouter } from '/@/router'

const state = {
  token: getCookieByKey( 'token' ),
  name: '灰是小灰灰的灰',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFOS: (state, data) => {
    const { name, avatar, roles } = data
    state.name = name
    state.avatar = avatar
    state.roles = roles
  },
  CLEAR_USER_INFOS( state ) {
    state.token = ''
    state.name = ''
    state.avatar = ''
    state.roles = []
  },
  
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 用户注册成功之后，保存token assessCode timestamp
  saveToken( { commit }, payload ) {
    const { token } = payload
    commit( 'SET_TOKEN', payload )
    setCookie( `${COOKIE_PREFIX}token`, token )
  },
  
  // token 登录
  loginByToken( { commit, state }, payload ) {
    return new Promise( ( resolve, reject ) => {
      getInfo( payload )
          .then( response => {
            const { data, code } = response
            if ( !data || code !== 200 ) {
              reject( 'token登录失败' )
            }
            commit( 'SET_USER_INFOS', data )
            
            for ( const key in data ) {
              setCookie( `${COOKIE_PREFIX}${key}`, data[key] || '' )
            }
            
            resolve( data )
          } )
          .catch( error => {
            reject( error )
            commit( 'CLEAR_USER_INFOS' )
            clearAllCookies()
            // resetRouter()
          } )
    } )
  },
  
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('验证失败，请再次登录')
        }
        const { roles, name, avatar, introduction } = data
        if (!roles || roles.length <= 0) {
          reject('roles必须是个数组')
        }
        
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setCookie('token', data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  
  // 清空所有登录信息
  resetInfo( { commit, dispatch } ) {
    return new Promise( ( resolve ) => {
      commit( 'CLEAR_USER_INFOS' )
      clearAllCookies()
      resetRouter()
      dispatch( 'tagsView/delAllViews', null, { root : true } )
      resolve()
    } )
  },
  
  logout({ state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        dispatch('user/resetInfo', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
