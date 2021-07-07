
import http from '/@/utils/request'

export function uploadImage( data ) {
  return http.request( {
    url : '/upload/image',
    method : 'post',
    data
  } )
}
