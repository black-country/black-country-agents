<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-6">
    <!-- Calendar Header -->
    <div class="flex items-center justify-between mb-4 sm:mb-6">
      <h2 class="text-base sm:text-xl font-bold text-gray-900">
        {{ currentMonthYear }}
      </h2>
      <div class="flex items-center gap-1 sm:gap-2">
        <button
          @click="previousMonth"
          class="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          @click="goToToday"
          class="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Today
        </button>
        <button
          @click="nextMonth"
          class="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 gap-0.5 sm:gap-2">
      <!-- Day Headers -->
      <div
        v-for="day in dayHeaders"
        :key="day"
        class="text-center text-[10px] sm:text-xs font-semibold text-gray-600 py-2"
      >
        <span class="hidden sm:inline">{{ day }}</span>
        <span class="sm:hidden">{{ day.substring(0, 1) }}</span>
      </div>

      <!-- Calendar Days -->
      <button
        v-for="(day, index) in calendarDays"
        :key="index"
        @click="handleDayClick(day)"
        :class="[
          'relative p-1 sm:p-2 rounded-md sm:rounded-lg transition-all focus:outline-none',
          'h-12 sm:h-24 lg:min-h-[100px]',
          day.isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 opacity-50',
          day.isToday ? 'ring-2 ring-blue-500' : 'border border-gray-100',
          day.isSelected ? 'bg-blue-50 ring-2 ring-blue-300' : ''
        ]"
      >
        <!-- Date Number -->
        <div :class="[
          'text-xs sm:text-sm font-medium',
          day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400',
          day.isToday ? 'text-blue-600 font-bold' : ''
        ]">
          {{ day.date.getDate() }}
        </div>

        <!-- Mobile: Appointment Dots -->
        <div v-if="day.appointments.length > 0" class="sm:hidden absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
          <div
            v-for="(appointment, idx) in day.appointments.slice(0, 3)"
            :key="idx"
            :class="[
              'w-1 h-1 rounded-full',
              getAppointmentDotColor(appointment)
            ]"
          ></div>
          <div v-if="day.appointments.length > 3" class="text-[8px] text-gray-500 ml-0.5">
            +{{ day.appointments.length - 3 }}
          </div>
        </div>

        <!-- Desktop: Appointment Cards -->
        <div class="hidden sm:block mt-1 space-y-1 overflow-hidden">
          <div
            v-for="appointment in day.appointments.slice(0, 2)"
            :key="appointment._id"
            :class="[
              'text-[10px] px-1.5 py-0.5 rounded cursor-pointer transition-all',
              getAppointmentColor(appointment)
            ]"
          >
            <div class="font-medium truncate">
              {{ appointment.timeSlot.split(' - ')[0] }}
            </div>
          </div>
          <div v-if="day.appointments.length > 2" class="text-[9px] text-gray-500 text-center">
            +{{ day.appointments.length - 2 }}
          </div>
        </div>
      </button>
    </div>

    <!-- Selected Date Appointments (Mobile Only) -->
    <div v-if="selectedDateAppointments.length > 0" class="mt-4 sm:hidden">
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3">
        <h3 class="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
          <span>📅</span>
          {{ formatSelectedDate }}
        </h3>
        <div class="space-y-2">
          <button
            v-for="appointment in selectedDateAppointments"
            :key="appointment._id"
            @click="$emit('appointment-clicked', appointment)"
            :class="[
              'w-full text-left p-3 rounded-lg transition-all active:scale-95',
              getAppointmentColor(appointment)
            ]"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="text-xl">{{ appointment.consultationType === 'physical' ? '🏥' : '💻' }}</span>
                <div>
                  <p class="font-semibold text-sm">{{ getAppointmentLabel(appointment) }}</p>
                  <p class="text-xs opacity-90">{{ appointment.timeSlot }}</p>
                </div>
              </div>
              <span :class="['text-[9px] font-bold uppercase px-2 py-0.5 rounded-full', getStatusBadgeColor(appointment)]">
                {{ appointment.status }}
              </span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="opacity-75">₦{{ appointment.price.toLocaleString() }}</span>
              <span :class="['font-semibold', getPaymentStatusClass(appointment)]">
                {{ getPaymentStatusLabel(appointment) }}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State for Selected Date (Mobile) -->
    <div v-else-if="selectedDate && selectedDateAppointments.length === 0" class="mt-4 sm:hidden">
      <div class="bg-gray-50 rounded-lg p-4 text-center">
        <p class="text-sm text-gray-600">No appointments on {{ formatSelectedDate }}</p>
      </div>
    </div>

    <!-- Legend -->
    <div class="flex flex-wrap gap-2 sm:gap-4 mt-4 sm:mt-6 pt-4 border-t border-gray-200">
      <div class="flex items-center gap-1.5">
        <div class="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500"></div>
        <span class="text-[10px] sm:text-xs text-gray-600">Confirmed</span>
      </div>
      <div class="flex items-center gap-1.5">
        <div class="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
        <span class="text-[10px] sm:text-xs text-gray-600">Pending</span>
      </div>
      <div class="flex items-center gap-1.5">
        <div class="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
        <span class="text-[10px] sm:text-xs text-gray-600">Completed</span>
      </div>
      <div class="flex items-center gap-1.5">
        <div class="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
        <span class="text-[10px] sm:text-xs text-gray-600">Cancelled</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Appointment } from '@/types/index'

