import { ref, computed } from "vue"
import { useFetchAppointments } from "./useFetchAppointments"
import { useCancelAppointment } from "./useCancelAppointment"
import { useRescheduleAppointment } from "./useRescheduleAppointment"

export const useAppointments = () => {
  const { 
    loading: fetchLoading, 
    appointments, 
    error: fetchError, 
    fetchAppointments: fetch 
  } = useFetchAppointments()
  
  const { 
    loading: cancelLoading, 
    error: cancelError, 
    cancelAppointment: cancel 
  } = useCancelAppointment()
  
  const { 
    loading: rescheduleLoading, 
    error: rescheduleError, 
    rescheduleAppointment: reschedule 
  } = useRescheduleAppointment()

  const loading = computed(() => 
    fetchLoading.value || cancelLoading.value || rescheduleLoading.value
  )

  const upcomingAppointments = computed(() => {
    const now = new Date()
    return appointments.value.filter(apt => {
      const aptDate = new Date(apt.date)
      return aptDate >= now && apt.status !== 'cancelled' && apt.status !== 'completed'
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  })

  const pastAppointments = computed(() => {
    const now = new Date()
    return appointments.value.filter(apt => {
      const aptDate = new Date(apt.date)
      return aptDate < now || apt.status === 'cancelled' || apt.status === 'completed'
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  })

  const fetchAppointments = async (filters?: { status?: string; type?: string }) => {
    await fetch(filters)
  }

  const cancelAppointment = async (id: string) => {
    await cancel(id)
    // Refresh appointments after cancellation
    await fetchAppointments()
  }

  const rescheduleAppointment = async (id: string, date: string, timeSlot: string) => {
    await reschedule(id, date, timeSlot)
    // Refresh appointments after rescheduling
    await fetchAppointments()
  }

  return {
    loading,
    appointments,
    upcomingAppointments,
    pastAppointments,
    fetchAppointments,
    cancelAppointment,
    rescheduleAppointment,
    fetchError,
    cancelError,
    rescheduleError,
  }
}