<template>
  <div class="w-full h-full min-h-screen bg-white">
    <!-- Calendar Header -->
    <!-- {{ visitations }} -->
    <div class="p-4 border-b flex items-center justify-between">
      <div
        class="flex items-center space-x-0.5  w-full justify-between"
      >
      <div class="flex items-center space-x-0.5">
        <button
          class="py-3 px-4 rounded-l-lg hover:bg-gray-100 bg-[#F2F4F7]"
          @click="changeWeek(-1)"
        >
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 5.5C12.5 5.5 7.50001 9.18242 7.5 10.5C7.49999 11.8177 12.5 15.5 12.5 15.5"
              stroke="#1D2739"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <span class="text-lg font-medium bg-[#F2F4F7] py-3 px-6 text-sm"
          >{{ currentMonth }} {{ currentYear }}</span
        >
        <button
          class="py-4 rounded-r-lg px-4 hover:bg-gray-100 bg-[#F2F4F7]"
          @click="changeWeek(1)"
        >
          <svg
            width="8"
            height="13"
            viewBox="0 0 8 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.50004 1.5C1.50004 1.5 6.5 5.18242 6.5 6.5C6.5 7.81767 1.5 11.5 1.5 11.5"
              stroke="#1D2739"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
        <div>
          <button class="px-6 py-3 rounded-lg bg-[#5B8469] text-white ml-4">
            Week
          </button>
        </div>
      </div>
    </div>

    <!-- Calendar Days Header -->
    <div class="flex border-b">
      <div class="w-20 border-r bg-white"></div>
      <div class="flex-1 grid grid-cols-7">
        <div
          v-for="day in visibleDays"
          :key="day.fullDate"
          class="p-2 text-center border-r"
        >
          <div class="text-sm text-gray-600">{{ day.name }}</div>
          <div class="text-2xl font-medium">{{ day.date }}</div>
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
      <div class="flex-1 grid grid-cols-7">
        <div
          v-for="day in visibleDays"
          :key="day.fullDate"
          class="border-r relative"
          :class="{ 'bg-blue-50': hasEventsOnDay(day) }"
          @mouseover="showDayTooltip(day, $event)"
          @mouseleave="hideTooltip"
        >
          <div v-for="hour in hours" :key="hour" class="h-20 border-b relative">
            <template
              v-for="event in getEventsForDayAndHour(day, hour)"
              :key="event.id"
            >
              <div
                class="absolute left-0 right-2 rounded p-2 text-sm cursor-pointer"
                :class="getEventClass(event.status)"
                :style="{
                  top: `${calculateEventTop(event)}px`,
                  height: `${calculateEventHeight(event)}px`,
                }"
                @mouseover.stop="showEventTooltip(event, $event)"
                @mouseleave.stop="hideTooltip"
              >
                <div class="font-medium">{{ formatEventTime(event) }}</div>
                <div class="">
                   <!-- <p class="text-sm"> {{ event.note }}</p> -->
                   <p class="text-sm"> {{ `${event.tenant.firstName} ${event.tenant.lastName}` }}</p>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Tooltip -->
    <div
      v-if="activeTooltip"
      class="fixed bg-white shadow-lg rounded-lg p-3 z-50 max-w-xs"
      :style="tooltipStyle"
    >
      <template v-if="activeTooltip.type === 'event'">
        <p class="font-medium">
          {{ activeTooltip.data.note || "No note provided" }}
        </p>
        <p class="text-sm text-gray-600 mt-1">
          Status: {{ activeTooltip.data.status }}
        </p>
      </template>
      <template v-else>
        <p class="font-medium">
          {{ getEventCountForDay(activeTooltip.data) }} events on this day
        </p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Day {
  name: string;
  date: number;
  month: number;
  year: number;
  fullDate: Date;
}

interface Tenant {
  firstName: string;
  lastName: string;
}

interface Event {
  id: string;
  date: string;
  time: string;
  note: string;
  status: string;
  tenant: Tenant;
}

interface Tooltip {
  type: "event" | "day";
  data: Event | Day;
}

const props = defineProps({
  visitations: {
    type: Array,
    default: () => [],
  },
});

