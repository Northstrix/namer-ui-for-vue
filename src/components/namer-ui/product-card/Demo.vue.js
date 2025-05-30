import ProductCard from './ProductCard.vue';
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
const originalDiscountTag = 'הנחה 40%';
const discountTagParts = originalDiscountTag.split(' ');
const swappedDiscountTag = discountTagParts.reverse().join(' ');
function handleFilledClick(id) {
    const message = `Filled button click - id: ${id}`;
    Toast.fire({
        html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">${message}</span>
      </div>
    `
    });
}
function handleOutlinedClick(id) {
    const message = `Outlined button click - id: ${id}`;
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
    ...{ class: "product-demo-root" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "product-demo-disclaimer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "product-demo-cards" },
});
/** @type {[typeof ProductCard, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(ProductCard, new ProductCard({
    id: "0",
    imageSrc: "https://images.pexels.com/photos/18525574/pexels-photo-18525574/free-photo-of-unboxing-iphone-15-pro-max-box-in-natural-titanium-color-mention-zana_qaradaghy-on-instagram-while-use-this-photo-follow-on-instagram-zana_qaradaghy.jpeg",
    altText: "iPhone 15 Pro",
    oldPrice: "$1,199",
    price: "$1,079",
    condition: "Brand new",
    discountTag: "10% OFF",
    title: "iPhone 15 Pro",
    description: "Titanium smartphone with an advanced camera system, offering stunning photography capabilities and a sleek design.",
    onFilledButtonClick: (__VLS_ctx.handleFilledClick),
    onOutlinedButtonClick: (__VLS_ctx.handleOutlinedClick),
    showOutlinedButton: (true),
}));
const __VLS_1 = __VLS_0({
    id: "0",
    imageSrc: "https://images.pexels.com/photos/18525574/pexels-photo-18525574/free-photo-of-unboxing-iphone-15-pro-max-box-in-natural-titanium-color-mention-zana_qaradaghy-on-instagram-while-use-this-photo-follow-on-instagram-zana_qaradaghy.jpeg",
    altText: "iPhone 15 Pro",
    oldPrice: "$1,199",
    price: "$1,079",
    condition: "Brand new",
    discountTag: "10% OFF",
    title: "iPhone 15 Pro",
    description: "Titanium smartphone with an advanced camera system, offering stunning photography capabilities and a sleek design.",
    onFilledButtonClick: (__VLS_ctx.handleFilledClick),
    onOutlinedButtonClick: (__VLS_ctx.handleOutlinedClick),
    showOutlinedButton: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {[typeof ProductCard, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(ProductCard, new ProductCard({
    id: "1",
    imageSrc: "https://images.unsplash.com/photo-1721864428881-dbabb9ea0017?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "Samsung Galaxy Flip 6",
    oldPrice: "$999",
    price: "$499",
    condition: "Pre-owned",
    discountTag: "50% OFF",
    title: "Samsung Galaxy Flip 6",
    description: "Innovative foldable smartphone with a sleek design that enhances portability while providing a large display for immersive viewing experiences and multitasking.",
    onFilledButtonClick: (__VLS_ctx.handleFilledClick),
    onOutlinedButtonClick: (__VLS_ctx.handleOutlinedClick),
    showOutlinedButton: (true),
    accentColor: ('#00A6FB'),
    buttonRounding: (50),
}));
const __VLS_4 = __VLS_3({
    id: "1",
    imageSrc: "https://images.unsplash.com/photo-1721864428881-dbabb9ea0017?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "Samsung Galaxy Flip 6",
    oldPrice: "$999",
    price: "$499",
    condition: "Pre-owned",
    discountTag: "50% OFF",
    title: "Samsung Galaxy Flip 6",
    description: "Innovative foldable smartphone with a sleek design that enhances portability while providing a large display for immersive viewing experiences and multitasking.",
    onFilledButtonClick: (__VLS_ctx.handleFilledClick),
    onOutlinedButtonClick: (__VLS_ctx.handleOutlinedClick),
    showOutlinedButton: (true),
    accentColor: ('#00A6FB'),
    buttonRounding: (50),
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
/** @type {[typeof ProductCard, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(ProductCard, new ProductCard({
    id: "2",
    imageSrc: "https://images.unsplash.com/photo-1514473776127-61e2dc1dded3?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "iPhone 7",
    oldPrice: "$199",
    price: "$159",
    condition: "Refurbished",
    discountTag: "20% OFF",
    title: "iPhone 7",
    description: "Classic iPhone model with 12MP camera and water resistance, offering reliable performance and essential features for everyday smartphone users.",
    onFilledButtonClick: (__VLS_ctx.handleFilledClick),
    onOutlinedButtonClick: (__VLS_ctx.handleOutlinedClick),
    showOutlinedButton: (false),
    accentColor: ('#FF3900'),
    outerWidth: (392),
    outerHeight: (414),
    borderWidth: (4),
    containerRounding: (14),
    innerContainerRounding: (14),
    buttonRounding: (14),
    activeComponentScale: (1.048),
    darkTextInTags: (true),
}));
const __VLS_7 = __VLS_6({
    id: "2",
    imageSrc: "https://images.unsplash.com/photo-1514473776127-61e2dc1dded3?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "iPhone 7",
    oldPrice: "$199",
    price: "$159",
    condition: "Refurbished",
    discountTag: "20% OFF",
    title: "iPhone 7",
    description: "Classic iPhone model with 12MP camera and water resistance, offering reliable performance and essential features for everyday smartphone users.",
    onFilledButtonClick: (__VLS_ctx.handleFilledClick),
    onOutlinedButtonClick: (__VLS_ctx.handleOutlinedClick),
    showOutlinedButton: (false),
    accentColor: ('#FF3900'),
    outerWidth: (392),
    outerHeight: (414),
    borderWidth: (4),
    containerRounding: (14),
    innerContainerRounding: (14),
    buttonRounding: (14),
    activeComponentScale: (1.048),
    darkTextInTags: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
/** @type {[typeof ProductCard, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(ProductCard, new ProductCard({
    id: "3",
    imageSrc: "https://images.unsplash.com/photo-1511296933631-18b1a062212c?q=80&w=2436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "iPhone X",
    oldPrice: "₪999",
    price: "₪599",
    condition: "משומש",
    discountTag: (__VLS_ctx.swappedDiscountTag),
    title: "iPhone X",
    description: "סמארטפון אייקוני עם תצוגת Super Retina בגודל 5.8 אינץ', טכנולוגיית Face ID מתקדמת, מצלמות כפולות של 12MP ועיצוב חדשני שמהפכני בצילום הסלולרי.",
    onFilledButtonClick: (__VLS_ctx.handleFilledClick),
    onOutlinedButtonClick: (__VLS_ctx.handleOutlinedClick),
    showOutlinedButton: (true),
    outlineColor: ('#f1f1f7'),
    accentColor: ('#00A6FB'),
    containerRounding: (36),
    innerContainerRounding: (21),
    buttonRounding: (50),
    filledButtonInscription: "קנה עכשיו",
    outlinedButtonInscription: "הוסף לעגלה",
    swapButtons: (true),
    activeComponentScale: (1.08),
    mirrorTags: (true),
}));
const __VLS_10 = __VLS_9({
    id: "3",
    imageSrc: "https://images.unsplash.com/photo-1511296933631-18b1a062212c?q=80&w=2436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "iPhone X",
    oldPrice: "₪999",
    price: "₪599",
    condition: "משומש",
    discountTag: (__VLS_ctx.swappedDiscountTag),
    title: "iPhone X",
    description: "סמארטפון אייקוני עם תצוגת Super Retina בגודל 5.8 אינץ', טכנולוגיית Face ID מתקדמת, מצלמות כפולות של 12MP ועיצוב חדשני שמהפכני בצילום הסלולרי.",
    onFilledButtonClick: (__VLS_ctx.handleFilledClick),
    onOutlinedButtonClick: (__VLS_ctx.handleOutlinedClick),
    showOutlinedButton: (true),
    outlineColor: ('#f1f1f7'),
    accentColor: ('#00A6FB'),
    containerRounding: (36),
    innerContainerRounding: (21),
    buttonRounding: (50),
    filledButtonInscription: "קנה עכשיו",
    outlinedButtonInscription: "הוסף לעגלה",
    swapButtons: (true),
    activeComponentScale: (1.08),
    mirrorTags: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
/** @type {__VLS_StyleScopedClasses['product-demo-root']} */ ;
/** @type {__VLS_StyleScopedClasses['product-demo-disclaimer']} */ ;
/** @type {__VLS_StyleScopedClasses['product-demo-cards']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ProductCard: ProductCard,
            swappedDiscountTag: swappedDiscountTag,
            handleFilledClick: handleFilledClick,
            handleOutlinedClick: handleOutlinedClick,
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