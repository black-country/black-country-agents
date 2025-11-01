<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
      <!-- Processing State -->
      <div v-if="processing">
        <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Processing Payment...</h3>
        <p class="text-gray-600">Please wait</p>
      </div>

      <!-- Success State -->
      <div v-else-if="status === 'success'">
        <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-3">Payment Successful! 🎉</h3>
        <p class="text-gray-600 mb-6">Your booking has been confirmed</p>
        <button
          @click="router.push('/appointments')"
          class="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          View My Appointments
        </button>
      </div>

      <!-- Error State -->
      <div v-else>
        <div class="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-3">Payment {{ status === 'failed' ? 'Failed' : 'Error' }}</h3>
        <p class="text-gray-600 mb-6">{{ message || 'Something went wrong with your payment' }}</p>
        <div class="flex gap-3">
          <button
            @click="router.push('/booking')"
            class="flex-1 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50"
          >
            Try Again
          </button>
          <button
            @click="router.push('/appointments')"
            class="flex-1 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800"
          >
            View Appointments
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const processing = ref(true)
const status = ref('')
const message = ref('')

onMounted(() => {
  status.value = route.query.status as string || ''
  message.value = route.query.message as string || ''
  
  // Simulate brief processing delay for UX
  setTimeout(() => {
    processing.value = false
  }, 1000)
})
</script>