import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const props = defineProps();
const router = useRouter();
const route = useRoute();
const hovered = ref(null);
const activeRoute = computed(() => props.activeRoute ?? route.params.name);
const sortedItems = computed(() => [...props.items].sort((a, b) => a.name.localeCompare(b.name)));
function goTo(r) {
    if (activeRoute.value !== r)
        router.push(`/components/${r}`);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-item']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-item']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-item-label']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-item']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-item']} */ ;
/** @type {__VLS_StyleScopedClasses['hovered']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
    ...{ class: "sidebar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "sidebar-all" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "sidebar-all-label" },
});
for (const [meta] of __VLS_getVForSourceType((__VLS_ctx.sortedItems))) {
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
        ...{ class: "sidebar-item" },
        ...{ class: ({ active: __VLS_ctx.activeRoute === meta.route, hovered: __VLS_ctx.hovered === meta.route }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "sidebar-item-label" },
        ...{ class: ({ 'gradient-text': __VLS_ctx.activeRoute === meta.route }) },
    });
    (meta.name);
}
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-all']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-all-label']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['hovered']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-item-label']} */ ;
/** @type {__VLS_StyleScopedClasses['gradient-text']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            hovered: hovered,
            activeRoute: activeRoute,
            sortedItems: sortedItems,
            goTo: goTo,
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
//# sourceMappingURL=ComponentList.vue.js.map