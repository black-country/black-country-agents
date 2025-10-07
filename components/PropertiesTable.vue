<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left">
              <input type="checkbox" class="rounded border-gray-300" />
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
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
              <div class="flex items-center gap-2">
                <span class="font-medium text-[#0C111D]">{{ property.name }}</span>
                <span v-if="property.id === '1'" class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">12</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <img :src="property.owner.avatar" :alt="property.owner.name" class="w-6 h-6 rounded-full" />
                <span class="text-gray-600">{{ property.owner.name }}</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-600">{{ property.propertyType }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <img :src="getCountryFlag(property.country)" :alt="property.country" class="w-4 h-4" />
                <span class="text-gray-600">{{ property.location }}</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <span class="flex items-center gap-1">
                  <Bed class="w-4 h-4" />
                  {{ property.specs.bedrooms }}
                </span>
                <span class="flex items-center gap-1">
                  <Bath class="w-4 h-4" />
                  {{ property.specs.bathrooms }}
                </span>
                <span class="flex items-center gap-1">
                  <Car class="w-4 h-4" />
                  {{ property.specs.parking }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button 
                @click="$emit('property-action', 'view', property)"
                class="p-1 hover:bg-gray-100 rounded"
              >
                <MoreHorizontal class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
      <div class="text-sm text-gray-500">
        Showing {{ Math.min(10, properties.length) }} owners out {{ properties.length }} users
      </div>
      <div class="flex items-center gap-2">
        <button class="p-2 hover:bg-gray-100 rounded">
          <ChevronLeft class="w-4 h-4" />
        </button>
        <button class="px-3 py-1 bg-blue-600 text-white rounded">1</button>
        <button class="px-3 py-1 hover:bg-gray-100 rounded">2</button>
        <button class="px-3 py-1 hover:bg-gray-100 rounded">3</button>
        <span class="px-2">...</span>
        <button class="px-3 py-1 hover:bg-gray-100 rounded">8</button>
        <button class="px-3 py-1 hover:bg-gray-100 rounded">9</button>
        <button class="px-3 py-1 hover:bg-gray-100 rounded">10</button>
        <button class="p-2 hover:bg-gray-100 rounded">
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bed, Bath, Car, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { Property } from '~/types'

interface Props {
  properties: Property[]
}

defineProps<Props>()
defineEmits<{
  'property-action': [action: string, property: Property]
}>()

const getCountryFlag = (country: string) => {
  const flags: Record<string, string> = {
    'Nigeria': '/placeholder.svg?height=16&width=16',
    'USA': '/placeholder.svg?height=16&width=16',
    'UK': '/placeholder.svg?height=16&width=16',
    'Guinea': '/placeholder.svg?height=16&width=16',
    'Palestine': '/placeholder.svg?height=16&width=16'
  }
  return flags[country] || '/placeholder.svg?height=16&width=16'
}
</script>
