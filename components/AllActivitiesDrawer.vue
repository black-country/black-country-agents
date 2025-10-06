<template>
  <div v-if="open" class="fixed inset-0 z-50 overflow-hidden">
    <div class="absolute inset-0 bg-black bg-opacity-50" @click="$emit('update:open', false)"></div>
    <div class="absolute right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300">
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">All Activities</h2>
        <div class="flex items-center space-x-4">
          <select class="px-3 py-1 border border-gray-300 rounded text-sm">
            <option>Select Admin</option>
          </select>
          <select class="px-3 py-1 border border-gray-300 rounded text-sm">
            <option>All Time</option>
            <option>Today</option>
            <option>Week</option>
            <option>Month</option>
          </select>
          <button @click="$emit('update:open', false)" class="text-gray-400 hover:text-gray-600">
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div class="p-6 overflow-y-auto h-full">
        <!-- Today Section -->
        <div class="mb-6">
          <h3 class="text-sm font-medium text-gray-900 mb-4">Today</h3>
          <div class="space-y-4">
            <ActivityItem
              v-for="activity in todayActivities"
              :key="activity.id"
              :activity="activity"
            />
          </div>
        </div>
        
        <!-- Yesterday Section -->
        <div class="mb-6">
          <h3 class="text-sm font-medium text-gray-900 mb-4">Yesterday</h3>
          <div class="space-y-4">
            <ActivityItem
              v-for="activity in yesterdayActivities"
              :key="activity.id"
              :activity="activity"
            />
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
import { X } from 'lucide-vue-next'

interface Props {
  open: boolean
}

defineProps<Props>()
defineEmits<{
  'update:open': [value: boolean]
}>()

const todayActivities = [
  {
    id: 1,
    type: 'created',
    title: 'Created a new new property',
    time: '15 mins ago',
    users: ['Nneka Chukwu'],
    icon: 'plus',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 2,
    type: 'added',
    title: 'Added a new team member',
    time: '15 mins ago',
    users: ['Jide Kosoko'],
    icon: 'user-plus',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 3,
    type: 'added',
    title: 'Added a new team member',
    time: '15 mins ago',
    users: ['Damilare Usman'],
    icon: 'user-plus',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 4,
    type: 'updated',
    title: 'Updated your profile',
    time: '15 mins ago',
    users: ['Desmond Tutu'],
    icon: 'edit',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 5,
    type: 'deleted',
    title: 'Deleted a property',
    time: '15 mins ago',
    users: ['Adebayo Salami'],
    icon: 'trash',
    color: 'bg-red-100 text-red-600'
  }
]

const yesterdayActivities = [
  {
    id: 6,
    type: 'created',
    title: 'Created a new new property',
    time: '15 mins ago',
    users: ['Oladejo Israel'],
    icon: 'plus',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 7,
    type: 'added',
    title: 'Added a new team member',
    time: '15 mins ago',
    users: ['Baba Kaothat'],
    icon: 'user-plus',
    color: 'bg-green-100 text-green-600'
  }
]
</script>
