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
  title: 'Dr Connect | Book Trusted Doctors & Medical Consultations Online',
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
  title: 'Dr Connect — Book Doctors & Medical Consultations Online in Seconds',
  ogTitle: 'Dr Connect — Find & Book Verified Doctors in Minutes',
  description: 'Dr Connect is the easiest way to find verified doctors, book medical consultations, and access healthcare conveniently from anywhere. Secure, fast, and reliable telehealth.',
  ogDescription: 'Book verified doctors and medical consultations instantly with Dr Connect. Secure telehealth services, appointment scheduling, and digital healthcare access.',
  ogImage: '/images/og-image.jpg',
  ogUrl: 'https://drconnect.ng',
  twitterTitle: 'Dr Connect — Your Digital Doctor Appointment Platform',
  twitterDescription: 'Find trusted doctors, schedule medical visits, and access telehealth services online with Dr Connect.',
  twitterImage: '/images/og-image.jpg',
  twitterCard: 'summary_large_image'
})
</script>
