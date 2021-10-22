<template>
  <div>
    <el-button
      style="margin-bottom: 20px"
      type="primary"
      icon="el-icon-document"
      id="uploadBtn"
    >
      选择文件
    </el-button>

    <div class="upload-wrapper">
      <el-row :gutter="10" v-for="(item, index) in uploadList" :key="index">
        <el-col :span="24">
          <div class="file-info">上传进度：{{ item.uploadInfo }}</div>
        </el-col>
        <el-col :span="20">
          <el-progress
            :percentage="item.percent"
            :color="customColors"
          ></el-progress>
        </el-col>
        <el-col :span="4">
          <svg-icon
            icon-class="error"
            @click="removeFile(item)"
            class="icons"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, toRefs } from 'vue'
import plupload from 'plupload/js/plupload.full.min.js'

// import * as ELEMENT from 'element-plus'
// const { ElMessage } = ELEMENT
const uploader = ref( null )
const percentage = ref( 0 )
const uploadInfo = ref( '' ) // 当前上传信息
const fileList = ref( [] ) // 待上传文件列表
const emit = defineEmits( [
  'BeforeUpload',
  'UploadProgress',
  'FilesAdded',
  'UploadSuccess',
  'UploadFailed',
  'UploadError',
  'UploadFiles',
  'FilesRemoved',
  'UploadComplete',
  'UploadDestroy'
] )
const customColors = [
  { color : '#f56c6c', percentage : 20 },
  { color : '#e6a23c', percentage : 40 },
  { color : '#5cb87a', percentage : 60 },
  { color : '#1989fa', percentage : 80 },
  { color : '#6f7ad3', percentage : 100 }
]

const props = defineProps( {
  // 获取OSS 上传参数 https://help.aliyun.com/document_detail/31925.html
  uploadParams : {
    type : Object,
    default() {
      return {
        accessid : '',
        host : '',
        expire : 1632304235,
        signature : '=',
        policy : '',
        dir : '',
        callback : ''
      }
    }
  },
  // 是否重命名
  rename : {
    type : Boolean,
    default : true
  },
  autoUpload : {
    type : Boolean,
    default : true
  },
  disabled : {
    type : Boolean,
    default : false
  },
  browseButton : {
    type : String,
    default : 'uploadBtn'
  },
  runtimes : {
    type : String,
    default : 'html5,flash,silverlight,html4'
  },
  multiSelection : {
    type : Boolean,
    default : true
  },
  flashSwfUrl : {
    type : String,
    default : 'lib/plupload-2.1.2/js/Moxie.swf'
  },
  silverlightXapUrl : {
    type : String,
    default : 'lib/plupload-2.1.2/js/Moxie.xap'
  },
  filters : {
    type : Object,
    default() {
      return {
        mime_types : [{ title : 'Zip', extensions : 'zip' }],
        prevent_duplicates : false, // false 允许选取重复文件
        max_file_size : '6144mb' // 最大只能上传的文件
      }
    }
  }
} )

// 获取随机字符串
const randomString = ( len ) => {
  len = len || 32
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const maxPos = chars.length
  let pwd = ''
  for ( let i = 0; i < len; i++ ) {
    pwd += chars.charAt( Math.floor( Math.random() * maxPos ) )
  }
  return pwd
}

// 获取文件后缀名
const getSuffix = ( filename ) => {
  const pos = filename.lastIndexOf( '.' )
  let suffix = ''
  if ( pos != -1 ) {
    suffix = filename.substring( pos )
  }
  return suffix
}

const setUploadParams = async( up, file, ret ) => {
  const randomStr = randomString()
  let STR
  if ( props.rename ) {
    STR = `${randomStr}`
  } else {
    STR = '${filename}'
  }
  const {
    dir,
    policy,
    accessid : OSSAccessKeyId,
    signature,
    host : url
  } = toRefs( props.uploadParams )
  let key = dir + `${STR}`

  if ( file && file.name != '' ) {
    const suffix = getSuffix( file.name )
    if ( props.rename ) {
      key += suffix
      file.newName = `${STR}${suffix}`
    } else {
      file.newName = file.name
    }
  } else {
    file.newName = `${STR}`
  }

  file.newPath = `${dir}${file.newName}`
  const upParams = {
    policy,
    OSSAccessKeyId,
    key,
    signature,
    success_action_status : '200' // 让服务端返回200,不然，默认会返回204
  }
  const options = {
    url,
    multipart_params : upParams
  }
  up.setOption( options )
  up.start()
}

const startUpload = () => {
  uploader.value && uploader.value.start()
}

