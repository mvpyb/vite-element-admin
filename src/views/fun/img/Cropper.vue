<template>
  <div class="mask">
    <div class="cropper-container-box">
      <div class="head clearfix">
        <h6 class="fl">图像裁剪</h6>
        <svg-icon icon-class="close" class-name="fr"></svg-icon>
      </div>
      <div class="body">
        <el-row :gutter="20">
          <el-col :span="15">
            <div class="cropper-wrapper">
              <img
                class="cropper-img"
                v-show="isReady"
                ref="imgElRef"
                :src="src"
                :alt="alt"
                :crossorigin="crossorigin"
              />
            </div>

            <el-button size="mini" @click="toggleSelect">选择图片</el-button>
            <input
              accept="image/png, image/jpeg, image/jpg"
              type="file"
              ref="selectFileInp"
              v-show="false"
              @change="selectFile"
            />
          </el-col>
          <el-col :span="9">
            <div class="preview-wrapper">
              <div class="preview-xl preview-item">
                <img :src="previewSource" :draggable="false" alt="" />
              </div>

              <el-divider />
              <div class="preview-group">
                <div class="circle preview-lg preview-item">
                  <img :draggable="false" :src="previewSource" alt="" />
                </div>
                <div class="circle preview-md preview-item">
                  <img :draggable="false" :src="previewSource" alt="" />
                </div>
                <div class="circle preview-sm preview-item">
                  <img :draggable="false" :src="previewSource" alt="" />
                </div>
                <div class="circle preview-xs preview-item">
                  <img :draggable="false" :src="previewSource" alt="" />
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="foot">
        <el-button type="info" size="small" @click="hideCropper">
          取消
        </el-button>
        <el-button type="primary" size="small" @click="saveCropper">
          确认并上传
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, unref } from 'vue'
import { getObjectURL } from '/@/utils/file'
import { useDebounceFn } from '@vueuse/shared'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

// https://www.cnblogs.com/eightFlying/p/cropper-demo.html
const defaultOptions = {
  aspectRatio : 1, // 设置裁剪框为固定的宽高比
  // data: '',              // 之前存储的裁剪后的数据 在初始化时会自动设置 只有在autoCrop设置为true时可用
  // preview: '.preview-item',           // 预览 设置一个区域容器预览裁剪后的结果
  responsive : true, // 在窗口尺寸调整后 进行响应式的重渲染 默认true
  restore : true, // 在窗口尺寸调整后 恢复被裁剪的区域 默认true
  checkCrossOrigin : true, // 检查图片是否跨域 默认true 如果是 会在被复制的图片元素上加上属性crossOrigin 并且在src上加上一个时间戳 避免重加载图片时因为浏览器缓存而加载错误
  checkOrientation : true, // 检查图片的方向信息（仅JPEG图片有）默认true 在旋转图片时会对图片方向值做一些处理 以解决IOS设备上的一些问题
  modal : true, // 是否显示图片和裁剪框之间的黑色蒙版 默认true
  guides : true, // 是否显示裁剪框的虚线 默认true
  center : true, // 是否显示裁剪框中间的 ‘+’ 指示器 默认true
  highlight : true, // 是否显示裁剪框上面的白色蒙版 （很淡）默认true
  background : true, // 是否在容器内显示网格状的背景 默认true
  autoCrop : true, // 允许初始化时自动的裁剪图片 配合 data 使用 默认true
  autoCropArea : 0.8, // 设置裁剪区域占图片的大小 值为 0-1 默认 0.8 表示 80%的区域
  movable : true, // 是否可以移动图片 默认true
  rotatable : true, // 是否可以旋转图片 默认true
  scalable : true, // 是否可以缩放图片（可以改变长宽） 默认true
  zoomable : true, // 是否可以缩放图片（改变焦距） 默认true
  zoomOnTouch : true, // 是否可以通过拖拽触摸缩放图片 默认true
  zoomOnWheel : true, // 是否可以通过鼠标滚轮缩放图片 默认true
  wheelZoomRatio : 0.1, // 设置鼠标滚轮缩放的灵敏度 默认 0.1
  cropBoxMovable : true, // 是否可以拖拽裁剪框 默认true
  cropBoxResizable : true, // 是否可以改变裁剪框的尺寸 默认true
  toggleDragModeOnDblclick : true // 是否可以通过双击切换拖拽图片模式（move和crop）默认true 当拖拽图片模式为none时不可切换 该设置必须浏览器支持双击事件
}

const props = defineProps( {
  src : {
    type : String,
    required : true
  },
  alt : {
    type : String
  },
  circled : {
    type : Boolean,
    default : false
  },
  realTimePreview : {
    type : Boolean,
    default : true
  },
  height : {
    type : [String, Number],
    default : '360px'
  },
  crossorigin : {
    type : String,
    default : undefined
  },
  imageStyle : {
    type : Object,
    default : () => {}
  },
  options : {
    type : Object,
    default : () => {}
  }
} )

const emit = defineEmits( [
  'cropend',
  'ready',
  'cropendError',
  'changeFile',
  'uploadSuccess',
  'uploadFail'
] )

const isReady = ref( false )
const imgElRef = ref()
const selectFileInp = ref()
const cropper = ref( '' )
const previewSource = ref( '' )

