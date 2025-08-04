<script setup lang="ts">
import ShamayimToggleSwitch from './ShamayimToggleSwitch.vue'
import Swal from 'sweetalert2'

// Configure the custom toast
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    popup: 'my-toast'
  },
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  }
})

// Use the original English messages
function handleTopSwitch(isOn: boolean) {
  Toast.fire({
    html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">Top switch is now <b>${isOn ? 'ON' : 'OFF'}</b></span>
      </div>
    `
  })
}

function handleBottomSwitch(isOn: boolean) {
  Toast.fire({
    html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">Bottom switch is now <b>${isOn ? 'ON' : 'OFF'}</b></span>
      </div>
    `
  })
}
</script>

<template>
  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 1em; min-height: 300px; width: 100%; border-radius: 8px; background-image: linear-gradient(45deg, #47b6d1, #90e0ec); font-size: 2em;">
    <div style="display: flex; align-items: center; gap: 1em;">
      <span style="color: #E0F9FC;">Mobile Data</span>
      <ShamayimToggleSwitch :default-state="false" :onChange="handleTopSwitch" />
    </div>
    <div style="display: flex; align-items: center; gap: 1em;">
      <ShamayimToggleSwitch :default-state="false" mirrored :onChange="handleBottomSwitch" />
      <span style="color: #E0F9FC;">נתונים סלולריים</span>
    </div>
  </div>
</template>

<style scoped>
.my-toast {
  background: #22202a !important;
  color: #fff !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 24px rgba(0,0,0,0.25);
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
