<template>
     <div
    class="relative cursor-pointer min-w-[300px] w-full lg:max-w-[350px] bg-white"
  >
    <img
      @click="router.push(`/dashboard/listings/${property.id}`)"
      v-if="property?.images?.length"
      :src="property?.images[0]"
      class="rounded-lg cursor-pointer object-cover h-56 w-full"
      alt="alt"
    />
    <img
      @click="router.push(`/dashboard/listings/${property.id}`)"
      v-else
      class="rounded-lg cursor-pointer"
      src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="alt"
    />
    <section
      @click="router.push(`/dashboard/listings/${property.id}`)"
      class="space-y-2 cursor-pointer"
    >
      <div>
        <h3 class="text-sm font-medium text-[#1D2739] mt-4 mb-2">
          {{ property?.name }}
        </h3>
        <p class="text-[#79797F] text-xs items-center flex gap-x-2">
          <svg class="w-5 h-5 text-emerald-700" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
        </svg>

        <span class="text-[13px] text-[#79797F]">{{ property.address.length > 20 ? `${property.address.slice(0, 20)}...` : property.address }}</span>
        </p>
      </div>
      <p class="text-[#1D2739] font-medium text-xs">
        {{ property.bedroomCount }} bedrooms |
        {{ property.bathroomCount }} baths | {{ property.size }}
        {{ property.sizeUnit }}
      </p>
      <p class="text-[#1D2739] text-xs">{{ property.available }}</p>
      <p class="text-[#1D2739] text-xs">
        {{ property.availableRoomsCount }} rooms avail.
        <span class="font-medium text-[#326543]">Now</span>
        <span
          :class="[property.futureAvailableRoomsCount === 0 ? 'hidden' : '']"
        >
          | {{ property.futureAvailableRoomsCount }} room avail. on
          {{ moment(property.leastAvailableDate).format("MMMM Do YYYY") }}
        </span>
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
const router = useRouter()
const props = defineProps({
    property: {
        type: Object,
        default: () => {}
    }
})
</script>