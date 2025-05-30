<script setup lang="ts">
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
  '--left-col': `${leftColRatio}fr`,
  '--right-col1': `${(1 - leftColRatio) * rightCol1Frac}fr`,
  '--right-col2': `${(1 - leftColRatio) * rightCol2Frac}fr`,
  '--top-row': `${topRowRatio}fr`,
  '--bottom-row': `${bottomRowRatio}fr`,
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
    border: `${borderWidth} solid ${borderColor}`,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
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
