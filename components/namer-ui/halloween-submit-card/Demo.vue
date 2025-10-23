<script setup lang="ts">
import HalloweenSubmitCard from './HalloweenSubmitCard.vue'
</script>

<template>
  <div class="demo-container">
    <!-- 1. LTR — Default Theme -->
    <div class="demo-item">
      <HalloweenSubmitCard
        link="https://blueberry-loom-form-loader.netlify.app/form/bWF4aW0uYm9ydC5kZXZlbEBnbWFpbC5jb20=/Far247Squ6?key=Im5uylqLi3BwlN909sLP1Y3vY6nRwMixa8D6BGpj6Uz5B4b9OO)YZSyKWvCGeX65a6Yfsc2ZdUAEWrue3FXDDg=="
        title="Submit Your Project"
        description="Made a project that uses at least one Namer UI component? Submit it now for a chance to get featured!"
        useDrawIcon
        :isRTL="false"
      />
    </div>

    <!-- 2. RTL — Deep Purple Theme -->
    <div class="demo-item">
      <HalloweenSubmitCard
        link="https://blueberry-loom-form-loader.netlify.app/form/bWF4aW0uYm9ydC5kZXZlbEBnbWFpbC5jb20=/Far247Squ6?key=Im5uylqLi3BwlN909sLP1Y3vY6nRwMixa8D6BGpj6Uz5B4b9OO)YZSyKWvCGeX65a6Yfsc2ZdUAEWrue3FXDDg=="
        title="שלח את הפרויקט שלך"
        description="יצרת פרויקט המשתמש בלפחות רכיב אחד של נמר UI? שלח אותו עכשיו כדי לקבל הזדמנות להופיע!"
        accent="#a800ff"
        accentAdjacentColor="#5c00b3"
        accentGlow="rgba(160, 0, 255, 0.85)"
        secondInteractiveColor="#3c005c"
        cardBg="#0a0010"
        innerBg="#190028"
        textColorTitle="#f4e9ff"
        textColorDescription="#c8a2ff"
        :isRTL="true"
        useDrawIcon
        :initialRotation="3.7"
        innerBorderColor="rgba(160, 0, 255, 0.55)"
        bodyGlow="rgba(160, 0, 255, 0.35)"
        squareBgColor="#f4e9ff"
        squareGlow="rgba(160, 0, 255, 0.45)"
      />
    </div>

    <!-- 3. LTR — Blue Light Theme Variant -->
    <div class="demo-item">
      <HalloweenSubmitCard
        link="https://blueberry-loom-form-loader.netlify.app/form/bWF4aW0uYm9ydC5kZXZlbEBnbWFpbC5jb20=/Far247Squ6?key=Im5uylqLi3BwlN909sLP1Y3vY6nRwMixa8D6BGpj6Uz5B4b9OO)YZSyKWvCGeX65a6Yfsc2ZdUAEWrue3FXDDg=="
        title="Envía tu proyecto"
        description="¿Has creado un proyecto que utilice al menos un componente de Namer UI? ¡Envíalo ahora para tener la oportunidad de ser destacado!"
        accent="#00A7FA"
        accentAdjacentColor="#0091E2"
        accentGlow="rgba(0, 167, 250, 0.85)"
        secondInteractiveColor="#66C9FF"
        cardBg="#E1F3FF"
        innerBg="#F4FAFF"
        innerBorderColor="rgba(0, 167, 250, 0.4)"
        textColorTitle="#0C2E4A"
        textColorDescription="#1172A5"
        bodyGlow="rgba(0, 167, 250, 0.25)"
        squareGlow="rgba(0, 140, 230, 0.4)"
        squareBgColor="#001B3C"
        :isRTL="false"
        :centerText="true"
        :enableGlow="true"
        :initialRotation="2.8"
      />
    </div>

    <!-- 4. LTR — Image Card Default Theme -->
    <div class="demo-item">
      <HalloweenSubmitCard
        link="https://clandestine-beauty-salon-landing-page.netlify.app/"
        title="Clandestine"
        description="A modern beauty salon landing page template featuring an appointment reservation UI and multilingual support."
        imageSrc="https://github.com/Northstrix/namer-ui/blob/main/public/showcase/clandestine.webp?raw=true"
        :enableGlow="true"
        innerBg="#000"
        :isRTL="false"
        :initialRotation="1.8"
      />
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 54px;
  width: 100%;
  box-sizing: border-box;
  padding: 32px;
}

.demo-item {
  max-width: 376px;
  flex: 1 1 320px;
  display: flex;
  justify-content: center;
}
</style>
