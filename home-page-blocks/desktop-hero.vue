<template>
  <div class="home-root" :style="rootStyle">
    <div class="hero-section" :style="heroSectionStyle">
      <div class="hero-content">
        <h1 class="hero-title" :style="heroTitleStyle">
          Make web apps faster and more <MagicText>captivating</MagicText> at the same time.
        </h1>
        <p class="hero-subtext" :style="heroSubtextStyle">
          Explore a collection of customizable, ready-to-use TypeScript, vanilla CSS components for Vue 3.
          Spend less time designing UI from the ground up and more time building the features that matter to your users.
        </p>
        <div class="hero-buttons">
          <div
            class="button-container"
            :style="{ zIndex: hoveredButton === 0 ? 9999 : 1 }"
            @mouseenter="hoveredButton = 0"
            @mouseleave="hoveredButton = null"
          >
            <SparklyButton
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
              @click="onGetStartedClick"
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
      </div>
    </div>
    <div class="grid-section" v-if="!isMobile">
      <BentoGrid
        :main-aspect="mainAspect"
        :left-col-ratio="leftColRatio"
        :right-col1="rightCol1"
        :right-col2="rightCol2"
        :top-row-ratio="topRowRatio"
        :bottom-row-ratio="bottomRowRatio"
        gap="20px"
        grid-height="100%"
        cell-background="#17161c"
        cell-border-color="#33313d"
        cell-border-radius="24px"
        cell-border-width="1px"
        cell-padding="24px"
        @cellClick="handleCellClick"
      >
        <template #main>
          <div style="width: 100%; text-align: center;">
            <PlayingCard
              componentWidth="412px"
              :aspectRatio="playingCardAspect"
              outerRounding="18px"
              innerRounding="18px"
              backgroundColor="#FFF"
              foregroundColor="#000"
              :imageHeightPercentage="100"
              imageSrc="https://raw.githubusercontent.com/Northstrix/wonderland-card/refs/heads/main/public/first-card-image.png"
              imageAlt=""
              defaultTextColor="#00a9fe"
              hoveredTextColor="#8F04A7"
              outlineColor="#ddd"
              hoverOutlineColor="#aaa"
              :textArray="['改', '善']"
              :minWidth="200"
              :maxWidth="400"
              :minTextSize="20"
              :maxTextSize="32"
              verticalPadding="20px"
              horizontalPadding="20px"
              :manualLetterSpacing="6"
              componentId="card-1"
              :onCardClicked="goToPlayingCard"
              textColorTransitionDelay="1s"
              textColorTransitionDuration="2.4s"
              style="cursor:pointer"
            />
          </div>
        </template>
        <template #topCenter>
          <div style="width: 100%; text-align: center;">
            <div style="display: inline-block; transform: scale(1.44);">
              <Spiral
                spiralColor="96, 196, 218"
                :defaultDistortion="1.2"
                :hoverDistortion="3.6"
                :clickDistortion="3.6"
                :strokeWidth="1.64"
              />
            </div>
          </div>
        </template>
        <template #topRight>
          <div style="width: 100%; text-align: center;">
            <div class="shamayim-gradient-container">
              <div class="switch-wrapper">
                <div style="transform: rotate(-90deg); display: inline-block;">
                  <ShamayimToggleSwitch
                    :default-state="false"
                    :onChange="onShamayimSwitch"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #bottom>
          <div
            class="tooltip-container"
            :style="{
              width: '100%',
              height: tooltipContainerHeight + 'px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'visible'
            }"
          >
            <transition name="tooltip-fade">
              <div
                v-if="showTooltipTip"
                class="tooltip-tip-overlay"
                :style="{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  textAlign: 'center',
                  color: '#aaa',
                  fontSize: tooltipTipFontSize,
                  zIndex: 10,
                  opacity: tooltipTipOpacity,
                  pointerEvents: 'none'
                }"
              >
                Try hovering each of those
              </div>
            </transition>
            <div style="width: 100%;" @click="goToAnimatedTooltip" class="tooltip-demo-clickable">
              <AnimatedTooltip
                :items="items"
                tooltipColor="#060507"
                tooltipBorderEffectRotation="2.94rad"
                tooltipBorderEffectThickness="1px"
                :tooltipBorderEffectPercentage="100"
                :tooltipRounding="8"
                tooltipWidth="264px"
                tooltipPadding="0.625rem 1rem"
                appearanceEffect="from-top"
                tooltipPosition="top"
                nameFontSize="1.2rem"
                designationFontSize="0.875rem"
                nameColor="#ffeaa7"
                designationColor="#fab1a0"
                :imageOutlineColor="animatedOutlineColor"
                imageOutlineWidth="1px"
                tooltipBgColor="rgba(71, 118, 203, 0.05)"
                tooltipDotColor="rgba(98, 92, 115, 0.73)"
                tintTilt
                avatarGap="24px"
                uniqueId="main-demo"
                @tooltip-click="goToAnimatedTooltip"
                @avatar-hover="onAvatarHover"
                @avatar-unhover="onAvatarUnhover"
              />
            </div>
          </div>
        </template>
      </BentoGrid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import MagicText from '../components/namer-ui/magic-text/MagicText.vue'
