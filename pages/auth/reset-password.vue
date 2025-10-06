<template>
  <div>
    <NuxtLayout name="auth">
      <div class="text-center mb-8">
        <!-- Password icon illustration -->
        <div class="flex justify-center mb-6">
         <img src="@/assets/img/password-update.png" class="h-32 w-32" />
        </div>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-2">New Password</h2>
        <p class="text-[#525866]">Continue to your horizon homes account</p>
      </div>

      <form @submit.prevent="handleResetPassword" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2">New Password</label>
          <div class="relative">
            <input 
              v-model="newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              placeholder="••••••••••"
              class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': passwordErrors.length > 0 }"
              required
            />
            <button 
              type="button"
              @click="showNewPassword = !showNewPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <Eye v-if="!showNewPassword" class="w-5 h-5 text-gray-400" />
              <EyeOff v-else class="w-5 h-5 text-gray-400" />
            </button>
          </div>
          
          <!-- Password strength indicator -->
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
                <svg v-if="passwordValidation.hasUppercase" class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4018 10.4L11.6438 6.1574L10.7954 5.309L7.4018 8.7032L5.7044 7.0058L4.856 7.8542L7.4018 10.4Z" fill="#38C793"/>
</svg>

                <!-- <svg class="mr-2" v-if="passwordValidation.hasUppercase" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8 7.1516L6.3032 5.4542L5.4542 6.3032L7.1516 8L5.4542 9.6968L6.3032 10.5458L8 8.8484L9.6968 10.5458L10.5458 9.6968L8.8484 8L10.5458 6.3032L9.6968 5.4542L8 7.1516Z" fill="#868C98"/>
</svg> -->

                <!-- <CheckCircle v-if="passwordValidation.hasUppercase" class="w-4 h-4 text-green-500 mr-2" /> -->
                <!-- <Circle v-else class="w-4 h-4 text-gray-400 mr-2" /> -->
                 <svg class="mr-2" v-else width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8 7.1516L6.3032 5.4542L5.4542 6.3032L7.1516 8L5.4542 9.6968L6.3032 10.5458L8 8.8484L9.6968 10.5458L10.5458 9.6968L8.8484 8L10.5458 6.3032L9.6968 5.4542L8 7.1516Z" fill="#868C98"/>
</svg>

                <span :class="passwordValidation.hasUppercase ? 'text-green-700' : 'text-[#525866]'">
                  At least 1 uppercase
                </span>
              </div>
              
              <div class="flex items-center text-sm">
                                <svg v-if="passwordValidation.hasNumber" class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4018 10.4L11.6438 6.1574L10.7954 5.309L7.4018 8.7032L5.7044 7.0058L4.856 7.8542L7.4018 10.4Z" fill="#38C793"/>
</svg>
                                <!-- <svg class="mr-2"  v-if="passwordValidation.hasNumber" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8 7.1516L6.3032 5.4542L5.4542 6.3032L7.1516 8L5.4542 9.6968L6.3032 10.5458L8 8.8484L9.6968 10.5458L10.5458 9.6968L8.8484 8L10.5458 6.3032L9.6968 5.4542L8 7.1516Z" fill="#868C98"/>
</svg> -->
                <!-- <CheckCircle v-if="passwordValidation.hasNumber" class="w-4 h-4 text-green-500 mr-2" /> -->
                <!-- <Circle v-else class="w-4 h-4 text-gray-400 mr-2" /> -->
                 <svg class="mr-2" v-else width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8 7.1516L6.3032 5.4542L5.4542 6.3032L7.1516 8L5.4542 9.6968L6.3032 10.5458L8 8.8484L9.6968 10.5458L10.5458 9.6968L8.8484 8L10.5458 6.3032L9.6968 5.4542L8 7.1516Z" fill="#868C98"/>
</svg>

                <span :class="passwordValidation.hasNumber ? 'text-green-700' : 'text-[#525866]'">
                  At least 1 number
                </span>
              </div>
              
              <div class="flex items-center text-sm">
                                                <svg v-if="passwordValidation.hasMinLength" class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4018 10.4L11.6438 6.1574L10.7954 5.309L7.4018 8.7032L5.7044 7.0058L4.856 7.8542L7.4018 10.4Z" fill="#38C793"/>
</svg>
                                                <!-- <svg class="mr-2"  v-if="passwordValidation.hasMinLength" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8 7.1516L6.3032 5.4542L5.4542 6.3032L7.1516 8L5.4542 9.6968L6.3032 10.5458L8 8.8484L9.6968 10.5458L10.5458 9.6968L8.8484 8L10.5458 6.3032L9.6968 5.4542L8 7.1516Z" fill="#868C98"/>
</svg> -->
                <!-- <CheckCircle v-if="passwordValidation.hasMinLength" class="w-4 h-4 text-green-500 mr-2" /> -->
                <!-- <Circle v-else class="w-4 h-4 text-gray-400 mr-2" /> -->
                 <svg class="mr-2" v-else width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <label class="block text-sm font-medium text-gray-900 mb-2">Confirm New Password</label>
          <div class="relative">
            <input 
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="••••••••••"
              class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': confirmPasswordError }"
              required
            />
            <button 
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <Eye v-if="!showConfirmPassword" class="w-5 h-5 text-gray-400" />
              <EyeOff v-else class="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <p v-if="confirmPasswordError" class="text-red-500 text-sm mt-1">{{ confirmPasswordError }}</p>
        </div>

        <div v-if="resetError" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-red-600 text-sm">{{ resetError }}</p>
        </div>

        <button 
          type="submit"
          :disabled="isLoading || !passwordValidation.isValid || !!confirmPasswordError"
          class="w-full bg-[#2970FF] text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {{ isLoading ? 'Saving Password...' : 'Save Password' }}
        </button>
      </form>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { Home, Lock, Eye, EyeOff, CheckCircle, Circle } from 'lucide-vue-next'

definePageMeta({
  layout: false
})

const { resetPassword, isLoading } = useAuth()
const { validatePassword } = useValidation()

const newPassword = ref('')
const confirmPassword = ref('')
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const resetError = ref('')

const passwordValidation = computed(() => validatePassword(newPassword.value))
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

  const result = await resetPassword(newPassword.value, confirmPassword.value)
  
  if (result.success) {
    await navigateTo('/auth/login')
  } else {
    resetError.value = result.error || 'Password reset failed'
  }
}
</script>