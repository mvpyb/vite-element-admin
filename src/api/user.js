
import http from '/@/utils/request'

export function login( data ) {
  return http.request( {
    method: 'post',
    url : '/login',
    data
  } )
}

export function getInfo( data ) {
  return http.request( {
    method : 'get',
    url : '/getUserInfo',
    data
  } )
}

export function logout() {
  return http.request( {
    url: '/logout',
    method: 'post'
  })
}


export function testRequest() {
  return http.request( {
    url: '/test',
    method: 'get'
  })
}
