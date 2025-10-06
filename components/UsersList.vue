<template>
  <div>
    <!-- Tabs -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="$emit('tab-change', tab.id)"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2',
            activeTab === tab.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          {{ tab.name }}
          <span v-if="tab.count" class="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
            {{ tab.count }}
          </span>
        </button>
      </nav>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left">
                <input type="checkbox" class="rounded border-gray-300" />
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <input type="checkbox" class="rounded border-gray-300" />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <img :src="user.avatar" :alt="user.name" class="w-8 h-8 rounded-full" />
                  <span class="font-medium text-gray-900">{{ user.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-600">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-600">{{ user.phone }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <img :src="getCountryFlag(user.country)" :alt="user.country" class="w-4 h-4 rounded-sm" />
                  <span class="text-gray-600">{{ user.location }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-600">{{ user.lastLogin }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <UserActionDropdown :user="user" @action="$emit('user-action', $event, user)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
        <div class="text-sm text-gray-500">
          Showing {{ Math.min(10, users.length) }} owners out {{ users.length }} users
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
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { User } from '~/types'
import { computed } from 'vue'

interface Props {
  users: User[]
  activeTab: 'active' | 'archived' | 'blocked'
}

defineProps<Props>()
defineEmits<{
  'tab-change': [tab: 'active' | 'archived' | 'blocked']
  'user-action': [action: string, user: User]
}>()

const tabs = computed(() => [
  { id: 'active', name: 'Active', count: null },
  { id: 'archived', name: 'Archived', count: 92 },
  { id: 'blocked', name: 'Blocked', count: 92 }
])

const getCountryFlag = (country: string) => {
  const flags: Record<string, string> = {
    'Nigeria': '/placeholder.svg?height=16&width=16',
    'USA': '/placeholder.svg?height=16&width=16',
    'UK': '/placeholder.svg?height=16&width=16',
    'France': '/placeholder.svg?height=16&width=16',
    'Guinea': '/placeholder.svg?height=16&width=16',
    'Palestine': '/placeholder.svg?height=16&width=16'
  }
  return flags[country] || '/placeholder.svg?height=16&width=16'
}
</script>
