<template>
  <div
    class="product-card"
    :id="`container-${id}`"
    @mousemove="handleMouseMove"
    :style="containerStyle"
  >
    <div class="product-inner-container" :style="innerContainerStyle">
      <div class="product-image-container">
        <img :src="imageSrc" :alt="altText" class="product-image" />
        <div class="product-price-tag" :style="priceTagStyle">
          <template v-if="mirrorTags">
            <span class="product-new-price" style="font-weight: bold;">
              <span :style="{ color: darkTextInTags ? '#111111' : 'var(--text-color)' }">{{ price }}</span>
            </span>
            <span
              v-if="oldPrice"
              class="product-old-price"
              style="margin-left: 8px; font-weight: bold;"
            >
              <span
                :style="{
                  color: darkTextInTags ? '#404040' : 'var(--text-color)',
                  opacity: 0.64,
                  textDecoration: 'line-through',
                  textDecorationColor: darkTextInTags ? '#404040' : 'var(--text-color)'
                }"
              >
                {{ oldPrice }}
              </span>
            </span>
          </template>
          <template v-else>
            <span
              v-if="oldPrice"
              class="product-old-price"
              style="margin-right: 8px; font-weight: bold;"
            >
              <span
                :style="{
                  color: darkTextInTags ? '#404040' : 'var(--text-color)',
                  opacity: 0.64,
                  textDecoration: 'line-through',
                  textDecorationColor: darkTextInTags ? '#404040' : 'var(--text-color)'
                }"
              >
                {{ oldPrice }}
              </span>
            </span>
            <span class="product-new-price" style="font-weight: bold;">
              <span :style="{ color: darkTextInTags ? '#111111' : 'var(--text-color)' }">{{ price }}</span>
            </span>
          </template>
        </div>
        <div
          v-if="condition"
          class="product-condition-tag"
          :style="conditionTagStyle"
        >
          {{ condition }}
        </div>
        <div
          v-if="discountTag"
          class="product-discount-tag"
          :style="discountTagStyle"
        >
          {{ discountTag }}
        </div>
      </div>
      <div class="product-content">
        <h1 class="product-title" :style="titleStyle">{{ displayedTitle }}</h1>
        <p class="product-description" :style="descriptionStyle">{{ description }}</p>
        <div class="product-button-container">
          <template v-if="swapButtons">
            <!-- Outlined button first -->
            <ChronicleButton
              :text="outlinedButtonInscription"
              :outlined="true"
              width="136px"
              :onClick="() => onOutlinedButtonClick(id)"
              :hoverColor="oulinedChronicleButtonHoverColor"
              outlinedButtonBackgroundOnHover="transparent"
              fontFamily="'Arial', 'Alef', sans-serif"
              :borderRadius="`${buttonRounding}px`"
              :customBackground="outlinedButtonOutlineColor"
              :customForeground="outlinedButtonOutlineColor"
              :outlineColor="outlinedButtonOutlineColor"
            />
            <!-- Filled button second -->
            <ChronicleButton
              :text="filledButtonInscription"
              width="136px"
              :onClick="() => onFilledButtonClick(id)"
              hoverColor="#fff"
              :hoverBackground="filledChronicleButtonHoverColor"
              fontFamily="'Arial', 'Alef', sans-serif"
              :borderRadius="`${buttonRounding}px`"
              :customBackground="buttonBackground"
              :customForeground="buttonForeground"
            />
          </template>
          <template v-else>
            <!-- Filled button first -->
            <ChronicleButton
              :text="filledButtonInscription"
              width="136px"
              :onClick="() => onFilledButtonClick(id)"
              hoverColor="#fff"
              :hoverBackground="filledChronicleButtonHoverColor"
              fontFamily="'Arial', 'Alef', sans-serif"
              :borderRadius="`${buttonRounding}px`"
              :customBackground="buttonBackground"
              :customForeground="buttonForeground"
            />
            <!-- Outlined button second -->
            <ChronicleButton
              v-if="showOutlinedButton"
              :text="outlinedButtonInscription"
              :outlined="true"
              width="136px"
              :onClick="() => onOutlinedButtonClick(id)"
              :hoverColor="oulinedChronicleButtonHoverColor"
              outlinedButtonBackgroundOnHover="transparent"
              fontFamily="'Arial', 'Alef', sans-serif"
              :borderRadius="`${buttonRounding}px`"
              :customBackground="outlinedButtonOutlineColor"
              :customForeground="outlinedButtonOutlineColor"
              :outlineColor="outlinedButtonOutlineColor"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, onMounted, watch } from 'vue'
