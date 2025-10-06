<template>
  <div v-if="open" class="fixed inset-0 z-50 overflow-hidden">
    <div class="absolute inset-0 bg-black bg-opacity-50" @click="$emit('update:open', false)"></div>
    <div class="absolute right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300">
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">Notifications</h2>
        <div class="flex items-center space-x-4">
          <button class="text-sm text-blue-600 hover:text-blue-700">Mark all as read</button>
          <button @click="$emit('update:open', false)" class="text-gray-400 hover:text-gray-600">
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div class="p-6 overflow-y-auto h-full">
        <div v-if="notifications.length === 0" class="flex flex-col items-center justify-center h-64">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <span class="text-2xl">😴</span>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No Notifications</h3>
          <p class="text-sm text-gray-500">Check back later</p>
        </div>
        
        <div v-else class="space-y-4">
          <NotificationItem
            v-for="notification in notifications"
            :key="notification.id"
            :notification="notification"
          />
        </div>
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

const notifications = [
  {
    id: 1,
    type: 'RENTAL AGREEMENT SIGNED',
    title: 'The rental agreement for [Property Name] has been signed',
    time: '15 mins ago',
    icon: 'check',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 2,
    type: 'NEW PROPERTY LISTING PENDING APPROVAL',
    title: 'A new property has been submitted by [Agent Name] for renting/selling. Please review the listing',
    time: '15 mins ago',
    icon: 'clock',
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: 3,
    type: 'NEW OFFER RECEIVED FOR [PROPERTY NAME]',
    title: 'A new offer has been made for [Property Name] by [Buyer Name]. Review the offer and assign it to the appropriate agent.',
    time: '15 mins ago',
    icon: 'dollar-sign',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 4,
    type: 'NEW AGENT REGISTERED',
    title: '[Agent Name] has been successfully onboarded. Review their profile and assign properties for listing or management.',
    time: '15 mins ago',
    icon: 'user-plus',
    color: 'bg-purple-100 text-purple-600'
  }
]
</script>
