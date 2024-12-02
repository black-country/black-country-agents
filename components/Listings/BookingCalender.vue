<!-- <template>
  <div class="max-w-lg p-6 space-y-5 bg-white rounded-lg">
    <div>
      <h3 class="text-sm font-medium mb-1">Property</h3>
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

    <div>
      <h3 class="text-sm font-medium mb-2">Set visitation days</h3>
      <div class="grid grid-cols-4 gap-4">
        <button
          v-for="day in days"
          :key="day"
          @click="selectDay(day)"
          :class="[
            'p-2.5 rounded-lg text-xs text-center',
            selectedDay === day
              ? 'border-2 border-green-600 text-green-600'
              : 'bg-gray-50'
          ]"
        >
          {{ day }}
        </button>
      </div>
    </div>

    
    <div v-if="selectedDay">
      <h3 class="text-sm font-medium mb-1">Time</h3>
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <div
            v-for="(time, index) in selectedTimes"
            :key="index"
            class="px-4 py-3 rounded-lg bg-[#EAEAEA] text-xs flex items-center gap-2"
          >
            {{ time }}
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
            class="px-4 py-2 text-gray-600 text-sm bg-gray-100 rounded-lg"
          >
            + Time
          </button>
        </div>
      </div>
    </div>

    <div>
      <h3 class="text-sm font-medium mb-1">Set frequency</h3>
      <p class="text-gray-600 text-xs mb-1">
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

    <div v-if="savedSchedules.length > 0">
      <h3 class="text-sm font-medium mb-2">Saved Visitation Schedules</h3>
      <div class="space-y-4">
        <div v-for="(schedule, index) in savedSchedules" :key="index" class="p-4 text-sm bg-gray-100 rounded-lg flex justify-between items-center">
          <p><strong>{{ days[schedule.dayOfWeek] }}</strong> - {{ schedule.times.join(', ') }} - {{ schedule.duration }}</p>
          <div class="flex items-center gap-2">
            <button @click="editSchedule(index)" class="text-blue-500 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B8469" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
            </button>
            <button @click="deleteSchedule(index)" class="text-red-500 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B8469" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full flex justify-end items-end">
      <button
        @click="saveSchedule"
        class="disabled:cursor-not-allowed text-xs disabled:opacity-25 px-4 py-3 bg-[#292929] text-white rounded-lg font-medium"
        :disabled="!isFormValid || loading"
      >
        {{ loading ? 'Processing' : 'Save Schedule' }}
      </button>
    </div>

    <div class="pt-4">
      <button
        @click="submitSchedule"
        class="w-full disabled:cursor-not-allowed text-sm disabled:opacity-25 p-4 bg-[#292929] text-white rounded-lg font-medium"
        :disabled="savedSchedules.length === 0 || loading"
      >
        {{ loading ? 'Processing' : 'Submit Schedule' }}
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

interface Schedule {
  dayOfWeek: number
  times: string[]
  duration: string
}

const days = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]

const frequencies = [
  '1 week', '2 weeks', '3 weeks', '1 month'
]

// State
const selectedProperty = ref<number | null>(null)
const selectedDay = ref<string>('')
const selectedTimes = ref<string[]>([])
const selectedFrequency = ref<string>('')
const newTime = ref('')
const timeError = ref('')
const savedSchedules = ref<Schedule[]>([])

// Methods
const daysMap = {
  'Sunday': 0,
  'Monday': 1,
  'Tuesday': 2,
  'Wednesday': 3,
  'Thursday': 4,
  'Friday': 5,
  'Saturday': 6
}

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

  // Format time before adding
  const formattedTime = formatTime(newTime.value)

  if (selectedTimes.value.includes(formattedTime)) {
    timeError.value = 'This time slot is already added'
    return
  }

  timeError.value = ''
  selectedTimes.value.push(formattedTime)
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

const saveSchedule = () => {
  if (!isFormValid.value) return

  const scheduleData = {
    dayOfWeek: daysMap[selectedDay.value],
    times: selectedTimes.value,
    duration: selectedFrequency.value
  }

  savedSchedules.value.push(scheduleData)

  // Clear inputs for the next schedule
  selectedDay.value = ''
  selectedTimes.value = []
  selectedFrequency.value = ''
  newTime.value = ''
  timeError.value = ''
}

