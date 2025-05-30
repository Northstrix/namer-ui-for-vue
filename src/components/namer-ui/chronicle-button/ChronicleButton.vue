<template>
  <button
    class="chronicleButton"
    :class="{ outlined }"
    :style="buttonStyle"
    @click="onClick"
  >
    <span v-if="!outlined" class="chronicleButton-inner">
      <span><em>{{ text }}</em></span>
      <span><em>{{ text }}</em></span>
    </span>
    <span v-else class="chronicleButton-outlined-inner">
      <em>{{ text }}</em>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
  text: string
  onClick?: () => void
  hoverColor?: string
  hoverBackground?: string
  width?: string
  outlined?: boolean
  outlinePaddingAdjustment?: string
  borderRadius?: string
  outlinedButtonBackgroundOnHover?: string
  customBackground?: string
  customForeground?: string
  fontSize?: string
  padding?: string
}>()

const buttonStyle = computed(() => ({
  '--hover-color': props.hoverColor ?? '#1a1a24',
  '--hover-bg': props.hoverBackground ?? '#a594fd',
  '--text-color': props.outlined
    ? (props.customBackground ?? '#2d76f9')
    : (props.customForeground ?? '#1a1a24'),
  '--outline-padding-adjustment': props.outlinePaddingAdjustment ?? '2px',
  '--outlined-button-background-on-hover': props.outlinedButtonBackgroundOnHover ?? 'transparent',
  '--chronicle-button-background': props.customBackground ?? '#f0f0f1',
  '--chronicle-button-foreground': props.customForeground ?? '#1a1a24',
  '--chronicle-button-font-size': props.fontSize ?? '1.025rem',
  '--chronicle-button-padding': props.padding ?? '1rem 1.232rem', // <-- new variable
  width: props.width ?? '160px',
  borderRadius: props.borderRadius ?? '0.76rem',
}))
</script>

<style scoped>
.chronicleButton {
  border-radius: var(--chronicle-button-border-radius, 0.76rem);
  background: var(--chronicle-button-background, #f0f0f1);
  color: var(--chronicle-button-foreground, #1a1a24);
  font-weight: 700;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  line-height: 1;
  padding: var(--chronicle-button-padding, 1rem 1.232rem); /* <-- use padding variable */
  transition: background 0.3s linear, color 0.3s linear;
  will-change: background, color;
  position: relative;
  width: var(--chronicle-button-width, auto);
}

/* --- Filled variant (default) --- */
.chronicleButton:not(.outlined):hover {
  background: var(--hover-bg, #fff);
  color: var(--hover-color, #a594fd);
}
.chronicleButton-inner {
  position: relative;
  display: block;
  width: 100%;
  height: 1.3em;
  min-height: 1.3em;
}
.chronicleButton-inner span {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  perspective: 108px;
  pointer-events: none;
}
.chronicleButton-inner span:nth-of-type(1) { z-index: 2; }
.chronicleButton-inner span:nth-of-type(2) { z-index: 1; }
.chronicleButton em {
  font-style: normal;
  display: inline-block;
  font-size: var(--chronicle-button-font-size, 1.025rem);
  color: var(--text-color, #1a1a24);
  will-change: transform, opacity, transition, color;
  transition: transform 0.55s cubic-bezier(.645,.045,.355,1), opacity 0.35s linear 0.2s, color 0.3s linear;
  width: 100%;
  text-align: center;
  line-height: 1.3;
}
.chronicleButton-inner span:nth-of-type(1) em { transform-origin: top; }
.chronicleButton-inner span:nth-of-type(2) em {
  opacity: 0;
  transform: rotateX(-90deg) scaleX(.9) translate3d(0,10px,0);
  transform-origin: bottom;
}
.chronicleButton:not(.outlined):hover .chronicleButton-inner span:nth-of-type(1) em {
  opacity: 0;
  transform: rotateX(90deg) scaleX(.9) translate3d(0,-10px,0);
  color: var(--hover-color, #a594fd);
}
.chronicleButton:not(.outlined):hover .chronicleButton-inner span:nth-of-type(2) em {
  opacity: 1;
  transform: rotateX(0deg) scaleX(1) translateZ(0);
  color: var(--hover-color, #a594fd);
  transition: transform 0.75s cubic-bezier(.645,.045,.355,1), opacity 0.35s linear 0.3s, color 0.3s linear;
}

/* --- Outlined variant --- */
.chronicleButton.outlined {
  background: transparent;
  border: 2px solid var(--chronicle-button-background, #2d76f9);
  color: var(--chronicle-button-background, #2d76f9);
  padding: var(--chronicle-button-padding, calc(1rem - var(--outline-padding-adjustment, 2px)) 0); /* <-- use padding variable */
  transition: border 0.3s linear, color 0.3s linear, background-color 0.3s linear;
  will-change: border, color, background;
}
.chronicleButton-outlined-inner {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chronicleButton.outlined em {
  font-style: normal;
  font-size: var(--chronicle-button-font-size, 1.025rem);
  color: var(--text-color, #2d76f9);
  width: 100%;
  text-align: center;
  line-height: 1.3;
  transition: color 0.3s linear;
}
.chronicleButton.outlined:hover {
  background: var(--outlined-button-background-on-hover, transparent);
  border-color: var(--hover-color, #a594fd);
  color: var(--hover-color, #a594fd);
}
.chronicleButton.outlined:hover em {
  color: var(--hover-color, #a594fd);
  transition: color 0.3s linear;
}
</style>
