<template>
   <main class="container mx-auto">
    <VisitationsHeader :searchQuery="searchQuery" :filteredVisitations="filteredVisitations" @setTab="handleSetTab" />
    <div v-if="visitations.length && !loading">
      <VisitationsGrid :searchQuery="searchQuery" :filteredVisitations="filteredVisitations" :visitations="visitations" v-if="activeTab === 'grid'" />
    </div>
    <CoreFullScreenLoader v-else-if="loading && !visitations.length" :visible="loading" text="Fetching Properties" logo="" />
    <section v-else class="flex flex-col justify-between items-center space-y-2 mt-10">
             <svg width="152" height="124" viewBox="0 0 152 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="76" cy="58" r="52" fill="#EAEAEA"/>
            <circle cx="21" cy="25" r="5" fill="#BDBDBD"/>
            <circle cx="18" cy="109" r="7" fill="#BDBDBD"/>
            <circle cx="145" cy="41" r="7" fill="#BDBDBD"/>
            <circle cx="134" cy="14" r="4" fill="#BDBDBD"/>
            <g filter="url(#filter0_b_6853_118795)">
            <rect x="52" y="34" width="48" height="48" rx="24" fill="#9D9D9D"/>
            <path d="M85.9598 56.9707C86.0134 57.8009 86.0134 58.6607 85.9598 59.4909C85.6856 63.7332 82.3536 67.1125 78.1706 67.3905C76.7435 67.4854 75.2536 67.4852 73.8294 67.3905C73.339 67.3579 72.8044 67.2409 72.344 67.0513C71.8318 66.8403 71.5756 66.7348 71.4454 66.7508C71.3153 66.7668 71.1264 66.9061 70.7487 67.1846C70.0827 67.6757 69.2437 68.0285 67.9994 67.9982C67.3703 67.9829 67.0557 67.9752 66.9148 67.7351C66.774 67.495 66.9494 67.1626 67.3002 66.4978C67.7867 65.5758 68.095 64.5203 67.6279 63.6746C66.8234 62.4666 66.1401 61.036 66.0402 59.4909C65.9866 58.6607 65.9866 57.8009 66.0402 56.9707C66.3144 52.7284 69.6464 49.3491 73.8294 49.0711C75.0318 48.9911 75.2812 48.9786 76.5 49.0337" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M72.5 61H79.5M72.5 56H76" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M86 51.5C86 53.433 84.433 55 82.5 55C80.567 55 79 53.433 79 51.5C79 49.567 80.567 48 82.5 48C84.433 48 86 49.567 86 51.5Z" stroke="white" stroke-width="1.5"/>
            </g>
            <defs>
            <filter id="filter0_b_6853_118795" x="44" y="26" width="64" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="4"/>
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_6853_118795"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_6853_118795" result="shape"/>
            </filter>
            </defs>
            </svg>
            <h2 class="text-[#1D2739]">No Visitations found</h2>
            <!-- <p class="text-[#667185]">You have not contacted anyone</p> -->
      </section>
     <!-- <VisitationsCalender v-if="activeTab === 'calendar'" /> -->
     <ListingsCalender v-if="activeTab === 'calendar'"  />
   </main>
</template>

<script setup lang="ts">
import {  useFetchScheduledVisitations } from '@/composables/modules/visitation/useFetchScheduledVisitations'
const { loading, visitations, searchQuery, filteredVisitations } = useFetchScheduledVisitations()
definePageMeta({
  layout: "dashboard",
  middleware: 'auth'
})

const activeTab = ref('grid')

const handleSetTab = (item: any) => {
  console.log(item, 'item here')
  activeTab.value = item
}

interface Visit {
    name: string;
    property: string;
    date: string;
    time: string;
    status: string;
}
</script>
