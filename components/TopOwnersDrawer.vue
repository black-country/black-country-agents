<template>
  <div v-if="open" class="fixed inset-0 z-50 overflow-hidden">
    <div class="absolute inset-0 bg-black bg-opacity-50" @click="$emit('update:open', false)"></div>
    <div class="absolute right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300">
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-[#0C111D]">Top Owners</h2>
        <div class="flex items-center space-x-4">
          <select class="px-3 py-1 border border-gray-300 rounded text-sm">
            <option>All Time</option>
          </select>
          <button @click="$emit('update:open', false)" class="text-gray-400 hover:text-gray-600">
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div class="p-6 overflow-y-auto h-full">
        <div class="space-y-4">
          <div v-for="(owner, index) in owners" :key="index" class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <span class="text-sm font-medium text-gray-500">{{ index + 1 }}</span>
              <img :src="owner.avatar" :alt="owner.name" class="w-8 h-8 rounded-full" />
              <span class="text-sm font-medium text-[#0C111D]">{{ owner.name }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-sm font-semibold text-[#0C111D]">240</span>
              <ChevronUp class="w-4 h-4 text-green-600" />
            </div>
          </div>
        </div>
        
        <button class="w-full mt-6 text-center text-sm text-gray-500 hover:text-gray-700">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X, ChevronUp } from 'lucide-vue-next'

interface Props {
  open: boolean
}

defineProps<Props>()
defineEmits<{
  'update:open': [value: boolean]
}>()

const owners = [
  { name: 'Nneka Chukwu', avatar: '/placeholder.svg?height=32&width=32' },
  { name: 'Oladejo Israel', avatar: '/placeholder.svg?height=32&width=32' },
  { name: 'Adegboyega Precious', avatar: '/placeholder.svg?height=32&width=32' },
  { name: 'Adebayo Salami', avatar: '/placeholder.svg?height=32&width=32' },
  { name: 'Eze Chinedu', avatar: '/placeholder.svg?height=32&width=32' },
  { name: 'Damilare Usman', avatar: '/placeholder.svg?height=32&width=32' },
  { name: 'Oladejo Israel', avatar: '/placeholder.svg?height=32&width=32' },
  { name: 'Adebayo Salami', avatar: '/placeholder.svg?height=32&width=32' },
  { name: 'Nneka Chukwu', avatar: '/placeholder.svg?height=32&width=32' },
  { name: 'Desmond Tutu', avatar: '/placeholder.svg?height=32&width=32' },
  { name: 'Jibike Alarape', avatar: '/placeholder.svg?height=32&width=32' },
  { name: 'Baba Kaothat', avatar: '/placeholder.svg?height=32&width=32' },
  { name: 'Adebanji Bolaji', avatar: '/placeholder.svg?height=32&width=32' },
  { name: 'Desmond Tutu', avatar: '/placeholder.svg?height=32&width=32' },
  { name: 'Jide Kosoko', avatar: '/placeholder.svg?height=32&width=32' }
]
</script>
