<template>
    <div class="lg:flex space-y-2 items-center justify-between lg:pace-x-4 p-4 bg-white rounded-md">
    <!-- Total Earnings Section -->
    <div class="flex items-center space-x-2">
      <div class="w-10 h-10 bg-green-50 rounded-md flex items-center justify-center">
        <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="0.5" width="44" height="44" rx="4" fill="#EBF0EC" />
          <path
            d="M27.8327 16.666C28.1191 16.7078 28.3974 16.7602 28.666 16.8222C29.1587 16.936 29.405 16.9929 29.7002 17.2284C29.8685 17.3628 30.0787 17.6286 30.1709 17.8241C30.3327 18.1668 30.3327 18.4992 30.3327 19.1639V28.2159C30.3327 29.0435 29.466 29.6119 28.666 29.4272C27.8996 29.2501 27.0543 29.152 26.166 29.152C24.5684 29.152 23.1098 29.4694 21.9993 29.9924C20.8889 30.5154 19.4302 30.8327 17.8327 30.8327C16.9444 30.8327 16.0991 30.7346 15.3327 30.5576C14.84 30.4438 14.5937 30.3869 14.2985 30.1514C14.1301 30.017 13.92 29.7511 13.8278 29.5557C13.666 29.2129 13.666 28.8806 13.666 28.2159V19.1639C13.666 18.3363 14.5327 17.7679 15.3327 17.9526C15.6013 18.0147 15.8796 18.067 16.166 18.1088"
            stroke="#326543" stroke-width="1.5" stroke-linecap="round" />
          <path
            d="M24.0827 23.7493C24.0827 24.8999 23.1499 25.8327 21.9993 25.8327C20.8488 25.8327 19.916 24.8999 19.916 23.7493C19.916 22.5988 20.8488 21.666 21.9993 21.666C23.1499 21.666 24.0827 22.5988 24.0827 23.7493Z"
            stroke="#326543" stroke-width="1.5" />
          <path d="M16.584 24.584V24.5915" stroke="#326543" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
          <path d="M27.416 22.9102V22.9177" stroke="#326543" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
          <path d="M21.9993 14.166V17.4993M18.666 16.666V18.3327M25.3327 14.9993V16.666" stroke="#326543"
            stroke-width="1.5" stroke-linecap="round" />
        </svg>

      </div>
      <div>
        <p v-if="!oadingEarningSum" class="text-2xl font-semibold text-[#1D2739]">{{ formatCurrency(earningSum.amount) ?? '0' }}</p>
        <div v-else
          class="rounded-md h-10 w-10 bg-gray-100 animate-pulse p-4 w-full mx-auto mt-10"
        ></div>
        <p class="text-sm text-[#1D2739]">Total Earnings</p>
      </div>
    </div>

<section class="flex items-center justify-between gap-x-5">
      <!-- Filter Button -->

    <!-- Properties Dropdown -->
    <select v-if="!loadingProperties"  v-model="selectedProperty" class="px-4 py-3 outline-none rounded-md bg-white border-gray-50 text-sm border text-gray-700 cursor-pointer">
      <option>All Properties</option>
      <!-- Additional options can be added here -->
       <!-- <option v-for="(item, idx) in propertiesList" :key="idx">
        {{item.name}}
       </option> -->
       <option v-for="(item, idx) in propertiesList" :key="idx" :value="item.name">
    {{ item.name }}
  </option>
    </select>

    <!-- Search Input -->
    <div class="flex items-center px-4 py-3 bg-white rounded-md space-x-2 border-gray-50 text-sm border">
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.584 15.084L18.334 18.834" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.666 9.66602C16.666 5.52388 13.3082 2.16602 9.16602 2.16602C5.02388 2.16602 1.66602 5.52388 1.66602 9.66602C1.66602 13.8082 5.02388 17.166 9.16602 17.166C13.3082 17.166 16.666 13.8082 16.666 9.66602Z" stroke="#1D2739" stroke-width="1.5" stroke-linejoin="round"/>
</svg>

      <input v-model="searchQuery" type="text" placeholder="Search" class="bg-transparent text-gray-700 focus:outline-none" />
    </div>

    <button class="flex items-center px-6 py-3  text-sm border-gray-50 border rounded-lg space-x-2 text-white bg-[#292929]">
         Withdraw Earnings

    </button>
