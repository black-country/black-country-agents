<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <component :is="iconComponent" class="w-4 h-4 text-gray-500" />
        <span class="text-sm font-medium text-gray-500">{{ title }}</span>
      </div>
    </div>
    
    <div class="mt-4">
      <div class="text-2xl font-bold text-gray-900">{{ value }}</div>
      <div class="flex items-center mt-2">
        <component :is="trendIcon" class="w-4 h-4 mr-1" :class="trendColor" />
        <span class="text-sm font-medium" :class="trendColor">{{ change }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { 
  DollarSign, Building, Users, UserCheck, FileText,
  TrendingUp, TrendingDown 
} from 'lucide-vue-next'

interface Props {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: string
}

const props = defineProps<Props>()

const iconMap = {
  'dollar-sign': DollarSign,
  'building': Building,
  'users': Users,
  'user-check': UserCheck,
  'file-text': FileText
}

const iconComponent = computed(() => iconMap[props.icon as keyof typeof iconMap])

const trendIcon = computed(() => props.trend === 'up' ? TrendingUp : TrendingDown)

const trendColor = computed(() => props.trend === 'up' ? 'text-green-600' : 'text-red-600')
</script>
