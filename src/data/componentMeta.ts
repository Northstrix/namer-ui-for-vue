export type ComponentMeta = {
  name: string
  route: string
  description: string
  usage: string
  code: Array<{ filename: string, content: string }>
  dependencies?: string
  credit?: string
  previewType?: string
  imageLink?: string
}
export const componentMeta: ComponentMeta[] = [
  {
    name: 'Truncating Navbar',
    route: 'truncating-navbar',
    description: 'A sleek, animated navbar that slides down and increases its padding on scroll, creating a smooth truncating effect.',
    usage: `<template>
  <TruncatingNavbar
    icon="/logo.png"
    appName="Nmr"
    :routes="routes"
    homeRoute="/"
    scrolledBg="#151419"
    mobileBg="#060507"
    outlineColor="#403d4d"
    searchPlaceholderText="Search..."
    shortcutKey="M"
    @open-search="openSearch"
    :zIndex="1"
  />
</template>
<script setup lang="ts">
import TruncatingNavbar from './TruncatingNavbar.vue'
const routes = [
  { name: 'Link', link: 'https://maxim-bortnikov.netlify.app/', external: true }
]
function openSearch() {
  console.log('Fake search bar clciked!')
}
</script>

// Note: The TruncatingNavbar component accepts the following props:
// - icon: string (required) - The logo image URL displayed in the navbar.
// - appName: string (required) - The application name displayed next to the logo.
// - routes: RouteItem[] (required) - Array of navigation items; each item has { name: string; link: string; external?: boolean }.
// - homeRoute: string (optional) - The URL for the logo link (defaults to "/").
// - scrolledBg: string (optional) - Background color of the navbar when scrolled (default: '#151419').
// - outlineColor: string (optional) - Outline color for the lowered and truncated navbar (default: '#403d4d').
// - mobileBg: string (optional) - Background color of the navbar in mobile mode (default: '#111014').
// - shortcutKey: string (optional) - Keyboard shortcut key for opening search (default: Command + 'K').
// - onShortcut: () => void (optional) - Callback triggered when the search shortcut is used.
// - fontSize: string (optional) - Font size for navigation links (default: '0.875rem').
// - desktopThreshold: number (optional) - Window width in px below which the navbar switches to mobile mode (default: 910).
// - searchFontSizeDesktop: string (optional) - Font size for the desktop search bar (default: '1rem').
// - searchFontSizeMobile: string (optional) - Font size for the mobile search bar (default: '0.875rem').
// - searchPlaceholderText: string (optional) - Placeholder text for the search bar (default: 'Search components...').
// - zIndex: number (optional) - z-index for the navbar (default: 10).
//
// Emits:
// - 'open-search' - Emitted when the search button is clicked or the search shortcut is pressed.
//
// Slots: None.
//
// Usage notes:
// - Handles both desktop and mobile navigation layouts automatically based on window width.
// - Supports sticky positioning, scroll-based background, and keyboard shortcut for search.
// - Each route item can be internal (uses vue-router) or external (opens via window.location).
// - The mobile menu can be toggled with a burger icon and closed by clicking outside or the close button.
// - Don't forget to set the value within this line equal to desktopThreshold - 1 for the desktop/mobile switch to work correctly:
//   @media (max-width: 909px) { ... }  // If desktopThreshold is 910, use 909 here.
`,
    code: [
      { filename: 'TruncatingNavbar.vue', content: `<template>
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
        :style="{ outline: \`1px solid \${outlineColor}\`, fontSize: searchFontSizeDesktop }"
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
        <span class="search-shortcut" :style="{ outline: \`1px solid \${outlineColor}\` }">
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
            :style="{ outline: \`1px solid \${outlineColor}\`, fontSize: searchFontSizeMobile }"
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
            <span class="search-shortcut" :style="{ outline: \`1px solid \${outlineColor}\` }">
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
        border: isScrolled.value ? \`1px solid \${outlineColor.value}\` : 'none',
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
        border: \`1px solid \${isScrolled.value ? outlineColor.value : 'transparent'}\`,
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
` },
    ],
    dependencies: `npm install lucide-vue-next`,
    credit: `[Resizable Navbar](https://ui.aceternity.com/components/resizable-navbar) by [Aceternity UI](https://ui.aceternity.com/)`,
    previewType: 'fullwidth',
  },
  {
    name: 'Radio Button',
    route: 'radio-button',
    description: 'A simple component with the radio button logic.',
    usage: `<template>
    <div class="tab-switcher-demo">
      <div class="tab-switcher-container">
        <RadioButtonDemo
          v-model="activeTab"
          :options="tabOptions"
          :active-bg="activeBg"
          :active-fg="activeFg"
          :inactive-bg="inactiveBg"
          :inactive-fg="inactiveFg"
          :hover-bg="hoverBg"
        />
        <div class="tab-switcher-content">
          <template v-if="activeTab === 'home'">
            <h3>Home Tab</h3>
          </template>
          <template v-else-if="activeTab === 'settings'">
            <h3>Settings Tab</h3>
          </template>
          <template v-else-if="activeTab === 'about'">
            <h3>About Tab</h3>
          </template>
        </div>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'
  import { Home, Settings, Info } from 'lucide-vue-next'
  import RadioButtonDemo from './RadioButton.vue'

  const activeTab = ref('home')
  const tabOptions = [
    { value: 'home', label: 'Home', icon: Home },
    { value: 'settings', label: 'Settings', icon: Settings },
    { value: 'about', label: 'About', icon: Info },
  ]

  const activeBg = '#f7f7fa'
  const activeFg = '#24222b'
  const inactiveBg = '#24222b'
  const inactiveFg = '#f7f7fa'
  const hoverBg = '#4776cb'
  </script>

  <style scoped>
  .tab-switcher-demo {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;    /* Center horizontally */
    justify-content: center;/* Center vertically (optional, if you want vertical centering) */
    gap: 14px;
  }

  .tab-switcher-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5em;
  }

  .tab-switcher-container > * {
    width: 100%;
  }

  .tab-switcher-content {
    background: #17161c;
    border-radius: 10px;
    border: 1.5px solid #312f3b;
    padding: 0px 24px;
    min-height: 20px;
    color: #fff;
    font-size: 0.75rem;
    box-sizing: border-box;
  }
  </style>

// Note: The RadioButton component accepts the following props:
// - modelValue: string (required) - The currently selected value (for v-model binding).
// - options: Array<{ value: string; label: string; icon: any }> (required)
//     - value: string - The option's value.
//     - label: string - The option's display label.
//     - icon: any - The icon component to render (e.g., a Lucide or custom Vue icon).
// - activeBg: string (optional) - Background color for the active (selected) button (default: '#393643').
// - activeFg: string (optional) - Text/icon color for the active button (default: '#fff').
// - inactiveBg: string (optional) - Background color for inactive buttons (default: 'none').
// - inactiveFg: string (optional) - Text/icon color for inactive buttons (default: '#aaa').
// - hoverBg: string (optional) - Background color for a button on hover (default: '#23222a').
//
// Emits:
// - update:modelValue (string) - Emitted when the user selects a new option.
//
// Slots: None.
//
// Usage notes:
// - Renders a horizontal row of radio-style buttons, each with an icon and label.
// - The active button is styled with activeBg/activeFg; hovered and inactive states are also customizable.
// - Clicking a button emits 'update:modelValue' with the selected value for v-model support.
// - The icon prop for each option should be a Vue component (e.g., from lucide-vue-next).
// - Designed for modern UI toggle/radio switchers with flexible theming and icon support.
`,
    code: [
      {
        filename: 'RadioButton.vue',
        content: `<template>
    <div class="radio-switcher-row">
      <button
        v-for="option in options"
        :key="option.value"
        class="radio-btn"
        :class="{ active: modelValue === option.value }"
        type="button"
        :aria-label="option.label"
        @click="setActive(option.value)"
        @mouseenter="hovered = option.value"
        @mouseleave="hovered = null"
        :style="buttonStyle(option.value)"
      >
        <span class="radio-icon">
          <component
            :is="option.icon"
            :color="textColor(option.value)"
            :size="20"
            :stroke-width="2"
          />
        </span>
        <span class="radio-label">{{ option.label }}</span>
      </button>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'

  const props = defineProps<{
    modelValue: string
    options: Array<{ value: string; label: string; icon: any }>
    activeBg?: string
    activeFg?: string
    inactiveBg?: string
    inactiveFg?: string
    hoverBg?: string
  }>()
  const emit = defineEmits(['update:modelValue'])

  const hovered = ref<string | null>(null)

  function setActive(value: string) {
    if (props.modelValue !== value) {
      emit('update:modelValue', value)
    }
  }

  function buttonStyle(value: string) {
    const isActive = props.modelValue === value
    const isHovered = hovered.value === value
    let bg
    if (isActive) {
      bg = props.activeBg ?? '#393643'
    } else if (isHovered) {
      bg = props.hoverBg ?? '#23222a'
    } else {
      bg = props.inactiveBg ?? 'none'
    }
    return {
      background: bg,
      color: textColor(value),
    }
  }

  function textColor(value: string) {
    return props.modelValue === value
      ? props.activeFg ?? '#fff'
      : props.inactiveFg ?? '#aaa'
  }
  </script>

  <style scoped>
  .radio-switcher-row {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 0;
    margin-top: 18px;
    gap: 14px;
  }
  .radio-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 20px;
    height: 40px;
    border: none;
    border-radius: 8px;
    font-size: 1.09rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.18s, color 0.18s;
    outline: none;
    user-select: none;
    margin: 0;
    background: none;
  }
  .radio-icon svg {
    display: block;
    width: 20px;
    height: 20px;
  }
  .radio-label {
    display: inline-block;
    vertical-align: middle;
  }
  </style>
  ` }
    ],
    dependencies: `npm install lucide-vue-next`,
    credit: ``,
    previewType: 'center',
  },
  {
    name: 'Code Block',
    route: 'code-block',
    description: 'A clean code block component that shows the formatted text with the line numbers.',
    usage: `<template>
    <CodeblockDemo :code="sampleCode" filename="code.ts" />
  </template>

  <script setup lang="ts">
  import CodeblockDemo from './CodeBlock.vue'

  const sampleCode = \`if (string === "js")
      break;
  \`
  </script>

  // Note: The CodeBlock component accepts the following props:
  // - code: string (required) - The code content to display in the code block.
  // - filename: string (required) - The filename to display in the code block header.
  // - codePadding: string (optional) - Padding for the code area (default: '18px 18px 0 62px').
  // - lineNumberXShift: string (optional) - Horizontal shift (translateX) for the line numbers (default: '4px').
  // - filenameColor: string (optional) - Color of the filename text (default: '#fff').
  // - backgroundColor: string (optional) - Background color of the code block (default: '#17161c').
  // - borderColor: string (optional) - Border color of the code block (default: '#312f3b').
  // - borderRadius: string (optional) - Border radius of the code block (default: '8px').
  // - lineNumberColor: string (optional) - Foreground color of the line numbers (default: '#999').
  // - codeTextColor: string (optional) - Foreground color of the code text (default: '#d4d4d4').
  //
  // Usage notes:
  // - All style-related props are optional; omit them to use the default theme.
  // - The component automatically escapes HTML characters in the code to prevent rendering issues.
  // - The number of lines adjusts automatically based on the code content.
  // - The filename is shown in the header if provided.
  `,
    code: [
      {
        filename: 'CodeBlock.vue',
        content: `<template>
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
            width: \`calc(\${lineNumberXShift} + 36px)\`,
            background: backgroundColor,
          }"
        ></div>
        <div
          class="codeblock-linenumbers"
          aria-hidden="true"
          :style="{
            color: lineNumberColor,
            transform: \`translateX(\${lineNumberXShift})\`,
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
  ` }
    ],
    dependencies: ``,
    credit: `[Code Block](https://ui.aceternity.com/components/code-block) by [Aceternity UI](https://ui.aceternity.com/)`,
    previewType: 'center',
  },
  {
    name: 'Halomot Button',
    route: 'halomot-button',
    description: 'A stylish button with a vibrant gradient that fills it on hover.',
    usage: `<template>
    <HalomotButton
      inscription="GitHub"
      :icon="GithubIcon"
      :onClick="onGithubClick"
      gradient="linear-gradient(135deg, #a123f4, #603dec)"
      borderWidth="1px"
      outerBorderRadius="6.34px"
      innerBorderRadius="6px"
      href="https://github.com/Northstrix"
      padding="1rem 4rem"
    />
</template>

<script setup lang="ts">
import HalomotButton from './HalomotButton.vue'
import { Github } from 'lucide-vue-next'

const GithubIcon = Github

function onGithubClick() {
  console.log('Halomot button clicked!')
}
</script>

<style scoped>
</style>

// Note: The HalomotButton component accepts the following props:
// - inscription: string (required) - The text to display on the button.
// - onClick: () => void (required) - Function to call when the button is clicked.
// - gradient: string (optional) - CSS gradient for the outer border/background (default: 'linear-gradient(135deg, #4776cb, #a19fe5, #6cc606)').
// - backgroundColor: string (optional) - Solid color for the inner button background (default: '#000').
// - borderWidth: string (optional) - Thickness of the gradient border (default: '1px').
// - outerBorderRadius: string (optional) - Border radius for the outer (gradient) border (default: '6.34px').
// - innerBorderRadius: string (optional) - Border radius for the inner button (default: '6px').
// - padding: string (optional) - Custom padding for the inner button (default: '1rem 4rem'; for fillWidth/fixedWidth: '1rem 0').
// - icon: Vue component (optional) - Icon to display at the start of the button text.
// - fillWidth: boolean (optional) - If true, the button stretches to fill its container's width.
// - fixedWidth: string (optional) - If set, the button will have a fixed width (e.g., '200px').
// - href: string (optional) - If set, the button will render as an anchor tag but will not navigate, only trigger the callback.
// - textColor: string (optional) - Text color for the button (default: '#fff').
// - hoverTextColor: string (optional) - Text color to use when the button is hovered (default: textColor).
//
// Usage notes:
// - When href is set, the button renders as an <a> element for accessibility but never navigates; clicking always triggers the callback.
// - All style-related props are optional; omit them to use the default theme.
// - Animated gradient border and smooth hover fill effect.
// - Supports both fixed and fill width modes, and optional icon slot.
// - Fully themeable and accessible.
`,
    code: [
      {
        filename: 'HalomotButton.vue',
        content: `<template>
  <div v-if="fixedWidth" :style="{ width: fixedWidth, display: 'inline-block' }">
    <a
      :href="href"
      class="halomot-btn"
      :style="outerStyle"
      @click.prevent="handleClick"
      role="button"
      tabindex="0"
      rel="noopener"
    >
      <span
        class="halomot-btn-inner"
        :style="innerStyle"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <component
          v-if="icon"
          :is="icon"
          class="halomot-btn-icon"
        />
        <span v-if="inscription">{{ inscription }}</span>
      </span>
    </a>
  </div>
  <a
    v-else
    :href="href"
    class="halomot-btn"
    :style="outerStyle"
    @click.prevent="handleClick"
    role="button"
    tabindex="0"
    rel="noopener"
  >
    <span
      class="halomot-btn-inner"
      :style="innerStyle"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <component
        v-if="icon"
        :is="icon"
        class="halomot-btn-icon"
      />
      <span v-if="inscription">{{ inscription }}</span>
    </span>
  </a>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from "vue";

const props = defineProps<{
  gradient?: string;
  inscription: string;
  onClick: () => void;
  fillWidth?: boolean;
  fixedWidth?: string;
  href?: string;
  backgroundColor?: string;
  icon?: any; // Should be a Vue component, e.g., <GithubIcon />
  borderWidth?: string;
  padding?: string;
  outerBorderRadius?: string;
  innerBorderRadius?: string;
  textColor?: string;
  hoverTextColor?: string;
}>();

const isHovered = ref(false);

const gradient = computed(() => props.gradient ?? "linear-gradient(135deg, #4776cb, #a19fe5, #6cc606)");
const borderWidth = computed(() => props.borderWidth ?? "1px");
const outerBorderRadius = computed(() => props.outerBorderRadius ?? "6.34px");
const innerBorderRadius = computed(() => props.innerBorderRadius ?? "6px");
const backgroundColor = computed(() => props.backgroundColor ?? "#000");
const textColor = computed(() => props.textColor ?? "#fff");
const hoverTextColor = computed(() => props.hoverTextColor ?? textColor.value);
const fillWidth = computed(() => props.fillWidth ?? false);
const padding = computed(() =>
  props.padding
    ? props.padding
    : (fillWidth.value || props.fixedWidth ? "1rem 0" : "1rem 4rem")
);

const outerStyle = computed(() => ({
  margin: fillWidth.value || props.fixedWidth ? "0" : "auto",
  padding: borderWidth.value,
  background: gradient.value,
  border: "0",
  borderRadius: outerBorderRadius.value,
  color: textColor.value,
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textDecoration: "none",
  userSelect: "none",
  whiteSpace: "nowrap",
  transition: "all .3s",
  width: fillWidth.value || props.fixedWidth ? "100%" : "fit-content",
  flexDirection: "row",
  boxSizing: "border-box" as const,
  cursor: "pointer",
}));

const innerStyle = computed(() => ({
  background: isHovered.value ? "none" : backgroundColor.value,
  padding: padding.value,
  border: "0",
  borderRadius: innerBorderRadius.value,
  width: "100%",
  height: "100%",
  transition: hoverTextColor.value
    ? "color 0.3s, background 300ms"
    : "background 300ms",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  color: isHovered.value ? hoverTextColor.value : textColor.value,
  whiteSpace: "nowrap",
  fontSize: "1rem",
  gap: props.icon ? "0.5em" : 0,
  flexDirection: "row",
  boxSizing: "border-box" as const,
  cursor: "pointer",
}));

function onMouseEnter() {
  isHovered.value = true;
}
function onMouseLeave() {
  isHovered.value = false;
}
function handleClick(e: Event) {
  // Prevent navigation and only call the callback
  props.onClick();
}
</script>

<style scoped>
.halomot-btn {
  outline: none;
  background: none;
  box-shadow: none;
}
.halomot-btn-inner {
  outline: none;
  box-shadow: none;
  transition: background 0.3s, color 0.3s;
}
.halomot-btn-icon {
  display: inline-flex;
  align-items: center;
  height: 1em;
  width: 1em;
  font-size: 1.1em;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
` }
    ],
    dependencies: `npm install lucide-vue-next`,
    credit: `[BUTTONS](https://codepen.io/uchihaclan/pen/NWOyRWy) by [TAYLOR](https://codepen.io/uchihaclan)`,
    previewType: 'center',
  },
  {
    name: 'Chronicle Button',
    route: 'chronicle-button',
    description: 'A button with a unique hover effect.',
    usage: `<template>
  <ChronicleButton
    text="Hover Me"
    @click="() => console.log('Chronicle button clicked!')"
  />
</template>

<script setup lang="ts">
import ChronicleButton from './ChronicleButton.vue'
</script>

// Note: The ChronicleButton component accepts the following props:
// - text: string (required) - The text to display on the button.
// - onClick: () => void (optional) - Function to call when the button is clicked.
// - hoverColor: string (optional) - Text color on hover (default: '#1a1a24').
// - hoverBackground: string (optional) - Background color on hover (default: '#a594fd').
// - width: string (optional) - Button width (default: '160px').
// - outlined: boolean (optional) - If true, renders the button in outlined style.
// - outlinePaddingAdjustment: string (optional) - Adjusts padding for outlined style (default: '2px').
// - borderRadius: string (optional) - Border radius of the button (default: '0.76rem').
// - outlinedButtonBackgroundOnHover: string (optional) - Background color for outlined button on hover (default: 'transparent').
// - customBackground: string (optional) - Custom background color for the button (default: '#f0f0f1').
// - customForeground: string (optional) - Custom text color for the button (default: '#1a1a24').
// - fontSize: string (optional) - Font size for the button text (default: '1.025rem').
// - padding: string (optional) - Padding for the button (default: '1rem 1.232rem' for filled, 'calc(1rem - 2px) 0' for outlined).
//
// Usage notes:
// - The button features a 3D animated flip effect on hover using two stacked text layers.
// - Supports both filled and outlined variants for flexible styling.
// - All style-related props are optional; omit them to use the default theme.
  `,
    code: [
      {
        filename: 'ChronicleButton.vue',
        content: `<template>
  <button
    class="chronicleButton"
    :class="{ outlined }"
    :style="buttonStyle"
    @click="onClick"
  >
    <span v-if="!outlined" class="chronicleButton-inner">
      <span><em>{{ text }}</em></span>
      <span><em>{{ text }}</em></span>
    </span>
    <span v-else class="chronicleButton-outlined-inner">
      <em>{{ text }}</em>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
  text: string
  onClick?: () => void
  hoverColor?: string
  hoverBackground?: string
  width?: string
  outlined?: boolean
  outlinePaddingAdjustment?: string
  borderRadius?: string
  outlinedButtonBackgroundOnHover?: string
  customBackground?: string
  customForeground?: string
  fontSize?: string
  padding?: string
}>()

const buttonStyle = computed(() => ({
  '--hover-color': props.hoverColor ?? '#1a1a24',
  '--hover-bg': props.hoverBackground ?? '#a594fd',
  '--text-color': props.outlined
    ? (props.customBackground ?? '#2d76f9')
    : (props.customForeground ?? '#1a1a24'),
  '--outline-padding-adjustment': props.outlinePaddingAdjustment ?? '2px',
  '--outlined-button-background-on-hover': props.outlinedButtonBackgroundOnHover ?? 'transparent',
  '--chronicle-button-background': props.customBackground ?? '#f0f0f1',
  '--chronicle-button-foreground': props.customForeground ?? '#1a1a24',
  '--chronicle-button-font-size': props.fontSize ?? '1.025rem',
  '--chronicle-button-padding': props.padding ?? '1rem 1.232rem', // <-- new variable
  width: props.width ?? '160px',
  borderRadius: props.borderRadius ?? '0.76rem',
}))
</script>

<style scoped>
.chronicleButton {
  border-radius: var(--chronicle-button-border-radius, 0.76rem);
  background: var(--chronicle-button-background, #f0f0f1);
  color: var(--chronicle-button-foreground, #1a1a24);
  font-weight: 700;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  line-height: 1;
  padding: var(--chronicle-button-padding, 1rem 1.232rem); /* <-- use padding variable */
  transition: background 0.3s linear, color 0.3s linear;
  will-change: background, color;
  position: relative;
  width: var(--chronicle-button-width, auto);
}

/* --- Filled variant (default) --- */
.chronicleButton:not(.outlined):hover {
  background: var(--hover-bg, #fff);
  color: var(--hover-color, #a594fd);
}
.chronicleButton-inner {
  position: relative;
  display: block;
  width: 100%;
  height: 1.3em;
  min-height: 1.3em;
}
.chronicleButton-inner span {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  perspective: 108px;
  pointer-events: none;
}
.chronicleButton-inner span:nth-of-type(1) { z-index: 2; }
.chronicleButton-inner span:nth-of-type(2) { z-index: 1; }
.chronicleButton em {
  font-style: normal;
  display: inline-block;
  font-size: var(--chronicle-button-font-size, 1.025rem);
  color: var(--text-color, #1a1a24);
  will-change: transform, opacity, transition, color;
  transition: transform 0.55s cubic-bezier(.645,.045,.355,1), opacity 0.35s linear 0.2s, color 0.3s linear;
  width: 100%;
  text-align: center;
  line-height: 1.3;
}
.chronicleButton-inner span:nth-of-type(1) em { transform-origin: top; }
.chronicleButton-inner span:nth-of-type(2) em {
  opacity: 0;
  transform: rotateX(-90deg) scaleX(.9) translate3d(0,10px,0);
  transform-origin: bottom;
}
.chronicleButton:not(.outlined):hover .chronicleButton-inner span:nth-of-type(1) em {
  opacity: 0;
  transform: rotateX(90deg) scaleX(.9) translate3d(0,-10px,0);
  color: var(--hover-color, #a594fd);
}
.chronicleButton:not(.outlined):hover .chronicleButton-inner span:nth-of-type(2) em {
  opacity: 1;
  transform: rotateX(0deg) scaleX(1) translateZ(0);
  color: var(--hover-color, #a594fd);
  transition: transform 0.75s cubic-bezier(.645,.045,.355,1), opacity 0.35s linear 0.3s, color 0.3s linear;
}

/* --- Outlined variant --- */
.chronicleButton.outlined {
  background: transparent;
  border: 2px solid var(--chronicle-button-background, #2d76f9);
  color: var(--chronicle-button-background, #2d76f9);
  padding: var(--chronicle-button-padding, calc(1rem - var(--outline-padding-adjustment, 2px)) 0); /* <-- use padding variable */
  transition: border 0.3s linear, color 0.3s linear, background-color 0.3s linear;
  will-change: border, color, background;
}
.chronicleButton-outlined-inner {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chronicleButton.outlined em {
  font-style: normal;
  font-size: var(--chronicle-button-font-size, 1.025rem);
  color: var(--text-color, #2d76f9);
  width: 100%;
  text-align: center;
  line-height: 1.3;
  transition: color 0.3s linear;
}
.chronicleButton.outlined:hover {
  background: var(--outlined-button-background-on-hover, transparent);
  border-color: var(--hover-color, #a594fd);
  color: var(--hover-color, #a594fd);
}
.chronicleButton.outlined:hover em {
  color: var(--hover-color, #a594fd);
  transition: color 0.3s linear;
}
</style>
` }
    ],
    dependencies: ``,
    credit: `[Chronicle Button](https://codepen.io/Haaguitos/pen/OJrVZdJ) by [Haaguitos](https://codepen.io/Haaguitos)`,
    previewType: 'center',
  },
  {
    name: 'Inflected Card',
    route: 'inflected-card',
    description: 'A versatile card component with an unorthodox image card shape.',
    usage: `<template>
  <div class="inflected-demo-root">
    <!-- Visible centered inscription above disclaimer -->
    <div class="inflected-demo-inscription">
      This component is also available on
      <a
        href="https://21st.dev/maxim.bort.devel/inflected-card"
        target="_blank"
        rel="noopener noreferrer"
        >21st.dev</a
      >
    </div>

    <div class="inflected-demo-disclaimer">
      <strong>Disclaimer:</strong> This product card is a conceptual design prototype created
      for demonstrative and educational purposes only. All product names, logos, brand
      identifiers, and trademarks displayed here are the sole property of their respective
      owners. Product details, images, and descriptions are used for illustrative purposes
      and do not represent actual commercial offerings. Namer UI is not affiliated with,
      endorsed by, or sponsored by any of the companies whose products are showcased. This
      website does not present a commercial offer of any kind. Any resemblance to existing
      product(s) is entirely coincidental.
    </div>

    <!-- Original dark-themed cards container -->
    <div class="inflected-demo-cards">
      <InflectedCard
        id="0"
        image="https://images.pexels.com/photos/18525574/pexels-photo-18525574/free-photo-of-unboxing-iphone-15-pro-max-box-in-natural-titanium-color-mention-zana_qaradaghy-on-instagram-while-use-this-photo-follow-on-instagram-zana_qaradaghy.jpeg"
        title="iPhone 15 Pro"
        description="Titanium smartphone with an advanced camera system, offering stunning photography capabilities and a sleek design."
        :tags="[
          { name: 'Brand new', textColor: '#f7f7ff', backgroundColor: '#9F4EFF', rounding: 5 },
          { name: '10% off', textColor: '#242424', backgroundColor: '#f1f1f7', rounding: 5 }
        ]"
        parentBackgroundColor="#060507"
        :onClick="handleCardClick"
        :onHover="handleCardHover"
        :cardRounding="15"
        :fontSizes="{ title: '1.8rem', description: '1rem', tags: '0.85rem', price: '0.84rem' }"
        :margins="{ title: '0 0 7px 0', description: '0 0 18px 0', tags: '10px 0 0 0' }"
        :buttonIcon="CornerRightUp"
        :buttonIconSize="32"
        buttonIconColor="#ffffff"
        buttonIconHoverColor="#EEEEEE"
        buttonBackgroundColor="#9F4EFF"
        buttonBackgroundHoverColor="#a960ff"
        maxWidth="500px"
        :imageHoverZoom="1.1"
        price="$1,079"
        priceTagTextColor="#f7f7ff"
        oldPrice="$1,199"
        priceTagRounding="25px"
      />
      <!-- Add other cards similarly with unique ids and props -->
      <!-- Samsung Galaxy Flip 6 -->
      <InflectedCard
        id="1"
        image="https://images.unsplash.com/photo-1721864428881-dbabb9ea0017?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Samsung Galaxy Flip 6"
        description="Innovative foldable smartphone with a sleek design that enhances portability while providing a large display for immersive viewing experiences and multitasking."
        :tags="[
          { name: 'Pre-owned', textColor: '#f7f7ff', backgroundColor: '#00A6FB', rounding: 0 },
          { name: '50% off', textColor: '#242424', backgroundColor: '#f1f1f7', rounding: 0 }
        ]"
        parentBackgroundColor="#060507"
        :onClick="handleCardClick"
        :onHover="handleCardHover"
        :cardRounding="15"
        :fontSizes="{ title: '1.8rem', description: '1rem', tags: '0.85rem', price: '1.12rem' }"
        :margins="{ title: '0 0 7px 0', description: '0 0 18px 0', tags: '10px 0 0 0' }"
        :buttonIcon="FoldVertical"
        :buttonIconSize="32"
        buttonIconColor="#ffffff"
        buttonIconHoverColor="#EEEEEE"
        buttonBackgroundColor="#00A6FB"
        buttonBackgroundHoverColor="#0582CA"
        maxWidth="500px"
        :imageHoverZoom="1.1"
        price="$499"
        priceTagTextColor="#050505"
        oldPrice="$991"
        oldPriceTextColor="#565656"
        priceTagRounding="6px"
        priceTagBackgroundColor="rgba(255,255,255,0.78)"
      />
      <!-- iPhone 7 -->
      <InflectedCard
        id="2"
        image="https://images.unsplash.com/photo-1514473776127-61e2dc1dded3?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="iPhone 7"
        description="Classic iPhone model with 12MP camera and water resistance, offering reliable performance and essential features for everyday smartphone users."
        :tags="[
          { name: 'Refurbished', textColor: '#f7f7ff', backgroundColor: '#FF3900', rounding: 5 },
          { name: '20% off', textColor: '#242424', backgroundColor: '#f1f1f7', rounding: 5 }
        ]"
        parentBackgroundColor="#060507"
        :onClick="handleCardClick"
        :onHover="handleCardHover"
        :cardRounding="14"
        :fontSizes="{ title: '1.8rem', description: '1rem', tags: '0.85rem', price: '1.12rem' }"
        :margins="{ title: '0 0 7px 0', description: '0 0 18px 0', tags: '10px 0 0 0' }"
        :buttonIcon="CornerRightUp"
        :buttonIconSize="32"
        buttonIconColor="#ffffff"
        buttonIconHoverColor="#EEEEEE"
        buttonBackgroundColor="#FF3900"
        buttonBackgroundHoverColor="#FF5733"
        maxWidth="392px"
        :imageHoverZoom="1.35"
        price="$159"
        priceTagRounding="25px"
        priceTagBackgroundColor="#FF3900"
      />
      <!-- iPhone X (Hebrew, mirrored, RTL) -->
      <InflectedCard
        id="3"
        image="https://images.unsplash.com/photo-1511296933631-18b1a062212c?q=80&w=2436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="iPhone X"
        description="סמארטפון אייקוני עם תצוגת Super Retina בגודל 5.8 אינץ', טכנולוגיית Face ID מתקדמת, מצלמות כפולות של 12MP ועיצוב חדשני שמהפכני בצילום הסלולרי."
        :tags="[
          { name: '40% הנחה', textColor: '#242424', backgroundColor: '#f1f1f7', rounding: 15 },
          { name: 'משומש', textColor: '#f7f7ff', backgroundColor: '#00A6FB', rounding: 15 }
        ]"
        parentBackgroundColor="#060507"
        :onClick="handleCardClick"
        :onHover="handleCardHover"
        :cardRounding="36"
        :fontSizes="{ title: '1.8rem', description: '1rem', tags: '0.85rem', price: '1.12rem' }"
        :margins="{ title: '0 0 7px 0', description: '0 0 18px 0', tags: '10px 0 0 0' }"
        :buttonIcon="CornerRightUp"
        :buttonIconSize="32"
        buttonIconColor="#ffffff"
        buttonIconHoverColor="#EEEEEE"
        buttonBackgroundColor="#00A6FB"
        buttonBackgroundHoverColor="#0582CA"
        maxWidth="330px"
        :imageHoverZoom="1.81"
        price="₪599"
        priceTagTextColor="#f7f7ff"
        oldPrice="₪991"
        oldPriceOnTheRight
        priceTagRounding="25px"
        mirrored
        tagsAlignment="right"
        titleAlignment="center"
        descriptionAlignment="right"
      />
      <!-- Light-themed cards container -->
      <div class="inflected-demo-cards light-container">
        <InflectedCard
          id="4"
          image="https://images.pexels.com/photos/18525574/pexels-photo-18525574/free-photo-of-unboxing-iphone-15-pro-max-box-in-natural-titanium-color-mention-zana_qaradaghy-on-instagram-while-use-this-photo-follow-on-instagram-zana_qaradaghy.jpeg"
          title="iPhone 15 Pro"
          description="Titanium smartphone with an advanced camera system, offering stunning photography capabilities and a sleek design."
          :tags="[
            { name: 'Brand new', textColor: '#181818', backgroundColor: '#E0C3FC', rounding: 5 },
            { name: '10% off', textColor: '#f7f7ff', backgroundColor: '#b49ad7', rounding: 5 }
          ]"
          parentBackgroundColor="#f8f8fa"
          :onClick="handleCardClick"
          :onHover="handleCardHover"
          :cardRounding="15"
          :fontSizes="{ title: '1.8rem', description: '1rem', tags: '0.85rem', price: '0.84rem' }"
          :margins="{ title: '0 0 7px 0', description: '0 0 18px 0', tags: '10px 0 0 0' }"
          :buttonIcon="CircleFadingArrowUp"
          :buttonIconSize="32"
          buttonIconColor="#181818"
          buttonIconHoverColor="#fff"
          buttonBackgroundColor="#E0C3FC"
          buttonBackgroundHoverColor="#bca1e7"
          maxWidth="500px"
          price="$1,079"
          priceTagTextColor="#222"
          oldPriceTextColor="#555"
          oldPrice="$1,199"
          priceTagRounding="25px"
          priceTagBackgroundColor="#f5e6ff"
          titleColor="#181818"
          descriptionColor="#565656"
          titleAlignment="center"
          descriptionAlignment="center"
          tagsAlignment="center"
          :tagHoverBrightness="0.9"
        />
        <InflectedCard
          id="5"
          image="https://images.unsplash.com/photo-1721864428881-dbabb9ea0017?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="סמסונג גלקסי פליפ 6"
          description="טלפון מתקפל חדשני עם עיצוב דקיק, תצוגה גדולה, ומאפשר חוויית צפייה וסביבת עבודה מרובת משימות."
          :tags="[
            { name: 'יד שניה', textColor: '#181818', backgroundColor: '#A2F9B8', rounding: 0 },
            { name: '50% הנחה', textColor: '#181818', backgroundColor: '#6ccf8f', rounding: 0 }
          ]"
          parentBackgroundColor="#f8f8fa"
          :onClick="handleCardClick"
          :onHover="handleCardHover"
          :cardRounding="15"
          :fontSizes="{ title: '1.8rem', description: '1rem', tags: '0.85rem', price: '1.12rem' }"
          :margins="{ title: '0 0 7px 0', description: '0 0 18px 0', tags: '10px 0 0 0' }"
          :buttonIcon="FoldVertical"
          :buttonIconSize="32"
          buttonIconColor="#181818"
          buttonIconHoverColor="#fff"
          buttonBackgroundColor="#A2F9B8"
          buttonBackgroundHoverColor="#7ee6a2"
          maxWidth="500px"
          price="₪1,499"
          priceTagTextColor="#181818"
          oldPrice="₪2,999"
          oldPriceTextColor="#565656"
          oldPriceOnTheRight
          priceTagRounding="6px"
          priceTagBackgroundColor="#e1fbe6"
          titleColor="#181818"
          descriptionColor="#565656"
          mirrored
          titleAlignment="right"
          descriptionAlignment="right"
          tagsAlignment="right"
          :imageContainerHeight="'23.2rem'"
          :tagHoverBrightness="1.2"
          :descriptionLineClamp="1"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InflectedCard from './InflectedCard.vue'
import { CornerRightUp, FoldVertical, CircleFadingArrowUp } from 'lucide-vue-next'

interface HoverInfo {
  part: string
  extra?: Record<string, unknown> | null
  isHovered: boolean
}
interface ClickInfo {
  part: string
  extra?: Record<string, unknown> | null
}

function handleCardHover(info: HoverInfo | null, id: string) {
  if (info && info.isHovered) {
    let partName = info.part
    if (partName === 'tag' && info.extra?.name) {
      partName += \` (\${String(info.extra.name)})\`
    }
    const msg = \`Hovered \${partName} on card \${id}\`
    // No toast, just console log
    console.log(msg)
  } else if (info && !info.isHovered) {
    let partName = info.part
    if (partName === 'tag' && info.extra?.name) {
      partName += \` (\${String(info.extra.name)})\`
    }
    console.log(\`Unhovered \${partName} on card \${id}\`)
  } else {
    console.log(\`No part hovered on card \${id}\`)
  }
}

function handleCardClick(info: ClickInfo | null, id: string) {
  if (!info) return
  let partName = info.part
  if (partName === 'tag' && info.extra?.name) {
    partName += \` (\${String(info.extra.name)})\`
  }
  const msg = \`Clicked \${partName} on card \${id}\`
  // No toast, just console log
  console.log(msg)
}
</script>

<style scoped>
.inflected-demo-root {
  background: #060507;
  min-height: 100vh;
  padding: 0;
}

/* Added inscription styles only */
.inflected-demo-inscription {
  color: #fff;
  font-weight: 600;
  font-size: 1.75rem;
  text-align: center;
  margin: 1.5rem 0 1.5rem 0;
}

.inflected-demo-inscription a {
  color: #fff;
  text-decoration: underline;
}

.inflected-demo-cards {
  min-height: 300px;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 2rem;
}

.light-container {
  background-color: #f8f8fa;
  border-radius: 8px;
  padding: 2rem 1.5rem;
  margin-top: 2.5rem;
  box-sizing: border-box;
}

.inflected-demo-disclaimer {
  max-width: 900px;
  margin: 0.5rem auto 1.5rem auto;
  color: #bdbdbd;
  font-size: 0.98rem;
  background: rgba(20, 22, 24, 0.85);
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
  line-height: 1.7;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
}

.inflected-demo-disclaimer strong {
  color: #fff;
  font-weight: bold;
}

</style>

// Note: The InflectedCard component accepts the following props:
// - id: string (required) - Unique identifier for the card.
// - image: string (required) - URL of the product image to display.
// - title: string (required) - Title or name of the product.
// - description: string (required) - Detailed description text of the product.
// - tags: Array<Tag> (required) - Array of tag objects. Each tag includes:
//    { name: string; textColor: string; backgroundColor: string; rounding?: number; alignment?: 'left' | 'center' | 'right' }
// - parentBackgroundColor: string (required) - Background color of the card container.
// - onClick?: (info: { part: string; extra?: any }, id: string) => void - Optional callback triggered on clicks.
//    Receives info object containing the "part" clicked (e.g., "card", "image", "button", "title", "description", "tag", "priceTag")
//    and optional extra data (e.g., tag object when "tag" clicked), and the card id.
// - onHover?: (info: { part: string; extra?: any; isHovered: boolean } | null, id: string) => void - Optional callback for hover events.
//    info.part is the hovered part name, extra is additional data (tag object for tags), and isHovered indicates hover start/end.
//    A null info indicates all hover left (no part hovered).
// - cardRounding?: number - Border radius for rounded corners in px, default 20.
// - fontSizes?: { title?: string; description?: string; tags?: string; price?: string } - Font sizes for text elements. Example: { title: "1.8rem", description: "1rem", tags: "0.85rem", price: "1rem" }
// - margins?: { title?: string; description?: string; tags?: string } - Margin CSS for text elements.
// - buttonIcon: Vue component (required) - Icon component to be displayed inside the action button.
// - buttonIconSize?: number - Icon size in pixels, default 24.
// - buttonIconColor?: string - Icon color when not hovered, default "#fff".
// - buttonIconHoverColor?: string - Icon color on hover, default "#fff".
// - buttonBackgroundColor?: string - Background color of the button, default "#282828".
// - buttonBackgroundHoverColor?: string - Background color of the button on hover, default "#484848".
// - imageHoverZoom?: number - Multiplicative zoom factor on image and price tag hover, default 1.1.
// - imageContainerHeight?: string - CSS height of the image container, e.g. "18.75rem", default "18.75rem".
// - titleColor?: string - Color of the title text, default "#f7f7ff".
// - descriptionColor?: string - Color of the description text, default "#c7c7cf".
// - mirrored?: boolean - If true, horizontally flips the entire card layout, useful for RTL languages, default false.
// - titleAlignment?: "left" | "center" | "right" - Text alignment for the title, default "left".
// - descriptionAlignment?: "left" | "center" | "right" - Text alignment for the description, default "left".
// - tagsAlignment?: "left" | "center" | "right" - Alignment for the tags container, default "left".
// - maxWidth?: string - CSS max-width of the card, default "100%".
// - price?: string - Optional price string to display on the card.
// - priceTagTextColor?: string - Text color of the price tag, default "#ffffff".
// - oldPrice?: string - Optional old price string to display as strikethrough.
// - oldPriceOnRight?: boolean - If true, old price is placed to right of new price, else left, default false.
// - oldPriceTextColor?: string - Text color of old price, default "#c1c1c7".
// - priceTagRounding?: string - CSS border-radius of the price tag container, default "5px".
// - priceTagBackgroundColor?: string - Background color of the price tag container, default "rgba(0,0,0,0.7)".
// - oldPriceTextColor?: string - Text color of the old price, default "#c1c1c7".
// - oldPriceOnRight?: boolean - Whether to show old price right of new price, default false.
// - oldPriceTextColor?: string - Color of old price text, default "#c1c1c7".
// - tagHoverBrightness?: number - Number controlling brightness filter for tags on hover:
//     The CSS filter \`brightness()\` function is used with value between roughly 0.1 (dark) and 1.9 (bright).
//     Example: 0.8 results in filter \`brightness(0.8)\` (darker), 1.2 results in \`brightness(1.2)\` (lighter).
//     Default is 0.8 (slightly darken on hover).
// - titleLineClamp?: number - Optional number of lines to clamp title text.
// - descriptionLineClamp?: number - Optional number of lines to clamp description text.
//
// Emits: none (interaction callbacks via props).
//
// Slots: none.
`,
    code: [
      {
        filename: 'InflectedCard.vue',
        content: `<template>
  <div
    class="inflected-card"
    :style="{
      '--card-rounding': cardRounding + 'px',
      maxWidth: maxWidth,
      transform: mirrored ? 'scaleX(-1)' : undefined,
      '--tag-brightness': computedTagBrightness
    }"
    @click="handleClick('card')"
    @mouseenter="handleMouseEnter('card')"
    @mouseleave="handleMouseLeave('card')"
  >
    <div class="inflected-cardInner" :style="{ '--parent-bg': parentBackgroundColor }">
      <div class="inflected-box">
        <div
          class="inflected-imgBox"
          :style="{
            height: imageContainerHeight,
            borderRadius: cardRounding + 'px',
            overflow: 'hidden',
            width: '100%',
            position: 'relative',
            transform: mirrored ? 'scaleX(-1)' : undefined
          }"
          @mouseenter="handleMouseEnter('image')"
          @mouseleave="handleMouseLeave('image')"
          @click.stop="handleClick('image')"
          ref="imageContainer"
        >
          <img
            :src="image"
            :alt="title"
            draggable="false"
            class="inflected-image"
            :style="{
              transform: isImageHovered ? \`scale(\${imageHoverZoom})\` : 'scale(1)'
            }"
          />
          <div
            v-if="price"
            class="inflected-priceTag"
            :style="priceTagStyle"
            @mouseenter="handleMouseEnter('priceTag')"
            @mouseleave="handleMouseLeave('priceTag')"
            @click.stop="handleClick('priceTag')"
          >
            <template v-if="oldPriceOnTheRight">
              <span class="inflected-new-price">{{ price }}</span>
              <span
                v-if="oldPrice"
                class="inflected-old-price"
                :style="{ color: oldPriceTextColor, marginLeft: oldNewPriceGap + 'px' }"
              >
                {{ oldPrice }}
              </span>
            </template>
            <template v-else>
              <span
                v-if="oldPrice"
                class="inflected-old-price"
                :style="{ color: oldPriceTextColor, marginRight: oldNewPriceGap + 'px' }"
              >
                {{ oldPrice }}
              </span>
              <span class="inflected-new-price">{{ price }}</span>
            </template>
          </div>
        </div>
        <div
          class="inflected-icon"
          @mouseenter="handleMouseEnter('button')"
          @mouseleave="handleMouseLeave('button')"
        >
          <a
            href="javascript:void(0)"
            class="inflected-iconBox"
            :style="buttonBoxStyle"
            @click.stop="handleClick('button')"
          >
            <component
              :is="buttonIcon"
              :size="buttonIconSize"
              :color="isButtonHovered ? buttonIconHoverColor : buttonIconColor"
            />
          </a>
        </div>
      </div>
    </div>
    <div
      class="inflected-content"
      :style="{ transform: mirrored ? 'scaleX(-1)' : undefined }"
    >
      <h3
        :style="titleStyle"
        @mouseenter="handleMouseEnter('title')"
        @mouseleave="handleMouseLeave('title')"
        @click.stop="handleClick('title')"
      >
        {{ title }}
      </h3>
      <p
        :style="descriptionStyle"
        @mouseenter="handleMouseEnter('description')"
        @mouseleave="handleMouseLeave('description')"
        @click.stop="handleClick('description')"
      >
        {{ description }}
      </p>
      <ul
        class="tag-list"
        :style="{
          margin: margins.tags,
          justifyContent: tagsAlignment,
          direction: mirrored ? 'rtl' : 'ltr'
        }"
      >
        <li
          v-for="(tag, index) in tags"
          :key="index"
          class="tag-item"
          :style="tagStyle(index, tag)"
          @mouseenter="onTagMouseEnter(index, tag)"
          @mouseleave="onTagMouseLeave(index, tag)"
          @click.stop="handleClick('tag', tag)"
        >
          {{ tag.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: Array, required: true, default: () => [] },
  parentBackgroundColor: { type: String, required: true },
  onClick: Function,
  onHover: Function,
  cardRounding: { type: Number, default: 20 },
  fontSizes: { type: Object, default: () => ({}) },
  margins: { type: Object, default: () => ({}) },
  buttonIcon: { type: Object, required: true },
  buttonIconSize: { type: Number, default: 24 },
  buttonIconColor: { type: String, default: '#fff' },
  buttonIconHoverColor: { type: String, default: '#fff' },
  buttonBackgroundColor: { type: String, default: '#282828' },
  buttonBackgroundHoverColor: { type: String, default: '#484848' },
  imageHoverZoom: { type: Number, default: 1.1 },
  imageContainerHeight: { type: String, default: '18.75rem' },
  titleColor: { type: String, default: '#f7f7ff' },
  descriptionColor: { type: String, default: '#c7c7cf' },
  mirrored: { type: Boolean, default: false },
  titleAlignment: { type: String, default: 'left' },
  descriptionAlignment: { type: String, default: 'left' },
  tagsAlignment: { type: String, default: 'left' },
  maxWidth: { type: String, default: '100%' },
  price: String,
  priceTagTextColor: { type: String, default: '#ffffff' },
  oldPrice: String,
  oldPriceOnTheRight: { type: Boolean, default: false },
  oldPriceTextColor: { type: String, default: '#c1c1c7' },
  priceTagRounding: { type: String, default: '5px' },
  priceTagBackgroundColor: { type: String, default: 'rgba(0,0,0,0.7)' },
  oldNewPriceGap: { type: Number, default: 8 },
  titleLineClamp: { type: Number },
  descriptionLineClamp: { type: Number },
  tagHoverBrightness: { type: Number, default: 0.8 }
})

const hoveredElement = ref(null) // { part, extra }
const isButtonHovered = ref(false)
const isImageHovered = ref(false)
const hoveredTag = ref(null)
const mouseleaveTimeout = ref(null)
const imageContainer = ref(null)

function isSameHover(partA, extraA, partB, extraB) {
  if (partA !== partB) return false
  if (extraA === extraB) return true
  if (!extraA || !extraB) return false
  return extraA === extraB
}

function handleMouseEnter(part, extra = null) {
  if (
    hoveredElement.value &&
    isSameHover(hoveredElement.value.part, hoveredElement.value.extra, part, extra)
  )
    return

  if (mouseleaveTimeout.value) {
    clearTimeout(mouseleaveTimeout.value)
    mouseleaveTimeout.value = null
  }

  if (hoveredElement.value && props.onHover)
    props.onHover({ ...hoveredElement.value, isHovered: false }, props.id)

  hoveredElement.value = { part, extra }

  if (props.onHover) props.onHover({ part, extra, isHovered: true }, props.id)

  isButtonHovered.value = part === 'button'
  isImageHovered.value = part === 'image'
  hoveredTag.value = part === 'tag' ? extra : null
}

function handleMouseLeave(part, extra = null) {
  if (
    hoveredElement.value &&
    isSameHover(hoveredElement.value.part, hoveredElement.value.extra, part, extra)
  ) {
    // Only apply delay if leaving priceTag, else clear immediately
    if (part === 'priceTag') {
      mouseleaveTimeout.value = setTimeout(() => {
        // After 16ms delay, check if image container is hovered using native DOM API
        // and update hover state accordingly
        if (imageContainer.value) {
          const isHoveredNow = imageContainer.value.matches(':hover')
          if (isHoveredNow) {
            // Simulate entering image container hover
            handleMouseEnter('image')
            mouseleaveTimeout.value = null
            return
          }
        }
        // If image container not hovered, clear hover
        if (props.onHover)
          props.onHover({ part, extra, isHovered: false }, props.id)
        hoveredElement.value = null
        isButtonHovered.value = false
        isImageHovered.value = false
        hoveredTag.value = null

        mouseleaveTimeout.value = null
      }, 16)
    } else {
      if (props.onHover)
        props.onHover({ part, extra, isHovered: false }, props.id)
      hoveredElement.value = null
      isButtonHovered.value = false
      isImageHovered.value = false
      hoveredTag.value = null
    }
  }
}

function handleClick(part, extra = null) {
  if (props.onClick) props.onClick({ part, extra }, props.id)
}

function onTagMouseEnter(index, tag) {
  handleMouseEnter('tag', tag)
}

function onTagMouseLeave(index, tag) {
  handleMouseLeave('tag', tag)
}

function isRTLCheck(text) {
  return /[\\u0590-\\u05FF\\u0600-\\u06FF\\u0700-\\u074F]/.test(text)
}

// Compute full CSS filter string like 'brightness(0.8)' based directly on prop, clamp between 0.1 to 1.9 for usability
const computedTagBrightness = computed(() => {
  let val = props.tagHoverBrightness
  if (val < 0.1) val = 0.1
  else if (val > 1.9) val = 1.9
  return \`brightness(\${val.toFixed(2)})\`
})

const priceTagStyle = computed(() => ({
  position: 'absolute',
  top: '12px',
  [props.mirrored ? 'right' : 'left']: '12px',
  backgroundColor: props.priceTagBackgroundColor,
  color: props.priceTagTextColor,
  padding: '9px 15px',
  borderRadius: props.priceTagRounding,
  fontSize: props.fontSizes.price || '1rem',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none'
}))

const buttonBoxStyle = computed(() => ({
  '--button-bg': props.buttonBackgroundColor,
  '--button-hover-bg': props.buttonBackgroundHoverColor,
  '--icon-color': isButtonHovered.value ? props.buttonIconHoverColor : props.buttonIconColor,
  '--icon-hover-color': props.buttonIconHoverColor,
  '--icon-size': props.buttonIconSize + 'px',
  backgroundColor: isButtonHovered.value ? props.buttonBackgroundHoverColor : props.buttonBackgroundColor,
  borderRadius: '50%',
  position: 'absolute',
  inset: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all 0.3s ease',
  cursor: 'pointer'
}))

const titleStyle = computed(() => {
  const base = {
    fontSize: props.fontSizes.title,
    color: props.titleColor,
    margin: props.margins.title,
    fontWeight: 'bold',
    direction: isRTLCheck(props.title) ? 'rtl' : 'ltr',
    textAlign: props.titleAlignment
  }
  if (typeof props.titleLineClamp === 'number' && props.titleLineClamp > 0) {
    return {
      ...base,
      display: '-webkit-box',
      WebkitLineClamp: props.titleLineClamp,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }
  return base
})

const descriptionStyle = computed(() => {
  const base = {
    fontSize: props.fontSizes.description,
    color: props.descriptionColor,
    margin: props.margins.description,
    direction: isRTLCheck(props.description) ? 'rtl' : 'ltr',
    textAlign: props.descriptionAlignment
  }
  if (typeof props.descriptionLineClamp === 'number' && props.descriptionLineClamp > 0) {
    return {
      ...base,
      display: '-webkit-box',
      WebkitLineClamp: props.descriptionLineClamp,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }
  return base
})

function tagStyle(index, tag) {
  return {
    backgroundColor: tag.backgroundColor,
    color: tag.textColor,
    borderRadius: tag.rounding ? tag.rounding + 'px' : '0',
    fontSize: props.fontSizes.tags,
    textAlign: tag.alignment || 'left',
    direction: isRTLCheck(tag.name) ? 'rtl' : 'ltr',
    cursor: 'default' // no filter here since CSS handles hover brightness with variable
  }
}
</script>

<style scoped>
.inflected-card {
  position: relative;
  border-radius: var(--card-rounding);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}
.inflected-cardInner {
  position: relative;
  width: 100%;
  background: var(--parent-bg);
  border-radius: var(--card-rounding);
  border-bottom-right-radius: 0;
  overflow: hidden;
}
.inflected-box {
  width: 100%;
  height: 100%;
  overflow: visible;
  position: relative;
}
.inflected-imgBox {
  width: 100%;
  overflow: hidden;
  border-radius: var(--card-rounding);
  position: relative;
  cursor: pointer;
}
.inflected-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
  will-change: transform;
  user-select: none;
}
.inflected-icon {
  position: absolute;
  bottom: -6px;
  right: -6px;
  width: 96px;
  height: 96px;
  background: var(--parent-bg);
  border-top-left-radius: 50%;
  transition: all 0.3s ease;
}
.inflected-icon::before,
.inflected-icon::after {
  position: absolute;
  content: '';
  background: transparent;
  width: 20px;
  height: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 5px 5px 0 5px var(--parent-bg);
}
.inflected-icon::before {
  bottom: 6px;
  left: -20px;
}
.inflected-icon::after {
  top: -20px;
  right: 6px;
}
.inflected-iconBox {
  position: absolute;
  inset: 10px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
}
.inflected-iconBox:hover {
  background: var(--button-hover-bg);
  transform: scale(1.1);
}
.inflected-priceTag {
  user-select: none;
}
.inflected-new-price {
  font-weight: bold;
}
.inflected-old-price {
  text-decoration: line-through;
  opacity: 0.7;
  font-weight: bold;
}
.inflected-content {
  padding: 15px 10px;
}
.inflected-content h3,
.inflected-content p {
  transition: color 0.3s ease;
}
.tag-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.tag-item {
  font-weight: 700;
  padding: 6px 10px;
  cursor: default;
  transition: filter 0.3s ease;
  filter: brightness(1);
}
.tag-item:hover {
  filter: var(--tag-brightness, brightness(0.8));
}
</style>
` }
    ],
    dependencies: `npm install lucide-vue-next`,
    credit: `[Cards with inverted border-radius #scss](https://codepen.io/kristen17/pen/pomgrKp) by [Kristen](https://codepen.io/kristen17)

  Used photos:

  - Photo by [Zana Latif](https://www.pexels.com/@zana-latif-2772032/) from [Pexels](https://www.pexels.com/photo/unboxing-iphone-15-pro-max-box-in-natural-titanium-color-mention-zana_qaradaghy-on-instagram-while-use-this-photo-follow-on-instagram-zana_qaradaghy-18525574/)
  - Photo by [Evgeny Opanasenko](https://unsplash.com/@n3gve?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/two-cell-phones-sitting-next-to-each-other-on-a-window-sill-cZye2sFqu5o?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
  - Photo by [Matteo Fusco](https://unsplash.com/@matteofusco?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/jet-black-iphone-7-1giBTF3G4EE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
  - Photo by [Aidan Hancock](https://unsplash.com/@aidanmh?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/turned-on-iphone-x-on-white-surface-EwKkZu18HPo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)`,
    previewType: 'image',
    imageLink: '/previews/inflected-card.webp'
  },
  {
    name: 'Product Card',
    route: 'product-card',
    description: 'A versatile product card component with image, pricing, discount, and interactive buttons for e-commerce applications.',
    usage: `<template>
  <div class="product-demo-root">
    <p class="product-demo-disclaimer">
      <strong>Disclaimer:</strong> This product card is a conceptual design prototype created for demonstrative and educational purposes only. All product names, logos, brand identifiers, and trademarks displayed here are the sole property of their respective owners. Product details, images, and descriptions are used for illustrative purposes and do not represent actual commercial offerings. Namer UI is not affiliated with, endorsed by, or sponsored by any of the companies whose products are showcased. This website does not present a commercial offer of any kind. Any resemblance to existing product(s) is entirely coincidental.
    </p>
    <div class="product-demo-cards">
      <ProductCard
        id="0"
        imageSrc="https://images.pexels.com/photos/18525574/pexels-photo-18525574/free-photo-of-unboxing-iphone-15-pro-max-box-in-natural-titanium-color-mention-zana_qaradaghy-on-instagram-while-use-this-photo-follow-on-instagram-zana_qaradaghy.jpeg"
        altText="iPhone 15 Pro"
        oldPrice="$1,199"
        price="$1,079"
        condition="Brand new"
        discountTag="10% OFF"
        title="iPhone 15 Pro"
        description="Titanium smartphone with an advanced camera system, offering stunning photography capabilities and a sleek design."
        :onFilledButtonClick="handleFilledClick"
        :onOutlinedButtonClick="handleOutlinedClick"
        :showOutlinedButton="true"
      />
      <ProductCard
        id="1"
        imageSrc="https://images.unsplash.com/photo-1721864428881-dbabb9ea0017?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        altText="Samsung Galaxy Flip 6"
        oldPrice="$999"
        price="$499"
        condition="Pre-owned"
        discountTag="50% OFF"
        title="Samsung Galaxy Flip 6"
        description="Innovative foldable smartphone with a sleek design that enhances portability while providing a large display for immersive viewing experiences and multitasking."
        :onFilledButtonClick="handleFilledClick"
        :onOutlinedButtonClick="handleOutlinedClick"
        :showOutlinedButton="true"
        :accentColor="'#00A6FB'"
        :buttonRounding="50"
      />
      <ProductCard
        id="2"
        imageSrc="https://images.unsplash.com/photo-1514473776127-61e2dc1dded3?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        altText="iPhone 7"
        oldPrice="$199"
        price="$159"
        condition="Refurbished"
        discountTag="20% OFF"
        title="iPhone 7"
        description="Classic iPhone model with 12MP camera and water resistance, offering reliable performance and essential features for everyday smartphone users."
        :onFilledButtonClick="handleFilledClick"
        :onOutlinedButtonClick="handleOutlinedClick"
        :showOutlinedButton="false"
        :accentColor="'#FF3900'"
        :outerWidth="392"
        :outerHeight="414"
        :borderWidth="4"
        :containerRounding="14"
        :innerContainerRounding="14"
        :buttonRounding="14"
        :activeComponentScale="1.048"
        :darkTextInTags="true"
      />
      <ProductCard
        id="3"
        imageSrc="https://images.unsplash.com/photo-1511296933631-18b1a062212c?q=80&w=2436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        altText="iPhone X"
        oldPrice="₪999"
        price="₪599"
        condition="משומש"
        :discountTag="swappedDiscountTag"
        title="iPhone X"
        description="סמארטפון אייקוני עם תצוגת Super Retina בגודל 5.8 אינץ', טכנולוגיית Face ID מתקדמת, מצלמות כפולות של 12MP ועיצוב חדשני שמהפכני בצילום הסלולרי."
        :onFilledButtonClick="handleFilledClick"
        :onOutlinedButtonClick="handleOutlinedClick"
        :showOutlinedButton="true"
        :outlineColor="'#f1f1f7'"
        :accentColor="'#00A6FB'"
        :containerRounding="36"
        :innerContainerRounding="21"
        :buttonRounding="50"
        filledButtonInscription="קנה עכשיו"
        outlinedButtonInscription="הוסף לעגלה"
        :swapButtons="true"
        :activeComponentScale="1.08"
        :mirrorTags="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from './ProductCard.vue'

const originalDiscountTag = 'הנחה 40%'
const discountTagParts = originalDiscountTag.split(' ')
const swappedDiscountTag = discountTagParts.reverse().join(' ')

function handleFilledClick(id: string) {
  console.log(\`Filled button click - id: \${id}\`)
}
function handleOutlinedClick(id: string) {
  console.log(\`Outlined button click - id: \${id}\`)
}
</script>

<style>
.product-demo-root {
  min-height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.product-demo-disclaimer {
  color: #f7f7ff;
  font-size: 1rem;
  max-width: 1080px;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  padding: 1.25rem 1.5rem;
  background: rgba(20, 22, 24, 0.85);
  border-radius: 1rem;
  line-height: 1.7;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.08);
}
.product-demo-disclaimer strong {
  color: #fff;
  font-weight: bold;
}
.product-demo-cards {
  min-height: 300px;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-bottom: 3rem;
}
</style>

// Note: The ProductCard component accepts the following props:
// - id: string (required) - Unique identifier for the product card.
// - imageSrc: string (required) - Source URL for the product image.
// - altText: string (required) - Alternative text description for the product image.
// - price: string (required) - Current price of the product.
// - oldPrice: string (optional) - Previous/original price of the product.
// - condition: string (optional) - Product condition label (e.g., "Brand new", "Pre-owned").
// - discountTag: string (optional) - Discount or promotional tag displayed on the card.
// - title: string (required) - Name or title of the product.
// - description: string (required) - Detailed description of the product.
// - showOutlinedButton: boolean (optional) - Whether to display the secondary (outlined) button (default: true).
// - onFilledButtonClick: (id: string) => void (required) - Callback for the primary button click.
// - onOutlinedButtonClick: (id: string) => void (required) - Callback for the secondary button click.
// - outerWidth: number (optional) - Total width of the product card (default: 390).
// - outerHeight: number (optional) - Total height of the product card (default: 412).
// - outerContainerSize: number (optional) - Size of the outer container (default: 32).
// - outlineColor: string (optional) - Outline color for the card container (default: '#303030').
// - outlinedButtonOutlineColor: string (optional) - Outline and text color for the outlined button (default: '#f1f1f7').
// - innerWidth: number (optional) - Width of the card's inner container.
// - innerHeight: number (optional) - Height of the card's inner container.
// - descriptionLines: number (optional) - Maximum number of lines for the description (default: 3).
// - fontSize: number (optional) - Base font size for the card (default: 14).
// - accentColor: string (optional) - Primary accent color for the card and filled button (default: '#9F4EFF').
// - containerRounding: number (optional) - Border radius for the card container (default: 0).
// - innerContainerRounding: number (optional) - Border radius for the inner container (default: 0).
// - buttonRounding: number (optional) - Border radius for buttons (default: 0).
// - tagRounding: number (optional) - Border radius for tags (default: 20).
// - textColor: string (optional) - Color for text elements (default: '#f0f0f1').
// - buttonBackground: string (optional) - Background color for the filled button.
// - buttonForeground: string (optional) - Text color for the filled button.
// - borderWidth: number (optional) - Width of the card border (default: 3).
// - lightenButtonColor: number (optional) - Lighten factor for button hover color (default: 0.12).
// - filledButtonInscription: string (optional) - Text for the filled button (default: 'Buy now').
// - outlinedButtonInscription: string (optional) - Text for the outlined button (default: 'Add to cart').
// - swapButtons: boolean (optional) - If true, swaps the order of the filled and outlined buttons (default: false).
// - activeComponentScale: number (optional) - Scale factor on card hover (default: 1.024).
// - mirrorTags: boolean (optional) - If true, mirrors tag and price tag positions (default: false).
// - darkTextInTags: boolean (optional) - If true, uses dark text color in tags (default: false).
//
// Emits: None.
//
// Slots: None.
//
// Usage notes:
// - The card displays a product image, price (with optional old price), condition, discount tag, title, description, and action buttons.
// - Clicking the filled or outlined button triggers the corresponding callback with the card id.
// - The card supports both LTR and RTL layouts and can mirror tag/price tag positions.
// - Designed for modern product displays and flexible UI needs.
`,
    code: [
      {
        filename: 'ProductCard.vue',
        content: `<template>
  <div
    class="product-card"
    :id="\`container-\${id}\`"
    @mousemove="handleMouseMove"
    :style="containerStyle"
  >
    <div class="product-inner-container" :style="innerContainerStyle">
      <div class="product-image-container">
        <img :src="imageSrc" :alt="altText" class="product-image" />
        <div class="product-price-tag" :style="priceTagStyle">
          <template v-if="mirrorTags">
            <span class="product-new-price" style="font-weight: bold;">
              <span :style="{ color: darkTextInTags ? '#111111' : 'var(--text-color)' }">{{ price }}</span>
            </span>
            <span
              v-if="oldPrice"
              class="product-old-price"
              style="margin-left: 8px; font-weight: bold;"
            >
              <span
                :style="{
                  color: darkTextInTags ? '#404040' : 'var(--text-color)',
                  opacity: 0.64,
                  textDecoration: 'line-through',
                  textDecorationColor: darkTextInTags ? '#404040' : 'var(--text-color)'
                }"
              >
                {{ oldPrice }}
              </span>
            </span>
          </template>
          <template v-else>
            <span
              v-if="oldPrice"
              class="product-old-price"
              style="margin-right: 8px; font-weight: bold;"
            >
              <span
                :style="{
                  color: darkTextInTags ? '#404040' : 'var(--text-color)',
                  opacity: 0.64,
                  textDecoration: 'line-through',
                  textDecorationColor: darkTextInTags ? '#404040' : 'var(--text-color)'
                }"
              >
                {{ oldPrice }}
              </span>
            </span>
            <span class="product-new-price" style="font-weight: bold;">
              <span :style="{ color: darkTextInTags ? '#111111' : 'var(--text-color)' }">{{ price }}</span>
            </span>
          </template>
        </div>
        <div
          v-if="condition"
          class="product-condition-tag"
          :style="conditionTagStyle"
        >
          {{ condition }}
        </div>
        <div
          v-if="discountTag"
          class="product-discount-tag"
          :style="discountTagStyle"
        >
          {{ discountTag }}
        </div>
      </div>
      <div class="product-content">
        <h1 class="product-title" :style="titleStyle">{{ displayedTitle }}</h1>
        <p class="product-description" :style="descriptionStyle">{{ description }}</p>
        <div class="product-button-container">
          <template v-if="swapButtons">
            <!-- Outlined button first -->
            <ChronicleButton
              :text="outlinedButtonInscription"
              :outlined="true"
              width="136px"
              :onClick="() => onOutlinedButtonClick(id)"
              :hoverColor="oulinedChronicleButtonHoverColor"
              outlinedButtonBackgroundOnHover="transparent"
              fontFamily="'Arial', 'Alef', sans-serif"
              :borderRadius="\`\${buttonRounding}px\`"
              :customBackground="outlinedButtonOutlineColor"
              :customForeground="outlinedButtonOutlineColor"
              :outlineColor="outlinedButtonOutlineColor"
            />
            <!-- Filled button second -->
            <ChronicleButton
              :text="filledButtonInscription"
              width="136px"
              :onClick="() => onFilledButtonClick(id)"
              hoverColor="#fff"
              :hoverBackground="filledChronicleButtonHoverColor"
              fontFamily="'Arial', 'Alef', sans-serif"
              :borderRadius="\`\${buttonRounding}px\`"
              :customBackground="buttonBackground"
              :customForeground="buttonForeground"
            />
          </template>
          <template v-else>
            <!-- Filled button first -->
            <ChronicleButton
              :text="filledButtonInscription"
              width="136px"
              :onClick="() => onFilledButtonClick(id)"
              hoverColor="#fff"
              :hoverBackground="filledChronicleButtonHoverColor"
              fontFamily="'Arial', 'Alef', sans-serif"
              :borderRadius="\`\${buttonRounding}px\`"
              :customBackground="buttonBackground"
              :customForeground="buttonForeground"
            />
            <!-- Outlined button second -->
            <ChronicleButton
              v-if="showOutlinedButton"
              :text="outlinedButtonInscription"
              :outlined="true"
              width="136px"
              :onClick="() => onOutlinedButtonClick(id)"
              :hoverColor="oulinedChronicleButtonHoverColor"
              outlinedButtonBackgroundOnHover="transparent"
              fontFamily="'Arial', 'Alef', sans-serif"
              :borderRadius="\`\${buttonRounding}px\`"
              :customBackground="outlinedButtonOutlineColor"
              :customForeground="outlinedButtonOutlineColor"
              :outlineColor="outlinedButtonOutlineColor"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, onMounted, watch } from 'vue'
import ChronicleButton from '../chronicle-button/ChronicleButton.vue'

interface ProductCardProps {
  id: string
  imageSrc: string
  altText: string
  price: string
  oldPrice?: string
  condition?: string
  discountTag?: string
  title: string
  description: string
  showOutlinedButton?: boolean
  onFilledButtonClick: (id: string) => void
  onOutlinedButtonClick: (id: string) => void
  outerWidth?: number
  outerHeight?: number
  outerContainerSize?: number
  outlineColor?: string
  outlinedButtonOutlineColor?: string // NEW PROP
  innerWidth?: number
  innerHeight?: number
  descriptionLines?: number
  fontSize?: number
  accentColor?: string
  containerRounding?: number
  innerContainerRounding?: number
  buttonRounding?: number
  tagRounding?: number
  textColor?: string
  buttonBackground?: string
  buttonForeground?: string
  borderWidth?: number
  lightenButtonColor?: number
  filledButtonInscription?: string
  outlinedButtonInscription?: string
  swapButtons?: boolean
  activeComponentScale?: number
  mirrorTags?: boolean
  darkTextInTags?: boolean
}

const props = defineProps<ProductCardProps>()

const {
  id,
  imageSrc,
  altText,
  price,
  oldPrice,
  condition,
  discountTag,
  title,
  description,
  showOutlinedButton = true,
  onFilledButtonClick,
  onOutlinedButtonClick,
  outerWidth = 390,
  outerHeight = 412,
  outerContainerSize = 32,
  outlineColor = '#303030',
  outlinedButtonOutlineColor = '#f1f1f7', // Default for outlined button
  innerWidth,
  innerHeight,
  descriptionLines = 3,
  fontSize = 14,
  accentColor = '#9F4EFF',
  containerRounding = 0,
  innerContainerRounding = 0,
  buttonRounding = 0,
  tagRounding = 20,
  textColor = '#f0f0f1',
  buttonBackground,
  buttonForeground,
  borderWidth = 3,
  lightenButtonColor = 0.12,
  filledButtonInscription = 'Buy now',
  outlinedButtonInscription = 'Add to cart',
  swapButtons = false,
  activeComponentScale = 1.024,
  mirrorTags = false,
  darkTextInTags = false,
} = props

const rotation = ref('0deg')
const borderGradient = ref('')

const calculatedInnerWidth = computed(() =>
  innerWidth || outerWidth - 2 * borderWidth - outerContainerSize
)
const calculatedInnerHeight = computed(() =>
  innerHeight || outerHeight - 2 * borderWidth - outerContainerSize
)
const backgroundPatternSize = computed(() =>
  \`\${Math.floor((Math.min(calculatedInnerWidth.value, calculatedInnerHeight.value)) / 16)}px\`
)

const containerStyle = computed(() => ({
  '--rotation': rotation.value,
  '--border-gradient': borderGradient.value,
  '--accent-color': accentColor,
  '--text-color': textColor,
  '--background-pattern-size': backgroundPatternSize.value,
  '--active-component-scale': \`\${activeComponentScale}\`,
  width: \`\${outerWidth}px\`,
  height: \`\${outerHeight}px\`,
  borderRadius: \`\${containerRounding}px\`,
  borderWidth: \`\${borderWidth}px\`,
}))

const innerContainerStyle = computed(() => ({
  borderRadius: \`\${innerContainerRounding}px\`,
  width: \`\${calculatedInnerWidth.value}px\`,
  height: \`\${calculatedInnerHeight.value}px\`,
}))

const lightenColor = (hex: string, percent: number): string => {
  hex = hex.replace(/^#/, '')
  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(4, 6), 16)
  const isLightening = percent >= 0
  const adjustment = Math.abs(percent)
  if (isLightening) {
    r = Math.min(255, Math.floor(r + (255 - r) * adjustment))
    g = Math.min(255, Math.floor(g + (255 - g) * adjustment))
    b = Math.min(255, Math.floor(b + (255 - b) * adjustment))
  } else {
    r = Math.max(0, Math.floor(r * (1 - adjustment)))
    g = Math.max(0, Math.floor(g * (1 - adjustment)))
    b = Math.max(0, Math.floor(b * (1 - adjustment)))
  }
  return \`#\${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).padStart(6, '0')}\`
}

const filledChronicleButtonHoverColor = lightenColor(accentColor, lightenButtonColor)
const oulinedChronicleButtonHoverColor = lightenColor(accentColor, lightenButtonColor)

const isRTLCheck = (text: string): boolean => {
  return /[\\u0590-\\u05FF\\u0600-\\u06FF\\u0700-\\u074F]/.test(text);
}

const displayedTitle = computed(() =>
  title.length > 27 ? title.slice(0, 24) + '...' : title
)

const directionValue = (text: string): 'ltr' | 'rtl' => (isRTLCheck(text) ? 'rtl' : 'ltr')

const descriptionStyle = computed(() => ({
  fontSize: \`\${fontSize}px\`,
  WebkitLineClamp: descriptionLines,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textAlign: 'center' as const,
  marginTop: '0px',
  color: 'var(--text-color)',
  direction: directionValue(description),
}))

const titleStyle = computed(() => ({
  fontSize: '21px',
  fontWeight: 'bold',
  letterSpacing: '-.01em',
  lineHeight: 'normal',
  color: 'var(--text-color)',
  textAlign: 'center' as const,
  marginTop: '5px',
  direction: directionValue(title),
}))

const priceTagStyle = computed(() => ({
  position: 'absolute' as const,
  top: '10px',
  ...(mirrorTags ? { left: '10px', right: 'auto' } : { right: '10px', left: 'auto' }),
  borderRadius: \`\${tagRounding}px\`,
  backgroundColor: 'var(--border-color)',
  padding: '8px 15px',
  fontSize: '12px',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold',
}))

const discountTagStyle = computed(() => ({
  position: 'absolute' as const,
  top: '51px',
  ...(mirrorTags ? { left: '10px', right: 'auto' } : { right: '10px', left: 'auto' }),
  backgroundColor: 'var(--border-color)',
  padding: '8px 15px',
  fontSize: '12px',
  zIndex: 1,
  borderRadius: \`\${tagRounding}px\`,
  fontWeight: 'bold',
  direction: discountTag ? directionValue(discountTag) : 'ltr',
  color: darkTextInTags ? '#111111' : 'var(--text-color)',
}))

const conditionTagStyle = computed(() => ({
  position: 'absolute' as const,
  top: '10px',
  ...(mirrorTags ? { right: '10px', left: 'auto' } : { left: '10px', right: 'auto' }),
  backgroundColor: 'rgba(0,0,0,0.7)',
  color: 'var(--text-color)',
  padding: '8px 15px',
  fontSize: '12px',
  zIndex: 1,
  borderRadius: \`\${tagRounding}px\`,
  fontWeight: 'bold',
}))

const handleMouseMove = (e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  const angle = Math.atan2(y, x)
  rotation.value = \`\${angle}rad\`
  borderGradient.value = \`conic-gradient(from var(--rotation), \${accentColor} 0deg, \${accentColor} 90deg, \${outlineColor} 90deg, \${outlineColor} 360deg)\`
}

onMounted(() => {
  borderGradient.value = \`conic-gradient(from 0deg, \${accentColor} 0deg, \${accentColor} 90deg, \${outlineColor} 90deg, \${outlineColor} 360deg)\`
})
watch([() => accentColor, () => outlineColor], () => {
  borderGradient.value = \`conic-gradient(from 0deg, \${accentColor} 0deg, \${accentColor} 90deg, \${outlineColor} 90deg, \${outlineColor} 360deg)\`
})
</script>

<style>
.product-card {
  --border-color: var(--accent-color);
  --hover-text-color: var(--accent-color);
  --active-component-scale: 1.024;
  border: solid transparent;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-image: linear-gradient(#050505, #050505), var(--border-gradient);
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  font-family: "Arial", "Alef", sans-serif;
}
.product-card:hover {
  transform: scale(var(--active-component-scale));
}
.product-inner-container {
  background-color: black;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: linear-gradient(45deg, rgba(230, 230, 230, 0.15) 25%, transparent 25%, transparent 75%, rgba(240, 240, 240, 0.15) 75%),
              linear-gradient(-45deg, rgba(240, 240, 240, 0.15) 25%, transparent 25%, transparent 75%, rgba(230, 230, 230, 0.15) 75%);
  background-size: var(--background-pattern-size) var(--background-pattern-size);
}
.product-image-container {
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
}
.product-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 16px;
  position: relative;
  align-items: center;
}
.product-title {
  font-size: 21px;
  font-weight: bold;
  letter-spacing: -.01em;
  line-height: normal;
  color: var(--text-color);
  text-align: center;
  margin-top: 5px;
}
.product-description {
  color: var(--text-color);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: center;
}
.product-button-container {
  display: flex;
  gap: 12px;
  margin-top: 8px;
  margin-bottom: 2px;
}
.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.product-card:hover .product-image {
  transform: scale(1.1);
}
.product-card:hover .product-title {
  color: var(--hover-text-color);
}
.product-price-tag {
  /* Dynamic style via computed */
}
.product-condition-tag {
  /* Dynamic style via computed */
}
.product-discount-tag {
  /* Dynamic style via computed */
}
</style>
` }
    ],
    dependencies: `npm install @fontsource/alef --legacy-peer-deps
[Chronicle button](/components/chronicle-button)`,
    credit: `[Vercel app border hover effect](https://codepen.io/Juxtoposed/pen/xxQNozB) by [Juxtoposed](https://codepen.io/Juxtoposed)

Used photos:

- Photo by [Zana Latif](https://www.pexels.com/@zana-latif-2772032/) from [Pexels](https://www.pexels.com/photo/unboxing-iphone-15-pro-max-box-in-natural-titanium-color-mention-zana_qaradaghy-on-instagram-while-use-this-photo-follow-on-instagram-zana_qaradaghy-18525574/)
- Photo by [Evgeny Opanasenko](https://unsplash.com/@n3gve?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/two-cell-phones-sitting-next-to-each-other-on-a-window-sill-cZye2sFqu5o?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
- Photo by [Matteo Fusco](https://unsplash.com/@matteofusco?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/jet-black-iphone-7-1giBTF3G4EE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
- Photo by [Aidan Hancock](https://unsplash.com/@aidanmh?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/turned-on-iphone-x-on-white-surface-EwKkZu18HPo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
`,
    previewType: 'center',
  },
  {
    name: 'WhatsApp Widget',
    route: 'whats-app-widget',
    description: 'A customizable WhatsApp chat widget with auto-popup functionality, personalized messaging, and styled UI elements.',
    usage: `<script setup lang="ts">
import WhatsAppWidget from './WhatsAppWidget.vue'

function openWhatsApp() {
  console.log('WhatsApp button clicked')
}
</script>

<template>
  <WhatsAppWidget
    name="Alice West"
    photo="https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    status="online"
    :onWhatsAppClick="openWhatsApp"
    displayedMessage="Hi, I'm Alice from NamerStore. 🚀 Looking for new, pre-owned, or refurbished tech? We have great deals! What device interests you? Let's find a perfect match for you."
    :selfPopUpsIn="3000"
  />
</template>

// Note: The WhatsAppWidget component accepts the following props:
// - name: string (required) - The name displayed in the chat header.
// - photo: string (required) - URL of the profile photo.
// - status: string (optional) - Status text displayed under the name (default: "online").
// - nameTextColor: string (optional) - Color of the name text (default: "#ffffff").
// - statusTextColor: string (optional) - Color of the status text (default: "#eeeeee").
// - containerHeaderBackground: string (optional) - Background color of the chat header (default: "#075e54").
// - containerBodyBackground: string (optional) - Background color of the chat body (default: "#e5ddd5").
// - containerBottomBackground: string (optional) - Background color of the bottom section (default: "#f0f0f0").
// - messageBackground: string (optional) - Background color of message bubbles (default: "#ffffff").
// - messageTextColor: string (optional) - Color of message text (default: "#000000").
// - defaultButtonBackground: string (optional) - Default background color of the WhatsApp button (default: "#25d366").
// - hoveredButtonBackground: string (optional) - Background color of the WhatsApp button on hover (default: "#128c7e").
// - buttonTextColor: string (optional) - Color of the button text (default: "#ffffff").
// - widgetRounding: string (optional) - Border radius of the widget (default: "12px").
// - onWhatsAppClick: () => void (required) - Function to handle WhatsApp button click.
// - displayedMessage: string (required) - Initial message displayed in the chat.
// - selfPopUpsIn: number (required) - Time in milliseconds before the widget auto-pops up.
// - typingDotsColor: string (optional) - Color of the typing indicator dots (default: "#9e9ea1").
// - buttonInscription: string (optional) - Text for the WhatsApp action button (default: "Chat in WhatsApp").
//
// Emits: None.
//
// Slots: None.
//
// Usage notes:
// - The widget displays a floating WhatsApp icon. Clicking it or waiting for the selfPopUpsIn delay will open the chat window.
// - The chat window displays a header with avatar, name, and status, a message body, and an action button at the bottom.
// - The action button's color, hover color, and inscription are fully customizable via props.
// - Clicking the action button triggers the onWhatsAppClick callback (for example, to open a WhatsApp link).
// - All style-related props are optional; omit them to use the default theme.
// - Designed for modern product/service chat widgets and flexible UI needs.
`,
    code: [
      {
        filename: 'WhatsAppWidget.vue',
        content: `<template>
  <div>
    <!-- Floating WhatsApp Icon -->
    <div class="wa-chat-icon" v-if="!isOpen" @click="toggleChat">
      <IconBrandWhatsapp :size="35" color="#ffffff" />
    </div>

    <!-- Chat Widget -->
    <div
      class="wa-chat-container"
      v-if="isOpen"
      :style="{ borderRadius: widgetRounding }"
    >
      <!-- Header -->
      <div
        class="wa-chat-header"
        :style="{
          background: containerHeaderBackground,
          borderRadius: \`\${widgetRounding} \${widgetRounding} 0 0\`
        }"
      >
        <div class="wa-avatar-container">
          <img :src="photo" alt="Avatar" class="wa-avatar" />
          <span class="wa-online-dot"></span>
        </div>
        <div class="wa-header-info">
          <span class="wa-name" :style="{ color: nameTextColor, transform: 'translateY(-1px)' }">{{ name }}</span>
          <span class="wa-status" :style="{ color: statusTextColor, transform: 'translateY(2px)' }">{{ status }}</span>
        </div>
        <button class="wa-close-btn" @click="toggleChat" :style="{ color: nameTextColor }">
          <IconX :size="22" />
        </button>
      </div>

      <!-- Body -->
      <div class="wa-chat-content" :style="{ background: containerBodyBackground }">
        <div v-if="isTyping" class="wa-typing-indicator" :style="{ background: containerBodyBackground }">
          <span class="wa-typing-dot" :style="{ background: typingDotsColor }"></span>
          <span class="wa-typing-dot" :style="{ background: typingDotsColor }"></span>
          <span class="wa-typing-dot" :style="{ background: typingDotsColor }"></span>
        </div>
        <div
          v-for="(message, idx) in messages"
          :key="idx"
          class="wa-message"
          :style="{ background: messageBackground, color: messageTextColor }"
        >
          {{ message }}
        </div>
      </div>

      <!-- Bottom -->
      <div
        class="wa-message-input"
        :style="{
          background: containerBottomBackground,
          borderRadius: \`0 0 \${widgetRounding} \${widgetRounding}\`
        }"
      >
        <ChronicleButton
          :text="buttonInscription"
          :onClick="onWhatsAppClick"
          width="100%"
          :customBackground="defaultButtonBackground"
          customForeground="#fff"
          hoverColor="#fff"
          :hoverBackground="hoveredButtonBackground"
          :borderRadius="widgetRounding"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import ChronicleButton from '../chronicle-button/ChronicleButton.vue'
import { IconBrandWhatsapp, IconX } from '@tabler/icons-vue'

interface WhatsAppWidgetProps {
  name: string
  photo: string
  status?: string
  nameTextColor?: string
  statusTextColor?: string
  containerHeaderBackground?: string
  containerBodyBackground?: string
  containerBottomBackground?: string
  messageBackground?: string
  messageTextColor?: string
  defaultButtonBackground?: string
  hoveredButtonBackground?: string
  buttonTextColor?: string
  widgetRounding?: string
  onWhatsAppClick: () => void
  displayedMessage: string
  selfPopUpsIn: number
  typingDotsColor?: string
  buttonInscription?: string // NEW: Button text
}

const props = defineProps<WhatsAppWidgetProps>()

const {
  name,
  photo,
  status = 'online',
  nameTextColor = '#ffffff',
  statusTextColor = '#eeeeee',
  containerHeaderBackground = '#075e54',
  containerBodyBackground = '#e5ddd5',
  containerBottomBackground = '#f0f0f0',
  messageBackground = '#ffffff',
  messageTextColor = '#000000',
  defaultButtonBackground = '#25d366',
  hoveredButtonBackground = '#128c7e',
  buttonTextColor = '#ffffff',
  widgetRounding = '12px',
  onWhatsAppClick,
  displayedMessage,
  selfPopUpsIn,
  typingDotsColor = '#9e9ea1',
  buttonInscription = 'Chat in WhatsApp' // Default
} = props

const isOpen = ref(false)
const hasBeenOpened = ref(false)
const messages = ref<string[]>([])
const isTyping = ref(false)
const isFirstOpen = ref(true)

onMounted(() => {
  const autoOpenTimeout = setTimeout(() => {
    if (!hasBeenOpened.value) {
      isOpen.value = true
      hasBeenOpened.value = true
    }
  }, selfPopUpsIn)
  // Clean up
  watch(isOpen, () => {
    if (isOpen.value && isFirstOpen.value) {
      isTyping.value = true
      const typingTimeout = setTimeout(() => {
        isTyping.value = false
        messages.value = [displayedMessage]
        isFirstOpen.value = false
      }, 2000)
      return () => clearTimeout(typingTimeout)
    } else if (isOpen.value) {
      messages.value = [displayedMessage]
    }
  })
  return () => clearTimeout(autoOpenTimeout)
})

function toggleChat() {
  if (isOpen.value) {
    messages.value = []
  }
  isOpen.value = !isOpen.value
  hasBeenOpened.value = true
}
</script>

<style scoped>
.wa-chat-icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #25d366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 10001;
  animation: wave 2s infinite;
}
@keyframes wave {
  0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
  70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
}
.wa-chat-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  z-index: 10002;
  background: #fff;
  box-shadow: 0 2px 20px rgba(0,0,0,0.13);
  display: block;
}
.wa-chat-header {
  display: flex;
  align-items: center;
  padding: 6px 10px 6px 10px;
  height: 52px;
  min-height: 52px;
}
.wa-avatar-container {
  position: relative;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wa-avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  object-fit: cover;
  display: block;
}
.wa-online-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  background-color: #25d366;
  border-radius: 50%;
  border: 2px solid #075e54;
}
.wa-header-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.wa-name {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 0;
  display: block;
  line-height: 1.1;
}
.wa-status {
  font-size: 13px;
  display: block;
  line-height: 1.1;
}
.wa-close-btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0;
  margin-left: 8px;
  transition: all 0.3s ease;
}
.wa-close-btn svg {
  width: 22px;
  height: 22px;
  transition: opacity 0.3s ease;
  opacity: 0.86;
}
.wa-close-btn:hover svg {
  opacity: 1;
}
.wa-chat-content {
  height: 276px;
  padding: 16px 14px 8px 14px;
  overflow-y: auto;
}
.wa-message {
  max-width: 80%;
  padding: 7px 12px;
  margin-bottom: 7px;
  border-radius: 7.5px;
  position: relative;
  word-wrap: break-word;
  align-self: flex-start;
  font-size: 14px;
  line-height: 1.6;
}
.wa-message-input {
  height: 56px;
  min-height: 56px;
  display: flex;
  align-items: center;
  padding: 12px 14px;
}
.wa-typing-indicator {
  padding: 7px 0 7px 0;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 7px;
}
.wa-typing-dot {
  height: 9px;
  width: 9px;
  float: left;
  margin: 0 1px;
  background-color: #9e9ea1;
  display: block;
  border-radius: 50%;
  opacity: 0.4;
  animation: blink 1s infinite;
}
.wa-typing-dot:nth-of-type(1) { animation-delay: 0.3333s; }
.wa-typing-dot:nth-of-type(2) { animation-delay: 0.6666s; }
.wa-typing-dot:nth-of-type(3) { animation-delay: 0.9999s; }
@keyframes blink {
  50% { opacity: 1; }
}
</style>
` }
    ],
    dependencies: `npm install @tabler/icons-vue
npm install @tabler/icons-vue --save-dev
[Chronicle button](/components/chronicle-button)`,
    credit: `[Untitled](https://codepen.io/Neal-Simari/pen/wvLvGQp) by [Neal Simari](https://codepen.io/Neal-Simari)

Used photo:

- Photo by [Ilya Pavlov](https://unsplash.com/@ilyapavlov?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/woman-standing-beside-lights-xE87C_OvVO4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
`,
    previewType: 'image',
    imageLink: 'previews/whats-app-widget.webp'
  },
  {
    name: 'Circular Testimonials',
    route: 'circular-testimonials',
    description: 'An animated testimonial section that displays user feedback in a visually engaging way.',
    usage: `<script setup lang="ts">
import CircularTestimonials from './CircularTestimonials.vue'

const testimonials = [
  {
    quote: "I was impressed by the food — every dish is bursting with flavor! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive, going the extra mile. I'll definitely be back for more!",
    name: "Tamar Mendelson",
    designation: "Restaurant Critic",
    src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote: "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond to ensure a fantastic visit. I'll definitely keep returning for more exceptional dining experience.",
    name: "Joe Charlescraft",
    designation: "Frequent Visitor",
    src: "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
  {
    quote: "Shining Yam is a hidden gem! From the moment I walked in, I knew I was in for a treat. The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
    name: "Martina Edelweist",
    designation: "Satisfied Customer",
    src: "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  }
]
</script>

<template>
  <div class="circular-demo-root">
    <div class="circular-demo-disclaimer">
      <strong>Disclaimer:</strong>
      The testimonials and restaurant name presented here are entirely fictional and created for demonstrational purposes only.
      Shining Yam is not a real establishment or enterprise. These fictional testimonials are designed to showcase the functionality of the Animated Testimonials component and do not represent real customer experiences or opinions.
      Any resemblance to actual persons, living or dead, or actual businesses is purely coincidental.
      This demonstration is intended solely for illustrative purposes in a web development context.
    </div>
    <CircularTestimonials
      :testimonials="testimonials"
      :autoplay="true"
      :colors="{
        name: '#fff',
        designation: '#999',
        testimony: '#e1e1e1',
        arrowBackground: '#eee',
        arrowForeground: '#151419',
        arrowHoverBackground: '#4776cb'
      }"
    />
  </div>
</template>

<style>
.circular-demo-root {
  padding: 0;
}
.circular-demo-disclaimer {
  max-width: 900px;
  margin: 2.5rem auto 1.5rem auto;
  color: #bdbdbd;
  font-size: 0.98rem;
  background: rgba(20, 22, 24, 0.85);
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
  line-height: 1.7;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.08);
}
.circular-demo-disclaimer strong {
  color: #fff;
  font-weight: bold;
}
</style>

// Note: The CircularTestimonials component accepts the following props:
// - testimonials: Testimonial[] (required) - Array of testimonial objects. Each testimonial:
//     - quote: string - The testimonial text.
//     - name: string - The name of the person giving the testimonial.
//     - designation: string - The person's title or role.
//     - src: string - URL of the person's image.
// - autoplay: boolean (optional) - Whether to automatically cycle through testimonials every 5 seconds (default: true).
// - colors: object (optional) - Custom colors for various elements:
//     - name: string (optional) - Color of the name text (default: "#000").
//     - designation: string (optional) - Color of the designation text (default: "#6b7280").
//     - testimony: string (optional) - Color of the testimonial text (default: "#4b5563").
//     - arrowBackground: string (optional) - Background color of the arrow buttons (default: "#141414").
//     - arrowForeground: string (optional) - Color of the arrow icons (default: "#f1f1f7").
//     - arrowHoverBackground: string (optional) - Background color of the arrow buttons on hover (default: "#00a6fb").
// - fontSizes: object (optional) - Font sizes for text elements:
//     - name: string (optional) - Font size for the name (default: "1.5rem").
//     - designation: string (optional) - Font size for the designation (default: "0.925rem").
//     - quote: string (optional) - Font size for the quote/testimonial (default: "1.125rem").
//
// Emits: None.
//
// Slots: None.
//
// Usage notes:
// - Displays a circular carousel of testimonials with animated image and text transitions.
// - Supports manual navigation via arrow buttons (with Lucide icons and hover effects).
// - Autoplay cycles testimonials every 5 seconds by default; stops on user interaction.
// - Animates testimonial text word-by-word for a lively effect.
// - All colors and font sizes are customizable via the 'colors' and 'fontSizes' props.
// - Responsive layout: single column on mobile, two columns on desktop.
// - Designed for visually engaging testimonial showcase.
`,
    code: [
      {
        filename: 'CircularTestimonials.vue',
        content: `<script setup lang="ts">
import { ref, onMounted, watch, nextTick, type PropType } from 'vue'
import gsap from 'gsap'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'

interface Testimonial {
  quote: string
  name: string
  designation: string
  src: string
}

const props = defineProps<{
  testimonials: Testimonial[]
  autoplay?: boolean
  colors?: {
    name?: string
    designation?: string
    testimony?: string
    arrowBackground?: string
    arrowForeground?: string
    arrowHoverBackground?: string
  }
  fontSizes?: {
    name?: string
    designation?: string
    quote?: string
  }
}>()

const {
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {}
} = props

// Default colors
const colorName = colors.name ?? "#000"
const colorDesignation = colors.designation ?? "#6b7280"
const colorTestimony = colors.testimony ?? "#4b5563"
const colorArrowBg = colors.arrowBackground ?? "#141414"
const colorArrowFg = colors.arrowForeground ?? "#f1f1f7"
const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb"

// Default font sizes
const fontSizeName = fontSizes.name ?? "1.5rem"
const fontSizeDesignation = fontSizes.designation ?? "0.925rem"
const fontSizeQuote = fontSizes.quote ?? "1.125rem"

const activeIndex = ref(0)
let autoplayInterval: ReturnType<typeof setInterval> | null = null

const imageContainer = ref<HTMLElement | null>(null)
const nameRef = ref<HTMLElement | null>(null)
const designationRef = ref<HTMLElement | null>(null)
const quoteRef = ref<HTMLElement | null>(null)
const hoverPrev = ref(false)
const hoverNext = ref(false)

function calculateGap(width: number) {
  const minWidth = 1024
  const maxWidth = 1456
  const minGap = 60
  const maxGap = 86
  if (width <= minWidth) return minGap
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth))
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
}

function animateWords() {
  if (!quoteRef.value) return
  gsap.from(quoteRef.value.querySelectorAll('.word'), {
    opacity: 0,
    y: 10,
    stagger: 0.02,
    duration: 0.2,
    ease: "power2.out"
  })
}

function updateTestimonial(direction: number) {
  activeIndex.value = (activeIndex.value + direction + testimonials.length) % testimonials.length

  nextTick(() => {
    if (imageContainer.value) {
      const containerWidth = imageContainer.value.offsetWidth
      const gap = calculateGap(containerWidth)
      const maxStickUp = gap * 0.8
      testimonials.forEach((testimonial, index) => {
        const img = imageContainer.value!.querySelector(\`[data-index="\${index}"]\`) as HTMLElement
        if (!img) return
        const offset = (index - activeIndex.value + testimonials.length) % testimonials.length
        const zIndex = testimonials.length - Math.abs(offset)
        const opacity = index === activeIndex.value ? 1 : 1
        const scale = index === activeIndex.value ? 1 : 0.85
        let translateX, translateY, rotateY
        if (offset === 0) {
          translateX = '0%'
          translateY = '0%'
          rotateY = 0
        } else if (offset === 1 || offset === -2) {
          translateX = '20%'
          translateY = \`-\${maxStickUp / img.offsetHeight * 100}%\`
          rotateY = -15
        } else {
          translateX = '-20%'
          translateY = \`-\${maxStickUp / img.offsetHeight * 100}%\`
          rotateY = 15
        }
        gsap.to(img, {
          zIndex: zIndex,
          opacity: opacity,
          scale: scale,
          x: translateX,
          y: translateY,
          rotateY: rotateY,
          duration: 0.8,
          ease: "power3.out"
        })
      })
    }

    if (nameRef.value && designationRef.value) {
      gsap.to([nameRef.value, designationRef.value], {
        opacity: 0, y: -20, duration: 0.3, ease: "power2.in", onComplete: () => {
          nameRef.value!.textContent = testimonials[activeIndex.value].name
          designationRef.value!.textContent = testimonials[activeIndex.value].designation
          gsap.to([nameRef.value, designationRef.value], { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
        }
      })
    }
    if (quoteRef.value) {
      gsap.to(quoteRef.value, {
        opacity: 0, y: -20, duration: 0.3, ease: "power2.in", onComplete: () => {
          quoteRef.value!.innerHTML = testimonials[activeIndex.value].quote.split(' ').map(word => \`<span class="word">\${word}</span>\`).join(' ')
          gsap.to(quoteRef.value, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
          animateWords()
        }
      })
    }
  })
}

function handleNext() {
  updateTestimonial(1)
  stopAutoplay()
}
function handlePrev() {
  updateTestimonial(-1)
  stopAutoplay()
}
function stopAutoplay() {
  if (autoplayInterval) clearInterval(autoplayInterval)
}

onMounted(() => {
  nextTick(() => {
    if (nameRef.value) nameRef.value.textContent = testimonials[activeIndex.value].name
    if (designationRef.value) designationRef.value.textContent = testimonials[activeIndex.value].designation
    if (quoteRef.value) {
      quoteRef.value.innerHTML = testimonials[activeIndex.value].quote.split(' ').map(word => \`<span class="word">\${word}</span>\`).join(' ')
      animateWords()
    }
    if (imageContainer.value) {
      updateTestimonial(0)
    }
  })
  if (autoplay) {
    autoplayInterval = setInterval(() => updateTestimonial(1), 5000)
  }
  window.addEventListener('resize', () => updateTestimonial(0))
})
</script>

<template>
  <div class="testimonial-container">
    <div class="testimonial-grid">
      <div class="image-container" ref="imageContainer">
        <img
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.src"
          :src="testimonial.src"
          :alt="testimonial.name"
          class="testimonial-image"
          :data-index="index"
          :style="{ opacity: index === activeIndex ? 1 : 1, zIndex: testimonials.length - Math.abs(index - activeIndex) }"
        />
      </div>
      <div class="testimonial-content">
        <div>
          <h3 class="name" ref="nameRef" :style="{ color: colorName, fontSize: fontSizeName }"></h3>
          <p class="designation" ref="designationRef" :style="{ color: colorDesignation, fontSize: fontSizeDesignation }"></p>
          <p class="quote" ref="quoteRef" :style="{ color: colorTestimony, fontSize: fontSizeQuote }"></p>
        </div>
        <div class="arrow-buttons">
          <button
            class="arrow-button prev-button"
            @click="handlePrev"
            :style="{ backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg }"
            @mouseenter="hoverPrev = true"
            @mouseleave="hoverPrev = false"
          >
            <ArrowLeft :size="44" :color="colorArrowFg" />
          </button>
          <button
            class="arrow-button next-button"
            @click="handleNext"
            :style="{ backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg }"
            @mouseenter="hoverNext = true"
            @mouseleave="hoverNext = false"
          >
            <ArrowRight :size="44" :color="colorArrowFg" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.testimonial-container {
  width: 100%;
  max-width: 56rem;
  padding: 2rem;
}
.testimonial-grid {
  display: grid;
  gap: 5rem;
}
.image-container {
  position: relative;
  width: 100%;
  height: 24rem;
  perspective: 1000px;
}
.testimonial-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
.testimonial-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.name {
  font-weight: bold;
  margin-bottom: 0.25rem;
}
.designation {
  margin-bottom: 2rem;
}
.quote {
  line-height: 1.75;
}
.arrow-buttons {
  display: flex;
  gap: 1.5rem;
  padding-top: 3rem;
}
.arrow-button {
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
  border: none;
}
.word {
  display: inline-block;
}
@media (min-width: 768px) {
  .testimonial-grid {
    grid-template-columns: 1fr 1fr;
  }
  .arrow-buttons {
    padding-top: 0;
  }
}
</style>
` }
    ],
    dependencies: `npm install gsap lucide-vue-next`,
    credit: `[Animated Testimonials](https://ui.aceternity.com/components/animated-testimonials) by [Aceternity UI](https://ui.aceternity.com/)

Used photos:

- Photo by [Ilya Pavlov](https://unsplash.com/@ilyapavlov?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/woman-standing-beside-lights-xE87C_OvVO4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
- Photo by [Bave Pictures](https://unsplash.com/@bavepictures?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/man-in-gray-crew-neck-t-shirt-standing-beside-white-wall-MbYgpI1D-cA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
- Photo by [Allef Vinicius](https://unsplash.com/@seteph?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/closed-eye-woman-wearing-brown-hat-YbzfTr0pwLE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
`,
    previewType: 'image',
    imageLink: "/previews/circular-testimonials.webp"
  },
  {
    name: 'Project Showcase',
    route: 'project-showcase',
    description: 'A customized version of the Aceternity\'s Animated Testimonials component.',
    usage: `<script setup lang="ts">
import ProjectShowcase from '../components/namer-ui/project-showcase/ProjectShowcase.vue'

const testimonialsLTR = [
  {
    name: "Plum Cave",
    quote:
      'A cloud backup solution that employs the "ChaCha20 + Serpent-256 CBC + HMAC-SHA3-512" authenticated encryption scheme for data encryption and ML-KEM-1024 for quantum-resistant key exchange.',
    designation: "Next.js Project",
    src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/plum-cave.webp",
    link: "https://plum-cave.netlify.app/",
  },
  {
    name: "Namer UI",
    quote:
      "A comprehensive collection of modern, attractive, and unique reusable TypeScript components crafted specifically for Next.js.",
    designation: "Next.js Project",
    src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/namer-ui.webp",
    link: "https://namer-ui.netlify.app/",
  },
  {
    name: "React Cryptographic Toolkit",
    quote:
      "A web app that’s capable of encrypting user data, hashing strings, and calculating tags using the available HMAC algorithms. Please don’t judge me too harshly for it; this is the first React app I ever made.",
    designation: "React Project",
    src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/rct.webp",
    link: "https://northstrix.github.io/React-Cryptographic-Toolkit/",
  },
  {
    name: "PHA5E-Inspired Hero Section",
    quote:
      "An unorthodox, customizable component. I put it here just to demonstrate that I'm capable of creating an Angular app.",
    designation: "Angular Project",
    src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/pha5e-inspired-hero-section.webp",
    link: "https://pha5e-inspired-hero-section.netlify.app/",
  },
  {
    name: "Bootleg Website Localization Tool",
    quote:
      "A simple tool designed to localize websites created with the Bazium website builder, as well as their vanilla HTML/CSS/JS counterparts.",
    designation: "Vanilla HTML/CSS/JS Project",
    src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/bwlt.webp",
    link: "https://codepen.io/Northstrix/full/mydWRJB",
  },
  {
    name: "In-Browser-File-Encrypter",
    quote:
      "A browser-based tool that encrypts files locally without interacting with the server. It uses AES-256 for data encryption and HMAC-SHA512 for integrity verification.",
    designation: "Vanilla HTML/CSS/JS Project",
    src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/in-browser-file-encrypter.webp",
    link: "https://codepen.io/Northstrix/full/xxvXvJL",
  },
]

const testimonialsRTL = [
  {
    name: "פלאם קייב",
    quote:
      'פתרון גיבוי בענן המשתמש בסכימת הצפנה מאומתת "HMAC-SHA3-512 + CBC Serpent-256 + ChaCha20" להצפנת נתונים ו-ML-KEM-1024 לחילופי מפתחות עמידים לקוונטים.',
    designation: "פרויקט Next.js",
    src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/plum-cave-hebrew.webp",
    link: "https://plum-cave.netlify.app/",
  },
  {
    name: "נמר UI",
    quote:
      "אוסף מקיף של רכיבי TypeScript מודרניים, אטרקטיביים וייחודיים לשימוש חוזר המיועדים במיוחד ל-Next.js.",
    designation: "פרויקט Next.js",
    src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/namer-ui.webp",
    link: "https://namer-ui.netlify.app/",
  },
  {
    name: "React קריפטוגרפיק טולקיט",
    quote:
      "אפליקציית אינטרנט המסוגלת להצפין נתוני משתמש, לבצע האש של מחרוזות ולחשב תגיות באמצעות אלגוריתמי HMAC הזמינים. אל תשפטו אותי בחומרה - זוהי האפליקציה הראשונה שיצרתי ב-React.",
    designation: "פרויקט React",
    src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/rct.webp",
    link: "https://northstrix.github.io/React-Cryptographic-Toolkit/",
  },
  {
    name: "מקטע גיבור בהשראת PHA5E",
    quote:
      "רכיב לא שגרתי וניתן להתאמה אישית. הוספתי אותו כאן כדי להדגים שאני מסוגל ליצור אפליקציית Angular.",
    designation: "פרויקט Angular",
    src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/pha5e-inspired-hero-section.webp",
    link: "https://pha5e-inspired-hero-section.netlify.app/",
  },
  {
    name: "בוטלג וובסייט לוקליזיישן טול",
    quote:
      "כלי פשוט שנועד לבצע לוקליזציה לאתרים שנוצרו עם בוני האתרים Bazium, כמו גם לגרסאות ה-vanilla HTML/CSS/JS שלהם.",
    designation: "פרויקט HTML/CSS/JS וונילה",
    src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/bwlt.webp",
    link: "https://codepen.io/Northstrix/full/mydWRJB",
  },
  {
    name: "מצפין קבצים בדפדפן",
    quote:
      "כלי מבוסס דפדפן המבצע הצפנת קבצים מקומית ללא אינטראקציה עם השרת. משתמש ב-AES-256 להצפנת נתונים וב-HMAC-SHA512 לאימות שלמות.",
    designation: "פרויקט HTML/CSS/JS וונילה",
    src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/in-browser-file-encrypter.webp",
    link: "https://codepen.io/Northstrix/full/xxvXvJL",
  },
]

function handleItemClick(link: string) {
  console.log(\`Clicked link: \${link}\`)
}
</script>

<template>
  <div class="showcase-demo-stack">
    <!-- Top container: no background set -->
    <div class="showcase-demo-section">
      <div class="showcase-demo-inner">
        <ProjectShowcase
          :testimonials="testimonialsLTR"
          :autoplay="true"
          :colors="{ name: '#fff', position: '#999', testimony: '#ccc' }"
          :fontSizes="{ name: '28px', position: '20px', testimony: '20px' }"
          :spacing="{ nameTop: '0', nameBottom: '10px', positionTop: '0', positionBottom: '0.5em', testimonyTop: '1.24em', testimonyBottom: '1em', lineHeight: '1.56' }"
          :outerRounding="'18.2px'"
          :innerRounding="'18px'"
          :outlineColor="'#33313d'"
          :hoverOutlineColor="'#403d4d'"
          halomotButtonGradient="linear-gradient(to right, #a123f4, #603dec)"
          halomotButtonBackground="#111014"
          halomotButtonTextColor="#fff"
          halomotButtonOuterBorderRadius="6.34px"
          halomotButtonInnerBorderRadius="6px"
          halomotButtonHoverTextColor="#fff"
          :onItemClick="handleItemClick"
        />
      </div>
    </div>
    <!-- Bottom container: light background, white box with 12px rounding and 32px padding -->
    <div class="showcase-demo-section light">
      <div class="showcase-demo-inner white-container">
        <ProjectShowcase
          :testimonials="testimonialsRTL"
          :autoplay="true"
          :colors="{ name: '#0a0a0a', position: '#454545', testimony: '#171717' }"
          :fontSizes="{ name: '32px', position: '21px', testimony: '21px' }"
          :spacing="{ nameTop: '0', nameBottom: '12px', positionTop: '0', positionBottom: '0.5em', testimonyTop: '1.24em', testimonyBottom: '1em', lineHeight: '1.56' }"
          :outerRounding="'18.2px'"
          :innerRounding="'18px'"
          :outlineColor="'#33313d'"
          :hoverOutlineColor="'#4776cb'"
          :buttonInscriptions="{ previousButton: 'הקודם', nextButton: 'הבא', openWebAppButton: 'פתח אפליקציה' }"
          halomotButtonGradient="linear-gradient(to right, #603dec, #a123f4)"
          halomotButtonBackground="#f2f2fa"
          halomotButtonTextColor="#111"
          halomotButtonOuterBorderRadius="16.2px"
          halomotButtonInnerBorderRadius="15px"
          halomotButtonHoverTextColor="#fff"
          :isRTL="true"
          :onItemClick="handleItemClick"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.showcase-demo-stack {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
}
.showcase-demo-section {
  width: 100%;
  padding: 4rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
}
.showcase-demo-section.light {
   background: #f7f7ff;
     border-radius: 12px;
}
.showcase-demo-inner {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
}
.white-container {
  background: #f7f7ff;
  padding: 32px;
}
</style>

// Note: The ProjectShowcase component accepts the following props:
// - testimonials: Testimonial[] (required) - Array of testimonial objects. Each testimonial:
//     - quote: string - The testimonial or project description.
//     - name: string - The name/title of the project or person.
//     - designation: string - The designation or category.
//     - src: string - The URL of the project's image.
//     - link: string (optional) - The URL to the project or external resource.
// - autoplay: boolean (optional) - Whether to automatically cycle through testimonials every 5 seconds (default: false).
// - colors: object (optional) - Custom colors for text elements:
//     - name: string (optional) - Color of the name text (default: "#fff").
//     - position: string (optional) - Color of the designation text (default: "#999").
//     - testimony: string (optional) - Color of the quote/description text (default: "#ccc").
// - fontSizes: object (optional) - Font sizes for text elements:
//     - name: string (optional) - Font size for the name (default: "28px").
//     - position: string (optional) - Font size for the designation (default: "20px").
//     - testimony: string (optional) - Font size for the quote/description (default: "20px").
// - spacing: object (optional) - Spacing options for the component:
//     - top: string (optional) - Top padding (default: "20").
//     - bottom: string (optional) - Bottom padding (default: "20").
//     - lineHeight: string (optional) - Line height for the quote (default: "1.5").
//     - nameTop: string (optional) - Top spacing for the name (default: "0").
//     - nameBottom: string (optional) - Bottom spacing for the name (default: "10px").
//     - positionTop: string (optional) - Top spacing for the designation (default: "0").
//     - positionBottom: string (optional) - Bottom spacing for the designation (default: "0.5em").
//     - testimonyTop: string (optional) - Top spacing for the quote (default: "1.24em").
//     - testimonyBottom: string (optional) - Bottom spacing for the quote (default: "1em").
// - imageAspectRatio: number (optional) - Aspect ratio for images (default: 1.37).
// - isRTL: boolean (optional) - Whether to use right-to-left layout (default: false).
// - onItemClick: function (optional) - Callback when the "Open Web App" button is clicked. Receives the link as a string.
// - outerRounding: string (optional) - Border radius for the image outer wrapper (default: "18.2px").
// - innerRounding: string (optional) - Border radius for the image inner wrapper (default: "18px").
// - outlineColor: string (optional) - Outline color for the image container (default: "#33313d").
// - hoverOutlineColor: string (optional) - Outline color on hover (default: "#403d4d").
// - buttonInscriptions: object (optional) - Button text options:
//     - previousButton: string - Text for the "Previous" button (default: "Prev.").
//     - nextButton: string - Text for the "Next" button (default: "Next").
//     - openWebAppButton: string - Text for the "Open Web App" button (default: "Open Web App").
// - halomotButtonGradient: string (optional) - CSS gradient for Halomot buttons (default: "linear-gradient(to right, #a123f4, #603dec)").
// - halomotButtonBackground: string (optional) - Background color for Halomot buttons (default: "#111014").
// - halomotButtonTextColor: string (optional) - Text color for Halomot buttons (default: "#fff").
// - halomotButtonOuterBorderRadius: string (optional) - Outer border radius for Halomot buttons (default: "6.34px").
// - halomotButtonInnerBorderRadius: string (optional) - Inner border radius for Halomot buttons (default: "6px").
// - halomotButtonHoverTextColor: string (optional) - Text color for the Halomot button when hovered.
//
// Emits: None.
//
// Slots: None.
//
// Usage notes:
// - The image container is animated in/out with a sliding and blur effect (GSAP).
// - Text transitions are animated word-by-word for a lively effect.
// - Navigation buttons ("Prev.", "Next") and an "Open Web App" button are provided.
// - The image container uses a double-radius outline and animates on hover.
// - Autoplay cycles testimonials every 5 seconds by default; stops on user interaction.
// - All colors, font sizes, and spacings are customizable via props.
// - RTL mode is supported for full right-to-left layouts.
// - Designed for visually engaging, modern project/testimonial showcase.
`,
    code: [
      {
        filename: 'ProjectShowcase.vue',
        content: `<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import gsap from 'gsap'
import HalomotButton from '../halomot-button/HalomotButton.vue'

type Testimonial = {
  quote: string
  name: string
  designation: string
  src: string
  link?: string
}

const props = defineProps<{
  testimonials: Testimonial[]
  autoplay?: boolean
  colors?: { name?: string; position?: string; testimony?: string }
  fontSizes?: { name?: string; position?: string; testimony?: string }
  spacing?: {
    top?: string
    bottom?: string
    lineHeight?: string
    nameTop?: string
    nameBottom?: string
    positionTop?: string
    positionBottom?: string
    testimonyTop?: string
    testimonyBottom?: string
  }
  imageAspectRatio?: number
  isRTL?: boolean
  onItemClick?: (link: string) => void
  outerRounding?: string
  innerRounding?: string
  outlineColor?: string
  hoverOutlineColor?: string
  buttonInscriptions?: {
    previousButton: string
    nextButton: string
    openWebAppButton: string
  }
  halomotButtonGradient?: string
  halomotButtonBackground?: string
  halomotButtonTextColor?: string
  halomotButtonOuterBorderRadius?: string
  halomotButtonInnerBorderRadius?: string
  halomotButtonHoverTextColor?: string
}>()

const {
  testimonials,
  autoplay = false,
  colors = { name: "#fff", position: "#999", testimony: "#ccc" },
  fontSizes = { name: "28px", position: "20px", testimony: "20px" },
  spacing = {
    top: "20",
    bottom: "20",
    lineHeight: "1.5",
    nameTop: "0",
    nameBottom: "10px",
    positionTop: "0",
    positionBottom: "0.5em",
    testimonyTop: "1.24em",
    testimonyBottom: "1em"
  },
  imageAspectRatio = 1.37,
  isRTL = false,
  onItemClick,
  outerRounding = "18.2px",
  innerRounding = "18px",
  outlineColor = "#33313d",
  hoverOutlineColor = "#403d4d",
  buttonInscriptions = {
    previousButton: "Prev.",
    nextButton: "Next",
    openWebAppButton: "Open Web App"
  },
  halomotButtonGradient = "linear-gradient(to right, #a123f4, #603dec)",
  halomotButtonBackground = "#111014",
  halomotButtonTextColor = "#fff",
  halomotButtonOuterBorderRadius = "6.34px",
  halomotButtonInnerBorderRadius = "6px",
  halomotButtonHoverTextColor
} = props

const active = ref(0)
const nextActive = ref(0)
const showImage = ref(true)
const transitionDirection = ref<'next' | 'prev'>('next')
const hoveredImage = ref<number | null>(null)
const imageContainerKey = ref(0)
const simulatedHover = ref(false)
let autoplayInterval: ReturnType<typeof setInterval> | null = null
let hoverTimeout: ReturnType<typeof setTimeout> | null = null

function handleNext() {
  transitionDirection.value = 'next'
  nextActive.value = (active.value + 1) % testimonials.length
  showImage.value = false
  stopAutoplay()
}
function handlePrev() {
  transitionDirection.value = 'prev'
  nextActive.value = (active.value - 1 + testimonials.length) % testimonials.length
  showImage.value = false
  stopAutoplay()
}
function stopAutoplay() {
  if (autoplayInterval) clearInterval(autoplayInterval)
}
function calculateGap(width: number) {
  const minWidth = 1024, maxWidth = 1456, minGap = 30, maxGap = 42
  if (width <= minWidth) return minGap
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth))
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
}

// --- IMAGE TRANSITION HOOKS ---
// FIXED: Make x direction RTL-aware
function getImageTransitionX(dir: 'next' | 'prev', rtl: boolean) {
  // For LTR: next = -40, prev = 40
  // For RTL: next = 40, prev = -40
  if (!rtl) {
    return dir === 'next' ? -40 : 40
  } else {
    return dir === 'next' ? 40 : -40
  }
}
function beforeEnterImage(el: Element) {
  const dir = transitionDirection.value
  const x = getImageTransitionX(dir, isRTL)
  gsap.set(el, { opacity: 0, scale: 0.92, x, filter: "blur(16px)" })
}
function enterImage(el: Element, done: () => void) {
  gsap.to(el, {
    opacity: 1,
    scale: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 0.7,
    ease: "power2.out",
    onComplete: done
  })
}
function leaveImage(el: Element, done: () => void) {
  const dir = transitionDirection.value
  const x = getImageTransitionX(dir === 'next' ? 'prev' : 'next', isRTL)
  gsap.to(el, {
    opacity: 0,
    scale: 0.92,
    x,
    filter: "blur(16px)",
    duration: 0.5,
    ease: "power2.in",
    onComplete: done
  })
}

// --- TEXT TRANSITION HOOKS (SWAPPED) ---
function beforeEnterText(el: Element) {
  const dir = transitionDirection.value
  const y = (dir === 'next') ? -30 : 30 // swapped
  gsap.set(el, { opacity: 0, y })
  const words = el.querySelectorAll('.showcase-word')
  const wordY = (dir === 'next') ? -10 : 10 // swapped
  gsap.set(words, { filter: "blur(14px)", opacity: 0, y: wordY })
}
function enterText(el: Element, done: () => void) {
  gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
  const words = el.querySelectorAll('.showcase-word')
  gsap.to(words, {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
    stagger: 0.018,
    duration: 0.22,
    ease: "power2.out",
    delay: 0.16,
    onComplete: done
  })
}
function leaveText(el: Element, done: () => void) {
  const dir = transitionDirection.value
  const y = (dir === 'next') ? 30 : -30 // swapped
  gsap.to(el, { opacity: 0, y, duration: 0.4, ease: "power2.in" })
  const words = el.querySelectorAll('.showcase-word')
  const wordY = (dir === 'next') ? 10 : -10 // swapped
  gsap.to(words, {
    opacity: 0,
    y: wordY,
    filter: "blur(14px)",
    stagger: 0.012,
    duration: 0.18,
    ease: "power2.in",
    onComplete: done
  })
}

// --- RERENDER IMAGE CONTAINER AND SIMULATE HOVER ---
async function onAfterLeaveImage() {
  active.value = nextActive.value
  await nextTick()
  showImage.value = true
  imageContainerKey.value += 1 // force rerender[6][1]
  await nextTick()
  simulatedHover.value = true
  if (hoverTimeout) clearTimeout(hoverTimeout)
  hoverTimeout = setTimeout(() => {
    simulatedHover.value = false
  }, 120) // 120ms simulated hover
}

onMounted(() => {
  if (autoplay) {
    autoplayInterval = setInterval(() => {
      handleNext()
    }, 5000)
  }
})
</script>

<template>
  <div
    class="project-showcase-root"
    :style="{
      lineHeight: spacing.lineHeight,
      backgroundColor: 'transparent',
      direction: isRTL ? 'rtl' : 'ltr',
      paddingTop: spacing.top + 'px',
      paddingBottom: spacing.bottom + 'px'
    }"
  >
    <div
      class="project-showcase-grid"
      :style="{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: calculateGap(1456) + 'px'
      }"
    >
      <div class="project-showcase-image-col">
        <div class="project-showcase-image-wrapper" :style="{ paddingTop: (1 / imageAspectRatio) * 100 + '%' }">
          <Transition
            mode="out-in"
            @before-enter="beforeEnterImage"
            @enter="enterImage"
            @leave="leaveImage"
            @after-leave="onAfterLeaveImage"
          >
            <div
              v-if="showImage"
              :key="testimonials[active].src"
              class="project-showcase-image-abs"
              :style="{ zIndex: 1 }"
            >
              <div
                :key="imageContainerKey"
                class="showcase-img-container"
                :class="{ 'outline-hovered': hoveredImage === active || simulatedHover }"
                :style="{
                  borderRadius: outerRounding,
                  padding: '1px',
                  backgroundColor: (hoveredImage === active || simulatedHover) ? hoverOutlineColor : outlineColor,
                  transition: 'background-color 0.3s ease-in-out',
                  height: '100%',
                  width: '100%'
                }"
                @mouseenter="hoveredImage = active"
                @mouseleave="hoveredImage = null"
              >
                <div
                  class="showcase-img-inner"
                  :style="{
                    borderRadius: innerRounding,
                    overflow: 'hidden',
                    height: '100%',
                    width: '100%'
                  }"
                >
                  <img
                    :src="testimonials[active].src"
                    :alt="testimonials[active].name"
                    style="width: 100%; height: 100%; object-fit: cover; display: block;"
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      <div class="project-showcase-text-col">
        <Transition
          mode="out-in"
          @before-enter="beforeEnterText"
          @enter="enterText"
          @leave="leaveText"
        >
          <div class="project-showcase-text-wrap" :key="testimonials[active].name">
            <h3
              class="project-showcase-name"
              :style="{
                fontSize: fontSizes.name,
                color: colors.name,
                marginTop: spacing.nameTop,
                marginBottom: spacing.nameBottom,
                textAlign: isRTL ? 'right' : undefined
              }"
            >
              {{ testimonials[active].name }}
            </h3>
            <p
              class="project-showcase-position"
              :style="{
                fontSize: fontSizes.position,
                color: colors.position,
                marginTop: spacing.positionTop,
                marginBottom: spacing.positionBottom,
                textAlign: isRTL ? 'right' : undefined
              }"
            >
              {{ testimonials[active].designation }}
            </p>
            <p
              class="project-showcase-quote"
              :style="{
                fontSize: fontSizes.testimony,
                color: colors.testimony,
                marginTop: spacing.testimonyTop,
                marginBottom: spacing.testimonyBottom,
                textAlign: isRTL ? 'right' : undefined
              }"
            >
              <span
                v-for="(word, i) in testimonials[active].quote.split(' ')"
                :key="i"
                class="showcase-word"
                :style="{ display: 'inline-block' }"
              >{{ word }}&nbsp;</span>
            </p>
          </div>
        </Transition>
        <div class="project-showcase-buttons">
          <HalomotButton
            :inscription="buttonInscriptions.previousButton"
            @click="handlePrev"
            fixedWidth="172px"
            :gradient="halomotButtonGradient"
            :backgroundColor="halomotButtonBackground"
            :textColor="halomotButtonTextColor"
            :innerBorderRadius="halomotButtonInnerBorderRadius"
            :outerBorderRadius="halomotButtonOuterBorderRadius"
            :hoverTextColor="halomotButtonHoverTextColor"
          />
          <HalomotButton
            :inscription="buttonInscriptions.nextButton"
            @click="handleNext"
            fixedWidth="172px"
            :gradient="halomotButtonGradient"
            :backgroundColor="halomotButtonBackground"
            :textColor="halomotButtonTextColor"
            :innerBorderRadius="halomotButtonInnerBorderRadius"
            :outerBorderRadius="halomotButtonOuterBorderRadius"
            :hoverTextColor="halomotButtonHoverTextColor"
          />
          <HalomotButton
            :inscription="buttonInscriptions.openWebAppButton"
            @click="() => onItemClick && onItemClick(testimonials[active].link || '')"
            fillWidth
            :gradient="halomotButtonGradient"
            :backgroundColor="halomotButtonBackground"
            :textColor="halomotButtonTextColor"
            :innerBorderRadius="halomotButtonInnerBorderRadius"
            :outerBorderRadius="halomotButtonOuterBorderRadius"
            :hoverTextColor="halomotButtonHoverTextColor"
            :href="testimonials[active].link"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-showcase-root {
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
}
.project-showcase-grid {
  width: 100%;
  margin: 0 auto;
  align-items: stretch;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
}
.project-showcase-image-col {
  width: 100%;
  position: relative;
}
.project-showcase-image-wrapper {
  position: relative;
  width: 100%;
}
.project-showcase-image-abs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.showcase-img-container {
  height: 100%;
  width: 100%;
}
.showcase-img-inner {
  height: 100%;
  width: 100%;
}
.project-showcase-text-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0.5rem;
  width: 100%;
}
.project-showcase-text-wrap {
  width: 100%;
}
.project-showcase-name {
  font-weight: bold;
  margin: 0;
}
.project-showcase-position {
  margin: 0;
}
.project-showcase-quote {
  margin: 0;
  font-weight: 500;
}
.showcase-word {
  opacity: 1;
  filter: blur(0px);
  transition: filter 0.2s, opacity 0.2s, transform 0.2s;
}
.project-showcase-buttons {
  display: flex;
  gap: 1.5rem;
  margin-top: 2.5rem;
  align-items: center;
}
</style>
` }
    ],
    dependencies: `npm install gsap
[Halomot Button](/components/halomot-button)`,
    credit: `[Animated Testimonials](https://ui.aceternity.com/components/animated-testimonials) by [Aceternity UI](https://ui.aceternity.com/)`,
    previewType: 'image',
    imageLink: "/previews/project-showcase.webp"
  },
  {
    name: 'Playing Card',
    route: 'playing-card',
    description: 'An interactive component inspired by a playing card.',
    usage: `<script setup lang="ts">
import PlayingCard from './PlayingCard.vue'

function handleCardClick() {
  console.log('Card clicked!')
}
</script>

<template>
  <div
    style="display: flex; flex-direction: column; align-items: center; padding: 32px; border-radius: 8px; min-height: 300px;"
  >
    <div
      style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; width: 100%;"
    >
      <PlayingCard
        componentWidth="412px"
        aspectRatio="3/4"
        outerRounding="18px"
        innerRounding="18px"
        backgroundColor="#FFF"
        foregroundColor="#000"
        :imageHeightPercentage="70"
        imageSrc="https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/playground-card-image.webp"
        imageAlt=""
        outlineColor="#ddd"
        hoverOutlineColor="#aaa"
        :textArray="['洪', '秀', '全']"
        :minWidth="200"
        :maxWidth="400"
        :minTextSize="16"
        :maxTextSize="24"
        verticalPadding="20px"
        horizontalPadding="20px"
        :manualLetterSpacing="6"
        componentId="card-1"
        :onCardClicked="handleCardClick"
        textColorTransitionDelay="1s"
        textColorTransitionDuration="2.4s"
      />
    </div>
  </div>
</template>

// Note: The PlayingCard component accepts the following props:
// - componentWidth: string (optional, default: "412px") - The maximum width of the card.
// - aspectRatio: string (optional, default: "3/4") - The aspect ratio of the card (width/height).
// - outerRounding: string (optional, default: "18px") - CSS border-radius for the card's outer border.
// - innerRounding: string (optional, default: "18px") - CSS border-radius for the card's inner container.
// - backgroundColor: string (optional, default: "#FFF") - The background color of the card.
// - defaultTextColor: string (optional, default: "#3662f4") - The default text color for the card's main and mirrored text.
// - hoveredTextColor: string (optional, default: "#f12b30") - The text color when the card is hovered.
// - imageHeightPercentage: number (optional, default: 70) - The height of the image container as a percentage of the card's height.
// - imageSrc: string (required) - The URL or path to the card's image.
// - imageAlt: string (optional, default: "") - The alt text for the card's image.
// - outlineColor: string (optional, default: "#ddd") - The color of the card's outline in its normal state.
// - hoverOutlineColor: string (optional, default: "#aaa") - The outline color when the card is hovered.
// - textArray: string[] (required) - An array of strings to display as the card's main and mirrored text (vertical layout).
// - minWidth: number (required) - The minimum card width for dynamic text sizing.
// - maxWidth: number (required) - The maximum card width for dynamic text sizing.
// - minTextSize: number (required) - The minimum text size for dynamic resizing.
// - maxTextSize: number (required) - The maximum text size for dynamic resizing.
// - verticalPadding: string (optional, default: "20px") - The vertical padding for the card's content.
// - horizontalPadding: string (optional, default: "20px") - The horizontal padding for the card's content.
// - manualLetterSpacing: number (optional) - Manually set letter spacing (overrides automatic).
// - componentId: string (optional, default: "card-1") - Unique ID for the card (used for DOM queries).
// - onCardClicked: () => void (required) - Callback function invoked when the card is clicked.
// - textColorTransitionDelay: string (optional, default: "1s") - Delay before the text color transition starts.
// - textColorTransitionDuration: string (optional, default: "2.4s") - Duration of the text color transition.
//
// Emits: None.
//
// Slots: None.
//
// Usage notes:
// - The card image is centered and sized proportionally to the card's height.
// - Clicking the card triggers the onCardClicked callback.
// - All styling is handled via vanilla CSS and inline styles; no external dependencies or Tailwind required.
`,
    code: [
      {
        filename: 'PlayingCard.vue',
        content: `<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

const props = defineProps<{
  componentWidth?: string
  aspectRatio?: string
  outerRounding?: string
  innerRounding?: string
  backgroundColor?: string
  imageHeightPercentage?: number
  imageSrc: string
  imageAlt?: string
  outlineColor?: string
  hoverOutlineColor?: string
  textArray: string[]
  minWidth: number
  maxWidth: number
  minTextSize: number
  maxTextSize: number
  verticalPadding?: string
  horizontalPadding?: string
  manualLetterSpacing?: number
  componentId?: string
  onCardClicked: () => void
  textColorTransitionDelay?: string
  textColorTransitionDuration?: string
  defaultTextColor?: string
  hoveredTextColor?: string
}>()

const {
  componentWidth = "412px",
  aspectRatio = "3/4",
  outerRounding = "18px",
  innerRounding = "18px",
  backgroundColor = "#FFF",
  imageHeightPercentage = 70,
  imageSrc,
  imageAlt = "",
  outlineColor = "#ddd",
  hoverOutlineColor = "#aaa",
  textArray,
  minWidth,
  maxWidth,
  minTextSize,
  maxTextSize,
  verticalPadding = "20px",
  horizontalPadding = "20px",
  manualLetterSpacing,
  componentId = "card-1",
  onCardClicked,
  textColorTransitionDelay = "1s",
  textColorTransitionDuration = "2.4s",
  defaultTextColor = '#3662f4',
  hoveredTextColor = '#f12b30'
} = props

const containerRef = ref<HTMLElement | null>(null)
const textSize = ref(maxTextSize)
const letterSpacing = ref(manualLetterSpacing ?? 0)
const isHovered = ref(false)

function updateTextSizeAndSpacing() {
  if (!containerRef.value) return

  // Dynamic text size
  const width = containerRef.value.offsetWidth
  const calculatedTextSize =
    ((maxTextSize - minTextSize) / (maxWidth - minWidth)) * (width - minWidth) +
    minTextSize
  textSize.value = Math.max(minTextSize, Math.min(calculatedTextSize, maxTextSize))

  // Dynamic letter spacing (vertical, proportional to text size)
  if (manualLetterSpacing !== undefined) {
    letterSpacing.value = manualLetterSpacing
    return
  }
  if (textArray.length > 1) {
    const height = containerRef.value.offsetHeight
    const availableHeight = height - parseInt(verticalPadding) * 2
    letterSpacing.value = (availableHeight - textSize.value * textArray.length) / (textArray.length - 1)
  } else {
    letterSpacing.value = 0
  }
}

onMounted(() => {
  nextTick(updateTextSizeAndSpacing)
  window.addEventListener('resize', updateTextSizeAndSpacing)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTextSizeAndSpacing)
})

watch(
  [() => props.manualLetterSpacing, textArray, textSize, () => props.verticalPadding],
  () => nextTick(updateTextSizeAndSpacing)
)

const textTransition = \`color \${textColorTransitionDuration} ease-in-out \${textColorTransitionDelay}\`
</script>

<template>
  <div
    ref="containerRef"
    class="playing-card-root"
    :style="{ maxWidth: componentWidth, width: '100%' }"
    :data-component-id="componentId"
    @click="onCardClicked"
  >
    <div
      class="playing-card-outer"
      :style="{
        borderRadius: outerRounding,
        padding: '1px',
        background: isHovered ? hoverOutlineColor : outlineColor,
        width: '100%',
        aspectRatio: aspectRatio,
        transition: 'background 0.3s ease-in-out',
        cursor: 'pointer'
      }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div
        class="playing-card-inner"
        :style="{
          backgroundColor: backgroundColor,
          padding: \`\${verticalPadding} \${horizontalPadding}\`,
          borderRadius: innerRounding,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          transition: 'background-color 0.3s ease-in-out'
        }"
      >
        <!-- Main Text (vertical, top left) -->
        <div
          :id="\`\${componentId}-text\`"
          class="playing-card-text-vertical"
          :style="{
            position: 'absolute',
            top: verticalPadding,
            left: horizontalPadding,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 2,
            color: isHovered ? hoveredTextColor : defaultTextColor,
            fontWeight: 'bold',
            fontSize: \`\${textSize}px\`,
            transition: textTransition
          }"
        >
          <div
            v-for="(letter, index) in textArray"
            :key="\`\${componentId}-letter-\${index}\`"
            :style="{ marginBottom: index !== textArray.length - 1 ? \`\${letterSpacing}px\` : '0', letterSpacing: '0' }"
          >
            {{ letter }}
          </div>
        </div>

        <!-- Mirrored Text (vertical, bottom right) -->
        <div
          :id="\`\${componentId}-mirror\`"
          class="playing-card-text-vertical"
          :style="{
            position: 'absolute',
            bottom: verticalPadding,
            right: horizontalPadding,
            display: 'flex',
            flexDirection: 'column',
            transform: 'scale(-1)',
            zIndex: 2,
            color: isHovered ? hoveredTextColor : defaultTextColor,
            fontWeight: 'bold',
            fontSize: \`\${textSize}px\`,
            transition: textTransition
          }"
        >
          <div
            v-for="(letter, index) in textArray"
            :key="\`\${componentId}-mirror-letter-\${index}\`"
            :style="{ marginBottom: index !== textArray.length - 1 ? \`\${letterSpacing}px\` : '0', letterSpacing: '0' }"
          >
            {{ letter }}
          </div>
        </div>

        <!-- Image -->
        <div
          style="flex: 1; display: flex; justify-content: center; align-items: center; position: relative; width: 100%;"
        >
          <div
            :style="{ position: 'relative', height: imageHeightPercentage + '%', width: 'auto', aspectRatio: '1/1' }"
          >
            <img
              :src="imageSrc"
              :alt="imageAlt"
              draggable="false"
              style="height: 100%; width: 100%; object-fit: contain; object-position: center; display: block;"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.playing-card-root {
  box-sizing: border-box;
}
.playing-card-outer {
  box-shadow: 0 4px 16px 0 rgba(0,0,0,0.08);
  display: inline-block;
}
.playing-card-inner {
  box-sizing: border-box;
}
.playing-card-text-vertical {
  pointer-events: none;
  user-select: none;
  line-height: 1.1;
}
</style>
` }
    ],
    dependencies: ``,
    credit: ``,
    previewType: 'image',
    imageLink: '/previews/playing-card.webp'
  },
  {
    name: 'Stargazing Button',
    route: 'stargazing-button',
    description: 'A customizable, animated button with a sparkly, particle-rich background.',
    usage: `<script setup lang="ts">
import StargazingButton from './StargazingButton.vue'
</script>

<template>
  <div style="display: flex; align-items: center; justify-content: center">
    <StargazingButton
      githubLink="https://github.com/Northstrix/Midbar"
      :hue="249"
      borderRadius="100px"
      fontSize="1.5rem"
      :iconSize="28"
      :iconStrokeWidth="2.4"
      iconGap="0.42em"
      separatorMargin="0 0.76em"
      separatorColor="#aaa"
      separatorWidth="2px"
      shadowColor="#7664fc"
      mobileFontSize="1.1rem"
      :mobileIconSize="20"
      :mobileIconStrokeWidth="1.9"
      :desktopThreshold="1536"
    />
  </div>
</template>

// Note: The StargazingButton component accepts the following props:
// - githubLink: string (required) - The GitHub repository URL (e.g. "https://github.com/Northstrix/Midbar").
// - hue: number (optional, default: 260) - The hue for the button's color theme (used in gradients and sparkles).
// - borderRadius: string (optional, default: "5em") - CSS border-radius for the button.
// - fontSize: string (optional, default: "1.25rem") - Font size for the button text (desktop).
// - iconSize: number (optional, default: 22) - Size (in px) for the icons (desktop).
// - iconStrokeWidth: number (optional, default: 2.2) - Stroke width for the icons (desktop).
// - iconGap: string (optional, default: "0.08em") - Gap between the GitHub icon, text, star icon, and star count.
// - separatorMargin: string (optional, default: "0 0.45em") - Margin for the optional separator between text and star icon.
// - separatorColor: string (optional) - Color for the separator line (defaults to a light hue based on the button color).
// - separatorWidth: string (optional, default: "2px") - Width of the separator line.
// - shadowColor: string (optional) - Color for the button shadow on hover/active/over (defaults to a dark hue based on the button color).
// - mobileFontSize: string (optional, default: "1rem") - Font size for the button text on mobile screens.
// - mobileIconSize: number (optional, default: 19) - Icon size for mobile screens.
// - mobileIconStrokeWidth: number (optional, default: 2) - Icon stroke width for mobile screens.
// - desktopThreshold: number (optional, default: 600) - Screen width (in px) below which mobile styles are applied.
//
// Emits: None.
//
// Slots: None.
//
// Usage notes:
// - The button fetches and animates the GitHub star count for the specified repo.
// - The sparkles/particle animation is always running.
// - Clicking the button opens the GitHub repo in a new tab.
`,
    code: [
      {
        filename: 'StargazingButton.vue',
        content: `<script setup lang="ts">
import { ref, onMounted, watch, computed, onUnmounted, nextTick } from 'vue'
import { Github, Star } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  githubLink: string
  hue?: number
  borderRadius?: string
  fontSize?: string
  iconSize?: number
  iconStrokeWidth?: number
  iconGap?: string
  separatorMargin?: string
  separatorColor?: string
  separatorWidth?: string
  shadowColor?: string
  mobileFontSize?: string
  mobileIconSize?: number
  mobileIconStrokeWidth?: number
  desktopThreshold?: number
}>(), {
  hue: 260,
  borderRadius: '5em',
  fontSize: '1.25rem',
  iconSize: 22,
  iconStrokeWidth: 2.2,
  iconGap: '0.08em',
  separatorMargin: '0 0.45em',
  separatorColor: '',
  separatorWidth: '2px',
  shadowColor: '',
  mobileFontSize: '1rem',
  mobileIconSize: 19,
  mobileIconStrokeWidth: 2,
  desktopThreshold: 600,
})

const over = ref(false)
const starCount = ref<number | null>(null)
const animatedCount = ref(0)
let animationFrame: number | null = null
const isMobile = ref(false)

function updateIsMobile() {
  isMobile.value = window.innerWidth < props.desktopThreshold
}

onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
  fetchStars()
  injectMediaQuery()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile)
})

watch(() => props.githubLink, fetchStars)
watch(() => props.desktopThreshold, injectMediaQuery)

function openGithub(e: MouseEvent) {
  e.preventDefault()
  window.open(props.githubLink, '_blank', 'noopener')
}

function fetchStars() {
  starCount.value = null
  try {
    const repoPath = new URL(props.githubLink).pathname.slice(1)
    fetch(\`https://api.github.com/repos/\${repoPath}\`)
      .then(resp => resp.json())
      .then(data => {
        if (typeof data.stargazers_count === 'number') {
          starCount.value = data.stargazers_count
          animateTo(data.stargazers_count)
        }
      }).catch(() => {})
  } catch (e) {}
}

function animateTo(target: number) {
  if (animationFrame) cancelAnimationFrame(animationFrame)
  const start = animatedCount.value
  const duration = 1200
  const startTime = performance.now()
  function step(now: number) {
    const t = Math.min((now - startTime) / duration, 1)
    const eased = t < 1 ? 1 - Math.pow(1 - t, 3) : 1
    animatedCount.value = Math.round(start + (target - start) * eased)
    if (t < 1) animationFrame = requestAnimationFrame(step)
    else {
      animationFrame = null
      setTimeout(() => {
        over.value = true
        setTimeout(() => {
          over.value = false
        }, 2500)
      }, 2500)
    }
  }
  animationFrame = requestAnimationFrame(step)
}

// Dynamic styles
const buttonStyle = computed(() => ({
  '--clr': props.hue,
  borderRadius: props.borderRadius,
  fontSize: isMobile.value ? props.mobileFontSize : props.fontSize,
  width: 'auto',
}))

const spanStyle = computed(() => ({
  gap: props.iconGap,
}))

const separatorStyle = computed(() => ({
  margin: props.separatorMargin,
  borderLeft: \`\${props.separatorWidth} solid \${props.separatorColor || \`hsl(\${props.hue}, 100%, 85%)\`}\`,
  height: '1.2em',
  minWidth: props.separatorWidth,
  background: 'none',
}))

const iconSize = computed(() => isMobile.value ? props.mobileIconSize : props.iconSize)
const iconStrokeWidth = computed(() => isMobile.value ? props.mobileIconStrokeWidth : props.iconStrokeWidth)
const computedShadowColor = computed(() =>
  props.shadowColor && props.shadowColor.trim() !== ''
    ? props.shadowColor
    : \`hsla(\${props.hue}, 25%, 12%)\`
)

// Dynamic media query injection for truly prop-driven mobile threshold
function injectMediaQuery() {
  nextTick(() => {
    const id = 'stargazing-btn-media'
    let styleTag = document.getElementById(id)
    if (!styleTag) {
      styleTag = document.createElement('style')
      styleTag.id = id
      document.head.appendChild(styleTag)
    }
    styleTag.textContent = \`
      @media (max-width: \${props.desktopThreshold}px) {
        .stargazing-shadow .sparkles .content {
          padding: 0.65em 1.1em !important;
          font-size: \${props.mobileFontSize} !important;
        }
      }
    \`
  })
}
</script>

<template>
  <div
    class="stargazing-shadow"
    :class="{ over: over }"
    :style="{
      borderRadius: props.borderRadius,
      '--clr': props.hue,
      '--shadow-color': computedShadowColor,
    }"
  >
    <button
      class="sparkles"
      :class="{ over }"
      :style="buttonStyle"
      @click="openGithub"
      type="button"
      tabindex="0"
    >
      <span class="content" :style="spanStyle">
        <Github :size="iconSize" :stroke-width="iconStrokeWidth" style="margin:0; padding:0;" />
        <span style="margin:0; padding:0;">Star on GitHub</span>
        <span class="separator" :style="separatorStyle"></span>
        <Star :size="iconSize - 2" :stroke-width="iconStrokeWidth" style="margin:0; padding:0;" />
        <span class="star-count" style="margin:0; padding:0;">
          {{ animatedCount !== null ? animatedCount.toLocaleString() : '—' }}
        </span>
      </span>
    </button>
  </div>
</template>

<style scoped>
.stargazing-shadow {
  display: inline-block;
  border-radius: inherit;
  transition: box-shadow 0.4s cubic-bezier(0.77, 0, 0.18, 1);
  box-shadow: none;
}
.stargazing-shadow.over,
.stargazing-shadow:hover {
  /* Dynamic shadow color, same length/softness as "proper" example */
  box-shadow:
    0 0 20px 4px var(--shadow-color),
    0 0 60px 16px var(--shadow-color);
}

/* OUTLINE/SHADOW LOGIC */
.sparkles {
  --clr: 260;
  font-size: max(2.5vw, 1.25rem);
  font-weight: 700;
  letter-spacing: 0.5px;
  border-radius: inherit;
  background: linear-gradient(
    0deg,
    hsla(var(--clr), 100%, 70%) 0%,
    hsla(var(--clr), 100%, 65%) 5%,
    hsla(var(--clr), 80%, 35%) 15%,
    hsla(var(--clr), 10%, 0%) 40%,
    hsla(var(--clr), 25%, 12%) 90%
  );
  background-size: 200% 300%;
  background-position: 0% 0%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  place-items: center;
  padding: 0;
  position: relative;
  overflow: hidden;
  transform: translate(0px);
  outline: none !important;
  border: none !important;
  width: auto;
  cursor: pointer;
  transition: box-shadow 0.3s cubic-bezier(0.77, 0, 0.18, 1), background-position 0.5s cubic-bezier(0.77, 0, 0.18, 1);
  box-shadow: 0 0 0 1px #312f3b;
  white-space: nowrap;
}
.sparkles:hover,
.sparkles:focus,
.sparkles.over {
  box-shadow:
    0 0 20px 4px var(--shadow-color),
    0 0 60px 16px var(--shadow-color);
}
.sparkles:hover,
.sparkles.over {
  background-position: 100% 100%;
  transition: all 0.2s cubic-bezier(0.17, 0.84, 0.44, 1);
}
.sparkles::before,
.sparkles::after {
  content: " ";
  grid-column: 1;
  grid-row: 1;
  width: 100%;
  height: 100%;
  transition: inherit;
  pointer-events: none;
}
.sparkles:before {
  inset: 0;
  position: absolute;
  transform: translate3d(0, 0, 0.01px);
  border-radius: inherit;
  background-image: url("https://assets.codepen.io/13471/silver-glitter-background.png"),
    url("https://assets.codepen.io/13471/silver-glitter-background.png"),
    linear-gradient(180deg, black 0%, white 80%);
  background-size: 300px 170px, 280px 130px, 200% 200%;
  background-blend-mode: multiply, multiply, overlay;
  background-position: 0px 0px, 0px 0px, 50% 100%;
  background-repeat: repeat;
  mix-blend-mode: color-dodge;
  filter: brightness(2) contrast(.75);
  animation: bubble 300s linear infinite;
  opacity: 0.5;
  box-shadow: inset 0 -8px 10px -7px hsla(var(--clr), 70%, 80%, 0.75);
}
.sparkles:hover:before,
.sparkles.over:before {
  animation-duration: 300s;
  filter: brightness(2) contrast(1);
  box-shadow: inset 0 -5px 10px -4px hsla(var(--clr), 70%, 80%, 0.3);
  opacity: .8;
}
.sparkles:after {
  background-image: radial-gradient(
      ellipse at center 70%,
      hsla(var(--clr), 100%, 99%, 0.8) 5%,
      hsla(var(--clr), 90%, 80%, 1) 20%,
      transparent 50%,
      transparent 200%
    ),
    linear-gradient(
      90deg,
      hsla(var(--clr), 80%, 10%, 1) -10%,
      transparent 25%,
      transparent 75%,
      hsla(var(--clr), 80%, 10%, 1) 110%
    );
  box-shadow: inset 0 0.25em 0.75em rgba(0, 0, 0, 1), inset 0 -0.05em 0.2em rgba(255, 255, 255, 0.4), inset 0 -1px 3px hsla(var(--clr), 80%, 50%, 0.75);
  background-blend-mode: darken;
  background-repeat: no-repeat;
  background-size: 180% 80%, cover;
  background-position: center 220%;
  mix-blend-mode: hard-light;
  filter: blur(5px);
  opacity: 0;
  transition: opacity 0.2s;
}
.sparkles:hover:after,
.sparkles.over:after {
  opacity: .8;
  transform: translateY(0px);
}
.sparkles .content {
  grid-column: 1;
  grid-row: 1;
  background-image: linear-gradient(
    hsl(calc(var(--clr) - 43), 27%, 85%) 0%,
    hsl(calc(var(--clr) - 60), 22%, 80%) 19%,
    hsl(calc(var(--clr) - 50), 20%, 75%) 30%,
    hsl(calc(var(--clr) - 52), 36%, 98%) 43%,
    hsl(var(--clr), 70%, 70%, 1) 51%,
    hsl(var(--clr), 50%, 85%, 1) 52%,
    rgb(255, 255, 255) 100%
  );
  background-size: 1em 3.45em;
  color: rgb(214, 222, 226);
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  filter: drop-shadow(0 0 0.05em rgba(0,0,0,0.5)) drop-shadow(0 0.05em 0.05em rgba(0,0,0,0.5));
  padding: 0.75em 1.5em;
  display: flex;
  align-items: center;
  gap: v-bind('iconGap');
  z-index: 10;
  transition: background-position-y 0.25s;
}
.sparkles:hover .content,
.sparkles:active .content,
.sparkles.over .content {
  background-position-y: -100%;
}
.sparkles:active {
  transform: translateY(0.075em);
}
.star-count {
  font-variant-numeric: tabular-nums;
  font-family: inherit;
  color: #fff;
  background: none;
  -webkit-text-fill-color: unset;
  background-clip: unset;
  -webkit-background-clip: unset;
  filter: none;
  font-weight: 700;
  font-size: 0.98em;
  letter-spacing: 0.01em;
}
.separator {
  display: inline-block;
}
@keyframes bubble {
  0% {
    background-position: 0px 340px, 0px 130px, 50% 100%;
  }
  100% {
    background-position: 0px 0px, 0px 0px, 50% 100%;
  }
}
</style>
` }
    ],
    dependencies: ``,
    credit: `[Sparkly Button](https://codepen.io/simeydotme/pen/WNawXQM) by [Simon Goellner](https://codepen.io/simeydotme)
[Counter](https://animata.design/docs/text/counter) by [ANIMATA](https://animata.design)
[Neon Button](https://codepen.io/HighFlyer/pen/WNXRZBv) by [Thea](https://codepen.io/HighFlyer)`,
    previewType: 'center',
  },
  {
    name: 'Animated Cube',
    route: 'animated-cube',
    description: 'An animated 3D cube with customizable colors and scale.',
    usage: `<script setup lang="ts">
import AnimatedCube from './AnimatedCube.vue'
</script>

<template>
  <div style="display: flex; justify-content: center;">
    <AnimatedCube
      :size="50"
      :scale="1.5"
      faceColor="#7dd3fc"
      shadowColor="#0e7490"
      borderColor="#0ea5e9"
      :animationDuration="2.75"
    />
  </div>
</template>


// Note: The AnimatedCube component accepts the following props:
// - size: number (optional) - The width/height of each cube face in pixels (default: 80).
// - scale: number (optional) - The overall scale multiplier for the cube (default: 1).
// - faceColor: string (optional) - The color of the cube faces (default: '#a19fe5').
// - shadowColor: string (optional) - The color of the cube's shadow face (default: '#000').
// - borderColor: string (optional) - The border color for the cube faces (default: '#222').
// - animationDuration: number (optional) - The duration of the cube's rotation/bounce animation in seconds (default: 2).
//
// Emits: None.
//
// Slots: None.
`,
    code: [
      {
        filename: 'AnimatedCube.vue',
        content: `<script setup lang="ts">
import { computed } from 'vue'

interface AnimatedCubeProps {
  size?: number
  scale?: number
  faceColor?: string
  shadowColor?: string
  borderColor?: string
  animationDuration?: number
}

const props = withDefaults(defineProps<AnimatedCubeProps>(), {
  size: 80,
  scale: 1,
  faceColor: '#a19fe5',
  shadowColor: '#000',
  borderColor: '#222',
  animationDuration: 2,
})

const cubeSize = computed(() => props.size * props.scale)
const faces = [
  { class: 'shadow', isShadow: true },
  { class: 'top' },
  { class: 'front' },
  { class: 'back' },
  { class: 'right' },
  { class: 'left' },
]

// Dynamic CSS vars for transforms
const cssVars = computed(() => ({
  '--cube-size': \`\${props.size}px\`,
  '--cube-half': \`\${props.size / 2}px\`,
  '--cube-full': \`\${props.size}px\`,
  '--cube-neg-full': \`-\${props.size}px\`,
  '--cube-rotate-duration': \`\${props.animationDuration}s\`,
  '--cube-bounce-duration': \`\${props.animationDuration}s\`,
}))
</script>

<template>
  <div
    class="scene"
    :style="{
      width: cubeSize + 'px',
      height: cubeSize + 'px',
      transform: \`scale(\${props.scale})\`,
      ...cssVars
    }"
  >
    <div
      class="cube-wrapper"
      :style="{ animationDuration: props.animationDuration + 's' }"
    >
      <div
        class="cube"
        :style="{ animationDuration: props.animationDuration + 's' }"
      >
        <div class="cube-faces" :style="{ width: props.size + 'px', height: props.size + 'px', }">
          <div
            v-for="face in faces"
            :key="face.class"
            class="cube-face"
            :class="face.class"
            :style="{
              width: props.size + 'px',
              height: props.size + 'px',
              background: face.isShadow ? props.shadowColor : props.faceColor,
              border: \`solid 1px \${props.borderColor}\`,
              animationDuration: props.animationDuration + 's'
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scene {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  perspective: 800px;
}

.cube-wrapper {
  transform-style: preserve-3d;
  animation: bouncing var(--cube-bounce-duration, 2s) infinite;
  animation-duration: inherit;
}

.cube {
  transform-style: preserve-3d;
  transform: rotateX(45deg) rotateZ(45deg);
  animation: rotation var(--cube-rotate-duration, 2s) infinite;
  animation-duration: inherit;
}

.cube-faces {
  transform-style: preserve-3d;
  position: relative;
  transform-origin: 0 0;
  /* Center the cube faces stack */
  transform: translateX(0) translateY(0) translateZ(calc(-1 * var(--cube-half)));
}

.cube-face {
  position: absolute;
  inset: 0;
  box-sizing: border-box;
}

.cube-face.shadow {
  /* Shadow face under the cube */
  transform: translateZ(var(--cube-neg-full));
  animation: bouncingShadow var(--cube-bounce-duration, 2s) infinite;
  opacity: 0.05;
}

.cube-face.top {
  transform: translateZ(var(--cube-full));
}

.cube-face.front {
  transform-origin: 0 50%;
  transform: rotateY(-90deg);
}

.cube-face.back {
  transform-origin: 0 50%;
  transform: rotateY(-90deg) translateZ(var(--cube-neg-full));
}

.cube-face.right {
  transform-origin: 50% 0;
  transform: rotateX(-90deg) translateY(var(--cube-neg-full));
}

.cube-face.left {
  transform-origin: 50% 0;
  transform: rotateX(-90deg) translateY(var(--cube-neg-full)) translateZ(var(--cube-full));
}

@keyframes rotation {
  0% {
    transform: rotateX(45deg) rotateY(0) rotateZ(45deg);
  }
  50% {
    transform: rotateX(45deg) rotateY(0) rotateZ(405deg);
  }
  100% {
    transform: rotateX(45deg) rotateY(0) rotateZ(45deg);
  }
}

@keyframes bouncing {
  0% {
    transform: translateY(calc(-0.5 * var(--cube-full)));
  }
  45% {
    transform: translateY(calc(0.5 * var(--cube-full)));
  }
  100% {
    transform: translateY(calc(-0.5 * var(--cube-full)));
  }
}

@keyframes bouncingShadow {
  0% {
    transform: translateZ(var(--cube-neg-full)) scale(1.3);
    opacity: 0.05;
  }
  45% {
    transform: translateZ(0);
    opacity: 0.3;
  }
  100% {
    transform: translateZ(var(--cube-neg-full)) scale(1.3);
    opacity: 0.05;
  }
}
</style>
` }
    ],
    dependencies: ``,
    credit: `[Bouncing Cube Loader](https://codepen.io/haja-ran/pen/xxWRKNm) by [Haja Randriakoto](https://codepen.io/haja-ran)`,
    previewType: 'center',
  },
  {
    name: 'Shamayim Toggle Switch',
    route: 'shamayim-toggle-switch',
    description: 'A celestial-themed toggle switch with a smooth animation and mirroring option.',
    usage: `<script setup lang="ts">
import ShamayimToggleSwitch from './ShamayimToggleSwitch.vue'

function handleTopSwitch(isOn: boolean) {
  console.log(\`Top switch is now \${isOn ? 'ON' : 'OFF'}\`)
}
function handleBottomSwitch(isOn: boolean) {
  console.log(\`Bottom switch is now \${isOn ? 'ON' : 'OFF'}\`)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 1em; min-height: 300px; width: 100%; border-radius: 8px; background-image: linear-gradient(45deg, #47b6d1, #90e0ec); font-size: 2em;">
    <div style="display: flex; align-items: center; gap: 1em;">
      <span style="color: #E0F9FC;">Mobile Data</span>
      <ShamayimToggleSwitch :default-state="false" :onChange="handleTopSwitch" />
    </div>
    <div style="display: flex; align-items: center; gap: 1em;">
      <ShamayimToggleSwitch :default-state="false" mirrored :onChange="handleBottomSwitch" />
      <span style="color: #E0F9FC;">נתונים סלולריים</span>
    </div>
  </div>
</template>

// Note: The ShamayimToggleSwitch component accepts the following props:
// - defaultState: boolean (required) - The initial state of the toggle switch (true for ON, false for OFF).
// - mirrored: boolean (optional) - Whether to flip the switch horizontally (default: false).
// - onChange: (isOn: boolean) => void (required) - Callback function called when the switch is toggled; receives the new state.
//
// Emits: None.
//
// Slots: None.
`,
    code: [
      {
        filename: 'ShamayimToggleSwitch.vue',
        content: `<script setup lang="ts">
import { ref, watch, computed } from 'vue'

interface ShamayimToggleSwitchProps {
  defaultState: boolean
  mirrored?: boolean
  onChange: (isOn: boolean) => void
}

const props = defineProps<ShamayimToggleSwitchProps>()

const isOn = ref(props.defaultState)

watch(() => props.defaultState, (val) => {
  isOn.value = val
})

function handleToggle() {
  isOn.value = !isOn.value
  props.onChange(isOn.value)
}

const wrapperStyle = computed(() => ({
  transform: props.mirrored ? 'scaleX(-1)' : 'none',
}))
</script>

<template>
  <div class="toggle-wrapper" :style="wrapperStyle">
    <input
      class="toggle-checkbox"
      type="checkbox"
      :checked="isOn"
      @change="handleToggle"
    />
    <svg class="toggle-icon off" viewBox="0 0 16 16">
      <path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8Z"/>
    </svg>
    <div class="toggle-container">
      <div class="toggle-button"></div>
    </div>
    <svg class="toggle-icon on" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 1 1 16 0zM2 8a6 6 0 1 0 12 0A6 6 0 1 0 2 8zm10 0a4 4 0 1 1-8 0 4 4 0 1 1 8 0z"/>
    </svg>
  </div>
</template>

<style scoped>
.toggle-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: .25em;
}

.toggle-icon {
  width: .5em;
  height: .5em;
  fill: #4c9bab;
  filter: drop-shadow(0 1px 1px rgb(255 255 255 / .4));
  transition: fill .4s;
  pointer-events: none;
}

.toggle-checkbox:not(:checked) + .toggle-icon.off,
.toggle-checkbox:checked ~ .toggle-icon.on {
  fill: #e0f9fc;
}

.toggle-checkbox {
  -webkit-appearance: none;
  appearance: none;
  position: absolute;
  z-index: 1;
  border-radius: 3.125em;
  width: 4.05em;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.toggle-container {
  position: relative;
  border-radius: 3.125em;
  width: 4.05em;
  height: 1.5em;
  background-image: repeating-conic-gradient(#0b66a0 0% 25%, #1093a8 0% 50%);
  background-size: .125em .125em;
  box-shadow:
    inset 0 .125em .25em rgba(0, 9, 38, .6),
    inset -1.5em 0 .0625em rgba(0, 9, 38, .5),
    inset .5em 0 .5em rgba(0, 9, 38, .5),
    0 1px 1px rgb(255 255 255 / .4);
}

.toggle-button {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: .0625em;
  left: .0625em;
  border-radius: inherit;
  width: 2.55em;
  height: calc(100% - .125em);
  background-image: linear-gradient(to right, #86e2fa, #125e79);
  box-shadow: 0 .125em .25em rgb(0 0 0 / .6);
  transition: left .4s;
}

.toggle-checkbox:checked ~ .toggle-container > .toggle-button {
  left: 1.4375em;
}

.toggle-button::before {
  content: '';
  position: absolute;
  top: inherit;
  border-radius: inherit;
  width: calc(100% - .375em);
  height: inherit;
  background-image: linear-gradient(to right, #0f73a8, #57cfe2, #b3f0ff);
}

.toggle-button::after {
  content: '';
  position: absolute;
  width: .5em;
  height: 38%;
  background-image: repeating-linear-gradient(to right, #d2f2f6 0 .0625em, #4ea0ae .0625em .125em, transparent .125em .1875em);
}
</style>
` }
    ],
    dependencies: ``,
    credit: `[Skeuomorphic Toggle Switch (vol. 2)](https://codepen.io/nicolasjesenberger/pen/NWOyxyO) by [Nicolas Jesenberger](https://codepen.io/nicolasjesenberger)
[Knóbz Skeuomorphic UI Sample for Figma](https://dribbble.com/shots/14326768-Kn-bz-Skeuomorphic-UI-Sample-for-Figma) by [kolpikov](https://dribbble.com/despoth)`,
    previewType: 'iamge',
    imageLink: 'previews/shamayim-toggle-switch.webp'
  },
  {
    name: 'Glowing Card',
    route: 'glowing-card',
    description: 'A webflow-inspired card that glows on hover.',
    usage: `<script setup lang="ts">
import GlowingCard from './GlowingCard.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
</script>

<template>
  <div style="display: flex; align-items: center; justify-content: center; padding: 16px">
    <GlowingCard
      AccentColor="#8f10f6"
      BackgroundColor="#050505"
      TextColor="#f0f0f1"
      BorderRadius="2.25em"
      BorderWidth="4px"
      TopInscription="GitHub"
      BigInscription=">90"
      SmallInscription="Repositories"
      BottomInscription="Explore Now ➔"
      learnMoreLink="https://github.com/Northstrix"
      width="387px"
      height="467px"
      IconHeight="54px"
      TopTextSize="25px"
    >
      <template #icon="{ iconStyle }">
        <FontAwesomeIcon :icon="faGithub" :style="iconStyle" />
      </template>
    </GlowingCard>
  </div>
</template>

// Note: The GlowingCard component accepts the following props:
// - AccentColor: string (required) - The color used for accents and hover effects on the card.
// - BackgroundColor: string (required) - The background color of the card.
// - TextColor: string (required) - The color of the text displayed on the card.
// - BorderRadius: string (required) - The border radius applied to the card, controlling its roundness.
// - BorderWidth: string | number (required) - The width of the card's border.
// - TopInscription: string (required) - The text displayed at the top of the card, usually indicating the category or title.
// - BigInscription: string (required) - The main highlight text displayed prominently in the center of the card.
// - SmallInscription: string (required) - Additional descriptive text displayed below the big inscription.
// - BottomInscription: string (required) - The clickable text at the bottom of the card, typically prompting user action (e.g., "Learn More").
// - learnMoreLink: string (optional) - A URL that opens in a new tab when the bottom inscription is clicked. This provides a link for users to learn more about the topic or service represented by the card.
// - width: string | number (optional) - The width of the card; defaults to "387px" if not provided.
// - height: string | number (optional) - The height of the card; defaults to "467px" if not provided.
// - IconHeight: string | number (optional) - The height of the icon; defaults to "34px" if not provided.
// - TopTextSize: string | number (optional) - The size of the top inscription text; defaults to "25px" if not provided.
//
// Slots:
// - icon (required): Slot for rendering the icon at the top left of the card. Receives a slot prop \`icon-style\` for dynamic sizing.
//
// Emits: None.
`,
    code: [
      {
        filename: 'GlowingCard.vue',
        content: `<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CSSProperties } from 'vue'

interface GlowingCardProps {
  AccentColor: string
  BackgroundColor: string
  TextColor: string
  BorderRadius: string
  BorderWidth: string | number
  TopInscription: string
  BigInscription: string
  SmallInscription: string
  BottomInscription: string
  learnMoreLink?: string
  width?: string | number
  height?: string | number
  IconHeight?: string | number
  TopTextSize?: string | number
}

const props = withDefaults(defineProps<GlowingCardProps>(), {
  IconHeight: '34px',
  TopTextSize: '25px',
  width: '387px',
  height: '467px',
})

const isHovered = ref(false)
const baseWidth = computed(() => parseFloat(String(props.width)))
const baseHeight = computed(() => parseFloat(String(props.height)))
const desiredPaddingTopBottom = computed(() => (31 / 467) * baseHeight.value)
const desiredPaddingLeftRight = computed(() => (39 / 387) * baseWidth.value)

const bigInscriptionFontSize = computed(() =>
  (0.7 * baseWidth.value + 0.3 * baseHeight.value) / (baseWidth.value / (96 * (baseWidth.value / 387)))
)
const smallInscriptionFontSize = computed(() =>
  (0.7 * baseWidth.value + 0.3 * baseHeight.value) / (baseWidth.value / (18 * (baseWidth.value / 387)))
)
// Bottom text a bit bigger
const bottomInscriptionFontSize = computed(() =>
  (0.7 * baseWidth.value + 0.3 * baseHeight.value) / (baseWidth.value / (14 * (baseWidth.value / 387)))
)

const topMarginBigInscription = computed(() =>
  ((15 / baseHeight.value) * baseHeight.value + (15 / baseWidth.value) * baseWidth.value)
)
const bottomMarginBigInscription = computed(() =>
  ((-17 / baseHeight.value) * baseHeight.value + (-17 / baseWidth.value) * baseWidth.value)
)

function handleBottomInscriptionClick() {
  if (props.learnMoreLink) {
    window.open(props.learnMoreLink, '_blank')
  }
}

const cardStyle = computed<CSSProperties>(() => ({
  width: typeof props.width === 'number' ? \`\${props.width}px\` : props.width,
  height: typeof props.height === 'number' ? \`\${props.height}px\` : props.height,
  borderWidth: typeof props.BorderWidth === 'number' ? \`\${props.BorderWidth}px\` : props.BorderWidth,
  borderColor: props.AccentColor,
  borderRadius: props.BorderRadius,
  backgroundColor: isHovered.value ? props.AccentColor : props.BackgroundColor,
  color: isHovered.value ? props.BackgroundColor : props.TextColor,
  boxShadow: isHovered.value
    ? \`0 0 5px \${props.AccentColor}, 0 0 25px \${props.AccentColor}, 0 0 50px \${props.AccentColor}, 0 0 200px \${props.AccentColor}\`
    : 'none',
  transition: 'background-color 0.3s, box-shadow 0.3s, color 0.3s',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  boxSizing: 'border-box',
  userSelect: 'none',
  // Remove 'cursor: pointer' from card!
}))

const textStyle = computed<CSSProperties>(() => ({
  padding: \`\${desiredPaddingTopBottom.value}px \${desiredPaddingLeftRight.value}px\`,
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'color 0.3s',
  color: isHovered.value ? props.BackgroundColor : props.TextColor,
}))
</script>

<template>
  <div
    class="glowing-card"
    :style="cardStyle"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div :style="textStyle">
      <div class="icon-row">
        <div class="icon-container">
          <!-- Pass IconHeight style to slot for dynamic sizing -->
          <slot name="icon" :icon-style="{ height: props.IconHeight, width: 'auto', fontSize: props.IconHeight }" />
        </div>
        <span
          class="top-inscription"
          :style="{
            fontSize: props.TopTextSize,
            fontWeight: 'bold',
            marginLeft: '12px',
            display: 'flex',
            alignItems: 'center',
            lineHeight: 1,
          }"
        >
          {{ props.TopInscription }}
        </span>
      </div>
      <h1
        :style="{
          fontSize: bigInscriptionFontSize + 'px',
          marginTop: topMarginBigInscription + 'px',
          marginBottom: bottomMarginBigInscription + 'px',
          fontWeight: 'bold',
        }"
        class="d-inline-block"
      >
        {{ props.BigInscription }}
      </h1>
      <h3
        :style="{
          fontSize: smallInscriptionFontSize + 'px',
          marginTop: topMarginBigInscription + 'px',
          marginBottom: 'auto',
          fontWeight: 'bold',
        }"
        class="d-inline-block"
      >
        {{ props.SmallInscription }}
      </h3>
      <p
        :style="{
          fontSize: bottomInscriptionFontSize + 'px',
          marginBottom: '0.3em',
          marginTop: 'auto',
          textAlign: 'left',
          fontWeight: 'bold',
          cursor: props.learnMoreLink ? 'pointer' : 'default',
          letterSpacing: '0.02em',
        }"
        class="bottom-inscription"
        @click="handleBottomInscriptionClick"
      >
        {{ props.BottomInscription }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.glowing-card {
  border-style: solid;
}
.d-inline-block {
  display: inline-block;
}
.icon-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;
}
.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 0.5em;
}
.top-inscription {
  vertical-align: middle;
}
.bottom-inscription {
  text-align: left;
  font-weight: bold;
  /* visually larger bottom text */
  letter-spacing: 0.02em;
  /* cursor is now handled inline for dynamic logic */
}
</style>
` }
    ],
    dependencies: `npm install @tabler/icons-vue
npm install @tabler/icons-vue --save-dev
npm install @fortawesome/vue-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons
npm install @fortawesome/vue-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons --save-dev
`,
    credit: `[Neon Button](https://codepen.io/HighFlyer/pen/WNXRZBv) by [Thea](https://codepen.io/HighFlyer)`,
    previewType: 'fullwidth',
  },
  {
    name: 'Magic Text',
    route: 'magic-text',
    description: 'A component that animates sparkling stars around gradient-colored text.',
    usage: `<template>
  <div class="centered-container">
    <div style="font-size:1.75em; color: #fff; text-align: center;">
      The best way to
      <MagicText>predict the future</MagicText>
      is to create it.
    </div>
  </div>
</template>

<script setup lang="ts">
import MagicText from './MagicText.vue';
</script>

<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

// Note: The MagicText component accepts the following props:
// - starCount: number (internal) - Number of animated star sparkles shown around the text (default: 3).
// - palette: string[] (internal) - Array of hex color codes used for the stars' fill colors.
// - starColors: string[] (internal, reactive) - The current fill colors for each star, randomized on mount and during animation.
// - magicStars: HTMLElement[] (internal, ref) - References to DOM elements for each star, used for animation.
// - animate(star: HTMLElement, idx: number): void (internal) - Positions and animates a star at a random location and color.
// - rand(min: number, max: number): number (internal) - Utility function for generating a random integer in a given range.
//
// Lifecycle:
// - On mounted, each star is animated at a staggered interval, and continues to animate every second.
//
// Styling:
// - .magic: Relative container for the text and stars.
// - .magic-star: Absolutely positioned, animated SVG star with randomized color and position.
// - .magic-text: Animated gradient text using background-clip and text-fill-color.
//
// Slots:
// - Default slot: The text to be animated.
//
// Usage notes:
// - Place <MagicText> around any inline text to apply the sparkling and animated gradient effect.
// - The component is self-contained and does not accept external props or emit events.
// - Designed for inline or block use; works best with short phrases or words.
`,
    code: [
      {
        filename: 'MagicText.vue',
        content: `<template>
  <span class="magic">
    <span
      v-for="n in starCount"
      :key="n"
      class="magic-star"
      ref="magicStars"
    >
      <svg viewBox="0 0 512 512">
        <path
          :fill="starColors[n - 1]"
          d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z"
        />
      </svg>
    </span>
    <span class="magic-text">
      <slot />
    </span>
  </span>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';

const palette = ['#4776cb', '#a19fe5', '#6cc606'];
const starCount = 3;

const magicStars = ref<HTMLElement[]>([]);
const starColors = ref<string[]>(Array.from({ length: starCount }, () => palette[Math.floor(Math.random() * palette.length)]));

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function animate(star: HTMLElement, idx: number) {
  star.style.setProperty('--star-left', \`\${rand(-10, 100)}%\`);
  star.style.setProperty('--star-top', \`\${rand(-40, 80)}%\`);
  // Random color for this sparkle
  starColors.value[idx] = palette[Math.floor(Math.random() * palette.length)];
  star.style.animation = 'none';
  void star.offsetHeight; // force reflow
  star.style.animation = '';
}

onMounted(async () => {
  await nextTick();
  magicStars.value.forEach((star, idx) => {
    setTimeout(() => {
      animate(star, idx);
      setInterval(() => animate(star, idx), 1000);
    }, idx * 333);
  });
});
</script>

<style scoped>
.magic {
  display: inline-block;
  position: relative;
}
.magic-star {
  --size: clamp(20px, 1.5vw, 30px);
  animation: scale 700ms ease forwards;
  display: block;
  height: var(--size);
  left: var(--star-left);
  position: absolute;
  top: var(--star-top);
  width: var(--size);
  pointer-events: none;
}
.magic-star > svg {
  animation: rotate 1000ms linear infinite;
  display: block;
  opacity: 0.7;
}
.magic-text {
  animation: background-pan 3s linear infinite;
  background: linear-gradient(
    to right,
    #4776cb,
    #a19fe5,
    #6cc606,
    #4776cb
  );
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
}
@keyframes background-pan {
  from { background-position: 0% center; }
  to { background-position: -200% center; }
}
@keyframes scale {
  from, to { transform: scale(0); }
  50% { transform: scale(1); }
}
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(180deg); }
}
</style>
` }
    ],
    dependencies: ``,
    credit: `[Magical Text Effect](https://codepen.io/Hyperplexed/pen/YzeOLYe) by [Hyperplexed](https://codepen.io/Hyperplexed)`,
    previewType: 'fullwidth',
  },
  {
    name: 'Slider Hero Section',
    route: 'slider-hero-section',
    description: 'A customizable hero section with sliding showcase options, image transitions, and responsive design.',
    usage: `<template>
  <div style="min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: flex-start;">
    <p class="demo-disclaimer">
      <strong>Disclaimer:</strong>
      All product names, logos, brand identifiers, and trademarks displayed on this website are the sole property of their respective owners. These items are used for demonstrational and illustrative purposes only. The Namer UI is not affiliated with, endorsed by, or sponsored by any of the companies whose products are showcased here. This website does not present a commercial offer of any kind. The store name is fictional; any resemblance to existing business(es) is entirely coincidental and unintentional.
    </p>
      <div style="max-height: calc(100vh - 68px); display: flex; flex-direction: column; align-items: center; justify-content: flex-start;">

    <SliderHeroSection
      title="Discover cutting-edge tech and top brands at NamerStore – your one-stop destination for brand new, refurbished, and pre-owned electronics"
      :showcaseOptions="[
        { text: 'Brand New Electronics', imageUrl: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { text: 'Refurbished iPhones', imageUrl: 'https://images.unsplash.com/photo-1604671368394-2240d0b1bb6c?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { text: 'Pre-owned Samsung Flagships', imageUrl: 'https://images.unsplash.com/photo-1584006682522-dc17d6c0d9ac?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
      ]"
      :titleFontWeight="800"
      :showcaseFontWeight="700"
      :desktopVersionBottomThreshold="900"
      @onOptionClick="idx => console.log(\`Clicked item: \${idx}\`)"
      @onOptionHover="idx => console.log(\`Hovered item: \${idx}\`)"
    />
</div>
    <!-- RTL Example -->
    <div style="width: 500px; overflow: hidden; margin-top: 2em;">
      <SliderHeroSection
        title="גלה טכנולוגיה חדשנית ומותגים מובילים בנמרסטור - היעד שלך למוצרי אלקטרוניקה חדשים, מחודשים ומשומשים."
        :showcaseOptions="[
          { text: 'מוצרי אלקטרוניקה חדשים', imageUrl: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
          { text: 'אייפונים מחודשים', imageUrl: 'https://images.unsplash.com/photo-1604671368394-2240d0b1bb6c?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
          { text: 'מכשירי סמסונג משומשים', imageUrl: 'https://images.unsplash.com/photo-1584006682522-dc17d6c0d9ac?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]"
        :activeOptionColor="'#A031EB'"
        :textColor="'#080810'"
        :imageChangeInterval="3000"
        :imageTransitionDuration="0.51"
        :darkenImages="-0.5"
        height="760px"
        borderRadius="2.5em"
        mobileTitleAlign="right"
        mobileShowcaseAlign="right"
        :titleFontWeight="900"
        :showcaseFontWeight="700"
        :desktopVersionBottomThreshold="600"
        @onOptionClick="idx => console.log(\`Clicked item: \${idx}\`)"
        @onOptionHover="idx => console.log(\`Hovered item: \${idx}\`)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SliderHeroSection from './SliderHeroSection.vue'
</script>

<style>
.demo-disclaimer {
  color: #f7f7ff;
  font-size: 1rem;
  max-width: 1080px;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  padding: 1.25rem 1.5rem;
  background: rgba(20, 22, 24, 0.85);
  border-radius: 1rem;
  line-height: 1.7;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.08);
}
.demo-disclaimer strong {
  color: #fff;
  font-weight: bold;
}
</style>

// Note: The SliderHero component accepts the following props:
// - title: string (required) - The main heading/title displayed at the top of the hero.
// - showcaseOptions: Array<{ text: string; imageUrl: string }> (required)
//     - text: string - The label for the option.
//     - imageUrl: string - The background image for this option.
// - activeOptionColor: string (optional) - Text color for the currently active showcase option (default: '#00a6fb').
// - textColor: string (optional) - Text color for the title and inactive showcase options (default: '#ffffff').
// - imageChangeInterval: number (optional) - Time in milliseconds between automatic background image transitions (default: 4000).
// - imageTransitionDuration: number (optional) - Duration (in seconds) for the background image fade transition (default: 0.76).
// - desktopFontSize: string (optional) - Font size for the title on desktop (default: '62px').
// - mobileFontSize: string (optional) - Font size for the title on mobile (default: '33px').
// - desktopShowcaseFontSize: string (optional) - Font size for showcase options on desktop (default: '36px').
// - mobileShowcaseFontSize: string (optional) - Font size for showcase options on mobile (default: '25px').
// - desktopVersionBottomThreshold: number (optional) - The container width (in px) below which the component switches to mobile layout (default: 768).
// - darkenImages: number (optional) - Overlay darkness (0 = transparent, 1 = black overlay; negative = white overlay) (default: 0.5).
// - desktopPadding: { top?: string; bottom?: string; leftRight?: string } (optional) - Padding for desktop layout (default: { top: '62px', bottom: '67px', leftRight: '24px' }).
// - mobilePadding: { top?: string; bottom?: string; leftRight?: string } (optional) - Padding for mobile layout (default: { top: '39px', bottom: '39px', leftRight: '10px' }).
// - height: string (optional) - Height of the hero container (default: '100vh').
// - titleFontWeight: number | string (optional) - Font weight for the title (default: 700).
// - showcaseFontWeight: number | string (optional) - Font weight for the showcase options (default: 700).
// - borderRadius: string (optional) - Border radius for the container and images (default: 'none').
// - desktopTitleAlign: string (optional) - Title alignment on desktop: 'left' | 'center' | 'right' (default: 'left').
// - mobileTitleAlign: string (optional) - Title alignment on mobile (default: 'center').
// - desktopShowcaseAlign: string (optional) - Showcase options alignment on desktop (default: 'left').
// - mobileShowcaseAlign: string (optional) - Showcase options alignment on mobile (default: 'center').
//
// Emits:
// - onOptionClick(idx: number) - Fired when a showcase option is clicked (idx: index of the clicked option).
// - onOptionHover(idx: number) - Fired when a showcase option is hovered (idx: index of the hovered option).
//
// Slots: None.
`,
    code: [
      {
        filename: 'SliderHeroSection.vue',
        content: `<template>
  <div
    class="slider-hero-container"
    :style="containerStyle"
    ref="containerRef"
  >
    <!-- Background Images -->
    <div class="slider-hero-bg-images">
      <div
        v-for="(option, idx) in showcaseOptions"
        :key="idx"
        class="slider-hero-bg-image"
        :style="bgImageStyle(option.imageUrl, idx === activeIndex)"
      ></div>
    </div>
    <!-- Overlay -->
    <div class="slider-hero-overlay" :style="overlayStyle"></div>
    <!-- Content -->
    <div class="slider-hero-content">
      <h1
        class="slider-hero-title"
        :class="[isMobileView ? 'mobile' : 'desktop', isRTL(title) ? 'rtl' : 'ltr']"
        :style="titleStyle"
      >
        {{ title }}
      </h1>
      <div
        class="slider-hero-showcase"
        :class="[isMobileView ? 'mobile' : 'desktop', isRTL(firstOptionText) ? 'rtl' : 'ltr']"
        :style="showcaseContainerStyle"
      >
        <div
          v-for="(option, idx) in showcaseOptions"
          :key="idx"
          class="slider-hero-showcase-option"
          :class="[
            isMobileView ? 'mobile' : 'desktop',
            isRTL(option.text) ? 'rtl' : 'ltr',
            idx === activeIndex ? 'active' : ''
          ]"
          :style="showcaseOptionStyle(idx === activeIndex)"
          @click="handleOptionClick(idx)"
          @mouseenter="handleOptionHover(idx)"
          @mouseleave="handleOptionLeave"
        >
          {{ option.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

interface ShowcaseOption {
  text: string
  imageUrl: string
}

const emit = defineEmits<{
  (e: 'onOptionClick', idx: number): void
  (e: 'onOptionHover', idx: number): void
}>()

const props = defineProps<{
  title: string
  showcaseOptions: ShowcaseOption[]
  activeOptionColor?: string
  textColor?: string
  imageChangeInterval?: number
  imageTransitionDuration?: number
  desktopFontSize?: string
  mobileFontSize?: string
  desktopShowcaseFontSize?: string
  mobileShowcaseFontSize?: string
  desktopVersionBottomThreshold?: number
  darkenImages?: number
  desktopPadding?: { top?: string; bottom?: string; leftRight?: string }
  mobilePadding?: { top?: string; bottom?: string; leftRight?: string }
  height?: string
  titleFontWeight?: number | string
  showcaseFontWeight?: number | string
  borderRadius?: string
  // onOptionClick?: (index: number) => void
  // onOptionHover?: (index: number) => void
  desktopTitleAlign?: string
  mobileTitleAlign?: string
  desktopShowcaseAlign?: string
  mobileShowcaseAlign?: string
}>()

const activeOptionColor = props.activeOptionColor ?? '#00a6fb'
const textColor = props.textColor ?? '#ffffff'
const imageChangeInterval = props.imageChangeInterval ?? 4000
const imageTransitionDuration = props.imageTransitionDuration ?? 0.76
const desktopFontSize = props.desktopFontSize ?? '62px'
const mobileFontSize = props.mobileFontSize ?? '33px'
const desktopShowcaseFontSize = props.desktopShowcaseFontSize ?? '36px'
const mobileShowcaseFontSize = props.mobileShowcaseFontSize ?? '25px'
const desktopVersionBottomThreshold = props.desktopVersionBottomThreshold ?? 768
const darkenImages = props.darkenImages ?? 0.5
const desktopPadding = props.desktopPadding ?? { top: '62px', bottom: '67px', leftRight: '24px' }
const mobilePadding = props.mobilePadding ?? { top: '39px', bottom: '39px', leftRight: '10px' }
const height = props.height ?? '100vh'
const titleFontWeight = props.titleFontWeight ?? 700
const showcaseFontWeight = props.showcaseFontWeight ?? 700
const borderRadius = props.borderRadius ?? 'none'
const desktopTitleAlign = props.desktopTitleAlign ?? 'left'
const mobileTitleAlign = props.mobileTitleAlign ?? 'center'
const desktopShowcaseAlign = props.desktopShowcaseAlign ?? 'left'
const mobileShowcaseAlign = props.mobileShowcaseAlign ?? 'center'

const activeIndex = ref(0)
const isMobileView = ref(false)
const isHovered = ref(false)
const containerRef = ref<HTMLElement | null>(null)
let intervalId: ReturnType<typeof setInterval> | null = null

const firstOptionText = computed(() => props.showcaseOptions[0]?.text || '')

function isRTL(text: string): boolean {
  return /[\\u0590-\\u05FF\\u0600-\\u06FF\\u0700-\\u074F]/.test(text); 
}

// Alignment helpers
function alignToText(align: string) {
  switch (align) {
    case 'left':
    case 'right':
    case 'center':
      return align
    default:
      return 'left'
  }
}
function showcaseMarginAuto(align: string, isRtl: boolean) {
  if (align === 'right') {
    return isRtl ? { marginRight: 'auto' } : { marginLeft: 'auto' }
  }
  if (align === 'center') {
    return { marginLeft: 'auto', marginRight: 'auto' }
  }
  // left
  return isRtl ? { marginLeft: 'auto' } : { marginRight: 'auto' }
}

// Responsive
function handleResize() {
  if (containerRef.value) {
    isMobileView.value = containerRef.value.offsetWidth < desktopVersionBottomThreshold
  }
}
const dynamicMediaQuery = computed(() => \`@media (max-width: \${desktopVersionBottomThreshold - 1}px)\`)
function injectDynamicMediaQuery() {
  const prev = document.getElementById('slider-hero-dynamic-media')
  if (prev) prev.remove()
  const style = document.createElement('style')
  style.id = 'slider-hero-dynamic-media'
  style.innerHTML = \`
    \${dynamicMediaQuery.value} {
      .slider-hero-title {
        line-height: 1.15;
      }
    }
  \`
  document.head.appendChild(style)
}
onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  injectDynamicMediaQuery()
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (intervalId) clearInterval(intervalId)
  const prev = document.getElementById('slider-hero-dynamic-media')
  if (prev) prev.remove()
})
watch(
  () => desktopVersionBottomThreshold,
  () => injectDynamicMediaQuery()
)
watch(
  () => containerRef.value?.offsetWidth,
  () => handleResize()
)

// Auto slide
function startInterval() {
  if (intervalId) clearInterval(intervalId)
  if (!isHovered.value) {
    intervalId = setInterval(() => {
      activeIndex.value = (activeIndex.value + 1) % props.showcaseOptions.length
    }, imageChangeInterval)
  }
}
watch([isHovered, () => props.showcaseOptions.length, () => imageChangeInterval], startInterval, { immediate: true })
onBeforeUnmount(() => intervalId && clearInterval(intervalId))

function handleOptionClick(idx: number) {
  activeIndex.value = idx
  emit('onOptionClick', idx)
}
function handleOptionHover(idx: number) {
  activeIndex.value = idx
  isHovered.value = true
  emit('onOptionHover', idx)
}
function handleOptionLeave() {
  isHovered.value = false
}

const containerStyle = computed(() => ({
  height,
  borderRadius,
  overflow: 'hidden',
  padding: isMobileView.value
    ? \`\${mobilePadding.top} \${mobilePadding.leftRight} \${mobilePadding.bottom}\`
    : \`\${desktopPadding.top} \${desktopPadding.leftRight} \${desktopPadding.bottom}\`,
}))

function bgImageStyle(url: string, isActive: boolean) {
  return {
    backgroundImage: \`url(\${url})\`,
    opacity: isActive ? 1 : 0,
    transition: \`opacity \${imageTransitionDuration}s cubic-bezier(0.77,0,0.175,1)\`,
    borderRadius,
  }
}
const overlayStyle = computed(() => ({
  backgroundColor:
    darkenImages >= 0
      ? \`rgba(0,0,0,\${darkenImages})\`
      : \`rgba(255,255,255,\${Math.abs(darkenImages)})\`,
  borderRadius,
}))
const titleStyle = computed(() => ({
  fontSize: isMobileView.value ? mobileFontSize : desktopFontSize,
  color: textColor,
  textAlign: isMobileView.value ? alignToText(mobileTitleAlign) : alignToText(desktopTitleAlign),
  fontWeight: titleFontWeight,
}))
const showcaseContainerStyle = computed(() => {
  const align = isMobileView.value ? mobileShowcaseAlign : desktopShowcaseAlign
  const isRtl = isRTL(firstOptionText.value)
  return {
    textAlign: alignToText(align),
    display: 'inline-flex',
    flexDirection: 'column',
    gap: '0.25em',
    width: '100%',
    ...showcaseMarginAuto(align, isRtl),
  }
})
function showcaseOptionStyle(isActive: boolean) {
  return {
    color: isActive ? activeOptionColor : textColor,
    fontSize: isMobileView.value ? mobileShowcaseFontSize : desktopShowcaseFontSize,
    textAlign: isMobileView.value
      ? alignToText(mobileShowcaseAlign)
      : alignToText(desktopShowcaseAlign),
    transition: 'color 0.3s',
    cursor: 'pointer',
    fontWeight: showcaseFontWeight,
    textDecoration: 'none',
  }
}
</script>

<style scoped>
.slider-hero-container {
  width: 100%;
  position: relative;
  box-sizing: border-box;
}
.slider-hero-bg-images {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
}
.slider-hero-bg-image {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-size: cover;
  background-position: center;
  will-change: opacity;
}
.slider-hero-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 1;
  pointer-events: none;
}
.slider-hero-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.slider-hero-title {
  margin: 0;
  line-height: 1.1;
  word-break: break-word;
}
.slider-hero-title.rtl { direction: rtl; }
.slider-hero-title.ltr { direction: ltr; }
.slider-hero-showcase {
  width: 100%;
}
.slider-hero-showcase.rtl { direction: rtl; }
.slider-hero-showcase.ltr { direction: ltr; }
.slider-hero-showcase-option {
  user-select: none;
  margin: 0.1em 0;
  font-weight: inherit;
  text-decoration: none;
}
.slider-hero-showcase-option.rtl { direction: rtl; }
.slider-hero-showcase-option.ltr { direction: ltr; }
</style>
` }
    ],
    dependencies: ``,
    credit: `
  Used photos:

  - Photo by [Julian O'hayon](https://unsplash.com/@anckor?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/space-black-case-apple-watch-silver-macbook-pro-jet-black-iphone-7-plus-and-silver-imac-with-corresponding-boxes-Bs-zngH79Ds?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
  - Photo by [Daniel Romero]() on [Unsplash](https://unsplash.com/photos/white-and-blue-game-controller-TpXoTb1uR5A?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
  - Photo by [Daniel Romero]() on [Unsplash](https://unsplash.com/photos/person-holding-pink-and-black-iphone-case-jcJFOwBTEck?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)`,
    previewType: 'image',
    imageLink: '/previews/slider-hero-section.webp'
  },
  {
    name: 'Space Button',
    route: 'space-button',
    description: 'A futuristic button with dynamic gradients and hover effects, evoking the mesmerizing colors of outer space.',
    usage: `<template>
  <div class="space-demo-wrap">
    <SpaceButton
      inscription="Outer Space"
      variant="outer"
      @click="() => console.log('The Outer Space button has been clicked')"
    />
    <SpaceButton
      inscription="Inner Space (1px border)"
      borderWidth="1px"
      @click="() => console.log('The Inner Space button has been clicked')"
    />
    <SpaceButton
      inscription="Outer Space (1px, thin font)"
      :isBold="false"
      variant="outer"
      @click="() => console.log('The Outer Space thin font button has been clicked')"
    />
    <SpaceButton
      inscription="5px Border"
      borderWidth="5px"
      @click="() => console.log('The 5px Border button has been clicked')"
    />
    <SpaceButton
      inscription="Hover any of these"
      borderRadius="2em"
      @click="() => console.log('The Hover any of these button has been clicked')"
    />
    <SpaceButton
      inscription="פונט גדול"
      fontSize="32px"
      variant="outer"
      @click="() => console.log('The large font button has been clicked')"
    />
  </div>
</template>

<script setup>
import SpaceButton from './SpaceButton.vue'
</script>

<style scoped>
.space-demo-wrap {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 36px;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>

// Note: The SpaceButton component accepts the following props:
// - inscription: string (required) - The button's text label.
// - borderRadius: string (optional) - The border-radius of the button (default: '0.76em').
// - borderWidth: string (optional) - The border width for the gradient border effect (default: '2px').
// - variant: string (optional) - Visual style variant, either 'inner' (default) or 'outer'.
// - isBold: boolean (optional) - Whether the button text is bold (default: true).
// - fontSize: string (optional) - Font size of the button label (default: '16px').
// - onClick: function (optional) - Optional click handler function.
//
// Emits:
// - click (MouseEvent) - Emitted when the button is clicked. If the onClick prop is provided, it will be called with the event.
//
// Slots: None.
`,
    code: [
      {
        filename: 'SpaceButton.vue',
        content: `<template>
  <button
    class="spaceButton"
    :class="{ variant: variant === 'outer' }"
    :style="buttonStyle"
    @click="handleClick"
  >
    {{ inscription }}
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  inscription: { type: String, required: true },
  borderRadius: { type: String, default: '0.76em' },
  borderWidth: { type: String, default: '2px' },
  variant: { type: String, default: 'inner' },
  isBold: { type: Boolean, default: true },
  fontSize: { type: String, default: '16px' },
  onClick: { type: Function }
})

const buttonStyle = computed(() => ({
  '--border-radius': props.borderRadius,
  '--border-width': props.borderWidth,
  fontWeight: props.isBold ? 'bold' : 'normal',
  fontFamily: '"Arial", "Alef", sans-serif',
  fontSize: props.fontSize
}))

function handleClick(event) {
  if (props.onClick) props.onClick(event)
}
</script>

<style scoped>
/* CSS custom properties for gradients and border effects */
@property --pos-x { syntax: '<percentage>'; initial-value: 11.14%; inherits: false; }
@property --pos-y { syntax: '<percentage>'; initial-value: 140%; inherits: false; }
@property --spread-x { syntax: '<percentage>'; initial-value: 150%; inherits: false; }
@property --spread-y { syntax: '<percentage>'; initial-value: 180.06%; inherits: false; }
@property --color-1 { syntax: '<color>'; initial-value: #000; inherits: false; }
@property --color-2 { syntax: '<color>'; initial-value: #08012c; inherits: false; }
@property --color-3 { syntax: '<color>'; initial-value: #4e1e40; inherits: false; }
@property --color-4 { syntax: '<color>'; initial-value: #70464e; inherits: false; }
@property --color-5 { syntax: '<color>'; initial-value: #88394c; inherits: false; }
@property --border-angle { syntax: '<angle>'; initial-value: 20deg; inherits: true; }
@property --border-color-1 { syntax: '<color>'; initial-value: hsla(340, 75%, 60%, 0.2); inherits: true; }
@property --border-color-2 { syntax: '<color>'; initial-value: hsla(340, 75%, 40%, 0.75); inherits: true; }
@property --stop-1 { syntax: '<percentage>'; initial-value: 37.35%; inherits: false; }
@property --stop-2 { syntax: '<percentage>'; initial-value: 61.36%; inherits: false; }
@property --stop-3 { syntax: '<percentage>'; initial-value: 78.42%; inherits: false; }
@property --stop-4 { syntax: '<percentage>'; initial-value: 89.52%; inherits: false; }
@property --stop-5 { syntax: '<percentage>'; initial-value: 100%; inherits: false; }

.spaceButton {
  border-radius: var(--border-radius);
  padding: 16px 36px;
  min-width: 132px;
  font-size: 16px;
  font-family: "Arial", "Alef", sans-serif;
  line-height: 19px;
  font: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: inherit;
  font-weight: 500;
  color: rgba(255 255 255 / 95%);
  border: none;
  position: relative;
  cursor: pointer;
  appearance: none;
  background: radial-gradient(
    var(--spread-x) var(--spread-y) at var(--pos-x) var(--pos-y),
    var(--color-1) var(--stop-1),
    var(--color-2) var(--stop-2),
    var(--color-3) var(--stop-3),
    var(--color-4) var(--stop-4),
    var(--color-5) var(--stop-5)
  );
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.95);
  outline: none;
  -webkit-tap-highlight-color: transparent;
  transition:
    --pos-x 0.5s,
    --pos-y 0.5s,
    --spread-x 0.5s,
    --spread-y 0.5s,
    --color-1 0.5s,
    --color-2 0.5s,
    --color-3 0.5s,
    --color-4 0.5s,
    --color-5 0.5s,
    --border-angle 0.5s,
    --border-color-1 0.5s,
    --border-color-2 0.5s,
    --stop-1 0.5s,
    --stop-2 0.5s,
    --stop-3 0.5s,
    --stop-4 0.5s,
    --stop-5 0.5s;
}

.spaceButton::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: var(--border-width);
  background-image: linear-gradient(var(--border-angle), var(--border-color-1), var(--border-color-2));
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
}

.spaceButton:hover {
  --pos-x: 0%;
  --pos-y: 91.51%;
  --spread-x: 120.24%;
  --spread-y: 103.18%;
  --color-1: #c96287;
  --color-2: #c66c64;
  --color-3: #cc7d23;
  --color-4: #37140a;
  --color-5: #000;
  --border-angle: 190deg;
  --border-color-1: hsla(340, 78%, 90%, 0.1);
  --border-color-2: hsla(340, 75%, 90%, 0.6);
  --stop-1: 0%;
  --stop-2: 8.8%;
  --stop-3: 21.44%;
  --stop-4: 71.34%;
  --stop-5: 85.76%;
}

.spaceButton.variant {
  --color-1: #000022;
  --color-2: #1f3f6d;
  --color-3: #469396;
  --color-4: #f1ffa5;
  --color-5: hsla(250, 80%, 2.5%, 1);
  --pos-x: 40%;
  --pos-y: 140%;
  --spread-x: 130%;
  --spread-y: 170.06%;
  --stop-1: 37.35%;
  --stop-2: 61.36%;
  --stop-3: 78.42%;
  --stop-4: 93.52%;
  --stop-5: 100%;
  --border-angle: 180deg;
  --border-color-1: hsla(320, 75%, 90%, 0.9);
  --border-color-2: hsla(320, 50%, 90%, 0.1);
}
.spaceButton.variant:hover {
  --pos-x: 0%;
  --pos-y: 120%;
  --spread-x: 110.24%;
  --spread-y: 110.2%;
  --color-1: #000020;
  --color-2: #f1ffa5;
  --color-3: #469396;
  --color-4: #1f3f6d;
  --stop-1: 0%;
  --stop-2: 10%;
  --stop-3: 35.44%;
  --stop-4: 71.34%;
  --stop-5: 150%;
  --border-angle: 190deg;
  --border-color-1: hsla(320, 75%, 90%, 0.1);
  --border-color-2: hsla(320, 50%, 90%, 0.35);
}
</style>
` }
    ],
    dependencies: `npm install @fontsource/alef --legacy-peer-deps`,
    credit: `[Gradient Hover](https://codepen.io/aaroniker/pen/rNXRrKp) by [Aaron Iker](https://codepen.io/aaroniker)`,
    previewType: 'fullwidth',
  },
  {
    name: 'Animated Tooltip',
    route: 'animated-tooltip',
    description: 'A component that displays animated, themeable tooltips on hover, supporting per-item configuration.',
    usage: `<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transform: translateY(24px);
    "
  >
    <AnimatedTooltip
      :items="items"
      tooltipColor="#060507"
      tooltipBorderEffectRotation="2.94rad"
      tooltipBorderEffectThickness="1px"
      :tooltipBorderEffectPercentage="100"
      :tooltipRounding="8"
      tooltipWidth="264px"
      tooltipPadding="0.625rem 1rem"
      appearanceEffect="from-top"
      tooltipPosition="top"
      nameFontSize="1.2rem"
      designationFontSize="0.875rem"
      nameColor="#ffeaa7"
      designationColor="#fab1a0"
      :imageOutlineColor="animatedOutlineColor"
      imageOutlineWidth="1px"
      tooltipBgColor="rgba(71, 118, 203, 0.05)"
      tooltipDotColor="rgba(98, 92, 115, 0.73)"
      tintTilt
      avatarGap="24px"
      uniqueId="main-demo"
      @tooltip-click="onTooltipClick"
      @avatar-hover="onAvatarHover"
      @avatar-unhover="onAvatarUnhover"
    />
    <div
      style="
        margin-top: 32px;
        height: 24px;
        display: flex;
        align-items: center;
        font-size: 1em;
        width: 100%;
        justify-content: flex-start;
        text-align: left;
      "
    >
      <span style="color: #aaa;">Hovered:</span>
      <template v-if="hoveredAvatars.length === 0">
        <span style="color: #bbb; margin-left: 0.5em;">None</span>
      </template>
      <template v-else>
        <span
          v-for="id in hoveredAvatars"
          :key="id"
          style="background: #2d2d2d; color: #fff; border-radius: 6px; padding: 0.2em 0.7em; margin-left: 0.5em;"
        >
          {{ id }}
        </span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import AnimatedTooltip from './AnimatedTooltip.vue';

// --- All allowed values for appearanceEffect ---
type AppearanceEffect =
  | 'from-bottom-right'
  | 'from-bottom-left'
  | 'from-top-left'
  | 'from-top-right'
  | 'from-top'
  | 'from-bottom'
  | 'from-left'
  | 'from-right'
  | 'center-up'
  | 'center-down';

// --- Complete TooltipItem interface ---
interface TooltipItem {
  id: string; // string, not number!
  name: string;
  designation?: string;
  image: string;
  tooltipColor?: string;
  tooltipBorderEffectColors?: string[];
  tooltipBorderEffectRotation?: string;
  tooltipBorderEffectThickness?: string;
  tooltipBorderEffectPercentage?: number;
  tooltipRounding?: number;
  tooltipWidth?: string;
  tooltipPadding?: string;
  appearanceEffect?: AppearanceEffect;
  tooltipPosition?: 'top' | 'bottom';
  nameFontSize?: string;
  designationFontSize?: string;
  nameColor?: string;
  designationColor?: string;
  imageOutlineColor?: string;
  imageOutlineWidth?: string;
  imageRounding?: number;
  imageOutlineColorOverwrite?: string;
  tooltipBgColor?: string;
  tooltipDotColor?: string;
  tintTilt?: boolean;
  tooltipOffsetY?: number;
}

// --- Payload type for tooltip-click event ---
interface TooltipClickPayload {
  uniqueId: string;
  item: TooltipItem;
}

// --- Example items ---
const items: TooltipItem[] = [
  {
    id: "Vue",
    name: 'Vue',
    image: 'https://icon.icepanel.io/Technology/svg/Vue.js.svg',
    appearanceEffect: 'from-top-left',
    tooltipOffsetY: 2,
    tooltipBorderEffectColors: ['#33303b 0%', '#33303b 100%'],
    nameColor: '#41b883',
    imageRounding: 40,
    imageOutlineColorOverwrite: "#312f3b",
    tooltipWidth: "auto"
  },
  {
    id: "TypeScript",
    name: 'TypeScript',
    designation: '24px higher than Vue tooltip',
    image: 'https://icon.icepanel.io/Technology/svg/TypeScript.svg',
    appearanceEffect: 'from-top',
    tooltipOffsetY: 26,
    tooltipBorderEffectColors: ['#4776cb 0', '#a19fe5 40%', 'transparent 90%'],
    nameFontSize: '1.3rem',
    imageOutlineColor: "#444051",
    nameColor: '#fff',
    designationColor: '#008ceb',
    imageRounding: 8,
    tooltipRounding: 0,
  },
  {
    id: "CSS",
    name: 'CSS',
    designation: "That one doesn't tilt",
    image: 'https://icon.icepanel.io/Technology/svg/CSS3.svg',
    appearanceEffect: 'from-top-right',
    tooltipOffsetY: 2,
    tooltipBorderEffectColors: ['#0097fd 0', '#0097fd 100%'],
    imageRounding: 0,
    tintTilt: false,
    tooltipRounding: 50,
    designationFontSize: "1.125rem",
    tooltipColor: "#eee",
    tooltipDotColor: "rgba(21, 114, 182, 0.84)",
    nameColor: "#111014",
    designationColor: "#3e3a49",
  },
];

// --- Animated outline color logic (unchanged) ---
const COLOR_1 = '#25232c';
const COLOR_2 = '#ffffff';
const HOLD_DURATION = 50;
const TRANSITION_DURATION = 1250;
const animatedOutlineColor = ref(COLOR_2);
let animationFrame: number | null = null;
let timeoutId: number | null = null;
let isToColor1 = true;

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}
function rgbToHex([r, g, b]: number[]) {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}
function animateColor(from: string, to: string, duration: number, onDone: () => void) {
  const start = performance.now();
  const rgbFrom = hexToRgb(from);
  const rgbTo = hexToRgb(to);
  function step(now: number) {
    const elapsed = Math.min((now - start) / duration, 1);
    const rgbCurrent = rgbFrom.map((fromC, i) =>
      Math.round(fromC + (rgbTo[i] - fromC) * elapsed)
    ) as [number, number, number];
    animatedOutlineColor.value = rgbToHex(rgbCurrent);
    if (elapsed < 1) {
      animationFrame = requestAnimationFrame(step);
    } else {
      animatedOutlineColor.value = to;
      onDone();
    }
  }
  animationFrame = requestAnimationFrame(step);
}
function startOscillation() {
  function nextPhase() {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    const from = isToColor1 ? COLOR_2 : COLOR_1;
    const to = isToColor1 ? COLOR_1 : COLOR_2;
    timeoutId = window.setTimeout(() => {
      animateColor(from, to, TRANSITION_DURATION, () => {
        isToColor1 = !isToColor1;
        nextPhase();
      });
    }, HOLD_DURATION);
  }
  nextPhase();
}
onMounted(() => {
  startOscillation();
});
onBeforeUnmount(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame);
  if (timeoutId) clearTimeout(timeoutId);
});

// --- Hovered avatars state ---
const hoveredAvatars = ref<string[]>([]);
function onAvatarHover({ id }: { uniqueId: string; id: string }) {
  if (!hoveredAvatars.value.includes(id)) hoveredAvatars.value.push(id);
}
function onAvatarUnhover({ id }: { uniqueId: string; id: string }) {
  hoveredAvatars.value = hoveredAvatars.value.filter((x) => x !== id);
}

// --- Type-safe event handler ---
function onTooltipClick({ item }: TooltipClickPayload) {
  console.log(\`Clicked item: \${item.id}\`);
}
</script>

// Note: The AnimatedTooltip component accepts the following props:
// - items: Array<{
//     id: string;                // Unique string identifier for the item
//     name: string;              // Main label or name for the item
//     designation?: string;      // Optional subtitle or description
//     image: string;             // URL for the item's avatar image
//     tooltipColor?: string;     // Tooltip background color
//     tooltipBorderEffectColors?: string[];      // Gradient colors for the tooltip border effect
//     tooltipBorderEffectRotation?: string;      // Rotation for the border gradient (e.g., '2.5rad')
//     tooltipBorderEffectThickness?: string;     // Border thickness (e.g., '2px')
//     tooltipBorderEffectPercentage?: number;    // Percentage of the border effect (0-100)
//     tooltipRounding?: number;                  // Tooltip border radius in px
//     tooltipWidth?: string;                     // Tooltip width (e.g., '220px')
//     tooltipPadding?: string;                   // Tooltip padding (e.g., '1.2rem 1.5rem')
//     appearanceEffect?: string;                 // Tooltip animation effect (e.g., 'from-top-left', 'from-bottom', etc.)
//     tooltipPosition?: 'top' | 'bottom';        // Position of the tooltip relative to the avatar
//     nameFontSize?: string;                     // Font size for the name
//     designationFontSize?: string;              // Font size for the designation
//     nameColor?: string;                        // Color for the name
//     designationColor?: string;                 // Color for the designation
//     imageOutlineColor?: string;                // Outline color for the avatar image
//     imageOutlineWidth?: string;                // Outline width for the avatar image
//     imageRounding?: number;                    // Avatar image border radius in px
//     imageOutlineColorOverwrite?: string;       // Overwrites the outline color for the avatar
//     tooltipBgColor?: string;                   // Tooltip background color (for the dotted background)
//     tooltipDotColor?: string;                  // Color for the dots in the tooltip background
//     tintTilt?: boolean;                        // Whether the avatar tilts on mouse move
//     tooltipOffsetY?: number;                   // Vertical offset for the tooltip in px
//   }> (required)
// - tooltipColor?: string                   // Default tooltip background color
// - tooltipBorderEffectColors?: string[]     // Default border gradient colors
// - tooltipBorderEffectRotation?: string     // Default border gradient rotation
// - tooltipBorderEffectThickness?: string    // Default border thickness
// - tooltipBorderEffectPercentage?: number   // Default border effect percentage
// - tooltipRounding?: number                // Default border radius
// - tooltipWidth?: string                   // Default tooltip width
// - tooltipPadding?: string                 // Default tooltip padding
// - appearanceEffect?: string               // Default animation effect
// - tooltipPosition?: 'top' | 'bottom'      // Default tooltip position
// - nameFontSize?: string                   // Default name font size
// - designationFontSize?: string            // Default designation font size
// - nameColor?: string                      // Default name color
// - designationColor?: string               // Default designation color
// - imageOutlineColor?: string              // Default avatar outline color
// - imageOutlineWidth?: string              // Default avatar outline width
// - imageRounding?: number                  // Default avatar border radius
// - imageOutlineColorOverwrite?: string     // Default override for avatar outline color
// - tooltipBgColor?: string                 // Default tooltip background color (dotted)
// - tooltipDotColor?: string                // Default dot color for tooltip background
// - tintTilt?: boolean                      // Default tilt effect on avatars
// - borderEffectDelay?: number              // Delay before showing the border effect (ms)
// - tooltipOffsetY?: number                 // Default vertical offset for tooltips
// - avatarGap?: string                      // Gap between avatars (e.g., '32px')
// - uniqueId: string (required)             // Unique string ID for this component instance
//
// Emits:
// - tooltip-click ({ uniqueId: string; item: TooltipItem }) - Emitted when the user clicks an avatar.
// - avatar-hover ({ uniqueId: string; id: string }) - Emitted when the user hovers over an avatar.
// - avatar-unhover ({ uniqueId: string; id: string }) - Emitted when the user unhovers an avatar.
//
// Slots: None.
//
// Usage notes:
// - Renders a horizontal row of avatar images, each with an animated tooltip on hover.
// - Tooltip appearance, position, border, and animation are customizable globally and per-item.
// - Avatars can have a tilt effect on mouse move if tintTilt is true.
// - Clicking an avatar emits 'tooltip-click' with the clicked item.
// - Hovering/unhovering an avatar emits 'avatar-hover'/'avatar-unhover' with the avatar id.
// - The component is fully controlled by props; no internal state is exposed.
// - For custom animation effects, use the appearanceEffect prop (e.g., 'from-top', 'from-bottom-right', etc.).
// - Designed for modern UI tooltips with flexible theming, animation, and avatar support.
`,
    code: [
      {
        filename: 'AnimatedTooltip.vue',
        content: `<template>
  <div class="animated-tooltip" :style="{ gap: global.avatarGap }">
    <div
      v-for="item in items"
      :key="item.id"
      class="tooltip-item"
      @mouseenter="onAvatarMouseEnter(item.id)"
      @mouseleave="onAvatarMouseLeave(item.id)"
    >
      <transition :name="transitionName(item, global)">
        <div
          v-if="hoveredIndex === item.id"
          ref="tooltip"
          class="tooltip-content"
          :style="computedTooltipStyle(item, global, tooltipTransform)"
        >
          <div
            class="tooltip-bg-dots"
            :style="computedTooltipBgStyle(item, global)"
          ></div>
          <div
            class="tooltip-name"
            :style="{
              fontSize: item.nameFontSize || global.nameFontSize,
              color: item.nameColor || global.nameColor,
            }"
          >
            {{ item.name }}
          </div>
          <div
            v-if="item.designation"
            class="tooltip-designation"
            :style="{
              fontSize: item.designationFontSize || global.designationFontSize,
              color: item.designationColor || global.designationColor,
            }"
          >
            {{ item.designation }}
          </div>
          <span
            v-if="borderVisible"
            :style="computedBorderEffectStyle(item, global)"
          ></span>
        </div>
      </transition>
      <!-- Avatar container for outline and container bg -->
      <div
        class="avatar-outline"
        :style="computedAvatarOutlineStyle(item, global)"
      >
        <img
          :src="item.image"
          :alt="item.name"
          class="avatar"
          :class="{ 'avatar-hovered': hoveredIndex === item.id }"
          :style="computedAvatarStyle(item, global)"
          width="56"
          height="56"
          @mousemove="onMouseMove($event, item)"
          @mouseleave="resetTransform"
          @click="handleClick(item)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from 'vue';

interface TooltipItem {
  id: string;
  name: string;
  designation?: string;
  image: string;
  tooltipColor?: string;
  tooltipBorderEffectColors?: string[];
  tooltipBorderEffectRotation?: string;
  tooltipBorderEffectThickness?: string;
  tooltipBorderEffectPercentage?: number;
  tooltipRounding?: number;
  tooltipWidth?: string;
  tooltipPadding?: string;
  appearanceEffect?: string;
  tooltipPosition?: 'top' | 'bottom';
  nameFontSize?: string;
  designationFontSize?: string;
  nameColor?: string;
  designationColor?: string;
  imageOutlineColor?: string;
  imageOutlineWidth?: string;
  imageRounding?: number;
  imageOutlineColorOverwrite?: string;
  tooltipBgColor?: string;
  tooltipDotColor?: string;
  tintTilt?: boolean;
  tooltipOffsetY?: number;
}

const props = defineProps<{
  items: TooltipItem[];
  tooltipColor?: string;
  tooltipBorderEffectColors?: string[];
  tooltipBorderEffectRotation?: string;
  tooltipBorderEffectThickness?: string;
  tooltipBorderEffectPercentage?: number;
  tooltipRounding?: number;
  tooltipWidth?: string;
  tooltipPadding?: string;
  appearanceEffect?: string;
  tooltipPosition?: 'top' | 'bottom';
  nameFontSize?: string;
  designationFontSize?: string;
  nameColor?: string;
  designationColor?: string;
  imageOutlineColor?: string;
  imageOutlineWidth?: string;
  imageRounding?: number;
  imageOutlineColorOverwrite?: string;
  tooltipBgColor?: string;
  tooltipDotColor?: string;
  tintTilt?: boolean;
  borderEffectDelay?: number;
  tooltipOffsetY?: number;
  avatarGap?: string;
  uniqueId: string;
}>();

const emit = defineEmits<{
  (e: 'tooltip-click', payload: { uniqueId: string; item: TooltipItem }): void;
  (e: 'avatar-hover', payload: { uniqueId: string; id: string }): void;
  (e: 'avatar-unhover', payload: { uniqueId: string; id: string }): void;
}>();

const hoveredIndex = ref<string | null>(null);
const bgAnimated = ref(false);
const borderVisible = ref(false);
const tooltipTransform = reactive({ rotate: 0, translateX: 0 });
let borderTimeout: number | undefined;

const global = computed(() => ({
  tooltipColor: props.tooltipColor ?? '#23272f',
  tooltipBorderEffectColors: props.tooltipBorderEffectColors ?? [
    '#888 0',
    '#444 20%',
    'transparent 80%',
  ],
  tooltipBorderEffectRotation: props.tooltipBorderEffectRotation ?? '2.5rad',
  tooltipBorderEffectThickness: props.tooltipBorderEffectThickness ?? '2px',
  tooltipBorderEffectPercentage:
    typeof props.tooltipBorderEffectPercentage === 'number'
      ? props.tooltipBorderEffectPercentage
      : 100,
  tooltipRounding: props.tooltipRounding ?? 12,
  tooltipWidth: props.tooltipWidth ?? '220px',
  tooltipPadding: props.tooltipPadding ?? '1.2rem 1.5rem',
  appearanceEffect: props.appearanceEffect ?? 'from-bottom-right',
  tooltipPosition: props.tooltipPosition ?? 'bottom',
  borderEffectDelay: props.borderEffectDelay ?? 1000,
  nameFontSize: props.nameFontSize ?? '1.1rem',
  designationFontSize: props.designationFontSize ?? '0.95rem',
  nameColor: props.nameColor ?? '#fff',
  designationColor: props.designationColor ?? '#fff',
  imageOutlineColor: props.imageOutlineColor ?? '#0984e3',
  imageOutlineWidth: props.imageOutlineWidth ?? '2px',
  imageRounding: props.imageRounding ?? 20,
  imageOutlineColorOverwrite: props.imageOutlineColorOverwrite,
  tooltipBgColor: props.tooltipBgColor ?? 'rgba(255,255,255,0.08)',
  tooltipDotColor: props.tooltipDotColor ?? 'rgba(255,255,255,0.15)',
  tintTilt: props.tintTilt ?? true,
  tooltipOffsetY:
    typeof props.tooltipOffsetY === 'number' ? props.tooltipOffsetY : 16,
  avatarGap: props.avatarGap ?? '32px',
}));

function showTooltip(id: string) {
  hoveredIndex.value = id;
  bgAnimated.value = false;
  borderVisible.value = false;
  setTimeout(() => {
    bgAnimated.value = true;
  }, 350);
  borderTimeout = window.setTimeout(() => {
    borderVisible.value = true;
  }, getItem('borderEffectDelay', id));
}

function hideTooltip() {
  hoveredIndex.value = null;
  bgAnimated.value = false;
  borderVisible.value = false;
  resetTransform();
  if (borderTimeout) clearTimeout(borderTimeout);
}

function getItem(key: keyof TooltipItem, id: string) {
  const item = props.items.find((i) => i.id === id);
  return (item && item[key]) ?? global.value[key];
}

function computedTooltipStyle(item: TooltipItem, global: any, transform: any) {
  const borderGradient = \`linear-gradient(\${
    item.tooltipBorderEffectRotation || global.tooltipBorderEffectRotation
  }, \${(item.tooltipBorderEffectColors || global.tooltipBorderEffectColors).join(
    ', '
  )})\`;
  const bgColor = item.tooltipColor || global.tooltipColor;
  const width = item.tooltipWidth || global.tooltipWidth;
  const padding = item.tooltipPadding || global.tooltipPadding;
  const borderRadius = (item.tooltipRounding ?? global.tooltipRounding) + 'px';
  const thickness = item.tooltipBorderEffectThickness || global.tooltipBorderEffectThickness;
  const percent =
    typeof item.tooltipBorderEffectPercentage === 'number'
      ? item.tooltipBorderEffectPercentage
      : global.tooltipBorderEffectPercentage;
  const appearance = item.appearanceEffect || global.appearanceEffect;
  const position = item.tooltipPosition || global.tooltipPosition;
  const offsetY =
    typeof item.tooltipOffsetY === 'number'
      ? item.tooltipOffsetY
      : global.tooltipOffsetY;
  const style: any = {
    backgroundImage: \`linear-gradient(\${bgColor}, \${bgColor}), \${borderGradient}\`,
    backgroundOrigin: 'padding-box, border-box',
    backgroundClip: 'padding-box, border-box',
    backgroundSize: \`100% 100%, 100% \${percent}%\`,
    backgroundRepeat: 'no-repeat',
    border: \`\${thickness} solid transparent\`,
    borderRadius,
    width,
    minWidth: width,
    maxWidth: width,
    padding,
    boxSizing: 'border-box',
    position: 'absolute',
    left: '50%',
    transform: \`translateX(-50%) rotate(\${transform.rotate}deg) translateX(\${transform.translateX}px)\`,
    zIndex: 10,
    pointerEvents: 'none',
    transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), opacity 0.2s',
    overflow: 'hidden',
  };
  if (position === 'top') {
    style.bottom = \`calc(100% + \${Math.abs(offsetY)}px)\`;
    style.top = undefined;
  } else {
    style.top = \`calc(100% + \${Math.abs(offsetY)}px)\`;
    style.bottom = undefined;
  }
  return style;
}

function computedTooltipBgStyle(item: TooltipItem, global: any) {
  const bgColor = item.tooltipBgColor || global.tooltipBgColor;
  const dotColor = item.tooltipDotColor || global.tooltipDotColor;
  return {
    backgroundImage: \`radial-gradient(\${dotColor} 1.5px, transparent 1.5px)\`,
    backgroundPosition: '50% 50%',
    backgroundSize: '1.1rem 1.1rem',
    backgroundColor: bgColor,
    opacity: 0.9,
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    pointerEvents: 'none',
    transition: 'filter 0.7s cubic-bezier(.4,2,.6,1)',
    filter: bgAnimated.value
      ? 'blur(2.25px) brightness(1.18)'
      : 'blur(0px) brightness(1)',
  };
}

function computedBorderEffectStyle(item: TooltipItem, global: any) {
  return {
    '--border-effect-color':
      (item.tooltipBorderEffectColors && item.tooltipBorderEffectColors[1]) ||
      (global.tooltipBorderEffectColors &&
        global.tooltipBorderEffectColors[1]) ||
      'mediumslateblue',
  };
}

function computedAvatarOutlineStyle(item: TooltipItem, global: any) {
  const outlineWidth =
    parseInt(item.imageOutlineWidth || global.imageOutlineWidth, 10) || 2;
  const rounding = (item.imageRounding ?? global.imageRounding) + 'px';
  const containerColor =
    item.imageOutlineColorOverwrite ||
    global.imageOutlineColorOverwrite ||
    item.imageOutlineColor ||
    global.imageOutlineColor;
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: containerColor,
    borderRadius: rounding,
    padding: \`\${outlineWidth}px\`,
    boxSizing: 'content-box',
    width: '56px',
    height: '56px',
  };
}

function computedAvatarStyle(item: TooltipItem, global: any) {
  const outlineColor = item.imageOutlineColor || global.imageOutlineColor;
  return {
    border: 'none',
    borderRadius: (item.imageRounding ?? global.imageRounding) + 'px',
    width: '56px',
    height: '56px',
    objectFit: 'cover',
    objectPosition: 'top',
    background: outlineColor,
    transition: 'box-shadow 0.2s, border-color 0.2s, transform 0.18s cubic-bezier(.4,2,.6,1)',
    display: 'block',
  };
}

function transitionName(item: TooltipItem, global: any) {
  return item.appearanceEffect || global.appearanceEffect || 'from-bottom-right';
}

function onMouseMove(event: MouseEvent, item: TooltipItem) {
  if (!(item.tintTilt ?? global.value.tintTilt)) return;
  const img = event.target as HTMLElement;
  const rect = img.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const halfWidth = rect.width / 2;
  const x = offsetX - halfWidth;
  const clampedX = Math.max(-100, Math.min(100, x));
  tooltipTransform.rotate = (clampedX / 100) * 45;
  tooltipTransform.translateX = (clampedX / 100) * 50;
}

function resetTransform() {
  tooltipTransform.rotate = 0;
  tooltipTransform.translateX = 0;
}

// New: Avatar hover/unhover event handlers
function onAvatarMouseEnter(id: string) {
  showTooltip(id);
  emit('avatar-hover', { uniqueId: props.uniqueId, id });
}
function onAvatarMouseLeave(id: string) {
  hideTooltip();
  emit('avatar-unhover', { uniqueId: props.uniqueId, id });
}

// NEW: Emit click event with uniqueId and clicked item
function handleClick(item: TooltipItem) {
  emit('tooltip-click', { uniqueId: props.uniqueId, item });
}
</script>

<style scoped>
.animated-tooltip {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.tooltip-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tooltip-content {
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  text-align: center;
  font-family: inherit;
  font-weight: 500;
  overflow: visible;
  transition: background 0.3s, border 0.3s;
  position: relative;
}
.tooltip-bg-dots {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
}
.tooltip-name {
  font-weight: bold;
  margin-bottom: 2px;
  z-index: 2;
  position: relative;
}
.tooltip-designation {
  opacity: 0.85;
  z-index: 2;
  position: relative;
}
/* Avatar outline container */
.avatar-outline {
  margin-top: 16px;
  margin-bottom: 0;
}
/* Avatar image (no border, no outline, background matches outline) */
.avatar {
  display: block;
  will-change: transform, box-shadow;
}
/* Avatar hover effect */
.avatar-hovered {
  transform: scale(1.08) rotate(-3deg);
  box-shadow: 0 6px 24px 0 rgba(60,60,60,0.13);
  z-index: 2;
}

/* --- Appearance Effects --- */
.from-bottom-right-enter-active { animation: from-bottom-right-in 0.5s cubic-bezier(.22,1.5,.56,1.01); }
.from-bottom-right-leave-active { animation: fade-out 0.25s cubic-bezier(.55,0,.55,1); }
@keyframes from-bottom-right-in {
  0% { opacity: 0; transform: translateX(-30%) translateY(40px) scale(0.7); }
  60% { opacity: 1; transform: translateX(-50%) translateY(-10px) scale(1.1); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
}
.from-top-left-enter-active { animation: from-top-left-in 0.5s cubic-bezier(.22,1.5,.56,1.01); }
.from-top-left-leave-active { animation: fade-out 0.25s cubic-bezier(.55,0,.55,1); }
@keyframes from-top-left-in {
  0% { opacity: 0; transform: translateX(-70%) translateY(-40px) scale(0.7); }
  60% { opacity: 1; transform: translateX(-50%) translateY(10px) scale(1.1); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
}
.from-top-right-enter-active { animation: from-top-right-in 0.5s cubic-bezier(.22,1.5,.56,1.01); }
.from-top-right-leave-active { animation: fade-out 0.25s cubic-bezier(.55,0,.55,1); }
@keyframes from-top-right-in {
  0% { opacity: 0; transform: translateX(10%) translateY(-40px) scale(0.7); }
  60% { opacity: 1; transform: translateX(-50%) translateY(10px) scale(1.1); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
}
.from-bottom-left-enter-active { animation: from-bottom-left-in 0.5s cubic-bezier(.22,1.5,.56,1.01); }
.from-bottom-left-leave-active { animation: fade-out 0.25s cubic-bezier(.55,0,.55,1); }
@keyframes from-bottom-left-in {
  0% { opacity: 0; transform: translateX(-70%) translateY(40px) scale(0.7); }
  60% { opacity: 1; transform: translateX(-50%) translateY(-10px) scale(1.1); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
}
.from-top-enter-active { animation: from-top-in 0.45s cubic-bezier(.22,1.5,.56,1.01); }
.from-top-leave-active { animation: fade-out 0.22s cubic-bezier(.55,0,.55,1); }
@keyframes from-top-in {
  0% { opacity: 0; transform: translateX(-50%) translateY(-40px) scale(0.7); }
  60% { opacity: 1; transform: translateX(-50%) translateY(10px) scale(1.1); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
}
.from-bottom-enter-active { animation: from-bottom-in 0.45s cubic-bezier(.22,1.5,.56,1.01); }
.from-bottom-leave-active { animation: fade-out 0.22s cubic-bezier(.55,0,.55,1); }
@keyframes from-bottom-in {
  0% { opacity: 0; transform: translateX(-50%) translateY(40px) scale(0.7); }
  60% { opacity: 1; transform: translateX(-50%) translateY(-10px) scale(1.1); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
}
/* Existing: from-left, from-right, center-up, center-down (unchanged) ... */
@keyframes fade-out {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
` }
    ],
    dependencies: ``,
    credit: `[Animated Tooltip](https://ui.aceternity.com/components/animated-tooltip) by [Aceternity UI](https://ui.aceternity.com/)
[Accent Shard (On Hover)](https://codepen.io/Hyperplexed/pen/qBMYVoq) by [Hyperplexed](https://codepen.io/Hyperplexed)
[Vercel app border hover effect](https://codepen.io/Juxtopposed/pen/xxQNozB) by [Juxtopposed](https://codepen.io/Juxtopposed)
`,
    previewType: 'center',
  },
  {
    name: 'Bento Grid',
    route: 'bento-grid',
    description: 'A grid layout with fully customizable cell backgrounds, borders, border radius, and per-cell padding.',
    usage: `<script setup lang="ts">
import BentoGrid from './BentoGrid.vue';

// Add the handler for cell clicks
function handleCellClick(cell: 'main' | 'topCenter' | 'topRight' | 'bottom') {
  console.log('Clicked:', cell);
}
</script>

<template>
  <div style="width: 100vw;">
    <BentoGrid
      :main-aspect="'9/16'"
      :left-col-ratio="0.32"
      :right-col1="0.6"
      :right-col2="0.4"
      :top-row-ratio="0.65"
      :bottom-row-ratio="0.35"
      gap="20px"
      grid-height="264px"

      cell-background="#17161c"
      cell-border-color="#33313d"
      cell-border-radius="32px"
      cell-border-width="1px"
      cell-padding="16px"

      main-cell-border-color="#7b1fa2"
      main-cell-border-radius="32px"

      top-left-cell-background="#060507"

      top-right-cell-background="#111014"

      bottom-cell-background="#4776cb"
      bottom-cell-border-color="#fff"
      bottom-cell-border-radius="8px"
      bottom-cell-border-width="4px"
      @cellClick="handleCellClick"
    >
      <template #main>
        <div style="width: 100%; text-align: center;">
          <div style="font-size: 1rem; font-weight: bold;">Left (Main)</div>
        </div>
      </template>
      <template #topCenter>
        <div style="width: 100%; text-align: center;">
          <div style="font-size: 1rem; font-weight: bold;">Top Center</div>
        </div>
      </template>
      <template #topRight>
        <div style="width: 100%; text-align: center;">
          <div style="font-size: 1rem; font-weight: bold;">Top Right</div>
        </div>
      </template>
      <template #bottom>
        <div style="width: 100%; text-align: center;">
          <div style="font-size: 1rem; font-weight: bold;">Bottom Right</div>
        </div>
      </template>
    </BentoGrid>
  </div>
</template>

// Note: The BentoGrid component accepts the following props:
// - mainAspect: string (optional) - Aspect ratio of the main (left) cell (default: '16/9').
// - leftColRatio: number (optional) - Fractional width of the left (main) cell (default: 0.6).
// - rightCol1: number (optional) - Proportion of the top-center cell (relative to right group, default: 0.5).
// - rightCol2: number (optional) - Proportion of the top-right cell (relative to right group, default: 0.5).
// - topRowRatio: number (optional) - Fractional height of the top row (default: 0.65).
// - bottomRowRatio: number (optional) - Fractional height of the bottom row (default: 0.35).
// - gap: string (optional) - Gap between grid cells (default: '16px').
// - gridHeight: string (optional) - Height of the grid (default: '100%').
//
// - cellBackground: string (optional) - Background color for all cells unless overridden (default: '#17161c').
// - cellBorderColor: string (optional) - Border color for all cells unless overridden (default: '#33313d').
// - cellBorderRadius: string | number (optional) - Border radius for all cells unless overridden (default: '8px').
// - cellBorderWidth: string | number (optional) - Border width for all cells unless overridden (default: '1px').
// - cellPadding: string (optional) - Padding for all cells unless overridden (default: '16px').
// - cellPaddingTop: string (optional) - Padding-top for all cells unless overridden.
// - cellPaddingRight: string (optional) - Padding-right for all cells unless overridden.
// - cellPaddingBottom: string (optional) - Padding-bottom for all cells unless overridden.
// - cellPaddingLeft: string (optional) - Padding-left for all cells unless overridden.
//
// - mainCellBackground: string (optional) - Background for the main (left) cell.
// - mainCellBorderColor: string (optional) - Border color for the main cell.
// - mainCellBorderRadius: string | number (optional) - Border radius for the main cell.
// - mainCellBorderWidth: string | number (optional) - Border width for the main cell.
// - mainCellPadding: string (optional) - Padding for the main cell.
// - mainCellPaddingTop: string (optional) - Padding-top for the main cell.
// - mainCellPaddingRight: string (optional) - Padding-right for the main cell.
// - mainCellPaddingBottom: string (optional) - Padding-bottom for the main cell.
// - mainCellPaddingLeft: string (optional) - Padding-left for the main cell.
//
// - topCenterCellBackground: string (optional) - Background for the top-center cell.
// - topCenterCellBorderColor: string (optional) - Border color for the top-center cell.
// - topCenterCellBorderRadius: string | number (optional) - Border radius for the top-center cell.
// - topCenterCellBorderWidth: string | number (optional) - Border width for the top-center cell.
// - topCenterCellPadding: string (optional) - Padding for the top-center cell.
// - topCenterCellPaddingTop: string (optional) - Padding-top for the top-center cell.
// - topCenterCellPaddingRight: string (optional) - Padding-right for the top-center cell.
// - topCenterCellPaddingBottom: string (optional) - Padding-bottom for the top-center cell.
// - topCenterCellPaddingLeft: string (optional) - Padding-left for the top-center cell.
//
// - topRightCellBackground: string (optional) - Background for the top-right cell.
// - topRightCellBorderColor: string (optional) - Border color for the top-right cell.
// - topRightCellBorderRadius: string | number (optional) - Border radius for the top-right cell.
// - topRightCellBorderWidth: string | number (optional) - Border width for the top-right cell.
// - topRightCellPadding: string (optional) - Padding for the top-right cell.
// - topRightCellPaddingTop: string (optional) - Padding-top for the top-right cell.
// - topRightCellPaddingRight: string (optional) - Padding-right for the top-right cell.
// - topRightCellPaddingBottom: string (optional) - Padding-bottom for the top-right cell.
// - topRightCellPaddingLeft: string (optional) - Padding-left for the top-right cell.
//
// - bottomCellBackground: string (optional) - Background for the bottom cell.
// - bottomCellBorderColor: string (optional) - Border color for the bottom cell.
// - bottomCellBorderRadius: string | number (optional) - Border radius for the bottom cell.
// - bottomCellBorderWidth: string | number (optional) - Border width for the bottom cell.
// - bottomCellPadding: string (optional) - Padding for the bottom cell.
// - bottomCellPaddingTop: string (optional) - Padding-top for the bottom cell.
// - bottomCellPaddingRight: string (optional) - Padding-right for the bottom cell.
// - bottomCellPaddingBottom: string (optional) - Padding-bottom for the bottom cell.
// - bottomCellPaddingLeft: string (optional) - Padding-left for the bottom cell.
//
// Events:
// - cellClick: Emits when any cell is clicked. The payload is one of: 'main', 'topCenter', 'topRight', 'bottom'.
//
// Slots:
// - main: Content for the main (left) cell.
// - topCenter: Content for the top-center cell.
// - topRight: Content for the top-right cell.
// - bottom: Content for the bottom cell.
//
// Usage notes:
// - Renders a bento-style grid with a large left cell and three right cells (top-center, top-right, bottom).
// - All layout, background, border, border-radius, border-width, and padding can be set globally, per-cell, or per-side (per CSS rules).
// - Per-cell and per-side props override global ones (e.g., mainCellPaddingLeft > cellPaddingLeft > cellPadding).
// - All cell content is provided via named slots.
// - Listen to the 'cellClick' event to handle cell clicks.
`,
    code: [
      {
        filename: 'BentoGrid.vue',
        content: `<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  mainAspect?: string,
  leftColRatio?: number,
  rightCol1?: number,
  rightCol2?: number,
  topRowRatio?: number,
  bottomRowRatio?: number,
  gap?: string,
  gridHeight?: string,

  // Global cell style props
  cellBackground?: string,
  cellBorderColor?: string,
  cellBorderRadius?: string | number,
  cellBorderWidth?: string | number,
  cellPadding?: string,
  cellPaddingTop?: string,
  cellPaddingRight?: string,
  cellPaddingBottom?: string,
  cellPaddingLeft?: string,

  // Main cell overrides
  mainCellBackground?: string,
  mainCellBorderColor?: string,
  mainCellBorderRadius?: string | number,
  mainCellBorderWidth?: string | number,
  mainCellPadding?: string,
  mainCellPaddingTop?: string,
  mainCellPaddingRight?: string,
  mainCellPaddingBottom?: string,
  mainCellPaddingLeft?: string,

  // Top center cell overrides
  topCenterCellBackground?: string,
  topCenterCellBorderColor?: string,
  topCenterCellBorderRadius?: string | number,
  topCenterCellBorderWidth?: string | number,
  topCenterCellPadding?: string,
  topCenterCellPaddingTop?: string,
  topCenterCellPaddingRight?: string,
  topCenterCellPaddingBottom?: string,
  topCenterCellPaddingLeft?: string,

  // Top right cell overrides
  topRightCellBackground?: string,
  topRightCellBorderColor?: string,
  topRightCellBorderRadius?: string | number,
  topRightCellBorderWidth?: string | number,
  topRightCellPadding?: string,
  topRightCellPaddingTop?: string,
  topRightCellPaddingRight?: string,
  topRightCellPaddingBottom?: string,
  topRightCellPaddingLeft?: string,

  // Bottom cell overrides
  bottomCellBackground?: string,
  bottomCellBorderColor?: string,
  bottomCellBorderRadius?: string | number,
  bottomCellBorderWidth?: string | number,
  bottomCellPadding?: string,
  bottomCellPaddingTop?: string,
  bottomCellPaddingRight?: string,
  bottomCellPaddingBottom?: string,
  bottomCellPaddingLeft?: string,
}>();

const emit = defineEmits<{
  (e: 'cellClick', cell: 'main' | 'topCenter' | 'topRight' | 'bottom'): void
}>();

const mainAspect = props.mainAspect ?? '16/9';
const leftColRatio = props.leftColRatio ?? 0.6;
const rightCol1 = props.rightCol1 ?? 0.5;
const rightCol2 = props.rightCol2 ?? 0.5;
const topRowRatio = props.topRowRatio ?? 0.65;
const bottomRowRatio = props.bottomRowRatio ?? 0.35;
const gap = props.gap ?? '16px';
const gridHeight = props.gridHeight ?? '100%';

const rightGroupTotal = rightCol1 + rightCol2;
const rightCol1Frac = rightCol1 / rightGroupTotal;
const rightCol2Frac = rightCol2 / rightGroupTotal;

const gridVars = computed(() => ({
  '--main-aspect': mainAspect,
  '--left-col': \`\${leftColRatio}fr\`,
  '--right-col1': \`\${(1 - leftColRatio) * rightCol1Frac}fr\`,
  '--right-col2': \`\${(1 - leftColRatio) * rightCol2Frac}fr\`,
  '--top-row': \`\${topRowRatio}fr\`,
  '--bottom-row': \`\${bottomRowRatio}fr\`,
  '--gap': gap,
  height: gridHeight,
}));

// Explicit key maps for type-safe prop access
const backgroundKeys = {
  main: 'mainCellBackground',
  topCenter: 'topCenterCellBackground',
  topRight: 'topRightCellBackground',
  bottom: 'bottomCellBackground'
} as const;
const borderColorKeys = {
  main: 'mainCellBorderColor',
  topCenter: 'topCenterCellBorderColor',
  topRight: 'topRightCellBorderColor',
  bottom: 'bottomCellBorderColor'
} as const;
const borderRadiusKeys = {
  main: 'mainCellBorderRadius',
  topCenter: 'topCenterCellBorderRadius',
  topRight: 'topRightCellBorderRadius',
  bottom: 'bottomCellBorderRadius'
} as const;
const borderWidthKeys = {
  main: 'mainCellBorderWidth',
  topCenter: 'topCenterCellBorderWidth',
  topRight: 'topRightCellBorderWidth',
  bottom: 'bottomCellBorderWidth'
} as const;
const paddingKeys = {
  main: 'mainCellPadding',
  topCenter: 'topCenterCellPadding',
  topRight: 'topRightCellPadding',
  bottom: 'bottomCellPadding'
} as const;
const paddingTopKeys = {
  main: 'mainCellPaddingTop',
  topCenter: 'topCenterCellPaddingTop',
  topRight: 'topRightCellPaddingTop',
  bottom: 'bottomCellPaddingTop'
} as const;
const paddingRightKeys = {
  main: 'mainCellPaddingRight',
  topCenter: 'topCenterCellPaddingRight',
  topRight: 'topRightCellPaddingRight',
  bottom: 'bottomCellPaddingRight'
} as const;
const paddingBottomKeys = {
  main: 'mainCellPaddingBottom',
  topCenter: 'topCenterCellPaddingBottom',
  topRight: 'topRightCellPaddingBottom',
  bottom: 'bottomCellPaddingBottom'
} as const;
const paddingLeftKeys = {
  main: 'mainCellPaddingLeft',
  topCenter: 'topCenterCellPaddingLeft',
  topRight: 'topRightCellPaddingLeft',
  bottom: 'bottomCellPaddingLeft'
} as const;

function cellStyle(cell: 'main' | 'topCenter' | 'topRight' | 'bottom') {
  const background = props[backgroundKeys[cell]] ?? props.cellBackground ?? '#17161c';
  const borderColor = props[borderColorKeys[cell]] ?? props.cellBorderColor ?? '#33313d';
  const borderRadius = props[borderRadiusKeys[cell]] ?? props.cellBorderRadius ?? '8px';
  const borderWidth = props[borderWidthKeys[cell]] ?? props.cellBorderWidth ?? '1px';
  const padding = props[paddingKeys[cell]] ?? props.cellPadding ?? '16px';
  const paddingTop = props[paddingTopKeys[cell]] ?? props.cellPaddingTop;
  const paddingRight = props[paddingRightKeys[cell]] ?? props.cellPaddingRight;
  const paddingBottom = props[paddingBottomKeys[cell]] ?? props.cellPaddingBottom;
  const paddingLeft = props[paddingLeftKeys[cell]] ?? props.cellPaddingLeft;

  let paddingStyle: string | undefined;
  if (
    paddingTop !== undefined ||
    paddingRight !== undefined ||
    paddingBottom !== undefined ||
    paddingLeft !== undefined
  ) {
    paddingStyle = [
      paddingTop ?? padding,
      paddingRight ?? padding,
      paddingBottom ?? padding,
      paddingLeft ?? padding,
    ].join(' ');
  } else {
    paddingStyle = padding;
  }

  return {
    background,
    border: \`\${borderWidth} solid \${borderColor}\`,
    borderRadius: typeof borderRadius === 'number' ? \`\${borderRadius}px\` : borderRadius,
    padding: paddingStyle,
  };
}

// --- Add cell click callback ---
function onCellClick(cell: 'main' | 'topCenter' | 'topRight' | 'bottom') {
  emit('cellClick', cell);
}
</script>

<template>
  <div class="bento-grid" :style="gridVars">
    <div
      class="cell cell-main"
      :style="cellStyle('main')"
      @click="onCellClick('main')"
    >
      <slot name="main" />
    </div>
    <div
      class="cell cell-top-left"
      :style="cellStyle('topCenter')"
      @click="onCellClick('topCenter')"
    >
      <slot name="topCenter" />
    </div>
    <div
      class="cell cell-top-right"
      :style="cellStyle('topRight')"
      @click="onCellClick('topRight')"
    >
      <slot name="topRight" />
    </div>
    <div
      class="cell cell-bottom"
      :style="cellStyle('bottom')"
      @click="onCellClick('bottom')"
    >
      <slot name="bottom" />
    </div>
  </div>
</template>

<style scoped>
.bento-grid {
  width: 100%;
  min-height: 0;
  min-width: 0;
  box-sizing: border-box;
  display: grid;
  gap: var(--gap, 16px);
  grid-template-areas:
    "main topCenter topRight"
    "main bottom bottom";
  grid-template-columns:
    minmax(0, var(--left-col, 0.6fr))
    minmax(0, var(--right-col1, 0.2fr))
    minmax(0, var(--right-col2, 0.2fr));
  grid-template-rows:
    minmax(0, var(--top-row, 0.65fr))
    minmax(0, var(--bottom-row, 0.35fr));
}
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  overflow: hidden;
  color: #fff;
  /* background, border, border-radius, padding set via inline style */
}
.cell-main {
  grid-area: main;
  aspect-ratio: var(--main-aspect, 16/9);
  width: 100%;
  height: 100%;
  align-self: stretch;
  justify-self: stretch;
}
.cell-top-left {
  grid-area: topCenter;
  width: 100%;
  height: 100%;
  align-self: stretch;
  justify-self: stretch;
}
.cell-top-right {
  grid-area: topRight;
  width: 100%;
  height: 100%;
  align-self: stretch;
  justify-self: stretch;
}
.cell-bottom {
  grid-area: bottom;
  width: 100%;
  height: 100%;
  align-self: stretch;
  justify-self: stretch;
}
</style>
` }
    ],
    dependencies: ``,
    credit: `[Gradient](https://animata.design/docs/bento-grid/gradient) by [ANIMATA DESIGN](https://animata.design/)`,
    previewType: 'fullwidth',
  },
  {
    name: 'Spiral',
    route: 'spiral',
    description: 'A fully customizable, reusable spiral that lets you define separate distortion parameters for the idle, hover, and click states.',
    usage: `<script setup lang="ts">
import Spiral from './Spiral.vue'

function handleSpiralClick(index: number) {
  console.log(\`Clicked spiral container index: \${index}\`)
}

function handleSpiralHover(index: number, isHovering: boolean) {
  console.log(\`\${isHovering ? 'Hovered' : 'Unhovered'} spiral index: \${index}\`)
}
</script>

<template>
  <div class="app-container">
    <div class="demo-section">
      <div class="label">
        Distortion: 0.6 / 1.4 / 3.6; Stroke Width: 2
      </div>
      <div class="spiral-wrapper" @click="handleSpiralClick(1)">
        <Spiral
          spiralColor="71, 118, 203"
          :defaultDistortion="0.6"
          :hoverDistortion="1.4"
          :clickDistortion="3.6"
          :strokeWidth="2"
          :onHover="(hover) => handleSpiralHover(1, hover)"
        />
      </div>
    </div>

    <div class="demo-section">
      <div class="label">
        Distortion: 0.4 / 0.7 / 1.5; Stroke Width: 3.7
      </div>
      <div class="spiral-wrapper" @click="handleSpiralClick(2)">
        <Spiral
          spiralColor="161, 159, 229"
          :defaultDistortion="0.4"
          :hoverDistortion="0.7"
          :clickDistortion="1.5"
          :strokeWidth="3.7"
          :onHover="(hover) => handleSpiralHover(2, hover)"
        />
      </div>
    </div>

    <div class="demo-section">
      <div class="label">
        Distortion: 1.2 / 1.9 / 5; Stroke Width: 1.34
      </div>
      <div class="spiral-wrapper" @click="handleSpiralClick(3)">
        <Spiral
          spiralColor="108, 198, 6"
          :defaultDistortion="1.2"
          :hoverDistortion="1.9"
          :clickDistortion="5"
          :strokeWidth="1.34"
          :onHover="(hover) => handleSpiralHover(3, hover)"
        />
      </div>
    </div>

    <!-- Additional example -->
    <div class="demo-section">
      <div class="label">
        Distortion: 0.5 / 1.0 / 2.0; Stroke Width: 2.5
      </div>
      <div class="spiral-wrapper rounded-demo" @click="handleSpiralClick(4)">
        <Spiral
          spiralColor="10, 10, 10"
          :defaultDistortion="0.5"
          :hoverDistortion="1.0"
          :clickDistortion="2.0"
          :strokeWidth="2.5"
          :onHover="(hover) => handleSpiralHover(4, hover)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  background-color: transparent;
  overflow-y: auto;
  align-items: stretch;
}

.demo-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  color: #aaa;
  font-family: monospace;
  font-size: 0.85rem;
  user-select: none;
  padding-left: 8px;
}

.spiral-wrapper {
  width: 100%;
  aspect-ratio: 1 / 1; /* Maintain square */
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  user-select: none;
}

/* Additional example container style */
.rounded-demo {
  border-radius: 8px !important;
  background-color: #eee;
}
</style>

// Note: The Spiral component accepts the following props:
// - spiralColor: string (required) - A base color for rendering the spiral, specified as a comma-separated RGB string (e.g., "255,255,255").
// - defaultDistortion: number (optional) - Distortion coefficient applied in the idle (default) state. Default: 0.8.
// - hoverDistortion: number (optional) - Distortion coefficient applied while pointer is hovering over the spiral. Default: 1.5.
// - clickDistortion: number (optional) - Distortion coefficient applied while mouse is pressed down on the spiral. Default: 3.5.
// - strokeWidth: number (optional) - Pixel width for the spiral's stroke. Default: 2.
// - onHover: (isHovering: boolean) => void (optional) - Functional callback, invoked with true on mouse enter and false on mouse leave.
//
// Emits:
//   None
//
// Slots:
//   None
`,
    code: [
      { filename: 'Spiral.vue', content: `<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps, nextTick } from 'vue'

const props = defineProps({
  spiralColor: { type: String, required: true }, // "R, G, B", e.g. "255,255,255"
  defaultDistortion: { type: Number, default: 0.8 },
  hoverDistortion: { type: Number, default: 1.5 },
  clickDistortion: { type: Number, default: 3.5 },
  strokeWidth: { type: Number, default: 2 },   // Optional stroke width default 2
  onHover: { type: Function as () => void, required: false }
})

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let width = 0
let height = 0
let time = 0
let animationFrameId: number | null = null
let mouseX = 0
let mouseY = 0
let cursorX = 0
let cursorY = 0
let cursorVelX = 0
let cursorVelY = 0
const cursorSpring = 0.3
const cursorFriction = 0.8
let isMouseHovering = false
let isMouseDown = false
const spiralDensity = 6
const animationSpeed = 0.5
const tendrilCount = 3

function updateCursor() {
  const dx = mouseX - cursorX
  const dy = mouseY - cursorY
  cursorVelX += dx * cursorSpring
  cursorVelY += dy * cursorSpring
  cursorVelX *= cursorFriction
  cursorVelY *= cursorFriction
  cursorX += cursorVelX
  cursorY += cursorVelY
}

function getCurrentDistortion() {
  if (isMouseDown) return props.clickDistortion
  if (isMouseHovering) return props.hoverDistortion
  return props.defaultDistortion
}

function drawSpiral(
  centerX: number, centerY: number, radius: number,
  density: number, distortion: number,
  rotation: number, color: string,
  baseLineWidth: number
) {
  if (!ctx) return
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.lineWidth = baseLineWidth

  const maxRadius = radius
  const angleStep = 0.05
  for (let angle = 0; angle < Math.PI * 2 * density; angle += angleStep) {
    const currentRadius = (angle / (Math.PI * 2 * density)) * maxRadius
    const distortedAngle = angle + Math.sin(angle * 3 + time * 0.2) * distortion * 0.1 + Math.cos(angle * 2 + time * 0.1) * distortion * 0.05
    const distortedRadius = currentRadius * (1 + Math.sin(angle * 5 + time * 0.3) * distortion * 0.03)
    const x = centerX + Math.cos(distortedAngle + rotation) * distortedRadius
    const y = centerY + Math.sin(distortedAngle + rotation) * distortedRadius
    if (angle === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()
}

function drawTendrils(centerX: number, centerY: number, count: number, timeVal: number, maxLength: number) {
  if (!ctx) return
  const angleStep = (Math.PI * 2) / count
  for (let i = 0; i < count; i++) {
    const baseAngle = i * angleStep + timeVal * 0.2
    const length = maxLength * (0.5 + Math.sin(timeVal * 0.3 + i) * 0.5)
    ctx.beginPath()
    ctx.strokeStyle = \`rgba(255,255,255,0)\`
    ctx.lineWidth = props.strokeWidth * (1 + Math.sin(timeVal * 0.5 + i * 2) * 0.2)
    let x = centerX
    let y = centerY
    ctx.moveTo(x, y)
    const currentDistortion = getCurrentDistortion()
    for (let j = 0; j < length; j += 3) {
      const distortion = j * 0.02 * currentDistortion
      const angle = baseAngle + Math.sin(j * 0.1 + timeVal * 0.5) * distortion + Math.cos(j * 0.05 + timeVal * 0.3) * distortion
      x += Math.cos(angle) * 3
      y += Math.sin(angle) * 3
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
}

function animate() {
  if (!ctx || !canvas.value) return
  animationFrameId = requestAnimationFrame(animate)
  ctx.clearRect(0, 0, width, height)
  time += 0.01 * animationSpeed

  updateCursor()

  const centerX = width / 2
  const centerY = height / 2
  const cursorDistX = (cursorX - centerX) / (width / 2)
  const cursorDistY = (cursorY - centerY) / (height / 2)
  const cursorDist = Math.sqrt(cursorDistX * cursorDistX + cursorDistY * cursorDistY)
  const mainRadius = Math.min(width, height) * 0.4
  const mainDistortion = getCurrentDistortion() * (1 + cursorDist * 0.5)
  const mainRotation = time * 0.1 + Math.atan2(cursorDistY, cursorDistX) * 0.2

  for (let i = 0; i < 3; i++) {
    const radius = mainRadius * (0.6 + i * 0.2)
    const density = spiralDensity * (0.8 + i * 0.1)
    const rotation = mainRotation + (i * Math.PI) / 4
    const alpha = 0.7 - i * 0.2
    const color = \`rgba(\${props.spiralColor},\${alpha.toFixed(2)})\`
    const lineWidth = props.strokeWidth * (1 - i * 0.25)
    drawSpiral(centerX, centerY, radius, density, mainDistortion, rotation, color, lineWidth)
  }

  drawTendrils(cursorX, cursorY, tendrilCount, time, 100)
}

function onResize() {
  if (!canvas.value) return

  width = canvas.value.clientWidth
  height = canvas.value.clientHeight

  const dpr = window.devicePixelRatio || 1

  canvas.value.width = width * dpr
  canvas.value.height = height * dpr

  if (ctx) {
    if (ctx.resetTransform) ctx.resetTransform()
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, width, height)
  }

  mouseX = width / 2
  mouseY = height / 2
  cursorX = mouseX
  cursorY = mouseY
}

function onMouseEnter() {
  isMouseHovering = true
  if (props.onHover) props.onHover(true)
}

function onMouseLeave() {
  isMouseHovering = false
  isMouseDown = false
  if (props.onHover) props.onHover(false)
}

function onMouseMove(e: MouseEvent) {
  if (!canvas.value) return

  // Use e.offsetX/Y or calculate relative to canvas for better accuracy in production
  const rect = canvas.value.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
}

function onMouseDown() {
  if (isMouseHovering) isMouseDown = true
}

function onMouseUp() {
  isMouseDown = false
}

onMounted(async () => {
  await nextTick() // Ensure canvas is rendered
  if (!canvas.value) return
  ctx = canvas.value.getContext('2d')
  onResize()

  const container = canvas.value.parentElement
  if (container) {
    container.addEventListener('mouseenter', onMouseEnter)
    container.addEventListener('mouseleave', onMouseLeave)
    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('mousedown', onMouseDown)
    container.addEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('resize', onResize)
  animate()
})

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', onResize)

  const container = canvas.value?.parentElement
  if (container) {
    container.removeEventListener('mouseenter', onMouseEnter)
    container.removeEventListener('mouseleave', onMouseLeave)
    container.removeEventListener('mousemove', onMouseMove)
    container.removeEventListener('mousedown', onMouseDown)
    container.removeEventListener('mouseup', onMouseUp)
  }
})
</script>

<template>
  <div class="spiral-container" style="aspect-ratio: 1 / 1;">
    <!-- Wrapping canvas in client-only in Nuxt pages or using .client.vue file is essential -->
    <canvas ref="canvas" class="spiral-canvas"></canvas>
  </div>
</template>

<style scoped>
.spiral-container {
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
  cursor: default;
}
.spiral-container:hover {
  cursor: pointer;
}
.spiral-canvas {
  width: 100%;
  height: 100%;
  display: block;
  user-select: none;
  -webkit-user-select: none;
}
</style>
` },
    ],
    dependencies: ``,
    credit: `[UZUMAKI](https://codepen.io/Alansdead/pen/zxGyOmx) by [Jules](https://codepen.io/Alansdead)`,
    previewType: 'fullwidth',
  },
  {
    name: 'Floating Label Input',
    route: 'floating-label-input',
    description: 'A fully customizable floating label input component.',
    usage: `<template>
  <div class="demo-container">
    <div class="inputs-row">
      <div class="input-wrapper">
        <FloatingLabelInput v-model="username" label="Username" />
      </div>
      <div class="input-wrapper">
        <FloatingLabelInput
          v-model="email"
          label="אימייל"
          :isRTL="true"
          type="email"
          rounding="0px"
          inputHeight="72px"
          inputFontSize="1.5rem"
          labelFontSize="1.125rem"
          labelActiveFontSize="14px"
          foregroundColor="#fff"
          mutedForegroundColor="#aaa"
          accentColor="#a259ff"
        />
      </div>
      <div class="input-wrapper">
        <FloatingLabelInput v-model="password" label="Password" type="password" />
      </div>
      <div class="input-wrapper">
        <FloatingLabelInput
          v-model="info"
          label="Additional Info"
          inputOutlineColor="#707070"
          inputFocusOutlineColor="#00a0d8"
          outlineWidth="3px"
          rounding="10px"
          accentColor="#fff"
          foregroundColor="#00a0d8"
          mutedForegroundColor="#909090"
          labelActiveFontSize="15px"
          :textarea="true"
        />
      </div>
    </div>

    <div class="labels-column">
        <div>
            <strong>Username:</strong><span v-if="username">{{ ' ' + username }}</span><span v-else class="placeholder">—</span>
        </div>
        <div>
            <strong>Email:</strong><span v-if="email">{{ ' ' + email }}</span><span v-else class="placeholder">—</span>
        </div>
        <div>
            <strong>Password:</strong><span v-if="password">{{ ' ' + password }}</span><span v-else class="placeholder">—</span>
        </div>
        <div>
            <strong>Additional Info:</strong><span v-if="info">{{ ' ' + info }}</span><span v-else class="placeholder">—</span>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import FloatingLabelInput from './FloatingLabelInput.vue';

export default defineComponent({
  name: 'Demo',
  components: {
    FloatingLabelInput,
  },
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const info = ref('');
    return { username, email, password, info };
  },
});
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.inputs-row {
  display: flex;
  flex-direction: row;
  gap: 32px;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 1440px;
}

.input-wrapper {
  max-width: 260px;
  min-width: 180px;
  flex: 1 1 180px;
  display: flex;
  align-items: center;
}

.labels-column {
  margin-top: 32px;
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.96rem;
  align-items: stretch;
  color: #fafafa;
}

.placeholder {
  opacity: 0.5;
}
</style>

// Note: The FloatingLabelInput component accepts the following props:
// - label: string (required) - The label text displayed above the input.
// - modelValue: string (required) - The current value of the input (used with v-model).
// - type: string (optional) - The input type (e.g., "text", "email", "password"). Default: "text".
// - autoComplete: string (optional) - The browser autocomplete attribute. Default: "off".
// - required: boolean (optional) - Whether the input is required. Default: false.
// - disabled: boolean (optional) - Whether the input is disabled. Default: false.
// - textarea: boolean (optional) - If true, renders a textarea instead of an input. Default: false.
// - isRTL: boolean (optional) - Force right-to-left input direction. If not set, direction is auto-detected based on input content.
// - accentColor: string (optional) - Accent color for the label when focused/active. Default: "#00a0d8".
// - textareaHeight: string (optional) - Height for the textarea input. Default: "152px".
// - parentBackground: string (optional) - Background color for the input and label. Default: "#060507".
// - inputOutlineColor: string (optional) - Outline color of the input when not focused. Default: "#909090".
// - inputFocusOutlineColor: string (optional) - Outline color of the input when focused. Default: "#fff".
// - outlineWidth: string (optional) - Width of the input outline. Default: "1.5px".
// - foregroundColor: string (optional) - Input text color. Default: "#fff".
// - mutedForegroundColor: string (optional) - Label color when not focused. Default: "#aaa".
// - rounding: string (optional) - Border radius for the input and label. Default: "8px".
// - inputPadding: string (optional) - Padding inside the input. Default: "17px".
// - inputFontSize: string (optional) - Font size for the input. Default: "1.025rem".
// - labelFontSize: string (optional) - Font size for the label. Default: "1.025rem".
// - labelActiveFontSize: string (optional) - Font size for the label when floating. Default: "12px".
// - labelPadding: string (optional) - Padding for the label. Default: "0 7px".
// - labelActivePadding: string (optional) - Padding for the label when floating. Default: "0 6px".
// - inputHeight: string (optional) - Height for the input. Default: "49px".
//
// Emits:
// - update:modelValue: emitted when the input/textarea value changes, supporting v-model usage.
//
// Slots:
//   None
//
// Usage notes:
// - Uses \`modelValue\` and \`update:modelValue\` to be compatible with Vue's v-model default.
// - Supports rendering as either <input> or <textarea> via the \`textarea\` prop.
// - Styling is fully customizable via CSS variables passed as inline styles.
// - Does not depend on external CSS frameworks like Tailwind; uses vanilla CSS within scoped style.
// - This component is UI-focused and does not emit input events other than v-model update.
`,
    code: [
      { filename: 'FloatingLabelInput.vue', content: `<template>
  <div
    :class="[
      'mobile-form-group',
      rtlInput ? 'rtl' : '',
      focused ? 'active' : '',
      hasValue ? 'has-value' : '',
      textarea ? 'textarea' : '',
    ]"
    :style="styleVars"
  >
    <textarea
      v-if="textarea"
      class="mobile-form-input"
      :required="required"
      v-model="localValue"
      @focus="handleFocus"
      @blur="handleBlur"
      :autocomplete="autoComplete"
      :disabled="disabled"
      :dir="rtlInput ? 'rtl' : 'ltr'"
      spellcheck="false"
      :style="{ height: textareaHeight }"
    />
    <input
      v-else
      class="mobile-form-input"
      :type="type"
      :required="required"
      v-model="localValue"
      @focus="handleFocus"
      @blur="handleBlur"
      :autocomplete="autoComplete"
      :disabled="disabled"
      :dir="rtlInput ? 'rtl' : 'ltr'"
      spellcheck="false"
    />
    <label
      :class="['mobile-form-label', textarea ? 'label-textarea' : '']"
      :dir="labelDir"
    >
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';

// Detect RTL helper functions
function detectRTL(text: string): boolean {
  return /[\\u0591-\\u07FF\\uFB1D-\\uFDFD\\uFE70-\\uFEFC]/.test(text);
}

function detectLabelDir(text: string): 'rtl' | 'ltr' {
  return detectRTL(text) ? 'rtl' : 'ltr';
}

export default defineComponent({
  name: 'FloatingLabelInput',
  props: {
    label: { type: String, required: true },
    modelValue: { type: String, required: true },
    type: { type: String, default: 'text' },
    autoComplete: { type: String, default: 'off' },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    textarea: { type: Boolean, default: false },
    isRTL: { type: Boolean, default: undefined },
    accentColor: { type: String, default: '#00a0d8' },
    textareaHeight: { type: String, default: '152px' },
    parentBackground: { type: String, default: '#060507' },
    inputOutlineColor: { type: String, default: '#909090' },
    inputFocusOutlineColor: { type: String, default: '#fff' },
    outlineWidth: { type: String, default: '1.5px' },
    foregroundColor: { type: String, default: '#fff' },
    mutedForegroundColor: { type: String, default: '#aaa' },
    rounding: { type: String, default: '8px' },
    inputPadding: { type: String, default: '17px' },
    inputFontSize: { type: String, default: '1.025rem' },
    labelFontSize: { type: String, default: '1.025rem' },
    labelActiveFontSize: { type: String, default: '12px' },
    labelPadding: { type: String, default: '0 7px' },
    labelActivePadding: { type: String, default: '0 6px' },
    inputHeight: { type: String, default: '49px' },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const focused = ref(false);
    const rtlInput = ref(props.isRTL ?? false);
    const localValue = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (newVal) => {
        localValue.value = newVal;
        if (!newVal) {
          rtlInput.value = props.isRTL ?? false;
        } else {
          rtlInput.value = detectRTL(newVal);
        }
      }
    );

    watch(
      () => props.isRTL,
      (newVal) => {
        if (!localValue.value) {
          rtlInput.value = newVal ?? false;
        }
      }
    );

    watch(localValue, (newVal) => emit('update:modelValue', newVal));

    const hasValue = computed(() => localValue.value.length > 0);
    const labelDir = computed(() => detectLabelDir(props.label));

    function handleFocus() {
      focused.value = true;
    }
    function handleBlur() {
      focused.value = false;
    }

    const styleVars = computed(() => ({
      '--accent-color': props.accentColor,
      '--mobile-form-input-bg': props.parentBackground,
      '--input-outline': props.inputOutlineColor,
      '--input-outline-focus': props.inputFocusOutlineColor,
      '--input-outline-width': props.outlineWidth,
      '--foreground': props.foregroundColor,
      '--muted-foreground': props.mutedForegroundColor,
      '--parent-background': props.parentBackground,
      '--general-rounding': props.rounding,
      '--floating-input-layout-text-area-height': props.textareaHeight,
      '--input-padding': props.inputPadding,
      '--input-font-size': props.inputFontSize,
      '--label-font-size': props.labelFontSize,
      '--label-active-font-size': props.labelActiveFontSize,
      '--label-padding': props.labelPadding,
      '--label-active-padding': props.labelActivePadding,
      '--input-height': props.inputHeight,
    }));

    return {
      localValue,
      focused,
      rtlInput,
      hasValue,
      labelDir,
      handleFocus,
      handleBlur,
      styleVars,
    };
  },
});
</script>

<style scoped>
.mobile-form-group {
  position: relative;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 22px;
}
.mobile-form-group:last-child {
  margin-bottom: 0;
}

.mobile-form-input {
  width: 100%;
  height: var(--input-height);
  padding: var(--input-padding);
  font-size: var(--input-font-size);
  font-weight: 400;
  color: var(--foreground);
  background: var(--mobile-form-input-bg);
  border: var(--input-outline-width) solid var(--input-outline);
  border-radius: var(--general-rounding);
  outline: none;
  box-sizing: border-box;
  text-align: left;
  transition: border-color 0.3s, color 0.3s, background 0.3s;
  resize: none;
  line-height: 1.4;
}
.mobile-form-input:focus {
  border-color: var(--input-outline-focus);
}
.mobile-form-input:disabled {
  opacity: 0.5;
  pointer-events: none;
}
.mobile-form-group.rtl .mobile-form-input {
  direction: rtl;
  text-align: right;
}
.mobile-form-group.textarea .mobile-form-input {
  height: var(--floating-input-layout-text-area-height);
  overflow-y: auto;
}
.mobile-form-label {
  position: absolute;
  left: 11px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted-foreground);
  font-size: var(--label-font-size);
  font-weight: 400;
  pointer-events: none;
  background: var(--parent-background);
  padding: var(--label-padding);
  transition: color 0.3s, background 0.3s, font-size 0.3s, top 0.3s,
    left 0.3s, right 0.3s, transform 0.3s;
  z-index: 2;
  max-width: calc(100% - 26px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mobile-form-group.rtl .mobile-form-label {
  right: 12px;
  left: auto;
  text-align: right;
}
/* Default (not active, not has-value) */
.mobile-form-group:not(.active):not(.has-value) .mobile-form-label {
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--label-font-size);
  color: var(--muted-foreground);
  background: var(--parent-background);
  padding: var(--label-padding);
}
/* Active (input focused) */
.mobile-form-group.active .mobile-form-label,
.mobile-form-group .mobile-form-input:focus + .mobile-form-label {
  top: 0;
  left: 12px;
  right: auto;
  font-size: var(--label-active-font-size);
  color: var(--accent-color);
  background: var(--parent-background);
  padding: var(--label-active-padding);
  z-index: 2;
}
.mobile-form-group.rtl.active .mobile-form-label,
.mobile-form-group.rtl .mobile-form-input:focus + .mobile-form-label {
  right: 12px;
  left: auto;
}
/* Has value but not active */
.mobile-form-group.has-value:not(.active) .mobile-form-label {
  top: 0;
  left: 12px;
  right: auto;
  font-size: var(--label-active-font-size);
  color: var(--muted-foreground);
  background: var(--parent-background);
  padding: var(--label-active-padding);
  z-index: 2;
}
.mobile-form-group.rtl.has-value:not(.active) .mobile-form-label {
  right: 12px;
  left: auto;
}
/* Textarea label placement */
.mobile-form-group.textarea .mobile-form-label {
  left: 12px;
  right: auto;
  padding: var(--label-padding);
}
.mobile-form-group.textarea.rtl .mobile-form-label {
  right: 12px;
  left: auto;
}
.mobile-form-group.textarea:not(.active):not(.has-value) .mobile-form-label {
  top: 12px;
  left: 12px;
  right: auto;
  transform: none;
  font-size: var(--label-font-size);
  color: var(--muted-foreground);
  background: var(--parent-background);
  padding: var(--label-padding);
  text-align: left;
}
.mobile-form-group.textarea:not(.active):not(.has-value).rtl .mobile-form-label {
  right: 12px;
  left: auto;
  text-align: right;
}
</style>
` },
    ],
    dependencies: ``,
    credit: `[Input Floating Label animation](https://codepen.io/Mahe76/pen/qBQgXyK) by [Elpeeda](https://codepen.io/Mahe76)`,
    previewType: 'fullwidth',
  },
  {
    name: 'Form Renderer Checkbox',
    route: 'form-renderer-checkbox',
    description: 'A simple, yet elegant checkbox component used by the form renderer.',
    usage: `<template>
  <div class="demo-root">
    <div class="checkbox-row">
      <!-- Default checkbox -->
      <label class="checkbox-label">
        <FormRendererCheckbox v-model:checked="checkedDefault" />
        Default Checkbox
      </label>

      <!-- Custom styled checkbox -->
      <label class="checkbox-label custom-checkbox-label">
        <FormRendererCheckbox
          v-model:checked="checkedCustom"
          :accentColor="'#fff'"
          :highlightForeground="'#0a0a0a'"
          :backgroundColor="'#444'"
          :disabledBackgroundColor="'#161616'"
          :borderColor="'#4776cb'"
          :borderRadius="'0px'"
        />
        Custom Styled Checkbox
      </label>

      <!-- Disabled checkbox -->
      <label class="checkbox-label disabled-label">
        <FormRendererCheckbox v-model:checked="checkedDisabled" disabled />
        Disabled Checkbox
      </label>

      <!-- RTL Hebrew checkbox -->
      <label dir="rtl" class="checkbox-label rtl-label">
        <FormRendererCheckbox v-model:checked="checkedRTL" />
        נמר UI
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormRendererCheckbox from './FormRendererCheckbox.vue';

const checkedDefault = ref(false);
const checkedCustom = ref(false);
const checkedDisabled = ref(false);
const checkedRTL = ref(false);
</script>

<style scoped>
.demo-root {
  padding: 2rem;
  font-family: Arial, sans-serif;
  color: white;
}

.checkbox-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem; /* Slightly reduced font size */
  user-select: text;
}

/* Disabled label text style */
.disabled-label {
  color: #777;
  cursor: not-allowed;
  user-select: none;
}

/* RTL */
.rtl-label {
  direction: rtl;
  font-family: Arial, sans-serif;
}
</style>

// Note: The FormRendererCheckbox component accepts the following props:
// - checked: boolean (required) - Whether the checkbox is checked.
// - accentColor: string (optional) - Background color when checked. Default: "#00a0d8".
// - highlightForeground: string (optional) - Color of the checkmark stroke. Default: "#fff".
// - backgroundColor: string (optional) - Background color when unchecked and enabled. Default: "#2e2e2e".
// - disabledBackgroundColor: string (optional) - Background color when disabled. Default: "#161616".
// - borderColor: string (optional) - Border color of the checkbox. Default: "#363636".
// - borderRadius: string (optional) - Border radius of the checkbox. Default: "6px".
// - id: string (optional) - The id attribute for the checkbox button.
// - disabled: boolean (optional) - Whether the checkbox is disabled. Default: false.
//
// Emits:
// - update:checked: emitted with new boolean checked state when user toggles the checkbox.
//
// Slots:
//   None
`,
    code: [
      { filename: 'FormRendererCheckbox.vue', content: `<template>
  <button
    type="button"
    role="checkbox"
    :aria-checked="checked.toString()"
    :aria-disabled="disabled.toString()"
    :tabindex="0"
    :id="id"
    :disabled="disabled"
    @click="handleClick"
    class="custom-checkbox"
    :style="btnStyle"
  >
    <svg
      v-if="checked"
      key="checkmark"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      :stroke="highlightForeground"
      stroke-width="3"
      fill="none"
      class="checkmark"
      ref="checkmarkRef"
      aria-hidden="true"
      style="display: block; pointer-events: none;"
    >
      <path
        ref="pathRef"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M5 13l4 4L19 7"
        class="checkmark-path"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue';

const props = defineProps<{
  checked: boolean;
  accentColor?: string;
  highlightForeground?: string;
  backgroundColor?: string;
  disabledBackgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  id?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (event: 'update:checked', checked: boolean): void;
}>();

const btnStyle = computed(() => ({
  width: '24px',
  height: '24px',
  background: props.disabled
    ? props.disabledBackgroundColor ?? '#161616' // default card background color
    : props.checked
    ? props.accentColor ?? '#00a0d8' // default theme-color
    : props.backgroundColor ?? '#2e2e2e', // default background-adjacent-color
  border: \`1.5px solid \${props.borderColor ?? '#363636'}\`, // default lightened-background-adjacent-color
  transition: 'background 0.2s, border 0.2s',
  cursor: props.disabled ? 'not-allowed' : 'pointer',
  position: 'relative',
  borderRadius: props.borderRadius ?? '6px',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const highlightForeground = computed(() => props.highlightForeground ?? '#fff');

const pathRef = ref<SVGPathElement | null>(null);
const checkmarkRef = ref<SVGSVGElement | null>(null);

function handleClick(e: Event) {
  e.preventDefault();
  if (props.disabled) return;
  emit('update:checked', !props.checked);
}

watch(
  () => props.checked,
  async (newChecked) => {
    if (newChecked) {
      await nextTick();

      if (!pathRef.value) return;
      const length = pathRef.value.getTotalLength();

      // Initialize stroke for draw animation
      pathRef.value.style.transition = 'none';
      pathRef.value.style.strokeDasharray = \`\${length}\`;
      pathRef.value.style.strokeDashoffset = \`\${length}\`;
      pathRef.value.style.opacity = '1';

      // Force layout reset
      void pathRef.value.getBoundingClientRect();

      // Animate stroke dashoffset to draw
      pathRef.value.style.transition =
        'stroke-dashoffset 0.32s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.32s';
      pathRef.value.style.strokeDashoffset = '0';
    } else if (pathRef.value) {
      // Reset path if unchecked
      pathRef.value.style.strokeDashoffset = '0';
      pathRef.value.style.opacity = '0';
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.custom-checkbox {
  outline: none;
  user-select: none;
}

/* Checkmark path initial state */
.checkmark-path {
  stroke-dasharray: 0;
  stroke-dashoffset: 0;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}
</style>
` },
    ],
    dependencies: ``,
    credit: `[Radix Checkbox](https://21st.dev/animate-ui/radix-checkbox/radix-checkbox-demo) by [Animate UI](https://21st.dev/animate-ui)
[Custom Checkbox](https://21st.dev/Edil-ozi/custom-checkbox) by [Edil Ozi](https://21st.dev/Edil-ozi)
[チェックしないと押せないボタン](https://codepen.io/ash_creator/pen/JjZReNm) by [あしざわ - Webクリエイター](https://codepen.io/ash_creator)`,
    previewType: 'fullwidth',
  },
  {
    name: 'Form Renderer Radio',
    route: 'form-renderer-radio',
    description: 'A simple, yet elegant radio button component used by the form renderer.',
    usage: `<template>
  <div class="demo-root">
    <div class="radio-col">
      <div class="group-section">
        <label class="radio-label">
          <FormRendererRadio
            :checked="groupValue === 1"
            @update:checked="v => { if (v) groupValue = 1 }"
          />
          Group Radio 1
        </label>
        <label class="radio-label">
          <FormRendererRadio
            :checked="groupValue === 2"
            @update:checked="v => { if (v) groupValue = 2 }"
          />
          Group Radio 2
        </label>
        <label class="radio-label">
          <FormRendererRadio
            :checked="groupValue === 3"
            @update:checked="v => { if (v) groupValue = 3 }"
          />
          Group Radio 3
        </label>
      </div>

      <span class="unselectable-label">Unselectable:</span>

      <div class="unselect-section">
        <label class="radio-label">
          <FormRendererRadio
            v-model:checked="valCustom"
            :accentColor="'#fff'"
            :highlightForeground="'#0a0a0a'"
            :backgroundColor="'#444'"
            :borderColor="'#4776cb'"
            :borderRadius="'0px'"
            :allowUnselect="true"
          />
          Custom Styled Radio
        </label>
        <label dir="rtl" class="radio-label rtl-label">
          <FormRendererRadio
            v-model:checked="valHebrew"
            :allowUnselect="true"
          />
          נמר UI
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormRendererRadio from './FormRendererRadio.vue';

const groupValue = ref(1);
const valCustom = ref(false);
const valHebrew = ref(false);
</script>

<style scoped>
.demo-root {
  padding: 2rem;
  font-family: Arial, sans-serif;
  color: white;
}
.radio-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: max-content;
}
.group-section,
.unselect-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.unselectable-label {
  margin-top: 2.25rem;
  margin-bottom: 1rem;
  color: #bbb;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.01em;
}
.radio-label {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  font-size: 0.97rem;
  user-select: text;
}
.rtl-label {
  direction: rtl;
  font-family: Arial, sans-serif;
}
</style>

// Note: The FormRendererRadio component accepts the following props:
// - checked: boolean (required) - Whether the radio is selected.
// - allowUnselect: boolean (optional) - If true, clicking an already-selected radio will unselect it. Default: false.
// - accentColor: string (optional) - Background color when checked. Default: "#00a0d8".
// - highlightForeground: string (optional) - Color of the inner dot when checked. Default: "#fff".
// - backgroundColor: string (optional) - Background color when unchecked. Default: "#2e2e2e".
// - borderColor: string (optional) - Border color of the radio. Default: "#363636".
// - borderRadius: string (optional) - Border radius of the radio. Default: "50%" (fully round).
// - id: string (optional) - The id attribute for the radio button.
//
// Emits:
// - update:checked: emitted with new boolean checked state when the user toggles the radio.
//
// Slots:
//   None
`,
    code: [
      { filename: 'FormRendererRadio.vue', content: `<template>
  <button
    type="button"
    role="radio"
    :aria-checked="checked.toString()"
    :tabindex="0"
    :id="id"
    class="custom-radio"
    :style="btnStyle"
    @click="handleClick"
  >
    <transition name="radio-dot">
      <div
        v-if="checked"
        class="radio-dot"
        :style="{ background: highlightForeground }"
      ></div>
    </transition>
    <span
      aria-hidden="true"
      class="radio-overlay"
      :style="{ cursor: 'pointer' }"
    />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  checked: boolean;
  allowUnselect?: boolean;
  accentColor?: string;
  highlightForeground?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  id?: string;
}>();

const emit = defineEmits<{
  (event: "update:checked", checked: boolean): void;
}>();

const btnStyle = computed(() => ({
  width: '24px',
  height: '24px',
  background: props.checked
    ? props.accentColor ?? '#00a0d8'
    : props.backgroundColor ?? '#2e2e2e',
  border: \`1.5px solid \${props.borderColor ?? '#363636'}\`,
  transition: 'background 0.2s, border 0.2s',
  cursor: 'pointer',
  position: 'relative',
  borderRadius: props.borderRadius ?? '50%',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  outline: 'none',
}));

const highlightForeground = computed(() => props.highlightForeground ?? '#fff');

function handleClick(e: Event) {
  e.preventDefault();
  if (props.allowUnselect) {
    emit('update:checked', !props.checked);
  } else {
    if (!props.checked) emit('update:checked', true);
    // if already checked and allowUnselect is false, do nothing
  }
}
</script>

<style scoped>
.custom-radio {
  outline: none;
  user-select: none;
  position: relative;
  box-sizing: border-box;
}
.radio-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: auto;
  transition: background 0.18s, transform 0.17s;
  box-shadow: 0 0 2px rgba(0,0,0,0.03);
}
.radio-dot-enter-active,
.radio-dot-leave-active {
  transition: opacity 0.21s, transform 0.2s;
}
.radio-dot-enter-from,
.radio-dot-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.radio-dot-enter-to,
.radio-dot-leave-from {
  opacity: 1;
  transform: scale(1);
}
.radio-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 50%;
  z-index: 1;
  pointer-events: none;
}
</style>
` },
    ],
    dependencies: ``,
    credit: `[Radix Checkbox](https://21st.dev/animate-ui/radix-checkbox/radix-checkbox-demo) by [Animate UI](https://21st.dev/animate-ui)
[Custom Checkbox](https://21st.dev/Edil-ozi/custom-checkbox) by [Edil Ozi](https://21st.dev/Edil-ozi)`,
    previewType: 'fullwidth',
  },
  {
    name: 'Form Renderer',
    route: 'form-renderer',
    description: 'A fully-functional form renderer.',
    usage: `<template>
  <div>
    <!-- Original form (dark theme) -->
    <FormRenderer
      :schema="formSchema"
      @submit="handleSubmit"
      :cardBackground="cardBackground"
      :cardOutlineColor="cardOutlineColor"
      :checkRadioOutlineColor="checkRadioOutlineColor"
      :inscriptionLinkForeground="inscriptionLinkForeground"
      :checkRadioBackgroundColor="checkRadioBackgroundColor"
    />
    <hr class="section-divider" />
    <h2 class="submitted-title">Submitted Form Data (Encoded):</h2>
    <pre class="submitted-data-pre">
{{ submittedDataString }}
    </pre>
    <FormResponseRenderer
      v-if="submittedData"
      :schema="formSchema"
      :encodedResponse="submittedData"
    />
    <hr class="section-divider" />

    <!-- New Hebrew form (light theme with purple accent) -->
    <div class="hebrew-form-container">
      <FormRenderer
        :schema="formSchemaHebrew"
        @submit="handleSubmitHebrew"
        titleFontWeight="600"
        cardBackground="#fff"
        cardOutlineColor="#a78bfa"
        checkRadioOutlineColor="#7c3aed"
        inscriptionLinkForeground="#7c3aed"
        checkRadioBackgroundColor="#f3e8ff"
        accentColor="#7c3aed"
        foreground="#000"
        inputOutline="#9ca3af"
        inputFocusOutlineColor="#4c1d95"
        highlightForeground="#fff"
        descriptionForeground="#4b5563"
        labelFloatingInputForeground="#6b7280"
        labelLabelForeground="#374151"
        inscriptionLabelForeground="#374151"
        chronicleButtonBackground="#111014"
        chronicleButtonForeground="#fff"
        submitButtonRounding="50px"
      />
      <h2 class="hebrew-submitted-title">
        נתוני טופס נשלחו (מקודדים):
      </h2>
      <pre class="submitted-data-pre hebrew-pre">
{{ submittedDataHebrewString }}
      </pre>
      <FormResponseRenderer
        v-if="submittedDataHebrew"
        :schema="formSchemaHebrew"
        :encodedResponse="submittedDataHebrew"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import FormRenderer from "./FormRenderer.vue";
import FormResponseRenderer from "./FormResponseRenderer.vue";
import type { FormSchema } from "./FormRendererType";

const cardBackground = "#16151a";
const cardOutlineColor = "#2e2d38";
const checkRadioOutlineColor = "#3a3846";
const inscriptionLinkForeground = "#00a0d8";
const checkRadioBackgroundColor = "#302e3a";

// English form schema with hardcoded keys
const formSchema: FormSchema = {
  meta: {
    title: "Complex Form",
    description:
      "This is a complex, multi-section form containing various sections, from simple, single-element sections to complex heterogeneous sections.",
    labels: [
      {
        label: "Made by",
        type: "hyperlink",
        inscription: "Maxim Bortnikov",
        link: "https://maxim-bortnikov.netlify.app/",
        openIn: "newTab",
      },
      {
        label: "Ported from",
        type: "hyperlink",
        inscription: "Blueberry Loom",
        link: "https://blueberry-loom.netlify.app/",
        openIn: "newTab",
      },
    ],
  },
  sections: [
    {
      elements: [
        { type: "text", text: "Simple section" },
        { type: "input", text: "Email", key: "hQ7" },
        { type: "input", text: "Phone Number", key: "kY4" },
      ],
    },
    {
      elements: [
        { type: "text", text: "Checkbox Example" },
        { type: "text", text: "Select up to 3 items:" },
        {
          type: "checkboxes",
          key: "bX2",
          allowMultiple: true,
          maxSelected: 3,
          options: [
            { text: "Nuxt", value: "A1b" },
            { text: "Vue.js", value: "C7d" },
            { text: "Namer UI", value: "E9f" },
            { text: "Perplexity", value: "G3h" },
          ],
        },
      ],
    },
    {
      elements: [
        { type: "text", text: "Heterogeneous section" },
        {
          type: "checkboxes",
          key: "nF8",
          allowMultiple: true,
          options: [
            { text: "First Checkbox", value: "J5k" },
            { text: "Second Checkbox", value: "L8m" },
            { text: "Third Checkbox", value: "N2p" },
            { text: "Fourth Checkbox", value: "Q4r" },
          ],
        },
        {
          type: "radio",
          key: "zD3",
          options: [
            { text: "First Radio", value: "S7t" },
            { text: "Second Radio", value: "U1v" },
            { text: "Third Radio", value: "W3x" },
          ],
        },
        { type: "text", text: "Some text here" },
        { type: "text", text: "Another text" },
        { type: "text", text: "And one more!" },
        { type: "textarea", text: "Whatever", key: "gT9" },
      ],
    },
    {
      elements: [
        { type: "text", text: "This section has only one element, and the one below it is empty" },
      ],
    },
    { elements: [] },
    {
      elements: [
        { type: "text", text: "Another heterogeneous section" },
        { type: "text", text: "Default radio behavior" },
        {
          type: "radio",
          key: "rK5",
          options: [
            { text: "Rishon", value: "Y9z" },
            { text: "Sheni", value: "B4c" },
            { text: "Shlishi", value: "D6e" },
          ],
        },
        {
          type: "text",
          text: "allowUnselect: true (You can unselect the active radio by clicking on it)",
        },
        {
          type: "radio",
          key: "uV7",
          allowUnselect: true,
          options: [
            { text: "Rishon", value: "H5j" },
            { text: "Sheni", value: "K7m" },
            { text: "Shlishi", value: "M8n" },
          ],
        },
        { type: "textarea", text: "400px-high", key: "sN0", height: 400 },
        { type: "text", text: "Checkbox group can have allowMultiple: false" },
        {
          type: "checkboxes",
          key: "wC1",
          allowMultiple: false,
          options: [
            { text: "One", value: "R1s" },
            { text: "Two", value: "T9u" },
            { text: "Three", value: "V2w" },
          ],
        },
        { type: "text", text: "The text can even be placed at the end of the section." },
      ],
    },
  ],
};

const submittedData = ref<string | null>(null);
const submittedDataString = computed(() => submittedData.value ?? "(No data submitted yet)");

function handleSubmit(encodedString: string) {
  submittedData.value = encodedString;
  console.log("Form submitted:", encodedString);
}

// Hebrew form schema with fixed keys
const formSchemaHebrew: FormSchema = {
  meta: {
    title: "טופס מורכב (עברית)",
    description: "טופס רב-חלקי הכולל מגוון שדות, כולל תמיכה בכתיבה מימין לשמאל.",
    labels: [
      {
        label: "נוצר על ידי",
        type: "hyperlink",
        inscription: "מקסים בורטניקוב",
        link: "https://maxim-bortnikov.netlify.app/",
        openIn: "newTab",
      },
      {
        label: "פורטי מהמקור",
        type: "hyperlink",
        inscription: "Blueberry Loom",
        link: "https://blueberry-loom.netlify.app/",
        openIn: "newTab",
      },
    ],
  },
  sections: [
    {
      elements: [
        { type: "text", text: "סעיף פשוט" },
        { type: "input", text: "אימייל", key: "hR7" },
        { type: "input", text: "מספר טלפון", key: "kZ4" },
      ],
    },
    {
      elements: [
        { type: "text", text: "דוגמת תיבות סימון" },
        { type: "text", text: "בחר עד 3 פריטים:" },
        {
          type: "checkboxes",
          key: "bY2",
          allowMultiple: true,
          maxSelected: 3,
          options: [
            { text: "נוקסט", value: "A9b" },
            { text: "ויו.js", value: "E8f" },
            { text: "נמר UI", value: "C5d" },
            { text: "פרפלקסיטי", value: "G2h" },
          ],
        },
      ],
    },
    {
      elements: [
        { type: "text", text: "סעיף הטרוגני" },
        {
          type: "checkboxes",
          key: "nF7",
          allowMultiple: true,
          options: [
            { text: "תיבת סימון ראשונה", value: "J3k" },
            { text: "תיבת סימון שנייה", value: "L1m" },
            { text: "תיבת סימון שלישית", value: "N5p" },
            { text: "תיבת סימון רביעית", value: "Q8r" },
          ],
        },
        {
          type: "radio",
          key: "zV3",
          options: [
            { text: "אפשרות ראשונה", value: "S2t" },
            { text: "אפשרות שנייה", value: "U9v" },
            { text: "אפשרות שלישית", value: "W0x" },
          ],
        },
        { type: "text", text: "כמה טקסט כאן" },
        { type: "text", text: "עוד טקסט" },
        { type: "text", text: "ועוד אחד!" },
        { type: "textarea", text: "כל מה שתרצה", key: "gM9" },
      ],
    },
    {
      elements: [
        { type: "text", text: "סעיף עם אלמנט יחיד, והתחתון ריק" },
      ],
    },
    { elements: [] },
    {
      elements: [
        { type: "text", text: "סעיף הטרוגני נוסף" },
        { type: "text", text: "התנהגות ברירת מחדל של רדיו" },
        {
          type: "radio",
          key: "rW6",
          options: [
            { text: "ראשון", value: "Y8z" },
            { text: "שני", value: "B7c" },
            { text: "שלישי", value: "D4e" },
          ],
        },
        {
          type: "text",
          text: "allowUnselect: true (אפשר לבטל את הבחירה ברדיו על ידי לחיצה)",
        },
        {
          type: "radio",
          key: "uV2",
          allowUnselect: true,
          options: [
            { text: "ראשון", value: "H1j" },
            { text: "שני", value: "K5m" },
            { text: "שלישי", value: "M3n" },
          ],
        },
        { type: "textarea", text: "גובה 400 פיקסלים", key: "sF0", height: 400 },
        { type: "text", text: "קבוצת תיבות סימון עם allowMultiple: false" },
        {
          type: "checkboxes",
          key: "wA3",
          allowMultiple: false,
          options: [
            { text: "אחד", value: "R2s" },
            { text: "שניים", value: "T0u" },
            { text: "שלושה", value: "V1w" },
          ],
        },
        { type: "text", text: "הטקסט יכול להיות גם בסוף הסעיף." },
      ],
    },
  ],
};

const submittedDataHebrew = ref<string | null>(null);
const submittedDataHebrewString = computed(() => submittedDataHebrew.value ?? "(אין נתונים שנשלחו עדיין)");

function handleSubmitHebrew(encodedString: string) {
  submittedDataHebrew.value = encodedString;
  console.log("Hebrew form submitted:", encodedString);
}
</script>

<style scoped>
.section-divider {
  margin: 3rem 0;
  border-color: #555;
}

.submitted-title {
  color: #eee;
  margin: 0 0 1rem 0;
  font-weight: 600;
  font-size: 1.25rem;
}

.submitted-data-pre {
  background: #222;
  color: #eee;
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  overflow-wrap: break-word;
  word-break: break-all;
  font-size: 0.875rem;
  white-space: pre-wrap;
  user-select: text;
  margin: 0 0 2rem 0;
  font-family: monospace, monospace;
  line-height: 1.3;
}

.hebrew-form-container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  border: 1.5px solid #ccc;
  max-width: 800px;
  margin: 0 auto 3rem auto;
}

.hebrew-submitted-title {
  color: #111;
  margin: 2rem 0 1rem 0;
  font-weight: 600;
  direction: rtl;
  text-align: right;
  font-size: 1.3rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.submitted-data-pre.hebrew-pre {
  background: #f9fafb;
  color: #111;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  overflow-wrap: break-word;
  word-break: break-all;
  font-size: 0.875rem;
  white-space: pre-wrap;
  user-select: text;
  margin: 0 0 2rem 0;
  font-family: monospace, monospace;
  line-height: 1.3;
}
</style>

// Note: The FormRenderer component accepts the following props:
// - schema: FormSchema (required) - The JSON object defining the entire form with meta (title, description, labels) and sections containing elements (input, textarea, checkboxes, radios, text).
// - accentColor: string (optional) - Accent color for interactive highlights (floating labels, checkboxes, radios, submit button hover). Defaults to schema.meta.accentColor or '#00a0d8'.
// - highlightForeground: string (optional) - Foreground color for highlighted elements like checked checkboxes or selected radios. Defaults to '#fff'.
// - cardBackground: string (optional) - Background color of form cards including header and sections. Defaults '#2e2e2e'.
// - cardOutlineColor: string (optional) - Border color for form cards. Defaults '#363636'.
// - checkRadioOutlineColor: string (optional) - Outline color for checkbox and radio inputs. Defaults '#909090'.
// - checkRadioBackgroundColor: string (optional) - Background color behind checkboxes and radios. Defaults to cardBackground color.
// - checkRadioTextColor: string (optional) - Text color for checkbox and radio labels. Defaults to foreground color '#fff'.
// - labelFloatingInputForeground: string (optional) - Foreground color of floating label input text when inactive. Defaults '#aaa'.
// - labelLabelForeground: string (optional) - Color for label text in meta-label inscriptions. Defaults '#aaa'.
// - inscriptionLabelForeground: string (optional) - Foreground color for inscription non-link text in meta labels. Defaults '#aaa'.
// - inscriptionLinkForeground: string (optional) - Foreground color for inscription hyperlink text in meta labels. Defaults '#fff'.
// - descriptionForeground: string (optional) - Color of the description text below the form title. Defaults '#aaa'.
// - foreground: string (optional) - General text color used throughout the form. Defaults '#fff'.
// - inputOutline: string (optional) - Outline color for input and textarea fields. Defaults '#909090'.
// - inputFocusOutlineColor: string (optional) - Outline color applied to inputs when focused. Defaults '#fff'.
// - chronicleButtonBackground: string (optional) - Background color for the submit button. Defaults '#ffffff'.
// - chronicleButtonForeground: string (optional) - Text color for the submit button. Defaults '#0a0a0a'.
// - generalRounding: string (optional) - Border-radius applied globally to cards, inputs, and controls. Defaults '8px'.
// - checkboxRounding: string (optional) - Border-radius for checkboxes. Defaults '6px'.
// - radioRounding: string (optional) - Border-radius for radio buttons (typically circular). Defaults '50%'.
// - inputPadding: string (optional) - Padding inside input fields.
// - inputFontSize: string (optional) - Font size applied to input text.
// - labelFontSize: string (optional) - Font size of the floating label text.
// - labelActiveFontSize: string (optional) - Font size of the floating label when active.
// - floatingLabelInputInactiveLabelPadding: string (optional) - Padding for inactive floating label state.
// - labelActivePadding: string (optional) - Padding for active floating label state.
// - inputHeight: string (optional) - Height of input fields.
// - defaultTextareaHeight: string (optional) - Default height applied to textareas without a specific height set in the schema.
// - cardGap: string (optional) - Vertical gap between form cards.
// - cardPadding: string (optional) - Padding inside form cards.
// - sectionTextSize: string (optional) - Font size for text elements inside form sections.
// - elementTextSize: string (optional) - Font size for checkbox and radio label text.
// - submitButtonRounding: string (optional) - Border-radius for the submit button.
// - descriptionMarginBottom: string (optional) - Bottom margin for description text.
// - titleMarginTop: string (optional) - Top margin for form title.
// - titleMarginBottom: string (optional) - Bottom margin for form title.
// - buttonMarginTop: string (optional) - Top margin above the submit button.
// - labelInscriptionGap: string (optional) - Gap between label-inscription pairs in meta labels.
// - labelTextStyle: CSSProperties (optional) - Additional CSS styles applied to label text in meta labels.
// - inscriptionTextStyle: CSSProperties (optional) - Additional CSS styles applied to inscription text in meta labels.
// - submitButtonText: string (optional) - Text displayed on the submit button. Defaults 'Submit'.
// - titleFontWeight: string | number (optional) - Font weight used for the form title text. Defaults 900.
//
// Emits:
// - submit (string) - Emitted on form submission carrying the encoded, serialized response.
//
// Slots: None.
//
// Usage notes:
// - Renders a fully-functional form including title, description, label-inscriptions, and multiple sectional elements (text, inputs, textareas, checkboxes, and radios).
// - Supports theming and styling for colors, fonts, spacing, border-radius, and input appearance via extensive optional props.
// - Handles input and textarea floating labels with customizable paddings and font sizes.
// - Checkbox and radio groups support multiple selection constraints and unselection based on schema config (allowMultiple, maxSelected, allowUnselect).
// - Detects right-to-left language text direction automatically for all relevant text elements.
`,
    code: [
      { filename: 'FormRenderer.vue', content: `<template>
  <form @submit.prevent="handleSubmit" autocomplete="on" :style="formStyle" novalidate>
    <!-- Title / Description Card -->
    <div :style="cardStyle" class="form-header-card">
      <h1 :style="computedTitleStyle" class="font-bold">
        {{ schema.meta.title }}
      </h1>
      <!-- Description is plain text -->
      <p
        v-if="schema.meta.description"
        :style="computedDescStyle"
        class="form-description"
      >
        {{ schema.meta.description }}
      </p>
      <!-- Labels / Inscriptions -->
      <div
        v-if="schema.meta.labels && schema.meta.labels.length > 0"
        :style="labelInscriptionsContainerStyle"
        class="meta-label-inscriptions"
      >
        <div
          v-for="(li, idx) in schema.meta.labels"
          :key="\`label-inscription-\${idx}\`"
          :dir="detectLabelDir(li.label)"
          class="label-inscription-pair"
          :style="labelInscriptionPairStyle"
        >
          <!-- Label, with colon and space -->
          <span
            class="label-text"
            :style="[{ fontWeight: 700, color: labelLabelForegroundColor }, labelTextStyle]"
          >
            {{ li.label }}:
          </span>
          <!-- Inscription -->
          <template v-if="li.type === 'hyperlink'">
            <a
              :href="li.link"
              :target="li.openIn === 'newTab' ? '_blank' : '_self'"
              rel="noopener"
              class="inscription-link-wrapper"
              @click.prevent.stop="onInscriptionLinkClick(li.link, li.openIn)"
              @keydown.enter.prevent.stop="onInscriptionLinkClick(li.link, li.openIn)"
              @keydown.space.prevent.stop="onInscriptionLinkClick(li.link, li.openIn)"
              :title="li.link"
              tabindex="0"
              :style="{ textDecoration: 'none', cursor: 'pointer', display: 'inline' }"
            >
              <span
                :style="{ color: inscriptionLinkForegroundColor, textDecoration: 'underline', userSelect: 'text', display: 'inline' }"
                role="link"
              >
                {{ li.inscription }}
              </span>
            </a>
          </template>
          <span
            v-else
            class="inscription-text"
            :style="{ color: inscriptionLabelForegroundColor }"
          >
            {{ li.inscription }}
          </span>
        </div>
      </div>
    </div>
    <!-- Sections -->
    <div
      v-for="(section, sidx) in schema.sections"
      :key="sidx"
      :style="cardStyle"
      class="form-section-card"
    >
      <template v-for="(el, eidx) in section.elements" :key="getElementKey(el, eidx)">
        <!-- Text element -->
        <div
          v-if="el.type === 'text'"
          class="form-text"
          :style="getTextElementStyle(el.text, eidx, section.elements)"
          :dir="isRTL(el.text) ? 'rtl' : 'ltr'"
        >
          {{ el.text }}
        </div>
        <!-- Input -->
        <div
          v-else-if="el.type === 'input'"
          :style="{ marginTop: eidx > 0 ? GAP_BETWEEN_ELEMENTS + 'px' : undefined }"
        >
          <FloatingLabelInput
            v-model="formData[el.key]"
            :label="el.text"
            :accentColor="themeColors.accentColor"
            :parentBackground="themeColors.cardBackground"
            :inputOutlineColor="themeColors.inputOutline"
            :inputFocusOutlineColor="inputFocusOutlineColorProp"
            :foregroundColor="themeColors.foreground"
            :mutedForegroundColor="labelFloatingInputForegroundColor"
            :rounding="rounding.generalRounding"
            :inputPadding="inputPadding"
            :inputFontSize="inputFontSize"
            :labelFontSize="labelFontSize"
            :labelActiveFontSize="labelActiveFontSize"
            :labelPadding="floatingLabelInputInactiveLabelPadding"
            :labelActivePadding="labelActivePadding"
            :inputHeight="inputHeight"
            :disabled="false"
            :textarea="false"
            :isRTL="isRTL(el.text)"
          />
        </div>
        <!-- Textarea -->
        <div
          v-else-if="el.type === 'textarea'"
          :style="{ marginTop: eidx > 0 ? GAP_BETWEEN_ELEMENTS + 'px' : undefined }"
        >
          <FloatingLabelInput
            v-model="formData[el.key]"
            :label="el.text"
            :accentColor="themeColors.accentColor"
            :parentBackground="themeColors.cardBackground"
            :inputOutlineColor="themeColors.inputOutline"
            :inputFocusOutlineColor="inputFocusOutlineColorProp"
            :foregroundColor="themeColors.foreground"
            :mutedForegroundColor="labelFloatingInputForegroundColor"
            :rounding="rounding.generalRounding"
            :inputPadding="inputPadding"
            :inputFontSize="inputFontSize"
            :labelFontSize="labelFontSize"
            :labelActiveFontSize="labelActiveFontSize"
            :labelPadding="floatingLabelInputInactiveLabelPadding"
            :labelActivePadding="labelActivePadding"
            :inputHeight="inputHeight"
            :textarea="true"
            :textareaHeight="el.height ? \`\${el.height}px\` : defaultTextareaHeight"
            :disabled="false"
            :isRTL="isRTL(el.text)"
          />
        </div>
        <!-- Checkboxes -->
        <div
          v-else-if="el.type === 'checkboxes'"
          :style="{ marginTop: eidx > 0 ? GAP_BETWEEN_ELEMENTS + 'px' : undefined }"
        >
          <fieldset class="form-checkbox-group" role="group">
            <div class="checkbox-options">
              <label
                v-for="option in el.options"
                :key="option.value"
                :for="\`checkbox-\${el.key}-\${option.value}\`"
                class="clickable-label"
                :class="{ 'disabled-label': isCheckboxDisabled(el.key, option.value, el.maxSelected) }"
                :dir="isRTL(option.text) ? 'rtl' : 'ltr'"
                tabindex="0"
                @keydown.enter.prevent.stop="toggleCheckbox(el.key, option.value, el)"
                @keydown.space.prevent.stop="toggleCheckbox(el.key, option.value, el)"
                :aria-disabled="isCheckboxDisabled(el.key, option.value, el.maxSelected) ? 'true' : 'false'"
                :style="getCheckboxLabelStyle(option.text, el, option.value)"
              >
                <template v-if="isRTL(option.text)">
                  <span>{{ option.text }}</span>
                  <div class="control-wrapper">
                    <FormRendererCheckbox
                      :id="\`checkbox-\${el.key}-\${option.value}\`"
                      :checked="isCheckboxChecked(el.key, option.value)"
                      @update:checked="(checked) => onCheckboxChange(el.key, option.value, checked, el)"
                      :accentColor="themeColors.accentColor"
                      :highlightForeground="themeColors.highlightForeground"
                      :backgroundColor="checkRadioBackgroundColor"
                      :inputOutlineColor="checkRadioOutlineColor"
                      :disabled="isCheckboxDisabled(el.key, option.value, el.maxSelected)"
                      :borderColor="checkRadioOutlineColor"
                      :borderRadius="checkboxRounding"
                      :aria-disabled="isCheckboxDisabled(el.key, option.value, el.maxSelected)"
                    />
                  </div>
                </template>
                <template v-else>
                  <div class="control-wrapper">
                    <FormRendererCheckbox
                      :id="\`checkbox-\${el.key}-\${option.value}\`"
                      :checked="isCheckboxChecked(el.key, option.value)"
                      @update:checked="(checked) => onCheckboxChange(el.key, option.value, checked, el)"
                      :accentColor="themeColors.accentColor"
                      :highlightForeground="themeColors.highlightForeground"
                      :backgroundColor="checkRadioBackgroundColor"
                      :inputOutlineColor="checkRadioOutlineColor"
                      :disabled="isCheckboxDisabled(el.key, option.value, el.maxSelected)"
                      :borderColor="checkRadioOutlineColor"
                      :borderRadius="checkboxRounding"
                      :aria-disabled="isCheckboxDisabled(el.key, option.value, el.maxSelected)"
                    />
                  </div>
                  <span>{{ option.text }}</span>
                </template>
                <span
                  class="click-overlay"
                  :class="{ 'disabled-overlay': isCheckboxDisabled(el.key, option.value, el.maxSelected) }"
                  @click.stop.prevent="handleOverlayClick(el.key, option.value, el)"
                  :style="getOverlayStyle(el.key, el, option.value)"
                />
              </label>
            </div>
          </fieldset>
        </div>
        <!-- Radio Buttons -->
        <div
          v-else-if="el.type === 'radio'"
          :style="{ marginTop: eidx > 0 ? GAP_BETWEEN_ELEMENTS + 'px' : undefined }"
        >
          <fieldset class="form-radio-group" role="radiogroup">
            <div class="radio-options">
              <label
                v-for="option in el.options"
                :key="option.value"
                :for="\`radio-\${el.key}-\${option.value}\`"
                class="clickable-label"
                :class="{ 'disabled-label': false }"
                :dir="isRTL(option.text) ? 'rtl' : 'ltr'"
                tabindex="0"
                @keydown.enter.prevent.stop="toggleRadio(el.key, option.value, el)"
                @keydown.space.prevent.stop="toggleRadio(el.key, option.value, el)"
                :style="getRadioLabelStyle(option.text)"
              >
                <template v-if="isRTL(option.text)">
                  <span>{{ option.text }}</span>
                  <div class="control-wrapper">
                    <FormRendererRadio
                      :id="\`radio-\${el.key}-\${option.value}\`"
                      :checked="formData[el.key] === option.value"
                      @update:checked="(checked) => onRadioChange(el.key, option.value, checked, el.allowUnselect)"
                      :allowUnselect="el.allowUnselect ?? false"
                      :accentColor="themeColors.accentColor"
                      :highlightForeground="themeColors.highlightForeground"
                      :backgroundColor="checkRadioBackgroundColor"
                      :inputOutlineColor="checkRadioOutlineColor"
                      :borderColor="checkRadioOutlineColor"
                      :borderRadius="radioRounding"
                    />
                  </div>
                </template>
                <template v-else>
                  <div class="control-wrapper">
                    <FormRendererRadio
                      :id="\`radio-\${el.key}-\${option.value}\`"
                      :checked="formData[el.key] === option.value"
                      @update:checked="(checked) => onRadioChange(el.key, option.value, checked, el.allowUnselect)"
                      :allowUnselect="el.allowUnselect ?? false"
                      :accentColor="themeColors.accentColor"
                      :highlightForeground="themeColors.highlightForeground"
                      :backgroundColor="checkRadioBackgroundColor"
                      :inputOutlineColor="checkRadioOutlineColor"
                      :borderColor="checkRadioOutlineColor"
                      :borderRadius="radioRounding"
                    />
                  </div>
                  <span>{{ option.text }}</span>
                </template>
              </label>
            </div>
          </fieldset>
        </div>
      </template>
    </div>
    <!-- Submit Button -->
    <footer class="form-footer" :style="formFooterStyle">
      <ChronicleButton
        type="submit"
        :text="submitButtonText"
        :customBackground="chronicleButtonBackground"
        :customForeground="chronicleButtonForeground"
        :borderRadius="submitButtonRounding"
        :hoverBackground="themeColors.accentColor"
        :hoverColor="themeColors.highlightForeground"
        width="100%"
      />
    </footer>
  </form>
</template>

<script lang="ts" setup>
import { reactive, computed, defineProps, defineEmits } from 'vue';
import FloatingLabelInput from '~/components/namer-ui/floating-label-input/FloatingLabelInput.vue';
import FormRendererCheckbox from '~/components/namer-ui/form-renderer-checkbox/FormRendererCheckbox.vue';
import FormRendererRadio from '~/components/namer-ui/form-renderer-radio/FormRendererRadio.vue';
import ChronicleButton from '~/components/namer-ui/chronicle-button/ChronicleButton.vue';
import type { FormSchema, SectionElement } from './FormRendererType';
import type { CSSProperties } from 'vue';

const GAP_BETWEEN_ELEMENTS = 22;
const RTL_REGEX = /[\\u0591-\\u07FF\\uFB1D-\\uFDFD\\uFE70-\\uFEFC]/;

function isRTL(text?: string): boolean {
  return !!text && RTL_REGEX.test(text);
}

function detectRTL(text: string): boolean {
  return RTL_REGEX.test(text);
}

function detectLabelDir(text: string): 'rtl' | 'ltr' {
  return detectRTL(text) ? 'rtl' : 'ltr';
}

const props = defineProps<{
  schema: FormSchema;
  accentColor?: string;
  highlightForeground?: string;
  cardBackground?: string;
  cardOutlineColor?: string;
  checkRadioOutlineColor?: string;
  labelFloatingInputForeground?: string;
  labelLabelForeground?: string;
  inscriptionLabelForeground?: string;
  inscriptionLinkForeground?: string;
  descriptionForeground?: string;
  foreground?: string;
  inputOutline?: string;
  inputFocusOutlineColor?: string;
  generalRounding?: string;
  inputPadding?: string;
  inputFontSize?: string;
  labelFontSize?: string;
  labelActiveFontSize?: string;
  floatingLabelInputInactiveLabelPadding?: string;
  labelActivePadding?: string;
  inputHeight?: string;
  defaultTextareaHeight?: string;
  cardGap?: string;
  cardPadding?: string;
  sectionTextSize?: string;
  elementTextSize?: string;
  checkboxRounding?: string;
  radioRounding?: string;
  checkRadioBackgroundColor?: string;
  checkRadioTextColor?: string;
  chronicleButtonBackground?: string;
  chronicleButtonForeground?: string;
  submitButtonRounding?: string;
  descriptionMarginBottom?: string;
  titleMarginTop?: string;
  titleMarginBottom?: string;
  labelTextStyle?: CSSProperties;
  inscriptionTextStyle?: CSSProperties;
  buttonMarginTop?: string;
  labelInscriptionGap?: string;
  submitButtonText?: string;
  titleFontWeight?: string | number;
}>();

const emit = defineEmits<{ (event: 'submit', data: string): void }>();

const defaultColors = {
  accentColor: '#00a0d8',
  highlightForeground: '#fff',
  background: '#0a0a0a',
  cardBackground: '#2e2e2e',
  cardOutline: '#363636',
  checkRadioOutline: '#909090',
  descriptionForeground: '#aaa',
  labelFloatingInputForeground: '#aaa',
  labelLabelForeground: '#aaa',
  inscriptionLabelForeground: '#aaa',
  inscriptionLinkForeground: '#fff',
  foreground: '#fff',
  inputOutline: '#909090',
  chronicleButtonBgDefault: '#ffffff',
  chronicleButtonFgDefault: '#0a0a0a',
};

const defaultRounding = {
  generalRounding: '8px',
  checkboxRounding: '6px',
  radioRounding: '50%',
};

const themeColors = {
  accentColor: props.accentColor ?? props.schema.meta.accentColor ?? defaultColors.accentColor,
  highlightForeground:
    props.highlightForeground ?? props.schema.meta.highlightForeground ?? defaultColors.highlightForeground,
  cardBackground: props.cardBackground ?? defaultColors.cardBackground,
  cardOutlineColor: props.cardOutlineColor ?? defaultColors.cardOutline,
  checkRadioOutlineColor: props.checkRadioOutlineColor ?? defaultColors.checkRadioOutline,
  descriptionForeground: props.descriptionForeground ?? defaultColors.descriptionForeground,
  foreground: props.foreground ?? defaultColors.foreground,
  inputOutline: props.inputOutline ?? defaultColors.inputOutline,
  labelFloatingInputForeground: props.labelFloatingInputForeground ?? defaultColors.labelFloatingInputForeground,
  labelLabelForeground: props.labelLabelForeground ?? defaultColors.labelLabelForeground,
  inscriptionLabelForeground: props.inscriptionLabelForeground ?? defaultColors.inscriptionLabelForeground,
  inscriptionLinkForeground: props.inscriptionLinkForeground ?? defaultColors.inscriptionLinkForeground,
};

// Use the new prop if provided else default to #fff
const inputFocusOutlineColorProp = props.inputFocusOutlineColor ?? '#fff';

const chronicleButtonBackground = props.chronicleButtonBackground ?? defaultColors.chronicleButtonBgDefault;
const chronicleButtonForeground = props.chronicleButtonForeground ?? defaultColors.chronicleButtonFgDefault;

const rounding = {
  generalRounding: props.generalRounding ?? defaultRounding.generalRounding,
};
const checkboxRounding = props.checkboxRounding ?? defaultRounding.checkboxRounding;
const radioRounding = props.radioRounding ?? defaultRounding.radioRounding;

const checkRadioBackgroundColor = props.checkRadioBackgroundColor ?? themeColors.cardBackground;
const checkRadioOutlineColor = themeColors.checkRadioOutlineColor;
const cardOutlineColor = themeColors.cardOutlineColor;

const labelFloatingInputForegroundColor = themeColors.labelFloatingInputForeground;
const labelLabelForegroundColor = themeColors.labelLabelForeground;
const inscriptionLabelForegroundColor = themeColors.inscriptionLabelForeground;
const inscriptionLinkForegroundColor = themeColors.inscriptionLinkForeground;

const checkRadioTextColorComputed = computed(() => props.checkRadioTextColor ?? themeColors.foreground);

const formData = reactive<Record<string, any>>({});

function isKeyedElement(el: SectionElement): el is Extract<SectionElement, { key: string }> {
  return 'key' in el && typeof el.key === 'string';
}

// Initialize formData
for (const section of props.schema.sections) {
  for (const el of section.elements) {
    if (isKeyedElement(el)) {
      if (el.type === 'checkboxes') formData[el.key] = [];
      else if (el.type === 'radio') formData[el.key] = '';
      else if (el.type === 'input' || el.type === 'textarea') formData[el.key] = '';
    }
  }
}

function getElementKey(el: SectionElement, fallback: number) {
  return isKeyedElement(el) ? el.key : \`el-\${fallback}\`;
}

function isCheckboxChecked(key: string, value: string): boolean {
  return (formData[key] as string[] | undefined)?.includes(value) ?? false;
}

function isCheckboxDisabled(key: string, value: string, maxSelected?: number): boolean {
  if (!maxSelected) return false;
  const selected = formData[key] as string[] | undefined;
  return selected ? selected.length >= maxSelected && !selected.includes(value) : false;
}

function onCheckboxChange(key: string, value: string, checked: boolean, element: any) {
  const selected = formData[key] as string[] | undefined;
  if (!selected) return;
  if (element.allowMultiple === false) {
    if (checked) {
      if (selected.includes(value)) {
        formData[key] = [];
      } else {
        formData[key] = [value];
      }
    } else {
      const idx = selected.indexOf(value);
      if (idx >= 0) selected.splice(idx, 1);
    }
  } else {
    if (checked) {
      if (element.maxSelected && selected.length >= element.maxSelected && !selected.includes(value)) return;
      if (!selected.includes(value)) selected.push(value);
    } else {
      const idx = selected.indexOf(value);
      if (idx >= 0) selected.splice(idx, 1);
    }
  }
}

function toggleCheckbox(key: string, value: string, element: any, checked?: boolean) {
  if (!formData[key]) formData[key] = [];
  const vals = [...formData[key]];
  const hasValue = vals.includes(value);
  const allowMultiple = element.allowMultiple ?? false;
  const maxSelected = element.maxSelected || 0;
  const atMax = allowMultiple && maxSelected > 0 && vals.length >= maxSelected;
  if (allowMultiple === false) {
    if (checked !== undefined) {
      if (checked) {
        if (!hasValue) {
          formData[key] = [value];
        } else {
          formData[key] = [];
        }
      } else {
        const idx = vals.indexOf(value);
        if (idx !== -1) vals.splice(idx, 1);
        formData[key] = vals;
      }
    } else {
      if (hasValue) {
        formData[key] = [];
      } else {
        formData[key] = [value];
      }
    }
  } else {
    if (checked !== undefined) {
      if (checked && !hasValue && (!atMax || vals.length < maxSelected)) {
        vals.push(value);
      } else if (!checked && hasValue) {
        const idx = vals.indexOf(value);
        if (idx !== -1) vals.splice(idx, 1);
      }
      formData[key] = vals;
    } else {
      if (hasValue) {
        const idx = vals.indexOf(value);
        if (idx !== -1) vals.splice(idx, 1);
      } else if (!atMax || vals.length < maxSelected) {
        vals.push(value);
      }
      formData[key] = vals;
    }
  }
}

function isInactive(key: string, element: any, value: string): boolean {
  const vals = formData[key] || [];
  if (!element.allowMultiple || element.maxSelected <= 0) return false;
  if (vals.includes(value)) return false;
  return vals.length >= element.maxSelected;
}

function handleOverlayClick(key: string, value: string, element: any): void {
  if (isInactive(key, element, value)) return;
  toggleCheckbox(key, value, element);
}

function onRadioChange(key: string, value: string, checked: boolean, allowUnselect?: boolean) {
  if (checked) formData[key] = value;
  else if (allowUnselect && formData[key] === value) formData[key] = '';
}

function toggleRadio(key: string, value: string, element: any, checked?: boolean) {
  if (checked !== undefined) {
    if (checked) formData[key] = value;
    else formData[key] = undefined;
  } else {
    if (formData[key] === value && (element.allowUnselect ?? true)) formData[key] = undefined;
    else formData[key] = value;
  }
}

function handleSubmit() {
  const encode = (str: string) => btoa(unescape(encodeURIComponent(str)));
  const result = props.schema.sections
    .map((section) => {
      return (
        '[' +
        section.elements
          .map((el) => {
            if (el.type === 'text') return '';
            if (isKeyedElement(el)) {
              if (el.type === 'input' || el.type === 'textarea') {
                // FIXED: Use el.key for encoding not el.text
                const val = formData[el.key];
                return '[' + encode(el.key) + ':' + (val && val !== '' ? encode(val) : 'n') + ']';
              }
              if (el.type === 'checkboxes') {
                const vals: string[] = formData[el.key] || [];
                return '[' + encode(el.key) + ':' + (vals.length ? vals.map((v) => encode(v)).join(',') : 'n') + ']';
              }
              if (el.type === 'radio') {
                const val: string | undefined = formData[el.key];
                return '[' + encode(el.key) + ':' + (val ? encode(val) : 'n') + ']';
              }
            }
            return '';
          })
          .join('') +
        ']'
      );
    })
    .join('');
  emit('submit', result);
}

// Open link programmatically for inscription hyperlink span
function onInscriptionLinkClick(link: string, openIn: 'newTab' | 'sameTab' = 'newTab') {
  if (!link) return;
  if (openIn === 'newTab') {
    window.open(link, '_blank', 'noopener');
  } else {
    window.open(link, '_self');
  }
}

// Styles and helpers same as before (omitted here for brevity)...

function getTextElementStyle(text: string, index: number, elements: any[]): CSSProperties {
  const isSingleTextSection = elements.length === 1 && elements[0].type === 'text';
  const textRTL = isRTL(text);
  const isFirst = index === 0;
  const next = elements[index + 1];
  const prev = elements[index - 1];
  const isNextNonText = next !== undefined && next.type !== 'text';
  const isPrevText = prev?.type === 'text';
  const isPrevNonText = prev !== undefined && prev.type !== 'text';

  const style: CSSProperties = {
    color: themeColors.foreground,
    fontSize: props.sectionTextSize ?? '16px',
    textAlign: textRTL ? 'right' : 'left',
    direction: textRTL ? 'rtl' : 'ltr',
    margin: 0,
  };
  if (isSingleTextSection) {
    style.fontWeight = '600';
    return style;
  }
  if (isFirst) {
    style.fontWeight = '600';
    style.marginTop = '0';
    style.marginBottom = isNextNonText ? '9px' : \`\${GAP_BETWEEN_ELEMENTS}px\`;
    return style;
  }
  if (isPrevText || isPrevNonText) {
    style.fontWeight = '400';
    style.marginTop = \`\${GAP_BETWEEN_ELEMENTS}px\`;
    return style;
  }
  style.fontWeight = '400';
  return style;
}

function getCheckboxLabelStyle(text: string, el: any, value: string): CSSProperties {
  const textRTL = isRTL(text);
  const inactive = isCheckboxDisabled(el.key, value, el.maxSelected);
  return {
    fontSize: props.elementTextSize ?? '15px',
    userSelect: 'none',
    opacity: inactive ? 0.6 : 1,
    cursor: inactive ? 'not-allowed' : 'pointer',
    color: checkRadioTextColorComputed.value,
    display: 'flex',
    flexDirection: textRTL ? 'row-reverse' : 'row',
    textAlign: textRTL ? 'right' : 'left',
    width: '100%',
    justifyContent: textRTL ? 'flex-end' : 'flex-start',
    gap: '8px',
    alignItems: 'center',
    position: 'relative',
  };
}

function getRadioLabelStyle(text: string): CSSProperties {
  const textRTL = isRTL(text);
  return {
    fontSize: props.elementTextSize ?? '15px',
    userSelect: 'none',
    color: checkRadioTextColorComputed.value,
    display: 'flex',
    flexDirection: textRTL ? 'row-reverse' : 'row',
    textAlign: textRTL ? 'right' : 'left',
    width: '100%',
    justifyContent: textRTL ? 'flex-end' : 'flex-start',
    gap: '8px',
    cursor: 'pointer',
    alignItems: 'center',
  };
}

function getOverlayStyle(key: string, element: any, value: string): CSSProperties {
  if (isCheckboxDisabled(key, value, element.maxSelected)) {
    return {
      pointerEvents: 'auto',
      cursor: 'not-allowed',
    };
  }
  return {
    pointerEvents: 'auto',
    cursor: 'pointer',
  };
}

const formStyle: CSSProperties = {
  width: '100%',
  maxHeight: 'unset',
  background: 'none',
  border: 'none',
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: props.cardGap ?? '2rem',
  alignItems: 'center',
  boxSizing: 'border-box',
};

const cardStyle: CSSProperties = {
  width: '100%',
  background: props.cardBackground,
  borderRadius: props.generalRounding ?? '8px',
  border: \`1.5px solid \${cardOutlineColor}\`,
  padding: props.cardPadding ?? '2rem 1.75rem',
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s, background 0.3s, color 0.3s',
};

const labelInscriptionsContainerStyle: CSSProperties = {
  marginTop: props.labelInscriptionGap ?? '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: props.labelInscriptionGap ?? '0.5rem',
};

const labelInscriptionPairStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
};

const formFooterStyle = computed<CSSProperties>(() => ({
  marginTop: props.buttonMarginTop ?? '1rem',
  textAlign: 'center',
  width: '100%',
}));

const computedTitleStyle = computed<CSSProperties>(() => ({
  fontSize: '1.8rem',
  fontWeight: props.titleFontWeight ?? 900, // <-- Use optional prop here with default of 900
  color: props.accentColor,
  textAlign: isRTL(props.schema?.meta?.title) ? 'right' : 'left',
  direction: isRTL(props.schema?.meta?.title) ? 'rtl' : 'ltr',
  marginTop: props.titleMarginTop ?? '0',
  marginBottom: props.titleMarginBottom ?? '0.3rem',
}));

const computedDescStyle = computed<CSSProperties>(() => ({
  fontSize: '1rem',
  fontWeight: 400,
  color: themeColors.descriptionForeground,
  lineHeight: 1.4,
  whiteSpace: 'normal',
  overflowWrap: 'break-word',
  textAlign: isRTL(props.schema?.meta?.description) ? 'right' : 'left',
  direction: isRTL(props.schema?.meta?.description) ? 'rtl' : 'ltr',
  marginBottom: props.descriptionMarginBottom ?? '1rem',
}));

// Default submit button text fallback
const submitButtonText = props.submitButtonText ?? 'Submit';
</script>

<style scoped>
.form-header-card {
  width: 100%;
  margin-bottom: 1.5rem;
}

.form-section-card {
  margin-bottom: 0;
}

.form-text {
  font-weight: 700;
  font-size: 1.15rem;
  margin: 0 0 0.6rem;
}

.form-checkbox-group,
.form-radio-group {
  border: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-options,
.radio-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.clickable-label {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
  position: relative;
  outline-offset: 2px;
}

.control-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.click-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: transparent;
  z-index: 10;
  border-radius: inherit;
}

.disabled-overlay {
  cursor: not-allowed !important;
  pointer-events: auto !important;
}

.form-footer {
  text-align: center;
  width: 100%;
}

.form-footer > * {
  width: 100%;
}

.disabled-label {
  opacity: 0.6;
  cursor: not-allowed;
}

.meta-label-inscriptions {
  width: 100%;
}

.label-inscription-pair {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

.label-text {
  font-weight: 700;
  white-space: nowrap;
}

.inscription-text {
  color: inherit;
}

.inscription-link-wrapper {
  outline-offset: 2px;
}

.inscription-link-wrapper:focus {
  outline: 2px solid rgba(0, 0, 0, 0.8);
}
</style>
` },
  {
    filename: 'FormRendererType.ts',
    content: `export type LabelInscriptionPlaintext = {
  label: string;
  type?: 'plaintext';
  inscription: string;
};

export type LabelInscriptionHyperlink = {
  label: string;
  type: 'hyperlink';
  inscription: string;
  link: string;
  openIn?: 'newTab' | 'sameTab';
};

export type LabelInscription = LabelInscriptionPlaintext | LabelInscriptionHyperlink;

export type FormMeta = {
  title: string;
  description: string; // Plain text description (no HTML)
  accentColor?: string;
  highlightForeground?: string;
  labels?: LabelInscription[];
};

export type TextElement = { type: 'text'; text: string };
export type InputElement = { type: 'input'; text: string; key: string };
export type TextareaElement = { type: 'textarea'; text: string; key: string; height?: number };

export type CheckboxOption = { text: string; value: string };
export type CheckboxesElement = {
  type: 'checkboxes';
  key: string;
  options: CheckboxOption[];
  allowMultiple?: boolean;
  maxSelected?: number;
};

export type RadioOption = { text: string; value: string };
export type RadioElement = {
  type: 'radio';
  key: string;
  options: RadioOption[];
  allowUnselect?: boolean;
};

export type SectionElement =
  | TextElement
  | InputElement
  | TextareaElement
  | CheckboxesElement
  | RadioElement;

export type Section = {
  elements: SectionElement[];
};

export type FormSchema = {
  meta: FormMeta;
  sections: Section[];
};
` },
  {
    filename: 'FormTemplateCodec.ts',
    content: `// --- Base64 helpers ---
const encodeB64 = (str: string) => btoa(unescape(encodeURIComponent(str)));
const decodeB64 = (b64: string) => decodeURIComponent(escape(atob(b64)));

// --- Element encoding ---
function encodeElement(el: any): string {
  switch (el.type) {
    case "text":
      return \`(text:\${encodeB64(el.text)})\`;
    case "input":
      return \`(input:\${encodeB64(el.text)}:\${encodeB64(el.key)})\`;
    case "textarea":
      return \`(textarea:\${encodeB64(el.text)}:\${encodeB64(el.key)}:\${el.height ?? ""})\`;
    case "checkboxes":
      return \`(checkboxes:\${encodeB64(el.key)}:\${el.options.map((o: any) => \`\${encodeB64(o.text)}|\${encodeB64(o.value)}\`).join(",")}:\${el.allowMultiple ? "1" : "0"}:\${el.maxSelected ?? ""})\`;
    case "radio":
      return \`(radio:\${encodeB64(el.key)}:\${el.options.map((o: any) => \`\${encodeB64(o.text)}|\${encodeB64(o.value)}\`).join(",")}:\${el.allowUnselect ? "1" : "0"})\`;
    default:
      return "";
  }
}

// --- Section encoding ---
function encodeSection(section: any): string {
  return \`{\${section.elements.map(encodeElement).join("")}}\`;
}

// --- Meta encoding ---
function encodeMeta(meta: any): string {
  return [
    encodeB64(meta.title),
    encodeB64(meta.description),
    encodeB64(meta.responseModal?.primary || ""),
    encodeB64(meta.responseModal?.subtext || ""),
    encodeB64(meta.successNotification || ""),
    encodeB64(meta.accentColor || ""),
    encodeB64(meta.highlightForeground || ""),
    encodeB64(meta.author || ""),
    encodeB64(meta.fingerprint || "")
  ].join(":");
}

// --- Full form encoding ---
export function encodeFormTemplate(form: any): string {
  return \`META(\${encodeMeta(form.meta)})\` + form.sections.map(encodeSection).join("");
}

// --- Element decoding ---
function decodeElement(str: string): any {
  const match = str.match(/^\\(([^:]+):(.+)\\)$/);
  if (!match) return null;
  const [_, type, rest] = match;
  const parts = rest.split(":");
  switch (type) {
    case "text":
      return { type, text: decodeB64(parts[0]) };
    case "input":
      return { type, text: decodeB64(parts[0]), key: decodeB64(parts[1]) };
    case "textarea":
      return { type, text: decodeB64(parts[0]), key: decodeB64(parts[1]), height: parts[2] ? Number(parts[2]) : undefined };
    case "checkboxes":
      return {
        type,
        key: decodeB64(parts[0]),
        options: parts[1]
          ? parts[1].split(",").map((pair: string) => {
              const [t, v] = pair.split("|");
              return { text: decodeB64(t), value: decodeB64(v) };
            })
          : [],
        allowMultiple: parts[2] === "1",
        maxSelected: parts[3] ? Number(parts[3]) : undefined
      };
    case "radio":
      return {
        type,
        key: decodeB64(parts[0]),
        options: parts[1]
          ? parts[1].split(",").map((pair: string) => {
              const [t, v] = pair.split("|");
              return { text: decodeB64(t), value: decodeB64(v) };
            })
          : [],
        allowUnselect: parts[2] === "1"
      };
    default:
      return null;
  }
}

// --- Section decoding ---
function decodeSection(str: string): any {
  const elements: any[] = [];
  let rest = str.slice(1, -1); // remove {}
  while (rest.length) {
    const elMatch = rest.match(/^\\(([^)]+)\\)/);
    if (!elMatch) break;
    const elStr = elMatch[0];
    elements.push(decodeElement(elStr));
    rest = rest.slice(elStr.length);
  }
  return { elements };
}

// --- Meta decoding ---
function decodeMeta(str: string) {
  const [
    title,
    description,
    responseModalPrimary,
    responseModalSubtext,
    successNotification,
    accentColor,
    highlightForeground,
    author,
    fingerprint
  ] = str.split(":").map(decodeB64);
  return {
    title,
    description,
    responseModal: { primary: responseModalPrimary, subtext: responseModalSubtext },
    successNotification,
    accentColor,
    highlightForeground,
    author,
    fingerprint
  };
}

// --- Full form decoding ---
export function decodeFormTemplate(encoded: string): any {
  const metaMatch = encoded.match(/^META\\(([^)]+)\\)/);
  if (!metaMatch) throw new Error("No meta found");
  const metaStr = metaMatch[1];
  const meta = decodeMeta(metaStr);

  let rest = encoded.slice(metaMatch[0].length);
  const sections: any[] = [];
  while (rest.startsWith("{")) {
    let depth = 0, end = 0;
    for (let i = 0; i < rest.length; ++i) {
      if (rest[i] === "{") depth++;
      if (rest[i] === "}") depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
    if (end === 0) break;
    const sectionStr = rest.slice(0, end);
    sections.push(decodeSection(sectionStr));
    rest = rest.slice(end);
  }
  return { meta, sections };
}
` },
  {
    filename: 'FormResponseRenderer.vue',
    content: `<template>
  <div :style="containerStyle">
    <h2 :style="headerStyle">Decoded Submitted Form Data</h2>
    <div
      v-for="(section, sidx) in decodedSections"
      :key="'section-' + sidx"
      :style="getSectionStyle(sidx)"
      class="section-wrapper"
    >
      <div :style="sectionHeaderStyle">Section {{ sidx + 1 }}</div>

      <div v-if="section.elements.length === 0" :style="emptySectionTextStyle">
        (No elements in this section)
      </div>

      <template v-for="(el, eidx) in section.elements" :key="'el-' + sidx + '-' + eidx">
        <div v-if="el.type === 'text'" :style="textElementStyle">{{ el.text }}</div>

        <div v-else-if="el.type === 'input'" :style="valueContainerStyle">
          <div :style="labelStyle">{{ el.text }}:</div>
          <!-- Dynamic direction style for input values -->
          <pre :style="[inputValueStyle, { direction: getInputDirection(submittedValues[el.key]) }]">
            {{ submittedValues[el.key] ?? '(No input)' }}
          </pre>
        </div>

        <div v-else-if="el.type === 'textarea'" :style="valueContainerStyle">
          <div :style="labelStyle">{{ el.text }}:</div>
          <!-- Dynamic direction style for textarea values -->
          <pre :style="[textareaValueStyle, { direction: getInputDirection(submittedValues[el.key]) }]">
            {{ submittedValues[el.key] ?? '(No input)' }}
          </pre>
        </div>

        <div v-else-if="el.type === 'checkboxes'" :style="valueContainerStyle">
          <div :style="labelStyle">Checkboxes ({{ el.key }}):</div>
          <div :style="checkboxContainerStyle">
            <label
              v-for="option in el.options"
              :key="option.value"
              :style="getCheckboxLabelStyle(el.key, option.value)"
              class="custom-checkbox-label"
            >
              <input
                type="checkbox"
                :disabled="true"
                :checked="submittedValues[el.key]?.includes(option.value) || false"
                aria-hidden="true"
                tabindex="-1"
              />
              <span class="custom-checkbox-box"></span>
              {{ option.text }}
            </label>
          </div>
        </div>

        <div v-else-if="el.type === 'radio'" :style="valueContainerStyle">
          <div :style="labelStyle">Radio ({{ el.key }}):</div>
          <div :style="radioContainerStyle">
            <label
              v-for="option in el.options"
              :key="option.value"
              :style="getRadioLabelStyle(el.key, option.value)"
            >
              <input
                type="radio"
                :disabled="true"
                :checked="submittedValues[el.key] === option.value"
                :style="getRadioInputStyle(el.key, option.value)"
              />
              {{ option.text }}
            </label>
          </div>
        </div>

        <div v-else>
          <div :style="unknownElementStyle">(Unsupported element type: {{ el.type }})</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, reactive, watch } from 'vue';
import type { CSSProperties } from 'vue';
import type { FormSchema } from './FormRendererType';

function decodeB64(str: string): string {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch {
    return '';
  }
}

const props = defineProps<{
  schema: FormSchema;
  encodedResponse: string | null;
}>();

function parseEncodedResponse(encoded: string): Record<string, string | string[]> {
  const map: Record<string, string | string[]> = {};
  if (!encoded) return map;

  const sectionPairsRegex = /\[([^\][]+)\]/g;
  let match: RegExpExecArray | null;
  while ((match = sectionPairsRegex.exec(encoded))) {
    const pairStr = match[1];
    const [keyBase64, valBase64OrN] = pairStr.split(':');
    if (!keyBase64) continue;
    const key = decodeB64(keyBase64);
    if (valBase64OrN === 'n') {
      map[key] = '';
    } else if (valBase64OrN.includes(',')) {
      const vals = valBase64OrN.split(',');
      map[key] = vals.map((v) => decodeB64(v));
    } else {
      map[key] = decodeB64(valBase64OrN);
    }
  }
  return map;
}

const submittedValues = reactive(parseEncodedResponse(props.encodedResponse ?? ''));

watch(
  () => props.encodedResponse,
  (newVal) => {
    const parsed = parseEncodedResponse(newVal ?? '');
    Object.keys(submittedValues).forEach((k) => delete submittedValues[k]);
    Object.entries(parsed).forEach(([key, val]) => {
      submittedValues[key] = val;
    });
  },
  { immediate: true }
);

const decodedSections = computed(() => props.schema.sections);

// --- RTL detection function ---
const RTL_REGEX = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;

function isRTL(text?: string): boolean {
  return !!text && RTL_REGEX.test(text);
}

// Function to get direction style based on text content
function getInputDirection(val?: string | string[]): 'rtl' | 'ltr' {
  if (Array.isArray(val)) {
    // If array, join to string for detection
    return isRTL(val.join(' ')) ? 'rtl' : 'ltr';
  }
  return isRTL(val) ? 'rtl' : 'ltr';
}

// --- Styles with explicit CSSProperties typing ---

const containerStyle: CSSProperties = {
  background: '#0a0a0a',
  color: '#fff',
  padding: '1rem 1rem 2rem 1rem',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  borderRadius: '8px',
  maxWidth: '100%',
  boxSizing: 'border-box',
};

const headerStyle: CSSProperties = {
  fontWeight: '700',
  fontSize: '1.6rem',
  marginBottom: '1rem',
  color: '#00a0d8',
};

const sectionBaseStyle: CSSProperties = {
  borderRadius: '8px',
  padding: '1rem',
  marginBottom: '1rem',
  border: '1.5px solid #2e2e2e',
  boxSizing: 'border-box',
};

const firstSectionBg: CSSProperties = {
  backgroundColor: '#000000',
};

const secondSectionBg: CSSProperties = {
  backgroundColor: '#0B0B0F',
};

function getSectionStyle(sidx: number): CSSProperties {
  return {
    ...sectionBaseStyle,
    ...(sidx % 2 === 0 ? firstSectionBg : secondSectionBg),
  };
}

const sectionHeaderStyle: CSSProperties = {
  fontWeight: '700',
  fontSize: '1.2rem',
  marginBottom: '0.75rem',
  borderBottom: '1px solid #363636',
  paddingBottom: '0.3rem',
};

const emptySectionTextStyle: CSSProperties = {
  fontStyle: 'italic',
  color: '#707070',
};

const textElementStyle: CSSProperties = {
  fontWeight: '600',
  fontSize: '1rem',
  margin: '0.4rem 0',
  color: '#c1c1c1',
};

const valueContainerStyle: CSSProperties = {
  marginBottom: '0.75rem',
  whiteSpace: 'normal',
};

const labelStyle: CSSProperties = {
  fontWeight: '700',
  fontSize: '1rem',
  marginBottom: '0.25rem',
  color: '#00a0d8',
};

const inputValueStyle: CSSProperties = {
  backgroundColor: '#161616',
  padding: '0.4rem 0.6rem',
  borderRadius: '7px',
  fontFamily: "'Courier New', Courier, monospace",
  fontSize: '0.9rem',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  color: '#eee',
  border: '1.5px solid #2e2e2e',
  minHeight: '40px',
  height: 'auto',
  overflowY: 'visible',
};

const textareaValueStyle: CSSProperties = {
  backgroundColor: '#161616',
  padding: '0.4rem 0.6rem',
  borderRadius: '7px',
  fontFamily: "'Courier New', Courier, monospace",
  fontSize: '0.9rem',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  color: '#eee',
  border: '1.5px solid #2e2e2e',
  minHeight: '80px',
  maxHeight: '400px',
  overflowY: 'auto',
};

const checkboxContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
};

const checkboxLabelStyleBase: CSSProperties = {
  cursor: 'default',
  userSelect: 'none',
  color: '#c1c1c1',
  fontSize: '0.95rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.35rem',
};

function getCheckboxLabelStyle(key: string, value: string): CSSProperties {
  const isSelected = Array.isArray(submittedValues[key]) && (submittedValues[key] as string[]).includes(value);
  return {
    ...checkboxLabelStyleBase,
    ...(isSelected ? { color: '#00bb3f', fontWeight: '700', textDecoration: 'underline' } : {}),
  };
}

const radioContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
};

const radioLabelStyleBase: CSSProperties = {
  cursor: 'default',
  userSelect: 'none',
  color: '#c1c1c1',
  fontSize: '0.95rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.35rem',
};

function getRadioLabelStyle(key: string, value: string): CSSProperties {
  const isSelected = submittedValues[key] === value;
  return {
    ...radioLabelStyleBase,
    ...(isSelected ? { color: '#00bb3f', fontWeight: '700', textDecoration: 'underline' } : {}),
  };
}

const radioInputBaseStyle: CSSProperties = {
  appearance: 'none',
  width: '16px',
  height: '16px',
  marginRight: '6px',
  borderRadius: '50%',
  border: '1.5px solid #2e2e2e',
  backgroundColor: 'transparent',
  pointerEvents: 'none',
  position: 'relative',
};

const radioInputSelectedStyle: CSSProperties = {
  backgroundColor: '#00bb3f',
  borderColor: '#00bb3f',
  boxShadow: 'inset 0 0 0 5px #0a0a0a',
};

function getRadioInputStyle(key: string, value: string): CSSProperties {
  const isSelected = submittedValues[key] === value;
  return {
    ...radioInputBaseStyle,
    ...(isSelected ? radioInputSelectedStyle : {}),
  };
}

const unknownElementStyle: CSSProperties = {
  color: '#ff2800',
  fontWeight: '600',
  fontStyle: 'italic',
  margin: '0.5rem 0',
};
</script>

<style scoped>
.section-wrapper {
  transition: border-color 0.3s, background-color 0.3s;
}

/* Custom checkbox styling */
.custom-checkbox-label {
  cursor: default;
  user-select: none;
  color: #c1c1c1;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  position: relative;
  /* underline & color handled by inline style */
}

.custom-checkbox-label input {
  /* Visually hide the native checkbox but keep it accessible for screen readers */
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  pointer-events: none;
}

.custom-checkbox-box {
  width: 16px;
  height: 16px;
  border: 1.5px solid #2e2e2e;
  border-radius: 5px; /* slightly rounded rectangle */
  background-color: transparent;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
}

/* Checked state: fill green and show checkmark */
.custom-checkbox-label input:checked + .custom-checkbox-box {
  background-color: #00bb3f;
  border-color: #00bb3f;
}

/* Checkmark using ::after */
.custom-checkbox-label input:checked + .custom-checkbox-box::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 0px;
  width: 5px;
  height: 9px;
  border: solid #0a0a0a;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
` },
    ],
    dependencies: `[Halomot Button](/components/halomot-button)
[Floating Label Input](/components/floating-label-input)
[Form Renderer Checkbox](/components/form-renderer-checkbox)
[Form Renderer Radio](/components/form-renderer-radio)`,
    credit: ``,
    previewType: 'image',
    imageLink: "/previews/form-renderer.webp"
  },
  {
    name: 'Ping Pong Loader',
    route: 'ping-pong-loader',
    description: 'A customizable animated loader featuring smooth ping pong motion.',
    usage: `<template>
  <div class="demo-wrapper">
    <PingPongLoader
      message="Loading form..."
      backgroundColor="#0a0a0a"
      gridColor="#2e2e2e"
      adjacentHandleColor="#00a0d8"
      handleBallColor="#ffffff"
      borderColor="#363636"
      textColor="#ffffff"
      borderRadius="0px"
      dotBorderRadius="0px"
      style="width: 240px;"
    />

    <PingPongLoader
      message="טוען טופס..."
      backgroundColor="#16151a"
      gridColor="#2e2d38"
      adjacentHandleColor="#8506A9"
      handleBallColor="#ffffff"
      borderColor="#3a3846"
      textColor="#aaa"
      borderRadius="24px"
      borderWidth="3px"
    />
  </div>
</template>

<script setup lang="ts">
import PingPongLoader from './PingPongLoader.vue';
</script>

<style scoped>
.demo-wrapper {
  display: flex;
  flex-wrap: wrap; /* allow wrapping if not enough space */
  gap: 24px;        /* vertical and horizontal gap */
  justify-content: center; /* center horizontally */
  user-select: none;
  padding: 24px 0;
}
</style>

// Note: The PingPongLoader component accepts the following props:
// - message: string (optional) - The loading message text displayed below the animated dots. Default: "Loading Form...".
// - duration: number (optional) - Duration in milliseconds for each animation frame. Default: 60.
// - repeatCount: number (optional) - Number of times the animation sequence repeats. -1 means infinite looping. Default: -1.
// - backgroundColor: string (optional) - Background color of the loader container. Default: "#0a0a0a".
// - gridColor: string (optional) - Base color of the dots grid. Default: "#2e2e2e".
// - adjacentHandleColor: string (optional) - Color of active "handle" dots in the animation. Default: "#00a0d8".
// - handleBallColor: string (optional) - Color of the active "ball" dot in the animation. Default: "#ffffff".
// - borderColor: string (optional) - Color of the container border. Default: "#363636".
// - borderWidth: string (optional) - Thickness of the container border, e.g. "1.5px". Default: "1.5px".
// - borderRadius: string (optional) - Border radius of the container, e.g. "8px". Default: "8px".
// - textColor: string (optional) - Color of the message text. Default: "#ffffff".
// - dotBorderRadius: string (optional) - Border radius for each dot in the grid, e.g. "2px". Default: "2px".
// - padding: string (optional) - Padding inside the container (any valid CSS padding value). Default: "2.25rem".
//
// Emits:
//   None (animation is internal, no emitted events).
//
// Slots:
//   None.
//
// Usage notes:
// - Renders a 7x7 grid (49 dots) with an animated "ping-pong" pattern highlighting groups of dots.
// - The directional flow of the message text is auto-detected from Unicode ranges supporting right-to-left languages.
// - Styling and animation speed are fully configurable via props.
// - Does not depend on external CSS frameworks; styling scoped within component.
`,
    code: [
      {
        filename: 'PingPongLoader.vue',
        content: `<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";

const RTL_REGEX = /[\\u0591-\\u07FF\\uFB1D-\\uFDFD\\uFE70-\\uFEFC]/;

function isRTL(text?: string): boolean {
  return !!text && RTL_REGEX.test(text);
}

interface Props {
  message?: string;
  duration?: number;
  repeatCount?: number;
  backgroundColor?: string;
  gridColor?: string;
  adjacentHandleColor?: string;
  handleBallColor?: string;
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string;
  textColor?: string;
  dotBorderRadius?: string;
  padding?: string;
}

const props = defineProps<Props>();

const defaultColors = {
  backgroundColor: "#0a0a0a",
  gridColor: "#2e2e2e",
  adjacentHandleColor: "#00a0d8",
  handleBallColor: "#ffffff",
  borderColor: "#363636",
  textColor: "#ffffff",
  borderWidth: "1.5px",
  borderRadius: "8px",
  dotBorderRadius: "2px",
  padding: "2.25rem",
};

const frames = [
  [7, 0, 8, 6, 13, 20],
  [7, 13, 20, 16, 27, 21],
  [20, 27, 21, 34, 24, 28],
  [21, 34, 28, 41, 32, 35],
  [28, 41, 35, 48, 40, 42],
  [28, 41, 35, 48, 42, 46],
  [28, 41, 35, 48, 42, 38],
  [28, 41, 35, 48, 30, 21],
  [28, 41, 48, 21, 22, 14],
  [28, 41, 21, 14, 16, 27],
  [28, 21, 14, 10, 20, 27],
  [21, 14, 4, 13, 20, 27],
  [21, 14, 12, 6, 13, 20],
  [21, 14, 6, 13, 20, 11],
  [21, 14, 6, 13, 20, 10],
  [6, 13, 20, 9, 7, 21],
];

const ballPositions = [
  14, 14, 14, 27, 34, 34, 34, 34, 34, 34, 34, 28, 28, 28, 28, 14,
];

const dotCount = 49;

const currentFrameIndex = ref(0);
const repeats = ref(0);
const intervalId = ref<number | null>(null);

const dots = computed(() => Array.from({ length: dotCount }, (_, i) => i));
const dotRefs = ref<HTMLElement[]>([]);

const duration = computed(() => props.duration ?? 60);
const repeatCount = computed(() => props.repeatCount ?? -1);
const bgColor = computed(() => props.backgroundColor ?? defaultColors.backgroundColor);
const gridColor = computed(() => props.gridColor ?? defaultColors.gridColor);
const ballCol = computed(() => props.adjacentHandleColor ?? defaultColors.adjacentHandleColor);
const handleCol = computed(() => props.handleBallColor ?? defaultColors.handleBallColor);
const borderCol = computed(() => props.borderColor ?? defaultColors.borderColor);
const textCol = computed(() => props.textColor ?? defaultColors.textColor);
const borderWidth = computed(() => props.borderWidth ?? defaultColors.borderWidth);
const borderRadius = computed(() => props.borderRadius ?? defaultColors.borderRadius);
const dotBorderRadius = computed(() => props.dotBorderRadius ?? defaultColors.dotBorderRadius);
const padding = computed(() => props.padding ?? defaultColors.padding);

const messageText = computed(() => props.message ?? "Loading Form...");
const rtl = computed(() => isRTL(messageText.value));

function applyFrameToDots(frameIndex: number) {
  const frame = frames[frameIndex];
  const ball = ballPositions[frameIndex];
  dotRefs.value.forEach((dot) => {
    dot.style.backgroundColor = gridColor.value;
    dot.classList.remove("active-ball", "active-handle");
  });
  if (dotRefs.value[ball]) {
    dotRefs.value[ball].style.backgroundColor = ballCol.value;
    dotRefs.value[ball].classList.add("active-ball");
  }
  frame.forEach((i) => {
    if (dotRefs.value[i]) {
      dotRefs.value[i].style.backgroundColor = handleCol.value;
      dotRefs.value[i].classList.add("active-handle");
    }
  });
}

function startAnimation() {
  if (intervalId.value !== null) clearInterval(intervalId.value);
  currentFrameIndex.value = 0;
  repeats.value = 0;
  intervalId.value = window.setInterval(() => {
    applyFrameToDots(currentFrameIndex.value);
    if (currentFrameIndex.value + 1 >= frames.length) {
      if (repeatCount.value !== -1 && repeats.value + 1 >= repeatCount.value) {
        clearInterval(intervalId.value!);
        intervalId.value = null;
        return;
      }
      repeats.value++;
    }
    currentFrameIndex.value = (currentFrameIndex.value + 1) % frames.length;
  }, duration.value);
}

function stopAnimation() {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
}

onMounted(() => {
  startAnimation();
});

onBeforeUnmount(() => {
  stopAnimation();
});

watch([duration, repeatCount], () => {
  startAnimation();
});
</script>

<template>
  <div
    class="pingpong-loader-wrapper"
    role="status"
    aria-label="Loading"
    :style="{
      backgroundColor: bgColor,
      border: \`\${borderWidth} solid \${borderCol}\`,
      borderRadius,
      color: textCol,
      padding,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      userSelect: 'none',
      outline: 'none',
      margin: 0,
    }"
  >
    <div
      class="pingpong-grid"
      aria-hidden="true"
      :style="{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 6px)',
        gridTemplateRows: 'repeat(7, 6px)',
        gap: '2px',
        width: 'fit-content',
        height: 'fit-content',
      }"
    >
      <div
        v-for="(dot, index) in dots"
        :key="index"
        ref="dotRefs"
        class="pingpong-dot"
        :style="{ backgroundColor: gridColor, borderRadius: dotBorderRadius }"
      />
    </div>
    <div
      class="pingpong-message"
      :style="{
        marginTop: '26px',
        fontWeight: 600,
        fontSize: '1.08rem',
        userSelect: 'none',
        textAlign: 'center',
        direction: rtl ? 'rtl' : 'ltr',
        color: textCol,
        width: '100%',
      }"
    >
      {{ messageText }}
    </div>
  </div>
</template>

<style scoped>
.pingpong-dot {
  width: 6px;
  height: 6px;
  transition: background-color 0.2s ease;
}
.active-ball {
}
.active-handle {
}
.pingpong-message {
}
</style>
` }
    ],
    dependencies: ``,
    credit: `[Dot Loader](https://21st.dev/paceui/dot-loader/default) by [PaceUI](https://www.paceui.com/)`,
    previewType: 'center',
  },
  {
    name: 'Submit Card',
    route: 'submit-card',
    description: 'An interactive, animated card designed to prompt submission actions.',
    usage: `<script setup lang="ts">
import SubmitCard from './SubmitCard.vue'

// Dark theme props
const darkThemeProps = {
  backgroundColor: '#0a0a0a',
  borderColor: '#262626',
  innerAreaBorderColor: '#262626',
  innerAreaBgColor: '#111',
  squareBgColor: '#fff',
  plusIconColor: '#00a7fa',
  textColorTitle: '#fff',
  textColorDescription: '#aaa',
}

// Light theme props
const lightThemeProps = {
  backgroundColor: '#f9f9f9',
  borderColor: '#ccc',
  innerAreaBorderColor: '#d5d5d5',
  innerAreaBgColor: '#e1e1e1',
  squareBgColor: '#222',
  plusIconColor: '#d500ff',
  textColorTitle: '#222',
  textColorDescription: '#555',
}
</script>

<template>
  <div
    style="
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 16px;
      width: 100%;
      margin: auto;
      box-sizing: border-box;
    "
  >
    <!-- First Card -->
    <SubmitCard
      link="https://blueberry-loom-form-loader.netlify.app/form/bWF4aW0uYm9ydC5kZXZlbEBnbWFpbC5jb20=/Far247Squ6?key=Im5uylqLi3BwlN909sLP1Y3vY6nRwMixa8D6BGpj6Uz5B4b9OO)YZSyKWvCGeX65a6Yfsc2ZdUAEWrue3FXDDg=="
      title="Submit Your Project"
      description="Made a project that uses at least one Namer UI component? Submit it now for a chance to get featured!"
      :backgroundColor="darkThemeProps.backgroundColor"
      :cardBorderColor="darkThemeProps.borderColor"
      :innerAreaBorderColor="darkThemeProps.innerAreaBorderColor"
      :innerAreaBgColor="darkThemeProps.innerAreaBgColor"
      :squareBgColor="darkThemeProps.squareBgColor"
      :plusIconColor="darkThemeProps.plusIconColor"
      :textColorTitle="darkThemeProps.textColorTitle"
      :textColorDescription="darkThemeProps.textColorDescription"
      :isRTL="false"
    />

    <!-- Second Card (Hebrew RTL) -->
    <SubmitCard
      link="https://blueberry-loom-form-loader.netlify.app/form/bWF4aW0uYm9ydC5kZXZlbEBnbWFpbC5jb20=/Far247Squ6?key=Im5uylqLi3BwlN909sLP1Y3vY6nRwMixa8D6BGpj6Uz5B4b9OO)YZSyKWvCGeX65a6Yfsc2ZdUAEWrue3FXDDg=="
      title="שלח את הפרויקט שלך"
      description="יצרת פרויקט המשתמש בלפחות רכיב אחד של נמר UI? שלח אותו עכשיו כדי לקבל הזדמנות להופיע!"
      :backgroundColor="lightThemeProps.backgroundColor"
      :cardBorderColor="lightThemeProps.borderColor"
      :innerAreaBorderColor="lightThemeProps.innerAreaBorderColor"
      :innerAreaBgColor="lightThemeProps.innerAreaBgColor"
      :squareBgColor="lightThemeProps.squareBgColor"
      :plusIconColor="lightThemeProps.plusIconColor"
      :textColorTitle="lightThemeProps.textColorTitle"
      :textColorDescription="lightThemeProps.textColorDescription"
      :isRTL="true"
    />

    <!-- Third Card with image -->
    <SubmitCard
      link="https://clandestine-beauty-salon-landing-page.netlify.app/"
      title="Clandestine"
      description="A modern beauty salon landing page template featuring an appointment reservation UI and multilingual support."
      imageSrc="https://github.com/Northstrix/namer-ui/blob/main/public/showcase/clandestine.webp?raw=true"
      :backgroundColor="darkThemeProps.backgroundColor"
      :cardBorderColor="darkThemeProps.borderColor"
      :innerAreaBorderColor="darkThemeProps.innerAreaBorderColor"
      :innerAreaBgColor="darkThemeProps.innerAreaBgColor"
      :squareBgColor="darkThemeProps.squareBgColor"
      :plusIconColor="darkThemeProps.plusIconColor"
      :textColorTitle="darkThemeProps.textColorTitle"
      :textColorDescription="darkThemeProps.textColorDescription"
      :imageSrc="placeholderImage"
      :isRTL="false"
    />
  </div>
</template>

// Note: The SubmitCard component accepts the following props:
// - isRTL: boolean (optional) - Enables right-to-left layout direction. Default: false.
// - link: string (required) - Target URL for the clickable card. Can be a relative or external HTTP/HTTPS link.
// - textShiftDurationMs: number (optional) - Duration in milliseconds for the text shift animation when hovered. Default: 200.
// - plusIconDurationMs: number (optional) - Duration in milliseconds for the plus icon rotation animation. Default: 400.
// - otherDurationMs: number (optional) - Duration in milliseconds for all other transitions (container movement, borders, etc.). Default: 300.
// - textShiftDistance: string (optional) - Horizontal displacement distance applied to text when hovered. Default: "6px".
// - padding: string (optional) - Padding applied inside the card container. Default: "16px".
// - backgroundColor: string (optional) - Background color of the outer card. Default: "#0a0a0a".
// - cardBorderColor: string (optional) - Border color for the card container. Default: "#262626".
// - innerAreaBorderColor: string (optional) - Border color for the inner area and the moving square. Default: "#262626".
// - innerAreaBgColor: string (optional) - Background color for the inner area with fixed aspect ratio. Default: "#111".
// - squareBgColor: string (optional) - Background color for the moving square element. Default: "#fff".
// - borderRadius: string (optional) - Radius applied to all rounded edges. Default: "8px".
// - borderWidthOuter: string (optional) - Width of the card container border. Default: "1px".
// - borderWidthInner: string (optional) - Width of the inner area and square borders. Default: "1px".
// - borderWidthDashed: string (optional) - Width of the dashed hover outline. Default: "1px".
// - title: string (required) - Main title text displayed on the card.
// - description: string (optional) - Supporting description text displayed below the title. Default: "".
// - titleFontSize: string (optional) - Font size for the title text. Default: "22px".
// - descriptionFontSize: string (optional) - Font size for the description text. Default: "14px".
// - titleMarginTop: string (optional) - Margin above the title text. Default: "0".
// - gapBetweenTitleDesc: string (optional) - Vertical space between title and description. Default: "8px".
// - textColorTitle: string (optional) - Color of the title text. Default: "#fff".
// - textColorDescription: string (optional) - Color of the description text. Default: "#aaa".
// - aspectRatio: string (optional) - Aspect ratio of the inner area (CSS value like "16/10"). Default: "16/10".
// - squareHeightPercent: number (optional) - Height percentage of the animated square relative to the container. Default: 50.
// - plusIconColor: string (optional) - Stroke color of the plus icon. Default: "#00a7fa".
// - imageSrc: string (optional) - Source URL of an image. When provided, replaces the inner area content with an image preserving the aspect ratio.
//
// Emits:
//   None (all hover animations and link actions are internal).
//
// Slots:
//   None.
`,
    code: [
      {
        filename: 'SubmitCard.vue',
        content: `<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = defineProps({
  isRTL: { type: Boolean, default: false },
  link: { type: String, required: true },
  textShiftDurationMs: { type: Number, default: 200 },
  plusIconDurationMs: { type: Number, default: 400 },
  otherDurationMs: { type: Number, default: 300 },
  textShiftDistance: { type: String, default: "6px" },
  padding: { type: String, default: "16px" },
  backgroundColor: { type: String, default: "#0a0a0a" },
  cardBorderColor: { type: String, default: "#262626" },
  innerAreaBorderColor: { type: String, default: "#262626" },
  innerAreaBgColor: { type: String, default: "#111" },
  squareBgColor: { type: String, default: "#fff" },
  borderRadius: { type: String, default: "8px" },
  borderWidthOuter: { type: String, default: "1px" },
  borderWidthInner: { type: String, default: "1px" },
  borderWidthDashed: { type: String, default: "1px" },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  titleFontSize: { type: String, default: "22px" },
  descriptionFontSize: { type: String, default: "14px" },
  titleMarginTop: { type: String, default: "0" },
  descriptionMarginBottom: { type: String, default: "0" },
  gapBetweenTitleDesc: { type: String, default: "8px" },
  textColorTitle: { type: String, default: "#fff" },
  textColorDescription: { type: String, default: "#aaa" },
  aspectRatio: { type: String, default: "16/10" },
  squareHeightPercent: { type: Number, default: 50 },
  plusIconColor: { type: String, default: "#00a7fa" },
  imageSrc: { type: String, default: "" },
});

const hover = ref(false);
const iconState = ref<"idle" | "spinningCW" | "spinningCCW">("idle");
const imageError = ref(false);

const shiftX = computed(() => {
  let px = parseInt(props.textShiftDistance);
  if (isNaN(px)) px = 6;
  return props.isRTL ? -px : px;
});

const isExternal = computed(() => /^https?:\\/\\//i.test(props.link));

watch(hover, (value) => {
  iconState.value = value ? "spinningCW" : "spinningCCW";
});

function handleImageError() {
  imageError.value = true;
}
</script>

<template>
  <a
    class="submit-card"
    :class="{ hovered: hover }"
    :href="link"
    :target="isExternal ? '_blank' : null"
    :rel="isExternal ? 'noopener noreferrer' : null"
    :style="{
      backgroundColor,
      borderColor: cardBorderColor,
      borderWidth: borderWidthOuter,
      borderRadius,
      padding,
      direction: isRTL ? 'rtl' : 'ltr',
      width: '100%',
      boxSizing: 'border-box',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      flex: '1 1 0',
      transition: \`border-color \${otherDurationMs}ms ease\`
    }"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <!-- Image Handling -->
    <div
      v-if="imageSrc"
      class="aspect-ratio-container"
      :style="{
        aspectRatio,
        backgroundColor: innerAreaBgColor,
        border: borderWidthInner + ' solid ' + innerAreaBorderColor,
        borderRadius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
        position: 'relative',
        transition: \`all \${otherDurationMs}ms ease\`
      }"
    >
      <img
        v-if="!imageError"
        :src="imageSrc"
        alt=""
        class="image"
        :style="{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: borderRadius
        }"
        @error="handleImageError"
      />
      <div
        v-else
        class="broken-fallback"
        :style="{
          border: borderWidthInner + ' solid ' + innerAreaBorderColor,
          borderRadius,
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent'
        }"
      ></div>
    </div>

    <!-- Regular Mode -->
    <div
      v-else
      class="aspect-ratio-container"
      :style="{
        aspectRatio,
        backgroundColor: innerAreaBgColor,
        border: borderWidthInner + ' solid ' + innerAreaBorderColor,
        borderRadius,
        display: 'grid',
        placeItems: 'center',
        overflow: 'visible',
        transform: isRTL ? 'scaleX(-1)' : 'none',
        width: '100%',
        position: 'relative',
        transition: \`all \${otherDurationMs}ms ease\`
      }"
    >
      <div
        class="dashed-border"
        :class="{ visible: hover }"
        :style="{
          height: squareHeightPercent + '%',
          aspectRatio: '1 / 1',
          borderColor: plusIconColor,
          borderWidth: borderWidthDashed,
          borderRadius,
          transition: \`opacity \${otherDurationMs}ms ease\`,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1
        }"
      ></div>

      <div
        class="square-container"
        :style="{
          backgroundColor: squareBgColor,
          height: squareHeightPercent + '%',
          aspectRatio: '1 / 1',
          border: borderWidthInner + ' solid ' + innerAreaBorderColor,
          borderRadius,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: hover
            ? 'translate(calc(-50% + 15px), calc(-50% - 15px))'
            : 'translate(-50%, -50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'visible',
          transition: \`transform \${otherDurationMs}ms ease\`,
          zIndex: 2
        }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          viewBox="0 0 24 24"
          fill="none"
          :stroke="plusIconColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          :class="{
            spinCW: iconState === 'spinningCW',
            spinCCW: iconState === 'spinningCCW'
          }"
          style="user-select: none;"
          :style="{ '--plusDur': plusIconDurationMs + 'ms' }"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </div>
    </div>

    <!-- Text area -->
    <div
      class="text-content"
      :style="{
        marginTop: '16px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: gapBetweenTitleDesc,
        textAlign: isRTL ? 'right' : 'left',
        color: textColorTitle,
        userSelect: 'none',
        justifyContent: 'flex-start',
        flexGrow: 1,
        transition: \`transform \${textShiftDurationMs}ms ease\`,
        transform: hover ? \`translateX(\${shiftX}px)\` : 'translateX(0)'
      }"
    >
      <h3
        class="title"
        :style="{
          fontSize: titleFontSize,
          marginTop: titleMarginTop,
          marginBottom: 0,
          fontWeight: 600,
          color: textColorTitle,
          width: '100%',
          overflowWrap: 'break-word',
          wordBreak: 'normal'
        }"
      >
        {{ title }}
      </h3>
      <p
        v-if="description"
        class="description"
        :style="{
          fontSize: descriptionFontSize,
          marginTop: 0,
          marginBottom: descriptionMarginBottom,
          color: textColorDescription,
          fontWeight: 400,
          width: '100%',
          overflowWrap: 'break-word',
          wordBreak: 'normal'
        }"
      >
        {{ description }}
      </p>
    </div>
  </a>
</template>

<style scoped>
.submit-card {
  border-style: solid;
}

.aspect-ratio-container {
  position: relative;
  width: 100%;
}

.image {
  display: block;
}

.broken-fallback {
  box-sizing: border-box;
}

.dashed-border {
  border-style: dashed;
  opacity: 0;
  pointer-events: none;
  box-sizing: border-box;
}
.dashed-border.visible {
  opacity: 1;
}

@keyframes spinCW {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes spinCCW {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
svg.spinCW {
  animation: spinCW var(--plusDur, 400ms) ease-in-out 1;
}
svg.spinCCW {
  animation: spinCCW var(--plusDur, 400ms) ease-in-out 1;
}
</style>
` }
    ],
    dependencies: ``,
    credit: `[AnimateIcons](https://animateicons.vercel.app/)
[Bento Grid](https://ui.aceternity.com/components/bento-grid) by [Aceternity UI](https://ui.aceternity.com/)
[File Upload](https://ui.aceternity.com/components/file-upload) by [Aceternity UI](https://ui.aceternity.com/)`,
    previewType: 'image',
    imageLink: '/previews/submit-card.webp'
  },
  {
    name: 'Halloween Submit Card',
    route: 'halloween-submit-card',
    description: 'A glowing animated card component with Halloween-inspired motion, gradient, and light effects.',
    usage: `<script setup lang="ts">
import HalloweenSubmitCard from './HalloweenSubmitCard.vue'
</script>

<template>
  <div class="demo-container">
    <!-- 1. LTR — Default Theme -->
    <div class="demo-item">
      <HalloweenSubmitCard
        link="https://blueberry-loom-form-loader.netlify.app/form/bWF4aW0uYm9ydC5kZXZlbEBnbWFpbC5jb20=/Far247Squ6?key=Im5uylqLi3BwlN909sLP1Y3vY6nRwMixa8D6BGpj6Uz5B4b9OO)YZSyKWvCGeX65a6Yfsc2ZdUAEWrue3FXDDg=="
        title="Submit Your Project"
        description="Made a project that uses at least one Namer UI component? Submit it now for a chance to get featured!"
        useDrawIcon
        :isRTL="false"
      />
    </div>

    <!-- 2. RTL — Deep Purple Theme -->
    <div class="demo-item">
      <HalloweenSubmitCard
        link="https://blueberry-loom-form-loader.netlify.app/form/bWF4aW0uYm9ydC5kZXZlbEBnbWFpbC5jb20=/Far247Squ6?key=Im5uylqLi3BwlN909sLP1Y3vY6nRwMixa8D6BGpj6Uz5B4b9OO)YZSyKWvCGeX65a6Yfsc2ZdUAEWrue3FXDDg=="
        title="שלח את הפרויקט שלך"
        description="יצרת פרויקט המשתמש בלפחות רכיב אחד של נמר UI? שלח אותו עכשיו כדי לקבל הזדמנות להופיע!"
        accent="#a800ff"
        accentAdjacentColor="#5c00b3"
        accentGlow="rgba(160, 0, 255, 0.85)"
        secondInteractiveColor="#3c005c"
        cardBg="#0a0010"
        innerBg="#190028"
        textColorTitle="#f4e9ff"
        textColorDescription="#c8a2ff"
        :isRTL="true"
        useDrawIcon
        :initialRotation="3.7"
        innerBorderColor="rgba(160, 0, 255, 0.55)"
        bodyGlow="rgba(160, 0, 255, 0.35)"
        squareBgColor="#f4e9ff"
        squareGlow="rgba(160, 0, 255, 0.45)"
      />
    </div>

    <!-- 3. LTR — Blue Light Theme Variant -->
    <div class="demo-item">
      <HalloweenSubmitCard
        link="https://blueberry-loom-form-loader.netlify.app/form/bWF4aW0uYm9ydC5kZXZlbEBnbWFpbC5jb20=/Far247Squ6?key=Im5uylqLi3BwlN909sLP1Y3vY6nRwMixa8D6BGpj6Uz5B4b9OO)YZSyKWvCGeX65a6Yfsc2ZdUAEWrue3FXDDg=="
        title="Envía tu proyecto"
        description="¿Has creado un proyecto que utilice al menos un componente de Namer UI? ¡Envíalo ahora para tener la oportunidad de ser destacado!"
        accent="#00A7FA"
        accentAdjacentColor="#0091E2"
        accentGlow="rgba(0, 167, 250, 0.85)"
        secondInteractiveColor="#66C9FF"
        cardBg="#E1F3FF"
        innerBg="#F4FAFF"
        innerBorderColor="rgba(0, 167, 250, 0.4)"
        textColorTitle="#0C2E4A"
        textColorDescription="#1172A5"
        bodyGlow="rgba(0, 167, 250, 0.25)"
        squareGlow="rgba(0, 140, 230, 0.4)"
        squareBgColor="#001B3C"
        :isRTL="false"
        :centerText="true"
        :enableGlow="true"
        :initialRotation="2.8"
      />
    </div>

    <!-- 4. LTR — Image Card Default Theme -->
    <div class="demo-item">
      <HalloweenSubmitCard
        link="https://clandestine-beauty-salon-landing-page.netlify.app/"
        title="Clandestine"
        description="A modern beauty salon landing page template featuring an appointment reservation UI and multilingual support."
        imageSrc="https://github.com/Northstrix/namer-ui/blob/main/public/showcase/clandestine.webp?raw=true"
        :enableGlow="true"
        innerBg="#000"
        :isRTL="false"
        :initialRotation="1.8"
      />
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 40px;
}

.demo-item {
  max-width: 376px;
  flex: 1 1 320px;
  display: flex;
  justify-content: center;
}
</style>

// Note: The HalloweenSubmitCard component accepts the following props:
// - id: string (optional) - Unique identifier for the card instance. Default: "".
// - isRTL: boolean (optional) - Enables right-to-left layout direction. Default: false.
// - link: string (required) - Target URL for the clickable card. Can be a relative or external HTTP/HTTPS link.
// - title: string (required) - Main title text displayed on the card.
// - description: string (optional) - Supporting description text displayed below the title. Default: "".
// - imageSrc: string (optional) - Source URL of an image. When provided, replaces the inner area content with an image preserving the aspect ratio.
// - useDrawIcon: boolean (optional) - Enables animated drawn plus icon variant instead of the rotating one. Default: false.
// - accent: string (optional) - Primary accent color of the card’s gradient and icon. Default: "#ff7518".
// - accentAdjacentColor: string (optional) - Secondary tone applied to gradient transitions. Default: "#b13d00".
// - accentGlow: string (optional) - Outer glow color for the hover highlight effect. Default: "rgba(255,117,24,0.9)".
// - secondInteractiveColor: string (optional) - Third layered color used to create depth in the gradient. Default: "#5f1907".
// - cardBg: string (optional) - Background color of the main card body. Default: "#0a0501".
// - innerBg: string (optional) - Background color of the internal aspect-ratio container. Default: "#110903".
// - textColorTitle: string (optional) - Color of the card title text. Default: "#fffbe6".
// - textColorDescription: string (optional) - Color of the card description text. Default: "#ffa94d".
// - enableGlow: boolean (optional) - Enables or disables glowing box-shadow effects. Default: true.
// - innerBorderColor: string (optional) - Border color applied inside the inner container and square. Default: "rgba(255,117,24,0.5)".
// - squareBgColor: string (optional) - Background color of the animated square element. Default: "#fdf5d4".
// - bodyGlow: string (optional) - Ambient glow hue around the whole card. Default: "rgba(255,130,0,0.3)".
// - squareGlow: string (optional) - Glow color for the square hover effect. Default: "rgba(255,117,24,0.5)".
// - initialRotation: number (optional) - Starting angle for the gradient rotation in radians. Default: 2.5.
// - centerText: boolean (optional) - Centers the title and description text horizontally. Default: false.
// - aspectRatio: string (optional) - Aspect ratio for the inner visual container (CSS value like "16/10"). Default: "16/10".
// - plusIconDurationMs: number (optional) - Duration in milliseconds for the plus icon rotation animation. Default: 400.
// - textShiftDurationMs: number (optional) - Duration in milliseconds for text horizontal translation on hover. Default: 200.
// - otherDurationMs: number (optional) - Duration for other transitions such as border and container movement. Default: 300.
// - squareHeightPercent: number (optional) - Height percentage of the inner square relative to the container. Default: 50.
// - textShiftDistance: string (optional) - Distance text shifts horizontally on hover. Default: "6px".
//
// Emits:
//   None (all hover animations and link actions are internal).
//
// Slots:
//   None.
`,
    code: [
      {
        filename: 'HalloweenSubmitCard.vue',
        content: `<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps({
  id: { type: String, default: "" },
  isRTL: { type: Boolean, default: false },
  link: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  imageSrc: { type: String, default: "" },
  useDrawIcon: { type: Boolean, default: false },

  // Theme props
  accent: { type: String, default: "#ff7518" },
  accentAdjacentColor: { type: String, default: "#b13d00" },
  accentGlow: { type: String, default: "rgba(255,117,24,0.9)" },
  secondInteractiveColor: { type: String, default: "#5f1907" },
  cardBg: { type: String, default: "#0a0501" },
  innerBg: { type: String, default: "#110903" },
  textColorTitle: { type: String, default: "#fffbe6" },
  textColorDescription: { type: String, default: "#ffa94d" },
  enableGlow: { type: Boolean, default: true },
  innerBorderColor: { type: String, default: "rgba(255,117,24,0.5)" },
  squareBgColor: { type: String, default: "#fdf5d4" },
  bodyGlow: { type: String, default: "rgba(255,130,0,0.3)" },
  squareGlow: { type: String, default: "rgba(255,117,24,0.5)" },
  initialRotation: { type: Number, default: 2.5 },
  centerText: { type: Boolean, default: false },

  aspectRatio: { type: String, default: "16/10" },
  plusIconDurationMs: { type: Number, default: 400 },
  textShiftDurationMs: { type: Number, default: 200 },
  otherDurationMs: { type: Number, default: 300 },
  squareHeightPercent: { type: Number, default: 50 },
  textShiftDistance: { type: String, default: "6px" },
});

const hover = ref(false);
const iconState = ref<"idle" | "cw" | "ccw">("idle");
const imageError = ref(false);
const angle = ref(props.initialRotation);

const shiftX = computed(() => {
  let px = parseInt(props.textShiftDistance);
  if (isNaN(px)) px = 6;
  return props.isRTL ? -px : px;
});

const isExternal = computed(() => /^https?:\\/\\//i.test(props.link));

const showRegularIconBlock = computed(() => !props.imageSrc);
const showImage = computed(() => props.imageSrc && !imageError.value);
const showBrokenFallback = computed(() => props.imageSrc && imageError.value);

function handleMouseMove(e: MouseEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  angle.value = Math.atan2(-x, y);
}

function handleEnter() {
  hover.value = true;
  iconState.value = "cw";
}
function handleLeave() {
  hover.value = false;
  iconState.value = "ccw";
}

function handleImageError() {
  imageError.value = true;
}

const gradient = computed(() => {
  return \`linear-gradient(to bottom, \${props.cardBg}CC, \${props.cardBg}CC),
          linear-gradient(\${angle.value}rad,
                          \${props.accent} 0%,
                          \${props.accentAdjacentColor} 50%,
                          \${props.secondInteractiveColor} 90%)\`;
});

const baseShadow = computed(() =>
  props.enableGlow
    ? \`0 0 0 1px rgba(255,255,255,0.08), 0 0 20px \${props.bodyGlow}, 0 0 40px \${props.bodyGlow}\`
    : \`0 0 0 1px rgba(255,255,255,0.08)\`
);
const hoverShadow = computed(() =>
  props.enableGlow
    ? \`0 0 35px \${props.accentGlow}, 0 0 80px \${props.accentGlow}, inset 0 0 20px \${props.accentGlow}\`
    : baseShadow.value
);
</script>

<template>
  <a
    class="halloween-card"
    :href="link"
    :target="isExternal ? '_blank' : null"
    :rel="isExternal ? 'noopener noreferrer' : null"
    :style="{
      direction: isRTL ? 'rtl' : 'ltr',
      backgroundImage: gradient,
      boxShadow: hover ? hoverShadow : baseShadow,
    }"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
    @mousemove="handleMouseMove"
  >
    <!-- Area block -->
    <div
      class="aspect-container"
      :style="{
        aspectRatio,
        backgroundColor: innerBg,
        borderColor: innerBorderColor,
        transform: isRTL ? 'scaleX(-1)' : 'none'
      }"
    >
      <!-- Case 1: valid image -->
      <img
        v-if="showImage"
        :src="imageSrc"
        :alt="title"
        class="image"
        @error="handleImageError"
      />

      <!-- Case 2: broken image fallback -->
      <div
        v-else-if="showBrokenFallback"
        class="broken-fallback"
        :style="{
          borderColor: innerBorderColor,
          aspectRatio,
        }"
      ></div>

      <!-- Case 3: regular square + plus -->
      <template v-else-if="showRegularIconBlock">
        <div
          class="dashed-square"
          :class="{ visible: hover }"
          :style="{ borderColor: accent }"
        ></div>

        <div
          class="square"
          :style="{
            backgroundColor: squareBgColor,
            borderColor: innerBorderColor,
            transform: hover
              ? 'translate(calc(-50% + 15px), calc(-50% - 15px))'
              : 'translate(-50%, -50%)',
            boxShadow: enableGlow
              ? hover
                ? '0 0 40px ' + squareGlow
                : '0 0 20px ' + squareGlow
              : 'none'
          }"
        >
          <!-- Plus Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 24 24"
            fill="none"
            :stroke="accent"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            :class="{
              spinCW: iconState === 'cw',
              spinCCW: iconState === 'ccw'
            }"
            :style="{ '--plusDur': plusIconDurationMs + 'ms' }"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </div>
      </template>
    </div>

    <!-- Text content -->
    <div
      class="text-content"
      :style="{
        textAlign: centerText ? 'center' : isRTL ? 'right' : 'left',
        transform: hover ? \`translateX(\${shiftX}px)\` : 'translateX(0)',
        transition: \`transform \${textShiftDurationMs}ms ease\`
      }"
    >
      <h3
        class="title"
        :style="{ color: textColorTitle, textShadow: '0 0 8px ' + accent }"
      >
        {{ title }}
      </h3>
      <p
        v-if="description"
        class="description"
        :style="{ color: textColorDescription }"
      >
        {{ description }}
      </p>
    </div>
  </a>
</template>

<style scoped>
.halloween-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 360px;
  border-radius: 16px;
  border: 2px solid transparent;
  padding: 16px;
  box-sizing: border-box;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-color: transparent;
  transition: box-shadow 0.45s ease, transform 0.45s ease;
  cursor: pointer;
  text-decoration: none;
}

.aspect-container {
  position: relative;
  width: 100%;
  border: 2px solid;
  border-radius: 16px;
  display: grid;
  place-items: center;
  overflow: hidden;
  transition: all 0.5s ease;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

/* Empty outlined fallback box for broken image */
.broken-fallback {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid;
  border-radius: 16px;
  background-color: transparent;
}

/* Animated dashed */
.dashed-square {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 50%;
  aspect-ratio: 1 / 1;
  border: 2px dashed;
  border-radius: 16px;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.5s ease;
}
.dashed-square.visible {
  opacity: 1;
}

/* Square + icon area */
.square {
  position: absolute;
  top: 50%;
  left: 50%;
  aspect-ratio: 1 / 1;
  height: 50%;
  border: 1px solid;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  overflow: visible;
}

/* Plus Icon Animation */
@keyframes spinCW {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes spinCCW {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
svg.spinCW {
  animation: spinCW var(--plusDur, 400ms) ease-in-out 1;
}
svg.spinCCW {
  animation: spinCCW var(--plusDur, 400ms) ease-in-out 1;
}

/* Text Styling */
.text-content {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  user-select: none;
  transition: transform 0.3s ease;
  word-break: keep-all;
  overflow-wrap: break-word;
}

.title {
  font-size: 22px;
  font-weight: 600;
  margin: 0;
}

.description {
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  overflow-wrap: break-word;
  word-break: normal;
  line-height: 1.5;
}
</style>
` }
    ],
    dependencies: ``,
    credit: `[AnimateIcons](https://animateicons.vercel.app/)
[Bento Grid](https://ui.aceternity.com/components/bento-grid) by [Aceternity UI](https://ui.aceternity.com/)
[File Upload](https://ui.aceternity.com/components/file-upload) by [Aceternity UI](https://ui.aceternity.com/)
[Vercel app border hover effect](https://codepen.io/Juxtopposed/pen/xxQNozB) by [Juxtopposed](https://codepen.io/Juxtopposed)`,
    previewType: 'image',
    imageLink: '/previews/halloween-submit-card.webp'
  },
  {
    name: 'Holographic Card',
    route: 'holographic-card',
    description: 'An interactive card with a holographic gradient, animated electric border, and mouse‑reactive tilt effect.',
    usage: `<template>
  <div class="demo-wrapper">
    <div class="cards-stack">
      <!-- Standard Card -->
      <HolographicCard
        :width="316"
        :height="448"
        image-src="https://github.com/Northstrix/my-portfolio/blob/main/public/fourth-playground-card-image.jpg?raw=true"
        top-text="旅"
        bottom-text="創世"
      />

      <!-- Customized Card -->
      <HolographicCard
        id="card-2"
        :width="316"
        :height="448"
        image-src="https://github.com/Northstrix/my-portfolio/blob/main/public/playground-card-image.webp?raw=true"
        top-text="洪秀全"
        bottom-text="洪秀全"
        top-text-letter-spacing="0.375rem"
        bottom-text-letter-spacing="0.375rem"
        :max-image-width-pct="0.64"
        top-text-color="#8E5BEE"
        bottom-text-color="#8E5BEE"
        electric-color="#8E5BEE"
        hover-electric-color="#E95FF6"
        background-color="#fff"
        :pattern-size="12.06"
        :pattern-dot-size="1.75"
      />

      <!-- RTL & Horizontal Text Card -->
      <HolographicCard
        id="card-3"
        :width="316"
        :height="448"
        image-src="https://github.com/Northstrix/my-portfolio/blob/main/public/third-playground-card-image.png?raw=true"
        top-text="נמר"
        bottom-text="Namer"
        top-text-letter-spacing="0.0175rem"
        bottom-text-letter-spacing="0.0175rem"
        text-overlay-padding="1.125rem 1.375rem"
        :max-image-width-pct="0.54"
        top-text-color="#5F73FB"
        bottom-text-color="#5F73FB"
        electric-color="#5F73FB"
        hover-electric-color="#5FA4FB"
        :top-text-vertical="false"
        :bottom-text-vertical="false"
        :mirror-bottom-text="false"
        isRTL
      />
    </div>
  </div>
</template>

<script setup>
import HolographicCard from './HolographicCard.vue';
</script>

<style scoped>
.demo-wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: #050505;
  display: flex;
  justify-content: center;
  padding: 80px 0;
}

.cards-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px; /* Large gap between cards vertically */
  padding: 0;
}
</style>

// Note: The HolographicCard component accepts the following props:
// - id: string (optional) - Unique identifier for the card instance (default: "holo-card").
// - width: number (optional) - Width of the card in pixels (default: 320).
// - height: number (optional) - Height of the card in pixels (default: 480).
// - imageSrc: string (required) - URL of the primary background image.
// - hoverImageSrc: string (optional) - URL of the image revealed on hover.
// - hoverImageEase: string (optional) - CSS transition timing for the hover image reveal (default: "0.3s").
// - topText: [String, Object] (optional) - Content to display at the top of the card.
// - bottomText: [String, Object] (optional) - Content to display at the bottom of the card.
// - mirrorBottomText: boolean (optional) - Whether to flip the bottom text 180 degrees (default: true).
// - isRTL: boolean (optional) - Enables right-to-left text alignment (default: false).
// - textOverlayPadding: string (optional) - Padding for the text overlays (default: "1.375rem 1.325rem").
// - topTextVertical: boolean (optional) - Whether top text flows vertically (default: true).
// - topTextWeight: number|string (optional) - Font weight for top text (default: 700).
// - topTextFontSize: string|number (optional) - Font size for top text (default: "1.5rem").
// - topTextLetterSpacing: string|number (optional) - Letter spacing for top text (default: "0.1em").
// - topTextColor: string (optional) - Base color for top text (default: "#fff").
// - topTextClassName: string (optional) - Custom CSS class for the top text container.
// - bottomTextVertical: boolean (optional) - Whether bottom text flows vertically (default: true).
// - bottomTextWeight: number|string (optional) - Font weight for bottom text (default: 700).
// - bottomTextFontSize: string|number (optional) - Font size for bottom text (default: "1.5rem").
// - bottomTextLetterSpacing: string|number (optional) - Letter spacing for bottom text (default: "0.1em").
// - bottomTextColor: string (optional) - Base color for bottom text (default: "#fff").
// - bottomTextClassName: string (optional) - Custom CSS class for the bottom text container.
// - borderRadius: number (optional) - Border radius of the card body (default: 24).
// - electricBorderRadius: number (optional) - Radius for the electric border path; defaults to borderRadius if not set.
// - backgroundColor: string (optional) - Background color of the card body (default: "#000").
// - imageOpacity: number (optional) - Opacity of the background images (default: 0.9).
// - maxImageWidthPct: number (optional) - Maximum width of the image as a percentage (0-1) (default: 1).
// - patternColor: string (optional) - Color of the dot pattern overlay (default: "#000").
// - patternOpacity: number (optional) - Opacity of the dot pattern (default: 0.15).
// - patternSize: number (optional) - Spacing between dots in the pattern (default: 3).
// - patternDotSize: number (optional) - Size of the individual dots (default: 1).
// - enableElectric: boolean (optional) - Enables the animated electric border (default: true).
// - electricColor: string (optional) - Primary color of the electric border (default: "#FBE75F").
// - hoverElectricColor: string (optional) - Color the border transitions to on hover.
// - electricColorEase: string (optional) - Duration in seconds for color transitions (default: "0.3s").
// - electricWidth: number (optional) - Stroke width of the electric line (default: 4).
// - electricBlur: number (optional) - Shadow blur intensity for the glow (default: 15).
// - electricSpeed: number (optional) - Speed of the noise animation (default: 5.2).
// - electricFrequency: number (optional) - Frequency of the noise waves (default: 12.5).
// - electricAmplitude: number (optional) - Height of the noise waves (default: 0.016).
// - electricNoiseIntensity: number (optional) - Chaos/displacement of the border (default: 60).
// - electricOffset: number (optional) - Distance of the border from the card edge (default: 0).
// - enableHologram: boolean (optional) - Enables the mouse-following holographic gradient (default: true).
// - hologramOpacity: number (optional) - Opacity of the hologram layer (default: 0.4).
// - holographicGradient: string (optional) - CSS gradient string for the hologram (default: "linear-gradient(135deg, transparent 35%, rgba(255,0,128,0.4) 45%, rgba(0,255,255,0.4) 55%, transparent 65%)").
// - enableTilt: boolean (optional) - Enables 3D tilt interaction (default: true).
// - className: string (optional) - Custom CSS class for the outer wrapper.
//
// Emits: None.
//
// Slots:
// - topText: Overrides the topText prop content.
// - bottomText: Overrides the bottomText prop content.
`,
    code: [
      {
        filename: 'HolographicCard.vue',
        content: `<template>
  <div
    ref="wrapperRef"
    class="holo-card-wrapper"
    :class="className"
    :style="wrapperStyle"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @mouseenter="handleMouseEnter"
  >
    <div ref="containerRef" class="holo-container" :style="containerStyle">
      <!-- Electric Border Canvas -->
      <div v-if="enableElectric" class="electric-canvas-container" :style="electricContainerStyle">
        <canvas ref="canvasRef" class="electric-canvas" />
      </div>

      <!-- Card Body -->
      <div class="holo-card-body" :style="cardBodyStyle">
        <!-- Dot Pattern -->
        <div class="holo-pattern" :style="patternStyle" />

        <!-- Base Background Image -->
        <div class="image-layer" :style="{ opacity: imageOpacity }">
          <img :src="imageSrc" alt="" draggable="false" :style="imageElementStyle" />
        </div>

        <!-- Hover Reveal Image -->
        <div v-if="hoverImageSrc" class="image-layer hover-layer" :style="hoverLayerStyle">
          <img :src="hoverImageSrc" alt="" draggable="false" :style="imageElementStyle" />
        </div>

        <!-- Holographic Shine Overlay -->
        <div v-if="enableHologram" class="holo-overlay" :style="hologramStyle" />

        <!-- Text Overlays -->
        <div class="text-content-layer">
          <!-- Top Text -->
          <div v-if="topText || $slots.topText" :class="topTextClassName" :style="topTextStyle">
            <slot name="topText">{{ topText }}</slot>
          </div>

          <!-- Bottom Text -->
          <div v-if="bottomText || $slots.bottomText" :class="bottomTextClassName" :style="bottomTextContainerStyle">
            <div :style="bottomTextStyle">
              <slot name="bottomText">{{ bottomText }}</slot>
            </div>
          </div>
        </div>
      </div>

      <!-- Glare Layer -->
      <div class="glare-layer" :style="glareStyle" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, reactive } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  id: { type: String, default: 'holo-card' },
  width: { type: Number, default: 320 },
  height: { type: Number, default: 480 },
  imageSrc: { type: String, required: true },
  hoverImageSrc: String,
  hoverImageEase: { type: String, default: "0.3s" },
  topText: [String, Object],
  bottomText: [String, Object],
  mirrorBottomText: { type: Boolean, default: true },
  isRTL: { type: Boolean, default: false },
  textOverlayPadding: { type: String, default: "1.375rem 1.325rem" },
  topTextVertical: { type: Boolean, default: true },
  topTextWeight: { type: [Number, String], default: 700 },
  topTextFontSize: { type: [String, Number], default: "1.5rem" },
  topTextLetterSpacing: { type: [String, Number], default: "0.1em" },
  topTextColor: { type: String, default: "#fff" },
  topTextClassName: { type: String, default: "" },
  bottomTextVertical: { type: Boolean, default: true },
  bottomTextWeight: { type: [Number, String], default: 700 },
  bottomTextFontSize: { type: [String, Number], default: "1.5rem" },
  bottomTextLetterSpacing: { type: [String, Number], default: "0.1em" },
  bottomTextColor: { type: String, default: "#fff" },
  bottomTextClassName: { type: String, default: "" },
  borderRadius: { type: Number, default: 24 },
  electricBorderRadius: Number,
  backgroundColor: { type: String, default: "#000" },
  imageOpacity: { type: Number, default: 0.9 },
  maxImageWidthPct: { type: Number, default: 1 },
  patternColor: { type: String, default: "#000" },
  patternOpacity: { type: Number, default: 0.15 },
  patternSize: { type: Number, default: 3 },
  patternDotSize: { type: Number, default: 1 },
  enableElectric: { type: Boolean, default: true },
  electricColor: { type: String, default: "#FBE75F" },
  hoverElectricColor: String,
  electricColorEase: { type: String, default: "0.3s" },
  electricWidth: { type: Number, default: 4 },
  electricBlur: { type: Number, default: 15 },
  electricSpeed: { type: Number, default: 5.2 },
  electricFrequency: { type: Number, default: 12.5 },
  electricAmplitude: { type: Number, default: 0.016 },
  electricNoiseIntensity: { type: Number, default: 60 },
  electricOffset: { type: Number, default: 0 },
  enableHologram: { type: Boolean, default: true },
  hologramOpacity: { type: Number, default: 0.4 },
  holographicGradient: { type: String, default: "linear-gradient(135deg, transparent 35%, rgba(255,0,128,0.4) 45%, rgba(0,255,255,0.4) 55%, transparent 65%)" },
  enableTilt: { type: Boolean, default: true },
  className: { type: String, default: "" }
});

const canvasRef = ref(null);
const containerRef = ref(null);
const wrapperRef = ref(null);
const isHovered = ref(false);

const mouse = reactive({ x: 0, y: 0 }); // -0.5 to 0.5
const tilt = reactive({ x: 0, y: 0 });
// Proxied object for GSAP to animate string colors
const colorState = reactive({ current: props.electricColor });

// Math Utilities
const random = (x) => (Math.sin(x * 12.9898) * 43758.5453) % 1;
const noise2D = (x, y) => {
  const i = Math.floor(x), j = Math.floor(y);
  const fx = x - i, fy = y - j;
  const a = random(i + j * 57), b = random(i + 1 + j * 57);
  const c = random(i + (j + 1) * 57), d = random(i + 1 + (j + 1) * 57);
  const ux = fx * fx * (3.0 - 2.0 * fx), uy = fy * fy * (3.0 - 2.0 * fy);
  return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
};
const octavedNoise = (x, time, seed, cfg) => {
  let y = 0, amp = cfg.amplitude, freq = cfg.frequency;
  for (let i = 0; i < cfg.octaves; i++) {
    y += amp * noise2D(freq * x + seed * 100, time * freq * 0.3);
    freq *= cfg.lacunarity; amp *= cfg.gain;
  }
  return y;
};

// Computed Styles
const wrapperStyle = computed(() => ({ 
  width: \`\${props.width}px\`, 
  height: \`\${props.height}px\` 
}));

const containerStyle = computed(() => ({ 
  transform: \`rotateX(\${tilt.y}deg) rotateY(\${tilt.x}deg)\`, 
  transformStyle: 'preserve-3d' 
}));

const cardBodyStyle = computed(() => ({ 
  backgroundColor: props.backgroundColor, 
  borderRadius: \`\${props.borderRadius}px\` 
}));

const patternStyle = computed(() => ({ 
  opacity: props.patternOpacity, 
  backgroundImage: \`radial-gradient(circle, \${props.patternColor} \${props.patternDotSize}px, transparent \${props.patternDotSize}px)\`, 
  backgroundSize: \`\${props.patternSize}px \${props.patternSize}px\` 
}));

const imageElementStyle = computed(() => ({ 
  width: \`\${props.maxImageWidthPct * 100}%\` 
}));

const hoverLayerStyle = computed(() => ({ 
  opacity: isHovered.value ? props.imageOpacity : 0, 
  transition: \`opacity \${props.hoverImageEase} ease\` 
}));

const hologramStyle = computed(() => ({ 
  background: props.holographicGradient, 
  backgroundSize: '200% 200%', 
  backgroundPosition: \`\${(mouse.x + 0.5) * 100}% \${(mouse.y + 0.5) * 100}%\`, 
  opacity: props.hologramOpacity 
}));

const glareStyle = computed(() => ({ 
  borderRadius: \`\${props.borderRadius}px\`, 
  background: \`radial-gradient(circle at \${(mouse.x + 0.5) * 100}% \${(mouse.y + 0.5) * 100}%, rgba(255,255,255,0.2) 0%, transparent 60%)\` 
}));

const electricContainerStyle = computed(() => ({ 
  width: \`\${props.width + props.electricNoiseIntensity * 3}px\`, 
  height: \`\${props.height + props.electricNoiseIntensity * 3}px\` 
}));

const topTextStyle = computed(() => ({
  position: 'absolute', top: 0, [props.isRTL ? 'right' : 'left']: 0, padding: props.textOverlayPadding,
  color: isHovered.value && props.hoverElectricColor ? props.hoverElectricColor : (isHovered.value ? props.electricColor : props.topTextColor),
  fontWeight: props.topTextWeight, fontSize: typeof props.topTextFontSize === 'number' ? \`\${props.topTextFontSize}px\` : props.topTextFontSize,
  letterSpacing: typeof props.topTextLetterSpacing === 'number' ? \`\${props.topTextLetterSpacing}px\` : props.topTextLetterSpacing,
  writingMode: props.topTextVertical ? 'vertical-rl' : 'horizontal-tb', 
  textOrientation: props.topTextVertical ? 'mixed' : undefined,
  textShadow: isHovered.value ? \`0 0 15px \${props.hoverElectricColor || props.electricColor}\` : "none", transition: "all 0.3s ease"
}));

const bottomTextContainerStyle = computed(() => ({
  position: 'absolute', bottom: 0, left: 0, right: 0, padding: props.textOverlayPadding, display: 'flex',
  justifyContent: (props.isRTL !== props.mirrorBottomText) ? "flex-start" : "flex-end", 
  transform: props.mirrorBottomText ? "scale(-1, -1)" : "none"
}));

const bottomTextStyle = computed(() => ({
  color: isHovered.value && props.hoverElectricColor ? props.hoverElectricColor : (isHovered.value ? props.electricColor : props.bottomTextColor),
  fontWeight: props.bottomTextWeight, fontSize: typeof props.bottomTextFontSize === 'number' ? \`\${props.bottomTextFontSize}px\` : props.bottomTextFontSize,
  letterSpacing: typeof props.bottomTextLetterSpacing === 'number' ? \`\${props.bottomTextLetterSpacing}px\` : props.bottomTextLetterSpacing,
  writingMode: props.bottomTextVertical ? 'vertical-rl' : 'horizontal-tb', 
  textOrientation: props.bottomTextVertical ? 'mixed' : undefined,
  textShadow: isHovered.value ? \`0 0 15px \${props.hoverElectricColor || props.electricColor}\` : "none", transition: "all 0.3s ease"
}));

// Interaction Methods
const handleMouseMove = (e) => {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  mouse.x = (e.clientX - rect.left) / rect.width - 0.5;
  mouse.y = (e.clientY - rect.top) / rect.height - 0.5;
  
  if (props.enableTilt) {
    gsap.to(tilt, { x: mouse.x * 20, y: -mouse.y * 20, duration: 0.3, ease: "power2.out" });
  }
};

const handleMouseEnter = () => (isHovered.value = true);

const handleMouseLeave = () => {
  isHovered.value = false;
  mouse.x = 0;
  mouse.y = 0;
  gsap.to(tilt, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.6)" });
};

// Color Watcher
watch(isHovered, (hovered) => {
  const target = hovered && props.hoverElectricColor ? props.hoverElectricColor : props.electricColor;
  gsap.to(colorState, { 
    current: target, 
    duration: parseFloat(props.electricColorEase) || 0.3 
  });
});

// Canvas Animation Loop
let animationId = 0;
onMounted(() => {
  if (!props.enableElectric || !canvasRef.value) return;
  const ctx = canvasRef.value.getContext("2d");
  let time = 0, lastFrame = 0;
  const noiseCfg = { octaves: 8, lacunarity: 1.2, gain: 0.5, amplitude: props.electricAmplitude, frequency: props.electricFrequency };

  const draw = (currentTime) => {
    const dt = (currentTime - lastFrame) / 1000;
    lastFrame = currentTime; 
    time += dt * props.electricSpeed;

    const canvas = canvasRef.value;
    if (!canvas) return;

    const pad = props.electricNoiseIntensity * 3;
    canvas.width = props.width + pad; 
    canvas.height = props.height + pad;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = colorState.current; 
    ctx.lineWidth = props.electricWidth;
    ctx.lineCap = "round"; 
    ctx.lineJoin = "round"; 
    ctx.shadowBlur = props.electricBlur; 
    ctx.shadowColor = colorState.current;

    const cx = canvas.width / 2, cy = canvas.height / 2;
    const w = props.width + props.electricOffset * 2, h = props.height + props.electricOffset * 2;
    const left = cx - w / 2, top = cy - h / 2;
    const r = Math.max(0, props.electricBorderRadius ?? props.borderRadius);
    const sW = w - 2 * r, sH = h - 2 * r, cA = (Math.PI * r) / 2;
    const totalP = 2 * sW + 2 * sH + 4 * cA, steps = Math.floor(totalP / 2);

    const getPoint = (t) => {
      let d = t * totalP, acc = 0;
      if (d <= (acc += sW)) return { x: left + r + d, y: top };
      if (d <= (acc += cA)) { 
        const p = (d - (acc - cA)) / cA, a = -Math.PI / 2 + p * (Math.PI / 2); 
        return { x: left + w - r + r * Math.cos(a), y: top + r + r * Math.sin(a) }; 
      }
      if (d <= (acc += sH)) return { x: left + w, y: top + r + (d - (acc - sH)) };
      if (d <= (acc += cA)) { 
        const p = (d - (acc - cA)) / cA, a = 0 + p * (Math.PI / 2); 
        return { x: left + w - r + r * Math.cos(a), y: top + h - r + r * Math.sin(a) }; 
      }
      if (d <= (acc += sW)) return { x: left + w - r - (d - (acc - sW)), y: top + h };
      if (d <= (acc += cA)) { 
        const p = (d - (acc - cA)) / cA, a = Math.PI / 2 + p * (Math.PI / 2); 
        return { x: left + r + r * Math.cos(a), y: top + h - r + r * Math.sin(a) }; 
      }
      if (d <= (acc += sH)) return { x: left, y: top + h - r - (d - (acc - sH)) };
      const p = (d - acc) / cA, a = Math.PI + p * (Math.PI / 2); 
      return { x: left + r + r * Math.cos(a), y: top + r + r * Math.sin(a) };
    };

    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const t = i / steps, p = getPoint(t);
      const nX = octavedNoise(t * 10, time, 0, noiseCfg), nY = octavedNoise(t * 10, time, 1, noiseCfg);
      const dx = p.x + nX * props.electricNoiseIntensity, dy = p.y + nY * props.electricNoiseIntensity;
      if (i === 0) ctx.moveTo(dx, dy); else ctx.lineTo(dx, dy);
    }
    ctx.closePath(); 
    ctx.stroke();
    animationId = requestAnimationFrame(draw);
  };
  animationId = requestAnimationFrame(draw);
});

onUnmounted(() => cancelAnimationFrame(animationId));
</script>

<style scoped>
.holo-card-wrapper {
  position: relative;
  perspective: 1200px;
  user-select: none;
}
.holo-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.electric-canvas-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) translateZ(1px);
  pointer-events: none;
  z-index: 50;
}
.electric-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
.holo-card-body {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 40px -10px rgba(0,0,0,0.8);
}
.holo-pattern {
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
}
.image-layer {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-layer img {
  height: auto;
  max-height: 100%;
  object-fit: cover;
}
.hover-layer {
  z-index: 5;
}
.holo-overlay {
  position: absolute;
  inset: 0;
  z-index: 20;
  pointer-events: none;
  mix-blend-mode: color-dodge;
}
.text-content-layer {
  position: absolute;
  inset: 0;
  z-index: 30;
  pointer-events: none;
}
.glare-layer {
  position: absolute;
  inset: 0;
  z-index: 40;
  pointer-events: none;
  mix-blend-mode: overlay;
}
</style>` }
    ],
    credit: `[Electric Border](https://codepen.io/BalintFerenczy/pen/KwdoyEN) by [Bálint Ferenczy](https://codepen.io/BalintFerenczy)
[Electric Border (iOS Safe)](https://codepen.io/BalintFerenczy/pen/yyYErXa) by [Bálint Ferenczy](https://codepen.io/BalintFerenczy)`,
    previewType: 'image',
    imageLink: "/previews/holographic-card.webp"
  },
];