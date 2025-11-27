<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Responsive text size for footer
const textSize = ref('0.98rem')
function updateTextSize() {
  let base = 0.98 // in rem (16px * 0.98 = 15.68px)
  if (window.innerWidth < 400) base -= 4 / 16 // 4px in rem
  else if (window.innerWidth < 480) base -= 3 / 16 // 3px in rem
  else if (window.innerWidth < 600) base -= 1 / 16 // 1px in rem
  textSize.value = `${base}rem`
}
onMounted(() => {
  updateTextSize()
  window.addEventListener('resize', updateTextSize)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateTextSize)
})

// Responsive font size for "Namer UI" inscription
const namerUiFontSize = ref('9.2rem')
function calcNamerUiFontSize() {
  const w = window.innerWidth
  const minW = 200, maxW = 1400
  const minF = 6, maxF = 8
  let size
  if (w <= minW) size = minF
  else if (w >= maxW) size = maxF
  else size = minF + ((maxF - minF) * (w - minW)) / (maxW - minW)
  namerUiFontSize.value = `${size}rem`
}
onMounted(() => {
  calcNamerUiFontSize()
  window.addEventListener('resize', calcNamerUiFontSize)
})
onUnmounted(() => {
  window.removeEventListener('resize', calcNamerUiFontSize)
})

// For SVG hover effect
const hovered = ref(false)
const cursor = ref({ x: 50, y: 50 })
const maskPosition = ref({ cx: '50%', cy: '50%' })
function onMouseMove(e: MouseEvent) {
  const svg = e.target as SVGSVGElement
  const rect = svg.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  cursor.value = { x, y }
  maskPosition.value = { cx: `${x}%`, cy: `${y}%` }
}
function onMouseEnter() {
  hovered.value = true
}
function onMouseLeave() {
  hovered.value = false
  maskPosition.value = { cx: '50%', cy: '50%' }
}
</script>

