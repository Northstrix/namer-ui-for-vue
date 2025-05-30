import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import MagicText from '../components/namer-ui/magic-text/MagicText.vue';
import StargazingButton from '../components/namer-ui/stargazing-button/StargazingButton.vue';
import SparklyButton from '../home-page-blocks/SparklyButton.vue';
import BentoGrid from '../components/namer-ui/bento-grid/BentoGrid.vue';
import PlayingCard from '../components/namer-ui/playing-card/PlayingCard.vue';
import AnimatedCube from '../components/namer-ui/animated-cube/AnimatedCube.vue';
import AnimatedTooltip from '../components/namer-ui/animated-tooltip/AnimatedTooltip.vue';
import ShamayimToggleSwitch from '../components/namer-ui/shamayim-toggle-switch/ShamayimToggleSwitch.vue';
const hoveredButton = ref(null);
const router = useRouter();
function goToPlayingCard() { router.push('/components/playing-card'); }
function goToAnimatedTooltip() { router.push('/components/animated-tooltip'); }
function onShamayimSwitch() { router.push('/components/shamayim-toggle-switch'); }
// --- Responsive logic ---
const windowWidth = ref(window.innerWidth);
function onResize() { windowWidth.value = window.innerWidth; }
onMounted(() => { window.addEventListener('resize', onResize); });
onBeforeUnmount(() => { window.removeEventListener('resize', onResize); });
function onGetStartedClick(ev) {
    // Emit event if parent listens
    // (If you want to emit to parent, use defineEmits and emit here)
    router.push('/components');
}
// Linear interpolation helper
function lerp(minW, maxW, minV, maxV, w) {
    if (w <= minW)
        return minV;
    if (w >= maxW)
        return maxV;
    return minV + ((maxV - minV) * (w - minW)) / (maxW - minW);
}
// Hero Title font size (2.8rem @ 320px, 4.24rem @ 1280px)
const heroTitleFontSize = computed(() => {
    const size = lerp(320, 1280, 2.8, 4.24, windowWidth.value);
    return `${size}rem`;
});
// Hero Subtext font size (0.86rem @ 800px, 1.12rem @ 1280px)
const heroSubtextFontSize = computed(() => {
    const size = lerp(800, 1280, 0.86, 1.12, windowWidth.value);
    return `${size}rem`;
});
// AnimatedTooltip container height (140px @ 800px, 220px @ 1280px)
const animatedTooltipContainerHeight = computed(() => {
    const height = lerp(800, 1280, 140, 220, windowWidth.value);
    return `${height}px`;
});
// Tooltip tip fade logic
const showTooltipTip = ref(true);
const tooltipTipOpacity = ref(1);
const tooltipTipFontSize = computed(() => (windowWidth.value >= 1100 ? '1.07rem' : '1rem'));
let tipTimeout = null;
function onAvatarHover() {
    showTooltipTip.value = false;
    tooltipTipOpacity.value = 0;
    if (tipTimeout) {
        clearTimeout(tipTimeout);
        tipTimeout = null;
    }
}
function onAvatarUnhover() {
    if (tipTimeout)
        clearTimeout(tipTimeout);
    tipTimeout = window.setTimeout(() => {
        showTooltipTip.value = true;
        tooltipTipOpacity.value = 1;
    }, 1000);
}
onBeforeUnmount(() => {
    if (tipTimeout)
        clearTimeout(tipTimeout);
});
function handleCellClick(cell) {
    if (cell === 'topRight') {
        router.push('/components/animated-cube');
    }
}
const items = [
    {
        id: "Vue",
        name: 'Vue',
        image: 'https://icon.icepanel.io/Technology/svg/Vue.js.svg',
        appearanceEffect: 'from-top-left',
        tooltipOffsetY: 2,
        tooltipBorderEffectColors: ['#33303b 0%', '#33303b 100%'],
        nameColor: '#41b883',
        imageRounding: 40,
        imageOutlineColorOverwrite: "#312f3b",
        tooltipWidth: "auto"
    },
    {
        id: "TypeScript",
        name: 'TypeScript',
        designation: '12px higher than Vue tooltip',
        image: 'https://icon.icepanel.io/Technology/svg/TypeScript.svg',
        appearanceEffect: 'from-top',
        tooltipOffsetY: 14,
        tooltipBorderEffectColors: ['#4776cb 0', '#a19fe5 40%', 'transparent 90%'],
        nameFontSize: '1.3rem',
        imageOutlineColor: "#444051",
        nameColor: '#fff',
        designationColor: '#008ceb',
        imageRounding: 8,
        tooltipRounding: 0,
    },
    {
        id: "CSS",
        name: 'CSS',
        designation: "That one doesn't tilt",
        image: 'https://icon.icepanel.io/Technology/svg/CSS3.svg',
        appearanceEffect: 'from-top-right',
        tooltipOffsetY: 2,
        tooltipBorderEffectColors: ['#0097fd 0', '#0097fd 100%'],
        imageRounding: 0,
        tintTilt: false,
        tooltipRounding: 50,
        designationFontSize: "1.125rem",
        tooltipColor: "#eee",
        tooltipDotColor: "rgba(21, 114, 182, 0.84)",
        nameColor: "#111014",
        designationColor: "#3e3a49",
    },
];
// --- Animated outline color logic (unchanged) ---
const COLOR_1 = '#25232c';
const COLOR_2 = '#ffffff';
const HOLD_DURATION = 50;
const TRANSITION_DURATION = 1250;
const animatedOutlineColor = ref(COLOR_2);
let animationFrame = null;
let timeoutId = null;
let isToColor1 = true;
function hexToRgb(hex) {
    const h = hex.replace('#', '');
    return [
        parseInt(h.substring(0, 2), 16),
        parseInt(h.substring(2, 4), 16),
        parseInt(h.substring(4, 6), 16),
    ];
}
function rgbToHex([r, g, b]) {
    return ('#' +
        [r, g, b]
            .map((x) => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        })
            .join(''));
}
function animateColor(from, to, duration, onDone) {
    const start = performance.now();
    const rgbFrom = hexToRgb(from);
    const rgbTo = hexToRgb(to);
    function step(now) {
        const elapsed = Math.min((now - start) / duration, 1);
        const rgbCurrent = rgbFrom.map((fromC, i) => Math.round(fromC + (rgbTo[i] - fromC) * elapsed));
        animatedOutlineColor.value = rgbToHex(rgbCurrent);
        if (elapsed < 1) {
            animationFrame = requestAnimationFrame(step);
        }
        else {
            animatedOutlineColor.value = to;
            onDone();
        }
    }
    animationFrame = requestAnimationFrame(step);
}
function startOscillation() {
    function nextPhase() {
        if (animationFrame)
            cancelAnimationFrame(animationFrame);
        const from = isToColor1 ? COLOR_2 : COLOR_1;
        const to = isToColor1 ? COLOR_1 : COLOR_2;
        timeoutId = window.setTimeout(() => {
            animateColor(from, to, TRANSITION_DURATION, () => {
                isToColor1 = !isToColor1;
                nextPhase();
            });
        }, HOLD_DURATION);
    }
    nextPhase();
}
onMounted(() => { startOscillation(); });
onBeforeUnmount(() => {
    if (animationFrame)
        cancelAnimationFrame(animationFrame);
    if (timeoutId)
        clearTimeout(timeoutId);
    if (tipTimeout)
        clearTimeout(tipTimeout);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "home-root" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hero-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hero-content" },
    ...{ class: ({ 'center-mobile': __VLS_ctx.windowWidth < 600 }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "hero-title" },
    ...{ style: ({ fontSize: __VLS_ctx.heroTitleFontSize }) },
});
/** @type {[typeof MagicText, typeof MagicText, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(MagicText, new MagicText({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_2.slots.default;
var __VLS_2;
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "hero-subtext" },
    ...{ style: ({ fontSize: __VLS_ctx.heroSubtextFontSize }) },
});
if (__VLS_ctx.windowWidth >= 600) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "hero-buttons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onMouseenter: (...[$event]) => {
                if (!(__VLS_ctx.windowWidth >= 600))
                    return;
                __VLS_ctx.hoveredButton = 0;
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(__VLS_ctx.windowWidth >= 600))
                    return;
                __VLS_ctx.hoveredButton = null;
            } },
        ...{ class: "button-container" },
        ...{ style: ({ zIndex: __VLS_ctx.hoveredButton === 0 ? 9999 : 1 }) },
    });
    /** @type {[typeof SparklyButton, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(SparklyButton, new SparklyButton({
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
    const __VLS_4 = __VLS_3({
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
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    let __VLS_6;
    let __VLS_7;
    let __VLS_8;
    const __VLS_9 = {
        onClick: (__VLS_ctx.onGetStartedClick)
    };
    var __VLS_5;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onMouseenter: (...[$event]) => {
                if (!(__VLS_ctx.windowWidth >= 600))
                    return;
                __VLS_ctx.hoveredButton = 1;
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(__VLS_ctx.windowWidth >= 600))
                    return;
                __VLS_ctx.hoveredButton = null;
            } },
        ...{ class: "button-container" },
        ...{ style: ({ zIndex: __VLS_ctx.hoveredButton === 1 ? 9999 : 1 }) },
    });
    /** @type {[typeof StargazingButton, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(StargazingButton, new StargazingButton({
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
    const __VLS_11 = __VLS_10({
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
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid-section" },
});
if (__VLS_ctx.windowWidth >= 768) {
    /** @type {[typeof BentoGrid, typeof BentoGrid, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(BentoGrid, new BentoGrid({
        mainAspect: ('9/14'),
        leftColRatio: (0.38),
        rightCol1: (0.62),
        rightCol2: (0.38),
        topRowRatio: (0.56),
        bottomRowRatio: (0.44),
        gap: "20px",
        gridHeight: "100%",
        cellBackground: "#17161c",
        cellBorderColor: "#33313d",
        cellBorderRadius: "24px",
        cellBorderWidth: "1px",
        cellPadding: "24px",
    }));
    const __VLS_14 = __VLS_13({
        mainAspect: ('9/14'),
        leftColRatio: (0.38),
        rightCol1: (0.62),
        rightCol2: (0.38),
        topRowRatio: (0.56),
        bottomRowRatio: (0.44),
        gap: "20px",
        gridHeight: "100%",
        cellBackground: "#17161c",
        cellBorderColor: "#33313d",
        cellBorderRadius: "24px",
        cellBorderWidth: "1px",
        cellPadding: "24px",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_15.slots.default;
    {
        const { main: __VLS_thisSlot } = __VLS_15.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ style: {} },
        });
        /** @type {[typeof PlayingCard, ]} */ ;
        // @ts-ignore
        const __VLS_16 = __VLS_asFunctionalComponent(PlayingCard, new PlayingCard({
            componentWidth: "412px",
            aspectRatio: "90/148",
            outerRounding: "18px",
            innerRounding: "18px",
            backgroundColor: "#FFF",
            foregroundColor: "#000",
            imageHeightPercentage: (70),
            imageSrc: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/playground-card-image.webp",
            imageAlt: "",
            outlineColor: "#ddd",
            hoverOutlineColor: "#aaa",
            textArray: (['洪', '秀', '全']),
            minWidth: (200),
            maxWidth: (400),
            minTextSize: (16),
            maxTextSize: (24),
            verticalPadding: "20px",
            horizontalPadding: "20px",
            manualLetterSpacing: (6),
            componentId: "card-1",
            onCardClicked: (__VLS_ctx.goToPlayingCard),
            textColorTransitionDelay: "1s",
            textColorTransitionDuration: "2.4s",
        }));
        const __VLS_17 = __VLS_16({
            componentWidth: "412px",
            aspectRatio: "90/148",
            outerRounding: "18px",
            innerRounding: "18px",
            backgroundColor: "#FFF",
            foregroundColor: "#000",
            imageHeightPercentage: (70),
            imageSrc: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/playground-card-image.webp",
            imageAlt: "",
            outlineColor: "#ddd",
            hoverOutlineColor: "#aaa",
            textArray: (['洪', '秀', '全']),
            minWidth: (200),
            maxWidth: (400),
            minTextSize: (16),
            maxTextSize: (24),
            verticalPadding: "20px",
            horizontalPadding: "20px",
            manualLetterSpacing: (6),
            componentId: "card-1",
            onCardClicked: (__VLS_ctx.goToPlayingCard),
            textColorTransitionDelay: "1s",
            textColorTransitionDuration: "2.4s",
        }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    }
    {
        const { topCenter: __VLS_thisSlot } = __VLS_15.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ style: {} },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "shamayim-gradient-container" },
        });
        /** @type {[typeof ShamayimToggleSwitch, ]} */ ;
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent(ShamayimToggleSwitch, new ShamayimToggleSwitch({
            defaultState: (false),
            onChange: (__VLS_ctx.onShamayimSwitch),
        }));
        const __VLS_20 = __VLS_19({
            defaultState: (false),
            onChange: (__VLS_ctx.onShamayimSwitch),
        }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    }
    {
        const { topRight: __VLS_thisSlot } = __VLS_15.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ style: {} },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ style: {} },
        });
        /** @type {[typeof AnimatedCube, ]} */ ;
        // @ts-ignore
        const __VLS_22 = __VLS_asFunctionalComponent(AnimatedCube, new AnimatedCube({
            size: (36),
            scale: (1.24),
            faceColor: "#7dd3fc",
            shadowColor: "#0e7490",
            borderColor: "#0ea5e9",
            animationDuration: (3.12),
        }));
        const __VLS_23 = __VLS_22({
            size: (36),
            scale: (1.24),
            faceColor: "#7dd3fc",
            shadowColor: "#0e7490",
            borderColor: "#0ea5e9",
            animationDuration: (3.12),
        }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    }
    {
        const { bottom: __VLS_thisSlot } = __VLS_15.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "tooltip-container" },
            ...{ style: ({
                    width: '100%',
                    height: __VLS_ctx.animatedTooltipContainerHeight,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'visible'
                }) },
        });
        const __VLS_25 = {}.transition;
        /** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
        // @ts-ignore
        const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
            name: "tooltip-fade",
        }));
        const __VLS_27 = __VLS_26({
            name: "tooltip-fade",
        }, ...__VLS_functionalComponentArgsRest(__VLS_26));
        __VLS_28.slots.default;
        if (__VLS_ctx.showTooltipTip) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "tooltip-tip-overlay" },
                ...{ style: ({
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        textAlign: 'center',
                        color: '#aaa',
                        fontSize: __VLS_ctx.tooltipTipFontSize,
                        zIndex: 10,
                        opacity: __VLS_ctx.tooltipTipOpacity,
                        pointerEvents: 'none'
                    }) },
            });
        }
        var __VLS_28;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: (__VLS_ctx.goToAnimatedTooltip) },
            ...{ style: {} },
            ...{ class: "tooltip-demo-clickable" },
        });
        /** @type {[typeof AnimatedTooltip, ]} */ ;
        // @ts-ignore
        const __VLS_29 = __VLS_asFunctionalComponent(AnimatedTooltip, new AnimatedTooltip({
            ...{ 'onTooltipClick': {} },
            ...{ 'onAvatarHover': {} },
            ...{ 'onAvatarUnhover': {} },
            items: (__VLS_ctx.items),
            tooltipColor: "#060507",
            tooltipBorderEffectRotation: "2.94rad",
            tooltipBorderEffectThickness: "1px",
            tooltipBorderEffectPercentage: (100),
            tooltipRounding: (8),
            tooltipWidth: "264px",
            tooltipPadding: "0.625rem 1rem",
            appearanceEffect: "from-top",
            tooltipPosition: "top",
            nameFontSize: "1.2rem",
            designationFontSize: "0.875rem",
            nameColor: "#ffeaa7",
            designationColor: "#fab1a0",
            imageOutlineColor: (__VLS_ctx.animatedOutlineColor),
            imageOutlineWidth: "1px",
            tooltipBgColor: "rgba(71, 118, 203, 0.05)",
            tooltipDotColor: "rgba(98, 92, 115, 0.73)",
            tintTilt: true,
            avatarGap: "24px",
            uniqueId: "main-demo",
        }));
        const __VLS_30 = __VLS_29({
            ...{ 'onTooltipClick': {} },
            ...{ 'onAvatarHover': {} },
            ...{ 'onAvatarUnhover': {} },
            items: (__VLS_ctx.items),
            tooltipColor: "#060507",
            tooltipBorderEffectRotation: "2.94rad",
            tooltipBorderEffectThickness: "1px",
            tooltipBorderEffectPercentage: (100),
            tooltipRounding: (8),
            tooltipWidth: "264px",
            tooltipPadding: "0.625rem 1rem",
            appearanceEffect: "from-top",
            tooltipPosition: "top",
            nameFontSize: "1.2rem",
            designationFontSize: "0.875rem",
            nameColor: "#ffeaa7",
            designationColor: "#fab1a0",
            imageOutlineColor: (__VLS_ctx.animatedOutlineColor),
            imageOutlineWidth: "1px",
            tooltipBgColor: "rgba(71, 118, 203, 0.05)",
            tooltipDotColor: "rgba(98, 92, 115, 0.73)",
            tintTilt: true,
            avatarGap: "24px",
            uniqueId: "main-demo",
        }, ...__VLS_functionalComponentArgsRest(__VLS_29));
        let __VLS_32;
        let __VLS_33;
        let __VLS_34;
        const __VLS_35 = {
            onTooltipClick: (__VLS_ctx.goToAnimatedTooltip)
        };
        const __VLS_36 = {
            onAvatarHover: (__VLS_ctx.onAvatarHover)
        };
        const __VLS_37 = {
            onAvatarUnhover: (__VLS_ctx.onAvatarUnhover)
        };
        var __VLS_31;
    }
    var __VLS_15;
}
/** @type {__VLS_StyleScopedClasses['home-root']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-section']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
/** @type {__VLS_StyleScopedClasses['center-mobile']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-title']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-subtext']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-section']} */ ;
/** @type {__VLS_StyleScopedClasses['shamayim-gradient-container']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-container']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-tip-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-demo-clickable']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            MagicText: MagicText,
            StargazingButton: StargazingButton,
            SparklyButton: SparklyButton,
            BentoGrid: BentoGrid,
            PlayingCard: PlayingCard,
            AnimatedCube: AnimatedCube,
            AnimatedTooltip: AnimatedTooltip,
            ShamayimToggleSwitch: ShamayimToggleSwitch,
            hoveredButton: hoveredButton,
            goToPlayingCard: goToPlayingCard,
            goToAnimatedTooltip: goToAnimatedTooltip,
            onShamayimSwitch: onShamayimSwitch,
            windowWidth: windowWidth,
            onGetStartedClick: onGetStartedClick,
            heroTitleFontSize: heroTitleFontSize,
            heroSubtextFontSize: heroSubtextFontSize,
            animatedTooltipContainerHeight: animatedTooltipContainerHeight,
            showTooltipTip: showTooltipTip,
            tooltipTipOpacity: tooltipTipOpacity,
            tooltipTipFontSize: tooltipTipFontSize,
            onAvatarHover: onAvatarHover,
            onAvatarUnhover: onAvatarUnhover,
            items: items,
            animatedOutlineColor: animatedOutlineColor,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=mobile-hero.vue.js.map