import InflectedCard from './InflectedCard.vue';
import './InflectedCard.css';
import { CornerRightUp, FoldVertical } from 'lucide-vue-next';
import Swal from 'sweetalert2';
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
function showClickedToast(target, id) {
    Toast.fire({
        html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">Clicked ${target} on card ${id}</span>
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
    ...{ class: "inflected-demo-root" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "inflected-demo-disclaimer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "inflected-demo-cards" },
});
/** @type {[typeof InflectedCard, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(InflectedCard, new InflectedCard({
    id: "0",
    image: "https://images.pexels.com/photos/18525574/pexels-photo-18525574/free-photo-of-unboxing-iphone-15-pro-max-box-in-natural-titanium-color-mention-zana_qaradaghy-on-instagram-while-use-this-photo-follow-on-instagram-zana_qaradaghy.jpeg",
    title: "iPhone 15 Pro",
    description: "Titanium smartphone with an advanced camera system, offering stunning photography capabilities and a sleek design.",
    tags: ([
        { name: 'Brand new', textColor: '#f7f7ff', backgroundColor: '#9F4EFF', rounding: 5 },
        { name: '10% off', textColor: '#242424', backgroundColor: '#f1f1f7', rounding: 5 }
    ]),
    parentBackgroundColor: "#060507",
    onClick: (__VLS_ctx.showClickedToast),
    cardRounding: (15),
    fontSizes: ({ title: '1.8rem', description: '1rem', tags: '0.85rem', price: '0.84rem' }),
    margins: ({ title: '0 0 7px 0', description: '0 0 18px 0', tags: '10px 0 0 0' }),
    buttonIcon: (__VLS_ctx.CornerRightUp),
    buttonIconSize: (32),
    buttonIconColor: "#ffffff",
    buttonIconHoverColor: "#EEEEEE",
    buttonBackgroundColor: "#9F4EFF",
    buttonBackgroundHoverColor: "#a960ff",
    maxWidth: "500px",
    imageHoverZoom: (1.1),
    price: "$1,079",
    priceTagTextColor: "#f7f7ff",
    oldPrice: "$1,199",
    priceTagRounding: "25px",
}));
const __VLS_1 = __VLS_0({
    id: "0",
    image: "https://images.pexels.com/photos/18525574/pexels-photo-18525574/free-photo-of-unboxing-iphone-15-pro-max-box-in-natural-titanium-color-mention-zana_qaradaghy-on-instagram-while-use-this-photo-follow-on-instagram-zana_qaradaghy.jpeg",
    title: "iPhone 15 Pro",
    description: "Titanium smartphone with an advanced camera system, offering stunning photography capabilities and a sleek design.",
    tags: ([
        { name: 'Brand new', textColor: '#f7f7ff', backgroundColor: '#9F4EFF', rounding: 5 },
        { name: '10% off', textColor: '#242424', backgroundColor: '#f1f1f7', rounding: 5 }
    ]),
    parentBackgroundColor: "#060507",
    onClick: (__VLS_ctx.showClickedToast),
    cardRounding: (15),
    fontSizes: ({ title: '1.8rem', description: '1rem', tags: '0.85rem', price: '0.84rem' }),
    margins: ({ title: '0 0 7px 0', description: '0 0 18px 0', tags: '10px 0 0 0' }),
    buttonIcon: (__VLS_ctx.CornerRightUp),
    buttonIconSize: (32),
    buttonIconColor: "#ffffff",
    buttonIconHoverColor: "#EEEEEE",
    buttonBackgroundColor: "#9F4EFF",
    buttonBackgroundHoverColor: "#a960ff",
    maxWidth: "500px",
    imageHoverZoom: (1.1),
    price: "$1,079",
    priceTagTextColor: "#f7f7ff",
    oldPrice: "$1,199",
    priceTagRounding: "25px",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {[typeof InflectedCard, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(InflectedCard, new InflectedCard({
    id: "1",
    image: "https://images.unsplash.com/photo-1721864428881-dbabb9ea0017?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Samsung Galaxy Flip 6",
    description: "Innovative foldable smartphone with a sleek design that enhances portability while providing a large display for immersive viewing experiences and multitasking.",
    tags: ([
        { name: 'Pre-owned', textColor: '#f7f7ff', backgroundColor: '#00A6FB', rounding: 0 },
        { name: '50% off', textColor: '#242424', backgroundColor: '#f1f1f7', rounding: 0 }
    ]),
    parentBackgroundColor: "#060507",
    onClick: (__VLS_ctx.showClickedToast),
    cardRounding: (15),
    fontSizes: ({ title: '1.8rem', description: '1rem', tags: '0.85rem', price: '1.12rem' }),
    margins: ({ title: '0 0 7px 0', description: '0 0 18px 0', tags: '10px 0 0 0' }),
    buttonIcon: (__VLS_ctx.FoldVertical),
    buttonIconSize: (32),
    buttonIconColor: "#ffffff",
    buttonIconHoverColor: "#EEEEEE",
    buttonBackgroundColor: "#00A6FB",
    buttonBackgroundHoverColor: "#0582CA",
    maxWidth: "500px",
    imageHoverZoom: (1.1),
    price: "$499",
    priceTagTextColor: "#050505",
    oldPrice: "$991",
    oldPriceTextColor: "#565656",
    priceTagRounding: "6px",
    priceTagBackgroundColor: "rgba(255,255,255,0.78)",
}));
const __VLS_4 = __VLS_3({
    id: "1",
    image: "https://images.unsplash.com/photo-1721864428881-dbabb9ea0017?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Samsung Galaxy Flip 6",
    description: "Innovative foldable smartphone with a sleek design that enhances portability while providing a large display for immersive viewing experiences and multitasking.",
    tags: ([
        { name: 'Pre-owned', textColor: '#f7f7ff', backgroundColor: '#00A6FB', rounding: 0 },
        { name: '50% off', textColor: '#242424', backgroundColor: '#f1f1f7', rounding: 0 }
    ]),
    parentBackgroundColor: "#060507",
    onClick: (__VLS_ctx.showClickedToast),
    cardRounding: (15),
    fontSizes: ({ title: '1.8rem', description: '1rem', tags: '0.85rem', price: '1.12rem' }),
    margins: ({ title: '0 0 7px 0', description: '0 0 18px 0', tags: '10px 0 0 0' }),
    buttonIcon: (__VLS_ctx.FoldVertical),
    buttonIconSize: (32),
    buttonIconColor: "#ffffff",
    buttonIconHoverColor: "#EEEEEE",
    buttonBackgroundColor: "#00A6FB",
    buttonBackgroundHoverColor: "#0582CA",
    maxWidth: "500px",
    imageHoverZoom: (1.1),
    price: "$499",
    priceTagTextColor: "#050505",
    oldPrice: "$991",
    oldPriceTextColor: "#565656",
    priceTagRounding: "6px",
    priceTagBackgroundColor: "rgba(255,255,255,0.78)",
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
/** @type {[typeof InflectedCard, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(InflectedCard, new InflectedCard({
    id: "2",
    image: "https://images.unsplash.com/photo-1514473776127-61e2dc1dded3?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "iPhone 7",
    description: "Classic iPhone model with 12MP camera and water resistance, offering reliable performance and essential features for everyday smartphone users.",
    tags: ([
        { name: 'Refurbished', textColor: '#f7f7ff', backgroundColor: '#FF3900', rounding: 5 },
        { name: '20% off', textColor: '#242424', backgroundColor: '#f1f1f7', rounding: 5 }
    ]),
    parentBackgroundColor: "#060507",
    onClick: (__VLS_ctx.showClickedToast),
    cardRounding: (14),
    fontSizes: ({ title: '1.8rem', description: '1rem', tags: '0.85rem', price: '1.12rem' }),
    margins: ({ title: '0 0 7px 0', description: '0 0 18px 0', tags: '10px 0 0 0' }),
    buttonIcon: (__VLS_ctx.CornerRightUp),
    buttonIconSize: (32),
    buttonIconColor: "#ffffff",
    buttonIconHoverColor: "#EEEEEE",
    buttonBackgroundColor: "#FF3900",
    buttonBackgroundHoverColor: "#FF5733",
    maxWidth: "392px",
    imageHoverZoom: (1.35),
    price: "$159",
    priceTagRounding: "25px",
    priceTagBackgroundColor: "#FF3900",
}));
const __VLS_7 = __VLS_6({
    id: "2",
    image: "https://images.unsplash.com/photo-1514473776127-61e2dc1dded3?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "iPhone 7",
    description: "Classic iPhone model with 12MP camera and water resistance, offering reliable performance and essential features for everyday smartphone users.",
    tags: ([
        { name: 'Refurbished', textColor: '#f7f7ff', backgroundColor: '#FF3900', rounding: 5 },
        { name: '20% off', textColor: '#242424', backgroundColor: '#f1f1f7', rounding: 5 }
    ]),
    parentBackgroundColor: "#060507",
    onClick: (__VLS_ctx.showClickedToast),
    cardRounding: (14),
    fontSizes: ({ title: '1.8rem', description: '1rem', tags: '0.85rem', price: '1.12rem' }),
    margins: ({ title: '0 0 7px 0', description: '0 0 18px 0', tags: '10px 0 0 0' }),
    buttonIcon: (__VLS_ctx.CornerRightUp),
    buttonIconSize: (32),
    buttonIconColor: "#ffffff",
    buttonIconHoverColor: "#EEEEEE",
    buttonBackgroundColor: "#FF3900",
    buttonBackgroundHoverColor: "#FF5733",
    maxWidth: "392px",
    imageHoverZoom: (1.35),
    price: "$159",
    priceTagRounding: "25px",
    priceTagBackgroundColor: "#FF3900",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
/** @type {[typeof InflectedCard, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(InflectedCard, new InflectedCard({
    id: "3",
    image: "https://images.unsplash.com/photo-1511296933631-18b1a062212c?q=80&w=2436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "iPhone X",
    description: "סמארטפון אייקוני עם תצוגת Super Retina בגודל 5.8 אינץ', טכנולוגיית Face ID מתקדמת, מצלמות כפולות של 12MP ועיצוב חדשני שמהפכני בצילום הסלולרי.",
    tags: ([
        { name: '40% הנחה', textColor: '#242424', backgroundColor: '#f1f1f7', rounding: 15 },
        { name: 'משומש', textColor: '#f7f7ff', backgroundColor: '#00A6FB', rounding: 15 }
    ]),
    parentBackgroundColor: "#060507",
    onClick: (__VLS_ctx.showClickedToast),
    cardRounding: (36),
    fontSizes: ({ title: '1.8rem', description: '1rem', tags: '0.85rem', price: '1.12rem' }),
    margins: ({ title: '0 0 7px 0', description: '0 0 18px 0', tags: '10px 0 0 0' }),
    buttonIcon: (__VLS_ctx.CornerRightUp),
    buttonIconSize: (32),
    buttonIconColor: "#ffffff",
    buttonIconHoverColor: "#EEEEEE",
    buttonBackgroundColor: "#00A6FB",
    buttonBackgroundHoverColor: "#0582CA",
    maxWidth: "330px",
    imageHoverZoom: (1.61),
    price: "₪599",
    priceTagTextColor: "#f7f7ff",
    oldPrice: "₪991",
    oldPriceOnTheRight: true,
    priceTagRounding: "25px",
    mirrored: true,
    tagsAlignment: "right",
    titleAlignment: "center",
    descriptionAlignment: "right",
}));
const __VLS_10 = __VLS_9({
    id: "3",
    image: "https://images.unsplash.com/photo-1511296933631-18b1a062212c?q=80&w=2436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "iPhone X",
    description: "סמארטפון אייקוני עם תצוגת Super Retina בגודל 5.8 אינץ', טכנולוגיית Face ID מתקדמת, מצלמות כפולות של 12MP ועיצוב חדשני שמהפכני בצילום הסלולרי.",
    tags: ([
        { name: '40% הנחה', textColor: '#242424', backgroundColor: '#f1f1f7', rounding: 15 },
        { name: 'משומש', textColor: '#f7f7ff', backgroundColor: '#00A6FB', rounding: 15 }
    ]),
    parentBackgroundColor: "#060507",
    onClick: (__VLS_ctx.showClickedToast),
    cardRounding: (36),
    fontSizes: ({ title: '1.8rem', description: '1rem', tags: '0.85rem', price: '1.12rem' }),
    margins: ({ title: '0 0 7px 0', description: '0 0 18px 0', tags: '10px 0 0 0' }),
    buttonIcon: (__VLS_ctx.CornerRightUp),
    buttonIconSize: (32),
    buttonIconColor: "#ffffff",
    buttonIconHoverColor: "#EEEEEE",
    buttonBackgroundColor: "#00A6FB",
    buttonBackgroundHoverColor: "#0582CA",
    maxWidth: "330px",
    imageHoverZoom: (1.61),
    price: "₪599",
    priceTagTextColor: "#f7f7ff",
    oldPrice: "₪991",
    oldPriceOnTheRight: true,
    priceTagRounding: "25px",
    mirrored: true,
    tagsAlignment: "right",
    titleAlignment: "center",
    descriptionAlignment: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
/** @type {__VLS_StyleScopedClasses['inflected-demo-root']} */ ;
/** @type {__VLS_StyleScopedClasses['inflected-demo-disclaimer']} */ ;
/** @type {__VLS_StyleScopedClasses['inflected-demo-cards']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            InflectedCard: InflectedCard,
            CornerRightUp: CornerRightUp,
            FoldVertical: FoldVertical,
            showClickedToast: showClickedToast,
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