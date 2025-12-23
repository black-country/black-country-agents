export default {
  ssr: false,
  target: "static",
  router: {
    base: '/agent/'
  },
  app: {
    baseURL: '/agent/',
    head: {
      title: "Black Country",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/agent/favicon.svg" },
        { rel: 'icon', type: 'image/png', href: '/agent/favicon.png' },
      ],
    },
    pageTransition: false,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_BASE_URL || '',
      googleApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      imageUploadBaseUrl: process.env.NUXT_PUBLIC_BASE_URL || '',
    }
  },
  // Alternatively, for finer control, you can disable loading indicators and other settings:
  loading: false,
  loadingIndicator: false, // Completely removes the default Nuxt loading screen

  modules: ['nuxt-icon',"@nuxtjs/tailwindcss"],
  css: ["/assets/css/main.css"],

  tailwindcss: {
    cssPath: "@/assets/css/main.css",
  },

  axios: {
    // Axios options here
    timeout: 10000, // Example: set timeout to 10 seconds
  },

  // buildModules: [
  //   '@nuxtjs/moment'
  // ]
  // alias: {
  // 	'@': '/'
  // },
  plugins: [],

  compatibilityDate: "2024-10-30",
};

// export default defineNuxtConfig({
//   ssr: false,
//   app: { baseURL: "/agent/" },

//   runtimeConfig: {
//     public: {
//       apiBase: process.env.NUXT_PUBLIC_API_BASE || "",
//       imageUploadBase: process.env.NUXT_PUBLIC_IMAGE_UPLOAD_BASE_URL || "",
//     },
//   },

//   modules: ["nuxt-icon", "@nuxtjs/tailwindcss"],
//   css: ["@/assets/css/main.css"],
//   compatibilityDate: "2025-12-23",
// });

// import { defineNuxtConfig } from "nuxt/config";

// export default defineNuxtConfig({
//   ssr: false,
//   nitro: {
//     output: {
//       publicDir: 'dist'
//     }
//   },

//   components: [
//     {
//       path: '~/components',
//       pathPrefix: false,
//     },
//   ],

//   app: { 
//     // baseURL: "/agent/",
//       head: {
//       title: "BlackCountry Agent App",
//       htmlAttrs: { lang: "en" },
//       meta: [
//         { charset: "utf-8" },
//         { name: "viewport", content: "width=device-width, initial-scale=1" },
//         { name: "format-detection", content: "telephone=no" },
//         { name: "theme-color", content: "#27396B" },
//       ],
//       link: [
//         { rel: "icon", type: "image/x-icon", href: "/favicon.svg" },
//         { rel: "preconnect", href: "https://cdn.jsdelivr.net", crossorigin: "anonymous" },
//         { rel: "preconnect", href: "https://web-button.getmati.com", crossorigin: "anonymous" },
//       ],
//     }, },

//   runtimeConfig: {
//     public: {
//       apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE || "",
//       imageUploadBase: process.env.NUXT_PUBLIC_IMAGE_UPLOAD_BASE_URL || "",
//     },
//   },
//     devtools: {
//     enabled: process.env.NODE_ENV !== 'production'
//   },

//   modules: ["nuxt-icon", "@nuxtjs/tailwindcss"],
//   css: ["@/assets/css/main.css"],
//   compatibilityDate: "2025-12-23",
// });