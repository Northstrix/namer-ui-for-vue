<template>
  <div class="explore-projects-btn-wrapper">
    <ChronicleButton
      :text="`Explore ${projectCount} components`"
      :borderRadius="'8px'"
      @click="goToComponents"
      width="256px"
      fontSize="0.975rem"
      padding="0.95rem 0.1rem"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ChronicleButton from '../components/namer-ui/chronicle-button/ChronicleButton.vue'
import { componentMeta } from '../data/componentMeta'

const projectCount = computed(() => componentMeta.length)

const router = useRouter()
function goToComponents() {
  router.push('/components')
}
</script>

<style scoped>
.explore-projects-btn-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 3.5rem 0 2rem 0;
}
</style>
