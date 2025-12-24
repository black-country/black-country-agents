<template>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <!-- Modal overlay background -->
      <div class="absolute inset-0 backdrop-blur-lg bg-black opacity-80"></div>
  
      <!-- Modal content -->
      <div class="relative max-w-screen-lg w-full mx-auto bg-transparent">
        <div class="relative">
          <!-- Carousel Image -->
          <img
            :src="propertyImages[currentImage].image"
            :alt="propertyImages[currentImage].name"
            class="w-full h-[70vh] object-cover rounded-lg"
          />
  
          <!-- Close Button -->
          <button
            class="absolute top-4 right-4 text-white bg-gray-800 rounded-full p-2"
            @click="closeModal"
          >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.8327 4.16699L4.16602 15.8337M4.16602 4.16699L15.8327 15.8337" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            
          </button>
  
          <!-- Previous Button -->
          <button
            class="absolute top-1/2 left-4 text-white bg-gray-800 rounded-full p-2 transform -translate-y-1/2"
            @click="prevImage"
          >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.33398 10H16.6673" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.50062 14.1663C7.50062 14.1663 3.33399 11.0977 3.33398 9.99967C3.33398 8.90167 7.50065 5.83301 7.50065 5.83301" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            
          </button>
  
          <!-- Next Button -->
          <button
            class="absolute top-1/2 right-4 text-white bg-gray-800 rounded-full p-2 transform -translate-y-1/2"
            @click="nextImage"
          >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6673 10H3.33398" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.5 14.1663C12.5 14.1663 16.6667 11.0977 16.6667 9.99967C16.6667 8.90167 12.5 5.83301 12.5 5.83301" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            
          </button>
  
          <!-- Image Label -->
          <div class="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-sm py-3 px-3 rounded-full">
            {{ propertyImages[currentImage].name }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { usePropertyImages } from '@/composables/core/usePropertyImagesGrouping'; // Your new composable
  
  // Props
  const showModal = ref(true);
  const currentImage = ref(0);

  const props = defineProps({
    property: {
        type: Object
    }
  })
  
  // Use the composable to get the property images array
  const { propertyImages } = usePropertyImages(props.property);
  
  // Close modal function
  const closeModal = () => {
    showModal.value = false;
  };
  
  // Function to go to the previous image
  const prevImage = () => {
    currentImage.value = (currentImage.value === 0) ? propertyImages.value.length - 1 : currentImage.value - 1;
  };
  
  // Function to go to the next image
  const nextImage = () => {
    currentImage.value = (currentImage.value === propertyImages.value.length - 1) ? 0 : currentImage.value + 1;
  };
  </script>
  
  <style scoped>
  /* Additional styles */
  </style>
  