
// https://segmentfault.com/a/1190000039255368
import SvgIcon from '/@/components/svgIcon/index.vue'

export function useSvgIcon(app) {
  app.component( 'svg-icon', SvgIcon )
  // let modules = {}
  // const svgFiles = import.meta.globEager('./svg/*.svg')
  // for (const path in svgFiles) {
  //   const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
  //   modules = {
  //     ...modules,
  //     [moduleName]:svgFiles[path].default
  //   }
  // }
}
