<template>
  <div
    :class="{ fullscreen: fullscreen }"
    class="tinymce-container"
    :style="{ width: containerWidth }"
  >
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-btn-container"></div>
  </div>
</template>

<script>
import plugins from './plugins'
import toolbar from './toolbar'
import load from './dynamicLoadScript'
import { uploadImage } from '/@/api/upload'
import { getCookieByKey } from '/@/utils/cookies'
// const tinymceCDN = 'https://resources.shadowcreator.com/project-sources/lib/tinymce5.7.1/tinymce.min.js'
// const tinymceCDN = 'https://cdn.bootcdn.net/ajax/libs/tinymce/5.7.1/tinymce.min.js'
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce@5.7.1/tinymce.min.js'

import {
  getCurrentInstance,
  defineComponent,
  computed,
  ref,
  watch,
  onMounted,
  onDeactivated,
  onActivated,
  nextTick,
  onUnmounted
} from 'vue'

const languages = {
  en : 'en',
  zh : 'zh_CN',
  es : 'es_MX',
  ja : 'ja'
}

export default defineComponent( {
  name : 'YuTinymce',
  props : {
    id : {
      type : String,
      default : function() {
        return (
          'vue-tinymce-' +
          +new Date() +
          ( ( Math.random() * 1000 ).toFixed( 0 ) + '' )
        )
      }
    },
    value : {
      type : String,
      default : ''
    },
    toolbar : {
      type : Array,
      required : false,
      default() {
        return []
      }
    },
    menubar : {
      type : String,
      default : 'file edit insert view format table'
    },
    height : {
      type : [Number, String],
      required : false,
      default : 360
    },
    // elStyle : {
    //   type : Object,
    //   required : false,
    //   default() {
    //     return {
    //       left : 0,
    //       width : 0
    //     }
    //   }
    // },
    width : {
      type : [Number, String],
      required : false,
      default : 'auto'
    }
  },
  // components: { editorImage },

  // inheritAttrs: false,
  emits : ['change', 'update:modelValue', 'input'],
  setup( props, ctx ) {
    const { emit } = ctx

    const hasChange = ref( false )
    const hasInit = ref( false )
    const tinymceId = ref( props.id )
    const fullscreen = ref( false )
    const languageTypeList = ref( languages )

    const containerWidth = computed( () => {
      const width = props.width
      if ( /^[\d]+(\.[\d]+)?$/.test( width ) ) {
        return `${width}px`
      }
      return width
    } )

    watch(
      () => [props.value],
      ( val ) => {
        if ( !hasChange.value && hasInit.value ) {
          nextTick( () => window.tinymce.get( tinymceId.value ).setContent( val || '' ) )
          // setValue( props.value )
        }
      }
    )

    onMounted( () => {
      init()
    } )

    onActivated( () => {
      if ( window.tinymce ) {
        initTinymce()
      }
    } )

    onDeactivated( () => {
      destroyTinymce()
    } )

    onUnmounted( () => {
      destroyTinymce()
    } )

    const init = () => {
      load( tinymceCDN, ( err ) => {
        if ( err ) {
          const ins = getCurrentInstance()
          ins &&
            ins.appContext.config.globalProperties.$message.error( err.message )
          return
        }
        initTinymce()
      } )
    }

    const initTinymce = () => {
      window.tinymce.init( {
        selector : `#${tinymceId.value}`,
        menubar : props.menubar,
        plugins : plugins.join( ',' ),
        external_plugins : {
          // 'audios' : require( './utils/audio.js' ),
          // 'audios' : '/static/plugin.min.js'
          // 'maths': 'http://www.maths.com/plugin.min.js'
        },
        toolbar : props.toolbar.length > 0 ? props.toolbar : toolbar,
        toolbar_mode : 'sliding',
        height : props.height,
        // content_css : '/static/custorm.css?rev=' + new Date().getTime(),
        // content_style : '.minganci { color: red; } em.minganci { font-style : normal; } p { margin : 0; padding : 0; }',
        language : languageTypeList.value['zh'],
        body_class : 'panel-body ',
        object_resizing : true,
        lineheight_formats : '1 1.1 1.2 1.3 1.4 1.5 1.75 2',
        fontsize_formats : '12px 14px 16px 18px 24px 36px',
        media_live_embeds : true,
        media_poster : false, // 禁用填写封面图片
        media_alt_source : false, // 禁用Alternative source媒体对话框中的输入字段
        audio_template_callback : function( data ) {
          return `
            <audio controls>
              <source src="${data.source}" ${data.sourcemime ? ' type="' + data.sourcemime + '"' : ''} />
            </audio>
          `
        },
        file_picker_types : 'file image media', // 'media',

        file_picker_callback : function( cb, value, meta ) {
          if ( meta.filetype == 'image' ) {
            var input = document.createElement( 'input' )
            input.setAttribute( 'type', 'file' )
            input.setAttribute( 'accept', 'image/png,image/jpg,image/gif' )
            input.onchange = function() {
              var file = this.files[0]
              var reader = new FileReader()
              reader.onload = function() {
                var id = 'blobid' + new Date().getTime()
                var blobCache = window.tinymce.activeEditor.editorUpload.blobCache
                var base64 = reader.result.split( ',' )[1]
                var blobInfo = blobCache.create( id, file, base64 )
                blobCache.add( blobInfo )
                cb( blobInfo.blobUri(), { title : file.name } )
              }
              reader.readAsDataURL( file )
            }
            input.click()
          }
        },
        end_container_on_empty_block : true,
        powerpaste_word_import : 'clean',
        code_dialog_height : 450,
        code_dialog_width : 1000,
        imagetools_cors_hosts : ['www.tinymce.com', 'codepen.io'],
        default_link_target : '_blank',
        link_title : false,
        nonbreaking_force_tab : true,
        images_upload_handler : ( blobInfo, success, failure, progress ) => {
          const filename = blobInfo.filename()
          const fmData = new FormData()
          fmData.append( 'file', blobInfo.blob(), filename )
          fmData.append( 'mode', 3 )
          fmData.append( 'token', getCookieByKey( 'vite_token' ) )
          uploadImage( fmData )
            .then( ( { data } ) => {
              success( data.url )
            } )
            .catch( ( error ) => {
              failure( error, {
                remove : true
              } )
            } )
        },
        init_instance_callback : ( editor ) => {
          if ( props.value ) {
            editor.setContent( props.value )
          }
          hasInit.value = true
          editor.on( 'KeyUp SetContent SetAttrib Change', () => {
            hasChange.value = true
            emit( 'input', editor.getContent() )

            // const content = editor.getContent()
            // emit('update:modelValue', content)
            // emit('change', content)
          } )
        },
        setup( editor ) {
          editor.on( 'FullscreenStateChanged', ( e ) => {
            fullscreen.value = e.state
          } )
        }
      } )
    }

    const destroyTinymce = () => {
      const tinymce = window.tinymce.get( tinymceId.value )
      if ( fullscreen.value ) {
        tinymce.execCommand( 'mceFullScreen' )
      }
      if ( tinymce ) {
        tinymce.destroy()
      }
    }

    function setContent( value ) {
      window.tinymce.get( tinymceId.value ).setContent( value )
      // nextTick( () => window.tinymce.get( tinymceId.value ).setContent( value || '' ) )
    }

    const getContent = () => {
      window.tinymce.get( tinymceId.value ).getContent()
    }

    const imageSuccessCBK = ( arr ) => {
      arr.forEach( ( v ) =>
        window.tinymce
          .get( tinymceId.value )
          .insertContent( `<img class="wscnph" src="${v.url}" >` )
      )
    }

    return {
      fullscreen,
      containerWidth,
      tinymceId,
      init,
      initTinymce,
      destroyTinymce,
      setContent,
      getContent,
      imageSuccessCBK
    }
  }
} )
</script>
