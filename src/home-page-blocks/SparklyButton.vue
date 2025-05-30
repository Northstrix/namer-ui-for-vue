<script setup lang="ts">
import { ref, onMounted, watch, computed, onUnmounted, nextTick } from 'vue'

const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

const props = withDefaults(defineProps<{
  hue?: number
  borderRadius?: string
  fontSize?: string
  iconGap?: string
  mobileFontSize?: string
  desktopThreshold?: number
}>(), {
  hue: 260,
  borderRadius: '5em',
  fontSize: '1.25rem',
  iconGap: '0.08em',
  mobileFontSize: '1rem',
  desktopThreshold: 600,
})

const over = ref(false)
const isMobile = ref(false)

function updateIsMobile() {
  isMobile.value = window.innerWidth < props.desktopThreshold
}

onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
  injectMediaQuery()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile)
})

watch(() => props.desktopThreshold, injectMediaQuery)

function handleClick(e: MouseEvent) {
  emit('click', e)
}

const buttonStyle = computed(() => ({
  '--clr': props.hue,
  borderRadius: props.borderRadius,
  fontSize: isMobile.value ? props.mobileFontSize : props.fontSize,
  width: 'auto',
  background: 'linear-gradient(135deg, #4776cb, #a19fe5, #6cc606)',
  color: '#fff',
}))

const spanStyle = computed(() => ({
  gap: props.iconGap,
}))

function injectMediaQuery() {
  nextTick(() => {
    const id = 'sparkly-btn-media'
    let styleTag = document.getElementById(id)
    if (!styleTag) {
      styleTag = document.createElement('style')
      styleTag.id = id
      document.head.appendChild(styleTag)
    }
    styleTag.textContent = `
      @media (max-width: ${props.desktopThreshold}px) {
        .stargazing-shadow .sparkles .content {
          padding: 0.655em 1.1em !important;
          font-size: ${props.mobileFontSize} !important;
        }
      }
    `
  })
}
</script>

<template>
  <div
    class="stargazing-shadow"
    :class="{ over: over }"
    :style="{
      borderRadius: props.borderRadius,
      '--clr': props.hue,
      '--shadow-color': '#fff',
    }"
  >
    <button
      class="sparkles"
      :class="{ over }"
      :style="buttonStyle"
      @click="handleClick"
      type="button"
      tabindex="0"
      @mouseover="over = true"
      @mouseleave="over = false"
      @focus="over = true"
      @blur="over = false"
    >
      <span class="content" :style="spanStyle">
        <span style="margin:0; padding:0;">Get Started</span>
      </span>
    </button>
  </div>
</template>

<style scoped>
.stargazing-shadow {
  display: inline-block;
  border-radius: inherit;
  transition: box-shadow 0.4s cubic-bezier(0.77, 0, 0.18, 1);
  box-shadow: none;
}
.stargazing-shadow.over,
.stargazing-shadow:hover {
  box-shadow: 0 0 20px 4px #fff8, 0 0 60px 16px #fff5;
}
.sparkles {
  --clr: 260;
  font-size: max(2.5vw, 1.25rem);
  font-weight: 700;
  letter-spacing: 0.5px;
  border-radius: inherit;
  background: none;
  background-size: 200% 300%;
  background-position: 0% 0%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  place-items: center;
  padding: 0;
  position: relative;
  overflow: hidden;
  transform: translate(0px);
  outline: none !important;
  border: none !important;
  width: auto;
  cursor: pointer;
  transition: box-shadow 0.3s cubic-bezier(0.77, 0, 0.18, 1), background-position 0.5s cubic-bezier(0.77, 0, 0.18, 1);
  box-shadow: 0 0 0 1px #312f3b;
  white-space: nowrap;
  color: #fff;
  min-height: calc(2.5em + 1px);
}
.sparkles:hover,
.sparkles:focus,
.sparkles.over {
  box-shadow: 0 0 20px 4px #fff8, 0 0 60px 16px #fff5;
}
.sparkles:hover,
.sparkles.over {
  background-position: 100% 100%;
  transition: all 0.2s cubic-bezier(0.17, 0.84, 0.44, 1);
}
.sparkles::before,
.sparkles::after {
  content: " ";
  grid-column: 1;
  grid-row: 1;
  width: 100%;
  height: 100%;
  transition: inherit;
  pointer-events: none;
}
.sparkles:before {
  inset: 0;
  position: absolute;
  transform: translate3d(0, 0, 0.01px);
  border-radius: inherit;
  background-image: url("https://assets.codepen.io/13471/silver-glitter-background.png"),
    url("https://assets.codepen.io/13471/silver-glitter-background.png"),
    linear-gradient(180deg, black 10%, white 80%);
  background-size: 300px 170px, 280px 130px, 200% 200%;
  background-blend-mode: multiply, multiply, overlay;
  background-position: 0px 0px, 0px 0px, 50% 100%;
  background-repeat: repeat;
  mix-blend-mode: color-dodge;
  filter: brightness(2) contrast(.75);
  animation: bubble 300s linear infinite;
  opacity: 0.5;
  box-shadow: none !important;
}
.sparkles:hover:before,
.sparkles.over:before {
  animation-duration: 300s;
  filter: brightness(2) contrast(1);
  box-shadow: none !important;
  opacity: .8;
}
.sparkles:after {
  background-image:
    radial-gradient(
      ellipse at center 70%,
      hsla(var(--clr), 100%, 99%, 0.8) 5%,
      hsla(var(--clr), 90%, 80%, 1) 20%,
      transparent 50%,
      transparent 200%
    ),
    linear-gradient(
      90deg,
      hsla(var(--clr), 80%, 10%, 1) -10%,
      transparent 25%,
      transparent 75%,
      hsla(var(--clr), 80%, 10%, 1) 110%
    );
  box-shadow: none !important;
  background-blend-mode: darken;
  background-repeat: no-repeat;
  background-size: 180% 80%, cover;
  background-position: center 220%;
  mix-blend-mode: hard-light;
  filter: blur(5px);
  opacity: 0;
  transition: opacity 0.2s;
}
.sparkles:hover:after,
.sparkles.over:after {
  opacity: .8;
  transform: translateY(0px);
}
.sparkles .content {
  grid-column: 1;
  grid-row: 1;
  background-image: none;
  color: #fff;
  background-clip: unset;
  -webkit-background-clip: unset;
  filter: none;
  padding: calc(0.75em + 0.5px) 1.5em;
  display: flex;
  align-items: center;
  gap: v-bind('iconGap');
  z-index: 10;
  transition: background-position-y 0.25s;
}
.sparkles:hover .content,
.sparkles:active .content,
.sparkles.over .content {
  background-position-y: -100%;
}
.sparkles:active {
  transform: translateY(0.075em);
}
@keyframes bubble {
  0% {
    background-position: 0px 340px, 0px 130px, 50% 100%;
  }
  100% {
    background-position: 0px 0px, 0px 0px, 50% 100%;
  }
}
</style>
