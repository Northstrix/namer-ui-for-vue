<template>
  <nav
    class="resizable-navbar"
    :class="{ scrolled: isScrolled, mobile: isMobile }"
    :style="navStyle"
  >
    <!-- Logo -->
    <a class="navbar-logo" :href="homeRoute">
      <img :src="icon" alt="logo" width="32" height="32" />
      <span class="app-name">{{ appName }}</span>
    </a>

    <!-- Desktop: links and searchbar -->
    <template v-if="!isMobile">
      <div class="nav-items">
        <a
          v-for="(item, idx) in routes"
          :key="idx"
          :href="item.link"
          class="nav-link"
          :target="item.external ? '_self' : undefined"
          :rel="item.external ? 'noopener' : undefined"
          @click.prevent="handleRoute(item)"
        >
          <span class="nav-link-text" :style="{ fontSize: fontSize }">{{ item.name }}</span>
        </a>
      </div>
      <button
        class="navbar-search-btn"
        :style="{ outline: `1px solid ${outlineColor}`, fontSize: searchFontSizeDesktop }"
        @click="emit('open-search')"
        type="button"
      >
        <Search :size="18" color="#aaa" />
        <span
          class="search-placeholder"
          :class="{ hovered: searchHovered }"
          @mouseenter="searchHovered = true"
          @mouseleave="searchHovered = false"
        >{{ searchPlaceholder }}</span>
        <span class="search-shortcut" :style="{ outline: `1px solid ${outlineColor}` }">
          <Command :size="16" />
          <span>{{ displayShortcutKey }}</span>
        </span>
      </button>
    </template>

    <!-- Mobile: burger only -->
    <button
      class="mobile-nav-toggle"
      v-if="isMobile"
      @click="isMobileMenuOpen = !isMobileMenuOpen"
      aria-label="Open navigation"
    >
      <span v-if="isMobileMenuOpen"><Menu :size="26" /></span>
      <span v-else><Menu :size="26" /></span>
    </button>

    <!-- Mobile menu overlay -->
    <transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        class="mobile-nav-overlay"
        @click.self="isMobileMenuOpen = false"
      >
        <div class="mobile-nav-menu">
          <div class="mobile-nav-header">
            <a class="navbar-logo" :href="homeRoute">
              <img :src="icon" alt="logo" width="32" height="32" />
              <span class="app-name">{{ appName }}</span>
            </a>
            <button
              class="mobile-nav-close"
              @click="isMobileMenuOpen = false"
              aria-label="Close menu"
            >
              <Minimize2 :size="26" />
            </button>
          </div>
          <div class="mobile-nav-links">
            <a
              v-for="(item, idx) in routes"
              :key="idx"
              :href="item.external ? item.link : undefined"
              :to="!item.external ? item.link : undefined"
              class="mobile-nav-link"
              @click.prevent="handleRoute(item, true)"
              :target="item.external ? '_self' : undefined"
              :rel="item.external ? 'noopener' : undefined"
            >{{ item.name }}</a>
          </div>
          <button
            class="navbar-search-btn mobile"
            :style="{ outline: `1px solid ${outlineColor}`, fontSize: searchFontSizeMobile }"
            @click="emit('open-search')"
            type="button"
          >
            <Search :size="18" />
            <span
              class="search-placeholder"
              :class="{ hovered: searchHovered }"
              @mouseenter="searchHovered = true"
              @mouseleave="searchHovered = false"
            >{{ searchPlaceholder }}</span>
            <span class="search-shortcut" :style="{ outline: `1px solid ${outlineColor}` }">
              <Command :size="16" />
              <span>{{ displayShortcutKey }}</span>
            </span>
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { Search, Command, Minimize2, Menu } from "lucide-vue-next";

interface RouteItem {
  name: string;
  link: string;
  external?: boolean;
}

const emit = defineEmits(['open-search'])

const props = defineProps<{
  icon: string;
  appName: string;
  routes: RouteItem[];
  homeRoute?: string;
  scrolledBg?: string;
  outlineColor?: string;
  mobileBg?: string;
  shortcutKey?: string;
  onShortcut?: () => void;
  fontSize?: string;
  desktopThreshold?: number;
  searchFontSizeDesktop?: string;
  searchFontSizeMobile?: string;
  searchPlaceholderText?: string;
  zIndex?: number;
}>();

const outlineColor = computed(() => props.outlineColor || '#403d4d');
const scrolledBg = computed(() => props.scrolledBg || '#151419');
const mobileBg = computed(() => props.mobileBg || '#111014');
const shortcutKey = computed(() => (props.shortcutKey || 'K').toUpperCase());
const displayShortcutKey = computed(() => shortcutKey.value);
const fontSize = computed(() => props.fontSize || '0.875rem');
const desktopThreshold = computed(() => props.desktopThreshold ?? 910);
const searchFontSizeDesktop = computed(() => props.searchFontSizeDesktop || '1rem');
const searchFontSizeMobile = computed(() => props.searchFontSizeMobile || '0.875rem');
const searchPlaceholder = computed(() => props.searchPlaceholderText || 'Search components...');

const isMobile = ref(window.innerWidth < desktopThreshold.value);
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);
const searchHovered = ref(false);
const router = useRouter();

