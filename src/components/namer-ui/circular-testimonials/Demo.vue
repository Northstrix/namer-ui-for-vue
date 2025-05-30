<script setup lang="ts">
import CircularTestimonials from './CircularTestimonials.vue'

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
</script>

<template>
  <div class="circular-demo-root">
    <div class="circular-demo-disclaimer">
      <strong>Disclaimer:</strong>
      The testimonials and restaurant name presented here are entirely fictional and created for demonstrational purposes only.
      Shining Yam is not a real establishment or enterprise. These fictional testimonials are designed to showcase the functionality of the Animated Testimonials component and do not represent real customer experiences or opinions.
      Any resemblance to actual persons, living or dead, or actual businesses is purely coincidental.
      This demonstration is intended solely for illustrative purposes in a web development context.
    </div>
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
    <div class="circular-demo-link-wrap">
      <a
        class="circular-demo-link"
        href="https://codepen.io/Northstrix/pen/QwWoYzZ"
        target="_blank"
        rel="noopener noreferrer"
      >
        Vanilla HTML/CSS/JS version
      </a>
    </div>
  </div>
</template>

<style>
.circular-demo-root {
  padding: 0;
}
.circular-demo-disclaimer {
  max-width: 900px;
  margin: 2.5rem auto 1.5rem auto;
  color: #bdbdbd;
  font-size: 0.98rem;
  background: rgba(20, 22, 24, 0.85);
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
  line-height: 1.7;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.08);
}
.circular-demo-disclaimer strong {
  color: #fff;
  font-weight: bold;
}
.circular-demo-link-wrap {
  display: flex;
  justify-content: center;
  margin: 2.5rem 0 1.5rem 0;
}
.circular-demo-link {
  color: #fff;
  font-size: 1.07rem;
  text-decoration: underline;
  font-weight: bold;
  transition: color 0.18s;
  cursor: pointer;
}
.circular-demo-link:hover {
  color: #4776cb;
}
</style>
