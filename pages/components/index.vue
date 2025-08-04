<script setup lang="ts">
import {
  ref,
  onMounted,
  onUnmounted,
  computed,
  h,
  defineAsyncComponent,
  shallowRef,
} from 'vue'
import { useRouter } from 'vue-router'
import { componentMeta } from '~/src/data/componentMeta'
import ComponentList from '~/components/ComponentList.vue'
import InflectedComponentCard from '~/components/InflectedComponentCard.vue'
import PingPongLoader from '~/components/namer-ui/ping-pong-loader/PingPongLoader.vue'
import { useIsMobile } from '~/composables/useIsMobile'
import { CornerRightUp } from 'lucide-vue-next'
import { fireAnalyticsForInflectedCard } from '~/composables/useAnalytics'

const router = useRouter()
const { isMobile } = useIsMobile()
const isSingleColumn = ref(window.innerWidth < 1200)

function handleResize() {
  isSingleColumn.value = window.innerWidth < 1200
}

onMounted(() => window.addEventListener('resize', handleResize))
onUnmounted(() => window.removeEventListener('resize', handleResize))

const isLoading = computed(
  () =>
    !componentMeta ||
    !Array.isArray(componentMeta) ||
    componentMeta.length === 0
)

// Fallback demo component with centered logo
const FallbackDemo = {
  name: 'FallbackDemo',
  setup() {
    return () =>
      h(
        'div',
        {
          style: {
            width: '100%',
            height: '100%',
            background: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
        [
          h('img', {
            src: '/logo.png',
            alt: 'Fallback Logo',
            width: 92,
            height: 92,
            style: { display: 'block' },
          }),
        ]
      )
  },
}

// Cache async demo components and their fallback state
const demoCache = shallowRef<Record<string, { component: any; failed: boolean }>>({})

function demoComponent(route: string) {
  if (!demoCache.value[route]) {
    const asyncComp = defineAsyncComponent(() =>
      import(`~/components/namer-ui/${route}/CardDemo.vue`).catch(() => {
        demoCache.value[route] = { component: FallbackDemo, failed: true }
        return FallbackDemo
      })
    )
    demoCache.value[route] = { component: asyncComp, failed: false }
  }
  return demoCache.value[route].component
}

// Track images that failed loading
const imageErrorMap = ref<Record<string, boolean>>({})

function onImageError(slug: string) {
  imageErrorMap.value[slug] = true
}

function openInSameTab(url: string) {
  if (!url) return
  if (/^https?:\/\//i.test(url)) {
    window.location.assign(url)
  } else {
    router.push(url)
  }
}

function openInNewTab(url: string) {
  if (!url) return
  window.open(url, '_blank', 'noopener,noreferrer')
}

// Render live demo with previewType distinction
// For fallback demos always force fullwidth style regardless of previewType
function renderLiveDemo(route: string, previewType: string) {
  const demoEntry = demoCache.value[route]
  const useFallbackDemo = demoEntry ? demoEntry.failed : false
  if (useFallbackDemo) {
    // ALWAYS render fallback demo with fullwidth styling regardless of previewType
    return h(
      'div',
      { class: 'fullwidth-demo' },
      [h(FallbackDemo, { class: 'preview-fullwidth-demo' })]
    )
  } else {
    const effectivePreviewType = previewType === '' ? 'center' : previewType
    return h(
      'div',
      {
        class: effectivePreviewType === 'fullwidth' ? 'fullwidth-demo' : 'center-demo',
      },
      [
        h(demoComponent(route), {
          class:
            effectivePreviewType === 'fullwidth'
              ? 'preview-fullwidth-demo'
              : 'preview-center-demo',
        }),
      ]
    )
  }
}

function getCardProps(meta: any, index: number) {
  const cardLink = meta.url || meta.link || `/components/${meta.route}`
  const slug: string = meta.route || 'unknown'
  const originalPreviewType = meta.previewType ? meta.previewType.toLowerCase() : ''

  // Detect if demo failed loading
  const demoEntry = demoCache.value[slug]
  const demoFailed = demoEntry ? demoEntry.failed : false

  // Detect if image loading failed
  const imageFailed = imageErrorMap.value[slug] === true

  // Combined fallback flag: demo failed OR image failed on image previewType
  const useFallback = demoFailed || (originalPreviewType === 'image' && imageFailed)

  // Force previewType to 'fullwidth' if fallback needed
  const previewType = useFallback ? 'fullwidth' : originalPreviewType

  let showImage = false
  let imagePath = meta.imageLink || ''
  let showLiveDemoSlot = false

  if (useFallback) {
    // Force fallback demo: no image, live demo slot active fullwidth fallback
    showImage = false
    showLiveDemoSlot = true
  } else {
    if (previewType === 'image') {
      showImage = !!imagePath && !imageFailed
      showLiveDemoSlot = false
    } else if (previewType === 'fullwidth' || previewType === 'center') {
      showImage = false
      showLiveDemoSlot = true
    } else {
      showImage = index % 2 === 1 && !imageFailed
      showLiveDemoSlot = index % 2 === 0
    }
  }

  return {
    id: slug,
    image: imagePath,
    showImage,
    showFallbackImage: originalPreviewType === 'image' && imageFailed,
    title: meta.name || 'Component Name',
    description: meta.description || 'Example description for the UI component.',
    parentBackgroundColor: '#111014',
    cardRounding: 16,
    fontSizes: {
      title: '1.03rem',
      description: '0.95rem',
    },
    margins: {
      title: '0 0 0.24em 0',
      description: '0 0 0.3em 0',
    },
    maxWidth: '100%',
    mirrored: false,
    titleAlignment: 'left',
    descriptionAlignment: 'left',
    tagsAlignment: 'left',
    buttonIcon: CornerRightUp,
    buttonIconSize: 28,
    buttonIconColor: '#fff',
    buttonIconHoverColor: '#111014',
    buttonBackgroundColor: '#4776cb',
    buttonBackgroundHoverColor: '#fff',
    imageHoverZoom: 1.2,
    imageContainerHeight: '12rem',
    titleColor: '#fff',
    descriptionColor: '#e1e1e1',
    price: undefined,
    oldPrice: undefined,
    titleLineClamp: 1,
    descriptionLineClamp: 2,
    tagHoverBrightness: 0.8,
    tags: [],
    url: cardLink,
    slots: {
      'live-demo': showLiveDemoSlot ? () => renderLiveDemo(slug, previewType) : null,
    },
    onImageError: () => onImageError(slug),
    onHover: (info: any) => {
      if (!info) return
      if (info.isHovered) {
        const part = info.part || 'card'
        fireAnalyticsForInflectedCard(slug, 'hovered', part)
      }
    },
    onClick: (info: any) => {
      if (!info) return
      const part = info.part || 'card'
      if (part === 'button') {
        fireAnalyticsForInflectedCard(slug, 'clicked', part)
        openInNewTab(cardLink)
        return
      }
      openInSameTab(cardLink)
      fireAnalyticsForInflectedCard(slug, 'clicked', part)
    },
  }
}
</script>

<template>
  <div class="components-layout">
    <div v-if="isLoading" class="loader-top-center">
      <PingPongLoader
        message="Loading Components..."
        :backgroundColor="'transparent'"
        :gridColor="'#232333'"
        :handleBallColor="'#ffffff'"
        :adjacentHandleColor="'#00a0d8'"
        :borderColor="'#222232'"
        :textColor="'#e7eaff'"
        :padding="'1rem 0 0 0'"
        :duration="70"
        :repeatCount="-1"
      />
    </div>

    <template v-else>
      <ComponentList
        v-if="!isMobile"
        :items="componentMeta"
        class="sidebar"
        :active-route="undefined"
      />
      <div
        class="components-main"
        :class="{ 'no-margin': isMobile, 'single-column-margin': isSingleColumn }"
        :style="!isMobile ? { marginLeft: '24px' } : {}"
      >
        <div class="card-grid" :class="{ single: isSingleColumn }">
          <template v-for="(meta, i) in componentMeta" :key="meta.route">
            <InflectedComponentCard
              v-bind="getCardProps(meta, i)"
              class="card-preview"
              tabindex="0"
              role="button"
            >
              <template v-if="getCardProps(meta, i).showImage">
                <img
                  :src="getCardProps(meta, i).image"
                  :alt="getCardProps(meta, i).title"
                  class="card-image"
                  draggable="false"
                  @error="getCardProps(meta, i).onImageError"
                />
              </template>

              <!-- Show fallback logo container if image failed -->
              <template v-if="getCardProps(meta, i).showFallbackImage">
                <div
                  style="
                    width: 100%;
                    height: 100%;
                    background: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <img src="/logo.png" alt="Fallback Logo" width="92" height="92" />
                </div>
              </template>

              <!-- Live demo or fallback demo, fullwidth fallback enforced internally -->
              <template #live-demo v-if="getCardProps(meta, i).slots['live-demo']">
                <component :is="getCardProps(meta, i).slots['live-demo']()" />
              </template>
            </InflectedComponentCard>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.components-layout {
  display: flex;
  min-height: 100vh;
  flex-direction: row;
  position: relative;
}

/* Loader top centered horizontally, with margin bottom */
.loader-top-center {
  position: fixed;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  width: auto;
  background: transparent;
  padding: 0;
}

/* Sidebar styles inside ComponentList.vue */
.sidebar {}

.components-main {
  flex: 1;
  padding: 32px 0;
  overflow-x: auto;
  margin-left: 24px;
  transition: margin-left 0.2s;
}
/* Remove margin for mobile */
.components-main.no-margin {
  margin-left: 0 !important;
}
/* Optional margin removal on single column to center better */
.components-main.single-column-margin {
  margin-left: 0 !important;
  padding-left: 16px;
  padding-right: 16px;
}

/* Card grid with responsive columns */
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  width: 100%;
  align-items: start;
  margin: 0 auto;
  box-sizing: border-box;
  transition: grid-template-columns 0.2s;
}

.card-grid.single {
  grid-template-columns: 1fr;
}

@media (max-width: 1200px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}

.card-preview {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  max-width: 100%;
  border-radius: 16px;
  user-select: none;
}

/* Demo wrapper styles */
.center-demo {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-center-demo {
  min-width: 80px;
  width: 100%;
  max-height: 100%;
  min-height: 0;
  margin: 0 auto;
  display: block;
  pointer-events: auto;
  object-fit: contain;
}

.fullwidth-demo {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-fullwidth-demo {
  width: 100%;
  height: 100%;
  pointer-events: auto;
}
</style>
