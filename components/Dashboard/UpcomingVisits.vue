<template>
  <div class="bg-white rounded-md overflow-x-auto relative">
    <div>
      <table class="min-w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr class="text-[#1D2739] text-sm">
            <th class="px-4 py-3 font-medium">Full name</th>
            <th class="px-4 py-3 font-medium">Property interested in</th>
            <th class="px-4 py-3 font-medium">Date</th>
            <th class="px-4 py-3 font-medium">Time</th>
            <th class="px-4 py-3 font-medium">Status</th>
            <th class="px-4 py-3 font-medium sr-only">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(visit, index) in visits"
            :key="index"
            class="rounded-md relative"
          >
            <td class="px-4 py-6 text-[#667185] text-sm">
              {{
                `${visit.tenant.firstName} ${visit.tenant.lastName}` ?? "Nil"
              }}
            </td>
            <td class="px-4 py-6 text-[#667185] text-sm">
              {{ visit?.house?.name ?? "Nil" }}
            </td>
            <td class="px-4 py-6 text-[#667185] text-sm">
              {{ moment(visit.date).format("MMMM Do YYYY") }}
            </td>
            <td class="px-4 py-6 text-[#667185] text-sm">{{ visit.time }}</td>
            <td
              class="px-4 py-3.5 text-[#1D2739] font-medium gap-x-2 text-sm flex items-center space-x-2"
            >
              {{ visit.status == "no_show" ? "No show" : visit.status }}
              <button @click="toggleInfo(index)" class="text-gray-400 hover:text-gray-600">
                <img src="@/assets/icons/info-icon.svg" alt="Info" />
              </button>
              <div v-if="openInfo === index" class="absolute right-0 mt-2 w-60 bg-white border rounded-md shadow-lg z-50 p-4">
                <h3 class="text-sm font-semibold">Status Information</h3>
                <p class="text-xs text-gray-600">Here are the different types of visitation statuses and what they mean.</p>
                <ul class="mt-2 text-xs text-gray-700">
                  <li><strong>Scheduled:</strong> The visitation is planned and awaiting a tour.</li>
                  <li><strong>Completed:</strong> The visitation has been completed.</li>
                  <li><strong>No Show:</strong> The tenant did not show up.</li>
                </ul>
                <button class="mt-2 text-blue-500 text-xs" @click="closeInfo">Close</button>
              </div>
            </td>
            <td class="px-4 py-3.5 text-[#667185]  text-sm relative">
              <button
                id="expand"
                class="text-gray-400 hover:text-gray-600"
                @click="toggleDropdown(index)"
              >
                <img src="@/assets/icons/arrow-down.svg" alt="Expand" />
              </button>
              <div
                v-if="openDropdown === index"
                class="absolute right-0 mt-2 w-60 bg-white border rounded-md shadow-lg z-50"
              >
                <ul class="py-2 text-sm text-gray-700 divide divide-y">
                  <li @click.prevent="handleDropdownClick('scheduled', visit)"
                    class="px-4 py-3 text-[#1D2739] font-medium w-full cursor-pointer justify-between flex items-center gap-x-3"
                  >
                    <div class="flex items-center gap-x-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.08398 10.2027C2.08398 6.57162 2.08398 4.75607 3.12742 3.62803C4.17085 2.5 5.85023 2.5 9.20898 2.5H10.7923C14.1511 2.5 15.8305 2.5 16.8739 3.62803C17.9173 4.75607 17.9173 6.57162 17.9173 10.2027V10.6307C17.9173 14.2618 17.9173 16.0773 16.8739 17.2053C15.8305 18.3333 14.1511 18.3333 10.7923 18.3333H9.20898C5.85023 18.3333 4.17085 18.3333 3.12742 17.2053C2.08398 16.0773 2.08398 14.2618 2.08398 10.6307V10.2027Z"
                          stroke="#5B8469"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2.5 6.66602H17.5"
                          stroke="#5B8469"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2.91602 6.66602H17.0827"
                          stroke="#5B8469"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9.9956 10.834H10.0031M9.9956 14.1673H10.0031M13.3252 10.834H13.3327M6.66602 10.834H6.67349M6.66602 14.1673H6.67349"
                          stroke="#5B8469"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M15 1.66602V3.33268M5 1.66602V3.33268"
                          stroke="#5B8469"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>

                      <span> Scheduled</span>

                      <div class="flex justify-end items-end">
                        <input type="checkbox" class="h-4 w-4 rounded-full" />
                      </div>
                    </div>
                  </li>
                  <li  @click.prevent="handleDropdownClick('completed', visit)"
                    class="px-4 py-3 text-[#1D2739] font-medium cursor-pointer justify-between flex items-center gap-x-3"
                  >
                    <div class="flex items-center gap-x-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.08398 10.2027C2.08398 6.57162 2.08398 4.75607 3.12742 3.62803C4.17085 2.5 5.85023 2.5 9.20898 2.5H10.7923C14.1511 2.5 15.8305 2.5 16.8739 3.62803C17.9173 4.75607 17.9173 6.57162 17.9173 10.2027V10.6307C17.9173 14.2618 17.9173 16.0773 16.8739 17.2053C15.8305 18.3333 14.1511 18.3333 10.7923 18.3333H9.20898C5.85023 18.3333 4.17085 18.3333 3.12742 17.2053C2.08398 16.0773 2.08398 14.2618 2.08398 10.6307V10.2027Z"
                          stroke="#5B8469"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2.5 6.66602H17.5"
                          stroke="#5B8469"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2.91602 6.66602H17.0827"
                          stroke="#5B8469"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9.9956 10.834H10.0031M9.9956 14.1673H10.0031M13.3252 10.834H13.3327M6.66602 10.834H6.67349M6.66602 14.1673H6.67349"
                          stroke="#5B8469"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M15 1.66602V3.33268M5 1.66602V3.33268"
                          stroke="#5B8469"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>

                      <span>Completed</span>
                    </div>
                    <div>
                      <input type="checkbox" class="h-4 w-4 rounded-full" />
                    </div>
                  </li>
                  <li @click.prevent="handleDropdownClick('no_show', visit)"
                    class="px-4 py-3 text-[#1D2739] font-medium  justify-between cursor-pointer flex items-center gap-x-3"
                  >
                    <div class="flex items-center gap-x-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.4974 10.416C17.4974 10.416 17.4993 10.0249 17.4993 9.58268C17.4993 5.85073 17.4993 3.98476 16.34 2.82538C15.1806 1.66602 13.3146 1.66602 9.58268 1.66602C5.85073 1.66602 3.98476 1.66602 2.82538 2.82538C1.66602 3.98476 1.66602 5.85073 1.66602 9.58268C1.66602 13.3146 1.66602 15.1806 2.82538 16.34C3.98476 17.4993 5.85073 17.4993 9.58268 17.4993C10.0249 17.4993 10.416 17.4974 10.416 17.4974"
                          stroke="#5B8469"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M1.66602 5.83398H17.4993"
                          stroke="#5B8469"
                          stroke-width="1.5"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.33333 13.3333H9.58333M5 13.3333H5.83333M8.33333 10H13.3333M5 10H5.83333"
                          stroke="#5B8469"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M13.334 13.334L15.834 15.834M15.834 15.834L18.334 18.334M15.834 15.834L13.334 18.334M15.834 15.834L18.334 13.334"
                          stroke="#5B8469"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>

                      <span>No Show</span>
                    </div>

                    <div>
                      <input type="checkbox" class="h-4 w-4 rounded-full" />
                    </div>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="openDropdown !== null"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="closeDropdown"
    ></div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import {  useUpdateScheduledVisitationStatus } from '@/composables/modules/visitation/useUpdateScheduledVisitationStatus'
const { updateVisitationStatus, updating } = useUpdateScheduledVisitationStatus()
import { PropType, ref } from "vue";

interface Visit {
  tenant: {
    firstName: string;
    lastName: string;
  };
  house?: {
    name: string;
  };
  date: string;
  time: string;
  status: string;
}

const props = defineProps({
  visits: {
    type: Array as PropType<Visit[]>,
    required: true,
  },
});

const openInfo = ref(null);

const openDropdown = ref<number | null>(null);

const toggleDropdown = (index: number) => {
  openDropdown.value = openDropdown.value === index ? null : index;
};

const closeDropdown = () => {
  openDropdown.value = null;
};


// Function to handle dropdown option click
const handleDropdownClick = async (action: any, item: any) => {

const payload = {
  status: action
}

const toggleInfo = (index) => {
  openInfo.value = openInfo.value === index ? null : index;
};

const closeInfo = () => {
  openInfo.value = null;
};


await updateVisitationStatus(item.id, payload)
// if (action === "view") {
//   return router.push(`/dashboard/tenant-mgt/${item.id}`);
// }

// if (action === "message") {
//   return router.push(`/dashboard/tenant-mgt/${item.id}`);
// }
closeDropdown();
};
</script>

<style>
@media (max-width: 640px) {
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
