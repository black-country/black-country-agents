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
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ],
    },
    pageTransition: false,
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