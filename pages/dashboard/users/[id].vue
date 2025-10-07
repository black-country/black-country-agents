<template>
  <div>
    <!-- Back Button -->
    <button @click="$router.back()" class="flex items-center gap-2 text-gray-600 hover:text-[#0C111D] mb-6">
      <ArrowLeft class="w-4 h-4" />
      Back
    </button>

    <!-- User Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4">
        <img :src="user?.avatar || '/placeholder.svg?height=64&width=64'" 
             :alt="user?.name" 
             class="w-16 h-16 rounded-full" />
        <div>
          <h1 class="text-2xl font-semibold text-[#0C111D]">{{ user?.name }}</h1>
          <p class="text-gray-600">{{ user?.email }}</p>
        </div>
      </div>
      
      <UserActionDropdown :user="user" @action="handleUserAction" />
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm',
            activeTab === tab.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="min-h-96">
      <UserOverview v-if="activeTab === 'overview'" :user="user" />
      <SavedProperty v-else-if="activeTab === 'saved'" :user="user" />
      <ViewedProperty v-else-if="activeTab === 'viewed'" :user="user" />
      <AllApplications v-else-if="activeTab === 'applications'" :user="user" />
    </div>

    <!-- Confirmation Modal -->
    <ConfirmationModal
      v-model:show="showModal"
      :title="modalConfig.title"
      :message="modalConfig.message"
      :action-text="modalConfig.actionText"
      :action-variant="modalConfig.variant"
      @confirm="confirmAction"
    />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import type { User } from '~/types'
import { useUsers } from '~/composables/useUsers'
import UserOverview from '~/components/UserOverview.vue'
import SavedProperty from '~/components/SavedProperty.vue'
import ViewedProperty from '~/components/ViewedProperty.vue'
import AllApplications from '~/components/AllApplications.vue'
import UserActionDropdown from '~/components/UserActionDropdown.vue'
import ConfirmationModal from '~/components/ConfirmationModal.vue'

const route = useRoute()
const userId = route.params.id as string

const activeTab = ref('overview')
const showModal = ref(false)
const modalConfig = ref({
  title: '',
  message: '',
  actionText: '',
  variant: 'primary' as 'primary' | 'danger'
})
const pendingAction = ref<{ action: string; user: User } | null>(null)

const tabs = [
  { id: 'overview', name: 'Overview' },
  { id: 'saved', name: 'Saved Property' },
  { id: 'viewed', name: 'Viewed Property' },
  { id: 'applications', name: 'All Applications' }
]

const { getUserById } = useUsers()
const user = computed(() => getUserById(userId))

const handleUserAction = (action: string, user: User) => {
  if (['block', 'delete', 'archive', 'clear-sensitive'].includes(action)) {
    pendingAction.value = { action, user }
    
    const configs = {
      block: { title: 'Block User', message: 'Are your sure you want to proceed with this action', actionText: 'Block', variant: 'danger' as const },
      delete: { title: 'Delete User', message: 'Are your sure you want to proceed with this action', actionText: 'Delete', variant: 'danger' as const },
      archive: { title: 'Archive User', message: 'Are your sure you want to proceed with this action', actionText: 'Archive', variant: 'primary' as const },
      'clear-sensitive': { title: 'Clear Sensitive Information', message: 'Are your sure you want to proceed with this action', actionText: 'Clear', variant: 'danger' as const }
    }
    
    modalConfig.value = configs[action as keyof typeof configs]
    showModal.value = true
  }
}

const confirmAction = () => {
  if (pendingAction.value) {
    console.log(`Performing ${pendingAction.value.action} on user ${pendingAction.value.user.name}`)
    pendingAction.value = null
  }
  showModal.value = false
}
</script>
