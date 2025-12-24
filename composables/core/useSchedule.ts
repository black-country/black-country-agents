// composables/useSchedule.ts
import { ref, reactive } from 'vue'

export const useSchedule = () => {
  const properties = ref([
    { id: '1', name: 'Property 1' },
    { id: '2', name: 'Property 2' },
    // Add more properties as needed
  ])

  const state = reactive<ScheduleState>({
    selectedProperty: '',
    schedule: {
      Monday: { isEnabled: false, timeSlots: [] },
      Tuesday: { isEnabled: false, timeSlots: [] },
      Wednesday: { isEnabled: false, timeSlots: [] },
      Thursday: { isEnabled: false, timeSlots: [] },
      Friday: { isEnabled: false, timeSlots: [] },
      Saturday: { isEnabled: false, timeSlots: [] },
      Sunday: { isEnabled: false, timeSlots: [] },
    },
    visitDuration: ''
  })

  const generateTimeOptions = () => {
    const times: string[] = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        times.push(timeString)
      }
    }
    return times
  }

  const getEndTimeOptions = (startTime: string) => {
    const times = generateTimeOptions()
    const startIndex = times.indexOf(startTime)
    if (startIndex === -1) return []
    return times.slice(startIndex + 1)
  }

  const addTimeSlot = (day: string) => {
    state.schedule[day].timeSlots.push({
      startTime: '',
      endTime: ''
    })
  }

  const removeTimeSlot = (day: string, index: number) => {
    state.schedule[day].timeSlots.splice(index, 1)
  }

  const saveSchedule = async () => {
    try {
      // Replace with your API endpoint
      await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      })
      return true
    } catch (error) {
      console.error('Error saving schedule:', error)
      return false
    }
  }

  return {
    properties,
    state,
    generateTimeOptions,
    getEndTimeOptions,
    addTimeSlot,
    removeTimeSlot,
    saveSchedule,
  }
}