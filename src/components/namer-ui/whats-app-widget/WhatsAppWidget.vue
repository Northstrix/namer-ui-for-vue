<template>
  <div>
    <!-- Floating WhatsApp Icon -->
    <div class="wa-chat-icon" v-if="!isOpen" @click="toggleChat">
      <IconBrandWhatsapp :size="35" color="#ffffff" />
    </div>

    <!-- Chat Widget -->
    <div
      class="wa-chat-container"
      v-if="isOpen"
      :style="{ borderRadius: widgetRounding }"
    >
      <!-- Header -->
      <div
        class="wa-chat-header"
        :style="{
          background: containerHeaderBackground,
          borderRadius: `${widgetRounding} ${widgetRounding} 0 0`
        }"
      >
        <div class="wa-avatar-container">
          <img :src="photo" alt="Avatar" class="wa-avatar" />
          <span class="wa-online-dot"></span>
        </div>
        <div class="wa-header-info">
          <span class="wa-name" :style="{ color: nameTextColor, transform: 'translateY(-1px)' }">{{ name }}</span>
          <span class="wa-status" :style="{ color: statusTextColor, transform: 'translateY(2px)' }">{{ status }}</span>
        </div>
        <button class="wa-close-btn" @click="toggleChat" :style="{ color: nameTextColor }">
          <IconX :size="22" />
        </button>
      </div>

      <!-- Body -->
      <div class="wa-chat-content" :style="{ background: containerBodyBackground }">
        <div v-if="isTyping" class="wa-typing-indicator" :style="{ background: containerBodyBackground }">
          <span class="wa-typing-dot" :style="{ background: typingDotsColor }"></span>
          <span class="wa-typing-dot" :style="{ background: typingDotsColor }"></span>
          <span class="wa-typing-dot" :style="{ background: typingDotsColor }"></span>
        </div>
        <div
          v-for="(message, idx) in messages"
          :key="idx"
          class="wa-message"
          :style="{ background: messageBackground, color: messageTextColor }"
        >
          {{ message }}
        </div>
      </div>

      <!-- Bottom -->
      <div
        class="wa-message-input"
        :style="{
          background: containerBottomBackground,
          borderRadius: `0 0 ${widgetRounding} ${widgetRounding}`
        }"
      >
        <ChronicleButton
          :text="buttonInscription"
          :onClick="onWhatsAppClick"
          width="100%"
          :customBackground="defaultButtonBackground"
          customForeground="#fff"
          hoverColor="#fff"
          :hoverBackground="hoveredButtonBackground"
          :borderRadius="widgetRounding"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import ChronicleButton from '../chronicle-button/ChronicleButton.vue'
import { IconBrandWhatsapp, IconX } from '@tabler/icons-vue'

interface WhatsAppWidgetProps {
  name: string
  photo: string
  status?: string
  nameTextColor?: string
  statusTextColor?: string
  containerHeaderBackground?: string
  containerBodyBackground?: string
  containerBottomBackground?: string
  messageBackground?: string
  messageTextColor?: string
  defaultButtonBackground?: string
  hoveredButtonBackground?: string
  buttonTextColor?: string
  widgetRounding?: string
  onWhatsAppClick: () => void
  displayedMessage: string
  selfPopUpsIn: number
  typingDotsColor?: string
  buttonInscription?: string // NEW: Button text
}

const props = defineProps<WhatsAppWidgetProps>()

const {
  name,
  photo,
  status = 'online',
  nameTextColor = '#ffffff',
  statusTextColor = '#eeeeee',
  containerHeaderBackground = '#075e54',
  containerBodyBackground = '#e5ddd5',
  containerBottomBackground = '#f0f0f0',
  messageBackground = '#ffffff',
  messageTextColor = '#000000',
  defaultButtonBackground = '#25d366',
  hoveredButtonBackground = '#128c7e',
  buttonTextColor = '#ffffff',
  widgetRounding = '12px',
  onWhatsAppClick,
  displayedMessage,
  selfPopUpsIn,
  typingDotsColor = '#9e9ea1',
  buttonInscription = 'Chat in WhatsApp' // Default
} = props

const isOpen = ref(false)
const hasBeenOpened = ref(false)
const messages = ref<string[]>([])
const isTyping = ref(false)
const isFirstOpen = ref(true)

onMounted(() => {
  const autoOpenTimeout = setTimeout(() => {
    if (!hasBeenOpened.value) {
      isOpen.value = true
      hasBeenOpened.value = true
    }
  }, selfPopUpsIn)
  // Clean up
  watch(isOpen, () => {
    if (isOpen.value && isFirstOpen.value) {
      isTyping.value = true
      const typingTimeout = setTimeout(() => {
        isTyping.value = false
        messages.value = [displayedMessage]
        isFirstOpen.value = false
      }, 2000)
      return () => clearTimeout(typingTimeout)
    } else if (isOpen.value) {
      messages.value = [displayedMessage]
    }
  })
  return () => clearTimeout(autoOpenTimeout)
})

function toggleChat() {
  if (isOpen.value) {
    messages.value = []
  }
  isOpen.value = !isOpen.value
  hasBeenOpened.value = true
}
</script>

<style scoped>
.wa-chat-icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #25d366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 10001;
  animation: wave 2s infinite;
}
@keyframes wave {
  0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
  70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
}
.wa-chat-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  z-index: 10002;
  background: #fff;
  box-shadow: 0 2px 20px rgba(0,0,0,0.13);
  display: block;
}
.wa-chat-header {
  display: flex;
  align-items: center;
  padding: 6px 10px 6px 10px;
  height: 52px;
  min-height: 52px;
}
.wa-avatar-container {
  position: relative;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wa-avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  object-fit: cover;
  display: block;
}
.wa-online-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  background-color: #25d366;
  border-radius: 50%;
  border: 2px solid #075e54;
}
.wa-header-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.wa-name {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 0;
  display: block;
  line-height: 1.1;
}
.wa-status {
  font-size: 13px;
  display: block;
  line-height: 1.1;
}
.wa-close-btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0;
  margin-left: 8px;
  transition: all 0.3s ease;
}
.wa-close-btn svg {
  width: 22px;
  height: 22px;
  transition: opacity 0.3s ease;
  opacity: 0.86;
}
.wa-close-btn:hover svg {
  opacity: 1;
}
.wa-chat-content {
  height: 276px;
  padding: 16px 14px 8px 14px;
  overflow-y: auto;
}
.wa-message {
  max-width: 80%;
  padding: 7px 12px;
  margin-bottom: 7px;
  border-radius: 7.5px;
  position: relative;
  word-wrap: break-word;
  align-self: flex-start;
  font-size: 14px;
  line-height: 1.6;
}
.wa-message-input {
  height: 56px;
  min-height: 56px;
  display: flex;
  align-items: center;
  padding: 12px 14px;
}
.wa-typing-indicator {
  padding: 7px 0 7px 0;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 7px;
}
.wa-typing-dot {
  height: 9px;
  width: 9px;
  float: left;
  margin: 0 1px;
  background-color: #9e9ea1;
  display: block;
  border-radius: 50%;
  opacity: 0.4;
  animation: blink 1s infinite;
}
.wa-typing-dot:nth-of-type(1) { animation-delay: 0.3333s; }
.wa-typing-dot:nth-of-type(2) { animation-delay: 0.6666s; }
.wa-typing-dot:nth-of-type(3) { animation-delay: 0.9999s; }
@keyframes blink {
  50% { opacity: 1; }
}
</style>
