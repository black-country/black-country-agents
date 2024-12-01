<template>
  <div class="w-full h-full min-h-screen bg-white">
    <!-- Calendar Header -->
    <div class="p-4 border-b flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button class="p-2 hover:bg-gray-100 rounded-full">
          <!-- <ChevronLeft class="w-5 h-5" /> -->
           Left
        </button>
        <span class="text-lg font-medium">{{ currentMonth }} {{ currentYear }}</span>
        <button class="p-2 hover:bg-gray-100 rounded-full">
          <!-- <ChevronRight class="w-5 h-5" /> -->
           Right
        </button>
        <button class="px-4 py-2 rounded-lg bg-green-700 text-white ml-4">
          Week
        </button>
      </div>
    </div>

    <!-- Calendar Days Header -->
    <div class="flex border-b relative">
      <div class="w-20 border-r bg-white"></div>
      <div class="flex-1 relative overflow-hidden">
        <div class="flex" ref="daysContainer">
          <button 
            class="p-2 hover:bg-gray-100 absolute left-0 top-1/2 -translate-y-1/2 z-10"
            @click="scrollDays('left')"
          >
            <!-- <ChevronLeft class="w-5 h-5" /> -->
             Left
          </button>
          <button 
            class="p-2 hover:bg-gray-100 absolute right-0 top-1/2 -translate-y-1/2 z-10"
            @click="scrollDays('right')"
          >
            <!-- <ChevronRight class="w-5 h-5" /> -->
             Right
          </button>
          <div 
            v-for="day in visibleDays" 
            :key="day.date"
            class="flex-1 min-w-[120px] p-2 text-center border-r"
          >
            <div class="text-sm text-gray-600">{{ day.name }}</div>
            <div class="text-2xl font-medium">{{ day.date }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Calendar Body -->
    <div class="flex flex-1">
      <!-- Time Column -->
      <div class="w-20 border-r flex-shrink-0">
        <div 
          v-for="hour in hours" 
          :key="hour"
          class="h-20 border-b text-sm text-gray-500 relative"
        >
          <span class="absolute -top-3 right-2">{{ formatHour(hour) }}</span>
        </div>
      </div>

      <!-- Calendar Grid -->
      <div class="flex-1 relative">
        <div class="flex">
          <div 
            v-for="day in visibleDays" 
            :key="day.date"
            class="flex-1 min-w-[120px] border-r relative"
          >
            <!-- Time Slots -->
            <div 
              v-for="hour in hours" 
              :key="hour"
              class="h-20 border-b relative"
            >
              <!-- Events -->
              <template v-for="event in getEventsForDayAndHour(day, hour)" :key="event.id">
                <div
                  class="absolute left-0 right-2 rounded p-2 text-sm bg-green-50 border-l-4 border-green-700"
                  :style="{
                    top: `${calculateEventTop(event)}px`,
                    height: `${calculateEventHeight(event)}px`
                  }"
                >
                  <div class="font-medium">{{ event.time }}</div>
                  <div>{{ event.title }}</div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Day {
  name: string
  date: number
  month: number
  year: number
}

interface Event {
  id: string
  title: string
  time: string
  startHour: number
  startMinute: number
  duration: number // in minutes
  day: number
}

const currentDate = new Date()
const currentMonth = computed(() => {
  return currentDate.toLocaleString('default', { month: 'long' })
})
const currentYear = computed(() => currentDate.getFullYear())

// Generate array of hours for the day (7 AM to 11 PM)
const hours = Array.from({ length: 17 }, (_, i) => i + 7)

// Generate 7 days starting from current date
const generateWeekDays = (startDate: Date): Day[] => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    return {
      name: date.toLocaleString('default', { weekday: 'short' }).toUpperCase(),
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    }
  })
}

const visibleDays = ref(generateWeekDays(currentDate))

// Sample events data
const events = ref<Event[]>([
  {
    id: '1',
    title: 'Jacky Godwin',
    time: '07:00 AM - 08:20 AM',
    startHour: 7,
    startMinute: 0,
    duration: 80,
    day: 21
  },
  {
    id: '2',
    title: 'Lorem ipsum dolor sit amet',
    time: '11:00 AM - 11:20 AM',
    startHour: 11,
    startMinute: 0,
    duration: 20,
    day: 21
  }
])

const formatHour = (hour: number): string => {
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour} ${ampm}`
}

const getEventsForDayAndHour = (day: Day, hour: number) => {
  return events.value.filter(event => 
    event.day === day.date && 
    event.startHour === hour
  )
}

const calculateEventTop = (event: Event): number => {
  return (event.startMinute / 60) * 80 // 80px is the height of hour slot
}

const calculateEventHeight = (event: Event): number => {
  return (event.duration / 60) * 80 // 80px is the height of hour slot
}

// Scroll handling for days
const daysContainer = ref<HTMLElement | null>(null)

const scrollDays = (direction: 'left' | 'right') => {
  if (!daysContainer.value) return
  
  const scrollAmount = direction === 'left' ? -240 : 240
  daysContainer.value.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.calendar-grid {
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
}
</style>