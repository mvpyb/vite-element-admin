
import { createStore, createLogger } from 'vuex'
import getters from './getters'

// vite版自动导入vuex
// 这次我将需要导入的文件放到store/modules文件夹下面了
//  import.meta.globEager的参数必须是绝对路径或者相对路径，不能是路径别名。也就是以点和斜杠开头的字符串。
let modules = {}
const modulesFiles = import.meta.globEager('./modules/*.js')
for (const path in modulesFiles) {
  const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
  modules = {
    ...modules,
    [moduleName]:modulesFiles[path].default
  }
}

// const isDev = import.meta.env.VITE_USER_NODE_ENV !== 'production'
const isDev = import.meta.env.MODE !== 'production'
const store = createStore({
  modules,
  getters,
  strict: isDev, // 严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到
  
  // plugins: isDev ? [
  //   createLogger( {
  //     collapsed: false, // 自动展开记录的 mutation
  //     filter (mutation, stateBefore, stateAfter) {
  //       // 若 mutation 需要被记录，就让它返回 true 即可
  //       // 顺便，`mutation` 是个 { type, payload } 对象
  //       return mutation.type !== "aBlocklistedMutation"
  //     },
  //     actionFilter (action, state) {
  //       // 和 `filter` 一样，但是是针对 action 的
  //       // `action` 的格式是 `{ type, payload }`
  //       return action.type !== "aBlocklistedAction"
  //     },
  //     transformer (state) {
  //       // 在开始记录之前转换状态
  //       // 例如，只返回指定的子树
  //       return state.subTree
  //     },
  //     mutationTransformer (mutation) {
  //       // mutation 按照 { type, payload } 格式记录
  //       // 我们可以按任意方式格式化
  //       return mutation.type
  //     },
  //     actionTransformer (action) {
  //       // 和 `mutationTransformer` 一样，但是是针对 action 的
  //       return action.type
  //     },
  //     logActions: true, // 记录 action 日志
  //     logMutations: true, // 记录 mutation 日志
  //     logger: console, // 自定义 console 实现，默认为 `console`
  //   } )
  // ] : []
})

export function setupStore(app) {
  app.use(store)
  console.log(store, 'vuex')
}



export default store
