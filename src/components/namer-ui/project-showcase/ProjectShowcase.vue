<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import gsap from 'gsap'
import HalomotButton from '../halomot-button/HalomotButton.vue'

type Testimonial = {
  quote: string
  name: string
  designation: string
  src: string
  link?: string
}

const props = defineProps<{
  testimonials: Testimonial[]
  autoplay?: boolean
  colors?: { name?: string; position?: string; testimony?: string }
  fontSizes?: { name?: string; position?: string; testimony?: string }
  spacing?: {
    top?: string
    bottom?: string
    lineHeight?: string
    nameTop?: string
    nameBottom?: string
    positionTop?: string
    positionBottom?: string
    testimonyTop?: string
    testimonyBottom?: string
  }
  imageAspectRatio?: number
  isRTL?: boolean
  onItemClick?: (link: string) => void
  outerRounding?: string
  innerRounding?: string
  outlineColor?: string
  hoverOutlineColor?: string
  buttonInscriptions?: {
    previousButton: string
    nextButton: string
    openWebAppButton: string
  }
  halomotButtonGradient?: string
  halomotButtonBackground?: string
  halomotButtonTextColor?: string
  halomotButtonOuterBorderRadius?: string
  halomotButtonInnerBorderRadius?: string
  halomotButtonHoverTextColor?: string
}>()

const {
  testimonials,
  autoplay = false,
  colors = { name: "#fff", position: "#999", testimony: "#ccc" },
  fontSizes = { name: "28px", position: "20px", testimony: "20px" },
  spacing = {
    top: "20",
    bottom: "20",
    lineHeight: "1.5",
    nameTop: "0",
    nameBottom: "10px",
    positionTop: "0",
    positionBottom: "0.5em",
    testimonyTop: "1.24em",
    testimonyBottom: "1em"
  },
  imageAspectRatio = 1.37,
  isRTL = false,
  onItemClick,
  outerRounding = "18.2px",
  innerRounding = "18px",
  outlineColor = "#33313d",
  hoverOutlineColor = "#403d4d",
  buttonInscriptions = {
    previousButton: "Prev.",
    nextButton: "Next",
    openWebAppButton: "Open Web App"
  },
  halomotButtonGradient = "linear-gradient(to right, #a123f4, #603dec)",
  halomotButtonBackground = "#111014",
  halomotButtonTextColor = "#fff",
  halomotButtonOuterBorderRadius = "6.34px",
  halomotButtonInnerBorderRadius = "6px",
  halomotButtonHoverTextColor
} = props

const active = ref(0)
const nextActive = ref(0)
const showImage = ref(true)
const transitionDirection = ref<'next' | 'prev'>('next')
const hoveredImage = ref<number | null>(null)
const imageContainerKey = ref(0)
const simulatedHover = ref(false)
let autoplayInterval: ReturnType<typeof setInterval> | null = null
let hoverTimeout: ReturnType<typeof setTimeout> | null = null

function handleNext() {
  transitionDirection.value = 'next'
  nextActive.value = (active.value + 1) % testimonials.length
  showImage.value = false
  stopAutoplay()
}
function handlePrev() {
  transitionDirection.value = 'prev'
  nextActive.value = (active.value - 1 + testimonials.length) % testimonials.length
  showImage.value = false
  stopAutoplay()
}
function stopAutoplay() {
  if (autoplayInterval) clearInterval(autoplayInterval)
}
function calculateGap(width: number) {
  const minWidth = 1024, maxWidth = 1456, minGap = 30, maxGap = 42
  if (width <= minWidth) return minGap
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth))
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
}

// --- IMAGE TRANSITION HOOKS ---
// FIXED: Make x direction RTL-aware
function getImageTransitionX(dir: 'next' | 'prev', rtl: boolean) {
  // For LTR: next = -40, prev = 40
  // For RTL: next = 40, prev = -40
  if (!rtl) {
    return dir === 'next' ? -40 : 40
  } else {
    return dir === 'next' ? 40 : -40
  }
}
function beforeEnterImage(el: Element) {
  const dir = transitionDirection.value
  const x = getImageTransitionX(dir, isRTL)
  gsap.set(el, { opacity: 0, scale: 0.92, x, filter: "blur(16px)" })
}
function enterImage(el: Element, done: () => void) {
  gsap.to(el, {
    opacity: 1,
    scale: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 0.7,
    ease: "power2.out",
    onComplete: done
  })
}
function leaveImage(el: Element, done: () => void) {
  const dir = transitionDirection.value
  const x = getImageTransitionX(dir === 'next' ? 'prev' : 'next', isRTL)
  gsap.to(el, {
    opacity: 0,
    scale: 0.92,
    x,
    filter: "blur(16px)",
    duration: 0.5,
    ease: "power2.in",
    onComplete: done
  })
}

