<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold text-gray-900 mb-6">Business Information</h2>
    
    <!-- Profile Photo -->
    <div class="mb-8">
      <div class="flex items-start">
        <div class="w-20 h-20 bg-black rounded-full flex items-center justify-center mr-6">
          <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
          </svg>
        </div>
        <div>
          <h3 class="font-medium text-gray-900 mb-1">PROFILE PHOTO</h3>
          <p class="text-sm text-gray-500 mb-3">
            Change profile picture to a size<br />
            of 148 x 148 jpg or png
          </p>
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            Upload Photo
          </button>
        </div>
      </div>
    </div>
    
    <!-- Form Fields -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Business Name
        </label>
        <input
          v-model="form.businessName"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Business Email
        </label>
        <input
          v-model="form.businessEmail"
          type="email"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Current Business address
        </label>
        <input
          v-model="form.businessAddress"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          v-model="form.phoneNumber"
          type="tel"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    
    <div class="mt-8">
      <button class="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
        Save Changes
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  businessName: 'Real Vision Homes',
  businessEmail: 'realvision@gmail.com',
  businessAddress: 'Plot 7, Unity Avenue, Abuja',
  phoneNumber: '0704 567 8901'
})
</script>
