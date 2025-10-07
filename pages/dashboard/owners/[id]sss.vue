<!-- pages/owners/[id].vue -->
<template>
  <div class="min-h-screen bg-gray-50">
      <!-- Main Content -->
      <main class="flex-1 p-6">
        <div class="max-w-7xl mx-auto">
          <!-- Back Button & Page Title -->
          <div class="flex items-center mb-6">
            <button @click="$router.back()" class="flex items-center text-blue-600 hover:text-blue-700 text-sm">
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 class="ml-4 text-2xl font-semibold text-[#0C111D]">Owner Details</h1>
          </div>

          <!-- Tabs -->
          <div class="border-b border-gray-200 mb-6">
            <nav class="-mb-px flex space-x-8">
              <button
                :class="[
                  activeTab === 'personal' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
                ]"
                @click="activeTab = 'personal'"
              >
                Personal Info
              </button>
              <button
                :class="[
                  activeTab === 'properties' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center'
                ]"
                @click="activeTab = 'properties'"
              >
                Properties
                <span class="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {{ ownerProperties.length }}
                </span>
              </button>
            </nav>
          </div>

          <!-- Personal Info Tab -->
          <div v-if="activeTab === 'personal'" class="bg-white rounded-lg shadow-sm">
            <!-- Personal Information Section -->
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-lg font-medium text-[#0C111D] mb-6">Personal Information</h2>
              
              <div class="flex items-start space-x-6">
                <div class="relative">
                  <img 
                    :src="ownerData.avatar" 
                    :alt="ownerData.name"
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
                    ownerData.userType === 'Individual' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-purple-100 text-purple-800',
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-2'
                  ]">
                    <svg v-if="ownerData.userType === 'Individual'" class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {{ ownerData.userType }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Other Information Section -->
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-base font-medium text-[#0C111D] mb-4">Other Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">NIN Number</label>
                  <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-[#0C111D]">
                    {{ ownerData.ninNumber }}
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-[#0C111D]">
                    {{ ownerData.phone }}
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Legal Name</label>
                  <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-[#0C111D]">
                    {{ ownerData.name }}
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-[#0C111D]">
                    {{ ownerData.email }}
                  </div>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Current residential address</label>
                  <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-[#0C111D]">
                    {{ ownerData.address }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Signature Section -->
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-base font-medium text-[#0C111D] mb-4">Signature</h3>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div class="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-[#0C111D]">
                  {{ ownerData.name }}
                </div>
              </div>
              <div class="relative inline-block">
                <div class="w-80 h-32 border-2 border-gray-300 rounded-md bg-gray-50 flex items-center justify-center">
                  <img 
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 120'%3E%3Cpath d='M20 80 Q50 20 80 60 Q110 100 140 40 Q170 80 200 50 Q230 30 260 70' stroke='%23000' stroke-width='3' fill='none'/%3E%3C/svg%3E"
                    alt="Signature"
                    class="w-full h-full object-contain"
                  />
                </div>
                <button class="absolute top-2 right-2 bg-white border border-gray-300 rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50">
                  Remove
                </button>
              </div>
            </div>

            <!-- KYC Information Section -->
            <div class="p-6">
              <h3 class="text-base font-medium text-[#0C111D] mb-4">KYC Information</h3>
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-purple-100 rounded flex items-center justify-center">
                  <span class="text-purple-600 font-medium text-sm">JPG</span>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-[#0C111D]">John Doe Passport</p>
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
            <div class="p-6 border-t border-gray-200">
              <button class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>

          <!-- Properties Tab -->
          <div v-else-if="activeTab === 'properties'" class="bg-white shadow-sm rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left">
                      <input type="checkbox" class="custom-checkbox" />
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Type</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specs</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="property in ownerProperties" :key="property.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4">
                      <input type="checkbox" class="custom-checkbox" />
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <span class="text-sm font-medium text-[#0C111D]">{{ property.name }}</span>
                        <span v-if="property.applications" class="ml-2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                          {{ property.applications }} Applications
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="[
                        property.status === 'RENT' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800',
                        'inline-flex px-2 py-1 text-xs font-semibold rounded'
                      ]">
                        {{ property.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#0C111D]">{{ property.type }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center text-sm text-[#0C111D]">
                        <img :src="property.flag" :alt="property.location" class="w-4 h-3 mr-2 rounded-sm" />
                        {{ property.location }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#0C111D]">
                      <div class="flex items-center space-x-4">
                        <span class="flex items-center">
                          <svg class="h-4 w-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {{ property.specs.people }}
                        </span>
                        <span class="flex items-center">
                          <svg class="h-4 w-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {{ property.specs.rooms }}
                        </span>
                        <span class="flex items-center">
                          <svg class="h-4 w-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M10.5 3L12 3.5L13.5 3v0c.83 0 1.5.67 1.5 1.5V6H9V4.5C9 3.67 9.67 3 10.5 3z" />
                          </svg>
                          {{ property.specs.bathrooms }}
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button class="text-gray-400 hover:text-gray-600">
                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Properties Pagination -->
            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div class="flex-1 flex justify-between sm:hidden">
                <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    Showing <span class="font-medium">10</span> owners out 250 users
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <button class="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">1</button>
                    <button class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">2</button>
                    <button class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">3</button>
                    <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">...</span>
                    <button class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">8</button>
                    <button class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">9</button>
                    <button class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">10</button>
                    <button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  </div>
</template>

<script setup lang="ts">
interface Property {
  id: number
  name: string
  status: 'RENT' | 'PURCHASE'
  type: string
  location: string
  flag: string
  specs: {
    people: number
    rooms: number
    bathrooms: number
  }
  applications?: number
}

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

const route = useRoute()
const activeTab = ref('personal')

definePageMeta({
  layout: 'dashboard'
})

// Sample owner data
const ownerData = ref<Owner>({
  id: parseInt(route.params.id as string),
  name: 'Jibike Alarape',
  email: 'Jibikeala@gmail.com',
  phone: '0816 789 0123',
  userType: 'Individual',
  dateAdded: '19 Nov, 23',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b631?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  ninNumber: '11223344556',
  address: '56 Akindele Crescent, Lagos'
})

// Sample properties data
const ownerProperties = ref<Property[]>([
  {
    id: 1,
    name: 'New Property at Lagos Road',
    status: 'RENT',
    type: 'Duplex',
    location: 'Nigeria',
    flag: 'data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"%3e%3cpath fill="%23008751" d="M0 0h1v2H0z"/%3e%3cpath fill="%23fff" d="M1 0h1v2H1z"/%3e%3cpath fill="%23008751" d="M2 0h1v2H2z"/%3e%3c/svg%3e',
    specs: { people: 2, rooms: 2, bathrooms: 3 }
  },
  {
    id: 2,
    name: 'New Property at Lagos Road',
    status: 'PURCHASE',
    type: 'Duplex',
    location: 'USA',
    flag: 'data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"%3e%3cpath fill="%23B22234" d="M0 0h3v2H0z"/%3e%3cpath stroke="%23fff" stroke-width="0.15384615384615385" d="m0 0.15384615384615385 3 0m0 0.15384615384615385-3 0m0 0.15384615384615385 3 0m0 0.15384615384615385-3 0m0 0.15384615384615385 3 0m0 0.15384615384615385-3 0m0 0.15384615384615385 3 0"/%3e%3cpath fill="%23000" d="M0 0h1.15384615384615383v0.6923076923076923H0z"/%3e%3c/svg%3e',
    specs: { people: 2, rooms: 2, bathrooms: 3 }
  },
  {
    id: 3,
    name: 'New Property at Lagos Road',
    status: 'PURCHASE',
    type: 'Bungalow',
    location: 'UK',
    flag: 'data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"%3e%3cpath fill="%23012169" d="M0 0h3v2H0z"/%3e%3cpath stroke="%23fff" stroke-width="0.2" d="m0 0 3 2m0-2L0 2"/%3e%3cpath stroke="%23C8102E" stroke-width="0.13333333333333333" d="m0 0 3 2m0-2L0 2"/%3e%3cpath stroke="%23fff" stroke-width="0.4" d="M1.5 0v2M0 1h3"/%3e%3cpath stroke="%23C8102E" stroke-width="0.26666666666666666" d="M1.5 0v2M0 1h3"/%3e%3c/svg%3e',
    specs: { people: 2, rooms: 2, bathrooms: 3 },
    applications: 12
  },
  {
    id: 4,
    name: 'New Property at Lagos Road',
    status: 'RENT',
    type: 'Duplex',
    location: 'USA',
    flag: 'data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"%3e%3cpath fill="%23B22234" d="M0 0h3v2H0z"/%3e%3cpath stroke="%23fff" stroke-width="0.15384615384615385" d="m0 0.15384615384615385 3 0m0 0.15384615384615385-3 0m0 0.15384615384615385 3 0m0 0.15384615384615385-3 0m0 0.15384615384615385 3 0m0 0.15384615384615385-3 0m0 0.15384615384615385 3 0"/%3e%3cpath fill="%23000" d="M0 0h1.15384615384615383v0.6923076923076923H0z"/%3e%3c/svg%3e',
    specs: { people: 2, rooms: 2, bathrooms: 3 }
  },
  {
    id: 5,
    name: 'New Property at Lagos Road',
    status: 'PURCHASE',
    type: 'Bungalow',
    location: 'Guinea',
    flag: 'data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"%3e%3cpath fill="%23CE1126" d="M0 0h1v2H0z"/%3e%3cpath fill="%23FFCD00" d="M1 0h1v2H1z"/%3e%3cpath fill="%23009460" d="M2 0h1v2H2z"/%3e%3c/svg%3e',
    specs: { people: 2, rooms: 2, bathrooms: 3 }
  },
  {
    id: 6,
    name: 'New Property at Lagos Road',
    status: 'RENT',
    type: 'Bungalow',
    location: 'Palestine',
    flag: 'data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"%3e%3cpath fill="%23000" d="M0 0h3v0.6666666666666666H0z"/%3e%3cpath fill="%23fff" d="M0 0.6666666666666666h3v0.6666666666666666H0z"/%3e%3cpath fill="%23007A3D" d="M0 1.3333333333333333h3v0.6666666666666666H0z"/%3e%3cpath fill="%23CE1126" d="m0 0 1 1-1 1z"/%3e%3c/svg%3e',
    specs: { people: 2, rooms: 2, bathrooms: 3 }
  },
  {
    id: 7,
    name: 'New Property at Lagos Road',
    status: 'PURCHASE',
    type: 'Duplex',
    location: 'Nigeria',
    flag: 'data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"%3e%3cpath fill="%23008751" d="M0 0h1v2H0z"/%3e%3cpath fill="%23fff" d="M1 0h1v2H1z"/%3e%3cpath fill="%23008751" d="M2 0h1v2H2z"/%3e%3c/svg%3e',
    specs: { people: 2, rooms: 2, bathrooms: 3 }
  },
  {
    id: 8,
    name: 'New Property at Lagos Road',
    status: 'PURCHASE',
    type: 'Duplex',
    location: 'Nigeria',
    flag: 'data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"%3e%3cpath fill="%23008751" d="M0 0h1v2H0z"/%3e%3cpath fill="%23fff" d="M1 0h1v2H1z"/%3e%3cpath fill="%23008751" d="M2 0h1v2H2z"/%3e%3c/svg%3e',
    specs: { people: 2, rooms: 2, bathrooms: 3 }
  }
])
</script>