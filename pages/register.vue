<template>
    <div class="">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full mb-4 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h1 class="text-xl font-bold text-gray-900 mb-2">Create Your Account</h1>
        <p class="text-gray-600">Join thousands of patients booking with ease</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-5">
        <!-- Full Name -->
        <div class="transform transition-all duration-200 focus-within:scale-[1.02]">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <div class="relative group">
            <!-- <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-focus-within:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div> -->
            <input
              v-model="form.name"
              type="text"
              required
              class="custom-input"
              placeholder="John Doe"
            />
          </div>
        </div>

        <!-- Email -->
        <div class="transform transition-all duration-200 focus-within:scale-[1.02]">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div class="relative group">
            <!-- <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-focus-within:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div> -->
            <input
              v-model="form.email"
              type="email"
              required
              class="custom-input"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <!-- Phone Number -->
        <div class="transform transition-all duration-200 focus-within:scale-[1.02]">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div class="relative group">
            <!-- <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-focus-within:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div> -->
            <input
              v-model="form.phone"
              type="tel"
              required
              class="custom-input"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <!-- Password -->
        <div class="transform transition-all duration-200 focus-within:scale-[1.02]">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div class="relative group">
            <!-- <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-focus-within:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div> -->
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              required
              minlength="8"
              class="custom-input"
              placeholder="••••••••"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
            >
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
        </div>

        <!-- Terms & Conditions -->
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input
              id="terms"
              v-model="acceptedTerms"
              type="checkbox"
              required
              class="custom-checkbox"
            />
          </div>
          <label for="terms" class="ml-3 text-sm text-gray-600">
            I agree to the
            <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">Terms of Service</a>
            and
            <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</a>
          </label>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading || !acceptedTerms"
          class="w-full py-3 bg-gradient-to-r text-sm from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span v-if="loading">Creating Account...</span>
          <span v-else class="flex items-center gap-2">
            Create Account
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>
      </form>

      <!-- Login Link -->
      <div class="mt-8 text-center">
        <p class="text-gray-600 text-sm">
          Already have an account?
          <router-link to="/login" class="text-blue-600 font-semibold hover:text-blue-700 transition">
            Sign In
          </router-link>
        </p>
      </div>

      <!-- Social Proof -->
      <div class="mt-8 pt-6 border-t-[0.5px] border-gray-100">
        <div class="flex items-center justify-center gap-6 text-sm text-gray-500">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>Secure signup</span>
          </div>
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>Free forever</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRegister } from '@/composables/modules/auth/useRegister'
const { register, loading,form } = useRegister()

definePageMeta({
  layout: "auth"
})

const showPassword = ref(false)
const acceptedTerms = ref(false)

const handleRegister = async () => {
    await register(form.value)
}
</script>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>