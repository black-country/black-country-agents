<template>
  <div class="p-6 min-h-screen container mx-auto">
    <div
      class="lg:flex flex-wrap items-center justify-between space-y-6 lg:space-y-0 space-x-4 mb-6"
    >
      <div class="flex gap-x-4 relative overflow-x-auto pb-1 no-scrollbar">
        <nav class="-mb-px flex space-x-8" aria-label="Property Locations">
          <button
            v-for="tab in computedTabs"
            :key="tab.id"
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap',
              activeTab === tab.id
                ? 'bg-[#5B8469] text-white'
                : 'text-gray-600',
            ]"
            @click="handleTabClick(tab.id)"
          >
            <span class="flex items-center gap-x-1">
              {{ tab.name }}
              <svg
                v-if="tab.hasDropdown"
                class="w-4 h-4"
                viewBox="0 0 23 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.8158 2.17927C20.8158 2.17927 14.1183 11.2731 11.7219 11.2731C9.32531 11.2731 2.62793 2.1792 2.62793 2.1792"
                  stroke="#1D2739"
                  stroke-width="3.41022"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
        </nav>
      </div>
      <div>
        <button
          @click="showBookingCalender = true"
          class="lg:ml-auto w-full lg:w-auto px-4 py-3 bg-[#292929] text-white text-sm rounded-md"
        >
          Set availability
        </button>
      </div>
    </div>

    <CoreFullScreenLoader
      :visible="loadingProperties"
      text="Fetching Properties"
      logo=""
    />

    <div
      v-if="!loadingProperties && !propertiesList.length"
      class="flex flex-col items-center justify-center bg-white border-gray-100 rounded-md py-20 border-[0.5px]"
    >
      <div class="relative mb-4">
        <img src="@/assets/icons/listing-illustration.svg" alt="" />
      </div>
      <p class="text-[#1D2739]">No property has been assigned to you yet</p>
    </div>

    <section
      v-if="!loadingProperties && propertiesList.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 b"
    >
      <ListingsHouseCard
        v-for="(property, index) in propertiesList"
        :key="index"
        :property="property"
        class=""
      />
    </section>
  </div>

  <CoreModalWithoutCloseBtn
    :isOpen="showBookingCalender"
    @close="showBookingCalender = false"
  >
    <ListingsBookingCalender @close="showBookingCalender = false" />
  </CoreModalWithoutCloseBtn>
</template>

<script setup lang="ts">
import { useFetchPropertiesByLocation } from "@/composables/modules/property/useFilterByLocation";
import { useGetProperties } from "@/composables/modules/property/fetchProperties";
import { ref } from "vue";
const { propertiesList, loadingProperties, searchQuery, filteredVisitations } =
  useGetProperties();
const { propertyLocation, loading: loadingPropertyLocation } =
  useFetchPropertiesByLocation();
const route = useRoute();
const router = useRouter();

// Tabs data
const tabs = ref(["All", "Mainland", "Ireland"]);

interface PropertyLocation {
  id: string;
  stateId: string;
  name: string;
  latitude: string;
  longitude: string;
}

const staticTabs = ref([
  { id: "all", name: "All" },
  { id: "new", name: "New Listings", hasDropdown: true },
]);

// Compute final tabs array by combining static and dynamic tabs
// const computedTabs = computed(() => {
//   if (!propertyLocation.value || propertyLocation.value.length === 0) {
//     return staticTabs.value;
//   }

//   // Insert dynamic location tabs before the "New Listings" tab
//   const locationTabs = propertyLocation.value.map(
//     (location: PropertyLocation) => ({
//       id: location.id,
//       name: location.name,
//     })
//   );

//   return [staticTabs.value[0], ...locationTabs, staticTabs.value[1]];
// });

const computedTabs = computed(() => {
  if (!propertyLocation.value || propertyLocation.value.length === 0) {
    // Return static tabs without "New Listings"
    return staticTabs.value.filter(tab => tab.id !== 'new-listings');
  }

  // Insert dynamic location tabs and exclude "New Listings" tab
  const locationTabs = propertyLocation.value.map(
    (location: PropertyLocation) => ({
      id: location.id,
      name: location.name,
    })
  );

  // Filter out "New Listings" from static tabs
  const filteredStaticTabs = staticTabs.value.filter(tab => tab.id !== 'new-listings');

  return [filteredStaticTabs[0], ...locationTabs];
});

// Get active tab from route query or default to 'all'
const activeTab = computed(() => {
  return (route.query.tab as string) || "all";
});

// Handle tab click
const handleTabClick = async (tabId: string) => {
  // Check if tabId is not "new" or "all"
  if (tabId !== "new" && tabId !== "all") {
    await router.push({
      query: {
        ...route.query,
        tab: tabId, // Update the tab query
      },
    });
  } else {
    // Remove the tab query if tabId is "new" or "all"
    const { tab, ...remainingQuery } = route.query;
    await router.push({
      query: remainingQuery,
    });
  }
};

const locationTab = ref("all");

const setLocationTab = (locationId: string) => {
  console.log(locationId, "hgdfgf");
  locationTab.value = locationId;
  // sortBy.value
  router.push({
    query: {
      ...router.currentRoute.value.query,
      tab: locationId === "all" ? undefined : locationId, // Pass locationId, or remove it if "all"
    },
  });
};

const selectedTab = ref(tabs.value[0]);

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const showBookingCalender = ref(false);
</script>
