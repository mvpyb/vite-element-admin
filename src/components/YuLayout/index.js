import YuLayout from './src/index.vue'
export const Layout = Object.assign( YuLayout, {
  install( app ) {
    app.component( YuLayout.name, YuLayout )
  }
} )

export default Layout
