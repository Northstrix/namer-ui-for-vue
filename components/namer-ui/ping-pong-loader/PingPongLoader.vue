<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";

const RTL_REGEX = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;

function isRTL(text?: string): boolean {
  return !!text && RTL_REGEX.test(text);
}

interface Props {
  message?: string;
  duration?: number;
  repeatCount?: number;
  backgroundColor?: string;
  gridColor?: string;
  adjacentHandleColor?: string;
  handleBallColor?: string;
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string;
  textColor?: string;
  dotBorderRadius?: string;
  padding?: string;
}

const props = defineProps<Props>();

const defaultColors = {
  backgroundColor: "#0a0a0a",
  gridColor: "#2e2e2e",
  adjacentHandleColor: "#00a0d8",
  handleBallColor: "#ffffff",
  borderColor: "#363636",
  textColor: "#ffffff",
  borderWidth: "1.5px",
  borderRadius: "8px",
  dotBorderRadius: "2px",
  padding: "2.25rem",
};

const frames = [
  [7, 0, 8, 6, 13, 20],
  [7, 13, 20, 16, 27, 21],
  [20, 27, 21, 34, 24, 28],
  [21, 34, 28, 41, 32, 35],
  [28, 41, 35, 48, 40, 42],
  [28, 41, 35, 48, 42, 46],
  [28, 41, 35, 48, 42, 38],
  [28, 41, 35, 48, 30, 21],
  [28, 41, 48, 21, 22, 14],
  [28, 41, 21, 14, 16, 27],
  [28, 21, 14, 10, 20, 27],
  [21, 14, 4, 13, 20, 27],
  [21, 14, 12, 6, 13, 20],
  [21, 14, 6, 13, 20, 11],
  [21, 14, 6, 13, 20, 10],
  [6, 13, 20, 9, 7, 21],
];

const ballPositions = [
  14, 14, 14, 27, 34, 34, 34, 34, 34, 34, 34, 28, 28, 28, 28, 14,
];

const dotCount = 49;

const currentFrameIndex = ref(0);
const repeats = ref(0);
const intervalId = ref<number | null>(null);

const dots = computed(() => Array.from({ length: dotCount }, (_, i) => i));
const dotRefs = ref<HTMLElement[]>([]);

const duration = computed(() => props.duration ?? 60);
const repeatCount = computed(() => props.repeatCount ?? -1);
const bgColor = computed(() => props.backgroundColor ?? defaultColors.backgroundColor);
const gridColor = computed(() => props.gridColor ?? defaultColors.gridColor);
const ballCol = computed(() => props.adjacentHandleColor ?? defaultColors.adjacentHandleColor);
const handleCol = computed(() => props.handleBallColor ?? defaultColors.handleBallColor);
const borderCol = computed(() => props.borderColor ?? defaultColors.borderColor);
const textCol = computed(() => props.textColor ?? defaultColors.textColor);
const borderWidth = computed(() => props.borderWidth ?? defaultColors.borderWidth);
const borderRadius = computed(() => props.borderRadius ?? defaultColors.borderRadius);
const dotBorderRadius = computed(() => props.dotBorderRadius ?? defaultColors.dotBorderRadius);
const padding = computed(() => props.padding ?? defaultColors.padding);

const messageText = computed(() => props.message ?? "Loading Form...");
const rtl = computed(() => isRTL(messageText.value));

function applyFrameToDots(frameIndex: number) {
  const frame = frames[frameIndex];
  const ball = ballPositions[frameIndex];
  dotRefs.value.forEach((dot) => {
    dot.style.backgroundColor = gridColor.value;
    dot.classList.remove("active-ball", "active-handle");
  });
  if (dotRefs.value[ball]) {
    dotRefs.value[ball].style.backgroundColor = ballCol.value;
    dotRefs.value[ball].classList.add("active-ball");
  }
  frame.forEach((i) => {
    if (dotRefs.value[i]) {
      dotRefs.value[i].style.backgroundColor = handleCol.value;
      dotRefs.value[i].classList.add("active-handle");
    }
  });
}

function startAnimation() {
  if (intervalId.value !== null) clearInterval(intervalId.value);
  currentFrameIndex.value = 0;
  repeats.value = 0;
  intervalId.value = window.setInterval(() => {
    applyFrameToDots(currentFrameIndex.value);
    if (currentFrameIndex.value + 1 >= frames.length) {
      if (repeatCount.value !== -1 && repeats.value + 1 >= repeatCount.value) {
        clearInterval(intervalId.value!);
        intervalId.value = null;
        return;
      }
      repeats.value++;
    }
    currentFrameIndex.value = (currentFrameIndex.value + 1) % frames.length;
  }, duration.value);
}

function stopAnimation() {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
}

onMounted(() => {
  startAnimation();
});

onBeforeUnmount(() => {
  stopAnimation();
});

watch([duration, repeatCount], () => {
  startAnimation();
});
</script>

<template>
  <div
    class="pingpong-loader-wrapper"
    role="status"
    aria-label="Loading"
    :style="{
      backgroundColor: bgColor,
      border: `${borderWidth} solid ${borderCol}`,
      borderRadius,
      color: textCol,
      padding,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      userSelect: 'none',
      outline: 'none',
      margin: 0,
    }"
  >
    <div
      class="pingpong-grid"
      aria-hidden="true"
      :style="{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 6px)',
        gridTemplateRows: 'repeat(7, 6px)',
        gap: '2px',
        width: 'fit-content',
        height: 'fit-content',
      }"
    >
      <div
        v-for="(dot, index) in dots"
        :key="index"
        ref="dotRefs"
        class="pingpong-dot"
        :style="{ backgroundColor: gridColor, borderRadius: dotBorderRadius }"
      />
    </div>
    <div
      class="pingpong-message"
      :style="{
        marginTop: '26px',
        fontWeight: 600,
        fontSize: '1.08rem',
        userSelect: 'none',
        textAlign: 'center',
        direction: rtl ? 'rtl' : 'ltr',
        color: textCol,
        width: '100%',
      }"
    >
      {{ messageText }}
    </div>
  </div>
</template>

<style scoped>
.pingpong-dot {
  width: 6px;
  height: 6px;
  transition: background-color 0.2s ease;
}
.active-ball {
}
.active-handle {
}
.pingpong-message {
}
</style>
