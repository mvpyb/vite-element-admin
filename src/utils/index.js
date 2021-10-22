
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime( time, cFormat ) {
  if ( arguments.length === 0 || !time ) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if ( typeof time === 'object' ) {
    date = time
  } else {
    if ( ( typeof time === 'string' ) ) {
      if ( ( /^[0-9]+$/.test( time ) ) ) {
        time = parseInt( time )
      } else {
        time = time.replace( new RegExp( /-/gm ), '/' )
      }
    }

    if ( ( typeof time === 'number' ) && ( time.toString().length === 10 ) ) {
      time = time * 1000
    }
    date = new Date( time )
  }
  const formatObj = {
    y : date.getFullYear(),
    m : date.getMonth() + 1,
    d : date.getDate(),
    h : date.getHours(),
    i : date.getMinutes(),
    s : date.getSeconds(),
    a : date.getDay()
  }
  const time_str = format.replace( /{([ymdhisa])+}/g, ( result, key ) => {
    const value = formatObj[key]
    if ( key === 'a' ) { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart( 2, '0' )
  } )
  return time_str
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject( url ) {
  url = url == null ? window.location.href : url
  const search = url.substring( url.lastIndexOf( '?' ) + 1 )
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace( reg, ( rs, $1, $2 ) => {
    const name = decodeURIComponent( $1 )
    let val = decodeURIComponent( $2 )
    val = String( val )
    obj[name] = val
    return rs
  } )
  return obj
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge( target, source ) {
  if ( typeof target !== 'object' ) {
    target = {}
  }
  if ( Array.isArray( source ) ) {
    return source.slice()
  }
  Object.keys( source ).forEach( property => {
    const sourceProperty = source[property]
    if ( typeof sourceProperty === 'object' ) {
      target[property] = objectMerge( target[property], sourceProperty )
    } else {
      target[property] = sourceProperty
    }
  } )
  return target
}
