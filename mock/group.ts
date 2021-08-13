import { MockMethod } from "vite-plugin-mock"

const menuList = ( params ):any => {
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
  const total = 5
  for (let i = 1; i <= total; i++) {
    const item = {
      id: `${i}`,
      pid: '0',
      CreatedAt: '@datetime()',
      UpdatedAt: '@datetime()',
      // name: '@string()',
      name:  `分组名称_${i}`,
      child : []
    }
    if ( Number(i) === 2 ) {
      for (let j = 100; j <= 103; j++) {
        item.child.push( {
          id: `${j}`,
          pid: `${i}`,
          CreatedAt: '@datetime()',
          UpdatedAt: '@datetime()',
          name:  `分组名称_${i}_${j}`,
          child : []
        } )
      }
    }
    result.push( item );
  }
  return {
    total,
    page : params.page,
    limit : params.limit,
    list : result,
  };
}


export default [
  {
    url: '/group/getGroupList',
    type: 'post',
    response: config => {
      return {
        code: 200,
        message: 'success',
        data: menuList( config.body )
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
