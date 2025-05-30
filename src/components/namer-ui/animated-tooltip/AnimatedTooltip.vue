<template>
  <div class="animated-tooltip" :style="{ gap: global.avatarGap }">
    <div
      v-for="item in items"
      :key="item.id"
      class="tooltip-item"
      @mouseenter="onAvatarMouseEnter(item.id)"
      @mouseleave="onAvatarMouseLeave(item.id)"
    >
      <transition :name="transitionName(item, global)">
        <div
          v-if="hoveredIndex === item.id"
          ref="tooltip"
          class="tooltip-content"
          :style="computedTooltipStyle(item, global, tooltipTransform)"
        >
          <div
            class="tooltip-bg-dots"
            :style="computedTooltipBgStyle(item, global)"
          ></div>
          <div
            class="tooltip-name"
            :style="{
              fontSize: item.nameFontSize || global.nameFontSize,
              color: item.nameColor || global.nameColor,
            }"
          >
            {{ item.name }}
          </div>
          <div
            v-if="item.designation"
            class="tooltip-designation"
            :style="{
              fontSize: item.designationFontSize || global.designationFontSize,
              color: item.designationColor || global.designationColor,
            }"
          >
            {{ item.designation }}
          </div>
          <span
            v-if="borderVisible"
            :style="computedBorderEffectStyle(item, global)"
          ></span>
        </div>
      </transition>
      <!-- Avatar container for outline and container bg -->
      <div
        class="avatar-outline"
        :style="computedAvatarOutlineStyle(item, global)"
      >
        <img
          :src="item.image"
          :alt="item.name"
          class="avatar"
          :class="{ 'avatar-hovered': hoveredIndex === item.id }"
          :style="computedAvatarStyle(item, global)"
          width="56"
          height="56"
          @mousemove="onMouseMove($event, item)"
          @mouseleave="resetTransform"
          @click="handleClick(item)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from 'vue';

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
  appearanceEffect?: string;
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

const props = defineProps<{
  items: TooltipItem[];
  tooltipColor?: string;
  tooltipBorderEffectColors?: string[];
  tooltipBorderEffectRotation?: string;
  tooltipBorderEffectThickness?: string;
  tooltipBorderEffectPercentage?: number;
  tooltipRounding?: number;
  tooltipWidth?: string;
  tooltipPadding?: string;
  appearanceEffect?: string;
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
  borderEffectDelay?: number;
  tooltipOffsetY?: number;
  avatarGap?: string;
  uniqueId: string;
}>();

const emit = defineEmits<{
  (e: 'tooltip-click', payload: { uniqueId: string; item: TooltipItem }): void;
  (e: 'avatar-hover', payload: { uniqueId: string; id: string }): void;
  (e: 'avatar-unhover', payload: { uniqueId: string; id: string }): void;
}>();

const hoveredIndex = ref<string | null>(null);
const bgAnimated = ref(false);
const borderVisible = ref(false);
const tooltipTransform = reactive({ rotate: 0, translateX: 0 });
let borderTimeout: number | undefined;

