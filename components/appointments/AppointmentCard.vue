<template>
  <div class="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
    <!-- Status Banner -->
    <div :class="['h-1', statusBannerColor]"></div>
    
    <div class="p-5">
      <!-- Header -->
      <div class="flex justify-between items-start mb-4">
        <div class="flex items-center gap-3">
          <div :class="['text-3xl p-2 rounded-lg', typeBackgroundColor]">
            {{ appointmentTypeIcon }}
          </div>
          <div>
            <h3 class="font-bold text-gray-900">
              {{ appointmentTypeLabel }}
            </h3>
            <p class="text-sm text-gray-500">
              {{ formatShortDate(appointment.date) }}
            </p>
          </div>
        </div>
        <span
          :class="[
            'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide',
            statusClass,
          ]"
        >
          {{ appointment.status }}
        </span>
      </div>

      <!-- Date & Time -->
      <div class="bg-gray-50 rounded-lg p-3 mb-4">
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center gap-2">
            <span class="text-gray-600">📅</span>
            <span class="font-medium text-gray-900">{{ formatLongDate(appointment.date) }}</span>
          </div>
        </div>
        <div class="flex items-center gap-2 mt-2 text-sm">
          <span class="text-gray-600">🕐</span>
          <span class="font-medium text-gray-900">{{ appointment.timeSlot }}</span>
        </div>
      </div>

      <!-- Details -->
      <div class="space-y-2 mb-4">
        <div v-if="appointment.consultationMode" class="flex items-center gap-2 text-sm">
          <span class="text-gray-500">Mode:</span>
          <span class="font-medium text-gray-900 capitalize">
            {{ appointment.consultationMode }}
          </span>
        </div>
        
        <div class="flex items-center gap-2 text-sm">
          <span class="text-gray-500">💰 Price:</span>
          <span class="font-bold text-gray-900">
            ₦{{ appointment.price.toLocaleString() }}
          </span>
        </div>
        
        <div class="flex items-center gap-2 text-sm">
          <span class="text-gray-500">💳 Payment:</span>
          <span :class="['font-semibold', paymentStatusClass]">
            {{ paymentStatusLabel }}
          </span>
        </div>
      </div>

      <!-- Meeting Link (if virtual and available) -->
      <a
        v-if="appointment.googleMeetLink && canShowMeetLink"
        :href="appointment.googleMeetLink"
        target="_blank"
        rel="noopener noreferrer"
        class="block w-full text-center px-4 py-2 mb-3 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition-colors text-sm"
      >
        🎥 Join Meeting
      </a>

      <!-- Actions -->
      <div class="flex gap-2 pt-4 border-t border-gray-100">
        <button
          @click="$emit('view-details')"
          class="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          View Details
        </button>
        
        <button
          v-if="appointment.paymentStatus === 'pending' && appointment.status !== 'cancelled'"
          @click="$emit('pay')"
          :disabled="initiating"
          class="flex-1 px-4 py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ initiating ? 'Processing...' : 'Pay Now' }}
        </button>
        
        <button
          v-if="canReschedule"
          @click="$emit('reschedule')"
          class="flex-1 px-4 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          Reschedule
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Appointment } from '@/types/index'

const props = defineProps<{
  appointment: Appointment
  initiating: boolean
}>()

defineEmits<{
  'view-details': []
  reschedule: []
  cancel: []
  pay: []
}>()

const appointmentTypeIcon = computed(() => 
  props.appointment.consultationType === 'physical' ? '🏥' : '💻'
)

const appointmentTypeLabel = computed(() => 
  props.appointment.consultationType === 'physical' 
    ? 'Physical Consultation' 
    : 'Virtual Consultation'
)

const typeBackgroundColor = computed(() =>
  props.appointment.consultationType === 'physical'
    ? 'bg-purple-50'
    : 'bg-blue-50'
)

const isUpcoming = computed(() => {
  const appointmentDate = new Date(props.appointment.date)
  const now = new Date()
  return appointmentDate > now
})

const canReschedule = computed(() => {
  return (props.appointment.status === 'pending' || props.appointment.status === 'confirmed') 
    && isUpcoming.value
})

const canShowMeetLink = computed(() => {
  const appointmentDate = new Date(props.appointment.date)
  const now = new Date()
  const diffHours = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60)
  
  return isUpcoming.value && diffHours <= 1 && props.appointment.status === 'confirmed'
})

const statusClass = computed(() => {
  const status = props.appointment.status
  if (status === 'pending') return 'bg-yellow-100 text-yellow-800'
  if (status === 'confirmed') return 'bg-blue-100 text-blue-800'
  if (status === 'completed') return 'bg-green-100 text-green-800'
  if (status === 'cancelled') return 'bg-red-100 text-red-800'
  return 'bg-gray-100 text-gray-800'
})

const statusBannerColor = computed(() => {
  const status = props.appointment.status
  if (status === 'pending') return 'bg-yellow-400'
  if (status === 'confirmed') return 'bg-blue-500'
  if (status === 'completed') return 'bg-green-500'
  if (status === 'cancelled') return 'bg-red-500'
  return 'bg-gray-400'
})

const paymentStatusClass = computed(() => {
  const status = props.appointment.paymentStatus
  if (status === 'successful') return 'text-green-600'
  if (status === 'failed') return 'text-red-600'
  return 'text-yellow-600'
})

const paymentStatusLabel = computed(() => {
  const status = props.appointment.paymentStatus
  if (status === 'successful') return '✓ Paid'
  if (status === 'failed') return '✗ Failed'
  return '⏳ Pending'
})

const formatShortDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

const formatLongDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>