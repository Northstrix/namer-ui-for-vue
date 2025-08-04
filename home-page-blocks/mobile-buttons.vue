<template>
  <div class="hero-buttons-column">
    <div
      class="button-container"
      :style="{ zIndex: hoveredButton === 0 ? 9999 : 1 }"
      @mouseenter="hoveredButton = 0"
      @mouseleave="hoveredButton = null"
    >
      <SparklyButton
        @click="onGetStartedClick"
        githubLink="https://github.com/Northstrix/namer-ui-for-vue"
        :hue="249"
        borderRadius="100px"
        fontSize="1.1rem"
        :iconSize="22"
        :iconStrokeWidth="2"
        iconGap="0.42em"
        separatorMargin="0 0.76em"
        separatorColor="#aaa"
        separatorWidth="2px"
        shadowColor="#7664fc"
        mobileFontSize="1rem"
        :mobileIconSize="18"
        :mobileIconStrokeWidth="1.7"
        :desktopThreshold="1536"
      />
    </div>
    <div
      class="button-container"
      :style="{ zIndex: hoveredButton === 1 ? 9999 : 1 }"
      @mouseenter="hoveredButton = 1"
      @mouseleave="hoveredButton = null"
    >
      <StargazingButton
        githubLink="https://github.com/Northstrix/namer-ui-for-vue"
        :hue="219"
        borderRadius="100px"
        fontSize="1.1rem"
        :iconSize="22"
        :iconStrokeWidth="2"
        iconGap="0.42em"
        separatorMargin="0 0.76em"
        separatorColor="#aaa"
        separatorWidth="2px"
        shadowColor="#4776cb"
        mobileFontSize="1rem"
        :mobileIconSize="18"
        :mobileIconStrokeWidth="1.7"
        :desktopThreshold="1536"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SparklyButton from '../home-page-blocks/SparklyButton.vue'
import StargazingButton from '../components/namer-ui/stargazing-button/StargazingButton.vue'

const hoveredButton = ref<number|null>(null)
const router = useRouter()

function onGetStartedClick(ev: MouseEvent) {
  // Emit event if parent listens
  // (If you want to emit to parent, use defineEmits and emit here)
  router.push('/components')
}
</script>

<style scoped>
.hero-buttons-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}
.button-container {
  position: relative;
  transition: z-index 0.1s;
}
</style>
