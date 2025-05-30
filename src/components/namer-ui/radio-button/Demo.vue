<template>
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
          <h3>Home Tab</h3>
        </template>
        <template v-else-if="activeTab === 'settings'">
          <h3>Settings Tab</h3>
        </template>
        <template v-else-if="activeTab === 'about'">
          <h3>About Tab</h3>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Home, Settings, Info } from 'lucide-vue-next'
import RadioButtonDemo from './RadioButton.vue'

const activeTab = ref('home')
const tabOptions = [
  { value: 'home', label: 'Home', icon: Home },
  { value: 'settings', label: 'Settings', icon: Settings },
  { value: 'about', label: 'About', icon: Info },
]

const activeBg = '#f7f7fa'
const activeFg = '#24222b'
const inactiveBg = '#24222b'
const inactiveFg = '#f7f7fa'
const hoverBg = '#4776cb'
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
  background: #17161c;
  border-radius: 10px;
  border: 1.5px solid #312f3b;
  padding: 0px 24px;
  min-height: 20px;
  color: #fff;
  font-size: 0.75rem;
  box-sizing: border-box;
}
</style>
