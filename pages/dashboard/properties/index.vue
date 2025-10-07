<template>
  <div>
    <!-- <AppHeader /> -->
    
    <main class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-[#0C111D]">Properties</h1>
        <div class="flex items-center space-x-3">
          <button
            @click="showFilters = true"
            class="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <FunnelIcon class="w-4 h-4" />
            <span>Filter By</span>
          </button>
          <NuxtLink
            to="/properties/new"
            class="flex items-center space-x-2 px-4 py-2 bg-[#2970FF] text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            <PlusIcon class="w-4 h-4" />
            <span>New Property</span>
          </NuxtLink>
        </div>
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

      <!-- Applied Filters -->
      <div v-if="hasActiveFilters" class="mb-6">
        <div class="flex flex-wrap items-center gap-2">
          <span
            v-for="filter in activeFilters"
            :key="filter.key"
            class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
          >
            <component :is="filter.icon" class="w-4 h-4" />
            {{ filter.label }}
            <button
              @click="removeFilter(filter.key)"
              class="ml-1 hover:bg-blue-200 rounded-full p-0.5"
            >
              <XMarkIcon class="w-3 h-3" />
            </button>
          </span>
          <button
            @click="resetAllFilters"
            class="text-sm text-blue-600 hover:text-blue-800 ml-2"
          >
            Reset All
          </button>
        </div>
      </div>

      <!-- Properties Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" class="custom-checkbox" />
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Specs
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <PropertyCard
              v-for="property in filteredProperties"
              :key="property.id"
              :property="property"
              @view="viewProperty"
            />
          </tbody>
        </table>

        <!-- Pagination -->
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
                Showing <span class="font-medium">10</span> owners out <span class="font-medium">250</span> users
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <ChevronLeftIcon class="h-5 w-5" />
                </button>
                <button class="bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">1</button>
                <button class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">2</button>
                <button class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">3</button>
                <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">...</span>
                <button class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">8</button>
                <button class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">9</button>
                <button class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">10</button>
                <button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <ChevronRightIcon class="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Filter Sidebar -->
    <FilterSidebar
      :is-open="showFilters"
      :filters="filters"
      @close="showFilters = false"
      @apply="applyFilters"
    />
  </div>
</template>

<script setup lang="ts">
import { 
  FunnelIcon, 
  PlusIcon, 
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BuildingOfficeIcon,
  UserIcon,
  MapPinIcon
} from '@heroicons/vue/24/outline'
import type { Property, FilterOptions } from '~/types'

definePageMeta({
  layout: 'dashboard'
})

const showFilters = ref(false)
const activeTab = ref('All')

const tabs = [
  { key: 'All', name: 'All' },
  { key: 'Draft', name: 'Draft' },
  { key: 'Rent', name: 'Rent' },
  { key: 'Buy', name: 'Buy' },
  { key: 'Short-let', name: 'Short-let' }
]

const filters = ref<FilterOptions>({
  category: null,
  propertyType: [],
  propertyOwner: null,
  country: null,
  state: null,
  city: null,
  localGovernment: null,
  zipcode: null
})

// Mock data
const properties = ref<Property[]>([
  {
    id: '1',
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
      }
    ],
    price: 350000,
    status: 'Rent',
    amenities: [],
    photos: [],
    description: 'Luxury Home in Bali'
  },
  // Add more mock properties as needed
])

const computedActiveFilters = computed(() => {
  const activeFilters: Array<{key: string, label: string, icon: any}> = []
  
  if (filters.value.category === 'Rent') {
    activeFilters.push({ key: 'category', label: 'Rent', icon: BuildingOfficeIcon })
  }
  
  if (filters.value.propertyType.includes('Duplex')) {
    activeFilters.push({ key: 'propertyType-duplex', label: 'Duplex', icon: BuildingOfficeIcon })
  }
  
  if (filters.value.propertyOwner) {
    activeFilters.push({ key: 'propertyOwner', label: 'Jenny Wilson', icon: UserIcon })
  }
  
  if (filters.value.country) {
    activeFilters.push({ key: 'country', label: filters.value.country, icon: MapPinIcon })
  }
  
  return activeFilters
})

const hasActiveFilters = computed(() => computedActiveFilters.value.length > 0)
const activeFilters = computed(() => computedActiveFilters.value)

const filteredProperties = computed(() => {
  return properties.value.filter(property => {
    if (activeTab.value !== 'All' && property.status !== activeTab.value) return false
    if (filters.value.category && property.status !== filters.value.category) return false
    if (filters.value.propertyType.length > 0 && !filters.value.propertyType.includes(property.propertyType)) return false
    if (filters.value.country && property.country !== filters.value.country) return false
    return true
  })
})

const viewProperty = (id: string) => {
  navigateTo(`/properties/${id}`)
}

const applyFilters = (newFilters: FilterOptions) => {
  filters.value = { ...newFilters }
}

const removeFilter = (filterKey: string) => {
  if (filterKey === 'category') {
    filters.value.category = null
  } else if (filterKey.startsWith('propertyType-')) {
    const type = filterKey.split('-')[1]
    filters.value.propertyType = filters.value.propertyType.filter(t => t.toLowerCase() !== type)
  } else if (filterKey === 'propertyOwner') {
    filters.value.propertyOwner = null
  } else if (filterKey === 'country') {
    filters.value.country = null
  }
}

const resetAllFilters = () => {
  filters.value = {
    category: null,
    propertyType: [],
    propertyOwner: null,
    country: null,
    state: null,
    city: null,
    localGovernment: null,
    zipcode: null
  }
}
</script>