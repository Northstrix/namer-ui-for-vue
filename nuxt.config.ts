import { defineNuxtConfig } from 'nuxt/config'            // <-- note 'nuxt/config'
import { componentMeta, type ComponentMeta } from './src/data/componentMeta'  // <-- 'type' for the ComponentMeta type

export default defineNuxtConfig({
  ssr: false, // Disable SSR, opt for Static Site Generation (SSG)
  nitro: {
    prerender: {
      routes: [
        '/',             // Home page
        '/components',   // Components list page
        ...componentMeta.map((comp: ComponentMeta) => `/components/${comp.route}`)
      ]
    }
  },
  css: [
    '~/src/assets/main.css'
  ]
})
