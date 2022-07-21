import Layout from '/@/layout/index.vue'

export default {
  path : '/nested',
  name : 'Nested',
  component : Layout,
  redirect : '/nested/menu1/menu1-1',
  meta : {
    title : '嵌套路由',
    icon : 'nested',
    noCache : false,
    roles : ['admin']
  },
  children : [
    {
      path : 'menu1',
      name : 'Menu1',
      component : () => import( '/@/views/nested/menu1/index.vue' ),
      meta : {
        title : 'menu1',
        noCache : false
      },
      redirect : '/nested/menu1/menu1-1',
      children : [
        {
          path : 'menu1-1',
          component : () => import( '/@/views/nested/menu1/menu1-1/index.vue' ),
          name : 'Menu1-1',
          meta : {
            title : 'menu1-1',
            noCache : false
          }
        },
        {
          path : 'menu1-2',
          name : 'Menu1-2',
          redirect : '/nested/menu1/menu1-2/menu1-2-1',
          component : () => import( '/@/views/nested/menu1/menu1-2/index.vue' ),
          meta : {
            title : 'menu1-2',
            noCache : false
          },
          children : [
            {
              path : 'menu1-2-1',
              component : () => import( '/@/views/nested/menu1/menu1-2/menu1-2-1/index.vue' ),
              name : 'Menu1-2-1',
              meta : {
                title : 'menu1-2-1',
                noCache : false
              }
            },
            {
              path : 'menu1-2-2',
              component : () => import( '/@/views/nested/menu1/menu1-2/menu1-2-2/index.vue' ),
              name : 'Menu1-2-2',
              meta : {
                title : 'menu1-2-2',
                noCache : false
              }
            }
          ]
        },
        {
          path : 'menu1-3',
          component : () => import( '/@/views/nested/menu1/menu1-3/index.vue' ),
          name : 'Menu1-3',
          meta : {
            title : 'menu1-3',
            noCache : false
          }
        }
      ]
    },
    {
      path : 'menu2',
      name : 'Menu2',
      component : () => import( '/@/views/nested/menu2/index.vue' ),
      meta : {
        title : 'menu2',
        noCache : false,
        // icon : 'devices',
        roles : ['admin']
      }
    }
  ]
}
