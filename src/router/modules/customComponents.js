
import Layout from '/@/layout'

export default {
  path : '/components',
  component : Layout,
  name : 'Components',
  meta : { title : '组件示例', icon : 'devices' },

  children : [
    {
      path : 'tinyMCE',
      component : () => import( '/@/views/customComponents/richText/index' ),
      name : 'TinyMCE',
      hidden : false,
      meta : { title : 'TinyMCE', noCache : true }
    }
  ]
}
