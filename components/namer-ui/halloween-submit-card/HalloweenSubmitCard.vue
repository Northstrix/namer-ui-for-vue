<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps({
  id: { type: String, default: "" },
  isRTL: { type: Boolean, default: false },
  link: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  imageSrc: { type: String, default: "" },
  useDrawIcon: { type: Boolean, default: false },

  // Theme props
  accent: { type: String, default: "#ff7518" },
  accentAdjacentColor: { type: String, default: "#b13d00" },
  accentGlow: { type: String, default: "rgba(255,117,24,0.9)" },
  secondInteractiveColor: { type: String, default: "#5f1907" },
  cardBg: { type: String, default: "#0a0501" },
  innerBg: { type: String, default: "#110903" },
  textColorTitle: { type: String, default: "#fffbe6" },
  textColorDescription: { type: String, default: "#ffa94d" },
  enableGlow: { type: Boolean, default: true },
  innerBorderColor: { type: String, default: "rgba(255,117,24,0.5)" },
  squareBgColor: { type: String, default: "#fdf5d4" },
  bodyGlow: { type: String, default: "rgba(255,130,0,0.3)" },
  squareGlow: { type: String, default: "rgba(255,117,24,0.5)" },
  initialRotation: { type: Number, default: 2.5 },
  centerText: { type: Boolean, default: false },

  aspectRatio: { type: String, default: "16/10" },
  plusIconDurationMs: { type: Number, default: 400 },
  textShiftDurationMs: { type: Number, default: 200 },
  otherDurationMs: { type: Number, default: 300 },
  squareHeightPercent: { type: Number, default: 50 },
  textShiftDistance: { type: String, default: "6px" },
});

const hover = ref(false);
const iconState = ref<"idle" | "cw" | "ccw">("idle");
const imageError = ref(false);
const angle = ref(props.initialRotation);

const shiftX = computed(() => {
  let px = parseInt(props.textShiftDistance);
  if (isNaN(px)) px = 6;
  return props.isRTL ? -px : px;
});

