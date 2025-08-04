<script setup lang="ts">
import GlowingCard from './GlowingCard.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
</script>

<template>
  <div style="display: flex; align-items: center; justify-content: center; padding: 16px">
    <GlowingCard
      AccentColor="#8f10f6"
      BackgroundColor="#050505"
      TextColor="#f0f0f1"
      BorderRadius="2.25em"
      BorderWidth="4px"
      TopInscription="GitHub"
      BigInscription=">90"
      SmallInscription="Repositories"
      BottomInscription="Explore Now ➔"
      learnMoreLink="https://github.com/Northstrix"
      width="387px"
      height="467px"
      IconHeight="54px"
      TopTextSize="25px"
    >
      <template #icon="{ iconStyle }">
        <FontAwesomeIcon :icon="faGithub" :style="iconStyle" />
      </template>
    </GlowingCard>
  </div>
</template>
