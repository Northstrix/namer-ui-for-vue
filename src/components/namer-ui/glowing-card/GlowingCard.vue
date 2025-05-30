<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CSSProperties } from 'vue'

interface GlowingCardProps {
  AccentColor: string
  BackgroundColor: string
  TextColor: string
  BorderRadius: string
  BorderWidth: string | number
  TopInscription: string
  BigInscription: string
  SmallInscription: string
  BottomInscription: string
  learnMoreLink?: string
  width?: string | number
  height?: string | number
  IconHeight?: string | number
  TopTextSize?: string | number
}

const props = withDefaults(defineProps<GlowingCardProps>(), {
  IconHeight: '34px',
  TopTextSize: '25px',
  width: '387px',
  height: '467px',
})

const isHovered = ref(false)
const baseWidth = computed(() => parseFloat(String(props.width)))
const baseHeight = computed(() => parseFloat(String(props.height)))
const desiredPaddingTopBottom = computed(() => (31 / 467) * baseHeight.value)
const desiredPaddingLeftRight = computed(() => (39 / 387) * baseWidth.value)

const bigInscriptionFontSize = computed(() =>
  (0.7 * baseWidth.value + 0.3 * baseHeight.value) / (baseWidth.value / (96 * (baseWidth.value / 387)))
)
const smallInscriptionFontSize = computed(() =>
  (0.7 * baseWidth.value + 0.3 * baseHeight.value) / (baseWidth.value / (18 * (baseWidth.value / 387)))
)
// Bottom text a bit bigger
const bottomInscriptionFontSize = computed(() =>
  (0.7 * baseWidth.value + 0.3 * baseHeight.value) / (baseWidth.value / (14 * (baseWidth.value / 387)))
)

const topMarginBigInscription = computed(() =>
  ((15 / baseHeight.value) * baseHeight.value + (15 / baseWidth.value) * baseWidth.value)
)
const bottomMarginBigInscription = computed(() =>
  ((-17 / baseHeight.value) * baseHeight.value + (-17 / baseWidth.value) * baseWidth.value)
)

function handleBottomInscriptionClick() {
  if (props.learnMoreLink) {
    window.open(props.learnMoreLink, '_blank')
  }
}

const cardStyle = computed<CSSProperties>(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  borderWidth: typeof props.BorderWidth === 'number' ? `${props.BorderWidth}px` : props.BorderWidth,
  borderColor: props.AccentColor,
  borderRadius: props.BorderRadius,
  backgroundColor: isHovered.value ? props.AccentColor : props.BackgroundColor,
  color: isHovered.value ? props.BackgroundColor : props.TextColor,
  boxShadow: isHovered.value
    ? `0 0 5px ${props.AccentColor}, 0 0 25px ${props.AccentColor}, 0 0 50px ${props.AccentColor}, 0 0 200px ${props.AccentColor}`
    : 'none',
  transition: 'background-color 0.3s, box-shadow 0.3s, color 0.3s',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  boxSizing: 'border-box',
  userSelect: 'none',
  // Remove 'cursor: pointer' from card!
}))

const textStyle = computed<CSSProperties>(() => ({
  padding: `${desiredPaddingTopBottom.value}px ${desiredPaddingLeftRight.value}px`,
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'color 0.3s',
  color: isHovered.value ? props.BackgroundColor : props.TextColor,
}))
</script>

<template>
  <div
    class="glowing-card"
    :style="cardStyle"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div :style="textStyle">
      <div class="icon-row">
        <div class="icon-container">
          <!-- Pass IconHeight style to slot for dynamic sizing -->
          <slot name="icon" :icon-style="{ height: props.IconHeight, width: 'auto', fontSize: props.IconHeight }" />
        </div>
        <span
          class="top-inscription"
          :style="{
            fontSize: props.TopTextSize,
            fontWeight: 'bold',
            marginLeft: '12px',
            display: 'flex',
            alignItems: 'center',
            lineHeight: 1,
          }"
        >
          {{ props.TopInscription }}
        </span>
      </div>
      <h1
        :style="{
          fontSize: bigInscriptionFontSize + 'px',
          marginTop: topMarginBigInscription + 'px',
          marginBottom: bottomMarginBigInscription + 'px',
          fontWeight: 'bold',
        }"
        class="d-inline-block"
      >
        {{ props.BigInscription }}
      </h1>
      <h3
        :style="{
          fontSize: smallInscriptionFontSize + 'px',
          marginTop: topMarginBigInscription + 'px',
          marginBottom: 'auto',
          fontWeight: 'bold',
        }"
        class="d-inline-block"
      >
        {{ props.SmallInscription }}
      </h3>
      <p
        :style="{
          fontSize: bottomInscriptionFontSize + 'px',
          marginBottom: '0.3em',
          marginTop: 'auto',
          textAlign: 'left',
          fontWeight: 'bold',
          cursor: props.learnMoreLink ? 'pointer' : 'default',
          letterSpacing: '0.02em',
        }"
        class="bottom-inscription"
        @click="handleBottomInscriptionClick"
      >
        {{ props.BottomInscription }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.glowing-card {
  border-style: solid;
}
.d-inline-block {
  display: inline-block;
}
.icon-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;
}
.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 0.5em;
}
.top-inscription {
  vertical-align: middle;
}
.bottom-inscription {
  text-align: left;
  font-weight: bold;
  /* visually larger bottom text */
  letter-spacing: 0.02em;
  /* cursor is now handled inline for dynamic logic */
}
</style>
