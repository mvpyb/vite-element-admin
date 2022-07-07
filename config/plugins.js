
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import DefineOptions from "unplugin-vue-define-options/vite"
import legacy from '@vitejs/plugin-legacy'
import { visualizer } from 'rollup-plugin-visualizer'
import { viteMockServe } from 'vite-plugin-mock' // https://github.com/anncwb/vite-plugin-mock/blob/HEAD/README.zh_CN.md
import { svgBuilder } from '../config/svgBuilder.js'
import vueJsx from "@vitejs/plugin-vue-jsx"

export function composePlugins( command, VITE_LEGACY ) {
  const prodMock = true
  const lifecycle = process.env.npm_lifecycle_event
  return [
    vue(),
    DefineOptions(),
    vueJsx(),
    svgBuilder( './src/icons/svg/' ),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    }),
    // https://www.npmjs.com/package/@vitejs/plugin-legacy
    VITE_LEGACY
      ? legacy( {
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        // renderLegacyChunks: true,
        // polyfills: [
        //   'es.symbol',
        //   'es.array.filter',
        //   'es.promise',
        //   'es.promise.finally',
        //   'es/map',
        //   'es/set',
        //   'es.array.for-each',
        //   'es.object.define-properties',
        //   'es.object.define-property',
        //   'es.object.get-own-property-descriptor',
        //   'es.object.get-own-property-descriptors',
        //   'es.object.keys',
        //   'es.object.to-string',
        //   'web.dom-collections.for-each',
        //   'esnext.global-this',
        //   'esnext.string.match-all'
        // ]
        } )
      : null,
    // https://www.npmjs.com/package/rollup-plugin-visualizer
    lifecycle === "report"
      ? visualizer( {
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: "report.html"
      } )
      : null,
  
    viteMockServe( {
      mockPath: 'mock',
      watchFiles : true,
      supportTs : false,
      localEnabled : command === 'serve',
      prodEnabled : command !== 'serve' && prodMock,
      injectCode : `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      logger : false
    } )
  ]
}
