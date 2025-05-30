import { ref, computed, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { Search } from 'lucide-vue-next';
import { componentMeta } from '../data/componentMeta';
const props = defineProps();
const emit = defineEmits(['close']);
const query = ref('');
const searchInput = ref(null);
const router = useRouter();
const filtered = computed(() => componentMeta.filter(c => c.name.toLowerCase().includes(query.value.toLowerCase()) ||
    c.description.toLowerCase().includes(query.value.toLowerCase())));
function close() {
    emit('close');
    query.value = '';
}
function goTo(route) {
    close();
    router.push(`/components/${route}`);
}
watch(() => props.show, val => {
    if (val)
        nextTick(() => searchInput.value?.focus());
});
const modalStyle = computed(() => ({
    background: '#17161c',
    outline: `1px solid ${props.outlineColor || '#403d4d'}`,
    borderRadius: '16px',
    boxShadow: 'none',
}));
const inputStyle = computed(() => ({
    outline: `1px solid ${props.outlineColor || '#403d4d'}`,
    borderRadius: '8px',
    paddingLeft: '38px', // leave space for icon
}));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['search-modal-result']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.teleport;
/** @type {[typeof __VLS_components.Teleport, typeof __VLS_components.teleport, typeof __VLS_components.Teleport, typeof __VLS_components.teleport, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "body",
}));
const __VLS_2 = __VLS_1({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    name: "fade",
}));
const __VLS_6 = __VLS_5({
    name: "fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
if (__VLS_ctx.show) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (__VLS_ctx.close) },
        ...{ class: "search-modal-overlay" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "search-modal-content" },
        ...{ style: (__VLS_ctx.modalStyle) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "search-modal-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "search-input-wrapper" },
    });
    const __VLS_8 = {}.Search;
    /** @type {[typeof __VLS_components.Search, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        size: (20),
        ...{ class: "search-input-icon" },
    }));
    const __VLS_10 = __VLS_9({
        size: (20),
        ...{ class: "search-input-icon" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onKeydown: (__VLS_ctx.close) },
        ref: "searchInput",
        ...{ class: "search-modal-input" },
        ...{ style: (__VLS_ctx.inputStyle) },
        placeholder: "Search components...",
    });
    (__VLS_ctx.query);
    /** @type {typeof __VLS_ctx.searchInput} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "search-modal-results" },
    });
    for (const [comp] of __VLS_getVForSourceType((__VLS_ctx.filtered))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.show))
                        return;
                    __VLS_ctx.goTo(comp.route);
                } },
            key: (comp.route),
            ...{ class: "search-modal-result" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (comp.name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "search-modal-desc" },
        });
        (comp.description);
    }
    if (__VLS_ctx.filtered.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "search-modal-noresult" },
        });
    }
}
var __VLS_7;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['search-modal-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['search-modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['search-modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['search-modal-input']} */ ;
/** @type {__VLS_StyleScopedClasses['search-modal-results']} */ ;
/** @type {__VLS_StyleScopedClasses['search-modal-result']} */ ;
/** @type {__VLS_StyleScopedClasses['search-modal-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['search-modal-noresult']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Search: Search,
            query: query,
            searchInput: searchInput,
            filtered: filtered,
            close: close,
            goTo: goTo,
            modalStyle: modalStyle,
            inputStyle: inputStyle,
        };
    },
    emits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=SearchModal.vue.js.map