<template>
  <div class="demo-wrapper">
    <div class="cards-stack">
      <!-- Standard Card -->
      <HolographicCard
        :width="316"
        :height="448"
        image-src="https://github.com/Northstrix/my-portfolio/blob/main/public/fourth-playground-card-image.jpg?raw=true"
        top-text="旅"
        bottom-text="創世"
      />

      <!-- Customized Card -->
      <HolographicCard
        id="card-2"
        :width="316"
        :height="448"
        image-src="https://github.com/Northstrix/my-portfolio/blob/main/public/playground-card-image.webp?raw=true"
        top-text="洪秀全"
        bottom-text="洪秀全"
        top-text-letter-spacing="0.375rem"
        bottom-text-letter-spacing="0.375rem"
        :max-image-width-pct="0.64"
        top-text-color="#8E5BEE"
        bottom-text-color="#8E5BEE"
        electric-color="#8E5BEE"
        hover-electric-color="#E95FF6"
        background-color="#fff"
        :pattern-size="12.06"
        :pattern-dot-size="1.75"
      />

      <!-- RTL & Horizontal Text Card -->
      <HolographicCard
        id="card-3"
        :width="316"
        :height="448"
        image-src="https://github.com/Northstrix/my-portfolio/blob/main/public/third-playground-card-image.png?raw=true"
        top-text="נמר"
        bottom-text="Namer"
        top-text-letter-spacing="0.0175rem"
        bottom-text-letter-spacing="0.0175rem"
        text-overlay-padding="1.125rem 1.375rem"
        :max-image-width-pct="0.54"
        top-text-color="#5F73FB"
        bottom-text-color="#5F73FB"
        electric-color="#5F73FB"
        hover-electric-color="#5FA4FB"
        :top-text-vertical="false"
        :bottom-text-vertical="false"
        :mirror-bottom-text="false"
        isRTL
      />
    </div>
  </div>
</template>

<script setup>
import HolographicCard from './HolographicCard.vue';
</script>

<style scoped>
.demo-wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: #050505;
  display: flex;
  justify-content: center;
  padding: 80px 0;
}

.cards-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px; /* Large gap between cards vertically */
  padding: 0;
}
</style>