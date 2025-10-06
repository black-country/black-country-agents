<!-- pages/owners/index.vue -->
<template>
  <div class="min-h-screen">

    <div class="flex">
      <!-- Main Content -->
      <main class="flex-1 p-6">
        <div class="max-w-7xl mx-auto">
          <!-- Page Header -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 class="text-2xl font-semibold text-gray-900">Property Owners</h1>
            <div class="mt-4 sm:mt-0 flex space-x-3">
              <button
                @click="showFilterDrawer = true"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter By
              </button>
              <button
                @click="showCreateModal = true"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Owner
              </button>
            </div>
          </div>

          <!-- Tabs -->
          <div class="border-b border-gray-200 mb-6">
            <nav class="-mb-px flex space-x-8">
              <button
                :class="[
                  activeTab === 'active' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
                ]"
                @click="activeTab = 'active'"
              >
                Active
              </button>
              <button
                :class="[
                  activeTab === 'pending' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center'
                ]"
                @click="activeTab = 'pending'"
              >
                Pending Approval
                <span class="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {{ pendingCount }}
                </span>
              </button>
            </nav>
          </div>

          <!-- Applied Filters -->
          <div v-if="hasActiveFilters" class="flex flex-wrap items-center gap-2 mb-4">
            <div v-if="selectedUserType" class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {{ selectedUserType }}
              <button @click="selectedUserType = null" class="ml-1 text-blue-600 hover:text-blue-800">
                <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div v-if="selectedDateRange" class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ selectedDateRange }}
              <button @click="selectedDateRange = null" class="ml-1 text-blue-600 hover:text-blue-800">
                <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Owners Table -->
          <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left">
                      <input type="checkbox" class="custom-checkbox" />
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Type</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="owner in filteredOwners" :key="owner.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4">
                      <input type="checkbox" class="custom-checkbox" />
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <img :src="owner.avatar" :alt="owner.name" class="h-8 w-8 rounded-full mr-3" />
                        <span class="text-sm font-medium text-gray-900">{{ owner.name }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ owner.email }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ owner.phone }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="[
                        owner.userType === 'Individual' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800',
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
                      ]">
                        <svg v-if="owner.userType === 'Individual'" class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <svg v-else class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {{ owner.userType }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ owner.dateAdded }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div class="relative">
                        <button 
                          @click="toggleActionMenu(owner.id)"
                          class="text-gray-400 hover:text-gray-600"
                        >
                          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                        <div v-if="activeActionMenu === owner.id" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                          <div class="py-1">
                            <button @click="viewOwner(owner)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">View</button>
                            <button @click="editOwner(owner)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Edit</button>
                            <button @click="deleteOwner(owner)" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">Delete</button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Pagination -->
            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div class="flex-1 flex justify-between sm:hidden">
                <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    Showing <span class="font-medium">{{ currentPageStart }}</span> to <span class="font-medium">{{ currentPageEnd }}</span> of <span class="font-medium">{{ totalOwners }}</span> owners out {{ totalOwners }} users
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <button
                      v-for="page in visiblePages"
                      :key="page"
                      :class="[
                        page === currentPage
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                        'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                      ]"
                      @click="currentPage = page"
                    >
                      {{ page }}
                    </button>
                    <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </span>
                    <button class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                      10
                    </button>
                    <button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Filter Drawer -->
    <div v-if="showFilterDrawer" class="fixed inset-0 z-50 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 bg-black bg-opacity-50" @click="showFilterDrawer = false"></div>
        <section class="absolute right-0 top-0 h-full w-full max-w-md flex flex-col bg-white shadow-xl">
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Filter By</h2>
            <button @click="showFilterDrawer = false" class="text-gray-400 hover:text-gray-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="flex-1 px-6 py-6 overflow-y-auto">
            <!-- Date Added Filter -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Date Added</label>
              <input
                type="date"
                v-model="dateFilter"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Select Date"
              />
            </div>

            <!-- User Type Filter -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">User Type</label>
              <div class="space-y-2">
                <div class="flex items-center">
                  <input
                    id="business"
                    type="radio"
                    value="Business"
                    v-model="userTypeFilter"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label for="business" class="ml-2 text-sm text-gray-700">Business</label>
                </div>
                <div class="flex items-center">
                  <input
                    id="individual"
                    type="radio"
                    value="Individual"
                    v-model="userTypeFilter"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label for="individual" class="ml-2 text-sm text-gray-700">Individual</label>
                </div>
              </div>
            </div>
          </div>

          <div class="flex space-x-3 px-6 py-4 border-t border-gray-200">
            <button
              @click="resetFilters"
              class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              @click="applyFilters"
              class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Apply Filter
            </button>
          </div>
        </section>
      </div>
    </div>

    <!-- Create Owner Modal -->
    <CreateOwnerModal v-if="showCreateModal" @close="showCreateModal = false" @success="handleOwnerCreated" />
  </div>
</template>

