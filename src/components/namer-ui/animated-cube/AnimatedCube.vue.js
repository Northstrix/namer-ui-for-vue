import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    size: 80,
    scale: 1,
    faceColor: '#a19fe5',
    shadowColor: '#000',
    borderColor: '#222',
    animationDuration: 2,
});
const cubeSize = computed(() => props.size * props.scale);
const faces = [
    { class: 'shadow', isShadow: true },
    { class: 'top' },
    { class: 'front' },
    { class: 'back' },
    { class: 'right' },
    { class: 'left' },
];
// Dynamic CSS vars for transforms
const cssVars = computed(() => ({
    '--cube-size': `${props.size}px`,
    '--cube-half': `${props.size / 2}px`,
    '--cube-full': `${props.size}px`,
    '--cube-neg-full': `-${props.size}px`,
    '--cube-rotate-duration': `${props.animationDuration}s`,
    '--cube-bounce-duration': `${props.animationDuration}s`,
}));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    size: 80,
    scale: 1,
    faceColor: '#a19fe5',
    shadowColor: '#000',
    borderColor: '#222',
    animationDuration: 2,
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['cube-face']} */ ;
/** @type {__VLS_StyleScopedClasses['cube-face']} */ ;
/** @type {__VLS_StyleScopedClasses['cube-face']} */ ;
/** @type {__VLS_StyleScopedClasses['cube-face']} */ ;
/** @type {__VLS_StyleScopedClasses['cube-face']} */ ;
/** @type {__VLS_StyleScopedClasses['cube-face']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "scene" },
    ...{ style: ({
            width: __VLS_ctx.cubeSize + 'px',
            height: __VLS_ctx.cubeSize + 'px',
            transform: `scale(${props.scale})`,
            ...__VLS_ctx.cssVars
        }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "cube-wrapper" },
    ...{ style: ({ animationDuration: props.animationDuration + 's' }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "cube" },
    ...{ style: ({ animationDuration: props.animationDuration + 's' }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "cube-faces" },
    ...{ style: ({ width: props.size + 'px', height: props.size + 'px', }) },
});
for (const [face] of __VLS_getVForSourceType((__VLS_ctx.faces))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
        key: (face.class),
        ...{ class: "cube-face" },
        ...{ class: (face.class) },
        ...{ style: ({
                width: props.size + 'px',
                height: props.size + 'px',
                background: face.isShadow ? props.shadowColor : props.faceColor,
                border: `solid 1px ${props.borderColor}`,
                animationDuration: props.animationDuration + 's'
            }) },
    });
}
/** @type {__VLS_StyleScopedClasses['scene']} */ ;
/** @type {__VLS_StyleScopedClasses['cube-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['cube']} */ ;
/** @type {__VLS_StyleScopedClasses['cube-faces']} */ ;
/** @type {__VLS_StyleScopedClasses['cube-face']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            cubeSize: cubeSize,
            faces: faces,
            cssVars: cssVars,
        };
    },
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=AnimatedCube.vue.js.map