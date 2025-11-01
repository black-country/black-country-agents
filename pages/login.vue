<template>
    <div class="">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#e8e8e8" viewBox="0 0 256 256"><path d="M91.82,60H92a12,12,0,0,0,0-24H60A44.05,44.05,0,0,0,16,80v8a12,12,0,0,0,12,12H48A44.06,44.06,0,0,0,91.82,60ZM48,76H40.4A20,20,0,0,1,60,60h7.6A20,20,0,0,1,48,76Zm176,3v1a44.05,44.05,0,0,1-44,44H140v72h8a12,12,0,0,0,12-12,11.87,11.87,0,0,0-4-8.95,12,12,0,1,1,16-17.88A36,36,0,0,1,148,220h-8v12a12,12,0,0,1-24,0V220H92a12,12,0,0,1,0-24h24V124H100a12,12,0,0,0-4,23.32A12,12,0,1,1,88,170,36,36,0,0,1,100,100h16V24a12,12,0,0,1,24,0v76h40a20,20,0,0,0,20-20V79a19.05,19.05,0,0,0-19-19H164a12,12,0,0,1,0-24h17a43.05,43.05,0,0,1,43,43Z"></path></svg>
          <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg> -->
        </div>
        <h1 class="text-xl font-semibold text-gray-900 mb-2">Welcome Back</h1>
        <p class="text-gray-600">Sign in to your account</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">


        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div class="relative">
            <!-- <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div class="relative">
            <!-- <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div> -->
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              required
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
        </div>

        <!-- Forgot Password Link -->
        <div class="flex items-center justify-between">
          <!-- <label class="flex items-center">
            <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
            <span class="ml-2 text-sm text-gray-600">Remember me</span>
          </label> -->
          <router-link to="/forgot-password" class="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Forgot password?
          </router-link>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-blue-600 text-white text-sm rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span v-if="loading">Signing in...</span>
          <span v-else>Sign In</span>
        </button>
      </form>

      <!-- Register Link -->
      <div class="mt-6 text-center">
        <p class="text-gray-600 text-sm">
          Don't have an account?
          <router-link to="/register" class="text-blue-600 font-semibold hover:text-blue-700 transition">
            Sign Up
          </router-link>
        </p>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLogin } from '@/composables/modules/auth/useLogin'

const { login, loading, form } = useLogin()

definePageMeta({
  layout: 'auth'
})

const showPassword = ref(false)

const handleLogin = async () => {
    await login(form.value)
}
</script>