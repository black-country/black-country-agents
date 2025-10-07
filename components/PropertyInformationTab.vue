<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="space-y-8">
      <!-- About Property -->
      <div>
        <h3 class="text-lg font-medium text-[#0C111D] mb-4">About Property</h3>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Property Name</label>
            <input
              type="text"
              placeholder="Enter Property Name"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Property Description</label>
            <textarea
              placeholder="Placeholder text..."
              rows="3"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
            <div class="text-right text-sm text-gray-500 mt-1">0/200</div>
          </div>
        </div>

        <!-- Property Type -->
        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">Property Type</label>
          <div class="space-y-2">
            <div class="flex space-x-6">
              <label class="flex items-center">
                <input type="radio" name="propertyType" value="duplex" class="text-blue-600 focus:ring-blue-500" checked />
                <span class="ml-2 text-sm text-gray-700">Duplex</span>
              </label>
              <label class="flex items-center">
                <input type="radio" name="propertyType" value="bungalow" class="text-blue-600 focus:ring-blue-500" />
                <span class="ml-2 text-sm text-gray-700">Bungalow</span>
              </label>
            </div>
            <label class="flex items-center">
              <input type="radio" name="propertyType" value="apartment" class="text-blue-600 focus:ring-blue-500" />
              <span class="ml-2 text-sm text-gray-700">Apartment</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Set up Location -->
      <div>
        <h3 class="text-lg font-medium text-[#0C111D] mb-4">Set up Location</h3>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <select class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Select Country</option>
              <option>Nigeria</option>
              <option>USA</option>
              <option>UK</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">State</label>
            <input
              type="text"
              placeholder="Enter State"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              placeholder="Enter City"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">local government</label>
            <input
              type="text"
              placeholder="Enter local government"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Zipcode</label>
            <input
              type="text"
              placeholder="Enter Zipcode"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <!-- Owner Details -->
      <div>
        <h3 class="text-lg font-medium text-[#0C111D] mb-4">Owner Details</h3>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Property Owner</label>
          <div class="relative">
            <select class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none">
              <option>Dianne Russell</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
            </select>
            <ChevronDownIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <!-- Status -->
        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">Status</label>
          <div class="flex space-x-6">
            <label class="flex items-center">
              <input type="radio" name="status" value="rent" class="text-blue-600 focus:ring-blue-500" checked />
              <span class="ml-2 text-sm text-gray-700">Rent</span>
            </label>
            <label class="flex items-center">
              <input type="radio" name="status" value="purchase" class="text-blue-600 focus:ring-blue-500" />
              <span class="ml-2 text-sm text-gray-700">Purchase</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Specific Details -->
      <div>
        <h3 class="text-lg font-medium text-[#0C111D] mb-4">Specific Details</h3>
        <div class="grid grid-cols-2 gap-6">
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-2">
              <BedIcon class="w-5 h-5 text-[#525866]" />
              <span class="text-sm font-medium text-gray-700">Bedroom</span>
            </div>
            <div class="flex items-center space-x-2">
              <button class="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                <MinusIcon class="w-4 h-4" />
              </button>
              <span class="w-8 text-center font-medium">2</span>
              <button class="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                <PlusIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-2">
              <Square3Stack3DIcon class="w-5 h-5 text-[#525866]" />
              <span class="text-sm font-medium text-gray-700">Sitting Room</span>
            </div>
            <div class="flex items-center space-x-2">
              <button class="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                <MinusIcon class="w-4 h-4" />
              </button>
              <span class="w-8 text-center font-medium">2</span>
              <button class="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                <PlusIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-2">
              <HomeIcon class="w-5 h-5 text-[#525866]" />
              <span class="text-sm font-medium text-gray-700">Kitchen</span>
            </div>
            <div class="flex items-center space-x-2">
              <button class="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                <MinusIcon class="w-4 h-4" />
              </button>
              <span class="w-8 text-center font-medium">2</span>
              <button class="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                <PlusIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-2">
              <BuildingOffice2Icon class="w-5 h-5 text-[#525866]" />
              <span class="text-sm font-medium text-gray-700">Bathroom</span>
            </div>
            <div class="flex items-center space-x-2">
              <button class="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                <MinusIcon class="w-4 h-4" />
              </button>
              <span class="w-8 text-center font-medium">2</span>
              <button class="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                <PlusIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
  HomeIcon,
  Square3Stack3DIcon,
  BuildingOffice2Icon
} from '@heroicons/vue/24/outline'

// Custom bed icon component since it's not in heroicons
const BedIcon = {
  template: `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7-8v8m14-8v8M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"/>
    </svg>
  `
}

interface Props {
  property: any
}

defineProps<Props>()
</script>