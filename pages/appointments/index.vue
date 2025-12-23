<template>
  <div class="min-h-screen py-8 px-4">
    <div class="container mx-auto">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 class="text-xl font-bold text-gray-900">My Appointments</h1>
          <p class="text-gray-600 mt-1">Manage your consultations and schedule</p>
        </div>
        <NuxtLink
          to="/book"
          class="px-6 py-3 text-sm bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all shadow-sm hover:shadow-md"
        >
          + Book Appointment
        </NuxtLink>
      </div>

      <!-- View Toggle & Stats -->
      <div class="bg-white rounded-xl shadow-sm border-[0.5px] border-gray-100 p-6 mb-6">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <!-- View Toggle -->
          <div class="flex items-center gap-3">
            <button
              @click="viewMode = 'calendar'"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-all',
                viewMode === 'calendar'
                  ? 'bg-gray-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              📅 Calendar View
            </button>
            <button
              @click="viewMode = 'list'"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-all',
                viewMode === 'list'
                  ? 'bg-gray-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              📋 List View
            </button>
          </div>

          <!-- Quick Stats -->
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
              <span class="text-2xl">📅</span>
              <div>
                <p class="text-xs text-gray-600">Upcoming</p>
                <p class="text-lg font-bold text-gray-600">{{ upcomingAppointments.length }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
              <span class="text-2xl">✓</span>
              <div>
                <p class="text-xs text-gray-600">Completed</p>
                <p class="text-lg font-bold text-green-600">{{ completedCount }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-lg">
              <span class="text-2xl">⏳</span>
              <div>
                <p class="text-xs text-gray-600">Pending Payment</p>
                <p class="text-lg font-bold text-yellow-600">{{ pendingPaymentCount }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-16">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto"></div>
          <p class="text-gray-600 mt-4">Loading appointments...</p>
        </div>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Calendar View -->
        <div v-if="viewMode === 'calendar'">
          <AppointmentCalendar
            :appointments="allAppointments"
            @date-selected="handleDateSelected"
            @appointment-clicked="openAppointmentModal"
          />
        </div>

        <!-- List View -->
        <div v-else>
          <AppointmentListView
            :appointments="allAppointments"
            :initiating="initiating"
            @view-details="openAppointmentModal"
            @reschedule="openRescheduleModal"
            @cancel="handleCancel"
            @pay="handlePay"
          />
        </div>
      </div>
    </div>

    <!-- Appointment Detail Modal -->
    <AppointmentDetailModal
      v-if="showDetailModal && selectedAppointment"
      :appointment="selectedAppointment"
      :initiating="initiating"
      @close="closeAppointmentModal"
      @reschedule="openRescheduleModal(selectedAppointment)"
      @cancel="handleCancel(selectedAppointment._id)"
      @pay="handlePay(selectedAppointment)"
    />

    <!-- Reschedule Modal -->
    <RescheduleModal
      v-if="showRescheduleModal && selectedAppointment"
      :appointment="selectedAppointment"
      @close="closeRescheduleModal"
      @confirm="handleReschedule"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAppointments } from '@/composables/modules/appointments/useAppointments'
import { useRouter } from 'vue-router'
import type { Appointment } from '@/types/index'
import AppointmentCalendar from '@/components/appointments/AppointmentCalendar.vue'
import AppointmentListView from '@/components/appointments/AppointmentListView.vue'
import AppointmentDetailModal from '@/components/appointments/AppointmentDetailModal.vue'
import RescheduleModal from '@/components/appointments/RescheduleModal.vue'
import { useInitiatePayment } from "@/composables/modules/payments/useInitiatePayment"
import { useUser } from "@/composables/modules/auth/user"
import { formatDate } from "@/utils/formatDate"
import { useGetSettings } from '@/composables/modules/public/useGetSettings'

const router = useRouter()
const { 
  fetchAppointments, 
  upcomingAppointments, 
  pastAppointments, 
  cancelAppointment, 
  rescheduleAppointment,
  loading 
} = useAppointments()
const { user } = useUser()
const { settings } = useGetSettings()

definePageMeta({
  middleware: 'auth',
  layout: 'user'
})

const viewMode = ref<'calendar' | 'list'>('calendar')
const { loading: initiating, initiatePayment } = useInitiatePayment()
const showDetailModal = ref(false)
const showRescheduleModal = ref(false)
const selectedAppointment = ref<Appointment | null>(null)
const clinicAddress = computed(() => settings.value?.clinicLocation || '')

const allAppointments = computed(() => {
  return [...upcomingAppointments.value, ...pastAppointments.value]
})

const completedCount = computed(() => {
  return allAppointments.value.filter(a => a.status === 'completed').length
})

const pendingPaymentCount = computed(() => {
  return allAppointments.value.filter(a => a.paymentStatus === 'pending').length
})

const handleDateSelected = (date: Date) => {
  console.log('Date selected:', date)
}

const openAppointmentModal = (appointment: Appointment) => {
  selectedAppointment.value = appointment
  showDetailModal.value = true
}

const closeAppointmentModal = () => {
  showDetailModal.value = false
  setTimeout(() => {
    selectedAppointment.value = null
  }, 300)
}

const openRescheduleModal = (appointment: Appointment) => {
  selectedAppointment.value = appointment
  showDetailModal.value = false
  showRescheduleModal.value = true
}

const closeRescheduleModal = () => {
  showRescheduleModal.value = false
  setTimeout(() => {
    if (!showDetailModal.value) {
      selectedAppointment.value = null
    }
  }, 300)
}

const handleReschedule = async (data: { date: string; timeSlot: string }) => {
  if (!selectedAppointment.value) return
  
  try {
    await rescheduleAppointment(selectedAppointment.value._id, data.date, data.timeSlot)
    closeRescheduleModal()
    selectedAppointment.value = null
  } catch (error) {
    console.error('Reschedule error:', error)
  }
}

const handleCancel = async (id: string) => {
  if (confirm('Are you sure you want to cancel this appointment? This action cannot be undone.')) {
    try {
      await cancelAppointment(id)
      closeAppointmentModal()
    } catch (error) {
      console.error('Cancel error:', error)
    }
  }
}

const handlePay = async (appointment: Appointment) => {
  const paymentPayload = {
    appointmentId: appointment._id,
    amount: appointment.price,
    paymentMethod: "Paystack" as const,
    email: user?.value?.email || '',
    phone: user?.value?.phone || '+2348012345678',
    address: user?.value?.address || clinicAddress.value || 'Not provided',
    customerName: `${user?.value?.firstName || ''} ${user?.value?.lastName || ''}`.trim() || 'Customer',
    redirectUrl: `${useRuntimeConfig().public.apiBase}/payments/callback/paystack`,
    description: `Payment for ${appointment.consultationType} consultation on ${formatDate(appointment.date)}`
  }

  const paymentResult = await initiatePayment(paymentPayload)

  if (!paymentResult || !paymentResult.authorization_url || !paymentResult.transactionRef) {
    throw new Error('Failed to initiate payment')
  }

  window.location.href = paymentResult.authorization_url
}

onMounted(() => {
  fetchAppointments()
})
</script>