<template>
  <Transition name="modal">
    <div 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-2xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <!-- Header -->
        <div class="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-4">
              <div :class="['text-4xl p-3 rounded-xl', typeBackgroundColor]">
                {{ appointmentTypeIcon }}
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900">
                  {{ appointmentTypeLabel }}
                </h2>
                <span
                  :class="[
                    'inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide',
                    statusClass,
                  ]"
                >
                  {{ appointment.status }}
                </span>
              </div>
            </div>
            <button 
              @click="$emit('close')"
              class="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-6">
          <!-- Date & Time Section -->
          <section class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5">
            <h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span class="text-xl">📅</span>
              Date & Time
            </h3>
            <div class="space-y-2">
              <div class="flex items-center gap-3">
                <div class="bg-white p-2 rounded-lg">
                  <span class="text-2xl font-bold text-blue-600">
                    {{ formatDay(appointment.date) }}
                  </span>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">{{ formatLongDate(appointment.date) }}</p>
                  <p class="text-sm text-gray-600">{{ formatDayOfWeek(appointment.date) }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2 mt-3 pt-3 border-t border-blue-100">
                <span class="text-2xl">🕐</span>
                <span class="font-semibold text-gray-900">{{ appointment.timeSlot }}</span>
              </div>
            </div>
          </section>

          <!-- Consultation Details -->
          <section>
            <h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span class="text-xl">📋</span>
              Consultation Details
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-sm text-gray-600 mb-1">Type</p>
                <p class="font-semibold text-gray-900 capitalize">
                  {{ appointment.consultationType }}
                </p>
              </div>
              <div v-if="appointment.consultationMode" class="bg-gray-50 rounded-lg p-4">
                <p class="text-sm text-gray-600 mb-1">Mode</p>
                <p class="font-semibold text-gray-900 capitalize">
                  {{ appointment.consultationMode }}
                </p>
              </div>
            </div>
          </section>

          <!-- Location / Meeting Link -->
          <section v-if="appointment.location || appointment.googleMeetLink">
            <h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span class="text-xl">📍</span>
              {{ appointment.consultationType === 'physical' ? 'Location' : 'Meeting Details' }}
            </h3>
            <div v-if="appointment.location" class="bg-purple-50 rounded-lg p-4 mb-3">
              <p class="text-gray-900">{{ appointment.location }}</p>
            </div>
            <a
              v-if="appointment.googleMeetLink"
              :href="appointment.googleMeetLink"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 bg-green-50 border-2 border-green-200 rounded-lg p-4 hover:bg-green-100 transition-colors group"
            >
              <span class="text-3xl">🎥</span>
              <div class="flex-1">
                <p class="font-semibold text-green-900 group-hover:text-green-700">
                  Google Meet Link
                </p>
                <p class="text-sm text-green-700">Click to join the virtual consultation</p>
              </div>
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </section>

          <!-- Payment Information -->
          <section>
            <h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span class="text-xl">💳</span>
              Payment Information
            </h3>
            <div class="bg-gray-50 rounded-lg p-5">
              <div class="flex items-center justify-between mb-3">
                <span class="text-gray-600">Consultation Fee</span>
                <span class="text-2xl font-bold text-gray-900">
                  ₦{{ appointment.price.toLocaleString() }}
                </span>
              </div>
              <div class="flex items-center justify-between pt-3 border-t border-gray-200">
                <span class="text-gray-600">Status</span>
                <span :class="['font-bold text-lg', paymentStatusClass]">
                  {{ paymentStatusLabel }}
                </span>
              </div>
            </div>
          </section>

          <!-- Booked By (if available) -->
          <section v-if="appointment.userId">
            <h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span class="text-xl">👤</span>
              Patient Information
            </h3>
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="font-semibold text-gray-900">{{ appointment.userId.name }}</p>
            </div>
          </section>
        </div>

        <!-- Actions -->
        <div class="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl">
          <div class="flex gap-3 flex-wrap">
            <button
              v-if="canReschedule"
              @click="$emit('reschedule')"
              class="flex-1 min-w-[150px] px-6 py-3 text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              📅 Reschedule
            </button>
            <button
              v-if="appointment.paymentStatus === 'pending' && appointment.status !== 'cancelled'"
              @click="$emit('pay')"
              :disabled="initiating"
              class="flex-1 min-w-[150px] px-6 py-3 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ initiating ? '⏳ Processing...' : '💳 Complete Payment' }}
            </button>
            <button
              v-if="canCancel"
              @click="$emit('cancel')"
              class="flex-1 min-w-[150px] px-6 py-3 text-sm font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              ✕ Cancel Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Appointment } from '@/types/index'

const props = defineProps<{
  appointment: Appointment
  initiating: boolean
}>()

defineEmits<{
  close: []
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
    ? 'bg-purple-100'
    : 'bg-blue-100'
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

const canCancel = computed(() => {
  return (props.appointment.status === 'pending' || props.appointment.status === 'confirmed') 
    && isUpcoming.value
})

const statusClass = computed(() => {
  const status = props.appointment.status
  if (status === 'pending') return 'bg-yellow-100 text-yellow-800'
  if (status === 'confirmed') return 'bg-blue-100 text-blue-800'
  if (status === 'completed') return 'bg-green-100 text-green-800'
  if (status === 'cancelled') return 'bg-red-100 text-red-800'
  return 'bg-gray-100 text-gray-800'
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
  return '⏳ Pending Payment'
})

const formatDay = (dateStr: string) => {
  return new Date(dateStr).getDate()
}

const formatDayOfWeek = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long' })
}

const formatLongDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
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