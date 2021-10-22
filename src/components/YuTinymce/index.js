import YuTinymce from './src/index.vue'
export const Tinymce = Object.assign( YuTinymce, {
  install( app ) {
    app.component( YuTinymce.name, YuTinymce )
  }
} )

export default Tinymce
