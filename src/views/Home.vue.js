import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import DesktopHero from '../home-page-blocks/desktop-hero.vue';
import MobileHero from '../home-page-blocks/mobile-hero.vue';
import MobileButtons from '../home-page-blocks/mobile-buttons.vue';
import ProjectShowcase from '../home-page-blocks/project-showcase.vue';
import CircularTestimonialsBlock from '../home-page-blocks/circular-testimonials.vue';
import ExploreButton from '../home-page-blocks/explore-button.vue';
import PlayingCard from '../components/namer-ui/playing-card/PlayingCard.vue';
import ShamayimToggleSwitch from '../components/namer-ui/shamayim-toggle-switch/ShamayimToggleSwitch.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const width = ref(window.innerWidth);
function onResize() {
    width.value = window.innerWidth;
    nextTick(() => updatePlayingCardHeight());
}
onMounted(() => {
    window.addEventListener('resize', onResize);
    nextTick(() => updatePlayingCardHeight());
});
onBeforeUnmount(() => window.removeEventListener('resize', onResize));
// Responsive display logic
const showDesktopHero = computed(() => width.value >= 1280);
const showMobileButtons = computed(() => width.value < 600);
const showProjectShowcase = computed(() => width.value >= 1194);
const showCircularTestimonials = computed(() => width.value >= 1056);
// Special container display logic
const showSpecialContainer = computed(() => width.value <= 768 && width.value >= 546);
const showPlayingCardOnly = computed(() => width.value < 546);
// Dynamic gap and proportions
function lerp(x, x0, x1, y0, y1) {
    if (x <= x0)
        return y0;
    if (x >= x1)
        return y1;
    return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
}
const dynamicGap = computed(() => width.value <= 546
    ? 10
    : width.value >= 768
        ? 14
        : lerp(width.value, 546, 768, 10, 14));
