<!-- <template>
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
</style> -->


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
              {{ `${visit.tenant.firstName} ${visit.tenant.lastName}` ?? "Nil" }}
            </td>
            <td class="px-4 py-6 text-[#667185] text-sm">
              {{ visit?.house?.name ?? "Nil" }}
            </td>
            <td class="px-4 py-6 text-[#667185] text-sm">
              {{ moment(visit.date).format("MMMM Do YYYY") }}
            </td>
            <td class="px-4 py-6 text-[#667185] text-sm">{{ visit.time }}</td>
            <td  class="px-4 py-3.5 text-[#1D2739] font-medium gap-x-2 text-sm flex items-center space-x-2 relative">
              {{ visit.status === "no_show" ? "No show" : visit.status }}
              <div class="relative inline-block">
                <button 
                  @click="toggleInfo(index, $event)" 
                  class="text-gray-400 hover:text-gray-600 inline-flex items-center"
                  ref="infoButtons"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                </button>
                
                <!-- Info Modal -->
                <Transition
                  enter-active-class="transition duration-200 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-150 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <div 
                    v-if="openInfo === index"
                    ref="infoModals"
                    class="absolute z-50 right-0 w-72 bg-[#E4E7EC] rounded-lg shadow-lg border border-gray-200"
                  >
                    <div class="">
                      <h3 class="text-sm font-semibold mb-2 px-4 pt-4">Status Information</h3>
                      <p class="text-xs text-[#344054] mb-3 px-4">
                        Here are the different types of visitation statuses and what they mean.
                      </p>
                      <div class="space-y-3">
                        <div class="border-b-[0.5px] border-gray-400 pb-4 px-4">
                          <h4 class="text-sm font-medium">Scheduled</h4>
                          <p class="text-xs text-[#344054]">The visitation is planned and awaiting tour of the available rooms in the property.</p>
                        </div>
                        <div class="border-b-[0.5px] border-gray-400 pb-4 px-4">
                          <h4 class="text-sm font-medium">Completed</h4>
                          <p class="text-xs text-[#344054]">The visitation has been completed successfully.</p>
                        </div>
                        <div class="px-4 pb-4">
                          <h4 class="text-sm font-medium">No Show</h4>
                          <p class="text-xs text-[#344054]">The tenant did not show up for the scheduled visitation.</p>
                        </div>
                      </div>
                     <div class="border-t-[0.5px] flex justify-center-items-center border-gray-400 py-3">
                      <button 
                        @click="closeInfo"
                        class="mt-3 text-sm w-full text-center text-[#1D2739]"
                      >
                        Close
                      </button>
                     </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </td>
            <td class="px-4 py-3.5 text-[#667185] text-sm relative">
              <div class="relative">
                <button
                  @click="toggleDropdown(index, $event)"
                  class="text-gray-400 hover:text-gray-600"
                  ref="dropdownButtons"
                >
                  <img src="@/assets/icons/arrow-down.svg" alt="Update status" />
                </button>

                <!-- Status Update Dropdown -->
                <Transition
                  enter-active-class="transition duration-200 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-150 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <div
                    v-if="openDropdown === index"
                    ref="dropdownModals"
                    class="absolute z-50 right-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200"
                  >
                    <div class="py-2">
                      <div
                        v-for="status in ['scheduled', 'completed', 'no_show']"
                        :key="status"
                        @click="handleStatusUpdate(status, visit)"
                        class="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                      >
                        <label class="flex items-center justify-between w-full cursor-pointer">
                          <div class="flex items-center gap-x-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.08398 10.2027C2.08398 6.57162 2.08398 4.75607 3.12742 3.62803C4.17085 2.5 5.85023 2.5 9.20898 2.5H10.7923C14.1511 2.5 15.8305 2.5 16.8739 3.62803C17.9173 4.75607 17.9173 6.57162 17.9173 10.2027V10.6307C17.9173 14.2618 17.9173 16.0773 16.8739 17.2053C15.8305 18.3333 14.1511 18.3333 10.7923 18.3333H9.20898C5.85023 18.3333 4.17085 18.3333 3.12742 17.2053C2.08398 16.0773 2.08398 14.2618 2.08398 10.6307V10.2027Z" stroke="#5B8469" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.5 6.66602H17.5" stroke="#5B8469" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.91602 6.66602H17.0827" stroke="#5B8469" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.9956 10.834H10.0031M9.9956 14.1673H10.0031M13.3252 10.834H13.3327M6.66602 10.834H6.67349M6.66602 14.1673H6.67349" stroke="#5B8469" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15 1.66602V3.33268M5 1.66602V3.33268" stroke="#5B8469" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                            <!-- <img 
                              :src="`@/assets/icons/${status}-icon.svg`" 
                              :alt="status"
                              class="w-5 h-5"
                            /> -->
                            <span class="text-sm font-medium capitalize">
                              {{ status === 'no_show' ? 'No Show' : status }}
                            </span>
                          </div>
                          <input
                            type="radio"
                            :name="`status-${index}`"
                            :value="status"
                            :checked="visit.status === status"
                            class="h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            @change="handleStatusUpdate(status, visit)"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Overlay -->
    <div
      v-if="openInfo !== null || openDropdown !== null"
      class="fixed inset-0 bg-black bg-opacity-25 z-40"
      @click="closeAllModals"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import moment from 'moment'
