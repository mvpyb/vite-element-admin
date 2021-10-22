export const hasClass = ( ele, cls ) => {
  return !!ele.className.match( new RegExp( '(\\s|^)' + cls + '(\\s|$)' ) )
}

export const addClass = ( ele, cls, extracls ) => {
  if ( !hasClass( ele, cls ) ) ele.className += ' ' + cls
  if ( extracls ) {
    if ( !hasClass( ele, extracls ) ) ele.className += ' ' + extracls
  }
}

export const removeClass = ( ele, cls, extracls ) => {
  if ( hasClass( ele, cls ) ) {
    const reg = new RegExp( '(\\s|^)' + cls + '(\\s|$)' )
    ele.className = ele.className.replace( reg, ' ' ).trim()
  }
  if ( extracls ) {
    if ( hasClass( ele, extracls ) ) {
      const regs = new RegExp( '(\\s|^)' + extracls + '(\\s|$)' )
      ele.className = ele.className.replace( regs, ' ' ).trim()
    }
  }
}

export const toggleClass = ( flag, clsName, target ) => {
  const targetEl = target || document.body
  let { className } = targetEl
  className = className.replace( clsName, '' )
  targetEl.className = flag ? `${className} ${clsName} ` : className
}
