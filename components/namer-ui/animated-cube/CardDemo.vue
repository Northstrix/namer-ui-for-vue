<script setup lang="ts">
import AnimatedCube from './AnimatedCube.vue'
</script>

<template>
  <div 
    style="width: 100%; height: 100%; background: #fff; display: flex; justify-content: center; align-items: center;"
  >
    <div style="display: flex; justify-content: center; align-items: center;">
      <AnimatedCube
        :size="38"
        :scale="1.7"
        faceColor="#7dd3fc"
        shadowColor="#0e7490"
        borderColor="#0ea5e9"
        :animationDuration="2.75"
      />
    </div>
  </div>
</template>
