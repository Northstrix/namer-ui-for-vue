import { computed, defineProps, defineEmits } from 'vue';
const props = defineProps();
const emit = defineEmits();
const mainAspect = props.mainAspect ?? '16/9';
const leftColRatio = props.leftColRatio ?? 0.6;
const rightCol1 = props.rightCol1 ?? 0.5;
const rightCol2 = props.rightCol2 ?? 0.5;
const topRowRatio = props.topRowRatio ?? 0.65;
const bottomRowRatio = props.bottomRowRatio ?? 0.35;
const gap = props.gap ?? '16px';
const gridHeight = props.gridHeight ?? '100%';
const rightGroupTotal = rightCol1 + rightCol2;
const rightCol1Frac = rightCol1 / rightGroupTotal;
const rightCol2Frac = rightCol2 / rightGroupTotal;
const gridVars = computed(() => ({
    '--main-aspect': mainAspect,
    '--left-col': `${leftColRatio}fr`,
    '--right-col1': `${(1 - leftColRatio) * rightCol1Frac}fr`,
    '--right-col2': `${(1 - leftColRatio) * rightCol2Frac}fr`,
    '--top-row': `${topRowRatio}fr`,
    '--bottom-row': `${bottomRowRatio}fr`,
    '--gap': gap,
    height: gridHeight,
}));
// Explicit key maps for type-safe prop access
const backgroundKeys = {
    main: 'mainCellBackground',
    topCenter: 'topCenterCellBackground',
    topRight: 'topRightCellBackground',
    bottom: 'bottomCellBackground'
};
const borderColorKeys = {
    main: 'mainCellBorderColor',
    topCenter: 'topCenterCellBorderColor',
    topRight: 'topRightCellBorderColor',
    bottom: 'bottomCellBorderColor'
};
const borderRadiusKeys = {
    main: 'mainCellBorderRadius',
    topCenter: 'topCenterCellBorderRadius',
    topRight: 'topRightCellBorderRadius',
    bottom: 'bottomCellBorderRadius'
};
const borderWidthKeys = {
    main: 'mainCellBorderWidth',
    topCenter: 'topCenterCellBorderWidth',
    topRight: 'topRightCellBorderWidth',
    bottom: 'bottomCellBorderWidth'
};
const paddingKeys = {
    main: 'mainCellPadding',
    topCenter: 'topCenterCellPadding',
    topRight: 'topRightCellPadding',
    bottom: 'bottomCellPadding'
};
const paddingTopKeys = {
    main: 'mainCellPaddingTop',
    topCenter: 'topCenterCellPaddingTop',
    topRight: 'topRightCellPaddingTop',
    bottom: 'bottomCellPaddingTop'
};
const paddingRightKeys = {
    main: 'mainCellPaddingRight',
    topCenter: 'topCenterCellPaddingRight',
    topRight: 'topRightCellPaddingRight',
    bottom: 'bottomCellPaddingRight'
};
const paddingBottomKeys = {
    main: 'mainCellPaddingBottom',
    topCenter: 'topCenterCellPaddingBottom',
    topRight: 'topRightCellPaddingBottom',
    bottom: 'bottomCellPaddingBottom'
};
const paddingLeftKeys = {
    main: 'mainCellPaddingLeft',
    topCenter: 'topCenterCellPaddingLeft',
    topRight: 'topRightCellPaddingLeft',
    bottom: 'bottomCellPaddingLeft'
};
function cellStyle(cell) {
    const background = props[backgroundKeys[cell]] ?? props.cellBackground ?? '#17161c';
    const borderColor = props[borderColorKeys[cell]] ?? props.cellBorderColor ?? '#33313d';
    const borderRadius = props[borderRadiusKeys[cell]] ?? props.cellBorderRadius ?? '8px';
    const borderWidth = props[borderWidthKeys[cell]] ?? props.cellBorderWidth ?? '1px';
    const padding = props[paddingKeys[cell]] ?? props.cellPadding ?? '16px';
    const paddingTop = props[paddingTopKeys[cell]] ?? props.cellPaddingTop;
    const paddingRight = props[paddingRightKeys[cell]] ?? props.cellPaddingRight;
    const paddingBottom = props[paddingBottomKeys[cell]] ?? props.cellPaddingBottom;
    const paddingLeft = props[paddingLeftKeys[cell]] ?? props.cellPaddingLeft;
    let paddingStyle;
    if (paddingTop !== undefined ||
        paddingRight !== undefined ||
        paddingBottom !== undefined ||
        paddingLeft !== undefined) {
        paddingStyle = [
            paddingTop ?? padding,
            paddingRight ?? padding,
            paddingBottom ?? padding,
            paddingLeft ?? padding,
        ].join(' ');
    }
    else {
        paddingStyle = padding;
    }
    return {
        background,
        border: `${borderWidth} solid ${borderColor}`,
        borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        padding: paddingStyle,
    };
}
// --- Add cell click callback ---
function onCellClick(cell) {
    emit('cellClick', cell);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "bento-grid" },
    ...{ style: (__VLS_ctx.gridVars) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.onCellClick('main');
        } },
    ...{ class: "cell cell-main" },
    ...{ style: (__VLS_ctx.cellStyle('main')) },
});
var __VLS_0 = {};
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.onCellClick('topCenter');
        } },
    ...{ class: "cell cell-top-left" },
    ...{ style: (__VLS_ctx.cellStyle('topCenter')) },
});
var __VLS_2 = {};
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.onCellClick('topRight');
        } },
    ...{ class: "cell cell-top-right" },
    ...{ style: (__VLS_ctx.cellStyle('topRight')) },
});
var __VLS_4 = {};
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.onCellClick('bottom');
        } },
    ...{ class: "cell cell-bottom" },
    ...{ style: (__VLS_ctx.cellStyle('bottom')) },
});
var __VLS_6 = {};
/** @type {__VLS_StyleScopedClasses['bento-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell-main']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell-top-left']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell-top-right']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell-bottom']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2, __VLS_5 = __VLS_4, __VLS_7 = __VLS_6;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            gridVars: gridVars,
            cellStyle: cellStyle,
            onCellClick: onCellClick,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=BentoGrid.vue.js.map