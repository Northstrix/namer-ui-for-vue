<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import ProjectShowcase from '../components/namer-ui/project-showcase/ProjectShowcase.vue'

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
    name: "Namer UI For Vue",
    quote: "A collection of customizable, reusable TypeScript, vanilla CSS components for Vue 3.",
    designation: "Vue Project",
    src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/namer-ui-for-vue.webp",
    link: "https://namer-ui-for-vue.netlify.app/",
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
]

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
    name: "נמר UI ל-Vue",
    quote: "אוסף של רכיבי TypeScript ו-CSS ונילה, הניתנים להתאמה אישית ולשימוש חוזר עבור Vue 3.",
    designation: "פרויקט Vue",
    src: "https://raw.githubusercontent.com/Northstrix/my-portfolio/refs/heads/main/public/namer-ui-for-vue.webp",
    link: "https://namer-ui-for-vue.netlify.app/",
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
]

// Only show both showcases and label if window.innerWidth >= 1194px
const showShowcases = ref(false)
function updateShowcasesVisibility() {
  if (typeof window !== 'undefined') {
    showShowcases.value = window.innerWidth >= 1194
  }
}

const router = useRouter()
function goToShowcase() {
  router.push('/components/project-showcase')
}
function handleItemClick(link: string) {
  window.open(link, '_blank');
}

// --- IMAGE PRELOADING LOGIC ---
function preloadImages(urls: string[]) {
  urls.forEach(url => {
    const img = new window.Image();
    img.src = url;
  });
}
const allImageUrls = [
  ...testimonialsLTR.map(t => t.src),
  ...testimonialsRTL.map(t => t.src)
];

onMounted(() => {
  updateShowcasesVisibility();
  window.addEventListener('resize', updateShowcasesVisibility);

  // Preload all images for caching
  preloadImages(allImageUrls);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateShowcasesVisibility)
})
</script>

<template>
  <div class="showcase-demo-stack" v-if="showShowcases">
    <!-- Top container: label and ProjectShowcase -->
    <div class="showcase-demo-section">
      <div class="showcase-demo-inner">
        <div class="showcase-label" @click="goToShowcase">
          Project Showcase:
        </div>
        <ProjectShowcase
          :testimonials="testimonialsLTR"
          :autoplay="false"
          :colors="{ name: '#fff', position: '#999', testimony: '#ccc' }"
          :fontSizes="{ name: '28px', position: '20px', testimony: '20px' }"
          :spacing="{ nameTop: '0', nameBottom: '10px', positionTop: '0', positionBottom: '0.5em', testimonyTop: '1.24em', testimonyBottom: '1em', lineHeight: '1.56' }"
          :outerRounding="'18.2px'"
          :innerRounding="'18px'"
          :outlineColor="'#33313d'"
          :hoverOutlineColor="'#403d4d'"
          halomotButtonGradient="linear-gradient(to right, #a123f4, #603dec)"
          halomotButtonBackground="#111014"
          halomotButtonTextColor="#fff"
          halomotButtonOuterBorderRadius="6.34px"
          halomotButtonInnerBorderRadius="6px"
          halomotButtonHoverTextColor="#fff"
          :onItemClick="handleItemClick"
        />
      </div>
    </div>
    <!-- Bottom container: light background, white box with 12px rounding and 32px padding -->
    <div class="showcase-demo-section light">
      <div class="showcase-demo-inner white-container">
        <ProjectShowcase
          :testimonials="testimonialsRTL"
          :autoplay="false"
          :colors="{ name: '#0a0a0a', position: '#454545', testimony: '#171717' }"
          :fontSizes="{ name: '32px', position: '21px', testimony: '21px' }"
          :spacing="{ nameTop: '0', nameBottom: '12px', positionTop: '0', positionBottom: '0.5em', testimonyTop: '1.24em', testimonyBottom: '1em', lineHeight: '1.56' }"
          :outerRounding="'18.2px'"
          :innerRounding="'18px'"
          :outlineColor="'#33313d'"
          :hoverOutlineColor="'#4776cb'"
          :buttonInscriptions="{ previousButton: 'הקודם', nextButton: 'הבא', openWebAppButton: 'פתח אפליקציה' }"
          halomotButtonGradient="linear-gradient(to right, #603dec, #a123f4)"
          halomotButtonBackground="#f2f2fa"
          halomotButtonTextColor="#111"
          halomotButtonOuterBorderRadius="16.2px"
          halomotButtonInnerBorderRadius="15px"
          halomotButtonHoverTextColor="#fff"
          :isRTL="true"
          :onItemClick="handleItemClick"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.showcase-demo-stack {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
}
.showcase-demo-section {
  width: 100%;
  padding: 5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
}
.showcase-demo-section.light {
  background: #f7f7ff;
  border-radius: 12px;
}
.showcase-demo-inner {
  width: 100%;
  margin: 0 auto;
}
.white-container {
  background: #f7f7ff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.04);
}
.showcase-label {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #fff;
  letter-spacing: 0.03em;
  text-align: left;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.18s;
}
</style>