import { GLOBAL_DATA } from '/@/config/constant'

const env = import.meta.env
const { MODE } = env

// TODO, 此处是按照我司部署习惯写的，可以根据自己需要进行修改， 用途是为了打包一次，fat uat pro 三个环境同时部署
export function getEnvs() {
  const origin = window.location.origin
  let envStr = ''
  if ( MODE === 'development' ) {
    envStr = 'dev'
  } else {
    if ( origin.indexOf( 'fat' ) >= 0 ) {
      envStr = 'fat'
    } else if ( origin.indexOf( 'uat' ) >= 0 ) {
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
  const baseUrlStr = envStr === 'dev' ? env.VITE_APP_API_BASE_URL : GLOBAL_DATA[envStr].baseUrl
  return {
    baseUrlStr
  }
}
