<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="$emit('cancel')"></div>

      <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div class="sm:flex sm:items-start">
          <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
               :class="iconBgClass">
            <component :is="iconComponent" class="h-6 w-6" :class="iconClass" />
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-[#0C111D]">
              {{ title }}
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                {{ message }}
              </p>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            @click="$emit('confirm')"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            :class="actionButtonClass"
          >
            {{ actionText }}
          </button>
          <button
            type="button"
            @click="$emit('cancel')"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Archive, Ban, Trash2 } from 'lucide-vue-next'

interface Props {
  title: string
  message: string
  actionText: string
  actionColor: string
  icon: string
}

const props = defineProps<Props>()

defineEmits<{
  confirm: []
  cancel: []
}>()

const iconComponent = computed(() => {
  switch (props.icon) {
    case 'archive':
      return Archive
    case 'ban':
      return Ban
    case 'trash':
      return Trash2
    default:
      return Archive
  }
})

const iconBgClass = computed(() => {
  switch (props.actionColor) {
    case 'red':
      return 'bg-red-100'
    case 'blue':
      return 'bg-blue-100'
    default:
      return 'bg-gray-100'
  }
})

const iconClass = computed(() => {
  switch (props.actionColor) {
    case 'red':
      return 'text-red-600'
    case 'blue':
      return 'text-blue-600'
    default:
      return 'text-gray-600'
  }
})

const actionButtonClass = computed(() => {
  switch (props.actionColor) {
    case 'red':
      return 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
    case 'blue':
      return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
    default:
      return 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'
  }
})
</script>