const playingCardWidthPercent = computed(() => {
    if (width.value < 546)
        return 100;
    if (width.value >= 768)
        return 50;
    return lerp(width.value, 546, 768, 64, 50);
});
const shamayimWidthPercent = computed(() => {
    if (width.value < 546)
        return 0;
    if (width.value >= 768)
        return 50;
    return lerp(width.value, 546, 768, 36, 50);
});
const containerPadding = computed(() => lerp(width.value, 546, 768, 10, 12) + 'px');
// PlayingCard height measurement
const playingCardWrapperRef = ref(null);
const playingCardHeight = ref(0);
function updatePlayingCardHeight() {
    if (playingCardWrapperRef.value) {
        playingCardHeight.value = playingCardWrapperRef.value.getBoundingClientRect().height;
    }
}
// Watch for width changes to update height
watch(width, () => nextTick(() => updatePlayingCardHeight()));
const shamayimHeight = computed(() => playingCardHeight.value);
// Navigation handlers
function goToPlayingCard() {
    router.push('/components/playing-card');
}
function onShamayimSwitch() {
    router.push('/components/shamayim-toggle-switch');
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['special-flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['special-flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['playing-card-container']} */ ;
/** @type {__VLS_StyleScopedClasses['shamayim-container']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
if (__VLS_ctx.showDesktopHero) {
    /** @type {[typeof DesktopHero, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(DesktopHero, new DesktopHero({}));
    const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
else {
    /** @type {[typeof MobileHero, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(MobileHero, new MobileHero({}));
    const __VLS_4 = __VLS_3({}, ...__VLS_functionalComponentArgsRest(__VLS_3));
}
if (__VLS_ctx.showMobileButtons) {
    /** @type {[typeof MobileButtons, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(MobileButtons, new MobileButtons({}));
    const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
}
if (__VLS_ctx.showSpecialContainer) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "special-flex-row" },
        ...{ style: ({
                padding: __VLS_ctx.containerPadding,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                gap: __VLS_ctx.dynamicGap + 'px',
                margin: '28px 0 0 0',
                alignItems: 'stretch',
                justifyContent: 'center',
                overflow: 'hidden',
                background: 'transparent',
                border: 'none'
            }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "playing-card-container" },
        ...{ style: ({
                flex: '1 1 0',
                minWidth: '0',
                maxWidth: '340px',
                width: __VLS_ctx.playingCardWidthPercent + '%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                outlineOffset: '0px',
                boxSizing: 'border-box',
                background: 'transparent'
            }) },
        ref: "playingCardWrapperRef",
    });
    /** @type {typeof __VLS_ctx.playingCardWrapperRef} */ ;
    /** @type {[typeof PlayingCard, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(PlayingCard, new PlayingCard({
        componentWidth: ('100%'),
        aspectRatio: ('3/4'),
        outerRounding: "8px",
        innerRounding: "8px",
        backgroundColor: "#FFF",
        foregroundColor: "#000",
        imageHeightPercentage: (70),
        imageSrc: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/playground-card-image.webp",
        imageAlt: "",
        outlineColor: "#ddd",
        hoverOutlineColor: "#aaa",
        textArray: (['洪', '秀', '全']),
        minWidth: (120),
        maxWidth: (340),
        minTextSize: (16),
        maxTextSize: (24),
        verticalPadding: "16px",
        horizontalPadding: "16px",
        manualLetterSpacing: (6),
        componentId: "card-1",
        onCardClicked: (__VLS_ctx.goToPlayingCard),
        textColorTransitionDelay: "1s",
        textColorTransitionDuration: "2.4s",
        ...{ style: {} },
    }));
    const __VLS_10 = __VLS_9({
        componentWidth: ('100%'),
        aspectRatio: ('3/4'),
        outerRounding: "8px",
        innerRounding: "8px",
        backgroundColor: "#FFF",
        foregroundColor: "#000",
        imageHeightPercentage: (70),
        imageSrc: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/playground-card-image.webp",
        imageAlt: "",
        outlineColor: "#ddd",
        hoverOutlineColor: "#aaa",
        textArray: (['洪', '秀', '全']),
        minWidth: (120),
        maxWidth: (340),
        minTextSize: (16),
        maxTextSize: (24),
        verticalPadding: "16px",
        horizontalPadding: "16px",
        manualLetterSpacing: (6),
        componentId: "card-1",
        onCardClicked: (__VLS_ctx.goToPlayingCard),
        textColorTransitionDelay: "1s",
        textColorTransitionDuration: "2.4s",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "shamayim-container" },
        ...{ style: ({
                flex: '1 1 0',
                minWidth: '0',
                maxWidth: '340px',
                width: __VLS_ctx.shamayimWidthPercent + '%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                backgroundImage: 'linear-gradient(45deg, #47b6d1, #90e0ec)',
                outline: '1px solid #47b6d1',
                outlineOffset: '0px',
                boxSizing: 'border-box',
                height: __VLS_ctx.shamayimHeight + 'px',
                transition: 'height 0.2s',
                overflow: 'hidden'
            }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ style: {} },
    });
    /** @type {[typeof ShamayimToggleSwitch, ]} */ ;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(ShamayimToggleSwitch, new ShamayimToggleSwitch({
        defaultState: (false),
        onChange: (__VLS_ctx.onShamayimSwitch),
        ...{ style: ({ height: __VLS_ctx.shamayimHeight + 'px', width: '100%', background: 'transparent' }) },
    }));
    const __VLS_13 = __VLS_12({
        defaultState: (false),
        onChange: (__VLS_ctx.onShamayimSwitch),
        ...{ style: ({ height: __VLS_ctx.shamayimHeight + 'px', width: '100%', background: 'transparent' }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
}
else if (__VLS_ctx.showPlayingCardOnly) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "playing-card-only-row" },
        ...{ style: ({
                padding: __VLS_ctx.containerPadding,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                gap: '0px',
                margin: '28px 0 0 0',
                alignItems: 'stretch',
                justifyContent: 'center',
                overflow: 'hidden',
                background: 'transparent',
                border: 'none'
            }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "playing-card-container" },
        ...{ style: ({
                flex: '1 1 0',
                minWidth: '0',
                maxWidth: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                outlineOffset: '0px',
                boxSizing: 'border-box',
                background: 'transparent'
            }) },
        ref: "playingCardWrapperRef",
    });
    /** @type {typeof __VLS_ctx.playingCardWrapperRef} */ ;
    /** @type {[typeof PlayingCard, ]} */ ;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(PlayingCard, new PlayingCard({
        componentWidth: ('100%'),
        aspectRatio: ('3/4'),
        outerRounding: "8px",
        innerRounding: "8px",
        backgroundColor: "#FFF",
        foregroundColor: "#000",
        imageHeightPercentage: (70),
        imageSrc: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/playground-card-image.webp",
        imageAlt: "",
        outlineColor: "#ddd",
        hoverOutlineColor: "#aaa",
        textArray: (['洪', '秀', '全']),
        minWidth: (120),
        maxWidth: (340),
        minTextSize: (16),
        maxTextSize: (24),
        verticalPadding: "16px",
        horizontalPadding: "16px",
        manualLetterSpacing: (6),
        componentId: "card-1",
        onCardClicked: (__VLS_ctx.goToPlayingCard),
        textColorTransitionDelay: "1s",
        textColorTransitionDuration: "2.4s",
        ...{ style: {} },
    }));
    const __VLS_16 = __VLS_15({
        componentWidth: ('100%'),
        aspectRatio: ('3/4'),
        outerRounding: "8px",
        innerRounding: "8px",
        backgroundColor: "#FFF",
        foregroundColor: "#000",
        imageHeightPercentage: (70),
        imageSrc: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/playground-card-image.webp",
        imageAlt: "",
        outlineColor: "#ddd",
        hoverOutlineColor: "#aaa",
        textArray: (['洪', '秀', '全']),
        minWidth: (120),
        maxWidth: (340),
        minTextSize: (16),
        maxTextSize: (24),
        verticalPadding: "16px",
        horizontalPadding: "16px",
        manualLetterSpacing: (6),
        componentId: "card-1",
        onCardClicked: (__VLS_ctx.goToPlayingCard),
        textColorTransitionDelay: "1s",
        textColorTransitionDuration: "2.4s",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
}
if (__VLS_ctx.showProjectShowcase) {
    /** @type {[typeof ProjectShowcase, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(ProjectShowcase, new ProjectShowcase({}));
    const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
}
if (__VLS_ctx.showCircularTestimonials) {
    /** @type {[typeof CircularTestimonialsBlock, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(CircularTestimonialsBlock, new CircularTestimonialsBlock({}));
    const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
}
/** @type {[typeof ExploreButton, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(ExploreButton, new ExploreButton({}));
const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
/** @type {__VLS_StyleScopedClasses['special-flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['playing-card-container']} */ ;
/** @type {__VLS_StyleScopedClasses['shamayim-container']} */ ;
/** @type {__VLS_StyleScopedClasses['playing-card-only-row']} */ ;
/** @type {__VLS_StyleScopedClasses['playing-card-container']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            DesktopHero: DesktopHero,
            MobileHero: MobileHero,
            MobileButtons: MobileButtons,
            ProjectShowcase: ProjectShowcase,
            CircularTestimonialsBlock: CircularTestimonialsBlock,
            ExploreButton: ExploreButton,
            PlayingCard: PlayingCard,
            ShamayimToggleSwitch: ShamayimToggleSwitch,
            showDesktopHero: showDesktopHero,
            showMobileButtons: showMobileButtons,
            showProjectShowcase: showProjectShowcase,
            showCircularTestimonials: showCircularTestimonials,
            showSpecialContainer: showSpecialContainer,
            showPlayingCardOnly: showPlayingCardOnly,
            dynamicGap: dynamicGap,
            playingCardWidthPercent: playingCardWidthPercent,
            shamayimWidthPercent: shamayimWidthPercent,
            containerPadding: containerPadding,
            playingCardWrapperRef: playingCardWrapperRef,
            shamayimHeight: shamayimHeight,
            goToPlayingCard: goToPlayingCard,
            onShamayimSwitch: onShamayimSwitch,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=Home.vue.js.map