import { createApp } from 'vue'
// import Cookies from 'js-cookie'
import 'normalize.css/normalize.css'
import '/@/assets/iconfont/iconfont.css'
// import '/@/assets/fonts/fonts.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './styles/element-variables.scss'
import 'element-plus/packages/theme-chalk/src/base.scss'
// import 'element-plus/lib/theme-chalk/index.css'

import './styles/index.scss'
import './assets/iconfont/iconfont.js'
import './assets/iconfont/iconfont.css'

import 'v-contextmenu/dist/themes/default.css'

import App from './App.vue'
import router from './router/index'
import store from './store/index'

import { useSvgIcon } from './icons'

import './permission'

// 自定义指令
import registerDirective from '/@/directive'

// import ElementLocale from "element-plus/lib/locale"
// import zhLocale from "element-plus/lib/locale/lang/zh-cn"
// ElementLocale.use(zhLocale);

const app = createApp( App )
useSvgIcon( app )

const getServerConfig = async() => {
  app.use( router ).use( store ).use( ElementPlus )

  await registerDirective( app )
  await router.isReady()
  app.mount( '#root', false )
}

getServerConfig()