const editSchedule = (index: number) => {
  const scheduleToEdit = savedSchedules.value[index]
  selectedDay.value = days[scheduleToEdit.dayOfWeek]
  selectedTimes.value = scheduleToEdit.times
  selectedFrequency.value = scheduleToEdit.duration
  savedSchedules.value.splice(index, 1)
}

const deleteSchedule = (index: number) => {
  savedSchedules.value.splice(index, 1)
}

const submitSchedule = async () => {
  if (savedSchedules.value.length === 0) return

  const finalPayload = {
    list: savedSchedules.value
  }

  console.log(finalPayload, 'final payload here')

  setPayload(finalPayload)
  await createVisitationSchedule(selectedProperty.value)
}
</script> -->

<!-- <template>
  <div class="max-w-lg p-6 space-y-5 bg-white rounded-lg">

    <div>
      <h3 class="text-sm font-medium mb-1">Property</h3>
      <select 
        v-model="selectedProperty"
        class="w-full p-3 text-sm outline-none rounded-lg bg-gray-50 border border-gray-100"
        :disabled="!!existingAvailability"
      >
        <option value="" disabled selected>Select property</option>
        <option v-for="property in propertiesList" :key="property.id" :value="property.id">
          {{ property.name }}
        </option>
      </select>
    </div>

  
    <div>
      <h3 class="text-sm font-medium mb-2">Set visitation days</h3>
      <div class="grid grid-cols-4 gap-4">
        <button
          v-for="day in days"
          :key="day"
          @click="selectDay(day)"
          :class="[
            'p-2.5 rounded-lg text-xs text-center',
            selectedDay === day
              ? 'border-2 border-green-600 text-green-600'
              : 'bg-gray-50'
          ]"
        >
          {{ day }}
        </button>
      </div>
    </div>

    
    <div v-if="selectedDay">
      <h3 class="text-sm font-medium mb-1">Time</h3>
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <div
            v-for="(time, index) in selectedTimes"
            :key="index"
            class="px-4 py-3 rounded-lg bg-[#EAEAEA] text-xs flex items-center gap-2"
          >
            {{ time }}
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
            class="px-4 py-2 text-gray-600 text-sm bg-gray-100 rounded-lg"
          >
            + Time
          </button>
        </div>
      </div>
    </div>


    <div>
      <h3 class="text-sm font-medium mb-1">Set frequency</h3>
      <p class="text-gray-600 text-xs mb-1">
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


    <div v-if="savedSchedules.length > 0">
      <h3 class="text-sm font-medium mb-2">Saved Visitation Schedules</h3>
      <div class="space-y-4">
        <div v-for="(schedule, index) in savedSchedules" :key="index" class="p-4 text-sm bg-gray-100 rounded-lg flex justify-between items-center">
          <p><strong>{{ days[schedule.dayOfWeek] }}</strong> - {{ schedule.times.join(', ') }} - {{ schedule.duration }}</p>
          <div class="flex items-center gap-2">
            <button @click="editSchedule(index)" class="text-blue-500 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B8469" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
            </button>
            <button @click="deleteSchedule(index)" class="text-red-500 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B8469" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        </div>
      </div>
    </div>


    <div class="w-full flex justify-end items-end">
      <button
        @click="saveSchedule"
        class="disabled:cursor-not-allowed text-xs disabled:opacity-25 px-4 py-3 bg-[#292929] text-white rounded-lg font-medium"
        :disabled="!isFormValid || loading"
      >
        {{ loading ? 'Processing' : 'Save Schedule' }}
      </button>
    </div>


    <div class="pt-4">
      <button
        @click="submitSchedule"
        class="w-full disabled:cursor-not-allowed text-sm disabled:opacity-25 p-4 bg-[#292929] text-white rounded-lg font-medium"
        :disabled="savedSchedules.length === 0 || loading"
      >
        {{ loading ? 'Processing' : existingAvailability ? 'Update Schedule' : 'Submit Schedule' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCreateVisitationSchedule } from '@/composables/modules/visitation/useSetVisitationAvailability'
import { useGetProperties } from '@/composables/modules/property/fetchProperties'
import { ref, computed, onMounted } from 'vue'

// Types
interface Property {
  id: number
  name: string
}

interface Schedule {
  dayOfWeek: number
  times: string[]
  duration: string
}

interface Availability {
  id: string
  dayOfMonth: number | null
  dayOfWeek: number
  time: string | null
  times: string[]
  duration: string
  durationNumber: number
  durationUnit: string
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
}

// Props
interface Props {
  existingAvailability?: Availability
}

const props = defineProps<Props>()

const { propertiesList, loadingProperties } = useGetProperties()
const { createVisitationSchedule, loading, setPayload } = useCreateVisitationSchedule()

const days = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]

