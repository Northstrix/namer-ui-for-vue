<script setup lang="ts">
import { ref } from 'vue'
import WhatsAppWidget from './WhatsAppWidget.vue'
import ChronicleButton from '../chronicle-button/ChronicleButton.vue'

const clickCount = ref(0)
const widgetEnabled = ref(false)

function enableWidget() {
  widgetEnabled.value = true
}

function openWhatsApp() {
  clickCount.value++
  // Optionally, open WhatsApp in a new tab:
  // window.open('https://wa.me/1234567890', '_blank')
}
</script>

<template>
  <div class="wa-demo-root">
    <div class="wa-demo-center">
      <div v-if="!widgetEnabled" class="wa-demo-btn-wrap">
        <ChronicleButton
          text="Enable Widget"
          customBackground="#25d366"
          customForeground="#111014"
          hoverColor="#fff"
          hoverBackground="#128c7e"
          width="260px"
          borderRadius="1.2rem"
          :onClick="enableWidget"
        />
      </div>
      <div
        v-else
      >
      </div>
    </div>
    <div class="wa-demo-disclaimer">
      <strong>Disclaimer:</strong>
      The person, name, and sales pitch demonstrated in this WhatsApp widget are entirely fictitious. Any similarity to actual individual(s) or business(es) is purely coincidental and unintentional.
      NamerStore is a fictional entity used for illustrative purposes only. The store name is fictional; any resemblance to existing business(es) is entirely coincidental and unintentional.
      This widget is a conceptual design prototype created for demonstrative and educational purposes and does not represent an actual commercial offering.
    </div>
    <div class="wa-demo-center">
      <div v-if="!widgetEnabled" class="wa-demo-btn-wrap">
      </div>
      <div
        v-else
        class="wa-demo-clicks-inscription"
      >
        Chat in WhatsApp button has been clicked <strong>{{ clickCount }}</strong> times
      </div>
    </div>
    <WhatsAppWidget
      v-if="widgetEnabled"
      name="Alice West"
      photo="https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      status="online"
      :onWhatsAppClick="openWhatsApp"
      displayedMessage="Hi, I'm Alice from NamerStore. 🚀 Looking for new, pre-owned, or refurbished tech? We have great deals! What device interests you? Let's find a perfect match for you."
      :selfPopUpsIn="3000"
      buttonInscription="Chat in WhatsApp"
    />
  </div>
</template>

<style>
.wa-demo-root {
  padding: 0;
}
.wa-demo-disclaimer {
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
.wa-demo-disclaimer strong {
  color: #fff;
  font-weight: bold;
}
.wa-demo-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2.5rem 0 2.5rem 0;
}
.wa-demo-btn-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.wa-demo-clicks-inscription {
  color: #fff;
  font-size: 1.13rem;
  text-align: center;
  margin: 1.5rem 0 1.5rem 0;
  font-weight: 500;
  letter-spacing: 0.01em;
}
.wa-demo-clicks-inscription strong {
  color: #fff;
  font-weight: bold;
}
</style>
