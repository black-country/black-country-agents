<!-- components/PersonalInfoTab.vue -->
<template>
  <div class="bg-white rounded-lg shadow-sm">
    <!-- Personal Information Section -->
    <div class="p-6 border-b border-gray-200">
      <h2 class="text-lg font-medium text-gray-900 mb-6">Personal Information</h2>
      
      <div class="flex items-start space-x-6">
        <div class="relative">
          <img 
            :src="localOwnerData.avatar" 
            :alt="localOwnerData.name"
            class="w-20 h-20 rounded-full object-cover"
          />
          <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-gray-200">
            <svg class="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <div>
          <span :class="[
            localOwnerData.userType === 'Individual' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-purple-100 text-purple-800',
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-2'
          ]">
            <svg v-if="localOwnerData.userType === 'Individual'" class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {{ localOwnerData.userType }}
          </span>
        </div>
      </div>
    </div>

    <!-- Other Information Section -->
    <div class="p-6 border-b border-gray-200">
      <h3 class="text-base font-medium text-gray-900 mb-4">Other Information</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">NIN Number</label>
          <input 
            v-model="localOwnerData.ninNumber"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input 
            v-model="localOwnerData.phone"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Legal Name</label>
          <input 
            v-model="localOwnerData.name"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            v-model="localOwnerData.email"
            type="email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
          />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Current residential address</label>
          <textarea 
            v-model="localOwnerData.address"
            rows="2"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 resize-none"
          />
        </div>
      </div>
    </div>

    <!-- Signature Section -->
    <div class="p-6 border-b border-gray-200">
      <h3 class="text-base font-medium text-gray-900 mb-4">Signature</h3>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input 
          :value="localOwnerData.name"
          readonly
          class="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-900"
        />
      </div>
      <div class="relative inline-block">
        <div class="w-80 h-32 border-2 border-gray-300 rounded-md bg-gray-50 flex items-center justify-center">
          <img 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 120'%3E%3Cpath d='M20 80 Q50 20 80 60 Q110 100 140 40 Q170 80 200 50 Q230 30 260 70' stroke='%23000' stroke-width='3' fill='none'/%3E%3C/svg%3E"
            alt="Signature"
            class="w-full h-full object-contain"
          />
        </div>
        <button class="absolute top-2 right-2 bg-white border border-gray-300 rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50 hover:text-red-700">
          Remove
        </button>
      </div>
    </div>

    <!-- KYC Information Section -->
    <div class="p-6 border-b border-gray-200">
      <h3 class="text-base font-medium text-gray-900 mb-4">KYC Information</h3>
      <div class="flex items-center space-x-3">
        <div class="w-12 h-12 bg-purple-100 rounded flex items-center justify-center">
          <span class="text-purple-600 font-medium text-sm">JPG</span>
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-900">John Doe Passport</p>
          <p class="text-sm text-gray-500">200kb - Uploaded</p>
        </div>
        <div class="flex space-x-2">
          <button class="p-2 text-gray-400 hover:text-gray-600">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button class="p-2 text-gray-400 hover:text-gray-600">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Save Changes Button -->
    <div class="p-6">
      <button 
        @click="handleSave"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Save Changes
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Owner {
  id: number
  name: string
  email: string
  phone: string
  userType: 'Individual' | 'Business'
  dateAdded: string
  avatar: string
  ninNumber: string
  address: string
}

interface Props {
  ownerData: Owner
}

interface Emits {
  (e: 'save', data: Owner): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localOwnerData = ref<Owner>({ ...props.ownerData })

watch(() => props.ownerData, (newData) => {
  localOwnerData.value = { ...newData }
}, { deep: true })

const handleSave = () => {
  emit('save', localOwnerData.value)
}
</script>