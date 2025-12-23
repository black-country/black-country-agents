<template>
  <Transition name="modal">
    <div 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
          <div class="flex items-start justify-between">
            <div>
              <h2 class="text-2xl font-bold mb-2">Reschedule Appointment</h2>
              <p class="text-blue-100 text-sm">Choose a new date and time for your consultation</p>
            </div>
            <button 
              @click="$emit('close')"
              class="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Current Appointment Info -->
        <div class="p-6 bg-gray-50 border-b border-gray-200">
          <p class="text-sm font-medium text-gray-600 mb-2">Current Appointment:</p>
          <div class="flex items-center gap-3">
            <div class="bg-white p-3 rounded-lg shadow-sm">
              <span class="text-2xl">📅</span>
            </div>
            <div>
              <p class="font-bold text-gray-900">{{ formatDate(appointment.date) }}</p>
              <p class="text-sm text-gray-600">{{ appointment.timeSlot }}</p>
            </div>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
          <!-- New Date -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">
              Select New Date
            </label>
            <div class="relative">
              <input
                v-model="newDate"
                type="date"
                :min="minDate"
                required
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                📅
              </span>
            </div>
            <p class="text-xs text-gray-500 mt-1">Choose a date at least 24 hours in advance</p>
          </div>

          <!-- New Time Slot -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">
              Select Time Slot
            </label>
            <div class="grid grid-cols-1 gap-2">
              <label
                v-for="slot in timeSlots"
                :key="slot.value"
                :class="[
                  'flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all',
                  newTimeSlot === slot.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                ]"
              >
                <input
                  type="radio"
                  v-model="newTimeSlot"
                  :value="slot.value"
                  required
                  class="w-4 h-4 text-blue-600"
                />
                <div class="flex-1">
                  <p class="font-semibold text-gray-900">{{ slot.label }}</p>
                  <p class="text-sm text-gray-600">{{ slot.description }}</p>
                </div>
                <span class="text-xl">{{ slot.icon }}</span>
              </label>
            </div>
          </div>

          <!-- Warning Message -->
          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div class="flex gap-3">
              <span class="text-xl">⚠️</span>
              <div>
                <p class="font-semibold text-yellow-900 text-sm">Important Notice</p>
                <p class="text-sm text-yellow-800 mt-1">
                  Rescheduling is subject to availability. You may need to pay a rescheduling fee.
                </p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="$emit('close')"
              class="flex-1 px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="!isFormValid"
              class="flex-1 px-6 py-3 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Reschedule
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Appointment } from '@/types/index'

const props = defineProps<{
  appointment: Appointment
}>()

const emit = defineEmits<{
  close: []
  confirm: [data: { date: string; timeSlot: string }]
}>()

const newDate = ref('')
const newTimeSlot = ref('')

const timeSlots = [
  {
    value: '09:00 - 12:00',
    label: '09:00 AM - 12:00 PM',
    description: 'Morning session',
    icon: '🌅'
  },
  {
    value: '12:00 - 15:00',
    label: '12:00 PM - 03:00 PM',
    description: 'Afternoon session',
    icon: '☀️'
  },
  {
    value: '15:00 - 18:00',
    label: '03:00 PM - 06:00 PM',
    description: 'Evening session',
    icon: '🌆'
  }
]

const minDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})

const isFormValid = computed(() => {
  return newDate.value !== '' && newTimeSlot.value !== ''
})

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('confirm', {
      date: newDate.value,
      timeSlot: newTimeSlot.value
    })
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9);
}
</style>