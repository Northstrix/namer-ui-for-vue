<template>
  <div
    ref="wrapperRef"
    class="holo-card-wrapper"
    :class="className"
    :style="wrapperStyle"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @mouseenter="handleMouseEnter"
  >
    <div ref="containerRef" class="holo-container" :style="containerStyle">
      <!-- Electric Border Canvas -->
      <div v-if="enableElectric" class="electric-canvas-container" :style="electricContainerStyle">
        <canvas ref="canvasRef" class="electric-canvas" />
      </div>

      <!-- Card Body -->
      <div class="holo-card-body" :style="cardBodyStyle">
        <!-- Dot Pattern -->
        <div class="holo-pattern" :style="patternStyle" />

        <!-- Base Background Image -->
        <div class="image-layer" :style="{ opacity: imageOpacity }">
          <img :src="imageSrc" alt="" draggable="false" :style="imageElementStyle" />
        </div>

        <!-- Hover Reveal Image -->
        <div v-if="hoverImageSrc" class="image-layer hover-layer" :style="hoverLayerStyle">
          <img :src="hoverImageSrc" alt="" draggable="false" :style="imageElementStyle" />
        </div>

        <!-- Holographic Shine Overlay -->
        <div v-if="enableHologram" class="holo-overlay" :style="hologramStyle" />

        <!-- Text Overlays -->
        <div class="text-content-layer">
          <!-- Top Text -->
          <div v-if="topText || $slots.topText" :class="topTextClassName" :style="topTextStyle">
            <slot name="topText">{{ topText }}</slot>
          </div>

          <!-- Bottom Text -->
          <div v-if="bottomText || $slots.bottomText" :class="bottomTextClassName" :style="bottomTextContainerStyle">
            <div :style="bottomTextStyle">
              <slot name="bottomText">{{ bottomText }}</slot>
            </div>
          </div>
        </div>
      </div>

      <!-- Glare Layer -->
      <div class="glare-layer" :style="glareStyle" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, reactive } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  id: { type: String, default: 'holo-card' },
  width: { type: Number, default: 320 },
  height: { type: Number, default: 480 },
  imageSrc: { type: String, required: true },
  hoverImageSrc: String,
  hoverImageEase: { type: String, default: "0.3s" },
  topText: [String, Object],
  bottomText: [String, Object],
  mirrorBottomText: { type: Boolean, default: true },
  isRTL: { type: Boolean, default: false },
  textOverlayPadding: { type: String, default: "1.375rem 1.325rem" },
  topTextVertical: { type: Boolean, default: true },
  topTextWeight: { type: [Number, String], default: 700 },
  topTextFontSize: { type: [String, Number], default: "1.5rem" },
  topTextLetterSpacing: { type: [String, Number], default: "0.1em" },
  topTextColor: { type: String, default: "#fff" },
  topTextClassName: { type: String, default: "" },
  bottomTextVertical: { type: Boolean, default: true },
  bottomTextWeight: { type: [Number, String], default: 700 },
  bottomTextFontSize: { type: [String, Number], default: "1.5rem" },
  bottomTextLetterSpacing: { type: [String, Number], default: "0.1em" },
  bottomTextColor: { type: String, default: "#fff" },
  bottomTextClassName: { type: String, default: "" },
  borderRadius: { type: Number, default: 24 },
  electricBorderRadius: Number,
  backgroundColor: { type: String, default: "#000" },
  imageOpacity: { type: Number, default: 0.9 },
  maxImageWidthPct: { type: Number, default: 1 },
  patternColor: { type: String, default: "#000" },
  patternOpacity: { type: Number, default: 0.15 },
  patternSize: { type: Number, default: 3 },
  patternDotSize: { type: Number, default: 1 },
  enableElectric: { type: Boolean, default: true },
  electricColor: { type: String, default: "#FBE75F" },
  hoverElectricColor: String,
  electricColorEase: { type: String, default: "0.3s" },
  electricWidth: { type: Number, default: 4 },
  electricBlur: { type: Number, default: 15 },
  electricSpeed: { type: Number, default: 5.2 },
  electricFrequency: { type: Number, default: 12.5 },
  electricAmplitude: { type: Number, default: 0.016 },
  electricNoiseIntensity: { type: Number, default: 60 },
  electricOffset: { type: Number, default: 0 },
  enableHologram: { type: Boolean, default: true },
  hologramOpacity: { type: Number, default: 0.4 },
  holographicGradient: { type: String, default: "linear-gradient(135deg, transparent 35%, rgba(255,0,128,0.4) 45%, rgba(0,255,255,0.4) 55%, transparent 65%)" },
  enableTilt: { type: Boolean, default: true },
  className: { type: String, default: "" }
});

