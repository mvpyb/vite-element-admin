import YuHamBurger from './src/index.vue'
export const HamBurger = Object.assign( YuHamBurger, {
  install( app ) {
    app.component( YuHamBurger.name, YuHamBurger )
  }
} )

export default HamBurger
