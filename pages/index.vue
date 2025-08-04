<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import DesktopHero from '~/home-page-blocks/desktop-hero.vue'
import MobileHero from '~/home-page-blocks/mobile-hero.vue'
import MobileButtons from '~/home-page-blocks/mobile-buttons.vue'
import ProjectShowcase from '~/home-page-blocks/project-showcase.vue'
import CircularTestimonialsBlock from '~/home-page-blocks/circular-testimonials.vue'
import ExploreButton from '~/home-page-blocks/explore-button.vue'
import PlayingCard from '~/components/namer-ui/playing-card/PlayingCard.vue'
import ShamayimToggleSwitch from '~/components/namer-ui/shamayim-toggle-switch/ShamayimToggleSwitch.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const width = ref(window.innerWidth)

function onResize() {
  width.value = window.innerWidth
  nextTick(() => updatePlayingCardHeight())
}

onMounted(() => {
  window.addEventListener('resize', onResize)
  nextTick(() => updatePlayingCardHeight())
})
onBeforeUnmount(() => window.removeEventListener('resize', onResize))

// Responsive display logic
const showDesktopHero = computed(() => width.value >= 1280)
const showMobileButtons = computed(() => width.value < 600)
const showProjectShowcase = computed(() => width.value >= 1194)
const showCircularTestimonials = computed(() => width.value >= 1056)

// Special container display logic
const showSpecialContainer = computed(() => width.value <= 768 && width.value >= 546)
const showPlayingCardOnly = computed(() => width.value < 546)

// Dynamic gap and proportions
function lerp(x: number, x0: number, x1: number, y0: number, y1: number) {
  if (x <= x0) return y0
  if (x >= x1) return y1
  return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0)
}
const dynamicGap = computed(() =>
  width.value <= 546
    ? 10
    : width.value >= 768
    ? 14
    : lerp(width.value, 546, 768, 10, 14)
)
const playingCardWidthPercent = computed(() => {
  if (width.value < 546) return 100
  if (width.value >= 768) return 50
  return lerp(width.value, 546, 768, 64, 50)
})
const shamayimWidthPercent = computed(() => {
  if (width.value < 546) return 0
  if (width.value >= 768) return 50
  return lerp(width.value, 546, 768, 36, 50)
})
const containerPadding = computed(
  () => lerp(width.value, 546, 768, 10, 12) + 'px'
)

// PlayingCard height measurement
const playingCardWrapperRef = ref<HTMLElement | null>(null)
const playingCardHeight = ref<number>(0)
function updatePlayingCardHeight() {
  if (playingCardWrapperRef.value) {
    playingCardHeight.value = playingCardWrapperRef.value.getBoundingClientRect().height
  }
}
// Watch for width changes to update height
watch(width, () => nextTick(() => updatePlayingCardHeight()))
const shamayimHeight = computed(() => playingCardHeight.value)

// Navigation handlers
function goToPlayingCard() {
  router.push('/components/playing-card')
}
function onShamayimSwitch() {
  router.push('/components/shamayim-toggle-switch')
}
</script>

