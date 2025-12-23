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
  loading: false,
  modules: ['nuxt-icon',"@nuxtjs/tailwindcss"],
  css: ["/assets/css/main.css"],
  tailwindcss: {
    cssPath: "@/assets/css/main.css",
  },
    runtimeConfig: {
    public: {
      googleMapsApiKey: 'AIzaSyCTBVK36LVNlXs_qBOC4RywX_Ihf765lDg' 
    }
  },
  axios: {
    timeout: 10000,
  },
    vite: {
    optimizeDeps: {
      include: ['fast-deep-equal']
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: any) {
            if (id.includes("pdfjs-dist")) {
              return "pdfjs";
            }
          },
        },
      },
    },
    server: {
      port: 3001
    },
  },
  compatibilityDate: "2024-10-30",
};
