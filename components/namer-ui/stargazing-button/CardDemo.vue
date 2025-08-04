<template>
  <div
    style="width: 100%; height: 100%; background: #fff; display: flex; justify-content: center; align-items: center; box-sizing: border-box; overflow: hidden;"
  >
    <div
      style="width: 100%; max-width: 600px; transform: scale(0.82); transform-origin: center center; position: relative; z-index: 1;"
    >
      <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
        <StargazingButton
          githubLink="https://github.com/Northstrix/Midbar"
          :hue="98"
          borderRadius="100px"
          fontSize="1.5rem"
          :iconSize="28"
          :iconStrokeWidth="2.4"
          iconGap="0.42em"
          separatorMargin="0 0.76em"
          separatorColor="#6cc606"
          separatorWidth="2px"
          shadowColor="#6cc606"
          mobileFontSize="1.1rem"
          :mobileIconSize="20"
          :mobileIconStrokeWidth="1.9"
          :desktopThreshold="1536"
          :disableClick="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StargazingButton from './StargazingButton.vue'
</script>

<style scoped>
/* No extra CSS needed */
</style>
