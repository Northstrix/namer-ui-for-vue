<template>
  <div
    style="width: 100%; height: 100vh; background: #fff; display: flex; justify-content: center; align-items: center; overflow: hidden;"
  >
    <div class="app-container">
      <div class="demo-section spiral-wrapper">
          <Spiral
            spiralColor="71, 118, 203"
            :defaultDistortion="1"
            :hoverDistortion="4.4"
            :clickDistortion="5"
            :strokeWidth="2.7"
          />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Spiral from './Spiral.vue'
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  overflow: visible; /* disable scroll */
}

.demo-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Scale spiral container to 0.6 and center */
.spiral-wrapper {
  width: 100%;
  max-width: 400px; /* optional max width to control size */
  aspect-ratio: 1 / 1;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.86);
  transform-origin: center center;
}
</style>