import StargazingButton from '../components/namer-ui/stargazing-button/StargazingButton.vue'
import SparklyButton from '../home-page-blocks/SparklyButton.vue'
import BentoGrid from '../components/namer-ui/bento-grid/BentoGrid.vue'
import PlayingCard from '../components/namer-ui/playing-card/PlayingCard.vue'
import Spiral from '../components/namer-ui/spiral/Spiral.vue'
import AnimatedTooltip from '../components/namer-ui/animated-tooltip/AnimatedTooltip.vue'
import ShamayimToggleSwitch from '../components/namer-ui/shamayim-toggle-switch/ShamayimToggleSwitch.vue'

const router = useRouter()
function goToPlayingCard() {
  router.push('/components/playing-card')
}
function goToAnimatedTooltip() {
  router.push('/components/animated-tooltip')
}
function onShamayimSwitch() {
  router.push('/components/shamayim-toggle-switch')
}
function handleCellClick(cell: 'main' | 'topCenter' | 'topRight' | 'bottom') {
  if (cell === 'topRight') {
    router.push('/components/animated-cube');
  }
  if (cell === 'topCenter') {
    router.push('/components/spiral')
  }
}

function onGetStartedClick(ev: MouseEvent) {
  // Emit event if parent listens
  // (If you want to emit to parent, use defineEmits and emit here)
  router.push('/components')
}

const hoveredButton = ref<number|null>(null)

const width = ref(1280)
function onResize() { 1280 }
onMounted(() => window.addEventListener('resize', onResize))
onBeforeUnmount(() => window.removeEventListener('resize', onResize))

const isMobile = computed(() => width.value < 800)

function lerp(x: number, x0: number, x1: number, y0: number, y1: number) {
  if (x <= x0) return y0
  if (x >= x1) return y1
  return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0)
}

const heroSectionStyle = computed(() => {
  let maxWidth = 554
  if (width.value >= 1536) maxWidth = 554
  else if (width.value >= 1400) maxWidth = lerp(width.value, 1400, 1536, 524, 554)
  else if (width.value >= 1300) maxWidth = lerp(width.value, 1300, 1400, 460, 524)
  else if (width.value >= 1100) maxWidth = lerp(width.value, 1100, 1300, 340, 460)
  else maxWidth = '100vw'
  return {
    maxWidth: typeof maxWidth === 'number' ? maxWidth + 'px' : maxWidth,
    flex: '0 0 ' + (typeof maxWidth === 'number' ? maxWidth + 'px' : maxWidth),
    display: 'flex',
    alignItems: 'center'
  }
})
const heroTitleStyle = computed(() => {
  let size = 3.7
  if (width.value >= 1536) size = 3.7
  else if (width.value >= 1400) size = lerp(width.value, 1400, 1536, 3.38, 3.7)
  else if (width.value >= 1300) size = lerp(width.value, 1300, 1400, 2.86, 3.38)
  else if (width.value >= 1100) size = lerp(width.value, 1100, 1300, 2.54, 2.86)
  else size = lerp(width.value, 800, 1100, 2.2, 2.54)
  return { fontSize: size + 'rem' }
})
const heroSubtextStyle = computed(() => {
  let size = 1.18
  if (width.value >= 1536) size = 1.18
  else if (width.value >= 1400) size = lerp(width.value, 1400, 1536, 1.12, 1.18)
  else if (width.value >= 1300) size = lerp(width.value, 1300, 1400, 1.036, 1.12)
  else if (width.value >= 1100) size = lerp(width.value, 1100, 1300, 0.957, 1.036)
  else size = lerp(width.value, 800, 1100, 0.86, 0.957)
  return { fontSize: size + 'rem' }
})

