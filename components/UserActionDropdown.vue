<template>
  <div class="relative">
    <button 
      @click="showDropdown = !showDropdown"
      class="p-1 hover:bg-gray-100 rounded"
    >
      <MoreHorizontal class="w-4 h-4" />
    </button>
    
    <div 
      v-if="showDropdown"
      class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
    >
      <div class="py-1">
        <button 
          @click="handleAction('view')"
          class="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <Eye class="w-4 h-4" />
          View
        </button>
        <button 
          @click="handleAction('block')"
          class="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <Ban class="w-4 h-4" />
          Block
        </button>
        <button 
          @click="handleAction('archive')"
          class="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <Archive class="w-4 h-4" />
          Archive
        </button>
        <button 
          @click="handleAction('clear-sensitive')"
          class="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <Shield class="w-4 h-4" />
          Clear Sensitive Info
        </button>
        <button 
          @click="handleAction('delete')"
          class="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <Trash2 class="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MoreHorizontal, Eye, Ban, Archive, Shield, Trash2 } from 'lucide-vue-next'
import type { User } from '~/types'
import { ref, onMounted } from 'vue'

interface Props {
  user: User | undefined
}

defineProps<Props>()
const emit = defineEmits<{
  action: [action: string, user: User]
}>()

const showDropdown = ref(false)

const handleAction = (action: string) => {
  showDropdown.value = false
  emit('action', action)
}

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!(e.target as Element).closest('.relative')) {
      showDropdown.value = false
    }
  })
})
</script>
