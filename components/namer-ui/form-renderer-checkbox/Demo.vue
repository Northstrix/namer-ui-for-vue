<template>
  <div class="demo-root">
    <div class="checkbox-row">
      <!-- Default checkbox -->
      <label class="checkbox-label">
        <FormRendererCheckbox v-model:checked="checkedDefault" />
        Default Checkbox
      </label>

      <!-- Custom styled checkbox -->
      <label class="checkbox-label custom-checkbox-label">
        <FormRendererCheckbox
          v-model:checked="checkedCustom"
          :accentColor="'#fff'"
          :highlightForeground="'#0a0a0a'"
          :backgroundColor="'#444'"
          :disabledBackgroundColor="'#161616'"
          :borderColor="'#4776cb'"
          :borderRadius="'0px'"
        />
        Custom Styled Checkbox
      </label>

      <!-- Disabled checkbox -->
      <label class="checkbox-label disabled-label">
        <FormRendererCheckbox v-model:checked="checkedDisabled" disabled />
        Disabled Checkbox
      </label>

      <!-- RTL Hebrew checkbox -->
      <label dir="rtl" class="checkbox-label rtl-label">
        <FormRendererCheckbox v-model:checked="checkedRTL" />
        נמר UI
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormRendererCheckbox from './FormRendererCheckbox.vue';

const checkedDefault = ref(false);
const checkedCustom = ref(false);
const checkedDisabled = ref(false);
const checkedRTL = ref(false);
</script>

<style scoped>
.demo-root {
  padding: 2rem;
  font-family: Arial, sans-serif;
  color: white;
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
  font-size: 0.9rem; /* Slightly reduced font size */
  user-select: text;
}

/* Disabled label text style */
.disabled-label {
  color: #777;
  cursor: not-allowed;
  user-select: none;
}

/* RTL */
.rtl-label {
  direction: rtl;
  font-family: Arial, sans-serif;
}
</style>
