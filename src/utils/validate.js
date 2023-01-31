const toString = Object.prototype.toString
export function is( arg, type ) {
  return toString.call( arg ) === `[object ${type}]`
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
export function isDate( arg ) {
  return is( arg, 'Date' )
}

/**
 * @param {Object} arg
 * @returns {Boolean}
 */
export function isNull( arg ) {
  return arg === null
}

export function isNullAndUnDef( arg ) {
  return isNull( arg ) && isUnDef( arg )
}

export function isNullOrUnDef( arg ) {
  return isUnDef( arg ) || isNull( arg )
}

export function isUnDef( arg ) {
  return is( arg, 'Undefined' )
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
export function isPromise( arg ) {
  return is( arg, 'Promise' ) && isObject( arg ) && isFunction( arg.then ) && isFunction( arg.catch )
}

/**
 * @param {string} arg
 * @returns {Boolean}
 */
export function isString( arg ) {
  return is( arg, 'String' )
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
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray( arg ) {
  if ( typeof Array.isArray === 'undefined' ) {
    return is( arg, 'Array' )
  }
  return Array.isArray( arg )
}

export function isWindow( arg ) {
  return typeof window !== 'undefined' && is( arg, 'Window' )
}

export function isElement( arg ) {
  return isObject( arg ) && !!arg.tagName
}

export function isMap( arg ) {
  return is( arg, 'Map' )
}

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

/**
 * @param {string} arg
 * @returns {Boolean}
 */
export function isExternal( arg ) {
  return /^(https?:|mailto:|tel:)/.test( arg )
}

/**
 * @param {Object} arg
 * @returns {Boolean}
 */
export function isIterable( arg ) {
  return arg != null && typeof arg[Symbol.iterator] === 'function'
}

/**
 * @param {string} arg
 * @returns {Boolean}
 */
export function validUsername( arg ) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf( arg.trim() ) >= 0
}
/**
 * @param {string} arg
 * @returns {Boolean}
 */
export function validPhone( arg ) {
  let pass = false
  const val = String( arg ).trim()
  if ( !/^(0|86|17951)?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9])[0-9]{8}$/i.test( val ) ) {
    pass = false
  } else {
    pass = true
  }
  return pass
}

/**
 * @param {string} arg
 * @returns {Boolean}
 */
export function validURL( arg ) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test( arg )
}

/**
 * @param {string} arg
 * @returns {Boolean}
 */
export function validLowerCase( arg ) {
  const reg = /^[a-z]+$/
  return reg.test( arg )
}

/**
 * @param {string} arg
 * @returns {Boolean}
 */
export function validUpperCase( arg ) {
  const reg = /^[A-Z]+$/
  return reg.test( arg )
}

/**
 * @param {string} arg
 * @returns {Boolean}
 */
export function validAlphabets( arg ) {
  const reg = /^[A-Za-z]+$/
  return reg.test( arg )
}

/**
 * @param {string} arg
 * @returns {Boolean}
 */
export function validEmail( arg ) {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test( arg )
}

/**
 * @description 校验身份证号码
 * @param {string} arg
 * @returns {Boolean}
 */
export function validID( arg ) {
  const reg =
    /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  return reg.test( arg )
}
