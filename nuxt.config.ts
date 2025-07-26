// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/sanity", "@nuxt/fonts", "nuxt-swiper"],
  sanity: {
    projectId: "cc2xy89a",
    dataset: "production",
    useCdn: true,
  },
  // runtimeConfig: {
  //   sanity: {
  //     token: process.env.SANITY_API_TOKEN,
  //   },
  // },
  css: ["@/assets/css/main.css"],
  ssr: true,
});
