<template>
  <div id="map" class="map" />
</template>

<script setup>
import { onMounted } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import GeoJSON from 'ol/format/GeoJSON'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'
import { OSM, Vector as VectorSource } from 'ol/source'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'

// doc      : https://openlayers.org/en/latest/doc/quickstart.html
// examples : https://openlayers.org/en/latest/examples/

const source = new VectorSource( {
  url : 'https://openlayers.org/en/latest/examples/data/geojson/switzerland.geojson',
  format : new GeoJSON()
} )
const style = new Style( {
  fill : new Fill( {
    color : 'rgba(255, 255, 255, 0.6)'
  } ),
  stroke : new Stroke( {
    color : '#319FD3',
    width : 1
  } ),
  image : new CircleStyle( {
    radius : 5,
    fill : new Fill( {
      color : 'rgba(255, 255, 255, 0.6)'
    } ),
    stroke : new Stroke( {
      color : '#319FD3',
      width : 1
    } )
  } )
} )
const vectorLayer = new VectorLayer( {
  source,
  style
} )
const view = new View( {
  center : [0, 0],
  zoom : 4
} )

// 初始化地图
function initMap() {
  // eslint-disable-next-line no-new
  new Map( {
    target : 'map',
    layers : [
      new TileLayer( {
        source : new OSM()
      } ),
      vectorLayer
    ],
    view
  } )
}

// 设置显示到某一区域 - 定位放大到瑞士
// eslint-disable-next-line no-unused-vars
function focusArea() {
  const feature = source.getFeatures()[0]
  const polygon = feature.getGeometry()
  view.fit( polygon, { padding : [170, 50, 30, 150] } )
}

onMounted( () => {
  initMap()
} )
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>