const isExternal = computed(() => /^https?:\/\//i.test(props.link));

const showRegularIconBlock = computed(() => !props.imageSrc);
const showImage = computed(() => props.imageSrc && !imageError.value);
const showBrokenFallback = computed(() => props.imageSrc && imageError.value);

function handleMouseMove(e: MouseEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  angle.value = Math.atan2(-x, y);
}

function handleEnter() {
  hover.value = true;
  iconState.value = "cw";
}
function handleLeave() {
  hover.value = false;
  iconState.value = "ccw";
}

function handleImageError() {
  imageError.value = true;
}

const gradient = computed(() => {
  return `linear-gradient(to bottom, ${props.cardBg}CC, ${props.cardBg}CC),
          linear-gradient(${angle.value}rad,
                          ${props.accent} 0%,
                          ${props.accentAdjacentColor} 50%,
                          ${props.secondInteractiveColor} 90%)`;
});

const baseShadow = computed(() =>
  props.enableGlow
    ? `0 0 0 1px rgba(255,255,255,0.08), 0 0 20px ${props.bodyGlow}, 0 0 40px ${props.bodyGlow}`
    : `0 0 0 1px rgba(255,255,255,0.08)`
);
const hoverShadow = computed(() =>
  props.enableGlow
    ? `0 0 35px ${props.accentGlow}, 0 0 80px ${props.accentGlow}, inset 0 0 20px ${props.accentGlow}`
    : baseShadow.value
);
</script>

<template>
  <a
    class="halloween-card"
    :href="link"
    :target="isExternal ? '_blank' : null"
    :rel="isExternal ? 'noopener noreferrer' : null"
    :style="{
      direction: isRTL ? 'rtl' : 'ltr',
      backgroundImage: gradient,
      boxShadow: hover ? hoverShadow : baseShadow,
    }"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
    @mousemove="handleMouseMove"
  >
    <!-- Area block -->
    <div
      class="aspect-container"
      :style="{
        aspectRatio,
        backgroundColor: innerBg,
        borderColor: innerBorderColor,
        transform: isRTL ? 'scaleX(-1)' : 'none'
      }"
    >
      <!-- Case 1: valid image -->
      <img
        v-if="showImage"
        :src="imageSrc"
        :alt="title"
        class="image"
        @error="handleImageError"
      />

      <!-- Case 2: broken image fallback -->
      <div
        v-else-if="showBrokenFallback"
        class="broken-fallback"
        :style="{
          borderColor: innerBorderColor,
          aspectRatio,
        }"
      ></div>

      <!-- Case 3: regular square + plus -->
      <template v-else-if="showRegularIconBlock">
        <div
          class="dashed-square"
          :class="{ visible: hover }"
          :style="{ borderColor: accent }"
        ></div>

        <div
          class="square"
          :style="{
            backgroundColor: squareBgColor,
            borderColor: innerBorderColor,
            transform: hover
              ? 'translate(calc(-50% + 15px), calc(-50% - 15px))'
              : 'translate(-50%, -50%)',
            boxShadow: enableGlow
              ? hover
                ? '0 0 40px ' + squareGlow
                : '0 0 20px ' + squareGlow
              : 'none'
          }"
        >
          <!-- Plus Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 24 24"
            fill="none"
            :stroke="accent"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            :class="{
              spinCW: iconState === 'cw',
              spinCCW: iconState === 'ccw'
            }"
            :style="{ '--plusDur': plusIconDurationMs + 'ms' }"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </div>
      </template>
    </div>

    <!-- Text content -->
    <div
      class="text-content"
      :style="{
        textAlign: centerText ? 'center' : isRTL ? 'right' : 'left',
        transform: hover ? `translateX(${shiftX}px)` : 'translateX(0)',
        transition: `transform ${textShiftDurationMs}ms ease`
      }"
    >
      <h3
        class="title"
        :style="{ color: textColorTitle, textShadow: '0 0 8px ' + accent }"
      >
        {{ title }}
      </h3>
      <p
        v-if="description"
        class="description"
        :style="{ color: textColorDescription }"
      >
        {{ description }}
      </p>
    </div>
  </a>
</template>

<style scoped>
.halloween-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 360px;
  border-radius: 16px;
  border: 2px solid transparent;
  padding: 16px;
  box-sizing: border-box;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-color: transparent;
  transition: box-shadow 0.45s ease, transform 0.45s ease;
  cursor: pointer;
  text-decoration: none;
}

.aspect-container {
  position: relative;
  width: 100%;
  border: 2px solid;
  border-radius: 16px;
  display: grid;
  place-items: center;
  overflow: hidden;
  transition: all 0.5s ease;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

/* Empty outlined fallback box for broken image */
.broken-fallback {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid;
  border-radius: 16px;
  background-color: transparent;
}

/* Animated dashed */
.dashed-square {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 50%;
  aspect-ratio: 1 / 1;
  border: 2px dashed;
  border-radius: 16px;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.5s ease;
}
.dashed-square.visible {
  opacity: 1;
}

/* Square + icon area */
.square {
  position: absolute;
  top: 50%;
  left: 50%;
  aspect-ratio: 1 / 1;
  height: 50%;
  border: 1px solid;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  overflow: visible;
}

/* Plus Icon Animation */
@keyframes spinCW {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes spinCCW {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
svg.spinCW {
  animation: spinCW var(--plusDur, 400ms) ease-in-out 1;
}
svg.spinCCW {
  animation: spinCCW var(--plusDur, 400ms) ease-in-out 1;
}

/* Text Styling */
.text-content {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  user-select: none;
  transition: transform 0.3s ease;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.title {
  font-size: 22px;
  font-weight: 600;
  margin: 0;
}

.description {
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  overflow-wrap: break-word;
  word-break: normal;
  line-height: 1.5;
}
</style>
