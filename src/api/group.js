import http from '/@/utils/request'

export const getGroupList = ( data ) => {
  return http.request( {
    url : '/group/getGroupList',
    method : 'post',
    data
  } )
}

export const addBaseMenu = ( data ) => {
  return http.request( {
    url : '/menu/addBaseMenu',
    method : 'post',
    data
  } )
}

export const getBaseMenuTree = () => {
  return http.request( {
    url : '/menu/getBaseMenuTree',
    method : 'post'
  } )
}

export const addMenuAuthority = ( data ) => {
  return http.request( {
    url : '/menu/addMenuAuthority',
    method : 'post',
    data
  } )
}

export const getMenuAuthority = ( data ) => {
  return http.request( {
    url : '/menu/getMenuAuthority',
    method : 'post',
    data
  } )
}

export const deleteBaseMenu = ( data ) => {
  return http.request( {
    url : '/menu/deleteBaseMenu',
    method : 'post',
    data
  } )
}

export const updateBaseMenu = ( data ) => {
  return http.request( {
    url : '/menu/updateBaseMenu',
    method : 'post',
    data
  } )
}

export const getBaseMenuById = ( data ) => {
  return http.request( {
    url : '/menu/getBaseMenuById',
    method : 'post',
    data
  } )
}

export const asyncMenu = () => {
  return http.request( {
    url : '/menu/getMenu',
    method : 'post'
  } )
}