const frequencies = [
  '1 week', '2 weeks', '3 weeks', '1 month'
]

// State
const selectedProperty = ref<number | null>(null)
const selectedDay = ref<string>('')
const selectedTimes = ref<string[]>([])
const selectedFrequency = ref<string>('')
const newTime = ref('')
const timeError = ref('')
const savedSchedules = ref<Schedule[]>([])

// Methods
const daysMap = {
  'Sunday': 0,
  'Monday': 1,
  'Tuesday': 2,
  'Wednesday': 3,
  'Thursday': 4,
  'Friday': 5,
  'Saturday': 6
}

const selectDay = (day: string) => {
  selectedDay.value = day
}

const formatTime = (time: string): string => {
  if (time.includes('AM') || time.includes('PM')) return time
  
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

  const formattedTime = formatTime(newTime.value)

  if (selectedTimes.value.includes(formattedTime)) {
    timeError.value = 'This time slot is already added'
    return
  }

  timeError.value = ''
  selectedTimes.value.push(formattedTime)
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

const saveSchedule = () => {
  if (!isFormValid.value) return

  const scheduleData = {
    dayOfWeek: daysMap[selectedDay.value],
    times: selectedTimes.value,
    duration: selectedFrequency.value
  }

  savedSchedules.value.push(scheduleData)

  // Clear inputs for the next schedule
  selectedDay.value = ''
  selectedTimes.value = []
  selectedFrequency.value = ''
  newTime.value = ''
  timeError.value = ''
}

const editSchedule = (index: number) => {
  const scheduleToEdit = savedSchedules.value[index]
  selectedDay.value = days[scheduleToEdit.dayOfWeek]
  selectedTimes.value = scheduleToEdit.times
  selectedFrequency.value = scheduleToEdit.duration
  savedSchedules.value.splice(index, 1)
}

const deleteSchedule = (index: number) => {
  savedSchedules.value.splice(index, 1)
}

const submitSchedule = async () => {
  if (savedSchedules.value.length === 0) return

  const finalPayload = {
    list: savedSchedules.value
  }

  setPayload(finalPayload)
  await createVisitationSchedule(selectedProperty.value)
}

// Initialize component with existing availability if provided
onMounted(() => {
  if (props.existingAvailability) {
    const availability = props.existingAvailability
    selectedProperty.value = parseInt(availability.id)
    selectedDay.value = days[availability.dayOfWeek]
    selectedTimes.value = availability.times
    selectedFrequency.value = `${availability.durationNumber} ${availability.durationUnit}`
    
    // Add to saved schedules
    savedSchedules.value = [{
      dayOfWeek: availability.dayOfWeek,
      times: availability.times,
      duration: availability.duration
    }]
  }
})
</script> -->







<template>
  <div class="max-w-lg p-6 space-y-5 bg-white rounded-lg">
    <!-- Property Selection -->
    <div>
      <h3 class="text-sm font-medium mb-1">Property</h3>
      <select 
        v-model="selectedProperty"
        class="w-full p-3 text-sm outline-none rounded-lg bg-gray-50 border border-gray-100"
        :disabled="!!existingAvailability"
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
      <div class="grid grid-cols-4 gap-4">
        <button
          v-for="day in days"
          :key="day"
          @click="selectDay(day)"
          :class="[
            'p-2.5 rounded-lg text-xs text-center',
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
      <h3 class="text-sm font-medium mb-1">Time</h3>
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <div
            v-for="(time, index) in selectedTimes"
            :key="index"
            class="px-4 py-3 rounded-lg bg-[#EAEAEA] text-xs flex items-center gap-2"
          >
            {{ formatTimeDisplay(time) }}
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
            class="px-4 py-2 text-gray-600 text-sm bg-gray-100 rounded-lg"
          >
            + Time
          </button>
        </div>
      </div>
    </div>

    <!-- Frequency Selection -->
    <div>
      <h3 class="text-sm font-medium mb-1">Set frequency</h3>
      <p class="text-gray-600 text-xs mb-1">
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


    <div v-if="savedSchedules.length > 0">
      <h3 class="text-sm font-medium mb-2">Saved Visitation Schedules</h3>
      <div class="space-y-4">
        <div v-for="(schedule, index) in savedSchedules" :key="index" class="p-4 text-sm bg-gray-100 rounded-lg flex justify-between items-center">
          <p><strong>{{ days[schedule.dayOfWeek] }}</strong> - {{ schedule.times.join(', ') }} - {{ schedule.duration }}</p>
          <div class="flex items-center gap-2">
            <button @click="editSchedule(index)" class="text-blue-500 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B8469" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
            </button>
            <button @click="deleteSchedule(index)" class="text-red-500 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B8469" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        </div>
      </div>
    </div>


    <div class="w-full flex justify-end items-end">
      <button
        @click="saveSchedule"
        class="disabled:cursor-not-allowed text-xs disabled:opacity-25 px-4 py-3 bg-[#292929] text-white rounded-lg font-medium"
        :disabled="!isFormValid || loading"
      >
        {{ loading ? 'Processing' : 'Save Schedule' }}
      </button>
    </div>

    <!-- Submit Button -->
    <div class="pt-4">
      <button
        @click="submitSchedule"
        class="w-full disabled:cursor-not-allowed text-sm disabled:opacity-25 p-4 bg-[#292929] text-white rounded-lg font-medium"
        :disabled="savedSchedules.length === 0 || loading"
      >
        {{ loading ? 'Processing' : existingAvailability ? 'Update Schedule' : 'Submit Schedule' }}
      </button>
      <!-- <button
      @click="submitSchedule"
      class="w-full disabled:cursor-not-allowed text-sm disabled:opacity-25 p-4 bg-[#292929] text-white rounded-lg font-medium"
      :disabled="isSubmitDisabled"
    >
      {{ loading ? 'Processing' : (existingAvailability ? 'Update Schedule' : 'Submit Schedule') }}
    </button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCreateVisitationSchedule } from '@/composables/modules/visitation/useSetVisitationAvailability'
