<template>
  <div class="product-demo-root">
    <p class="product-demo-disclaimer">
      <strong>Disclaimer:</strong> This product card is a conceptual design prototype created for demonstrative and educational purposes only. All product names, logos, brand identifiers, and trademarks displayed here are the sole property of their respective owners. Product details, images, and descriptions are used for illustrative purposes and do not represent actual commercial offerings. Namer UI is not affiliated with, endorsed by, or sponsored by any of the companies whose products are showcased. This website does not present a commercial offer of any kind. Any resemblance to existing product(s) is entirely coincidental.
    </p>
    <div class="product-demo-cards">
      <ProductCard
        id="0"
        imageSrc="https://images.pexels.com/photos/18525574/pexels-photo-18525574/free-photo-of-unboxing-iphone-15-pro-max-box-in-natural-titanium-color-mention-zana_qaradaghy-on-instagram-while-use-this-photo-follow-on-instagram-zana_qaradaghy.jpeg"
        altText="iPhone 15 Pro"
        oldPrice="$1,199"
        price="$1,079"
        condition="Brand new"
        discountTag="10% OFF"
        title="iPhone 15 Pro"
        description="Titanium smartphone with an advanced camera system, offering stunning photography capabilities and a sleek design."
        :onFilledButtonClick="handleFilledClick"
        :onOutlinedButtonClick="handleOutlinedClick"
        :showOutlinedButton="true"
      />
      <ProductCard
        id="1"
        imageSrc="https://images.unsplash.com/photo-1721864428881-dbabb9ea0017?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        altText="Samsung Galaxy Flip 6"
        oldPrice="$999"
        price="$499"
        condition="Pre-owned"
        discountTag="50% OFF"
        title="Samsung Galaxy Flip 6"
        description="Innovative foldable smartphone with a sleek design that enhances portability while providing a large display for immersive viewing experiences and multitasking."
        :onFilledButtonClick="handleFilledClick"
        :onOutlinedButtonClick="handleOutlinedClick"
        :showOutlinedButton="true"
        :accentColor="'#00A6FB'"
        :buttonRounding="50"
      />
      <ProductCard
        id="2"
        imageSrc="https://images.unsplash.com/photo-1514473776127-61e2dc1dded3?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        altText="iPhone 7"
        oldPrice="$199"
        price="$159"
        condition="Refurbished"
        discountTag="20% OFF"
        title="iPhone 7"
        description="Classic iPhone model with 12MP camera and water resistance, offering reliable performance and essential features for everyday smartphone users."
        :onFilledButtonClick="handleFilledClick"
        :onOutlinedButtonClick="handleOutlinedClick"
        :showOutlinedButton="false"
        :accentColor="'#FF3900'"
        :outerWidth="392"
        :outerHeight="414"
        :borderWidth="4"
        :containerRounding="14"
        :innerContainerRounding="14"
        :buttonRounding="14"
        :activeComponentScale="1.048"
        :darkTextInTags="true"
      />
      <ProductCard
        id="3"
        imageSrc="https://images.unsplash.com/photo-1511296933631-18b1a062212c?q=80&w=2436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        altText="iPhone X"
        oldPrice="₪999"
        price="₪599"
        condition="משומש"
        :discountTag="swappedDiscountTag"
        title="iPhone X"
        description="סמארטפון אייקוני עם תצוגת Super Retina בגודל 5.8 אינץ', טכנולוגיית Face ID מתקדמת, מצלמות כפולות של 12MP ועיצוב חדשני שמהפכני בצילום הסלולרי."
        :onFilledButtonClick="handleFilledClick"
        :onOutlinedButtonClick="handleOutlinedClick"
        :showOutlinedButton="true"
        :outlineColor="'#f1f1f7'"
        :accentColor="'#00A6FB'"
        :containerRounding="36"
        :innerContainerRounding="21"
        :buttonRounding="50"
        filledButtonInscription="קנה עכשיו"
        outlinedButtonInscription="הוסף לעגלה"
        :swapButtons="true"
        :activeComponentScale="1.08"
        :mirrorTags="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from './ProductCard.vue'
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

const originalDiscountTag = 'הנחה 40%'
const discountTagParts = originalDiscountTag.split(' ')
const swappedDiscountTag = discountTagParts.reverse().join(' ')

function handleFilledClick(id: string) {
  const message = `Filled button click - id: ${id}`
  Toast.fire({
    html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">${message}</span>
      </div>
    `
  })
}

function handleOutlinedClick(id: string) {
  const message = `Outlined button click - id: ${id}`
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

<style>
.product-demo-root {
  min-height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.product-demo-disclaimer {
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
.product-demo-disclaimer strong {
  color: #fff;
  font-weight: bold;
}
.product-demo-cards {
  min-height: 300px;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-bottom: 3rem;
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
