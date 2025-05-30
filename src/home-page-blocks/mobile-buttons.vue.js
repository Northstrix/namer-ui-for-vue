import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SparklyButton from '../home-page-blocks/SparklyButton.vue';
import StargazingButton from '../components/namer-ui/stargazing-button/StargazingButton.vue';
const hoveredButton = ref(null);
const router = useRouter();
function onGetStartedClick(ev) {
    // Emit event if parent listens
    // (If you want to emit to parent, use defineEmits and emit here)
    router.push('/components');
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hero-buttons-column" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onMouseenter: (...[$event]) => {
            __VLS_ctx.hoveredButton = 0;
        } },
    ...{ onMouseleave: (...[$event]) => {
            __VLS_ctx.hoveredButton = null;
        } },
    ...{ class: "button-container" },
    ...{ style: ({ zIndex: __VLS_ctx.hoveredButton === 0 ? 9999 : 1 }) },
});
/** @type {[typeof SparklyButton, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(SparklyButton, new SparklyButton({
    ...{ 'onClick': {} },
    githubLink: "https://github.com/Northstrix/namer-ui-for-vue",
    hue: (249),
    borderRadius: "100px",
    fontSize: "1.1rem",
    iconSize: (22),
    iconStrokeWidth: (2),
    iconGap: "0.42em",
    separatorMargin: "0 0.76em",
    separatorColor: "#aaa",
    separatorWidth: "2px",
    shadowColor: "#7664fc",
    mobileFontSize: "1rem",
    mobileIconSize: (18),
    mobileIconStrokeWidth: (1.7),
    desktopThreshold: (1536),
}));
const __VLS_1 = __VLS_0({
    ...{ 'onClick': {} },
    githubLink: "https://github.com/Northstrix/namer-ui-for-vue",
    hue: (249),
    borderRadius: "100px",
    fontSize: "1.1rem",
    iconSize: (22),
    iconStrokeWidth: (2),
    iconGap: "0.42em",
    separatorMargin: "0 0.76em",
    separatorColor: "#aaa",
    separatorWidth: "2px",
    shadowColor: "#7664fc",
    mobileFontSize: "1rem",
    mobileIconSize: (18),
    mobileIconStrokeWidth: (1.7),
    desktopThreshold: (1536),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onClick: (__VLS_ctx.onGetStartedClick)
};
var __VLS_2;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onMouseenter: (...[$event]) => {
            __VLS_ctx.hoveredButton = 1;
        } },
    ...{ onMouseleave: (...[$event]) => {
            __VLS_ctx.hoveredButton = null;
        } },
    ...{ class: "button-container" },
    ...{ style: ({ zIndex: __VLS_ctx.hoveredButton === 1 ? 9999 : 1 }) },
});
/** @type {[typeof StargazingButton, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(StargazingButton, new StargazingButton({
    githubLink: "https://github.com/Northstrix/namer-ui-for-vue",
    hue: (219),
    borderRadius: "100px",
    fontSize: "1.1rem",
    iconSize: (22),
    iconStrokeWidth: (2),
    iconGap: "0.42em",
    separatorMargin: "0 0.76em",
    separatorColor: "#aaa",
    separatorWidth: "2px",
    shadowColor: "#4776cb",
    mobileFontSize: "1rem",
    mobileIconSize: (18),
    mobileIconStrokeWidth: (1.7),
    desktopThreshold: (1536),
}));
const __VLS_8 = __VLS_7({
    githubLink: "https://github.com/Northstrix/namer-ui-for-vue",
    hue: (219),
    borderRadius: "100px",
    fontSize: "1.1rem",
    iconSize: (22),
    iconStrokeWidth: (2),
    iconGap: "0.42em",
    separatorMargin: "0 0.76em",
    separatorColor: "#aaa",
    separatorWidth: "2px",
    shadowColor: "#4776cb",
    mobileFontSize: "1rem",
    mobileIconSize: (18),
    mobileIconStrokeWidth: (1.7),
    desktopThreshold: (1536),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['hero-buttons-column']} */ ;
/** @type {__VLS_StyleScopedClasses['button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['button-container']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            SparklyButton: SparklyButton,
            StargazingButton: StargazingButton,
            hoveredButton: hoveredButton,
            onGetStartedClick: onGetStartedClick,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=mobile-buttons.vue.js.map