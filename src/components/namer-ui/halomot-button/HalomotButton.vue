<template>
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
