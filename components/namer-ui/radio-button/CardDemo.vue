<template>
  <div 
    style="width: 100%; height: 100%; background: #fff; display: flex; justify-content: center; align-items: center;"
  >
    <div style="display: flex; justify-content: center; align-items: center;">
      <div class="tab-switcher-demo">
        <div class="tab-switcher-container">
          <RadioButtonDemo
            v-model="activeTab"
            :options="tabOptions"
            :active-bg="activeBg"
            :active-fg="activeFg"
            :inactive-bg="inactiveBg"
            :inactive-fg="inactiveFg"
            :hover-bg="hoverBg"
          />
          <div class="tab-switcher-content">
            <template v-if="activeTab === 'home'">
              <h3>Active tab: Home</h3>
            </template>
            <template v-else-if="activeTab === 'stars'">
              <h3>Active tab: Stars</h3>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Home, Star } from 'lucide-vue-next'
import RadioButtonDemo from './RadioButton.vue'

const activeTab = ref('home')
const tabOptions = [
  { value: 'home', label: 'Home', icon: Home },
  { value: 'stars', label: 'Stars', icon: Star },
]

const activeBg = '#A020F0'
const activeFg = '#fff'
const inactiveBg = '#4a4a4a'
const inactiveFg = '#fff'
const hoverBg = '#060507'
</script>

<style scoped>
.tab-switcher-demo {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;    /* Center horizontally */
  justify-content: center;/* Center vertically (optional, if you want vertical centering) */
  gap: 14px;
}

.tab-switcher-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5em;
}

.tab-switcher-container > * {
  width: 100%;
}

.tab-switcher-content {
  background: #eee;
  border-radius: 10px;
  border: 1.5px solid #ddd;
  padding: 0px 24px;
  min-height: 20px;
  color: #16151a;
  font-size: 0.75rem;
  box-sizing: border-box;
}
</style>