const mainAspect = computed(() => width.value < 1100 ? '9/14' : '1/1')
const leftColRatio = 0.48
const rightCol1 = computed(() => 0.62)
const rightCol2 = computed(() => 0.38)
const topRowRatio = computed(() => width.value >= 1300 ? 0.6 : 0.56)
const bottomRowRatio = computed(() => width.value >= 1300 ? 0.4 : 0.44)
const playingCardAspect = '280/416'

const cubeSize = computed(() => {
  if (width.value >= 1536) return 60
  if (width.value >= 1400) return lerp(width.value, 1400, 1536, 50, 60)
  if (width.value >= 1300) return lerp(width.value, 1300, 1400, 44, 50)
  if (width.value >= 1100) return lerp(width.value, 1100, 1300, 36, 44)
  return 36
})
const cubeScale = computed(() => {
  if (width.value >= 1400) return 1.5
  if (width.value >= 1300) return lerp(width.value, 1300, 1400, 1.32, 1.5)
  if (width.value >= 1100) return lerp(width.value, 1100, 1300, 1.24, 1.32)
  return 1.24
})

// Tooltip container height: 164px @ 1536px+, 146px @ 1280px, linear in between
const tooltipContainerHeight = computed(() => {
  if (width.value >= 1536) return 163
  if (width.value <= 1280) return 146
  return lerp(width.value, 1280, 1536, 146, 163)
})

const hoveredAvatars = ref<string[]>([])
const showTooltipTip = ref(true)
const tooltipTipOpacity = ref(1)
const tooltipTipFontSize = computed(() => (width.value >= 1100 ? '1.07rem' : '1rem'))
let tipTimeout: number | null = null
function onAvatarHover() {
  showTooltipTip.value = false
  tooltipTipOpacity.value = 0
  if (tipTimeout) {
    clearTimeout(tipTimeout)
    tipTimeout = null
  }
}
function onAvatarUnhover() {
  if (tipTimeout) clearTimeout(tipTimeout)
  tipTimeout = window.setTimeout(() => {
    showTooltipTip.value = true
    tooltipTipOpacity.value = 1
  }, 1000)
}

const COLOR_1 = '#25232c'
const COLOR_2 = '#ffffff'
const HOLD_DURATION = 50
const TRANSITION_DURATION = 1250
const animatedOutlineColor = ref(COLOR_2)
let animationFrame: number | null = null
let timeoutId: number | null = null
let isToColor1 = true

function hexToRgb(hex: string) {
  const h = hex.replace('#', '')
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ]
}
function rgbToHex([r, g, b]: number[]) {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')
  )
}
function animateColor(from: string, to: string, duration: number, onDone: () => void) {
  const start = performance.now()
  const rgbFrom = hexToRgb(from)
  const rgbTo = hexToRgb(to)
  function step(now: number) {
    const elapsed = Math.min((now - start) / duration, 1)
    const rgbCurrent = rgbFrom.map((fromC, i) =>
      Math.round(fromC + (rgbTo[i] - fromC) * elapsed)
    ) as [number, number, number]
    animatedOutlineColor.value = rgbToHex(rgbCurrent)
    if (elapsed < 1) {
      animationFrame = requestAnimationFrame(step)
    } else {
      animatedOutlineColor.value = to
      onDone()
    }
  }
  animationFrame = requestAnimationFrame(step)
}
function startOscillation() {
  function nextPhase() {
    if (animationFrame) cancelAnimationFrame(animationFrame)
    const from = isToColor1 ? COLOR_2 : COLOR_1
    const to = isToColor1 ? COLOR_1 : COLOR_2
    timeoutId = window.setTimeout(() => {
      animateColor(from, to, TRANSITION_DURATION, () => {
        isToColor1 = !isToColor1
        nextPhase()
      })
    }, HOLD_DURATION)
  }
  nextPhase()
}
onMounted(() => {
  startOscillation()
})
onBeforeUnmount(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
  if (timeoutId) clearTimeout(timeoutId)
  if (tipTimeout) clearTimeout(tipTimeout)
})

const rootStyle = computed(() => ({
  flexDirection: isMobile.value ? 'column' : 'row',
  gap: isMobile.value ? '0' : '32px',
  width: '100%',
  marginTop: '40px'
}))

