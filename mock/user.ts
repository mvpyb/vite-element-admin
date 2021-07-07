import { MockMethod } from "vite-plugin-mock";

// https://blog.csdn.net/weixin_42067720/article/details/115579817
// http://mockjs.com/examples.html#Object
const loginInfo = ():any => {
  const result = {
    token: 'token'
  }
  return result
}

const userInfo = ():any => {
  const result = {
    id: 9527,
    name: '灰是小灰灰的灰',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    roles: ['admin'],
  }
  return result
};

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
  }
] as MockMethod[]