// const events = ref<Event[]>([
//   {
//     id: "1",
//     date: "2025-02-07T09:00:00.000Z",
//     time: "09:00 AM",
//     note: "First viewing of the day",
//     status: "scheduled",
//     tenant: {
//       firstName: "John",
//       lastName: "Doe"
//     }
//   },
//   {
//     id: "2",
//     date: "2025-02-07T14:30:00.000Z",
//     time: "02:30 PM",
//     note: "Second viewing",
//     status: "completed",
//     tenant: {
//       firstName: "Jane",
//       lastName: "Smith"
//     }
//   },
//   {
//     id: "3",
//     date: "2025-02-08T11:00:00.000Z",
//     time: "11:00 AM",
//     note: "Missed appointment",
//     status: "no_show",
//     tenant: {
//       firstName: "Mike",
//       lastName: "Johnson"
//     }
//   }
// ])

const currentDate = ref(new Date("2025-02-07"));
const activeTooltip = ref<Tooltip | null>(null);
const tooltipStyle = ref({
  top: "0px",
  left: "0px",
});

const currentMonth = computed(() => {
  return currentDate.value.toLocaleString("default", { month: "long" });
});

const currentYear = computed(() => currentDate.value.getFullYear());

const hours = Array.from({ length: 17 }, (_, i) => i + 7);

const hasEventsOnDay = (day: Day): boolean => {
  return props.visitations.some((event) =>
    isSameDay(new Date(event.date), day.fullDate)
  );
};

const getEventCountForDay = (day: Day): number => {
  return props.visitations.filter((event) =>
    isSameDay(new Date(event.date), day.fullDate)
  ).length;
};

const generateWeekDays = (startDate: Date): Day[] => {
  const startOfWeek = new Date(startDate);
  startOfWeek.setDate(startDate.getDate() - startDate.getDay());

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + i);
    return {
      name: date.toLocaleString("default", { weekday: "short" }).toUpperCase(),
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      fullDate: new Date(date),
    };
  });
};

const visibleDays = ref(generateWeekDays(currentDate.value));

const changeWeek = (direction: number) => {
  const newDate = new Date(currentDate.value);
  newDate.setDate(newDate.getDate() + direction * 7);
  currentDate.value = newDate;
  visibleDays.value = generateWeekDays(newDate);
};

const formatHour = (hour: number): string => {
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour} ${ampm}`;
};

const formatEventTime = (event: Event): string => {
  return event.time;
};

const getEventClass = (status: string): string => {
  const baseClasses = "border-l-4";
  switch (status) {
    case "scheduled":
      return `${baseClasses} bg-blue-50 border-blue-700`;
    case "completed":
      return `${baseClasses} bg-green-50 border-green-700`;
    case "no_show":
      return `${baseClasses} bg-red-50 border-red-700`;
    default:
      return `${baseClasses} bg-gray-50 border-gray-700`;
  }
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const getEventsForDayAndHour = (day: Day, hour: number) => {
  return props.visitations.filter((event) => {
    const eventDate = new Date(event.date);
    return isSameDay(eventDate, day.fullDate) && eventDate.getHours() === hour;
  });
};

const calculateEventTop = (event: Event): number => {
  const eventDate = new Date(event.date);
  return (eventDate.getMinutes() / 60) * 80;
};

const calculateEventHeight = (_event: Event): number => {
  return 60;
};

const showEventTooltip = (event: Event, e: MouseEvent) => {
  activeTooltip.value = {
    type: "event",
    data: event,
  };
  updateTooltipPosition(e);
};

const showDayTooltip = (day: Day, e: MouseEvent) => {
  if (hasEventsOnDay(day)) {
    activeTooltip.value = {
      type: "day",
      data: day,
    };
    updateTooltipPosition(e);
  }
};

const updateTooltipPosition = (e: MouseEvent) => {
  tooltipStyle.value = {
    top: `${e.clientY + 10}px`,
    left: `${e.clientX + 10}px`,
  };
};

const hideTooltip = () => {
  activeTooltip.value = null;
};
</script>

<style scoped>
.calendar-grid {
  height: calc(100vh - 120px);
}
</style>
