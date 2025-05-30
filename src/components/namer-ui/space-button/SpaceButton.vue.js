import { computed } from 'vue';
const props = defineProps({
    inscription: { type: String, required: true },
    borderRadius: { type: String, default: '0.76em' },
    borderWidth: { type: String, default: '2px' },
    variant: { type: String, default: 'inner' },
    isBold: { type: Boolean, default: true },
    fontSize: { type: String, default: '16px' },
    onClick: { type: Function }
});
const buttonStyle = computed(() => ({
    '--border-radius': props.borderRadius,
    '--border-width': props.borderWidth,
    fontWeight: props.isBold ? 'bold' : 'normal',
    fontFamily: '"Arial", "Alef", sans-serif',
    fontSize: props.fontSize
}));
function handleClick(event) {
    if (props.onClick)
        props.onClick(event);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['spaceButton']} */ ;
/** @type {__VLS_StyleScopedClasses['spaceButton']} */ ;
/** @type {__VLS_StyleScopedClasses['spaceButton']} */ ;
/** @type {__VLS_StyleScopedClasses['spaceButton']} */ ;
/** @type {__VLS_StyleScopedClasses['variant']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleClick) },
    ...{ class: "spaceButton" },
    ...{ class: ({ variant: __VLS_ctx.variant === 'outer' }) },
    ...{ style: (__VLS_ctx.buttonStyle) },
});
(__VLS_ctx.inscription);
/** @type {__VLS_StyleScopedClasses['spaceButton']} */ ;
/** @type {__VLS_StyleScopedClasses['variant']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            buttonStyle: buttonStyle,
            handleClick: handleClick,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
        };
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=SpaceButton.vue.js.map