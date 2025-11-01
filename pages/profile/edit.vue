<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">

      <!-- ✅ LOADING STATE WHILE FETCHING PROFILE -->
      <div v-if="profileLoading" class="text-center py-24">
        <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.4 0 1 4.4 1 10h3zm2 5.3A7.96 7.96 0 014 12H1c0 3 1.1 5.8 3 7.9l2-2.6z"/>
        </svg>
        <p class="text-gray-500 font-medium">Loading profile...</p>
      </div>

      <!-- ✅ PAGE CONTENT WHEN PROFILE LOADED -->
      <div v-else>
        
        <!-- Profile Header -->
        <div class="bg-white rounded-2xl shadow-sm border-[0.5px] border-gray-50 overflow-hidden mb-6">
          <div class="h-24 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <div class="px-6 sm:px-8 pb-8 -mt-12">
            <div class="flex flex-col sm:flex-row items-center sm:items-end gap-4">
              <div class="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-blue-600">
                {{ initials }}
              </div>
              <div class="text-center sm:text-left sm:mb-2">
                <h1 class="text-2xl sm:text-3xl font-bold uppercase text-gray-900">{{ form.name || 'User Profile' }}</h1>
                <p class="text-gray-500 text-sm mt-1">Member since {{ memberSince }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Form Card -->
        <div class="bg-white rounded-2xl shadow-sm border-[0.5px] border-gray-50 p-6 sm:p-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>

          <form @submit.prevent="handleUpdateProfile" class="space-y-5">

            <!-- Error -->
            <div v-if="error" class="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
              <svg class="w-5 h-5 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.7 7.3a1 1 0 00-1.4 1.4L8.6 10l-1.3 1.3a1 1 0 101.4 1.4L10 11.4l1.3 1.3a1 1 0 001.4-1.4L11.4 10l1.3-1.3a1 1 0 00-1.4-1.4L10 8.6 8.7 7.3z"
                  clip-rule="evenodd" />
              </svg>
              <p class="text-sm text-red-700 font-medium">{{ error }}</p>
            </div>

            <!-- Success -->
            <div v-if="successMessage" class="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
              <svg class="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6l-1.3-1.3a1 1 0 10-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
                  clip-rule="evenodd" />
              </svg>
              <p class="text-sm text-green-700 font-medium">{{ successMessage }}</p>
            </div>

            <!-- Full Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                v-model="form.name"
                type="text"
                required
                class="custom-input"
                placeholder="Enter your full name"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                v-model="form.email"
                type="email"
                disabled
                class="custom-input bg-gray-100 cursor-not-allowed"
              />
              <p class="text-xs text-gray-500 mt-1.5">Email cannot be changed</p>
            </div>

            <!-- Phone -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                v-model="form.phone"
                type="tel"
                required
                class="custom-input"
                placeholder="Enter your phone number"
              />
            </div>

            <!-- Buttons -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                :disabled="updateLoading"
                class="flex-1 py-3 text-sm px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <!-- Save Button Loader -->
                <svg v-if="updateLoading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.3 0 0 5.3 0 12h4zm2 5.3A8 8 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z"/>
                </svg>
                <span v-if="updateLoading">Saving...</span>
                <span v-else>Save Changes</span>
              </button>

              <button
                type="button"
                @click="showLogoutModal = true"
                class="px-6 py-3 text-sm border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                Logout
              </button>
            </div>

          </form>
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
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useFetchProfile } from '@/composables/modules/auth/useFetchProfile'
import { useUpdateProfile } from '@/composables/modules/auth/useUpdateProfile'
import { useLogout } from '@/composables/modules/auth/useLogout'

const router = useRouter()

const { logout } = useLogout()
// ✅ Separate loading states
const { profile, loading: profileLoading } = useFetchProfile()
const { updateProfile, loading: updateLoading } = useUpdateProfile()

const form = ref({ name: '', email: '', phone: '' })
const error = ref<string | null>(null)
const successMessage = ref<string | null>(null)


const showLogoutModal = ref(false)
const isLoggingOut = ref(false)


const initials = computed(() => {
  if (form.value.name) {
    const names = form.value.name.trim().split(' ')
    return names.length >= 2
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : names[0][0].toUpperCase()
  }
  return 'U'
})

const memberSince = computed(() => {
  return profile.value?.createdAt
    ? new Date(profile.value.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    : 'N/A'
})

definePageMeta({
    layout: 'user',
    middleware: 'auth'
})

// ✅ Populate form when profile loads
watch(profile, (p) => {
  if (p) {
    form.value.name = p.name || ''
    form.value.email = p.email || ''
    form.value.phone = p.phone || ''
  }
}, { immediate: true })

const handleUpdateProfile = async () => {
  error.value = null
  successMessage.value = null
  try {
    await updateProfile(form.value)
    successMessage.value = 'Profile updated successfully!'
    setTimeout(() => successMessage.value = null, 3000)
  } catch (err: any) {
    error.value = err.message || 'Failed to update profile'
  }
}

// const handleLogout = () => {
//   router.push('/login')
// }

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
