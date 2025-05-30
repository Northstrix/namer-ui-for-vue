import { ref } from 'vue';
import { Home, Settings, Info } from 'lucide-vue-next';
import RadioButtonDemo from './RadioButton.vue';
const activeTab = ref('home');
const tabOptions = [
    { value: 'home', label: 'Home', icon: Home },
    { value: 'settings', label: 'Settings', icon: Settings },
    { value: 'about', label: 'About', icon: Info },
];
const activeBg = '#f7f7fa';
const activeFg = '#24222b';
const inactiveBg = '#24222b';
const inactiveFg = '#f7f7fa';
const hoverBg = '#4776cb';
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['tab-switcher-container']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-switcher-demo" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-switcher-container" },
});
/** @type {[typeof RadioButtonDemo, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(RadioButtonDemo, new RadioButtonDemo({
    modelValue: (__VLS_ctx.activeTab),
    options: (__VLS_ctx.tabOptions),
    activeBg: (__VLS_ctx.activeBg),
    activeFg: (__VLS_ctx.activeFg),
    inactiveBg: (__VLS_ctx.inactiveBg),
    inactiveFg: (__VLS_ctx.inactiveFg),
    hoverBg: (__VLS_ctx.hoverBg),
}));
const __VLS_1 = __VLS_0({
    modelValue: (__VLS_ctx.activeTab),
    options: (__VLS_ctx.tabOptions),
    activeBg: (__VLS_ctx.activeBg),
    activeFg: (__VLS_ctx.activeFg),
    inactiveBg: (__VLS_ctx.inactiveBg),
    inactiveFg: (__VLS_ctx.inactiveFg),
    hoverBg: (__VLS_ctx.hoverBg),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-switcher-content" },
});
if (__VLS_ctx.activeTab === 'home') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
}
else if (__VLS_ctx.activeTab === 'settings') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
}
else if (__VLS_ctx.activeTab === 'about') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
}
/** @type {__VLS_StyleScopedClasses['tab-switcher-demo']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-switcher-container']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-switcher-content']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            RadioButtonDemo: RadioButtonDemo,
            activeTab: activeTab,
            tabOptions: tabOptions,
            activeBg: activeBg,
            activeFg: activeFg,
            inactiveBg: inactiveBg,
            inactiveFg: inactiveFg,
            hoverBg: hoverBg,
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