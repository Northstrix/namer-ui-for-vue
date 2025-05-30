import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
const props = defineProps();
const { componentWidth = "412px", aspectRatio = "3/4", outerRounding = "18px", innerRounding = "18px", backgroundColor = "#FFF", foregroundColor = "#000", imageHeightPercentage = 70, imageSrc, imageAlt = "", outlineColor = "#ddd", hoverOutlineColor = "#aaa", textArray, minWidth, maxWidth, minTextSize, maxTextSize, verticalPadding = "20px", horizontalPadding = "20px", manualLetterSpacing, componentId = "card-1", onCardClicked, textColorTransitionDelay = "1s", textColorTransitionDuration = "2.4s" } = props;
const containerRef = ref(null);
const textSize = ref(maxTextSize);
const letterSpacing = ref(manualLetterSpacing ?? 0);
const isHovered = ref(false);
function updateTextSizeAndSpacing() {
    if (!containerRef.value)
        return;
    // --- Dynamic text size ---
    const width = containerRef.value.offsetWidth;
    const calculatedTextSize = ((maxTextSize - minTextSize) / (maxWidth - minWidth)) * (width - minWidth) + minTextSize;
    textSize.value = Math.max(minTextSize, Math.min(calculatedTextSize, maxTextSize));
    // --- Dynamic letter spacing (vertical, proportional to text size) ---
    if (manualLetterSpacing !== undefined) {
        letterSpacing.value = manualLetterSpacing;
        return;
    }
    if (textArray.length > 1) {
        // Try to fill the available height (minus paddings)
        const height = containerRef.value.offsetHeight;
        const availableHeight = height - parseInt(verticalPadding) * 2;
        letterSpacing.value = (availableHeight - textSize.value * textArray.length) / (textArray.length - 1);
    }
    else {
        letterSpacing.value = 0;
    }
}
onMounted(() => {
    nextTick(updateTextSizeAndSpacing);
    window.addEventListener('resize', updateTextSizeAndSpacing);
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', updateTextSizeAndSpacing);
});
watch([() => props.manualLetterSpacing, textArray, textSize, () => props.verticalPadding], () => nextTick(updateTextSizeAndSpacing));
const textTransition = `color ${textColorTransitionDuration} ease-in-out ${textColorTransitionDelay}`;
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (__VLS_ctx.onCardClicked) },
    ref: "containerRef",
    ...{ class: "playing-card-root" },
    ...{ style: ({
            maxWidth: __VLS_ctx.componentWidth,
            width: '100%',
        }) },
    'data-component-id': (__VLS_ctx.componentId),
});
/** @type {typeof __VLS_ctx.containerRef} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onMouseenter: (...[$event]) => {
            __VLS_ctx.isHovered = true;
        } },
    ...{ onMouseleave: (...[$event]) => {
            __VLS_ctx.isHovered = false;
        } },
    ...{ class: "playing-card-outer" },
    ...{ style: ({
            borderRadius: __VLS_ctx.outerRounding,
            padding: '1px',
            background: __VLS_ctx.isHovered ? __VLS_ctx.hoverOutlineColor : __VLS_ctx.outlineColor,
            width: '100%',
            aspectRatio: __VLS_ctx.aspectRatio,
            transition: 'background 0.3s ease-in-out',
            cursor: 'pointer'
        }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "playing-card-inner" },
    ...{ style: ({
            backgroundColor: __VLS_ctx.backgroundColor,
            padding: `${__VLS_ctx.verticalPadding} ${__VLS_ctx.horizontalPadding}`,
            borderRadius: __VLS_ctx.innerRounding,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            color: __VLS_ctx.foregroundColor,
            position: 'relative',
            overflow: 'hidden',
            transition: 'background-color 0.3s ease-in-out'
        }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: (`${__VLS_ctx.componentId}-text`),
    ...{ class: "playing-card-text-vertical" },
    ...{ style: ({
            position: 'absolute',
            top: __VLS_ctx.verticalPadding,
            left: __VLS_ctx.horizontalPadding,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 2,
            color: __VLS_ctx.isHovered ? '#f12b30' : '#3662f4',
            fontWeight: 'bold',
            fontSize: `${__VLS_ctx.textSize}px`,
            transition: __VLS_ctx.textTransition
        }) },
});
for (const [letter, index] of __VLS_getVForSourceType((__VLS_ctx.textArray))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (`${__VLS_ctx.componentId}-letter-${index}`),
        ...{ style: ({
                marginBottom: index !== __VLS_ctx.textArray.length - 1 ? `${__VLS_ctx.letterSpacing}px` : '0',
                letterSpacing: '0'
            }) },
    });
    (letter);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: (`${__VLS_ctx.componentId}-mirror`),
    ...{ class: "playing-card-text-vertical" },
    ...{ style: ({
            position: 'absolute',
            bottom: __VLS_ctx.verticalPadding,
            right: __VLS_ctx.horizontalPadding,
            display: 'flex',
            flexDirection: 'column',
            transform: 'scale(-1)',
            zIndex: 2,
            color: __VLS_ctx.isHovered ? '#f12b30' : '#3662f4',
            fontWeight: 'bold',
            fontSize: `${__VLS_ctx.textSize}px`,
            transition: __VLS_ctx.textTransition
        }) },
});
for (const [letter, index] of __VLS_getVForSourceType((__VLS_ctx.textArray))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (`${__VLS_ctx.componentId}-mirror-letter-${index}`),
        ...{ style: ({
                marginBottom: index !== __VLS_ctx.textArray.length - 1 ? `${__VLS_ctx.letterSpacing}px` : '0',
                letterSpacing: '0'
            }) },
    });
    (letter);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: ({
            position: 'relative',
            height: __VLS_ctx.imageHeightPercentage + '%',
            width: 'auto',
            aspectRatio: '1/1'
        }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.imageSrc),
    alt: (__VLS_ctx.imageAlt),
    draggable: "false",
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['playing-card-root']} */ ;
/** @type {__VLS_StyleScopedClasses['playing-card-outer']} */ ;
/** @type {__VLS_StyleScopedClasses['playing-card-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['playing-card-text-vertical']} */ ;
/** @type {__VLS_StyleScopedClasses['playing-card-text-vertical']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            componentWidth: componentWidth,
            aspectRatio: aspectRatio,
            outerRounding: outerRounding,
            innerRounding: innerRounding,
            backgroundColor: backgroundColor,
            foregroundColor: foregroundColor,
            imageHeightPercentage: imageHeightPercentage,
            imageSrc: imageSrc,
            imageAlt: imageAlt,
            outlineColor: outlineColor,
            hoverOutlineColor: hoverOutlineColor,
            textArray: textArray,
            verticalPadding: verticalPadding,
            horizontalPadding: horizontalPadding,
            componentId: componentId,
            onCardClicked: onCardClicked,
            containerRef: containerRef,
            textSize: textSize,
            letterSpacing: letterSpacing,
            isHovered: isHovered,
            textTransition: textTransition,
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
//# sourceMappingURL=PlayingCard.vue.js.map