<script setup lang="ts">
import { ref, onMounted, watch, computed, onUnmounted, nextTick } from 'vue'
import { Github, Star } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  githubLink: string
  hue?: number
  borderRadius?: string
  fontSize?: string
  iconSize?: number
  iconStrokeWidth?: number
  iconGap?: string
  separatorMargin?: string
  separatorColor?: string
  separatorWidth?: string
  shadowColor?: string
  mobileFontSize?: string
  mobileIconSize?: number
  mobileIconStrokeWidth?: number
  desktopThreshold?: number
}>(), {
  hue: 260,
  borderRadius: '5em',
  fontSize: '1.25rem',
  iconSize: 22,
  iconStrokeWidth: 2.2,
  iconGap: '0.08em',
  separatorMargin: '0 0.45em',
  separatorColor: '',
  separatorWidth: '2px',
  shadowColor: '',
  mobileFontSize: '1rem',
  mobileIconSize: 19,
  mobileIconStrokeWidth: 2,
  desktopThreshold: 600,
})

const over = ref(false)
const starCount = ref<number | null>(null)
const animatedCount = ref(0)
let animationFrame: number | null = null
const isMobile = ref(false)

function updateIsMobile() {
  isMobile.value = window.innerWidth < props.desktopThreshold
}

onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
  fetchStars()
  injectMediaQuery()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile)
})

watch(() => props.githubLink, fetchStars)
watch(() => props.desktopThreshold, injectMediaQuery)

function openGithub(e: MouseEvent) {
  e.preventDefault()
  window.open(props.githubLink, '_blank', 'noopener')
}

function fetchStars() {
  starCount.value = null
  try {
    const repoPath = new URL(props.githubLink).pathname.slice(1)
    fetch(`https://api.github.com/repos/${repoPath}`)
      .then(resp => resp.json())
      .then(data => {
        if (typeof data.stargazers_count === 'number') {
          starCount.value = data.stargazers_count
          animateTo(data.stargazers_count)
        }
      }).catch(() => {})
  } catch (e) {}
}

function animateTo(target: number) {
  if (animationFrame) cancelAnimationFrame(animationFrame)
  const start = animatedCount.value
  const duration = 1200
  const startTime = performance.now()
  function step(now: number) {
    const t = Math.min((now - startTime) / duration, 1)
    const eased = t < 1 ? 1 - Math.pow(1 - t, 3) : 1
    animatedCount.value = Math.round(start + (target - start) * eased)
    if (t < 1) animationFrame = requestAnimationFrame(step)
    else {
      animationFrame = null
      setTimeout(() => {
        over.value = true
        setTimeout(() => {
          over.value = false
        }, 2500)
      }, 2500)
    }
  }
  animationFrame = requestAnimationFrame(step)
}

// Dynamic styles
const buttonStyle = computed(() => ({
  '--clr': props.hue,
  borderRadius: props.borderRadius,
  fontSize: isMobile.value ? props.mobileFontSize : props.fontSize,
  width: 'auto',
}))

const spanStyle = computed(() => ({
  gap: props.iconGap,
}))

const separatorStyle = computed(() => ({
  margin: props.separatorMargin,
  borderLeft: `${props.separatorWidth} solid ${props.separatorColor || `hsl(${props.hue}, 100%, 85%)`}`,
  height: '1.2em',
  minWidth: props.separatorWidth,
  background: 'none',
}))

const iconSize = computed(() => isMobile.value ? props.mobileIconSize : props.iconSize)
const iconStrokeWidth = computed(() => isMobile.value ? props.mobileIconStrokeWidth : props.iconStrokeWidth)
const computedShadowColor = computed(() =>
  props.shadowColor && props.shadowColor.trim() !== ''
    ? props.shadowColor
    : `hsla(${props.hue}, 25%, 12%)`
)

