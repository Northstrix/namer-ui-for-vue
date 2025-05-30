import { ref, computed } from 'vue';
const props = withDefaults(defineProps(), {
    IconHeight: '34px',
    TopTextSize: '25px',
    width: '387px',
    height: '467px',
});
const isHovered = ref(false);
const baseWidth = computed(() => parseFloat(String(props.width)));
const baseHeight = computed(() => parseFloat(String(props.height)));
const desiredPaddingTopBottom = computed(() => (31 / 467) * baseHeight.value);
const desiredPaddingLeftRight = computed(() => (39 / 387) * baseWidth.value);
const bigInscriptionFontSize = computed(() => (0.7 * baseWidth.value + 0.3 * baseHeight.value) / (baseWidth.value / (96 * (baseWidth.value / 387))));
const smallInscriptionFontSize = computed(() => (0.7 * baseWidth.value + 0.3 * baseHeight.value) / (baseWidth.value / (18 * (baseWidth.value / 387))));
// Bottom text a bit bigger
const bottomInscriptionFontSize = computed(() => (0.7 * baseWidth.value + 0.3 * baseHeight.value) / (baseWidth.value / (14 * (baseWidth.value / 387))));
const topMarginBigInscription = computed(() => ((15 / baseHeight.value) * baseHeight.value + (15 / baseWidth.value) * baseWidth.value));
const bottomMarginBigInscription = computed(() => ((-17 / baseHeight.value) * baseHeight.value + (-17 / baseWidth.value) * baseWidth.value));
function handleBottomInscriptionClick() {
    if (props.learnMoreLink) {
        window.open(props.learnMoreLink, '_blank');
    }
}
const cardStyle = computed(() => ({
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    height: typeof props.height === 'number' ? `${props.height}px` : props.height,
    borderWidth: typeof props.BorderWidth === 'number' ? `${props.BorderWidth}px` : props.BorderWidth,
    borderColor: props.AccentColor,
    borderRadius: props.BorderRadius,
    backgroundColor: isHovered.value ? props.AccentColor : props.BackgroundColor,
    color: isHovered.value ? props.BackgroundColor : props.TextColor,
    boxShadow: isHovered.value
        ? `0 0 5px ${props.AccentColor}, 0 0 25px ${props.AccentColor}, 0 0 50px ${props.AccentColor}, 0 0 200px ${props.AccentColor}`
        : 'none',
    transition: 'background-color 0.3s, box-shadow 0.3s, color 0.3s',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxSizing: 'border-box',
    userSelect: 'none',
    // Remove 'cursor: pointer' from card!
}));
const textStyle = computed(() => ({
    padding: `${desiredPaddingTopBottom.value}px ${desiredPaddingLeftRight.value}px`,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    transition: 'color 0.3s',
    color: isHovered.value ? props.BackgroundColor : props.TextColor,
}));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    IconHeight: '34px',
    TopTextSize: '25px',
    width: '387px',
    height: '467px',
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onMouseenter: (...[$event]) => {
            __VLS_ctx.isHovered = true;
        } },
    ...{ onMouseleave: (...[$event]) => {
            __VLS_ctx.isHovered = false;
        } },
    ...{ class: "glowing-card" },
    ...{ style: (__VLS_ctx.cardStyle) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: (__VLS_ctx.textStyle) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "icon-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "icon-container" },
});
var __VLS_0 = {
    iconStyle: ({ height: props.IconHeight, width: 'auto', fontSize: props.IconHeight }),
};
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "top-inscription" },
    ...{ style: ({
            fontSize: props.TopTextSize,
            fontWeight: 'bold',
            marginLeft: '12px',
            display: 'flex',
            alignItems: 'center',
            lineHeight: 1,
        }) },
});
(props.TopInscription);
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ style: ({
            fontSize: __VLS_ctx.bigInscriptionFontSize + 'px',
            marginTop: __VLS_ctx.topMarginBigInscription + 'px',
            marginBottom: __VLS_ctx.bottomMarginBigInscription + 'px',
            fontWeight: 'bold',
        }) },
    ...{ class: "d-inline-block" },
});
(props.BigInscription);
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ style: ({
            fontSize: __VLS_ctx.smallInscriptionFontSize + 'px',
            marginTop: __VLS_ctx.topMarginBigInscription + 'px',
            marginBottom: 'auto',
            fontWeight: 'bold',
        }) },
    ...{ class: "d-inline-block" },
});
(props.SmallInscription);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ onClick: (__VLS_ctx.handleBottomInscriptionClick) },
    ...{ style: ({
            fontSize: __VLS_ctx.bottomInscriptionFontSize + 'px',
            marginBottom: '0.3em',
            marginTop: 'auto',
            textAlign: 'left',
            fontWeight: 'bold',
            cursor: props.learnMoreLink ? 'pointer' : 'default',
            letterSpacing: '0.02em',
        }) },
    ...{ class: "bottom-inscription" },
});
(props.BottomInscription);
/** @type {__VLS_StyleScopedClasses['glowing-card']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-row']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-container']} */ ;
/** @type {__VLS_StyleScopedClasses['top-inscription']} */ ;
/** @type {__VLS_StyleScopedClasses['d-inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['d-inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-inscription']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            isHovered: isHovered,
            bigInscriptionFontSize: bigInscriptionFontSize,
            smallInscriptionFontSize: smallInscriptionFontSize,
            bottomInscriptionFontSize: bottomInscriptionFontSize,
            topMarginBigInscription: topMarginBigInscription,
            bottomMarginBigInscription: bottomMarginBigInscription,
            handleBottomInscriptionClick: handleBottomInscriptionClick,
            cardStyle: cardStyle,
            textStyle: textStyle,
        };
    },
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    props: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=GlowingCard.vue.js.map