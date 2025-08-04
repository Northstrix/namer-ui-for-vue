<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transform: translateY(24px);
    "
  >
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
      @tooltip-click="onTooltipClick"
      @avatar-hover="onAvatarHover"
      @avatar-unhover="onAvatarUnhover"
    />
    <div
      style="
        margin-top: 32px;
        height: 24px;
        display: flex;
        align-items: center;
        font-size: 1em;
        width: 100%;
        justify-content: flex-start;
        text-align: left;
      "
    >
      <span style="color: #aaa;">Hovered:</span>
      <template v-if="hoveredAvatars.length === 0">
        <span style="color: #bbb; margin-left: 0.5em;">None</span>
      </template>
      <template v-else>
        <span
          v-for="id in hoveredAvatars"
          :key="id"
          style="background: #2d2d2d; color: #fff; border-radius: 6px; padding: 0.2em 0.7em; margin-left: 0.5em;"
        >
          {{ id }}
        </span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AnimatedTooltip from './AnimatedTooltip.vue'
import Swal from 'sweetalert2'

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

// --- Payload type for tooltip-click event ---
interface TooltipClickPayload {
  uniqueId: string;
  item: TooltipItem;
}

// --- Example items ---
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
    designation: '24px higher than Vue tooltip',
    image: 'https://icon.icepanel.io/Technology/svg/TypeScript.svg',
    appearanceEffect: 'from-top',
    tooltipOffsetY: 26,
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
onMounted(() => {
  startOscillation();
});
onBeforeUnmount(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame);
  if (timeoutId) clearTimeout(timeoutId);
});

// --- Hovered avatars state ---
const hoveredAvatars = ref<string[]>([]);
function onAvatarHover({ id }: { uniqueId: string; id: string }) {
  if (!hoveredAvatars.value.includes(id)) hoveredAvatars.value.push(id);
}
function onAvatarUnhover({ id }: { uniqueId: string; id: string }) {
  hoveredAvatars.value = hoveredAvatars.value.filter((x) => x !== id);
}

// --- SweetAlert2 Toast config ---
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: { popup: 'my-toast' },
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  }
})

// --- Type-safe event handler ---
function onTooltipClick({ item }: TooltipClickPayload) {
  const message = `Clicked item: <b>${item.name}</b>`;
  Toast.fire({
    html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">${message}</span>
      </div>
    `
  });
}
</script>

<style>
.my-toast {
  background: #22202a !important;
  color: #fff !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 24px rgba(0,0,0,0.25);
  padding: 1rem 1.5rem !important;
}
.toast-flex {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.toast-logo {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: #fff;
  object-fit: contain;
}
.toast-message {
  font-size: 1rem;
  font-weight: 500;
}
</style>
