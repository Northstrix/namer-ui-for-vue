<script setup lang="ts">
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
  aspectBgColor: { type: String, default: "#111" },
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
  imageSrc: { type: String, default: "" }
});

const hover = ref(false);
const iconState = ref<"idle" | "spinningCW" | "spinningCCW">("idle");

const shiftX = computed(() => {
  let px = parseInt(props.textShiftDistance);
  if (isNaN(px)) px = 6;
  return props.isRTL ? -px : px;
});

const isExternal = computed(() => /^https?:\/\//i.test(props.link));

watch(hover, (value) => {
  iconState.value = value ? "spinningCW" : "spinningCCW";
});
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
      transition: `border-color ${otherDurationMs}ms ease`
    }"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <!-- Image mode -->
    <div
      v-if="imageSrc"
      class="aspect-ratio-container"
      :style="{
        aspectRatio,
        backgroundColor: aspectBgColor,
        border: borderWidthInner + ' solid ' + innerAreaBorderColor,
        borderRadius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
        position: 'relative',
        transition: `all ${otherDurationMs}ms ease`
      }"
    >
      <img
        :src="imageSrc"
        alt=""
        :style="{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: borderRadius
        }"
      />
    </div>

    <!-- Regular mode -->
    <div
      v-else
      class="aspect-ratio-container"
      :style="{
        aspectRatio,
        backgroundColor: aspectBgColor,
        border: borderWidthInner + ' solid ' + innerAreaBorderColor,
        borderRadius,
        display: 'grid',
        placeItems: 'center',
        overflow: 'visible',
        transform: isRTL ? 'scaleX(-1)' : 'none',
        width: '100%',
        position: 'relative',
        transition: `all ${otherDurationMs}ms ease`
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
          transition: `opacity ${otherDurationMs}ms ease`,
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
          transition: `transform ${otherDurationMs}ms ease`,
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
        transition: `transform ${textShiftDurationMs}ms ease`,
        transform: hover ? `translateX(${shiftX}px)` : 'translateX(0)'
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
