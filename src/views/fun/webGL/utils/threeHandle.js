
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader'

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader.js'

import { LoadingManager } from 'three/src/loaders/LoadingManager'

import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'

// import { ObjectLoader, Mesh, MeshPhongMaterial } from 'three'
import { ObjectLoader } from 'three'

// const OrbitControls = require( 'three-orbit-controls' )( THREE )
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class ThreeHandle {
  constructor() {
    this.width = 500
    this.height = 500
    this.scene = null
    this.light = null
    this.camera = null
    this.controls = null
    this.renderer = null
    this.fov = 60

    this.mixer = null
    this.Stats = null

    this.manager = null
    this.crossOrigin = 'anonymous'
    this.requestHeader = {}

    this.near = 1
    this.far = 2000
  }

  async init( { container, width, height } ) {
    this.scene = await this.setScene()
    this.light = await this.setLgiht()
    await this.scene.add( this.light )

    this.width = width || 500
    this.height = height || 500

    this.camera = await this.setCamera()

    this.renderer = await this.setRenderer()
    this.renderer.setClearColor( 'rgb(92,92,92)', 1.0 )

    this.controls = await this.setControls()
    container.appendChild( this.renderer.domElement )

    await this.setStats( container )
    await this.setClock()

    window.addEventListener( 'resize', this.onWindowResize, false )

    return {
      scene : this.scene,
      light : this.light,
      camera : this.camera,
      renderer : this.renderer,
      controls : this.controls,
      stats : this.stats,
      clock : this.clock
    }
  }

  setScene() {
    const scene = new THREE.Scene()
    scene.add( new THREE.AmbientLight( 0x999999 ) )
    return scene
  }

  setLgiht() {
    const light = new THREE.DirectionalLight( 0xdfebff, 0.45 )
    light.position.set( 50, 200, 100 )
    light.position.multiplyScalar( 0.3 )
    return light
  }

  setCamera() {
    const camera = new THREE.PerspectiveCamera(
      this.fov,
      this.width / this.height,
      this.near,
      this.far
    )
    camera.position.set( 10, 90, 65 )

    camera.up.set( 0, 1, 0 )
    camera.lookAt( this.scene.position )
    return camera
  }

  setRenderer() {
    const renderer = new THREE.WebGLRenderer( {
      alpha : true
    } )
    // 为了兼容高清屏幕
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize( this.width, this.height )
    renderer.shadowMap.enabled = true
    return renderer
  }

  setControls() {
    const controls = new OrbitControls( this.camera, this.renderer.domElement )
    controls.target.set( 0, 0, 0 )

    controls.minDistance = 20

    controls.maxDistance = 100000
    controls.maxPolarAngle = Math.PI / 3
    controls.update()

    controls.enableDamping = true

    controls.dampingFactor = 0.25

    controls.enableZoom = true

    controls.autoRotate = false

    controls.enablePan = true

    return controls
  }

  setStats( container ) {
    this.stats = new Stats()
    this.stats.domElement.style.position = 'absolute'
    this.stats.domElement.style.left = '5px'
    this.stats.domElement.style.top = '5px'
    this.stats.domElement.style.display = 'none'
    container.appendChild( this.stats.dom )
  }

  setClock() {
    this.clock = new THREE.Clock()
  }

  onWindowResize() {
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize( this.width, this.height )
  }

  render() {
    this.renderer.render( this.scene, this.camera )
  }

  fbxAnimate() {
    const delta = this.clock.getDelta()
    if ( this.mixer ) this.mixer.update( delta )
    this.stats.update()
  }

  // 线条绘制立方体
  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---| |v4
  //  | /     | /
  //  v2------v3
  // v0 - v1 - v2 - v3 - v0 - v5 - v4 - v4 - v0 - v5 - v6 - v1 - v2 - v7 - v4 - v5 - v6 - v7
  async drawCubeByLines( { width, height, depth } ) {
    const objects = []
    const geometryBox = await this.box( width, height, depth )
    const lineSegments = await new THREE.LineSegments(
      geometryBox,
      await new THREE.LineDashedMaterial( {
        color : 0xffaa00,
        dashSize : 3,
        gapSize : 1
      } )
    )
    await lineSegments.computeLineDistances()
    await objects.push( lineSegments )
    await this.scene.add( lineSegments )
    return lineSegments
  }

  async box( width, height, depth ) {
    const geometry = await new THREE.BufferGeometry()
    const position = [
      -width,
      -height,
      -depth,
      -width,
      height,
      -depth,

      -width,
      height,
      -depth,
      width,
      height,
      -depth,

      width,
      height,
      -depth,
      width,
      -height,
      -depth,

      width,
      -height,
      -depth,
      -width,
      -height,
      -depth,

      -width,
      -height,
      depth,
      -width,
      height,
      depth,

      -width,
      height,
      depth,
      width,
      height,
      depth,

      width,
      height,
      depth,
      width,
      -height,
      depth,

      width,
      -height,
      depth,
      -width,
      -height,
      depth,

      -width,
      -height,
      -depth,
      -width,
      -height,
      depth,

      -width,
      height,
      -depth,
      -width,
      height,
      depth,

      width,
      height,
      -depth,
      width,
      height,
      depth,

      width,
      -height,
      -depth,
      width,
      -height,
      depth
    ]
    geometry.setAttribute(
      'position',
      await new THREE.Float32BufferAttribute( position, 3 )
    )
    return geometry
  }

  updateCamera( { x, y, z } ) {
    this.camera.position.set( x, y, z )
    this.camera.lookAt( this.scene.position )
  }

  setGridHelper(
    size = 224,
    divisions = 50,
    color1 = 0x303030,
    color2 = 0x303030
  ) {
    const gridHelper = new THREE.GridHelper( size, divisions, color1, color2 )
    return gridHelper
  }

  addAnimateFbx( object ) {
    this.mixer = new THREE.AnimationMixer( object )
    const len = object.animations.length // 动画的数量
    if ( len > 0 ) {
      const action = this.mixer.clipAction( object.animations[0] )
      action.play()
    }
    return this.mixer
  }

  loadFbx( baseUrl, fn ) {
    const loader = new FBXLoader( this.manager )
    loader.setCrossOrigin( this.crossOrigin )
    loader.setRequestHeader( this.requestHeader )

    const that = this
    loader.load(
      baseUrl,
      ( object ) => {
        fn && fn( object )
      },
      that.onProgress,
      that.onError
    )
  }

  // fbx模型加载贴图
  loadImage( url ) {
    const loader = new THREE.TextureLoader()
    const texturePlante = loader.load( url )
    const material = new THREE.MeshPhongMaterial( {
      map : texturePlante
    } )
    return material
  }

  loadObj( baseUrl, objUrl, materials, fn ) {
    const loader = new OBJLoader( this.manager )
    loader.setRequestHeader( this.requestHeader )

    const that = this
    if ( materials ) {
      loader
        .setMaterials( materials )
        .setPath( baseUrl )
        .load(
          objUrl,
          ( object ) => {
            fn && fn( object )
          },
          that.onProgress,
          that.onError
        )
    } else {
      loader.setPath( baseUrl ).load(
        objUrl,
        ( object ) => {
          fn && fn( object )
        },
        that.onProgress,
        that.onError
      )
    }
  }

  loadMtl( baseUrl, mtlUrl, fn ) {
    const loader = new MTLLoader( this.manager )
    loader.setCrossOrigin( this.crossOrigin )
    loader.setRequestHeader( this.requestHeader )

    const that = this
    loader.setPath( baseUrl ).load(
      mtlUrl,
      async( materials ) => {
        materials.preload()
        fn && fn( materials )
      },
      that.onProgress,
      that.onError
    )
  }

  loadJSON( baseUrl, fn ) {
    const that = this
    const loader = new ObjectLoader()
    loader.setCrossOrigin( that.crossOrigin )
    loader.setRequestHeader( that.requestHeader )

    loader.load(
      baseUrl,
      ( object ) => {
        fn && fn( object )
      },
      that.onProgress,
      that.onError
    )
  }

  loadStl( baseUrl, fn ) {
    const that = this
    const loader = new STLLoader()

    loader.load(
      baseUrl,
      ( geometry ) => {
        const material = new THREE.MeshPhongMaterial( {
          color : 0xff5533,
          specular : 0x111111,
          shininess : 200
        } )
        const object = new THREE.Mesh( geometry, material )
        fn && fn( object )
      },
      that.onProgress,
      that.onError
    )
  }

  loadPly( baseUrl, fn ) {
    const that = this
    const loader = new PLYLoader()

    loader.load(
      baseUrl,
      ( geometry ) => {
        // console.log( 'loadPly', geometry )

        geometry.computeVertexNormals()
        const loadGeometry = geometry.clone()

        var material = new THREE.MeshStandardMaterial( {
          color : 0x7fff00,
          flatShading : true
        } )
        var mesh = new THREE.Mesh( loadGeometry, material )
        mesh.translateZ( 5 )
        mesh.translateY( 2 )
        // scene.add(mesh);

        // eslint-disable-next-line no-unused-vars
        const mateial = new THREE.PointsMaterial( {
          color : 0xffffff,
          size : 0.05,
          opacity : 0.5,
          transparent : true,
          blending : THREE.AdditiveBlending
          // map: generateSprite()
        } )

        fn && fn( mesh )
      },
      that.onProgress,
      that.onError
    )
  }

  // https://threejs.org/docs/index.html?q=LoadingManager#api/en/loaders/managers/LoadingManager
  loadManager( type = 'dds' ) {
    let reg
    let loader

    // eslint-disable-next-line default-case
    switch ( type ) {
      case 'dds':
        reg = /\.dds$/i
        loader = new DDSLoader()
        break
      case 'tga':
        reg = /\.tga$/i
        loader = new TGALoader()
        break
    }
    this.manager = new LoadingManager()
    this.manager.addHandler( reg, loader )
  }

  async distoryEvent() {
    window.removeEventListener( 'resize', this.onWindowResize, false )
  }

  async clearScene() {
    const that = this
    const groups = this.scene.children.filter( ( item ) => item.type == 'Group' )
    const LineSegments = this.scene.children.filter(
      ( item ) => item.type == 'LineSegments'
    )
    that.getGroup( groups )
    that.getGroup( LineSegments )
  }

  getGroup( groups ) {
    const that = this
    if ( groups.length > 0 ) {
      for ( let i = 0; i < groups.length; i++ ) {
        const currObj = groups[i]
        if ( currObj instanceof THREE.Scene ) {
          const children = currObj.children
          for ( let j = 0; j < children.length; j++ ) {
            that.deleteGroup( children[j] )
          }
        } else {
          that.deleteGroup( currObj )
        }
        that.scene.remove( currObj )
      }
    }
  }

  deleteGroup( group ) {
    if ( !group ) return
    group.traverse( function( item ) {
      if ( item instanceof THREE.Mesh ) {
        item.geometry.dispose()
        item.material.dispose()
      }
    } )
  }

  onProgress( xhr ) {
    console.log( ( xhr.loaded / xhr.total ) * 100 + '% loaded' )
    if ( xhr.lengthComputable ) {
      // const percentComplete = xhr.loaded / xhr.total * 100
      // console.log( Math.round( percentComplete, 2 ) + '% downloaded' )
    }
  }

  onError() {
    console.error( '加载模型出错,请检查你的模型文件是否合法' )
  }

  // https://threejs.org/docs/index.html#api/zh/math/Box3.makeEmpty
  // https://blog.csdn.net/ithanmang/article/details/82217963
  async getSize( object ) {
    const box = new THREE.Box3().setFromObject( object )
    const boxSize = box.getSize( new THREE.Vector3() )
    const length = boxSize.length()
    const boxCenter = box.getCenter( new THREE.Vector3() )
    return {
      boxSize,
      length,
      boxCenter
    }
  }

  getFitScaleValue( obj ) {
    const boxHelper = new THREE.BoxHelper( obj )
    boxHelper.geometry.computeBoundingBox()
    const box = boxHelper.geometry.boundingBox
    const maxDiameter = Math.max(
      box.max.x - box.min.x,
      box.max.y - box.min.y,
      box.max.z - box.min.z
    )
    const size = this.camera.position.z / maxDiameter
    return size
  }

  setScaleToFitSize( obj ) {
    const scaleValue = this.getFitScaleValue( obj )
    obj.scale.set( scaleValue, scaleValue, scaleValue )
    return scaleValue
  }
}

export default new ThreeHandle()
