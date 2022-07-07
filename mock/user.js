
// http://mockjs.com/examples.html#Object
const loginInfo = () => {
  const result = {
    token: 'token'
  }
  return result
}

const userInfo = () => {
  const result = {
    id: 9527,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '灰是小灰灰的灰',
    phone: '15988888888',
    email: '454539387@qq.com',
    identity: '',
    roles: ['admin'],
  }
  return result
}

const list = () => {
  const result = []
  // const total = 10000 * 10
  const total = 10000 * 10
  for (let i = 1; i <= total; i++) {
    const item = {
      id: '@increment',
      method : i % 4,
      deviceType : '@pick(["web", "glass", "mobile", "desktop", "others"])', // 设备名称
      deviceOs : '@pick(["win10", "win11", "ios", "android", "others"])', // 系统
      loginAddr : '@city(true)', // 登录地点
      loginTime :' @datetime()', // 最后登录时间
    }
    result.push( item );
  }
  
  return result
}

export default [
  {
    url: '/api/login',
    type: 'get',
    response: config => {
      // const { username } = config.body
      // const token = tokens[username]
      // if (!token) {
      //   return {
      //     code: 60204,
      //     message: '账号密码错误'
      //   }
      // }
      return {
        code: 200,
        message: 'success',
        data: {
          token: 'token'
        }
        // data: loginInfo()
      }
    }
  },
  
  {
    url: '/api/getUserInfo',
    type: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: userInfo()
      }
    }
  },
  
  {
    url: '/api/test',
    type: 'get',
    response: () => {
      return {
        code: 5004,
        message: 'fail',
        data: []
      }
    }
  },
  
  {
    url: "/api/logout",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: 'success'
      }
    },
  },
  
  {
    url: '/api/login/history',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: list()
      }
    }
  },
]