const selectFile = async( e ) => {
  const files = e.target.files || e.dataTransfer.files
  if ( files && files[0] ) {
    const file = files[0]
    const { url } = await getObjectURL( file )
    cropper.value && cropper.value.replace( url, false )
    emit( 'changeFile', url )
  }
}

const toggleSelect = () => {
  selectFileInp.value && selectFileInp.value.click()
}

const realTimeCroppered = () => {
  props.realTimePreview && croppered()
}

const debounceRealTimeCroppered = useDebounceFn( realTimeCroppered, 100 )

const init = async() => {
  const imgEl = unref( imgElRef )
  if ( !imgEl ) return false

  const options = {
    ...defaultOptions,
    // 渲染前（图片已经被加载、cropper实例已经准备完毕）的准备工作事件
    ready : () => {
      isReady.value = true
      realTimeCroppered()
      emit( 'ready', cropper.value )
    },
    // 开始画裁剪框（或画布）
    cropstart : ( e ) => {
      emit( 'cropstart', cropper.value )
    },
    // 画裁剪框（或画布）的中途
    cropmove() {
      debounceRealTimeCroppered()
    },
    // 裁剪框（或画布）画完
    cropend : ( e ) => {
      emit( 'cropend', cropper.value )
    },
    // event.detail.originalEvent、event.detail.action
    // 当autoCrop为true crop事件会在ready之前触发
    crop( e ) {
      debounceRealTimeCroppered()
    },
    // 裁剪框缩放事件
    zoom( e ) {
      debounceRealTimeCroppered()
    },
    ...props.options
  }
  cropper.value = new Cropper( imgEl, options )
}

// 如果裁剪圆形才需要
const getRoundedCanvas = () => {
  const sourceCanvas = cropper.value && cropper.value.getCroppedCanvas()
  const canvas = document.createElement( 'canvas' )
  const context = canvas.getContext( '2d' )
  const width = sourceCanvas.width
  const height = sourceCanvas.height
  canvas.width = width
  canvas.height = height
  context.imageSmoothingEnabled = true
  context.drawImage( sourceCanvas, 0, 0, width, height )
  context.globalCompositeOperation = 'destination-in'
  context.beginPath()
  context.arc(
    width / 2,
    height / 2,
    Math.min( width, height ) / 2,
    0,
    2 * Math.PI,
    true
  )
  context.fill()
  return canvas
}
// 裁剪后返回base64以及宽高等
const croppered = () => {
  if ( !cropper.value ) return false
  const imgInfo = cropper.value.getData()
  const canvas = props.circled
    ? getRoundedCanvas()
    : cropper.value.getCroppedCanvas()
  canvas.toBlob( ( blob ) => {
    if ( !blob ) return false
    const fileReader = new FileReader()
    fileReader.readAsDataURL( blob )
    fileReader.onloadend = ( e ) => {
      const results = {
        src : ( e.target && e.target.result ) || '',
        info : imgInfo
      }
      emit( 'cropend', results )

      previewSource.value = results.src
    }
    fileReader.onerror = () => {
      emit( 'cropendError' )
    }
  }, 'image/png' )
}

function hideCropper() {
  emit( 'hideCropper' )
}

async function saveCropper() {
  // const file = dataURLtoFile( previewSource.value, 'test.png' )
  try {
    // todo 替换成上传逻辑
    // const formData = new FormData()
    // formData.append( 'file', file )
    // const { code, data } = await uploadFile( formData )
    // if ( code == 200 ) {
    //   emit( 'uploadSuccess', { ...data } )
    // } else {
    //   emit( 'uploadFail', { ...data } )
    // }
  } finally {
  }
}

onMounted( init )
</script>

<style lang="scss">
.mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.3);
  display: -none;
}
.cropper-container-box {
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 780px;
  height: 520px;
  z-index: 10;
  border-radius: 2px;
}

.head {
  padding: 16px;
  font-size: 16px;
  line-height: 24px;
  .fr {
    width: 16px;
    height: 16px;
    color: #ccc;
  }
  border-bottom: 1px solid #f0f0f0;
}

.body {
  height: calc(100% - 57px - 52px);
  padding: 14px;
  .cropper-wrapper {
    width: 425px;
    height: 340px;
    margin-bottom: 10px;
  }
  .preview-wrapper {
    text-align: center;
    .preview-xl {
      width: 218px;
      height: 218px;
      display: inline-block;
      background: #ccc;
    }
    .preview-group {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .circle {
        font-variant: tabular-nums;
        position: relative;
        white-space: nowrap;
        text-align: center;
        vertical-align: middle;
        background: #ccc;
        display: inline-block;
        border-radius: 50%;
        overflow: hidden;
        /*margin: 0 15px;*/
      }
      .square {
        @extend .circle;
        border-radius: 0;
      }
      .preview-lg {
        width: 80px;
        height: 80px;
      }
      .preview-md {
        width: 64px;
        height: 64px;
      }
      .preview-sm {
        width: 48px;
        height: 48px;
      }
      .preview-xs {
        width: 40px;
        height: 40px;
      }
    }

    .preview-item {
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
  }
}

.foot {
  border-top: 1px solid #f0f0f0;
  padding: 10px 16px;
  height: 32px;
  text-align: right;
  .el-button {
    min-width: 90px;
  }
}
img {
  display: block;
  max-width: 100%;
}
</style>