import { useUpdateAvailabilityStatus } from '@/composables/modules/visitation/useUpdateAvailabilityStatus'
import { useGetProperties } from '@/composables/modules/property/fetchProperties'
import { ref, computed, onMounted } from 'vue'

// const {  updateStatus, updating } = useUpdateAvailabilityStatus()
const route = useRoute() as any
// Types
interface Property {
  id: number
  name: string
}

interface Availability {
  id: string
  dayOfMonth: number | null
  dayOfWeek: number
  time: string | null
  times: string[]
  duration: string
  durationNumber: number
  durationUnit: string
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
}

// Props
interface Props {
  existingAvailability?: Availability
}

const props = defineProps<Props>()

const { propertiesList, loadingProperties } = useGetProperties()
// const { createVisitationSchedule, loading: createLoading } = useCreateVisitationSchedule()
const { createVisitationSchedule, loading: createLoading, setPayload } = useCreateVisitationSchedule()
const { updateAvailabilityStatus, updating: updateLoading } = useUpdateAvailabilityStatus()

const days = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]

const frequencies = [
  '1 week', '2 weeks', '3 weeks', '1 month'
]

// State
const selectedProperty = ref<number | null>(null)
const selectedDay = ref<string>('')
const selectedTimes = ref<string[]>([])
const selectedFrequency = ref<string>('')
const savedSchedules = ref<Schedule[]>([])
const newTime = ref('')
const timeError = ref('')
const loading = computed(() => createLoading.value || updateLoading.value)

// Methods
const daysMap = {
  'Sunday': 0,
  'Monday': 1,
  'Tuesday': 2,
  'Wednesday': 3,
  'Thursday': 4,
  'Friday': 5,
  'Saturday': 6
}

const selectDay = (day: string) => {
  selectedDay.value = day
}

