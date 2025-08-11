<template>
  <nav class="sidebar">
    <div class="sidebar-all">
      <span class="sidebar-all-label">All components</span>
    </div>
    <a
      v-for="meta in sortedItems"
      :key="meta.route"
      class="sidebar-item"
      :class="{ active: activeRoute === meta.route, hovered: hovered === meta.route }"
      :href="`/components/${meta.route}`"
      @click="handleClick($event, meta.route)"
      @mouseenter="hovered = meta.route"
      @mouseleave="hovered = null"
    >
      <span
        class="sidebar-item-label"
        :class="{ 'gradient-text': activeRoute === meta.route }"
      >
        {{ meta.name }}
      </span>
    </a>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { fireAnalyticsForListClick } from '~/composables/useAnalytics'

const props = defineProps<{
  items: Array<{ name: string; route: string }>
  activeRoute?: string
}>()

const router = useRouter()
const route = useRoute()
const hovered = ref<string | null>(null)

const activeRoute = computed(() => props.activeRoute ?? route.params.name)

const sortedItems = computed(() =>
  [...props.items].sort((a, b) => a.name.localeCompare(b.name))
)

/**
 * Handles click on sidebar item links.
 * Prevents default browser navigation for normal left clicks,
 * allows middle/right clicks and modifier clicks.
 */
function handleClick(event: MouseEvent, routeName: string) {
  const isLeftClick = event.button === 0
  const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey

  if (isLeftClick && !hasModifier) {
    event.preventDefault()
    event.stopPropagation()
    goTo(routeName)
  }
}

function goTo(routeName: string) {
  if (activeRoute.value !== routeName) {
    fireAnalyticsForListClick(routeName)
    router.push(`/components/${routeName}`)
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  min-width: 250px;
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 0;
  font-size: 0.875rem;
  position: relative;
}
.sidebar::after {
  content: '';
  position: absolute;
  top: 32px;
  right: 0;
  width: 1px;
  height: calc(100% - 32px);
  background: #2c2934;
  z-index: 1;
}
.sidebar-all {
  color: #fff;
  font-size: 0.96rem;
  font-weight: 700;
  padding: 10px 24px 10px 0;
  user-select: none;
  cursor: default;
  margin-bottom: 2px;
}
.sidebar-all-label {
  display: inline-block;
  padding-left: 0;
}

/* Override global link color for this component */
.sidebar-item {
  color: #aaa !important; /* default inactive text color */
  text-decoration: none;
  font-size: 0.875rem;
  padding: 10px 24px 10px 0;
  cursor: pointer;
  user-select: none;
  border-radius: 8px;
  font-weight: 500;
  margin-bottom: 1px;
  transition: color 0.3s, transform 0.3s cubic-bezier(.4,1,.6,1);
  background: none;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  position: relative;
}
.sidebar-item:last-child {
  margin-bottom: 0;
}
.sidebar-item-label {
  display: inline-block;
  padding-left: 4px;
  background: none;
  transition: color 0.3s, transform 0.3s cubic-bezier(.4,1,.6,1);
  font-size: inherit;
  font-weight: inherit;
}

/* Active item text */
.gradient-text {
  color: transparent !important;
  background: linear-gradient(135deg, #4776cb, #a19fe5, #6cc606);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Hover effect for inactive items */
.sidebar-item.hovered:not(.active) {
  color: #fff !important; /* hovered inactive color */
}
.sidebar-item.hovered:not(.active) .sidebar-item-label {
  transform: translateX(8px);
}

/* Vertical line on hover */
.sidebar-item::before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 10px;
  bottom: 10px;
  width: 2px;
  border-radius: 999px;
  background: #aaa;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.12s cubic-bezier(.4,1,.6,1);
}
.sidebar-item.hovered:not(.active)::before {
  opacity: 1;
}
</style>
