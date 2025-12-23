<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Filters -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
      <div class="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
        <select
          v-model="filterStatus"
          class="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          v-model="filterPayment"
          class="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        >
          <option value="all">All Payments</option>
          <option value="pending">Pending Payment</option>
          <option value="successful">Paid</option>
          <option value="failed">Failed</option>
        </select>

        <select
          v-model="filterType"
          class="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="physical">Physical</option>
          <option value="virtual">Virtual</option>
        </select>

        <button
          v-if="hasActiveFilters"
          @click="clearFilters"
          class="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="filteredAppointments.length === 0"
      class="text-center py-12 sm:py-16 bg-white rounded-xl border border-gray-200"
    >
      <div class="text-5xl sm:text-6xl mb-4">📅</div>
      <h3 class="font-bold text-lg sm:text-xl mb-2 text-gray-900">No appointments found</h3>
      <p class="text-sm sm:text-base text-gray-600 mb-6 px-4">
        {{ hasActiveFilters
          ? 'Try adjusting your filters to see more appointments.'
          : 'You don\'t have any appointments yet. Book one to get started!'
        }}
      </p>
      <NuxtLink
        v-if="!hasActiveFilters"
        to="/book"
        class="inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all text-sm sm:text-base"
      >
        Book Appointment
      </NuxtLink>
    </div>

    <!-- Categorized Appointments -->
    <div v-else class="space-y-6 sm:space-y-8">
      <!-- Upcoming Appointments -->
      <section v-if="categorizedAppointments.upcoming.length > 0">
        <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <h2 class="text-lg sm:text-xl font-bold text-gray-900">Upcoming</h2>
          <span class="px-2.5 sm:px-3 py-1 bg-blue-100 text-gray-700 text-xs sm:text-sm font-semibold rounded-full">
            {{ categorizedAppointments.upcoming.length }}
          </span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <AppointmentCard
            v-for="appointment in categorizedAppointments.upcoming"
            :key="appointment._id"
            :appointment="appointment"
            :initiating="initiating"
            @view-details="$emit('view-details', appointment)"
            @reschedule="$emit('reschedule', appointment)"
            @cancel="$emit('cancel', appointment._id)"
            @pay="$emit('pay', appointment)"
          />
        </div>
      </section>

      <!-- Pending Payment -->
      <section v-if="categorizedAppointments.pendingPayment.length > 0">
        <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <h2 class="text-lg sm:text-xl font-bold text-gray-900">Pending Payment</h2>
          <span class="px-2.5 sm:px-3 py-1 bg-yellow-100 text-yellow-700 text-xs sm:text-sm font-semibold rounded-full">
            {{ categorizedAppointments.pendingPayment.length }}
          </span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <AppointmentCard
            v-for="appointment in categorizedAppointments.pendingPayment"
            :key="appointment._id"
            :appointment="appointment"
            :initiating="initiating"
            @view-details="$emit('view-details', appointment)"
            @reschedule="$emit('reschedule', appointment)"
            @cancel="$emit('cancel', appointment._id)"
            @pay="$emit('pay', appointment)"
          />
        </div>
      </section>

      <!-- Today's Appointments -->
      <section v-if="categorizedAppointments.today.length > 0">
        <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <h2 class="text-lg sm:text-xl font-bold text-gray-900">Today</h2>
          <span class="px-2.5 sm:px-3 py-1 bg-green-100 text-green-700 text-xs sm:text-sm font-semibold rounded-full">
            {{ categorizedAppointments.today.length }}
          </span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <AppointmentCard
            v-for="appointment in categorizedAppointments.today"
            :key="appointment._id"
            :appointment="appointment"
            :initiating="initiating"
            @view-details="$emit('view-details', appointment)"
            @reschedule="$emit('reschedule', appointment)"
            @cancel="$emit('cancel', appointment._id)"
            @pay="$emit('pay', appointment)"
          />
        </div>
      </section>

      <!-- Past Appointments -->
      <section v-if="categorizedAppointments.past.length > 0">
        <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <h2 class="text-lg sm:text-xl font-bold text-gray-900">Past Appointments</h2>
          <span class="px-2.5 sm:px-3 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold rounded-full">
            {{ categorizedAppointments.past.length }}
          </span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <AppointmentCard
            v-for="appointment in categorizedAppointments.past"
            :key="appointment._id"
            :appointment="appointment"
            :initiating="initiating"
            @view-details="$emit('view-details', appointment)"
            @reschedule="$emit('reschedule', appointment)"
            @cancel="$emit('cancel', appointment._id)"
            @pay="$emit('pay', appointment)"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Appointment } from '@/types/index'
import AppointmentCard from './AppointmentCard.vue'

const props = defineProps<{
  appointments: Appointment[]
  initiating: boolean
}>()

defineEmits<{
  'view-details': [appointment: Appointment]
  reschedule: [appointment: Appointment]
  cancel: [id: string]
  pay: [appointment: Appointment]
}>()

const filterStatus = ref<string>('all')
const filterPayment = ref<string>('all')
const filterType = ref<string>('all')

const hasActiveFilters = computed(() => {
  return filterStatus.value !== 'all' || 
         filterPayment.value !== 'all' || 
         filterType.value !== 'all'
})

const filteredAppointments = computed(() => {
  return props.appointments.filter(apt => {
    if (filterStatus.value !== 'all' && apt.status !== filterStatus.value) return false
    if (filterPayment.value !== 'all' && apt.paymentStatus !== filterPayment.value) return false
    if (filterType.value !== 'all' && apt.consultationType !== filterType.value) return false
    return true
  })
})

const categorizedAppointments = computed(() => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  return {
    today: filteredAppointments.value.filter(apt => {
      const aptDate = new Date(apt.date)
      return aptDate >= today && aptDate < tomorrow && apt.status !== 'cancelled'
    }),
    upcoming: filteredAppointments.value.filter(apt => {
      const aptDate = new Date(apt.date)
      return aptDate >= tomorrow && apt.status !== 'cancelled' && apt.status !== 'completed'
    }),
    pendingPayment: filteredAppointments.value.filter(apt => {
      return apt.paymentStatus === 'pending' && apt.status !== 'cancelled'
    }),
    past: filteredAppointments.value.filter(apt => {
      const aptDate = new Date(apt.date)
      return aptDate < today || apt.status === 'completed' || apt.status === 'cancelled'
    })
  }
})

const clearFilters = () => {
  filterStatus.value = 'all'
  filterPayment.value = 'all'
  filterType.value = 'all'
}
</script>