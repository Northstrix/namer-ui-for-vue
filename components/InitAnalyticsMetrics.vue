<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { componentMeta } from '~/src/data/componentMeta'

// Firestore imports and db client - must match your setup
import { db } from '~/plugins/firebase.client'
import { doc, getDoc, setDoc } from 'firebase/firestore'

// Enable/disable analytics writes here
const ANALYTICS_ENABLED = true

const logMessages = ref<string[]>([])
const isInitializing = ref(false)

// Inflected card metric parts and event types to initialize
const cardParts = ['card', 'button', 'image', 'title', 'description']
const eventTypes = ['clicked', 'hovered']

/**
 * Log message to console and reactive UI array
 */
function log(msg: string) {
  console.log(msg)
  logMessages.value.push(msg)
}

/**
 * Clean metric keys for Firestore field names
 */
function cleanMetricKey(str: string) {
  return str.replace(/[.#$\[\]/ ]+/g, '_').toLowerCase()
}

/**
 * Initialize missing fields to 0 inside given Firestore doc reference
 * Returns true if any fields were created
 */
async function initializeFields(docRef: ReturnType<typeof doc>, fieldsToInit: string[]): Promise<boolean> {
  const docSnap = await getDoc(docRef)
  const toSet: Record<string, number> = {}

  if (docSnap.exists()) {
    const data = docSnap.data()
    for (const field of fieldsToInit) {
      if (!(field in data)) {
        toSet[field] = 0
      }
    }
  } else {
    for (const field of fieldsToInit) {
      toSet[field] = 0
    }
  }

  const createdAny = Object.keys(toSet).length > 0
  if (createdAny) {
    await setDoc(docRef, toSet, { merge: true })
  }
  return createdAny
}

/**
 * Initialize all metrics for all components based on metadata
 */
async function initializeAllMetrics() {
  if (!ANALYTICS_ENABLED) {
    log('Analytics disabled. No initialization performed.')
    return
  }
  isInitializing.value = true
  log('Starting metric fields initialization for ALL components...')

  const collectionPath = 'data'
  const docId = 'metrics'

  let totalCreatedFields = 0
  let totalDocsProcessed = 0

  for (const meta of componentMeta) {
    const componentName = meta.route || 'unknown'
    // Build metric fields keys for inflected card (clicked and hovered on all parts)
    const cardMetricFields: string[] = []
    for (const event of eventTypes) {
      for (const part of cardParts) {
        cardMetricFields.push(cleanMetricKey(`${componentName}:${event}:${part}:g`))
      }
    }
    // One list click event field (no part)
    const listClickField = cleanMetricKey(`${componentName}:clicked:l`)
    // The opened metric field
    const openedField = cleanMetricKey(`${componentName}:opened`)

    const allFields = [...cardMetricFields, listClickField, openedField]

    const docRef = doc(db, collectionPath, docId)
    log(`Checking/initializing metrics for '${componentName}'...`)

    try {
      const created = await initializeFields(docRef, allFields)
      if (created) {
        totalCreatedFields += allFields.length
        log(`Initialized ${allFields.length} metric fields for '${componentName}'.`)
      } else {
        log(`All metric fields for '${componentName}' already exist. No changes made.`)
      }
      totalDocsProcessed++
    } catch (error) {
      log(`Error initializing metrics for '${componentName}': ${error instanceof Error ? error.message : error}`)
    }
  }

  log('--- Initialization complete for ALL components ---')
  log(`Processed ${totalDocsProcessed} components.`)
  log(`Total metric fields created: ${totalCreatedFields}`)
  isInitializing.value = false
}

/**
 * Initialize metric fields only for the current component (based on route 'name')
 */
async function initializeCurrentComponentMetrics() {
  if (!ANALYTICS_ENABLED) {
    log('Analytics disabled. No initialization performed for current component.')
    return
  }
  isInitializing.value = true

  let componentName: string | undefined
  if (typeof route.params.name === 'string') {
    componentName = route.params.name
  } else if (Array.isArray(route.params.name)) {
    componentName = route.params.name[0]
  } else {
    componentName = undefined
  }

  if (!componentName) {
    log('No valid component name from route param. Initialization skipped.')
    isInitializing.value = false
    return
  }

  log(`Starting metric fields initialization for current component '${componentName}'...`)

  const collectionPath = 'data'
  const docId = 'metrics'

  // Build metric fields keys for inflected card (clicked and hovered on all parts)
  const cardMetricFields: string[] = []
  for (const event of eventTypes) {
    for (const part of cardParts) {
      cardMetricFields.push(cleanMetricKey(`${componentName}:${event}:${part}:g`))
    }
  }
  // One list click event field (no part)
  const listClickField = cleanMetricKey(`${componentName}:clicked:l`)
  // The opened metric field
  const openedField = cleanMetricKey(`${componentName}:opened`)

  const allFields = [...cardMetricFields, listClickField, openedField]

  const docRef = doc(db, collectionPath, docId)
  log(`Checking/initializing metrics for '${componentName}'...`)

  try {
    const created = await initializeFields(docRef, allFields)
    if (created) {
      log(`Initialized ${allFields.length} metric fields for '${componentName}'.`)
    } else {
      log(`All metric fields for '${componentName}' already exist. No changes made.`)
    }
  } catch (error) {
    log(`Error initializing metrics for '${componentName}': ${error instanceof Error ? error.message : error}`)
  }

  log('--- Initialization complete for current component ---')
  isInitializing.value = false
}

const route = useRoute()
</script>

<template>
  <section class="init-metrics-container">
    <h2>Initialize Analytics Metric Fields</h2>
    <p>
      This tool initializes missing Firestore metric fields for all components based on metadata.
      Existing fields will be left unchanged.
    </p>

    <div style="margin-bottom: 16px;">
      <button :disabled="isInitializing" @click="initializeAllMetrics" class="init-button" style="margin-right: 1rem;">
        {{ isInitializing ? 'Initializing...' : 'Initialize All Metrics' }}
      </button>
      <button :disabled="isInitializing" @click="initializeCurrentComponentMetrics" class="init-button">
        {{ isInitializing ? 'Initializing...' : 'Initialize Current Component Metrics' }}
      </button>
    </div>

    <div v-if="logMessages.length" class="log-console" role="log" aria-live="polite" tabindex="0">
      <strong>Logs:</strong>
      <ul>
        <li v-for="(msg, idx) in logMessages" :key="idx" class="log-entry">{{ msg }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.init-metrics-container {
  max-width: 900px;
  margin: 2rem auto;
  font-family: Arial, sans-serif;
  background-color: #1e1e2f;
  color: #ddd;
  border-radius: 8px;
  padding: 24px 32px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.8);
}

h2 {
  color: #a5c8ff;
  margin-bottom: 0.25em;
}

p {
  font-size: 1rem;
  line-height: 1.4;
  color: #bbb;
  margin-bottom: 1.5rem;
}

.init-button {
  background-color: #3a3a6e;
  border: none;
  border-radius: 8px;
  padding: 0.6em 1.2em;
  font-size: 1rem;
  font-weight: 600;
  color: #e0e0ff;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.init-button:hover:not(:disabled) {
  background-color: #4e4ead;
}

.init-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.log-console {
  margin-top: 1.5rem;
  background-color: #121228;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
  padding: 1rem 1.25rem;
  font-family: monospace;
  font-size: 0.9rem;
  color: #aaddff;
}

.log-console strong {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: #7abcff;
}

.log-entry {
  margin-bottom: 0.25rem;
  word-wrap: break-word;
  white-space: pre-wrap;
}

/* Scrollbar for webkit */
.log-console::-webkit-scrollbar {
  width: 8px;
}
.log-console::-webkit-scrollbar-thumb {
  background-color: #555580;
  border-radius: 8px;
}
</style>
