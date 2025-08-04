<template>
  <div class="demo-wrapper">
    <!-- English loader -->
    <PingPongLoader
      message="Loading form..."
      backgroundColor="#0a0a0a"
      gridColor="#2e2e2e"
      adjacentHandleColor="#00a0d8"
      handleBallColor="#ffffff"
      borderColor="#363636"
      textColor="#ffffff"
      borderRadius="0px"
      dotBorderRadius="0px"
      style="width: 240px;"
    />

    <PingPongLoader
      message="טוען טופס..."
      backgroundColor="#16151a"
      gridColor="#2e2d38"
      adjacentHandleColor="#8506A9"
      handleBallColor="#ffffff"
      borderColor="#3a3846"
      textColor="#aaa"
      borderRadius="24px"
      borderWidth="3px"
    />
  </div>
</template>

<script setup lang="ts">
import PingPongLoader from './PingPongLoader.vue';
</script>

<style scoped>
.demo-wrapper {
  display: flex;
  flex-wrap: wrap; /* allow wrapping if not enough space */
  gap: 24px;        /* vertical and horizontal gap */
  justify-content: center; /* center horizontally */
  user-select: none;
  padding: 24px 0;
}
</style>
