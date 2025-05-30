import { computed } from 'vue';
import { useRouter } from 'vue-router';
import ChronicleButton from '../components/namer-ui/chronicle-button/ChronicleButton.vue';
import { componentMeta } from '../data/componentMeta';
const projectCount = computed(() => componentMeta.length);
const router = useRouter();
function goToComponents() {
    router.push('/components');
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "explore-projects-btn-wrapper" },
});
/** @type {[typeof ChronicleButton, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(ChronicleButton, new ChronicleButton({
    ...{ 'onClick': {} },
    text: (`Explore ${__VLS_ctx.projectCount} components`),
    borderRadius: ('8px'),
    width: "256px",
    fontSize: "0.975rem",
    padding: "0.95rem 0.1rem",
}));
const __VLS_1 = __VLS_0({
    ...{ 'onClick': {} },
    text: (`Explore ${__VLS_ctx.projectCount} components`),
    borderRadius: ('8px'),
    width: "256px",
    fontSize: "0.975rem",
    padding: "0.95rem 0.1rem",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onClick: (__VLS_ctx.goToComponents)
};
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['explore-projects-btn-wrapper']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ChronicleButton: ChronicleButton,
            projectCount: projectCount,
            goToComponents: goToComponents,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=explore-button.vue.js.map