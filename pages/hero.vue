<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-gray-50 border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 lg:h-20">
          <!-- Logo -->
          <div class="text-2xl lg:text-3xl font-bold text-gray-900">
            Elehealthy
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center space-x-8 text-gray-700">
            <NuxtLink to="/" class="hover:text-gray-900 transition-colors">Home</NuxtLink>
            <NuxtLink to="/about" class="hover:text-gray-900 transition-colors">About Us</NuxtLink>
            <NuxtLink to="/specialists" class="hover:text-gray-900 transition-colors">Specialists</NuxtLink>
            <NuxtLink to="/services" class="hover:text-gray-900 transition-colors">Services</NuxtLink>
            <NuxtLink to="/doctors" class="hover:text-gray-900 transition-colors">Doctors</NuxtLink>
            <NuxtLink to="/prices" class="hover:text-gray-900 transition-colors">Prices</NuxtLink>
            <NuxtLink to="/contact" class="hover:text-gray-900 transition-colors">Contact</NuxtLink>
          </div>

          <!-- Mobile Menu Button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden p-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Grid Icon -->
          <button class="hidden lg:block p-2 hover:bg-gray-100 rounded transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="lg:hidden border-t border-gray-200">
        <div class="px-4 py-4 space-y-3">
          <NuxtLink to="/" class="block py-2 text-gray-700 hover:text-gray-900">Home</NuxtLink>
          <NuxtLink to="/about" class="block py-2 text-gray-700 hover:text-gray-900">About Us</NuxtLink>
          <NuxtLink to="/specialists" class="block py-2 text-gray-700 hover:text-gray-900">Specialists</NuxtLink>
          <NuxtLink to="/services" class="block py-2 text-gray-700 hover:text-gray-900">Services</NuxtLink>
          <NuxtLink to="/doctors" class="block py-2 text-gray-700 hover:text-gray-900">Doctors</NuxtLink>
          <NuxtLink to="/prices" class="block py-2 text-gray-700 hover:text-gray-900">Prices</NuxtLink>
          <NuxtLink to="/contact" class="block py-2 text-gray-700 hover:text-gray-900">Contact</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
        <!-- Left Content -->
        <div class="space-y-6 lg:space-y-8">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-normal text-gray-900 leading-tight">
            Trust your health<br />to the best specialists
          </h1>

          <!-- Icon and Description -->
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 mt-1">
              <svg class="w-12 h-12 lg:w-16 lg:h-16" viewBox="0 0 64 64" fill="none">
                <circle cx="16" cy="32" r="3" fill="#374151" />
                <circle cx="32" cy="32" r="3" fill="#374151" />
                <circle cx="48" cy="32" r="3" fill="#374151" />
                <rect x="14" y="20" width="4" height="24" fill="#374151" />
                <rect x="30" y="20" width="4" height="24" fill="#374151" />
                <rect x="46" y="20" width="4" height="24" fill="#374151" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-base lg:text-lg text-gray-700 leading-relaxed">
                Book appointments with the expert doctors.<br />
                Book a consultation, get diagnosed and find<br />
                the right treatment all in one place.
              </p>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <button class="bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 text-base lg:text-lg transition-colors">
              Request a call
            </button>
            <button class="bg-transparent hover:bg-gray-100 text-gray-800 px-8 py-4 text-base lg:text-lg border border-gray-300 transition-colors">
              Send Email
            </button>
          </div>
        </div>

        <!-- Right Content - Doctor Card -->
        <div class="relative flex justify-center lg:justify-end">
          <div class="relative w-full max-w-md lg:max-w-lg">
            <!-- Main Doctor Image Container -->
            <div class="relative bg-gray-600 w-full aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=1000&fit=crop"
                alt="Doctor"
                class="w-full h-full object-cover"
              />
              
              <!-- Star decoration - top right OUTSIDE the image -->
              <div class="absolute -top-4 -right-10 lg:-top-6 lg:-right-16 z-10">
                <svg class="w-16 h-16 lg:w-24 lg:h-24 text-gray-900" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z" />
                </svg>
              </div>
            </div>

            <!-- Doctor Info Card - Overlapping bottom right, extending beyond image -->
            <div class="absolute -bottom-8 -right-4 sm:-bottom-12 sm:-right-8 lg:-bottom-16 lg:-right-12 bg-[#1a1a1a] text-white p-6 lg:p-8 w-[calc(100%-2rem)] sm:w-[85%] lg:w-[420px] shadow-2xl z-20">
              <!-- Navigation Arrows -->
              <div class="flex justify-between items-center mb-5">
                <h2 class="text-3xl lg:text-[2.5rem] font-light tracking-wide">James S.</h2>
                <div class="flex space-x-1">
                  <button class="p-2 hover:bg-gray-800 transition-colors rounded">
                    <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button class="p-2 hover:bg-gray-800 transition-colors rounded">
                    <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="border-t border-gray-700 pt-5 mb-6">
                <p class="text-sm lg:text-base text-gray-300 leading-relaxed">
                  Professor James Scott is a top consultant physician in London. His specialties include genetics, DNA, diabetes, Alzheimer's disease.
                </p>
              </div>

              <!-- Stats Grid -->
              <div class="grid grid-cols-2 gap-x-8 gap-y-5 mb-7">
                <div>
                  <p class="text-xs lg:text-sm text-gray-400 mb-2">Average Procedure</p>
                  <p class="text-2xl lg:text-[1.75rem] font-light">30 min</p>
                </div>
                <div>
                  <p class="text-xs lg:text-sm text-gray-400 mb-2">Average rating</p>
                  <p class="text-2xl lg:text-[1.75rem] font-light">4,9</p>
                </div>
                <div>
                  <p class="text-xs lg:text-sm text-gray-400 mb-2">Average Visit</p>
                  <p class="text-2xl lg:text-[1.75rem] font-light">250$</p>
                </div>
                <div>
                  <p class="text-xs lg:text-sm text-gray-400 mb-2">Total Experience</p>
                  <p class="text-2xl lg:text-[1.75rem] font-light">12 years</p>
                </div>
              </div>

              <!-- Schedule Button -->
              <NuxtLink
                to="/appointment"
                class="block w-full text-center bg-transparent border border-gray-600 hover:bg-gray-700 text-white py-4 text-base lg:text-lg transition-colors"
              >
                Schedule an Appointment
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How We Work Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 mt-32 lg:mt-48">
      <div class="border-t border-gray-300 pt-6">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl lg:text-3xl font-normal text-gray-900">HOW WE WORK</h2>
          <svg class="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2 L15 8 L12 14 L9 8 Z" />
          </svg>
        </div>

        <div class="space-y-8 lg:space-y-12 max-w-2xl">
          <!-- Step 1 -->
          <div class="flex items-start space-x-6">
            <div class="flex-shrink-0">
              <svg class="w-8 h-8 lg:w-10 lg:h-10 text-gray-900" viewBox="0 0 40 40" fill="currentColor">
                <path d="M20 4 L24 16 L20 28 L16 16 Z" />
              </svg>
            </div>
            <p class="text-base lg:text-lg text-gray-700 leading-relaxed">
              Choose your doctor from thousands of specialist, general, and trusted hospitals.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="flex items-start space-x-6">
            <div class="flex-shrink-0">
              <svg class="w-8 h-8 lg:w-10 lg:h-10 text-gray-900" viewBox="0 0 40 40" fill="currentColor">
                <path d="M20 4 L24 16 L20 28 L16 16 Z" />
              </svg>
            </div>
            <p class="text-base lg:text-lg text-gray-700 leading-relaxed">
              Book consultation with our trusted doctors and get the best recommendations.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
</script>

<style scoped>
/* Additional custom styles if needed */
</style>