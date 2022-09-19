let modules = {}
const modulesFiles = import.meta.glob( './language/**/*.js' )

for ( const path in modulesFiles ) {
  const moduleName = path.replace( /(.*\/)*([^.]+).*/gi, '$2' )
  modules = {
    ...modules,
    [moduleName] : modulesFiles[path].default
  }
}

export default modules
