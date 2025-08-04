<template>
  <div class="demo-container">
    <div class="inputs-row">
      <div class="input-wrapper">
        <FloatingLabelInput v-model="username" label="Username" />
      </div>
      <div class="input-wrapper">
        <FloatingLabelInput
          v-model="email"
          label="אימייל"
          :isRTL="true"
          type="email"
          rounding="0px"
          inputHeight="72px"
          inputFontSize="1.5rem"
          labelFontSize="1.125rem"
          labelActiveFontSize="14px"
          foregroundColor="#fff"
          mutedForegroundColor="#aaa"
          accentColor="#a259ff"
        />
      </div>
      <div class="input-wrapper">
        <FloatingLabelInput v-model="password" label="Password" type="password" />
      </div>
      <div class="input-wrapper">
        <FloatingLabelInput
          v-model="info"
          label="Additional Info"
          inputOutlineColor="#707070"
          inputFocusOutlineColor="#00a0d8"
          outlineWidth="3px"
          rounding="10px"
          accentColor="#fff"
          foregroundColor="#00a0d8"
          mutedForegroundColor="#909090"
          labelActiveFontSize="15px"
          :textarea="true"
        />
      </div>
    </div>

    <div class="labels-column">
        <div>
            <strong>Username:</strong><span v-if="username">{{ ' ' + username }}</span><span v-else class="placeholder">—</span>
        </div>
        <div>
            <strong>Email:</strong><span v-if="email">{{ ' ' + email }}</span><span v-else class="placeholder">—</span>
        </div>
        <div>
            <strong>Password:</strong><span v-if="password">{{ ' ' + password }}</span><span v-else class="placeholder">—</span>
        </div>
        <div>
            <strong>Additional Info:</strong><span v-if="info">{{ ' ' + info }}</span><span v-else class="placeholder">—</span>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import FloatingLabelInput from './FloatingLabelInput.vue';

export default defineComponent({
  name: 'Demo',
  components: {
    FloatingLabelInput,
  },
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const info = ref('');
    return { username, email, password, info };
  },
});
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.inputs-row {
  display: flex;
  flex-direction: row;
  gap: 32px;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 1440px;
}

.input-wrapper {
  max-width: 260px;
  min-width: 180px;
  flex: 1 1 180px;
  display: flex;
  align-items: center;
}

.labels-column {
  margin-top: 32px;
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.96rem;
  align-items: stretch;
  color: #fafafa;
}

.placeholder {
  opacity: 0.5;
}
</style>
