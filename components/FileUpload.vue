<template>
  <div class="fixed inset-0 z-50 overflow-hidden bg-white">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span class="ml-2 text-sm">Close</span>
      </button>
      <h1 class="text-lg font-medium text-[#0C111D]">New Owner</h1>
      <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
    </div>

    <!-- Progress Steps -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-center max-w-md mx-auto">
        <div class="flex items-center space-x-4">
          <!-- Personal Information Step -->
          <div class="flex items-center">
            <div :class="[
              currentStep >= 1 ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300',
              'w-8 h-8 rounded-full border-2 flex items-center justify-center'
            ]">
              <svg v-if="currentStep > 1" class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <div v-else :class="currentStep === 1 ? 'bg-blue-600 w-3 h-3 rounded-full' : ''"></div>
            </div>
            <span :class="[
              currentStep >= 1 ? 'text-blue-600' : 'text-gray-500',
              'ml-2 text-sm font-medium'
            ]">Personal Information</span>
          </div>
          
          <!-- Progress Line -->
          <div :class="[
            currentStep > 1 ? 'bg-blue-600' : 'bg-gray-300',
            'flex-1 h-0.5'
          ]"></div>
          
          <!-- KYC Step -->
          <div class="flex items-center">
            <div :class="[
              currentStep >= 2 ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300',
              'w-8 h-8 rounded-full border-2 flex items-center justify-center'
            ]">
              <svg v-if="currentStep > 2" class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <div v-else :class="currentStep === 2 ? 'bg-blue-600 w-3 h-3 rounded-full' : ''"></div>
            </div>
            <span :class="[
              currentStep >= 2 ? 'text-blue-600' : 'text-gray-500',
              'ml-2 text-sm font-medium'
            ]">KYC</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto">
      <!-- Personal Information Step -->
      <div v-if="currentStep === 1" class="max-w-2xl mx-auto px-6 py-8">
        <div class="text-center mb-8">
          <h2 class="text-xl font-medium text-[#0C111D] mb-2">Personal Information</h2>
          <p class="text-sm text-gray-600">Add a new property owner to the database</p>
        </div>

        <form @submit.prevent="nextStep" class="space-y-6">
          <!-- Owner Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Owner Type</label>
            <div class="flex space-x-6">
              <div class="flex items-center">
                <input
                  id="individual"
                  type="radio"
                  value="Individual"
                  v-model="formData.ownerType"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label for="individual" class="ml-2 text-sm text-gray-700">Individual</label>
              </div>
              <div class="flex items-center">
                <input
                  id="business"
                  type="radio"
                  value="Business"
                  v-model="formData.ownerType"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label for="business" class="ml-2 text-sm text-gray-700">Business</label>
              </div>
            </div>
          </div>

          <!-- Legal Name -->
          <div>
            <label for="legalName" class="block text-sm font-medium text-gray-700 mb-2">Legal Name</label>
            <input
              id="legalName"
              type="text"
              v-model="formData.legalName"
              placeholder="Enter Legal Name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <!-- Email Address -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              id="email"
              type="email"
              v-model="formData.email"
              placeholder="Enter email address"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <!-- Current Residential Address -->
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700 mb-2">Current residential address</label>
            <input
              id="address"
              type="text"
              v-model="formData.address"
              placeholder="Enter Address"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <!-- Phone Number -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              id="phone"
              type="tel"
              v-model="formData.phone"
              placeholder="Enter Location"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </form>
      </div>

      <!-- KYC Information Step -->
      <div v-else-if="currentStep === 2" class="max-w-2xl mx-auto px-6 py-8">
        <div class="text-center mb-8">
          <h2 class="text-xl font-medium text-[#0C111D] mb-2">KYC Information</h2>
          <p class="text-sm text-gray-600">Add a new property owner to the database</p>
        </div>

        <!-- Individual KYC -->
        <div v-if="formData.ownerType === 'Individual'" class="space-y-6">
          <!-- NIN Number -->
          <div>
            <label for="ninNumber" class="block text-sm font-medium text-gray-700 mb-2">NIN Number</label>
            <input
              id="ninNumber"
              type="text"
              v-model="formData.ninNumber"
              placeholder="Enter number here..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <!-- National ID/Passport Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">National ID/Passport</label>
            <FileUpload v-model="uploadedFile" accept="image/*,.pdf" />
          </div>
        </div>

        <!-- Business KYC -->
        <div v-else-if="formData.ownerType === 'Business'" class="space-y-6">
          <!-- CAC Number -->
          <div>
            <label for="cacNumber" class="block text-sm font-medium text-gray-700 mb-2">CAC Number</label>
            <input
              id="cacNumber"
              type="text"
              v-model="formData.cacNumber"
              placeholder="Enter number here..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <!-- CAC Documents Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">CAC Documents</label>
            <FileUpload v-model="uploadedFile" accept="image/*,.pdf" />
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Actions -->
    <div class="flex justify-between items-center px-6 py-4 border-t border-gray-200">
      <button
        @click="$emit('close')"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        v-if="currentStep === 1"
        @click="nextStep"
        :disabled="!canProceedToKYC"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
      >
        Continue
        <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <button
        v-else-if="currentStep === 2"
        @click="publishOwner"
        :disabled="!canPublish"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Publish
      </button>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 z-50 overflow-hidden">
      <div class="absolute inset-0 bg-blue-500 bg-opacity-50"></div>
      <div class="absolute inset-0 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg p-8 max-w-sm w-full text-center">
          <div class="flex items-center justify-center mx-auto mb-4">
             <img src="@/assets/img/success.png" class="h-32 w-32" />
          </div>
          <h3 class="text-lg font-medium text-[#0C111D] mb-2">Successfully Published</h3>
          <p class="text-sm text-gray-600 mb-6">Configure 3d view so user can see what it looks like</p>
          <button
            @click="handleSuccess"
            class="w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FileUpload from '@/components/FileUpload.vue'

interface FormData {
  ownerType: 'Individual' | 'Business' | ''
  legalName: string
  email: string
  address: string
  phone: string
  ninNumber: string
  cacNumber: string
}

const emit = defineEmits<{
  close: []
  success: [owner: any]
}>()

const currentStep = ref(1)
const showSuccessModal = ref(false)
const uploadedFile = ref<any | null>(null) // managed by FileUpload

const formData = reactive<FormData>({
  ownerType: 'Individual',
  legalName: '',
  email: '',
  address: '',
  phone: '',
  ninNumber: '',
  cacNumber: ''
})

const canProceedToKYC = computed(() => {
  return formData.ownerType && 
         formData.legalName && 
         formData.email && 
         formData.address && 
         formData.phone
})

const canPublish = computed(() => {
  if (formData.ownerType === 'Individual') {
    return formData.ninNumber && uploadedFile.value
  } else if (formData.ownerType === 'Business') {
    return formData.cacNumber && uploadedFile.value
  }
  return false
})

const nextStep = () => {
  if (canProceedToKYC.value) {
    currentStep.value = 2
  }
}

const publishOwner = () => {
  if (canPublish.value) {
    showSuccessModal.value = true
  }
}

const handleSuccess = () => {
  const newOwner = {
    id: Date.now(),
    name: formData.legalName,
    email: formData.email,
    phone: formData.phone,
    userType: formData.ownerType,
    dateAdded: new Date().toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: '2-digit' 
    }),
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
  }
  
  emit('success', newOwner)
}
</script>
