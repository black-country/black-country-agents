<template>

    <main>
      <TopNavBar>
        <template #extra>
          <button
            @click="toggleView"
            type="button"
            class="flex cursor-pointer items-center space-x-1 bg-[#1D1D1D] px-3 py-3 rounded-md hover:bg-gray-700"
          >
            <svg
              v-if="listView"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66663 4.16699H16.6666"
                stroke="#EBE5E0"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M3.33337 4.16699H3.34086"
                stroke="#FDFCFC"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.33337 10H3.34086"
                stroke="#FDFCFC"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.33337 15.833H3.34086"
                stroke="#FDFCFC"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.66663 10H16.6666"
                stroke="#EBE5E0"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M6.66663 15.833H16.6666"
                stroke="#EBE5E0"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
  
            <svg
              v-else
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.3333 10.0738V7.69615C18.3333 6.07615 18.3333 5.26615 17.8452 4.76287C17.357 4.2596 16.5713 4.2596 15 4.2596H13.2678C12.5033 4.2596 12.497 4.25811 11.8096 3.91332L9.03324 2.52084C7.87402 1.93945 7.29442 1.64875 6.67697 1.66895C6.05951 1.68915 5.49896 2.01715 4.37786 2.67316L3.35464 3.2719C2.53115 3.75375 2.1194 3.99469 1.89302 4.3955C1.66666 4.7963 1.66666 5.28441 1.66666 6.26061V13.1236C1.66666 14.4063 1.66666 15.0476 1.95187 15.4046C2.14166 15.642 2.40762 15.8018 2.70166 15.8547C3.14354 15.9342 3.68456 15.6177 4.76655 14.9844C5.50129 14.5546 6.20842 14.1081 7.08738 14.2292C7.8239 14.3306 8.50832 14.7963 9.16666 15.1265"
                stroke="#EBE5E0"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.66666 1.66797V14.1963"
                stroke="#FDFCFC"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M12.5 4.17383V9.18517"
                stroke="#FDFCFC"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.7558 16.8124L18.2934 18.3316M17.6409 14.698C17.6409 16.3369 16.3127 17.6655 14.6742 17.6655C13.0357 17.6655 11.7073 16.3369 11.7073 14.698C11.7073 13.0591 13.0357 11.7305 14.6742 11.7305C16.3127 11.7305 17.6409 13.0591 17.6409 14.698Z"
                stroke="#FDFCFC"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
  
            <span>{{ listView ? "List view" : "Map View" }}</span>
          </button>
        </template>
      </TopNavBar>
   <div class="container mx-auto mt-10 p-6">
    <svg @click="router.back()" class="cursor-pointer"  width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="18" fill="#EAEAEA"/>
      <path d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
   </div>
      <section class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto  px-6">
        <section v-for="(image, index) in previewImages" :key="index" :src="image">
          <div>
            <CoreImageZoom
            :class="'cursor-pointer w-full object-cover'"
            :src="image"
            :style="{ height: '340px' }"
           />
          </div>
        </section>
      </section>
    </main>
  </template>
  
  <script setup lang="ts">
  import { useUserInitials } from '@/composables/core/useUserInitials';
  import { useUser } from '@/composables/auth/user';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const { user } = useUser();
  
  const goBack = () => {
    router.back()
  };
  
  definePageMeta({
    middleware: 'auth'
  });
  
  const initials = ref('');
  const previewImages = ref<string[]>([]);
  
  onMounted(() => {
    const { getInitials } = useUserInitials(user.value);
    initials.value = getInitials.value;
    const storedImages = localStorage.getItem('selectedImages');
    if (storedImages) {
      previewImages.value = JSON.parse(storedImages);
    }
  });;
  </script>
  
  
  <style scoped>
  .preview-image {
    width: 200px;
    height: auto;
    margin: 10px;
  }
  </style>
  