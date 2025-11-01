<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <!-- Profile Header Card -->
      <div class="bg-white rounded-2xl shadow-sm border-[0.5px] border-gray-100 overflow-hidden mb-6">
        <div class="h-24 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div class="px-6 sm:px-8 pb-8 -mt-12">
          <div class="flex flex-col sm:flex-row items-center sm:items-end gap-4">
            <div class="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-blue-600">
              {{ initials }}
            </div>
            <div class="text-center sm:text-left sm:mb-2">
              <h1 class="text-2xl sm:text-3xl uppercase font-bold text-gray-900">{{ user?.name || 'User Profile' }}</h1>
              <p class="text-gray-500 text-sm mt-1">Member since {{ memberSince }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Information Card -->
      <div class="bg-white rounded-2xl shadow-sm border-[0.5px] border-gray-100 p-6 sm:p-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-gray-900">Profile Information</h2>
          <NuxtLink 
            to="/profile/edit" 
            class="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Profile
          </NuxtLink>
        </div>

        <div v-if="user" class="space-y-6">
          <!-- Profile Details Grid -->
          <div class="grid sm:grid-cols-2 gap-6">
            <!-- Full Name -->
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <label class="text-sm font-medium text-gray-500">Full Name</label>
              </div>
              <p class="text-base font-medium text-gray-900 pl-6">{{ user.name || 'Not provided' }}</p>
            </div>

            <!-- Email -->
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <label class="text-sm font-medium text-gray-500">Email Address</label>
              </div>
              <p class="text-base font-medium text-gray-900 pl-6">{{ user.email || 'Not provided' }}</p>
            </div>

            <!-- Phone -->
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <label class="text-sm font-medium text-gray-500">Phone Number</label>
              </div>
              <p class="text-base font-medium text-gray-900 pl-6">{{ user.phone || 'Not provided' }}</p>
            </div>

            <!-- Member Since -->
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <label class="text-sm font-medium text-gray-500">Member Since</label>
              </div>
              <p class="text-base font-medium text-gray-900 pl-6">{{ memberSince }}</p>
            </div>
          </div>

          <!-- Divider -->
          <div class="border-t border-gray-100 pt-6">
            <!-- Logout Button -->
            <button
              @click="showLogoutModal = true"
              class="w-full sm:w-auto px-6 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 group"
            >
              <svg class="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-else class="space-y-6">
          <div class="grid sm:grid-cols-2 gap-6">
            <div v-for="i in 4" :key="i" class="space-y-2">
              <div class="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div class="h-6 bg-gray-100 rounded w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Logout Confirmation Modal -->
  <Teleport to="body">
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showLogoutModal"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        @click.self="showLogoutModal = false"
      >
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="showLogoutModal"
            class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            @click.stop
          >
            <!-- Animated Background Gradient -->
            <div class="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 opacity-50"></div>
            
            <!-- Decorative Elements -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-red-400/10 rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 left-0 w-32 h-32 bg-orange-400/10 rounded-full blur-3xl"></div>

            <!-- Content -->
            <div class="relative p-6 sm:p-8">
              <!-- Icon Container -->
              <div class="flex justify-center mb-6">
                <div class="relative">
                  <div class="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                  </div>
                  <!-- Pulse Ring -->
                  <div class="absolute inset-0 rounded-full bg-red-500 opacity-20 animate-ping"></div>
                </div>
              </div>

              <!-- Title -->
              <h3 class="text-lg font-bold text-gray-900 text-center mb-3">
                Leaving Already?
              </h3>

              <!-- Description -->
              <p class="text-gray-600 text-sm text-center mb-8 leading-relaxed">
                Are you sure you want to logout? You'll need to sign in again to access your appointments and book consultations.
              </p>

              <!-- User Info Badge -->
              <div class="flex items-center justify-center gap-3 mb-8 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {{ initials }}
                </div>
                <div class="text-left">
                  <div class="font-semibold text-gray-900">{{ user?.name }}</div>
                  <div class="text-sm text-gray-500">{{ user?.email }}</div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3">
                <button
                  @click="showLogoutModal = false"
                  class="flex-1 px-6 py-3 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  Stay Logged In
                </button>
                <button
                  @click="confirmLogout"
                  :disabled="isLoggingOut"
                  class="flex-1 px-6 py-3 text-sm bg-black text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg 
                    v-if="isLoggingOut"
                    class="animate-spin h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{{ isLoggingOut ? 'Logging Out...' : 'Yes, Logout' }}</span>
                </button>
              </div>
            </div>

            <!-- Close Button -->
            <button
              @click="showLogoutModal = false"
              class="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-all duration-300 group"
            >
              <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFetchProfile } from '@/composables/modules/auth/useFetchProfile'
import { useLogout } from '@/composables/modules/auth/useLogout'
import { useRouter } from 'vue-router'

const router = useRouter()
const { profile: user, loading } = useFetchProfile()
const { logout } = useLogout()

const showLogoutModal = ref(false)
const isLoggingOut = ref(false)

const initials = computed(() => {
  if (user.value?.name) {
    const names = user.value.name.trim().split(' ')
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }
    return names[0][0].toUpperCase()
  }
  return 'U'
})

definePageMeta({
  middleware: 'auth',
  layout: 'user'
})

const memberSince = computed(() => {
  if (user.value?.createdAt) {
    return new Date(user.value.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  return 'N/A'
})

const confirmLogout = async () => {
  isLoggingOut.value = true
  
  // Simulate a small delay for better UX
  await new Promise(resolve => setTimeout(resolve, 800))
  
  logout()
  showLogoutModal.value = false
  isLoggingOut.value = false
  router.push('/login')
}
</script>

<style scoped>
@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}
</style>