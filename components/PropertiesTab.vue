<!-- components/PropertiesTab.vue -->
<template>
  <div class="bg-white shadow-sm rounded-lg overflow-hidden">
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
          <tr v-for="property in properties" :key="property.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <input type="checkbox" class="custom-checkbox" />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <span 
                  class="text-sm font-medium text-[#0C111D] relative cursor-pointer"
                  @mouseenter="showTooltip(property.id)"
                  @mouseleave="hideTooltip"
                >
                  {{ property.name }}
                  <!-- Tooltip -->
                  <div 
                    v-if="tooltipVisible && tooltipPropertyId === property.id && property.applications"
                    class="absolute z-50 px-2 py-1 text-xs font-normal text-white bg-gray-900 rounded shadow-lg -top-8 left-0 whitespace-nowrap"
                  >
                    {{ property.applications }} applications
                    <div class="absolute top-full left-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                </span>
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
            Showing <span class="font-medium">10</span> properties out of <span class="font-medium">{{ total }}</span>
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

defineProps<{
  properties: Property[]
  total: number
}>()

const tooltipVisible = ref(false)
const tooltipPropertyId = ref<number | null>(null)

const showTooltip = (id: number) => {
  tooltipPropertyId.value = id
  tooltipVisible.value = true
}
const hideTooltip = () => {
  tooltipPropertyId.value = null
  tooltipVisible.value = false
}
</script>
