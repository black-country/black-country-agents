<template>
    <div class="border rounded-lg border-gray-50 white">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-b-[0.5px] border-gray-100 pb-`">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold text-gray-900">Availability</h1>
        <!-- <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title, email and role.</p> -->
      </div>
    </div>
  </div>
  <div class="mt-8 flow-root overflow-hidden">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <table class="w-full text-left">
        <thead class="bg-white">
          <tr>
            <th scope="col" class="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
              Day
            </th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Time(s)</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Start Date</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">End Date</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell">Frequency</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Edit</th>
            <th scope="col" class="relative py-3.5 pl-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in availability" :key="idx">
            <td class="relative py-4 pr-3 text-sm font-medium text-gray-900">
              {{ dayMapFunction(item.dayOfWeek) }}
            </td>
            <td class="px-3 py-4 text-sm text-gray-500 sm:table-cell">
              <div v-for="(schedule, index) in item?.intervals" :key="index" class="schedule-block">
              <h2 class="font-medium">{{ schedule.start }} - {{ schedule.end }}</h2>
              <!-- <ul>
                <li v-for="(time, i) in schedule.times" :key="i">
                  {{ time }}
                </li>
              </ul> -->
            </div>
              <!-- {{item?.intervals}} -->
              <!-- {{item?.intervals[0]?.end}} -->
              <!-- <p v-for="(itm, index) in item?.intervals" :key="index">{{ itm }}</p> -->
            </td>
            <td class="px-3 py-4 text-sm text-gray-500">{{ moment(item?.startDate).format("MMMM Do YYYY") }}</td>
            <td class="px-3 py-4 text-sm text-gray-500">{{ moment(item?.endDate).format("MMMM Do YYYY") }}</td>
            <td class="px-3 py-4 text-sm text-gray-500 md:table-cell">{{ item?.duration }}</td>
            <td class="relative py-4 pl-3 text-right text-sm font-medium">
              <svg class="cursor-pointer" @click="handleEdit(item)" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#5B8469" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon><line x1="3" y1="22" x2="21" y2="22"></line></svg>
              <!-- <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit<span class="sr-only">, Lindsay Walton</span></a> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<CoreModalWithoutCloseBtn :isOpen="showEditBookingCalendar" @close="showEditBookingCalendar = false">
  <ListingsBookingCalender @close="showEditBookingCalendar = false" :existingAvailability="selectedItem" />
</CoreModalWithoutCloseBtn>
</template>

<script setup lang="ts">
  import moment from "moment";
const props = defineProps({
    availability: {
        type: Array,
        default: () => []
    }
})

const selectedItem = ref(null)

const showEditBookingCalendar = ref(false)

const handleEdit = (item: any) => {
  selectedItem.value = item
  showEditBookingCalendar.value = true

}

const dayMapFunction = (dayCount: string) => {
   const dayMap = {
    0 : 'Sunday',
    1 : 'Monday',
    2 : 'Tuesday',
    3 : 'Wednesday',
    4 : 'Thursday',
    5 : 'Friday',
    6 : 'Saturday'
   }

   if(dayCount){
    return dayMap[dayCount] ?? 'Nil'
   }
}
</script>