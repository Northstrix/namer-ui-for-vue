import { ref, computed, defineAsyncComponent, shallowRef, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { componentMeta } from '../data/componentMeta';
import ComponentList from '../components/ComponentList.vue';
import Codeblock from '../components/namer-ui/code-block/CodeBlock.vue';
import UsageBlock from '../components/UsageBlock.vue';
import { Clapperboard, FolderCode } from 'lucide-vue-next';
import RadioButton from '../components/namer-ui/radio-button/RadioButton.vue';
// Markdown and sanitization
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useIsMobile } from '../composables/useIsMobile';
const { isMobile } = useIsMobile();
const route = useRoute();
const meta = computed(() => typeof route.params.name === 'string'
    ? componentMeta.find((c) => c.route === route.params.name)
    : Array.isArray(route.params.name)
        ? componentMeta.find((c) => c.route === route.params.name[0])
        : null);
const activeTab = ref('preview');
const tabOptions = [
    { value: 'preview', label: 'Preview', icon: Clapperboard },
    { value: 'code', label: 'Code', icon: FolderCode },
];
// Dynamic demo loader
const demoCache = shallowRef({});
function demoComponent(routeName) {
    if (!demoCache.value[routeName]) {
        demoCache.value[routeName] = defineAsyncComponent(() => import(`../components/namer-ui/${routeName}/Demo.vue`).catch(() => null));
    }
    return demoCache.value[routeName];
}
const demoExists = computed(() => !!(meta.value && meta.value.route));
// Markdown/HTML rendering helpers
function renderMarkdown(text) {
    if (!text)
        return '';
    let html = marked.parse(text, { breaks: true });
    // Add target/rel to all links
    html = html.replace(/<a /g, '<a target="_blank" rel="noopener" draggable="true"');
    return DOMPurify.sanitize(html);
}
const depsHtml = computed(() => renderMarkdown(meta.value?.dependencies));
const creditHtml = computed(() => renderMarkdown(meta.value?.credit));
// --- ENFORCE ALL LINKS OPEN IN NEW TAB ---
watch([meta, activeTab], () => {
    nextTick(() => {
        // Select all links in the main area (covers deps, credit, usage, etc.)
        document.querySelectorAll('.components-main a').forEach((a) => {
            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener');
        });
    });
}, { immediate: true });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['components-main']} */ ;
/** @type {__VLS_StyleScopedClasses['code-container']} */ ;
/** @type {__VLS_StyleScopedClasses['usage-codeblock']} */ ;
/** @type {__VLS_StyleScopedClasses['meta-info']} */ ;
/** @type {__VLS_StyleScopedClasses['meta-block']} */ ;
/** @type {__VLS_StyleScopedClasses['meta-info']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "components-layout" },
});
if (!__VLS_ctx.isMobile) {
    /** @type {[typeof ComponentList, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(ComponentList, new ComponentList({
        items: (__VLS_ctx.componentMeta),
        activeRoute: (typeof __VLS_ctx.route.params.name === 'string' ? __VLS_ctx.route.params.name : Array.isArray(__VLS_ctx.route.params.name) ? __VLS_ctx.route.params.name[0] : undefined),
        ...{ class: "sidebar" },
    }));
    const __VLS_1 = __VLS_0({
        items: (__VLS_ctx.componentMeta),
        activeRoute: (typeof __VLS_ctx.route.params.name === 'string' ? __VLS_ctx.route.params.name : Array.isArray(__VLS_ctx.route.params.name) ? __VLS_ctx.route.params.name[0] : undefined),
        ...{ class: "sidebar" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "components-main" },
    ...{ class: ({ 'no-margin': __VLS_ctx.isMobile }) },
    ...{ style: (!__VLS_ctx.isMobile ? { marginLeft: '24px' } : {}) },
});
if (__VLS_ctx.meta) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "component-title" },
    });
    (__VLS_ctx.meta.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "component-desc" },
    });
    (__VLS_ctx.meta.description);
    /** @type {[typeof RadioButton, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(RadioButton, new RadioButton({
        modelValue: (__VLS_ctx.activeTab),
        options: (__VLS_ctx.tabOptions),
        activeBg: ('#393643'),
        activeFg: ('#fff'),
        inactiveBg: ('none'),
        inactiveFg: ('#aaa'),
        hoverBg: ('#23222a'),
    }));
    const __VLS_4 = __VLS_3({
        modelValue: (__VLS_ctx.activeTab),
        options: (__VLS_ctx.tabOptions),
        activeBg: ('#393643'),
        activeFg: ('#fff'),
        inactiveBg: ('none'),
        inactiveFg: ('#aaa'),
        hoverBg: ('#23222a'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "demo-preview-container" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.activeTab === 'preview') }, null, null);
    if (__VLS_ctx.demoExists) {
        const __VLS_6 = ((__VLS_ctx.demoComponent(__VLS_ctx.meta.route)));
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
        const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "preview-placeholder" },
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "code-container" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.activeTab === 'code') }, null, null);
    if (__VLS_ctx.meta.code) {
        for (const [file] of __VLS_getVForSourceType((__VLS_ctx.meta.code))) {
            /** @type {[typeof Codeblock, ]} */ ;
            // @ts-ignore
            const __VLS_10 = __VLS_asFunctionalComponent(Codeblock, new Codeblock({
                key: (file.filename),
                code: (file.content),
                filename: (file.filename),
                ...{ class: "codeblock" },
            }));
            const __VLS_11 = __VLS_10({
                key: (file.filename),
                code: (file.content),
                filename: (file.filename),
                ...{ class: "codeblock" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_10));
        }
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    if (__VLS_ctx.meta.usage) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-label" },
        });
    }
    if (__VLS_ctx.meta.usage) {
        /** @type {[typeof UsageBlock, ]} */ ;
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(UsageBlock, new UsageBlock({
            code: (__VLS_ctx.meta.usage),
            ...{ class: "usage-codeblock" },
        }));
        const __VLS_14 = __VLS_13({
            code: (__VLS_ctx.meta.usage),
            ...{ class: "usage-codeblock" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    }
    if (__VLS_ctx.meta.dependencies) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-label" },
        });
    }
    if (__VLS_ctx.meta.dependencies) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "meta-info meta-block" },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.depsHtml) }, null, null);
    }
    if (__VLS_ctx.meta.credit) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-label" },
        });
    }
    if (__VLS_ctx.meta.credit) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "meta-info meta-block" },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.creditHtml) }, null, null);
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
/** @type {__VLS_StyleScopedClasses['components-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['components-main']} */ ;
/** @type {__VLS_StyleScopedClasses['no-margin']} */ ;
/** @type {__VLS_StyleScopedClasses['component-title']} */ ;
/** @type {__VLS_StyleScopedClasses['component-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-preview-container']} */ ;
/** @type {__VLS_StyleScopedClasses['preview-placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['code-container']} */ ;
/** @type {__VLS_StyleScopedClasses['codeblock']} */ ;
/** @type {__VLS_StyleScopedClasses['section-label']} */ ;
/** @type {__VLS_StyleScopedClasses['usage-codeblock']} */ ;
/** @type {__VLS_StyleScopedClasses['section-label']} */ ;
/** @type {__VLS_StyleScopedClasses['meta-info']} */ ;
/** @type {__VLS_StyleScopedClasses['meta-block']} */ ;
/** @type {__VLS_StyleScopedClasses['section-label']} */ ;
/** @type {__VLS_StyleScopedClasses['meta-info']} */ ;
/** @type {__VLS_StyleScopedClasses['meta-block']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            componentMeta: componentMeta,
            ComponentList: ComponentList,
            Codeblock: Codeblock,
            UsageBlock: UsageBlock,
            RadioButton: RadioButton,
            isMobile: isMobile,
            route: route,
            meta: meta,
            activeTab: activeTab,
            tabOptions: tabOptions,
            demoComponent: demoComponent,
            demoExists: demoExists,
            depsHtml: depsHtml,
            creditHtml: creditHtml,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=ComponentPage.vue.js.map