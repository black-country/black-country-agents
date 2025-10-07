<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left">
              <input type="checkbox" class="rounded border-gray-300" />
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Applied</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="application in applications" :key="application.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <input type="checkbox" class="custom-checkbox" />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <span class="font-medium text-[#0C111D]">{{ application.property.name }}</span>
                <span v-if="application.id === '1'" class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">12</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <img :src="application.property.owner.avatar" :alt="application.property.owner.name" class="w-6 h-6 rounded-full" />
                <span class="text-gray-600">{{ application.property.owner.name }}</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(application.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                {{ application.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <img :src="getCountryFlag(application.property.country)" :alt="application.property.country" class="w-4 h-4" />
                <span class="text-gray-600">{{ application.property.location }}</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-600">{{ application.dateApplied }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="relative">
                <button 
                  @click="toggleDropdown(application.id)"
                  class="p-1 hover:bg-gray-100 rounded"
                >
                  <MoreHorizontal class="w-4 h-4" />
                </button>
                
                <div 
                  v-if="activeDropdown === application.id"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                >
                  <div class="py-1">
                    <button 
                      @click="handleAction('view', application)"
                      class="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Eye class="w-4 h-4" />
                      View Application
                    </button>
                    <button 
                      @click="handleAction('property', application)"
                      class="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Building class="w-4 h-4" />
                      View Property
                    </button>
                    <button 
                      @click="handleAction('delete', application)"
                      class="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 class="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
      <div class="text-sm text-gray-500">
        Showing {{ Math.min(10, applications.length) }} owners out {{ applications.length }} users
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
import { ref, onMounted } from 'vue'
import { MoreHorizontal, Eye, Building, Trash2, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { Application } from '~/types'

interface Props {
  applications: Application[]
}

defineProps<Props>()
const emit = defineEmits<{
  'application-action': [action: string, application: Application]
}>()

const activeDropdown = ref<string | null>(null)

const toggleDropdown = (id: string) => {
  activeDropdown.value = activeDropdown.value === id ? null : id
}

const handleAction = (action: string, application: Application) => {
  activeDropdown.value = null
  emit('application-action', action, application)
}

const getStatusClass = (status: string) => {
  const classes = {
    'In review': 'bg-orange-100 text-orange-800',
    'Rejected': 'bg-red-100 text-red-800',
    'Shortlisted': 'bg-blue-100 text-blue-800'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

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

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!(e.target as Element).closest('.relative')) {
      activeDropdown.value = null
    }
  })
})
</script>
