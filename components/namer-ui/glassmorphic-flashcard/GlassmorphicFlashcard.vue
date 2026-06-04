<template>
  <div
    class="namerFlashcardCardContainer"
    :style="cardContainerStyle"
    :dir="isRTL ? 'rtl' : 'ltr'"
  >
    <div
      class="namerFlashcardCardInner"
      :class="{ namerFlashcardIsFlipped: isFlippedComputed }"
    >
      <!-- Front Face -->
      <div
        class="namerFlashcardCardFace namerFlashcardCardFront"
        :style="frontFaceStyle"
      >
        <img
          v-if="imageUrl"
          :src="imageUrl"
          class="namerFlashcardCardImage"
          draggable="false"
        />

        <div
          class="namerFlashcardOverlay"
          :style="overlayStyle"
        ></div>

        <div
          class="namerFlashcardCardContent"
          :style="cardContentStyle"
        >
          <div
            class="namerFlashcardTagContainer"
          >
            <div class="namerFlashcardTag" :style="tagStyle">
              <span class="namerFlashcardTagText" :style="tagTextStyle">{{ frontTagLabel }}</span>
            </div>
          </div>

          <!-- Reveal button: bottom of padded content, full width -->
          <div class="namerFlashcardFrontButtonWrapper">
            <button
              class="namerFlashcardGlassButton"
              :style="frontButtonStyle"
              @click.stop="setFlipped(true)"
            >
              {{ revealText }}
            </button>
          </div>
        </div>
      </div>

      <!-- Back Face -->
      <div
        class="namerFlashcardCardFace namerFlashcardCardBack"
        :style="backFaceStyle"
      >
        <div
          v-if="showDots"
          class="namerFlashcardDotsLayer"
          :style="dotsStyle"
        ></div>

        <div
          class="namerFlashcardCardContent"
          :style="cardContentStyle"
        >
          <div
            class="namerFlashcardTagContainer"
          >
            <div class="namerFlashcardTag" :style="tagStyle">
              <span class="namerFlashcardTagText" :style="tagTextStyle">{{ backTagLabel }}</span>
            </div>
          </div>
          <div
            class="namerFlashcardWordInfo"
            :style="wordInfoStyle"
          >
            <h2 :style="wordHeadingStyle">
              {{ word }}
            </h2>

            <!-- Lamp-like separator with hover behavior -->
            <div
              class="namerFlashcardLampSeparator"
              :style="lampSeparatorStyle"
            ></div>

            <p :style="definitionStyle">
              {{ definition }}
            </p>

            <button
              v-if="showAudioButton && audioUrl"
              class="namerFlashcardGlassButton namerFlashcardAudioButton"
              :style="audioButtonStyle"
              @click.stop="playAudio"
              style="display: flex; align-items: center; gap: 2px;"
            >
              <span
                class="namerFlashcardAudioIconWrapper"
                :style="audioIconWrapperStyle"
                style="display: flex; align-items: center; justify-content: center;"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  :width="audioIconSize"
                  :height="audioIconSize"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  :stroke-width="audioIconStrokeWidth"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
                  />
                  <path d="M16 9a5 5 0 0 1 0 6" />
                  <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
                </svg>
              </span>
              <span :style="audioButtonTextStyle">
                {{ audioButtonText }}
              </span>
            </button>
          </div>

          <div class="namerFlashcardBackFooter">
            <button
              class="namerFlashcardGlassButton"
              :style="backButtonStyle"
              @click.stop="setFlipped(false)"
            >
              {{ hideText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  widthForNamerFlashcard: { type: Number, default: 412 },
  aspectRatioForNamerFlashcard: { type: Number, default: 217 / 241 },
  maxWidthForNamerFlashcard: { type: [Number, String], default: 412 },
  paddingForNamerFlashcard: { type: String, default: '16px' },

  cardRadiusForNamerFlashcard: { type: String, default: '24px' },
  cardBlurForNamerFlashcard: { type: Number, default: 7.64 },
  cardBodyColorForNamerFlashcard: {
    type: String,
    default: 'rgba(10, 10, 10, 0.36)',
  },
  cardBorderColorForNamerFlashcard: {
    type: String,
    default: 'rgba(255, 255, 255, 0.12)',
  },
  cardBorderWidthForNamerFlashcard: {
    type: String,
    default: '1px',
  },

  overlayColorForNamerFlashcard: {
    type: String,
    default: 'rgba(0, 0, 0, 0.12)',
  },

  backGradientFromForNamerFlashcard: {
    type: String,
    default: 'rgba(20, 20, 20, 0.84)',
  },
  backGradientToForNamerFlashcard: {
    type: String,
    default: 'rgba(10, 10, 10, 0.9)',
  },

  imageUrl: { type: String, default: '' },
  word: { type: String, default: '' },
  definition: { type: String, default: '' },
  isRTL: { type: Boolean, default: false },

  revealText: { type: String, default: 'Reveal' },
  hideText: { type: String, default: 'Hide' },
  audioButtonText: { type: String, default: 'Listen' },
  showAudioButton: { type: Boolean, default: true },
  audioUrl: { type: String, default: '' },

  frontTagText: { type: String, default: '' },
  backTagText: { type: String, default: '' },

  tagBgColorForNamerFlashcard: {
    type: String,
    default: 'rgba(0, 0, 0, 0.36)',
  },
  tagBorderColorForNamerFlashcard: {
    type: String,
    default: 'rgba(255, 255, 255, 0.12)',
  },
  tagBorderRadiusForNamerFlashcard: {
    type: String,
    default: '12px',  // match glass button
  },
  tagPaddingForNamerFlashcard: {
    type: String,
    default: '8px 12px',
  },
  tagBlurForNamerFlashcard: {
    type: Number,
    default: 12,  // match glass button blur
  },

  // === TAG TEXT STYLING (separate from button) ===
  tagFontSizeForNamerFlashcard: {
    type: String,
    default: '11px',  // independent control for tag text size
  },
  tagFontWeightForNamerFlashcard: {
    type: String,
    default: '700',  // independent control for tag text weight
  },
  tagFontColorForNamerFlashcard: {
    type: String,
    default: '#ffffff',  // independent control for tag text color (foreground)
  },
  tagTextLetterSpacingForNamerFlashcard: {
    type: String,
    default: '0.01em',  // independent control for tag text spacing
  },

  // === TAG ALIGNMENT ===
  tagAlignForNamerFlashcard: {
    type: String,
    default: 'flex-start',  // or 'center', 'flex-end' for tag container alignment
  },

  wordFontSizeForNamerFlashcard: {
    type: String,
    default: '2.25rem',
  },
  wordFontWeightForNamerFlashcard: {
    type: String,
    default: '700',
  },
  wordColorForNamerFlashcard: {
    type: String,
    default: '#ffffff',
  },
  wordMarginForNamerFlashcard: {
    type: String,
    default: '0',
  },

  definitionFontSizeForNamerFlashcard: {
    type: String,
    default: '14px',
  },
  definitionColorForNamerFlashcard: {
    type: String,
    default: 'rgba(255, 255, 255, 0.6)',
  },
  definitionLineHeightForNamerFlashcard: {
    type: String,
    default: '1.6',
  },
  definitionMaxWidthForNamerFlashcard: {
    type: String,
    default: '280px',
  },
  definitionFontStyleForNamerFlashcard: {
    type: String,
    default: 'italic',
  },

  wordAreaAlignForNamerFlashcard: {
    type: String,
    default: 'center',
  },

  lampColorForNamerFlashcard: {
    type: String,
    default: '#752bff',
  },
  lampWidthForNamerFlashcard: {
    type: String,
    default: '60%',
  },
  lampOpacityForNamerFlashcard: {
    type: Number,
    default: 0.4,
  },
  lampHoverWidthForNamerFlashcard: {
    type: String,
    default: '80%',
  },
  lampHoverOpacityForNamerFlashcard: {
    type: Number,
    default: 0.64,
  },

  showDots: { type: Boolean, default: true },
  dotsOpacityForNamerFlashcard: {
    type: Number,
    default: 0.65,
  },
  dotsColorForNamerFlashcard: {
    type: String,
    default: 'rgba(255, 255, 255, 0.1)',
  },
  dotsSizeForNamerFlashcard: {
    type: String,
    default: '1.3rem',
  },

  buttonBgColorForNamerFlashcard: {
    type: String,
    default: 'rgba(255, 255, 255, 0.05)',
  },
  buttonBgHoverColorForNamerFlashcard: {
    type: String,
    default: 'rgba(255, 255, 255, 0.16)',
  },
  buttonBorderColorForNamerFlashcard: {
    type: String,
    default: 'rgba(255, 255, 255, 0.12)',
  },
  buttonBorderHoverColorForNamerFlashcard: {
    type: String,
    default: 'rgba(255, 255, 255, 0.24)',
  },
  buttonBorderWidthForNamerFlashcard: {
    type: String,
    default: '1px',
  },
  buttonBorderRadiusForNamerFlashcard: {
    type: String,
    default: '12px',
  },
  buttonPaddingForNamerFlashcard: {
    type: String,
    default: '12px 14px',
  },
  buttonFontSizeForNamerFlashcard: {
    type: String,
    default: '13px',
  },
  buttonFontWeightForNamerFlashcard: {
    type: String,
    default: '700',
  },
  buttonLetterSpacingForNamerFlashcard: {
    type: String,
    default: '0.01em',
  },
  buttonTextColorForNamerFlashcard: {
    type: String,
    default: '#ffffff',
  },
  buttonBlurForNamerFlashcard: {
    type: Number,
    default: 12,
  },

  frontButtonBottomPaddingForNamerFlashcard: {
    type: String,
    default: '32px',
  },

  audioButtonBgColorForNamerFlashcard: { type: String, default: '' },
  audioButtonBorderColorForNamerFlashcard: { type: String, default: '' },
  audioButtonPaddingForNamerFlashcard: {
    type: String,
    default: '10px 20px',
  },
  audioButtonFontSizeForNamerFlashcard: {
    type: String,
    default: '11px',
  },
  audioButtonBorderRadiusForNamerFlashcard: {
    type: String,
    default: '50px',
  },
  audioButtonFontWeightForNamerFlashcard: {
    type: String,
    default: '700',
  },
  audioButtonTextColorForNamerFlashcard: {
    type: String,
    default: '#ffffff',
  },
  audioIconSizeForNamerFlashcard: {
    type: String,
    default: '14',
  },
  audioIconStrokeWidthForNamerFlashcard: {
    type: Number,
    default: 2,
  },
  audioIconColorForNamerFlashcard: {
    type: String,
    default: '#ffffff',
  },

  modelValue: { type: Boolean, default: undefined },
})

