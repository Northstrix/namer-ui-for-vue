import { ref, onMounted, nextTick } from 'vue';
const palette = ['#4776cb', '#a19fe5', '#6cc606'];
const starCount = 3;
const magicStars = ref([]);
const starColors = ref(Array.from({ length: starCount }, () => palette[Math.floor(Math.random() * palette.length)]));
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function animate(star, idx) {
    star.style.setProperty('--star-left', `${rand(-10, 100)}%`);
    star.style.setProperty('--star-top', `${rand(-40, 80)}%`);
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
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['magic-star']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "magic" },
});
for (const [n] of __VLS_getVForSourceType((__VLS_ctx.starCount))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        key: (n),
        ...{ class: "magic-star" },
        ref: "magicStars",
    });
    /** @type {typeof __VLS_ctx.magicStars} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
        viewBox: "0 0 512 512",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
        fill: (__VLS_ctx.starColors[n - 1]),
        d: "M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z",
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "magic-text" },
});
var __VLS_0 = {};
/** @type {__VLS_StyleScopedClasses['magic']} */ ;
/** @type {__VLS_StyleScopedClasses['magic-star']} */ ;
/** @type {__VLS_StyleScopedClasses['magic-text']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            starCount: starCount,
            magicStars: magicStars,
            starColors: starColors,
        };
    },
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=MagicText.vue.js.map