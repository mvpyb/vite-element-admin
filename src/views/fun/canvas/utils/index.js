import { fabric } from 'fabric'

class Mark {
  constructor( el ) {
    this.el = el || 'canvas'
    this.canvas = undefined
    this.obj = []
  }

  init() {
    const canvas = new fabric.Canvas( this.el )
    fabric.Object.prototype.transparentCorners = false

    this.canvas = canvas
    return canvas
  }

  addRect( opt = {} ) {
    const options = {
      width : this.sum( 50, 200 ),
      height : this.sum( 50, 200 ),
      left : this.sum( 0, 800 ),
      top : this.sum( 0, 500 ),
      angle : this.sum( 0, 90 ),
      fill : this.getRandomColor()
    }
    const rect = new fabric.Rect( {
      ...options,
      ...opt
    } )
    const id = 'rect_' + new Date().valueOf()
    rect.name = id
    this.obj.push( {
      id,
      type : 'rect',
      obj : rect
    } )
    this.canvas.add( rect )
    return rect
  }

  addCircle( opt = {} ) {
    const options = {
      radius : this.sum( 10, 50 ),
      left : this.sum( 40, 800 ),
      top : this.sum( 40, 500 ),
      fill : this.getRandomColor()
    }
    const circle = new fabric.Circle( {
      ...options,
      ...opt
    } )
    const id = 'circle_' + new Date().valueOf()
    circle.name = id
    this.obj.push( {
      id,
      type : 'circle',
      obj : circle
    } )
    this.canvas.add( circle )
    return circle
  }

  addTriangle( opt = {} ) {
    const options = {
      width : this.sum( 10, 100 ),
      height : this.sum( 10, 100 ),
      left : this.sum( 40, 800 ),
      top : this.sum( 40, 500 ),
      fill : this.getRandomColor()
    }
    const triangle = new fabric.Triangle( {
      ...options,
      ...opt
    } )
    const id = 'triangle_' + new Date().valueOf()
    triangle.name = id
    this.obj.push( {
      id,
      type : 'triangle',
      obj : triangle
    } )
    this.canvas.add( triangle )
    return triangle
  }

  addImage( url, opt = {} ) {
    const options = {
      left : this.sum( 10, 800 ),
      top : this.sum( 10, 500 ),
      angle : this.sum( -30, 30 )
    }
    const image = fabric.Image.fromURL( url, ( img ) => {
      img.scale( 0.5 ).set( {
        ...options,
        ...opt
      } )
      const id = 'image_' + new Date().valueOf()
      img.name = id
      this.obj.push( {
        id,
        type : 'image',
        obj : img
      } )
      this.canvas.add( img )
      img.center()
    } )
    return image
  }

  addTxt( text = '', opt = {} ) {
    const base = {
      left : this.sum( 40, 800 ),
      top : this.sum( 100, 500 ),
      fill : this.getRandomColor(),
      fontSize : this.sum( 12, 30 ),
      fontFamily : 'Open Sans',
      textBackgroundColor : this.getRandomColor()
    }
    const txt = new fabric.Text( text, {
      ...base,
      ...opt
    } )
    const id = 'txt_' + new Date().valueOf()
    txt.name = id
    this.obj.push( {
      id,
      type : 'txt',
      obj : txt
    } )
    this.canvas.add( txt )
    return txt
  }

  removeObj( activeObject ) {
    this.canvas.forEachObject( ( markObj ) => {
      if ( markObj && markObj.name && markObj.name === activeObject.name ) {
        this.obj = this.obj.filter( ( obj ) => obj.name !== activeObject.name )
        // eslint-disable-next-line no-useless-call
        this.canvas.remove.apply( this.canvas, [markObj] )
      }
    } )
  }

  // 清除所有对象，background，但是 canvas 不会删除
  clear() {
    this.canvas.clear()
  }
  clearContext( obj ) {
    this.canvas.clearContext( obj )
  }

  distoryAll() {
    this.clear()
  }

  // 随机数获取
  sum( m, n ) {
    const num = Math.floor( Math.random() * ( m - n ) + n )
    return num
  }

  // 获取随机颜色
  pad( str, length ) {
    while ( str.length < length ) {
      str = '0' + str
    }
    return str
  }

  getRandomColor() {
    const getRandomInt = fabric.util.getRandomInt
    return (
      '#' +
      this.pad( getRandomInt( 0, 255 ).toString( 16 ), 2 ) +
      this.pad( getRandomInt( 0, 255 ).toString( 16 ), 2 ) +
      this.pad( getRandomInt( 0, 255 ).toString( 16 ), 2 )
    )
  }
}

export { Mark }
