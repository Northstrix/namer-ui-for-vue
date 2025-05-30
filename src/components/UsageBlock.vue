<template>
  <div class="usageblock-root">
    <div class="usageblock-wrapper">
      <pre class="usageblock-pre">
        <code v-html="plainCode"></code>
      </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
  code: string
}>()

const codeLines = computed(() => {
  const lines = props.code.split('\n')
  if (lines.length > 1 && lines[lines.length - 1].trim() === '') {
    lines.pop()
  }
  return lines
})

// Escape HTML special characters to prevent code from being interpreted as HTML
function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const plainCode = computed(() => {
  return codeLines.value
    .map(line => escapeHtml(line) || '&nbsp;')
    .join('\n')
})
</script>

<style scoped>
.usageblock-root {
  background: #17161c;
  border-radius: 8px;
  border: 1.5px solid #312f3b;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;
}
.usageblock-wrapper {
  display: flex;
  position: relative;
}
.usageblock-pre {
  background: #17161c !important;
  margin: 0;
  padding: 0 18px 0 18px;
  border-radius: 0 0 10px 10px;
  font-size: 1.07rem;
  overflow-x: auto;
  overflow-y: hidden;
  line-height: 1.2;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  color: #d4d4d4;
  transform: translateY(10px);
}
.usageblock-pre code {
  display: block;
  white-space: pre;
  position: relative;
}
</style>
