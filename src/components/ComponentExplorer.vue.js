import { ref, computed, defineAsyncComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useIsMobile } from '../composables/useIsMobile';
const componentMeta = [
    {
        name: 'Truncating Navbar',
        route: 'truncating-navbar',
        description: 'The main navigation bar component.',
        usage: `<TruncatingNavbar
  icon="/logo.png"
  appName="Namer UI"
  :routes="routes"
  homeRoute="/"
  scrolledBg="#151419"
  outlineColor="#403d4d"
  @open-search="openSearch"
/>`,
        demoPath: './namer-ui/truncating-navbar/Demo.vue',
        demoScale: 0.18,
        file: 'namer-ui/truncating-navbar/TruncatingNavbar.vue'
    },
    {
        name: 'Button',
        route: 'button',
        description: 'A simple, styled button.',
        usage: `<ButtonDemo />`,
        demoPath: './namer-ui/button/Demo.vue',
        demoScale: 0.28,
        file: 'namer-ui/button/Button.vue'
    },
    {
        name: 'Alert',
        route: 'alert',
        description: 'A simple alert box.',
        usage: `<AlertDemo />`,
        demoPath: './namer-ui/alert/Demo.vue',
        demoScale: 0.28,
        file: 'namer-ui/alert/Alert.vue'
    }
];
const route = useRoute();
const router = useRouter();
const { isMobile } = useIsMobile();
const hovered = ref(null);
const selected = computed(() => {
    if (route.name === 'ComponentDetail' && typeof route.params.name === 'string') {
        return componentMeta.find(c => c.route === route.params.name);
    }
    return null;
});
function isActive(r) {
    return selected.value && selected.value.route === r;
}
function goTo(r) {
    if (!isActive(r))
        router.push({ name: 'ComponentDetail', params: { name: r } });
}
function usagePreview(usage) {
    const lines = usage.trim().split('\n');
    return lines.length > 2 ? lines.slice(0, 2).join('\n') + ' ...' : usage;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['component-list-item']} */ ;
/** @type {__VLS_StyleScopedClasses['component-list-item']} */ ;
/** @type {__VLS_StyleScopedClasses['component-list-item']} */ ;
/** @type {__VLS_StyleScopedClasses['component-list-item']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "component-explorer-root" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "component-explorer-layout" },
});
if (!__VLS_ctx.isMobile) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
        ...{ class: "component-list" },
    });
    for (const [meta] of __VLS_getVForSourceType((__VLS_ctx.componentMeta))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onMouseenter: (...[$event]) => {
                    if (!(!__VLS_ctx.isMobile))
                        return;
                    __VLS_ctx.hovered = meta.route;
                } },
            ...{ onMouseleave: (...[$event]) => {
                    if (!(!__VLS_ctx.isMobile))
                        return;
                    __VLS_ctx.hovered = null;
                } },
            ...{ onClick: (...[$event]) => {
                    if (!(!__VLS_ctx.isMobile))
                        return;
                    __VLS_ctx.goTo(meta.route);
                } },
            key: (meta.route),
            ...{ class: "component-list-item" },
            ...{ class: ({
                    active: __VLS_ctx.isActive(meta.route),
                    hovered: __VLS_ctx.hovered === meta.route && !__VLS_ctx.isActive(meta.route),
                }) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ({ 'gradient-text': __VLS_ctx.isActive(meta.route) }) },
        });
        (meta.name);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "component-main" },
});
if (!__VLS_ctx.selected) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cards-grid" },
    });
    for (const [meta] of __VLS_getVForSourceType((__VLS_ctx.componentMeta))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: (...[$event]) => {
                    if (!(!__VLS_ctx.selected))
                        return;
                    __VLS_ctx.goTo(meta.route);
                } },
            key: (meta.route),
            ...{ class: "card" },
            tabindex: "0",
            role: "button",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-content" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-title" },
        });
        (meta.name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-desc" },
        });
        (meta.description);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({
            ...{ class: "card-usage" },
        });
        (__VLS_ctx.usagePreview(meta.usage));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-demo-perspective" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.iframe, __VLS_intrinsicElements.iframe)({
            src: (`/component-demo/${meta.route}`),
            ...{ class: "demo-container" },
            ...{ style: ({
                    transform: `scale(${meta.demoScale ?? 0.25}) perspective(800px)`,
                    transformOrigin: 'top left'
                }) },
            frameborder: "0",
            tabindex: "-1",
        });
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "component-detail" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "component-title" },
    });
    (__VLS_ctx.selected.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "component-desc" },
    });
    (__VLS_ctx.selected.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({
        ...{ class: "component-usage" },
    });
    (__VLS_ctx.selected.usage);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ style: {} },
    });
    const __VLS_0 = ((__VLS_ctx.defineAsyncComponent(() => import(/* @vite-ignore */ __VLS_ctx.selected.demoPath))));
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ class: "demo-container" },
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: "demo-container" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
    (__VLS_ctx.selected.file);
}
/** @type {__VLS_StyleScopedClasses['component-explorer-root']} */ ;
/** @type {__VLS_StyleScopedClasses['component-explorer-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['component-list']} */ ;
/** @type {__VLS_StyleScopedClasses['component-list-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['hovered']} */ ;
/** @type {__VLS_StyleScopedClasses['gradient-text']} */ ;
/** @type {__VLS_StyleScopedClasses['component-main']} */ ;
/** @type {__VLS_StyleScopedClasses['cards-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['card-usage']} */ ;
/** @type {__VLS_StyleScopedClasses['card-demo-perspective']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-container']} */ ;
/** @type {__VLS_StyleScopedClasses['component-detail']} */ ;
/** @type {__VLS_StyleScopedClasses['component-title']} */ ;
/** @type {__VLS_StyleScopedClasses['component-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['component-usage']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-container']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            defineAsyncComponent: defineAsyncComponent,
            componentMeta: componentMeta,
            isMobile: isMobile,
            hovered: hovered,
            selected: selected,
            isActive: isActive,
            goTo: goTo,
            usagePreview: usagePreview,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=ComponentExplorer.vue.js.map