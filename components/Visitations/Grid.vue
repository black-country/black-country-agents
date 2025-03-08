<template>
  <div class="p-6 min-h-screen container mx-auto">
    <!-- <div class="overflow-x-auto bg-white pb-20"> -->
      <table class="min-w-full text-left rounded-md border-[0.5px] border-gray-50 overflow-x-auto">
        <thead>
          <tr class="text-gray-500 text-sm border-b border-gray-50">
            <th class="px-4 py-4 font-medium text-[#1D2739]">Full name</th>
            <th class="px-4 py-4 font-medium text-[#1D2739]">Property interested in</th>
            <th class="px-4 py-4 font-medium text-[#1D2739]">Date</th>
            <th class="px-4 py-4 font-medium text-[#1D2739]">Time</th>
            <th class="px-4 py-4 font-medium text-[#1D2739]">Status</th>
            <th class="px-4 py-3 font-medium sr-only">Actions</th>
          </tr>
        </thead> 
        <tbody>
          <tr v-for="(visit, index) in visitations" :key="index" class="border-b border-gray-50">
            <td class="px-4 py-6 text-[#667185]  text-sm"> {{ `${visit.tenant.firstName} ${visit.tenant.lastName}` ??
              'Nil' }}</td>
            <td class="px-4 py-6 text-[#667185]  text-sm">{{ visit?.house?.name ?? 'Nil' }}</td>
            <td class="px-4 py-6 text-[#667185]  text-sm"> {{ moment(visit.date).format("MMMM Do YYYY") }}</td>
            <td class="px-4 py-6 text-[#667185]  text-sm">{{ visit.time }}</td>
            <td class="px-4 py-6 text-[#667185]  text-sm relative capitalize">
              {{ visit.status === 'no_show' ? 'No Show' : visit.status }}
              <button @click="toggleInfoDropdown(index)" class="text-gray-400 hover:text-gray-600">
                <img src="@/assets/icons/info-icon.svg" class="pt-3 pm-3" alt="" />
              </button>
              <div v-if="infoDropdown === index"
                class="absolute top-9 right-14 z-50 mt-2 w-96 bg-[#F0F5FD] p-6 border border-gray-200 rounded-md shadow-lg">
                <div class="absolute -top-2 right-10 transform rotate-45 w-4 h-4 bg-white"></div>

                <h2 class="text-lg font-semibold text-[#1D2739] mb-2">
                  Status Information
                </h2>
                <p class="text-sm mb-4 text-[#344054] ">
                  Here are the different types of visitation statuses and
                  what they mean. Understanding these statuses will help you
                  manage and track all property visitations effectively.
                </p>

                <div class="mb-4">
                  <h3 class="font-medium text-[#1D2739]">Scheduled</h3>
                  <p class="text-sm text-[#344054] ">
                    The visitation is planned and awaiting tour of the
                    available rooms in the property.
                  </p>
                </div>
                <div class="mb-4">
                  <h3 class="font-medium text-[#1D2739]">Completed</h3>
                  <p class="text-sm text-[#344054] ">
                    The visitation is planned and awaiting tour of the
                    available rooms in the property.
                  </p>
                </div>
                <div class="mb-4">
                  <h3 class="font-medium text-[#1D2739]">No show</h3>
                  <p class="text-sm text-[#344054] ">
                    The visitation is planned and awaiting tour of the
                    available rooms in the property.
                  </p>
                </div>

                <button @click="closeInfoDropdown"
                  class="w-full py-2 text-center font-semibold text-sm text-gray-900 rounded-lg ">
                  Close
                </button>
              </div>
            </td>
            <td class="py-4 px-5 relative whitespace-nowrap text-sm text-[#667185]">
              <button @click="toggleDropdown(index)" :disabled="visit?.status==='no_show' || visit.status === 'completed'"
                :class="visit?.status==='no_show' || visit.status === 'completed' ? 'cursor-not-allowed' : ''"
                class="inline-flex items-center text-sm font-medium text-[#667185] hover:text-black">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.99414 10H10.0016" stroke="#1D2739" stroke-width="2.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M9.98633 15H9.99383" stroke="#1D2739" stroke-width="2.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M10 5H10.0075" stroke="#1D2739" stroke-width="2.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>
              <div v-if="activeDropdown === index"
                class="absolute -top-2 right-10 z-50 mt-2 w-60 bg-white border border-gray-200 rounded-md shadow-lg">
                <ul class="py-1 text-sm text-gray-700 divide divide-y-[0.5px]">
                  <li>
                    <a @click.prevent="handleDropdownClick('scheduled', visit)" href="#"
                      class="block flex items-center gap-x-2 px-4 py-3 hover:bg-gray-100 text-start">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M2.08398 10.2027C2.08398 6.57162 2.08398 4.75607 3.12742 3.62803C4.17085 2.5 5.85023 2.5 9.20898 2.5H10.7923C14.1511 2.5 15.8305 2.5 16.8739 3.62803C17.9173 4.75607 17.9173 6.57162 17.9173 10.2027V10.6307C17.9173 14.2618 17.9173 16.0773 16.8739 17.2053C15.8305 18.3333 14.1511 18.3333 10.7923 18.3333H9.20898C5.85023 18.3333 4.17085 18.3333 3.12742 17.2053C2.08398 16.0773 2.08398 14.2618 2.08398 10.6307V10.2027Z"
                          stroke="#5B8469" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2.5 6.66602H17.5" stroke="#5B8469" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round" />
                        <path d="M2.91602 6.66602H17.0827" stroke="#5B8469" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round" />
                        <path
                          d="M9.9956 10.834H10.0031M9.9956 14.1673H10.0031M13.3252 10.834H13.3327M6.66602 10.834H6.67349M6.66602 14.1673H6.67349"
                          stroke="#5B8469" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M15 1.66602V3.33268M5 1.66602V3.33268" stroke="#5B8469" stroke-width="1.5"
                          stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                      Scheduled
                    </a>
                  </li>
                  <li>
                    <a @click.prevent="handleDropdownClick('completed', visit)" href="#"
                      class="block flex items-center gap-x-2 px-4 py-3 text-sm hover:bg-gray-100 text-start">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M2.08398 10.2027C2.08398 6.57162 2.08398 4.75607 3.12742 3.62803C4.17085 2.5 5.85023 2.5 9.20898 2.5H10.7923C14.1511 2.5 15.8305 2.5 16.8739 3.62803C17.9173 4.75607 17.9173 6.57162 17.9173 10.2027V10.6307C17.9173 14.2618 17.9173 16.0773 16.8739 17.2053C15.8305 18.3333 14.1511 18.3333 10.7923 18.3333H9.20898C5.85023 18.3333 4.17085 18.3333 3.12742 17.2053C2.08398 16.0773 2.08398 14.2618 2.08398 10.6307V10.2027Z"
                          stroke="#5B8469" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2.5 6.66602H17.5" stroke="#5B8469" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round" />
                        <path d="M2.91602 6.66602H17.0827" stroke="#5B8469" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round" />
                        <path
                          d="M9.9956 10.834H10.0031M9.9956 14.1673H10.0031M13.3252 10.834H13.3327M6.66602 10.834H6.67349M6.66602 14.1673H6.67349"
                          stroke="#5B8469" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M15 1.66602V3.33268M5 1.66602V3.33268" stroke="#5B8469" stroke-width="1.5"
                          stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                      Completed
                    </a>
                  </li>
                  <li>
                    <a @click.prevent="handleDropdownClick('no_show', visit)" href="#"
                      class="block flex items-center gap-x-2 px-4 py-3 text-sm hover:bg-gray-100 text-start">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M17.4974 10.416C17.4974 10.416 17.4993 10.0249 17.4993 9.58268C17.4993 5.85073 17.4993 3.98476 16.34 2.82538C15.1806 1.66602 13.3146 1.66602 9.58268 1.66602C5.85073 1.66602 3.98476 1.66602 2.82538 2.82538C1.66602 3.98476 1.66602 5.85073 1.66602 9.58268C1.66602 13.3146 1.66602 15.1806 2.82538 16.34C3.98476 17.4993 5.85073 17.4993 9.58268 17.4993C10.0249 17.4993 10.416 17.4974 10.416 17.4974"
                          stroke="#5B8469" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M1.66602 5.83398H17.4993" stroke="#5B8469" stroke-width="1.5"
                          stroke-linejoin="round" />
                        <path d="M8.33333 13.3333H9.58333M5 13.3333H5.83333M8.33333 10H13.3333M5 10H5.83333"
                          stroke="#5B8469" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                          d="M13.334 13.334L15.834 15.834M15.834 15.834L18.334 18.334M15.834 15.834L13.334 18.334M15.834 15.834L18.334 13.334"
                          stroke="#5B8469" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                      No Show
                    </a>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="activeDropdown !== null" @click="closeDropdown" class="fixed inset-0 z-40 bg-black opacity-25"></div>

      <div v-if="infoDropdown !== null" @click="closeInfoDropdown" class="fixed inset-0 z-40 bg-black opacity-50"></div>
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
import { useUpdateScheduledVisitationStatus } from '@/composables/modules/visitation/useUpdateScheduledVisitationStatus'
const { updateVisitationStatus, updating } = useUpdateScheduledVisitationStatus()
import moment from 'moment';
import { ref } from "vue";


interface Visit {
  name: string;
  property: string;
  date: string;
  time: string;
  status: string;
}

const props = defineProps({
  visitations: {
    type: Array as PropType<Visit[]>,
    required: true,
  }
});

const activeDropdown = ref<number | null>(null);
const infoDropdown = ref<number | null>(null);

const closeDropdown = () => {
  activeDropdown.value = null;
};

const closeInfoDropdown = () => {
  infoDropdown.value = null;
};

const handleDropdownClick = async (action: any, item: any) => {
  const payload = {
    status: action
  };
  await updateVisitationStatus(item.id, payload);
  const visitIndex = props.visitations.findIndex(visit => visit.id === item.id);
  if (visitIndex !== -1) {
    props.visitations[visitIndex].status = action;
  }

  closeDropdown();
};


const toggleDropdown = (index: number) => {
  if (activeDropdown.value === index) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = index;
  }
};

const toggleInfoDropdown = (index: number) => {
  if (infoDropdown.value === index) {
    infoDropdown.value = null;
  } else {
    infoDropdown.value = index;
  }
};
</script>