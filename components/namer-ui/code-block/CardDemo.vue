<template>
  <div 
    style="width: 100%; height: 100%; background: #fff; display: flex; justify-content: center; align-items: center;"
  >
    <div>
      <CodeblockDemo
        :code="sampleCode"
        filename="code.ts"
        backgroundColor="#eee"
        borderColor="#ddd"
        filenameColor="#333"
        lineNumberColor="#888"
        codeTextColor="#212121"
        codePadding="18px 18px 0 56px"
        borderRadius="8px"
        lineNumberXShift="4px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeblockDemo from './CodeBlock.vue'

const sampleCode = `if (string === "js")
    break;
`
</script>
