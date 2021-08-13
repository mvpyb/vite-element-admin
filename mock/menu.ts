import { MockMethod } from "vite-plugin-mock"

const menuList = ():any => {
  // const res = [
  //   {
  //     ID: 14,
  //     CreatedAt: "2021-06-15T15:06:25+08:00",
  //     UpdatedAt: "2021-06-15T15:06:25+08:00",
  //     parentId: "0",
  //     path: "systemTools",
  //     name: "systemTools",
  //     hidden: false,
  //     component: "view/systemTools/index.vue",
  //     sort: 5,
  //     meta: {
  //       keepAlive: false,
  //       defaultMenu: false,
  //       title: "系统工具",
  //       icon: "s-cooperation",
  //       closeTab: false
  //     },
  //     authoritys: null,
  //     menuId: "14",
  //     children: []
  //   }
  // ]
  //
  const result: any[] = [];
  for (let index = 0; index < 5; index++) {
    result.push({
      ID: `${index}`,
      CreatedAt: '@datetime()',
      UpdatedAt: '@datetime()',
      parentId: 'number',
      path: '@string()',
      name: '@string()',
      hidden: false,
      component: "views/demo/form/index.vue",
      sort: 'number',
      meta: {
        keepAlive: false,
        defaultMenu: false,
        title: `测试路由_${index}`,
        icon: "s-cooperation",
        closeTab: false
      },
      authoritys: null,
      menuId: 'number',
      children: []
    });
  }
  return result;
}


export default [
  {
    url: '/menu/getMenuList',
    type: 'post',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: menuList()
      }
    }
  },
  // {
  //   url: '/api/getUserInfo',
  //   type: 'get',
  //   response: () => {
  //     return {
  //       code: 200,
  //       message: 'success',
  //       data: userInfo()
  //     }
  //   }
  // },
  //
  // {
  //   url: '/api/test',
  //   type: 'get',
  //   response: () => {
  //     return {
  //       code: 5004,
  //       message: 'fail',
  //       data: []
  //     }
  //   }
  // },
  //
  // {
  //   url: "/api/logout",
  //   method: "get",
  //   response: () => {
  //     return {
  //       code: 200,
  //       message: 'success'
  //     }
  //   },
  // }
] as unknown as MockMethod[]
