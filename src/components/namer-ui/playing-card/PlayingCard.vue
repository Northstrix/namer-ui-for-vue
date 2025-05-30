<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

const props = defineProps<{
  componentWidth?: string
  aspectRatio?: string
  outerRounding?: string
  innerRounding?: string
  backgroundColor?: string
  foregroundColor?: string
  imageHeightPercentage?: number
  imageSrc: string
  imageAlt?: string
  outlineColor?: string
  hoverOutlineColor?: string
  textArray: string[]
  minWidth: number
  maxWidth: number
  minTextSize: number
  maxTextSize: number
  verticalPadding?: string
  horizontalPadding?: string
  manualLetterSpacing?: number
  componentId?: string
  onCardClicked: () => void
  textColorTransitionDelay?: string
  textColorTransitionDuration?: string
}>()

const {
  componentWidth = "412px",
  aspectRatio = "3/4",
  outerRounding = "18px",
  innerRounding = "18px",
  backgroundColor = "#FFF",
  foregroundColor = "#000",
  imageHeightPercentage = 70,
  imageSrc,
  imageAlt = "",
  outlineColor = "#ddd",
  hoverOutlineColor = "#aaa",
  textArray,
  minWidth,
  maxWidth,
  minTextSize,
  maxTextSize,
  verticalPadding = "20px",
  horizontalPadding = "20px",
  manualLetterSpacing,
  componentId = "card-1",
  onCardClicked,
  textColorTransitionDelay = "1s",
  textColorTransitionDuration = "2.4s"
} = props

const containerRef = ref<HTMLElement | null>(null)
const textSize = ref(maxTextSize)
const letterSpacing = ref(manualLetterSpacing ?? 0)
const isHovered = ref(false)

function updateTextSizeAndSpacing() {
  if (!containerRef.value) return
  // --- Dynamic text size ---
  const width = containerRef.value.offsetWidth
  const calculatedTextSize = ((maxTextSize - minTextSize) / (maxWidth - minWidth)) * (width - minWidth) + minTextSize
  textSize.value = Math.max(minTextSize, Math.min(calculatedTextSize, maxTextSize))
  // --- Dynamic letter spacing (vertical, proportional to text size) ---
  if (manualLetterSpacing !== undefined) {
    letterSpacing.value = manualLetterSpacing
    return
  }
  if (textArray.length > 1) {
    // Try to fill the available height (minus paddings)
    const height = containerRef.value.offsetHeight
    const availableHeight = height - parseInt(verticalPadding) * 2
    letterSpacing.value = (availableHeight - textSize.value * textArray.length) / (textArray.length - 1)
  } else {
    letterSpacing.value = 0
  }
}
onMounted(() => {
  nextTick(updateTextSizeAndSpacing)
  window.addEventListener('resize', updateTextSizeAndSpacing)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTextSizeAndSpacing)
})
watch(
  [() => props.manualLetterSpacing, textArray, textSize, () => props.verticalPadding],
  () => nextTick(updateTextSizeAndSpacing)
)

const textTransition = `color ${textColorTransitionDuration} ease-in-out ${textColorTransitionDelay}`
</script>

<template>
  <div
    ref="containerRef"
    class="playing-card-root"
    :style="{
      maxWidth: componentWidth,
      width: '100%',
    }"
    :data-component-id="componentId"
    @click="onCardClicked"
  >
    <div
      class="playing-card-outer"
      :style="{
        borderRadius: outerRounding,
        padding: '1px',
        background: isHovered ? hoverOutlineColor : outlineColor,
        width: '100%',
        aspectRatio: aspectRatio,
        transition: 'background 0.3s ease-in-out',
        cursor: 'pointer'
      }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div
        class="playing-card-inner"
        :style="{
          backgroundColor: backgroundColor,
          padding: `${verticalPadding} ${horizontalPadding}`,
          borderRadius: innerRounding,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          color: foregroundColor,
          position: 'relative',
          overflow: 'hidden',
          transition: 'background-color 0.3s ease-in-out'
        }"
      >
        <!-- Main Text (vertical, top left) -->
        <div
          :id="`${componentId}-text`"
          class="playing-card-text-vertical"
          :style="{
            position: 'absolute',
            top: verticalPadding,
            left: horizontalPadding,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 2,
            color: isHovered ? '#f12b30' : '#3662f4',
            fontWeight: 'bold',
            fontSize: `${textSize}px`,
            transition: textTransition
          }"
        >
          <div
            v-for="(letter, index) in textArray"
            :key="`${componentId}-letter-${index}`"
            :style="{
              marginBottom: index !== textArray.length - 1 ? `${letterSpacing}px` : '0',
              letterSpacing: '0'
            }"
          >{{ letter }}</div>
        </div>
        <!-- Mirrored Text (vertical, bottom right) -->
        <div
          :id="`${componentId}-mirror`"
          class="playing-card-text-vertical"
          :style="{
            position: 'absolute',
            bottom: verticalPadding,
            right: horizontalPadding,
            display: 'flex',
            flexDirection: 'column',
            transform: 'scale(-1)',
            zIndex: 2,
            color: isHovered ? '#f12b30' : '#3662f4',
            fontWeight: 'bold',
            fontSize: `${textSize}px`,
            transition: textTransition
          }"
        >
          <div
            v-for="(letter, index) in textArray"
            :key="`${componentId}-mirror-letter-${index}`"
            :style="{
              marginBottom: index !== textArray.length - 1 ? `${letterSpacing}px` : '0',
              letterSpacing: '0'
            }"
          >{{ letter }}</div>
        </div>
        <!-- Image -->
        <div
          style="flex: 1; display: flex; justify-content: center; align-items: center; position: relative; width: 100%;"
        >
          <div
            :style="{
              position: 'relative',
              height: imageHeightPercentage + '%',
              width: 'auto',
              aspectRatio: '1/1'
            }"
          >
            <img
              :src="imageSrc"
              :alt="imageAlt"
              draggable="false"
              style="height: 100%; width: 100%; object-fit: contain; object-position: center; display: block;"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.playing-card-root {
  box-sizing: border-box;
}
.playing-card-outer {
  box-shadow: 0 4px 16px 0 rgba(0,0,0,0.08);
  display: inline-block;
}
.playing-card-inner {
  box-sizing: border-box;
}
.playing-card-text-vertical {
  pointer-events: none;
  user-select: none;
  line-height: 1.1;
}
</style>