// --- TEXT TRANSITION HOOKS (SWAPPED) ---
function beforeEnterText(el: Element) {
  const dir = transitionDirection.value
  const y = (dir === 'next') ? -30 : 30 // swapped
  gsap.set(el, { opacity: 0, y })
  const words = el.querySelectorAll('.showcase-word')
  const wordY = (dir === 'next') ? -10 : 10 // swapped
  gsap.set(words, { filter: "blur(14px)", opacity: 0, y: wordY })
}
function enterText(el: Element, done: () => void) {
  gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
  const words = el.querySelectorAll('.showcase-word')
  gsap.to(words, {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
    stagger: 0.018,
    duration: 0.22,
    ease: "power2.out",
    delay: 0.16,
    onComplete: done
  })
}
function leaveText(el: Element, done: () => void) {
  const dir = transitionDirection.value
  const y = (dir === 'next') ? 30 : -30 // swapped
  gsap.to(el, { opacity: 0, y, duration: 0.4, ease: "power2.in" })
  const words = el.querySelectorAll('.showcase-word')
  const wordY = (dir === 'next') ? 10 : -10 // swapped
  gsap.to(words, {
    opacity: 0,
    y: wordY,
    filter: "blur(14px)",
    stagger: 0.012,
    duration: 0.18,
    ease: "power2.in",
    onComplete: done
  })
}

// --- RERENDER IMAGE CONTAINER AND SIMULATE HOVER ---
async function onAfterLeaveImage() {
  active.value = nextActive.value
  await nextTick()
  showImage.value = true
  imageContainerKey.value += 1 // force rerender[6][1]
  await nextTick()
  simulatedHover.value = true
  if (hoverTimeout) clearTimeout(hoverTimeout)
  hoverTimeout = setTimeout(() => {
    simulatedHover.value = false
  }, 120) // 120ms simulated hover
}

onMounted(() => {
  if (autoplay) {
    autoplayInterval = setInterval(() => {
      handleNext()
    }, 5000)
  }
})
</script>

