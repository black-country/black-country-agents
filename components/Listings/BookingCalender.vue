<!-- <template>
  <div class="max-w-lg p-6 space-y-5 bg-white rounded-lg">   
    <input class="w-full p-3 disabled text-sm outline-none rounded-lg bg-gray-50 border border-gray-100" v-if="route?.params?.id" readonly :value="computedProperty?.name" />

    <div v-if="!route?.params?.id">
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

const computedProperty = computed(() => {
  return propertiesList.value.find((item) => item.id === route?.params?.id)
})

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
</script> -->

<!-- <script setup lang="ts">
import { ref, reactive } from 'vue'

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface DaySchedule {
  isEnabled: boolean;
  timeSlots: TimeSlot[];
}

interface ScheduleState {
  selectedProperty: string;
  schedule: Record<string, DaySchedule>;
  visitDuration: string;
}

const properties = ref([
  { id: '1', name: 'Property 1' },
  { id: '2', name: 'Property 2' },
  { id: '3', name: 'Property 3' },
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

const calculateEndTime = (startTime: string): string => {
  const [hours, minutes] = startTime.split(':').map(Number)
  let newMinutes = minutes + 30
  let newHours = hours
  
  if (newMinutes >= 60) {
    newMinutes = 0
    newHours = (hours + 1) % 24
  }
  
  return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`
}

const handleStartTimeChange = (timeSlot: TimeSlot, newStartTime: string) => {
  timeSlot.startTime = newStartTime
  timeSlot.endTime = calculateEndTime(newStartTime)
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

const toggleDay = (day: string) => {
  state.schedule[day].isEnabled = !state.schedule[day].isEnabled
  if (!state.schedule[day].isEnabled) {
    state.schedule[day].timeSlots = []
  }
}

const saveSchedule = async () => {
  try {
    console.log('Saving schedule:', JSON.stringify(state, null, 2))
    // Implement your API call here
    alert('Schedule saved successfully!')
    return true
  } catch (error) {
    console.error('Error saving schedule:', error)
    return false
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-4 space-y-6 bg-white">
    <h1 class="text-2xl font-semibold">Set your availability</h1>
    

    <div class="space-y-2">
      <label class="text-gray-700 font-medium">Property</label>
      <select
        v-model="state.selectedProperty"
        class="w-full p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>Select property</option>
        <option v-for="prop in properties" :key="prop.id" :value="prop.id">
          {{ prop.name }}
        </option>
      </select>
    </div>


    <div class="space-y-2">
      <h2 class="text-gray-700 font-medium">Set availability day and time interval</h2>
      <p class="text-sm text-gray-500">
        This defines when you'll be available for potential tenants to visit properties
        assigned to you. You can also add multiple time intervals to accommodate
        different schedules. Each tenant appointment will last 30 minutes.
      </p>


      <div class="space-y-4">
        <div
          v-for="(daySchedule, day) in state.schedule"
          :key="day"
          class="border rounded-lg p-4 space-y-4"
        >
          <div class="flex items-center justify-between">
            <span class="font-medium">{{ day }}</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                :checked="daySchedule.isEnabled"
                @change="toggleDay(day)"
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div v-if="daySchedule.isEnabled" class="space-y-4">
            <div
              v-for="(timeSlot, index) in daySchedule.timeSlots"
              :key="index"
              class="flex items-center space-x-4"
            >
              <select
                v-model="timeSlot.startTime"
                @change="handleStartTimeChange(timeSlot, timeSlot.startTime)"
                class="flex-1 p-2 border rounded-lg bg-gray-50"
              >
                <option value="" disabled>Start time</option>
                <option
                  v-for="time in generateTimeOptions()"
                  :key="time"
                  :value="time"
                >
                  {{ time }}
                </option>
              </select>

              <span class="text-gray-500">to</span>

              <div class="flex-1 p-2 border rounded-lg bg-gray-100 text-gray-700">
                {{ timeSlot.endTime || '--:--' }}
              </div>

              <button
                @click="removeTimeSlot(day, index)"
                class="p-2 text-gray-500 hover:text-red-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <button
              @click="addTimeSlot(day)"
              class="flex items-center text-blue-600 hover:text-blue-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Add Time
            </button>
          </div>
        </div>
      </div>
    </div>


    <div class="space-y-2">
      <h2 class="text-gray-700 font-medium">Set frequency</h2>
      <p class="text-sm text-gray-500">
        Choose how often potential tenants can book appointments for property
        tours assigned to you.
      </p>
      <select
        v-model="state.visitDuration"
        class="w-full p-2 border rounded-lg bg-gray-50"
      >
        <option value="" disabled>Select visit duration</option>
        <option value="30">Every 30 minutes</option>
        <option value="60">Every hour</option>
      </select>
    </div>


    <div class="flex justify-end space-x-4">
      <button
        class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
      >
        Cancel
      </button>
      <button
        @click="saveSchedule"
        class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
      >
        Set availability
      </button>
    </div>
  </div>
</template> -->



<script setup lang="ts">
import { ref, reactive } from 'vue'

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface DaySchedule {
  isEnabled: boolean;
  timeSlots: TimeSlot[];
}

interface ScheduleState {
  selectedProperty: string;
  schedule: Record<string, DaySchedule>;
  visitDuration: string;
}

const properties = ref([
  { id: '1', name: 'Property 1' },
  { id: '2', name: 'Property 2' },
  { id: '3', name: 'Property 3' },
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

const showTimePicker = ref(false)
const activeTimeSlot = ref<{ day: string; index: number; type: 'start' | 'end' } | null>(null)
const selectedTime = ref('')

const format12Hour = (time: string): string => {
  if (!time) return ''
  const [hours, minutes] = time.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`
}

const parse12Hour = (time12: string): string => {
  if (!time12) return ''
  const [time, period] = time12.split(' ')
  let [hours, minutes] = time.split(':').map(Number)
  
  if (period === 'PM' && hours !== 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

const calculateEndTime = (startTime12: string): string => {
  const startTime24 = parse12Hour(startTime12)
  const [hours, minutes] = startTime24.split(':').map(Number)
  let newMinutes = minutes + 30
  let newHours = hours
  
  if (newMinutes >= 60) {
    newMinutes = 0
    newHours = (hours + 1) % 24
  }
  
  const time24 = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`
  return format12Hour(time24)
}

const generateTimePickerOptions = () => {
  const options = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time24 = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      options.push(format12Hour(time24))
    }
  }
  return options
}

const handleTimeSelect = (time: string) => {
  if (!activeTimeSlot.value) return
  
  const { day, index, type } = activeTimeSlot.value
  const timeSlot = state.schedule[day].timeSlots[index]
  
  if (type === 'start') {
    timeSlot.startTime = time
    timeSlot.endTime = calculateEndTime(time)
  }
  
  showTimePicker.value = false
  activeTimeSlot.value = null
}

const openTimePicker = (day: string, index: number, type: 'start' | 'end') => {
  activeTimeSlot.value = { day, index, type }
  showTimePicker.value = true
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

const toggleDay = (day: string) => {
  state.schedule[day].isEnabled = !state.schedule[day].isEnabled
  if (!state.schedule[day].isEnabled) {
    state.schedule[day].timeSlots = []
  }
}

const saveSchedule = async () => {
  try {
    console.log('Saving schedule:', JSON.stringify(state, null, 2))
    alert('Schedule saved successfully!')
    return true
  } catch (error) {
    console.error('Error saving schedule:', error)
    return false
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-4 bg-white  rounded-lg">
    <h1 class="text-xl text-[#1D2739] font-medium">Set your availability</h1>
    
    <div class="h-[500px] overflow-y-auto space-y-6 py-6">
        <!-- Property Selection -->
    <div class="space-y-2">
      <label class="text-gray-700 font-medium">Property</label>
      <select
        v-model="state.selectedProperty"
        class="w-full p-2 border rounded-lg py-4 outline-none border-[0.5px] border-[#F0F2F5] bg-[#F0F2F5]"
      >
        <option value="" disabled>Select property</option>
        <option v-for="prop in properties" :key="prop.id" :value="prop.id">
          {{ prop.name }}
        </option>
      </select>
    </div>

    <!-- Availability Schedule -->
    <div class="space-y-2">
      <h2 class="text-gray-700 font-medium">Set availability day and time interval</h2>
      <p class="text-sm text-gray-500">
        This defines when you'll be available for potential tenants to visit properties
        assigned to you. Each tenant appointment will last 30 minutes.
      </p>

      <!-- Days of the Week -->
      <div class="space-y-4">
        <div
          v-for="(daySchedule, day) in state.schedule"
          :key="day"
          class="border-b-[0.5px] border-gray-50 rounded-lg p-4 space-y-4"
        >
         <div class="flex justify-between items-center">
          <div class="flex items-center gap-x-4">
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                :checked="daySchedule.isEnabled"
                @change="toggleDay(day)"
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
            <span class="font-medium text-[#1D2739]">{{ day }}</span>
          </div>

          <button
              @click="addTimeSlot(day)"
              :disabled="!daySchedule.isEnabled"
              class="flex items-center border text-gray-900 text-[#1D2739] disabled:cursor-not-allowed disabled:opacity-25 bg-gray-50 rounded-lg py-2.5 font-semibold text-sm px-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Add Time
            </button>
         </div>

          <div v-if="daySchedule.isEnabled" class="space-y-4">
            <div
              v-for="(timeSlot, index) in daySchedule.timeSlots"
              :key="index"
              class="flex items-center space-x-4 w-6/12"
            >
              <button
                @click="openTimePicker(day, index, 'start')"
                class="flex-1 p-2 p-3 border-[0.5px] border-gray-25 rounded-lg bg-[#F0F2F5] text-left"
              >
                {{ timeSlot.startTime || '00:00 AM' }}
              </button>

              <span class="text-gray-500">to</span>

              <div class="flex-1 p-2 p-3 border-[0.5px] border-gray-25 rounded-lg bg-[#F0F2F5] text-gray-700">
                {{ timeSlot.endTime || '00:00 AM' }}
              </div>

              <button
                @click="removeTimeSlot(day, index)"
                class="p-2 text-gray-500 hover:text-red-500"
              >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8337 4.16699L4.16699 15.8337M4.16699 4.16699L15.8337 15.8337" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </button>
            </div>

            <!-- <button
              @click="addTimeSlot(day)"
              class="flex items-center text-[#1D2739] bg-gray-50 rounded-lg py-2.5 font-semibold text-sm px-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Add Time
            </button> -->
          </div>
        </div>
      </div>
    </div>

    <!-- Time Picker Modal -->
    <div
      v-if="showTimePicker"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showTimePicker = false"
    >
      <div
        class="bg-white rounded-lg p-4 max-h-[80vh] overflow-y-auto w-72"
        @click.stop
      >
        <h3 class="text-lg font-semibold mb-4">Select Time</h3>
        <div class="space-y-2">
          <button
            v-for="time in generateTimePickerOptions()"
            :key="time"
            @click="handleTimeSelect(time)"
            class="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
          >
            {{ time }}
          </button>
        </div>
      </div>
    </div>

    <!-- Visit Duration -->
    <div class="space-y-2">
      <h2 class="text-gray-700 font-medium">Set frequency</h2>
      <p class="text-sm text-gray-500">
        Choose how often potential tenants can book appointments for property
        tours assigned to you.
      </p>
      <select
        v-model="state.visitDuration"
        class="w-full p-2 py-4 outline-none border-[0.5px] text-sm rounded-lg bg-gray-50"
      >
        <option value="" disabled>Select visit duration</option>
        <option value="30">Every 30 minutes</option>
        <option value="60">Every hour</option>
      </select>
    </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end space-x-4 w-full">
      <button class="px-4 py-4 text-gray-700 hover:bg-gray-100 w-full rounded-lg">
        Cancel
      </button>
      <button
        @click="saveSchedule"
        class="px-4 py-4 bg-gray-900 text-white rounded-lg w-full hover:bg-gray-800"
      >
        Set availability
      </button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>