/**
 * 获取文件的临时路径 blob:....
 * @param {File} file
 * @returns {String}
 */
export const getObjectURL = async( file ) => {
  let url = null
  if ( window.createObjectURL != undefined ) {
    // basic
    url = await window.createObjectURL( file )
  } else if ( window.URL != undefined ) {
    // mozilla(firefox)
    url = await window.URL.createObjectURL( file )
  } else if ( window.webkitURL != undefined ) {
    // webkit or chrome
    url = await window.webkitURL.createObjectURL( file )
  }
  return {
    url
  }
}

export const changeBlobToFile = async(
  Blobs = [],
  fileName = 'avatar.png',
  fileType = 'image/png'
) => {
  const file = await new File( Blobs, fileName, {
    type : fileType
  } )
  return file
}

export function dataURLtoFile( data, filename ) {
  // const arr = data.split(',')
  // const typeItem = arr[0]
  // const mime = typeItem.match(/:(.*?);/)![1]
  // const bstr = atob(arr[1])
  // let n = bstr.length
  // const u8arr = new Uint8Array(n)
  // while (n--) {
  //   u8arr[n] = bstr.charCodeAt(n)
  // }
  // return new Blob( [u8arr], { type: mime } )

  const arr = data.split( ',' )
  const mime = arr[0].match( /:(.*?);/ )[1]
  const bstr = atob( arr[1] )
  let n = bstr.length
  const u8arr = new Uint8Array( n )
  while ( n-- ) {
    u8arr[n] = bstr.charCodeAt( n )
  }
  return new File( [u8arr], filename, {
    type : mime
  } )
}
