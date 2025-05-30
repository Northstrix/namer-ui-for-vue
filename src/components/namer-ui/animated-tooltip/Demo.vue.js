import { ref, onMounted, onBeforeUnmount } from 'vue';
import AnimatedTooltip from './AnimatedTooltip.vue';
import Swal from 'sweetalert2';
// --- Example items ---
const items = [
    {
        id: "Vue",
        name: 'Vue',
        image: 'https://icon.icepanel.io/Technology/svg/Vue.js.svg',
        appearanceEffect: 'from-top-left',
        tooltipOffsetY: 2,
        tooltipBorderEffectColors: ['#33303b 0%', '#33303b 100%'],
        nameColor: '#41b883',
        imageRounding: 40,
        imageOutlineColorOverwrite: "#312f3b",
        tooltipWidth: "auto"
    },
    {
        id: "TypeScript",
        name: 'TypeScript',
        designation: '24px higher than Vue tooltip',
        image: 'https://icon.icepanel.io/Technology/svg/TypeScript.svg',
        appearanceEffect: 'from-top',
        tooltipOffsetY: 26,
        tooltipBorderEffectColors: ['#4776cb 0', '#a19fe5 40%', 'transparent 90%'],
        nameFontSize: '1.3rem',
        imageOutlineColor: "#444051",
        nameColor: '#fff',
        designationColor: '#008ceb',
        imageRounding: 8,
        tooltipRounding: 0,
    },
    {
        id: "CSS",
        name: 'CSS',
        designation: "That one doesn't tilt",
        image: 'https://icon.icepanel.io/Technology/svg/CSS3.svg',
        appearanceEffect: 'from-top-right',
        tooltipOffsetY: 2,
        tooltipBorderEffectColors: ['#0097fd 0', '#0097fd 100%'],
        imageRounding: 0,
        tintTilt: false,
        tooltipRounding: 50,
        designationFontSize: "1.125rem",
        tooltipColor: "#eee",
        tooltipDotColor: "rgba(21, 114, 182, 0.84)",
        nameColor: "#111014",
        designationColor: "#3e3a49",
    },
];
// --- Animated outline color logic (unchanged) ---
const COLOR_1 = '#25232c';
const COLOR_2 = '#ffffff';
const HOLD_DURATION = 50;
const TRANSITION_DURATION = 1250;
const animatedOutlineColor = ref(COLOR_2);
let animationFrame = null;
let timeoutId = null;
let isToColor1 = true;
function hexToRgb(hex) {
    const h = hex.replace('#', '');
    return [
        parseInt(h.substring(0, 2), 16),
        parseInt(h.substring(2, 4), 16),
        parseInt(h.substring(4, 6), 16),
    ];
}
function rgbToHex([r, g, b]) {
    return ('#' +
        [r, g, b]
            .map((x) => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        })
            .join(''));
}
function animateColor(from, to, duration, onDone) {
    const start = performance.now();
    const rgbFrom = hexToRgb(from);
    const rgbTo = hexToRgb(to);
    function step(now) {
        const elapsed = Math.min((now - start) / duration, 1);
        const rgbCurrent = rgbFrom.map((fromC, i) => Math.round(fromC + (rgbTo[i] - fromC) * elapsed));
        animatedOutlineColor.value = rgbToHex(rgbCurrent);
        if (elapsed < 1) {
            animationFrame = requestAnimationFrame(step);
        }
        else {
            animatedOutlineColor.value = to;
            onDone();
        }
    }
    animationFrame = requestAnimationFrame(step);
}
function startOscillation() {
    function nextPhase() {
        if (animationFrame)
            cancelAnimationFrame(animationFrame);
        const from = isToColor1 ? COLOR_2 : COLOR_1;
        const to = isToColor1 ? COLOR_1 : COLOR_2;
        timeoutId = window.setTimeout(() => {
            animateColor(from, to, TRANSITION_DURATION, () => {
                isToColor1 = !isToColor1;
                nextPhase();
            });
        }, HOLD_DURATION);
    }
    nextPhase();
}
onMounted(() => {
    startOscillation();
});
onBeforeUnmount(() => {
    if (animationFrame)
        cancelAnimationFrame(animationFrame);
    if (timeoutId)
        clearTimeout(timeoutId);
});
// --- Hovered avatars state ---
const hoveredAvatars = ref([]);
function onAvatarHover({ id }) {
    if (!hoveredAvatars.value.includes(id))
        hoveredAvatars.value.push(id);
}
function onAvatarUnhover({ id }) {
    hoveredAvatars.value = hoveredAvatars.value.filter((x) => x !== id);
}
// --- SweetAlert2 Toast config ---
const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: { popup: 'my-toast' },
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});
// --- Type-safe event handler ---
function onTooltipClick({ item }) {
    const message = `Clicked item: <b>${item.name}</b>`;
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
/** @type {[typeof AnimatedTooltip, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(AnimatedTooltip, new AnimatedTooltip({
    ...{ 'onTooltipClick': {} },
    ...{ 'onAvatarHover': {} },
    ...{ 'onAvatarUnhover': {} },
    items: (__VLS_ctx.items),
    tooltipColor: "#060507",
    tooltipBorderEffectRotation: "2.94rad",
    tooltipBorderEffectThickness: "1px",
    tooltipBorderEffectPercentage: (100),
    tooltipRounding: (8),
    tooltipWidth: "264px",
    tooltipPadding: "0.625rem 1rem",
    appearanceEffect: "from-top",
    tooltipPosition: "top",
    nameFontSize: "1.2rem",
    designationFontSize: "0.875rem",
    nameColor: "#ffeaa7",
    designationColor: "#fab1a0",
    imageOutlineColor: (__VLS_ctx.animatedOutlineColor),
    imageOutlineWidth: "1px",
    tooltipBgColor: "rgba(71, 118, 203, 0.05)",
    tooltipDotColor: "rgba(98, 92, 115, 0.73)",
    tintTilt: true,
    avatarGap: "24px",
    uniqueId: "main-demo",
}));
const __VLS_1 = __VLS_0({
    ...{ 'onTooltipClick': {} },
    ...{ 'onAvatarHover': {} },
    ...{ 'onAvatarUnhover': {} },
    items: (__VLS_ctx.items),
    tooltipColor: "#060507",
    tooltipBorderEffectRotation: "2.94rad",
    tooltipBorderEffectThickness: "1px",
    tooltipBorderEffectPercentage: (100),
    tooltipRounding: (8),
    tooltipWidth: "264px",
    tooltipPadding: "0.625rem 1rem",
    appearanceEffect: "from-top",
    tooltipPosition: "top",
    nameFontSize: "1.2rem",
    designationFontSize: "0.875rem",
    nameColor: "#ffeaa7",
    designationColor: "#fab1a0",
    imageOutlineColor: (__VLS_ctx.animatedOutlineColor),
    imageOutlineWidth: "1px",
    tooltipBgColor: "rgba(71, 118, 203, 0.05)",
    tooltipDotColor: "rgba(98, 92, 115, 0.73)",
    tintTilt: true,
    avatarGap: "24px",
    uniqueId: "main-demo",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onTooltipClick: (__VLS_ctx.onTooltipClick)
};
const __VLS_7 = {
    onAvatarHover: (__VLS_ctx.onAvatarHover)
};
const __VLS_8 = {
    onAvatarUnhover: (__VLS_ctx.onAvatarUnhover)
};
var __VLS_2;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ style: {} },
});
if (__VLS_ctx.hoveredAvatars.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ style: {} },
    });
}
else {
    for (const [id] of __VLS_getVForSourceType((__VLS_ctx.hoveredAvatars))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            key: (id),
            ...{ style: {} },
        });
        (id);
    }
}
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            AnimatedTooltip: AnimatedTooltip,
            items: items,
            animatedOutlineColor: animatedOutlineColor,
            hoveredAvatars: hoveredAvatars,
            onAvatarHover: onAvatarHover,
            onAvatarUnhover: onAvatarUnhover,
            onTooltipClick: onTooltipClick,
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