<script setup lang="ts">
import { useRouter } from 'vue-router'
import CircularTestimonials from '../components/namer-ui/circular-testimonials/CircularTestimonials.vue'

const testimonials = [
  {
    quote: "I was impressed by the food — every dish is bursting with flavor! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive, going the extra mile. I'll definitely be back for more!",
    name: "Tamar Mendelson",
    designation: "Restaurant Critic",
    src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote: "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond to ensure a fantastic visit. I'll definitely keep returning for more exceptional dining experience.",
    name: "Joe Charlescraft",
    designation: "Frequent Visitor",
    src: "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
  {
    quote: "Shining Yam is a hidden gem! From the moment I walked in, I knew I was in for a treat. The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
    name: "Martina Edelweist",
    designation: "Satisfied Customer",
    src: "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  }
]

const router = useRouter()
function goToTestimonials() {
  router.push('/components/circular-testimonials')
}
</script>

<template>
  <div class="showcase-demo-stack">
    <div class="showcase-demo-section">
      <div class="showcase-demo-inner">
        <div class="showcase-label" @click="goToTestimonials">
          Circular Testimonials:
        </div>
        <div class="circular-demo-disclaimer">
          <strong>Disclaimer:</strong>
          The testimonials and restaurant name presented here are entirely fictional and created for demonstrational purposes only.
          Shining Yam is not a real establishment or enterprise. These fictional testimonials are designed to showcase the functionality of the Animated Testimonials component and do not represent real customer experiences or opinions.
          Any resemblance to actual persons, living or dead, or actual businesses is purely coincidental.
          This demonstration is intended solely for illustrative purposes in a web development context.
        </div>
        <div style="transform:translateX(25px)">
          <CircularTestimonials
            :testimonials="testimonials"
            :autoplay="true"
            :colors="{
              name: '#fff',
              designation: '#999',
              testimony: '#e1e1e1',
              arrowBackground: '#eee',
              arrowForeground: '#151419',
              arrowHoverBackground: '#4776cb'
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Parent stack: column, no fixed height, no overflow restriction */
.showcase-demo-stack {
  display: flex;
  flex-direction: column;
  width: 100%;
  /* Remove any height or overflow settings */
}

/* Section: no fixed height, width 100% */
.showcase-demo-section {
  width: 100%;
  padding: 5rem 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background: none;
  /* Remove any height or overflow settings */
}

/* Inner: column, no fixed height */
.showcase-demo-inner {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* Remove any height or overflow settings */
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
  width: 100%;
}

/* The important part: disclaimer container */
.circular-demo-disclaimer {
  background: #24222b;
  color: #bdbdbd;
  font-size: 0.98rem;
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
  line-height: 1.7;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.08);
  margin-bottom: 2.5rem;
  margin-top: 0;
  width: 100%;
  /* Remove max-height, height, overflow */
  /* Ensure text wraps and container grows */
  white-space: normal;
  word-break: break-word;
  overflow: visible;
  box-sizing: border-box;
}

.circular-demo-disclaimer strong {
  color: #fff;
  font-weight: bold;
}
</style>