type AppearanceEffect =
  | 'from-bottom-right'
  | 'from-bottom-left'
  | 'from-top-left'
  | 'from-top-right'
  | 'from-top'
  | 'from-bottom'
  | 'from-left'
  | 'from-right'
  | 'center-up'
  | 'center-down'
interface TooltipItem {
  id: string
  name: string
  designation?: string
  image: string
  tooltipColor?: string
  tooltipBorderEffectColors?: string[]
  tooltipBorderEffectRotation?: string
  tooltipBorderEffectThickness?: string
  tooltipBorderEffectPercentage?: number
  tooltipRounding?: number
  tooltipWidth?: string
  tooltipPadding?: string
  appearanceEffect?: AppearanceEffect
  tooltipPosition?: 'top' | 'bottom'
  nameFontSize?: string
  designationFontSize?: string
  nameColor?: string
  designationColor?: string
  imageOutlineColor?: string
  imageOutlineWidth?: string
  imageRounding?: number
  imageOutlineColorOverwrite?: string
  tooltipBgColor?: string
  tooltipDotColor?: string
  tintTilt?: boolean
  tooltipOffsetY?: number
}
const items: TooltipItem[] = [
  {
    id: "Vue",
    name: 'Vue',
    image: 'https://icon.icepanel.io/Technology/svg/Vue.js.svg',
    appearanceEffect: 'from-top-left',
    tooltipOffsetY: 2,
    tooltipBorderEffectColors: ['#33303b 0%', '#33303b 100%'],
    nameColor: '#41b883',
    imageRounding: 40,
    imageOutlineColorOverwrite: "#312f3b",
    tooltipWidth: "auto"
  },
  {
    id: "TypeScript",
    name: 'TypeScript',
    designation: '12px higher than Vue tooltip',
    image: 'https://icon.icepanel.io/Technology/svg/TypeScript.svg',
    appearanceEffect: 'from-top',
    tooltipOffsetY: 14,
    tooltipBorderEffectColors: ['#4776cb 0', '#a19fe5 40%', 'transparent 90%'],
    nameFontSize: '1.3rem',
    imageOutlineColor: "#444051",
    nameColor: '#fff',
    designationColor: '#008ceb',
    imageRounding: 8,
    tooltipRounding: 0,
  },
  {
    id: "CSS",
    name: 'CSS',
    designation: "That one doesn't tilt",
    image: 'https://icon.icepanel.io/Technology/svg/CSS3.svg',
    appearanceEffect: 'from-top-right',
    tooltipOffsetY: 2,
    tooltipBorderEffectColors: ['#0097fd 0', '#0097fd 100%'],
    imageRounding: 0,
    tintTilt: false,
    tooltipRounding: 50,
    designationFontSize: "1.125rem",
    tooltipColor: "#eee",
    tooltipDotColor: "rgba(21, 114, 182, 0.84)",
    nameColor: "#111014",
    designationColor: "#3e3a49",
  },
]
</script>

<style scoped>
.home-root {
  display: flex;
  width: 100%;
  margin-top: 40px;
}
.hero-section {}
.hero-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.hero-title {
  color: #fff;
  font-weight: 700;
  margin-bottom: 0.14em;
  line-height: 1.16;
}
.hero-subtext {
  color: #ddd;
  margin-bottom: 1.6em;
  font-weight: 500;
}
.hero-buttons {
  display: flex;
  gap: 16px;
  position: relative;
}
.button-container {
  position: relative;
  transition: z-index 0.1s;
}
.grid-section {
  flex: 1 1 0;
  display: flex;
  align-items: center;
}
.tooltip-container {
  overflow: visible !important;
  position: relative;
}
.tooltip-tip-overlay {
  pointer-events: none;
  user-select: none;
  transition: opacity 0.3s;
}
.tooltip-fade-enter-active, .tooltip-fade-leave-active {
  transition: opacity 0.3s;
}
.tooltip-fade-enter-from, .tooltip-fade-leave-to {
  opacity: 0;
}
.tooltip-demo-clickable {
  cursor: pointer;
}
.shamayim-gradient-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
  border-radius: 12px;
  background-image: linear-gradient(45deg, #47b6d1, #90e0ec);
  margin: 16px auto 0 auto;
  scale: 2;
}
.gradient-rotated {
  transform: rotate(-90deg);
}
</style>