<template>
  <footer
    class="footer-root"
    :style="{
      background: '#060507',
      borderTop: '1px solid #2c2934',
      padding: '24px 0 0 0',
      boxSizing: 'border-box'
    }"
  >
    <div class="content-container footer-content">
      <div class="footer-top" :style="{ fontSize: textSize }">
        Made by
        <a
          href="https://maxim-bortnikov.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
        >Maxim Bortnikov</a>
        using
        <a
          href="https://nuxt.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
        >Nuxt</a>
        and
        <a
          href="https://www.perplexity.ai/"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
        >Perplexity</a>
      </div>

      <!-- Badges column -->
      <div
        :style="{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }"
      >
        <!-- Verified Tools badge -->
        <a
          href="https://www.verifiedtools.info"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://www.verifiedtools.info/badge.png"
            alt="Verified on Verified Tools"
            width="200"
            height="54"
            :style="{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
            }"
          />
        </a>

        <div
          :style="{
            height: '9px',
          }"
        ></div>

        <!-- Startup Fame badge -->
        <a
          href="https://startupfa.me/s/namer-ui-1?utm_source=namer-ui-for-vue.netlify.app"
          target="_blank"
        >
          <img
            src="https://startupfa.me/badges/featured/dark.webp"
            alt="Namer UI For Vue - Featured on Startup Fame"
            width="171"
            height="54"
            :style="{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
            }"
          />
        </a>

        <div
          :style="{
            height: '15px',
          }"
        ></div>

        <!-- Aura++ badge -->
        <a
          href="https://auraplusplus.com/projects/namer-ui-for-vue"
          target="_blank"
          rel="noopener"
        >
          <img
            src="https://auraplusplus.com/images/badges/featured-on-light.svg"
            alt="Featured on Aura++"
            :style="{
              maxWidth: '100%',
              height: '54px',
              display: 'block'
            }"
          />
        </a>
      </div>
            
      <div class="footer-namer-ui">
        <svg
          width="100%"
          height="auto"
          viewBox="0 0 700 120"
          style="display: block; margin: 0; max-width: 100%;"
          @mouseenter="onMouseEnter"
          @mouseleave="onMouseLeave"
          @mousemove="onMouseMove"
        >
          <defs>
            <!-- NEW highlight gradient for the mask reveal -->
            <linearGradient id="namerUiHighlightGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#4776cb" />
              <stop offset="50%" stop-color="#a19fe5" />
              <stop offset="100%" stop-color="#6cc606" />
            </linearGradient>
            <!-- The main gradient for the outline (unchanged, but you can update if you want) -->
            <linearGradient id="namerUiGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#eab308" />
              <stop offset="25%" stop-color="#ef4444" />
              <stop offset="50%" stop-color="#3b82f6" />
              <stop offset="75%" stop-color="#06b6d4" />
              <stop offset="100%" stop-color="#8b5cf6" />
            </linearGradient>
            <!-- The mask uses a radial gradient filled with the highlight gradient -->
            <radialGradient
              id="revealMask"
              :cx="maskPosition.cx"
              :cy="maskPosition.cy"
              r="20%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stop-color="white" />
              <stop offset="100%" stop-color="black" />
            </radialGradient>
            <!-- The mask rectangle is filled with the highlight gradient, masked by the radial gradient -->
            <mask id="textMask">
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                :fill="'url(#revealMask)'"
              />
            </mask>
          </defs>
          <!-- Outline text, faded in on hover -->
          <text
            x="50%"
            y="60%"
            text-anchor="middle"
            dominant-baseline="middle"
            stroke-width="2"
            fill="transparent"
            stroke="#33313d"
            :font-size="namerUiFontSize"
            font-family="helvetica, Arial, sans-serif"
            font-weight="bold"
            style="paint-order: stroke; transition: opacity 0.3s;"
            :opacity="hovered ? 0.7 : 0"
          >
            Namer UI
          </text>
          <!-- Animated outline, dash reveal (simple version) -->
          <text
            x="50%"
            y="60%"
            text-anchor="middle"
            dominant-baseline="middle"
            stroke-width="1.25"
            fill="transparent"
            stroke="#33313d"
            :font-size="namerUiFontSize"
            font-family="helvetica, Arial, sans-serif"
            font-weight="bold"
            :stroke-dasharray="hovered ? 0 : 1000"
            :stroke-dashoffset="hovered ? 0 : 1000"
            style="transition: stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1), stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1);"
            opacity="0.3"
          >
            Namer UI
          </text>
          <!-- Masked gradient stroke, revealed under cursor -->
          <text
            x="50%"
            y="60%"
            text-anchor="middle"
            dominant-baseline="middle"
            :stroke="'url(#namerUiHighlightGradient)'"
            stroke-width="1.25"
            fill="transparent"
            :font-size="namerUiFontSize"
            font-family="helvetica, Arial, sans-serif"
            font-weight="bold"
            mask="url(#textMask)"
            style="transition: opacity 0.3s;"
            :opacity="hovered ? 1 : 0.6"
          >
            Namer UI
          </text>
        </svg>
      </div>
      <div style="height:40px;"></div>
    </div>
  </footer>
</template>

<style scoped>
.footer-root {
  width: 100%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;
  box-sizing: border-box;
  overflow-x: hidden;
}
.footer-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.footer-top {
  line-height: 1.5;
  letter-spacing: -0.0035em;
  color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0;
  margin-bottom: 1.4rem;
}
.footer-link {
  color: white;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;
  margin: 0 0.32em;
}
.footer-link:hover {
  color: #6cc606;
}
.footer-link::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: 0px;
  left: 0;
  background-color: white;
  transform: scaleX(1);
  transition: transform 0.3s ease;
}
.footer-link:hover::after {
  transform: scaleX(0);
}
.footer-namer-ui {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.6rem;
}
.footer-namer-ui svg {
  width: 100% !important;
  height: auto !important;
  max-width: 100vw;
  display: block;
}
</style>
