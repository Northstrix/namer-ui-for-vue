<script setup lang="ts">
import SubmitCard from '../../components/namer-ui/submit-card/SubmitCard.vue'
</script>

<template>
  <section
    class="showcase-section"
  >
    <h2 class="component-title">Showcase</h2>
    <p class="component-desc">
      Discover the projects that leverage the Namer UI components.
    </p>

    <div class="cards-grid">
      <SubmitCard
        link="https://clandestine-beauty-salon-landing-page.netlify.app/"
        title="Clandestine"
        description="A modern beauty salon landing page template featuring an appointment reservation UI and multilingual support."
        imageSrc="https://github.com/Northstrix/namer-ui/blob/main/public/showcase/clandestine.webp?raw=true"
        backgroundColor="#111014"
        cardBorderColor="#312f3b"
        innerAreaBorderColor="#312f3b"
        innerAreaBgColor="#000"
        squareBgColor="#fff"
        :isRTL="false"
      />

      <SubmitCard
        link="https://blueberry-loom-form-loader.netlify.app/form/bWF4aW0uYm9ydC5kZXZlbEBnbWFpbC5jb20=/Far247Squ6?key=Im5uylqLi3BwlN909sLP1Y3vY6nRwMixa8D6BGpj6Uz5B4b9OO)YZSyKWvCGeX65a6Yfsc2ZdUAEWrue3FXDDg=="
        title="Submit Your Project"
        description="Made a project that uses at least one Namer UI component? Submit it now for a chance to get featured on this page!"
        backgroundColor="#111014"
        cardBorderColor="#312f3b"
        innerAreaBorderColor="#312f3b"
        innerAreaBgColor="#18161c"
        :isRTL="false"
      />

      <!-- Optional placeholders to maintain column spacing -->
      <div class="card-placeholder"></div>
      <div class="card-placeholder"></div>
      <div class="card-placeholder"></div>
    </div>
  </section>
</template>

<style scoped>
.showcase-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: calc(100vh - 104px);
  width: 100%;
  box-sizing: border-box;
}

.component-title {
  color: #fff;
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: -9px;
  line-height: 1.2;
  text-align: left;
  width: 100%;
}

.component-desc {
  color: #aaa;
  font-size: 1.09rem;
  margin-bottom: 32px;
  line-height: 1.5;
  text-align: left;
  width: 100%;
}

/* Responsive grid layout using vanilla CSS only */
.cards-grid {
  display: grid;
  gap: 16px;
  width: 100%;
  max-width: 1280px;
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 800px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1142px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Invisible placeholders fill gaps to preserve layout spacing */
.card-placeholder {
  visibility: hidden;
}
</style>
