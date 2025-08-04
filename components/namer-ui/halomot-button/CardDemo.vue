<template>
  <div 
    style="width: 100%; height: 100%; background: #fff; display: flex; justify-content: center; align-items: center;"
  >
    <div style="display: flex; justify-content: center; align-items: center;">
      <HalomotButton
        inscription="GitHub"
        :icon="GithubIcon"
        :onClick="handleGithubClick"
        gradient="linear-gradient(135deg, #a123f4, #603dec)"
        borderWidth="3px"
        outerBorderRadius="8px"
        innerBorderRadius="5.4px"
        href="https://github.com/Northstrix"
        textColor="#16151a"
        hoverTextColor="#fff"
        padding="1rem 2.4rem"
        backgroundColor="#eee"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import HalomotButton from './HalomotButton.vue'
import { Github } from 'lucide-vue-next'

// Removed Swal import and usage as requested

const GithubIcon = Github

// Instead of SweetAlert toast, just use a simple console log or alternative notification here
function handleGithubClick() {
}
</script>