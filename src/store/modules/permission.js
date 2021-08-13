
import { asyncRoutes, constantRoutes } from '/@/router'
import { toRaw } from '@vue/reactivity'

/**
 * 使用meta.role来确定当前用户是否有权
 * @param roles
 * @param route
 */
function hasPermission( roles, route ) {
  if ( route.meta && route.meta.roles ) {
    return roles.some( role => route.meta.roles.includes( role ) )
  } else {
    return true
  }
}

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes( routes, roles ) {
  const res = []
  routes.forEach( route => {
    const tmp = { ...route }
    if ( hasPermission( roles, tmp ) ) {
      if ( tmp.children ) {
        tmp.children = filterAsyncRoutes( tmp.children, roles )
      }
      res.push( tmp )
    }
  } )
  return res
}

const state = {
  routes : [],
  addRoutes : [],
  directivePermission : []
}

const mutations = {
  SET_ROUTES : ( state, routes ) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat( routes )
    // console.log( 'accessRoutes1  state.routes', state.routes, toRaw(state.routes) )
  },
  SET_DIRECTIVE_ROLE : ( state, roles ) => {
    state.directivePermission = roles
  }
}

const actions = {
  generateRoutes( { commit }, roles ) {
    return new Promise( resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      // const accessedRoutes = filterAsyncRoutes( asyncRoutes, roles )
      commit( 'SET_ROUTES', accessedRoutes )
      resolve( accessedRoutes )
    } )
  },
  
  setDirectivePermission( { commit }, roles ) {
    return new Promise( resolve => {
      commit( 'SET_DIRECTIVE_ROLE', roles )
      resolve( roles )
    } )
  }
}

export default {
  namespaced : true,
  state,
  mutations,
  actions
}