const emit = defineEmits(['update:modelValue'])

const isFlippedLocal = ref(false)
const isControlled = computed(() => props.modelValue !== undefined)
const isFlippedComputed = computed(() =>
  isControlled.value ? props.modelValue : isFlippedLocal.value,
)

const setFlipped = (value) => {
  if (isControlled.value) emit('update:modelValue', value)
  else isFlippedLocal.value = value
}

const cardContainerStyle = computed(() => {
  const w = props.widthForNamerFlashcard
  const h = Math.round(w / props.aspectRatioForNamerFlashcard)
  const maxWidth =
    typeof props.maxWidthForNamerFlashcard === 'number'
      ? `${props.maxWidthForNamerFlashcard}px`
      : props.maxWidthForNamerFlashcard

  return {
    width: `${w}px`,
    height: `${h}px`,
    maxWidth,
    '--lamp-color': props.lampColorForNamerFlashcard,
    '--lamp-width': props.lampWidthForNamerFlashcard,
    '--lamp-opacity': props.lampOpacityForNamerFlashcard,
    '--lamp-hover-width': props.lampHoverWidthForNamerFlashcard,
    '--lamp-hover-opacity': props.lampHoverOpacityForNamerFlashcard,
    '--glass-button-text-color': props.buttonTextColorForNamerFlashcard,
    '--glass-button-bg': props.buttonBgColorForNamerFlashcard,
    '--glass-button-bg-hover': props.buttonBgHoverColorForNamerFlashcard,
    '--glass-button-border-color': props.buttonBorderColorForNamerFlashcard,
    '--glass-button-border-hover': props.buttonBorderHoverColorForNamerFlashcard,
    '--glass-button-shadow-hover': props.buttonBorderHoverColorForNamerFlashcard,
    '--glass-button-border-width': props.buttonBorderWidthForNamerFlashcard,
    '--glass-button-blur': `${props.buttonBlurForNamerFlashcard}px`,
    '--glass-button-blur-hover': `${props.buttonBlurForNamerFlashcard + 4}px`,
    '--glass-button-border-radius': props.buttonBorderRadiusForNamerFlashcard,
    '--glass-button-padding': props.buttonPaddingForNamerFlashcard,
    '--glass-button-font-size': props.buttonFontSizeForNamerFlashcard,
    '--glass-button-font-weight': props.buttonFontWeightForNamerFlashcard,
    '--glass-button-letter-spacing': props.buttonLetterSpacingForNamerFlashcard,
    '--tag-align': props.tagAlignForNamerFlashcard,
    '--front-button-bottom-padding': props.frontButtonBottomPaddingForNamerFlashcard,
  }
})

