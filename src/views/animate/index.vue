<template>
  <div class="animate-section">
    <el-divider content-position="left">mo.js </el-divider>
    <span> See More : https://mojs.github.io/tutorials/getting-started.html#setup-mo-js-in-your-project </span>
    <span> See More : https://blog.csdn.net/qq_22841387/article/details/122930324 </span>

    <el-button type="primary" size="default" @click="startMo"> start </el-button>
    <div ref="heart" class="heart" />
    <div ref="logo" class="logo" />

    <div id="js-black-bg" class="background black-background" />
    <div id="js-green-bg" class="background green-background" />
    <div id="js-pink-bg" class="background pink-background">
      <div id="js-logo" class="pink-background__logo" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MoJs from '@mojs/core'

defineOptions( {
  name : 'Animate'
} )

// new MoJs.Timeline()
const heart = ref( null )
const logo = ref( null )

let burst

onMounted( () => {
  burst = new MoJs.Burst( {
    // 爆炸范围
    radius : { 0 : 50 },
    // 动画挂载父元素，默认改在到body上
    parent : heart.value,
    // 动画延时函数
    easing : MoJs.easing.bezier( 0.1, 1, 0.3, 1 ),
    // 动画延时时间
    duration : 1500,
    // 动画等待时间
    delay : 300,
    // 扩散的粒子配置
    children : {
      duration : 750,
      // 随机数范围爆炸
      radius : { 0 : 'rand(5,25)' },
      shape : ['circle', 'rect', 'polygon'],
      // 粒子可选色
      fill : [
        '#1abc9c',
        '#2ecc71',
        '#00cec9',
        '#3498db',
        '#9b59b6',
        '#fdcb6e',
        '#f1c40f',
        '#e67e22',
        '#e74c3c',
        '#e84393'
      ],
      degreeShift : 'rand(-90, 90)',
      delay : 'stagger(0, 40)'
    },
    // 透明度
    opacity : 0.6,
    // 生成粒子数量
    count : 10
  } )
} )

