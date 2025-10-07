<template>
  <div class="min-h-screen">
      <AppSidebar />
      <AppHeader />
    
    <main class="ml-64">
      <slot />
    </main>

        <!-- Sidebar Overlay -->
    <div v-if="sidebarOpen" @click="toggleSidebar" class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"></div>

    <!-- Side Drawers -->
    <CustomerLocationDrawer v-model:open="showCustomerLocation" />
    <TopOwnersDrawer v-model:open="showTopOwners" />
    <AllActivitiesDrawer v-model:open="showAllActivities" />
    <NotificationsDrawer v-model:open="showNotifications" />
  </div>
</template>

<script setup lang="ts">
const sidebarOpen = ref(false)
const showCustomerLocation = ref(false)
const showTopOwners = ref(false)
const showAllActivities = ref(false)
const showNotifications = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
}

// Provide methods to child components
provide('toggleCustomerLocation', () => { showCustomerLocation.value = true })
provide('toggleTopOwners', () => { showTopOwners.value = true })
provide('toggleAllActivities', () => { showAllActivities.value = true })
// Layout logic if needed
</script>