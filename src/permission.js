import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getCookieByKey } from '/@/utils/cookies'
import getPageTitle from '/@/utils/get-page-title'

NProgress.configure( { showSpinner : false } )

const whiteList = ['/login']
router.beforeEach( async( to, from, next ) => {
  NProgress.start()
  document.title = getPageTitle( to.meta.title )
  const hasToken = getCookieByKey( 'vite_token' )
  if ( hasToken && hasToken !== 'undefined' ) {
    if ( to.path === '/login' ) {
      next( { path : '/' } )
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if ( hasRoles ) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch( 'user/loginByToken', {} )
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            roles
          )
          accessRoutes.forEach( ( item ) => {
            router.addRoute( item )
          } )
          next( { ...to, replace : true } )
        } catch ( error ) {
          await store.dispatch( 'user/resetInfo' )
          next( `/login` )
          NProgress.done()
        }
      }
    }
  } else {
    if ( whiteList.indexOf( to.path ) !== -1 ) {
      next()
    } else {
      next( `/login` )
      NProgress.done()
    }
  }
} )

router.afterEach( () => {
  NProgress.done()
} )