// const mo1 = () => {
//   const COLORS = {
//     white : '#ffffff',
//     black : '#000000',
//     green : '#49F2CC',
//     lightGrey : '#777',
//     grey : '#29363B',
//     cyan : 'cyan',
//     yellow : '#FFE202',
//     hotpink : 'deeppink'
//   }
//
//   // ADD CUSTOM SHAPES
//   class M extends MoJs.CustomShape {
//     getShape() {
//       return '<path d="M91.5714286,44.4285714 L91.5714286,100 L96.7142857,100 L96.7142857,33.4285714 L49.8571429,72 L3,33.4285714 L3,100 L8.14285714,100 L8.14285714,44.4285714 L49.8571429,78.7142857 L91.5714286,44.4285714 Z M49.8571429,38.7142857 L92,3.85714286 L88.7142857,-6.50146603e-13 L49.8571429,31.8571429 L11,-6.50146603e-13 L7.71428571,3.85714286 L49.8571429,38.7142857 Z"></path>'
//     }
//   }
//   MoJs.addShape( 'm', M )
//
//   class J extends MoJs.CustomShape {
//     getShape() {
//       return '<path d="M22,87.535014 C27.7422969,95.0980392 36.8459384,100 47.070028,100 C64.2969188,100 78.442577,88.6554622 78.442577,68.627451 L78.442577,0 L73.4005602,0 L73.4005602,68.627451 C73.4005602,85.8543417 61.4957983,94.9579832 47.070028,94.9579832 C38.3865546,94.9579832 30.5434174,90.6162465 25.7815126,84.0336134 L22,87.535014 Z"></path>'
//     }
//   }
//   MoJs.addShape( 'j', J )
//
//   class S extends MoJs.CustomShape {
//     getShape() {
//       return '<path d="M15,71.0164835 C15,92.3076923 34.7802198,100 49.478022,100 C68.5714286,100 84.0934066,91.2087912 84.0934066,72.3901099 C84.0934066,61.5384615 79.2857143,51.7857143 61.978022,45.1923077 C45.2197802,38.8736264 27.2252747,35.5769231 27.2252747,21.8406593 C27.2252747,10.3021978 38.0769231,4.53296703 48.9285714,4.53296703 C59.9175824,4.53296703 70.7692308,10.3021978 70.7692308,21.8406593 L75.7142857,21.8406593 C75.7142857,7.14285714 62.6648352,0 49.478022,0 C36.0164835,0 22.2802198,7.41758242 22.2802198,21.8406593 C22.2802198,39.5604396 43.4340659,42.9945055 60.6043956,49.5879121 C74.8901099,55.0824176 79.1483516,63.7362637 79.1483516,72.5274725 C79.1483516,89.010989 64.1758242,95.0549451 49.478022,95.0549451 C35.3296703,95.0549451 19.9450549,87.6373626 19.9450549,71.0164835 L15,71.0164835 Z"></path>'
//       // return '<path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/>';
//     }
//   }
//   MoJs.addShape( 's', S )
//
//   // VARIABLES
//   const { approximate } = MoJs.easing
//   const shiftCurve = approximate( MoJs.easing.path( 'M0,100 C50,100 50,100 50,50 C50,0 50,0 100,0' ) )
//   const scaleCurve = approximate( MoJs.easing.path( 'M0,100 C21.3776817,95.8051376 50,77.3262711 50,-700 C50,80.1708527 76.6222458,93.9449005 100,100' ) )
//   const charSize = 25
//   const leftStep = 22
//   const logo = document.querySelector( '#js-logo' )
//
//   const CHAR_OPTS = {
//     // parent:       logo.value,
//     parent : logo,
//     isForce3d : true,
//     fill : 'white',
//     radius : charSize / 2,
//     stroke : 'white',
//     strokeWidth : 2
//   }
//
//   const CHAR_HIDE_THEN = {
//     delay : 930,
//     isShowEnd : false
//   }
//
//   // HELPERS
//   const scale = function( curve, n ) {
//     return ( p ) => { return n * curve( p ) }
//   }
//   const increase = function( curve, n ) {
//     return ( p ) => { return n + curve( p ) }
//   }
//
//   // CURVES
//   const scaleC = approximate( increase( scaleCurve, 1 ) )
//   const scaledCurve = ( amount ) => {
//     return increase( scale( scaleCurve, amount ), 1 )
//   }
//   const scaleCShort = approximate( scaledCurve( 0.75 ) )
//
//   // SHAPES
//   const mCharacter = new MoJs.Shape( {
//     ...CHAR_OPTS,
//     shape : 'm',
//     left : leftStep + '%',
//     x : -7,
//     y : { 350 : 150, easing : shiftCurve },
//     scaleY : { 1 : 1, curve : scaleCShort },
//     origin : { '50% 100%' : '50% 0%', easing : shiftCurve },
//     delay : 232,
//     duration : 680
//   } ).then( {
//     delay : 115,
//     y : { to : 0, easing : shiftCurve },
//     scaleY : { 1 : 1, curve : approximate( scaledCurve( 0.5 ) ) },
//     origin : { '50% 100%' : '50% 0%', easing : shiftCurve }
//   } ).then( CHAR_HIDE_THEN )
//
//   const oCharacter = new MoJs.Shape( {
//     ...CHAR_OPTS,
//     shape : 'circle',
//     fill : 'none',
//     left : 2 * leftStep + '%',
//     delay : 350,
//     duration : 465,
//     strokeWidth : 3,
//     x : 200,
//     y : { [-100] : 250, easing : shiftCurve },
//     scaleY : { 1 : 1, curve : scaleC },
//     origin : { '50% 0%' : '50% 100%', easing : shiftCurve }
//   } ).then( {
//     duration : 407,
//     x : { to : 0, easing : shiftCurve },
//     scaleX : { 1 : 1, curve : scaleCShort },
//     origin : { '100% 50%' : '0% 50%', easing : shiftCurve }
//   } ).then( {
//     duration : 700,
//     y : { to : 0, easing : shiftCurve },
//     scaleY : { 1 : 1, curve : scaleCShort },
//     origin : { '50% 100%' : '50% 0%', easing : shiftCurve }
//   } ).then( CHAR_HIDE_THEN )
//
//   const oCharacterInner = new MoJs.Shape( {
//     parent : oCharacter.el,
//     fill : 'white',
//     radius : 3,
//     delay : 1337,
//     y : { 0 : 35 },
//     easing : 'expo.out',
//     isForce3d : true,
//     isShowStart : true
//   } ).then( {
//     y : 0,
//     easing : 'elastic.out',
//     duration : 1160
//   } )
//
//   const jCharacter = new MoJs.Shape( {
//     ...CHAR_OPTS,
//     shape : 'j',
//     left : 3 * leftStep + '%',
//     delay : 40,
//     duration : 580,
//     x : -200,
//     y : { 250 : -100, easing : shiftCurve },
//     scaleY : { 1 : 1, curve : scaleC },
//     origin : { '50% 100%' : '50% 0%', easing : shiftCurve }
//   } )
//     .then( {
//       duration : 523,
//       x : { to : 0, easing : shiftCurve },
//       scaleX : { 1 : 1, curve : scaleCShort },
//       origin : { '0% 50%' : '100% 50%', easing : shiftCurve }
//     } )
//     .then( {
//       y : { to : 0, easing : shiftCurve },
//       // x:          { to: charSize, easing: shiftCurve },
//       scaleY : { 1 : 1, curve : approximate( scaledCurve( 0.5 ) ) },
//       origin : { '50% 0%' : '50% 100%', easing : shiftCurve }
//     } ).then( CHAR_HIDE_THEN )
//
//   const sCharacter = new MoJs.Shape( {
//     ...CHAR_OPTS,
//     shape : 's',
//     left : 4 * leftStep + '%',
//     delay : 116,
//     duration : 523,
//     x : { 500 : 0, easing : shiftCurve },
//     y : 200,
//     scaleX : { 1 : 1, curve : scaleC },
//     origin : { '100% 50%' : '0% 100%', easing : shiftCurve }
//   } )
//     .then( {
//       delay : 116,
//       y : { to : 0, easing : shiftCurve },
//       scaleY : { 1 : 1, curve : scaleCShort },
//       origin : { '50% 100%' : '50% 0%', easing : shiftCurve }
//     } ).then( { ...CHAR_HIDE_THEN, delay : 1280 } )
//
//   mCharacter.play()
//   oCharacter.play()
//   oCharacterInner.play()
//   jCharacter.play()
//   sCharacter.play()
//
//   // return false
//
//   // LINES
//
//   const LINE_OPTS = {
//     shape : 'line',
//     strokeWidth : { 10 : 0 },
//     stroke : COLORS.cyan,
//     radius : 44,
//     parent : logo,
//     angle : 90,
//     duration : 465,
//     delay : 495,
//     radiusY : 0,
//     strokeDasharray : '100% 100%',
//     strokeDashoffset : { '100%' : '-100%' }
//   }
//
//   const line1 = new MoJs.Shape( {
//     ...LINE_OPTS,
//     x : 189,
//     y : { [-20] : 160 }
//   } )
//
//   const line2 = new MoJs.Shape( {
//     ...LINE_OPTS,
//     x : -175,
//     y : { 200 : -20 },
//     stroke : COLORS.hotpink,
//     strokeDashoffset : { '-100%' : '100%' },
//     delay : 290
//   } )
//
//   const line3 = new MoJs.Shape( {
//     ...LINE_OPTS,
//     radius : 53,
//     y : 30,
//     stroke : COLORS.yellow,
//     strokeDashoffset : { '-100%' : '100%' },
//     delay : 804,
//     angle : 0
//   } )
//
//   const StaggerShape = new MoJs.stagger( MoJs.Shape )
//
//   const underlines = new StaggerShape( {
//     ...LINE_OPTS,
//     radius : 53,
//     angle : 0,
//     radiusY : 0,
//     y : 30,
//     strokeWidth : 2,
//     stroke : [COLORS.hotpink, COLORS.yellow, COLORS.cyan, COLORS.white],
//     duration : 581,
//     delay : 'stagger(1686, 145)',
//     strokeDasharray : null,
//     strokeDashoffset : null,
//     scaleX : { 0 : 1 },
//     origin : '0 50%',
//     quantifier : 'stroke',
//     easing : 'expo.out',
//     x : 1,
//     isForce3d : true
//   } )
//   // SHAPES
//   const shapes = new StaggerShape( {
//     parent : logo,
//     left : '100%',
//     x : [-20, 10, 0],
//     y : [-25, -5, -35],
//     quantifier : 'shape',
//     shape : ['circle', 'polygon', 'rect'],
//     radius : 7,
//     fill : 'none',
//     stroke : ['deeppink', COLORS.cyan, COLORS.yellow],
//     strokeWidth : { 5 : 0 },
//     scale : { 0.75 : 1 },
//     delay : 'stagger(1860, 58)',
//     isTimelineLess : true
//   } )
//
//   // LOGO SHIFT
//   let yShift = 0
//   const getYShift = () => {
//     const w = window
//     // eslint-disable-next-line no-undef
//     const height = w.innerHeight || e.clientHeight || g.clientHeight
//     yShift = height / 1.5
//   }
//
//   getYShift()
//   window.addEventListener( 'resize', getYShift )
//
//   const logoShift = new MoJs.Tween( {
//     duration : 349,
//     delay : 2790,
//     onUpdate( p ) {
//       const shiftP = MoJs.easing.cubic.in( p )
//       const scaleP = MoJs.easing.quad.in( p )
//
//       MoJs.h.setPrefixedStyle( logo, 'transform',
//         `translate(0px, ${yShift * shiftP}px)
//       scaleY(${1 + 25 * scaleP})`
//       )
//     }
//   } )
//
//   const timeline = new MoJs.Timeline( {
//     onStart() {
//       MoJs.h.setPrefixedStyle( logo, 'transform', 'none' )
//     },
//     onComplete() {
//       const modules = underlines.childModules
//       for ( let i = 0; i < modules.length; i++ ) {
//         modules[i]._hide()
//       }
//     }
//   } )
//   timeline
//     .add(
//       mCharacter, oCharacter, oCharacterInner, jCharacter, sCharacter,
//       underlines, line1, line2, line3,
//       shapes,
//       logoShift
//     )
//   // return false
//   // new MojsPlayer({ add: timeline, isPlaying: true, isRepeat: true });
//   timeline.play()
// }

const startMo = () => {
  new MoJs.Timeline().add( burst ).play()

  // const spinner = new MoJs.Shape( {
  //   parent : heart.value,
  //   shape : 'circle',
  //   stroke : '#FC46AD',
  //   strokeDasharray : '125, 125',
  //   strokeDashoffset : { 0 : '-125' },
  //   strokeWidth : 4,
  //   fill : 'none',
  //   left : '50%',
  //   top : '50%',
  //   rotate : { '-90' : '270' },
  //   radius : 20,
  //   isShowStart : true,
  //   duration : 2000,
  //   easing : 'back.in'
  // } )
  //   .then( {
  //     rotate : { '-90' : '270' },
  //     strokeDashoffset : { '-125' : '-250' },
  //     duration : 3000,
  //     easing : 'cubic.out'
  //   } )
  //
  // spinner.play()

  // mo1()
}
</script>

<style lang="scss" scoped>
.animate-section {
  position: relative;
  width: 100%;
  height: 500px;
}
.logo {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 25px;
  width: 120px;
  z-index: 2;
  margin-left: -60px;
  margin-top: -32px;
  transform-origin: 50% 0;
}
</style>
