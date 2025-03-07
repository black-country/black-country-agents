<script setup lang="ts">
import { useCreateVisitationSchedule } from '@/composables/modules/visitation/useSetVisitationAvailability'
import { ref, reactive, computed } from 'vue'
import { useGetProperties } from '@/composables/modules/property/fetchProperties'


const { loadingProperties, propertiesList } = useGetProperties()
const { createVisitationSchedule, loading: processing, setPayload } = useCreateVisitationSchedule()

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
  duration: string;
}

const props = defineProps({
  existingAvailability: {
    type: Object,
    default: () => { }
  }
})

const route = useRoute()
const emit = defineEmits(['close'])

// Initialize state FIRST before any functions that use it
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
  duration: '2 weeks'
})

const showTimePicker = ref(false)
const activeTimeSlot = ref<{ day: string; index: number; type: 'start' | 'end' } | null>(null)

const reverseDaysMap: Record<number, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
}

const daysMap: Record<string, number> = {
  'Sunday': 0,
  'Monday': 1,
  'Tuesday': 2,
  'Wednesday': 3,
  'Thursday': 4,
  'Friday': 5,
  'Saturday': 6
}
const populateExistingData = () => {
  if (props.existingAvailability && Object.keys(props.existingAvailability).length > 0) {
    // Set duration from the combined durationNumber and durationUnit
    state.duration = `${props.existingAvailability.durationNumber} ${props.existingAvailability.durationUnit}`

    // Set property if available
    if (props.existingAvailability.houseId) {
      state.selectedProperty = props.existingAvailability.houseId
    }

    // Reset all days first
    Object.keys(state.schedule).forEach(day => {
      state.schedule[day].isEnabled = false
      state.schedule[day].timeSlots = []
    })

    // Map the day and populate intervals
    const dayName = reverseDaysMap[props.existingAvailability.dayOfWeek]
    if (dayName && props.existingAvailability.intervals) {
      state.schedule[dayName].isEnabled = true

      // Map the intervals to time slots
      props.existingAvailability.intervals.forEach(interval => {
        state.schedule[dayName].timeSlots.push({
          startTime: interval.start,
          endTime: interval.end
        })
      })
    }
  }
}

watch(() => props.existingAvailability, (newValue) => {
  if (newValue) {
    populateExistingData()
  }
}, { immediate: true })

const computedProperty = computed(() => {
  if (route.params.id) {
    return propertiesList.value.find((itm: any) => itm.id === route.params.id)
  }
})



