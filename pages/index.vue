<template>
  <div>
    <NuxtLayout name="auth">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-[#0C111D] mb-2">Sign In</h2>
        <p class="text-[#525866]">Continue to your horizon homes account</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-[#0C111D] mb-2">Email Address</label>
          <input 
            v-model="email"
            type="email" 
            placeholder="Placeholder text..."
            class="custom-input"
            :class="{ 'border-red-500': emailError }"
            required
          />
          <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-[#0C111D] mb-2">Password</label>
          <div class="relative">
            <input 
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••••"
             class="custom-input"
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
          class="w-full text-sm bg-[#2970FF] text-white py-3 px-4 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
      <div v-if="isLoading" class="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <div class="text-center">
          <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-[#525866]">Loading...</p>
          <p class="text-sm text-gray-500">Wait for a moment</p>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { Home, Eye, EyeOff } from 'lucide-vue-next'

definePageMeta({
  layout: false
})

const { login, isLoading } = useAuth()
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