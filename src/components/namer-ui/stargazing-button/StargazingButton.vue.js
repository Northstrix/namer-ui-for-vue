import { ref, onMounted, watch, computed, onUnmounted, nextTick } from 'vue';
import { Github, Star } from 'lucide-vue-next';
const props = withDefaults(defineProps(), {
    hue: 260,
    borderRadius: '5em',
    fontSize: '1.25rem',
    iconSize: 22,
    iconStrokeWidth: 2.2,
    iconGap: '0.08em',
    separatorMargin: '0 0.45em',
    separatorColor: '',
    separatorWidth: '2px',
    shadowColor: '',
    mobileFontSize: '1rem',
    mobileIconSize: 19,
    mobileIconStrokeWidth: 2,
    desktopThreshold: 600,
});
const over = ref(false);
const starCount = ref(null);
const animatedCount = ref(0);
let animationFrame = null;
const isMobile = ref(false);
function updateIsMobile() {
    isMobile.value = window.innerWidth < props.desktopThreshold;
}
onMounted(() => {
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    fetchStars();
    injectMediaQuery();
});
onUnmounted(() => {
    window.removeEventListener('resize', updateIsMobile);
});
watch(() => props.githubLink, fetchStars);
watch(() => props.desktopThreshold, injectMediaQuery);
function openGithub(e) {
    e.preventDefault();
    window.open(props.githubLink, '_blank', 'noopener');
}
function fetchStars() {
    starCount.value = null;
    try {
        const repoPath = new URL(props.githubLink).pathname.slice(1);
        fetch(`https://api.github.com/repos/${repoPath}`)
            .then(resp => resp.json())
            .then(data => {
            if (typeof data.stargazers_count === 'number') {
                starCount.value = data.stargazers_count;
                animateTo(data.stargazers_count);
            }
        }).catch(() => { });
    }
    catch (e) { }
}
function animateTo(target) {
    if (animationFrame)
        cancelAnimationFrame(animationFrame);
    const start = animatedCount.value;
    const duration = 1200;
    const startTime = performance.now();
    function step(now) {
        const t = Math.min((now - startTime) / duration, 1);
        const eased = t < 1 ? 1 - Math.pow(1 - t, 3) : 1;
        animatedCount.value = Math.round(start + (target - start) * eased);
        if (t < 1)
            animationFrame = requestAnimationFrame(step);
        else {
            animationFrame = null;
            setTimeout(() => {
                over.value = true;
                setTimeout(() => {
                    over.value = false;
                }, 2500);
            }, 2500);
        }
    }
    animationFrame = requestAnimationFrame(step);
}
// Dynamic styles
const buttonStyle = computed(() => ({
    '--clr': props.hue,
    borderRadius: props.borderRadius,
    fontSize: isMobile.value ? props.mobileFontSize : props.fontSize,
    width: 'auto',
}));
const spanStyle = computed(() => ({
    gap: props.iconGap,
}));
const separatorStyle = computed(() => ({
    margin: props.separatorMargin,
    borderLeft: `${props.separatorWidth} solid ${props.separatorColor || `hsl(${props.hue}, 100%, 85%)`}`,
    height: '1.2em',
    minWidth: props.separatorWidth,
    background: 'none',
}));
const iconSize = computed(() => isMobile.value ? props.mobileIconSize : props.iconSize);
const iconStrokeWidth = computed(() => isMobile.value ? props.mobileIconStrokeWidth : props.iconStrokeWidth);
const computedShadowColor = computed(() => props.shadowColor && props.shadowColor.trim() !== ''
    ? props.shadowColor
    : `hsla(${props.hue}, 25%, 12%)`);
// Dynamic media query injection for truly prop-driven mobile threshold
function injectMediaQuery() {
    nextTick(() => {
        const id = 'stargazing-btn-media';
        let styleTag = document.getElementById(id);
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = id;
            document.head.appendChild(styleTag);
        }
        styleTag.textContent = `
      @media (max-width: ${props.desktopThreshold}px) {
        .stargazing-shadow .sparkles .content {
          padding: 0.65em 1.1em !important;
          font-size: ${props.mobileFontSize} !important;
        }
      }
    `;
    });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    hue: 260,
    borderRadius: '5em',
    fontSize: '1.25rem',
    iconSize: 22,
    iconStrokeWidth: 2.2,
    iconGap: '0.08em',
    separatorMargin: '0 0.45em',
    separatorColor: '',
    separatorWidth: '2px',
    shadowColor: '',
    mobileFontSize: '1rem',
    mobileIconSize: 19,
    mobileIconStrokeWidth: 2,
    desktopThreshold: 600,
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['stargazing-shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['stargazing-shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['over']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['over']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['over']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['over']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['over']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
// CSS variable injection 
__VLS_ctx.iconGap;
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "stargazing-shadow" },
    ...{ class: ({ over: __VLS_ctx.over }) },
    ...{ style: ({
            borderRadius: props.borderRadius,
            '--clr': props.hue,
            '--shadow-color': __VLS_ctx.computedShadowColor,
        }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.openGithub) },
    ...{ class: "sparkles" },
    ...{ class: ({ over: __VLS_ctx.over }) },
    ...{ style: (__VLS_ctx.buttonStyle) },
    type: "button",
    tabindex: "0",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "content" },
    ...{ style: (__VLS_ctx.spanStyle) },
});
const __VLS_0 = {}.Github;
/** @type {[typeof __VLS_components.Github, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    size: (__VLS_ctx.iconSize),
    strokeWidth: (__VLS_ctx.iconStrokeWidth),
    ...{ style: {} },
}));
const __VLS_2 = __VLS_1({
    size: (__VLS_ctx.iconSize),
    strokeWidth: (__VLS_ctx.iconStrokeWidth),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "separator" },
    ...{ style: (__VLS_ctx.separatorStyle) },
});
const __VLS_4 = {}.Star;
/** @type {[typeof __VLS_components.Star, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    size: (__VLS_ctx.iconSize - 2),
    strokeWidth: (__VLS_ctx.iconStrokeWidth),
    ...{ style: {} },
}));
const __VLS_6 = __VLS_5({
    size: (__VLS_ctx.iconSize - 2),
    strokeWidth: (__VLS_ctx.iconStrokeWidth),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "star-count" },
    ...{ style: {} },
});
(__VLS_ctx.animatedCount !== null ? __VLS_ctx.animatedCount.toLocaleString() : '—');
/** @type {__VLS_StyleScopedClasses['stargazing-shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['over']} */ ;
/** @type {__VLS_StyleScopedClasses['sparkles']} */ ;
/** @type {__VLS_StyleScopedClasses['over']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['separator']} */ ;
/** @type {__VLS_StyleScopedClasses['star-count']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Github: Github,
            Star: Star,
            over: over,
            animatedCount: animatedCount,
            openGithub: openGithub,
            buttonStyle: buttonStyle,
            spanStyle: spanStyle,
            separatorStyle: separatorStyle,
            iconSize: iconSize,
            iconStrokeWidth: iconStrokeWidth,
            computedShadowColor: computedShadowColor,
        };
    },
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=StargazingButton.vue.js.map