<template>
  <div class="app-root">
    <div
      class="content-container"
      :style="{ paddingLeft: isMobile ? '10px' : '24px', paddingRight: isMobile ? '10px' : '24px' }"
    >
      <TruncatingNavbar
        icon="/logo.png"
        appName="Namer UI"
        :routes="routes"
        homeRoute="/"
        scrolledBg="#151419"
        outlineColor="#403d4d"
        @open-search="openSearch"
      />
      <div style="height: 40px"></div>

      <!-- Displays the current page component -->
      <NuxtPage />

      <SearchModal
        v-if="showSearchModal"
        :show="true"
        outlineColor="#403d4d"
        @close="closeSearch"
      />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIsMobile } from './composables/useIsMobile'
import TruncatingNavbar from './components/namer-ui/truncating-navbar/TruncatingNavbar.vue'
import SearchModal from './components/SearchModal.vue'
import Footer from './components/Footer.vue'

const { isMobile } = useIsMobile()
const routes = [
  { name: 'Components', link: '/components', external: false },
  { name: 'Next.js Components', link: 'https://namer-ui.netlify.app/', external: true },
  { name: 'Showcase', link: '/showcase', external: false },
]

const showSearchModal = ref(false)
function openSearch() {
  showSearchModal.value = true
}
function closeSearch() {
  showSearchModal.value = false
}
</script>

<style scoped>
/*
<template>
  <div class="app-root">
      <InitAnalyticsMetrics />
  </div>
</template>

<script setup lang="ts">

import InitAnalyticsMetrics from './components/InitAnalyticsMetrics.vue'

</script>
*/
.app-root {
  /* Example styling */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-container {
  flex-grow: 1;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
