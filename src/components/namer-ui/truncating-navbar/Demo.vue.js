import TruncatingNavbar from './TruncatingNavbar.vue';
import Swal from 'sweetalert2';
const routes = [
    { name: 'Link', link: 'https://maxim-bortnikov.netlify.app/', external: true }
];
const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
        popup: 'my-toast'
    },
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});
function openSearch() {
    Toast.fire({
        // Use custom HTML for left icon, right text
        html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">Fake search bar clicked!</span>
      </div>
    `
    });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof TruncatingNavbar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(TruncatingNavbar, new TruncatingNavbar({
    ...{ 'onOpenSearch': {} },
    icon: "/logo.png",
    appName: "Nmr",
    routes: (__VLS_ctx.routes),
    homeRoute: "/",
    scrolledBg: "#151419",
    mobileBg: "#060507",
    outlineColor: "#403d4d",
    searchPlaceholderText: "Search...",
    shortcutKey: "M",
    zIndex: (1),
}));
const __VLS_1 = __VLS_0({
    ...{ 'onOpenSearch': {} },
    icon: "/logo.png",
    appName: "Nmr",
    routes: (__VLS_ctx.routes),
    homeRoute: "/",
    scrolledBg: "#151419",
    mobileBg: "#060507",
    outlineColor: "#403d4d",
    searchPlaceholderText: "Search...",
    shortcutKey: "M",
    zIndex: (1),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onOpenSearch: (__VLS_ctx.openSearch)
};
var __VLS_7 = {};
var __VLS_2;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            TruncatingNavbar: TruncatingNavbar,
            routes: routes,
            openSearch: openSearch,
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