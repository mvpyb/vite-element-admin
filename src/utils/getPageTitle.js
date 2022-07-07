import defaultSettings from '/@/settings'
const title = defaultSettings.title || 'Vite Element Admin'

export default function getPageTitle( pageTitle ) {
  if ( pageTitle ) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
