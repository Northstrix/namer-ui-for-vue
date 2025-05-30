import { ref, watch, computed } from 'vue';
const props = defineProps();
const isOn = ref(props.defaultState);
watch(() => props.defaultState, (val) => {
    isOn.value = val;
});
function handleToggle() {
    isOn.value = !isOn.value;
    props.onChange(isOn.value);
}
const wrapperStyle = computed(() => ({
    transform: props.mirrored ? 'scaleX(-1)' : 'none',
}));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['toggle-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-checkbox']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-checkbox']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-checkbox']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-container']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-button']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-button']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-button']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "toggle-wrapper" },
    ...{ style: (__VLS_ctx.wrapperStyle) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onChange: (__VLS_ctx.handleToggle) },
    ...{ class: "toggle-checkbox" },
    type: "checkbox",
    checked: (__VLS_ctx.isOn),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    ...{ class: "toggle-icon off" },
    viewBox: "0 0 16 16",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    d: "M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8Z",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "toggle-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "toggle-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    ...{ class: "toggle-icon on" },
    viewBox: "0 0 16 16",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    d: "M16 8A8 8 0 1 1 0 8a8 8 0 1 1 16 0zM2 8a6 6 0 1 0 12 0A6 6 0 1 0 2 8zm10 0a4 4 0 1 1-8 0 4 4 0 1 1 8 0z",
});
/** @type {__VLS_StyleScopedClasses['toggle-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-checkbox']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['off']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-container']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-button']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['on']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            isOn: isOn,
            handleToggle: handleToggle,
            wrapperStyle: wrapperStyle,
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
//# sourceMappingURL=ShamayimToggleSwitch.vue.js.map