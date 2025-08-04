<template>
  <div
    :class="[
      'mobile-form-group',
      rtlInput ? 'rtl' : '',
      focused ? 'active' : '',
      hasValue ? 'has-value' : '',
      textarea ? 'textarea' : '',
    ]"
    :style="styleVars"
  >
    <textarea
      v-if="textarea"
      class="mobile-form-input"
      :required="required"
      v-model="localValue"
      @focus="handleFocus"
      @blur="handleBlur"
      :autocomplete="autoComplete"
      :disabled="disabled"
      :dir="rtlInput ? 'rtl' : 'ltr'"
      spellcheck="false"
      :style="{ height: textareaHeight }"
    />
    <input
      v-else
      class="mobile-form-input"
      :type="type"
      :required="required"
      v-model="localValue"
      @focus="handleFocus"
      @blur="handleBlur"
      :autocomplete="autoComplete"
      :disabled="disabled"
      :dir="rtlInput ? 'rtl' : 'ltr'"
      spellcheck="false"
    />
    <label
      :class="['mobile-form-label', textarea ? 'label-textarea' : '']"
      :dir="labelDir"
    >
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';

// Detect RTL helper functions
function detectRTL(text: string): boolean {
  return /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(text);
}

function detectLabelDir(text: string): 'rtl' | 'ltr' {
  return detectRTL(text) ? 'rtl' : 'ltr';
}

export default defineComponent({
  name: 'FloatingLabelInput',
  props: {
    label: { type: String, required: true },
    modelValue: { type: String, required: true },
    type: { type: String, default: 'text' },
    autoComplete: { type: String, default: 'off' },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    textarea: { type: Boolean, default: false },
    isRTL: { type: Boolean, default: undefined },
    accentColor: { type: String, default: '#00a0d8' },
    textareaHeight: { type: String, default: '152px' },
    parentBackground: { type: String, default: '#060507' },
    inputOutlineColor: { type: String, default: '#909090' },
    inputFocusOutlineColor: { type: String, default: '#fff' },
    outlineWidth: { type: String, default: '1.5px' },
    foregroundColor: { type: String, default: '#fff' },
    mutedForegroundColor: { type: String, default: '#aaa' },
    rounding: { type: String, default: '8px' },
    inputPadding: { type: String, default: '17px' },
    inputFontSize: { type: String, default: '1.025rem' },
    labelFontSize: { type: String, default: '1.025rem' },
    labelActiveFontSize: { type: String, default: '12px' },
    labelPadding: { type: String, default: '0 7px' },
    labelActivePadding: { type: String, default: '0 6px' },
    inputHeight: { type: String, default: '49px' },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const focused = ref(false);
    const rtlInput = ref(props.isRTL ?? false);
    const localValue = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (newVal) => {
        localValue.value = newVal;
        if (!newVal) {
          rtlInput.value = props.isRTL ?? false;
        } else {
          rtlInput.value = detectRTL(newVal);
        }
      }
    );

    watch(
      () => props.isRTL,
      (newVal) => {
        if (!localValue.value) {
          rtlInput.value = newVal ?? false;
        }
      }
    );

    watch(localValue, (newVal) => emit('update:modelValue', newVal));

    const hasValue = computed(() => localValue.value.length > 0);
    const labelDir = computed(() => detectLabelDir(props.label));

    function handleFocus() {
      focused.value = true;
    }
    function handleBlur() {
      focused.value = false;
    }

    const styleVars = computed(() => ({
      '--accent-color': props.accentColor,
      '--mobile-form-input-bg': props.parentBackground,
      '--input-outline': props.inputOutlineColor,
      '--input-outline-focus': props.inputFocusOutlineColor,
      '--input-outline-width': props.outlineWidth,
      '--foreground': props.foregroundColor,
      '--muted-foreground': props.mutedForegroundColor,
      '--parent-background': props.parentBackground,
      '--general-rounding': props.rounding,
      '--floating-input-layout-text-area-height': props.textareaHeight,
      '--input-padding': props.inputPadding,
      '--input-font-size': props.inputFontSize,
      '--label-font-size': props.labelFontSize,
      '--label-active-font-size': props.labelActiveFontSize,
      '--label-padding': props.labelPadding,
      '--label-active-padding': props.labelActivePadding,
      '--input-height': props.inputHeight,
    }));

    return {
      localValue,
      focused,
      rtlInput,
      hasValue,
      labelDir,
      handleFocus,
      handleBlur,
      styleVars,
    };
  },
});
</script>