<script setup lang="ts">
interface Owner {
  id: number;
  name: string;
  email: string;
  phone: string;
  userType: 'Individual' | 'Business';
  dateAdded: string;
  avatar: string;
}

const searchQuery = ref('')
const showFilterDrawer = ref(false)
const showCreateModal = ref(false)
const activeTab = ref('active')
const activeActionMenu = ref<number | null>(null)
const currentPage = ref(1)
const selectedUserType = ref<string | null>(null)
const selectedDateRange = ref<string | null>(null)
const dateFilter = ref('')
const userTypeFilter = ref('')

const pendingCount = ref(2)

// Sample data
const owners = ref<Owner[]>([
  {
    id: 1,
    name: 'John Doe',
    email: 'michelle.rivera@example.com',
    phone: '0810 123 4567',
    userType: 'Individual',
    dateAdded: '19 Nov, 23',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    name: 'Jenny Wilson',
    email: 'jackson.graham@example.com',
    phone: '0809 012 3456',
    userType: 'Individual',
    dateAdded: '19 Nov, 23',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b631?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 3,
    name: 'Cody Fisher',
    email: 'michael.mitc@example.com',
    phone: '0813 456 7890',
    userType: 'Individual',
    dateAdded: '19 Nov, 23',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 4,
    name: 'Ronald Richards',
    email: 'alma.lawson@example.com',
    phone: '0807 890 1234',
    userType: 'Business',
    dateAdded: '19 Nov, 23',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f44?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 5,
    name: 'Jane Cooper',
    email: 'jessica.hanson@example.com',
    phone: '0814 567 8901',
    userType: 'Individual',
    dateAdded: '19 Nov, 23',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 6,
    name: 'Esther Howard',
    email: 'dolores.chambers@example.com',
    phone: '0815 678 9012',
    userType: 'Business',
    dateAdded: '19 Nov, 23',
    avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 7,
    name: 'Robert Fox',
    email: 'felicia.reid@example.com',
    phone: '0818 901 2345',
    userType: 'Business',
    dateAdded: '19 Nov, 23',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 8,
    name: 'Cameron Williamson',
    email: 'kenzi.lawson@example.com',
    phone: '0812 345 6789',
    userType: 'Individual',
    dateAdded: '19 Nov, 23',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 9,
    name: 'Savannah Nguyen',
    email: 'bill.sanders@example.com',
    phone: '0805 678 9012',
    userType: 'Individual',
    dateAdded: '19 Nov, 23',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 10,
    name: 'Jerome Bell',
    email: 'willie.jennings@example.com',
    phone: '0704 567 8901',
    userType: 'Business',
    dateAdded: '19 Nov, 23',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 11,
    name: 'Leslie Alexander',
    email: 'nevaeh.simmons@example.com',
    phone: '0816 789 0123',
    userType: 'Individual',
    dateAdded: '19 Nov, 23',
    avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
])

const filteredOwners = computed(() => {
  let filtered = owners.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(owner => 
      owner.name.toLowerCase().includes(query) ||
      owner.email.toLowerCase().includes(query) ||
      owner.phone.includes(query)
    )
  }

  if (selectedUserType.value) {
    filtered = filtered.filter(owner => owner.userType === selectedUserType.value)
  }

  return filtered
})

const totalOwners = computed(() => owners.value.length)
const currentPageStart = computed(() => (currentPage.value - 1) * 10 + 1)
const currentPageEnd = computed(() => Math.min(currentPage.value * 10, totalOwners.value))
const visiblePages = computed(() => [1, 2, 3])

const hasActiveFilters = computed(() => selectedUserType.value || selectedDateRange.value)

const toggleActionMenu = (ownerId: number) => {
  activeActionMenu.value = activeActionMenu.value === ownerId ? null : ownerId
}

const viewOwner = (owner: Owner) => {
  navigateTo(`/owners/${owner.id}`)
  activeActionMenu.value = null
}

const editOwner = (owner: Owner) => {
  // Handle edit logic
  console.log('Edit owner:', owner)
  activeActionMenu.value = null
}

const deleteOwner = (owner: Owner) => {
  // Handle delete logic
  console.log('Delete owner:', owner)
  activeActionMenu.value = null
}

const applyFilters = () => {
  if (userTypeFilter.value) {
    selectedUserType.value = userTypeFilter.value
  }
  if (dateFilter.value) {
    selectedDateRange.value = '19 Nov, 23 - 19 Nov, 23'
  }
  showFilterDrawer.value = false
}

const resetFilters = () => {
  userTypeFilter.value = ''
  dateFilter.value = ''
  selectedUserType.value = null
  selectedDateRange.value = null
  showFilterDrawer.value = false
}

const handleOwnerCreated = (newOwner: Owner) => {
  owners.value.unshift(newOwner)
  showCreateModal.value = false
}

// Close action menu when clicking outside
onMounted(() => {
  document.addEventListener('click', () => {
    activeActionMenu.value = null
  })
})

definePageMeta({
  layout: 'dashboard'
})

</script>