import { ref, computed, defineProps } from "vue";
const props = defineProps();
const isHovered = ref(false);
const gradient = computed(() => props.gradient ?? "linear-gradient(135deg, #4776cb, #a19fe5, #6cc606)");
const borderWidth = computed(() => props.borderWidth ?? "1px");
const outerBorderRadius = computed(() => props.outerBorderRadius ?? "6.34px");
const innerBorderRadius = computed(() => props.innerBorderRadius ?? "6px");
const backgroundColor = computed(() => props.backgroundColor ?? "#000");
const textColor = computed(() => props.textColor ?? "#fff");
const hoverTextColor = computed(() => props.hoverTextColor ?? textColor.value);
const fillWidth = computed(() => props.fillWidth ?? false);
const padding = computed(() => props.padding
    ? props.padding
    : (fillWidth.value || props.fixedWidth ? "1rem 0" : "1rem 4rem"));
const outerStyle = computed(() => ({
    margin: fillWidth.value || props.fixedWidth ? "0" : "auto",
    padding: borderWidth.value,
    background: gradient.value,
    border: "0",
    borderRadius: outerBorderRadius.value,
    color: textColor.value,
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    userSelect: "none",
    whiteSpace: "nowrap",
    transition: "all .3s",
    width: fillWidth.value || props.fixedWidth ? "100%" : "fit-content",
    flexDirection: "row",
    boxSizing: "border-box",
    cursor: "pointer",
}));
const innerStyle = computed(() => ({
    background: isHovered.value ? "none" : backgroundColor.value,
    padding: padding.value,
    border: "0",
    borderRadius: innerBorderRadius.value,
    width: "100%",
    height: "100%",
    transition: hoverTextColor.value
        ? "color 0.3s, background 300ms"
        : "background 300ms",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: isHovered.value ? hoverTextColor.value : textColor.value,
    whiteSpace: "nowrap",
    fontSize: "1rem",
    gap: props.icon ? "0.5em" : 0,
    flexDirection: "row",
    boxSizing: "border-box",
    cursor: "pointer",
}));
function onMouseEnter() {
    isHovered.value = true;
}
function onMouseLeave() {
    isHovered.value = false;
}
function handleClick(e) {
    // Prevent navigation and only call the callback
    props.onClick();
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.fixedWidth) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ style: ({ width: __VLS_ctx.fixedWidth, display: 'inline-block' }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        ...{ onClick: (__VLS_ctx.handleClick) },
        href: (__VLS_ctx.href),
        ...{ class: "halomot-btn" },
        ...{ style: (__VLS_ctx.outerStyle) },
        role: "button",
        tabindex: "0",
        rel: "noopener",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ onMouseenter: (__VLS_ctx.onMouseEnter) },
        ...{ onMouseleave: (__VLS_ctx.onMouseLeave) },
        ...{ class: "halomot-btn-inner" },
        ...{ style: (__VLS_ctx.innerStyle) },
    });
    if (__VLS_ctx.icon) {
        const __VLS_0 = ((__VLS_ctx.icon));
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            ...{ class: "halomot-btn-icon" },
        }));
        const __VLS_2 = __VLS_1({
            ...{ class: "halomot-btn-icon" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    }
    if (__VLS_ctx.inscription) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.inscription);
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        ...{ onClick: (__VLS_ctx.handleClick) },
        href: (__VLS_ctx.href),
        ...{ class: "halomot-btn" },
        ...{ style: (__VLS_ctx.outerStyle) },
        role: "button",
        tabindex: "0",
        rel: "noopener",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ onMouseenter: (__VLS_ctx.onMouseEnter) },
        ...{ onMouseleave: (__VLS_ctx.onMouseLeave) },
        ...{ class: "halomot-btn-inner" },
        ...{ style: (__VLS_ctx.innerStyle) },
    });
    if (__VLS_ctx.icon) {
        const __VLS_4 = ((__VLS_ctx.icon));
        // @ts-ignore
        const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
            ...{ class: "halomot-btn-icon" },
        }));
        const __VLS_6 = __VLS_5({
            ...{ class: "halomot-btn-icon" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    }
    if (__VLS_ctx.inscription) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.inscription);
    }
}
/** @type {__VLS_StyleScopedClasses['halomot-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['halomot-btn-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['halomot-btn-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['halomot-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['halomot-btn-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['halomot-btn-icon']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            outerStyle: outerStyle,
            innerStyle: innerStyle,
            onMouseEnter: onMouseEnter,
            onMouseLeave: onMouseLeave,
            handleClick: handleClick,
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
//# sourceMappingURL=HalomotButton.vue.js.map