const global = computed(() => ({
  tooltipColor: props.tooltipColor ?? '#23272f',
  tooltipBorderEffectColors: props.tooltipBorderEffectColors ?? [
    '#888 0',
    '#444 20%',
    'transparent 80%',
  ],
  tooltipBorderEffectRotation: props.tooltipBorderEffectRotation ?? '2.5rad',
  tooltipBorderEffectThickness: props.tooltipBorderEffectThickness ?? '2px',
  tooltipBorderEffectPercentage:
    typeof props.tooltipBorderEffectPercentage === 'number'
      ? props.tooltipBorderEffectPercentage
      : 100,
  tooltipRounding: props.tooltipRounding ?? 12,
  tooltipWidth: props.tooltipWidth ?? '220px',
  tooltipPadding: props.tooltipPadding ?? '1.2rem 1.5rem',
  appearanceEffect: props.appearanceEffect ?? 'from-bottom-right',
  tooltipPosition: props.tooltipPosition ?? 'bottom',
  borderEffectDelay: props.borderEffectDelay ?? 1000,
  nameFontSize: props.nameFontSize ?? '1.1rem',
  designationFontSize: props.designationFontSize ?? '0.95rem',
  nameColor: props.nameColor ?? '#fff',
  designationColor: props.designationColor ?? '#fff',
  imageOutlineColor: props.imageOutlineColor ?? '#0984e3',
  imageOutlineWidth: props.imageOutlineWidth ?? '2px',
  imageRounding: props.imageRounding ?? 20,
  imageOutlineColorOverwrite: props.imageOutlineColorOverwrite,
  tooltipBgColor: props.tooltipBgColor ?? 'rgba(255,255,255,0.08)',
  tooltipDotColor: props.tooltipDotColor ?? 'rgba(255,255,255,0.15)',
  tintTilt: props.tintTilt ?? true,
  tooltipOffsetY:
    typeof props.tooltipOffsetY === 'number' ? props.tooltipOffsetY : 16,
  avatarGap: props.avatarGap ?? '32px',
}));

function showTooltip(id: string) {
  hoveredIndex.value = id;
  bgAnimated.value = false;
  borderVisible.value = false;
  setTimeout(() => {
    bgAnimated.value = true;
  }, 350);
  borderTimeout = window.setTimeout(() => {
    borderVisible.value = true;
  }, getItem('borderEffectDelay', id));
}

function hideTooltip() {
  hoveredIndex.value = null;
  bgAnimated.value = false;
  borderVisible.value = false;
  resetTransform();
  if (borderTimeout) clearTimeout(borderTimeout);
}

function getItem(key: keyof TooltipItem, id: string) {
  const item = props.items.find((i) => i.id === id);
  return (item && item[key]) ?? global.value[key];
}

function computedTooltipStyle(item: TooltipItem, global: any, transform: any) {
  const borderGradient = `linear-gradient(${
    item.tooltipBorderEffectRotation || global.tooltipBorderEffectRotation
  }, ${(item.tooltipBorderEffectColors || global.tooltipBorderEffectColors).join(
    ', '
  )})`;
  const bgColor = item.tooltipColor || global.tooltipColor;
  const width = item.tooltipWidth || global.tooltipWidth;
  const padding = item.tooltipPadding || global.tooltipPadding;
  const borderRadius = (item.tooltipRounding ?? global.tooltipRounding) + 'px';
  const thickness = item.tooltipBorderEffectThickness || global.tooltipBorderEffectThickness;
  const percent =
    typeof item.tooltipBorderEffectPercentage === 'number'
      ? item.tooltipBorderEffectPercentage
      : global.tooltipBorderEffectPercentage;
  const appearance = item.appearanceEffect || global.appearanceEffect;
  const position = item.tooltipPosition || global.tooltipPosition;
  const offsetY =
    typeof item.tooltipOffsetY === 'number'
      ? item.tooltipOffsetY
      : global.tooltipOffsetY;
  const style: any = {
    backgroundImage: `linear-gradient(${bgColor}, ${bgColor}), ${borderGradient}`,
    backgroundOrigin: 'padding-box, border-box',
    backgroundClip: 'padding-box, border-box',
    backgroundSize: `100% 100%, 100% ${percent}%`,
    backgroundRepeat: 'no-repeat',
    border: `${thickness} solid transparent`,
    borderRadius,
    width,
    minWidth: width,
    maxWidth: width,
    padding,
    boxSizing: 'border-box',
    position: 'absolute',
    left: '50%',
    transform: `translateX(-50%) rotate(${transform.rotate}deg) translateX(${transform.translateX}px)`,
    zIndex: 10,
    pointerEvents: 'none',
    transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), opacity 0.2s',
    overflow: 'hidden',
  };
  if (position === 'top') {
    style.bottom = `calc(100% + ${Math.abs(offsetY)}px)`;
    style.top = undefined;
  } else {
    style.top = `calc(100% + ${Math.abs(offsetY)}px)`;
    style.bottom = undefined;
  }
  return style;
}

