<template>
  <div class="radio-switcher-row">
    <button
      v-for="option in options"
      :key="option.value"
      class="radio-btn"
      :class="{ active: modelValue === option.value }"
      type="button"
      :aria-label="option.label"
      @click="setActive(option.value)"
      @mouseenter="hovered = option.value"
      @mouseleave="hovered = null"
      :style="buttonStyle(option.value)"
    >
      <span class="radio-icon">
        <component
          :is="option.icon"
          :color="textColor(option.value)"
          :size="20"
          :stroke-width="2"
        />
      </span>
      <span class="radio-label">{{ option.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: string
  options: Array<{ value: string; label: string; icon: any }>
  activeBg?: string
  activeFg?: string
  inactiveBg?: string
  inactiveFg?: string
  hoverBg?: string
}>()
const emit = defineEmits(['update:modelValue'])

const hovered = ref<string | null>(null)

function setActive(value: string) {
  if (props.modelValue !== value) {
    emit('update:modelValue', value)
  }
}

function buttonStyle(value: string) {
  const isActive = props.modelValue === value
  const isHovered = hovered.value === value
  let bg
  if (isActive) {
    bg = props.activeBg ?? '#393643'
  } else if (isHovered) {
    bg = props.hoverBg ?? '#23222a'
  } else {
    bg = props.inactiveBg ?? 'none'
  }
  return {
    background: bg,
    color: textColor(value),
  }
}

function textColor(value: string) {
  return props.modelValue === value
    ? props.activeFg ?? '#fff'
    : props.inactiveFg ?? '#aaa'
}
</script>

<style scoped>
.radio-switcher-row {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0;
  margin-top: 18px;
  gap: 14px;
}
.radio-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
  height: 40px;
  border: none;
  border-radius: 8px;
  font-size: 1.09rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  outline: none;
  user-select: none;
  margin: 0;
  background: none;
}
.radio-icon svg {
  display: block;
  width: 20px;
  height: 20px;
}
.radio-label {
  display: inline-block;
  vertical-align: middle;
}
</style>
