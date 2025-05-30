import BentoGrid from './BentoGrid.vue';
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
function handleCellClick(cell) {
    Toast.fire({
        html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">Clicked cell: <b>${cell}</b></span>
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
/** @type {[typeof BentoGrid, typeof BentoGrid, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(BentoGrid, new BentoGrid({
    ...{ 'onCellClick': {} },
    mainAspect: ('9/16'),
    leftColRatio: (0.32),
    rightCol1: (0.6),
    rightCol2: (0.4),
    topRowRatio: (0.65),
    bottomRowRatio: (0.35),
    gap: "20px",
    gridHeight: "264px",
    cellBackground: "#17161c",
    cellBorderColor: "#33313d",
    cellBorderRadius: "32px",
    cellBorderWidth: "1px",
    cellPadding: "16px",
    mainCellBorderColor: "#7b1fa2",
    mainCellBorderRadius: "32px",
    topCenterCellBackground: "#060507",
    topRightCellBackground: "#111014",
    bottomCellBackground: "#4776cb",
    bottomCellBorderColor: "#fff",
    bottomCellBorderRadius: "8px",
    bottomCellBorderWidth: "4px",
}));
const __VLS_1 = __VLS_0({
    ...{ 'onCellClick': {} },
    mainAspect: ('9/16'),
    leftColRatio: (0.32),
    rightCol1: (0.6),
    rightCol2: (0.4),
    topRowRatio: (0.65),
    bottomRowRatio: (0.35),
    gap: "20px",
    gridHeight: "264px",
    cellBackground: "#17161c",
    cellBorderColor: "#33313d",
    cellBorderRadius: "32px",
    cellBorderWidth: "1px",
    cellPadding: "16px",
    mainCellBorderColor: "#7b1fa2",
    mainCellBorderRadius: "32px",
    topCenterCellBackground: "#060507",
    topRightCellBackground: "#111014",
    bottomCellBackground: "#4776cb",
    bottomCellBorderColor: "#fff",
    bottomCellBorderRadius: "8px",
    bottomCellBorderWidth: "4px",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onCellClick: (__VLS_ctx.handleCellClick)
};
__VLS_2.slots.default;
{
    const { main: __VLS_thisSlot } = __VLS_2.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ style: {} },
    });
}
{
    const { topCenter: __VLS_thisSlot } = __VLS_2.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ style: {} },
    });
}
{
    const { topRight: __VLS_thisSlot } = __VLS_2.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ style: {} },
    });
}
{
    const { bottom: __VLS_thisSlot } = __VLS_2.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ style: {} },
    });
}
var __VLS_2;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BentoGrid: BentoGrid,
            handleCellClick: handleCellClick,
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