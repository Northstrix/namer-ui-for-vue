<template>
  <button
    type="button"
    role="checkbox"
    :aria-checked="checked.toString()"
    :aria-disabled="disabled.toString()"
    :tabindex="0"
    :id="id"
    :disabled="disabled"
    @click="handleClick"
    class="custom-checkbox"
    :style="btnStyle"
  >
    <svg
      v-if="checked"
      key="checkmark"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      :stroke="highlightForeground"
      stroke-width="3"
      fill="none"
      class="checkmark"
      ref="checkmarkRef"
      aria-hidden="true"
      style="display: block; pointer-events: none;"
    >
      <path
        ref="pathRef"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M5 13l4 4L19 7"
        class="checkmark-path"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue';

const props = defineProps<{
  checked: boolean;
  accentColor?: string;
  highlightForeground?: string;
  backgroundColor?: string;
  disabledBackgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  id?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (event: 'update:checked', checked: boolean): void;
}>();

const btnStyle = computed(() => ({
  width: '24px',
  height: '24px',
  background: props.disabled
    ? props.disabledBackgroundColor ?? '#161616' // default card background color
    : props.checked
    ? props.accentColor ?? '#00a0d8' // default theme-color
    : props.backgroundColor ?? '#2e2e2e', // default background-adjacent-color
  border: `1.5px solid ${props.borderColor ?? '#363636'}`, // default lightened-background-adjacent-color
  transition: 'background 0.2s, border 0.2s',
  cursor: props.disabled ? 'not-allowed' : 'pointer',
  position: 'relative',
  borderRadius: props.borderRadius ?? '6px',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const highlightForeground = computed(() => props.highlightForeground ?? '#fff');

const pathRef = ref<SVGPathElement | null>(null);
const checkmarkRef = ref<SVGSVGElement | null>(null);

function handleClick(e: Event) {
  e.preventDefault();
  if (props.disabled) return;
  emit('update:checked', !props.checked);
}

watch(
  () => props.checked,
  async (newChecked) => {
    if (newChecked) {
      await nextTick();

      if (!pathRef.value) return;
      const length = pathRef.value.getTotalLength();

      // Initialize stroke for draw animation
      pathRef.value.style.transition = 'none';
      pathRef.value.style.strokeDasharray = `${length}`;
      pathRef.value.style.strokeDashoffset = `${length}`;
      pathRef.value.style.opacity = '1';

      // Force layout reset
      void pathRef.value.getBoundingClientRect();

      // Animate stroke dashoffset to draw
      pathRef.value.style.transition =
        'stroke-dashoffset 0.32s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.32s';
      pathRef.value.style.strokeDashoffset = '0';
    } else if (pathRef.value) {
      // Reset path if unchecked
      pathRef.value.style.strokeDashoffset = '0';
      pathRef.value.style.opacity = '0';
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.custom-checkbox {
  outline: none;
  user-select: none;
}

/* Checkmark path initial state */
.checkmark-path {
  stroke-dasharray: 0;
  stroke-dashoffset: 0;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}
</style>