<template>
  <div
    class="project-showcase-root"
    :style="{
      lineHeight: spacing.lineHeight,
      backgroundColor: 'transparent',
      direction: isRTL ? 'rtl' : 'ltr',
      paddingTop: spacing.top + 'px',
      paddingBottom: spacing.bottom + 'px'
    }"
  >
    <div
      class="project-showcase-grid"
      :style="{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: calculateGap(1456) + 'px'
      }"
    >
      <div class="project-showcase-image-col">
        <div class="project-showcase-image-wrapper" :style="{ paddingTop: (1 / imageAspectRatio) * 100 + '%' }">
          <Transition
            mode="out-in"
            @before-enter="beforeEnterImage"
            @enter="enterImage"
            @leave="leaveImage"
            @after-leave="onAfterLeaveImage"
          >
            <div
              v-if="showImage"
              :key="testimonials[active].src"
              class="project-showcase-image-abs"
              :style="{ zIndex: 1 }"
            >
              <div
                :key="imageContainerKey"
                class="showcase-img-container"
                :class="{ 'outline-hovered': hoveredImage === active || simulatedHover }"
                :style="{
                  borderRadius: outerRounding,
                  padding: '1px',
                  backgroundColor: (hoveredImage === active || simulatedHover) ? hoverOutlineColor : outlineColor,
                  transition: 'background-color 0.3s ease-in-out',
                  height: '100%',
                  width: '100%'
                }"
                @mouseenter="hoveredImage = active"
                @mouseleave="hoveredImage = null"
              >
                <div
                  class="showcase-img-inner"
                  :style="{
                    borderRadius: innerRounding,
                    overflow: 'hidden',
                    height: '100%',
                    width: '100%'
                  }"
                >
                  <img
                    :src="testimonials[active].src"
                    :alt="testimonials[active].name"
                    style="width: 100%; height: 100%; object-fit: cover; display: block;"
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      <div class="project-showcase-text-col">
        <Transition
          mode="out-in"
          @before-enter="beforeEnterText"
          @enter="enterText"
          @leave="leaveText"
        >
          <div class="project-showcase-text-wrap" :key="testimonials[active].name">
            <h3
              class="project-showcase-name"
              :style="{
                fontSize: fontSizes.name,
                color: colors.name,
                marginTop: spacing.nameTop,
                marginBottom: spacing.nameBottom,
                textAlign: isRTL ? 'right' : undefined
              }"
            >
              {{ testimonials[active].name }}
            </h3>
            <p
              class="project-showcase-position"
              :style="{
                fontSize: fontSizes.position,
                color: colors.position,
                marginTop: spacing.positionTop,
                marginBottom: spacing.positionBottom,
                textAlign: isRTL ? 'right' : undefined
              }"
            >
              {{ testimonials[active].designation }}
            </p>
            <p
              class="project-showcase-quote"
              :style="{
                fontSize: fontSizes.testimony,
                color: colors.testimony,
                marginTop: spacing.testimonyTop,
                marginBottom: spacing.testimonyBottom,
                textAlign: isRTL ? 'right' : undefined
              }"
            >
              <span
                v-for="(word, i) in testimonials[active].quote.split(' ')"
                :key="i"
                class="showcase-word"
                :style="{ display: 'inline-block' }"
              >{{ word }}&nbsp;</span>
            </p>
          </div>
        </Transition>
        <div class="project-showcase-buttons">
          <HalomotButton
            :inscription="buttonInscriptions.previousButton"
            @click="handlePrev"
            fixedWidth="172px"
            :gradient="halomotButtonGradient"
            :backgroundColor="halomotButtonBackground"
            :textColor="halomotButtonTextColor"
            :innerBorderRadius="halomotButtonInnerBorderRadius"
            :outerBorderRadius="halomotButtonOuterBorderRadius"
            :hoverTextColor="halomotButtonHoverTextColor"
          />
          <HalomotButton
            :inscription="buttonInscriptions.nextButton"
            @click="handleNext"
            fixedWidth="172px"
            :gradient="halomotButtonGradient"
            :backgroundColor="halomotButtonBackground"
            :textColor="halomotButtonTextColor"
            :innerBorderRadius="halomotButtonInnerBorderRadius"
            :outerBorderRadius="halomotButtonOuterBorderRadius"
            :hoverTextColor="halomotButtonHoverTextColor"
          />
          <HalomotButton
            :inscription="buttonInscriptions.openWebAppButton"
            @click="() => onItemClick && onItemClick(testimonials[active].link || '')"
            fillWidth
            :gradient="halomotButtonGradient"
            :backgroundColor="halomotButtonBackground"
            :textColor="halomotButtonTextColor"
            :innerBorderRadius="halomotButtonInnerBorderRadius"
            :outerBorderRadius="halomotButtonOuterBorderRadius"
            :hoverTextColor="halomotButtonHoverTextColor"
            :href="testimonials[active].link"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-showcase-root {
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
}
.project-showcase-grid {
  width: 100%;
  margin: 0 auto;
  align-items: stretch;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
}
.project-showcase-image-col {
  width: 100%;
  position: relative;
}
.project-showcase-image-wrapper {
  position: relative;
  width: 100%;
}
.project-showcase-image-abs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.showcase-img-container {
  height: 100%;
  width: 100%;
}
.showcase-img-inner {
  height: 100%;
  width: 100%;
}
.project-showcase-text-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0.5rem;
  width: 100%;
}
.project-showcase-text-wrap {
  width: 100%;
}
.project-showcase-name {
  font-weight: bold;
  margin: 0;
}
.project-showcase-position {
  margin: 0;
}
.project-showcase-quote {
  margin: 0;
  font-weight: 500;
}
.showcase-word {
  opacity: 1;
  filter: blur(0px);
  transition: filter 0.2s, opacity 0.2s, transform 0.2s;
}
.project-showcase-buttons {
  display: flex;
  gap: 1.5rem;
  margin-top: 2.5rem;
  align-items: center;
}
</style>
