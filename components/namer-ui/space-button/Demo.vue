<template>
  <div class="space-demo-wrap">
    <SpaceButton
      inscription="Outer Space"
      variant="outer"
      @click="() => showToast('The Outer Space button has been clicked!')"
    />
    <SpaceButton
      inscription="Inner Space (1px border)"
      borderWidth="1px"
      @click="() => showToast('The Inner Space button has been clicked!')"
    />
    <SpaceButton
      inscription="Outer Space (1px, thin font)"
      :isBold="false"
      variant="outer"
      @click="() => showToast('The Outer Space thin font button has been clicked!')"
    />
    <SpaceButton
      inscription="5px Border"
      borderWidth="5px"
      @click="() => showToast('The 5px Border button has been clicked!')"
    />
    <SpaceButton
      inscription="Hover any of these"
      borderRadius="2em"
      @click="() => showToast('The Hover any of these button has been clicked!')"
    />
    <SpaceButton
      inscription="פונט גדול"
      fontSize="32px"
      variant="outer"
      @click="() => showToast('The large font button has been clicked!')"
    />
  </div>
</template>

<script setup lang="ts">
import SpaceButton from './SpaceButton.vue'
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

// Show the toast on button click
function showToast(message: string) {
  Toast.fire({
    html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">${message}</span>
      </div>
    `
  })
}
</script>

<style scoped>
.space-demo-wrap {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 36px;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* SweetAlert2 Toast Custom Styles */
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
