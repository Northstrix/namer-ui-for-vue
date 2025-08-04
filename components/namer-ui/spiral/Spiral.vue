<script setup lang="ts">
import { onMounted, onBeforeUnmount, defineProps } from 'vue'

const props = defineProps({
  spiralColor: { type: String, required: true },           // "R, G, B", e.g. "255,255,255"
  defaultDistortion: { type: Number, default: 0.8 },
  hoverDistortion: { type: Number, default: 1.5 },
  clickDistortion: { type: Number, default: 3.5 },
  strokeWidth: { type: Number, default: 2 },               // Optional stroke width default 2
  // New: optional hover callback
  onHover: { type: Function as () => void, required: false }
})

let canvas: HTMLCanvasElement | null = null
let ctx: CanvasRenderingContext2D | null = null

let width = 0
let height = 0
let time = 0
let animationFrameId: number | null = null

let mouseX = 0
let mouseY = 0
let cursorX = 0
let cursorY = 0
let cursorVelX = 0
let cursorVelY = 0
const cursorSpring = 0.3
const cursorFriction = 0.8

let isMouseHovering = false
let isMouseDown = false

const spiralDensity = 6
const animationSpeed = 0.5
const tendrilCount = 3

function updateCursor() {
  const dx = mouseX - cursorX
  const dy = mouseY - cursorY
  cursorVelX += dx * cursorSpring
  cursorVelY += dy * cursorSpring
  cursorVelX *= cursorFriction
  cursorVelY *= cursorFriction
  cursorX += cursorVelX
  cursorY += cursorVelY
}

function getCurrentDistortion() {
  if (isMouseDown) return props.clickDistortion
  if (isMouseHovering) return props.hoverDistortion
  return props.defaultDistortion
}

function drawSpiral(
  centerX: number,
  centerY: number,
  radius: number,
  density: number,
  distortion: number,
  rotation: number,
  color: string,
  baseLineWidth: number
) {
  if (!ctx) return
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.lineWidth = baseLineWidth
  const maxRadius = radius
  const angleStep = 0.05
  for (let angle = 0; angle < Math.PI * 2 * density; angle += angleStep) {
    const currentRadius = (angle / (Math.PI * 2 * density)) * maxRadius
    const distortedAngle =
      angle +
      Math.sin(angle * 3 + time * 0.2) * distortion * 0.1 +
      Math.cos(angle * 2 + time * 0.1) * distortion * 0.05
    const distortedRadius =
      currentRadius * (1 + Math.sin(angle * 5 + time * 0.3) * distortion * 0.03)
    const x = centerX + Math.cos(distortedAngle + rotation) * distortedRadius
    const y = centerY + Math.sin(distortedAngle + rotation) * distortedRadius
    if (angle === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()
}

function drawTendrils(
  centerX: number,
  centerY: number,
  count: number,
  timeVal: number,
  maxLength: number
) {
  if (!ctx) return
  const angleStep = (Math.PI * 2) / count
  for (let i = 0; i < count; i++) {
    const baseAngle = i * angleStep + timeVal * 0.2
    const length = maxLength * (0.5 + Math.sin(timeVal * 0.3 + i) * 0.5)

    ctx.beginPath()
    ctx.strokeStyle = `rgba(255,255,255,0)`
    ctx.lineWidth = props.strokeWidth * (1 + Math.sin(timeVal * 0.5 + i * 2) * 0.2)

    let x = centerX
    let y = centerY
    ctx.moveTo(x, y)

    const currentDistortion = getCurrentDistortion()

    for (let j = 0; j < length; j += 3) {
      const distortion = j * 0.02 * currentDistortion
      const angle =
        baseAngle +
        Math.sin(j * 0.1 + timeVal * 0.5) * distortion +
        Math.cos(j * 0.05 + timeVal * 0.3) * distortion

      x += Math.cos(angle) * 3
      y += Math.sin(angle) * 3
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
}

function animate() {
  if (!ctx || !canvas) return
  animationFrameId = requestAnimationFrame(animate)

  ctx.clearRect(0, 0, width, height)

  time += 0.01 * animationSpeed

  updateCursor()

  const centerX = width / 2
  const centerY = height / 2

  const cursorDistX = (cursorX - centerX) / (width / 2)
  const cursorDistY = (cursorY - centerY) / (height / 2)
  const cursorDist = Math.sqrt(cursorDistX * cursorDistX + cursorDistY * cursorDistY)

  const mainRadius = Math.min(width, height) * 0.4
  const mainDistortion = getCurrentDistortion() * (1 + cursorDist * 0.5)
  const mainRotation = time * 0.1 + Math.atan2(cursorDistY, cursorDistX) * 0.2

  for (let i = 0; i < 3; i++) {
    const radius = mainRadius * (0.6 + i * 0.2)
    const density = spiralDensity * (0.8 + i * 0.1)
    const rotation = mainRotation + (i * Math.PI) / 4
    const alpha = 0.7 - i * 0.2
    const color = `rgba(${props.spiralColor},${alpha.toFixed(2)})`
    const lineWidth = props.strokeWidth * (1 - i * 0.25)
    drawSpiral(centerX, centerY, radius, density, mainDistortion, rotation, color, lineWidth)
  }

  drawTendrils(cursorX, cursorY, tendrilCount, time, 100)
}

function onResize() {
  if (!canvas) return
  width = canvas.clientWidth
  height = canvas.clientHeight
  const dpr = window.devicePixelRatio || 1
  canvas.width = width * dpr
  canvas.height = height * dpr
  if (ctx) {
    ctx.resetTransform?.()
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, width, height)
  }
  mouseX = width / 2
  mouseY = height / 2
  cursorX = mouseX
  cursorY = mouseY
}

function onMouseEnter() {
  isMouseHovering = true
  if (props.onHover) props.onHover(true)
}
function onMouseLeave() {
  isMouseHovering = false
  isMouseDown = false
  if (props.onHover) props.onHover(false)
}
function onMouseMove(e: MouseEvent) {
  mouseX = e.offsetX
  mouseY = e.offsetY
}
function onMouseDown() {
  if (isMouseHovering) isMouseDown = true
}
function onMouseUp() {
  isMouseDown = false
}

onMounted(() => {
  if (!canvas) return
  ctx = canvas.getContext('2d')
  onResize()

  const container = canvas.parentElement
  if (container) {
    container.addEventListener('mouseenter', onMouseEnter)
    container.addEventListener('mouseleave', onMouseLeave)
    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('mousedown', onMouseDown)
    container.addEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('resize', onResize)

  animate()
})

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', onResize)

  const container = canvas?.parentElement
  if (container) {
    container.removeEventListener('mouseenter', onMouseEnter)
    container.removeEventListener('mouseleave', onMouseLeave)
    container.removeEventListener('mousemove', onMouseMove)
    container.removeEventListener('mousedown', onMouseDown)
    container.removeEventListener('mouseup', onMouseUp)
  }
})
</script>

<template>
  <div
    class="spiral-container"
    style="aspect-ratio: 1 / 1;"
  >
    <canvas ref="canvas" class="spiral-canvas"></canvas>
  </div>
</template>

<style scoped>
.spiral-container {
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
  cursor: default;
}
.spiral-container:hover {
  cursor: pointer;
}
.spiral-canvas {
  width: 100%;
  height: 100%;
  display: block;
  user-select: none;
  -webkit-user-select: none;
}
</style>
