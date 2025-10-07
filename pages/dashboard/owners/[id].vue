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
        <PersonalInfoTab 
          v-if="activeTab === 'personal'" 
          :owner-data="ownerData" 
          @save="handleSave"
        />

        <!-- Properties Tab -->
        <PropertiesTab 
          v-else-if="activeTab === 'properties'" 
          :properties="ownerProperties"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import avatar from "@/assets/img/avatar.png"
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
  avatar: avatar,
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
    specs: { people: 2, rooms: 2, bathrooms: 3 },
    applications: 12
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

const handleSave = (updatedData: Owner) => {
  ownerData.value = { ...updatedData }
  // Handle save logic here
  console.log('Saving owner data:', updatedData)
}
</script>