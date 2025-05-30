import { ref, watch, onMounted } from 'vue';
import ChronicleButton from '../chronicle-button/ChronicleButton.vue';
import { IconBrandWhatsapp, IconX } from '@tabler/icons-vue';
const props = defineProps();
const { name, photo, status = 'online', nameTextColor = '#ffffff', statusTextColor = '#eeeeee', containerHeaderBackground = '#075e54', containerBodyBackground = '#e5ddd5', containerBottomBackground = '#f0f0f0', messageBackground = '#ffffff', messageTextColor = '#000000', defaultButtonBackground = '#25d366', hoveredButtonBackground = '#128c7e', buttonTextColor = '#ffffff', widgetRounding = '12px', onWhatsAppClick, displayedMessage, selfPopUpsIn, typingDotsColor = '#9e9ea1', buttonInscription = 'Chat in WhatsApp' // Default
 } = props;
const isOpen = ref(false);
const hasBeenOpened = ref(false);
const messages = ref([]);
const isTyping = ref(false);
const isFirstOpen = ref(true);
onMounted(() => {
    const autoOpenTimeout = setTimeout(() => {
        if (!hasBeenOpened.value) {
            isOpen.value = true;
            hasBeenOpened.value = true;
        }
    }, selfPopUpsIn);
    // Clean up
    watch(isOpen, () => {
        if (isOpen.value && isFirstOpen.value) {
            isTyping.value = true;
            const typingTimeout = setTimeout(() => {
                isTyping.value = false;
                messages.value = [displayedMessage];
                isFirstOpen.value = false;
            }, 2000);
            return () => clearTimeout(typingTimeout);
        }
        else if (isOpen.value) {
            messages.value = [displayedMessage];
        }
    });
    return () => clearTimeout(autoOpenTimeout);
});
function toggleChat() {
    if (isOpen.value) {
        messages.value = [];
    }
    isOpen.value = !isOpen.value;
    hasBeenOpened.value = true;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['wa-close-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-close-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-typing-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-typing-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-typing-dot']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
if (!__VLS_ctx.isOpen) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (__VLS_ctx.toggleChat) },
        ...{ class: "wa-chat-icon" },
    });
    const __VLS_0 = {}.IconBrandWhatsapp;
    /** @type {[typeof __VLS_components.IconBrandWhatsapp, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        size: (35),
        color: "#ffffff",
    }));
    const __VLS_2 = __VLS_1({
        size: (35),
        color: "#ffffff",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
if (__VLS_ctx.isOpen) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "wa-chat-container" },
        ...{ style: ({ borderRadius: __VLS_ctx.widgetRounding }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "wa-chat-header" },
        ...{ style: ({
                background: __VLS_ctx.containerHeaderBackground,
                borderRadius: `${__VLS_ctx.widgetRounding} ${__VLS_ctx.widgetRounding} 0 0`
            }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "wa-avatar-container" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.photo),
        alt: "Avatar",
        ...{ class: "wa-avatar" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "wa-online-dot" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "wa-header-info" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "wa-name" },
        ...{ style: ({ color: __VLS_ctx.nameTextColor, transform: 'translateY(-1px)' }) },
    });
    (__VLS_ctx.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "wa-status" },
        ...{ style: ({ color: __VLS_ctx.statusTextColor, transform: 'translateY(2px)' }) },
    });
    (__VLS_ctx.status);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.toggleChat) },
        ...{ class: "wa-close-btn" },
        ...{ style: ({ color: __VLS_ctx.nameTextColor }) },
    });
    const __VLS_4 = {}.IconX;
    /** @type {[typeof __VLS_components.IconX, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        size: (22),
    }));
    const __VLS_6 = __VLS_5({
        size: (22),
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "wa-chat-content" },
        ...{ style: ({ background: __VLS_ctx.containerBodyBackground }) },
    });
    if (__VLS_ctx.isTyping) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "wa-typing-indicator" },
            ...{ style: ({ background: __VLS_ctx.containerBodyBackground }) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "wa-typing-dot" },
            ...{ style: ({ background: __VLS_ctx.typingDotsColor }) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "wa-typing-dot" },
            ...{ style: ({ background: __VLS_ctx.typingDotsColor }) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "wa-typing-dot" },
            ...{ style: ({ background: __VLS_ctx.typingDotsColor }) },
        });
    }
    for (const [message, idx] of __VLS_getVForSourceType((__VLS_ctx.messages))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (idx),
            ...{ class: "wa-message" },
            ...{ style: ({ background: __VLS_ctx.messageBackground, color: __VLS_ctx.messageTextColor }) },
        });
        (message);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "wa-message-input" },
        ...{ style: ({
                background: __VLS_ctx.containerBottomBackground,
                borderRadius: `0 0 ${__VLS_ctx.widgetRounding} ${__VLS_ctx.widgetRounding}`
            }) },
    });
    /** @type {[typeof ChronicleButton, ]} */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(ChronicleButton, new ChronicleButton({
        text: (__VLS_ctx.buttonInscription),
        onClick: (__VLS_ctx.onWhatsAppClick),
        width: "100%",
        customBackground: (__VLS_ctx.defaultButtonBackground),
        customForeground: "#fff",
        hoverColor: "#fff",
        hoverBackground: (__VLS_ctx.hoveredButtonBackground),
        borderRadius: (__VLS_ctx.widgetRounding),
    }));
    const __VLS_9 = __VLS_8({
        text: (__VLS_ctx.buttonInscription),
        onClick: (__VLS_ctx.onWhatsAppClick),
        width: "100%",
        customBackground: (__VLS_ctx.defaultButtonBackground),
        customForeground: "#fff",
        hoverColor: "#fff",
        hoverBackground: (__VLS_ctx.hoveredButtonBackground),
        borderRadius: (__VLS_ctx.widgetRounding),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
}
/** @type {__VLS_StyleScopedClasses['wa-chat-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-chat-container']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-chat-header']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-avatar-container']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-online-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-header-info']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-name']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-status']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-close-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-chat-content']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-typing-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-typing-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-typing-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-typing-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-message']} */ ;
/** @type {__VLS_StyleScopedClasses['wa-message-input']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ChronicleButton: ChronicleButton,
            IconBrandWhatsapp: IconBrandWhatsapp,
            IconX: IconX,
            name: name,
            photo: photo,
            status: status,
            nameTextColor: nameTextColor,
            statusTextColor: statusTextColor,
            containerHeaderBackground: containerHeaderBackground,
            containerBodyBackground: containerBodyBackground,
            containerBottomBackground: containerBottomBackground,
            messageBackground: messageBackground,
            messageTextColor: messageTextColor,
            defaultButtonBackground: defaultButtonBackground,
            hoveredButtonBackground: hoveredButtonBackground,
            widgetRounding: widgetRounding,
            onWhatsAppClick: onWhatsAppClick,
            typingDotsColor: typingDotsColor,
            buttonInscription: buttonInscription,
            isOpen: isOpen,
            messages: messages,
            isTyping: isTyping,
            toggleChat: toggleChat,
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
//# sourceMappingURL=WhatsAppWidget.vue.js.map