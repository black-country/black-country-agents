<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="space-y-8">
      <!-- Photos Section -->
      <div>
        <h3 class="text-lg font-medium text-[#0C111D] mb-4">Photos</h3>
        
        <div class="grid grid-cols-3 gap-4 mb-4">
          <!-- Cover Photo -->
          <div class="relative">
            <img 
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="Sitting Room"
              class="w-full h-48 object-cover rounded-lg"
            />
            <div class="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
              Cover Photo
            </div>
            <div class="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
              Sitting Room
            </div>
            <button class="absolute top-2 right-2 text-white hover:text-gray-300">
              <EllipsisHorizontalIcon class="w-5 h-5" />
            </button>
          </div>

          <!-- Kitchen Photo -->
          <div class="relative">
            <img 
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="Kitchen"
              class="w-full h-48 object-cover rounded-lg"
            />
            <div class="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
              Kitchen
            </div>
            <div class="absolute top-2 left-2 bg-[#2970FF] text-white px-2 py-1 rounded text-xs">
              Kilo
            </div>
            <div class="absolute top-8 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs text-center">
              Press here to see view car
            </div>
            <button class="absolute top-2 right-2 text-white hover:text-gray-300">
              <EllipsisHorizontalIcon class="w-5 h-5" />
            </button>
          </div>

          <!-- Bedroom Photo -->
          <div class="relative">
            <img 
              src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="Bedroom"
              class="w-full h-48 object-cover rounded-lg"
            />
            <div class="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
              Bedroom
            </div>
            <button class="absolute top-2 right-2 text-white hover:text-gray-300">
              <EllipsisHorizontalIcon class="w-5 h-5" />
            </button>
          </div>

          <!-- Toilet Photo -->
          <div class="relative">
            <img 
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="Toilet"
              class="w-full h-48 object-cover rounded-lg"
            />
            <div class="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
              Toilet
            </div>
            <button class="absolute top-2 right-2 text-white hover:text-gray-300">
              <EllipsisHorizontalIcon class="w-5 h-5" />
            </button>
          </div>

          <!-- Kitchen Photo 2 -->
          <div class="relative">
            <img 
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="Kitchen"
              class="w-full h-48 object-cover rounded-lg"
            />
            <div class="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
              Kitchen
            </div>
            <button class="absolute top-2 right-2 text-white hover:text-gray-300">
              <EllipsisHorizontalIcon class="w-5 h-5" />
            </button>
          </div>

          <!-- Add More Button -->
          <div class="border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center hover:border-gray-400 cursor-pointer">
            <PlusIcon class="w-8 h-8 text-gray-400 mb-2" />
            <span class="text-sm font-medium text-[#525866]">Add More</span>
          </div>
        </div>
      </div>

      <!-- Video Section -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-[#0C111D]">Video</h3>
          <button class="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
            <PlusIcon class="w-4 h-4" />
            <span class="text-sm">New Video</span>
          </button>
        </div>
        
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <PlayIcon class="w-8 h-8 text-gray-400" />
          </div>
          <p class="text-[#525866] mb-2">Choose a file or drag & drop it here.</p>
          <p class="text-sm text-gray-500 mb-4">JPEG, PNG, PDF, and MP4 formats, up to 50 MB</p>
          <button class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Browse File
          </button>
        </div>
      </div>

      <!-- House Plan Section -->
      <div>
        <h3 class="text-lg font-medium text-[#0C111D] mb-4">House Plan</h3>
        
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <DocumentIcon class="w-8 h-8 text-gray-400" />
          </div>
          <p class="text-[#525866] mb-2">Choose a file or drag & drop it here.</p>
          <p class="text-sm text-gray-500 mb-4">JPEG, PNG, PDF, and MP4 formats, up to 50 MB</p>
          <button class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Browse File
          </button>
        </div>
      </div>

      <!-- 3D Plan Section -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-[#0C111D]">3D Plan</h3>
          <button class="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
            <PlusIcon class="w-4 h-4" />
            <span class="text-sm">3D Plan</span>
          </button>
        </div>
        
        <div class="bg-gray-50 rounded-lg p-6 flex justify-center">
          <img 
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            alt="3D Room Model"
            class="max-w-sm h-64 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  EllipsisHorizontalIcon,
  PlusIcon,
  PlayIcon,
  DocumentIcon
} from '@heroicons/vue/24/outline'

interface Props {
  property: any
}

defineProps<Props>()
</script>