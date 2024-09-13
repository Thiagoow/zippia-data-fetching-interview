// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'system'
  },

  tailwindcss: {
    configPath: 'tailwind.config.ts'
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      appMode: process.env.NODE_ENV
    }
  },

  compatibilityDate: '2024-09-13'
})
