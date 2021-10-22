// https://cn.vitejs.dev/guide/features.html#glob-import
const styles = {}
const styFiles = import.meta.globEager( './*.css' )
for ( const path in styFiles ) {
  const moduleName = path.replace( /(.*\/)*([^.]+).*/gi, '$2' )
  if ( !styles[moduleName] ) {
    styles[moduleName] = {
      path,
      label : moduleName,
      value : styFiles[path].default
    }
  }
}
export default styles
