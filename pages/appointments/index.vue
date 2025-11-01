<template>
  <div class="min-h-screen bg-muted py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-xl font-black text-foreground">My Consultations</h1>
          <p class="text-foreground/60 mt-1">Manage your appointments and bookings</p>
        </div>
        <NuxtLink
          to="/book"
          class="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Book New
        </NuxtLink>
      </div>

      <!-- Tabs -->
      <div class="flex gap-4 mb-8 border-b-[0.5px] border-gray-50">
        <button
          @click="activeTab = 'upcoming'"
          :class="[
            'px-6 py-3 font-medium border-b-2 transition-colors',
            activeTab === 'upcoming'
              ? 'border-primary text-primary'
              : 'border-transparent text-foreground/60 hover:text-foreground',
          ]"
        >
          Upcoming ({{ upcomingAppointments.length }})
        </button>
        <button
          @click="activeTab = 'past'"
          :class="[
            'px-6 py-3 font-medium border-b-2 transition-colors',
            activeTab === 'past'
              ? 'border-primary text-primary'
              : 'border-transparent text-foreground/60 hover:text-foreground',
          ]"
        >
          Past ({{ pastAppointments.length }})
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <LoadingSpinner />
      </div>

      <!-- Empty State -->
      <div
        v-else-if="displayedAppointments.length === 0"
        class="text-center py-16 bg-white rounded-lg border-[0.5px] border-gray-50"
      >
        <div class="text-6xl mb-4">📅</div>
        <h3 class="font-bold text-xl mb-2 text-foreground">No consultations</h3>
        <p class="text-foreground/60 mb-6 max-w-md mx-auto">
          {{ activeTab === 'upcoming'
            ? 'You don\'t have any upcoming consultations. Book one now to get started.'
            : 'You don\'t have any past consultations yet.'
          }}
        </p>
        <NuxtLink
          v-if="activeTab === 'upcoming'"
          to="/book"
          class="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Book One Now
        </NuxtLink>
      </div>

      <!-- Appointments Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AppointmentCard
          v-for="appointment in displayedAppointments"
          :key="appointment._id"
          :appointment="appointment"
          :initiating="initiating"
          @reschedule="openRescheduleModal(appointment)"
          @cancel="handleCancel(appointment._id)"
          @pay="handlePay(appointment)"
        />
      </div>
    </div>

    <!-- Reschedule Modal -->
    <RescheduleModal
      v-if="showRescheduleModal"
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
import AppointmentCard from '@/components/appointments/AppointmentCard.vue'
import RescheduleModal from '@/components/appointments/RescheduleModal.vue'
import LoadingSpinner from '@/components/core/LoadingSpinner.vue'
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
const { settings, loading: settingsLoading } = useGetSettings()

definePageMeta({
  middleware: 'auth',
  layout: 'user'
})

const activeTab = ref<'upcoming' | 'past'>('upcoming')
const { loading: initiating, initiatePayment } = useInitiatePayment()
const showRescheduleModal = ref(false)
const selectedAppointment = ref<Appointment | null>(null)
const clinicAddress = computed(() => settings.value?.clinicLocation || '')
const businessHours = computed(() => settings.value?.businessHours || null)

const createdAppointmentId = ref<string | null>(null)
const paymentTransactionRef = ref<string | null>(null)
const showSuccessModal = ref(false)
const processingPayment = ref(false)

const displayedAppointments = computed(() => {
  return activeTab.value === 'upcoming' ? upcomingAppointments.value : pastAppointments.value
})

const openRescheduleModal = (appointment: Appointment) => {
  selectedAppointment.value = appointment
  showRescheduleModal.value = true
}

const closeRescheduleModal = () => {
  showRescheduleModal.value = false
  selectedAppointment.value = null
}

const handleReschedule = async (data: { date: string; timeSlot: string }) => {
  if (!selectedAppointment.value) return
  
  try {
    await rescheduleAppointment(selectedAppointment.value._id, data.date, data.timeSlot)
    closeRescheduleModal()
  } catch (error) {
    console.error('Reschedule error:', error)
  }
}

const handleCancel = async (id: string) => {
  if (confirm('Are you sure you want to cancel this appointment? This action cannot be undone.')) {
    try {
      await cancelAppointment(id)
    } catch (error) {
      console.error('Cancel error:', error)
    }
  }
}

const handlePay = async (appointment: Appointment) => {
  // Redirect to payment page with appointment details
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

    paymentTransactionRef.value = paymentResult.transactionRef
    console.log('Payment initiated:', paymentResult.transactionRef)

    window.location.href = paymentResult.authorization_url

  // router.push({
  //   path: '/payment',
  //   query: {
  //     appointmentId: appointment._id,
  //     transactionId: appointment.transactionId
  //   }
  // })
}

onMounted(() => {
  fetchAppointments()
})
</script>