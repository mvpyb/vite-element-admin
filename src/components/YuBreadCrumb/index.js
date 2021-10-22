import YuBreadCrumb from './src/index.vue'
export const ReBreadCrumb = Object.assign( YuBreadCrumb, {
  install( app ) {
    app.component( YuBreadCrumb.name, YuBreadCrumb )
  }
} )

export default ReBreadCrumb
