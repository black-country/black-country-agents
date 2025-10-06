<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-hidden">
    <div class="absolute inset-0 bg-black bg-opacity-50" @click="$emit('update:show', false)"></div>
    <div class="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
      <div class="flex items-center justify-between p-6 border-b">
        <h2 class="text-lg font-semibold">Filter By</h2>
        <button @click="$emit('update:show', false)" class="p-1 hover:bg-gray-100 rounded">
          <X class="w-5 h-5" />
        </button>
      </div>
      
      <div class="p-6 space-y-6">
        <!-- Location Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <select 
            v-model="localFilters.location"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select location</option>
            <option value="Nigeria">Nigeria</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="France">France</option>
          </select>
        </div>

        <!-- Previous History Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">Previous History</label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input 
                type="radio" 
                v-model="localFilters.previousHistory" 
                value="rented"
                class="text-blue-600 focus:ring-blue-500"
              />
              <span class="ml-2 text-gray-700">rented before</span>
            </label>
            <label class="flex items-center">
              <input 
                type="radio" 
                v-model="localFilters.previousHistory" 
                value="purchased"
                class="text-blue-600 focus:ring-blue-500"
              />
              <span class="ml-2 text-gray-700">purchased before</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="absolute bottom-0 left-0 right-0 p-6 border-t bg-white">
        <div class="flex gap-3">
          <button 
            @click="$emit('reset')"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Reset
          </button>
          <button 
            @click="applyFilters"
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import type { FilterOptions } from '~/types'

interface Props {
  show: boolean
  filters: FilterOptions
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:show': [show: boolean]
  'apply': [filters: FilterOptions]
  'reset': []
}>()

const localFilters = ref<FilterOptions>({ ...props.filters })

watch(() => props.filters, (newFilters) => {
  localFilters.value = { ...newFilters }
}, { deep: true })

const applyFilters = () => {
  emit('apply', localFilters.value)
  emit('update:show', false)
}
</script>
