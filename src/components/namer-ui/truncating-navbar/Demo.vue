<template>
  <TruncatingNavbar
    icon="/logo.png"
    appName="Nmr"
    :routes="routes"
    homeRoute="/"
    scrolledBg="#151419"
    mobileBg="#060507"
    outlineColor="#403d4d"
    searchPlaceholderText="Search..."
    shortcutKey="M"
    @open-search="openSearch"
    :zIndex="1"
  />
</template>

<script setup lang="ts">
import TruncatingNavbar from './TruncatingNavbar.vue'
import Swal from 'sweetalert2'

const routes = [
  { name: 'Link', link: 'https://maxim-bortnikov.netlify.app/', external: true }
]

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

function openSearch() {
  Toast.fire({
    // Use custom HTML for left icon, right text
    html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">Fake search bar clicked!</span>
      </div>
    `
  })
}
</script>
