
import {
  createRouter,
  // createWebHistory,
  createWebHashHistory
} from 'vue-router'

import Layout from '/@/layout'
import customComponents from './modules/customComponents'
import nested from './modules/nested'

// 配置路由信息
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
    component : () => import( '/@/views/login/index.vue' )
  },
  //
  // {
  //   path : '/',
  //   name : 'Dashboard',
  //   component : Layout,
  //   redirect : '/dashboard',
  //   meta : {
  //     title : 'Dashboard',
  //     icon : 'my',
  //     roles : ['admin', 'user']
  //   }
  // },
  {
    path : '/animate',
    component : () => import( '/@/views/animate/index.vue' ),
    hidden : true
  },
  {
    path : '/404',
    component : () => import( '/@/views/error/404.vue' ),
    hidden : true
  },
  {
    path : '/401',
    component : () => import( '/@/views/error/401.vue' ),
    hidden : true
  },
  {
    path : '/500',
    component : () => import( '/@/views/error/500.vue' ),
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
          title : '主页',
          icon : 'dashboard',
          noCache : true,
          affix : true
        }
      }
    ]
  },

  {
    path : '/guide',
    name : 'Guide',
    component : Layout,
    redirect : '/guide',
    children : [
      {
        path : '',
        name : 'Guide',
        component : () => import( '/@/views/guide/index' ),
        meta : {
          title : '用户指引',
          icon : 'guide'
        }
      }
    ]
  },

  {
    path : '/icon',
    component : Layout,
    name : 'Icon',
    children : [
      {
        path : 'index',
        component : () => import( '/@/views/icons/index' ),
        name : 'Icons',
        meta : { title : '图标', icon : 'image', noCache : true }
      }
    ]
  },

  {
    path : '/directive',
    name : 'Directive',
    component : Layout,
    children : [
      {
        path : 'index',
        component : () => import( '/@/views/directive/index' ),
        name : 'Index',
        meta : { title : '指令', icon : 'directive', noCache : true }
      }
    ]
  },

  // TODO 自定义组件
  customComponents,

  {
    path : '/charts',
    component : Layout,
    name : 'Charts',
    meta : { title : '图表', icon : 'charts' },
    children : [
      {
        path : 'keyboard',
        component : () => import( '/@/views/charts/keyboard' ),
        name : 'KeyboardChart',
        meta : { title : '键盘图表', noCache : true }
      },
      {
        path : 'line',
        component : () => import( '/@/views/charts/line' ),
        name : 'LineChart',
        meta : { title : '折线图表', noCache : true }
      },
      {
        path : 'mix-chart',
        component : () => import( '/@/views/charts/mix-chart' ),
        name : 'MixChart',
        meta : { title : '混合图表', noCache : true }
      },
      {
        path : 'line3d',
        component : () => import( '/@/views/charts/line3D' ),
        name : 'Line3d',
        meta : { title : '3D图表', noCache : true }
      }
    ]
  },

  {
    path : '/map',
    name : 'Map',
    component : Layout,
    redirect : '/map/baidu',
    meta : {
      title : '地图',
      icon : 'map'
    },
    children : [
      {
        path : '/baidu',
        name : 'BaiDu',
        component : () => import( '/@/views/map/baidu' ),
        meta : {
          title : '百度地图',
          icon : '',
          noCache : true
        }
      },
      {
        path : '/gaode',
        name : 'GaoDe',
        component : () => import( '/@/views/map/gaode' ),
        meta : {
          title : '高德地图',
          icon : '',
          noCache : true
        }
      },
      {
        path : '/tencent',
        name : 'Tencent',
        component : () => import( '/@/views/map/tencent' ),
        meta : {
          title : '腾讯地图',
          icon : '',
          noCache : true
        }
      }
    ]
  },

  nested,

  {
    path : '/table',
    name : 'Table',
    component : Layout,
    redirect : '/table/dynamic',
    meta : { title : '表格', icon : 'table', noCache : true },
    children : [
      {
        path : 'dynamic',
        component : () => import( '/@/views/table/dynamic-table/index' ),
        name : 'DynamicTable',
        meta : { title : '动态表格', noCache : true }
      },
      {
        path : 'drag',
        component : () => import( '/@/views/table/drag' ),
        name : 'DragTable',
        meta : { title : '拖拽表格', noCache : true }
      },
      {
        path : 'edit',
        component : () => import( '/@/views/table/editTable' ),
        name : 'EditTable',
        meta : { title : '可编辑表格', noCache : true }
      },
      {
        path : 'complex',
        component : () => import( '/@/views/table/complexTable' ),
        name : 'ComplexTable',
        meta : { title : '综合表格', noCache : true }
      }
    ]
  },

  {
    path : '/animate',
    component : Layout,
    meta : {
      title : 'Animate',
      icon : 'animate',
      noCache : true
    },
    children : [
      {
        path : 'index',
        component : () => import( '/@/views/animate/index' ),
        name : 'Animate',
        meta : { title : 'Animate', icon : 'animate', noCache : true }
      }
    ]
  },

  {
    path : '/external-link',
    component : Layout,
    meta : { title : '外链', icon : 'outside' },
    children : [
      {
        path : 'https://github.com/mvpyb/vite-element-plus-admin',
        meta : { title : 'github' }
      },
      {
        path : 'https://staging-cn.vuejs.org/',
        meta : { title : 'VUE3' }
      }
    ]
  },

  { path : '/:pathMatch(.*)', redirect : '/404', hidden : true }
]

const router = createRouter( {
  history : createWebHashHistory( './' ),
  routes : constantRoutes.concat( asyncRoutes ),
  scrollBehavior : () => ( { left : 0, top : 0 } )
} )

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