// Dynamic media query injection for truly prop-driven mobile threshold
function injectMediaQuery() {
  nextTick(() => {
    const id = 'stargazing-btn-media'
    let styleTag = document.getElementById(id)
    if (!styleTag) {
      styleTag = document.createElement('style')
      styleTag.id = id
      document.head.appendChild(styleTag)
    }
    styleTag.textContent = `
      @media (max-width: ${props.desktopThreshold}px) {
        .stargazing-shadow .sparkles .content {
          padding: 0.65em 1.1em !important;
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
      '--shadow-color': computedShadowColor,
    }"
  >
    <button
      class="sparkles"
      :class="{ over }"
      :style="buttonStyle"
      @click="openGithub"
      type="button"
      tabindex="0"
    >
      <span class="content" :style="spanStyle">
        <Github :size="iconSize" :stroke-width="iconStrokeWidth" style="margin:0; padding:0;" />
        <span style="margin:0; padding:0;">Star on GitHub</span>
        <span class="separator" :style="separatorStyle"></span>
        <Star :size="iconSize - 2" :stroke-width="iconStrokeWidth" style="margin:0; padding:0;" />
        <span class="star-count" style="margin:0; padding:0;">
          {{ animatedCount !== null ? animatedCount.toLocaleString() : '—' }}
        </span>
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
  /* Dynamic shadow color, same length/softness as "proper" example */
  box-shadow:
    0 0 20px 4px var(--shadow-color),
    0 0 60px 16px var(--shadow-color);
}

/* OUTLINE/SHADOW LOGIC */
.sparkles {
  --clr: 260;
  font-size: max(2.5vw, 1.25rem);
  font-weight: 700;
  letter-spacing: 0.5px;
  border-radius: inherit;
  background: linear-gradient(
    0deg,
    hsla(var(--clr), 100%, 70%) 0%,
    hsla(var(--clr), 100%, 65%) 5%,
    hsla(var(--clr), 80%, 35%) 15%,
    hsla(var(--clr), 10%, 0%) 40%,
    hsla(var(--clr), 25%, 12%) 90%
  );
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
}
.sparkles:hover,
.sparkles:focus,
.sparkles.over {
  box-shadow:
    0 0 20px 4px var(--shadow-color),
    0 0 60px 16px var(--shadow-color);
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
    linear-gradient(180deg, black 0%, white 80%);
  background-size: 300px 170px, 280px 130px, 200% 200%;
  background-blend-mode: multiply, multiply, overlay;
  background-position: 0px 0px, 0px 0px, 50% 100%;
  background-repeat: repeat;
  mix-blend-mode: color-dodge;
  filter: brightness(2) contrast(.75);
  animation: bubble 300s linear infinite;
  opacity: 0.5;
  box-shadow: inset 0 -8px 10px -7px hsla(var(--clr), 70%, 80%, 0.75);
}
.sparkles:hover:before,
.sparkles.over:before {
  animation-duration: 300s;
  filter: brightness(2) contrast(1);
  box-shadow: inset 0 -5px 10px -4px hsla(var(--clr), 70%, 80%, 0.3);
  opacity: .8;
}
.sparkles:after {
  background-image: radial-gradient(
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
  box-shadow: inset 0 0.25em 0.75em rgba(0, 0, 0, 1), inset 0 -0.05em 0.2em rgba(255, 255, 255, 0.4), inset 0 -1px 3px hsla(var(--clr), 80%, 50%, 0.75);
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
  background-image: linear-gradient(
    hsl(calc(var(--clr) - 43), 27%, 85%) 0%,
    hsl(calc(var(--clr) - 60), 22%, 80%) 19%,
    hsl(calc(var(--clr) - 50), 20%, 75%) 30%,
    hsl(calc(var(--clr) - 52), 36%, 98%) 43%,
    hsl(var(--clr), 70%, 70%, 1) 51%,
    hsl(var(--clr), 50%, 85%, 1) 52%,
    rgb(255, 255, 255) 100%
  );
  background-size: 1em 3.45em;
  color: rgb(214, 222, 226);
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  filter: drop-shadow(0 0 0.05em rgba(0,0,0,0.5)) drop-shadow(0 0.05em 0.05em rgba(0,0,0,0.5));
  padding: 0.75em 1.5em;
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
.star-count {
  font-variant-numeric: tabular-nums;
  font-family: inherit;
  color: #fff;
  background: none;
  -webkit-text-fill-color: unset;
  background-clip: unset;
  -webkit-background-clip: unset;
  filter: none;
  font-weight: 700;
  font-size: 0.98em;
  letter-spacing: 0.01em;
}
.separator {
  display: inline-block;
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
