<template>
  <div class="components-layout">
    <ComponentList
      v-if="!isMobile"
      :items="componentMeta"
      :active-route="typeof route.params.name === 'string' ? route.params.name : Array.isArray(route.params.name) ? route.params.name[0] : undefined"
      class="sidebar"
    />
    <div
      class="components-main"
      :class="{ 'no-margin': isMobile }"
      :style="!isMobile ? { marginLeft: '24px' } : {}"
    >
      <div v-if="meta">
        <h2 class="component-title">{{ meta.name }}</h2>
        <p class="component-desc">{{ meta.description }}</p>
        <!-- TAB SWITCHER BUTTONS -->
        <RadioButton
          v-model="activeTab"
          :options="tabOptions"
          :active-bg="'#393643'"
          :active-fg="'#fff'"
          :inactive-bg="'none'"
          :inactive-fg="'#aaa'"
          :hover-bg="'#23222a'"
        />
        <!-- Preview Area -->
        <div v-show="activeTab === 'preview'" class="demo-preview-container">
          <template v-if="demoExists">
            <component :is="demoComponent(meta.route)" />
          </template>
          <template v-else>
            <div class="preview-placeholder">No preview available.</div>
          </template>
        </div>
        <!-- Code Area -->
        <div v-show="activeTab === 'code'" class="code-container">
          <template v-if="meta.code">
            <Codeblock
              v-for="file in meta.code"
              :key="file.filename"
              :code="file.content"
              :filename="file.filename"
              class="codeblock"
            />
          </template>
          <template v-else>
            <p>No code available.</p>
          </template>
        </div>
        <!-- Usage Section -->
        <div v-if="meta.usage" class="section-label">Usage:</div>
        <UsageBlock
          v-if="meta.usage"
          :code="meta.usage"
          class="usage-codeblock"
        />
        <!-- Dependencies Section -->
        <div v-if="meta.dependencies" class="section-label">Dependencies:</div>
        <div
          v-if="meta.dependencies"
          class="meta-info meta-block"
          v-html="depsHtml"
        ></div>
        <!-- Credit Section -->
        <div v-if="meta.credit" class="section-label">Credit:</div>
        <div
          v-if="meta.credit"
          class="meta-info meta-block"
          v-html="creditHtml"
        ></div>
      </div>
      <div v-else>
        <p>Component not found.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent, shallowRef, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { componentMeta } from '../data/componentMeta'
import ComponentList from '../components/ComponentList.vue'
import Codeblock from '../components/namer-ui/code-block/CodeBlock.vue'
import UsageBlock from '../components/UsageBlock.vue'
import { Clapperboard, FolderCode } from 'lucide-vue-next'
import RadioButton from '../components/namer-ui/radio-button/RadioButton.vue'
// Markdown and sanitization
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { useIsMobile } from '../composables/useIsMobile'

const { isMobile } = useIsMobile()
const route = useRoute()
const meta = computed(() =>
  typeof route.params.name === 'string'
    ? componentMeta.find((c) => c.route === route.params.name)
    : Array.isArray(route.params.name)
    ? componentMeta.find((c) => c.route === route.params.name[0])
    : null
)
const activeTab = ref<'preview' | 'code'>('preview')
const tabOptions = [
  { value: 'preview', label: 'Preview', icon: Clapperboard },
  { value: 'code', label: 'Code', icon: FolderCode },
]
// Dynamic demo loader
const demoCache = shallowRef<Record<string, any>>({})
function demoComponent(routeName: string) {
  if (!demoCache.value[routeName]) {
    demoCache.value[routeName] = defineAsyncComponent(() =>
      import(`../components/namer-ui/${routeName}/Demo.vue`).catch(() => null)
    )
  }
  return demoCache.value[routeName]
}
const demoExists = computed(() => !!(meta.value && meta.value.route))
// Markdown/HTML rendering helpers
function renderMarkdown(text: string | undefined): string {
  if (!text) return ''
  let html = marked.parse(text, { breaks: true })
  // Add target/rel to all links
  html = html.replace(/<a /g, '<a target="_blank" rel="noopener" draggable="true"')
  return DOMPurify.sanitize(html)
}
const depsHtml = computed(() => renderMarkdown(meta.value?.dependencies))
const creditHtml = computed(() => renderMarkdown(meta.value?.credit))
// --- ENFORCE ALL LINKS OPEN IN NEW TAB ---
watch(
  [meta, activeTab],
  () => {
    nextTick(() => {
      // Select all links in the main area (covers deps, credit, usage, etc.)
      document.querySelectorAll('.components-main a').forEach((a) => {
        a.setAttribute('target', '_blank')
        a.setAttribute('rel', 'noopener')
      })
    })
  },
  { immediate: true }
)
</script>

<style scoped>
.components-layout {
  display: flex;
  min-height: 100vh;
}
.components-main {
  flex: 1;
  padding: 11px 0;
  overflow-x: hidden;
  margin-left: 24px;
  background: none;
  transition: margin-left 0.2s;
}
.components-main.no-margin {
  margin-left: 0 !important;
}
.component-title {
  color: #fff;
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 8px;
  line-height: 1.2;
}
.component-desc {
  color: #aaa;
  font-size: 1.09rem;
  margin-bottom: 18px;
  line-height: 1.5;
}
.section-label {
  color: #fff;
  font-weight: 600;
  margin-top: 28px;
  margin-bottom: 2px;
}
.usage-codeblock {
  margin-top: 14px;
  margin-bottom: 18px;
}
.demo-preview-container {
  padding: 24px;
  min-height: 300px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 0 24px 0;
  background: #060507;
  border: 1px solid #312f3b;
  border-radius: 8px;
  transition: border-color 0.2s;
}
.preview-placeholder {
  color: #888;
  font-size: 1.1rem;
  text-align: center;
  width: 100%;
}
.code-container {
  width: 100%;
  margin: 32px 0 24px 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  overflow: auto;
}
.code-container > *:not(:last-child) {
  margin-bottom: 24px;
}
.meta-info.meta-block {
  margin-top: 8px;
  margin-bottom: 18px;
  color: #fff;
  font-size: 1.04rem;
  line-height: 1.6;
  word-break: break-word;
  background: none;
  padding: 0;
  user-select: text;
}
/* STRONGEST SELECTORS TO FORCE WHITE LINKS EVERYWHERE */
:deep(.codeblock-root a),
:deep(.usage-codeblock a),
:deep(.meta-info.meta-block a),
:deep(.meta-info a),
:deep(a) {
  color: #fff !important;
  text-decoration: underline;
  word-break: break-all;
  display: inline-block;
  cursor: pointer;
}
</style>
<!-- Extra global style to guarantee white links (optional, for full override) -->
<style>
/* This will override any link color inside your component globally */
.components-layout a,
.components-main a,
.codeblock-root a,
.usage-codeblock a,
.meta-info.meta-block a {
  color: #fff !important;
}
</style>
