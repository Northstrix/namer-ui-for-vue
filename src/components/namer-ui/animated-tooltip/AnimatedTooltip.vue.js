import { ref, computed, reactive } from 'vue';
const props = defineProps();
const emit = defineEmits();
const hoveredIndex = ref(null);
const bgAnimated = ref(false);
const borderVisible = ref(false);
const tooltipTransform = reactive({ rotate: 0, translateX: 0 });
let borderTimeout;
const global = computed(() => ({
    tooltipColor: props.tooltipColor ?? '#23272f',
    tooltipBorderEffectColors: props.tooltipBorderEffectColors ?? [
        '#888 0',
        '#444 20%',
        'transparent 80%',
    ],
    tooltipBorderEffectRotation: props.tooltipBorderEffectRotation ?? '2.5rad',
    tooltipBorderEffectThickness: props.tooltipBorderEffectThickness ?? '2px',
    tooltipBorderEffectPercentage: typeof props.tooltipBorderEffectPercentage === 'number'
        ? props.tooltipBorderEffectPercentage
        : 100,
    tooltipRounding: props.tooltipRounding ?? 12,
    tooltipWidth: props.tooltipWidth ?? '220px',
    tooltipPadding: props.tooltipPadding ?? '1.2rem 1.5rem',
    appearanceEffect: props.appearanceEffect ?? 'from-bottom-right',
    tooltipPosition: props.tooltipPosition ?? 'bottom',
    borderEffectDelay: props.borderEffectDelay ?? 1000,
    nameFontSize: props.nameFontSize ?? '1.1rem',
    designationFontSize: props.designationFontSize ?? '0.95rem',
    nameColor: props.nameColor ?? '#fff',
    designationColor: props.designationColor ?? '#fff',
    imageOutlineColor: props.imageOutlineColor ?? '#0984e3',
    imageOutlineWidth: props.imageOutlineWidth ?? '2px',
    imageRounding: props.imageRounding ?? 20,
    imageOutlineColorOverwrite: props.imageOutlineColorOverwrite,
    tooltipBgColor: props.tooltipBgColor ?? 'rgba(255,255,255,0.08)',
    tooltipDotColor: props.tooltipDotColor ?? 'rgba(255,255,255,0.15)',
    tintTilt: props.tintTilt ?? true,
    tooltipOffsetY: typeof props.tooltipOffsetY === 'number' ? props.tooltipOffsetY : 16,
    avatarGap: props.avatarGap ?? '32px',
}));
function showTooltip(id) {
    hoveredIndex.value = id;
    bgAnimated.value = false;
    borderVisible.value = false;
    setTimeout(() => {
        bgAnimated.value = true;
    }, 350);
    borderTimeout = window.setTimeout(() => {
        borderVisible.value = true;
    }, getItem('borderEffectDelay', id));
}
function hideTooltip() {
    hoveredIndex.value = null;
    bgAnimated.value = false;
    borderVisible.value = false;
    resetTransform();
    if (borderTimeout)
        clearTimeout(borderTimeout);
}
function getItem(key, id) {
    const item = props.items.find((i) => i.id === id);
    return (item && item[key]) ?? global.value[key];
}
function computedTooltipStyle(item, global, transform) {
    const borderGradient = `linear-gradient(${item.tooltipBorderEffectRotation || global.tooltipBorderEffectRotation}, ${(item.tooltipBorderEffectColors || global.tooltipBorderEffectColors).join(', ')})`;
    const bgColor = item.tooltipColor || global.tooltipColor;
    const width = item.tooltipWidth || global.tooltipWidth;
    const padding = item.tooltipPadding || global.tooltipPadding;
    const borderRadius = (item.tooltipRounding ?? global.tooltipRounding) + 'px';
    const thickness = item.tooltipBorderEffectThickness || global.tooltipBorderEffectThickness;
    const percent = typeof item.tooltipBorderEffectPercentage === 'number'
        ? item.tooltipBorderEffectPercentage
        : global.tooltipBorderEffectPercentage;
    const appearance = item.appearanceEffect || global.appearanceEffect;
    const position = item.tooltipPosition || global.tooltipPosition;
    const offsetY = typeof item.tooltipOffsetY === 'number'
        ? item.tooltipOffsetY
        : global.tooltipOffsetY;
    const style = {
        backgroundImage: `linear-gradient(${bgColor}, ${bgColor}), ${borderGradient}`,
        backgroundOrigin: 'padding-box, border-box',
        backgroundClip: 'padding-box, border-box',
        backgroundSize: `100% 100%, 100% ${percent}%`,
        backgroundRepeat: 'no-repeat',
        border: `${thickness} solid transparent`,
        borderRadius,
        width,
        minWidth: width,
        maxWidth: width,
        padding,
        boxSizing: 'border-box',
        position: 'absolute',
        left: '50%',
        transform: `translateX(-50%) rotate(${transform.rotate}deg) translateX(${transform.translateX}px)`,
        zIndex: 10,
        pointerEvents: 'none',
        transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), opacity 0.2s',
        overflow: 'hidden',
    };
    if (position === 'top') {
        style.bottom = `calc(100% + ${Math.abs(offsetY)}px)`;
        style.top = undefined;
    }
    else {
        style.top = `calc(100% + ${Math.abs(offsetY)}px)`;
        style.bottom = undefined;
    }
    return style;
}
function computedTooltipBgStyle(item, global) {
    const bgColor = item.tooltipBgColor || global.tooltipBgColor;
    const dotColor = item.tooltipDotColor || global.tooltipDotColor;
    return {
        backgroundImage: `radial-gradient(${dotColor} 1.5px, transparent 1.5px)`,
        backgroundPosition: '50% 50%',
        backgroundSize: '1.1rem 1.1rem',
        backgroundColor: bgColor,
        opacity: 0.9,
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        transition: 'filter 0.7s cubic-bezier(.4,2,.6,1)',
        filter: bgAnimated.value
            ? 'blur(2.25px) brightness(1.18)'
            : 'blur(0px) brightness(1)',
    };
}
function computedBorderEffectStyle(item, global) {
    return {
        '--border-effect-color': (item.tooltipBorderEffectColors && item.tooltipBorderEffectColors[1]) ||
            (global.tooltipBorderEffectColors &&
                global.tooltipBorderEffectColors[1]) ||
            'mediumslateblue',
    };
}
function computedAvatarOutlineStyle(item, global) {
    const outlineWidth = parseInt(item.imageOutlineWidth || global.imageOutlineWidth, 10) || 2;
    const rounding = (item.imageRounding ?? global.imageRounding) + 'px';
    const containerColor = item.imageOutlineColorOverwrite ||
        global.imageOutlineColorOverwrite ||
        item.imageOutlineColor ||
        global.imageOutlineColor;
    return {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: containerColor,
        borderRadius: rounding,
        padding: `${outlineWidth}px`,
        boxSizing: 'content-box',
        width: '56px',
        height: '56px',
    };
}
function computedAvatarStyle(item, global) {
    const outlineColor = item.imageOutlineColor || global.imageOutlineColor;
    return {
        border: 'none',
        borderRadius: (item.imageRounding ?? global.imageRounding) + 'px',
        width: '56px',
        height: '56px',
        objectFit: 'cover',
        objectPosition: 'top',
        background: outlineColor,
        transition: 'box-shadow 0.2s, border-color 0.2s, transform 0.18s cubic-bezier(.4,2,.6,1)',
        display: 'block',
    };
}
function transitionName(item, global) {
    return item.appearanceEffect || global.appearanceEffect || 'from-bottom-right';
}
function onMouseMove(event, item) {
    if (!(item.tintTilt ?? global.value.tintTilt))
        return;
    const img = event.target;
    const rect = img.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const halfWidth = rect.width / 2;
    const x = offsetX - halfWidth;
    const clampedX = Math.max(-100, Math.min(100, x));
    tooltipTransform.rotate = (clampedX / 100) * 45;
    tooltipTransform.translateX = (clampedX / 100) * 50;
}
function resetTransform() {
    tooltipTransform.rotate = 0;
    tooltipTransform.translateX = 0;
}
// New: Avatar hover/unhover event handlers
function onAvatarMouseEnter(id) {
    showTooltip(id);
    emit('avatar-hover', { uniqueId: props.uniqueId, id });
}
function onAvatarMouseLeave(id) {
    hideTooltip();
    emit('avatar-unhover', { uniqueId: props.uniqueId, id });
}
// NEW: Emit click event with uniqueId and clicked item
function handleClick(item) {
    emit('tooltip-click', { uniqueId: props.uniqueId, item });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "animated-tooltip" },
    ...{ style: ({ gap: __VLS_ctx.global.avatarGap }) },
});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.items))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onMouseenter: (...[$event]) => {
                __VLS_ctx.onAvatarMouseEnter(item.id);
            } },
        ...{ onMouseleave: (...[$event]) => {
                __VLS_ctx.onAvatarMouseLeave(item.id);
            } },
        key: (item.id),
        ...{ class: "tooltip-item" },
    });
    const __VLS_0 = {}.transition;
    /** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        name: (__VLS_ctx.transitionName(item, __VLS_ctx.global)),
    }));
    const __VLS_2 = __VLS_1({
        name: (__VLS_ctx.transitionName(item, __VLS_ctx.global)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    if (__VLS_ctx.hoveredIndex === item.id) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ref: "tooltip",
            ...{ class: "tooltip-content" },
            ...{ style: (__VLS_ctx.computedTooltipStyle(item, __VLS_ctx.global, __VLS_ctx.tooltipTransform)) },
        });
        /** @type {typeof __VLS_ctx.tooltip} */ ;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "tooltip-bg-dots" },
            ...{ style: (__VLS_ctx.computedTooltipBgStyle(item, __VLS_ctx.global)) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "tooltip-name" },
            ...{ style: ({
                    fontSize: item.nameFontSize || __VLS_ctx.global.nameFontSize,
                    color: item.nameColor || __VLS_ctx.global.nameColor,
                }) },
        });
        (item.name);
        if (item.designation) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "tooltip-designation" },
                ...{ style: ({
                        fontSize: item.designationFontSize || __VLS_ctx.global.designationFontSize,
                        color: item.designationColor || __VLS_ctx.global.designationColor,
                    }) },
            });
            (item.designation);
        }
        if (__VLS_ctx.borderVisible) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ style: (__VLS_ctx.computedBorderEffectStyle(item, __VLS_ctx.global)) },
            });
        }
    }
    var __VLS_3;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "avatar-outline" },
        ...{ style: (__VLS_ctx.computedAvatarOutlineStyle(item, __VLS_ctx.global)) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        ...{ onMousemove: (...[$event]) => {
                __VLS_ctx.onMouseMove($event, item);
            } },
        ...{ onMouseleave: (__VLS_ctx.resetTransform) },
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.handleClick(item);
            } },
        src: (item.image),
        alt: (item.name),
        ...{ class: "avatar" },
        ...{ class: ({ 'avatar-hovered': __VLS_ctx.hoveredIndex === item.id }) },
        ...{ style: (__VLS_ctx.computedAvatarStyle(item, __VLS_ctx.global)) },
        width: "56",
        height: "56",
    });
}
/** @type {__VLS_StyleScopedClasses['animated-tooltip']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-item']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-content']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-bg-dots']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-name']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-designation']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar-hovered']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            hoveredIndex: hoveredIndex,
            borderVisible: borderVisible,
            tooltipTransform: tooltipTransform,
            global: global,
            computedTooltipStyle: computedTooltipStyle,
            computedTooltipBgStyle: computedTooltipBgStyle,
            computedBorderEffectStyle: computedBorderEffectStyle,
            computedAvatarOutlineStyle: computedAvatarOutlineStyle,
            computedAvatarStyle: computedAvatarStyle,
            transitionName: transitionName,
            onMouseMove: onMouseMove,
            resetTransform: resetTransform,
            onAvatarMouseEnter: onAvatarMouseEnter,
            onAvatarMouseLeave: onAvatarMouseLeave,
            handleClick: handleClick,
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
//# sourceMappingURL=AnimatedTooltip.vue.js.map