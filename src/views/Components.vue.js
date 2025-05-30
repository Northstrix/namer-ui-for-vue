import { ref, shallowRef, defineAsyncComponent, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { componentMeta } from '../data/componentMeta';
import ComponentList from '../components/ComponentList.vue';
import { useIsMobile } from '../composables/useIsMobile';
const router = useRouter();
const hovered = ref(null);
// Responsive: one column if <1200px
const isSingleColumn = ref(window.innerWidth < 1200);
function handleResize() {
    isSingleColumn.value = window.innerWidth < 1200;
}
onMounted(() => window.addEventListener('resize', handleResize));
onUnmounted(() => window.removeEventListener('resize', handleResize));
// Mobile: hide sidebar if mobile
const { isMobile } = useIsMobile();
// Dynamically import Demo.vue for each route
const demoCache = shallowRef({});
function demoComponent(route) {
    if (!demoCache.value[route]) {
        demoCache.value[route] = defineAsyncComponent(() => import(`../components/namer-ui/${route}/Demo.vue`));
    }
    return demoCache.value[route];
}
// Decide which preview type to use
function getPreviewType(meta) {
    if (meta.previewType)
        return meta.previewType;
    // Fallbacks: navbar = fullwidth, button/alert = center, rest = center
    if (meta.route === 'truncating-navbar')
        return 'fullwidth';
    if (meta.route === 'button' || meta.route === 'alert')
        return 'center';
    return 'center';
}
// Explicitly allow multi-line when clamp is off
const multiLineStyle = {
    display: 'block',
    whiteSpace: 'normal',
    overflow: 'visible',
    textOverflow: 'unset',
    WebkitLineClamp: 'unset',
    WebkitBoxOrient: 'unset',
};
function goTo(routeName) {
    router.push({ name: 'ComponentPage', params: { name: routeName } });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['components-main']} */ ;
/** @type {__VLS_StyleScopedClasses['bento-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['bento-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['bento-card']} */ ;
/** @type {__VLS_StyleScopedClasses['bento-card']} */ ;
/** @type {__VLS_StyleScopedClasses['bento-showcase-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['hovered']} */ ;
/** @type {__VLS_StyleScopedClasses['bento-content']} */ ;
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
        ...{ class: "sidebar" },
        activeRoute: (null),
    }));
    const __VLS_1 = __VLS_0({
        items: (__VLS_ctx.componentMeta),
        ...{ class: "sidebar" },
        activeRoute: (null),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "components-main" },
    ...{ class: ({ 'no-margin': __VLS_ctx.isMobile }) },
    ...{ style: (!__VLS_ctx.isMobile ? { marginLeft: '24px' } : {}) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "bento-grid" },
    ...{ class: ({ single: __VLS_ctx.isSingleColumn }) },
});
for (const [meta] of __VLS_getVForSourceType((__VLS_ctx.componentMeta))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.goTo(meta.route);
            } },
        ...{ onMouseenter: (...[$event]) => {
                __VLS_ctx.hovered = meta.route;
            } },
        ...{ onMouseleave: (...[$event]) => {
                __VLS_ctx.hovered = null;
            } },
        key: (meta.route),
        ...{ class: "bento-card" },
        tabindex: "0",
        role: "button",
        ...{ class: ({ hovered: __VLS_ctx.hovered === meta.route }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "bento-demo-outer" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "bento-showcase-outline" },
        ...{ class: ({ hovered: __VLS_ctx.hovered === meta.route }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "bento-showcase-inner" },
    });
    if (__VLS_ctx.getPreviewType(meta) === 'center') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "center-demo" },
        });
        const __VLS_3 = ((__VLS_ctx.demoComponent(meta.route)));
        // @ts-ignore
        const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({
            ...{ class: "preview-center-demo" },
        }));
        const __VLS_5 = __VLS_4({
            ...{ class: "preview-center-demo" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_4));
    }
    else if (__VLS_ctx.getPreviewType(meta) === 'fullwidth') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "fullwidth-demo" },
        });
        const __VLS_7 = ((__VLS_ctx.demoComponent(meta.route)));
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
            ...{ class: "preview-fullwidth-demo" },
        }));
        const __VLS_9 = __VLS_8({
            ...{ class: "preview-fullwidth-demo" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "center-demo" },
        });
        const __VLS_11 = ((__VLS_ctx.demoComponent(meta.route)));
        // @ts-ignore
        const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
            ...{ class: "preview-center-demo" },
        }));
        const __VLS_13 = __VLS_12({
            ...{ class: "preview-center-demo" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "bento-content" },
        ...{ class: ({ 'text-shift': __VLS_ctx.hovered === meta.route }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "bento-title" },
        ...{ class: ({ 'line-clamp': !__VLS_ctx.isSingleColumn }) },
        ...{ style: (__VLS_ctx.isSingleColumn ? __VLS_ctx.multiLineStyle : {}) },
    });
    (meta.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "bento-desc" },
        ...{ class: ({ 'line-clamp': !__VLS_ctx.isSingleColumn }) },
        ...{ style: (__VLS_ctx.isSingleColumn ? __VLS_ctx.multiLineStyle : {}) },
    });
    (meta.description);
}
/** @type {__VLS_StyleScopedClasses['components-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['components-main']} */ ;
/** @type {__VLS_StyleScopedClasses['no-margin']} */ ;
/** @type {__VLS_StyleScopedClasses['bento-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['single']} */ ;
/** @type {__VLS_StyleScopedClasses['bento-card']} */ ;
/** @type {__VLS_StyleScopedClasses['hovered']} */ ;
/** @type {__VLS_StyleScopedClasses['bento-demo-outer']} */ ;
/** @type {__VLS_StyleScopedClasses['bento-showcase-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['hovered']} */ ;
/** @type {__VLS_StyleScopedClasses['bento-showcase-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['center-demo']} */ ;
/** @type {__VLS_StyleScopedClasses['preview-center-demo']} */ ;
/** @type {__VLS_StyleScopedClasses['fullwidth-demo']} */ ;
/** @type {__VLS_StyleScopedClasses['preview-fullwidth-demo']} */ ;
/** @type {__VLS_StyleScopedClasses['center-demo']} */ ;
/** @type {__VLS_StyleScopedClasses['preview-center-demo']} */ ;
/** @type {__VLS_StyleScopedClasses['bento-content']} */ ;
/** @type {__VLS_StyleScopedClasses['text-shift']} */ ;
/** @type {__VLS_StyleScopedClasses['bento-title']} */ ;
/** @type {__VLS_StyleScopedClasses['line-clamp']} */ ;
/** @type {__VLS_StyleScopedClasses['bento-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['line-clamp']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            componentMeta: componentMeta,
            ComponentList: ComponentList,
            hovered: hovered,
            isSingleColumn: isSingleColumn,
            isMobile: isMobile,
            demoComponent: demoComponent,
            getPreviewType: getPreviewType,
            multiLineStyle: multiLineStyle,
            goTo: goTo,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=Components.vue.js.map