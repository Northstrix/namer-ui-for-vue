import GlowingCard from './GlowingCard.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMedium } from '@fortawesome/free-brands-svg-icons';
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: {} },
});
/** @type {[typeof GlowingCard, typeof GlowingCard, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(GlowingCard, new GlowingCard({
    AccentColor: "#8f10f6",
    BackgroundColor: "#050505",
    TextColor: "#f0f0f1",
    BorderRadius: "2.25em",
    BorderWidth: "4px",
    TopInscription: "Medium",
    BigInscription: ">30",
    SmallInscription: "Articles",
    BottomInscription: "Read Now ➔",
    learnMoreLink: "https://medium.com/@Northstrix",
    width: "387px",
    height: "467px",
    IconHeight: "54px",
    TopTextSize: "25px",
}));
const __VLS_1 = __VLS_0({
    AccentColor: "#8f10f6",
    BackgroundColor: "#050505",
    TextColor: "#f0f0f1",
    BorderRadius: "2.25em",
    BorderWidth: "4px",
    TopInscription: "Medium",
    BigInscription: ">30",
    SmallInscription: "Articles",
    BottomInscription: "Read Now ➔",
    learnMoreLink: "https://medium.com/@Northstrix",
    width: "387px",
    height: "467px",
    IconHeight: "54px",
    TopTextSize: "25px",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_2.slots.default;
{
    const { icon: __VLS_thisSlot } = __VLS_2.slots;
    const [{ iconStyle }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_3 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, ]} */ ;
    // @ts-ignore
    const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({
        icon: (__VLS_ctx.faMedium),
        ...{ style: (iconStyle) },
    }));
    const __VLS_5 = __VLS_4({
        icon: (__VLS_ctx.faMedium),
        ...{ style: (iconStyle) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_4));
}
var __VLS_2;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            GlowingCard: GlowingCard,
            FontAwesomeIcon: FontAwesomeIcon,
            faMedium: faMedium,
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