<template>
  <div class="inflected-demo-root">
    <div class="inflected-demo-disclaimer">
      <strong>Disclaimer:</strong> This product card is a conceptual design prototype created for demonstrative and educational purposes only. All product names, logos, brand identifiers, and trademarks displayed here are the sole property of their respective owners. Product details, images, and descriptions are used for illustrative purposes and do not represent actual commercial offerings. Namer UI is not affiliated with, endorsed by, or sponsored by any of the companies whose products are showcased. This website does not present a commercial offer of any kind. Any resemblance to existing product(s) is entirely coincidental.
    </div>
    <div class="inflected-demo-cards">
      <!-- iPhone 15 Pro -->
      <InflectedCard
        id="0"
        image="https://images.pexels.com/photos/18525574/pexels-photo-18525574/free-photo-of-unboxing-iphone-15-pro-max-box-in-natural-titanium-color-mention-zana_qaradaghy-on-instagram-while-use-this-photo-follow-on-instagram-zana_qaradaghy.jpeg"
        title="iPhone 15 Pro"
        description="Titanium smartphone with an advanced camera system, offering stunning photography capabilities and a sleek design."
        :tags="[
          { name: 'Brand new', textColor: '#f7f7ff', backgroundColor: '#9F4EFF', rounding: 5 },
          { name: '10% off', textColor: '#242424', backgroundColor: '#f1f1f7', rounding: 5 }
        ]"
        parentBackgroundColor="#060507"
        :onClick= showClickedToast
        :cardRounding="15"
        :fontSizes="{ title: '1.8rem', description: '1rem', tags: '0.85rem', price: '0.84rem' }"
        :margins="{ title: '0 0 7px 0', description: '0 0 18px 0', tags: '10px 0 0 0' }"
        :buttonIcon="CornerRightUp"
        :buttonIconSize="32"
        buttonIconColor="#ffffff"
        buttonIconHoverColor="#EEEEEE"
        buttonBackgroundColor="#9F4EFF"
        buttonBackgroundHoverColor="#a960ff"
        maxWidth="500px"
        :imageHoverZoom="1.1"
        price="$1,079"
        priceTagTextColor="#f7f7ff"
        oldPrice="$1,199"
        priceTagRounding="25px"
      />

      <!-- Samsung Galaxy Flip 6 -->
      <InflectedCard
        id="1"
        image="https://images.unsplash.com/photo-1721864428881-dbabb9ea0017?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Samsung Galaxy Flip 6"
        description="Innovative foldable smartphone with a sleek design that enhances portability while providing a large display for immersive viewing experiences and multitasking."
        :tags="[
          { name: 'Pre-owned', textColor: '#f7f7ff', backgroundColor: '#00A6FB', rounding: 0 },
          { name: '50% off', textColor: '#242424', backgroundColor: '#f1f1f7', rounding: 0 }
        ]"
        parentBackgroundColor="#060507"
        :onClick= showClickedToast
        :cardRounding="15"
        :fontSizes="{ title: '1.8rem', description: '1rem', tags: '0.85rem', price: '1.12rem' }"
        :margins="{ title: '0 0 7px 0', description: '0 0 18px 0', tags: '10px 0 0 0' }"
        :buttonIcon="FoldVertical"
        :buttonIconSize="32"
        buttonIconColor="#ffffff"
        buttonIconHoverColor="#EEEEEE"
        buttonBackgroundColor="#00A6FB"
        buttonBackgroundHoverColor="#0582CA"
        maxWidth="500px"
        :imageHoverZoom="1.1"
        price="$499"
        priceTagTextColor="#050505"
        oldPrice="$991"
        oldPriceTextColor="#565656"
        priceTagRounding="6px"
        priceTagBackgroundColor="rgba(255,255,255,0.78)"
      />

      <!-- iPhone 7 -->
      <InflectedCard
        id="2"
        image="https://images.unsplash.com/photo-1514473776127-61e2dc1dded3?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="iPhone 7"
        description="Classic iPhone model with 12MP camera and water resistance, offering reliable performance and essential features for everyday smartphone users."
        :tags="[
          { name: 'Refurbished', textColor: '#f7f7ff', backgroundColor: '#FF3900', rounding: 5 },
          { name: '20% off', textColor: '#242424', backgroundColor: '#f1f1f7', rounding: 5 }
        ]"
        parentBackgroundColor="#060507"
        :onClick= showClickedToast
        :cardRounding="14"
        :fontSizes="{ title: '1.8rem', description: '1rem', tags: '0.85rem', price: '1.12rem' }"
        :margins="{ title: '0 0 7px 0', description: '0 0 18px 0', tags: '10px 0 0 0' }"
        :buttonIcon="CornerRightUp"
        :buttonIconSize="32"
        buttonIconColor="#ffffff"
        buttonIconHoverColor="#EEEEEE"
        buttonBackgroundColor="#FF3900"
        buttonBackgroundHoverColor="#FF5733"
        maxWidth="392px"
        :imageHoverZoom="1.35"
        price="$159"
        priceTagRounding="25px"
        priceTagBackgroundColor="#FF3900"
      />

      <!-- iPhone X (Hebrew, mirrored, RTL, ArrowLeftFromLine icon) -->
      <InflectedCard
        id="3"
        image="https://images.unsplash.com/photo-1511296933631-18b1a062212c?q=80&w=2436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="iPhone X"
        description="סמארטפון אייקוני עם תצוגת Super Retina בגודל 5.8 אינץ', טכנולוגיית Face ID מתקדמת, מצלמות כפולות של 12MP ועיצוב חדשני שמהפכני בצילום הסלולרי."
        :tags="[
          { name: '40% הנחה', textColor: '#242424', backgroundColor: '#f1f1f7', rounding: 15 },
          { name: 'משומש', textColor: '#f7f7ff', backgroundColor: '#00A6FB', rounding: 15 }
        ]"
        parentBackgroundColor="#060507"
        :onClick= showClickedToast
        :cardRounding="36"
        :fontSizes="{ title: '1.8rem', description: '1rem', tags: '0.85rem', price: '1.12rem' }"
        :margins="{ title: '0 0 7px 0', description: '0 0 18px 0', tags: '10px 0 0 0' }"
        :buttonIcon="CornerRightUp"
        :buttonIconSize="32"
        buttonIconColor="#ffffff"
        buttonIconHoverColor="#EEEEEE"
        buttonBackgroundColor="#00A6FB"
        buttonBackgroundHoverColor="#0582CA"
        maxWidth="330px"
        :imageHoverZoom="1.61"
        price="₪599"
        priceTagTextColor="#f7f7ff"
        oldPrice="₪991"
        oldPriceOnTheRight
        priceTagRounding="25px"
        mirrored
        tagsAlignment="right"
        titleAlignment="center"
        descriptionAlignment="right"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import InflectedCard from './InflectedCard.vue'
import './InflectedCard.css'
import { CornerRightUp, FoldVertical } from 'lucide-vue-next'
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

function showClickedToast(target: string, id: string) {
  Toast.fire({
    html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">Clicked ${target} on card ${id}</span>
      </div>
    `
  })
}
</script>

<style>
.inflected-demo-root {
  background: #060507;
  min-height: 100vh;
  padding: 0;
}
.inflected-demo-cards {
  min-height: 300px;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 2rem;
}
.inflected-demo-disclaimer {
  max-width: 900px;
  margin: 2.5rem auto 1.5rem auto;
  color: #bdbdbd;
  font-size: 0.98rem;
  background: rgba(20, 22, 24, 0.85);
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
  line-height: 1.7;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.08);
}
.inflected-demo-disclaimer strong {
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
