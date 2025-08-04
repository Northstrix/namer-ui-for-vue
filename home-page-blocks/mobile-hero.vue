<template>
  <div class="home-root">
    <div class="hero-section">
      <div class="hero-content" :class="{ 'center-mobile': windowWidth < 600 }">
        <h1 class="hero-title" :style="{ fontSize: heroTitleFontSize }">
          Make web apps faster and more <MagicText>captivating</MagicText> at the same time.
        </h1>
        <p class="hero-subtext" :style="{ fontSize: heroSubtextFontSize }">
          Explore a collection of customizable, ready-to-use TypeScript, vanilla CSS components for Vue 3. Spend less time designing UI from the ground up and more time building the features that matter to your users.
        </p>
        <div class="hero-buttons" v-if="windowWidth >= 600">
          <div class="button-container"
               :style="{ zIndex: hoveredButton === 0 ? 9999 : 1 }"
               @mouseenter="hoveredButton = 0"
               @mouseleave="hoveredButton = null">
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
          <div class="button-container"
               :style="{ zIndex: hoveredButton === 1 ? 9999 : 1 }"
               @mouseenter="hoveredButton = 1"
               @mouseleave="hoveredButton = null">
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
    <div class="grid-section">
      <BentoGrid
        v-if="windowWidth >= 768"
        :main-aspect="'9/14'"
        :left-col-ratio="0.38"
        :right-col1="0.62"
        :right-col2="0.38"
        :top-row-ratio="0.56"
        :bottom-row-ratio="0.44"
        gap="20px"
        grid-height="100%"
        cell-background="#17161c"
        cell-border-color="#33313d"
        cell-border-radius="24px"
        cell-border-width="1px"
        cell-padding="24px"
      >
        <template #main>
          <div style="width: 100%; text-align: center;">
            <PlayingCard
              componentWidth="412px"
              aspectRatio="90/148"
              outerRounding="18px"
              innerRounding="18px"
              backgroundColor="#FFF"
              foregroundColor="#000"
              :imageHeightPercentage="70"
              imageSrc="https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/playground-card-image.webp"
              imageAlt=""
              outlineColor="#ddd"
              hoverOutlineColor="#aaa"
              :textArray="['洪', '秀', '全']"
              :minWidth="200"
              :maxWidth="400"
              :minTextSize="16"
              :maxTextSize="24"
              verticalPadding="20px"
              horizontalPadding="20px"
              :manualLetterSpacing="6"
              componentId="card-1"
              :onCardClicked="goToPlayingCard"
              textColorTransitionDelay="1s"
              textColorTransitionDuration="2.4s"
            />
          </div>
        </template>
        <template #topCenter>
          <div style="width: 100%; text-align: center;">
            <div class="shamayim-gradient-container">
              <ShamayimToggleSwitch :default-state="false" :onChange="onShamayimSwitch" />
            </div>
          </div>
        </template>
        <template #topRight>
          <div style="width: 100%; text-align: center;">
            <div style="display: flex; justify-content: center;">
              <AnimatedCube
                :size="36"
                :scale="1.24"
                faceColor="#7dd3fc"
                shadowColor="#0e7490"
                borderColor="#0ea5e9"
                :animationDuration="3.12"
              />
            </div>
          </div>
        </template>
        <template #bottom>
          <div
            class="tooltip-container"
            :style="{
              width: '100%',
              height: animatedTooltipContainerHeight,
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router'
import MagicText from '../components/namer-ui/magic-text/MagicText.vue';
import StargazingButton from '../components/namer-ui/stargazing-button/StargazingButton.vue';
import SparklyButton from '../home-page-blocks/SparklyButton.vue'
import BentoGrid from '../components/namer-ui/bento-grid/BentoGrid.vue';
import PlayingCard from '../components/namer-ui/playing-card/PlayingCard.vue'
import AnimatedCube from '../components/namer-ui/animated-cube/AnimatedCube.vue'
import AnimatedTooltip from '../components/namer-ui/animated-tooltip/AnimatedTooltip.vue'
import ShamayimToggleSwitch from '../components/namer-ui/shamayim-toggle-switch/ShamayimToggleSwitch.vue'

const hoveredButton = ref<number|null>(null);
const router = useRouter()
function goToPlayingCard() { router.push('/components/playing-card') }
function goToAnimatedTooltip() { router.push('/components/animated-tooltip') }
function onShamayimSwitch() { router.push('/components/shamayim-toggle-switch') }

// --- Responsive logic ---
const windowWidth = ref(window.innerWidth);
function onResize() { windowWidth.value = window.innerWidth; }
onMounted(() => { window.addEventListener('resize', onResize); });
onBeforeUnmount(() => { window.removeEventListener('resize', onResize); });

function onGetStartedClick(ev: MouseEvent) {
  // Emit event if parent listens
  // (If you want to emit to parent, use defineEmits and emit here)
  router.push('/components')
}