<template>
  <div>
    <DesktopHero v-if="showDesktopHero" />
    <MobileHero v-else />
    <MobileButtons v-if="showMobileButtons" />

    <!-- Special responsive row under MobileButtons -->
    <div
      v-if="showSpecialContainer"
      class="special-flex-row"
      :style="{
        padding: containerPadding,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        gap: dynamicGap + 'px',
        margin: '28px 0 0 0',
        alignItems: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'transparent',
        border: 'none'
      }"
    >
      <!-- PlayingCard: transparent wrapper for height measurement -->
      <div
        class="playing-card-container"
        :style="{
          flex: '1 1 0',
          minWidth: '0',
          maxWidth: '340px',
          width: playingCardWidthPercent + '%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outlineOffset: '0px',
          boxSizing: 'border-box',
          background: 'transparent'
        }"
        ref="playingCardWrapperRef"
      >
        <PlayingCard
          :componentWidth="'100%'"
          :aspectRatio="'3/4'"
          outerRounding="8px"
          innerRounding="8px"
          backgroundColor="#FFF"
          foregroundColor="#000"
          :imageHeightPercentage="70"
          imageSrc="https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/playground-card-image.webp"
          imageAlt=""
          outlineColor="#ddd"
          hoverOutlineColor="#aaa"
          :textArray="['洪', '秀', '全']"
          :minWidth="120"
          :maxWidth="340"
          :minTextSize="16"
          :maxTextSize="24"
          verticalPadding="16px"
          horizontalPadding="16px"
          :manualLetterSpacing="6"
          componentId="card-1"
          :onCardClicked="goToPlayingCard"
          textColorTransitionDelay="1s"
          textColorTransitionDuration="2.4s"
          style="cursor:pointer"
        />
      </div>
      <!-- ShamayimToggleSwitch: matches card height, gradient background, scaled toggle -->
      <div
        class="shamayim-container"
        :style="{
          flex: '1 1 0',
          minWidth: '0',
          maxWidth: '340px',
          width: shamayimWidthPercent + '%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          backgroundImage: 'linear-gradient(45deg, #47b6d1, #90e0ec)',
          outline: '1px solid #47b6d1',
          outlineOffset: '0px',
          boxSizing: 'border-box',
          height: shamayimHeight + 'px',
          transition: 'height 0.2s',
          overflow: 'hidden'
        }"
      >
        <div style="width: 100%; display: flex; align-items: center; justify-content: center;">
          <div style="transform: scale(1.75); width: 100%; display: flex; justify-content: center;">
            <ShamayimToggleSwitch
              :default-state="false"
              :onChange="onShamayimSwitch"
              :style="{ height: shamayimHeight + 'px', width: '100%', background: 'transparent' }"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Only PlayingCard for widths < 546px -->
    <div
      v-else-if="showPlayingCardOnly"
      class="playing-card-only-row"
      :style="{
        padding: containerPadding,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        gap: '0px',
        margin: '28px 0 0 0',
        alignItems: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'transparent',
        border: 'none'
      }"
    >
      <div
        class="playing-card-container"
        :style="{
          flex: '1 1 0',
          minWidth: '0',
          maxWidth: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outlineOffset: '0px',
          boxSizing: 'border-box',
          background: 'transparent'
        }"
        ref="playingCardWrapperRef"
      >
        <PlayingCard
          :componentWidth="'100%'"
          :aspectRatio="'3/4'"
          outerRounding="8px"
          innerRounding="8px"
          backgroundColor="#FFF"
          foregroundColor="#000"
          :imageHeightPercentage="70"
          imageSrc="https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/playground-card-image.webp"
          imageAlt=""
          outlineColor="#ddd"
          hoverOutlineColor="#aaa"
          :textArray="['洪', '秀', '全']"
          :minWidth="120"
          :maxWidth="340"
          :minTextSize="16"
          :maxTextSize="24"
          verticalPadding="16px"
          horizontalPadding="16px"
          :manualLetterSpacing="6"
          componentId="card-1"
          :onCardClicked="goToPlayingCard"
          textColorTransitionDelay="1s"
          textColorTransitionDuration="2.4s"
          style="cursor:pointer"
        />
      </div>
    </div>

    <ProjectShowcase v-if="showProjectShowcase" />
    <CircularTestimonialsBlock v-if="showCircularTestimonials" />
    <ExploreButton />
  </div>
</template>

<style scoped>
.special-flex-row {
  box-sizing: border-box;
  overflow: hidden;
}
@media (max-width: 768px) {
  .special-flex-row {
    flex-direction: row !important;
  }
  .playing-card-container,
  .shamayim-container {
    min-width: 0 !important;
    max-width: 100% !important;
  }
}
@media (max-width: 546px) {
  .special-flex-row,
  .playing-card-only-row {
    gap: 0 !important;
  }
  .playing-card-container {
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
  }
  .shamayim-container {
    display: none !important;
  }
}
</style>