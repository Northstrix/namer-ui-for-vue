<template>
  <div
    style="width: 100%; height: 100%; background: #fff; display: flex; justify-content: center; align-items: center; padding: 2rem; box-sizing: border-box; overflow: hidden;"
  >
    <SpaceButton
      inscription="Outer Space"
      variant="outer"
      @click="showMessage"
    />
  </div>
</template>

<script setup lang="ts">
import SpaceButton from './SpaceButton.vue'

function showMessage() {
  // No toast, no output – do nothing on click as requested
}
</script>