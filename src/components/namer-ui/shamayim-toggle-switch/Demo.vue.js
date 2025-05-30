import ShamayimToggleSwitch from './ShamayimToggleSwitch.vue';
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
// Use the original English messages
function handleTopSwitch(isOn) {
    Toast.fire({
        html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">Top switch is now <b>${isOn ? 'ON' : 'OFF'}</b></span>
      </div>
    `
    });
}
function handleBottomSwitch(isOn) {
    Toast.fire({
        html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">Bottom switch is now <b>${isOn ? 'ON' : 'OFF'}</b></span>
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ style: {} },
});
/** @type {[typeof ShamayimToggleSwitch, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(ShamayimToggleSwitch, new ShamayimToggleSwitch({
    defaultState: (false),
    onChange: (__VLS_ctx.handleTopSwitch),
}));
const __VLS_1 = __VLS_0({
    defaultState: (false),
    onChange: (__VLS_ctx.handleTopSwitch),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: {} },
});
/** @type {[typeof ShamayimToggleSwitch, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(ShamayimToggleSwitch, new ShamayimToggleSwitch({
    defaultState: (false),
    mirrored: true,
    onChange: (__VLS_ctx.handleBottomSwitch),
}));
const __VLS_4 = __VLS_3({
    defaultState: (false),
    mirrored: true,
    onChange: (__VLS_ctx.handleBottomSwitch),
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ style: {} },
});
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ShamayimToggleSwitch: ShamayimToggleSwitch,
            handleTopSwitch: handleTopSwitch,
            handleBottomSwitch: handleBottomSwitch,
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