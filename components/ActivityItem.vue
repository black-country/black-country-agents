<template>
  <div class="flex items-start space-x-3">
    <div class="flex-shrink-0">
      <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="activity.color">
        <component :is="iconComponent" class="w-4 h-4" />
      </div>
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium text-[#0C111D]">{{ activity.title }}</p>
      <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
      <div class="flex items-center mt-2 space-x-1">
        <img
          v-for="user in activity.users"
          :key="user"
          :src="`/placeholder.svg?height=20&width=20&query=${user} avatar`"
          :alt="user"
          class="w-5 h-5 rounded-full border border-white"
        />
        <span class="text-xs text-gray-600 ml-2">{{ activity.users[0] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Plus, UserPlus, Edit, Trash } from 'lucide-vue-next'

interface Activity {
  id: number
  type: string
  title: string
  time: string
  users: string[]
  icon: string
  color: string
}

interface Props {
  activity: Activity
}

const props = defineProps<Props>()

const iconMap = {
  'plus': Plus,
  'user-plus': UserPlus,
  'edit': Edit,
  'trash': Trash
}

const iconComponent = computed(() => iconMap[props.activity.icon as keyof typeof iconMap])
</script>
