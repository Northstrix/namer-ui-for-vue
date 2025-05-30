import { ref, onMounted, nextTick } from 'vue';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';
const props = defineProps();
const { testimonials, autoplay = true, colors = {}, fontSizes = {} } = props;
// Default colors
const colorName = colors.name ?? "#000";
const colorDesignation = colors.designation ?? "#6b7280";
const colorTestimony = colors.testimony ?? "#4b5563";
const colorArrowBg = colors.arrowBackground ?? "#141414";
const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
// Default font sizes
const fontSizeName = fontSizes.name ?? "1.5rem";
const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
const fontSizeQuote = fontSizes.quote ?? "1.125rem";
const activeIndex = ref(0);
let autoplayInterval = null;
const imageContainer = ref(null);
const nameRef = ref(null);
const designationRef = ref(null);
const quoteRef = ref(null);
const hoverPrev = ref(false);
const hoverNext = ref(false);
function calculateGap(width) {
    const minWidth = 1024;
    const maxWidth = 1456;
    const minGap = 60;
    const maxGap = 86;
    if (width <= minWidth)
        return minGap;
    if (width >= maxWidth)
        return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
    return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}
function animateWords() {
    if (!quoteRef.value)
        return;
    gsap.from(quoteRef.value.querySelectorAll('.word'), {
        opacity: 0,
        y: 10,
        stagger: 0.02,
        duration: 0.2,
        ease: "power2.out"
    });
}
function updateTestimonial(direction) {
    activeIndex.value = (activeIndex.value + direction + testimonials.length) % testimonials.length;
    nextTick(() => {
        if (imageContainer.value) {
            const containerWidth = imageContainer.value.offsetWidth;
            const gap = calculateGap(containerWidth);
            const maxStickUp = gap * 0.8;
            testimonials.forEach((testimonial, index) => {
                const img = imageContainer.value.querySelector(`[data-index="${index}"]`);
                if (!img)
                    return;
                const offset = (index - activeIndex.value + testimonials.length) % testimonials.length;
                const zIndex = testimonials.length - Math.abs(offset);
                const opacity = index === activeIndex.value ? 1 : 1;
                const scale = index === activeIndex.value ? 1 : 0.85;
                let translateX, translateY, rotateY;
                if (offset === 0) {
                    translateX = '0%';
                    translateY = '0%';
                    rotateY = 0;
                }
                else if (offset === 1 || offset === -2) {
                    translateX = '20%';
                    translateY = `-${maxStickUp / img.offsetHeight * 100}%`;
                    rotateY = -15;
                }
                else {
                    translateX = '-20%';
                    translateY = `-${maxStickUp / img.offsetHeight * 100}%`;
                    rotateY = 15;
                }
                gsap.to(img, {
                    zIndex: zIndex,
                    opacity: opacity,
                    scale: scale,
                    x: translateX,
                    y: translateY,
                    rotateY: rotateY,
                    duration: 0.8,
                    ease: "power3.out"
                });
            });
        }
        if (nameRef.value && designationRef.value) {
            gsap.to([nameRef.value, designationRef.value], {
                opacity: 0, y: -20, duration: 0.3, ease: "power2.in", onComplete: () => {
                    nameRef.value.textContent = testimonials[activeIndex.value].name;
                    designationRef.value.textContent = testimonials[activeIndex.value].designation;
                    gsap.to([nameRef.value, designationRef.value], { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
                }
            });
        }
        if (quoteRef.value) {
            gsap.to(quoteRef.value, {
                opacity: 0, y: -20, duration: 0.3, ease: "power2.in", onComplete: () => {
                    quoteRef.value.innerHTML = testimonials[activeIndex.value].quote.split(' ').map(word => `<span class="word">${word}</span>`).join(' ');
                    gsap.to(quoteRef.value, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
                    animateWords();
                }
            });
        }
    });
}
function handleNext() {
    updateTestimonial(1);
    stopAutoplay();
}
function handlePrev() {
    updateTestimonial(-1);
    stopAutoplay();
}
function stopAutoplay() {
    if (autoplayInterval)
        clearInterval(autoplayInterval);
}
onMounted(() => {
    nextTick(() => {
        if (nameRef.value)
            nameRef.value.textContent = testimonials[activeIndex.value].name;
        if (designationRef.value)
            designationRef.value.textContent = testimonials[activeIndex.value].designation;
        if (quoteRef.value) {
            quoteRef.value.innerHTML = testimonials[activeIndex.value].quote.split(' ').map(word => `<span class="word">${word}</span>`).join(' ');
            animateWords();
        }
        if (imageContainer.value) {
            updateTestimonial(0);
        }
    });
    if (autoplay) {
        autoplayInterval = setInterval(() => updateTestimonial(1), 5000);
    }
    window.addEventListener('resize', () => updateTestimonial(0));
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['testimonial-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow-buttons']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "testimonial-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "testimonial-grid" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "image-container" },
    ref: "imageContainer",
});
/** @type {typeof __VLS_ctx.imageContainer} */ ;
for (const [testimonial, index] of __VLS_getVForSourceType((__VLS_ctx.testimonials))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        key: (testimonial.src),
        src: (testimonial.src),
        alt: (testimonial.name),
        ...{ class: "testimonial-image" },
        'data-index': (index),
        ...{ style: ({ opacity: index === __VLS_ctx.activeIndex ? 1 : 1, zIndex: __VLS_ctx.testimonials.length - Math.abs(index - __VLS_ctx.activeIndex) }) },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "testimonial-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "name" },
    ref: "nameRef",
    ...{ style: ({ color: __VLS_ctx.colorName, fontSize: __VLS_ctx.fontSizeName }) },
});
/** @type {typeof __VLS_ctx.nameRef} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "designation" },
    ref: "designationRef",
    ...{ style: ({ color: __VLS_ctx.colorDesignation, fontSize: __VLS_ctx.fontSizeDesignation }) },
});
/** @type {typeof __VLS_ctx.designationRef} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "quote" },
    ref: "quoteRef",
    ...{ style: ({ color: __VLS_ctx.colorTestimony, fontSize: __VLS_ctx.fontSizeQuote }) },
});
/** @type {typeof __VLS_ctx.quoteRef} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "arrow-buttons" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handlePrev) },
    ...{ onMouseenter: (...[$event]) => {
            __VLS_ctx.hoverPrev = true;
        } },
    ...{ onMouseleave: (...[$event]) => {
            __VLS_ctx.hoverPrev = false;
        } },
    ...{ class: "arrow-button prev-button" },
    ...{ style: ({ backgroundColor: __VLS_ctx.hoverPrev ? __VLS_ctx.colorArrowHoverBg : __VLS_ctx.colorArrowBg }) },
});
const __VLS_0 = {}.ArrowLeft;
/** @type {[typeof __VLS_components.ArrowLeft, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    size: (44),
    color: (__VLS_ctx.colorArrowFg),
}));
const __VLS_2 = __VLS_1({
    size: (44),
    color: (__VLS_ctx.colorArrowFg),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleNext) },
    ...{ onMouseenter: (...[$event]) => {
            __VLS_ctx.hoverNext = true;
        } },
    ...{ onMouseleave: (...[$event]) => {
            __VLS_ctx.hoverNext = false;
        } },
    ...{ class: "arrow-button next-button" },
    ...{ style: ({ backgroundColor: __VLS_ctx.hoverNext ? __VLS_ctx.colorArrowHoverBg : __VLS_ctx.colorArrowBg }) },
});
const __VLS_4 = {}.ArrowRight;
/** @type {[typeof __VLS_components.ArrowRight, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    size: (44),
    color: (__VLS_ctx.colorArrowFg),
}));
const __VLS_6 = __VLS_5({
    size: (44),
    color: (__VLS_ctx.colorArrowFg),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
/** @type {__VLS_StyleScopedClasses['testimonial-container']} */ ;
/** @type {__VLS_StyleScopedClasses['testimonial-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['image-container']} */ ;
/** @type {__VLS_StyleScopedClasses['testimonial-image']} */ ;
/** @type {__VLS_StyleScopedClasses['testimonial-content']} */ ;
/** @type {__VLS_StyleScopedClasses['name']} */ ;
/** @type {__VLS_StyleScopedClasses['designation']} */ ;
/** @type {__VLS_StyleScopedClasses['quote']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow-button']} */ ;
/** @type {__VLS_StyleScopedClasses['prev-button']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow-button']} */ ;
/** @type {__VLS_StyleScopedClasses['next-button']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ArrowLeft: ArrowLeft,
            ArrowRight: ArrowRight,
            testimonials: testimonials,
            colorName: colorName,
            colorDesignation: colorDesignation,
            colorTestimony: colorTestimony,
            colorArrowBg: colorArrowBg,
            colorArrowFg: colorArrowFg,
            colorArrowHoverBg: colorArrowHoverBg,
            fontSizeName: fontSizeName,
            fontSizeDesignation: fontSizeDesignation,
            fontSizeQuote: fontSizeQuote,
            activeIndex: activeIndex,
            imageContainer: imageContainer,
            nameRef: nameRef,
            designationRef: designationRef,
            quoteRef: quoteRef,
            hoverPrev: hoverPrev,
            hoverNext: hoverNext,
            handleNext: handleNext,
            handlePrev: handlePrev,
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
//# sourceMappingURL=CircularTestimonials.vue.js.map