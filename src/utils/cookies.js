import Cookies from 'js-cookie'
import { getEnvs } from '/@/utils/system'
const envStr = getEnvs()

export function getDomain() {
  let domain
  const host = window.location.host
  if ( host.indexOf( 'shadowcreator.com' ) >= 0 ) {
    domain = 'shadowcreator.com'
  } else if ( host.indexOf( 'qulivr.com' ) >= 0 ) {
    domain = 'qulivr.com'
  } else if ( host.indexOf( 'movisionxr.com' ) >= 0 ) {
    domain = 'movisionxr.com'
  } else {
    domain = window.location.hostname
  }
  return {
    domain
  }
}

let cookiePreFix
if ( envStr === 'dev' ) {
  cookiePreFix = 'fat_'
} else if ( envStr === 'fat' ) {
  cookiePreFix = 'fat_'
} else if ( envStr === 'uat' ) {
  cookiePreFix = 'uat_'
} else {
  cookiePreFix = ''
}
const hostStr = getDomain().domain
const cookieParams = {
  path : '/',
  domain : hostStr
}
export function getAllCookies() {
  var cookies = document.cookie.split( /;\s/g )
  var cookieObj = {}
  cookies.forEach( function( item ) {
    var key = item.split( '=' )[0]
    cookieObj[key] = item.split( '=' )[1]
  } )
  return cookieObj
}

export function getCookieByKey( key, off ) {
  let keyStr = ''
  if ( !off ) {
    keyStr = cookiePreFix + '' + key
  } else {
    keyStr = key
  }
  return Cookies.get( keyStr )
}
// setUserInfos
export function setCookie( key, value, params ) {
  params =
    params === undefined
      ? {
        expires : 7,
        path : '/',
        domain : hostStr || undefined
        // Secure : true,
        // SameSite : 'none',
      }
      : params
  const keyStr = cookiePreFix + '' + key
  return Cookies.set( keyStr, value, params )
}

export function removeCookieByKey( key, off = false ) {
  const keyStr = off ? key : cookiePreFix + '' + key
  return Cookies.remove( keyStr, cookieParams )
}

export function clearAllCookies() {
  var keys = Object.keys( getAllCookies() )
  keys.forEach( ( key ) => {
    removeCookieByKey( key, true )
  } )
}
