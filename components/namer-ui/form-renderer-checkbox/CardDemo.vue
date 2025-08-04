<template>
  <div
    style="width: 100%; height: 100%; background: #fff; display: flex; justify-content: center; align-items: center; overflow: hidden; padding: 2rem; box-sizing: border-box;"
  >
    <div class="demo-root">
      <div class="checkbox-row">
        <label dir="rtl" class="checkbox-label rtl-label">
          <FormRendererCheckbox
            v-model:checked="checkedRTL"
            accentColor="#4776cb"
            highlightForeground="#fff"
            backgroundColor="#eee"
            disabledBackgroundColor="#ddd"
            borderColor="#aac4f7"
            borderRadius="6px"
          />
          נמר UI
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormRendererCheckbox from './FormRendererCheckbox.vue'

const checkedRTL = ref(false)
</script>

<style scoped>
.demo-root {
  font-family: Arial, sans-serif;
  color: #333;
  width: max-content;
  max-width: 100%;
  transform: scale(1.5);
}

.checkbox-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
}

.checkbox-label {
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