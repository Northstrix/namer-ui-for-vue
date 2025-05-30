import { computed, defineProps } from 'vue';
const props = defineProps();
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
}));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['chronicleButton']} */ ;
/** @type {__VLS_StyleScopedClasses['chronicleButton-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['chronicleButton-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['chronicleButton-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['chronicleButton']} */ ;
/** @type {__VLS_StyleScopedClasses['chronicleButton-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['chronicleButton-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['chronicleButton']} */ ;
/** @type {__VLS_StyleScopedClasses['outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['chronicleButton-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['chronicleButton']} */ ;
/** @type {__VLS_StyleScopedClasses['outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['chronicleButton-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['chronicleButton']} */ ;
/** @type {__VLS_StyleScopedClasses['outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['chronicleButton']} */ ;
/** @type {__VLS_StyleScopedClasses['outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['chronicleButton']} */ ;
/** @type {__VLS_StyleScopedClasses['outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['chronicleButton']} */ ;
/** @type {__VLS_StyleScopedClasses['outlined']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.onClick) },
    ...{ class: "chronicleButton" },
    ...{ class: ({ outlined: __VLS_ctx.outlined }) },
    ...{ style: (__VLS_ctx.buttonStyle) },
});
if (!__VLS_ctx.outlined) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "chronicleButton-inner" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.em, __VLS_intrinsicElements.em)({});
    (__VLS_ctx.text);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.em, __VLS_intrinsicElements.em)({});
    (__VLS_ctx.text);
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "chronicleButton-outlined-inner" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.em, __VLS_intrinsicElements.em)({});
    (__VLS_ctx.text);
}
/** @type {__VLS_StyleScopedClasses['chronicleButton']} */ ;
/** @type {__VLS_StyleScopedClasses['outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['chronicleButton-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['chronicleButton-outlined-inner']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            buttonStyle: buttonStyle,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=ChronicleButton.vue.js.map