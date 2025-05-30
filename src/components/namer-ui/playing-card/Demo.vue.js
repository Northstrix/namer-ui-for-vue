import PlayingCard from './PlayingCard.vue';
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
function handleCardClick() {
    Toast.fire({
        html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">Card clicked!</span>
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: {} },
});
/** @type {[typeof PlayingCard, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(PlayingCard, new PlayingCard({
    componentWidth: "412px",
    aspectRatio: "3/4",
    outerRounding: "18px",
    innerRounding: "18px",
    backgroundColor: "#FFF",
    foregroundColor: "#000",
    imageHeightPercentage: (70),
    imageSrc: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/playground-card-image.webp",
    imageAlt: "",
    outlineColor: "#ddd",
    hoverOutlineColor: "#aaa",
    textArray: (['洪', '秀', '全']),
    minWidth: (200),
    maxWidth: (400),
    minTextSize: (16),
    maxTextSize: (24),
    verticalPadding: "20px",
    horizontalPadding: "20px",
    manualLetterSpacing: (6),
    componentId: "card-1",
    onCardClicked: (__VLS_ctx.handleCardClick),
    textColorTransitionDelay: "1s",
    textColorTransitionDuration: "2.4s",
}));
const __VLS_1 = __VLS_0({
    componentWidth: "412px",
    aspectRatio: "3/4",
    outerRounding: "18px",
    innerRounding: "18px",
    backgroundColor: "#FFF",
    foregroundColor: "#000",
    imageHeightPercentage: (70),
    imageSrc: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/playground-card-image.webp",
    imageAlt: "",
    outlineColor: "#ddd",
    hoverOutlineColor: "#aaa",
    textArray: (['洪', '秀', '全']),
    minWidth: (200),
    maxWidth: (400),
    minTextSize: (16),
    maxTextSize: (24),
    verticalPadding: "20px",
    horizontalPadding: "20px",
    manualLetterSpacing: (6),
    componentId: "card-1",
    onCardClicked: (__VLS_ctx.handleCardClick),
    textColorTransitionDelay: "1s",
    textColorTransitionDuration: "2.4s",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            PlayingCard: PlayingCard,
            handleCardClick: handleCardClick,
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