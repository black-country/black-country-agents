<template>
  <div class="p-6 min-h-screen container mx-auto">
    <div class="lg:flex flex-wrap items-center justify-between space-y-6 lg:space-y-0 space-x-4 mb-6">
      <div class="lg:space-x-4 space-y-4 lg:space-y-0">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          class="w-full lg:w-auto"
          @click="selectedTab = tab"
          :class="[
            'px-16 py-3 text-sm rounded-md font-medium transition-colors duration-200',
            selectedTab === tab
              ? 'bg-[#5B8469] text-white'
              : 'bg-[#F0F2F5] text-[#1A1A1A]',
          ]">
          {{ tab }}
        </button>
      </div>
      <div>
        <button
          @click="showBookingCalender = true"
          class="lg:ml-auto w-full lg:w-auto px-4 py-3 bg-[#292929] text-white text-sm rounded-md">
          Set availability
        </button>
      </div>
    </div>
    
    <CoreFullScreenLoader :visible="loadingProperties" text="Fetching Properties" logo="" />

    <div v-if="!loadingProperties && !propertiesList.length"
      class="flex flex-col items-center justify-center bg-white border-gray-100 rounded-md py-20 border-[0.5px]">
      <div class="relative mb-4">
        <img src="@/assets/icons/listing-illustration.svg" alt="" />
      </div>
      <p class="text-[#1D2739]">No property has been assigned to you yet</p>
    </div>

    <section v-if="!loadingProperties && propertiesList.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ListingsHouseCard
        v-for="(property, index) in propertiesList"
        :key="index"
        :property="property"
      />
    </section>
  </div>

  <CoreModalWithoutCloseBtn
       :isOpen="showBookingCalender"
      @close="showBookingCalender = false"
    >
      <ListingsBookingCalender />
    </CoreModalWithoutCloseBtn>
</template>

<script setup lang="ts">
import { useGetProperties } from "@/composables/modules/property/fetchProperties";
import { ref } from "vue";
const { propertiesList, loadingProperties, searchQuery, filteredVisitations } = useGetProperties();

// Tabs data
const tabs = ref(["All", "Mainland", "Ireland"]);
const selectedTab = ref(tabs.value[0]);

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const showBookingCalender = ref(false)
</script>
