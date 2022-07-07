import http from '/@/utils/request'

export function getArticle( data ) {
  return http.request( {
    method : 'get',
    url : '/article/list',
    data
  } )
}

export function getDetail( id ) {
  return http.request( {
    url : '/article/detail',
    method : 'get',
    params : { id }
  } )
}

export function getPv( pv ) {
  return http.request( {
    url : '/article/pv',
    method : 'get',
    params : { pv }
  } )
}

export function createArticle( data ) {
  return http.request( {
    url : '/article/create',
    method : 'post',
    data
  } )
}

export function updateArticle( data ) {
  return http.request( {
    url : '/article/update',
    method : 'post',
    data
  } )
}
