<script setup lang="ts">
import BentoGrid from './BentoGrid.vue'
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

function handleCellClick(cell: 'main' | 'topCenter' | 'topRight' | 'bottom') {
  Toast.fire({
    html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">Clicked cell: <b>${cell}</b></span>
      </div>
    `
  });
}
</script>

<template>
  <div style="width: 100vw;">
    <BentoGrid
      :main-aspect="'9/16'"
      :left-col-ratio="0.32"
      :right-col1="0.6"
      :right-col2="0.4"
      :top-row-ratio="0.65"
      :bottom-row-ratio="0.35"
      gap="20px"
      grid-height="264px"

      cell-background="#17161c"
      cell-border-color="#33313d"
      cell-border-radius="32px"
      cell-border-width="1px"
      cell-padding="16px"

      main-cell-border-color="#7b1fa2"
      main-cell-border-radius="32px"

      top-center-cell-background="#060507"

      top-right-cell-background="#111014"

      bottom-cell-background="#4776cb"
      bottom-cell-border-color="#fff"
      bottom-cell-border-radius="8px"
      bottom-cell-border-width="4px"
      @cellClick="handleCellClick"
    >
      <template #main>
        <div style="width: 100%; text-align: center;">
          <div style="font-size: 1rem; font-weight: bold;">Left (Main)</div>
        </div>
      </template>
      <template #topCenter>
        <div style="width: 100%; text-align: center;">
          <div style="font-size: 1rem; font-weight: bold;">Top Center</div>
        </div>
      </template>
      <template #topRight>
        <div style="width: 100%; text-align: center;">
          <div style="font-size: 1rem; font-weight: bold;">Top Right</div>
        </div>
      </template>
      <template #bottom>
        <div style="width: 100%; text-align: center;">
          <div style="font-size: 1rem; font-weight: bold;">Bottom Right</div>
        </div>
      </template>
    </BentoGrid>
  </div>
</template>

<style>
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