const frontTagLabel = computed(() => {
  if (props.frontTagText) return props.frontTagText
  return 'English'
})

const backTagLabel = computed(() => {
  if (props.backTagText) return props.backTagText
  return 'Vocabulary'
})

const frontFaceStyle = computed(() => ({
  borderRadius: props.cardRadiusForNamerFlashcard,
  background: props.cardBodyColorForNamerFlashcard,
  backdropFilter: `blur(${props.cardBlurForNamerFlashcard}px)`,
  WebkitBackdropFilter: `blur(${props.cardBlurForNamerFlashcard}px)`,
  border: `${props.cardBorderWidthForNamerFlashcard} solid ${props.cardBorderColorForNamerFlashcard}`,
}))

const backFaceStyle = computed(() => ({
  borderRadius: props.cardRadiusForNamerFlashcard,
  background: `linear-gradient(180deg, ${props.backGradientFromForNamerFlashcard} 0%, ${props.backGradientToForNamerFlashcard} 100%)`,
  backdropFilter: `blur(${props.cardBlurForNamerFlashcard}px)`,
  WebkitBackdropFilter: `blur(${props.cardBlurForNamerFlashcard}px)`,
  border: `${props.cardBorderWidthForNamerFlashcard} solid ${props.cardBorderColorForNamerFlashcard}`,
}))

