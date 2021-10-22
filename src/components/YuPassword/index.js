import yuPassword from './src/index.vue'
import yuStrength from './src/strength.vue'

export const YuPassword = Object.assign( yuPassword, {
  install( app ) {
    app.component( yuPassword.name, yuPassword )
  }
} )

export const YuStrength = Object.assign( yuStrength, {
  install( app ) {
    app.component( yuStrength.name, yuStrength )
  }
} )
