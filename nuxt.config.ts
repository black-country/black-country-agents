import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: false,

  postcss: {
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
     public: {
      googleMapsApiKey: process.env.VITE_GOOGLE_MAPS_API_KEY || '',
    },
  },

  app: {
    baseURL: '/agent/',                                                                                                                                                                                                                                                                                                      
    head: {
      title: "Black Country Agent",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },

        // ✅ SEO meta
        {
          name: "description",
          content:
            "Doctor dey consulting — Book verified doctors, schedule medical appointments, and access secure telehealth and in-clinic consultations. Seamless healthcare access in Nigeria.",
        },
        {
          name: "keywords",
          content:
            "doctor booking, medical appointments, telehealth, online consultation, Nigeria healthcare, book doctors online, telemedicine, Doctor dey consulting",
        },
        { name: "author", content: "Doctor dey consulting" },

        // ✅ Open Graph (for social previews)
        { property: "og:title", content: "Doctor dey consulting — Book Doctors & Medical Consultations" },
        {
          property: "og:description",
          content:
            "Find trusted medical professionals and book appointments instantly with Doctor dey consulting. Access telemedicine and in-person care securely.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://drconnect.ng" },
        { property: "og:image", content: "https://drconnect.ng/og-image.jpg" },

        // ✅ Twitter meta
        { name: "twitter:card", content: "summary_large_image" },
        { property: "twitter:url", content: "https://drconnect.ng" },
        { name: "twitter:title", content: "Doctor dey consulting — Online Doctor Booking & Telehealth" },
        {
          name: "twitter:description",
          content:
            "Book verified doctors online and access secure telehealth services with Doctor dey consulting.",
        },
        { name: "twitter:image", content: "https://drconnect.ng/og-image.jpg" },
      ],

      link: [
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "manifest", href: "/site.webmanifest" }
      ],

      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js",
          type: "text/javascript",
        },
      ],
    },
  },

  build: {
    transpile: ["lucide-vue-next"],
  },

  css: ['/assets/css/font/stylesheet.css', "/assets/css/main.css"],

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxtjs/robots",
  ],

  googleFonts: {
    families: {
      "Inter": [400, 500, 600, 700],
      "Poppins": [400, 500, 600, 700],
    },
    display: "swap",
    preload: true,
  },

  compatibilityDate: "2025-11-01"
});