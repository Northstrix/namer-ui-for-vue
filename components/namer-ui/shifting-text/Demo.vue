<template>
  <div ref="containerRef" style="width: 100%; height: 100%">
    <div
      :key="remountKey"
      style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 160px; overflow: hidden"
      :style="{
        paddingTop: paddingY,
        paddingBottom: paddingY,
      }"
    >
      <ShiftingText
        :fontSize="topFontSize"
        :intensity="topIntensity"
      />

      <ShiftingText
        text="נמר UI"
        direction="rtl"
        :fontSize="bottomFontSize"
        :intensity="bottomIntensity"
        :amplitude="4"
        :centerOffset="22"
        :pace="16"
        :enter="300"
        :hold="70"
        :exit="9"
        :pause="90"
        :liveVisibleAtHome="false"
        :fontWeight="700"
        letterSpacing="0.2em"
        :frontColor="['#5300FA', '#00A7FA', '#D000FA']"
        :backColor="['#291255', '#1D3B54', '#491854']"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from "vue";
import ShiftingText from "./ShiftingText.vue";

function lerp(min: number, max: number, t: number) {
  return min + t * (max - min);
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function interpolate(width: number, minWidth: number, maxWidth: number, minValue: number, maxValue: number) {
  if (width <= minWidth) return minValue;
  if (width >= maxWidth) return maxValue;
  const t = clamp01((width - minWidth) / (maxWidth - minWidth));
  return lerp(minValue, maxValue, t);
}

function getTopFontSize(width: number) {
  return interpolate(width, 320, 720, 64 * 0.2, 128);
}

function getBottomFontSize(width: number) {
  return interpolate(width, 320, 720, 76 * 0.2, 76);
}

function getPaddingY(width: number) {
  return interpolate(width, 320, 720, 36 * 0.2, 64);
}

function getTopIntensity(width: number) {
  return interpolate(width, 320, 720, 0.64 * 0.28, 0.64);
}

function getBottomIntensity(width: number) {
  return interpolate(width, 320, 720, 0.98 * 0.28, 0.98);
}

const containerRef = ref<HTMLElement | null>(null);
const resizeTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

const measuredWidth = ref(720);
const debouncedWidth = ref(720);

const measure = () => {
  if (containerRef.value) {
    measuredWidth.value = containerRef.value.clientWidth;
  }
};

onMounted(() => {
  measure();

  const observer = new ResizeObserver(() => {
    if (resizeTimeout.value) clearTimeout(resizeTimeout.value);
    resizeTimeout.value = setTimeout(() => {
      measure();
    }, 1200);
  });

  if (containerRef.value) {
    observer.observe(containerRef.value);
  }

  onBeforeUnmount(() => {
    if (resizeTimeout.value) clearTimeout(resizeTimeout.value);
    observer.disconnect();
  });
});

watch(measuredWidth, (w) => {
  debouncedWidth.value = w;
});

const topFontSize = computed(() => `${getTopFontSize(debouncedWidth.value)}px`);
const bottomFontSize = computed(() => `${getBottomFontSize(debouncedWidth.value)}px`);
const paddingY = computed(() => `${getPaddingY(debouncedWidth.value)}px`);
const topIntensity = computed(() => getTopIntensity(debouncedWidth.value));
const bottomIntensity = computed(() => getBottomIntensity(debouncedWidth.value));

const remountKey = computed(() => `shifting-${debouncedWidth.value}`);
</script>