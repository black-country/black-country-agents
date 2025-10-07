<template>
  <div class="container mx-auto p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold text-[#0C111D]">Users</h1>
      <button 
        @click="showFilters = true"
        class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
      >
        <Filter class="w-4 h-4" />
        Filter By
      </button>
    </div>

    <UsersList 
      :users="filteredUsers" 
      :active-tab="activeTab"
      @tab-change="activeTab = $event"
      @user-action="handleUserAction"
    />

    <!-- Filter Sidebar -->
    <FilterSidebar 
      v-model:show="showFilters"
      v-model:filters="filters"
      @apply="applyFilters"
      @reset="resetFilters"
    />

    <!-- Confirmation Modal -->
    <!-- <ConfirmationModal
      v-model:show="showModal"
      :title="modalConfig.title"
      :message="modalConfig.message"
      :action-text="modalConfig.actionText"
      :action-variant="modalConfig.variant"
      @confirm="confirmAction"
    /> -->
  </div>
</template>

<script setup lang="ts">
import { Filter } from 'lucide-vue-next'
import { ref } from 'vue'
import { navigateTo } from '#app'
import type { User, FilterOptions } from '~/types'
import { useUsers } from '~/composables/useUsers'
import ConfirmationModal from '~/components/ConfirmationModal.vue'
import FilterSidebar from '~/components/FilterSidebar.vue'
import UsersList from '~/components/UsersList.vue'

const activeTab = ref<'active' | 'archived' | 'blocked'>('active')
const showFilters = ref(false)
const showModal = ref(false)
const filters = ref<FilterOptions>({
  location: '',
  previousHistory: null
})

definePageMeta({
  layout: 'dashboard'
})

const modalConfig = ref({
  title: '',
  message: '',
  actionText: '',
  variant: 'primary' as 'primary' | 'danger'
})

const pendingAction = ref<{ action: string; user: User } | null>(null)

const { users, filteredUsers, applyFilters, resetFilters } = useUsers(filters, activeTab)

const handleUserAction = (action: string, user: User) => {
  if (['block', 'delete', 'archive', 'clear-sensitive'].includes(action)) {
    pendingAction.value = { action, user }
    
    const configs = {
      block: {
        title: 'Block User',
        message: 'Are your sure you want to proceed with this action',
        actionText: 'Block',
        variant: 'danger' as const
      },
      delete: {
        title: 'Delete User',
        message: 'Are your sure you want to proceed with this action',
        actionText: 'Delete',
        variant: 'danger' as const
      },
      archive: {
        title: 'Archive User',
        message: 'Are your sure you want to proceed with this action',
        actionText: 'Archive',
        variant: 'primary' as const
      },
      'clear-sensitive': {
        title: 'Clear Sensitive Information',
        message: 'Are your sure you want to proceed with this action',
        actionText: 'Clear',
        variant: 'danger' as const
      }
    }
    
    modalConfig.value = configs[action as keyof typeof configs]
    showModal.value = true
  } else if (action === 'view') {
    navigateTo(`/users/${user.id}`)
  }
}

const confirmAction = () => {
  if (pendingAction.value) {
    // Handle the action here
    console.log(`Performing ${pendingAction.value.action} on user ${pendingAction.value.user.name}`)
    pendingAction.value = null
  }
  showModal.value = false
}
</script>
