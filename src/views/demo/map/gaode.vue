<template>
  <yu-layout title="高德地图" subtitle="高德地图的简单使用">
    <template #body>
      <div class="section-container">
        <div id="container" ref="container"></div>
      </div>
    </template>
  </yu-layout>
</template>

<script setup>
// 文档 ： https://lbs.amap.com/api/jsapi-v2/guide/overlays/vector-overlay
import { ref, onMounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import YuLayout from '/@/components/YuLayout'

const container = ref()
const ak = '5dc1bd09758a3d8eaafa4a8e5800e29c'
const options = {
  key : ak,
  version : '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  plugins : ['AMap.MarkerCluster'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  AMapUI : {
    // 是否加载 AMapUI，缺省不加载
    version : '1.1', // AMapUI 缺省 1.1
    plugins : [] // 需要加载的 AMapUI ui插件
  },
  Loca : {
    // 是否加载 Loca， 缺省不加载
    version : '2.0.0' // Loca 版本，缺省 1.3.2
  }
}
const addMark = async( map ) => {
  // eslint-disable-next-line no-undef
  const marker = new AMap.Marker( {
    // eslint-disable-next-line no-undef
    position : new AMap.LngLat( 116.39, 39.9 ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    title : '北京'
  } )
  map.add( marker )
  // map.add( [ marker ] )
}

// 添加自定义标记
const customMark = async( map ) => {
  // eslint-disable-next-line no-undef
  const marker = new AMap.Marker( {
    // eslint-disable-next-line no-undef
    position : new AMap.LngLat( 116.39, 39.9 ),
    // eslint-disable-next-line no-undef
    offset : new AMap.Pixel( -10, -10 ),
    icon : '//vdata.amap.com/icons/b18/1/2.png', // 添加 Icon 图标 URL
    title : '北京'
  } )
  map.add( marker )
}

// 添加样式调试工具
// eslint-disable-next-line no-unused-vars
const addConsole = async() => {
  // 创建圆点图层
  // eslint-disable-next-line no-undef
  var pointLayer = new Loca.PointLayer( {
    zIndex : 10,
    opacity : 1,
    visible : true,
    blend : 'lighter'
  } )

  // 创建数据源
  // eslint-disable-next-line no-undef
  var dataSource = new Loca.GeoJSONSource( {
    // url: 'xxx.geojson', 或者使用 data 字段
    data : {
      type : 'FeatureCollection',
      features : [
        {
          type : 'Feature',
          properties : {},
          geometry : {
            type : 'Point',
            coordinates : [116.40014, 39.909736]
          }
        }
      ]
    }
  } )

  // 图层添加数据
  pointLayer.setSource( dataSource )

  // 设置样式
  pointLayer.setStyle( {
    radius : 30,
    color : 'red',
    borderWidth : 10,
    borderColor : '#fff',
    unit : 'px'
  } )

  // 添加到地图上
  // eslint-disable-next-line no-undef
  loca.add( pointLayer )

  // eslint-disable-next-line no-undef
  const dat = new Loca.Dat()
  dat.addLayer( pointLayer, '示例的点图层' )
}

onMounted( () => {
  AMapLoader.load( options )
    .then( async( AMap ) => {
      const map = new AMap.Map( container.value, {
        zoom : 12, // 级别
        center : [116.397428, 39.90923], // 中心点坐标
        pitch : 0, // 地图俯仰角度，有效范围 0 度- 83 度
        viewMode : '3D' // 使用3D视图
      } )
      await addMark( map )
      await customMark( map )
    } )
    .catch( ( e ) => {
      console.log( e )
    } )
} )
</script>

<style lang="scss" scoped>
.info {
  height: 30px;
  line-height: 30px;
}
#container {
  width: 100vw;
  height: calc(100vh - 120px);
}
</style>
