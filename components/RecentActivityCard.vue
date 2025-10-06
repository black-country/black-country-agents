<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900">Recent Activity</h3>
      <button @click="$emit('view-all')" class="text-sm text-blue-600 hover:text-blue-700">View All</button>
    </div>
    
    <div class="space-y-4">
      <div v-for="activity in activities" :key="activity.id" class="flex items-start space-x-3">
        <div class="flex-shrink-0">
          <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="activity.color">
            <component :is="getIcon(activity.icon)" class="w-4 h-4" />
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
          <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, UserPlus, Edit, Trash } from 'lucide-vue-next'

defineEmits<{
  'view-all': []
}>()

const activities = [
  {
    id: 1,
    title: 'Created a new new property',
    time: '15 mins ago',
    icon: 'plus',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 2,
    title: 'Added a new team member',
    time: '15 mins ago',
    icon: 'user-plus',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 3,
    title: 'Added a new team member',
    time: '15 mins ago',
    icon: 'user-plus',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 4,
    title: 'Updated your profile',
    time: '15 mins ago',
    icon: 'edit',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 5,
    title: 'Deleted a property',
    time: '15 mins ago',
    icon: 'trash',
    color: 'bg-red-100 text-red-600'
  }
]

const iconMap = {
  'plus': Plus,
  'user-plus': UserPlus,
  'edit': Edit,
  'trash': Trash
}

const getIcon = (iconName: string) => iconMap[iconName as keyof typeof iconMap]
</script>
