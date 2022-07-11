export const base64ToBlob = ( base64, fileName ) => {
  const arr = base64.split( ',' )
  const mime = arr[0].match( /:(.*?);/ )[1]
  const bstr = atob( arr[1] )
  let n = bstr.length
  const u8arr = new Uint8Array( n )
  while ( n-- ) {
    u8arr[n] = bstr.charCodeAt( n )
  }
  const blob = new Blob( [u8arr], {
    type : mime
  } )
  blob.lastModifiedDate = new Date()
  blob.name = fileName
  return blob
}

// 文件下载
export function fileLocalDownLoad( data, fileName ) {
  const blob = new Blob( data )
  const downloadElement = document.createElement( 'a' )
  const href = window.URL.createObjectURL( blob )
  downloadElement.href = href
  downloadElement.download = decodeURIComponent( fileName )
  document.body.appendChild( downloadElement )
  downloadElement.click()
  document.body.removeChild( downloadElement )
  window.URL.revokeObjectURL( href )
}
// blob 转 file
export async function blobToFile( Blobs = [], fileName = 'test.zip', fileType = 'application/zip' ) {
  return new File( Blobs, fileName, {
    type : fileType
  } )
}

// base64 转 file
export async function base64ToFile( url, fileName ) {
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