</section>
  </div>
    <div v-if="!loading && earningsList?.length"  class="p-6 min-h-screen container mx-auto">
      <div class="overflow-x-auto bg-white rounded-md border-[0.5px] border-gray-50">
        <table class="min-w-full text-left">
          <thead>
            <tr class="text-gray-500 text-sm border-b border-gray-50">
              <th class="px-4 py-4 font-medium text-[#1D2739]">Transaction ID</th>
              <th class="px-4 py-4 font-medium text-[#1D2739]">Property name</th>
              <th class="px-4 py-4 font-medium text-[#1D2739]">Tenant name</th>
              <th class="px-4 py-4 font-medium text-[#1D2739]">Date</th>
              <th class="px-4 py-4 font-medium text-[#1D2739]">Commission fee</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(earning, index) in filteredEarnings" :key="index" class="border-b border-gray-50">
              <td class="px-4 py-6 text-[#667185]  text-sm">{{ earning?.transactionId }}</td>
              <td class="px-4 py-6 text-[#667185]  text-sm">{{ earning?.house.name ?? 'Nil' }}</td>
              <td class="px-4 py-6 text-[#667185]  text-sm">{{ `${earning?.rentPayment?.tenant?.firstName} ${earning?.rentPayment?.tenant?.lastName}` }}</td>
              <td class="px-4 py-6 text-[#667185]  text-sm">{{ moment(earning?.rentPayment?.paymentDate).format("MMMM Do YYYY") ?? 'Nil' }}</td>
              <td class="px-4 py-6 text-[#667185]  text-sm">{{ earning?.commissionFee ?? 'Nil' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="!filteredEarnings.length" class="bg-white px-4 py-5 sm:p-6 h-80 rounded-lg flex flex-col gap-y-4 justify-center border items-center border-gray-50">
        <img
        :src="dynamicIcons('payment-empty-state')"
        alt="leases empty state"
        class=""
      />
         <p v class="flex justify-center items-center">No Earnings Available</p>
      </div>
      <CorePagination
          v-if="!loading && filteredEarnings.length > 0"
          :total="metadata.total"
          :page="metadata.page"
          :perPage="metadata.perPage"
          :pages="metadata.pages"
          @page-changed="handlePageChange"
        />
    </div>
    <section v-else-if="loading && !earningsList?.length">
        <div
          class="rounded-md h-16 bg-gray-100 animate-pulse p-4 w-full mx-auto mt-10"
        ></div>
      </section>
      <div
      v-else
      class="bg-white px-4 py-5 sm:p-6 h-80 rounded-lg flex flex-col gap-y-4 justify-center border items-center border-gray-50"
    >
      <img
        :src="dynamicIcons('payment-empty-state')"
        alt="leases empty state"
        class=""
      />
      <p class="text-[#1D2739]">No Earnings available</p>
    </div>
  </template>
  
  <script setup lang="ts">
    import moment from "moment";
  import { ref } from 'vue';
  import { useGetProperties } from "@/composables/modules/property/fetchProperties";
  import { useCurrencyFormatter } from '@/composables/core/useCurrencyFormatter';
  import { useGetEarnings } from '@/composables/modules/earnings/useGetEarnings'
    import { useGetTotalEarnings } from '@/composables/modules/earnings/useGetTotalEarnings'
    const { formatCurrency } = useCurrencyFormatter('en-NG', 'NGN');
  const { getEarnings,
        loading,
        earningsList,
        searchQuery,
        metadata,
        setPaginationObj } = useGetEarnings()
        const { loadingEarningSum, earningSum } = useGetTotalEarnings()

const {
  propertiesList,
  loadingSearch,
  searchResults,
  loadingProperties,
  sortBy,
  clearSearch,
} = useGetProperties();

const selectedProperty = ref<string | null>(null);
  
  // Earnings data array
  interface Earning {
    transactionId: string;
    propertyName: string;
    tenantName: string;
    date: string;
    commissionFee: string;
  }

  const handlePageChange = (val: any) => {
  metadata.value.page = val || 1;
  getEarnings(); // Explicitly call the method to fetch new data
};


//   const filteredEarnings = computed(() => {
//   if (!searchQuery.value) return earningsList.value;
//   return earningsList.value.filter((earning: any) =>
//     earning?.transactionId?.toLowerCase()?.includes(searchQuery.value.toLowerCase()) ||
//     earning?.house?.name?.toLowerCase()?.includes(searchQuery.value.toLowerCase()) ||
//     earning?.rentPayment?.tenant?.firstName?.toLowerCase()?.includes(searchQuery.value.toLowerCase()) ||
//     earning?.rentPayment?.tenant?.lastName?.toLowerCase()?.includes(searchQuery.value.toLowerCase())
//   );
// });

// Computed property for filtering earnings
const filteredEarnings = computed(() => {
  return earningsList.value.filter((earning: any) => {
    const matchesSearch =
      !searchQuery.value ||
      earning?.transactionId?.toLowerCase()?.includes(searchQuery.value.toLowerCase()) ||
      earning?.house?.name?.toLowerCase()?.includes(searchQuery.value.toLowerCase()) ||
      earning?.rentPayment?.tenant?.firstName?.toLowerCase()?.includes(searchQuery.value.toLowerCase()) ||
      earning?.rentPayment?.tenant?.lastName?.toLowerCase()?.includes(searchQuery.value.toLowerCase());

    const matchesProperty = !selectedProperty.value || earning?.house?.name === selectedProperty.value;

    return matchesSearch && matchesProperty;
  });
});
  
  const currentPage = ref(1);
  </script>
  
  <style scoped>
  /* Additional styling for custom adjustments */
  </style>
  