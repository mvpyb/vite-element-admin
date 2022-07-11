class Loader {
  /**
   * 动态加载css文件
   * @param {*} url
   * @param {*} isCache
   */
  loadCSS = ( url, isCache = false ) => {
    const element = document.createElement( 'link' )
    element.setAttribute( 'rel', 'stylesheet' )
    element.setAttribute( 'type', 'text/css' )
    if ( isCache ) {
      element.setAttribute( 'href', url + '?t=' + new Date().getTime() )
    } else {
      element.setAttribute( 'href', url )
    }
    document.body.appendChild( element )
  }

  /**
   * 动态加载js文件
   * @param {*} src
   * @param {*} isCache
   */
  loadJS = async( src, isCache = false ) => {
    const script = document.createElement( 'script' )
    script.type = 'text/JavaScript'
    if ( isCache ) {
      script.src = src + '?t=' + new Date().getTime()
    } else {
      script.src = src
    }
    document.body.appendChild( script )
    script.onload = () => {
      return src
    }
  }
}
export const loader = new Loader()
