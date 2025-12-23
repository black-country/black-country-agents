<template>
  <div class="">
    <!-- Logo/Brand -->
    <div class="text-center mb-8">
      <div
        class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full mb-4 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      </div>
      <h1 class="text-xl font-bold text-gray-900 mb-2">Create Your Account</h1>
      <p class="text-gray-600">Join thousands of patients booking with ease</p>
    </div>

    <div class="space-y-5">
      <!-- Full Name -->
      <div class="transform transition-all duration-200 focus-within:scale-[1.02]">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <input v-model="form.name" type="text" :class="[
          'custom-input',
          errors.name ? 'border-red-300' : 'border-gray-300'
        ]" placeholder="John Doe" />
        <p v-if="errors.name" class="text-red-600 text-xs mt-1">{{ errors.name }}</p>
      </div>

      <!-- Email -->
      <div class="transform transition-all duration-200 focus-within:scale-[1.02]">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input v-model="form.email" type="email" :class="[
          'custom-input',
          errors.email ? 'border-red-300' : 'border-gray-300'
        ]" placeholder="you@example.com" />
        <p v-if="errors.email" class="text-red-600 text-xs mt-1">{{ errors.email }}</p>
      </div>

      <!-- Phone Number -->
      <div class="relative z-[50]">
        <PhoneNumberInput 
          v-model="form.phone"
          v-model:country-code="form.phoneCountryCode" 
          placeholder="801 234 5678"
          :countries="countriesWithDialingCode"
          :has-error="!!errors.phone"
          @phone-complete="handlePhoneComplete"
          @validation-error="handlePhoneValidationError"
        />
        <!-- <p v-if="errors.phone" class="text-red-600 text-xs mt-1">{{ errors.phone }}</p> -->
      </div>

      <!-- Password -->
      <div class="transform transition-all duration-200 focus-within:scale-[1.02]">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div class="relative">
          <input v-model="form.password" :type="showPassword ? 'text' : 'password'" minlength="8" :class="[
            'custom-input',
            errors.password ? 'border-red-300' : 'border-gray-300'
          ]" placeholder="••••••••" />
          <button type="button" @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition">
            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          </button>
        </div>
        <p v-if="errors.password" class="text-red-600 text-xs mt-1">{{ errors.password }}</p>
        <p v-else class="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
      </div>

      <!-- Terms & Conditions -->
      <div>
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input id="terms" v-model="acceptedTerms" type="checkbox"
              class="w-4 h-4 border-gray-300 rounded text-gray-600 focus:ring-gray-500 cursor-pointer" />
          </div>
          <label for="terms" class="ml-3 text-sm text-gray-600 cursor-pointer">
            I agree to the
            <NuxtLink to="#" class="text-gray-600 hover:text-gray-700 font-medium">Terms of Service</NuxtLink>
            and
            <NuxtLink to="#" class="text-gray-600 hover:text-gray-700 font-medium">Privacy Policy</NuxtLink>
          </label>
        </div>
        <p v-if="errors.terms" class="text-red-600 text-xs mt-1">{{ errors.terms }}</p>
      </div>

      <!-- Submit Button -->
      <button type="button" @click="handleRegister" :disabled="loading"
        class="w-full py-3 bg-gradient-to-r text-sm from-gray-600 to-gray-700 text-white rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]">
        <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
        <span v-if="loading">Creating Account...</span>
        <template v-else>
          <span>Create Account</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </template>
      </button>
    </div>

    <!-- Login Link -->
    <div class="mt-8 text-center">
      <p class="text-gray-600 text-sm">
        Already have an account?
        <NuxtLink to="/login" class="text-gray-600 font-semibold hover:text-gray-700 transition">
          Sign In
        </NuxtLink>
      </p>
    </div>

    <!-- Social Proof -->
    <div class="mt-8 pt-6 border-t-[0.5px] border-gray-100">
      <div class="flex items-center justify-center gap-6 text-sm text-gray-500">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd" />
          </svg>
          <span>Secure signup</span>
        </div>
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd" />
          </svg>
          <span>Free forever</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRegister } from '@/composables/modules/auth/useRegister'
import { countries as countriesWithDialingCode } from '~/utils/countriesWithDialingCode'
definePageMeta({
  layout: "auth"
})

interface PhoneCompleteData {
  phoneNumber: string
  countryCode: string
  dialCode: string
  fullNumber: string
}

interface FormData {
  name: string
  email: string
  phoneCountryCode: string
  phone: string
  phoneDetails: PhoneCompleteData | null
  password: string
}

interface Errors {
  name?: string
  email?: string
  phone?: string
  password?: string
  terms?: string
}

const { register, loading } = useRegister()

const form = ref<FormData>({
  name: '',
  email: '',
  phoneCountryCode: '+234',
  phone: '',
  phoneDetails: null,
  password: ''
})

const showPassword = ref(false)
const acceptedTerms = ref(false)
const errors = ref<Errors>({})

// Handle phone number completion
const handlePhoneComplete = (data: PhoneCompleteData) => {
  form.value.phoneDetails = data
  form.value.phone = data.phoneNumber
  // Clear phone error when valid phone is entered
  if (errors.value.phone) {
    errors.value.phone = ''
  }
}

// Handle phone validation errors
const handlePhoneValidationError = (error: string | null) => {
  if (error) {
    errors.value.phone = error
  } else {
    delete errors.value.phone
  }
}

// Validate form
const validateForm = (): boolean => {
  const newErrors: Errors = {}

  if (!form.value.name.trim()) {
    newErrors.name = 'Full name is required'
  }

  if (!form.value.email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    newErrors.email = 'Invalid email address'
  }

  if (!form.value.phone) {
    newErrors.phone = 'Phone number is required'
  } else if (!form.value.phoneDetails) {
    newErrors.phone = 'Please enter a valid phone number'
  }

  if (!form.value.password) {
    newErrors.password = 'Password is required'
  } else if (form.value.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters'
  }

  if (!acceptedTerms.value) {
    newErrors.terms = 'You must accept the terms and conditions'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

// Handle registration
const handleRegister = async () => {
  if (!validateForm()) {
    return
  }

  // Prepare the registration data with the full phone number
  const registrationData = {
    name: form.value.name,
    email: form.value.email,
    phone: form.value.phoneDetails?.fullNumber || '',
    password: form.value.password
  }

  console.log('Registration data:', registrationData)

  // Call your register composable
  await register(registrationData)
}
</script>

<style scoped>
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>