const overlayStyle = computed(() => ({
  background: props.overlayColorForNamerFlashcard,
}))

const cardContentStyle = computed(() => ({
  padding: props.paddingForNamerFlashcard,
}))

const tagStyle = computed(() => ({
  background: props.tagBgColorForNamerFlashcard,
  border: `1px solid ${props.tagBorderColorForNamerFlashcard}`,
  borderRadius: props.tagBorderRadiusForNamerFlashcard,
  padding: props.tagPaddingForNamerFlashcard,
  backdropFilter: `blur(${props.tagBlurForNamerFlashcard}px)`,
  WebkitBackdropFilter: `blur(${props.tagBlurForNamerFlashcard}px)`,
}))

const tagTextStyle = computed(() => ({
  color: props.tagFontColorForNamerFlashcard,
  fontSize: props.tagFontSizeForNamerFlashcard,
  fontWeight: props.tagFontWeightForNamerFlashcard,
  letterSpacing: props.tagTextLetterSpacingForNamerFlashcard,
}))

const wordInfoStyle = computed(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems:
    props.wordAreaAlignForNamerFlashcard === 'flex-start'
      ? 'flex-start'
      : props.wordAreaAlignForNamerFlashcard === 'flex-end'
      ? 'flex-end'
      : 'center',
  justifyContent: 'center',
  textAlign:
    props.wordAreaAlignForNamerFlashcard === 'flex-start'
      ? 'left'
      : props.wordAreaAlignForNamerFlashcard === 'flex-end'
      ? 'right'
      : 'center',
}))

const wordHeadingStyle = computed(() => ({
  fontSize: props.wordFontSizeForNamerFlashcard,
  fontWeight: props.wordFontWeightForNamerFlashcard,
  color: props.wordColorForNamerFlashcard,
  margin: props.wordMarginForNamerFlashcard,
}))

const definitionStyle = computed(() => ({
  fontSize: props.definitionFontSizeForNamerFlashcard,
  color: props.definitionColorForNamerFlashcard,
  lineHeight: props.definitionLineHeightForNamerFlashcard,
  maxWidth: props.definitionMaxWidthForNamerFlashcard,
  margin: '0',
  fontStyle: props.definitionFontStyleForNamerFlashcard,
}))

const lampSeparatorStyle = computed(() => ({
  height: '1px',
  margin: '1.5rem auto',
}))

const dotsStyle = computed(() => ({
  opacity: props.dotsOpacityForNamerFlashcard,
  backgroundImage: `radial-gradient(${props.dotsColorForNamerFlashcard} 1px, transparent 1px)`,
  backgroundSize: `${props.dotsSizeForNamerFlashcard} ${props.dotsSizeForNamerFlashcard}`,
}))

const baseButtonStyle = computed(() => ({
  color: props.buttonTextColorForNamerFlashcard,
  // background and border are now handled in CSS via CSS variables
  borderRadius: props.buttonBorderRadiusForNamerFlashcard,
  padding: props.buttonPaddingForNamerFlashcard,
  fontSize: props.buttonFontSizeForNamerFlashcard,
  fontWeight: props.buttonFontWeightForNamerFlashcard,
  letterSpacing: props.buttonLetterSpacingForNamerFlashcard,
  backdropFilter: `blur(${props.buttonBlurForNamerFlashcard}px)`,
  WebkitBackdropFilter: `blur(${props.buttonBlurForNamerFlashcard}px)`,
  // border removed from inline style
}))

const frontButtonStyle = computed(() => ({
  ...baseButtonStyle.value,
  width: '100%',
}))

const backButtonStyle = computed(() => ({
  ...baseButtonStyle.value,
  width: '100%',
}))

