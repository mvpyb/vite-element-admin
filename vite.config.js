// https://cn.vitejs.dev/config/#async-config

const base = './'
import { resolve } from 'path'
import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// import VitePluginElementPlus from 'vite-plugin-element-plus'
import eslint from '@rollup/plugin-eslint'

import { viteMockServe } from 'vite-plugin-mock' // https://github.com/anncwb/vite-plugin-mock/blob/HEAD/README.zh_CN.md
import vueJsx from '@vitejs/plugin-vue-jsx' // https://github.com/vuejs/jsx-next/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md
import styleImport from 'vite-plugin-style-import' // https://github.com/anncwb/vite-plugin-style-import/blob/HEAD/README.zh_CN.md
import { svgBuilder } from './src/plugins/svgBuilder'

function pathResolve( dir ) {
  return resolve( process.cwd(), '.', dir )
}

export default ( { command, mode } ) => {
  const root = process.cwd()
  const env = loadEnv( mode, root ) // https://www.jianshu.com/p/4973bd983e96
  const port = env.port || 9527
  const prodMock = true
  return {
    root,
    base,
    resolve : {
      alias : {
        '/@' : pathResolve( 'src' )
      }
      // conditions : {
      //   "exports": {
      //     ".": {
      //       "import": "./index.esm.js",
      //       "require": "./index.cjs.js"
      //     }
      //   }
      // }
    },
    server : {
      host : '0.0.0.0',
      port,
      strictPort : false,
      https : false,
      open : false,
      // hmr : {
      //
      // },
      watch : {},
      proxy : {
        '/api' : {
          target : env.VITE_APP_BASE_URL, // http://127.0.0.1:9527/api/getUserInfo
          changeOrigin : true,
          rewrite : ( path ) => path.replace( /^\/api/, '' )
        }
      }
    },
    build : {
      target : 'es2015',
      // outDir: 'dist',
      // assetsDir: 'assets', // 指定生成静态资源的存放路径 相对于 build.outDir
      // assetsInlineLimit : 4096,
      sourcemap : false,
      brotliSize : false, // 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建
      chunkSizeWarningLimit : 2000, // 消除打包大小超过2000kb警告
      // rollupOptions : [
      //   'BMap'
      // ],
      rollupOptions : {
        external : [
          'BMap'
          // 'ElMessage',
          // resolve( './src/some-local-file-that-should-not-be-bundled.js' )
        ]
      }
    },

    // 定义全局常量替换方式
    define : {
      // __VERSION__: pkg.version,
      __INTLIFY_PROD_DEVTOOLS__ : false
    },

    css : {
      postcss : {
        plugins : [require( 'autoprefixer' )]
      },
      preprocessorOptions : {
        scss : {
          // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
          // 给导入的路径最后加上 ;
          // additionalData: '@import "./src/styles/variables.scss";'
        }
      }
    },

    optimizeDeps : {
      // 在预构建中强制排除的依赖项
      exclude : [],
      // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
      include : [
        'element-plus/lib/locale/lang/zh-cn',
        'element-plus/lib/locale/lang/en',
        'vxe-table/lib/locale/lang/zh-CN',
        'vxe-table/lib/locale/lang/en-US'
      ]
    },

    // ssr : {},

    plugins : [
      eslint(),
      vue(),
      vueJsx( {
        optimize : false,
        mergeProps : true
      } ),
      svgBuilder( './src/icons/svg/' ), // 全量导入svg
      styleImport( {
        libs : [
          // 按需加载element-plus
          {
            libraryName : 'element-plus',
            esModule : true,
            ensureStyleFile : true,
            resolveStyle : ( name ) => {
              return `element-plus/lib/theme-chalk/${name}.css`
            },
            resolveComponent : ( name ) => {
              return `element-plus/lib/${name}`
            }
          },
          // 按需加载vxe-table
          {
            libraryName : 'vxe-table',
            esModule : true,
            resolveComponent : ( name ) => `vxe-table/es/${name}`,
            resolveStyle : ( name ) => `vxe-table/es/${name}/style.css`
          }
        ]
      } ),
      viteMockServe( {
        mockPath : 'mock',
        watchFiles : true, // 监视文件夹中的文件更改。 并实时同步到请求结果
        supportTs : true,
        localEnabled : command === 'serve', // 设置为 false 将禁用 mock 功能
        prodEnabled : command !== 'serve' && prodMock, // 设置打包是否启用 mock 功能
        injectCode : `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
        logger : false // 是否在控制台显示请求日志
      } )

      // VitePluginElementPlus({
      //   // 如果你需要使用 [component name].scss 源文件，你需要把下面的注释取消掉。
      //   // 对于所有的 API 你可以参考 https://github.com/element-plus/vite-plugin-element-plus 的文档注释
      //   useSource: true
      // }),
    ]
  }
}
