<template>
  <div class="max-w-lg p-6 space-y-8 bg-white rounded-lg">
    <!-- Property Selection -->
    <div>
      <h3 class="text-sm font-medium mb-2">Property</h3>
      <select 
        v-model="selectedProperty"
        class="w-full p-3 text-sm outline-none rounded-lg bg-gray-50 border border-gray-100"
      >
        <option value="" disabled selected>Select property</option>
        <option v-for="property in propertiesList" :key="property.id" :value="property.id">
          {{ property.name }}
        </option>
      </select>
    </div>

    <!-- Visitation Days -->
    <div>
      <h3 class="text-sm font-medium mb-2">Set visitation days</h3>
      <div class="grid grid-cols-3 gap-4">
        <button
          v-for="day in days"
          :key="day"
          @click="selectDay(day)"
          :class="[
            'p-3 rounded-lg text-sm text-center',
            selectedDay === day
              ? 'border-2 border-green-600 text-green-600'
              : 'bg-gray-50'
          ]"
        >
          {{ day }}
        </button>
      </div>
    </div>

    <!-- Time Selection -->
    <div v-if="selectedDay">
      <h3 class="text-sm font-medium mb-2">Time</h3>
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <div
            v-for="(time, index) in selectedTimes"
            :key="index"
            class="px-4 py-3 rounded-lg bg-[#EAEAEA] flex items-center gap-2"
          >
            {{ formatTime(time) }}
            <button 
              @click="removeTime(index)"
              class="ml-2 text-gray-500 hover:text-red-500"
            >
              ×
            </button>
          </div>
        </div>
        <div class="flex gap-2">
          <div class="flex-1 relative">
            <input
              type="time"
              v-model="newTime"
              class="p-3 rounded-lg outline-none bg-gray-50 border border-gray-200 w-full"
              :class="{ 'border-red-500': timeError }"
            />
            <p v-if="timeError" class="text-red-500 text-sm mt-1">
              {{ timeError }}
            </p>
          </div>
          <button
            @click="addTime"
            class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg"
          >
            + Time
          </button>
        </div>
      </div>
    </div>

    <!-- Frequency Selection -->
    <div>
      <h3 class="text-sm font-medium mb-2">Set frequency</h3>
      <p class="text-gray-600 text-xs mb-2">
        Choose how often potential tenants can book appointments for property tours assigned to you.
      </p>
      <select
        v-model="selectedFrequency"
        class="w-full text-sm p-3 rounded-lg outline-none bg-gray-50 border border-gray-200"
      >
        <option value="" disabled selected>Select frequency</option>
        <option v-for="freq in frequencies" :key="freq" :value="freq">
          {{ freq }}
        </option>
      </select>
    </div>

    <!-- Submit Button -->
 <div class="pt-4">
  <button
      @click="submitSchedule"
      class="w-full disabled:cursor-not-allowed disabled:opacity-25 p-4 bg-[#292929] text-white rounded-lg font-medium"
      :disabled="!isFormValid || loading"
    >
       {{  loading ? 'processing' : 'Set visitation schedule' }}
    </button>
 </div>
  </div>
</template>

<script setup lang="ts">
import { useCreateVisitationSchedule } from '@/composables/modules/visitation/useSetVisitationAvailability'
import { useGetProperties } from '@/composables/modules/property/fetchProperties'
const { propertiesList, loadingProperties } = useGetProperties()
const { createVisitationSchedule, loading, setPayload } = useCreateVisitationSchedule()
import { ref, computed } from 'vue'

// Types
interface Property {
  id: number
  name: string
}


const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

const frequencies = [
  '1 week',
  '2 weeks',
  '3 weeks',
  '1 month'
]

// State
const selectedProperty = ref<number | null>(null)
const selectedDay = ref<string>('')
const selectedTimes = ref<string[]>([])
const selectedFrequency = ref<string>('')
const newTime = ref('')
const timeError = ref('')

// Methods
const selectDay = (day: string) => {
  selectedDay.value = day
}

const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const formattedHour = hour % 12 || 12
  return `${formattedHour}:${minutes} ${ampm}`
}

const addTime = () => {
  if (!newTime.value) {
    timeError.value = 'Please select a time'
    return
  }

  if (selectedTimes.value.includes(newTime.value)) {
    timeError.value = 'This time slot is already added'
    return
  }

  timeError.value = ''
  selectedTimes.value.push(newTime.value)
  selectedTimes.value.sort()
  newTime.value = ''
}

const removeTime = (index: number) => {
  selectedTimes.value.splice(index, 1)
}

const isFormValid = computed(() => {
  return (
    selectedProperty.value &&
    selectedDay.value &&
    selectedTimes.value.length > 0 &&
    selectedFrequency.value
  )
})

// const submitSchedule = async () => {
//   if (!isFormValid.value) return

//   const scheduleData = {
//     propertyId: selectedProperty.value,
//     visitationDay: selectedDay.value,
//     visitationTimes: selectedTimes.value.map(time => formatTime(time)),
//     frequency: selectedFrequency.value
//   }

//   const daysMap = {
//     'Monday' : 1,
//     'Tuesday' : 2,
//     'Wednesday' : 3,
//     'Thursday' : 4,
//     'Friday' : 5,
//     'Saturday' : 6,
//     'Sunday' : 7,

//   }

//   selectedDay.value

//   console.log(scheduleData, 'payload here')

// //   {
// //     "propertyId": "0336975b-99a0-4957-8f10-bac00b151090",
// //     "visitationDay": "Monday",
// //     "visitationTimes": [
// //         "1:51 PM",
// //         "11:49 PM"
// //     ],
// //     "frequency": "2 weeks"
// // }

//   // try {
//   //   // Replace with your actual API endpoint
//   //   const response = await fetch('/api/visitation-schedule', {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json'
//   //     },
//   //     body: JSON.stringify(scheduleData)
//   //   })
    
//   //   if (response.ok) {
//   //     console.log('Schedule set successfully')
//   //     // Add your success handling here
//   //   }
//   // } catch (error) {
//   //   console.error('Error setting schedule:', error)
//   //   // Add your error handling here
//   // }
// }

const submitSchedule = async () => {
  if (!isFormValid.value) return

  const scheduleData = {
    propertyId: selectedProperty.value,
    visitationDay: selectedDay.value,
    visitationTimes: selectedTimes.value.map(time => formatTime(time)),
    frequency: selectedFrequency.value
  }

  // Day map to convert the day name to a numeric value
  const daysMap = {
    'Sunday': 0,
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6
  }

  // Using the daysMap to convert the selected day into a numeric value
  const dayOfWeek = daysMap[selectedDay.value]

  const finalPayload = {
    list: [
      {
        dayOfWeek: dayOfWeek,
        times: scheduleData.visitationTimes,
        duration: scheduleData.frequency
      }
    ]
  }

  console.log(finalPayload, 'final payload here')

  setPayload(finalPayload)
  await createVisitationSchedule(selectedProperty.value)
}

</script>