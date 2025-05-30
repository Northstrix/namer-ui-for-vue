import { ref, computed, defineProps } from 'vue';
const props = defineProps();
const { id, image, title, description, tags, parentBackgroundColor, onClick, cardRounding = 20, fontSizes = {}, margins = {}, buttonIcon, buttonIconSize = 24, buttonIconColor = '#fff', buttonIconHoverColor = '#fff', buttonBackgroundColor = '#282828', buttonBackgroundHoverColor = '#484848', imageHoverZoom = 1.1, titleColor = '#f7f7ff', descriptionColor = '#c7c7cf', mirrored = false, titleAlignment = 'left', descriptionAlignment = 'left', tagsAlignment = 'left', maxWidth = '100%', price, priceTagTextColor = '#ffffff', oldPrice, oldPriceOnTheRight = false, oldPriceTextColor = '#c1c1c7', priceTagRounding = '5px', priceTagBackgroundColor = 'rgba(0,0,0,0.7)', } = props;
const isButtonHovered = ref(false);
const isCardHovered = ref(false);
function isRTL(text) {
    return /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(text);
}
const priceTagStyle = computed(() => ({
    position: 'absolute',
    top: '12px',
    [mirrored ? 'right' : 'left']: '12px',
    backgroundColor: priceTagBackgroundColor,
    color: priceTagTextColor,
    padding: '9px 15px',
    borderRadius: priceTagRounding,
    fontSize: fontSizes.price || '1rem',
}));
function handleCardClick() {
    onClick && onClick('card', id);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (__VLS_ctx.handleCardClick) },
    ...{ class: "inflected-card" },
    ...{ style: ({
            '--card-rounding': __VLS_ctx.cardRounding + 'px',
            maxWidth: __VLS_ctx.maxWidth,
            ...(__VLS_ctx.mirrored ? { transform: 'scaleX(-1)' } : {}),
        }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-inner" },
    ...{ style: ({ '--parent-bg': __VLS_ctx.parentBackgroundColor }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "box" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "img-box" },
    ...{ style: ({
            '--image-hover-zoom': __VLS_ctx.imageHoverZoom,
            ...(__VLS_ctx.mirrored ? { transform: 'scaleX(-1)' } : {}),
        }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    ...{ onMouseenter: (...[$event]) => {
            __VLS_ctx.isCardHovered = true;
        } },
    ...{ onMouseleave: (...[$event]) => {
            __VLS_ctx.isCardHovered = false;
        } },
    src: (__VLS_ctx.image),
    alt: (__VLS_ctx.title),
    ...{ class: ({ hovered: __VLS_ctx.isCardHovered }) },
});
if (__VLS_ctx.price) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (() => __VLS_ctx.onClick && __VLS_ctx.onClick('priceTag', __VLS_ctx.id)) },
        ...{ class: "price-tag" },
        ...{ style: (__VLS_ctx.priceTagStyle) },
    });
    if (__VLS_ctx.oldPriceOnTheRight) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "new-price" },
            ...{ style: {} },
        });
        (__VLS_ctx.price);
        if (__VLS_ctx.oldPrice) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "old-price" },
                ...{ style: ({ marginLeft: '8px', textDecoration: 'line-through', opacity: 0.7, fontWeight: 'bold', color: __VLS_ctx.oldPriceTextColor }) },
            });
            (__VLS_ctx.oldPrice);
        }
    }
    else {
        if (__VLS_ctx.oldPrice) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "old-price" },
                ...{ style: ({ marginRight: '8px', textDecoration: 'line-through', opacity: 0.7, fontWeight: 'bold', color: __VLS_ctx.oldPriceTextColor }) },
            });
            (__VLS_ctx.oldPrice);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "new-price" },
            ...{ style: {} },
        });
        (__VLS_ctx.price);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (() => __VLS_ctx.onClick && __VLS_ctx.onClick('button', __VLS_ctx.id)) },
    ...{ onMouseenter: (...[$event]) => {
            __VLS_ctx.isButtonHovered = true;
        } },
    ...{ onMouseleave: (...[$event]) => {
            __VLS_ctx.isButtonHovered = false;
        } },
    ...{ class: "icon-box" },
    ...{ style: ({
            '--button-bg': __VLS_ctx.buttonBackgroundColor,
            '--button-hover-bg': __VLS_ctx.buttonBackgroundHoverColor,
            '--icon-color': __VLS_ctx.buttonIconColor,
            '--icon-hover-color': __VLS_ctx.buttonIconHoverColor,
            '--icon-size': __VLS_ctx.buttonIconSize + 'px',
        }) },
    type: "button",
});
const __VLS_0 = ((__VLS_ctx.buttonIcon));
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    size: (__VLS_ctx.buttonIconSize),
    color: (__VLS_ctx.isButtonHovered ? __VLS_ctx.buttonIconHoverColor : __VLS_ctx.buttonIconColor),
}));
const __VLS_2 = __VLS_1({
    size: (__VLS_ctx.buttonIconSize),
    color: (__VLS_ctx.isButtonHovered ? __VLS_ctx.buttonIconHoverColor : __VLS_ctx.buttonIconColor),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ style: ({
            fontSize: __VLS_ctx.fontSizes.title,
            color: __VLS_ctx.titleColor,
            margin: __VLS_ctx.margins.title,
            fontWeight: 'bold',
            direction: __VLS_ctx.isRTL(__VLS_ctx.title) ? 'rtl' : 'ltr',
            textAlign: __VLS_ctx.titleAlignment,
            ...(__VLS_ctx.mirrored ? { transform: 'scaleX(-1)' } : {}),
        }) },
});
(__VLS_ctx.title);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ style: ({
            fontSize: __VLS_ctx.fontSizes.description,
            color: __VLS_ctx.descriptionColor,
            margin: __VLS_ctx.margins.description,
            direction: __VLS_ctx.isRTL(__VLS_ctx.description) ? 'rtl' : 'ltr',
            textAlign: __VLS_ctx.descriptionAlignment,
            ...(__VLS_ctx.mirrored ? { transform: 'scaleX(-1)' } : {}),
        }) },
});
(__VLS_ctx.description);
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    ...{ style: ({
            margin: __VLS_ctx.margins.tags,
            display: 'flex',
            justifyContent: __VLS_ctx.tagsAlignment,
            flexWrap: 'wrap',
            gap: '0.625rem',
            ...(__VLS_ctx.mirrored ? { transform: 'scaleX(-1)' } : {}),
        }) },
});
for (const [tag, i] of __VLS_getVForSourceType((__VLS_ctx.tags))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (i),
        ...{ style: ({
                '--tag-bg': tag.backgroundColor,
                '--tag-color': tag.textColor,
                '--tag-rounding': (tag.rounding ?? 5) + 'px',
                fontSize: __VLS_ctx.fontSizes.tags,
                direction: __VLS_ctx.isRTL(tag.name) ? 'rtl' : 'ltr',
                textAlign: tag.alignment || 'left',
                display: 'inline-block',
            }) },
    });
    (tag.name);
}
/** @type {__VLS_StyleScopedClasses['inflected-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['box']} */ ;
/** @type {__VLS_StyleScopedClasses['img-box']} */ ;
/** @type {__VLS_StyleScopedClasses['hovered']} */ ;
/** @type {__VLS_StyleScopedClasses['price-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['new-price']} */ ;
/** @type {__VLS_StyleScopedClasses['old-price']} */ ;
/** @type {__VLS_StyleScopedClasses['old-price']} */ ;
/** @type {__VLS_StyleScopedClasses['new-price']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-box']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            id: id,
            image: image,
            title: title,
            description: description,
            tags: tags,
            parentBackgroundColor: parentBackgroundColor,
            onClick: onClick,
            cardRounding: cardRounding,
            fontSizes: fontSizes,
            margins: margins,
            buttonIcon: buttonIcon,
            buttonIconSize: buttonIconSize,
            buttonIconColor: buttonIconColor,
            buttonIconHoverColor: buttonIconHoverColor,
            buttonBackgroundColor: buttonBackgroundColor,
            buttonBackgroundHoverColor: buttonBackgroundHoverColor,
            imageHoverZoom: imageHoverZoom,
            titleColor: titleColor,
            descriptionColor: descriptionColor,
            mirrored: mirrored,
            titleAlignment: titleAlignment,
            descriptionAlignment: descriptionAlignment,
            tagsAlignment: tagsAlignment,
            maxWidth: maxWidth,
            price: price,
            oldPrice: oldPrice,
            oldPriceOnTheRight: oldPriceOnTheRight,
            oldPriceTextColor: oldPriceTextColor,
            isButtonHovered: isButtonHovered,
            isCardHovered: isCardHovered,
            isRTL: isRTL,
            priceTagStyle: priceTagStyle,
            handleCardClick: handleCardClick,
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
//# sourceMappingURL=InflectedCard.vue.js.map