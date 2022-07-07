import clipboard from './clipboard'
import wave from './wave'
import longpress from './longpress'
import dobounce from './dobounce'
import waterMarker from './waterMarker'
import draggable from './draggable'
import permission from './permission'

const directives = {
  clipboard,
  longpress,
  dobounce,
  waterMarker,
  draggable,
  permission,
  wave
}

const registerDirective = app => {
  Object.keys( directives ).forEach( key => {
    app.directive( key, directives[key] )
  } )
}
export default registerDirective
