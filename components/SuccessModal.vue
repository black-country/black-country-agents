<template>
  <div 
    v-if="show" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
      <div class="text-center">
        <div class="w-16 h-16 mx-auto mb-4">
          <img src="@/assets/img/success.png" alt="Success" class="w-full h-full" />
        </div>
        
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          {{ modalContent.title }}
        </h3>
        <p class="text-gray-600 mb-6">
          {{ modalContent.message }}
        </p>
        
        <button
          @click="$emit('close')"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  show: boolean
  type: 'invite' | 'password' | 'block'
}

const props = defineProps<Props>()
defineEmits<{
  close: []
}>()

const modalContent = computed(() => {
  switch (props.type) {
    case 'invite':
      return {
        title: 'Invite Sent',
        message: 'An invite has been sent to alang@gmail.com'
      }
    case 'password':
      return {
        title: 'Password Updated',
        message: 'Your account password has successfully been updated'
      }
    case 'block':
      return {
        title: 'User Blocked',
        message: 'The user has been successfully blocked'
      }
    default:
      return {
        title: 'Success',
        message: 'Operation completed successfully'
      }
  }
})
</script>
