import YuTextHover from './src/index.vue'
export const TextHover = Object.assign( YuTextHover, {
  install( app ) {
    app.component( YuTextHover.name, YuTextHover )
  }
} )

export default TextHover
