<template>
  <div class="chart-container">
    <Lines3D height="100%" width="100%" />
  </div>
</template>

<script setup>
import Lines3D from './components/Lines3D'
defineOptions( {
  name : 'Lines3D'
} )
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
