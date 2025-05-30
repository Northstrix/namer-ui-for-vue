<script setup lang="ts">
import PlayingCard from './PlayingCard.vue'
import Swal from 'sweetalert2'

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

function handleCardClick() {
  Toast.fire({
    html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">Card clicked!</span>
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


<template>
  <div
    style="display: flex; flex-direction: column; align-items: center; padding: 32px; border-radius: 8px; min-height: 300px;"
  >
    <div
      style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; width: 100%;"
    >
      <PlayingCard
        componentWidth="412px"
        aspectRatio="3/4"
        outerRounding="18px"
        innerRounding="18px"
        backgroundColor="#FFF"
        foregroundColor="#000"
        :imageHeightPercentage="70"
        imageSrc="https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/playground-card-image.webp"
        imageAlt=""
        outlineColor="#ddd"
        hoverOutlineColor="#aaa"
        :textArray="['洪', '秀', '全']"
        :minWidth="200"
        :maxWidth="400"
        :minTextSize="16"
        :maxTextSize="24"
        verticalPadding="20px"
        horizontalPadding="20px"
        :manualLetterSpacing="6"
        componentId="card-1"
        :onCardClicked="handleCardClick"
        textColorTransitionDelay="1s"
        textColorTransitionDuration="2.4s"
      />
    </div>
  </div>
</template>
