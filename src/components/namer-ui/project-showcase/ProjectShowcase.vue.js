import { ref, nextTick, onMounted } from 'vue';
import gsap from 'gsap';
import HalomotButton from '../halomot-button/HalomotButton.vue';
const props = defineProps();
const { testimonials, autoplay = false, colors = { name: "#fff", position: "#999", testimony: "#ccc" }, fontSizes = { name: "28px", position: "20px", testimony: "20px" }, spacing = {
    top: "20",
    bottom: "20",
    lineHeight: "1.5",
    nameTop: "0",
    nameBottom: "10px",
    positionTop: "0",
    positionBottom: "0.5em",
    testimonyTop: "1.24em",
    testimonyBottom: "1em"
}, imageAspectRatio = 1.37, isRTL = false, onItemClick, outerRounding = "18.2px", innerRounding = "18px", outlineColor = "#33313d", hoverOutlineColor = "#403d4d", buttonInscriptions = {
    previousButton: "Prev.",
    nextButton: "Next",
    openWebAppButton: "Open Web App"
}, halomotButtonGradient = "linear-gradient(to right, #a123f4, #603dec)", halomotButtonBackground = "#111014", halomotButtonTextColor = "#fff", halomotButtonOuterBorderRadius = "6.34px", halomotButtonInnerBorderRadius = "6px", halomotButtonHoverTextColor } = props;
const active = ref(0);
const nextActive = ref(0);
const showImage = ref(true);
const transitionDirection = ref('next');
const hoveredImage = ref(null);
const imageContainerKey = ref(0);
const simulatedHover = ref(false);
let autoplayInterval = null;
let hoverTimeout = null;
function handleNext() {
    transitionDirection.value = 'next';
    nextActive.value = (active.value + 1) % testimonials.length;
    showImage.value = false;
    stopAutoplay();
}
function handlePrev() {
    transitionDirection.value = 'prev';
    nextActive.value = (active.value - 1 + testimonials.length) % testimonials.length;
    showImage.value = false;
    stopAutoplay();
}
function stopAutoplay() {
    if (autoplayInterval)
        clearInterval(autoplayInterval);
}
function calculateGap(width) {
    const minWidth = 1024, maxWidth = 1456, minGap = 30, maxGap = 42;
    if (width <= minWidth)
        return minGap;
    if (width >= maxWidth)
        return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
    return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}
