import { ref } from 'vue';
const props = defineProps();
const emit = defineEmits(['update:modelValue']);
const hovered = ref(null);
function setActive(value) {
    if (props.modelValue !== value) {
        emit('update:modelValue', value);
    }
}
function buttonStyle(value) {
    const isActive = props.modelValue === value;
    const isHovered = hovered.value === value;
    let bg;
    if (isActive) {
        bg = props.activeBg ?? '#393643';
    }
    else if (isHovered) {
        bg = props.hoverBg ?? '#23222a';
    }
    else {
        bg = props.inactiveBg ?? 'none';
    }
    return {
        background: bg,
        color: textColor(value),
    };
}
function textColor(value) {
    return props.modelValue === value
        ? props.activeFg ?? '#fff'
        : props.inactiveFg ?? '#aaa';
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "radio-switcher-row" },
});
for (const [option] of __VLS_getVForSourceType((__VLS_ctx.options))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.setActive(option.value);
            } },
        ...{ onMouseenter: (...[$event]) => {
                __VLS_ctx.hovered = option.value;
            } },
        ...{ onMouseleave: (...[$event]) => {
                __VLS_ctx.hovered = null;
            } },
        key: (option.value),
        ...{ class: "radio-btn" },
        ...{ class: ({ active: __VLS_ctx.modelValue === option.value }) },
        type: "button",
        'aria-label': (option.label),
        ...{ style: (__VLS_ctx.buttonStyle(option.value)) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "radio-icon" },
    });
    const __VLS_0 = ((option.icon));
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        color: (__VLS_ctx.textColor(option.value)),
        size: (20),
        strokeWidth: (2),
    }));
    const __VLS_2 = __VLS_1({
        color: (__VLS_ctx.textColor(option.value)),
        size: (20),
        strokeWidth: (2),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "radio-label" },
    });
    (option.label);
}
/** @type {__VLS_StyleScopedClasses['radio-switcher-row']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-label']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            hovered: hovered,
            setActive: setActive,
            buttonStyle: buttonStyle,
            textColor: textColor,
        };
    },
    emits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=RadioButton.vue.js.map