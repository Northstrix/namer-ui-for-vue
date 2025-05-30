import { ref, onMounted, watch, computed, onUnmounted, nextTick } from 'vue';
const emit = defineEmits();
const props = withDefaults(defineProps(), {
    hue: 260,
    borderRadius: '5em',
    fontSize: '1.25rem',
    iconGap: '0.08em',
    mobileFontSize: '1rem',
    desktopThreshold: 600,
});
const over = ref(false);
const isMobile = ref(false);
function updateIsMobile() {
    isMobile.value = window.innerWidth < props.desktopThreshold;
}
onMounted(() => {
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    injectMediaQuery();
});
onUnmounted(() => {
    window.removeEventListener('resize', updateIsMobile);
});
watch(() => props.desktopThreshold, injectMediaQuery);
function handleClick(e) {
    emit('click', e);
}
const buttonStyle = computed(() => ({
    '--clr': props.hue,
    borderRadius: props.borderRadius,
    fontSize: isMobile.value ? props.mobileFontSize : props.fontSize,
    width: 'auto',
    background: 'linear-gradient(135deg, #4776cb, #a19fe5, #6cc606)',
    color: '#fff',
}));
const spanStyle = computed(() => ({
    gap: props.iconGap,
}));
function injectMediaQuery() {
    nextTick(() => {
        const id = 'sparkly-btn-media';
        let styleTag = document.getElementById(id);
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = id;
            document.head.appendChild(styleTag);
        }
        styleTag.textContent = `
      @media (max-width: ${props.desktopThreshold}px) {
        .stargazing-shadow .sparkles .content {
          padding: 0.655em 1.1em !important;
          font-size: ${props.mobileFontSize} !important;
        }
      }
    `;
    });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    hue: 260,
    borderRadius: '5em',
    fontSize: '1.25rem',
    iconGap: '0.08em',
    mobileFontSize: '1rem',
    desktopThreshold: 600,
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['stargazing-shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['stargazing-shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['over']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['over']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['over']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['over']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['over']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
// CSS variable injection 
__VLS_ctx.iconGap;
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "stargazing-shadow" },
    ...{ class: ({ over: __VLS_ctx.over }) },
    ...{ style: ({
            borderRadius: props.borderRadius,
            '--clr': props.hue,
            '--shadow-color': '#fff',
        }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleClick) },
    ...{ onMouseover: (...[$event]) => {
            __VLS_ctx.over = true;
        } },
    ...{ onMouseleave: (...[$event]) => {
            __VLS_ctx.over = false;
        } },
    ...{ onFocus: (...[$event]) => {
            __VLS_ctx.over = true;
        } },
    ...{ onBlur: (...[$event]) => {
            __VLS_ctx.over = false;
        } },
    ...{ class: "sparkles" },
    ...{ class: ({ over: __VLS_ctx.over }) },
    ...{ style: (__VLS_ctx.buttonStyle) },
    type: "button",
    tabindex: "0",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "content" },
    ...{ style: (__VLS_ctx.spanStyle) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['stargazing-shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['over']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['over']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            over: over,
            handleClick: handleClick,
            buttonStyle: buttonStyle,
            spanStyle: spanStyle,
        };
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=SparklyButton.vue.js.map