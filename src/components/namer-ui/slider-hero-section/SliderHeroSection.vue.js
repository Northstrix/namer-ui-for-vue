import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
const emit = defineEmits();
const props = defineProps();
const activeOptionColor = props.activeOptionColor ?? '#00a6fb';
const textColor = props.textColor ?? '#ffffff';
const imageChangeInterval = props.imageChangeInterval ?? 4000;
const imageTransitionDuration = props.imageTransitionDuration ?? 0.76;
const desktopFontSize = props.desktopFontSize ?? '62px';
const mobileFontSize = props.mobileFontSize ?? '33px';
const desktopShowcaseFontSize = props.desktopShowcaseFontSize ?? '36px';
const mobileShowcaseFontSize = props.mobileShowcaseFontSize ?? '25px';
const desktopVersionBottomThreshold = props.desktopVersionBottomThreshold ?? 768;
const darkenImages = props.darkenImages ?? 0.5;
const desktopPadding = props.desktopPadding ?? { top: '62px', bottom: '67px', leftRight: '24px' };
const mobilePadding = props.mobilePadding ?? { top: '39px', bottom: '39px', leftRight: '10px' };
const height = props.height ?? '100vh';
const titleFontWeight = props.titleFontWeight ?? 700;
const showcaseFontWeight = props.showcaseFontWeight ?? 700;
const borderRadius = props.borderRadius ?? 'none';
const desktopTitleAlign = props.desktopTitleAlign ?? 'left';
const mobileTitleAlign = props.mobileTitleAlign ?? 'center';
const desktopShowcaseAlign = props.desktopShowcaseAlign ?? 'left';
const mobileShowcaseAlign = props.mobileShowcaseAlign ?? 'center';
const activeIndex = ref(0);
const isMobileView = ref(false);
const isHovered = ref(false);
const containerRef = ref(null);
let intervalId = null;
const firstOptionText = computed(() => props.showcaseOptions[0]?.text || '');
function isRTL(text) {
    return /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(text);
}
// Alignment helpers
function alignToText(align) {
    switch (align) {
        case 'left':
        case 'right':
        case 'center':
            return align;
        default:
            return 'left';
    }
}
function showcaseMarginAuto(align, isRtl) {
    if (align === 'right') {
        return isRtl ? { marginRight: 'auto' } : { marginLeft: 'auto' };
    }
    if (align === 'center') {
        return { marginLeft: 'auto', marginRight: 'auto' };
    }
    // left
    return isRtl ? { marginLeft: 'auto' } : { marginRight: 'auto' };
}
// Responsive
function handleResize() {
    if (containerRef.value) {
        isMobileView.value = containerRef.value.offsetWidth < desktopVersionBottomThreshold;
    }
}
const dynamicMediaQuery = computed(() => `@media (max-width: ${desktopVersionBottomThreshold - 1}px)`);
function injectDynamicMediaQuery() {
    const prev = document.getElementById('slider-hero-dynamic-media');
    if (prev)
        prev.remove();
    const style = document.createElement('style');
    style.id = 'slider-hero-dynamic-media';
    style.innerHTML = `
    ${dynamicMediaQuery.value} {
      .slider-hero-title {
        line-height: 1.15;
      }
    }
  `;
    document.head.appendChild(style);
}
onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    injectDynamicMediaQuery();
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    if (intervalId)
        clearInterval(intervalId);
    const prev = document.getElementById('slider-hero-dynamic-media');
    if (prev)
        prev.remove();
});
watch(() => desktopVersionBottomThreshold, () => injectDynamicMediaQuery());
watch(() => containerRef.value?.offsetWidth, () => handleResize());
// Auto slide
function startInterval() {
    if (intervalId)
        clearInterval(intervalId);
    if (!isHovered.value) {
        intervalId = setInterval(() => {
            activeIndex.value = (activeIndex.value + 1) % props.showcaseOptions.length;
        }, imageChangeInterval);
    }
}
watch([isHovered, () => props.showcaseOptions.length, () => imageChangeInterval], startInterval, { immediate: true });
onBeforeUnmount(() => intervalId && clearInterval(intervalId));
function handleOptionClick(idx) {
    activeIndex.value = idx;
    emit('onOptionClick', idx);
}
function handleOptionHover(idx) {
    activeIndex.value = idx;
    isHovered.value = true;
    emit('onOptionHover', idx);
}
function handleOptionLeave() {
    isHovered.value = false;
}
const containerStyle = computed(() => ({
    height,
    borderRadius,
    overflow: 'hidden',
    padding: isMobileView.value
        ? `${mobilePadding.top} ${mobilePadding.leftRight} ${mobilePadding.bottom}`
        : `${desktopPadding.top} ${desktopPadding.leftRight} ${desktopPadding.bottom}`,
}));
function bgImageStyle(url, isActive) {
    return {
        backgroundImage: `url(${url})`,
        opacity: isActive ? 1 : 0,
        transition: `opacity ${imageTransitionDuration}s cubic-bezier(0.77,0,0.175,1)`,
        borderRadius,
    };
}
const overlayStyle = computed(() => ({
    backgroundColor: darkenImages >= 0
        ? `rgba(0,0,0,${darkenImages})`
        : `rgba(255,255,255,${Math.abs(darkenImages)})`,
    borderRadius,
}));
const titleStyle = computed(() => ({
    fontSize: isMobileView.value ? mobileFontSize : desktopFontSize,
    color: textColor,
    textAlign: isMobileView.value ? alignToText(mobileTitleAlign) : alignToText(desktopTitleAlign),
    fontWeight: titleFontWeight,
}));
const showcaseContainerStyle = computed(() => {
    const align = isMobileView.value ? mobileShowcaseAlign : desktopShowcaseAlign;
    const isRtl = isRTL(firstOptionText.value);
    return {
        textAlign: alignToText(align),
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '0.25em',
        width: '100%',
        ...showcaseMarginAuto(align, isRtl),
    };
});
function showcaseOptionStyle(isActive) {
    return {
        color: isActive ? activeOptionColor : textColor,
        fontSize: isMobileView.value ? mobileShowcaseFontSize : desktopShowcaseFontSize,
        textAlign: isMobileView.value
            ? alignToText(mobileShowcaseAlign)
            : alignToText(desktopShowcaseAlign),
        transition: 'color 0.3s',
        cursor: 'pointer',
        fontWeight: showcaseFontWeight,
        textDecoration: 'none',
    };
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['slider-hero-title']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-hero-title']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-hero-showcase']} */ ;
/** @type {__VLS_StyleScopedClasses['rtl']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-hero-showcase']} */ ;
/** @type {__VLS_StyleScopedClasses['ltr']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-hero-showcase-option']} */ ;
/** @type {__VLS_StyleScopedClasses['rtl']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-hero-showcase-option']} */ ;
/** @type {__VLS_StyleScopedClasses['ltr']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "slider-hero-container" },
    ...{ style: (__VLS_ctx.containerStyle) },
    ref: "containerRef",
});
/** @type {typeof __VLS_ctx.containerRef} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "slider-hero-bg-images" },
});
for (const [option, idx] of __VLS_getVForSourceType((__VLS_ctx.showcaseOptions))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (idx),
        ...{ class: "slider-hero-bg-image" },
        ...{ style: (__VLS_ctx.bgImageStyle(option.imageUrl, idx === __VLS_ctx.activeIndex)) },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "slider-hero-overlay" },
    ...{ style: (__VLS_ctx.overlayStyle) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "slider-hero-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "slider-hero-title" },
    ...{ class: ([__VLS_ctx.isMobileView ? 'mobile' : 'desktop', __VLS_ctx.isRTL(__VLS_ctx.title) ? 'rtl' : 'ltr']) },
    ...{ style: (__VLS_ctx.titleStyle) },
});
(__VLS_ctx.title);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "slider-hero-showcase" },
    ...{ class: ([__VLS_ctx.isMobileView ? 'mobile' : 'desktop', __VLS_ctx.isRTL(__VLS_ctx.firstOptionText) ? 'rtl' : 'ltr']) },
    ...{ style: (__VLS_ctx.showcaseContainerStyle) },
});
for (const [option, idx] of __VLS_getVForSourceType((__VLS_ctx.showcaseOptions))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.handleOptionClick(idx);
            } },
        ...{ onMouseenter: (...[$event]) => {
                __VLS_ctx.handleOptionHover(idx);
            } },
        ...{ onMouseleave: (__VLS_ctx.handleOptionLeave) },
        key: (idx),
        ...{ class: "slider-hero-showcase-option" },
        ...{ class: ([
                __VLS_ctx.isMobileView ? 'mobile' : 'desktop',
                __VLS_ctx.isRTL(option.text) ? 'rtl' : 'ltr',
                idx === __VLS_ctx.activeIndex ? 'active' : ''
            ]) },
        ...{ style: (__VLS_ctx.showcaseOptionStyle(idx === __VLS_ctx.activeIndex)) },
    });
    (option.text);
}
/** @type {__VLS_StyleScopedClasses['slider-hero-container']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-hero-bg-images']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-hero-bg-image']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-hero-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-hero-content']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-hero-title']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-hero-showcase']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-hero-showcase-option']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            activeIndex: activeIndex,
            isMobileView: isMobileView,
            containerRef: containerRef,
            firstOptionText: firstOptionText,
            isRTL: isRTL,
            handleOptionClick: handleOptionClick,
            handleOptionHover: handleOptionHover,
            handleOptionLeave: handleOptionLeave,
            containerStyle: containerStyle,
            bgImageStyle: bgImageStyle,
            overlayStyle: overlayStyle,
            titleStyle: titleStyle,
            showcaseContainerStyle: showcaseContainerStyle,
            showcaseOptionStyle: showcaseOptionStyle,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=SliderHeroSection.vue.js.map