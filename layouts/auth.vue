<template>
  <div class="h-screen flex flex-col lg:flex-row">
    <!-- Left side - Logo + Form (scrollable if content overflows) -->
    <div class="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 py-8 lg:py-12 overflow-y-auto">
      
      <!-- Logo at the very top -->
      <div class="flex justify-center mb-12">
        <img src="@/assets/icons/logo.svg" alt="Horizon Properties" class="h-10" />
      </div>

      <!-- Centered Form -->
      <div class="flex flex-1 items-center justify-center">
        <div class="w-full max-w-md">
          <slot />
        </div>
      </div>
    </div>
    
    <!-- Right side - Background Image with Dark Overlay + Testimonial (desktop only) -->
    <div 
      class="hidden lg:flex lg:flex-1 relative h-screen"
      style="background-image: url('/auth-image.png'); background-size: cover; background-position: center;"
    >
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-60"></div>

      <!-- Testimonial at bottom -->
      <div class="relative z-10 flex flex-col justify-end w-full px-12 pb-16">
        <div class="text-start text-white max-w-xl mx-auto fade-in">
          <blockquote class="text-xl font-normal mb-8 leading-relaxed">
            "Working with Horizon Homes was a breeze! They helped me find the perfect home quickly and handled everything with professionalism and care. I couldn't have asked for a better experience."
          </blockquote>
          
          <div class="flex items-start justify-start space-x-3">
            <img src="@/assets/img/avatar.png" class="h-12 w-12" />
            <div class="text-left">
              <div class="font-semibold text-lg">Jane Doe</div>
              <div class="text-sm text-gray-300">Rented an apartment in Jan 23</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.8s ease-out;
}

/* Smooth transitions for interactive elements */
.transform {
  transition: transform 0.3s ease-in-out;
}
</style>
