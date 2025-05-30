<template>
  <span class="magic">
    <span
      v-for="n in starCount"
      :key="n"
      class="magic-star"
      ref="magicStars"
    >
      <svg viewBox="0 0 512 512">
        <path
          :fill="starColors[n - 1]"
          d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z"
        />
      </svg>
    </span>
    <span class="magic-text">
      <slot />
    </span>
  </span>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';

const palette = ['#4776cb', '#a19fe5', '#6cc606'];
const starCount = 3;

const magicStars = ref<HTMLElement[]>([]);
const starColors = ref<string[]>(Array.from({ length: starCount }, () => palette[Math.floor(Math.random() * palette.length)]));

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function animate(star: HTMLElement, idx: number) {
  star.style.setProperty('--star-left', `${rand(-10, 100)}%`);
  star.style.setProperty('--star-top', `${rand(-40, 80)}%`);
  // Random color for this sparkle
  starColors.value[idx] = palette[Math.floor(Math.random() * palette.length)];
  star.style.animation = 'none';
  void star.offsetHeight; // force reflow
  star.style.animation = '';
}

onMounted(async () => {
  await nextTick();
  magicStars.value.forEach((star, idx) => {
    setTimeout(() => {
      animate(star, idx);
      setInterval(() => animate(star, idx), 1000);
    }, idx * 333);
  });
});
</script>

<style scoped>
.magic {
  display: inline-block;
  position: relative;
}
.magic-star {
  --size: clamp(20px, 1.5vw, 30px);
  animation: scale 700ms ease forwards;
  display: block;
  height: var(--size);
  left: var(--star-left);
  position: absolute;
  top: var(--star-top);
  width: var(--size);
  pointer-events: none;
}
.magic-star > svg {
  animation: rotate 1000ms linear infinite;
  display: block;
  opacity: 0.7;
}
.magic-text {
  animation: background-pan 3s linear infinite;
  background: linear-gradient(
    to right,
    #4776cb,
    #a19fe5,
    #6cc606,
    #4776cb
  );
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
}
@keyframes background-pan {
  from { background-position: 0% center; }
  to { background-position: -200% center; }
}
@keyframes scale {
  from, to { transform: scale(0); }
  50% { transform: scale(1); }
}
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(180deg); }
}
</style>
