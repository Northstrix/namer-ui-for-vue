<script setup lang="ts">
import { ref, computed, defineAsyncComponent, shallowRef, watch, nextTick, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { componentMeta } from '~/src/data/componentMeta'
import ComponentList from '~/components/ComponentList.vue'
import Codeblock from '~/components/namer-ui/code-block/CodeBlock.vue'
import UsageBlock from '~/components/UsageBlock.vue'
import { Clapperboard, FolderCode } from 'lucide-vue-next'
import RadioButton from '~/components/namer-ui/radio-button/RadioButton.vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { useIsMobile } from '~/composables/useIsMobile'

// Detect mobile to conditionally show sidebar
const { isMobile } = useIsMobile()
const route = useRoute()

// Compute meta info for current route param `name`
const meta = computed(() => {
  if (typeof route.params.name === 'string') {
    return componentMeta.find((c) => c.route === route.params.name) || null
  } else if (Array.isArray(route.params.name)) {
    return componentMeta.find((c) => c.route === route.params.name[0]) || null
  }
  return null
})

// Extract 'activeRoute' for sidebar component to highlight which is active
const activeRoute = computed(() => {
  if (typeof route.params.name === 'string') return route.params.name
  if (Array.isArray(route.params.name)) return route.params.name[0]
  return undefined
})

// Tab state for code/preview switcher
const activeTab = ref<'preview' | 'code'>('preview')

// Tab button options
const tabOptions = [
  { value: 'preview', label: 'Preview', icon: Clapperboard },
  { value: 'code', label: 'Code', icon: FolderCode },
]

// Cache for async loaded demo components to avoid repeated imports
const demoCache = shallowRef<Record<string, any>>({})
function demoComponent(routeName: string) {
  if (!demoCache.value[routeName]) {
    demoCache.value[routeName] = defineAsyncComponent(() =>
      import(`~/components/namer-ui/${routeName}/Demo.vue`).catch(() => null)
    )
  }
  return demoCache.value[routeName]
}

const demoExists = computed(() => !!(meta.value && meta.value.route))

// Render given markdown text as sanitized HTML and add target/rel to all links for security and opening in new tabs
function renderMarkdown(text: string | undefined): string {
  if (!text) return ''
  let html = marked.parse(text, { breaks: true })
  // Enforce target and rel attributes to all <a> tags
  html = html.replace(/<a /g, '<a target="_blank" rel="noopener" draggable="true" ')
  return DOMPurify.sanitize(html)
}

// Compute sanitized and processed HTML for dependencies and credits sections
const depsHtml = computed(() => renderMarkdown(meta.value?.dependencies))
const creditHtml = computed(() => renderMarkdown(meta.value?.credit))

// --- Progressive text reveal for "Component not found." ---

const brailleSpace = '\u2800'
const targetText = 'Component not found.'

// Initialize displayText with 200 braille spaces
const totalSpaceCount = 200
const initialText = brailleSpace.repeat(totalSpaceCount)
const displayText = ref(initialText)

let revealTimeout: ReturnType<typeof setTimeout> | null = null
let revealInterval: ReturnType<typeof setInterval> | null = null

function clearTimers() {
  if (revealTimeout) {
    clearTimeout(revealTimeout)
    revealTimeout = null
  }
  if (revealInterval) {
    clearInterval(revealInterval)
    revealInterval = null
  }
}

// Watch meta for changes to reset or start the reveal animation
watch(
  meta,
  (newMeta) => {
    clearTimers()
    displayText.value = initialText
    if (!newMeta) {
      // Start reveal after 1 second delay
      revealTimeout = setTimeout(() => {
        if (meta.value) return // If component appeared meanwhile, cancel
        let idx = 0
        // Calculate interval duration per character to fit ~0.3s total
        const totalDurationMs = 300
        const intervalMs = Math.max(totalDurationMs / targetText.length, 10)
        revealInterval = setInterval(() => {
          if (idx >= targetText.length) {
            clearTimers()
            return
          }
          // Replace braille space at idx with actual character
          const chars = displayText.value.split('')
          chars[idx] = targetText[idx]
          displayText.value = chars.join('')
          idx++
        }, intervalMs)
      }, 1000)
    }
  },
  { immediate: true }
)

// Ensure timers cleared on component unmount
onBeforeUnmount(() => {
  clearTimers()
})

// Watch meta and activeTab changes and after DOM updates,
// ensure all links in .components-main open safely in new tabs
watch(
  [meta, activeTab],
  () => {
    nextTick(() => {
      document.querySelectorAll('.components-main a').forEach(anchor => {
        anchor.setAttribute('target', '_blank')
        anchor.setAttribute('rel', 'noopener')
      })
    })
  },
  { immediate: true }
)
</script>

<template>
  <div class="components-layout">
    <!-- Sidebar shown only on desktop -->
    <ComponentList
      v-if="!isMobile"
      :items="componentMeta"
      :active-route="activeRoute"
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

        <!-- Radio button tabs: Preview / Code -->
        <RadioButton
          v-model="activeTab"
          :options="tabOptions"
          active-bg="#393643"
          active-fg="#fff"
          inactive-bg="none"
          inactive-fg="#aaa"
          hover-bg="#23222a"
        />

        <!-- Preview area: live demo or fallback placeholder -->
        <div v-show="activeTab === 'preview'" class="demo-preview-container">
          <template v-if="demoExists">
            <client-only>
              <component :is="demoComponent(meta.route)" />
            </client-only>
          </template>
          <template v-else>
            <div class="preview-placeholder">No preview available.</div>
          </template>
        </div>

        <!-- Code area: show all code files if any -->
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

        <!-- Usage section -->
        <div v-if="meta.usage" class="section-label">Usage:</div>
        <UsageBlock
          v-if="meta.usage"
          :code="meta.usage"
          class="usage-codeblock"
        />

        <!-- Dependencies section with sanitized HTML -->
        <div v-if="meta.dependencies" class="section-label">Dependencies:</div>
        <div
          v-if="meta.dependencies"
          class="meta-info meta-block"
          v-html="depsHtml"
        ></div>

        <!-- Credit section with sanitized HTML -->
        <div v-if="meta.credit" class="section-label">Credit:</div>
        <div
          v-if="meta.credit"
          class="meta-info meta-block"
          v-html="creditHtml"
        ></div>
      </div>

      <!-- Empty container filled initially with 200 invisible braille spaces,
           progressively replaced by "Component not found." -->
      <div v-else class="not-found-container" aria-live="polite" role="alert">
        <p class="progressive-text" aria-label="Component not found">
          {{ displayText }}
        </p>
      </div>
    </div>
  </div>
</template>

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
/* FORCE WHITE LINKS EVERYWHERE INSIDE COMPONENTS */
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

.not-found-container {
  width: 100%;
  min-height: 40px; /* to keep layout space */
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 8px;

  overflow: hidden; /* Prohibit overflow and scrollbar */
}

.progressive-text {
  color: #888;
  font-size: 1.1rem;
  user-select: none;
  white-space: nowrap;  /* No wrapping */
  overflow: hidden;     /* Hide excess text */
  text-overflow: clip;  /* Clip without ellipsis */
  font-family: monospace, monospace;
  margin: 0;
  width: 100%;
  max-width: 100%;
}

</style>

<!-- Optional: global style to override any link color inside your component globally -->
<style>
.components-layout a,
.components-main a,
.codeblock-root a,
.usage-codeblock a,
.meta-info.meta-block a {
  color: #fff !important;
}
</style>
