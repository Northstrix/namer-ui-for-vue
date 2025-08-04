<script setup lang="ts">
import AnimatedCube from './AnimatedCube.vue'
</script>

<template>
  <div style="display: flex; justify-content: center;">
    <AnimatedCube
      :size="50"
      :scale="1.5"
      faceColor="#7dd3fc"
      shadowColor="#0e7490"
      borderColor="#0ea5e9"
      :animationDuration="2.75"
    />
  </div>
</template>
