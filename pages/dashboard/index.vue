<template>
  <main>
    <section class="bg-gray-25">

      <div class="min-h-screen max-w-5xl mx-auto p-4 lg:p-6">
        <h1 class="text-lg font-semibold mb-4">Welcome <span class="text-">{{ `${user?.firstName} ${user?.lastName}` ?? 'Nil' }}</span> 👋</h1>

      
        <div v-if="!loadingEarningSum"  class="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-6">
          <DashboardStatCard title="Total Earnings" :count="formatCurrency(earningSum?.amount)" />
          <DashboardStatCard v-if="!loading" title="Total Visitations" :count="visitations.length" />
          <DashboardStatCard title="Completed" :count="completedVisitations.length" />
          <DashboardStatCard title="No Show" :count="noShowVisitations.length" />
        </div>
        <section v-else>
      <div class="rounded-md p-4 w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="h-44 w-full bg-slate-200 rounded col-span-1"></div>
        </div>
      </div>
    </section>

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
          <DashboardTransactionsList />
        </div> -->
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
  import { useCurrencyFormatter } from '@/composables/core/useCurrencyFormatter';
import { useGetTotalEarnings } from '@/composables/modules/earnings/useGetTotalEarnings'
import {  useFetchScheduledVisitations } from '@/composables/modules/visitation/useFetchScheduledVisitations'
const { loading, visitations } = useFetchScheduledVisitations()
  import { useUser } from '@/composables/auth/user'
  const { loadingEarningSum, earningSum } = useGetTotalEarnings()
  const { formatCurrency } = useCurrencyFormatter('en-NG', 'NGN');
  const { user } = useUser()
definePageMeta({
  layout: "dashboard"
})



const safeVisitations = computed(() => Array.isArray(visitations.value) ? visitations.value : []);

// Filter visitations by status
const completedVisitations = computed(() => safeVisitations.value.filter(v => v.status === 'completed'));
const noShowVisitations = computed(() => safeVisitations.value.filter(v => v.status === 'no_show'));
const upcomingVisitations = computed(() => safeVisitations.value.filter(v => v.status === 'scheduled'));


</script>


<!-- <template>
  <main>
    <section class="bg-gray-25">
      <div class="min-h-screen max-w-5xl mx-auto p-4 lg:p-6">
        <h1 class="text-lg font-semibold mb-4">Welcome <span class="text-">{{ `${user?.firstName} ${user?.lastName}` ?? 'Nil' }}</span> 👋</h1>

        <div v-if="!loadingEarningSum" class="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-6">
          <DashboardStatCard title="Total Earnings" :count="formatCurrency(earningSum?.amount)" />
          <DashboardStatCard v-if="!loading" title="Total Visitations" :count="visitations.length" />
          <DashboardStatCard title="Completed" :count="completedVisitations.length" />
          <DashboardStatCard title="No Show" :count="noShowVisitations.length" />
        </div>
        <section v-else>
          <div class="rounded-md p-4 w-full mx-auto">
            <div class="animate-pulse flex space-x-4">
              <div class="h-44 w-full bg-slate-200 rounded col-span-1"></div>
            </div>
          </div>
        </section>

        <div class="rounded-lg mb-4 space-y-3 overflow-hidden w-full">
          <h2 class="text- font-medium mb-2 border-[0.5px] text-[#1D2739] border-gray-50 px-6 bg-white rounded-lg py-4">
            Upcoming Visits
          </h2>
          <div v-if="!upcomingVisitations.length" class="flex justify-center items-center py-10 bg-white w-full">
            <DashboardEmptyState icon="icon-calendar" message="No Upcoming event found">
              <template #icon>
                <img src="@/assets/icons/upcoming-visit-illustration.svg" alt="No upcoming visit" />
              </template>
            </DashboardEmptyState>
          </div>
          <DashboardUpcomingVisits v-else :visits="upcomingVisitations" />
        </div>

        <div class="rounded-lg mb-4 space-y-3">
          <DashboardTransactionsList />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useCurrencyFormatter } from '@/composables/core/useCurrencyFormatter';
import { useGetTotalEarnings } from '@/composables/modules/earnings/useGetTotalEarnings';
import { useFetchScheduledVisitations } from '@/composables/modules/visitation/useFetchScheduledVisitations';
import { useUser } from '@/composables/auth/user';
import { computed } from 'vue';

const { loading, visitations } = useFetchScheduledVisitations();
const { loadingEarningSum, earningSum } = useGetTotalEarnings();
const { formatCurrency } = useCurrencyFormatter('en-NG', 'NGN');
const { user } = useUser();

// Ensure visitations is always an array
const safeVisitations = computed(() => Array.isArray(visitations) ? visitations : []);

// Filter visitations by status
const completedVisitations = computed(() => safeVisitations.value.filter(v => v.status === 'Completed'));
const noShowVisitations = computed(() => safeVisitations.value.filter(v => v.status === 'No Show'));
const upcomingVisitations = computed(() => safeVisitations.value.filter(v => v.status === 'Upcoming'));

definePageMeta({
  layout: "dashboard"
});
</script> -->