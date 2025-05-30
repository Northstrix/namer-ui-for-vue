import { ref, computed, onMounted, onUnmounted, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { Search, Command, Minimize2, Menu } from "lucide-vue-next";
const emit = defineEmits(['open-search']);
const props = defineProps();
const outlineColor = computed(() => props.outlineColor || '#403d4d');
const scrolledBg = computed(() => props.scrolledBg || '#151419');
const mobileBg = computed(() => props.mobileBg || '#111014');
const shortcutKey = computed(() => (props.shortcutKey || 'K').toUpperCase());
const displayShortcutKey = computed(() => shortcutKey.value);
const fontSize = computed(() => props.fontSize || '0.875rem');
const desktopThreshold = computed(() => props.desktopThreshold ?? 910);
const searchFontSizeDesktop = computed(() => props.searchFontSizeDesktop || '1rem');
const searchFontSizeMobile = computed(() => props.searchFontSizeMobile || '0.875rem');
const searchPlaceholder = computed(() => props.searchPlaceholderText || 'Search components...');
const isMobile = ref(window.innerWidth < desktopThreshold.value);
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);
const searchHovered = ref(false);
const router = useRouter();
const navStyle = computed(() => {
    const baseStyle = isMobile.value
        ? {
            background: isScrolled.value ? scrolledBg.value : mobileBg.value,
            border: isScrolled.value ? `1px solid ${outlineColor.value}` : 'none',
            borderRadius: isScrolled.value ? '8px' : '0',
            height: isScrolled.value ? '52px' : '56px',
            top: isScrolled.value ? '8px' : '0',
            marginTop: isScrolled.value ? '8px' : '0',
            paddingLeft: isScrolled.value ? '12px' : '0',
            paddingRight: isScrolled.value ? '12px' : '0',
            boxShadow: isScrolled.value ? '0 2px 16px 0 rgba(0,0,0,0.08)' : 'none',
            transition: 'all 0.2s cubic-bezier(.4,0,.2,1)',
        }
        : {
            background: isScrolled.value ? scrolledBg.value : 'transparent',
            border: `1px solid ${isScrolled.value ? outlineColor.value : 'transparent'}`,
            borderRadius: isScrolled.value ? '8px' : '0',
            height: isScrolled.value ? '52px' : '64px',
            top: isScrolled.value ? '16px' : '0',
            marginTop: isScrolled.value ? '16px' : '0',
            paddingLeft: isScrolled.value ? '24px' : '0',
            paddingRight: isScrolled.value ? '24px' : '0',
            boxShadow: isScrolled.value ? '0 2px 16px 0 rgba(0,0,0,0.08)' : 'none',
            transition: 'all 0.2s cubic-bezier(.4,0,.2,1)',
        };
    // Add zIndex from prop (default 10)
    return { ...baseStyle, zIndex: props.zIndex ?? 10 };
});
function handleResize() {
    isMobile.value = window.innerWidth < desktopThreshold.value;
    if (!isMobile.value)
        isMobileMenuOpen.value = false;
}
function handleScroll() {
    if (window.scrollY === 0 && isScrolled.value) {
        isScrolled.value = false;
    }
    else if (window.scrollY > 8 && !isScrolled.value) {
        isScrolled.value = true;
    }
}
function handleKeydown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toUpperCase() === shortcutKey.value) {
        e.preventDefault();
        if (props.onShortcut)
            props.onShortcut();
        emit('open-search');
    }
}
function handleRoute(item, closeMobile = false) {
    if (!item.external && item.link) {
        router.push(item.link);
        if (closeMobile)
            isMobileMenuOpen.value = false;
    }
    else if (item.external && item.link) {
        window.location.href = item.link;
        if (closeMobile)
            isMobileMenuOpen.value = false;
    }
}
onMounted(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeydown, { capture: true });
});
onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("keydown", handleKeydown, { capture: true });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-search-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-search-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['search-placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['search-shortcut']} */ ;
/** @type {__VLS_StyleScopedClasses['search-shortcut']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-items']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-search-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-nav-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-nav-close']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-search-btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
    ...{ class: "resizable-navbar" },
    ...{ class: ({ scrolled: __VLS_ctx.isScrolled, mobile: __VLS_ctx.isMobile }) },
    ...{ style: (__VLS_ctx.navStyle) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    ...{ class: "navbar-logo" },
    href: (__VLS_ctx.homeRoute),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.icon),
    alt: "logo",
    width: "32",
    height: "32",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "app-name" },
});
(__VLS_ctx.appName);
if (!__VLS_ctx.isMobile) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "nav-items" },
    });
    for (const [item, idx] of __VLS_getVForSourceType((__VLS_ctx.routes))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
            ...{ onClick: (...[$event]) => {
                    if (!(!__VLS_ctx.isMobile))
                        return;
                    __VLS_ctx.handleRoute(item);
                } },
            key: (idx),
            href: (item.link),
            ...{ class: "nav-link" },
            target: (item.external ? '_self' : undefined),
            rel: (item.external ? 'noopener' : undefined),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "nav-link-text" },
            ...{ style: ({ fontSize: __VLS_ctx.fontSize }) },
        });
        (item.name);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(!__VLS_ctx.isMobile))
                    return;
                __VLS_ctx.emit('open-search');
            } },
        ...{ class: "navbar-search-btn" },
        ...{ style: ({ outline: `1px solid ${__VLS_ctx.outlineColor}`, fontSize: __VLS_ctx.searchFontSizeDesktop }) },
        type: "button",
    });
    const __VLS_0 = {}.Search;
    /** @type {[typeof __VLS_components.Search, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        size: (18),
        color: "#aaa",
    }));
    const __VLS_2 = __VLS_1({
        size: (18),
        color: "#aaa",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ onMouseenter: (...[$event]) => {
                if (!(!__VLS_ctx.isMobile))
                    return;
                __VLS_ctx.searchHovered = true;
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(!__VLS_ctx.isMobile))
                    return;
                __VLS_ctx.searchHovered = false;
            } },
        ...{ class: "search-placeholder" },
        ...{ class: ({ hovered: __VLS_ctx.searchHovered }) },
    });
    (__VLS_ctx.searchPlaceholder);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "search-shortcut" },
        ...{ style: ({ outline: `1px solid ${__VLS_ctx.outlineColor}` }) },
    });
    const __VLS_4 = {}.Command;
    /** @type {[typeof __VLS_components.Command, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        size: (16),
    }));
    const __VLS_6 = __VLS_5({
        size: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.displayShortcutKey);
}
if (__VLS_ctx.isMobile) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isMobile))
                    return;
                __VLS_ctx.isMobileMenuOpen = !__VLS_ctx.isMobileMenuOpen;
            } },
        ...{ class: "mobile-nav-toggle" },
        'aria-label': "Open navigation",
    });
    if (__VLS_ctx.isMobileMenuOpen) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        const __VLS_8 = {}.Menu;
        /** @type {[typeof __VLS_components.Menu, ]} */ ;
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
            size: (26),
        }));
        const __VLS_10 = __VLS_9({
            size: (26),
        }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        const __VLS_12 = {}.Menu;
        /** @type {[typeof __VLS_components.Menu, ]} */ ;
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
            size: (26),
        }));
        const __VLS_14 = __VLS_13({
            size: (26),
        }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    }
}
const __VLS_16 = {}.transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    name: "fade",
}));
const __VLS_18 = __VLS_17({
    name: "fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
if (__VLS_ctx.isMobileMenuOpen) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isMobileMenuOpen))
                    return;
                __VLS_ctx.isMobileMenuOpen = false;
            } },
        ...{ class: "mobile-nav-overlay" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mobile-nav-menu" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mobile-nav-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        ...{ class: "navbar-logo" },
        href: (__VLS_ctx.homeRoute),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.icon),
        alt: "logo",
        width: "32",
        height: "32",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "app-name" },
    });
    (__VLS_ctx.appName);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isMobileMenuOpen))
                    return;
                __VLS_ctx.isMobileMenuOpen = false;
            } },
        ...{ class: "mobile-nav-close" },
        'aria-label': "Close menu",
    });
    const __VLS_20 = {}.Minimize2;
    /** @type {[typeof __VLS_components.Minimize2, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        size: (26),
    }));
    const __VLS_22 = __VLS_21({
        size: (26),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mobile-nav-links" },
    });
    for (const [item, idx] of __VLS_getVForSourceType((__VLS_ctx.routes))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.isMobileMenuOpen))
                        return;
                    __VLS_ctx.handleRoute(item, true);
                } },
            key: (idx),
            href: (item.external ? item.link : undefined),
            to: (!item.external ? item.link : undefined),
            ...{ class: "mobile-nav-link" },
            target: (item.external ? '_self' : undefined),
            rel: (item.external ? 'noopener' : undefined),
        });
        (item.name);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isMobileMenuOpen))
                    return;
                __VLS_ctx.emit('open-search');
            } },
        ...{ class: "navbar-search-btn mobile" },
        ...{ style: ({ outline: `1px solid ${__VLS_ctx.outlineColor}`, fontSize: __VLS_ctx.searchFontSizeMobile }) },
        type: "button",
    });
    const __VLS_24 = {}.Search;
    /** @type {[typeof __VLS_components.Search, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        size: (18),
    }));
    const __VLS_26 = __VLS_25({
        size: (18),
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ onMouseenter: (...[$event]) => {
                if (!(__VLS_ctx.isMobileMenuOpen))
                    return;
                __VLS_ctx.searchHovered = true;
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(__VLS_ctx.isMobileMenuOpen))
                    return;
                __VLS_ctx.searchHovered = false;
            } },
        ...{ class: "search-placeholder" },
        ...{ class: ({ hovered: __VLS_ctx.searchHovered }) },
    });
    (__VLS_ctx.searchPlaceholder);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "search-shortcut" },
        ...{ style: ({ outline: `1px solid ${__VLS_ctx.outlineColor}` }) },
    });
    const __VLS_28 = {}.Command;
    /** @type {[typeof __VLS_components.Command, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        size: (16),
    }));
    const __VLS_30 = __VLS_29({
        size: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.displayShortcutKey);
}
var __VLS_19;
/** @type {__VLS_StyleScopedClasses['resizable-navbar']} */ ;
/** @type {__VLS_StyleScopedClasses['scrolled']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['app-name']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-items']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link-text']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-search-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['search-placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['hovered']} */ ;
/** @type {__VLS_StyleScopedClasses['search-shortcut']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-nav-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-nav-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-nav-menu']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-nav-header']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['app-name']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-nav-close']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-nav-links']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-search-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile']} */ ;
/** @type {__VLS_StyleScopedClasses['search-placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['hovered']} */ ;
/** @type {__VLS_StyleScopedClasses['search-shortcut']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Search: Search,
            Command: Command,
            Minimize2: Minimize2,
            Menu: Menu,
            emit: emit,
            outlineColor: outlineColor,
            displayShortcutKey: displayShortcutKey,
            fontSize: fontSize,
            searchFontSizeDesktop: searchFontSizeDesktop,
            searchFontSizeMobile: searchFontSizeMobile,
            searchPlaceholder: searchPlaceholder,
            isMobile: isMobile,
            isMobileMenuOpen: isMobileMenuOpen,
            isScrolled: isScrolled,
            searchHovered: searchHovered,
            navStyle: navStyle,
            handleRoute: handleRoute,
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
//# sourceMappingURL=TruncatingNavbar.vue.js.map