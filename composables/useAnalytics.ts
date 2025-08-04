// composables/useAnalytics.ts

import { db } from '~/plugins/firebase.client'
import { doc, updateDoc, setDoc, increment } from 'firebase/firestore'

// Analytics toggle local in this file only
const ANALYTICS_ENABLED = true

function cleanMetricKey(str: string) {
  return str.replace(/[.#$\[\]/ ]+/g, '_').toLowerCase()
}

async function sendAnalyticsMetric(metricKey: string): Promise<void> {
  if (!ANALYTICS_ENABLED) return
  const safeKey = cleanMetricKey(metricKey)
  const docRef = doc(db, 'data', 'metrics')
  const t0 = performance.now()
  try {
    await updateDoc(docRef, { [safeKey]: increment(1) })
    const t1 = performance.now()
    //console.log(`[analytics] Metric '${safeKey}' updated in ${(t1 - t0).toFixed(1)}ms`)
  } catch (err: any) {
    if (err.code === 'not-found') {
      await setDoc(docRef, { [safeKey]: 1 }, { merge: true })
    }
    const t2 = performance.now()
    //console.log(`[analytics] Metric '${safeKey}' set (fallback) in ${(t2 - t0).toFixed(1)}ms`)
  }
}

// Existing analytics functions...

export function fireAnalyticsForListClick(componentName: string): void {
  if (!ANALYTICS_ENABLED) return
  const metric = `${componentName}:clicked:l`
  sendAnalyticsMetric(metric)
}

export function fireAnalyticsForInflectedCard(
  componentName: string,
  eventType: 'hovered' | 'clicked',
  part: string
): void {
  if (!ANALYTICS_ENABLED) return
  const metric = `${componentName}:${eventType}:${part}:g`
  sendAnalyticsMetric(metric)
}

/**
 * Fire analytics when a route (with parameter `name`) page is opened or changed.
 * Format: `${name}:opened`
 */
export function fireAnalyticsForRouteOpen(name: string): void {
  if (!ANALYTICS_ENABLED) return
  const metric = `${name}:opened`
  sendAnalyticsMetric(metric)
}
