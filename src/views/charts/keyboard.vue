<template>
  <div class="chart-container">
    <Keyboard height="100%" width="100%" />
  </div>
</template>

<script setup>
import Keyboard from './components/Keyboard'
defineOptions( {
  name : 'Keyboard'
} )
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
