import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import ProjectShowcase from '../components/namer-ui/project-showcase/ProjectShowcase.vue';
const testimonialsLTR = [
    {
        name: "Plum Cave",
        quote: 'A cloud backup solution that employs the "ChaCha20 + Serpent-256 CBC + HMAC-SHA3-512" authenticated encryption scheme for data encryption and ML-KEM-1024 for quantum-resistant key exchange.',
        designation: "Next.js Project",
        src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/plum-cave.webp",
        link: "https://plum-cave.netlify.app/",
    },
    {
        name: "Namer UI",
        quote: "A comprehensive collection of modern, attractive, and unique reusable TypeScript components crafted specifically for Next.js.",
        designation: "Next.js Project",
        src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/namer-ui.webp",
        link: "https://namer-ui.netlify.app/",
    },
    {
        name: "React Cryptographic Toolkit",
        quote: "A web app that’s capable of encrypting user data, hashing strings, and calculating tags using the available HMAC algorithms. Please don’t judge me too harshly for it; this is the first React app I ever made.",
        designation: "React Project",
        src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/rct.webp",
        link: "https://northstrix.github.io/React-Cryptographic-Toolkit/",
    },
    {
        name: "PHA5E-Inspired Hero Section",
        quote: "An unorthodox, customizable component. I put it here just to demonstrate that I'm capable of creating an Angular app.",
        designation: "Angular Project",
        src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/pha5e-inspired-hero-section.webp",
        link: "https://pha5e-inspired-hero-section.netlify.app/",
    },
    {
        name: "Bootleg Website Localization Tool",
        quote: "A simple tool designed to localize websites created with the Bazium website builder, as well as their vanilla HTML/CSS/JS counterparts.",
        designation: "Vanilla HTML/CSS/JS Project",
        src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/bwlt.webp",
        link: "https://codepen.io/Northstrix/full/mydWRJB",
    },
    {
        name: "In-Browser-File-Encrypter",
        quote: "A browser-based tool that encrypts files locally without interacting with the server. It uses AES-256 for data encryption and HMAC-SHA512 for integrity verification.",
        designation: "Vanilla HTML/CSS/JS Project",
        src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/in-browser-file-encrypter.webp",
        link: "https://codepen.io/Northstrix/full/xxvXvJL",
    },
];
const testimonialsRTL = [
    {
        name: "פלאם קייב",
        quote: 'פתרון גיבוי בענן המשתמש בסכימת הצפנה מאומתת "HMAC-SHA3-512 + CBC Serpent-256 + ChaCha20" להצפנת נתונים ו-ML-KEM-1024 לחילופי מפתחות עמידים לקוונטים.',
        designation: "פרויקט Next.js",
        src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/plum-cave-hebrew.webp",
        link: "https://plum-cave.netlify.app/",
    },
    {
        name: "נמר UI",
        quote: "אוסף מקיף של רכיבי TypeScript מודרניים, אטרקטיביים וייחודיים לשימוש חוזר המיועדים במיוחד ל-Next.js.",
        designation: "פרויקט Next.js",
        src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/namer-ui.webp",
        link: "https://namer-ui.netlify.app/",
    },
    {
        name: "React קריפטוגרפיק טולקיט",
        quote: "אפליקציית אינטרנט המסוגלת להצפין נתוני משתמש, לבצע האש של מחרוזות ולחשב תגיות באמצעות אלגוריתמי HMAC הזמינים. אל תשפטו אותי בחומרה - זוהי האפליקציה הראשונה שיצרתי ב-React.",
        designation: "פרויקט React",
        src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/rct.webp",
        link: "https://northstrix.github.io/React-Cryptographic-Toolkit/",
    },
    {
        name: "מקטע גיבור בהשראת PHA5E",
        quote: "רכיב לא שגרתי וניתן להתאמה אישית. הוספתי אותו כאן כדי להדגים שאני מסוגל ליצור אפליקציית Angular.",
        designation: "פרויקט Angular",
        src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/pha5e-inspired-hero-section.webp",
        link: "https://pha5e-inspired-hero-section.netlify.app/",
    },
    {
        name: "בוטלג וובסייט לוקליזיישן טול",
        quote: "כלי פשוט שנועד לבצע לוקליזציה לאתרים שנוצרו עם בוני האתרים Bazium, כמו גם לגרסאות ה-vanilla HTML/CSS/JS שלהם.",
        designation: "פרויקט HTML/CSS/JS וונילה",
        src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/bwlt.webp",
        link: "https://codepen.io/Northstrix/full/mydWRJB",
    },
    {
        name: "מצפין קבצים בדפדפן",
        quote: "כלי מבוסס דפדפן המבצע הצפנת קבצים מקומית ללא אינטראקציה עם השרת. משתמש ב-AES-256 להצפנת נתונים וב-HMAC-SHA512 לאימות שלמות.",
        designation: "פרויקט HTML/CSS/JS וונילה",
        src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/in-browser-file-encrypter.webp",
        link: "https://codepen.io/Northstrix/full/xxvXvJL",
    },
];
// Only show both showcases and label if window.innerWidth >= 1194px
const showShowcases = ref(false);
function updateShowcasesVisibility() {
    if (typeof window !== 'undefined') {
        showShowcases.value = window.innerWidth >= 1194;
    }
}
onMounted(() => {
    updateShowcasesVisibility();
    window.addEventListener('resize', updateShowcasesVisibility);
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', updateShowcasesVisibility);
});
const router = useRouter();
function goToShowcase() {
    router.push('/components/project-showcase');
}
function handleItemClick(link) {
    window.open(link, '_blank');
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['showcase-demo-section']} */ ;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.showShowcases) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "showcase-demo-stack" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "showcase-demo-section" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "showcase-demo-inner" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (__VLS_ctx.goToShowcase) },
        ...{ class: "showcase-label" },
    });
    /** @type {[typeof ProjectShowcase, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(ProjectShowcase, new ProjectShowcase({
        testimonials: (__VLS_ctx.testimonialsLTR),
        autoplay: (false),
        colors: ({ name: '#fff', position: '#999', testimony: '#ccc' }),
        fontSizes: ({ name: '28px', position: '20px', testimony: '20px' }),
        spacing: ({ nameTop: '0', nameBottom: '10px', positionTop: '0', positionBottom: '0.5em', testimonyTop: '1.24em', testimonyBottom: '1em', lineHeight: '1.56' }),
        outerRounding: ('18.2px'),
        innerRounding: ('18px'),
        outlineColor: ('#33313d'),
        hoverOutlineColor: ('#403d4d'),
        halomotButtonGradient: "linear-gradient(to right, #a123f4, #603dec)",
        halomotButtonBackground: "#111014",
        halomotButtonTextColor: "#fff",
        halomotButtonOuterBorderRadius: "6.34px",
        halomotButtonInnerBorderRadius: "6px",
        halomotButtonHoverTextColor: "#fff",
        onItemClick: (__VLS_ctx.handleItemClick),
    }));
    const __VLS_1 = __VLS_0({
        testimonials: (__VLS_ctx.testimonialsLTR),
        autoplay: (false),
        colors: ({ name: '#fff', position: '#999', testimony: '#ccc' }),
        fontSizes: ({ name: '28px', position: '20px', testimony: '20px' }),
        spacing: ({ nameTop: '0', nameBottom: '10px', positionTop: '0', positionBottom: '0.5em', testimonyTop: '1.24em', testimonyBottom: '1em', lineHeight: '1.56' }),
        outerRounding: ('18.2px'),
        innerRounding: ('18px'),
        outlineColor: ('#33313d'),
        hoverOutlineColor: ('#403d4d'),
        halomotButtonGradient: "linear-gradient(to right, #a123f4, #603dec)",
        halomotButtonBackground: "#111014",
        halomotButtonTextColor: "#fff",
        halomotButtonOuterBorderRadius: "6.34px",
        halomotButtonInnerBorderRadius: "6px",
        halomotButtonHoverTextColor: "#fff",
        onItemClick: (__VLS_ctx.handleItemClick),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "showcase-demo-section light" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "showcase-demo-inner white-container" },
    });
    /** @type {[typeof ProjectShowcase, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(ProjectShowcase, new ProjectShowcase({
        testimonials: (__VLS_ctx.testimonialsRTL),
        autoplay: (false),
        colors: ({ name: '#0a0a0a', position: '#454545', testimony: '#171717' }),
        fontSizes: ({ name: '32px', position: '21px', testimony: '21px' }),
        spacing: ({ nameTop: '0', nameBottom: '12px', positionTop: '0', positionBottom: '0.5em', testimonyTop: '1.24em', testimonyBottom: '1em', lineHeight: '1.56' }),
        outerRounding: ('18.2px'),
        innerRounding: ('18px'),
        outlineColor: ('#33313d'),
        hoverOutlineColor: ('#4776cb'),
        buttonInscriptions: ({ previousButton: 'הקודם', nextButton: 'הבא', openWebAppButton: 'פתח אפליקציה' }),
        halomotButtonGradient: "linear-gradient(to right, #603dec, #a123f4)",
        halomotButtonBackground: "#f2f2fa",
        halomotButtonTextColor: "#111",
        halomotButtonOuterBorderRadius: "16.2px",
        halomotButtonInnerBorderRadius: "15px",
        halomotButtonHoverTextColor: "#fff",
        isRTL: (true),
        onItemClick: (__VLS_ctx.handleItemClick),
    }));
    const __VLS_4 = __VLS_3({
        testimonials: (__VLS_ctx.testimonialsRTL),
        autoplay: (false),
        colors: ({ name: '#0a0a0a', position: '#454545', testimony: '#171717' }),
        fontSizes: ({ name: '32px', position: '21px', testimony: '21px' }),
        spacing: ({ nameTop: '0', nameBottom: '12px', positionTop: '0', positionBottom: '0.5em', testimonyTop: '1.24em', testimonyBottom: '1em', lineHeight: '1.56' }),
        outerRounding: ('18.2px'),
        innerRounding: ('18px'),
        outlineColor: ('#33313d'),
        hoverOutlineColor: ('#4776cb'),
        buttonInscriptions: ({ previousButton: 'הקודם', nextButton: 'הבא', openWebAppButton: 'פתח אפליקציה' }),
        halomotButtonGradient: "linear-gradient(to right, #603dec, #a123f4)",
        halomotButtonBackground: "#f2f2fa",
        halomotButtonTextColor: "#111",
        halomotButtonOuterBorderRadius: "16.2px",
        halomotButtonInnerBorderRadius: "15px",
        halomotButtonHoverTextColor: "#fff",
        isRTL: (true),
        onItemClick: (__VLS_ctx.handleItemClick),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
}
/** @type {__VLS_StyleScopedClasses['showcase-demo-stack']} */ ;
/** @type {__VLS_StyleScopedClasses['showcase-demo-section']} */ ;
/** @type {__VLS_StyleScopedClasses['showcase-demo-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['showcase-label']} */ ;
/** @type {__VLS_StyleScopedClasses['showcase-demo-section']} */ ;
/** @type {__VLS_StyleScopedClasses['light']} */ ;
/** @type {__VLS_StyleScopedClasses['showcase-demo-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['white-container']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ProjectShowcase: ProjectShowcase,
            testimonialsLTR: testimonialsLTR,
            testimonialsRTL: testimonialsRTL,
            showShowcases: showShowcases,
            goToShowcase: goToShowcase,
            handleItemClick: handleItemClick,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=project-showcase.vue.js.map