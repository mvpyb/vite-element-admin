import YuStreetMap from './src/index.vue'
export const StreetMap = Object.assign( YuStreetMap, {
  install( app ) {
    app.component( YuStreetMap.name, YuStreetMap )
  }
} )

export default StreetMap
