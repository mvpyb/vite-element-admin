<template>
  <div class="chart-container">
    <MixChart height="100%" width="100%" />
  </div>
</template>

<script setup>
import MixChart from './components/MixChart.vue'
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
