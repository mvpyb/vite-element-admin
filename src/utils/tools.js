
/**
 * 获取文件的临时路径 blob:....
 * @param {File} file
 * @returns {String}
 */
export const getObjectURL = async( file ) => {
  let url = null
  if ( window.createObjectURL != undefined ) { // basic
    url = await window.createObjectURL( file )
  } else if ( window.URL != undefined ) { // mozilla(firefox)
    url = await window.URL.createObjectURL( file )
  } else if ( window.webkitURL != undefined ) { // webkit or chrome
    url = await window.webkitURL.createObjectURL( file )
  }
  return {
    url
  }
}
