<template>
  <div class="bg-white rounded-lg shadow">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold text-[#0C111D]">Application</h1>
        <button class="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter By
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left">
              <input type="checkbox" class="custom-checkbox" />
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Applied</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="application in applications" :key="application.id" class="hover:bg-gray-50 cursor-pointer" @click="navigateToDetails(application.id)">
            <td class="px-6 py-4" @click.stop>
              <input type="checkbox" class="custom-checkbox" />
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <img :src="application.applicant.avatar" :alt="application.applicant.name" class="w-10 h-10 rounded-full mr-3" />
                <span class="text-sm font-medium text-[#0C111D]">{{ application.applicant.name }}</span>
              </div>
            </td>
            <td class="px-6 py-4">
              <span class="text-sm text-[#0C111D]">{{ application.property.name }}</span>
            </td>
            <td class="px-6 py-4">
              <StatusBadge :status="application.status" />
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <span class="mr-2">{{ application.location.flag }}</span>
                <span class="text-sm text-[#0C111D]">{{ application.location.country }}</span>
              </div>
            </td>
            <td class="px-6 py-4">
              <span class="text-sm text-[#0C111D]">{{ application.dateApplied }}</span>
            </td>
            <td class="px-6 py-4" @click.stop>
              <ActionsDropdown :application="application" @delete="handleDelete" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-if="applications.length === 0" class="text-center py-12">
      <div class="mx-auto w-24 h-24 mb-4">
        <img src="@/assets/icons/applications-empty-state.svg" alt="No applications" class="w-full h-full" />
      </div>
      <h3 class="text-lg font-medium text-[#0C111D] mb-2">No Applications Yet</h3>
      <p class="text-gray-500">Check back later</p>
    </div>

    <!-- Pagination -->
    <div v-if="applications.length > 0" class="px-6 py-4 border-t border-gray-200">
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-700">Showing 10 owners out 250 users</span>
        <div class="flex items-center space-x-2">
          <button class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">&lt;</button>
          <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
          <button class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">2</button>
          <button class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">3</button>
          <span class="px-2 text-sm text-gray-500">...</span>
          <button class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">8</button>
          <button class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">9</button>
          <button class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">10</button>
          <button class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">&gt;</button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal 
      :show="showDeleteModal" 
      @confirm="confirmDelete" 
      @cancel="cancelDelete" 
    />
  </div>
</template>

<script setup lang="ts">
const { applications, deleteApplication } = useApplications()
const router = useRouter()

const showDeleteModal = ref(false)
const applicationToDelete = ref<string | null>(null)

const navigateToDetails = (id: string) => {
  router.push(`/applications/${id}`)
}

const handleDelete = (applicationId: string) => {
  applicationToDelete.value = applicationId
  showDeleteModal.value = true
}

const confirmDelete = () => {
  if (applicationToDelete.value) {
    deleteApplication(applicationToDelete.value)
    applicationToDelete.value = null
  }
  showDeleteModal.value = false
}

const cancelDelete = () => {
  applicationToDelete.value = null
  showDeleteModal.value = false
}
</script>
