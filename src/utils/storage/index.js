class StorageProxy {
  constructor( storageModel ) {
    this.storage = storageModel
  }

  setItem( key, value ) {
    const storage = this.storage
    if ( key ) {
      const data = JSON.stringify( value )
      storage.setItem( key, data )
    }
  }

  getItem( key ) {
    const storage = this.storage
    if ( key ) {
      let data = storage.getItem( key )
      if ( data == '' || data == null || JSON.stringify( data ) == '{}' ) {
        data = ''
      } else {
        data = JSON.parse( data )
      }
      return data
    } else {
      return null
    }
  }

  removeItem( key, isAll = false ) {
    const storage = this.storage
    if ( key ) {
      if ( isAll ) {
        this.clear()
      } else {
        storage.removeItem( key )
      }
    }
  }

  clear() {
    this.storage.clear()
  }
}

class LocalStorageProxy extends StorageProxy {
  // eslint-disable-next-line no-useless-constructor
  constructor( localStorage ) {
    super( localStorage )
  }
}

export const sessionStorageHandle = new StorageProxy( sessionStorage )

export const localStorageHandle = new LocalStorageProxy( localStorage )