const formatTimeForPayload = (time: string): string => {
  // If time is in 24-hour format, return as is
  if (!time.includes('AM') && !time.includes('PM')) return time
  
  // Convert 12-hour format to 24-hour format
  const [timePart, meridiem] = time.split(' ')
  let [hours, minutes] = timePart.split(':')
  let hour = parseInt(hours)
  
  if (meridiem === 'PM' && hour !== 12) hour += 12
  if (meridiem === 'AM' && hour === 12) hour = 0
  
  return `${hour.toString().padStart(2, '0')}:${minutes}`
}

const formatTimeDisplay = (time: string): string => {
  // If time is already in 12-hour format, return as is
  if (time.includes('AM') || time.includes('PM')) return time
  
  // Convert 24-hour format to 12-hour format
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

  const formattedTime = formatTimeForPayload(newTime.value)

  if (selectedTimes.value.includes(formattedTime)) {
    timeError.value = 'This time slot is already added'
    return
  }

  timeError.value = ''
  selectedTimes.value.push(formattedTime)
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

const saveSchedule = () => {
  if (!isFormValid.value) return

  const scheduleData = {
    dayOfWeek: daysMap[selectedDay.value],
    times: selectedTimes.value,
    duration: selectedFrequency.value
  }

  savedSchedules.value.push(scheduleData)

  // Clear inputs for the next schedule
  selectedDay.value = ''
  selectedTimes.value = []
  selectedFrequency.value = ''
  newTime.value = ''
  timeError.value = ''
}

const editSchedule = (index: number) => {
  const scheduleToEdit = savedSchedules.value[index]
  selectedDay.value = days[scheduleToEdit.dayOfWeek]
  selectedTimes.value = scheduleToEdit.times
  selectedFrequency.value = scheduleToEdit.duration
  savedSchedules.value.splice(index, 1)
}

const deleteSchedule = (index: number) => {
  savedSchedules.value.splice(index, 1)
}

const submitSchedule = async () => {
  // Check if savedSchedules is empty only when creating a schedule
  if (!props.existingAvailability && savedSchedules.value.length === 0) return;

  // Check form validity only when editing
  if (props.existingAvailability && !isFormValid.value) return;

  const editFinalPayload = {
    time: selectedTimes.value[0], // Using the first time as the base time
    duration: selectedFrequency.value
  };

  const createFinalPayload = {
    list: savedSchedules.value
  };

  if (props.existingAvailability) {
    await updateAvailabilityStatus(route?.params?.id, props.existingAvailability.id, editFinalPayload);
  } else {
    // Only check if savedSchedules has data when creating a schedule
    setPayload(createFinalPayload);
    await createVisitationSchedule(selectedProperty.value);
  }
};


// Computed property for the disabled state of the button
// const isSubmitDisabled = computed(() => {
//   return savedSchedules.value.length === 0 || loading.value;
// });




// const submitSchedule = async () => {
//   if (savedSchedules.value.length === 0) return

//   if (!isFormValid.value) return

//   const editFinalPayload = {
//     time: selectedTimes.value[0], // Using the first time as the base time
//     duration: selectedFrequency.value
//   }

//   const createFinalPayload = {
//     list: savedSchedules.value
//   }

//   if (props.existingAvailability) {
//     await updateAvailabilityStatus(route?.params?.id, props.existingAvailability.id, editFinalPayload)
//   } else {
//     // await createVisitationSchedule(selectedProperty.value)
//     setPayload(createFinalPayload)
//     await createVisitationSchedule(selectedProperty.value)
//   }
// }

// Initialize component with existing availability if provided
onMounted(() => {
  // if (props.existingAvailability) {
  //   const availability = props.existingAvailability
  //   selectedProperty.value = parseInt(availability.id)
  //   selectedDay.value = days[availability.dayOfWeek]
  //   selectedTimes.value = availability.times.map(time => formatTimeForPayload(time))
  //   selectedFrequency.value = availability.duration
  // }
  if (props.existingAvailability) {
    const availability = props.existingAvailability
    selectedProperty.value = parseInt(availability.id)
    selectedDay.value = days[availability.dayOfWeek]
    selectedTimes.value = availability.times
    selectedFrequency.value = `${availability.durationNumber} ${availability.durationUnit}`
    
    // Add to saved schedules
    savedSchedules.value = [{
      dayOfWeek: availability.dayOfWeek,
      times: availability.times,
      duration: availability.duration
    }]
  }
})
</script>