import SliderHeroSection from './SliderHeroSection.vue';
import Swal from 'sweetalert2';
// Configure the custom toast
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
function handleClick(id) {
    const message = `Clicked item: <b>${id}</b>`;
    Toast.fire({
        html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">${message}</span>
      </div>
    `
    });
}
function handleHover(id) {
    const message = `Hovered item: <b>${id}</b>`;
    Toast.fire({
        html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">${message}</span>
      </div>
    `
    });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "demo-disclaimer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: {} },
});
/** @type {[typeof SliderHeroSection, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(SliderHeroSection, new SliderHeroSection({
    ...{ 'onOnOptionClick': {} },
    ...{ 'onOnOptionHover': {} },
    title: "Discover cutting-edge tech and top brands at NamerStore – your one-stop destination for brand new, refurbished, and pre-owned electronics",
    showcaseOptions: ([
        { text: 'Brand New Electronics', imageUrl: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { text: 'Refurbished iPhones', imageUrl: 'https://images.unsplash.com/photo-1604671368394-2240d0b1bb6c?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { text: 'Pre-owned Samsung Flagships', imageUrl: 'https://images.unsplash.com/photo-1584006682522-dc17d6c0d9ac?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
    ]),
    titleFontWeight: (800),
    showcaseFontWeight: (700),
    desktopVersionBottomThreshold: (900),
}));
const __VLS_1 = __VLS_0({
    ...{ 'onOnOptionClick': {} },
    ...{ 'onOnOptionHover': {} },
    title: "Discover cutting-edge tech and top brands at NamerStore – your one-stop destination for brand new, refurbished, and pre-owned electronics",
    showcaseOptions: ([
        { text: 'Brand New Electronics', imageUrl: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { text: 'Refurbished iPhones', imageUrl: 'https://images.unsplash.com/photo-1604671368394-2240d0b1bb6c?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { text: 'Pre-owned Samsung Flagships', imageUrl: 'https://images.unsplash.com/photo-1584006682522-dc17d6c0d9ac?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
    ]),
    titleFontWeight: (800),
    showcaseFontWeight: (700),
    desktopVersionBottomThreshold: (900),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onOnOptionClick: (__VLS_ctx.handleClick)
};
const __VLS_7 = {
    onOnOptionHover: (__VLS_ctx.handleHover)
};
var __VLS_2;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: {} },
});
/** @type {[typeof SliderHeroSection, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(SliderHeroSection, new SliderHeroSection({
    ...{ 'onOnOptionClick': {} },
    ...{ 'onOnOptionHover': {} },
    title: "גלה טכנולוגיה חדשנית ומותגים מובילים בנמרסטור - היעד שלך למוצרי אלקטרוניקה חדשים, מחודשים ומשומשים.",
    showcaseOptions: ([
        { text: 'מוצרי אלקטרוניקה חדשים', imageUrl: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { text: 'אייפונים מחודשים', imageUrl: 'https://images.unsplash.com/photo-1604671368394-2240d0b1bb6c?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { text: 'מכשירי סמסונג משומשים', imageUrl: 'https://images.unsplash.com/photo-1584006682522-dc17d6c0d9ac?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
    ]),
    activeOptionColor: ('#A031EB'),
    textColor: ('#080810'),
    imageChangeInterval: (3000),
    imageTransitionDuration: (0.51),
    darkenImages: (-0.5),
    height: "760px",
    borderRadius: "2.5em",
    mobileTitleAlign: "right",
    mobileShowcaseAlign: "right",
    titleFontWeight: (900),
    showcaseFontWeight: (700),
    desktopVersionBottomThreshold: (600),
}));
const __VLS_9 = __VLS_8({
    ...{ 'onOnOptionClick': {} },
    ...{ 'onOnOptionHover': {} },
    title: "גלה טכנולוגיה חדשנית ומותגים מובילים בנמרסטור - היעד שלך למוצרי אלקטרוניקה חדשים, מחודשים ומשומשים.",
    showcaseOptions: ([
        { text: 'מוצרי אלקטרוניקה חדשים', imageUrl: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { text: 'אייפונים מחודשים', imageUrl: 'https://images.unsplash.com/photo-1604671368394-2240d0b1bb6c?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { text: 'מכשירי סמסונג משומשים', imageUrl: 'https://images.unsplash.com/photo-1584006682522-dc17d6c0d9ac?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
    ]),
    activeOptionColor: ('#A031EB'),
    textColor: ('#080810'),
    imageChangeInterval: (3000),
    imageTransitionDuration: (0.51),
    darkenImages: (-0.5),
    height: "760px",
    borderRadius: "2.5em",
    mobileTitleAlign: "right",
    mobileShowcaseAlign: "right",
    titleFontWeight: (900),
    showcaseFontWeight: (700),
    desktopVersionBottomThreshold: (600),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
let __VLS_11;
let __VLS_12;
let __VLS_13;
const __VLS_14 = {
    onOnOptionClick: (__VLS_ctx.handleClick)
};
const __VLS_15 = {
    onOnOptionHover: (__VLS_ctx.handleHover)
};
var __VLS_10;
/** @type {__VLS_StyleScopedClasses['demo-disclaimer']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            SliderHeroSection: SliderHeroSection,
            handleClick: handleClick,
            handleHover: handleHover,
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