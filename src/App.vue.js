import { ref } from 'vue';
import { useIsMobile } from './composables/useIsMobile';
import TruncatingNavbar from './components/namer-ui/truncating-navbar/TruncatingNavbar.vue';
import SearchModal from './components/SearchModal.vue';
import Footer from './components/Footer.vue';
const { isMobile } = useIsMobile();
const routes = [
    { name: 'Components', link: '/components', external: false },
    { name: 'Next.js Components', link: 'https://namer-ui.netlify.app/', external: true }
];
const showSearchModal = ref(false);
function openSearch() { showSearchModal.value = true; }
function closeSearch() { showSearchModal.value = false; }
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "app-root" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "content-container" },
    ...{ style: ({ paddingLeft: __VLS_ctx.isMobile ? '10px' : '24px', paddingRight: __VLS_ctx.isMobile ? '10px' : '24px' }) },
});
/** @type {[typeof TruncatingNavbar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(TruncatingNavbar, new TruncatingNavbar({
    ...{ 'onOpenSearch': {} },
    icon: "/logo.png",
    appName: "Namer UI",
    routes: (__VLS_ctx.routes),
    homeRoute: "/",
    scrolledBg: "#151419",
    outlineColor: "#403d4d",
}));
const __VLS_1 = __VLS_0({
    ...{ 'onOpenSearch': {} },
    icon: "/logo.png",
    appName: "Namer UI",
    routes: (__VLS_ctx.routes),
    homeRoute: "/",
    scrolledBg: "#151419",
    outlineColor: "#403d4d",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onOpenSearch: (__VLS_ctx.openSearch)
};
var __VLS_2;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: {} },
});
const __VLS_7 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({}));
const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
if (__VLS_ctx.showSearchModal) {
    /** @type {[typeof SearchModal, ]} */ ;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(SearchModal, new SearchModal({
        ...{ 'onClose': {} },
        show: (true),
        outlineColor: ('#403d4d'),
    }));
    const __VLS_12 = __VLS_11({
        ...{ 'onClose': {} },
        show: (true),
        outlineColor: ('#403d4d'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    let __VLS_14;
    let __VLS_15;
    let __VLS_16;
    const __VLS_17 = {
        onClose: (__VLS_ctx.closeSearch)
    };
    var __VLS_13;
}
/** @type {[typeof Footer, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(Footer, new Footer({}));
const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
/** @type {__VLS_StyleScopedClasses['app-root']} */ ;
/** @type {__VLS_StyleScopedClasses['content-container']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            TruncatingNavbar: TruncatingNavbar,
            SearchModal: SearchModal,
            Footer: Footer,
            isMobile: isMobile,
            routes: routes,
            showSearchModal: showSearchModal,
            openSearch: openSearch,
            closeSearch: closeSearch,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=App.vue.js.map