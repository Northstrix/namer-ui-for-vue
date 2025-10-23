<script setup lang="ts">
import SubmitCard from './SubmitCard.vue'

// Dark theme props
const darkThemeProps = {
  backgroundColor: '#0a0a0a',
  borderColor: '#262626',
  innerAreaBorderColor: '#262626',
  innerAreaBgColor: '#111',
  squareBgColor: '#fff',
  plusIconColor: '#00a7fa',
  textColorTitle: '#fff',
  textColorDescription: '#aaa',
}

// Light theme props
const lightThemeProps = {
  backgroundColor: '#f9f9f9',
  borderColor: '#ccc',
  innerAreaBorderColor: '#d5d5d5',
  innerAreaBgColor: '#e1e1e1',
  squareBgColor: '#222',
  plusIconColor: '#d500ff',
  textColorTitle: '#222',
  textColorDescription: '#555',
}
</script>

<template>
  <div
    style="
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 16px;
      width: 100%;
      margin: auto;
      box-sizing: border-box;
    "
  >
    <!-- First Card -->
    <SubmitCard
      link="https://blueberry-loom-form-loader.netlify.app/form/bWF4aW0uYm9ydC5kZXZlbEBnbWFpbC5jb20=/Far247Squ6?key=Im5uylqLi3BwlN909sLP1Y3vY6nRwMixa8D6BGpj6Uz5B4b9OO)YZSyKWvCGeX65a6Yfsc2ZdUAEWrue3FXDDg=="
      title="Submit Your Project"
      description="Made a project that uses at least one Namer UI component? Submit it now for a chance to get featured!"
      :backgroundColor="darkThemeProps.backgroundColor"
      :cardBorderColor="darkThemeProps.borderColor"
      :innerAreaBorderColor="darkThemeProps.innerAreaBorderColor"
      :innerAreaBgColor="darkThemeProps.innerAreaBgColor"
      :squareBgColor="darkThemeProps.squareBgColor"
      :plusIconColor="darkThemeProps.plusIconColor"
      :textColorTitle="darkThemeProps.textColorTitle"
      :textColorDescription="darkThemeProps.textColorDescription"
      :isRTL="false"
    />

    <!-- Second Card (Hebrew RTL) -->
    <SubmitCard
      link="https://blueberry-loom-form-loader.netlify.app/form/bWF4aW0uYm9ydC5kZXZlbEBnbWFpbC5jb20=/Far247Squ6?key=Im5uylqLi3BwlN909sLP1Y3vY6nRwMixa8D6BGpj6Uz5B4b9OO)YZSyKWvCGeX65a6Yfsc2ZdUAEWrue3FXDDg=="
      title="שלח את הפרויקט שלך"
      description="יצרת פרויקט המשתמש בלפחות רכיב אחד של נמר UI? שלח אותו עכשיו כדי לקבל הזדמנות להופיע!"
      :backgroundColor="lightThemeProps.backgroundColor"
      :cardBorderColor="lightThemeProps.borderColor"
      :innerAreaBorderColor="lightThemeProps.innerAreaBorderColor"
      :innerAreaBgColor="lightThemeProps.innerAreaBgColor"
      :squareBgColor="lightThemeProps.squareBgColor"
      :plusIconColor="lightThemeProps.plusIconColor"
      :textColorTitle="lightThemeProps.textColorTitle"
      :textColorDescription="lightThemeProps.textColorDescription"
      :isRTL="true"
    />

    <!-- Third Card with image -->
    <SubmitCard
      link="https://clandestine-beauty-salon-landing-page.netlify.app/"
      title="Clandestine"
      description="A modern beauty salon landing page template featuring an appointment reservation UI and multilingual support."
      imageSrc="https://github.com/Northstrix/namer-ui/blob/main/public/showcase/clandestine.webp?raw=true"
      :backgroundColor="darkThemeProps.backgroundColor"
      :cardBorderColor="darkThemeProps.borderColor"
      :innerAreaBorderColor="darkThemeProps.innerAreaBorderColor"
      :innerAreaBgColor="darkThemeProps.innerAreaBgColor"
      :squareBgColor="darkThemeProps.squareBgColor"
      :plusIconColor="darkThemeProps.plusIconColor"
      :textColorTitle="darkThemeProps.textColorTitle"
      :textColorDescription="darkThemeProps.textColorDescription"
      :imageSrc="placeholderImage"
      :isRTL="false"
    />
  </div>
</template>
