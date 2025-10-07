<template>
  <div>
    <NuxtLayout name="auth">
      <div v-if="currentStep === 1">
        <div class="text-center mb-8">
          <h2 class="text-xl font-bold text-[#0C111D] mb-2">Forgot Password</h2>
          <p class="text-[#525866] text-sm">Enter your email to receive a verification code</p>
        </div>

        <form @submit.prevent="handleForgotPassword" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-[#0C111D] mb-2">Email Address</label>
            <input 
              v-model="email"
              type="email" 
              placeholder="Enter Email Address"
              class="custom-input"
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
            :disabled="loading"
            class="w-full bg-[#2970FF] text-white py-3 text-sm px-4 rounded-xl font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Sending...' : 'Continue' }}
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

      <div v-if="currentStep === 2">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-6">
            <div class="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          
          <h2 class="text-xl font-bold text-[#0C111D] mb-2">Email Sent</h2>
          <p class="text-[#525866] text-sm mb-4">A verification code has been sent to</p>
          <p class="font-medium text-[#0C111D] mb-8">{{ email }}</p>
        </div>

        <div class="mb-8">
          <div class="flex justify-center space-x-3 mb-6">
            <input 
              v-for="(digit, index) in verificationCode" 
              :key="index"
              v-model="verificationCode[index]"
              type="text" 
              maxlength="1"
              class="w-16 h-16 text-center text-2xl font-bold border-[0.5px] border-[#E2E4E9] rounded-2xl focus:border focus:border-[#2970FF] outline-none transition-all duration-200"
              @input="handleCodeInput($event, index)"
              @keydown="handleKeyDown($event, index)"
            />
          </div>

          <div v-if="verifyError" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p class="text-red-600 text-sm">{{ verifyError }}</p>
          </div>
          
          <div class="text-center">
            <button 
              @click="handleVerifyCode"
              :disabled="verifyLoading || verificationCode.join('').length !== 6"
              class="w-full bg-[#2970FF] text-white py-3 px-4 text-sm rounded-xl font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {{ verifyLoading ? 'Verifying...' : 'Verify Email' }}
            </button>
            
            <p class="text-sm text-[#525866] mb-6">
              Didn't receive the code? 
              <button 
                @click="resendCode" 
                :disabled="loading"
                class="text-blue-600 hover:text-blue-700 disabled:opacity-50"
              >
                {{ loading ? 'Sending...' : 'Resend Code' }}
              </button>
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

      <div v-if="currentStep === 3">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-6">
            <div class="rounded-full flex items-center justify-center">
             <img src="@/assets/img/password-reset.png"  class="h-[150px] w-[145px]" />
            </div>
          </div>
          
          <h2 class="text-xl font-bold text-[#0C111D] mb-2">New Password</h2>
          <p class="text-[#525866] text-sm">Create a strong password for your account</p>
        </div>

        <form @submit.prevent="handleResetPassword" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-[#0C111D] mb-2">New Password</label>
            <div class="relative">
              <input 
                v-model="newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                placeholder="••••••••••"
                class="custom-input"
                :class="{ 'border-red-500': passwordErrors.length > 0 }"
                required
              />
              <button 
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg v-if="!showNewPassword" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
            
            <div class="mt-3">
              <div class="flex space-x-1 mb-2">
                <div 
                  class="flex-1 h-1 rounded-full transition-colors"
                  :class="passwordStrength >= 1 ? 'bg-red-500' : 'bg-gray-200'"
                ></div>
                <div 
                  class="flex-1 h-1 rounded-full transition-colors"
                  :class="passwordStrength >= 2 ? 'bg-yellow-500' : 'bg-gray-200'"
                ></div>
                <div 
                  class="flex-1 h-1 rounded-full transition-colors"
                  :class="passwordStrength >= 3 ? 'bg-green-500' : 'bg-gray-200'"
                ></div>
              </div>
              
              <p class="text-sm text-[#525866] mb-3">
                {{ passwordStrength === 0 ? 'Weak password. Must contain at least:' : 
                    passwordStrength === 1 ? 'Weak password. Must contain at least:' :
                    passwordStrength === 2 ? 'Medium strength password' :
                    'Strong password' }}
              </p>
              
              <div class="space-y-2">
                <div class="flex items-center text-sm"> 
                  <svg v-if="passwordValidation.hasUppercase" class="mr-2 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4018 10.4L11.6438 6.1574L10.7954 5.309L7.4018 8.7032L5.7044 7.0058L4.856 7.8542L7.4018 10.4Z" fill="#38C793"/>
                  </svg>
                  <svg v-else class="mr-2 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8 7.1516L6.3032 5.4542L5.4542 6.3032L7.1516 8L5.4542 9.6968L6.3032 10.5458L8 8.8484L9.6968 10.5458L10.5458 9.6968L8.8484 8L10.5458 6.3032L9.6968 5.4542L8 7.1516Z" fill="#868C98"/>
                  </svg>
                  <span :class="passwordValidation.hasUppercase ? 'text-green-700' : 'text-[#525866]'">
                    At least 1 uppercase
                  </span>
                </div>
                
                <div class="flex items-center text-sm">
                  <svg v-if="passwordValidation.hasNumber" class="mr-2 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4018 10.4L11.6438 6.1574L10.7954 5.309L7.4018 8.7032L5.7044 7.0058L4.856 7.8542L7.4018 10.4Z" fill="#38C793"/>
                  </svg>
                  <svg v-else class="mr-2 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8 7.1516L6.3032 5.4542L5.4542 6.3032L7.1516 8L5.4542 9.6968L6.3032 10.5458L8 8.8484L9.6968 10.5458L10.5458 9.6968L8.8484 8L10.5458 6.3032L9.6968 5.4542L8 7.1516Z" fill="#868C98"/>
                  </svg>
                  <span :class="passwordValidation.hasNumber ? 'text-green-700' : 'text-[#525866]'">
                    At least 1 number
                  </span>
                </div>
                
                <div class="flex items-center text-sm">
                  <svg v-if="passwordValidation.hasMinLength" class="mr-2 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4018 10.4L11.6438 6.1574L10.7954 5.309L7.4018 8.7032L5.7044 7.0058L4.856 7.8542L7.4018 10.4Z" fill="#38C793"/>
                  </svg>
                  <svg v-else class="mr-2 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8 7.1516L6.3032 5.4542L5.4542 6.3032L7.1516 8L5.4542 9.6968L6.3032 10.5458L8 8.8484L9.6968 10.5458L10.5458 9.6968L8.8484 8L10.5458 6.3032L9.6968 5.4542L8 7.1516Z" fill="#868C98"/>
                  </svg>
                  <span :class="passwordValidation.hasMinLength ? 'text-green-700' : 'text-[#525866]'">
                    At least 8 characters
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-[#0C111D] mb-2">Confirm New Password</label>
            <div class="relative">
              <input 
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="••••••••••"
                class="custom-input"
                :class="{ 'border-red-500': confirmPasswordError }"
                required
              />
              <button 
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg v-if="!showConfirmPassword" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
            <p v-if="confirmPasswordError" class="text-red-500 text-sm mt-1">{{ confirmPasswordError }}</p>
          </div>

          <div v-if="resetError" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <p class="text-red-600 text-sm">{{ resetError }}</p>
          </div>

          <button 
            type="submit"
            :disabled="resetLoading || !passwordValidation.isValid || !!confirmPasswordError"
            class="w-full bg-[#2970FF] text-white py-3 text-sm px-4 rounded-xl font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ resetLoading ? 'Saving Password...' : 'Save Password' }}
          </button>
        </form>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useForgotPassword } from "@/composables/modules/auth/useForgotPassword"
import { useVerifyOtpPasswordReset } from "@/composables/modules/auth/useVerifyOtpPasswordReset"
import { useResetPassword } from "@/composables/modules/auth/useResetPassword"

const email = ref('')
const emailError = ref('')
const forgotPasswordError = ref('')
const verificationCode = ref(['', '', '', '', '', ''])
const verifyError = ref('')
const verifiedOtp = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const resetError = ref('')

const { loading, forgotPassword } = useForgotPassword()
const { loading: verifyLoading, verifyOtpPasswordReset } = useVerifyOtpPasswordReset()
const { loading: resetLoading, resetPassword } = useResetPassword()

definePageMeta({
  layout: false
})

// Password validation
const passwordValidation = computed(() => {
  const hasMinLength = newPassword.value.length >= 8
  const hasUppercase = /[A-Z]/.test(newPassword.value)
  const hasNumber = /\d/.test(newPassword.value)
  
  return {
    hasMinLength,
    hasUppercase,
    hasNumber,
    isValid: hasMinLength && hasUppercase && hasNumber
  }
})

const passwordStrength = computed(() => {
  const validation = passwordValidation.value
  let strength = 0
  if (validation.hasMinLength) strength++
  if (validation.hasUppercase) strength++
  if (validation.hasNumber) strength++
  return strength
})

const passwordErrors = computed(() => {
  const errors = []
  const validation = passwordValidation.value
  
  if (newPassword.value && !validation.hasMinLength) {
    errors.push('Password must be at least 8 characters long')
  }
  if (newPassword.value && !validation.hasUppercase) {
    errors.push('Password must contain at least 1 uppercase letter')
  }
  if (newPassword.value && !validation.hasNumber) {
    errors.push('Password must contain at least 1 number')
  }
  
  return errors
})

const confirmPasswordError = computed(() => {
  if (confirmPassword.value && newPassword.value !== confirmPassword.value) {
    return 'Passwords do not match'
  }
  return ''
})

// Step management
const currentStep = ref(3)

// Step 1: Handle forgot password
const handleForgotPassword = async () => {
  emailError.value = ''
  forgotPasswordError.value = ''

  if (!email.value) {
    emailError.value = 'Email is required'
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    emailError.value = 'Please enter a valid email address'
    return
  }

  const payload = {
    email: email.value,
    app: 'customer'
  }

  const result = await forgotPassword(payload)
  
  if (result?.success) {
    currentStep.value = 2
    verificationCode.value = ['', '', '', '', '', '']
  } else {
    forgotPasswordError.value = result?.error || 'Failed to send reset email. Please try again.'
  }
}

// Step 2: Handle OTP input
const handleCodeInput = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  
  if (value && !/^\d$/.test(value)) {
    verificationCode.value[index] = ''
    return
  }
  
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

// Step 2: Handle OTP verification
const handleVerifyCode = async () => {
  verifyError.value = ''
  
  const code = verificationCode.value.join('')
  
  if (code.length !== 6) {
    verifyError.value = 'Please enter the complete 6-digit code'
    return
  }

  const payload = {
    email: email.value,
    otp: code,
    type: 'password_reset',
    app: 'customer'
  }

  const result = await verifyOtpPasswordReset(payload)
  
  if (result?.success) {
    verifiedOtp.value = code
    currentStep.value = 3
  } else {
    verifyError.value = result?.error || 'Invalid verification code. Please try again.'
    verificationCode.value = ['', '', '', '', '', '']
  }
}

const resendCode = async () => {
  verificationCode.value = ['', '', '', '', '', '']
  verifyError.value = ''
  await handleForgotPassword()
}

// Step 3: Handle password reset
const handleResetPassword = async () => {
  resetError.value = ''

  if (!passwordValidation.value.isValid) {
    resetError.value = 'Please ensure your password meets all requirements'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    resetError.value = 'Passwords do not match'
    return
  }

  const payload = {
    email: email.value,
    otp: verifiedOtp.value,
    newPassword: newPassword.value,
    app: 'customer'
  }

  const result = await resetPassword(payload)
  
  if (result?.success) {
    await navigateTo('/auth/login')
  } else {
    resetError.value = result?.error || 'Password reset failed. Please try again.'
  }
}
</script>
