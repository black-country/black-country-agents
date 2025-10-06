<template>
  <div class="min-h-screen">
      <!-- Profile Content -->
      <div class="p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
        
        <!-- Tabs -->
        <ProfileTabs 
          :active-tab="activeTab" 
          @tab-change="activeTab = $event" 
        />
        
        <!-- Tab Content -->
        <div class="mt-6">
          <PersonalInfo v-if="activeTab === 'personal'" />
          <TeamManagement v-else-if="activeTab === 'team'" />
          <ResetPassword v-else-if="activeTab === 'password'" />
        </div>
      </div>

    <!-- Modals -->
    <InviteMemberModal 
      :show="showInviteModal" 
      @close="showInviteModal = false"
      @invite-sent="handleInviteSent"
    />
    
    <BlockUserModal 
      :show="showBlockModal" 
      :user="selectedUser"
      @close="showBlockModal = false"
      @confirm="handleBlockUser"
    />
    
    <EditRoleModal 
      :show="showEditRoleModal" 
      :user="selectedUser"
      @close="showEditRoleModal = false"
      @update="handleUpdateRole"
    />
    
    <SuccessModal 
      :show="showSuccessModal"
      :type="successType"
      @close="showSuccessModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import ProfileTabs from "@/components/ProfileTabs.vue"

const activeTab = ref('personal')
const showInviteModal = ref(false)
const showBlockModal = ref(false)
const showEditRoleModal = ref(false)
const showSuccessModal = ref(false)
const successType = ref<'invite' | 'password' | 'block'>('invite')
const selectedUser = ref(null)

const handleInviteSent = () => {
  showInviteModal.value = false
  successType.value = 'invite'
  showSuccessModal.value = true
}

const handleBlockUser = () => {
  showBlockModal.value = false
  successType.value = 'block'
  showSuccessModal.value = true
}

const handleUpdateRole = () => {
  showEditRoleModal.value = false
}

definePageMeta({
    layout: 'dashboard'
})

// Provide modal controls to child components
provide('modals', {
  showInviteModal,
  showBlockModal,
  showEditRoleModal,
  selectedUser
})
</script>
