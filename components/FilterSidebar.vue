<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 overflow-hidden"
    @click="$emit('close')"
  >
    <div class="absolute inset-0 bg-black bg-opacity-50" />
    
    <div
      class="absolute right-0 top-0 h-full w-96 bg-white shadow-xl"
      @click.stop
    >
      <div class="flex items-center justify-between p-6 border-b">
        <h2 class="text-lg font-semibold">Filter By</h2>
        <button @click="$emit('close')">
          <XMarkIcon class="w-6 h-6 text-gray-400 hover:text-[#525866]" />
        </button>
      </div>
      
      <div class="p-6 space-y-6 overflow-y-auto h-full pb-32">
        <!-- Category -->
        <div>
          <h3 class="text-sm font-medium text-gray-900 mb-3">Category</h3>
          <div class="space-y-2">
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="localFilters.category"
                value="Rent"
                class="custom-checkbox"
              />
              <span class="ml-2 text-sm text-gray-700">Rent</span>
            </label>
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="localFilters.category"
                value="Sell"
                class="custom-checkbox"
              />
              <span class="ml-2 text-sm text-gray-700">Sell</span>
            </label>
          </div>
        </div>

        <!-- Property Type -->
        <div>
          <h3 class="text-sm font-medium text-gray-900 mb-3">Property Type</h3>
          <div class="space-y-2">
            <label class="flex items-center">
              <input
                type="checkbox"
                value="Duplex"
                v-model="localFilters.propertyType"
                class="custom-checkbox"
              />
              <span class="ml-2 text-sm text-gray-700">Duplex</span>
            </label>
            <label class="flex items-center">
              <input
                type="checkbox"
                value="Bungalow"
                v-model="localFilters.propertyType"
                class="custom-checkbox"
              />
              <span class="ml-2 text-sm text-gray-700">Bungalow</span>
            </label>
            <label class="flex items-center">
              <input
                type="checkbox"
                value="Apartment"
                v-model="localFilters.propertyType"
                class="custom-checkbox"
              />
              <span class="ml-2 text-sm text-gray-700">Apartment</span>
            </label>
          </div>
        </div>

        <!-- Property Owner -->
        <div>
          <h3 class="text-sm font-medium text-gray-900 mb-3">Property Owner</h3>
          <select
            v-model="localFilters.propertyOwner"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Owner</option>
            <option value="john-doe">John Doe</option>
            <option value="jenny-wilson">Jenny Wilson</option>
            <option value="cody-fisher">Cody Fisher</option>
          </select>
        </div>

        <!-- Location Fields -->
        <div>
          <h3 class="text-sm font-medium text-gray-900 mb-3">Country</h3>
          <select
            v-model="localFilters.country"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Country</option>
            <option value="nigeria">Nigeria</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
          </select>
        </div>

        <div>
          <h3 class="text-sm font-medium text-gray-900 mb-3">State</h3>
          <input
            v-model="localFilters.state"
            type="text"
            placeholder="Enter State"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <h3 class="text-sm font-medium text-gray-900 mb-3">City</h3>
          <input
            v-model="localFilters.city"
            type="text"
            placeholder="Enter City"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <h3 class="text-sm font-medium text-gray-900 mb-3">Local Government</h3>
          <input
            v-model="localFilters.localGovernment"
            type="text"
            placeholder="Enter Local Government"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <h3 class="text-sm font-medium text-gray-900 mb-3">Zipcode</h3>
          <input
            v-model="localFilters.zipcode"
            type="text"
            placeholder="Enter Zipcode"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="absolute bottom-0 left-0 right-0 bg-white border-t p-6">
        <div class="flex space-x-3">
          <button
            @click="resetFilters"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            @click="applyFilters"
            class="flex-1 px-4 py-2 bg-[#2970FF] text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'
import type { FilterOptions } from '~/types'

interface Props {
  isOpen: boolean
  filters: FilterOptions
}

interface Emits {
  (e: 'close'): void
  (e: 'apply', filters: FilterOptions): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localFilters = ref<FilterOptions>({ ...props.filters })

watch(() => props.filters, (newFilters) => {
  localFilters.value = { ...newFilters }
}, { deep: true })

const resetFilters = () => {
  localFilters.value = {
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

const applyFilters = () => {
  emit('apply', { ...localFilters.value })
  emit('close')
}
</script>