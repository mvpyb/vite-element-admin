<template>
  <div class="chart-container">
    <LineMarker height="100%" width="100%" />
  </div>
</template>

<script setup>
import LineMarker from './components/LineMarker'
defineOptions( {
  name : 'Line'
} )
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
