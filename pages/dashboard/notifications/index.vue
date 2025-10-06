<template>
  <div class="max-w-4xl p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">Notifications</h1>
      <button class="text-sm text-blue-600 hover:text-blue-700">Mark all as read</button>
    </div>
    
    <div v-if="notifications.length === 0" class="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
      <div class="flex flex-col items-center justify-center">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <span class="text-4xl">😴</span>
        </div>
        <h3 class="text-xl font-medium text-gray-900 mb-2">No Notifications</h3>
        <p class="text-gray-500">Check back later</p>
      </div>
    </div>
    
    <div v-else class="space-y-4">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      >
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="notification.color">
              <component :is="getIcon(notification.icon)" class="w-5 h-5" />
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              {{ notification.type }}
            </div>
            <p class="text-sm font-medium text-gray-900 mb-2">{{ notification.title }}</p>
            <p class="text-xs text-gray-500">{{ notification.time }}</p>
          </div>
          <div class="flex-shrink-0">
            <ChevronRight class="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check, Clock, DollarSign, UserPlus, ChevronRight } from 'lucide-vue-next'

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

const iconMap = {
  'check': Check,
  'clock': Clock,
  'dollar-sign': DollarSign,
  'user-plus': UserPlus
}

definePageMeta({
    layout: 'dashboard'
})

const getIcon = (iconName: string) => iconMap[iconName as keyof typeof iconMap]
</script>