import ChronicleButton from '../chronicle-button/ChronicleButton.vue'

interface ProductCardProps {
  id: string
  imageSrc: string
  altText: string
  price: string
  oldPrice?: string
  condition?: string
  discountTag?: string
  title: string
  description: string
  showOutlinedButton?: boolean
  onFilledButtonClick: (id: string) => void
  onOutlinedButtonClick: (id: string) => void
  outerWidth?: number
  outerHeight?: number
  outerContainerSize?: number
  outlineColor?: string
  outlinedButtonOutlineColor?: string // NEW PROP
  innerWidth?: number
  innerHeight?: number
  descriptionLines?: number
  fontSize?: number
  accentColor?: string
  containerRounding?: number
  innerContainerRounding?: number
  buttonRounding?: number
  tagRounding?: number
  textColor?: string
  buttonBackground?: string
  buttonForeground?: string
  borderWidth?: number
  lightenButtonColor?: number
  filledButtonInscription?: string
  outlinedButtonInscription?: string
  swapButtons?: boolean
  activeComponentScale?: number
  mirrorTags?: boolean
  darkTextInTags?: boolean
}

const props = defineProps<ProductCardProps>()

const {
  id,
  imageSrc,
  altText,
  price,
  oldPrice,
  condition,
  discountTag,
  title,
  description,
  showOutlinedButton = true,
  onFilledButtonClick,
  onOutlinedButtonClick,
  outerWidth = 390,
  outerHeight = 412,
  outerContainerSize = 32,
  outlineColor = '#303030',
  outlinedButtonOutlineColor = '#f1f1f7', // Default for outlined button
  innerWidth,
  innerHeight,
  descriptionLines = 3,
  fontSize = 14,
  accentColor = '#9F4EFF',
  containerRounding = 0,
  innerContainerRounding = 0,
  buttonRounding = 0,
  tagRounding = 20,
  textColor = '#f0f0f1',
  buttonBackground,
  buttonForeground,
  borderWidth = 3,
  lightenButtonColor = 0.12,
  filledButtonInscription = 'Buy now',
  outlinedButtonInscription = 'Add to cart',
  swapButtons = false,
  activeComponentScale = 1.024,
  mirrorTags = false,
  darkTextInTags = false,
} = props

const rotation = ref('0deg')
const borderGradient = ref('')

const calculatedInnerWidth = computed(() =>
  innerWidth || outerWidth - 2 * borderWidth - outerContainerSize
)
const calculatedInnerHeight = computed(() =>
  innerHeight || outerHeight - 2 * borderWidth - outerContainerSize
)
const backgroundPatternSize = computed(() =>
  `${Math.floor((Math.min(calculatedInnerWidth.value, calculatedInnerHeight.value)) / 16)}px`
)

const containerStyle = computed(() => ({
  '--rotation': rotation.value,
  '--border-gradient': borderGradient.value,
  '--accent-color': accentColor,
  '--text-color': textColor,
  '--background-pattern-size': backgroundPatternSize.value,
  '--active-component-scale': `${activeComponentScale}`,
  width: `${outerWidth}px`,
  height: `${outerHeight}px`,
  borderRadius: `${containerRounding}px`,
  borderWidth: `${borderWidth}px`,
}))

const innerContainerStyle = computed(() => ({
  borderRadius: `${innerContainerRounding}px`,
  width: `${calculatedInnerWidth.value}px`,
  height: `${calculatedInnerHeight.value}px`,
}))

