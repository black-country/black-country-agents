<template>
  <div>
    <NuxtLayout name="auth">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
        <p class="text-[#525866]">Continue to your horizon homes account</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
          <input 
            v-model="email"
            type="email" 
            placeholder="Placeholder text..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :class="{ 'border-red-500': emailError }"
            required
          />
          <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2">Password</label>
          <div class="relative">
            <input 
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••••"
              class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': passwordError }"
              required
            />
            <button 
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <Eye v-if="!showPassword" class="w-5 h-5 text-gray-400" />
              <EyeOff v-else class="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
        </div>

        <div v-if="loginError" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-red-600 text-sm">{{ loginError }}</p>
        </div>

        <button 
          type="submit"
          :disabled="isLoading"
          class="w-full bg-[#2970FF] text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {{ isLoading ? 'Signing In...' : 'Sign In' }}
        </button>

        <div class="text-center">
          <NuxtLink 
            to="/auth/forgot-password"
            class="text-blue-600 hover:text-blue-700 text-sm"
          >
            Forgot Password ?
          </NuxtLink>
        </div>
      </form>

      <!-- Loading overlay -->
       <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center z-50">
          <!-- Background overlay -->
          <div class="absolute inset-0 bg-blue-900 opacity-80"></div>

          <!-- Content above background -->
          <div class="relative text-center z-10">
            <div class="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-white text-lg font-semibold">Loading...</p>
            <p class="text-sm text-white">Wait for a moment</p>
          </div>
        </div>

      <!-- <div v-if="true" class="fixed inset-0 bg-blue-400 bg-opacity-75 flex items-center justify-center z-50">
        <div class="text-center">
          <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-white">Loading...</p>
          <p class="text-sm text-white">Wait for a moment</p>
        </div>
      </div> -->
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { Home, Eye, EyeOff } from 'lucide-vue-next'
import { useLogin } from "@/composables/modules/auth/useLogin"
const { loading, login } = useLogin()
definePageMeta({
  layout: false
})

// const { login, isLoading } = useAuth()
const { validateEmail, validateRequired } = useValidation()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const emailError = ref('')
const passwordError = ref('')
const loginError = ref('')

const handleLogin = async () => {
  // Reset errors
  emailError.value = ''
  passwordError.value = ''
  loginError.value = ''

  // Validate inputs
  if (!validateRequired(email.value)) {
    emailError.value = 'Email is required'
    return
  }

  if (!validateEmail(email.value)) {
    emailError.value = 'Please enter a valid email address'
    return
  }

  if (!validateRequired(password.value)) {
    passwordError.value = 'Password is required'
    return
  }

  const result = await login(email.value, password.value)
  
  if (!result.success) {
    loginError.value = result.error || 'Login failed'
  }
}
</script>