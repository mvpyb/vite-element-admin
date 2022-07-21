import {
  createRouter,
  // createWebHistory,
  createWebHashHistory
} from 'vue-router'

import Layout from '/@/layout/index.vue'
import nested from './modules/nested'
import customComponents from './modules/customComponents'

// 配置路由信息
export const constantRoutes = [
  {
    path : '/redirect',
    name : 'Redirect',
    component : Layout,
    meta : {
      title : 'Redirect',
      hidden : true
    },
    children : [
      {
        path : '/redirect/:path(.*)',
        name : 'Redirect',
        component : () => import( '/@/views/redirect/index.vue' ),
        meta : {
          title : 'Redirect',
          hidden : true
        }
      }
    ]
  },
  {
    path : '/login',
    name : 'Login',
    component : () => import( '/@/views/login/index.vue' ),
    meta : {
      hidden : true,
      title : '登录'
    }
  },
  {
    path : '/404',
    name : 'Error404',
    component : () => import( '/@/views/error/404.vue' ),
    meta : {
      hidden : true,
      title : '404'
    }
  },
  {
    path : '/401',
    name : 'Error401',
    component : () => import( '/@/views/error/401.vue' ),
    meta : {
      hidden : true,
      title : '401'
    }
  },
  {
    path : '/500',
    name : 'Error500',
    component : () => import( '/@/views/error/500.vue' ),
    meta : {
      hidden : true,
      title : '500'
    }
  }
]

export const asyncRoutes = [
  {
    path : '/',
    name : 'Dashboard',
    component : Layout,
    redirect : '/dashboard',
    meta : {
      title : '主页'
    },
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
    path : '/icon',
    name : 'Icon',
    component : Layout,
    meta : {
      title : '图标'
    },
    children : [
      {
        path : 'index',
        component : () => import( '/@/views/icons/index.vue' ),
        name : 'Icons',
        meta : { title : '图标', icon : 'image', noCache : true }
      }
    ]
  },

  {
    path : '/directive',
    name : 'Directive',
    component : Layout,
    meta : {
      title : '指令'
    },
    children : [
      {
        path : 'index',
        component : () => import( '/@/views/directive/index.vue' ),
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
        component : () => import( '/@/views/charts/keyboard.vue' ),
        name : 'KeyboardChart',
        meta : { title : '键盘图表', noCache : true }
      },
      {
        path : 'line',
        component : () => import( '/@/views/charts/line.vue' ),
        name : 'LineChart',
        meta : { title : '折线图表', noCache : true }
      },
      {
        path : 'mix-chart',
        component : () => import( '/@/views/charts/mix-chart.vue' ),
        name : 'MixChart',
        meta : { title : '混合图表', noCache : true }
      },
      {
        path : 'line3d',
        component : () => import( '/@/views/charts/line3D.vue' ),
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
        component : () => import( '/@/views/map/baidu.vue' ),
        meta : {
          title : '百度地图',
          icon : '',
          noCache : true
        }
      },
      {
        path : '/gaode',
        name : 'GaoDe',
        component : () => import( '/@/views/map/gaode.vue' ),
        meta : {
          title : '高德地图',
          icon : '',
          noCache : true
        }
      },
      {
        path : '/tencent',
        name : 'Tencent',
        component : () => import( '/@/views/map/tencent.vue' ),
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
        component : () => import( '/@/views/table/dynamic-table/index.vue' ),
        name : 'DynamicTable',
        meta : { title : '动态表格', noCache : true }
      },
      {
        path : 'drag',
        component : () => import( '/@/views/table/drag.vue' ),
        name : 'DragTable',
        meta : { title : '拖拽表格', noCache : true }
      },
      {
        path : 'edit',
        component : () => import( '/@/views/table/editTable.vue' ),
        name : 'EditTable',
        meta : { title : '可编辑表格', noCache : true }
      },
      {
        path : 'complex',
        component : () => import( '/@/views/table/complexTable.vue' ),
        name : 'ComplexTable',
        meta : { title : '综合表格', noCache : true }
      }
    ]
  },

  {
    path : '/user',
    name : 'User',
    component : Layout,
    redirect : '/user/index',
    meta : { title : '个人中心', icon : 'about', noCache : true },
    children : [
      {
        path : 'index',
        component : () => import( '/@/views/page/userCenter/index.vue' ),
        name : 'UserCenter',
        meta : { title : '我的账号', noCache : true }
      },
      {
        path : 'history',
        component : () => import( '/@/views/page/userCenter/loginHistory.vue' ),
        name : 'Personal',
        meta : { title : '登录历史', noCache : true }
      },
      {
        path : 'attestation',
        component : () => import( '/@/views/page/userCenter/attestation.vue' ),
        name : 'Attestation',
        meta : { title : '实名认证', noCache : true }
      }
    ]
  },

  {
    path : '/animate',
    name : 'Animate',
    component : Layout,
    meta : {
      title : '动画'
    },
    children : [
      {
        path : 'index',
        component : () => import( '/@/views/animate/index.vue' ),
        name : 'Animate',
        meta : { title : '动画', icon : 'animate', noCache : true }
      }
    ]
  },

  {
    path : '/external-link',
    name : 'ExternalLink',
    component : Layout,
    meta : { title : '外链', icon : 'outside' },
    children : [
      {
        path : 'https://github.com/mvpyb/vite-element-admin',
        name : 'Github',
        meta : { title : 'github' }
      },
      {
        path : 'https://staging-cn.vuejs.org/',
        name : 'VUE3',
        meta : { title : 'VUE3' }
      }
    ]
  },

  {
    path : '/:pathMatch(.*)',
    redirect : '/404',
    name : 'Redirect404',
    meta : {
      title : '404',
      hidden : true
    }
  }
]

const router = createRouter( {
  history : createWebHashHistory( './' ),
  routes : constantRoutes.concat( asyncRoutes ),
  scrollBehavior : () => ( { left : 0, top : 0 } )
} )

export function resetRouter() {
  const WHITE_NAME_LIST = ['Login']
  router.getRoutes().forEach( route => {
    const { name } = route
    if ( name && !WHITE_NAME_LIST.includes( name ) ) {
      router.hasRoute( name ) && router.removeRoute( name )
    }
  } )
}

export default router
