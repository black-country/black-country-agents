<template>
  <div class="">
    <div class="w-full max-w-md">
      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <!-- Header Section -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-8 pt-8 pb-6 text-center">
          <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-white mb-2">Forgot Password?</h1>
          <p class="text-blue-100 text-sm">No worries, we'll send you reset instructions</p>
        </div>

        <!-- Form Section -->
        <div class="px-8 py-8">
          <form @submit.prevent="handleForgotPassword" class="space-y-5">
            <!-- Success Message -->
            <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-xl p-4">
              <div class="flex gap-3">
                <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <div>
                  <p class="text-sm font-medium text-green-800">Email sent successfully!</p>
                  <p class="text-sm text-green-700 mt-1">{{ successMessage }}</p>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4">
              <div class="flex gap-3">
                <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                <p class="text-sm font-medium text-red-800">{{ error }}</p>
              </div>
            </div>

            <!-- Email Input -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div class="relative">
                <!-- <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div> -->
                <input
                  v-model="email"
                  type="email"
                  required
                  :disabled="loading"
                  class="custom-input disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3.5 bg-gradient-to-r text-sm from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg v-if="loading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-if="loading">Sending...</span>
              <span v-else>Send Reset Link</span>
            </button>
          </form>

          <!-- Back to Login -->
          <div class="mt-8 pt-6 border-t-[0.5px] border-gray-50">
            <div class="flex items-center justify-center gap-2 text-sm">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span class="text-gray-600">Remember your password?</span>
              <NuxtLink 
                to="/login" 
                class="text-blue-600 font-semibold hover:text-blue-700 transition"
              >
                Sign In
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Help Text -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-500">
          Didn't receive the email? Check your spam folder or
          <button 
            @click="handleForgotPassword" 
            :disabled="loading || !email"
            class="text-blue-600 font-medium hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            try again
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { definePageMeta } from '#imports'
import { useForgotPassword } from '@/composables/modules/auth/useForgotPassword'

const { forgotPassword, loading, error: authError } = useForgotPassword()

definePageMeta({
  layout: 'auth',
})

const email = ref('')
const error = ref<string | null>(null)
const successMessage = ref<string | null>(null)

const handleForgotPassword = async () => {
  if (!email.value.trim()) {
    error.value = 'Please enter your email address'
    return
  }

  error.value = null
  successMessage.value = null
  
  try {
    await forgotPassword(email.value)
    successMessage.value = 'Check your email for password reset instructions.'
    
    // Auto-clear success message after 5 seconds
    setTimeout(() => {
      successMessage.value = null
    }, 5000)
  } catch (err: any) {
    error.value = authError.value || 'Failed to send reset link. Please try again.'
  }
}
</script>