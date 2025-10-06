
<template>
  <header class="bg-white shadow-sm sticky top-0 z-50 border-b ml-64">
    <div class="px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex-1 max-w-lg">
          <div class="relative">
            <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <button class="flex items-center space-x-1 text-[#525866] hover:text-gray-900">
            <QuestionMarkCircleIcon class="w-5 h-5" />
            <span class="text-sm">Need Help</span>
          </button>
          
          <BellIcon class="w-6 h-6 text-[#525866] hover:text-gray-900 cursor-pointer" />
          
          <div class="flex items-center space-x-2">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User avatar"
              class="w-8 h-8 rounded-full"
            />
            <ChevronDownIcon class="w-4 h-4 text-[#525866]" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { 
  MagnifyingGlassIcon, 
  QuestionMarkCircleIcon, 
  BellIcon,
  ChevronDownIcon 
} from '@heroicons/vue/24/outline'
</script>