// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  nitro: {
    preset: 'static'
  },
  ssr: false,
  css: ['~/assets/css/reset.css', '~/assets/css/theme.css', '~/assets/css/utilities.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
  app: {
    pageTransition: { 
      name: 'page', 
      mode: 'out-in' 
    },
    head: {
      htmlAttrs: {
        lang: 'zh-TW'
      }
    }
  }
})
