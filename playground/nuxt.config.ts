export default defineNuxtConfig({
  modules: ["../src/module", "@nuxtjs/i18n"],
  devtools: { enabled: true },
  compatibilityDate: "2024-07-26",

  i18n: {
    defaultLocale: "da",
    // lazy: true,

    experimental: {
      autoImportTranslationFunctions: true,
    },
    vueI18n: "./i18n.config.ts", // if you are using custom path, default
  },
});
