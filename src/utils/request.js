/**
 * @Description: axios封装
 * @Author: 灰是小灰灰的灰
 * @Email: 454539387@qq.com
 * @Date: 2021-07-06 11:49:40
 * @LastEditors: 灰是小灰灰的灰
 * @LastEditTime: 2021-07-06 11:49:40
 */
'use strict'
import axios from 'axios'
// import { ElMessage } from 'element-plus'
import * as ELEMENT from 'element-plus'
const { ElMessage } = ELEMENT

import store from '/@/store'
import router from '/@/router'
import { getEnvs } from './envs'
import { getCookieByKey } from '/@/utils/cookies'
import {
  TOKEN,
  WHITE_CODE_LIST,
  LOGIN_ERROR_CODE,
  GLOBAL_DATA
} from '/@/api/constant'
// import qs from 'qs'

class HttpRequest {
  // #baseUrl
  constructor() {
    this.baseUrl = this.getBaseUrl()
    this.withCredentials = false
    this.timeout = 10000
  }

  getBaseUrl() {
    const { envStr } = getEnvs()
    // const baseUrlStr = envStr === 'dev' ? import.meta.env.VITE_APP_API_BASE_URL : GLOBAL_DATA[envStr]['baseUrl']
    return GLOBAL_DATA[envStr]['baseUrl']
  }

  getConfig() {
    const config = {
      baseURL : this.baseUrl,
      timeout : this.timeout,
      withCredentials : this.withCredentials,
      headers : {
        'Content-Type' : 'application/json;charset=UTF-8'
      }
    }
    return config
  }

  getParams( payload ) {
    const { method, data } = payload
    if ( ['post', 'put', 'patch', 'delete'].indexOf( method ) >= 0 ) {
      payload.data = data
    } else {
      payload.params = data
      delete payload.data
    }
    return payload
  }

  checkStatus( status ) {
    let errMessage = ''
    switch ( status ) {
      case 400:
        errMessage = '错误请求'
        break
      case 401:
        errMessage = '未授权，请重新登录'
        break
      case 403:
        errMessage = '拒绝访问'
        break
      case 404:
        errMessage = '请求错误,未找到该资源'
        break
      case 405:
        errMessage = '请求方法未允许'
        break
      case 408:
        errMessage = '请求超时'
        break
      case 500:
        errMessage = '服务器端出错'
        break
      case 501:
        errMessage = '网络未实现'
        break
      case 502:
        errMessage = '网络错误'
        break
      case 503:
        errMessage = '服务不可用'
        break
      case 504:
        errMessage = '网络超时'
        break
      case 505:
        errMessage = 'http版本不支持该请求'
        break
      default:
        errMessage = `连接错误`
    }
    return errMessage
  }

  // 拦截处理
  setInterceptors( instance ) {
    const that = this

    // 请求拦截
    instance.interceptors.request.use(
      ( config ) => {
        if ( !navigator.onLine ) {
          ElMessage( {
            message : '请检查您的网络是否正常',
            type : 'error',
            duration : 3 * 1000
          } )
          return Promise.reject( '请检查您的网络是否正常' )
        }
        // config.headers.token = getCookieByKey( TOKEN ) || ''
        config.headers.common['token'] = getCookieByKey( TOKEN ) || ''
        // config.data = qs.stringify(config.data)

        return config
      },
      ( error ) => {
        return Promise.reject( error )
      }
    )

    // 响应拦截
    instance.interceptors.response.use(
      ( res ) => {
        const result = res.data
        const type = Object.prototype.toString.call( result )
        // 如果是文件流 直接返回
        if ( type === '[object Blob]' || type === '[object ArrayBuffer]' ) {
          return result
        } else {
          const { code, message } = result
          const isErrorToken = LOGIN_ERROR_CODE.find(
            ( item ) => item.code == code
          )
          const isWhiteCode = WHITE_CODE_LIST.find( ( item ) => item.code == code )

          if ( isErrorToken ) {
            // token已过期 跳转到登录

            store.dispatch( 'user/logout' )
            router.push( `/login` )
            window.location.reload()
          } else if ( !isWhiteCode ) {
            ElMessage( {
              message : message || 'Error',
              type : 'error',
              duration : 3 * 1000
            } )
            return Promise.reject( message || 'Error' )
          } else {
            return result
          }
        }
      },
      ( error ) => {
        if ( error && error.response ) {
          error.message = that.checkStatus( error.response.status )
        }
        const isTimeout = error.message.includes( 'timeout' )
        ElMessage( {
          message : isTimeout
            ? '网络请求超时'
            : error.message || '连接到服务器失败',
          type : 'error',
          duration : 2 * 1000
        } )
        return Promise.reject( error.message )
      }
    )
  }

  request( options ) {
    const instance = axios.create()
    const baseOpt = this.getConfig()
    const params = Object.assign( {}, baseOpt, this.getParams( options ) )
    this.setInterceptors( instance )
    return instance( params )
  }
}

const http = new HttpRequest()
export default http
