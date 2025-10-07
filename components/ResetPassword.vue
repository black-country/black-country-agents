<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold text-[#0C111D] mb-6">Reset Password</h2>
    
    <div class="max-w-md space-y-6">
      <!-- Old Password -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Old Password
        </label>
        <input
          v-model="form.oldPassword"
          type="password"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <!-- New Password -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          New Password
        </label>
        <input
          v-model="form.newPassword"
          type="password"
          @input="checkPasswordStrength"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <!-- Password Strength Indicator -->
        <div class="mt-2">
          <div class="flex space-x-1 mb-2">
            <div 
              v-for="i in 4" 
              :key="i"
              :class="[
                'h-1 flex-1 rounded',
                i <= passwordStrength ? 'bg-red-500' : 'bg-gray-200'
              ]"
            ></div>
          </div>
          <p class="text-sm text-gray-600">Weak password. Must contain at least;</p>
          <div class="mt-2 space-y-1">
            <div class="flex items-center text-sm">
                <svg class="mr-2" v-if="hasUppercase" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4018 10.4L11.6438 6.1574L10.7954 5.309L7.4018 8.7032L5.7044 7.0058L4.856 7.8542L7.4018 10.4Z" fill="#38C793"/>
</svg>
<svg class="mr-2" v-else width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8 7.1516L6.3032 5.4542L5.4542 6.3032L7.1516 8L5.4542 9.6968L6.3032 10.5458L8 8.8484L9.6968 10.5458L10.5458 9.6968L8.8484 8L10.5458 6.3032L9.6968 5.4542L8 7.1516Z" fill="#868C98"/>
</svg>


              <!-- <svg 
                :class="[
                  'w-4 h-4 mr-2',
                  hasUppercase ? 'text-green-500' : 'text-gray-400'
                ]" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg> -->
              <span :class="hasUppercase ? 'text-green-600' : 'text-gray-600'">
                At least 1 uppercase
              </span>
            </div>
            <div class="flex items-center text-sm">
                                <svg class="mr-2" v-if="hasNumber" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4018 10.4L11.6438 6.1574L10.7954 5.309L7.4018 8.7032L5.7044 7.0058L4.856 7.8542L7.4018 10.4Z" fill="#38C793"/>
</svg>
<svg class="mr-2" v-else width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8 7.1516L6.3032 5.4542L5.4542 6.3032L7.1516 8L5.4542 9.6968L6.3032 10.5458L8 8.8484L9.6968 10.5458L10.5458 9.6968L8.8484 8L10.5458 6.3032L9.6968 5.4542L8 7.1516Z" fill="#868C98"/>
</svg>
              <!-- <svg 
                :class="[
                  'w-4 h-4 mr-2',
                  hasNumber ? 'text-green-500' : 'text-gray-400'
                ]" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg> -->
              <span :class="hasNumber ? 'text-green-600' : 'text-gray-600'">
                At least 1 number
              </span>
            </div>
            <div class="flex items-center text-sm">                                <svg class="mr-2" v-if="hasMinLength" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4018 10.4L11.6438 6.1574L10.7954 5.309L7.4018 8.7032L5.7044 7.0058L4.856 7.8542L7.4018 10.4Z" fill="#38C793"/>
</svg>
<svg class="mr-2" v-else width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8 7.1516L6.3032 5.4542L5.4542 6.3032L7.1516 8L5.4542 9.6968L6.3032 10.5458L8 8.8484L9.6968 10.5458L10.5458 9.6968L8.8484 8L10.5458 6.3032L9.6968 5.4542L8 7.1516Z" fill="#868C98"/>
</svg>

              <!-- <svg 
                :class="[
                  'w-4 h-4 mr-2',
                  hasMinLength ? 'text-green-500' : 'text-gray-400'
                ]" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg> -->
              <span :class="hasMinLength ? 'text-green-600' : 'text-gray-600'">
                At least 8 characters
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Confirm New Password -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Confirm New Password
        </label>
        <input
          v-model="form.confirmPassword"
          type="password"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <button 
        @click="updatePassword"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
      >
        Update Password
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, inject } from 'vue'

const modals = inject('modals')

const form = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const passwordStrength = ref(1)
const hasUppercase = ref(false)
const hasNumber = ref(false)
const hasMinLength = ref(false)

const checkPasswordStrength = () => {
  const password = form.newPassword
  
  hasUppercase.value = /[A-Z]/.test(password)
  hasNumber.value = /\d/.test(password)
  hasMinLength.value = password.length >= 8
  
  let strength = 0
  if (hasUppercase.value) strength++
  if (hasNumber.value) strength++
  if (hasMinLength.value) strength++
  if (password.length >= 12) strength++
  
  passwordStrength.value = Math.max(1, strength)
}

const updatePassword = () => {
  // Handle password update logic
  console.log('Updating password...')
}
</script>
