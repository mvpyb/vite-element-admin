
export const WX_APPID = 'appid'
export const COOKIE_PREFIX = 'vite_'
export const TOKEN = `${COOKIE_PREFIX}_token`

export const GLOBAL_DATA = {
  env : 'fat',
  dev : {
    'baseUrl' : '/api',
  },
  fat : {
    // 'baseUrl' : 'https://webapi-fat.shadowcreator.com/100026',
    // 'baseUrl' : 'https://webapps-fat.qulivr.com/test/',
    'baseUrl' : '/api',
    
  },
  uat : {
    // 'baseUrl' : 'https://webapi-uat.shadowcreator.com/100026',
    // 'baseUrl' : 'https://webapps-fat.qulivr.com/test/',
    'baseUrl' : '/api',
  },
  pro : {
    // 'baseUrl' : 'https://webapi.shadowcreator.com/100026',
    // 'baseUrl' : 'https://webapps-fat.qulivr.com/test/',
    'baseUrl' : '/api',
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
  },
  // {
  //   code : 5007,
  //   msg : '国家代码错误'
  // },
  // {
  //   code : 5008,
  //   // 仅注册
  //   msg : '手机号已存在'
  // },
  // {
  //   code : 5010,
  //   // 仅登录
  //   msg : '账号或密码错误'
  // },
  // {
  //   code : 5013,
  //   msg : '账号未注册'
  // },
  // {
  //   // todo
  //   code : 5020,
  //   msg : '该微信未绑定账号'
  // },
  // {
  //   code : 5021,
  //   msg : '账号不存在'
  // },
  // {
  //   code : 5022,
  //   msg : '该微信已绑定其他账号'
  // },
  // {
  //   code : 5023,
  //   msg : '该号码已绑定当前账号'
  // },
  // {
  //   code : 5024,
  //   msg : '该号码已绑定其他账号'
  // },
  // {
  //   code : 5025,
  //   msg : '该账号未绑定邮箱'
  // },
  // {
  //   code : 5026,
  //   msg : '该邮箱已绑定当前账号'
  // },
  // {
  //   code : 5027,
  //   msg : '该邮箱已绑定其他账号'
  // },
  //
  // {
  //   code : 5981,
  //   msg : '验证码错误' // 图形验证错误 并且需要显示图形验证码
  // },
  // {
  //   // code : 5170,
  //   code : 5979,
  //   msg : '密码输错5次，请输入校验码'
  // },
  // {
  //   code : 5016,
  //   msg : '凭证失效'
  // }
]

export const LOGIN_ERROR_CODE = [
  {
    code : 5004,
    msg : '无效token'
  }
]
