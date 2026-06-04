<template>
  <div class="flashcard-demo">
    <div class="demo-bg"></div>

    <div class="cards-stack">
      <GlassmorphicFlashcard
        imageUrl="/glassmorphic-flashcard/casa.webp"
        :aspectRatioForNamerFlashcard="217 / 232"
        frontTagText="Italian"
        word="Casa"
        definition="Un edificio o una abitazione in cui vivono una o più persone."
        audioUrl="/glassmorphic-flashcard/casa.wav"
        lampColorForNamerFlashcard="#4776cb"
      />
      <GlassmorphicFlashcard
        imageUrl="/glassmorphic-flashcard/chiesa.webp"
        :aspectRatioForNamerFlashcard="51 / 60"
        frontTagText="Italian"
        word="Chiesa"
        definition="Un edificio dedicato al culto cristiano."
        audioUrl="/glassmorphic-flashcard/chiesa.wav"
        lampColorForNamerFlashcard="#a19fe5"
      />
      <GlassmorphicFlashcard
        imageUrl="/glassmorphic-flashcard/conigli.webp"
        :aspectRatioForNamerFlashcard="1 / 1"
        frontTagText="Animals"
        word="Conigli"
        definition="Piccoli mammiferi erbivori con orecchie lunghe e coda corta."
        audioUrl="/glassmorphic-flashcard/conigli.wav"
        lampColorForNamerFlashcard="#6cc606"
      />
    </div>
  </div>
</template>

<script setup>
import GlassmorphicFlashcard from './GlassmorphicFlashcard.vue'
</script>

<style scoped>
.flashcard-demo {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 50px;
  padding-bottom: 50px;
  border-radius: 8px;
  box-sizing: border-box;
}

.demo-bg {
  position: absolute;
  inset: 0;
  background-image: url('/glassmorphic-flashcard/background.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

.cards-stack {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 48px;
  align-items: center;
}
</style>