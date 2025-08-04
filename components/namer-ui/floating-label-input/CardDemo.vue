<!-- Demo.vue -->
<template>
  <div class="demo-container">
    <div class="input-wrapper">
      <ShowcaseFloatingLabelInput
        v-model="username"
        label="Username"
        parentBackground="#fff"
        inputOutlineColor="#919191"
        inputFocusOutlineColor="#2e2b36"
        outlineWidth="3px"
        foregroundColor="#333"
        mutedForegroundColor="#888"
        rounding="8px"
        inputPadding="14px 16px"
        inputFontSize="1.125rem"
        labelFontSize="1rem"
        labelActiveFontSize="15px"
        labelPadding="0 8px"
        labelActivePadding="0 7px"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ShowcaseFloatingLabelInput from './ShowcaseFloatingLabelInput.vue';

export default defineComponent({
  name: 'Demo',
  components: { ShowcaseFloatingLabelInput },
  setup() {
    const username = ref('');
    return { username };
  },
});
</script>

<style scoped>
.demo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff; /* dark background */
  padding: 24px;
  box-sizing: border-box;
  min-height: 100vh;
}

.input-wrapper {
  width: 260px;
  max-width: 100%;
}
</style>
