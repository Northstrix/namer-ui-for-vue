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
const router = useRouter();
function goToPlayingCard() {
    router.push('/components/playing-card');
}
function goToAnimatedTooltip() {
    router.push('/components/animated-tooltip');
}
function onShamayimSwitch() {
    router.push('/components/shamayim-toggle-switch');
}
function handleCellClick(cell) {
    if (cell === 'topRight') {
        router.push('/components/animated-cube');
    }
}
function onGetStartedClick(ev) {
    // Emit event if parent listens
    // (If you want to emit to parent, use defineEmits and emit here)
    router.push('/components');
}
const hoveredButton = ref(null);
const width = ref(window.innerWidth);
function onResize() { width.value = window.innerWidth; }
onMounted(() => window.addEventListener('resize', onResize));
onBeforeUnmount(() => window.removeEventListener('resize', onResize));
const isMobile = computed(() => width.value < 800);
function lerp(x, x0, x1, y0, y1) {
    if (x <= x0)
        return y0;
    if (x >= x1)
        return y1;
    return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
}
const heroSectionStyle = computed(() => {
    let maxWidth = 554;
    if (width.value >= 1536)
        maxWidth = 554;
    else if (width.value >= 1400)
        maxWidth = lerp(width.value, 1400, 1536, 524, 554);
    else if (width.value >= 1300)
        maxWidth = lerp(width.value, 1300, 1400, 460, 524);
    else if (width.value >= 1100)
        maxWidth = lerp(width.value, 1100, 1300, 340, 460);
    else
        maxWidth = '100vw';
    return {
        maxWidth: typeof maxWidth === 'number' ? maxWidth + 'px' : maxWidth,
        flex: '0 0 ' + (typeof maxWidth === 'number' ? maxWidth + 'px' : maxWidth),
        display: 'flex',
        alignItems: 'center'
    };
});
const heroTitleStyle = computed(() => {
    let size = 3.7;
    if (width.value >= 1536)
        size = 3.7;
    else if (width.value >= 1400)
        size = lerp(width.value, 1400, 1536, 3.38, 3.7);
    else if (width.value >= 1300)
        size = lerp(width.value, 1300, 1400, 2.86, 3.38);
    else if (width.value >= 1100)
        size = lerp(width.value, 1100, 1300, 2.54, 2.86);
    else
        size = lerp(width.value, 800, 1100, 2.2, 2.54);
    return { fontSize: size + 'rem' };
});
const heroSubtextStyle = computed(() => {
    let size = 1.18;
    if (width.value >= 1536)
        size = 1.18;
    else if (width.value >= 1400)
        size = lerp(width.value, 1400, 1536, 1.12, 1.18);
    else if (width.value >= 1300)
        size = lerp(width.value, 1300, 1400, 1.036, 1.12);
    else if (width.value >= 1100)
        size = lerp(width.value, 1100, 1300, 0.957, 1.036);
    else
        size = lerp(width.value, 800, 1100, 0.86, 0.957);
    return { fontSize: size + 'rem' };
});
const mainAspect = computed(() => width.value < 1100 ? '9/14' : '1/1');
const leftColRatio = computed(() => width.value >= 1300 ? 0.41 : 0.38);
const rightCol1 = computed(() => 0.62);
const rightCol2 = computed(() => 0.38);
const topRowRatio = computed(() => width.value >= 1300 ? 0.6 : 0.56);
const bottomRowRatio = computed(() => width.value >= 1300 ? 0.4 : 0.44);
const playingCardAspect = computed(() => width.value < 1100 ? '90/148' : '280/441');
const cubeSize = computed(() => {
    if (width.value >= 1536)
        return 60;
    if (width.value >= 1400)
        return lerp(width.value, 1400, 1536, 50, 60);
    if (width.value >= 1300)
        return lerp(width.value, 1300, 1400, 44, 50);
    if (width.value >= 1100)
        return lerp(width.value, 1100, 1300, 36, 44);
    return 36;
});
const cubeScale = computed(() => {
    if (width.value >= 1400)
        return 1.5;
    if (width.value >= 1300)
        return lerp(width.value, 1300, 1400, 1.32, 1.5);
    if (width.value >= 1100)
        return lerp(width.value, 1100, 1300, 1.24, 1.32);
    return 1.24;
});
// Tooltip container height: 164px @ 1536px+, 146px @ 1280px, linear in between
const tooltipContainerHeight = computed(() => {
    if (width.value >= 1536)
        return 163;
    if (width.value <= 1280)
        return 146;
    return lerp(width.value, 1280, 1536, 146, 163);
});
const hoveredAvatars = ref([]);
const showTooltipTip = ref(true);
const tooltipTipOpacity = ref(1);
const tooltipTipFontSize = computed(() => (width.value >= 1100 ? '1.07rem' : '1rem'));
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
onMounted(() => {
    startOscillation();
});
onBeforeUnmount(() => {
    if (animationFrame)
        cancelAnimationFrame(animationFrame);
    if (timeoutId)
        clearTimeout(timeoutId);
    if (tipTimeout)
        clearTimeout(tipTimeout);
});
const rootStyle = computed(() => ({
    flexDirection: isMobile.value ? 'column' : 'row',
    gap: isMobile.value ? '0' : '32px',
    width: '100%',
    marginTop: '40px'
}));
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
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "home-root" },
    ...{ style: (__VLS_ctx.rootStyle) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hero-section" },
    ...{ style: (__VLS_ctx.heroSectionStyle) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hero-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "hero-title" },
    ...{ style: (__VLS_ctx.heroTitleStyle) },
});
/** @type {[typeof MagicText, typeof MagicText, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(MagicText, new MagicText({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_2.slots.default;
var __VLS_2;
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "hero-subtext" },
    ...{ style: (__VLS_ctx.heroSubtextStyle) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hero-buttons" },
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
if (!__VLS_ctx.isMobile) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "grid-section" },
    });
    /** @type {[typeof BentoGrid, typeof BentoGrid, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(BentoGrid, new BentoGrid({
        ...{ 'onCellClick': {} },
        mainAspect: (__VLS_ctx.mainAspect),
        leftColRatio: (__VLS_ctx.leftColRatio),
        rightCol1: (__VLS_ctx.rightCol1),
        rightCol2: (__VLS_ctx.rightCol2),
        topRowRatio: (__VLS_ctx.topRowRatio),
        bottomRowRatio: (__VLS_ctx.bottomRowRatio),
        gap: "20px",
        gridHeight: "100%",
        cellBackground: "#17161c",
        cellBorderColor: "#33313d",
        cellBorderRadius: "24px",
        cellBorderWidth: "1px",
        cellPadding: "24px",
    }));
    const __VLS_14 = __VLS_13({
        ...{ 'onCellClick': {} },
        mainAspect: (__VLS_ctx.mainAspect),
        leftColRatio: (__VLS_ctx.leftColRatio),
        rightCol1: (__VLS_ctx.rightCol1),
        rightCol2: (__VLS_ctx.rightCol2),
        topRowRatio: (__VLS_ctx.topRowRatio),
        bottomRowRatio: (__VLS_ctx.bottomRowRatio),
        gap: "20px",
        gridHeight: "100%",
        cellBackground: "#17161c",
        cellBorderColor: "#33313d",
        cellBorderRadius: "24px",
        cellBorderWidth: "1px",
        cellPadding: "24px",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    let __VLS_16;
    let __VLS_17;
    let __VLS_18;
    const __VLS_19 = {
        onCellClick: (__VLS_ctx.handleCellClick)
    };
    __VLS_15.slots.default;
    {
        const { main: __VLS_thisSlot } = __VLS_15.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ style: {} },
        });
        /** @type {[typeof PlayingCard, ]} */ ;
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent(PlayingCard, new PlayingCard({
            componentWidth: "412px",
            aspectRatio: (__VLS_ctx.playingCardAspect),
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
            ...{ style: {} },
        }));
        const __VLS_21 = __VLS_20({
            componentWidth: "412px",
            aspectRatio: (__VLS_ctx.playingCardAspect),
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
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_20));
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
        const __VLS_23 = __VLS_asFunctionalComponent(ShamayimToggleSwitch, new ShamayimToggleSwitch({
            defaultState: (false),
            onChange: (__VLS_ctx.onShamayimSwitch),
        }));
        const __VLS_24 = __VLS_23({
            defaultState: (false),
            onChange: (__VLS_ctx.onShamayimSwitch),
        }, ...__VLS_functionalComponentArgsRest(__VLS_23));
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
        const __VLS_26 = __VLS_asFunctionalComponent(AnimatedCube, new AnimatedCube({
            size: (__VLS_ctx.cubeSize),
            scale: (__VLS_ctx.cubeScale),
            faceColor: "#7dd3fc",
            shadowColor: "#0e7490",
            borderColor: "#0ea5e9",
            animationDuration: (3.12),
        }));
        const __VLS_27 = __VLS_26({
            size: (__VLS_ctx.cubeSize),
            scale: (__VLS_ctx.cubeScale),
            faceColor: "#7dd3fc",
            shadowColor: "#0e7490",
            borderColor: "#0ea5e9",
            animationDuration: (3.12),
        }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    }
    {
        const { bottom: __VLS_thisSlot } = __VLS_15.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "tooltip-container" },
            ...{ style: ({
                    width: '100%',
                    height: __VLS_ctx.tooltipContainerHeight + 'px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'visible'
                }) },
        });
        const __VLS_29 = {}.transition;
        /** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
        // @ts-ignore
        const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
            name: "tooltip-fade",
        }));
        const __VLS_31 = __VLS_30({
            name: "tooltip-fade",
        }, ...__VLS_functionalComponentArgsRest(__VLS_30));
        __VLS_32.slots.default;
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
        var __VLS_32;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: (__VLS_ctx.goToAnimatedTooltip) },
            ...{ style: {} },
            ...{ class: "tooltip-demo-clickable" },
        });
        /** @type {[typeof AnimatedTooltip, ]} */ ;
        // @ts-ignore
        const __VLS_33 = __VLS_asFunctionalComponent(AnimatedTooltip, new AnimatedTooltip({
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
        const __VLS_34 = __VLS_33({
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
        }, ...__VLS_functionalComponentArgsRest(__VLS_33));
        let __VLS_36;
        let __VLS_37;
        let __VLS_38;
        const __VLS_39 = {
            onTooltipClick: (__VLS_ctx.goToAnimatedTooltip)
        };
        const __VLS_40 = {
            onAvatarHover: (__VLS_ctx.onAvatarHover)
        };
        const __VLS_41 = {
            onAvatarUnhover: (__VLS_ctx.onAvatarUnhover)
        };
        var __VLS_35;
    }
    var __VLS_15;
}
/** @type {__VLS_StyleScopedClasses['home-root']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-section']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
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
            goToPlayingCard: goToPlayingCard,
            goToAnimatedTooltip: goToAnimatedTooltip,
            onShamayimSwitch: onShamayimSwitch,
            handleCellClick: handleCellClick,
            onGetStartedClick: onGetStartedClick,
            hoveredButton: hoveredButton,
            isMobile: isMobile,
            heroSectionStyle: heroSectionStyle,
            heroTitleStyle: heroTitleStyle,
            heroSubtextStyle: heroSubtextStyle,
            mainAspect: mainAspect,
            leftColRatio: leftColRatio,
            rightCol1: rightCol1,
            rightCol2: rightCol2,
            topRowRatio: topRowRatio,
            bottomRowRatio: bottomRowRatio,
            playingCardAspect: playingCardAspect,
            cubeSize: cubeSize,
            cubeScale: cubeScale,
            tooltipContainerHeight: tooltipContainerHeight,
            showTooltipTip: showTooltipTip,
            tooltipTipOpacity: tooltipTipOpacity,
            tooltipTipFontSize: tooltipTipFontSize,
            onAvatarHover: onAvatarHover,
            onAvatarUnhover: onAvatarUnhover,
            animatedOutlineColor: animatedOutlineColor,
            rootStyle: rootStyle,
            items: items,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=desktop-hero.vue.js.map