const generateTimePickerOptions = (type: 'start' | 'end', currentStartTime?: string) => {
  const options: string[] = [];

  const parse12HourTo24 = (time12: string): string => {
    const [time, modifier] = time12.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const format24HourTo12 = (time24: string): string => {
    let [hours, minutes] = time24.split(':').map(Number);
    const modifier = hours >= 12 ? 'PM' : 'AM';

    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${modifier}`;
  };

  let startHour = 0;
  let startMinute = 0;

  if (type === 'end' && currentStartTime) {
    const start24Hour = parse12HourTo24(currentStartTime);
    [startHour, startMinute] = start24Hour.split(':').map(Number);
  }

  let startTime24 = `${startHour}:${startMinute}`;

  let currentHour = startHour;
  let currentMinute = startMinute + 30;

  if (currentMinute >= 60) {
    currentMinute -= 60;
    currentHour += 1;
  }

  for (let i = 0; i < 48; i++) {
    const time24 = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
    const time12 = format24HourTo12(time24);
    options.push(time12);

    currentMinute += 30;
    if (currentMinute >= 60) {
      currentMinute -= 60;
      currentHour += 1;
    }
    if (currentHour >= 24) {
      currentHour -= 24;
    }
  }

  return options;
};

const handleTimeSelect = (time: string) => {
  if (!activeTimeSlot.value) return

  const { day, index, type } = activeTimeSlot.value
  const timeSlot = state.schedule[day].timeSlots[index]

  if (type === 'start') {
    timeSlot.startTime = time
    timeSlot.endTime = ''  // Reset end time when start time changes
  } else {
    timeSlot.endTime = time
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

const formatTime = (time12: string): string => {
  if (!time12) return '';
  // Split the time and period
  const [time, period] = time12.toLowerCase().split(' ');
  let [hours, minutes] = time.split(':');

  // Ensure hours is two digits
  hours = hours.padStart(2, '0');

  // Format as "HH:MM AM/PM"
  return `${hours}:${minutes} ${period.toUpperCase()}`;
}

const formatPayload = () => {
  if (!state.selectedProperty && !computedProperty.value?.id) {
    console.log('select property')
    return null
  }

  const list = Object.entries(state.schedule)
    .filter(([_, daySchedule]) => daySchedule.isEnabled)
    .map(([day, daySchedule]) => {
      const validTimeSlots = daySchedule.timeSlots.filter(slot => {
        if (!slot.startTime || !slot.endTime) {
          return false
        }

        const parseTime = (timeStr) => {
          const [time, period] = timeStr.split(' ')
          let [hours, minutes] = time.split(':').map(Number)
          if (period === 'PM' && hours < 12) hours += 12
          if (period === 'AM' && hours === 12) hours = 0
          return hours * 60 + minutes
        }

        const startMinutes = parseTime(slot.startTime)
        const endMinutes = parseTime(slot.endTime)

        return endMinutes > startMinutes
      })

      if (validTimeSlots.length === 0) {
        return null
      }

      const intervals = validTimeSlots.map(slot => ({
        start: formatTime(slot.startTime),
        end: formatTime(slot.endTime),
        times: generateTimesBetween(slot.startTime, slot.endTime)
      }))

      return {
        dayOfWeek: daysMap[day],
        intervals,
        duration: state.duration,
        durationNumber: parseInt(state.duration.split(' ')[0]),
        durationUnit: state.duration.split(' ')[1],
      }
    })
    .filter(day => day !== null && day.intervals.length > 0)

  if (list.length === 0) {
    console.log('invalid time slots')
    return null
  }

  return { list }
}

const generateTimesBetween = (start: string, end: string) => {
  const times: string[] = [];
  const parseTime = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const startMinutes = parseTime(start);
  const endMinutes = parseTime(end);
  let currentMinutes = startMinutes;

  while (currentMinutes <= endMinutes) {
    let hours = Math.floor(currentMinutes / 60);
    let minutes = currentMinutes % 60;
    let period = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    times.push(`${hours}:${minutes.toString().padStart(2, '0')} ${period}`);
    currentMinutes += 30;
  }
  return times;
};

const saveSchedule = async () => {
  const payload = formatPayload()
  if (!payload) {
    return
  }
  
  setPayload(payload)
  try {
    if (route.params.id) {
      await createVisitationSchedule(computedProperty.value.id)
    } else {
      await createVisitationSchedule(state.selectedProperty)
    }
  } catch (error) {
    console.error('error saving:', error)
  }
}
</script>

<template>
  <div class="max-w-xl mx-auto p-4 bg-white rounded-lg ">
    <h1 class="text-base text-[#1D2739] font-medium">Set your availability</h1>

    <!-- <div class="h-[500px] overflow-y-auto space-y-6"> -->
    <div class="space-y-6">
      <!-- Property Selection -->
      <div class="space-y-2">
        <label class="text-gray-700 text-sm font-medium">Property</label>
        <input v-if="route?.params?.id" :value="computedProperty?.name" readonly
          class="w-full p-2 border rounded-lg py-4 text-sm outline-none border-[0.5px] border-[#F0F2F5] bg-[#F0F2F5]" />
        <select v-else v-model="state.selectedProperty"
          class="w-full p-2 border rounded-lg py-4 text-sm outline-none border-[0.5px] border-[#F0F2F5] bg-[#F0F2F5]">
          <option value="" disabled>Select property</option>
          <option v-for="prop in propertiesList" :key="prop.id" :value="prop.id">
            {{ prop.name }}
          </option>
        </select>
      </div>

      <!-- Availability Schedule -->
      <div class="space-y-2">
        <h2 class="text-gray-700 text-sm font-medium">Set availability day and time interval</h2>
        <p class="text-xs text-gray-500">
          This defines when you'll be available for potential tenants to visit properties
          assigned to you.
        </p>

        <!-- {{existingAvailability}} -->

        <!-- Days of the Week -->
        <div class="space-y-4">
          <div v-for="(daySchedule, day) in state.schedule" :key="day"
            class="border-b-[0.5px] border-gray-50 rounded-lg p-4 space-y-4">
            <div class="flex justify-between items-center flex-wrap gap-2">
              <div class="flex items-center gap-x-4">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" :checked="daySchedule.isEnabled" @change="toggleDay(day)" class="sr-only peer">
                  <div
                    class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600">
                  </div>
                </label>
                <span class="font-medium text-sm text-[#1D2739]">{{ day }}</span>
              </div>

              <button @click="addTimeSlot(day)" :disabled="!daySchedule.isEnabled"
                class="flex items-center border-[0.5px] text-sm text-gray-900 text-[#1D2739] disabled:cursor-not-allowed disabled:opacity-25 bg-gray-50 rounded-lg py-2 font-semibold text-sm px-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clip-rule="evenodd" />
                </svg>
                Add Time
              </button>
            </div>

            <div v-if="daySchedule.isEnabled" class="space-y-4">
              <div v-for="(timeSlot, index) in daySchedule.timeSlots" :key="index"
                class="flex w-5/12 items-center space-x-2  gap-2">
                <button @click="openTimePicker(day, index, 'start')"
                  class="flex-1 p-2 text-center border-[0.5px] border-gray-25 rounded-lg text-sm bg-[#F0F2F5] text-left min-w-[120px]">
                  {{ timeSlot.startTime || '00:00 AM' }}
                </button>

                <span class="text-gray-500">to</span>

                <button @click="openTimePicker(day, index, 'end')" :disabled="!timeSlot.startTime"
                  class="flex-1 p-2 text-center border-[0.5px] border-gray-25 rounded-lg text-sm bg-[#F0F2F5] text-left min-w-[120px] disabled:opacity-50">
                  {{ timeSlot.endTime || '00:00 AM' }}
                </button>

                <button @click="removeTimeSlot(day, index)" class="p-2 text-gray-500 hover:text-red-500">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.8337 4.16699L4.16699 15.8337M4.16699 4.16699L15.8337 15.8337" stroke="#1D2739"
                      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Time Picker Modal -->
      <div v-if="showTimePicker" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click="showTimePicker = false">
        <div class="bg-white rounded-lg p-4 max-h-[80vh] overflow-y-auto w-72" @click.stop>
          <h3 class="text-sm font-semibold mb-4">Select Time</h3>
          <div class="space-y-2">
            <button v-for="time in generateTimePickerOptions(
              activeTimeSlot?.type || 'start',
              activeTimeSlot?.type === 'end' ?
                state.schedule[activeTimeSlot.day].timeSlots[activeTimeSlot.index].startTime :
                undefined
            )" :key="time" @click="handleTimeSelect(time)"
              class="w-full text-left border-b-[0.5px] border-gray-50 text-sm px-4 py-2 hover:bg-gray-100 rounded-lg">
              {{ time }}
            </button>
          </div>
        </div>
      </div>

      <!-- Duration Selection -->
      <div class="space-y-2">
        <h2 class="text-gray-700 text-sm font-medium">Set frequency</h2>
        <p class="text-sm text-gray-500">
          Choose how often potential tenants can book appointments for property
          tours assigned to you.
        </p>
        <select v-model="state.duration"
          class="w-full p-2 py-4 outline-none border-[0.5px] text-sm rounded-lg bg-gray-50">
          <option value="1 week">1 week</option>
          <option value="2 weeks">2 weeks</option>
          <option value="3 weeks">3 weeks</option>
          <option value="4 weeks">4 weeks</option>
        </select>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end space-x-4 w-full mt-10">
      <button @click="emit('close')" class="px-4 text-sm py-4 text-gray-700 bg-gray-100 w-full rounded-lg">
        Cancel
      </button>
      <button @click="saveSchedule" :disabled="processing"
        class="px-4 py-4 text-sm disabled:cursor-not-allowed disabled:opacity-25 bg-gray-900 text-white rounded-lg w-full hover:bg-gray-800">
        {{ processing ? 'processing...' : 'Set availability' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>