// Linear interpolation helper
function lerp(minW: number, maxW: number, minV: number, maxV: number, w: number) {
  if (w <= minW) return minV;
  if (w >= maxW) return maxV;
  return minV + ((maxV - minV) * (w - minW)) / (maxW - minW);
}

// Hero Title font size (2.8rem @ 320px, 4.24rem @ 1280px)
const heroTitleFontSize = computed(() => {
  const size = lerp(320, 1280, 2.8, 4.24, windowWidth.value);
  return `${size}rem`;
});
// Hero Subtext font size (0.86rem @ 800px, 1.12rem @ 1280px)
const heroSubtextFontSize = computed(() => {
  const size = lerp(800, 1280, 0.86, 1.12, windowWidth.value);
  return `${size}rem`;
});
// AnimatedTooltip container height (140px @ 800px, 220px @ 1280px)
const animatedTooltipContainerHeight = computed(() => {
  const height = lerp(800, 1280, 140, 220, windowWidth.value);
  return `${height}px`;
});

// Tooltip tip fade logic
const showTooltipTip = ref(true)
const tooltipTipOpacity = ref(1)
const tooltipTipFontSize = computed(() => (windowWidth.value >= 1100 ? '1.07rem' : '1rem'))
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
onBeforeUnmount(() => {
  if (tipTimeout) clearTimeout(tipTimeout)
})

function handleCellClick(cell: 'main' | 'topCenter' | 'topRight' | 'bottom') {
  if (cell === 'topRight') {
    router.push('/components/animated-cube');
  }
}

// --- All allowed values for appearanceEffect ---
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
  | 'center-down';
// --- Complete TooltipItem interface ---
interface TooltipItem {
  id: string;
  name: string;
  designation?: string;
  image: string;
  tooltipColor?: string;
  tooltipBorderEffectColors?: string[];
  tooltipBorderEffectRotation?: string;
  tooltipBorderEffectThickness?: string;
  tooltipBorderEffectPercentage?: number;
  tooltipRounding?: number;
  tooltipWidth?: string;
  tooltipPadding?: string;
  appearanceEffect?: AppearanceEffect;
  tooltipPosition?: 'top' | 'bottom';
  nameFontSize?: string;
  designationFontSize?: string;
  nameColor?: string;
  designationColor?: string;
  imageOutlineColor?: string;
  imageOutlineWidth?: string;
  imageRounding?: number;
  imageOutlineColorOverwrite?: string;
  tooltipBgColor?: string;
  tooltipDotColor?: string;
  tintTilt?: boolean;
  tooltipOffsetY?: number;
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
];

// --- Animated outline color logic (unchanged) ---
const COLOR_1 = '#25232c';
const COLOR_2 = '#ffffff';
const HOLD_DURATION = 50;
const TRANSITION_DURATION = 1250;
const animatedOutlineColor = ref(COLOR_2);
let animationFrame: number | null = null;
let timeoutId: number | null = null;
let isToColor1 = true;
function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}
function rgbToHex([r, g, b]: number[]) {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}
function animateColor(from: string, to: string, duration: number, onDone: () => void) {
  const start = performance.now();
  const rgbFrom = hexToRgb(from);
  const rgbTo = hexToRgb(to);
  function step(now: number) {
    const elapsed = Math.min((now - start) / duration, 1);
    const rgbCurrent = rgbFrom.map((fromC, i) =>
      Math.round(fromC + (rgbTo[i] - fromC) * elapsed)
    ) as [number, number, number];
    animatedOutlineColor.value = rgbToHex(rgbCurrent);
    if (elapsed < 1) {
      animationFrame = requestAnimationFrame(step);
    } else {
      animatedOutlineColor.value = to;
      onDone();
    }
  }
  animationFrame = requestAnimationFrame(step);
}
function startOscillation() {
  function nextPhase() {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    const from = isToColor1 ? COLOR_2 : COLOR_1;
    const to = isToColor1 ? COLOR_1 : COLOR_2;
    timeoutId = window.setTimeout(() => {
      animateColor(from, to, TRANSITION_DURATION, () => {
        isToColor1 = !isToColor1;
        nextPhase();
      });
    }, HOLD_DURATION);
  }
  nextPhase();
}
onMounted(() => { startOscillation(); });
onBeforeUnmount(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame);
  if (timeoutId) clearTimeout(timeoutId);
  if (tipTimeout) clearTimeout(tipTimeout);
});
</script>

<style scoped>
.home-root {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  gap: 0;
}
.hero-section {
  display: flex;
  align-items: center;
}
.hero-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.hero-title {
  color: #fff;
  font-weight: 700;
  margin-bottom: 0em;
  line-height: 1.16;
}
.hero-subtext {
  color: #ddd;
  margin-bottom: 1.4em;
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
  margin-bottom: 2.4em;
}
.grid-section {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 0;
}
.shamayim-gradient-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
  border-radius: 12px;
  background-image: linear-gradient(45deg, #47b6d1, #90e0ec);
  margin: 16px auto 0 auto;
  scale: 1.75;
}

/* Animated tooltip container styles */
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
.center-mobile {
  text-align: center;
  align-items: center;
}

</style>
