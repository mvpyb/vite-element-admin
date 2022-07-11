import Layout from '/@/layout'

export default {
  path : '/flow',
  component : Layout,
  name : 'Flow',
  redirect : '/flow/formEditor',
  meta : { title : '小组件', icon : 'devices' },
  children : [
    // 流程图 TODO
    // {
    //   path : 'logicFlow',
    //   component : () => import( '/@/views/flow/logicFlow' ),
    //   name : 'LogicFlow',
    //   hidden : false,
    //   meta : { title : 'logicFlow', noCache : true }
    // },

    // 富文本
    {
      path : 'formEditor',
      component : () => import( '/@/views/flow/formEditor' ),
      name : 'FormEditor',
      hidden : false,
      meta : { title : '表单编辑器', noCache : true }
    },
    {
      path : 'vditor',
      component : () => import( '/@/views/flow/vditor' ),
      name : 'Vditor',
      hidden : false,
      meta : { title : 'Vditor', noCache : true }
    },
    {
      path : 'wangeditor',
      component : () => import( '/@/views/flow/wangeditor' ),
      name : 'Wangeditor',
      hidden : false,
      meta : { title : 'Wangeditor', noCache : true }
    },
    {
      path : 'tinyMCE',
      component : () => import( '/@/views/flow/tinyMCE' ),
      name : 'TinyMCE',
      hidden : false,
      meta : { title : 'TinyMCE', noCache : true }
    },

    // canvas
    {
      path : 'imageEditor',
      component : () => import( '/@/views/flow/imageEditor' ),
      name : 'ImageEditor',
      hidden : false,
      meta : { title : '图片编辑器', noCache : true }
    }
  ]
}
