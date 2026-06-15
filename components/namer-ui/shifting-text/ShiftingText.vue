<template>
  <div :dir="direction" :class="stageClassName" :style="stageStyle">
    <div
      :dir="direction"
      :class="className"
      ref="root"
      :style="{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily,
        fontSize,
        fontWeight,
        letterSpacing,
        lineHeight: lineHeightValue,
        direction,
        ...textStyle
      }"
    >
      <div
        v-if="showBackFont"
        aria-hidden="true"
        :style="{
          position: 'relative',
          zIndex: ghostZ,
          display: 'flex',
          opacity: backFontOpacity,
          userSelect: 'none',
          pointerEvents: 'none',
          direction,
          ...ghostStyle
        }"
      >
        <span
          v-for="(ch, i) in chars"
          :key="`ghost-${i}`"
          :style="{
            display: 'inline-block',
            whiteSpace: 'pre',
            color: pick(backColors, i),
            textShadow: pick(backShadows, i),
            WebkitTextStroke: `${backStrokeWidth}px ${pick(backStrokes, i)}`
          }"
        >
          {{ ch === " " ? "\u00a0" : ch }}
        </span>
      </div>

      <div
        v-if="showLive"
        aria-hidden="true"
        :style="{
          position: 'absolute',
          inset: 0,
          zIndex: liveZ,
          display: 'flex',
          pointerEvents: 'none',
          direction,
          ...liveStyle
        }"
      >
        <span
          v-for="(ch, i) in chars"
          :key="`live-${i}`"
          :ref="(el) => setCharRef(el, i)"
          :style="{
            display: 'inline-block',
            whiteSpace: 'pre',
            willChange: 'transform, opacity',
            opacity: liveVisibleAtHome ? 1 : 0,
            transform: 'translateY(0px)',
            color: pick(frontColors, i),
            textShadow: pick(frontShadows, i),
            WebkitTextStroke: `${frontStrokeWidth}px ${pick(frontStrokes, i)}`
          }"
        >
          {{ ch === " " ? "\u00a0" : ch }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

type EasingName = "out" | "in" | "inOut" | "outBack" | "bounce";
type ColorInput = string | string[];
type Direction = "ltr" | "rtl";
type SplitMode = "char" | "word" | "grapheme";

type ShiftingTextProps = {
  text?: string;
  className?: string;
  stageClassName?: string;
  direction?: Direction;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: number | string;
  letterSpacing?: string;
  lineHeight?: string | number;
  backFontOpacity?: number;
  showBackFont?: boolean;
  showLive?: boolean;
  liveOnTop?: boolean;
  liveVisibleAtHome?: boolean;
  intensity?: number;
  amplitude?: number;
  centerOffset?: number;
  pace?: number;
  enter?: number;
  hold?: number;
  exit?: number;
  pause?: number;
  easingIn?: EasingName;
  easingOut?: EasingName;
  loop?: boolean;
  splitBy?: SplitMode;
  frontColor?: ColorInput;
  backColor?: ColorInput;
  frontShadow?: ColorInput;
  backShadow?: ColorInput;
  frontStroke?: ColorInput;
  backStroke?: ColorInput;
  frontStrokeWidth?: number;
  backStrokeWidth?: number;
  stageStyle?: Record<string, string | number>;
  textStyle?: Record<string, string | number>;
  ghostStyle?: Record<string, string | number>;
  liveStyle?: Record<string, string | number>;
};

const props = withDefaults(defineProps<ShiftingTextProps>(), {
  text: "Namer UI",
  className: "",
  stageClassName: "",
  direction: "ltr",
  fontFamily: "'Recursive', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontSize: "clamp(52px, 10vw, 116px)",
  fontWeight: 600,
  letterSpacing: "-0.02em",
  lineHeight: 1,
  backFontOpacity: 0.2,
  showBackFont: true,
  showLive: true,
  liveOnTop: true,
  liveVisibleAtHome: true,
  intensity: 0.64,
  amplitude: 32,
  centerOffset: 22,
  pace: 5,
  enter: 40,
  hold: 40,
  exit: 36,
  pause: 44,
  easingIn: "out",
  easingOut: "in",
  loop: true,
  splitBy: "grapheme",
  frontColor: () => ["#fff", "#00a7fa"],
  backColor: () => ["#aaa"],
  frontShadow: () => "none",
  backShadow: () => "none",
  frontStroke: () => "transparent",
  backStroke: () => "transparent",
  frontStrokeWidth: 0,
  backStrokeWidth: 0,
  stageStyle: () => ({}),
  textStyle: () => ({}),
  ghostStyle: () => ({}),
  liveStyle: () => ({}),
});

const chars = computed(() => splitText(props.text, props.splitBy));
const liveRefs = ref<(HTMLSpanElement | null)[]>([]);
const frame = ref(0);
let raf = 0;

const ease: Record<EasingName, (t: number) => number> = {
  out: (t) => 1 - (1 - t) ** 3,
  in: (t) => t ** 3,
  inOut: (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2),
  outBack: (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
  },
  bounce: (t) => {
    const n = 7.5625;
    const d = 2.75;
    if (t < 1 / d) return n * t * t;
    if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75;
    if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375;
    return n * (t -= 2.625 / d) * t + 0.984375;
  }
};

function splitText(text: string, splitBy: SplitMode): string[] {
  if (splitBy === "word") return text.split(/(\s+)/).filter(Boolean);
  if (splitBy === "char") return Array.from(text);
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(seg.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

function normalizeColorSet(value: ColorInput | undefined, fallback: string[]): string[] {
  if (Array.isArray(value)) return value.length ? value : fallback;
  return value ? [value] : fallback;
}

function pick(arr: string[], index: number): string {
  return arr[index % arr.length];
}

function cyc(
  f: number,
  offset: number,
  enter: number,
  hold: number,
  exit: number,
  pause: number,
  eIn: (t: number) => number,
  eOut: (t: number) => number
): number {
  if (f < offset) return 0;
  const total = enter + hold + exit + pause;
  const t = (f - offset) % total;
  if (t < enter) return eIn(t / enter);
  if (t < enter + hold) return 1;
  if (t < enter + hold + exit) return 1 - eOut((t - enter - hold) / exit);
  return 0;
}

const frontColors = computed(() => normalizeColorSet(props.frontColor, ["#fff", "#00a7fa"]));
const backColors = computed(() => normalizeColorSet(props.backColor, ["#aaa"]));
const frontShadows = computed(() => normalizeColorSet(props.frontShadow, ["none"]));
const backShadows = computed(() => normalizeColorSet(props.backShadow, ["none"]));
const frontStrokes = computed(() => normalizeColorSet(props.frontStroke, ["transparent"]));
const backStrokes = computed(() => normalizeColorSet(props.backStroke, ["transparent"]));

const lineHeightValue = computed(() =>
  typeof props.lineHeight === "number" ? String(props.lineHeight) : props.lineHeight
);

const liveZ = computed(() => (props.liveOnTop ? 2 : 0));
const ghostZ = computed(() => (props.liveOnTop ? 1 : 2));

function setCharRef(el: Element | null, i: number) {
  liveRefs.value[i] = el as HTMLSpanElement | null;
}

function tick() {
  const N = chars.value.length;
  const center = (N - 1) / 2;
  const eIn = ease[props.easingIn];
  const eOut = ease[props.easingOut];

  chars.value.forEach((_, i) => {
    const el = liveRefs.value[i];
    if (!el) return;

    const phase = cyc(
      frame.value,
      i * props.pace,
      props.enter,
      props.hold,
      props.exit,
      props.pause,
      eIn,
      eOut
    );

    const dist = (Math.abs(i - center) * props.amplitude + props.centerOffset) * props.intensity;
    const dir = i % 2 === 0 ? -1 : 1;

    el.style.transform = `translateY(${dir * dist * phase}px)`;
    el.style.opacity = `${props.liveVisibleAtHome ? 1 : phase}`;
  });

  frame.value += 1;
  if (props.loop) raf = requestAnimationFrame(tick);
}

onMounted(() => {
  raf = requestAnimationFrame(tick);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
});

watch(
  () => [props.text, props.splitBy],
  () => {
    frame.value = 0;
    liveRefs.value = [];
  }
);
</script>

<style scoped>
/* Scoped only; animation and sizing are inline so outside CSS does not bleed in. */
</style>