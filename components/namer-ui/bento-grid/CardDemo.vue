<template>
  <div
    style="width: 100%; height: 100%; background: #fff; display: flex; justify-content: center; align-items: center; padding: 2rem; box-sizing: border-box; overflow: hidden;"
  >
    <div style="width: 100%; transform: scale(0.76); transform-origin: center center;">
      <BentoGrid
        :main-aspect="'9/16'"
        :left-col-ratio="0.32"
        :right-col1="0.6"
        :right-col2="0.4"
        :top-row-ratio="0.65"
        :bottom-row-ratio="0.35"
        gap="20px"
        grid-height="264px"

        cell-background="#f5f5f5"
        cell-border-color="#ccc"
        cell-border-radius="16px"
        cell-border-width="1px"
        cell-padding="16px"

        main-cell-background="#4776cb"
        main-cell-border-color="#aac4f7"
        main-cell-border-radius="8px"
        main-cell-border-width="2px"

        top-center-cell-background="#fff"
        top-center-cell-border-color="#aac4f7"
        top-center-cell-border-radius="16px"
        top-center-cell-border-width="2px"

        top-right-cell-background="#f6f6f9"
        top-right-cell-border-color="#aac4f7"

        bottom-cell-background="#f6f6f9"
        bottom-cell-border-radius="8px"
        bottom-cell-border-width="2px"

        @cellClick="handleCellClick"
      >
        <template #main>
          <div style="width: 100%; text-align: center; color: #fff; font-weight: 700; font-size: 1rem;">
            Left (Main)
          </div>
        </template>
        <template #topCenter>
          <div style="width: 100%; text-align: center; color: #333; font-weight: 700; font-size: 1rem;">
            Top Center
          </div>
        </template>
        <template #topRight>
          <div style="width: 100%; text-align: center; color: #333; font-weight: 700; font-size: 1rem;">
            Top Right
          </div>
        </template>
        <template #bottom>
          <div style="width: 100%; text-align: center; color: #333; font-weight: 700; font-size: 1rem;">
            Bottom Right
          </div>
        </template>
      </BentoGrid>
    </div>
  </div>
</template>

<script setup lang="ts">
import BentoGrid from './BentoGrid.vue'

function handleCellClick(cell: 'main' | 'topCenter' | 'topRight' | 'bottom') {

}
</script>