const canvasRef = ref(null);
const containerRef = ref(null);
const wrapperRef = ref(null);
const isHovered = ref(false);

const mouse = reactive({ x: 0, y: 0 }); // -0.5 to 0.5
const tilt = reactive({ x: 0, y: 0 });
// Proxied object for GSAP to animate string colors
const colorState = reactive({ current: props.electricColor });

// Math Utilities
const random = (x) => (Math.sin(x * 12.9898) * 43758.5453) % 1;
const noise2D = (x, y) => {
  const i = Math.floor(x), j = Math.floor(y);
  const fx = x - i, fy = y - j;
  const a = random(i + j * 57), b = random(i + 1 + j * 57);
  const c = random(i + (j + 1) * 57), d = random(i + 1 + (j + 1) * 57);
  const ux = fx * fx * (3.0 - 2.0 * fx), uy = fy * fy * (3.0 - 2.0 * fy);
  return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
};
const octavedNoise = (x, time, seed, cfg) => {
  let y = 0, amp = cfg.amplitude, freq = cfg.frequency;
  for (let i = 0; i < cfg.octaves; i++) {
    y += amp * noise2D(freq * x + seed * 100, time * freq * 0.3);
    freq *= cfg.lacunarity; amp *= cfg.gain;
  }
  return y;
};

// Computed Styles
const wrapperStyle = computed(() => ({ 
  width: `${props.width}px`, 
  height: `${props.height}px` 
}));

