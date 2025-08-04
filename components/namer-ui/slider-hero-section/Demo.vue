<template>
  <div style="min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: flex-start;">
    <p class="demo-disclaimer">
      <strong>Disclaimer:</strong>
      All product names, logos, brand identifiers, and trademarks displayed on this website are the sole property of their respective owners. These items are used for demonstrational and illustrative purposes only. The Namer UI is not affiliated with, endorsed by, or sponsored by any of the companies whose products are showcased here. This website does not present a commercial offer of any kind. The store name is fictional; any resemblance to existing business(es) is entirely coincidental and unintentional.
    </p>
    <div style="max-height: calc(100vh - 68px); display: flex; flex-direction: column; align-items: center; justify-content: flex-start;">

      <SliderHeroSection
        title="Discover cutting-edge tech and top brands at NamerStore – your one-stop destination for brand new, refurbished, and pre-owned electronics"
        :showcaseOptions="[
          { text: 'Brand New Electronics', imageUrl: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
          { text: 'Refurbished iPhones', imageUrl: 'https://images.unsplash.com/photo-1604671368394-2240d0b1bb6c?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
          { text: 'Pre-owned Samsung Flagships', imageUrl: 'https://images.unsplash.com/photo-1584006682522-dc17d6c0d9ac?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]"
        :titleFontWeight="800"
        :showcaseFontWeight="700"
        :desktopVersionBottomThreshold="900"
        @onOptionClick = handleClick
        @onOptionHover = handleHover
      />
    </div>
    <!-- RTL Example -->
    <div style="width: 500px; overflow: hidden; margin-top: 2em;">
      <SliderHeroSection
        title="גלה טכנולוגיה חדשנית ומותגים מובילים בנמרסטור - היעד שלך למוצרי אלקטרוניקה חדשים, מחודשים ומשומשים."
        :showcaseOptions="[
          { text: 'מוצרי אלקטרוניקה חדשים', imageUrl: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
          { text: 'אייפונים מחודשים', imageUrl: 'https://images.unsplash.com/photo-1604671368394-2240d0b1bb6c?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
          { text: 'מכשירי סמסונג משומשים', imageUrl: 'https://images.unsplash.com/photo-1584006682522-dc17d6c0d9ac?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]"
        :activeOptionColor="'#A031EB'"
        :textColor="'#080810'"
        :imageChangeInterval="3000"
        :imageTransitionDuration="0.51"
        :darkenImages="-0.5"
        height="760px"
        borderRadius="2.5em"
        mobileTitleAlign="right"
        mobileShowcaseAlign="right"
        :titleFontWeight="900"
        :showcaseFontWeight="700"
        :desktopVersionBottomThreshold="600"
        @onOptionClick = handleClick
        @onOptionHover = handleHover
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SliderHeroSection from './SliderHeroSection.vue'
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

function handleClick(id: any) {
  const message = `Clicked item: <b>${id}</b>`;
  Toast.fire({
    html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">${message}</span>
      </div>
    `
  });
}

function handleHover(id: any) {
  const message = `Hovered item: <b>${id}</b>`;
  Toast.fire({
    html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">${message}</span>
      </div>
    `
  });
}

</script>

<style>
.demo-disclaimer {
  color: #f7f7ff;
  font-size: 1rem;
  max-width: 1080px;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  padding: 1.25rem 1.5rem;
  background: rgba(20, 22, 24, 0.85);
  border-radius: 1rem;
  line-height: 1.7;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.08);
}
.demo-disclaimer strong {
  color: #fff;
  font-weight: bold;
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
