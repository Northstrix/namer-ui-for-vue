<script setup lang="ts">
import GlowingCard from './GlowingCard.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMedium } from '@fortawesome/free-brands-svg-icons'
</script>

<template>
  <div style="display: flex; align-items: center; justify-content: center; padding: 16px">
    <GlowingCard
      AccentColor="#8f10f6"
      BackgroundColor="#050505"
      TextColor="#f0f0f1"
      BorderRadius="2.25em"
      BorderWidth="4px"
      TopInscription="Medium"
      BigInscription=">30"
      SmallInscription="Articles"
      BottomInscription="Read Now ➔"
      learnMoreLink="https://medium.com/@Northstrix"
      width="387px"
      height="467px"
      IconHeight="54px"
      TopTextSize="25px"
    >
      <template #icon="{ iconStyle }">
        <FontAwesomeIcon :icon="faMedium" :style="iconStyle" />
      </template>
    </GlowingCard>
  </div>
</template>
