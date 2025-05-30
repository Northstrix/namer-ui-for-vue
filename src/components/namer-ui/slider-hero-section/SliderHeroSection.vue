<template>
  <div
    class="slider-hero-container"
    :style="containerStyle"
    ref="containerRef"
  >
    <!-- Background Images -->
    <div class="slider-hero-bg-images">
      <div
        v-for="(option, idx) in showcaseOptions"
        :key="idx"
        class="slider-hero-bg-image"
        :style="bgImageStyle(option.imageUrl, idx === activeIndex)"
      ></div>
    </div>
    <!-- Overlay -->
    <div class="slider-hero-overlay" :style="overlayStyle"></div>
    <!-- Content -->
    <div class="slider-hero-content">
      <h1
        class="slider-hero-title"
        :class="[isMobileView ? 'mobile' : 'desktop', isRTL(title) ? 'rtl' : 'ltr']"
        :style="titleStyle"
      >
        {{ title }}
      </h1>
      <div
        class="slider-hero-showcase"
        :class="[isMobileView ? 'mobile' : 'desktop', isRTL(firstOptionText) ? 'rtl' : 'ltr']"
        :style="showcaseContainerStyle"
      >
        <div
          v-for="(option, idx) in showcaseOptions"
          :key="idx"
          class="slider-hero-showcase-option"
          :class="[
            isMobileView ? 'mobile' : 'desktop',
            isRTL(option.text) ? 'rtl' : 'ltr',
            idx === activeIndex ? 'active' : ''
          ]"
          :style="showcaseOptionStyle(idx === activeIndex)"
          @click="handleOptionClick(idx)"
          @mouseenter="handleOptionHover(idx)"
          @mouseleave="handleOptionLeave"
        >
          {{ option.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

interface ShowcaseOption {
  text: string
  imageUrl: string
}

const emit = defineEmits<{
  (e: 'onOptionClick', idx: number): void
  (e: 'onOptionHover', idx: number): void
}>()

const props = defineProps<{
  title: string
  showcaseOptions: ShowcaseOption[]
  activeOptionColor?: string
  textColor?: string
  imageChangeInterval?: number
  imageTransitionDuration?: number
  desktopFontSize?: string
  mobileFontSize?: string
  desktopShowcaseFontSize?: string
  mobileShowcaseFontSize?: string
  desktopVersionBottomThreshold?: number
  darkenImages?: number
  desktopPadding?: { top?: string; bottom?: string; leftRight?: string }
  mobilePadding?: { top?: string; bottom?: string; leftRight?: string }
  height?: string
  titleFontWeight?: number | string
  showcaseFontWeight?: number | string
  borderRadius?: string
  // onOptionClick?: (index: number) => void
  // onOptionHover?: (index: number) => void
  desktopTitleAlign?: string
  mobileTitleAlign?: string
  desktopShowcaseAlign?: string
  mobileShowcaseAlign?: string
}>()

const activeOptionColor = props.activeOptionColor ?? '#00a6fb'
const textColor = props.textColor ?? '#ffffff'
const imageChangeInterval = props.imageChangeInterval ?? 4000
const imageTransitionDuration = props.imageTransitionDuration ?? 0.76
const desktopFontSize = props.desktopFontSize ?? '62px'
const mobileFontSize = props.mobileFontSize ?? '33px'
const desktopShowcaseFontSize = props.desktopShowcaseFontSize ?? '36px'
const mobileShowcaseFontSize = props.mobileShowcaseFontSize ?? '25px'
const desktopVersionBottomThreshold = props.desktopVersionBottomThreshold ?? 768
const darkenImages = props.darkenImages ?? 0.5
const desktopPadding = props.desktopPadding ?? { top: '62px', bottom: '67px', leftRight: '24px' }
const mobilePadding = props.mobilePadding ?? { top: '39px', bottom: '39px', leftRight: '10px' }
const height = props.height ?? '100vh'
const titleFontWeight = props.titleFontWeight ?? 700
const showcaseFontWeight = props.showcaseFontWeight ?? 700
const borderRadius = props.borderRadius ?? 'none'
const desktopTitleAlign = props.desktopTitleAlign ?? 'left'
const mobileTitleAlign = props.mobileTitleAlign ?? 'center'
const desktopShowcaseAlign = props.desktopShowcaseAlign ?? 'left'
const mobileShowcaseAlign = props.mobileShowcaseAlign ?? 'center'

const activeIndex = ref(0)
const isMobileView = ref(false)
const isHovered = ref(false)
const containerRef = ref<HTMLElement | null>(null)
let intervalId: ReturnType<typeof setInterval> | null = null

const firstOptionText = computed(() => props.showcaseOptions[0]?.text || '')

function isRTL(text: string): boolean {
  return /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(text)
}

// Alignment helpers
function alignToText(align: string) {
  switch (align) {
    case 'left':
    case 'right':
    case 'center':
      return align
    default:
      return 'left'
  }
}
function showcaseMarginAuto(align: string, isRtl: boolean) {
  if (align === 'right') {
    return isRtl ? { marginRight: 'auto' } : { marginLeft: 'auto' }
  }
  if (align === 'center') {
    return { marginLeft: 'auto', marginRight: 'auto' }
  }
  // left
  return isRtl ? { marginLeft: 'auto' } : { marginRight: 'auto' }
}

// Responsive
function handleResize() {
  if (containerRef.value) {
    isMobileView.value = containerRef.value.offsetWidth < desktopVersionBottomThreshold
  }
}
const dynamicMediaQuery = computed(() => `@media (max-width: ${desktopVersionBottomThreshold - 1}px)`)
function injectDynamicMediaQuery() {
  const prev = document.getElementById('slider-hero-dynamic-media')
  if (prev) prev.remove()
  const style = document.createElement('style')
  style.id = 'slider-hero-dynamic-media'
  style.innerHTML = `
    ${dynamicMediaQuery.value} {
      .slider-hero-title {
        line-height: 1.15;
      }
    }
  `
  document.head.appendChild(style)
}
onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  injectDynamicMediaQuery()
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (intervalId) clearInterval(intervalId)
  const prev = document.getElementById('slider-hero-dynamic-media')
  if (prev) prev.remove()
})
watch(
  () => desktopVersionBottomThreshold,
  () => injectDynamicMediaQuery()
)
watch(
  () => containerRef.value?.offsetWidth,
  () => handleResize()
)

