// https://next.router.vuejs.org/zh/guide/advanced/dynamic-routing.html
import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

import Layout from '/@/layout/index.vue'

export const constantRoutes = [
  {
    path : '/redirect',
    component : Layout,
    hidden : true,
    children : [
      {
        path : '/redirect/:path(.*)',
        component : () => import( '/@/views/redirect/index.vue' )
      }
    ]
  },
  {
    path : '/login',
    name : 'Login',
    hidden : true,
    component : () => import( '/@/views/login/index.vue' ),
    meta : {
      title : '登录',
      icon : 'el-icon-s-home',
      noCache : true,
      roles : ['admin']
    }
  },
  {
    path : '/404',
    component : () => import( '/@/views/page/error-page/404.vue' ),
    hidden : true
  },
  {
    path : '/401',
    component : () => import( '/@/views/page/error-page/401.vue' ),
    hidden : true
  }
]
export const asyncRoutes = [
  {
    path : '/',
    name : 'Dashboard',
    component : Layout,
    redirect : '/dashboard',
    children : [
      {
        path : 'dashboard',
        name : 'Dashboard',
        component : () => import( '/@/views/dashboard/index.vue' ),
        meta : {
          title : 'Dashboard',
          icon : 'home',
          noCache : true,
          roles : ['admin']
        }
      }
    ]
  },

  {
    path : '/fun',
    name : 'Fun',
    component : Layout,
    redirect : '/fun/directives',
    meta : {
      title : '功能组件',
      icon : 'fun',
      noCache : true,
      roles : ['admin']
    },
    children : [
      {
        path : 'directives',
        name : 'Directives',
        component : () => import( '/@/views/fun/directive/index.vue' ),
        meta : {
          title : '常用指令',
          icon : 'dunpai',
          noCache : true
        }
      },
      {
        path : 'animate',
        name : 'Animate',
        component : () => import( '/@/views/fun/animate/index.vue' ),
        meta : {
          title : '常用动画',
          icon : 'animate',
          noCache : true
        }
      },
      {
        path : '3d',
        name : 'webGL',
        component : () => import( '/@/views/fun/webGL/index.vue' ),
        meta : {
          title : 'ThreeJs',
          icon : 'webGl',
          noCache : true
        }
      },
      {
        path : 'pwd',
        name : 'Pwd',
        component : () => import( '/@/views/fun/pwd/index.vue' ),
        meta : {
          title : '密码相关组件',
          icon : 'pwd',
          noCache : true
        }
      },
      {
        path : '/canvas',
        name : 'Canvas',
        component : () => import( '/@/views/fun/canvas/index.vue' ),
        redirect : '/demo/canvas/img',
        meta : {
          title : 'canvas组件',
          icon : 'fun',
          noCache : true
        },
        children : [
          {
            path : '/fabric',
            name : 'Fabric',
            component : () => import( '/@/views/fun/canvas/fabric.vue' ),
            meta : {
              title : 'FabricJs',
              icon : 'img',
              noCache : true
            }
          }
        ]
      },

      {
        path : '/img',
        name : 'Img',
        component : () => import( '/@/views/fun/img/index.vue' ),
        meta : {
          title : '图片组件',
          icon : 'office',
          noCache : true
        }
      },

      {
        path : '/excel',
        name : 'Excel',
        component : () => import( '/@/views/fun/excel/index.vue' ),
        redirect : '/demo/excel/export',
        meta : {
          title : '表格',
          icon : 'office',
          noCache : true
        },
        children : [
          {
            path : '/export',
            name : 'ExcelExport',
            component : () => import( '/@/views/fun/excel/export-excel.vue' ),
            meta : {
              title : '表格导出',
              icon : 'excel',
              noCache : true
            }
          }
        ]
      },
      {
        path : 'zip',
        name : 'Zip',
        component : () => import( '/@/views/fun/zip/index.vue' ),
        meta : {
          title : 'Zip',
          icon : 'zip',
          noCache : true
        }
      },
      {
        path : 'xml',
        name : 'Xml',
        component : () => import( '/@/views/fun/xml/index.vue' ),
        meta : {
          title : 'Xml',
          icon : 'xml',
          noCache : true
        }
      },
      {
        path : 'upload',
        name : '文件上传',
        component : () => import( '/@/views/fun/upload/index.vue' ),
        meta : {
          title : 'Upload',
          icon : 'upload',
          noCache : true
        }
      }
    ]
  },

  {
    path : '/demo',
    name : 'Demo',
    component : Layout,
    redirect : '/demo/editor',
    meta : {
      title : '示例组件',
      icon : 'example',
      noCache : true,
      roles : ['admin']
    },
    children : [
      {
        path : 'editor',
        name : 'Editor',
        component : () => import( '/@/views/demo/editor/index.vue' ),
        meta : {
          title : '富文本编辑器',
          icon : 'editor',
          noCache : true
        }
      },
      {
        path : 'form',
        name : 'Form',
        component : () => import( '/@/views/demo/form/index.vue' ),
        meta : {
          title : '表单',
          icon : 'form',
          noCache : true
        }
      },
      {
        path : 'flowChart',
        name : 'FlowChart',
        component : () => import( '/@/views/demo/flow-chart/index.vue' ),
        meta : {
          title : '流程图',
          icon : 'flowchat',
          noCache : true
        }
      },
      {
        path : 'drag',
        name : 'Drag',
        component : () => import( '/@/views/demo/drag/index.vue' ),
        meta : {
          title : '拖拽',
          icon : 'drag',
          noCache : true
        }
      }
    ]
  },

  {
    path : '/page',
    name : 'Page',
    component : Layout,
    redirect : '/demo/map/baidu',
    meta : {
      title : '页面',
      icon : 'shop'
    },
    children : [
      {
        path : '/user',
        name : 'User',
        component : () => import( '/@/views/page/user/index.vue' ),
        meta : {
          title : '个人中心',
          icon : 'user',
          noCache : true
        }
      },

      {
        path : '404',
        name : 'Page404',
        component : () => import( '/@/views/page/error-page/404.vue' ),
        meta : {
          title : '404',
          icon : '404',
          noCache : true
        }
      },
      {
        path : '401',
        name : 'Page401',
        component : () => import( '/@/views/page/error-page/401.vue' ),
        meta : {
          title : '401',
          icon : '401',
          noCache : true
        }
      }
    ]
  },

  {
    path : '/map',
    name : 'Map',
    component : Layout,
    redirect : '/demo/map/baidu',
    meta : {
      title : '地图',
      icon : 'map'
    },
    children : [
      {
        path : '/baidu',
        name : 'Baidu',
        component : () => import( '/@/views/demo/map/baidu.vue' ),
        meta : {
          title : '百度地图',
          icon : '',
          noCache : true
        }
      },
      {
        path : '/gaode',
        name : 'Gaode',
        component : () => import( '/@/views/demo/map/gaode.vue' ),
        meta : {
          title : '高德地图',
          icon : '',
          noCache : true
        }
      },
      {
        path : '/tencent',
        name : 'Tencent',
        component : () => import( '/@/views/demo/map/tencent.vue' ),
        meta : {
          title : '腾讯地图',
          icon : '',
          noCache : true
        }
      }
    ]
  },

  {
    path : '/media',
    name : 'Media',
    component : Layout,
    redirect : '/demo/media/video',
    meta : {
      title : '音视频',
      icon : 'video',
      noCache : true
    },
    children : [
      {
        path : '/video',
        name : 'Video',
        component : () => import( '/@/views/demo/media/video.vue' ),
        meta : {
          title : '视频',
          icon : 'video',
          noCache : true
        }
      }
    ]
  },

  {
    path : '/icon',
    name : 'Icons',
    component : Layout,
    redirect : '/icon',
    meta : {
      title : 'Icon',
      icon : 'example',
      roles : ['admin']
    },
    children : [
      {
        path : '',
        name : 'Icons',
        component : () => import( '/@/views/demo/icons/index.vue' ),
        meta : {
          title : 'icons',
          icon : 'icon'
        }
      }
    ]
  },

  {
    path : '/external-link',
    name : 'ExternalLink',
    component : Layout,
    children : [
      {
        path : 'https://github.com/mvpyb/vite-element-plus-admin',
        meta : {
          title : '外链',
          icon : 'links'
        }
      }
    ]
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

const createRouters = createRouter( {
  history : createWebHashHistory( '/' ), // base 当成参数传递了
  routes : constantRoutes.concat( asyncRoutes ),
  scrollBehavior : () => ( { left : 0, top : 0 } ) //  return 期望滚动到哪个的位置
} )

//
const router = createRouters

export function resetRouter() {
  const WHITE_NAME_LIST = ['Login']
  router.getRoutes().forEach( ( route ) => {
    const { name } = route
    if ( name && !WHITE_NAME_LIST.includes( name ) ) {
      router.hasRoute( name ) && router.removeRoute( name )
    }
  } )
}

export default router
