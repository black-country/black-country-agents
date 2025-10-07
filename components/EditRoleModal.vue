<template>
  <div 
    v-if="show" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
      <h3 class="text-lg font-semibold text-[#0C111D] mb-4">Edit Role</h3>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            :value="user?.email"
            type="email"
            disabled
            class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select
            v-model="selectedRole"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Admin">Admin</option>
            <option value="Member">Member</option>
          </select>
        </div>
      </div>
      
      <div class="flex justify-end space-x-3 mt-6">
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
        <button
          @click="updateRole"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Update User
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  show: boolean
  user: any
}

const props = defineProps<Props>()
defineEmits<{
  close: []
  update: []
}>()

const selectedRole = ref('')

watch(() => props.user, (newUser) => {
  if (newUser) {
    selectedRole.value = newUser.role
  }
}, { immediate: true })

const updateRole = () => {
  // Handle role update logic
  console.log('Updating role to:', selectedRole.value)
  // Emit update event
}
</script>
