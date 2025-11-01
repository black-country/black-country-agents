<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section with Animated Background -->
    <section class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-float-delayed"></div>
        <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-300 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="text-center lg:text-left animate-fade-in-up">
            <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span class="text-sm font-medium">24/7 Healthcare Available</span>
            </div>
            
            <h1 class="text-2xl  lg:text-6xl font-bold mb-6 leading-tight">
              Your Health,
              <span class="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">
                Our Priority
              </span>
            </h1>
            
            <p class="text-lg sm:text-xl text-blue-100 mb-8 max-w-xl mx-auto lg:mx-0">
              Connect with certified healthcare professionals instantly. Quality medical consultations from the comfort of your home.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <NuxtLink
                v-if="!isLoggedIn"
                to="/register"
                class="group px-8 py-2.5 text-sm bg-white text-blue-700 rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Get Started Free</span>
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </NuxtLink>
              <NuxtLink
                v-if="isLoggedIn"
                to="/book"
                class="group px-8 py-2.5 text-sm bg-white text-blue-700 rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Book Consultation</span>
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </NuxtLink>
              
              <button
                @click="scrollToFeatures"
                class="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 rounded-xl font-semibold transition-all duration-300"
              >
                Learn More
              </button>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div class="animate-fade-in-up" style="animation-delay: 0.2s">
                <div class="text-3xl font-bold mb-1">50K+</div>
                <div class="text-blue-200 text-sm">Happy Patients</div>
              </div>
              <div class="animate-fade-in-up" style="animation-delay: 0.4s">
                <div class="text-3xl font-bold mb-1">200+</div>
                <div class="text-blue-200 text-sm">Expert Doctors</div>
              </div>
              <div class="animate-fade-in-up" style="animation-delay: 0.6s">
                <div class="text-3xl font-bold mb-1">4.9★</div>
                <div class="text-blue-200 text-sm">Avg Rating</div>
              </div>
            </div>
          </div>

          <!-- Right Content - Doctor Image Placeholder -->
          <div class="hidden lg:block animate-fade-in-up" style="animation-delay: 0.3s">
            <img src="@/assets/img/consultation.jpg" class="rounded-lg" />
            <!-- <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl blur-2xl opacity-50 animate-pulse-slow"></div>
              <div class="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div class="aspect-square bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <svg class="w-48 h-48 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <div class="mt-4 text-center">
                  <div class="font-semibold text-lg">Trusted Healthcare</div>
                  <div class="text-blue-200 text-sm">Professional Medical Support</div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>

      <!-- Wave Separator -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg class="w-full h-16 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" ref="featuresSection" class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16 animate-on-scroll">
          <h2 class="text-3xl  font-bold text-gray-900 mb-4">
            Why Choose <span class="text-blue-600">DrConnect</span>?
          </h2>
          <p class="text-base text-gray-600 max-w-2xl mx-auto">
            Experience healthcare that's designed around you with cutting-edge technology and compassionate care.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll border-[0.5px] border-gray-100">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="font-bold text-xl mb-3 text-gray-900">Instant Booking</h3>
            <p class="text-gray-600 leading-relaxed">Schedule appointments in seconds with real-time availability. No waiting, no hassle.</p>
          </div>

          <!-- Feature 2 -->
          <div class="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll border-[0.5px] border-gray-100" style="animation-delay: 0.1s">
            <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 class="font-bold text-xl mb-3 text-gray-900">Secure & Private</h3>
            <p class="text-gray-600 leading-relaxed">Bank-level encryption protects your health data. Your privacy is our top priority.</p>
          </div>

          <!-- Feature 3 -->
          <div class="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll border-[0.5px] border-gray-100" style="animation-delay: 0.2s">
            <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="font-bold text-xl mb-3 text-gray-900">Affordable Care</h3>
            <p class="text-gray-600 leading-relaxed">Transparent pricing with no hidden fees. Quality healthcare that fits your budget.</p>
          </div>

          <!-- Feature 4 -->
          <div class="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll border-[0.5px] border-gray-100" style="animation-delay: 0.3s">
            <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h3 class="font-bold text-xl mb-3 text-gray-900">Expert Doctors</h3>
            <p class="text-gray-600 leading-relaxed">Access certified healthcare professionals with years of experience across specialties.</p>
          </div>

          <!-- Feature 5 -->
          <div class="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll border-[0.5px] border-gray-100" style="animation-delay: 0.4s">
            <div class="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
              </svg>
            </div>
            <h3 class="font-bold text-xl mb-3 text-gray-900">Multi-language</h3>
            <p class="text-gray-600 leading-relaxed">Healthcare in your preferred language. Breaking down communication barriers.</p>
          </div>

          <!-- Feature 6 -->
          <div class="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll border-[0.5px] border-gray-100" style="animation-delay: 0.5s">
            <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <h3 class="font-bold text-xl mb-3 text-gray-900">Health Records</h3>
            <p class="text-gray-600 leading-relaxed">All your medical records in one place. Easy access whenever you need them.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-20 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16 animate-on-scroll">
          <h2 class="text-3xl  font-bold text-gray-900 mb-4">How It Works</h2>
          <p class="text-base text-gray-600 max-w-2xl mx-auto">
            Getting started with DrConnect is simple and straightforward
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-12 relative">
          <!-- Connecting Line -->
          <div class="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 -z-10"></div>

          <!-- Step 1 -->
          <div class="text-center animate-on-scroll">
            <div class="relative inline-block mb-6">
              <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl mx-auto">1</div>
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
            <h3 class="font-bold text-xl mb-3">Create Account</h3>
            <p class="text-gray-600">Sign up in under 2 minutes with your basic information</p>
          </div>

          <!-- Step 2 -->
          <div class="text-center animate-on-scroll" style="animation-delay: 0.2s">
            <div class="relative inline-block mb-6">
              <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl mx-auto">2</div>
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
            <h3 class="font-bold text-xl mb-3">Choose Doctor</h3>
            <p class="text-gray-600">Browse profiles and select the right doctor for your needs</p>
          </div>

          <!-- Step 3 -->
          <div class="text-center animate-on-scroll" style="animation-delay: 0.4s">
            <div class="relative inline-block mb-6">
              <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl mx-auto">3</div>
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
            <h3 class="font-bold text-xl mb-3">Get Consultation</h3>
            <p class="text-gray-600">Connect with your doctor and receive expert medical advice</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16 animate-on-scroll">
          <h2 class="text-xl  font-bold text-gray-900 mb-4">What Our Patients Say</h2>
          <p class="text-base text-gray-600">Trusted by thousands of satisfied patients</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 animate-on-scroll">
            <div class="flex gap-1 mb-4">
              <span class="text-yellow-400 text-xl">★</span>
              <span class="text-yellow-400 text-xl">★</span>
              <span class="text-yellow-400 text-xl">★</span>
              <span class="text-yellow-400 text-xl">★</span>
              <span class="text-yellow-400 text-xl">★</span>
            </div>
            <p class="text-gray-700 mb-6 leading-relaxed">"DrConnect made it so easy to get medical help when I needed it most. The doctors are professional and caring."</p>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                SM
              </div>
              <div>
                <div class="font-semibold">Sarah Miller</div>
                <div class="text-sm text-gray-500">Patient</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 animate-on-scroll" style="animation-delay: 0.1s">
            <div class="flex gap-1 mb-4">
              <span class="text-yellow-400 text-xl">★</span>
              <span class="text-yellow-400 text-xl">★</span>
              <span class="text-yellow-400 text-xl">★</span>
              <span class="text-yellow-400 text-xl">★</span>
              <span class="text-yellow-400 text-xl">★</span>
            </div>
            <p class="text-gray-700 mb-6 leading-relaxed">"Excellent service! I can book appointments anytime and the doctors are always available. Highly recommended!"</p>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div>
                <div class="font-semibold">John Davis</div>
                <div class="text-sm text-gray-500">Patient</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 animate-on-scroll" style="animation-delay: 0.2s">
            <div class="flex gap-1 mb-4">
              <span class="text-yellow-400 text-xl">★</span>
              <span class="text-yellow-400 text-xl">★</span>
              <span class="text-yellow-400 text-xl">★</span>
              <span class="text-yellow-400 text-xl">★</span>
              <span class="text-yellow-400 text-xl">★</span>
            </div>
            <p class="text-gray-700 mb-6 leading-relaxed">"The best telemedicine platform I've used. Quick, efficient, and the quality of care is outstanding."</p>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                EW
              </div>
              <div>
                <div class="font-semibold">Emily Wilson</div>
                <div class="text-sm text-gray-500">Patient</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative py-24 px-4 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"></div>
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
      
      <div class="relative max-w-4xl mx-auto text-center text-white animate-on-scroll">
        <h2 class="text-2xl  font-bold mb-6">Ready to Experience Better Healthcare?</h2>
        <p class="text-base text-blue-100 mb-10 max-w-2xl mx-auto">
          Join thousands of patients who trust DrConnect for quality, convenient, and affordable healthcare.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            v-if="!isLoggedIn"
            to="/register"
            class="group px-10 py-3 text-sm bg-white text-blue-700 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Start Your Journey</span>
            <svg class="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </NuxtLink>
          <NuxtLink
            v-else
            to="/book"
            class="group px-10 py-5 bg-white text-blue-700 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Book Consultation Now</span>
            <svg class="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </NuxtLink>
        </div>

        <div class="mt-8 text-blue-100 text-sm">
          <span>✓ No credit card required</span>
          <span class="mx-4">•</span>
          <span>✓ Cancel anytime</span>
          <span class="mx-4">•</span>
          <span>✓ 24/7 Support</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useUser } from '@/composables/modules/auth/user';

const { isLoggedIn } = useUser();
const featuresSection = ref<HTMLElement | null>(null);

const scrollToFeatures = () => {
  featuresSection.value?.scrollIntoView({ behavior: 'smooth' });
};

// Intersection Observer for scroll animations
onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach((el) => observer.observe(el));

  onUnmounted(() => {
    animatedElements.forEach((el) => observer.unobserve(el));
  });
});
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
}

@keyframes floatDelayed {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(20px) translateX(-10px);
  }
}

@keyframes pulseSlow {
  0%, 100% {
    opacity: 0.1;
    transform: scale(1);
  }
  50% {
    opacity: 0.2;
    transform: scale(1.05);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: floatDelayed 8s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulseSlow 4s ease-in-out infinite;
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>