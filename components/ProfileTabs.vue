<template>
  <div class="border-b border-gray-200">
    <nav class="-mb-px flex space-x-8">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="$emit('tabChange', tab.id)"
        :class="[
          'py-2 px-1 border-b-2 font-medium text-sm',
          activeTab === tab.id
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        ]"
      >
        {{ tab.label }}
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
interface Props {
  activeTab: string
}

defineProps<Props>()
defineEmits<{
  tabChange: [tab: string]
}>()

const tabs = ref([
  { id: 'personal', label: 'Personal Info' },
  { id: 'team', label: 'Team management' },
  { id: 'password', label: 'Reset Password' }
])
</script>
