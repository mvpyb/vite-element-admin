let svgIcons = []
// todo https://cn.vitejs.dev/guide/migration.html#general-changes
const svgFiles = import.meta.glob( '../../icons/svg/*.svg' )

for ( const path in svgFiles ) {
  const moduleName = path.replace( /(.*\/)*([^.]+).*/gi, '$2' )
  svgIcons = [...svgIcons, moduleName]
}
export default svgIcons
