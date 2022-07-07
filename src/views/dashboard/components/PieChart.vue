<template>
  <div :class="props.className" :style="{ height: props.height, width: props.width }" ref="container" />
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps( {
  className : {
    type : String,
    default : 'chart'
  },
  width : {
    type : String,
    default : '100%'
  },
  height : {
    type : String,
    default : '300px'
  }
} )

const chart = ref( null )
const container = ref( null )

const initChart = () => {
  chart.value = echarts.init( container.value )
  chart.value.setOption( {
    tooltip : {
      trigger : 'item',
      formatter : '{a} <br/>{b} : {c} ({d}%)'
    },
    legend : {
      left : 'center',
      bottom : '10',
      data : ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
    },
    series : [
      {
        name : 'WEEKLY WRITE ARTICLES',
        type : 'pie',
        roseType : 'radius',
        radius : [15, 95],
        center : ['50%', '38%'],
        data : [
          { value : 320, name : 'Industries' },
          { value : 240, name : 'Technology' },
          { value : 149, name : 'Forex' },
          { value : 100, name : 'Gold' },
          { value : 59, name : 'Forecasts' }
        ],
        animationEasing : 'cubicInOut',
        animationDuration : 2600
      }
    ]
  } )
}

onMounted( () => {
  nextTick( () => {
    initChart()
  } )
} )
onBeforeUnmount( () => {
  if ( !chart.value ) {
    return
  }
  chart.value.dispose()
  chart.value = null
} )

defineOptions( {
  name : 'BarChart'
} )
</script>
