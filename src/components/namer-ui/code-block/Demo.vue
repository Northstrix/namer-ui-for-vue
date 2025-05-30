<template>
  <CodeblockDemo :code="sampleCode" filename="code.ts" />
</template>

<script setup lang="ts">
import CodeblockDemo from './CodeBlock.vue'

const sampleCode = `if (string === "js")
    break;
`
</script>
