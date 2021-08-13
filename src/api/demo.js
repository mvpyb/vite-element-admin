
import http from '/@/utils/request'

export function tableList( data ) {
  return http.request( {
    method: 'get',
    url : '/demo/tableList',
    data
  } )
}
