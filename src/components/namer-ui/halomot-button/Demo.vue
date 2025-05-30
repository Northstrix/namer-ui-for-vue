<template>
  <HalomotButton
    inscription="GitHub"
    :icon="GithubIcon"
    :onClick="handleGithubClick"
    gradient="linear-gradient(135deg, #a123f4, #603dec)"
    borderWidth="1px"
    outerBorderRadius="6.34px"
    innerBorderRadius="6px"
    href="https://github.com/Northstrix"
    padding="1rem 4rem"
  />
</template>

<script setup lang="ts">
import HalomotButton from './HalomotButton.vue'
import { Github } from 'lucide-vue-next'
import Swal from 'sweetalert2'

const GithubIcon = Github

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

function handleGithubClick() {
  Toast.fire({
    html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">Halomot button clicked!</span>
      </div>
    `
  })
}
</script>

<style scoped>
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
