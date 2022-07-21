import Layout from '/@/layout/index.vue'

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
    //   meta : { title : 'logicFlow', noCache : true }
    // },

    // 富文本
    {
      path : 'formEditor',
      component : () => import( '/@/views/flow/formEditor.vue' ),
      name : 'FormEditor',
      meta : { title : '表单编辑器', noCache : true }
    },
    {
      path : 'vditor',
      component : () => import( '/@/views/flow/vditor.vue' ),
      name : 'Vditor',
      meta : { title : 'Vditor', noCache : true }
    },
    {
      path : 'wangeditor',
      component : () => import( '/@/views/flow/wangeditor.vue' ),
      name : 'Wangeditor',
      meta : { title : 'Wangeditor', noCache : true }
    },
    {
      path : 'tinyMCE',
      component : () => import( '/@/views/flow/tinyMCE.vue' ),
      name : 'TinyMCE',
      meta : { title : 'TinyMCE', noCache : true }
    },

    // canvas
    {
      path : 'imageEditor',
      component : () => import( '/@/views/flow/imageEditor.vue' ),
      name : 'ImageEditor',
      meta : { title : '图片编辑器', noCache : true }
    }
  ]
}
