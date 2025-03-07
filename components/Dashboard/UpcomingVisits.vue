<template>
  <div class="rounded-md relative h-full">
    <table class="min-w-full text-left border-separate border-spacing-y-2 pb-72">
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
        <tr v-for="(visit, index) in visits" :key="index" class="rounded-md relative">
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
          <td class="px-4 py-3.5 text-[#1D2739] font-medium gap-x-2 text-sm flex items-center space-x-2 relative">
            {{ visit.status === "no_show" ? "No show" : visit.status }}
            <div class="relative inline-block">
              <button @click="toggleInfo(index, $event)"
                class="text-gray-400 hover:text-gray-600 inline-flex items-center" ref="infoButtons">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </button>

              <!-- Info Modal -->
              <Transition enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-150 ease-in" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <div v-if="openInfo === index" ref="infoModals"
                  class="absolute z-50 right-0 w-72 bg-[#E4E7EC] rounded-lg shadow-lg border border-gray-200">
                  <div class="">
                    <h3 class="text-sm font-semibold mb-2 px-4 pt-4">Status Information</h3>
                    <p class="text-xs text-[#344054] mb-3 px-4 text-wrap">
                      Here are the different types of visitation statuses and what they mean.
                    </p>
                    <div class="space-y-3">
                      <div class="border-b-[0.5px] border-gray-400 pb-4 px-4">
                        <h4 class="text-sm font-medium">Scheduled</h4>
                        <p class="text-xs text-[#344054] text-wrap">The visitation is planned and awaiting tour of the available
                          rooms in the property.</p>
                      </div>
                      <div class="border-b-[0.5px] border-gray-400 pb-4 px-4">
                        <h4 class="text-sm font-medium">Completed</h4>
                        <p class="text-xs text-[#344054] text-wrap">The visitation has been completed successfully.</p>
                      </div>
                      <div class="px-4 pb-4">
                        <h4 class="text-sm font-medium">No Show</h4>
                        <p class="text-xs text-[#344054] text-wrap">The tenant did not show up for the scheduled visitation.</p>
                      </div>
                    </div>
                    <div class="border-t-[0.5px] flex justify-center-items-center border-gray-400 py-3">
                      <button @click="closeInfo" class="mt-3 text-sm w-full text-center text-[#1D2739]">
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
              <button :disabled="visit?.status === 'no_show' || visit.status === 'completed'"
                :class="visit?.status === 'no_show' || visit.status === 'completed' ? 'cursor-not-allowed' : ''"
                @click="toggleDropdown(index, $event)" class="text-gray-400 hover:text-gray-600" ref="dropdownButtons">
                <img src="@/assets/icons/arrow-down.svg" alt="Update status" />
              </button>

              <!-- Status Update Dropdown -->
              <Transition enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-150 ease-in" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <div v-if="openDropdown === index" ref="dropdownModals"
                  class="absolute z-50 right-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div class="py-2">
                    <div v-for="status in ['scheduled', 'completed', 'no_show']" :key="status"
                      @click="handleStatusUpdate(status, visit)" class="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                      <label class="flex items-center justify-between w-full cursor-pointer">
                        <div class="flex items-center gap-x-2">
                          <span class="text-sm font-medium capitalize">
                            {{ status === 'no_show' ? 'No Show' : status }}
                          </span>
                        </div>
                        <input type="radio" :name="`status-${index}`" :value="status" :checked="visit.status === status"
                          class="h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          @change="handleStatusUpdate(status, visit)" />
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

    <!-- Overlay -->
    <div v-if="openInfo !== null || openDropdown !== null" class="fixed inset-0 bg-black bg-opacity-25 z-40"
      @click="closeAllModals"></div>
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
// const createPopperInstance = (button: HTMLElement, tooltip: HTMLElement, placement = 'bottom-start') => {
//   return createPopper(button, tooltip, {
//     placement,
//     modifiers: [
//       {
//         name: 'offset',
//         options: {
//           offset: [0, 8],
//         },
//       },
//       {
//         name: 'preventOverflow',
//         options: {
//           padding: 8,
//           boundary: document.body,
//         },
//       },
//       {
//         name: 'flip',
//         options: {
//           padding: 8,
//           fallbackPlacements: ['top-start', 'bottom-end', 'top-end'],
//         },
//       },
//     ],
//   })
// }

const toggleInfo = async (index: number, event: MouseEvent) => {
  event.stopPropagation()

  if (openInfo.value === index) {
    closeInfo()
  } else {
    openInfo.value = index
    openDropdown.value = null

    // Wait for the modal to be rendered
    await nextTick()

    // // Create or update Popper instance
    // if (infoButtons.value[index] && infoModals.value[index]) {
    //   const instance = createPopperInstance(
    //     infoButtons.value[index],
    //     infoModals.value[index],
    //     'bottom-start'
    //   )
    //   popperInstances.value[index] = instance
    // }
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