
import http from '/@/utils/request'

export function uploadImage( data ) {
  return http.request( {
    url : '/upload/image',
    method : 'post',
    data
  } )
}

export function downSourcesWithBlob( data ) {
  return http.request( {
    url : '/down/blob',
    method : 'post',
    data
  } )
}
