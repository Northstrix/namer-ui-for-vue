import { ref } from 'vue';
import WhatsAppWidget from './WhatsAppWidget.vue';
import ChronicleButton from '../chronicle-button/ChronicleButton.vue';
const clickCount = ref(0);
const widgetEnabled = ref(false);
function enableWidget() {
    widgetEnabled.value = true;
}
function openWhatsApp() {
    clickCount.value++;
    // Optionally, open WhatsApp in a new tab:
    // window.open('https://wa.me/1234567890', '_blank')
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wa-demo-root" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wa-demo-center" },
});
if (!__VLS_ctx.widgetEnabled) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "wa-demo-btn-wrap" },
    });
    /** @type {[typeof ChronicleButton, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(ChronicleButton, new ChronicleButton({
        text: "Enable Widget",
        customBackground: "#25d366",
        customForeground: "#111014",
        hoverColor: "#fff",
        hoverBackground: "#128c7e",
        width: "260px",
        borderRadius: "1.2rem",
        onClick: (__VLS_ctx.enableWidget),
    }));
    const __VLS_1 = __VLS_0({
        text: "Enable Widget",
        customBackground: "#25d366",
        customForeground: "#111014",
        hoverColor: "#fff",
        hoverBackground: "#128c7e",
        width: "260px",
        borderRadius: "1.2rem",
        onClick: (__VLS_ctx.enableWidget),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wa-demo-disclaimer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wa-demo-center" },
});
if (!__VLS_ctx.widgetEnabled) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "wa-demo-btn-wrap" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "wa-demo-clicks-inscription" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (__VLS_ctx.clickCount);
}
if (__VLS_ctx.widgetEnabled) {
    /** @type {[typeof WhatsAppWidget, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(WhatsAppWidget, new WhatsAppWidget({
        name: "Alice West",
        photo: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        status: "online",
        onWhatsAppClick: (__VLS_ctx.openWhatsApp),
        displayedMessage: "Hi, I'm Alice from NamerStore. 🚀 Looking for new, pre-owned, or refurbished tech? We have great deals! What device interests you? Let's find a perfect match for you.",
        selfPopUpsIn: (3000),
        buttonInscription: "Chat in WhatsApp",
    }));
    const __VLS_4 = __VLS_3({
        name: "Alice West",
        photo: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        status: "online",
        onWhatsAppClick: (__VLS_ctx.openWhatsApp),
        displayedMessage: "Hi, I'm Alice from NamerStore. 🚀 Looking for new, pre-owned, or refurbished tech? We have great deals! What device interests you? Let's find a perfect match for you.",
        selfPopUpsIn: (3000),
        buttonInscription: "Chat in WhatsApp",
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
}
/** @type {__VLS_StyleScopedClasses['wa-demo-root']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-demo-center']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-demo-btn-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-demo-disclaimer']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-demo-center']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-demo-btn-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-demo-clicks-inscription']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            WhatsAppWidget: WhatsAppWidget,
            ChronicleButton: ChronicleButton,
            clickCount: clickCount,
            widgetEnabled: widgetEnabled,
            enableWidget: enableWidget,
            openWhatsApp: openWhatsApp,
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