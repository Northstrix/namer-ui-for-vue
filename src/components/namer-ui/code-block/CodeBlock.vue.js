import { computed, defineProps } from 'vue';
const props = defineProps();
const codePadding = computed(() => props.codePadding || '18px 18px 0 62px');
const lineNumberXShift = computed(() => props.lineNumberXShift || '4px');
const filenameColor = computed(() => props.filenameColor || '#fff');
const backgroundColor = computed(() => props.backgroundColor || '#17161c');
const borderColor = computed(() => props.borderColor || '#312f3b');
const borderRadius = computed(() => props.borderRadius || '8px');
const lineNumberColor = computed(() => props.lineNumberColor || '#999');
const codeTextColor = computed(() => props.codeTextColor || '#d4d4d4');
const codeLines = computed(() => {
    const lines = props.code.split('\n');
    if (lines.length > 1 && lines[lines.length - 1].trim() === '') {
        lines.pop();
    }
    return lines;
});
const lineCount = computed(() => codeLines.value.length);
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
/** @type {__VLS_StyleScopedClasses['codeblock-linenumbers']} */ ;
/** @type {__VLS_StyleScopedClasses['codeblock-pre']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "codeblock-root" },
    ...{ style: ({
            background: __VLS_ctx.backgroundColor,
            borderColor: __VLS_ctx.borderColor,
            borderRadius: __VLS_ctx.borderRadius,
        }) },
});
if (__VLS_ctx.filename) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "codeblock-header" },
        ...{ style: ({ color: __VLS_ctx.filenameColor, zIndex: 3 }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "codeblock-filename" },
        ...{ style: ({ color: __VLS_ctx.filenameColor }) },
    });
    (__VLS_ctx.filename);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "codeblock-wrapper" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "codeblock-linenumbers-bg" },
    ...{ style: ({
            width: `calc(${__VLS_ctx.lineNumberXShift} + 36px)`,
            background: __VLS_ctx.backgroundColor,
        }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "codeblock-linenumbers" },
    'aria-hidden': "true",
    ...{ style: ({
            color: __VLS_ctx.lineNumberColor,
            transform: `translateX(${__VLS_ctx.lineNumberXShift})`,
            background: __VLS_ctx.backgroundColor,
            zIndex: 2,
        }) },
});
for (const [n] of __VLS_getVForSourceType((__VLS_ctx.lineCount))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        key: (n),
    });
    (n);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "codeblock-scrollarea" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({
    ...{ class: "codeblock-pre" },
    ...{ style: ({
            background: __VLS_ctx.backgroundColor,
            color: __VLS_ctx.codeTextColor,
            padding: __VLS_ctx.codePadding,
            marginRight: '16px',
        }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.plainCode) }, null, null);
/** @type {__VLS_StyleScopedClasses['codeblock-root']} */ ;
/** @type {__VLS_StyleScopedClasses['codeblock-header']} */ ;
/** @type {__VLS_StyleScopedClasses['codeblock-filename']} */ ;
/** @type {__VLS_StyleScopedClasses['codeblock-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['codeblock-linenumbers-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['codeblock-linenumbers']} */ ;
/** @type {__VLS_StyleScopedClasses['codeblock-scrollarea']} */ ;
/** @type {__VLS_StyleScopedClasses['codeblock-pre']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            codePadding: codePadding,
            lineNumberXShift: lineNumberXShift,
            filenameColor: filenameColor,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderRadius: borderRadius,
            lineNumberColor: lineNumberColor,
            codeTextColor: codeTextColor,
            lineCount: lineCount,
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
//# sourceMappingURL=CodeBlock.vue.js.map