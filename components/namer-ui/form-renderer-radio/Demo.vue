<template>
  <div class="demo-root">
    <div class="radio-col">
      <div class="group-section">
        <label class="radio-label">
          <FormRendererRadio
            :checked="groupValue === 1"
            @update:checked="v => { if (v) groupValue = 1 }"
          />
          Group Radio 1
        </label>
        <label class="radio-label">
          <FormRendererRadio
            :checked="groupValue === 2"
            @update:checked="v => { if (v) groupValue = 2 }"
          />
          Group Radio 2
        </label>
        <label class="radio-label">
          <FormRendererRadio
            :checked="groupValue === 3"
            @update:checked="v => { if (v) groupValue = 3 }"
          />
          Group Radio 3
        </label>
      </div>

      <span class="unselectable-label">Unselectable:</span>

      <div class="unselect-section">
        <label class="radio-label">
          <FormRendererRadio
            v-model:checked="valCustom"
            :accentColor="'#fff'"
            :highlightForeground="'#0a0a0a'"
            :backgroundColor="'#444'"
            :borderColor="'#4776cb'"
            :borderRadius="'0px'"
            :allowUnselect="true"
          />
          Custom Styled Radio
        </label>
        <label dir="rtl" class="radio-label rtl-label">
          <FormRendererRadio
            v-model:checked="valHebrew"
            :allowUnselect="true"
          />
          נמר UI
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormRendererRadio from './FormRendererRadio.vue';

const groupValue = ref(1);
const valCustom = ref(false);
const valHebrew = ref(false);
</script>

<style scoped>
.demo-root {
  padding: 2rem;
  font-family: Arial, sans-serif;
  color: white;
}
.radio-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: max-content;
}
.group-section,
.unselect-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.unselectable-label {
  margin-top: 2.25rem;
  margin-bottom: 1rem;
  color: #bbb;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.01em;
}
.radio-label {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  font-size: 0.97rem;
  user-select: text;
}
.rtl-label {
  direction: rtl;
  font-family: Arial, sans-serif;
}
</style>
