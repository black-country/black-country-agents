<template>
    <div 
      class="relative h-[300px] w-full group"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <template v-for="(image, index) in property?.images" :key="index">
        <div 
          v-show="currentIndex === index"
          class="absolute top-0 left-0 w-full h-full"
        >
          <img
            :src="image"
            @click="navigateToDetails"
            class="absolute top-0 left-0 rounded-lg cursor-pointer object-cover h-full w-full transition-all duration-300"
            :class="{ 'opacity-0': transitioning && currentIndex !== index }"
            :alt="`Property image ${index + 1}`"
          />
        </div>
      </template>
  
      <!-- Navigation Arrows -->
      <button 
        v-show="property?.images && property.images.length > 1"
        @click.stop="previousImage"
        class="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        :disabled="currentIndex === 0"
        aria-label="Previous image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
  
      <button 
        v-show="property?.images && property.images.length > 1"
        @click.stop="nextImage"
        class="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        :disabled="currentIndex === (property?.images?.length ?? 0) - 1"
        aria-label="Next image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
  
      <!-- Dots Navigation -->
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        <button
          v-for="(_, index) in property?.images"
          :key="index"
          @click.stop="goToImage(index)"
          class="w-2 h-2 rounded-full transition-colors duration-200"
          :class="currentIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white/70'"
          :aria-label="`Go to image ${index + 1}`"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  interface Property {
    id: string;
    images: string[];
  }
  
  const props = defineProps<{
    property?: Property;
  }>();
  
  const router = useRouter();
  const currentIndex = ref(0);
  const transitioning = ref(false);
  const touchStartX = ref(0);
  const touchEndX = ref(0);
  const minSwipeDistance = 50;
  let isSwiping = false;
  
  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.value = event.touches[0].clientX;
    isSwiping = false;
  };
  
  const handleTouchMove = (event: TouchEvent) => {
    touchEndX.value = event.touches[0].clientX;
    isSwiping = true;
  };
  
  const handleTouchEnd = () => {
    const swipeDistance = touchEndX.value - touchStartX.value;
    
    if (Math.abs(swipeDistance) >= minSwipeDistance && isSwiping) {
      if (swipeDistance > 0) {
        previousImage();
      } else {
        nextImage();
      }
    }
    
    touchStartX.value = 0;
    touchEndX.value = 0;
    isSwiping = false;
  };
  
  const goToImage = (index: number) => {
    if (currentIndex.value === index) return;
    
    transitioning.value = true;
    currentIndex.value = index;
    
    setTimeout(() => {
      transitioning.value = false;
    }, 300);
  };
  
  const previousImage = () => {
    if (currentIndex.value > 0) {
      goToImage(currentIndex.value - 1);
    }
  };
  
  const nextImage = () => {
    if (props.property?.images && currentIndex.value < props.property.images.length - 1) {
      goToImage(currentIndex.value + 1);
    }
  };
  
  const navigateToDetails = () => {
    if (!isSwiping && props.property?.id) {
      router.push(`/dashboard/listings/${props.property.id}`);
    }
  };
  
  onMounted(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        previousImage();
      } else if (event.key === 'ArrowRight') {
        nextImage();
      }
    };
  
    window.addEventListener('keydown', handleKeydown);
  
    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeydown);
    });
  });
  </script>