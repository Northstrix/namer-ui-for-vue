<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useIsMobile } from '../composables/useIsMobile'

type ComponentMeta = {
  name: string
  route: string
  description: string
  usage: string
  demoPath: string
  demoScale?: number
  file: string
}

const componentMeta: ComponentMeta[] = [
  {
    name: 'Truncating Navbar',
    route: 'truncating-navbar',
    description: 'The main navigation bar component.',
    usage: `<TruncatingNavbar
  icon="/logo.png"
  appName="Namer UI"
  :routes="routes"
  homeRoute="/"
  scrolledBg="#151419"
  outlineColor="#403d4d"
  @open-search="openSearch"
/>`,
    demoPath: './namer-ui/truncating-navbar/Demo.vue',
    demoScale: 0.18,
    file: 'namer-ui/truncating-navbar/TruncatingNavbar.vue'
  },
  {
    name: 'Button',
    route: 'button',
    description: 'A simple, styled button.',
    usage: `<ButtonDemo />`,
    demoPath: './namer-ui/button/Demo.vue',
    demoScale: 0.28,
    file: 'namer-ui/button/Button.vue'
  },
  {
    name: 'Alert',
    route: 'alert',
    description: 'A simple alert box.',
    usage: `<AlertDemo />`,
    demoPath: './namer-ui/alert/Demo.vue',
    demoScale: 0.28,
    file: 'namer-ui/alert/Alert.vue'
  }
]

const route = useRoute()
const router = useRouter()
const { isMobile } = useIsMobile()
const hovered = ref<string | null>(null)
const selected = computed(() => {
  if (route.name === 'ComponentDetail' && typeof route.params.name === 'string') {
    return componentMeta.find(c => c.route === route.params.name)
  }
  return null
})

function isActive(r: string) {
  return selected.value && selected.value.route === r
}
function goTo(r: string) {
  if (!isActive(r)) router.push({ name: 'ComponentDetail', params: { name: r } })
}
function usagePreview(usage: string) {
  const lines = usage.trim().split('\n')
  return lines.length > 2 ? lines.slice(0, 2).join('\n') + ' ...' : usage
}
</script>