const lightenColor = (hex: string, percent: number): string => {
  hex = hex.replace(/^#/, '')
  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(4, 6), 16)
  const isLightening = percent >= 0
  const adjustment = Math.abs(percent)
  if (isLightening) {
    r = Math.min(255, Math.floor(r + (255 - r) * adjustment))
    g = Math.min(255, Math.floor(g + (255 - g) * adjustment))
    b = Math.min(255, Math.floor(b + (255 - b) * adjustment))
  } else {
    r = Math.max(0, Math.floor(r * (1 - adjustment)))
    g = Math.max(0, Math.floor(g * (1 - adjustment)))
    b = Math.max(0, Math.floor(b * (1 - adjustment)))
  }
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).padStart(6, '0')}`
}

const filledChronicleButtonHoverColor = lightenColor(accentColor, lightenButtonColor)
const oulinedChronicleButtonHoverColor = lightenColor(accentColor, lightenButtonColor)

const isRTLCheck = (text: string): boolean => {
  return /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(text)
}

const displayedTitle = computed(() =>
  title.length > 27 ? title.slice(0, 24) + '...' : title
)

const directionValue = (text: string): 'ltr' | 'rtl' => (isRTLCheck(text) ? 'rtl' : 'ltr')

const descriptionStyle = computed(() => ({
  fontSize: `${fontSize}px`,
  WebkitLineClamp: descriptionLines,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textAlign: 'center' as const,
  marginTop: '0px',
  color: 'var(--text-color)',
  direction: directionValue(description),
}))

const titleStyle = computed(() => ({
  fontSize: '21px',
  fontWeight: 'bold',
  letterSpacing: '-.01em',
  lineHeight: 'normal',
  color: 'var(--text-color)',
  textAlign: 'center' as const,
  marginTop: '5px',
  direction: directionValue(title),
}))

const priceTagStyle = computed(() => ({
  position: 'absolute' as const,
  top: '10px',
  ...(mirrorTags ? { left: '10px', right: 'auto' } : { right: '10px', left: 'auto' }),
  borderRadius: `${tagRounding}px`,
  backgroundColor: 'var(--border-color)',
  padding: '8px 15px',
  fontSize: '12px',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold',
}))

const discountTagStyle = computed(() => ({
  position: 'absolute' as const,
  top: '51px',
  ...(mirrorTags ? { left: '10px', right: 'auto' } : { right: '10px', left: 'auto' }),
  backgroundColor: 'var(--border-color)',
  padding: '8px 15px',
  fontSize: '12px',
  zIndex: 1,
  borderRadius: `${tagRounding}px`,
  fontWeight: 'bold',
  direction: discountTag ? directionValue(discountTag) : 'ltr',
  color: darkTextInTags ? '#111111' : 'var(--text-color)',
}))

const conditionTagStyle = computed(() => ({
  position: 'absolute' as const,
  top: '10px',
  ...(mirrorTags ? { right: '10px', left: 'auto' } : { left: '10px', right: 'auto' }),
  backgroundColor: 'rgba(0,0,0,0.7)',
  color: 'var(--text-color)',
  padding: '8px 15px',
  fontSize: '12px',
  zIndex: 1,
  borderRadius: `${tagRounding}px`,
  fontWeight: 'bold',
}))

const handleMouseMove = (e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  const angle = Math.atan2(y, x)
  rotation.value = `${angle}rad`
  borderGradient.value = `conic-gradient(from var(--rotation), ${accentColor} 0deg, ${accentColor} 90deg, ${outlineColor} 90deg, ${outlineColor} 360deg)`
}

onMounted(() => {
  borderGradient.value = `conic-gradient(from 0deg, ${accentColor} 0deg, ${accentColor} 90deg, ${outlineColor} 90deg, ${outlineColor} 360deg)`
})
watch([() => accentColor, () => outlineColor], () => {
  borderGradient.value = `conic-gradient(from 0deg, ${accentColor} 0deg, ${accentColor} 90deg, ${outlineColor} 90deg, ${outlineColor} 360deg)`
})
</script>

<style>
.product-card {
  --border-color: var(--accent-color);
  --hover-text-color: var(--accent-color);
  --active-component-scale: 1.024;
  border: solid transparent;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-image: linear-gradient(#050505, #050505), var(--border-gradient);
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  font-family: "Arial", "Alef", sans-serif;
}
.product-card:hover {
  transform: scale(var(--active-component-scale));
}
.product-inner-container {
  background-color: black;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: linear-gradient(45deg, rgba(230, 230, 230, 0.15) 25%, transparent 25%, transparent 75%, rgba(240, 240, 240, 0.15) 75%),
              linear-gradient(-45deg, rgba(240, 240, 240, 0.15) 25%, transparent 25%, transparent 75%, rgba(230, 230, 230, 0.15) 75%);
  background-size: var(--background-pattern-size) var(--background-pattern-size);
}
.product-image-container {
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
}
.product-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 16px;
  position: relative;
  align-items: center;
}
.product-title {
  font-size: 21px;
  font-weight: bold;
  letter-spacing: -.01em;
  line-height: normal;
  color: var(--text-color);
  text-align: center;
  margin-top: 5px;
}
.product-description {
  color: var(--text-color);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: center;
}
.product-button-container {
  display: flex;
  gap: 12px;
  margin-top: 8px;
  margin-bottom: 2px;
}
.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.product-card:hover .product-image {
  transform: scale(1.1);
}
.product-card:hover .product-title {
  color: var(--hover-text-color);
}
.product-price-tag {
  /* Dynamic style via computed */
}
.product-condition-tag {
  /* Dynamic style via computed */
}
.product-discount-tag {
  /* Dynamic style via computed */
}
</style>