<style scoped>
.mobile-form-group {
  position: relative;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 22px;
}
.mobile-form-group:last-child {
  margin-bottom: 0;
}

.mobile-form-input {
  width: 100%;
  height: var(--input-height);
  padding: var(--input-padding);
  font-size: var(--input-font-size);
  font-weight: 400;
  color: var(--foreground);
  background: var(--mobile-form-input-bg);
  border: var(--input-outline-width) solid var(--input-outline);
  border-radius: var(--general-rounding);
  outline: none;
  box-sizing: border-box;
  text-align: left;
  transition: border-color 0.3s, color 0.3s, background 0.3s;
  resize: none;
  line-height: 1.4;
}
.mobile-form-input:focus {
  border-color: var(--input-outline-focus);
}
.mobile-form-input:disabled {
  opacity: 0.5;
  pointer-events: none;
}
.mobile-form-group.rtl .mobile-form-input {
  direction: rtl;
  text-align: right;
}
.mobile-form-group.textarea .mobile-form-input {
  height: var(--floating-input-layout-text-area-height);
  overflow-y: auto;
}
.mobile-form-label {
  position: absolute;
  left: 11px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted-foreground);
  font-size: var(--label-font-size);
  font-weight: 400;
  pointer-events: none;
  background: var(--parent-background);
  padding: var(--label-padding);
  transition: color 0.3s, background 0.3s, font-size 0.3s, top 0.3s,
    left 0.3s, right 0.3s, transform 0.3s;
  z-index: 2;
  max-width: calc(100% - 26px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mobile-form-group.rtl .mobile-form-label {
  right: 12px;
  left: auto;
  text-align: right;
}
/* Default (not active, not has-value) */
.mobile-form-group:not(.active):not(.has-value) .mobile-form-label {
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--label-font-size);
  color: var(--muted-foreground);
  background: var(--parent-background);
  padding: var(--label-padding);
}
/* Active (input focused) */
.mobile-form-group.active .mobile-form-label,
.mobile-form-group .mobile-form-input:focus + .mobile-form-label {
  top: 0;
  left: 12px;
  right: auto;
  font-size: var(--label-active-font-size);
  color: var(--accent-color);
  background: var(--parent-background);
  padding: var(--label-active-padding);
  z-index: 2;
}
.mobile-form-group.rtl.active .mobile-form-label,
.mobile-form-group.rtl .mobile-form-input:focus + .mobile-form-label {
  right: 12px;
  left: auto;
}
/* Has value but not active */
.mobile-form-group.has-value:not(.active) .mobile-form-label {
  top: 0;
  left: 12px;
  right: auto;
  font-size: var(--label-active-font-size);
  color: var(--muted-foreground);
  background: var(--parent-background);
  padding: var(--label-active-padding);
  z-index: 2;
}
.mobile-form-group.rtl.has-value:not(.active) .mobile-form-label {
  right: 12px;
  left: auto;
}
/* Textarea label placement */
.mobile-form-group.textarea .mobile-form-label {
  left: 12px;
  right: auto;
  padding: var(--label-padding);
}
.mobile-form-group.textarea.rtl .mobile-form-label {
  right: 12px;
  left: auto;
}
.mobile-form-group.textarea:not(.active):not(.has-value) .mobile-form-label {
  top: 12px;
  left: 12px;
  right: auto;
  transform: none;
  font-size: var(--label-font-size);
  color: var(--muted-foreground);
  background: var(--parent-background);
  padding: var(--label-padding);
  text-align: left;
}
.mobile-form-group.textarea:not(.active):not(.has-value).rtl .mobile-form-label {
  right: 12px;
  left: auto;
  text-align: right;
}
</style>
