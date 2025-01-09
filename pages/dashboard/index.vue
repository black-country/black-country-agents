<template>
  <main>
    <section class="bg-gray-25">

      <div class="min-h-screen max-w-5xl mx-auto p-4 lg:p-6">
        <h1 class="text-lg font-semibold mb-4">Welcome <span class="text-">{{ `${user?.firstName} ${user?.lastName}` ?? 'Nil' }}</span> 👋</h1>

      
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-6">
          <DashboardStatCard title="Total Earnings" count="0" />
          <DashboardStatCard v-if="!loading" title="Total Visitations" :count="visitations.length" />
          <DashboardStatCard title="Completed" count="0" />
          <DashboardStatCard title="No Show" count="0" />
        </div>

        <div class="rounded-lg mb-4 space-y-3 overflow-hidden w-full">
        <h2 class="text- font-medium mb-2 border-[0.5px] text-[#1D2739] border-gray-50 px-6 bg-white rounded-lg py-4">
            Upcoming Visits
        </h2>
        <div v-if="!visitations?.length" class="flex justify-center items-center py-10 bg-white w-full">
            <DashboardEmptyState icon="icon-calendar" message="No Upcoming event found">
                <template #icon>
                    <img src="@/assets/icons/upcoming-visit-illustration.svg" alt="No upcoming visit" />
                </template>
            </DashboardEmptyState>
        </div>
        <DashboardUpcomingVisits v-else :visits="visitations" />
    </div>

        <!-- <div class="rounded-lg mb-4 space-y-3">
          <h2 class="text- font-medium mb-2 border-[0.5px] text-[#1D2739] border-gray-25 px-6 bg-white rounded-lg py-4">Upcoming Visits
          </h2>
          <div v-if="!visits" class="flex justify-center items-center py-10 bg-white">
            <DashboardEmptyState icon="icon-calendar" message="No Upcoming event found">
              <template #icon>
                <img src="@/assets/icons/upcoming-visit-illustration.svg" alt="" />
              </template>
            </DashboardEmptyState>
          </div>
          <DashboardUpcomingVisits v-else :visits="visits" />
        </div> -->

        <!-- <div class="rounded-lg mb-4 space-y-3">
          <div class="flex justify-between items-center w-full px-6 bg-white rounded-lg py-4 border-[0.5px] border-gray-25">
            <h2 class="text- font-medium text-[#1D2739] mb-2">Recent
              transactions
            </h2>
            <a href="#" class="text-[#D0D5DD] hover:underline">View all</a>
          </div>
          <div class="flex justify-center items-center py-10 bg-white">
            <DashboardEmptyState icon="icon-calendar" message="No recent transactions made">
              <template #icon>
                <img src="@/assets/icons/transactions-illustration.svg" alt="" />
              </template>
            </DashboardEmptyState>
          </div>
        </div> -->

        <div class="rounded-lg mb-4 space-y-3">
          <!-- <div class="flex justify-between items-center w-full px-6 bg-white rounded-lg py-4 border-[0.5px] border-gray-25">
            <h2 class="text- font-medium text-[#1D2739] mb-2">Recent
              transactions
            </h2>
            <a href="#" class="text-[#D0D5DD] hover:underline">View all</a>
          </div> -->
          <DashboardTransactionsList />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import {  useFetchScheduledVisitations } from '@/composables/modules/visitation/useFetchScheduledVisitations'
const { loading, visitations } = useFetchScheduledVisitations()
  import { useUser } from '@/composables/auth/user'
  const { user } = useUser()
definePageMeta({
  layout: "dashboard"
})

</script>
