
class sessionStorageProxy {
  constructor(storageModel) {
    this.storage = storageModel;
  }
  set(key, value) {
    const storage = this.storage
    if ( key ) {
      const data = JSON.stringify( value )
      storage.setItem( key, data )
    }
  }
  
  get(key) {
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
  
  remove(key, isAll = false) {
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
    this.storage.clear();
  }
}

class localStorageProxy extends sessionStorageProxy {
  constructor(localStorage) {
    super(localStorage);
  }
}

export const sessionStorageHandle = new sessionStorageProxy(sessionStorage);

export const localStorageHandle = new localStorageProxy(localStorage);
