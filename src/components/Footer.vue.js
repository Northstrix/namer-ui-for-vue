import { ref, onMounted, onUnmounted } from 'vue';
// Responsive text size for footer
const textSize = ref('0.98rem');
function updateTextSize() {
    let base = 0.98; // in rem (16px * 0.98 = 15.68px)
    if (window.innerWidth < 400)
        base -= 4 / 16; // 4px in rem
    else if (window.innerWidth < 480)
        base -= 3 / 16; // 3px in rem
    else if (window.innerWidth < 600)
        base -= 1 / 16; // 1px in rem
    textSize.value = `${base}rem`;
}
onMounted(() => {
    updateTextSize();
    window.addEventListener('resize', updateTextSize);
});
onUnmounted(() => {
    window.removeEventListener('resize', updateTextSize);
});
// Responsive font size for "Namer UI" inscription
const namerUiFontSize = ref('9.2rem');
function calcNamerUiFontSize() {
    const w = window.innerWidth;
    const minW = 200, maxW = 1400;
    const minF = 6, maxF = 8;
    let size;
    if (w <= minW)
        size = minF;
    else if (w >= maxW)
        size = maxF;
    else
        size = minF + ((maxF - minF) * (w - minW)) / (maxW - minW);
    namerUiFontSize.value = `${size}rem`;
}
onMounted(() => {
    calcNamerUiFontSize();
    window.addEventListener('resize', calcNamerUiFontSize);
});
onUnmounted(() => {
    window.removeEventListener('resize', calcNamerUiFontSize);
});
// For SVG hover effect
const hovered = ref(false);
const cursor = ref({ x: 50, y: 50 });
const maskPosition = ref({ cx: '50%', cy: '50%' });
function onMouseMove(e) {
    const svg = e.target;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cursor.value = { x, y };
    maskPosition.value = { cx: `${x}%`, cy: `${y}%` };
}
function onMouseEnter() {
    hovered.value = true;
}
function onMouseLeave() {
    hovered.value = false;
    maskPosition.value = { cx: '50%', cy: '50%' };
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['footer-link']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-link']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-link']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-namer-ui']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({
    ...{ class: "footer-root" },
    ...{ style: ({
            background: '#060507',
            borderTop: '1px solid #2c2934',
            padding: '24px 0 0 0',
            boxSizing: 'border-box'
        }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "content-container footer-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "footer-top" },
    ...{ style: ({ fontSize: __VLS_ctx.textSize }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "https://maxim-bortnikov.netlify.app/",
    target: "_blank",
    rel: "noopener noreferrer",
    ...{ class: "footer-link" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "https://nextjs.org/",
    target: "_blank",
    rel: "noopener noreferrer",
    ...{ class: "footer-link" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "https://www.perplexity.ai/",
    target: "_blank",
    rel: "noopener noreferrer",
    ...{ class: "footer-link" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "footer-namer-ui" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    ...{ onMouseenter: (__VLS_ctx.onMouseEnter) },
    ...{ onMouseleave: (__VLS_ctx.onMouseLeave) },
    ...{ onMousemove: (__VLS_ctx.onMouseMove) },
    width: "100%",
    height: "auto",
    viewBox: "0 0 700 120",
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.defs, __VLS_intrinsicElements.defs)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.linearGradient, __VLS_intrinsicElements.linearGradient)({
    id: "namerUiHighlightGradient",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.stop)({
    offset: "0%",
    'stop-color': "#4776cb",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.stop)({
    offset: "50%",
    'stop-color': "#a19fe5",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.stop)({
    offset: "100%",
    'stop-color': "#6cc606",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.linearGradient, __VLS_intrinsicElements.linearGradient)({
    id: "namerUiGradient",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.stop)({
    offset: "0%",
    'stop-color': "#eab308",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.stop)({
    offset: "25%",
    'stop-color': "#ef4444",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.stop)({
    offset: "50%",
    'stop-color': "#3b82f6",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.stop)({
    offset: "75%",
    'stop-color': "#06b6d4",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.stop)({
    offset: "100%",
    'stop-color': "#8b5cf6",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.radialGradient, __VLS_intrinsicElements.radialGradient)({
    id: "revealMask",
    cx: (__VLS_ctx.maskPosition.cx),
    cy: (__VLS_ctx.maskPosition.cy),
    r: "20%",
    gradientUnits: "userSpaceOnUse",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.stop)({
    offset: "0%",
    'stop-color': "white",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.stop)({
    offset: "100%",
    'stop-color': "black",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.mask, __VLS_intrinsicElements.mask)({
    id: "textMask",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.rect)({
    x: "0",
    y: "0",
    width: "100%",
    height: "100%",
    fill: ('url(#revealMask)'),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.text, __VLS_intrinsicElements.text)({
    x: "50%",
    y: "60%",
    'text-anchor': "middle",
    'dominant-baseline': "middle",
    'stroke-width': "2",
    fill: "transparent",
    stroke: "#33313d",
    'font-size': (__VLS_ctx.namerUiFontSize),
    'font-family': "helvetica, Arial, sans-serif",
    'font-weight': "bold",
    ...{ style: {} },
    opacity: (__VLS_ctx.hovered ? 0.7 : 0),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.text, __VLS_intrinsicElements.text)({
    x: "50%",
    y: "60%",
    'text-anchor': "middle",
    'dominant-baseline': "middle",
    'stroke-width': "1.25",
    fill: "transparent",
    stroke: "#33313d",
    'font-size': (__VLS_ctx.namerUiFontSize),
    'font-family': "helvetica, Arial, sans-serif",
    'font-weight': "bold",
    'stroke-dasharray': (__VLS_ctx.hovered ? 0 : 1000),
    'stroke-dashoffset': (__VLS_ctx.hovered ? 0 : 1000),
    ...{ style: {} },
    opacity: "0.3",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.text, __VLS_intrinsicElements.text)({
    x: "50%",
    y: "60%",
    'text-anchor': "middle",
    'dominant-baseline': "middle",
    stroke: ('url(#namerUiHighlightGradient)'),
    'stroke-width': "1.25",
    fill: "transparent",
    'font-size': (__VLS_ctx.namerUiFontSize),
    'font-family': "helvetica, Arial, sans-serif",
    'font-weight': "bold",
    mask: "url(#textMask)",
    ...{ style: {} },
    opacity: (__VLS_ctx.hovered ? 1 : 0.6),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['footer-root']} */ ;
/** @type {__VLS_StyleScopedClasses['content-container']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-content']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-top']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-link']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-link']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-link']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-namer-ui']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            textSize: textSize,
            namerUiFontSize: namerUiFontSize,
            hovered: hovered,
            maskPosition: maskPosition,
            onMouseMove: onMouseMove,
            onMouseEnter: onMouseEnter,
            onMouseLeave: onMouseLeave,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=Footer.vue.js.map