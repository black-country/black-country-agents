<template>
  <div>
    <main class="p-6">
      <div class="mb-6">
        <button 
          @click="$router.back()"
          class="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-4"
        >
          <ChevronLeftIcon class="w-4 h-4" />
          <span>Back</span>
        </button>
        
        <h1 class="text-2xl font-bold text-gray-900">Property Details</h1>
      </div>

      <!-- Tabs -->
      <div class="border-b border-gray-200 mb-6">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === tab.key
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div v-if="activeTab === 'Property Information'">
        <PropertyInformationTab :property="formData" />
      </div>

      <div v-else-if="activeTab === 'Amenities'">
        <AmenitiesTab :property="formData" />
      </div>

      <div v-else-if="activeTab === 'Photos & Media'">
        <PhotosMediaTab :property="formData" />
      </div>

      <!-- Action Buttons -->
      <div class="mt-8 flex justify-between">
        <button 
          @click="deleteProperty"
          class="px-6 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
        >
          Delete
        </button>
        <div class="space-x-3">
          <button 
            @click="saveChanges"
            class="px-6 py-2 bg-[#2970FF] text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            More Action
            <ChevronDownIcon class="w-4 h-4 inline ml-1" />
          </button>
        </div>
      </div>
    </main>

    <!-- Save Confirmation Modal -->
    <div
      v-if="showSaveModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showSaveModal = false"
    >
      <div
        class="bg-white rounded-lg p-6 max-w-md mx-4"
        @click.stop
      >
        <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full">
          <InformationCircleIcon class="w-6 h-6 text-blue-600" />
        </div>
        
        <h3 class="text-lg font-medium text-gray-900 text-center mb-2">Save Changes</h3>
        <p class="text-sm text-[#525866] text-center mb-6">
          Are your sure you want to proceed with this action
        </p>
        
        <div class="flex space-x-3">
          <button
            @click="showSaveModal = false"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Discard changes
          </button>
          <button
            @click="confirmSave"
            class="flex-1 px-4 py-2 bg-[#2970FF] text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  ChevronLeftIcon,
  ChevronDownIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'dashboard'
})

const activeTab = ref('Property Information')
const showSaveModal = ref(false)

const tabs = [
  { key: 'Property Information', name: 'Property Information' },
  { key: 'Amenities', name: 'Amenities' },
  { key: 'Photos & Media', name: 'Photos & Media' }
]

const formData = ref({
  id: '',
  name: '',
  owner: {
    id: '',
    name: 'Dianne Russell',
    avatar: '',
    email: '',
    phone: '',
    joinedDate: ''
  },
  propertyType: 'Duplex',
  location: '',
  country: '',
  specs: { bedrooms: 2, bathrooms: 2, area: 2 },
  applications: [],
  price: 0,
  status: 'Rent',
  amenities: [],
  photos: []
})

const saveChanges = () => {
  showSaveModal.value = true
}

const confirmSave = () => {
  // Handle save logic here
  console.log('Saving property:', formData.value)
  showSaveModal.value = false
  // Redirect to properties list or show success message
  navigateTo('/properties')
}

const deleteProperty = () => {
  // Handle delete logic
  if (confirm('Are you sure you want to delete this property?')) {
    navigateTo('/properties')
  }
}
</script>