const props = defineProps<{
  appointments: Appointment[]
}>()

const emit = defineEmits<{
  'date-selected': [date: Date]
  'appointment-clicked': [appointment: Appointment]
}>()

const currentDate = ref(new Date())
const selectedDate = ref<Date | null>(null)

const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const days: Array<{
    date: Date
    isCurrentMonth: boolean
    isToday: boolean
    isSelected: boolean
    appointments: Appointment[]
  }> = []
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    
    const dateStr = date.toISOString().split('T')[0]
    const dayAppointments = props.appointments.filter(apt => {
      const aptDate = new Date(apt.date).toISOString().split('T')[0]
      return aptDate === dateStr
    })
    
    days.push({
      date,
      isCurrentMonth: date.getMonth() === month,
      isToday: date.getTime() === today.getTime(),
      isSelected: selectedDate.value ? date.getTime() === selectedDate.value.getTime() : false,
      appointments: dayAppointments
    })
  }
  
  return days
})

const selectedDateAppointments = computed(() => {
  if (!selectedDate.value) return []
  const dateStr = selectedDate.value.toISOString().split('T')[0]
  return props.appointments.filter(apt => {
    const aptDate = new Date(apt.date).toISOString().split('T')[0]
    return aptDate === dateStr
  })
})

const formatSelectedDate = computed(() => {
  if (!selectedDate.value) return ''
  return selectedDate.value.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  })
})

const handleDayClick = (day: typeof calendarDays.value[0]) => {
  selectedDate.value = day.date
  emit('date-selected', day.date)
  
  // If there's an appointment and only one, open it directly
  if (day.appointments.length === 1) {
    emit('appointment-clicked', day.appointments[0])
  }
}

const getAppointmentColor = (appointment: Appointment) => {
  if (appointment.status === 'confirmed') {
    return 'bg-blue-100 border-blue-200 text-blue-800'
  } else if (appointment.status === 'pending') {
    return 'bg-yellow-100 border-yellow-200 text-yellow-800'
  } else if (appointment.status === 'completed') {
    return 'bg-green-100 border-green-200 text-green-800'
  } else if (appointment.status === 'cancelled') {
    return 'bg-red-100 border-red-200 text-red-800'
  }
  return 'bg-gray-100 border-gray-200 text-gray-800'
}

const getAppointmentDotColor = (appointment: Appointment) => {
  if (appointment.status === 'confirmed') return 'bg-blue-500'
  if (appointment.status === 'pending') return 'bg-yellow-500'
  if (appointment.status === 'completed') return 'bg-green-500'
  if (appointment.status === 'cancelled') return 'bg-red-500'
  return 'bg-gray-500'
}

const getStatusBadgeColor = (appointment: Appointment) => {
  if (appointment.status === 'confirmed') return 'bg-blue-200 text-blue-800'
  if (appointment.status === 'pending') return 'bg-yellow-200 text-yellow-800'
  if (appointment.status === 'completed') return 'bg-green-200 text-green-800'
  if (appointment.status === 'cancelled') return 'bg-red-200 text-red-800'
  return 'bg-gray-200 text-gray-800'
}

const getPaymentStatusClass = (appointment: Appointment) => {
  if (appointment.paymentStatus === 'successful') return 'text-green-600'
  if (appointment.paymentStatus === 'failed') return 'text-red-600'
  return 'text-yellow-600'
}

const getPaymentStatusLabel = (appointment: Appointment) => {
  if (appointment.paymentStatus === 'successful') return '✓ Paid'
  if (appointment.paymentStatus === 'failed') return '✗ Failed'
  return '⏳ Pending'
}

const getAppointmentLabel = (appointment: Appointment) => {
  return appointment.consultationType.charAt(0).toUpperCase() + 
         appointment.consultationType.slice(1)
}

const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  )
}

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  )
}

const goToToday = () => {
  currentDate.value = new Date()
  selectedDate.value = new Date()
}
</script>