const removeFile = ( file ) => {
  uploader.value && uploader.value.removeFile( file )
  fileList.value = fileList.value.filter( ( item ) => item.id != file.id )
}

const initUpload = async() => {
  // 更多参数 详见 ： https://www.phpin.net/tools/plupload/
  const opt = {
    browse_button : props.browseButton,
    url : props.url,
    filters : props.filters,
    runtimes : props.runtimes,
    multi_selection : props.multiSelection,
    flash_swf_url : props.flashSwfUrl,
    silverlight_xap_url : props.silverlightXapUrl
  }
  const uploads = new plupload.Uploader( {
    ...opt,
    // 当Plupload初始化完成后触发监听函数参数：(uploader)
    init : {
      // 当Init事件发生后触发监听函数参数
      PostInit : function() {},
      // 当队列中的某一个文件正要开始上传前触发监听函数参数：(uploader,file)
      BeforeUpload : async function( up, file ) {
        await setUploadParams( up, file, true )
        emit( 'BeforeUpload', file )
      },
      // 会在文件上传过程中不断触发，可以用此事件来显示上传进度监听函数参数：(uploader,file)
      UploadProgress : function( up, file ) {
        updateList( file )
        percentage.value = parseFloat( file.percent )
        uploadInfo.value = `${file.name}(${file.size})上传中...，文件名: ${file.newName}`
        emit( 'UploadProgress', { file } )
      },
      // 当文件添加到上传队列后触发监听函数参数：(uploader,files)
      FilesAdded : async function( up, files ) {
        if ( props.autoUpload ) {
          startUpload()
        }
        emit( 'FilesAdded', { plupload, up, files } )
        // 多文件上传
        if ( props.multiSelection ) {
          fileList.value = fileList.value.concat( files )
        } else {
          fileList.value = [...files]
        }
      },
      // 当队列中的某一个文件上传完成后触发监听函数参数：(uploader,file,responseObject)
      FileUploaded : function( up, file, info ) {
        if ( info.status == 200 ) {
          emit( 'UploadSuccess', { file, info } )
        } else {
          emit( 'UploadFailed', { file, info } )
        }
      },
      // 当发生错误时触发监听函数参数：(uploader,errObject)
      Error : function( up, err ) {
        uploadInfo.value = `上传过程中发生了某些错误`
        emit( 'UploadError', err )
      },
      // 当上传队列中某一个文件开始上传后触发监听函数参数：(uploader,file)
      UploadFile : function( up, file ) {
        emit( 'UploadFiles', file )
      },
      // 当文件从上传队列移除后触发监听函数参数：(uploader,files)
      FilesRemoved : function( up, files ) {
        emit( 'FilesRemoved', files )
      },
      // 当上传队列中所有文件都上传完成后触发监听函数参数：(uploader,files)
      UploadComplete : function( up, files ) {
        emit( 'UploadComplete', files )
      },
      // 当调用destroy方法时触发监听函数参数：(uploader)
      Destroy : function() {
        emit( 'UploadDestroy' )
      }
    }
  } )
  uploads.init()
  uploader.value = uploads
  return uploads
}

const uploadList = computed( () => {
  return fileList.value.map( ( file ) => {
    const { status } = file
    const obj = { ...file }
    if ( status == 1 ) {
      obj.uploadInfo = `${file.name}(${file.size})等待上传中...，文件名: ${file.newName}`
    } else if ( status == 2 ) {
      obj.uploadInfo = `${file.name}(${file.size})上传中...，文件名: ${file.newName}`
    } else if ( status == 4 ) {
      obj.uploadInfo = `${file.name}(${file.size})上传失败`
    } else if ( status == 5 ) {
      obj.uploadInfo = `${file.name}(${file.size})上传成功，文件名: ${file.newName}`
    } else {
      obj.uploadInfo = `上传过程中发生了某些错误`
    }
    return obj
  } )
} )

const updateList = ( file ) => {
  const len = fileList.value.length
  if ( len ) {
    fileList.value.forEach( ( item, index ) => {
      if ( item.id == file.id ) {
        fileList.value.splice( index, 1, {
          ...item,
          percent : file.percent,
          status : file.status
        } )
      }
    } )
  }
}

onMounted( async() => {
  initUpload()
} )
</script>

<style lang="scss" scoped>
.upload-wrapper {
  width: 600px;
}
.upload-wrapper {
}
.icons {
  width: 16px;
  height: 16px;
  margin-top: 4px;
  color: red;
  cursor: pointer;
}
</style>
