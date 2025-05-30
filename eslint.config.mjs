// eslint.config.mjs
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import prettier from 'eslint-config-prettier/flat'

export default defineConfigWithVueTs(
  // Enable essential Vue rules
  ...pluginVue.configs['flat/essential'],
  // Enable recommended TypeScript rules for Vue SFCs
  vueTsConfigs.recommended,
  // Disable formatting rules that might conflict with Prettier
  prettier,
  // Optionally, add your own custom rules
  {
    files: ['**/*.vue', '**/*.ts', '**/*.js'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/html-indent': ['error', 2],
      // Add more custom rules as needed
    },
  }
)
