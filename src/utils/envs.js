import { GLOBAL_DATA } from '/@/api/constant'

const env = import.meta.env
const { MODE } = env

export function getEnvs() {
  const href = window.location.href
  let envStr = ''
  if ( MODE === 'development' ) {
    envStr = 'dev'
  } else {
    if ( href.indexOf( 'fat' ) >= 0 ) {
      envStr = 'fat'
    } else if ( href.indexOf( 'uat' ) >= 0 ) {
      envStr = 'uat'
    } else {
      envStr = 'pro'
    }
  }
  return {
    envStr
  }
}

export function initUrl() {
  const { envStr } = getEnvs()
  const baseUrlStr = envStr === 'dev' ? env.VITE_APP_API_BASE_URL : GLOBAL_DATA[envStr]['baseUrl']
  return {
    baseUrlStr
  }
}
