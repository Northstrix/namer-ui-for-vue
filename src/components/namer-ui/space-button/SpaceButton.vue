<template>
  <button
    class="spaceButton"
    :class="{ variant: variant === 'outer' }"
    :style="buttonStyle"
    @click="handleClick"
  >
    {{ inscription }}
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  inscription: { type: String, required: true },
  borderRadius: { type: String, default: '0.76em' },
  borderWidth: { type: String, default: '2px' },
  variant: { type: String, default: 'inner' },
  isBold: { type: Boolean, default: true },
  fontSize: { type: String, default: '16px' },
  onClick: { type: Function }
})

const buttonStyle = computed(() => ({
  '--border-radius': props.borderRadius,
  '--border-width': props.borderWidth,
  fontWeight: props.isBold ? 'bold' : 'normal',
  fontFamily: '"Arial", "Alef", sans-serif',
  fontSize: props.fontSize
}))

function handleClick(event) {
  if (props.onClick) props.onClick(event)
}
</script>

<style scoped>
/* CSS custom properties for gradients and border effects */
@property --pos-x { syntax: '<percentage>'; initial-value: 11.14%; inherits: false; }
@property --pos-y { syntax: '<percentage>'; initial-value: 140%; inherits: false; }
@property --spread-x { syntax: '<percentage>'; initial-value: 150%; inherits: false; }
@property --spread-y { syntax: '<percentage>'; initial-value: 180.06%; inherits: false; }
@property --color-1 { syntax: '<color>'; initial-value: #000; inherits: false; }
@property --color-2 { syntax: '<color>'; initial-value: #08012c; inherits: false; }
@property --color-3 { syntax: '<color>'; initial-value: #4e1e40; inherits: false; }
@property --color-4 { syntax: '<color>'; initial-value: #70464e; inherits: false; }
@property --color-5 { syntax: '<color>'; initial-value: #88394c; inherits: false; }
@property --border-angle { syntax: '<angle>'; initial-value: 20deg; inherits: true; }
@property --border-color-1 { syntax: '<color>'; initial-value: hsla(340, 75%, 60%, 0.2); inherits: true; }
@property --border-color-2 { syntax: '<color>'; initial-value: hsla(340, 75%, 40%, 0.75); inherits: true; }
@property --stop-1 { syntax: '<percentage>'; initial-value: 37.35%; inherits: false; }
@property --stop-2 { syntax: '<percentage>'; initial-value: 61.36%; inherits: false; }
@property --stop-3 { syntax: '<percentage>'; initial-value: 78.42%; inherits: false; }
@property --stop-4 { syntax: '<percentage>'; initial-value: 89.52%; inherits: false; }
@property --stop-5 { syntax: '<percentage>'; initial-value: 100%; inherits: false; }

.spaceButton {
  border-radius: var(--border-radius);
  padding: 16px 36px;
  min-width: 132px;
  font-size: 16px;
  font-family: "Arial", "Alef", sans-serif;
  line-height: 19px;
  font: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: inherit;
  font-weight: 500;
  color: rgba(255 255 255 / 95%);
  border: none;
  position: relative;
  cursor: pointer;
  appearance: none;
  background: radial-gradient(
    var(--spread-x) var(--spread-y) at var(--pos-x) var(--pos-y),
    var(--color-1) var(--stop-1),
    var(--color-2) var(--stop-2),
    var(--color-3) var(--stop-3),
    var(--color-4) var(--stop-4),
    var(--color-5) var(--stop-5)
  );
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.95);
  outline: none;
  -webkit-tap-highlight-color: transparent;
  transition:
    --pos-x 0.5s,
    --pos-y 0.5s,
    --spread-x 0.5s,
    --spread-y 0.5s,
    --color-1 0.5s,
    --color-2 0.5s,
    --color-3 0.5s,
    --color-4 0.5s,
    --color-5 0.5s,
    --border-angle 0.5s,
    --border-color-1 0.5s,
    --border-color-2 0.5s,
    --stop-1 0.5s,
    --stop-2 0.5s,
    --stop-3 0.5s,
    --stop-4 0.5s,
    --stop-5 0.5s;
}

.spaceButton::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: var(--border-width);
  background-image: linear-gradient(var(--border-angle), var(--border-color-1), var(--border-color-2));
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
}

.spaceButton:hover {
  --pos-x: 0%;
  --pos-y: 91.51%;
  --spread-x: 120.24%;
  --spread-y: 103.18%;
  --color-1: #c96287;
  --color-2: #c66c64;
  --color-3: #cc7d23;
  --color-4: #37140a;
  --color-5: #000;
  --border-angle: 190deg;
  --border-color-1: hsla(340, 78%, 90%, 0.1);
  --border-color-2: hsla(340, 75%, 90%, 0.6);
  --stop-1: 0%;
  --stop-2: 8.8%;
  --stop-3: 21.44%;
  --stop-4: 71.34%;
  --stop-5: 85.76%;
}

.spaceButton.variant {
  --color-1: #000022;
  --color-2: #1f3f6d;
  --color-3: #469396;
  --color-4: #f1ffa5;
  --color-5: hsla(250, 80%, 2.5%, 1);
  --pos-x: 40%;
  --pos-y: 140%;
  --spread-x: 130%;
  --spread-y: 170.06%;
  --stop-1: 37.35%;
  --stop-2: 61.36%;
  --stop-3: 78.42%;
  --stop-4: 93.52%;
  --stop-5: 100%;
  --border-angle: 180deg;
  --border-color-1: hsla(320, 75%, 90%, 0.9);
  --border-color-2: hsla(320, 50%, 90%, 0.1);
}
.spaceButton.variant:hover {
  --pos-x: 0%;
  --pos-y: 120%;
  --spread-x: 110.24%;
  --spread-y: 110.2%;
  --color-1: #000020;
  --color-2: #f1ffa5;
  --color-3: #469396;
  --color-4: #1f3f6d;
  --stop-1: 0%;
  --stop-2: 10%;
  --stop-3: 35.44%;
  --stop-4: 71.34%;
  --stop-5: 150%;
  --border-angle: 190deg;
  --border-color-1: hsla(320, 75%, 90%, 0.1);
  --border-color-2: hsla(320, 50%, 90%, 0.35);
}
</style>
