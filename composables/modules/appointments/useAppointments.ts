// import { ref, computed } from "vue"
// import { appointments_api } from "@/api_factory/modules/appointments"

// interface Appointment {
//   id: string
//   userId: string
//   consultationType: "physical" | "virtual"
//   consultationMode?: "voice" | "video"
//   date: string
//   timeSlot: string
//   location?: string
//   googleMeetLink?: string
//   price: number
//   paymentStatus: "pending" | "successful" | "failed"
//   status: "booked" | "completed" | "canceled"
//   createdAt: string
// }

// interface AppointmentState {
//   appointments: Appointment[]
//   currentAppointment: Appointment | null
//   availability: any[]
//   loading: boolean
//   error: string | null
// }

// const appointmentState = ref<AppointmentState>({
//   appointments: [],
//   currentAppointment: null,
//   availability: [],
//   loading: false,
//   error: null,
// })

// export const useAppointments = () => {
//   const fetchAppointments = async (filters?: {
//     status?: string
//     type?: string
//   }) => {
//     appointmentState.value.loading = true
//     appointmentState.value.error = null
//     try {
//       const res = (await appointments_api.getAppointments(filters)) as any
//       if (res.type !== "ERROR") {
//         appointmentState.value.appointments = res.data.appointments || []
//         return res.data
//       } else {
//         appointmentState.value.error = res.message
//         throw new Error(res.message)
//       }
//     } catch (err: any) {
//       appointmentState.value.error = err.message
//       throw err
//     } finally {
//       appointmentState.value.loading = false
//     }
//   }

//   const fetchAppointmentById = async (id: string) => {
//     appointmentState.value.loading = true
//     appointmentState.value.error = null
//     try {
//       const res = (await appointments_api.getAppointmentById(id)) as any
//       if (res.type !== "ERROR") {
//         appointmentState.value.currentAppointment = res.data.appointment || null
//         return res.data
//       } else {
//         appointmentState.value.error = res.message
//         throw new Error(res.message)
//       }
//     } catch (err: any) {
//       appointmentState.value.error = err.message
//       throw err
//     } finally {
//       appointmentState.value.loading = false
//     }
//   }

//   const createAppointment = async (payload: {
//     consultationType: "physical" | "virtual"
//     consultationMode?: "voice" | "video"
//     date: string
//     timeSlot: string
//     location?: string
//     price: number
//   }) => {
//     appointmentState.value.loading = true
//     appointmentState.value.error = null
//     try {
//       const res = (await appointments_api.createAppointment(payload)) as any
//       if (res.type !== "ERROR") {
//         appointmentState.value.appointments.push(res.data.appointment)
//         return res.data
//       } else {
//         appointmentState.value.error = res.message
//         throw new Error(res.message)
//       }
//     } catch (err: any) {
//       appointmentState.value.error = err.message
//       throw err
//     } finally {
//       appointmentState.value.loading = false
//     }
//   }

//   const cancelAppointment = async (id: string) => {
//     appointmentState.value.loading = true
//     appointmentState.value.error = null
//     try {
//       const res = (await appointments_api.cancelAppointment(id)) as any
//       if (res.type !== "ERROR") {
//         const idx = appointmentState.value.appointments.findIndex((a) => a.id === id)
//         if (idx !== -1) {
//           appointmentState.value.appointments[idx].status = "canceled"
//         }
//         return res.data
//       } else {
//         appointmentState.value.error = res.message
//         throw new Error(res.message)
//       }
//     } catch (err: any) {
//       appointmentState.value.error = err.message
//       throw err
//     } finally {
//       appointmentState.value.loading = false
//     }
//   }

//   const rescheduleAppointment = async (id: string, date: string, timeSlot: string) => {
//     appointmentState.value.loading = true
//     appointmentState.value.error = null
//     try {
//       const res = (await appointments_api.rescheduleAppointment(id, {
//         date,
//         timeSlot,
//       })) as any
//       if (res.type !== "ERROR") {
//         const idx = appointmentState.value.appointments.findIndex((a) => a.id === id)
//         if (idx !== -1) {
//           appointmentState.value.appointments[idx].date = date
//           appointmentState.value.appointments[idx].timeSlot = timeSlot
//         }
//         return res.data
//       } else {
//         appointmentState.value.error = res.message
//         throw new Error(res.message)
//       }
//     } catch (err: any) {
//       appointmentState.value.error = err.message
//       throw err
//     } finally {
//       appointmentState.value.loading = false
//     }
//   }

//   const fetchAvailability = async (consultationType: "physical" | "virtual") => {
//     appointmentState.value.loading = true
//     appointmentState.value.error = null
//     try {
//       const res = (await appointments_api.getAvailability(consultationType)) as any
//       if (res.type !== "ERROR") {
//         appointmentState.value.availability = res.data.availability || []
//         return res.data
//       } else {
//         appointmentState.value.error = res.message
//         throw new Error(res.message)
//       }
//     } catch (err: any) {
//       appointmentState.value.error = err.message
//       throw err
//     } finally {
//       appointmentState.value.loading = false
//     }
//   }

//   const upcomingAppointments = computed(() =>
//     appointmentState.value.appointments.filter((a) => a.status === "booked" && new Date(a.date) > new Date()),
//   )

//   const pastAppointments = computed(() =>
//     appointmentState.value.appointments.filter(
//       (a) => (a.status === "completed" || a.status === "canceled") && new Date(a.date) <= new Date(),
//     ),
//   )

//   return {
//     fetchAppointments,
//     fetchAppointmentById,
//     createAppointment,
//     cancelAppointment,
//     rescheduleAppointment,
//     fetchAvailability,
//     appointments: computed(() => appointmentState.value.appointments),
//     currentAppointment: computed(() => appointmentState.value.currentAppointment),
//     availability: computed(() => appointmentState.value.availability),
//     upcomingAppointments,
//     pastAppointments,
//     loading: computed(() => appointmentState.value.loading),
//     error: computed(() => appointmentState.value.error),
//   }
// }


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