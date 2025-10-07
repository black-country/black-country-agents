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
        
        <h1 class="text-2xl font-bold text-[#0C111D]">Property Details</h1>
      </div>

      <!-- Tabs -->
      <div class="border-b border-gray-200 mb-6">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-1',
              activeTab === tab.key
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <span>{{ tab.name }}</span>
            <span v-if="tab.key === 'Applications'" class="ml-1 bg-blue-100 text-blue-600 py-0.5 px-2 rounded-full text-xs">
              {{ property?.applications?.length || 0 }}
            </span>
          </button>
        </nav>
      </div>

      <!-- Applications Tab -->
      <div v-if="activeTab === 'Applications'" class="space-y-6">
        <!-- Stats Cards -->
        <div class="grid grid-cols-4 gap-6">
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <DocumentTextIcon class="w-6 h-6 text-blue-600" />
            </div>
            <div class="text-2xl font-bold text-[#0C111D]">50,000</div>
            <div class="text-sm text-gray-500">Total Application</div>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
              <EyeIcon class="w-6 h-6 text-[#525866]" />
            </div>
            <div class="text-2xl font-bold text-[#0C111D]">50,000</div>
            <div class="text-sm text-gray-500">Seen by</div>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <CursorArrowRippleIcon class="w-6 h-6 text-green-600" />
            </div>
            <div class="text-2xl font-bold text-[#0C111D]">200</div>
            <div class="text-sm text-gray-500">User Clicked</div>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <ClockIcon class="w-6 h-6 text-purple-600" />
            </div>
            <div class="text-2xl font-bold text-[#0C111D]">50,000</div>
            <div class="text-sm text-gray-500">Total Time Spent</div>
          </div>
        </div>

        <!-- Applications Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-medium text-[#0C111D]">Applications</h2>
              <div class="flex space-x-4">
                <button
                  v-for="status in applicationStatuses"
                  :key="status"
                  @click="activeApplicationStatus = status"
                  :class="[
                    'text-sm font-medium',
                    activeApplicationStatus === status
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  ]"
                >
                  {{ status }}
                </button>
              </div>
            </div>
          </div>
          
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" class="custom-checkbox" />
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Applied</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <PropertyApplicationCard
                v-for="application in filteredApplications"
                :key="application.id"
                :application="application"
                @view="viewApplication"
              />
            </tbody>
          </table>
        </div>
      </div>

      <!-- Property Information Tab -->
      <div v-else-if="activeTab === 'Property Information'">
        <PropertyInformationTab :property="property" />
      </div>

      <!-- Amenities Tab -->
      <div v-else-if="activeTab === 'Amenities'">
        <AmenitiesTab :property="property" />
      </div>

      <!-- Photos & Media Tab -->
      <div v-else-if="activeTab === 'Photos & Media'">
        <PhotosMediaTab :property="property" />
      </div>

      <!-- Action Buttons -->
      <div class="mt-8 flex justify-between">
        <button class="px-6 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
          Delete
        </button>
        <div class="space-x-3">
          <button class="px-6 py-2 bg-[#2970FF] text-white rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
          <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            More Action
            <ChevronDownIcon class="w-4 h-4 inline ml-1" />
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { 
  ChevronLeftIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  EyeIcon,
  CursorArrowRippleIcon,
  ClockIcon
} from '@heroicons/vue/24/outline'
import type { Property, Application } from '~/types'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const activeTab = ref('Applications')
const activeApplicationStatus = ref('In Review')

const tabs = [
  { key: 'Applications', name: 'Applications' },
  { key: 'Property Information', name: 'Property Information' },
  { key: 'Amenities', name: 'Amenities' },
  { key: 'Photos & Media', name: 'Photos & Media' }
]

const applicationStatuses = [
  'In Review',
  'Shortlisted', 
  'Rejected',
  'Accepted'
]

// Mock property data
const property = ref<Property>({
  id: route.params.id as string,
  name: 'New Property at Lagos Road',
  owner: {
    id: '1',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    email: 'john@example.com',
    phone: '+1234567890',
    joinedDate: '2024-01-01'
  },
  propertyType: 'Duplex',
  location: 'Nigeria',
  country: 'Nigeria',
  specs: { bedrooms: 2, bathrooms: 2, area: 3 },
  applications: [
    {
      id: '1',
      applicantName: 'John Doe',
      applicantEmail: 'johndoe@gmail.com',
      applicantPhone: '+234709387392',
      dateApplied: '19 Nov. 23',
      status: 'Rejected',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      documents: [],
      offerPrice: 200000,
      personalDetails: {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        phone: '+234709387392',
        currentAddress: '8502 Preston Rd. Inglewood, Maine 98380',
        country: 'Nigeria',
        state: 'Lagos',
        city: 'Bajulaye',
        localGovernment: 'Somolu',
        zipCode: '122302'
      },
      letterOfIntent: 'Sample letter of intent...'
    },
    // Add more mock applications
  ],
  price: 350000,
  status: 'Rent',
  amenities: [],
  photos: []
})

const filteredApplications = computed(() => {
  if (!property.value?.applications) return []
  
  if (activeApplicationStatus.value === 'In Review') {
    return property.value.applications
  }
  
  return property.value.applications.filter(app => 
    app.status === activeApplicationStatus.value
  )
})

const viewApplication = (applicationId: string) => {
  navigateTo(`/properties/${route.params.id}/applications/${applicationId}`)
}
</script>