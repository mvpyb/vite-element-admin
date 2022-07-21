const toString = Object.prototype.toString
export function is( val, type ) {
  return toString.call( val ) === `[object ${type}]`
}
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal( path ) {
  return /^(https?:|mailto:|tel:)/.test( path )
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString( str ) {
  if ( typeof str === 'string' || str instanceof String ) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray( arg ) {
  if ( typeof Array.isArray === 'undefined' ) {
    // return Object.prototype.toString.call(arg) === '[object Array]'
    return is( arg, 'Array' )
  }
  return Array.isArray( arg )
}

/**
 * @param {Object} arg
 * @returns {Boolean}
 */
export function isNumber( arg ) {
  return arg !== null && is( arg, 'Number' )
}

/**
 * @param {Object} arg
 * @returns {Boolean}
 */
export function isObject( arg ) {
  return arg !== null && is( arg, 'Object' )
}

/**
 * @param {Object} arg
 * @returns {Boolean}
 */
export function isEmpty( arg ) {
  if ( isArray( arg ) || isString( arg ) ) {
    return arg.length === 0
  }

  if ( arg instanceof Map || arg instanceof Set ) {
    return arg.size === 0
  }

  if ( isObject( arg ) ) {
    return Object.keys( arg ).length === 0
  }
  return false
}

/**
 * @param {Object} arg
 * @returns {Boolean}
 */
export function isFunction( arg ) {
  return typeof arg === 'function'
}
/**
 * @param {Object} arg
 * @returns {Boolean}
 */
export function isBoolean( arg ) {
  return is( arg, 'Boolean' )
}

/**
 * @param {Object} arg
 * @returns {Boolean}
 */
export function isRegExp( arg ) {
  return is( arg, 'RegExp' )
}

/**
 * @param {Object} arg
 * @returns {Boolean}
 */
export function isPromise( arg ) {
  return is( arg, 'Promise' ) && isObject( arg ) && isFunction( arg.then ) && isFunction( arg.catch )
}

/**
 * @param {Object} arg
 * @returns {Boolean}
 */
export function isIterable( arg ) {
  return arg != null && typeof arg[Symbol.iterator] === 'function'
  // const isIterable = arg => arg != null && typeof arg[Symbol.iterator] === 'function';
  // return isIterable( arg )
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername( str ) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf( str.trim() ) >= 0
}
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validPhone( str ) {
  var pass = false
  var val = str.trim()
  // if ( !/^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|16[0-9]|14[0-9])[0-9]{8}$/i.test( val ) ) {
  if ( !/^(0|86|17951)?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9])[0-9]{8}$/i.test( val ) ) {
    pass = false
  } else {
    pass = true
  }
  return pass
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL( url ) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test( url )
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase( str ) {
  const reg = /^[a-z]+$/
  return reg.test( str )
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase( str ) {
  const reg = /^[A-Z]+$/
  return reg.test( str )
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets( str ) {
  const reg = /^[A-Za-z]+$/
  return reg.test( str )
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail( email ) {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test( email )
}

/**
 * @param {string} ID
 * @returns {Boolean}
 */
export function validID( str ) {
  const reg =
    /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  return reg.test( str )
}

export function isNull( arg ) {
  return is( arg, 'Null' )
}

export function isUnDef( arg ) {
  return is( arg, 'Undefined' )
}

export function isNullAndUnDef( arg ) {
  return isNull( arg ) && isUnDef( arg )
}
