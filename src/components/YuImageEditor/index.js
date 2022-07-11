import YuImageEditor from './src/index.vue'
export const ImageEditor = Object.assign( YuImageEditor, {
  install( app ) {
    app.component( YuImageEditor.name, YuImageEditor )
  }
} )

export default ImageEditor
