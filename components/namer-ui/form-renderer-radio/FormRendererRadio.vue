<template>
  <button
    type="button"
    role="radio"
    :aria-checked="checked.toString()"
    :tabindex="0"
    :id="id"
    class="custom-radio"
    :style="btnStyle"
    @click="handleClick"
  >
    <transition name="radio-dot">
      <div
        v-if="checked"
        class="radio-dot"
        :style="{ background: highlightForeground }"
      ></div>
    </transition>
    <span
      aria-hidden="true"
      class="radio-overlay"
      :style="{ cursor: 'pointer' }"
    />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  checked: boolean;
  allowUnselect?: boolean;
  accentColor?: string;
  highlightForeground?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  id?: string;
}>();

const emit = defineEmits<{
  (event: "update:checked", checked: boolean): void;
}>();

const btnStyle = computed(() => ({
  width: '24px',
  height: '24px',
  background: props.checked
    ? props.accentColor ?? '#00a0d8'
    : props.backgroundColor ?? '#2e2e2e',
  border: `1.5px solid ${props.borderColor ?? '#363636'}`,
  transition: 'background 0.2s, border 0.2s',
  cursor: 'pointer',
  position: 'relative',
  borderRadius: props.borderRadius ?? '50%',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  outline: 'none',
}));

const highlightForeground = computed(() => props.highlightForeground ?? '#fff');

function handleClick(e: Event) {
  e.preventDefault();
  if (props.allowUnselect) {
    emit('update:checked', !props.checked);
  } else {
    if (!props.checked) emit('update:checked', true);
    // if already checked and allowUnselect is false, do nothing
  }
}
</script>

<style scoped>
.custom-radio {
  outline: none;
  user-select: none;
  position: relative;
  box-sizing: border-box;
}
.radio-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: auto;
  transition: background 0.18s, transform 0.17s;
  box-shadow: 0 0 2px rgba(0,0,0,0.03);
}
.radio-dot-enter-active,
.radio-dot-leave-active {
  transition: opacity 0.21s, transform 0.2s;
}
.radio-dot-enter-from,
.radio-dot-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.radio-dot-enter-to,
.radio-dot-leave-from {
  opacity: 1;
  transform: scale(1);
}
.radio-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 50%;
  z-index: 1;
  pointer-events: none;
}
</style>
