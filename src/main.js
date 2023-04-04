import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerStore } from '@/store'
import { useSvgIcon } from './icons'
import ElementPlus from 'element-plus'
import './permission'

import 'animate.css'
// 导入公共样式
import './styles/index.scss'
// 第三方自定义字体文件
import './assets/fonts/index.css'

// tailwindcss 按需引入
// import 'tailwindcss/tailwind.css'
import 'element-plus/dist/index.css'

// 导入字体图标
import './assets/iconfont/iconfont.css'
// 全局事件总成
import globalEmitter from '@/utils/mitt'
// 自定义指令
import registerDirective from '@/directive'
// 国际化
import { setupI18n } from '@/locale'
// 注册所有element icons
import { setupElementIcons } from '@/plugins/elementIcons'
import { useTable } from '@/plugins/vxeTable'

// https://lottiefiles.com/web-player?lottie_url=https%3A%2F%2Fassets6.lottiefiles.com%2Fpackages%2Flf20_Kr2vAt3caT.json
import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

const app = createApp( App )

const initApp = async() => {
  app.use( Vue3Lottie )
  app.use( router )
  useSvgIcon( app )
  registerStore( app )
  registerDirective( app )
  await router.isReady()

  setupI18n( app )
  setupElementIcons( app )

  app.use( globalEmitter )
  app.use( ElementPlus )
  app.use( useTable )
  app.mount( '#app' )
}
initApp()
