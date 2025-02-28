

<template>
    <main>
      <section v-if="!loading" class="w-full p-8 max-w-7xl mx-auto">
        <!-- Navigation Breadcrumb -->
        <div class="flex items-center space-x-2 text-sm mb-4">
          <a href="#" class="text-gray-600 hover:underline">Listings</a>
          <span class="text-gray-400">|</span>
          <a href="#" class="text-gray-600 hover:underline">{{ propertyObj.name }}</a>
          <span class="text-gray-400">|</span>
          <span class="text-gray-900 font-semibold">Gallery (All photos)</span>
        </div>
    
        <!-- Gallery Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="item in propertyObj.commonAreas" :key="item.id" class="space-y-6 relative">
            <div v-for="(image, index) in item.images" :key="index" class="relative">
              <img
                :src="image"
                :alt="item.name"
                class="w-full h-auto rounded-lg shadow-sm object-cover"
              />
              <!-- Name tag overlay on each image -->
              <div class="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
    
        <!-- Scroll to top button -->
        <button
          @click="scrollToTop"
          class="fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-md hover:bg-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </section>
      <section v-else>
        <div class="rounded-md p-4 w-full mx-auto mt-10">
          <div class="animate-pulse flex space-x-4">
            <div class="flex-1 space-y-6 py-1">
              <div class="h-32 bg-slate-200 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-32 w-full bg-slate-200 rounded col-span-2"></div>
                  <div class="h-32 w-full bg-slate-200 rounded col-span-1"></div>
                </div>
                <div class="h-32 w-full bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
      </template>
      
      
      <script setup lang="ts">
      import { useFetchProperty } from "@/composables/modules/property/fetchProperty";
      const { propertyObj, loading } = useFetchProperty();
      // import Layout from '@/layouts/dashboardWithoutSidebar'
      interface Item {
        id: string;
        name: string;
        type: string;
        canBeFurnished: boolean;
        houseId: string;
        images: string[];
      }
      const showScrollToTop = ref(false);
    
    const handleScroll = () => {
      showScrollToTop.value = window.scrollY > 300;
    };
    
    // const scrollToTop = () => {
    //   window.scrollTo({ top: 0, behavior: 'smooth' });
    // };
    
    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });
    
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });
    
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    
      definePageMeta({
      middleware: "auth",
    });
      </script>
      
      <style scoped>
      /* Custom styles if needed */
      </style>
      