const audioButtonStyle = computed(() => ({
  ...baseButtonStyle.value,
  // background and border handled in CSS; only override if explicitly provided
  background: props.audioButtonBgColorForNamerFlashcard || undefined,
  border: props.audioButtonBorderColorForNamerFlashcard || undefined,
  padding: props.audioButtonPaddingForNamerFlashcard,
  fontSize: props.audioButtonFontSizeForNamerFlashcard,
  borderRadius: props.audioButtonBorderRadiusForNamerFlashcard,
  fontWeight: props.audioButtonFontWeightForNamerFlashcard,
  color: props.audioButtonTextColorForNamerFlashcard,
  width: 'auto',
}))

const audioIconWrapperStyle = computed(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '8px',
  color: props.audioIconColorForNamerFlashcard,
}))

const audioButtonTextStyle = computed(() => ({
  color: props.audioButtonTextColorForNamerFlashcard,
  fontWeight: props.audioButtonFontWeightForNamerFlashcard,
}))

const audioIconSize = computed(() => props.audioIconSizeForNamerFlashcard)
const audioIconStrokeWidth = computed(() => props.audioIconStrokeWidthForNamerFlashcard)

const playAudio = () => {
  if (!props.audioUrl) return
  const audio = new Audio(props.audioUrl)
  audio.play()
}
</script>

<style scoped>
.namerFlashcardCardContainer {
  width: 100%;
  position: relative;
  perspective: 3000px;
  will-change: transform;
}

.namerFlashcardCardInner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transform-style: preserve-3d;
  cursor: default;
}

.namerFlashcardCardInner.namerFlashcardIsFlipped {
  transform: rotateY(180deg);
}

.namerFlashcardCardFace {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  overflow: hidden;
  transform-style: preserve-3d;
}

.namerFlashcardCardFront .namerFlashcardCardImage {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  z-index: 0;
}

.namerFlashcardOverlay {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.namerFlashcardCardFront .namerFlashcardCardContent {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.namerFlashcardCardBack {
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
}

.namerFlashcardCardBack .namerFlashcardCardContent {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.namerFlashcardDotsLayer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.namerFlashcardLampSeparator {
  position: relative;
  width: var(--lamp-width);
  height: 1px;
  margin: 1.5rem auto;
  background: linear-gradient(
    90deg,
    transparent,
    var(--lamp-color),
    transparent
  );
  opacity: var(--lamp-opacity);
  transition: width 0.3s ease, opacity 0.3s ease;
}

.namerFlashcardCardInner:hover .namerFlashcardLampSeparator {
  width: var(--lamp-hover-width);
  opacity: var(--lamp-hover-opacity);
}

.namerFlashcardWordInfo {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 2;
}

.namerFlashcardTagContainer {
  display: flex;
  width: 100%;
  margin-bottom: 12px;
  justify-content: var(--tag-align, flex-start);
}

.namerFlashcardTag {
  display: inline-flex;
  align-items: center;
  /* Background, border, blur from inline style */
}

.namerFlashcardTagText {
  /* Text styling from inline style via tagTextStyle */
  white-space: nowrap;
}

.namerFlashcardFrontButtonWrapper {
  margin-top: auto;
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: var(--front-button-bottom-padding);
  box-sizing: border-box;
}

.namerFlashcardBackFooter {
  margin-top: auto;
  padding-top: 16px;
}

.namerFlashcardAudioButton {
  margin-top: 16px;
  width: auto;
}

.namerFlashcardAudioIconWrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Glass button base styles */
.namerFlashcardGlassButton {
  color: var(--glass-button-text-color);
  background: var(--glass-button-bg);
  border: var(--glass-button-border-width) solid var(--glass-button-border-color);
  border-radius: var(--glass-button-border-radius, 12px);
  padding: var(--glass-button-padding, 12px 14px);
  font-size: var(--glass-button-font-size, 12px);
  font-weight: var(--glass-button-font-weight, 700);
  letter-spacing: var(--glass-button-letter-spacing, 0.01em);
  backdrop-filter: blur(var(--glass-button-blur));
  -webkit-backdrop-filter: blur(var(--glass-button-blur));
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.12s ease;
  cursor: pointer;
}

.namerFlashcardGlassButton:hover {
  background: var(--glass-button-bg-hover);
  border-color: var(--glass-button-border-hover);
  box-shadow: 0 0 15px var(--glass-button-shadow-hover);
}

.namerFlashcardGlassButton:active {
  transform: translateY(1px) scale(0.99);
}

.namerFlashcardGlassButton:focus-visible {
  outline: none;
}
</style>