<template>
  <div :class="props.className" :style="{ height: props.height, width: props.width }" ref="container" />
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'

const animationDuration = 6000
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
      trigger : 'axis',
      axisPointer : {
        // 坐标轴指示器，坐标轴触发有效
        type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid : {
      top : 10,
      left : '2%',
      right : '2%',
      bottom : '3%',
      containLabel : true
    },
    xAxis : [
      {
        type : 'category',
        data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick : {
          alignWithLabel : true
        }
      }
    ],
    yAxis : [
      {
        type : 'value',
        axisTick : {
          show : false
        }
      }
    ],
    series : [
      {
        name : 'pageA',
        type : 'bar',
        stack : 'vistors',
        barWidth : '60%',
        data : [79, 52, 200, 334, 390, 330, 220],
        animationDuration
      },
      {
        name : 'pageB',
        type : 'bar',
        stack : 'vistors',
        barWidth : '60%',
        data : [80, 52, 200, 334, 390, 330, 220],
        animationDuration
      },
      {
        name : 'pageC',
        type : 'bar',
        stack : 'vistors',
        barWidth : '60%',
        data : [30, 52, 200, 334, 390, 330, 220],
        animationDuration
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