function computedTooltipBgStyle(item: TooltipItem, global: any) {
  const bgColor = item.tooltipBgColor || global.tooltipBgColor;
  const dotColor = item.tooltipDotColor || global.tooltipDotColor;
  return {
    backgroundImage: `radial-gradient(${dotColor} 1.5px, transparent 1.5px)`,
    backgroundPosition: '50% 50%',
    backgroundSize: '1.1rem 1.1rem',
    backgroundColor: bgColor,
    opacity: 0.9,
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    pointerEvents: 'none',
    transition: 'filter 0.7s cubic-bezier(.4,2,.6,1)',
    filter: bgAnimated.value
      ? 'blur(2.25px) brightness(1.18)'
      : 'blur(0px) brightness(1)',
  };
}

function computedBorderEffectStyle(item: TooltipItem, global: any) {
  return {
    '--border-effect-color':
      (item.tooltipBorderEffectColors && item.tooltipBorderEffectColors[1]) ||
      (global.tooltipBorderEffectColors &&
        global.tooltipBorderEffectColors[1]) ||
      'mediumslateblue',
  };
}

function computedAvatarOutlineStyle(item: TooltipItem, global: any) {
  const outlineWidth =
    parseInt(item.imageOutlineWidth || global.imageOutlineWidth, 10) || 2;
  const rounding = (item.imageRounding ?? global.imageRounding) + 'px';
  const containerColor =
    item.imageOutlineColorOverwrite ||
    global.imageOutlineColorOverwrite ||
    item.imageOutlineColor ||
    global.imageOutlineColor;
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: containerColor,
    borderRadius: rounding,
    padding: `${outlineWidth}px`,
    boxSizing: 'content-box',
    width: '56px',
    height: '56px',
  };
}

function computedAvatarStyle(item: TooltipItem, global: any) {
  const outlineColor = item.imageOutlineColor || global.imageOutlineColor;
  return {
    border: 'none',
    borderRadius: (item.imageRounding ?? global.imageRounding) + 'px',
    width: '56px',
    height: '56px',
    objectFit: 'cover',
    objectPosition: 'top',
    background: outlineColor,
    transition: 'box-shadow 0.2s, border-color 0.2s, transform 0.18s cubic-bezier(.4,2,.6,1)',
    display: 'block',
  };
}

function transitionName(item: TooltipItem, global: any) {
  return item.appearanceEffect || global.appearanceEffect || 'from-bottom-right';
}

function onMouseMove(event: MouseEvent, item: TooltipItem) {
  if (!(item.tintTilt ?? global.value.tintTilt)) return;
  const img = event.target as HTMLElement;
  const rect = img.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const halfWidth = rect.width / 2;
  const x = offsetX - halfWidth;
  const clampedX = Math.max(-100, Math.min(100, x));
  tooltipTransform.rotate = (clampedX / 100) * 45;
  tooltipTransform.translateX = (clampedX / 100) * 50;
}

function resetTransform() {
  tooltipTransform.rotate = 0;
  tooltipTransform.translateX = 0;
}

// New: Avatar hover/unhover event handlers
function onAvatarMouseEnter(id: string) {
  showTooltip(id);
  emit('avatar-hover', { uniqueId: props.uniqueId, id });
}
function onAvatarMouseLeave(id: string) {
  hideTooltip();
  emit('avatar-unhover', { uniqueId: props.uniqueId, id });
}

// NEW: Emit click event with uniqueId and clicked item
function handleClick(item: TooltipItem) {
  emit('tooltip-click', { uniqueId: props.uniqueId, item });
}
</script>

