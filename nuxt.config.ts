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
  swiper: {
    prefix: "Swiper",
    styleLang: "css",
    modules: ["navigation", "pagination", "autoplay"],
  },
  runtimeConfig: {
    sanity: {
      token: process.env.SANITY_API_TOKEN,
    },
  },
  css: ["@/assets/css/main.css"],
  routeRules: {
    "/journal/**": { prerender: true },
    "/events/**": { prerender: true },
    "/shop/**": { prerender: true },
    "/work": { prerender: true },
    "/about": { prerender: true },
    "/contact/**": { prerender: true },
  },
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        "/",
        "/journal",
        "/events",
        "/about",
        "/work",
        "/shop",
        "/contact",
        // add more static routes as needed
      ],
    },
  },
});
