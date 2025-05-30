import { ref, computed, defineProps, onMounted, watch } from 'vue';
import ChronicleButton from '../chronicle-button/ChronicleButton.vue';
const props = defineProps();
const { id, imageSrc, altText, price, oldPrice, condition, discountTag, title, description, showOutlinedButton = true, onFilledButtonClick, onOutlinedButtonClick, outerWidth = 390, outerHeight = 412, outerContainerSize = 32, outlineColor = '#303030', outlinedButtonOutlineColor = '#f1f1f7', // Default for outlined button
innerWidth, innerHeight, descriptionLines = 3, fontSize = 14, accentColor = '#9F4EFF', containerRounding = 0, innerContainerRounding = 0, buttonRounding = 0, tagRounding = 20, textColor = '#f0f0f1', buttonBackground, buttonForeground, borderWidth = 3, lightenButtonColor = 0.12, filledButtonInscription = 'Buy now', outlinedButtonInscription = 'Add to cart', swapButtons = false, activeComponentScale = 1.024, mirrorTags = false, darkTextInTags = false, } = props;
const rotation = ref('0deg');
const borderGradient = ref('');
const calculatedInnerWidth = computed(() => innerWidth || outerWidth - 2 * borderWidth - outerContainerSize);
const calculatedInnerHeight = computed(() => innerHeight || outerHeight - 2 * borderWidth - outerContainerSize);
const backgroundPatternSize = computed(() => `${Math.floor((Math.min(calculatedInnerWidth.value, calculatedInnerHeight.value)) / 16)}px`);
const containerStyle = computed(() => ({
    '--rotation': rotation.value,
    '--border-gradient': borderGradient.value,
    '--accent-color': accentColor,
    '--text-color': textColor,
    '--background-pattern-size': backgroundPatternSize.value,
    '--active-component-scale': `${activeComponentScale}`,
    width: `${outerWidth}px`,
    height: `${outerHeight}px`,
    borderRadius: `${containerRounding}px`,
    borderWidth: `${borderWidth}px`,
}));
const innerContainerStyle = computed(() => ({
    borderRadius: `${innerContainerRounding}px`,
    width: `${calculatedInnerWidth.value}px`,
    height: `${calculatedInnerHeight.value}px`,
}));
const lightenColor = (hex, percent) => {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    const isLightening = percent >= 0;
    const adjustment = Math.abs(percent);
    if (isLightening) {
        r = Math.min(255, Math.floor(r + (255 - r) * adjustment));
        g = Math.min(255, Math.floor(g + (255 - g) * adjustment));
        b = Math.min(255, Math.floor(b + (255 - b) * adjustment));
    }
    else {
        r = Math.max(0, Math.floor(r * (1 - adjustment)));
        g = Math.max(0, Math.floor(g * (1 - adjustment)));
        b = Math.max(0, Math.floor(b * (1 - adjustment)));
    }
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).padStart(6, '0')}`;
};
const filledChronicleButtonHoverColor = lightenColor(accentColor, lightenButtonColor);
const oulinedChronicleButtonHoverColor = lightenColor(accentColor, lightenButtonColor);
const isRTLCheck = (text) => {
    return /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(text);
};
const displayedTitle = computed(() => title.length > 27 ? title.slice(0, 24) + '...' : title);
const directionValue = (text) => (isRTLCheck(text) ? 'rtl' : 'ltr');
const descriptionStyle = computed(() => ({
    fontSize: `${fontSize}px`,
    WebkitLineClamp: descriptionLines,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textAlign: 'center',
    marginTop: '0px',
    color: 'var(--text-color)',
    direction: directionValue(description),
}));
const titleStyle = computed(() => ({
    fontSize: '21px',
    fontWeight: 'bold',
    letterSpacing: '-.01em',
    lineHeight: 'normal',
    color: 'var(--text-color)',
    textAlign: 'center',
    marginTop: '5px',
    direction: directionValue(title),
}));
const priceTagStyle = computed(() => ({
    position: 'absolute',
    top: '10px',
    ...(mirrorTags ? { left: '10px', right: 'auto' } : { right: '10px', left: 'auto' }),
    borderRadius: `${tagRounding}px`,
    backgroundColor: 'var(--border-color)',
    padding: '8px 15px',
    fontSize: '12px',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
}));
const discountTagStyle = computed(() => ({
    position: 'absolute',
    top: '51px',
    ...(mirrorTags ? { left: '10px', right: 'auto' } : { right: '10px', left: 'auto' }),
    backgroundColor: 'var(--border-color)',
    padding: '8px 15px',
    fontSize: '12px',
    zIndex: 1,
    borderRadius: `${tagRounding}px`,
    fontWeight: 'bold',
    direction: discountTag ? directionValue(discountTag) : 'ltr',
    color: darkTextInTags ? '#111111' : 'var(--text-color)',
}));
const conditionTagStyle = computed(() => ({
    position: 'absolute',
    top: '10px',
    ...(mirrorTags ? { right: '10px', left: 'auto' } : { left: '10px', right: 'auto' }),
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'var(--text-color)',
    padding: '8px 15px',
    fontSize: '12px',
    zIndex: 1,
    borderRadius: `${tagRounding}px`,
    fontWeight: 'bold',
}));
const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x);
    rotation.value = `${angle}rad`;
    borderGradient.value = `conic-gradient(from var(--rotation), ${accentColor} 0deg, ${accentColor} 90deg, ${outlineColor} 90deg, ${outlineColor} 360deg)`;
};
onMounted(() => {
    borderGradient.value = `conic-gradient(from 0deg, ${accentColor} 0deg, ${accentColor} 90deg, ${outlineColor} 90deg, ${outlineColor} 360deg)`;
});
watch([() => accentColor, () => outlineColor], () => {
    borderGradient.value = `conic-gradient(from 0deg, ${accentColor} 0deg, ${accentColor} 90deg, ${outlineColor} 90deg, ${outlineColor} 360deg)`;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onMousemove: (__VLS_ctx.handleMouseMove) },
    ...{ class: "product-card" },
    id: (`container-${__VLS_ctx.id}`),
    ...{ style: (__VLS_ctx.containerStyle) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "product-inner-container" },
    ...{ style: (__VLS_ctx.innerContainerStyle) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "product-image-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.imageSrc),
    alt: (__VLS_ctx.altText),
    ...{ class: "product-image" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "product-price-tag" },
    ...{ style: (__VLS_ctx.priceTagStyle) },
});
if (__VLS_ctx.mirrorTags) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "product-new-price" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ style: ({ color: __VLS_ctx.darkTextInTags ? '#111111' : 'var(--text-color)' }) },
    });
    (__VLS_ctx.price);
    if (__VLS_ctx.oldPrice) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "product-old-price" },
            ...{ style: {} },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ style: ({
                    color: __VLS_ctx.darkTextInTags ? '#404040' : 'var(--text-color)',
                    opacity: 0.64,
                    textDecoration: 'line-through',
                    textDecorationColor: __VLS_ctx.darkTextInTags ? '#404040' : 'var(--text-color)'
                }) },
        });
        (__VLS_ctx.oldPrice);
    }
}
else {
    if (__VLS_ctx.oldPrice) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "product-old-price" },
            ...{ style: {} },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ style: ({
                    color: __VLS_ctx.darkTextInTags ? '#404040' : 'var(--text-color)',
                    opacity: 0.64,
                    textDecoration: 'line-through',
                    textDecorationColor: __VLS_ctx.darkTextInTags ? '#404040' : 'var(--text-color)'
                }) },
        });
        (__VLS_ctx.oldPrice);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "product-new-price" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ style: ({ color: __VLS_ctx.darkTextInTags ? '#111111' : 'var(--text-color)' }) },
    });
    (__VLS_ctx.price);
}
if (__VLS_ctx.condition) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "product-condition-tag" },
        ...{ style: (__VLS_ctx.conditionTagStyle) },
    });
    (__VLS_ctx.condition);
}
if (__VLS_ctx.discountTag) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "product-discount-tag" },
        ...{ style: (__VLS_ctx.discountTagStyle) },
    });
    (__VLS_ctx.discountTag);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "product-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "product-title" },
    ...{ style: (__VLS_ctx.titleStyle) },
});
(__VLS_ctx.displayedTitle);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "product-description" },
    ...{ style: (__VLS_ctx.descriptionStyle) },
});
(__VLS_ctx.description);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "product-button-container" },
});
if (__VLS_ctx.swapButtons) {
    /** @type {[typeof ChronicleButton, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(ChronicleButton, new ChronicleButton({
        text: (__VLS_ctx.outlinedButtonInscription),
        outlined: (true),
        width: "136px",
        onClick: (() => __VLS_ctx.onOutlinedButtonClick(__VLS_ctx.id)),
        hoverColor: (__VLS_ctx.oulinedChronicleButtonHoverColor),
        outlinedButtonBackgroundOnHover: "transparent",
        fontFamily: "'Arial', 'Alef', sans-serif",
        borderRadius: (`${__VLS_ctx.buttonRounding}px`),
        customBackground: (__VLS_ctx.outlinedButtonOutlineColor),
        customForeground: (__VLS_ctx.outlinedButtonOutlineColor),
        outlineColor: (__VLS_ctx.outlinedButtonOutlineColor),
    }));
    const __VLS_1 = __VLS_0({
        text: (__VLS_ctx.outlinedButtonInscription),
        outlined: (true),
        width: "136px",
        onClick: (() => __VLS_ctx.onOutlinedButtonClick(__VLS_ctx.id)),
        hoverColor: (__VLS_ctx.oulinedChronicleButtonHoverColor),
        outlinedButtonBackgroundOnHover: "transparent",
        fontFamily: "'Arial', 'Alef', sans-serif",
        borderRadius: (`${__VLS_ctx.buttonRounding}px`),
        customBackground: (__VLS_ctx.outlinedButtonOutlineColor),
        customForeground: (__VLS_ctx.outlinedButtonOutlineColor),
        outlineColor: (__VLS_ctx.outlinedButtonOutlineColor),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    /** @type {[typeof ChronicleButton, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(ChronicleButton, new ChronicleButton({
        text: (__VLS_ctx.filledButtonInscription),
        width: "136px",
        onClick: (() => __VLS_ctx.onFilledButtonClick(__VLS_ctx.id)),
        hoverColor: "#fff",
        hoverBackground: (__VLS_ctx.filledChronicleButtonHoverColor),
        fontFamily: "'Arial', 'Alef', sans-serif",
        borderRadius: (`${__VLS_ctx.buttonRounding}px`),
        customBackground: (__VLS_ctx.buttonBackground),
        customForeground: (__VLS_ctx.buttonForeground),
    }));
    const __VLS_4 = __VLS_3({
        text: (__VLS_ctx.filledButtonInscription),
        width: "136px",
        onClick: (() => __VLS_ctx.onFilledButtonClick(__VLS_ctx.id)),
        hoverColor: "#fff",
        hoverBackground: (__VLS_ctx.filledChronicleButtonHoverColor),
        fontFamily: "'Arial', 'Alef', sans-serif",
        borderRadius: (`${__VLS_ctx.buttonRounding}px`),
        customBackground: (__VLS_ctx.buttonBackground),
        customForeground: (__VLS_ctx.buttonForeground),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
}
else {
    /** @type {[typeof ChronicleButton, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(ChronicleButton, new ChronicleButton({
        text: (__VLS_ctx.filledButtonInscription),
        width: "136px",
        onClick: (() => __VLS_ctx.onFilledButtonClick(__VLS_ctx.id)),
        hoverColor: "#fff",
        hoverBackground: (__VLS_ctx.filledChronicleButtonHoverColor),
        fontFamily: "'Arial', 'Alef', sans-serif",
        borderRadius: (`${__VLS_ctx.buttonRounding}px`),
        customBackground: (__VLS_ctx.buttonBackground),
        customForeground: (__VLS_ctx.buttonForeground),
    }));
    const __VLS_7 = __VLS_6({
        text: (__VLS_ctx.filledButtonInscription),
        width: "136px",
        onClick: (() => __VLS_ctx.onFilledButtonClick(__VLS_ctx.id)),
        hoverColor: "#fff",
        hoverBackground: (__VLS_ctx.filledChronicleButtonHoverColor),
        fontFamily: "'Arial', 'Alef', sans-serif",
        borderRadius: (`${__VLS_ctx.buttonRounding}px`),
        customBackground: (__VLS_ctx.buttonBackground),
        customForeground: (__VLS_ctx.buttonForeground),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    if (__VLS_ctx.showOutlinedButton) {
        /** @type {[typeof ChronicleButton, ]} */ ;
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent(ChronicleButton, new ChronicleButton({
            text: (__VLS_ctx.outlinedButtonInscription),
            outlined: (true),
            width: "136px",
            onClick: (() => __VLS_ctx.onOutlinedButtonClick(__VLS_ctx.id)),
            hoverColor: (__VLS_ctx.oulinedChronicleButtonHoverColor),
            outlinedButtonBackgroundOnHover: "transparent",
            fontFamily: "'Arial', 'Alef', sans-serif",
            borderRadius: (`${__VLS_ctx.buttonRounding}px`),
            customBackground: (__VLS_ctx.outlinedButtonOutlineColor),
            customForeground: (__VLS_ctx.outlinedButtonOutlineColor),
            outlineColor: (__VLS_ctx.outlinedButtonOutlineColor),
        }));
        const __VLS_10 = __VLS_9({
            text: (__VLS_ctx.outlinedButtonInscription),
            outlined: (true),
            width: "136px",
            onClick: (() => __VLS_ctx.onOutlinedButtonClick(__VLS_ctx.id)),
            hoverColor: (__VLS_ctx.oulinedChronicleButtonHoverColor),
            outlinedButtonBackgroundOnHover: "transparent",
            fontFamily: "'Arial', 'Alef', sans-serif",
            borderRadius: (`${__VLS_ctx.buttonRounding}px`),
            customBackground: (__VLS_ctx.outlinedButtonOutlineColor),
            customForeground: (__VLS_ctx.outlinedButtonOutlineColor),
            outlineColor: (__VLS_ctx.outlinedButtonOutlineColor),
        }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    }
}
/** @type {__VLS_StyleScopedClasses['product-card']} */ ;
/** @type {__VLS_StyleScopedClasses['product-inner-container']} */ ;
/** @type {__VLS_StyleScopedClasses['product-image-container']} */ ;
/** @type {__VLS_StyleScopedClasses['product-image']} */ ;
/** @type {__VLS_StyleScopedClasses['product-price-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['product-new-price']} */ ;
/** @type {__VLS_StyleScopedClasses['product-old-price']} */ ;
/** @type {__VLS_StyleScopedClasses['product-old-price']} */ ;
/** @type {__VLS_StyleScopedClasses['product-new-price']} */ ;
/** @type {__VLS_StyleScopedClasses['product-condition-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['product-discount-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['product-content']} */ ;
/** @type {__VLS_StyleScopedClasses['product-title']} */ ;
/** @type {__VLS_StyleScopedClasses['product-description']} */ ;
/** @type {__VLS_StyleScopedClasses['product-button-container']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ChronicleButton: ChronicleButton,
            id: id,
            imageSrc: imageSrc,
            altText: altText,
            price: price,
            oldPrice: oldPrice,
            condition: condition,
            discountTag: discountTag,
            description: description,
            showOutlinedButton: showOutlinedButton,
            onFilledButtonClick: onFilledButtonClick,
            onOutlinedButtonClick: onOutlinedButtonClick,
            outlinedButtonOutlineColor: outlinedButtonOutlineColor,
            buttonRounding: buttonRounding,
            buttonBackground: buttonBackground,
            buttonForeground: buttonForeground,
            filledButtonInscription: filledButtonInscription,
            outlinedButtonInscription: outlinedButtonInscription,
            swapButtons: swapButtons,
            mirrorTags: mirrorTags,
            darkTextInTags: darkTextInTags,
            containerStyle: containerStyle,
            innerContainerStyle: innerContainerStyle,
            filledChronicleButtonHoverColor: filledChronicleButtonHoverColor,
            oulinedChronicleButtonHoverColor: oulinedChronicleButtonHoverColor,
            displayedTitle: displayedTitle,
            descriptionStyle: descriptionStyle,
            titleStyle: titleStyle,
            priceTagStyle: priceTagStyle,
            discountTagStyle: discountTagStyle,
            conditionTagStyle: conditionTagStyle,
            handleMouseMove: handleMouseMove,
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
//# sourceMappingURL=ProductCard.vue.js.map