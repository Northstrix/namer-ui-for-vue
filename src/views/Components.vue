<template>
  <div class="components-layout">
    <ComponentList
      v-if="!isMobile"
      :items="componentMeta"
      class="sidebar"
      :active-route="null"
    />
    <div
      class="components-main"
      :class="{ 'no-margin': isMobile }"
      :style="!isMobile ? { marginLeft: '24px' } : {}"
    >
      <div class="bento-grid" :class="{ single: isSingleColumn }">
        <div
          v-for="meta in componentMeta"
          :key="meta.route"
          class="bento-card"
          @click="goTo(meta.route)"
          tabindex="0"
          role="button"
          :class="{ hovered: hovered === meta.route }"
          @mouseenter="hovered = meta.route"
          @mouseleave="hovered = null"
        >
          <div class="bento-demo-outer">
            <div
              class="bento-showcase-outline"
              :class="{ hovered: hovered === meta.route }"
            >
              <div class="bento-showcase-inner">
                <!-- Preview logic based on previewType -->
                <template v-if="getPreviewType(meta) === 'center'">
                  <div class="center-demo">
                    <component
                      :is="demoComponent(meta.route)"
                      class="preview-center-demo"
                    />
                  </div>
                </template>
                <template v-else-if="getPreviewType(meta) === 'fullwidth'">
                  <div class="fullwidth-demo">
                    <component
                      :is="demoComponent(meta.route)"
                      class="preview-fullwidth-demo"
                    />
                  </div>
                </template>
                <template v-else>
                  <!-- fallback: default is center -->
                  <div class="center-demo">
                    <component
                      :is="demoComponent(meta.route)"
                      class="preview-center-demo"
                    />
                  </div>
                </template>
                <!-- REMOVED: <div class="bento-showcase-blocker"></div> -->
              </div>
            </div>
          </div>
          <div class="bento-content" :class="{ 'text-shift': hovered === meta.route }">
            <div
              class="bento-title"
              :class="{ 'line-clamp': !isSingleColumn }"
              :style="isSingleColumn ? multiLineStyle : {}"
            >
              {{ meta.name }}
            </div>
            <div
              class="bento-desc"
              :class="{ 'line-clamp': !isSingleColumn }"
              :style="isSingleColumn ? multiLineStyle : {}"
            >
              {{ meta.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, defineAsyncComponent, onMounted, onUnmounted, CSSProperties } from 'vue'
import { useRouter } from 'vue-router'
import { componentMeta } from '../data/componentMeta'
import ComponentList from '../components/ComponentList.vue'
import { useIsMobile } from '../composables/useIsMobile'

const router = useRouter()
const hovered = ref<string | null>(null)

// Responsive: one column if <1200px
const isSingleColumn = ref(window.innerWidth < 1200)
function handleResize() {
  isSingleColumn.value = window.innerWidth < 1200
}
onMounted(() => window.addEventListener('resize', handleResize))
onUnmounted(() => window.removeEventListener('resize', handleResize))

// Mobile: hide sidebar if mobile
const { isMobile } = useIsMobile()

// Dynamically import Demo.vue for each route
const demoCache = shallowRef<Record<string, any>>({})
function demoComponent(route: string) {
  if (!demoCache.value[route]) {
    demoCache.value[route] = defineAsyncComponent(() =>
      import(`../components/namer-ui/${route}/Demo.vue`)
    )
  }
  return demoCache.value[route]
}

// Decide which preview type to use
function getPreviewType(meta: { previewType?: string; route: string }) {
  if (meta.previewType) return meta.previewType
  // Fallbacks: navbar = fullwidth, button/alert = center, rest = center
  if (meta.route === 'truncating-navbar') return 'fullwidth'
  if (meta.route === 'button' || meta.route === 'alert') return 'center'
  return 'center'
}

// Explicitly allow multi-line when clamp is off
const multiLineStyle = {
  display: 'block',
  whiteSpace: 'normal',
  overflow: 'visible',
  textOverflow: 'unset',
  WebkitLineClamp: 'unset',
  WebkitBoxOrient: 'unset',
} as CSSProperties

function goTo(routeName: string) {
  router.push({ name: 'ComponentPage', params: { name: routeName } })
}
</script>

<style scoped>
.components-layout {
  display: flex;
  min-height: 100vh;
}
.sidebar { /* Width and style handled by ComponentList */ }
.components-main {
  flex: 1;
  padding: 32px 0;
  overflow-x: auto;
  margin-left: 24px;
  /* Always show margin when sidebar is visible */
  transition: margin-left 0.2s;
}
.components-main.no-margin {
  margin-left: 0 !important;
}
.bento-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  width: 100%;
  align-items: start;
  margin: 0 auto;
  box-sizing: border-box;
  transition: grid-template-columns 0.2s;
}
.bento-grid.single {
  grid-template-columns: 1fr;
}
@media (max-width: 1200px) {
  .bento-grid { grid-template-columns: 1fr; }
}
.bento-card {
  border-radius: 12px;
  border: 1px solid #27252e;
  background: #060507;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: border-color 0.2s, transform 0.18s;
  padding: 0;
  overflow: hidden;
  min-height: 220px;
}
.bento-card.hovered, .bento-card:hover {
  border-color: #35323e;
}
.bento-demo-outer {
  padding: 18px 18px 0 18px;
}
.bento-showcase-outline {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 1px solid #27252e;
  border-radius: 8px;
  background: #060507;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s;
  overflow: hidden;
  position: relative;
}
.bento-showcase-outline.hovered {
  border-color: #35323e;
}
.bento-showcase-inner {
  width: 100%;
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}
.bento-showcase-scaler {
  display: flex;
  align-items: center;
  justify-content: center;
  /* No transform here, just set width/height */
}
.bento-showcase-demo {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  object-fit: contain;
}
.center-demo {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.preview-center-demo {
  max-width: 240px;
  min-width: 80px;
  width: auto;
  max-height: 100%;
  min-height: 0;
  margin: 0 auto;
  display: block;
  pointer-events: auto; /* Allow pointer events */
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
  pointer-events: auto; /* Allow pointer events */
}
.bento-content {
  padding: 18px 18px 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 0;
  transition: transform 0.18s;
}
.bento-content.text-shift {
  transform: translateX(10px);
}
.bento-title {
  color: #fff;
  font-weight: 700;
  font-size: 1.07rem;
  margin-bottom: 4px;
  line-height: 1.2;
  text-align: left;
  word-break: break-word;
}
.bento-desc {
  color: #e1e1e1;
  font-size: 0.97rem;
  margin-bottom: 10px;
  text-align: left;
  line-height: 1.4;
  max-width: 100%;
}
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>
