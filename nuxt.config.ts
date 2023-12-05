// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    SPACEGRAM_API_URL: process.env.SPACEGRAM_API_URL,
    SPACEGRAM_KEY: process.env.SPACEGRAM_KEY,
    SPACEGRAM_PREFIX: process.env.SPACEGRAM_PREFIX,
    PASSWORD: process.env.PASSWORD,
  },
  modules: [
    "@vueuse/nuxt",
  ],
  build: {
    transpile: ['vue-sonner']
  },
});
