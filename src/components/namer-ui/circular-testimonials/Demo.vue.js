import CircularTestimonials from './CircularTestimonials.vue';
const testimonials = [
    {
        quote: "I was impressed by the food — every dish is bursting with flavor! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive, going the extra mile. I'll definitely be back for more!",
        name: "Tamar Mendelson",
        designation: "Restaurant Critic",
        src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        quote: "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond to ensure a fantastic visit. I'll definitely keep returning for more exceptional dining experience.",
        name: "Joe Charlescraft",
        designation: "Frequent Visitor",
        src: "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
    },
    {
        quote: "Shining Yam is a hidden gem! From the moment I walked in, I knew I was in for a treat. The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
        name: "Martina Edelweist",
        designation: "Satisfied Customer",
        src: "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
    }
];
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "circular-demo-root" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "circular-demo-disclaimer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
/** @type {[typeof CircularTestimonials, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(CircularTestimonials, new CircularTestimonials({
    testimonials: (__VLS_ctx.testimonials),
    autoplay: (true),
    colors: ({
        name: '#fff',
        designation: '#999',
        testimony: '#e1e1e1',
        arrowBackground: '#eee',
        arrowForeground: '#151419',
        arrowHoverBackground: '#4776cb'
    }),
}));
const __VLS_1 = __VLS_0({
    testimonials: (__VLS_ctx.testimonials),
    autoplay: (true),
    colors: ({
        name: '#fff',
        designation: '#999',
        testimony: '#e1e1e1',
        arrowBackground: '#eee',
        arrowForeground: '#151419',
        arrowHoverBackground: '#4776cb'
    }),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "circular-demo-link-wrap" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    ...{ class: "circular-demo-link" },
    href: "https://codepen.io/Northstrix/pen/QwWoYzZ",
    target: "_blank",
    rel: "noopener noreferrer",
});
/** @type {__VLS_StyleScopedClasses['circular-demo-root']} */ ;
/** @type {__VLS_StyleScopedClasses['circular-demo-disclaimer']} */ ;
/** @type {__VLS_StyleScopedClasses['circular-demo-link-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['circular-demo-link']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            CircularTestimonials: CircularTestimonials,
            testimonials: testimonials,
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