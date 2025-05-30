<template>
  <div
    class="codeblock-root"
    :style="{
      background: backgroundColor,
      borderColor: borderColor,
      borderRadius: borderRadius,
    }"
  >
    <div
      class="codeblock-header"
      v-if="filename"
      :style="{ color: filenameColor, zIndex: 3 }"
    >
      <span class="codeblock-filename" :style="{ color: filenameColor }">
        {{ filename }}
      </span>
    </div>
    <div class="codeblock-wrapper">
      <div
        class="codeblock-linenumbers-bg"
        :style="{
          width: `calc(${lineNumberXShift} + 36px)`,
          background: backgroundColor,
        }"
      ></div>
      <div
        class="codeblock-linenumbers"
        aria-hidden="true"
        :style="{
          color: lineNumberColor,
          transform: `translateX(${lineNumberXShift})`,
          background: backgroundColor,
          zIndex: 2,
        }"
      >
        <span v-for="n in lineCount" :key="n">{{ n }}</span>
      </div>
      <div class="codeblock-scrollarea">
        <pre
          class="codeblock-pre"
          :style="{
            background: backgroundColor,
            color: codeTextColor,
            padding: codePadding,
            marginRight: '16px',
          }"
        >
          <code v-html="plainCode"></code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
  code: string
  filename: string
  codePadding?: string // e.g. "18px 18px 0 62px"
  lineNumberXShift?: string // e.g. "4px"
  filenameColor?: string // e.g. "#fff"
  backgroundColor?: string // e.g. "#17161c"
  borderColor?: string // e.g. "#312f3b"
  borderRadius?: string // e.g. "8px"
  lineNumberColor?: string // e.g. "#999"
  codeTextColor?: string // e.g. "#d4d4d4"
}>()

const codePadding = computed(() => props.codePadding || '18px 18px 0 62px')
const lineNumberXShift = computed(() => props.lineNumberXShift || '4px')
const filenameColor = computed(() => props.filenameColor || '#fff')
const backgroundColor = computed(() => props.backgroundColor || '#17161c')
const borderColor = computed(() => props.borderColor || '#312f3b')
const borderRadius = computed(() => props.borderRadius || '8px')
const lineNumberColor = computed(() => props.lineNumberColor || '#999')
const codeTextColor = computed(() => props.codeTextColor || '#d4d4d4')

const codeLines = computed(() => {
  const lines = props.code.split('\n')
  if (lines.length > 1 && lines[lines.length - 1].trim() === '') {
    lines.pop()
  }
  return lines
})
const lineCount = computed(() => codeLines.value.length)

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
.codeblock-root {
  border-radius: 8px;
  border: 1.5px solid;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;
  position: relative;
}
.codeblock-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 4px 22px 0 22px;
  font-size: 0.98rem;
  transform: translateY(20px);
  position: relative;
  /* z-index set inline for flexibility */
}
.codeblock-filename {
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.02em;
}
.codeblock-wrapper {
  display: flex;
  position: relative;
  width: 100%;
  min-height: 100%;
}
.codeblock-linenumbers-bg {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
  user-select: none;
}
.codeblock-linenumbers {
  user-select: none;
  pointer-events: none;
  text-align: right;
  padding-top: 67px;
  padding-bottom: 8px;
  padding-right: 12px;
  font-size: 1.07rem;
  line-height: 1.7;
  min-width: 36px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  /* z-index set inline for flexibility */
}
.codeblock-linenumbers span {
  display: block;
  height: 1.7em;
  line-height: 1.7;
}
.codeblock-scrollarea {
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
}
.codeblock-pre {
  margin: 0;
  border-radius: 0 0 10px 10px;
  font-size: 1.07rem;
  overflow-x: auto;
  overflow-y: hidden;
  line-height: 1.7;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  transform: translateY(20px);
}
.codeblock-pre code {
  display: block;
  white-space: pre;
  position: relative;
}
</style>