const containerStyle = computed(() => ({ 
  transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`, 
  transformStyle: 'preserve-3d' 
}));

const cardBodyStyle = computed(() => ({ 
  backgroundColor: props.backgroundColor, 
  borderRadius: `${props.borderRadius}px` 
}));

const patternStyle = computed(() => ({ 
  opacity: props.patternOpacity, 
  backgroundImage: `radial-gradient(circle, ${props.patternColor} ${props.patternDotSize}px, transparent ${props.patternDotSize}px)`, 
  backgroundSize: `${props.patternSize}px ${props.patternSize}px` 
}));

const imageElementStyle = computed(() => ({ 
  width: `${props.maxImageWidthPct * 100}%` 
}));

const hoverLayerStyle = computed(() => ({ 
  opacity: isHovered.value ? props.imageOpacity : 0, 
  transition: `opacity ${props.hoverImageEase} ease` 
}));

const hologramStyle = computed(() => ({ 
  background: props.holographicGradient, 
  backgroundSize: '200% 200%', 
  backgroundPosition: `${(mouse.x + 0.5) * 100}% ${(mouse.y + 0.5) * 100}%`, 
  opacity: props.hologramOpacity 
}));

const glareStyle = computed(() => ({ 
  borderRadius: `${props.borderRadius}px`, 
  background: `radial-gradient(circle at ${(mouse.x + 0.5) * 100}% ${(mouse.y + 0.5) * 100}%, rgba(255,255,255,0.2) 0%, transparent 60%)` 
}));

const electricContainerStyle = computed(() => ({ 
  width: `${props.width + props.electricNoiseIntensity * 3}px`, 
  height: `${props.height + props.electricNoiseIntensity * 3}px` 
}));

const topTextStyle = computed(() => ({
  position: 'absolute', top: 0, [props.isRTL ? 'right' : 'left']: 0, padding: props.textOverlayPadding,
  color: isHovered.value && props.hoverElectricColor ? props.hoverElectricColor : (isHovered.value ? props.electricColor : props.topTextColor),
  fontWeight: props.topTextWeight, fontSize: typeof props.topTextFontSize === 'number' ? `${props.topTextFontSize}px` : props.topTextFontSize,
  letterSpacing: typeof props.topTextLetterSpacing === 'number' ? `${props.topTextLetterSpacing}px` : props.topTextLetterSpacing,
  writingMode: props.topTextVertical ? 'vertical-rl' : 'horizontal-tb', 
  textOrientation: props.topTextVertical ? 'mixed' : undefined,
  textShadow: isHovered.value ? `0 0 15px ${props.hoverElectricColor || props.electricColor}` : "none", transition: "all 0.3s ease"
}));

const bottomTextContainerStyle = computed(() => ({
  position: 'absolute', bottom: 0, left: 0, right: 0, padding: props.textOverlayPadding, display: 'flex',
  justifyContent: (props.isRTL !== props.mirrorBottomText) ? "flex-start" : "flex-end", 
  transform: props.mirrorBottomText ? "scale(-1, -1)" : "none"
}));

const bottomTextStyle = computed(() => ({
  color: isHovered.value && props.hoverElectricColor ? props.hoverElectricColor : (isHovered.value ? props.electricColor : props.bottomTextColor),
  fontWeight: props.bottomTextWeight, fontSize: typeof props.bottomTextFontSize === 'number' ? `${props.bottomTextFontSize}px` : props.bottomTextFontSize,
  letterSpacing: typeof props.bottomTextLetterSpacing === 'number' ? `${props.bottomTextLetterSpacing}px` : props.bottomTextLetterSpacing,
  writingMode: props.bottomTextVertical ? 'vertical-rl' : 'horizontal-tb', 
  textOrientation: props.bottomTextVertical ? 'mixed' : undefined,
  textShadow: isHovered.value ? `0 0 15px ${props.hoverElectricColor || props.electricColor}` : "none", transition: "all 0.3s ease"
}));

// Interaction Methods
const handleMouseMove = (e) => {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  mouse.x = (e.clientX - rect.left) / rect.width - 0.5;
  mouse.y = (e.clientY - rect.top) / rect.height - 0.5;
  
  if (props.enableTilt) {
    gsap.to(tilt, { x: mouse.x * 20, y: -mouse.y * 20, duration: 0.3, ease: "power2.out" });
  }
};

const handleMouseEnter = () => (isHovered.value = true);

const handleMouseLeave = () => {
  isHovered.value = false;
  mouse.x = 0;
  mouse.y = 0;
  gsap.to(tilt, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.6)" });
};

// Color Watcher
watch(isHovered, (hovered) => {
  const target = hovered && props.hoverElectricColor ? props.hoverElectricColor : props.electricColor;
  gsap.to(colorState, { 
    current: target, 
    duration: parseFloat(props.electricColorEase) || 0.3 
  });
});

// Canvas Animation Loop
let animationId = 0;
onMounted(() => {
  if (!props.enableElectric || !canvasRef.value) return;
  const ctx = canvasRef.value.getContext("2d");
  let time = 0, lastFrame = 0;
  const noiseCfg = { octaves: 8, lacunarity: 1.2, gain: 0.5, amplitude: props.electricAmplitude, frequency: props.electricFrequency };

  const draw = (currentTime) => {
    const dt = (currentTime - lastFrame) / 1000;
    lastFrame = currentTime; 
    time += dt * props.electricSpeed;

    const canvas = canvasRef.value;
    if (!canvas) return;

    const pad = props.electricNoiseIntensity * 3;
    canvas.width = props.width + pad; 
    canvas.height = props.height + pad;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = colorState.current; 
    ctx.lineWidth = props.electricWidth;
    ctx.lineCap = "round"; 
    ctx.lineJoin = "round"; 
    ctx.shadowBlur = props.electricBlur; 
    ctx.shadowColor = colorState.current;

    const cx = canvas.width / 2, cy = canvas.height / 2;
    const w = props.width + props.electricOffset * 2, h = props.height + props.electricOffset * 2;
    const left = cx - w / 2, top = cy - h / 2;
    const r = Math.max(0, props.electricBorderRadius ?? props.borderRadius);
    const sW = w - 2 * r, sH = h - 2 * r, cA = (Math.PI * r) / 2;
    const totalP = 2 * sW + 2 * sH + 4 * cA, steps = Math.floor(totalP / 2);

    const getPoint = (t) => {
      let d = t * totalP, acc = 0;
      if (d <= (acc += sW)) return { x: left + r + d, y: top };
      if (d <= (acc += cA)) { 
        const p = (d - (acc - cA)) / cA, a = -Math.PI / 2 + p * (Math.PI / 2); 
        return { x: left + w - r + r * Math.cos(a), y: top + r + r * Math.sin(a) }; 
      }
      if (d <= (acc += sH)) return { x: left + w, y: top + r + (d - (acc - sH)) };
      if (d <= (acc += cA)) { 
        const p = (d - (acc - cA)) / cA, a = 0 + p * (Math.PI / 2); 
        return { x: left + w - r + r * Math.cos(a), y: top + h - r + r * Math.sin(a) }; 
      }
      if (d <= (acc += sW)) return { x: left + w - r - (d - (acc - sW)), y: top + h };
      if (d <= (acc += cA)) { 
        const p = (d - (acc - cA)) / cA, a = Math.PI / 2 + p * (Math.PI / 2); 
        return { x: left + r + r * Math.cos(a), y: top + h - r + r * Math.sin(a) }; 
      }
      if (d <= (acc += sH)) return { x: left, y: top + h - r - (d - (acc - sH)) };
      const p = (d - acc) / cA, a = Math.PI + p * (Math.PI / 2); 
      return { x: left + r + r * Math.cos(a), y: top + r + r * Math.sin(a) };
    };

    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const t = i / steps, p = getPoint(t);
      const nX = octavedNoise(t * 10, time, 0, noiseCfg), nY = octavedNoise(t * 10, time, 1, noiseCfg);
      const dx = p.x + nX * props.electricNoiseIntensity, dy = p.y + nY * props.electricNoiseIntensity;
      if (i === 0) ctx.moveTo(dx, dy); else ctx.lineTo(dx, dy);
    }
    ctx.closePath(); 
    ctx.stroke();
    animationId = requestAnimationFrame(draw);
  };
  animationId = requestAnimationFrame(draw);
});

onUnmounted(() => cancelAnimationFrame(animationId));
</script>

<style scoped>
.holo-card-wrapper {
  position: relative;
  perspective: 1200px;
  user-select: none;
}
.holo-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.electric-canvas-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) translateZ(1px);
  pointer-events: none;
  z-index: 50;
}
.electric-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
.holo-card-body {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 40px -10px rgba(0,0,0,0.8);
}
.holo-pattern {
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
}
.image-layer {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-layer img {
  height: auto;
  max-height: 100%;
  object-fit: cover;
}
.hover-layer {
  z-index: 5;
}
.holo-overlay {
  position: absolute;
  inset: 0;
  z-index: 20;
  pointer-events: none;
  mix-blend-mode: color-dodge;
}
.text-content-layer {
  position: absolute;
  inset: 0;
  z-index: 30;
  pointer-events: none;
}
.glare-layer {
  position: absolute;
  inset: 0;
  z-index: 40;
  pointer-events: none;
  mix-blend-mode: overlay;
}
</style>