// Auto slide
function startInterval() {
  if (intervalId) clearInterval(intervalId)
  if (!isHovered.value) {
    intervalId = setInterval(() => {
      activeIndex.value = (activeIndex.value + 1) % props.showcaseOptions.length
    }, imageChangeInterval)
  }
}
watch([isHovered, () => props.showcaseOptions.length, () => imageChangeInterval], startInterval, { immediate: true })
onBeforeUnmount(() => intervalId && clearInterval(intervalId))

function handleOptionClick(idx: number) {
  activeIndex.value = idx
  emit('onOptionClick', idx)
}
function handleOptionHover(idx: number) {
  activeIndex.value = idx
  isHovered.value = true
  emit('onOptionHover', idx)
}
function handleOptionLeave() {
  isHovered.value = false
}

const containerStyle = computed(() => ({
  height,
  borderRadius,
  overflow: 'hidden',
  padding: isMobileView.value
    ? `${mobilePadding.top} ${mobilePadding.leftRight} ${mobilePadding.bottom}`
    : `${desktopPadding.top} ${desktopPadding.leftRight} ${desktopPadding.bottom}`,
}))

function bgImageStyle(url: string, isActive: boolean) {
  return {
    backgroundImage: `url(${url})`,
    opacity: isActive ? 1 : 0,
    transition: `opacity ${imageTransitionDuration}s cubic-bezier(0.77,0,0.175,1)`,
    borderRadius,
  }
}
const overlayStyle = computed(() => ({
  backgroundColor:
    darkenImages >= 0
      ? `rgba(0,0,0,${darkenImages})`
      : `rgba(255,255,255,${Math.abs(darkenImages)})`,
  borderRadius,
}))
const titleStyle = computed(() => ({
  fontSize: isMobileView.value ? mobileFontSize : desktopFontSize,
  color: textColor,
  textAlign: isMobileView.value ? alignToText(mobileTitleAlign) : alignToText(desktopTitleAlign),
  fontWeight: titleFontWeight,
}))
const showcaseContainerStyle = computed(() => {
  const align = isMobileView.value ? mobileShowcaseAlign : desktopShowcaseAlign
  const isRtl = isRTL(firstOptionText.value)
  return {
    textAlign: alignToText(align),
    display: 'inline-flex',
    flexDirection: 'column',
    gap: '0.25em',
    width: '100%',
    ...showcaseMarginAuto(align, isRtl),
  }
})
function showcaseOptionStyle(isActive: boolean) {
  return {
    color: isActive ? activeOptionColor : textColor,
    fontSize: isMobileView.value ? mobileShowcaseFontSize : desktopShowcaseFontSize,
    textAlign: isMobileView.value
      ? alignToText(mobileShowcaseAlign)
      : alignToText(desktopShowcaseAlign),
    transition: 'color 0.3s',
    cursor: 'pointer',
    fontWeight: showcaseFontWeight,
    textDecoration: 'none',
  }
}
</script>

<style scoped>
.slider-hero-container {
  width: 100%;
  position: relative;
  box-sizing: border-box;
}
.slider-hero-bg-images {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
}
.slider-hero-bg-image {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-size: cover;
  background-position: center;
  will-change: opacity;
}
.slider-hero-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 1;
  pointer-events: none;
}
.slider-hero-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.slider-hero-title {
  margin: 0;
  line-height: 1.1;
  word-break: break-word;
}
.slider-hero-title.rtl { direction: rtl; }
.slider-hero-title.ltr { direction: ltr; }
.slider-hero-showcase {
  width: 100%;
}
.slider-hero-showcase.rtl { direction: rtl; }
.slider-hero-showcase.ltr { direction: ltr; }
.slider-hero-showcase-option {
  user-select: none;
  margin: 0.1em 0;
  font-weight: inherit;
  text-decoration: none;
}
.slider-hero-showcase-option.rtl { direction: rtl; }
.slider-hero-showcase-option.ltr { direction: ltr; }
</style>
