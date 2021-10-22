import YuCopyright from './src/index.vue'
export const Copyright = Object.assign( YuCopyright, {
  install( app ) {
    app.component( YuCopyright.name, YuCopyright )
  }
} )

export default Copyright
