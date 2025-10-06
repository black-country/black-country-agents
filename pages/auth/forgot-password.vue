<template>
  <div>
    <NuxtLayout name="auth">
      <div v-if="!emailSent">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Forgot Password</h2>
          <p class="text-[#525866]">Continue to your horizon homes account</p>
        </div>

        <form @submit.prevent="handleForgotPassword" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
            <input 
              v-model="email"
              type="email" 
              placeholder="Enter Email Address"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': emailError }"
              required
            />
            <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
          </div>

          <div v-if="forgotPasswordError" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <p class="text-red-600 text-sm">{{ forgotPasswordError }}</p>
          </div>

          <button 
            type="submit"
            :disabled="isLoading"
            class="w-full bg-[#2970FF] text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Sending...' : 'Continue' }}
          </button>

          <div class="text-center">
            <NuxtLink 
              to="/auth/login"
              class="text-blue-600 hover:text-blue-700 text-sm"
            >
              Back to Login
            </NuxtLink>
          </div>
        </form>
      </div>

      <div v-else>
        <div class="text-center mb-8">
          <!-- Email icon illustration -->
          <div class="flex justify-center mb-6">
            <img src="@/assets/img/email-sent-illustration.png" class="h-[150px] w-[200px]" />
          </div>
          
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Email Sent</h2>
          <p class="text-[#525866] mb-4">A verification code has been sent to</p>
          <p class="font-medium text-gray-900 mb-8">{{ email }}</p>
        </div>

        <!-- Verification Code Input -->
        <div class="mb-8">
          <div class="flex justify-center space-x-3 mb-6">
            <input 
              v-for="(digit, index) in verificationCode" 
              :key="index"
              v-model="verificationCode[index]"
              type="text" 
              maxlength="1"
              class="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @input="handleCodeInput($event, index)"
              @keydown="handleKeyDown($event, index)"
            />
          </div>
          
          <div class="text-center">
            <button 
              @click="handleVerifyCode"
              :disabled="isLoading || verificationCode.join('').length !== 6"
              class="w-full bg-[#2970FF] text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {{ isLoading ? 'Verifying...' : 'Verify Email' }}
            </button>
            
            <p class="text-sm text-[#525866] mb-6">
              Didn't receive the code? 
              <button @click="resendCode" class="text-blue-600 hover:text-blue-700">Resend Code</button>
            </p>

            <NuxtLink 
              to="/auth/login"
              class="text-blue-600 hover:text-blue-700 text-sm"
            >
              Back to Login
            </NuxtLink>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { Home, Mail } from 'lucide-vue-next'

definePageMeta({
  layout: false
})

const { forgotPassword, verifyEmail, isLoading } = useAuth()
const { validateEmail, validateRequired } = useValidation()

const email = ref('')
const emailError = ref('')
const forgotPasswordError = ref('')
const emailSent = ref(false)
const verificationCode = ref(['', '', '', '', '', ''])

const handleForgotPassword = async () => {
  emailError.value = ''
  forgotPasswordError.value = ''

  if (!validateRequired(email.value)) {
    emailError.value = 'Email is required'
    return
  }

  if (!validateEmail(email.value)) {
    emailError.value = 'Please enter a valid email address'
    return
  }

  const result = await forgotPassword(email.value)
  
  if (result.success) {
    emailSent.value = true
  } else {
    forgotPasswordError.value = result.error || 'Failed to send reset email'
  }
}

const handleCodeInput = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  
  if (value && index < 5) {
    const nextInput = target.parentElement?.children[index + 1] as HTMLInputElement
    nextInput?.focus()
  }
}

const handleKeyDown = (event: KeyboardEvent, index: number) => {
  if (event.key === 'Backspace' && !verificationCode.value[index] && index > 0) {
    const prevInput = (event.target as HTMLInputElement).parentElement?.children[index - 1] as HTMLInputElement
    prevInput?.focus()
  }
}

const handleVerifyCode = async () => {
  const code = verificationCode.value.join('')
  const result = await verifyEmail(code)
  
  if (result.success) {
    await navigateTo('/auth/reset-password')
  }
}

const resendCode = async () => {
  await handleForgotPassword()
}
</script>