<template>
  <div class="component-explorer-root">
    <div class="component-explorer-layout">
      <!-- Component List (desktop only) -->
      <nav v-if="!isMobile" class="component-list">
        <div
          v-for="meta in componentMeta"
          :key="meta.route"
          class="component-list-item"
          :class="{
            active: isActive(meta.route),
            hovered: hovered === meta.route && !isActive(meta.route),
          }"
          @mouseenter="hovered = meta.route"
          @mouseleave="hovered = null"
          @click="goTo(meta.route)"
        >
          <span :class="{ 'gradient-text': isActive(meta.route) }">{{ meta.name }}</span>
        </div>
      </nav>

      <!-- Cards or Detail -->
      <div class="component-main">
        <template v-if="!selected">
          <!-- CARD GRID -->
          <div class="cards-grid">
            <div
              v-for="meta in componentMeta"
              :key="meta.route"
              class="card"
              @click="goTo(meta.route)"
              tabindex="0"
              role="button"
            >
              <div class="card-content">
                <div class="card-title">{{ meta.name }}</div>
                <div class="card-desc">{{ meta.description }}</div>
                <pre class="card-usage">{{ usagePreview(meta.usage) }}</pre>
                <div class="card-demo-perspective">
                  <iframe
                    :src="`/component-demo/${meta.route}`"
                    class="demo-container"
                    :style="{
                      transform: `scale(${meta.demoScale ?? 0.25}) perspective(800px)`,
                      transformOrigin: 'top left'
                    }"
                    frameborder="0"
                    tabindex="-1"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <!-- DETAIL PAGE -->
          <div class="component-detail">
            <h2 class="component-title">{{ selected.name }}</h2>
            <p class="component-desc">{{ selected.description }}</p>
            <pre class="component-usage">{{ selected.usage }}</pre>
            <div style="margin: 24px 0;">
              <component
                :is="defineAsyncComponent(() => import(/* @vite-ignore */ selected.demoPath))"
                class="demo-container"
              />
            </div>
            <div><b>File:</b> <code>{{ selected.file }}</code></div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.component-explorer-root {
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 40px;
  background: none;
}
.component-explorer-layout {
  display: flex;
  align-items: flex-start;
  width: 100%;
  background: none;
  gap: 0;
}
.component-list {
  width: 272px;
  min-width: 272px;
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  background: none;
}
.component-list-item {
  width: 100%;
  padding: 12px 16px;
  font-size: 0.875rem;
  color: #aaa;
  cursor: pointer;
  user-select: none;
  transition: color 0.25s, transform 0.18s;
  border-radius: 8px;
  font-weight: 500;
  text-align: left;
  margin-bottom: 2px;
  background: none;
  outline: none;
  border: none;
  display: flex;
  align-items: flex-start;
}
.component-list-item:last-child {
  margin-bottom: 0;
}
.component-list-item.active,
.component-list-item .gradient-text {
  color: transparent;
  background: linear-gradient(135deg, #4776cb, #a19fe5, #6cc606);
  background-size: 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-move 3s linear infinite;
  font-weight: 700;
}
@keyframes gradient-move {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
.component-list-item.hovered {
  color: #fff;
  transform: translateX(6px);
  transition: color 0.18s, transform 0.18s;
}
.component-main {
  flex: 1;
  padding: 0;
  align-items: flex-start;
  background: none;
  width: 100%;
}
.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  width: 100%;
  align-items: start;
  padding: 0;
  margin: 0;
}
.card {
  border-radius: 16px;
  border: 1px solid #232135;
  box-shadow: 0 2px 8px 0 rgba(20,20,40,0.07);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 156px;
  cursor: pointer;
  transition: box-shadow 0.18s, border-color 0.18s;
  background: none;
  padding: 20px 18px 16px 18px;
}
.card:hover {
  box-shadow: 0 6px 24px 0 rgba(76, 118, 203, 0.12);
  border-color: #4776cb;
}
.card-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
}
.card-title {
  color: #fff;
  font-weight: 700;
  font-size: 1.05rem;
  margin-bottom: 4px;
  line-height: 1.2;
  text-align: left;
}
.card-desc {
  color: #aaa;
  font-size: 0.95rem;
  margin-bottom: 12px;
  text-align: left;
  line-height: 1.4;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card-usage {
  background: #19192b;
  color: #a19fe5;
  border-radius: 6px;
  font-size: 0.81rem;
  padding: 8px 10px;
  margin: 0 0 10px 0;
  width: 100%;
  max-width: 100%;
  min-height: 2.7em;
  max-height: 2.7em;
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
  font-family: 'Fira Mono', 'Consolas', monospace;
  box-sizing: border-box;
  display: block;
}
.card-demo-perspective {
  width: 100%;
  min-height: 60px;
  margin-top: 8px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: visible;
}
.demo-container {
  min-height: 300px;
  width: 100%;
  background: #060507;
  outline: 1px solid #33313d;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
}
.component-detail {
  flex: 1;
  padding: 0;
  color: #fff;
  align-items: flex-start;
  background: none;
}
.component-title {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
}
.component-desc {
  color: #aaa;
  margin-bottom: 16px;
}
.component-usage {
  background: #19192b;
  color: #a19fe5;
  border-radius: 6px;
  font-size: 0.88rem;
  padding: 8px 10px;
  margin: 0 0 18px 0;
  width: 100%;
  max-width: 100%;
  min-height: 2.7em;
  max-height: 2.7em;
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
  font-family: 'Fira Mono', 'Consolas', monospace;
  box-sizing: border-box;
  display: block;
}
code {
  color: #a19fe5;
  background: #232135;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.92em;
}
</style>
