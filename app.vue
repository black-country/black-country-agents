<template>
 <div>
   <UiToast class="z-[9999999]" />
    <NuxtLayout class="z-10">
      <NuxtPage class="z-10" />
    </NuxtLayout>
 </div>
</template>

<style>
body {
    font-family: 'Roobert PRO', sans-serif;
}
</style>

<script setup lang="ts">
// Global app configuration
useHead({
  title: 'Horizon Properties Admin',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'format-detection', content: 'telephone=no' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { 
      rel: 'stylesheet', 
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' 
    }
  ]
})

useSeoMeta({
  title: 'Horizon Properties Admin - Find Your Perfect Property in Nigeria',
  ogTitle: 'Horizon Properties - Find Your Perfect Property in Nigeria',
  description: 'Buy, rent, or short-let your dream property with Horizon Properties. Discover premium properties across Nigeria with detailed listings and advanced search filters.',
  ogDescription: 'Buy, rent, or short-let your dream property with Horizon Properties. Discover premium properties across Nigeria with detailed listings and advanced search filters.',
  ogImage: '/images/og-image.jpg',
  ogUrl: 'https://horizonproperties.ng',
  twitterTitle: 'Horizon Properties - Find Your Perfect Property in Nigeria',
  twitterDescription: 'Buy, rent, or short-let your dream property with Horizon Properties. Discover premium properties across Nigeria.',
  twitterImage: '/images/og-image.jpg',
  twitterCard: 'summary_large_image'
})

// useSchemaOrg([
//   defineOrganization({
//     name: 'Horizon Properties',
//     logo: 'https://horizonproperties.ng/images/logo.png',
//     url: 'https://horizonproperties.ng',
//     contactPoint: [
//       {
//         telephone: '+234-123-456-7890',
//         contactType: 'customer service',
//         availableLanguage: 'English'
//       }
//     ],
//     address: {
//       addressCountry: 'Nigeria',
//       addressLocality: 'Lagos'
//     }
//   })
// ])
</script>