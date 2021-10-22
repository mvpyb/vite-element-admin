let svgIcons = []
const svgFiles = import.meta.globEager( '../../../icons/svg/*.svg' )
for ( const path in svgFiles ) {
  const moduleName = path.replace( /(.*\/)*([^.]+).*/gi, '$2' )
  svgIcons = [...svgIcons, moduleName]
}
export default svgIcons
