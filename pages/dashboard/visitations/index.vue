<template>
  <main class="container mx-auto">
    {{ searchQuery }}
   <VisitationsHeader 
     :searchQuery="searchQuery" 
     :filteredVisitations="filteredVisitations" 
     @setTab="handleSetTab"
     @updateFilters="updateFilters" 
   />
   <div v-if="filteredVisitations.length && !loading">
     <VisitationsGrid 
       :searchQuery="searchQuery" 
       :filteredVisitations="filteredVisitations" 
       :visitations="filteredVisitations" 
       v-if="activeTab === 'grid'" 
     />
   </div>
   <CoreFullScreenLoader v-else-if="loading" :visible="loading" text="Fetching Properties" logo="" />
   <section v-else class="flex flex-col justify-center items-center space-y-2 mt-10">
     <h2 class="text-[#1D2739]">No Visitations found</h2>
   </section>
   <ListingsCalender :visitations="filteredVisitations" v-if="activeTab === 'calendar'"  />
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFetchScheduledVisitations } from '@/composables/modules/visitation/useFetchScheduledVisitations';

const { loading, visitations } = useFetchScheduledVisitations();
const activeTab = ref('grid');
const searchQuery = ref('');
const sortOption = ref('most-recent');
const propertyOption = ref('all-properties');

const handleSetTab = (item: string) => {
 activeTab.value = item;
};

definePageMeta({
  layout: "dashboard",
  middleware: 'auth'
})

const updateFilters = (filters: { search: string; sort: string; property: string }) => {
 searchQuery.value = filters.search;
 sortOption.value = filters.sort;
 propertyOption.value = filters.property;
};

const filteredVisitations = computed(() => {
 let result = [...visitations.value];

 if (searchQuery.value) {
   result = result.filter(v => 
     v.tenant.firstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
     v.house.name.toLowerCase().includes(searchQuery.value.toLowerCase())
   );
 }

 if (propertyOption.value !== 'all-properties') {
   result = result.filter(v => v.house.id === propertyOption.value);
 }

 if (sortOption.value === 'most-recent') {
   result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
 } else {
   result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
 }

 return result;
});
</script>
