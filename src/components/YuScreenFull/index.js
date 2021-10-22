import YuScreenFull from './src/index.vue'
export const ScreenFull = Object.assign( YuScreenFull, {
  install( app ) {
    app.component( YuScreenFull.name, YuScreenFull )
  }
} )

export default ScreenFull
