<template>
  <div
    style="width: 100%; height: 100%; background: #fff; display: flex; justify-content: center; align-items: center; overflow: hidden; padding: 2rem; box-sizing: border-box;"
  >
    <div class="demo-root">
      <label dir="rtl" class="radio-label rtl-label">
        <FormRendererRadio
          v-model:checked="checkedHebrew"
          accentColor="#4776cb"
          highlightForeground="#fff"
          backgroundColor="#eee"
          borderColor="#aac4f7"
          borderRadius="50%"
        />
        נמר UI
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormRendererRadio from './FormRendererRadio.vue'

const checkedHebrew = ref(false)
</script>

<style scoped>
.demo-root {
  font-family: Arial, sans-serif;
  color: #333;
  width: max-content;
  max-width: 100%;
  transform: scale(1.5);
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  user-select: text;
  color: #333;
}

.rtl-label {
  direction: rtl;
  font-family: Arial, sans-serif;
}
</style>