// --- IMAGE TRANSITION HOOKS ---
// FIXED: Make x direction RTL-aware
function getImageTransitionX(dir, rtl) {
    // For LTR: next = -40, prev = 40
    // For RTL: next = 40, prev = -40
    if (!rtl) {
        return dir === 'next' ? -40 : 40;
    }
    else {
        return dir === 'next' ? 40 : -40;
    }
}
function beforeEnterImage(el) {
    const dir = transitionDirection.value;
    const x = getImageTransitionX(dir, isRTL);
    gsap.set(el, { opacity: 0, scale: 0.92, x, filter: "blur(16px)" });
}
function enterImage(el, done) {
    gsap.to(el, {
        opacity: 1,
        scale: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.7,
        ease: "power2.out",
        onComplete: done
    });
}
function leaveImage(el, done) {
    const dir = transitionDirection.value;
    const x = getImageTransitionX(dir === 'next' ? 'prev' : 'next', isRTL);
    gsap.to(el, {
        opacity: 0,
        scale: 0.92,
        x,
        filter: "blur(16px)",
        duration: 0.5,
        ease: "power2.in",
        onComplete: done
    });
}
// --- TEXT TRANSITION HOOKS (SWAPPED) ---
function beforeEnterText(el) {
    const dir = transitionDirection.value;
    const y = (dir === 'next') ? -30 : 30; // swapped
    gsap.set(el, { opacity: 0, y });
    const words = el.querySelectorAll('.showcase-word');
    const wordY = (dir === 'next') ? -10 : 10; // swapped
    gsap.set(words, { filter: "blur(14px)", opacity: 0, y: wordY });
}
function enterText(el, done) {
    gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
    const words = el.querySelectorAll('.showcase-word');
    gsap.to(words, {
        filter: "blur(0px)",
        opacity: 1,
        y: 0,
        stagger: 0.018,
        duration: 0.22,
        ease: "power2.out",
        delay: 0.16,
        onComplete: done
    });
}
function leaveText(el, done) {
    const dir = transitionDirection.value;
    const y = (dir === 'next') ? 30 : -30; // swapped
    gsap.to(el, { opacity: 0, y, duration: 0.4, ease: "power2.in" });
    const words = el.querySelectorAll('.showcase-word');
    const wordY = (dir === 'next') ? 10 : -10; // swapped
    gsap.to(words, {
        opacity: 0,
        y: wordY,
        filter: "blur(14px)",
        stagger: 0.012,
        duration: 0.18,
        ease: "power2.in",
        onComplete: done
    });
}
// --- RERENDER IMAGE CONTAINER AND SIMULATE HOVER ---
async function onAfterLeaveImage() {
    active.value = nextActive.value;
    await nextTick();
    showImage.value = true;
    imageContainerKey.value += 1; // force rerender[6][1]
    await nextTick();
    simulatedHover.value = true;
    if (hoverTimeout)
        clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
        simulatedHover.value = false;
    }, 120); // 120ms simulated hover
}
onMounted(() => {
    if (autoplay) {
        autoplayInterval = setInterval(() => {
            handleNext();
        }, 5000);
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "project-showcase-root" },
    ...{ style: ({
            lineHeight: __VLS_ctx.spacing.lineHeight,
            backgroundColor: 'transparent',
            direction: __VLS_ctx.isRTL ? 'rtl' : 'ltr',
            paddingTop: __VLS_ctx.spacing.top + 'px',
            paddingBottom: __VLS_ctx.spacing.bottom + 'px'
        }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "project-showcase-grid" },
    ...{ style: ({
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: __VLS_ctx.calculateGap(1456) + 'px'
        }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "project-showcase-image-col" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "project-showcase-image-wrapper" },
    ...{ style: ({ paddingTop: (1 / __VLS_ctx.imageAspectRatio) * 100 + '%' }) },
});
const __VLS_0 = {}.Transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.Transition, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onBeforeEnter': {} },
    ...{ 'onEnter': {} },
    ...{ 'onLeave': {} },
    ...{ 'onAfterLeave': {} },
    mode: "out-in",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onBeforeEnter': {} },
    ...{ 'onEnter': {} },
    ...{ 'onLeave': {} },
    ...{ 'onAfterLeave': {} },
    mode: "out-in",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onBeforeEnter: (__VLS_ctx.beforeEnterImage)
};
const __VLS_8 = {
    onEnter: (__VLS_ctx.enterImage)
};
const __VLS_9 = {
    onLeave: (__VLS_ctx.leaveImage)
};
const __VLS_10 = {
    onAfterLeave: (__VLS_ctx.onAfterLeaveImage)
};
__VLS_3.slots.default;
if (__VLS_ctx.showImage) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (__VLS_ctx.testimonials[__VLS_ctx.active].src),
        ...{ class: "project-showcase-image-abs" },
        ...{ style: ({ zIndex: 1 }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onMouseenter: (...[$event]) => {
                if (!(__VLS_ctx.showImage))
                    return;
                __VLS_ctx.hoveredImage = __VLS_ctx.active;
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(__VLS_ctx.showImage))
                    return;
                __VLS_ctx.hoveredImage = null;
            } },
        key: (__VLS_ctx.imageContainerKey),
        ...{ class: "showcase-img-container" },
        ...{ class: ({ 'outline-hovered': __VLS_ctx.hoveredImage === __VLS_ctx.active || __VLS_ctx.simulatedHover }) },
        ...{ style: ({
                borderRadius: __VLS_ctx.outerRounding,
                padding: '1px',
                backgroundColor: (__VLS_ctx.hoveredImage === __VLS_ctx.active || __VLS_ctx.simulatedHover) ? __VLS_ctx.hoverOutlineColor : __VLS_ctx.outlineColor,
                transition: 'background-color 0.3s ease-in-out',
                height: '100%',
                width: '100%'
            }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "showcase-img-inner" },
        ...{ style: ({
                borderRadius: __VLS_ctx.innerRounding,
                overflow: 'hidden',
                height: '100%',
                width: '100%'
            }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.testimonials[__VLS_ctx.active].src),
        alt: (__VLS_ctx.testimonials[__VLS_ctx.active].name),
        ...{ style: {} },
        draggable: "false",
    });
}
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "project-showcase-text-col" },
});
const __VLS_11 = {}.Transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.Transition, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    ...{ 'onBeforeEnter': {} },
    ...{ 'onEnter': {} },
    ...{ 'onLeave': {} },
    mode: "out-in",
}));
const __VLS_13 = __VLS_12({
    ...{ 'onBeforeEnter': {} },
    ...{ 'onEnter': {} },
    ...{ 'onLeave': {} },
    mode: "out-in",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
let __VLS_15;
let __VLS_16;
let __VLS_17;
const __VLS_18 = {
    onBeforeEnter: (__VLS_ctx.beforeEnterText)
};
const __VLS_19 = {
    onEnter: (__VLS_ctx.enterText)
};
const __VLS_20 = {
    onLeave: (__VLS_ctx.leaveText)
};
__VLS_14.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "project-showcase-text-wrap" },
    key: (__VLS_ctx.testimonials[__VLS_ctx.active].name),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "project-showcase-name" },
    ...{ style: ({
            fontSize: __VLS_ctx.fontSizes.name,
            color: __VLS_ctx.colors.name,
            marginTop: __VLS_ctx.spacing.nameTop,
            marginBottom: __VLS_ctx.spacing.nameBottom,
            textAlign: __VLS_ctx.isRTL ? 'right' : undefined
        }) },
});
(__VLS_ctx.testimonials[__VLS_ctx.active].name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "project-showcase-position" },
    ...{ style: ({
            fontSize: __VLS_ctx.fontSizes.position,
            color: __VLS_ctx.colors.position,
            marginTop: __VLS_ctx.spacing.positionTop,
            marginBottom: __VLS_ctx.spacing.positionBottom,
            textAlign: __VLS_ctx.isRTL ? 'right' : undefined
        }) },
});
(__VLS_ctx.testimonials[__VLS_ctx.active].designation);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "project-showcase-quote" },
    ...{ style: ({
            fontSize: __VLS_ctx.fontSizes.testimony,
            color: __VLS_ctx.colors.testimony,
            marginTop: __VLS_ctx.spacing.testimonyTop,
            marginBottom: __VLS_ctx.spacing.testimonyBottom,
            textAlign: __VLS_ctx.isRTL ? 'right' : undefined
        }) },
});
for (const [word, i] of __VLS_getVForSourceType((__VLS_ctx.testimonials[__VLS_ctx.active].quote.split(' ')))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        key: (i),
        ...{ class: "showcase-word" },
        ...{ style: ({ display: 'inline-block' }) },
    });
    (word);
}
var __VLS_14;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "project-showcase-buttons" },
});
/** @type {[typeof HalomotButton, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(HalomotButton, new HalomotButton({
    ...{ 'onClick': {} },
    inscription: (__VLS_ctx.buttonInscriptions.previousButton),
    fixedWidth: "172px",
    gradient: (__VLS_ctx.halomotButtonGradient),
    backgroundColor: (__VLS_ctx.halomotButtonBackground),
    textColor: (__VLS_ctx.halomotButtonTextColor),
    innerBorderRadius: (__VLS_ctx.halomotButtonInnerBorderRadius),
    outerBorderRadius: (__VLS_ctx.halomotButtonOuterBorderRadius),
    hoverTextColor: (__VLS_ctx.halomotButtonHoverTextColor),
}));
const __VLS_22 = __VLS_21({
    ...{ 'onClick': {} },
    inscription: (__VLS_ctx.buttonInscriptions.previousButton),
    fixedWidth: "172px",
    gradient: (__VLS_ctx.halomotButtonGradient),
    backgroundColor: (__VLS_ctx.halomotButtonBackground),
    textColor: (__VLS_ctx.halomotButtonTextColor),
    innerBorderRadius: (__VLS_ctx.halomotButtonInnerBorderRadius),
    outerBorderRadius: (__VLS_ctx.halomotButtonOuterBorderRadius),
    hoverTextColor: (__VLS_ctx.halomotButtonHoverTextColor),
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
let __VLS_24;
let __VLS_25;
let __VLS_26;
const __VLS_27 = {
    onClick: (__VLS_ctx.handlePrev)
};
var __VLS_23;
/** @type {[typeof HalomotButton, ]} */ ;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(HalomotButton, new HalomotButton({
    ...{ 'onClick': {} },
    inscription: (__VLS_ctx.buttonInscriptions.nextButton),
    fixedWidth: "172px",
    gradient: (__VLS_ctx.halomotButtonGradient),
    backgroundColor: (__VLS_ctx.halomotButtonBackground),
    textColor: (__VLS_ctx.halomotButtonTextColor),
    innerBorderRadius: (__VLS_ctx.halomotButtonInnerBorderRadius),
    outerBorderRadius: (__VLS_ctx.halomotButtonOuterBorderRadius),
    hoverTextColor: (__VLS_ctx.halomotButtonHoverTextColor),
}));
const __VLS_29 = __VLS_28({
    ...{ 'onClick': {} },
    inscription: (__VLS_ctx.buttonInscriptions.nextButton),
    fixedWidth: "172px",
    gradient: (__VLS_ctx.halomotButtonGradient),
    backgroundColor: (__VLS_ctx.halomotButtonBackground),
    textColor: (__VLS_ctx.halomotButtonTextColor),
    innerBorderRadius: (__VLS_ctx.halomotButtonInnerBorderRadius),
    outerBorderRadius: (__VLS_ctx.halomotButtonOuterBorderRadius),
    hoverTextColor: (__VLS_ctx.halomotButtonHoverTextColor),
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
let __VLS_31;
let __VLS_32;
let __VLS_33;
const __VLS_34 = {
    onClick: (__VLS_ctx.handleNext)
};
var __VLS_30;
/** @type {[typeof HalomotButton, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(HalomotButton, new HalomotButton({
    ...{ 'onClick': {} },
    inscription: (__VLS_ctx.buttonInscriptions.openWebAppButton),
    fillWidth: true,
    gradient: (__VLS_ctx.halomotButtonGradient),
    backgroundColor: (__VLS_ctx.halomotButtonBackground),
    textColor: (__VLS_ctx.halomotButtonTextColor),
    innerBorderRadius: (__VLS_ctx.halomotButtonInnerBorderRadius),
    outerBorderRadius: (__VLS_ctx.halomotButtonOuterBorderRadius),
    hoverTextColor: (__VLS_ctx.halomotButtonHoverTextColor),
    href: (__VLS_ctx.testimonials[__VLS_ctx.active].link),
}));
const __VLS_36 = __VLS_35({
    ...{ 'onClick': {} },
    inscription: (__VLS_ctx.buttonInscriptions.openWebAppButton),
    fillWidth: true,
    gradient: (__VLS_ctx.halomotButtonGradient),
    backgroundColor: (__VLS_ctx.halomotButtonBackground),
    textColor: (__VLS_ctx.halomotButtonTextColor),
    innerBorderRadius: (__VLS_ctx.halomotButtonInnerBorderRadius),
    outerBorderRadius: (__VLS_ctx.halomotButtonOuterBorderRadius),
    hoverTextColor: (__VLS_ctx.halomotButtonHoverTextColor),
    href: (__VLS_ctx.testimonials[__VLS_ctx.active].link),
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
let __VLS_38;
let __VLS_39;
let __VLS_40;
const __VLS_41 = {
    onClick: (() => __VLS_ctx.onItemClick && __VLS_ctx.onItemClick(__VLS_ctx.testimonials[__VLS_ctx.active].link || ''))
};
var __VLS_37;
/** @type {__VLS_StyleScopedClasses['project-showcase-root']} */ ;
/** @type {__VLS_StyleScopedClasses['project-showcase-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['project-showcase-image-col']} */ ;
/** @type {__VLS_StyleScopedClasses['project-showcase-image-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['project-showcase-image-abs']} */ ;
/** @type {__VLS_StyleScopedClasses['showcase-img-container']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-hovered']} */ ;
/** @type {__VLS_StyleScopedClasses['showcase-img-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['project-showcase-text-col']} */ ;
/** @type {__VLS_StyleScopedClasses['project-showcase-text-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['project-showcase-name']} */ ;
/** @type {__VLS_StyleScopedClasses['project-showcase-position']} */ ;
/** @type {__VLS_StyleScopedClasses['project-showcase-quote']} */ ;
/** @type {__VLS_StyleScopedClasses['showcase-word']} */ ;
/** @type {__VLS_StyleScopedClasses['project-showcase-buttons']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            HalomotButton: HalomotButton,
            testimonials: testimonials,
            colors: colors,
            fontSizes: fontSizes,
            spacing: spacing,
            imageAspectRatio: imageAspectRatio,
            isRTL: isRTL,
            onItemClick: onItemClick,
            outerRounding: outerRounding,
            innerRounding: innerRounding,
            outlineColor: outlineColor,
            hoverOutlineColor: hoverOutlineColor,
            buttonInscriptions: buttonInscriptions,
            halomotButtonGradient: halomotButtonGradient,
            halomotButtonBackground: halomotButtonBackground,
            halomotButtonTextColor: halomotButtonTextColor,
            halomotButtonOuterBorderRadius: halomotButtonOuterBorderRadius,
            halomotButtonInnerBorderRadius: halomotButtonInnerBorderRadius,
            halomotButtonHoverTextColor: halomotButtonHoverTextColor,
            active: active,
            showImage: showImage,
            hoveredImage: hoveredImage,
            imageContainerKey: imageContainerKey,
            simulatedHover: simulatedHover,
            handleNext: handleNext,
            handlePrev: handlePrev,
            calculateGap: calculateGap,
            beforeEnterImage: beforeEnterImage,
            enterImage: enterImage,
            leaveImage: leaveImage,
            beforeEnterText: beforeEnterText,
            enterText: enterText,
            leaveText: leaveText,
            onAfterLeaveImage: onAfterLeaveImage,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=ProjectShowcase.vue.js.map