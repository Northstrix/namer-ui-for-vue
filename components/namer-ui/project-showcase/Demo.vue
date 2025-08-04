<template>
  <div class="centered-text">
    <div class="demo-text">
      The live demo for this component appears on the
      <router-link to="/" class="home-link">home page</router-link>
      if the window width is at least 1194px.
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.centered-text {
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  text-align: center;
}
.demo-text {
  font-size: 1.125rem;
  color: #fff;
}
.home-link {
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
}
</style>
