import SpaceButton from './SpaceButton.vue';
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
// Show the toast on button click
function showToast(message) {
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
    ...{ class: "space-demo-wrap" },
});
/** @type {[typeof SpaceButton, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(SpaceButton, new SpaceButton({
    ...{ 'onClick': {} },
    inscription: "Outer Space",
    variant: "outer",
}));
const __VLS_1 = __VLS_0({
    ...{ 'onClick': {} },
    inscription: "Outer Space",
    variant: "outer",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onClick: (() => __VLS_ctx.showToast('The Outer Space button has been clicked!'))
};
var __VLS_2;
/** @type {[typeof SpaceButton, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(SpaceButton, new SpaceButton({
    ...{ 'onClick': {} },
    inscription: "Inner Space (1px border)",
    borderWidth: "1px",
}));
const __VLS_8 = __VLS_7({
    ...{ 'onClick': {} },
    inscription: "Inner Space (1px border)",
    borderWidth: "1px",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_10;
let __VLS_11;
let __VLS_12;
const __VLS_13 = {
    onClick: (() => __VLS_ctx.showToast('The Inner Space button has been clicked!'))
};
var __VLS_9;
/** @type {[typeof SpaceButton, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(SpaceButton, new SpaceButton({
    ...{ 'onClick': {} },
    inscription: "Outer Space (1px, thin font)",
    isBold: (false),
    variant: "outer",
}));
const __VLS_15 = __VLS_14({
    ...{ 'onClick': {} },
    inscription: "Outer Space (1px, thin font)",
    isBold: (false),
    variant: "outer",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
let __VLS_17;
let __VLS_18;
let __VLS_19;
const __VLS_20 = {
    onClick: (() => __VLS_ctx.showToast('The Outer Space thin font button has been clicked!'))
};
var __VLS_16;
/** @type {[typeof SpaceButton, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(SpaceButton, new SpaceButton({
    ...{ 'onClick': {} },
    inscription: "5px Border",
    borderWidth: "5px",
}));
const __VLS_22 = __VLS_21({
    ...{ 'onClick': {} },
    inscription: "5px Border",
    borderWidth: "5px",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
let __VLS_24;
let __VLS_25;
let __VLS_26;
const __VLS_27 = {
    onClick: (() => __VLS_ctx.showToast('The 5px Border button has been clicked!'))
};
var __VLS_23;
/** @type {[typeof SpaceButton, ]} */ ;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(SpaceButton, new SpaceButton({
    ...{ 'onClick': {} },
    inscription: "Hover any of these",
    borderRadius: "2em",
}));
const __VLS_29 = __VLS_28({
    ...{ 'onClick': {} },
    inscription: "Hover any of these",
    borderRadius: "2em",
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
let __VLS_31;
let __VLS_32;
let __VLS_33;
const __VLS_34 = {
    onClick: (() => __VLS_ctx.showToast('The Hover any of these button has been clicked!'))
};
var __VLS_30;
/** @type {[typeof SpaceButton, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(SpaceButton, new SpaceButton({
    ...{ 'onClick': {} },
    inscription: "פונט גדול",
    fontSize: "32px",
    variant: "outer",
}));
const __VLS_36 = __VLS_35({
    ...{ 'onClick': {} },
    inscription: "פונט גדול",
    fontSize: "32px",
    variant: "outer",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
let __VLS_38;
let __VLS_39;
let __VLS_40;
const __VLS_41 = {
    onClick: (() => __VLS_ctx.showToast('The large font button has been clicked!'))
};
var __VLS_37;
/** @type {__VLS_StyleScopedClasses['space-demo-wrap']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            SpaceButton: SpaceButton,
            showToast: showToast,
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