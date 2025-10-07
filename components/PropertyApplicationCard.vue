<template>
  <tr class="hover:bg-gray-50">
    <td class="px-6 py-4 whitespace-nowrap">
      <input type="checkbox" class="custom-checkbox" />
    </td>
    
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center space-x-2">
        <img :src="application.avatar" :alt="application.applicantName" class="w-8 h-8 rounded-full" />
        <span class="font-medium text-[#0C111D]">{{ application.applicantName }}</span>
      </div>
    </td>
    
    <td class="px-6 py-4 whitespace-nowrap">
      <span class="text-sm text-[#0C111D]">{{ application.applicantEmail }}</span>
    </td>
    
    <td class="px-6 py-4 whitespace-nowrap">
      <span class="text-sm text-[#0C111D]">{{ application.dateApplied }}</span>
    </td>
    
    <td class="px-6 py-4 whitespace-nowrap">
      <span class="text-sm text-[#0C111D]">{{ application.applicantPhone }}</span>
    </td>
    
    <td class="px-6 py-4 whitespace-nowrap">
      <span
        :class="[
          'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
          getStatusColor(application.status)
        ]"
      >
        {{ application.status }}
      </span>
    </td>
    
    <td class="px-6 py-4 whitespace-nowrap">
      <button
        @click="$emit('view', application.id)"
        class="text-gray-400 hover:text-[#525866]"
      >
        <ChevronRightIcon class="w-5 h-5" />
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
import type { Application } from '~/types'

interface Props {
  application: Application
}

interface Emits {
  (e: 'view', id: string): void
}

defineProps<Props>()
defineEmits<Emits>()

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'Rejected': 'bg-red-100 text-red-800',
    'Shortlisted': 'bg-purple-100 text-purple-800',
    'Under Review': 'bg-yellow-100 text-yellow-800',
    'In Review': 'bg-yellow-100 text-yellow-800',
    'Accepted': 'bg-green-100 text-green-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}
</script>