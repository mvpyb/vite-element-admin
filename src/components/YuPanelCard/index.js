import YuPanelCard from './src/index.vue'
export const PanelCard = Object.assign( YuPanelCard, {
  install( app ) {
    app.component( YuPanelCard.name, YuPanelCard )
  }
} )

export default PanelCard
