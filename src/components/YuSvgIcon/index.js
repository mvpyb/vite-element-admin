
import YuSvgIcon from "./src/index.vue"
export const SvgIcon = Object.assign(YuSvgIcon, {
  install(app) {
    app.component(YuSvgIcon.name, YuSvgIcon);
  }
})

export default SvgIcon
