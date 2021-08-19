
// https://next.router.vuejs.org/zh/guide/advanced/dynamic-routing.html
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
// import * as VueRouter  from 'vue-router';

import Layout from "/@/layout/index.vue";

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    name : 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name : 'RedirectC',
        component: () => import('/@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    hidden : true,
    component: () => import("/@/views/login/index.vue"),
    meta: {
      title : '登录',
      icon: "el-icon-s-home",
      noCache : true,
      roles : ['admin'],
    },
  },
  
  // {
  //   path: "/fat",
  //   name: "Fat",
  //   hidden : true,
  //   component: () => import("/@/views/login/index.vue"),
  //   meta: {
  //     title : '登录fat',
  //     icon: "el-icon-s-home",
  //     noCache : true,
  //     roles : ['admin'],
  //   },
  // },
  // {
  //   path: "/uat",
  //   name: "Uat",
  //   hidden : true,
  //   component: () => import("/@/views/login/index.vue"),
  //   meta: {
  //     title : '登录uat',
  //     icon: "el-icon-s-home",
  //     noCache : true,
  //     roles : ['admin'],
  //   },
  // },
  
  {
    path: '/404',
    component: () => import('/@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('/@/views/error-page/401.vue'),
    hidden: true,
  },
]
export const asyncRoutes = [
  {
    path: "/",
    name: "Dashboard",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("/@/views/dashboard/index.vue"),
        meta: {
          title : '欢迎页',
          icon: "dashboard",
          noCache : true,
          roles : ['admin'],
        },
      },
    ],
  },
  
  {
    path: "/fun",
    name: "Fun",
    component: Layout,
    redirect: "/fun/directives",
    meta: {
      title : '功能组件',
      icon: "component",
      noCache : true,
      roles : ['admin'],
    },
    children: [
      {
        path: "directives",
        name: "Directives",
        component: () => import("/@/views/fun/directive/index.vue"),
        meta: {
          title : '常用指令',
          icon: "office",
          noCache : true,
          // roles : ['admin'],
        },
      },
    ],
  },
  
  {
    path: "/demo",
    name: "Demo",
    component: Layout,
    redirect: "/demo/editor",
    meta: {
      title : '示例组件',
      icon: "component",
      noCache : true,
      roles : ['admin'],
    },
    children: [
      {
        path: "editor",
        name: "Editor",
        component: () => import("/@/views/demo/editor/index.vue"),
        meta: {
          title : '富文本编辑器',
          icon: "banner",
          noCache : true,
          // roles : ['admin'],
        },
      },
      {
        path: "form",
        name: "Form",
        component: () => import("/@/views/demo/form/index.vue"),
        meta: {
          title : '表单',
          icon: "carousel",
          noCache : true,
          // roles : ['admin'],
        },
      },
      {
        path: "icons",
        name: "Icons",
        component: () => import("/@/views/demo/icons/index.vue"),
        meta: {
          title : 'icons',
          icon: "banner",
          noCache : true,
          // roles : ['admin'],
        },
      },
      {
        path: "flowChart",
        name: "FlowChart",
        component: () => import("/@/views/demo/flow-chart/index.vue"),
        meta: {
          title : '流程图',
          icon: "office",
          noCache : true,
          // roles : ['admin'],
        },
      },
      {
        path: "3d",
        name: "webGL",
        component: () => import("/@/views/demo/webGL/index.vue"),
        meta: {
          title : '3d可视化',
          icon: "office",
          noCache : true,
          // roles : ['admin'],
        },
      },
      {
        path: "/map",
        name: "Map",
        component: () => import("/@/views/demo/map/index.vue"),
        redirect: "/demo/map/baidu",
        meta: {
          title : '地图组件',
          icon: "office",
          noCache : true,
          // roles : ['admin'],
        },
        children : [
          {
            path: "/baidu",
            name: "Baidu",
            component: () => import("/@/views/demo/map/baidu.vue"),
            meta: {
              title : '百度地图',
              icon: "office",
              noCache : true,
              // roles : ['admin'],
            },
          },
          {
            path: "/gaode",
            name: "Gaode",
            component: () => import("/@/views/demo/map/gaode.vue"),
            meta: {
              title : '高德地图',
              icon: "office",
              noCache : true,
              // roles : ['admin'],
            },
          },
          {
            path: "/tencent",
            name: "Tencent",
            component: () => import("/@/views/demo/map/tencent.vue"),
            meta: {
              title : '腾讯地图',
              icon: "office",
              noCache : true,
              // roles : ['admin'],
            },
          },
        ]
      },
      
      {
        path: "drag",
        name: "Drag",
        component: () => import("/@/views/demo/drag/index.vue"),
        meta: {
          title : '拖拽',
          icon: "office",
          noCache : true,
          // roles : ['admin'],
        },
      },
      
      {
        path: "/canvas",
        name: "Canvas",
        component: () => import("/@/views/demo/canvas/index.vue"),
        redirect: "/demo/canvas/img",
        meta: {
          title : '图片组件',
          icon: "office",
          noCache : true,
          // roles : ['admin'],
        },
        children : [
          // {
          //   path: "/img",
          //   name: "Img",
          //   component: () => import("/@/views/demo/canvas/img.vue"),
          //   meta: {
          //     title : '图片组件',
          //     icon: "office",
          //     noCache : true,
          //     // roles : ['admin'],
          //   },
          // },
          {
            path: "/fabric",
            name: "Fabric",
            component: () => import("/@/views/demo/canvas/fabric.vue"),
            meta: {
              title : '图片标注',
              icon: "office",
              noCache : true,
              // roles : ['admin'],
            },
          },
        ]
      },
      
      {
        path: "/excel",
        name: "Excel",
        component: () => import("/@/views/demo/excel/index.vue"),
        redirect: "/demo/excel/export",
        meta: {
          title : '表格',
          icon: "office",
          noCache : true,
          // roles : ['admin'],
        },
        children : [
          {
            path: "/export",
            name: "ExcelExport",
            component: () => import("/@/views/demo/excel/export-excel.vue"),
            meta: {
              title : '表格导出',
              icon: "office",
              noCache : true,
              // roles : ['admin'],
            },
          },
        ]
      },
      
      {
        path: "zip",
        name: "Zip",
        component: () => import("/@/views/demo/zip/index.vue"),
        meta: {
          title : 'Zip',
          icon: "office",
          noCache : true,
          // roles : ['admin'],
        },
      },
      
      {
        path: "https://www.baidu.com",
        meta: {
          title : '外链',
          noCache : true,
          icon : 'links'
        },
      },
    ],
  },
  
  // {
  //   path: "/admin",
  //   name: "Admin",
  //   component: Layout,
  //   redirect: "/admin/api",
  //   meta: {
  //     title : '超级管理员',
  //     icon: "component",
  //     noCache : true,
  //     roles : ['admin'],
  //   },
  //   children: [
  //     {
  //       path: "group",
  //       name: "Group",
  //       component: () => import("/@/views/admin/group/index.vue"),
  //       meta: {
  //         title : '分组管理',
  //         icon: "banner",
  //         noCache : true,
  //         roles : ['admin'],
  //       },
  //     },
  //     {
  //       path: "api",
  //       name: "Api",
  //       component: () => import("/@/views/admin/api/index.vue"),
  //       meta: {
  //         title : 'api管理',
  //         icon: "banner",
  //         noCache : true,
  //         roles : ['admin'],
  //       },
  //     },
  //     {
  //       path: "menu",
  //       name: "Menu",
  //       component: () => import("/@/views/admin/menu/index.vue"),
  //       meta: {
  //         title : '导航管理',
  //         icon: "banner",
  //         noCache : true,
  //         roles : ['admin'],
  //       },
  //     },
  //   ],
  // },
    
  { path : '/:pathMatch(.*)', redirect : '/404', hidden : true }
]

const createRouters = createRouter({
  // "history": createWebHistory()
  // "hash": createWebHashHistory()
  // "abstract": createMemoryHistory()
  history: createWebHashHistory( '/' ), // base 当成参数传递了
  routes: constantRoutes.concat( asyncRoutes ),
  scrollBehavior : () => ( { left : 0, top : 0 } ), //  return 期望滚动到哪个的位置
})

//
const router = createRouters

export function resetRouter() {
  const WHITE_NAME_LIST = [
    'Login',
  ]
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export default router
