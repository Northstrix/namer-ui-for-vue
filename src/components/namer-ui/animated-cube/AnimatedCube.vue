<script setup lang="ts">
import { computed } from 'vue'

interface AnimatedCubeProps {
  size?: number
  scale?: number
  faceColor?: string
  shadowColor?: string
  borderColor?: string
  animationDuration?: number
}

const props = withDefaults(defineProps<AnimatedCubeProps>(), {
  size: 80,
  scale: 1,
  faceColor: '#a19fe5',
  shadowColor: '#000',
  borderColor: '#222',
  animationDuration: 2,
})

const cubeSize = computed(() => props.size * props.scale)
const faces = [
  { class: 'shadow', isShadow: true },
  { class: 'top' },
  { class: 'front' },
  { class: 'back' },
  { class: 'right' },
  { class: 'left' },
]

// Dynamic CSS vars for transforms
const cssVars = computed(() => ({
  '--cube-size': `${props.size}px`,
  '--cube-half': `${props.size / 2}px`,
  '--cube-full': `${props.size}px`,
  '--cube-neg-full': `-${props.size}px`,
  '--cube-rotate-duration': `${props.animationDuration}s`,
  '--cube-bounce-duration': `${props.animationDuration}s`,
}))
</script>

<template>
  <div
    class="scene"
    :style="{
      width: cubeSize + 'px',
      height: cubeSize + 'px',
      transform: `scale(${props.scale})`,
      ...cssVars
    }"
  >
    <div
      class="cube-wrapper"
      :style="{ animationDuration: props.animationDuration + 's' }"
    >
      <div
        class="cube"
        :style="{ animationDuration: props.animationDuration + 's' }"
      >
        <div class="cube-faces" :style="{ width: props.size + 'px', height: props.size + 'px', }">
          <div
            v-for="face in faces"
            :key="face.class"
            class="cube-face"
            :class="face.class"
            :style="{
              width: props.size + 'px',
              height: props.size + 'px',
              background: face.isShadow ? props.shadowColor : props.faceColor,
              border: `solid 1px ${props.borderColor}`,
              animationDuration: props.animationDuration + 's'
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scene {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  perspective: 800px;
}

.cube-wrapper {
  transform-style: preserve-3d;
  animation: bouncing var(--cube-bounce-duration, 2s) infinite;
  animation-duration: inherit;
}

.cube {
  transform-style: preserve-3d;
  transform: rotateX(45deg) rotateZ(45deg);
  animation: rotation var(--cube-rotate-duration, 2s) infinite;
  animation-duration: inherit;
}

.cube-faces {
  transform-style: preserve-3d;
  position: relative;
  transform-origin: 0 0;
  /* Center the cube faces stack */
  transform: translateX(0) translateY(0) translateZ(calc(-1 * var(--cube-half)));
}

.cube-face {
  position: absolute;
  inset: 0;
  box-sizing: border-box;
}

.cube-face.shadow {
  /* Shadow face under the cube */
  transform: translateZ(var(--cube-neg-full));
  animation: bouncingShadow var(--cube-bounce-duration, 2s) infinite;
  opacity: 0.05;
}

.cube-face.top {
  transform: translateZ(var(--cube-full));
}

.cube-face.front {
  transform-origin: 0 50%;
  transform: rotateY(-90deg);
}

.cube-face.back {
  transform-origin: 0 50%;
  transform: rotateY(-90deg) translateZ(var(--cube-neg-full));
}

.cube-face.right {
  transform-origin: 50% 0;
  transform: rotateX(-90deg) translateY(var(--cube-neg-full));
}

.cube-face.left {
  transform-origin: 50% 0;
  transform: rotateX(-90deg) translateY(var(--cube-neg-full)) translateZ(var(--cube-full));
}

@keyframes rotation {
  0% {
    transform: rotateX(45deg) rotateY(0) rotateZ(45deg);
  }
  50% {
    transform: rotateX(45deg) rotateY(0) rotateZ(405deg);
  }
  100% {
    transform: rotateX(45deg) rotateY(0) rotateZ(45deg);
  }
}

@keyframes bouncing {
  0% {
    transform: translateY(calc(-0.5 * var(--cube-full)));
  }
  45% {
    transform: translateY(calc(0.5 * var(--cube-full)));
  }
  100% {
    transform: translateY(calc(-0.5 * var(--cube-full)));
  }
}

@keyframes bouncingShadow {
  0% {
    transform: translateZ(var(--cube-neg-full)) scale(1.3);
    opacity: 0.05;
  }
  45% {
    transform: translateZ(0);
    opacity: 0.3;
  }
  100% {
    transform: translateZ(var(--cube-neg-full)) scale(1.3);
    opacity: 0.05;
  }
}
</style>
