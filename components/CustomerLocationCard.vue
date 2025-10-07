<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-[#0C111D]">Customer Location</h3>
      <div class="flex items-center space-x-4">
        <select class="px-3 py-1 border border-gray-300 rounded text-sm">
          <option>All Time</option>
        </select>
        <button @click="$emit('view-all')" class="text-sm text-blue-600 hover:text-blue-700">View All</button>
      </div>
    </div>
    
    <div class="space-y-4">
      <div v-for="(location, index) in locations.slice(0, 6)" :key="index" class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <span class="text-sm font-medium text-gray-500">{{ index + 1 }}</span>
          <img :src="location.flag" :alt="location.country" class="w-6 h-4 rounded" />
          <span class="text-sm font-medium text-[#0C111D]">{{ location.country }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-sm font-semibold text-[#0C111D]">240</span>
          <ChevronUp class="w-4 h-4 text-green-600" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronUp } from 'lucide-vue-next'

defineEmits<{
  'view-all': []
}>()

const locations = [
  { country: 'USA', flag: '/placeholder.svg?height=16&width=24' },
  { country: 'Nigeria', flag: '/placeholder.svg?height=16&width=24' },
  { country: 'Canada', flag: '/placeholder.svg?height=16&width=24' },
  { country: 'United Kingdom', flag: '/placeholder.svg?height=16&width=24' },
  { country: 'Belgium', flag: '/placeholder.svg?height=16&width=24' },
  { country: 'Italy', flag: '/placeholder.svg?height=16&width=24' }
]
</script>
