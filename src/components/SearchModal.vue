<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="show" class="search-modal-overlay" @click.self="close">
        <div class="search-modal-content" :style="modalStyle">
          <div class="search-modal-header">
            <div class="search-input-wrapper">
              <Search :size="20" class="search-input-icon" />
              <input
                v-model="query"
                ref="searchInput"
                class="search-modal-input"
                :style="inputStyle"
                placeholder="Search components..."
                @keydown.esc="close"
              />
            </div>
          </div>
          <div class="search-modal-results">
            <div
              v-for="comp in filtered"
              :key="comp.route"
              class="search-modal-result"
              @click="goTo(comp.route)"
            >
              <span>{{ comp.name }}</span>
              <span class="search-modal-desc">{{ comp.description }}</span>
            </div>
            <div v-if="filtered.length === 0" class="search-modal-noresult">
              No components found.
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from 'lucide-vue-next'
import { componentMeta } from '../data/componentMeta'

const props = defineProps<{ show: boolean; outlineColor?: string }>()
const emit = defineEmits(['close'])

const query = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const router = useRouter()

const filtered = computed(() =>
  componentMeta.filter(c =>
    c.name.toLowerCase().includes(query.value.toLowerCase()) ||
    c.description.toLowerCase().includes(query.value.toLowerCase())
  )
)

function close() {
  emit('close')
  query.value = ''
}
function goTo(route: string) {
  close()
  router.push(`/components/${route}`)
}

watch(() => props.show, val => {
  if (val) nextTick(() => searchInput.value?.focus())
})

const modalStyle = computed(() => ({
  background: '#17161c',
  outline: `1px solid ${props.outlineColor || '#403d4d'}`,
  borderRadius: '16px',
  boxShadow: 'none',
}))

const inputStyle = computed(() => ({
  outline: `1px solid ${props.outlineColor || '#403d4d'}`,
  borderRadius: '8px',
  paddingLeft: '38px', // leave space for icon
}))
</script>

<style scoped>
.search-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
  background: rgba(21, 20, 25, 0.7);
  backdrop-filter: blur(4px) saturate(90%);
}

.search-modal-content {
  width: 100%;
  max-width: 480px;
  padding: 32px 24px 18px 24px;
  color: #f4f4f5;
  margin: 10px;
}

.search-modal-header {
  margin-bottom: 18px;
}

.search-input-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.search-input-icon {
  position: absolute;
  left: 11px;
  top: 50%;
  transform: translateY(-50%);
  color: #a1a1aa;
  pointer-events: none;
}

.search-modal-input {
  width: 100%;
  background: #201e26;
  border: none;
  outline: 1px solid #403d4d;
  color: #f4f4f5;
  font-size: 1.2rem;
  padding: 10px 12px;
  padding-left: 38px; /* space for icon */
  border-radius: 8px;
  box-sizing: border-box;
}

.search-modal-results {
  max-height: 424px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.search-modal-result {
  padding: 10px;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: background 0.15s;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.search-modal-result:hover {
  background: #33313d;
}
.search-modal-desc {
  color: #a1a1aa;
  font-size: 0.97em;
}
.search-modal-noresult {
  color: #a1a1aa;
  text-align: center;
  padding: 18px 0 10px 0;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
