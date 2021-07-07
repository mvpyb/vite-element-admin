
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
    path: "/demo",
    name: "Demo",
    component: Layout,
    redirect: "/demo/editor",
    meta: {
      title : 'DEMO',
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
        path: "https://www.baidu.com",
        meta: {
          title : '外链',
          noCache : true,
          icon : 'links'
        },
      },
    ],
  },
  
  // { path : '*', redirect : '/404', hidden : true }
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
