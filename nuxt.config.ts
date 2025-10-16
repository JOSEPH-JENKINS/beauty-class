// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/sanity", "@nuxt/fonts", "nuxt-swiper"],
  sanity: {
    projectId: "cc2xy89a",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21",
  },
  runtimeConfig: {
    // These are exposed to server routes
    mailchimpApiKey: process.env.MAILCHIMP_API_KEY,
    mailchimpServerPrefix: process.env.MAILCHIMP_SERVER_PREFIX,
    mailchimpAudienceId: process.env.MAILCHIMP_AUDIENCE_ID,
  },
  css: ["@/assets/css/main.css"],
  ssr: true,
});
