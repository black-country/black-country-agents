<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-[#0C111D]">Top Agents</h3>
      <div class="flex items-center space-x-4">
        <select class="px-3 py-1 border border-gray-300 rounded text-sm">
          <option>All Time</option>
        </select>
        <button @click="$emit('view-all')" class="text-sm text-blue-600 hover:text-blue-700">View All</button>
      </div>
    </div>
    
    <div class="flex space-x-8 mb-6">
      <div class="text-center">
        <div class="text-sm font-medium text-blue-600">Purchase</div>
      </div>
      <div class="text-center">
        <div class="text-sm font-medium text-gray-500">Rental</div>
      </div>
    </div>
    
    <div class="space-y-4">
      <div v-for="agent in agents" :key="agent.id" class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <img :src="agent.avatar" :alt="agent.name" class="w-8 h-8 rounded-full" />
          <span class="text-sm font-medium text-[#0C111D]">{{ agent.name }}</span>
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

const agents = [
  { id: 1, name: 'Adebayo Salami', avatar: '/placeholder.svg?height=32&width=32' },
  { id: 2, name: 'Nneka Chukwu', avatar: '/placeholder.svg?height=32&width=32' },
  { id: 3, name: 'Desmond Tutu', avatar: '/placeholder.svg?height=32&width=32' },
  { id: 4, name: 'Adegboyega Precious', avatar: '/placeholder.svg?height=32&width=32' },
  { id: 5, name: 'Jide Kosoko', avatar: '/placeholder.svg?height=32&width=32' }
]
</script>