const navStyle = computed(() => {
  const baseStyle = isMobile.value
    ? {
        background: isScrolled.value ? scrolledBg.value : mobileBg.value,
        border: isScrolled.value ? `1px solid ${outlineColor.value}` : 'none',
        borderRadius: isScrolled.value ? '8px' : '0',
        height: isScrolled.value ? '52px' : '56px',
        top: isScrolled.value ? '8px' : '0',
        marginTop: isScrolled.value ? '8px' : '0',
        paddingLeft: isScrolled.value ? '12px' : '0',
        paddingRight: isScrolled.value ? '12px' : '0',
        boxShadow: isScrolled.value ? '0 2px 16px 0 rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.2s cubic-bezier(.4,0,.2,1)',
      }
    : {
        background: isScrolled.value ? scrolledBg.value : 'transparent',
        border: `1px solid ${isScrolled.value ? outlineColor.value : 'transparent'}`,
        borderRadius: isScrolled.value ? '8px' : '0',
        height: isScrolled.value ? '52px' : '64px',
        top: isScrolled.value ? '16px' : '0',
        marginTop: isScrolled.value ? '16px' : '0',
        paddingLeft: isScrolled.value ? '24px' : '0',
        paddingRight: isScrolled.value ? '24px' : '0',
        boxShadow: isScrolled.value ? '0 2px 16px 0 rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.2s cubic-bezier(.4,0,.2,1)',
      };
  // Add zIndex from prop (default 10)
  return { ...baseStyle, zIndex: props.zIndex ?? 10 };
});

function handleResize() {
  isMobile.value = window.innerWidth < desktopThreshold.value;
  if (!isMobile.value) isMobileMenuOpen.value = false;
}
function handleScroll() {
  if (window.scrollY === 0 && isScrolled.value) {
    isScrolled.value = false;
  } else if (window.scrollY > 8 && !isScrolled.value) {
    isScrolled.value = true;
  }
}
function handleKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toUpperCase() === shortcutKey.value) {
    e.preventDefault();
    if (props.onShortcut) props.onShortcut();
    emit('open-search');
  }
}
function handleRoute(item: RouteItem, closeMobile = false) {
  if (!item.external && item.link) {
    router.push(item.link);
    if (closeMobile) isMobileMenuOpen.value = false;
  } else if (item.external && item.link) {
    window.location.href = item.link;
    if (closeMobile) isMobileMenuOpen.value = false;
  }
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("keydown", handleKeydown, { capture: true });
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("keydown", handleKeydown, { capture: true });
});
</script>

<style scoped>
/* ... your existing CSS, unchanged ... */
.resizable-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: transparent;
  border-bottom: 1px solid transparent;
  position: sticky;
  /* z-index removed from here, now controlled via style binding */
  box-sizing: border-box;
  min-width: 0;
  left: 0;
  right: 0;
  transition: all 0.2s cubic-bezier(.4,0,.2,1);
}
/* ... rest of your CSS ... */
.navbar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  font-size: 1.2rem;
  letter-spacing: 0.02em;
  transition: color 0.2s;
}
.app-name {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #fff;
  transition: color 0.2s;
}
.nav-items {
  display: flex;
  flex: 1 1 0;
  justify-content: center;
  transition: gap 0.2s;
}
.nav-link {
  color: #aaa;
  text-decoration: none;
  font-size: 1rem;
  padding: 8px 18px;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  transition: color 0.3s, background 0.3s, font-size 0.2s;
}
.nav-link:hover{
  background: #23232c;
  color: #fff;
  transition: color 0.3s, background 0.3s, font-size 0.2s;
}
.nav-link .nav-link-text {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: font-size 0.2s;
}
.navbar-search-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #23232c;
  color: #f4f4f5;
  border-radius: 8px;
  border: none;
  outline: 1px solid #403d4d;
  padding: 7px 16px 7px 12px;
  font-size: 1rem;
  cursor: pointer;
  min-width: 210px;
  transition: outline 0.2s, background 0.2s;
  margin-left: auto;
}
.navbar-search-btn:active, .navbar-search-btn:focus {
  outline-width: 2px;
}
.search-placeholder {
  flex: 1;
  text-align: left;
  color: #aaa;
  transition: color 0.3s;
  cursor: pointer;
}
.search-placeholder.hovered {
  color: #fff;
}
.search-shortcut {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: 10px;
  font-size: 14.4px;
  border-radius: 8px;
  padding: 2px 7px;
  outline: 1px solid #403d4d;
  background: #23232c;
  transition: outline 0.2s, background 0.2s;
}
.search-shortcut :deep(svg) {
  border-radius: 6px;
  margin-right: 2px;
}
.search-shortcut span:last-child {
  color: #e4e4e7;
  margin-left: 2px;
}
.mobile-nav-toggle {
  display: none;
}
@media (max-width: 909px) {
  .nav-items {
    display: none !important;
  }
  .navbar-search-btn {
    display: none !important;
  }
  .mobile-nav-toggle {
    display: block;
    margin-left: 0;
    font-size: 2rem;
    color: #f4f4f5;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: color 0.2s;
  }
}
.mobile-nav-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: #111014;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  transition: background 0.2s;
}
.mobile-nav-menu {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 18px 23px 23px 23px;
  z-index: 100;
  animation: fade-in 0.2s;
  background: #111014;
}
.mobile-nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.mobile-nav-close {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  padding: 0 2px;
  transition: color 0.2s;
  display: flex;
  align-items: center;
}
.mobile-nav-close:hover {
  color: #fff;
}
.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.mobile-nav-link {
  padding: 10px;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: background 0.15s;
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: #aaa;
  font-size: 1.1rem;
  text-decoration: none;
}
.mobile-nav-link:hover {
  background: #23232c;
  color: #fff;
}
.navbar-search-btn.mobile {
  display: flex !important;
  width: 100%;
  margin-top: 10px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
