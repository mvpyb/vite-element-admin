export const WX_APPID = 'appid'
export const COOKIE_PREFIX = 'vite_'
export const TOKEN = `${COOKIE_PREFIX}_token`

export const GLOBAL_DATA = {
  env : 'fat',
  dev : {
    baseUrl : '/api'
  },
  fat : {
    baseUrl : '/api'
  },
  uat : {
    baseUrl : '/api'
  },
  pro : {
    baseUrl : '/api'
  }
}

export const WHITE_CODE_LIST = [
  {
    code : 200,
    msg : ''
  },
  {
    code : 5006,
    msg : '验证码错误或已过期'
  }
]

export const LOGIN_ERROR_CODE = [
  {
    code : 5004,
    msg : '无效token'
  }
]
