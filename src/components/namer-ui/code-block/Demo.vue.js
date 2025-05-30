import CodeblockDemo from './CodeBlock.vue';
const sampleCode = `if (string === "js")
    break;
`;
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof CodeblockDemo, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(CodeblockDemo, new CodeblockDemo({
    code: (__VLS_ctx.sampleCode),
    filename: "code.ts",
}));
const __VLS_1 = __VLS_0({
    code: (__VLS_ctx.sampleCode),
    filename: "code.ts",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
var __VLS_2;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            CodeblockDemo: CodeblockDemo,
            sampleCode: sampleCode,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=Demo.vue.js.map