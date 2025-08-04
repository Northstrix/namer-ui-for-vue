<script setup lang="ts">
import Spiral from './Spiral.vue'
import Swal from 'sweetalert2'


// SweetAlert2 toast config with your requested exact style
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    popup: 'my-toast',
  },
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  },
})


function handleSpiralClick(index: number) {
  Toast.fire({
    html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">Clicked spiral container index: <b>${index}</b></span>
      </div>
    `,
  })
}


function handleSpiralHover(index: number, isHovering: boolean) {
  console.log(`Spiral index ${index} hover state:`, isHovering);
  Toast.fire({
    html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">${isHovering ? 'Hovered' : 'Unhovered'} spiral index: <b>${index}</b></span>
      </div>
    `,
  })
}
</script>

<template>
  <div class="app-container">
    <div class="demo-section">
      <div class="label">
        Distortion: 0.6 / 1.4 / 3.6; Stroke Width: 2
      </div>
      <div class="spiral-wrapper" @click="handleSpiralClick(1)">
        <Spiral
          spiralColor="71, 118, 203"
          :defaultDistortion="0.6"
          :hoverDistortion="1.4"
          :clickDistortion="3.6"
          :strokeWidth="2"
          :onHover="(hover) => handleSpiralHover(1, hover)"
        />
      </div>
    </div>

    <div class="demo-section">
      <div class="label">
        Distortion: 0.4 / 0.7 / 1.5; Stroke Width: 3.7
      </div>
      <div class="spiral-wrapper" @click="handleSpiralClick(2)">
        <Spiral
          spiralColor="161, 159, 229"
          :defaultDistortion="0.4"
          :hoverDistortion="0.7"
          :clickDistortion="1.5"
          :strokeWidth="3.7"
          :onHover="(hover) => handleSpiralHover(2, hover)"
        />
      </div>
    </div>

    <div class="demo-section">
      <div class="label">
        Distortion: 1.2 / 1.9 / 5; Stroke Width: 1.34
      </div>
      <div class="spiral-wrapper" @click="handleSpiralClick(3)">
        <Spiral
          spiralColor="108, 198, 6"
          :defaultDistortion="1.2"
          :hoverDistortion="1.9"
          :clickDistortion="5"
          :strokeWidth="1.34"
          :onHover="(hover) => handleSpiralHover(3, hover)"
        />
      </div>
    </div>

    <!-- Additional example -->
    <div class="demo-section">
      <div class="label">
        Distortion: 0.5 / 1.0 / 2.0; Stroke Width: 2.5
      </div>
      <div class="spiral-wrapper rounded-demo" @click="handleSpiralClick(4)">
        <Spiral
          spiralColor="10, 10, 10"
          :defaultDistortion="0.5"
          :hoverDistortion="1.0"
          :clickDistortion="2.0"
          :strokeWidth="2.5"
          :onHover="(hover) => handleSpiralHover(4, hover)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  background-color: transparent;
  overflow-y: auto;
  align-items: stretch;
}

.demo-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  color: #aaa;
  font-family: monospace;
  font-size: 0.85rem;
  user-select: none;
  padding-left: 8px;
}

.spiral-wrapper {
  width: 100%;
  aspect-ratio: 1 / 1; /* Maintain square */
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  user-select: none;
}

/* Additional example container style */
.rounded-demo {
  border-radius: 8px !important;
  background-color: #eee;
}

/* SweetAlert2 toast custom styling */
.my-toast {
  background: #22202a !important;
  color: #fff !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
  padding: 1rem 1.5rem !important;
}
.toast-flex {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.toast-logo {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: #fff;
  object-fit: contain;
}
.toast-message {
  font-size: 1rem;
  font-weight: 500;
}
</style>