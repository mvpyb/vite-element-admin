// base ==> blob
export const base64ToBlob = base64 => {
  const arr = base64.split( ',' )
  const typeItem = arr[0]
  const mime = typeItem.match( /:(.*?);/ )[1]
  const bstr = atob( arr[1] )
  let n = bstr.length
  const u8arr = new Uint8Array( n )
  while ( n-- ) {
    u8arr[n] = bstr.charCodeAt( n )
  }
  const blob = new Blob( [u8arr], {
    type : mime
  } )
  return blob
}

// url ==> base64
export function urlToBase64( url, mineType ) {
  return new Promise( ( resolve, reject ) => {
    let canvas = document.createElement( 'CANVAS' )
    const ctx = canvas.getContext( '2d' )

    const img = new Image()
    img.crossOrigin = ''
    img.onload = function() {
      if ( !canvas || !ctx ) {
        return reject( new Error( '失败' ) )
      }
      canvas.height = img.height
      canvas.width = img.width
      ctx.drawImage( img, 0, 0 )
      const dataURL = canvas.toDataURL( mineType || 'image/png' )
      canvas = null
      resolve( dataURL )
    }
    img.src = url
  } )
}

// blob 转 file
export async function blobToFile( Blobs = [], fileName = 'test.zip', fileType = 'application/zip' ) {
  return new File( Blobs, fileName, {
    type : fileType
  } )
}

// base64 转 file
export function base64ToFile( url, fileName ) {
  const arr = url.split( ',' )
  const mime = arr[0].match( /:(.*?);/ )[1]
  const bstr = atob( arr[1] )
  let n = bstr.length
  const u8arr = new Uint8Array( n )
  while ( n-- ) {
    u8arr[n] = bstr.charCodeAt( n )
  }
  return new File( [u8arr], fileName, {
    type : mime
  } )
}

// 文件流下载
export function downloadByData( data, filename, mime, bom ) {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
  const blob = new Blob( blobData, { type : mime || 'application/octet-stream' } )

  const blobURL = window.URL.createObjectURL( blob )
  const downloadElement = document.createElement( 'a' )
  downloadElement.style.display = 'none'
  downloadElement.href = blobURL
  downloadElement.setAttribute( 'download', filename )
  if ( typeof downloadElement.download === 'undefined' ) {
    downloadElement.setAttribute( 'target', '_blank' )
  }
  document.body.appendChild( downloadElement )
  downloadElement.click()
  document.body.removeChild( downloadElement )
  window.URL.revokeObjectURL( blobURL )
}

// URL 下载
export function downloadByOnlineUrl( url, filename, mime, bom ) {
  urlToBase64( url ).then( base64 => {
    downloadByBase64( base64, filename, mime, bom )
  } )
}
// base64 下载
export function downloadByBase64( buf, filename, mime, bom ) {
  const base64Buf = base64ToBlob( buf )
  downloadByData( base64Buf, filename, mime, bom )
}