<style scoped>
.animated-tooltip {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.tooltip-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tooltip-content {
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  text-align: center;
  font-family: inherit;
  font-weight: 500;
  overflow: visible;
  transition: background 0.3s, border 0.3s;
  position: relative;
}
.tooltip-bg-dots {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
}
.tooltip-name {
  font-weight: bold;
  margin-bottom: 2px;
  z-index: 2;
  position: relative;
}
.tooltip-designation {
  opacity: 0.85;
  z-index: 2;
  position: relative;
}
/* Avatar outline container */
.avatar-outline {
  margin-top: 16px;
  margin-bottom: 0;
}
/* Avatar image (no border, no outline, background matches outline) */
.avatar {
  display: block;
  will-change: transform, box-shadow;
}
/* Avatar hover effect */
.avatar-hovered {
  transform: scale(1.08) rotate(-3deg);
  box-shadow: 0 6px 24px 0 rgba(60,60,60,0.13);
  z-index: 2;
}

/* --- Appearance Effects --- */
.from-bottom-right-enter-active { animation: from-bottom-right-in 0.5s cubic-bezier(.22,1.5,.56,1.01); }
.from-bottom-right-leave-active { animation: fade-out 0.25s cubic-bezier(.55,0,.55,1); }
@keyframes from-bottom-right-in {
  0% { opacity: 0; transform: translateX(-30%) translateY(40px) scale(0.7); }
  60% { opacity: 1; transform: translateX(-50%) translateY(-10px) scale(1.1); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
}
.from-top-left-enter-active { animation: from-top-left-in 0.5s cubic-bezier(.22,1.5,.56,1.01); }
.from-top-left-leave-active { animation: fade-out 0.25s cubic-bezier(.55,0,.55,1); }
@keyframes from-top-left-in {
  0% { opacity: 0; transform: translateX(-70%) translateY(-40px) scale(0.7); }
  60% { opacity: 1; transform: translateX(-50%) translateY(10px) scale(1.1); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
}
.from-top-right-enter-active { animation: from-top-right-in 0.5s cubic-bezier(.22,1.5,.56,1.01); }
.from-top-right-leave-active { animation: fade-out 0.25s cubic-bezier(.55,0,.55,1); }
@keyframes from-top-right-in {
  0% { opacity: 0; transform: translateX(10%) translateY(-40px) scale(0.7); }
  60% { opacity: 1; transform: translateX(-50%) translateY(10px) scale(1.1); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
}
.from-bottom-left-enter-active { animation: from-bottom-left-in 0.5s cubic-bezier(.22,1.5,.56,1.01); }
.from-bottom-left-leave-active { animation: fade-out 0.25s cubic-bezier(.55,0,.55,1); }
@keyframes from-bottom-left-in {
  0% { opacity: 0; transform: translateX(-70%) translateY(40px) scale(0.7); }
  60% { opacity: 1; transform: translateX(-50%) translateY(-10px) scale(1.1); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
}
.from-top-enter-active { animation: from-top-in 0.45s cubic-bezier(.22,1.5,.56,1.01); }
.from-top-leave-active { animation: fade-out 0.22s cubic-bezier(.55,0,.55,1); }
@keyframes from-top-in {
  0% { opacity: 0; transform: translateX(-50%) translateY(-40px) scale(0.7); }
  60% { opacity: 1; transform: translateX(-50%) translateY(10px) scale(1.1); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
}
.from-bottom-enter-active { animation: from-bottom-in 0.45s cubic-bezier(.22,1.5,.56,1.01); }
.from-bottom-leave-active { animation: fade-out 0.22s cubic-bezier(.55,0,.55,1); }
@keyframes from-bottom-in {
  0% { opacity: 0; transform: translateX(-50%) translateY(40px) scale(0.7); }
  60% { opacity: 1; transform: translateX(-50%) translateY(-10px) scale(1.1); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
}
/* Existing: from-left, from-right, center-up, center-down (unchanged) ... */
@keyframes fade-out {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
