<template>
  <div
    style="width: 100%; height: 100%; background: #fff; display: flex; justify-content: center; align-items: center; overflow: hidden; padding: 2rem; box-sizing: border-box;"
  >
    <div class="demo-wrapper">
      <PingPongLoader
        message="Loading..."
        backgroundColor="#f5f5f5"
        gridColor="#ccc"
        adjacentHandleColor="#060507"
        handleBallColor="#060507"
        borderColor="#aac4f7"
        borderWidth="1.5px"
        borderRadius="8px"
        dotBorderRadius="4px"
        textColor="#333"
        padding="1.5rem"
        style="width: 104px;"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PingPongLoader from './PingPongLoader.vue'
</script>

<style scoped>
.demo-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  user-select: none;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;
  max-width: 280px;
  width: 100%;
}
</style>
