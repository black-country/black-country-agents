<template>
  <tr class="hover:bg-gray-50">
    <td class="px-6 py-4 whitespace-nowrap">
      <input type="checkbox" class="custom-checkbox" />
    </td>
    
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center space-x-3">
        <span class="font-medium text-[#0C111D]">{{ property.name }}</span>
        <span v-if="property.applications.length > 0" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {{ property.applications.length }} Applications
        </span>
      </div>
    </td>
    
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center space-x-2">
        <img :src="property.owner.avatar" :alt="property.owner.name" class="w-6 h-6 rounded-full" />
        <span class="text-sm text-[#0C111D]">{{ property.owner.name }}</span>
      </div>
    </td>
    
    <td class="px-6 py-4 whitespace-nowrap">
      <span class="text-sm text-[#0C111D]">{{ property.propertyType }}</span>
    </td>
    
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center space-x-1">
        <img :src="getCountryFlag(property.country)" :alt="property.country" class="w-4 h-4" />
        <span class="text-sm text-[#0C111D]">{{ property.location }}</span>
      </div>
    </td>
    
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center space-x-4 text-sm text-[#0C111D]">
        <div class="flex items-center space-x-1">
          <UsersIcon class="w-4 h-4 text-gray-400" />
          <span>{{ property.specs.bedrooms }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <HomeIcon class="w-4 h-4 text-gray-400" />
          <span>{{ property.specs.bathrooms }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <Square3Stack3DIcon class="w-4 h-4 text-gray-400" />
          <span>{{ property.specs.area }}</span>
        </div>
      </div>
    </td>
    
    <td class="px-6 py-4 whitespace-nowrap">
      <button
        @click="$emit('view', property.id)"
        class="text-gray-400 hover:text-[#525866]"
      >
        <EllipsisHorizontalIcon class="w-5 h-5" />
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { 
  UsersIcon, 
  HomeIcon, 
  EllipsisHorizontalIcon,
  Square3Stack3DIcon
} from '@heroicons/vue/24/outline'
import type { Property } from '~/types'

interface Props {
  property: Property
}

interface Emits {
  (e: 'view', id: string): void
}

defineProps<Props>()
defineEmits<Emits>()

const getCountryFlag = (country: string) => {
  const flags: Record<string, string> = {
    'Nigeria': 'https://flagcdn.com/w20/ng.png',
    'USA': 'https://flagcdn.com/w20/us.png',
    'UK': 'https://flagcdn.com/w20/gb.png',
    'Guinea': 'https://flagcdn.com/w20/gn.png',
    'Palestine': 'https://flagcdn.com/w20/ps.png'
  }
  return flags[country] || 'https://flagcdn.com/w20/un.png'
}
</script>