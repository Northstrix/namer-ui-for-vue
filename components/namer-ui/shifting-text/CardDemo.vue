<template>
  <div
    ref="wrapperRef"
    style="width: 100%; height: 100%; background: #fff; display: flex; align-items: center; justify-content: center; overflow: hidden"
  >
    <div
      :key="remountKey"
      style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden"
    >
      <ShiftingText
        text="Namer UI"
        :fontSize="fontSize"
        :fontWeight="900"
        :intensity="intensity"
        :frontColor="['#00A7FA', '#3A3A3A']"
        :backColor="['#919191']"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import ShiftingText from "./ShiftingText.vue";

type SizeRule = {
  max: number;
  size: string;
  intensity: number;
};

const wrapperRef = ref<HTMLElement | null>(null);

const width = ref(720);
const debouncedWidth = ref(720);

const resizeTimeout = ref<ReturnType<typeof setTimeout> | null>(null);
let observer: ResizeObserver | null = null;

const sizes: SizeRule[] = [
  { max: 312, size: "22px", intensity: 0.2 },
  { max: 320, size: "23px", intensity: 0.21 },
  { max: 340, size: "25px", intensity: 0.22 },
  { max: 360, size: "27px", intensity: 0.23 },
  { max: 380, size: "29px", intensity: 0.24 },
  { max: 400, size: "32px", intensity: 0.25 },
  { max: 420, size: "35px", intensity: 0.26 },
  { max: 440, size: "38px", intensity: 0.27 },
  { max: 460, size: "41px", intensity: 0.28 },
  { max: 480, size: "44px", intensity: 0.29 },
  { max: 500, size: "47px", intensity: 0.3 },
  { max: 520, size: "50px", intensity: 0.31 },
  { max: 540, size: "53px", intensity: 0.32 },
  { max: 560, size: "56px", intensity: 0.33 },
  { max: 580, size: "68px", intensity: 0.34 },
  { max: 600, size: "72px", intensity: 0.35 },
  { max: 620, size: "76px", intensity: 0.52 },
  { max: 640, size: "80px", intensity: 0.55 },
  { max: 680, size: "84px", intensity: 0.61 },
  { max: 700, size: "92px", intensity: 0.64 },
  { max: 740, size: "96px", intensity: 0.65 },
  { max: 760, size: "102px", intensity: 0.66 },
  { max: 800, size: "108px", intensity: 0.7 },
  { max: 820, size: "110px", intensity: 0.71 },
  { max: 840, size: "116px", intensity: 0.74 },
  { max: Infinity, size: "124px", intensity: 0.76 },
];

function measure() {
  if (wrapperRef.value) {
    width.value = wrapperRef.value.clientWidth;
  }
}

function scheduleMeasure() {
  if (resizeTimeout.value) clearTimeout(resizeTimeout.value);
  resizeTimeout.value = setTimeout(() => {
    measure();
    debouncedWidth.value = width.value;
  }, 1500);
}

onMounted(() => {
  measure();
  debouncedWidth.value = width.value;

  observer = new ResizeObserver(() => {
    scheduleMeasure();
  });

  if (wrapperRef.value) {
    observer.observe(wrapperRef.value);
  }
});

onBeforeUnmount(() => {
  if (resizeTimeout.value) clearTimeout(resizeTimeout.value);
  observer?.disconnect();
});

const fontSize = computed(() => {
  for (const rule of sizes) {
    if (debouncedWidth.value <= rule.max) return rule.size;
  }
  return "128px";
});

const intensity = computed(() => {
  for (const rule of sizes) {
    if (debouncedWidth.value <= rule.max) return rule.intensity;
  }
  return 0.64;
});

const remountKey = computed(() => `shifting-${debouncedWidth.value}`);
</script>