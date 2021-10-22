import control from './src/Control.vue'
import nodePanel from './src/NodePanel.vue'
import dataDialog from './src/DataDialog.vue'
export const Control = Object.assign( control, {
  install( app ) {
    app.component( control.name, control )
  }
} )
export const NodePanel = Object.assign( nodePanel, {
  install( app ) {
    app.component( nodePanel.name, nodePanel )
  }
} )
export const DataDialog = Object.assign( dataDialog, {
  install( app ) {
    app.component( dataDialog.name, dataDialog )
  }
} )
