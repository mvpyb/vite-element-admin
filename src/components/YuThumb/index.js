import YuThumb from './src/index.vue'
export const Thumb = Object.assign( YuThumb, {
  install( app ) {
    app.component( YuThumb.name, YuThumb )
  }
} )

export default Thumb
