<script setup lang="ts">
import StargazingButton from './StargazingButton.vue'
</script>

<template>
  <div style="display: flex; align-items: center; justify-content: center">
    <StargazingButton
      githubLink="https://github.com/Northstrix/Midbar"
      :hue="249"
      borderRadius="100px"
      fontSize="1.5rem"
      :iconSize="28"
      :iconStrokeWidth="2.4"
      iconGap="0.42em"
      separatorMargin="0 0.76em"
      separatorColor="#aaa"
      separatorWidth="2px"
      shadowColor="#7664fc"
      mobileFontSize="1.1rem"
      :mobileIconSize="20"
      :mobileIconStrokeWidth="1.9"
      :desktopThreshold="1536"
    />
  </div>
</template>
