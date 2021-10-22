import JSZip from 'jszip'
import { downSourcesWithBlob } from '/@/api/upload'

class ReaderZip {
  constructor() {
    this.zip = undefined
  }

  init() {
    this.zip = new JSZip()
  }

  async read( url ) {
    const zipReader = await this.zip.loadAsync( url )
    return {
      zipReader,
      files : zipReader.files
    }
  }

  async readRemote( path ) {
    const response = await downSourcesWithBlob( {
      path
    } )
    try {
      const zipReader = await JSZip.loadAsync( response )
      return {
        zipReader,
        files : zipReader.files,
        size : response.size
      }
    } catch ( e ) {}
  }

  async readBase64( zipReader, zipEntry ) {
    if ( !JSZip.support.blob ) {
      return Promise.reject( '档期浏览器不支持blob对象' )
    }
    const blobZip = await zipReader.file( zipEntry.name ).async( 'blob' )
    this.clearFiles()
    return {
      blobZip
    }
  }

  clearFiles() {
    for ( const key in this.zip.files ) {
      delete this.zip.files[key]
    }
  }
}

const Zip = new ReaderZip()
Zip.init()

export default Zip
