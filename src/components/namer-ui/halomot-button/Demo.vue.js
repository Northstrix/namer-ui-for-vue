import HalomotButton from './HalomotButton.vue';
import { Github } from 'lucide-vue-next';
import Swal from 'sweetalert2';
const GithubIcon = Github;
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
function handleGithubClick() {
    Toast.fire({
        html: `
      <div class="toast-flex">
        <img src="/logo.png" alt="Logo" class="toast-logo" />
        <span class="toast-message">Halomot button clicked!</span>
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
/** @type {[typeof HalomotButton, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(HalomotButton, new HalomotButton({
    inscription: "GitHub",
    icon: (__VLS_ctx.GithubIcon),
    onClick: (__VLS_ctx.handleGithubClick),
    gradient: "linear-gradient(135deg, #a123f4, #603dec)",
    borderWidth: "1px",
    outerBorderRadius: "6.34px",
    innerBorderRadius: "6px",
    href: "https://github.com/Northstrix",
    padding: "1rem 4rem",
}));
const __VLS_1 = __VLS_0({
    inscription: "GitHub",
    icon: (__VLS_ctx.GithubIcon),
    onClick: (__VLS_ctx.handleGithubClick),
    gradient: "linear-gradient(135deg, #a123f4, #603dec)",
    borderWidth: "1px",
    outerBorderRadius: "6.34px",
    innerBorderRadius: "6px",
    href: "https://github.com/Northstrix",
    padding: "1rem 4rem",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
var __VLS_2;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            HalomotButton: HalomotButton,
            GithubIcon: GithubIcon,
            handleGithubClick: handleGithubClick,
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