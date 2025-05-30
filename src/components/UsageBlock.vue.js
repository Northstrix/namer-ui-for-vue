import { computed, defineProps } from 'vue';
const props = defineProps();
const codeLines = computed(() => {
    const lines = props.code.split('\n');
    if (lines.length > 1 && lines[lines.length - 1].trim() === '') {
        lines.pop();
    }
    return lines;
});
// Escape HTML special characters to prevent code from being interpreted as HTML
function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
const plainCode = computed(() => {
    return codeLines.value
        .map(line => escapeHtml(line) || '&nbsp;')
        .join('\n');
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['usageblock-pre']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "usageblock-root" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "usageblock-wrapper" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({
    ...{ class: "usageblock-pre" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.plainCode) }, null, null);
/** @type {__VLS_StyleScopedClasses['usageblock-root']} */ ;
/** @type {__VLS_StyleScopedClasses['usageblock-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['usageblock-pre']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            plainCode: plainCode,
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
//# sourceMappingURL=UsageBlock.vue.js.map