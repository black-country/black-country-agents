<template>
  <NuxtLayout name="auth">
    <div class="w-full">
      <!-- Logo -->

      <!-- Form -->
      <div class="space-y-6">
        <div class="text-center">
          <div class="text-xs text-gray-500 mb-2">STEP 4 OF 4</div>
          <h1 class="text-2xl font-semibold text-gray-900 mb-2">Signature</h1>
          <p class="text-sm text-[#525866]">Set up signature that would attached to document</p>
        </div>

        <form @submit.prevent="handleComplete" class="space-y-6">
          <!-- Name -->
          <div>
            <label for="signatureName" class="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              id="signatureName"
              v-model="form.signatureName"
              type="text"
              placeholder="Enter Signatory Name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Upload Signature -->
          <div>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <Upload class="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <p class="text-sm font-medium text-gray-700 mb-1">Upload Signature</p>
              <p class="text-xs text-gray-500 mb-4">JPEG, PNG, PDF, and MP4 formats, up to 50 MB.</p>
              <button
                type="button"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Browse File
              </button>
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-[#2970FF] text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
          >
            Complete
          </button>

          <div class="text-center">
            <button type="button" class="text-sm text-blue-600 hover:text-blue-500">
              Don't have it now. <span class="underline">Skip</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Building2, Upload } from 'lucide-vue-next'
import { ref } from 'vue'

const form = ref({
  signatureName: '',
  signature: null
})

const handleComplete = () => {
  // Handle completion logic
  console.log('Onboarding completed!')
}
</script>
