<template>
  <div class="bg-white rounded-lg shadow">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <h2 class="text-xl font-semibold text-gray-900">Team management</h2>
      <button 
        @click="modals.showInviteModal.value = true"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Invite Member
      </button>
    </div>
    
    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left">
              <input type="checkbox" class="rounded border-gray-300" />
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Member
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email Address
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Roles
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="member in members" :key="member.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <input type="checkbox" class="rounded border-gray-300" />
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <img :src="member.avatar" :alt="member.name" class="w-8 h-8 rounded-full mr-3" />
                <span class="text-sm font-medium text-gray-900">{{ member.name }}</span>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
              {{ member.email }}
            </td>
            <td class="px-6 py-4">
              <span 
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  member.role === 'Admin' 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'bg-purple-100 text-purple-800'
                ]"
              >
                {{ member.role }}
              </span>
            </td>
            <td class="px-6 py-4">
              <span 
                :class="[
                  'text-sm',
                  member.status === 'Active' ? 'text-green-600' : 'text-gray-500'
                ]"
              >
                {{ member.status }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="relative">
                <button 
                  @click="toggleDropdown(member.id)"
                  class="text-gray-400 hover:text-gray-600"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                
                <div 
                  v-if="activeDropdown === member.id"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                >
                  <div class="py-1">
                    <button 
                      @click="editRole(member)"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Edit Role
                    </button>
                    <button 
                      @click="blockUser(member)"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Block User
                    </button>
                    <button 
                      @click="deleteUser(member)"
                      class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Pagination -->
    <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
      <div class="text-sm text-gray-500">
        Showing 10 - owners out 250 users
      </div>
      <div class="flex items-center space-x-2">
        <button class="p-2 text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button class="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
        <button class="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm">2</button>
        <button class="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm">3</button>
        <span class="text-gray-500">...</span>
        <button class="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm">8</button>
        <button class="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm">9</button>
        <button class="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm">10</button>
        <button class="p-2 text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, onUnmounted } from 'vue'

const modals = inject('modals')
const activeDropdown = ref<number | null>(null)

const members = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    role: 'Admin',
    status: 'Active',
    avatar: '/placeholder.svg?height=32&width=32'
  },
  {
    id: 2,
    name: 'Jenny Wilson',
    email: 'danghoang87hl@gmail.com',
    role: 'Member',
    status: 'Blocked',
    avatar: '/placeholder.svg?height=32&width=32'
  },
  {
    id: 3,
    name: 'Cody Fisher',
    email: 'binhan628@gmail.com',
    role: 'Member',
    status: 'Active',
    avatar: '/placeholder.svg?height=32&width=32'
  },
  {
    id: 4,
    name: 'Ronald Richards',
    email: 'manhhachkt08@gmail.com',
    role: 'Member',
    status: 'Blocked',
    avatar: '/placeholder.svg?height=32&width=32'
  },
  {
    id: 5,
    name: 'Jane Cooper',
    email: 'vuhaithuongnute@gmail.com',
    role: 'Member',
    status: 'Active',
    avatar: '/placeholder.svg?height=32&width=32'
  },
  {
    id: 6,
    name: 'Esther Howard',
    email: 'thuhang.nute@gmail.com',
    role: 'Admin',
    status: 'Active',
    avatar: '/placeholder.svg?height=32&width=32'
  }
])

const toggleDropdown = (id: number) => {
  activeDropdown.value = activeDropdown.value === id ? null : id
}

const editRole = (member: any) => {
  modals.selectedUser.value = member
  modals.showEditRoleModal.value = true
  activeDropdown.value = null
}

const blockUser = (member: any) => {
  modals.selectedUser.value = member
  modals.showBlockModal.value = true
  activeDropdown.value = null
}

const deleteUser = (member: any) => {
  // Handle delete user
  activeDropdown.value = null
}

const handleClickOutside = (event: Event) => {
  if (!(event.target as Element).closest('.relative')) {
    activeDropdown.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
