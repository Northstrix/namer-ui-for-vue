<template>
  <div 
    style="width: 100%; height: 100%; background: #27252e; display: flex; justify-content: center; align-items: center;"
  >
    <div :style="{ fontSize, color: '#fff', textAlign: 'center' }">
      The best way to
       <br/>
      <MagicText>predict the future</MagicText>
      <br/>
      is to create it.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import MagicText from './MagicText.vue'

const fontSize = ref('2em')

function updateFontSize() {
  fontSize.value = window.innerWidth < 500 ? '1.25em' : '2em'
}

onMounted(() => {
  updateFontSize()
  window.addEventListener('resize', updateFontSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateFontSize)
})
</script>