import { createPopper } from '@popperjs/core'
import { useUpdateScheduledVisitationStatus } from '@/composables/modules/visitation/useUpdateScheduledVisitationStatus'

interface Visit {
  id: string
  tenant: {
    firstName: string
    lastName: string
  }
  house?: {
    name: string
  }
  date: string
  time: string
  status: string
}

const props = defineProps({
  visits: {
    type: Array as PropType<Visit[]>,
    required: true,
  },
})

const { updateVisitationStatus, updating } = useUpdateScheduledVisitationStatus()

// State
const openInfo = ref<number | null>(null)
const openDropdown = ref<number | null>(null)
const infoButtons = ref<HTMLButtonElement[]>([])
const dropdownButtons = ref<HTMLButtonElement[]>([])
const infoModals = ref<HTMLElement[]>([])
const dropdownModals = ref<HTMLElement[]>([])
const popperInstances = ref<any[]>([])

// Methods
const createPopperInstance = (button: HTMLElement, tooltip: HTMLElement, placement = 'bottom-start') => {
  return createPopper(button, tooltip, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          padding: 8,
          boundary: document.body,
        },
      },
      {
        name: 'flip',
        options: {
          padding: 8,
          fallbackPlacements: ['top-start', 'bottom-end', 'top-end'],
        },
      },
    ],
  })
}

const toggleInfo = async (index: number, event: MouseEvent) => {
  event.stopPropagation()
  
  if (openInfo.value === index) {
    closeInfo()
  } else {
    openInfo.value = index
    openDropdown.value = null
    
    // Wait for the modal to be rendered
    await nextTick()
    
    // Create or update Popper instance
    if (infoButtons.value[index] && infoModals.value[index]) {
      const instance = createPopperInstance(
        infoButtons.value[index],
        infoModals.value[index],
        'bottom-start'
      )
      popperInstances.value[index] = instance
    }
  }
}

const toggleDropdown = async (index: number, event: MouseEvent) => {
  event.stopPropagation()
  
  if (openDropdown.value === index) {
    closeDropdown()
  } else {
    openDropdown.value = index
    openInfo.value = null
    
    // Wait for the modal to be rendered
    await nextTick()
    
    // Create or update Popper instance
    if (dropdownButtons.value[index] && dropdownModals.value[index]) {
      const instance = createPopperInstance(
        dropdownButtons.value[index],
        dropdownModals.value[index],
        'bottom-end'
      )
      popperInstances.value[index + props.visits.length] = instance
    }
  }
}

const closeInfo = () => {
  if (openInfo.value !== null && popperInstances.value[openInfo.value]) {
    popperInstances.value[openInfo.value].destroy()
  }
  openInfo.value = null
}

const closeDropdown = () => {
  if (openDropdown.value !== null && popperInstances.value[openDropdown.value + props.visits.length]) {
    popperInstances.value[openDropdown.value + props.visits.length].destroy()
  }
  openDropdown.value = null
}

const closeAllModals = () => {
  closeInfo()
  closeDropdown()
}

const handleStatusUpdate = async (status: string, visit: Visit) => {
  try {
    await updateVisitationStatus(visit.id, { status })
    closeDropdown()
  } catch (error) {
    console.error('Failed to update status:', error)
  }
}

// Close modals when clicking outside
onMounted(() => {
  document.addEventListener('click', closeAllModals)
})

onUnmounted(() => {
  // Clean up all popper instances
  popperInstances.value.forEach(instance => {
    if (instance) {
      instance.destroy()
    }
  })
  document.removeEventListener('click', closeAllModals)
})

// Update popper positions on scroll
const updatePopperInstances = () => {
  popperInstances.value.forEach(instance => {
    if (instance) {
      instance.update()
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', updatePopperInstances)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updatePopperInstances)
})
</script>

<style>
@media (max-width: 640px) {
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>