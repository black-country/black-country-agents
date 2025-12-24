<template>
    <main>
                  <!-- Property Description -->
                  <h2  class="text-base text-[#1D2739] font-medium bg-white border-[0.5px] py-3 px-3 rounded-sm border-gray-50">Property Description</h2>
                  <div class="pt-4 bg-white rounded-lg border-gray-50 p-3 border-[0.5px] text-sm">
                    <p class="text-[#1D2739] mt-2  leading-snug text-sm">
                      {{property.description ?? 'Nil'}}
                      <a v-if="property?.description?.length > 50" href="#" class="text-blue-500">View more</a>
                    </p>
                  </div>
            
                  <!-- Property Highlights -->
                  <h3 class="text-base text-[#1D2739] font-medium bg-white border-[0.5px] py-3 px-3 rounded-sm border-gray-50">Property Highlights</h3>
                  <div class="">
                    <div class="gap-4 space-y-6 bg-white rounded-lg border-gray-50 p-3 border-[0.5px] text-sm">
                  <div class="flex justify-between items-center">
                      <div class="text-[#667185]">Property size <span class="font-medium text-[#1D2739]">{{property?.size ?? 'Nil'}} {{property?.sizeUnit ?? 'Nil'}}</span></div>
                      <div class="text-[#667185]">Flooring type <span class="font-medium text-[#1D2739]">{{property?.flooringType?.name ?? 'Nil'}}</span></div>
                  </div>
                <div class="flex justify-between items-center">
                  <div class="text-[#667185]">Number of bedrooms <span class="font-medium text-[#1D2739]">{{property?.bedroomCount ?? 'Nil'}}</span></div>
                  <div class="text-[#667185]">Number of bathrooms <span class="font-medium text-[#1D2739]d">{{property?.bathroomCount ?? 'Nil'}}</span></div>
                </div>
                      <div class="text-[#667185]">Floor number <span class="font-medium text-[#1D2739]">{{property?.floorNumber ?? 'Nil'}}</span></div>
                <div class="flex justify-between items-center">
                  <div class="text-[#667185]">Architecture <span class="font-medium text-[#1D2739]">{{property?.houseType?.name ?? 'Nil'}}</span></div>
                  <div class="text-[#667185]">{{property?.availableRoomsCount ?? 'Nil'}} rooms available <span class="text-[#326543]">Now</span></div>
                </div>
                    </div>
            
                    <!-- Co-living with -->
                    <h2 class="text-sm font-medium text-[#667185] mt-6 border-[0.5px] py-3 px-3 rounded-lg border-gray-50">Co-living with <span class="text-[#1D2739]">{{ property?.bedroomCount - 1 }} Persons</span></h2>
                    <!-- <table class="w-full mt-2 table-fixed text-sm">
                      <thead>
                        <tr class="bg-[#F9FAFB] rounded-lg">
                          <th class="text-left text-sm py-3 pl-6 font-medium text-[#1D2739]">Occupants</th>
                          <th class="text-left text-sm py-3 font-medium text-[#1D2739]">Room occupied</th>
                          <th class="text-left text-sm py-3 font-medium text-[#1D2739]">Available from</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="text-[#1D2739] pl-6">Rita</td>
                          <td class="text-[#1D2739]">1</td>
                          <td class="text-[#1D2739]">24/05/2024</td>
                        </tr>
                        <tr class="">
                          <td class="text-[#1D2739] pl-6">Maxwell</td>
                          <td class="text-[#1D2739]">2</td>
                          <td class="text-[#1D2739]">Not available</td>
                        </tr>
                      </tbody>
                    </table> -->
                    <div>
                      <table class="w-full mt-2 table-fixed text-sm">
                        <thead>
                          <tr class="bg-[#F9FAFB] rounded-lg">
                            <th class="text-left text-sm py-3 pl-6 font-medium text-[#1D2739]">Occupants</th>
                            <th class="text-left text-sm py-3 font-medium text-[#1D2739]">Room occupied</th>
                            <th class="text-left text-sm py-3 font-medium text-[#1D2739]">Available from</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(room, index) in formattedRoomData" :key="index">
                            <td class="text-[#1D2739] py-3 pl-6">{{ room.occupant }}</td>
                            <td class="text-[#1D2739] py-3">{{ room.roomOccupied }}</td>
                            <td class="text-[#1D2739] py-3">{{ room.availableFrom }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
            
                  <!-- Property Visitation -->
                 <section v-if="property?.rentalApplication">
                  <h2 class="text-sm font-medium text-[#667185] mt-6 border-[0.5px] py-3 px-3 rounded-lg border-gray-50">Property visitation</h2>
                  <div class="rounded-md border-[0.5px] border-gray-50 bg-white">
                    <table class="w-full mt-2 table-fixed text-sm">
                      <thead>
                        <tr class="bg-[#F9FAFB] rounded-lg">
                          <th class="text-left py-3 text-[#667185] pl-4">Day</th>
                          <th class="text-left py-3 text-[#667185]">Time</th>
                        </tr>
                      </thead>
                      <tbody class="space-y-6">
                        <tr class="">
                          <td class="text-[#1D2739] py-3  pl-4">Monday</td>
                          <td class="text-[#1D2739] py-3 ">10:00 AM</td>
                        </tr>
                        <tr class="">
                          <td class="text-[#1D2739] py-3  pl-4">Tuesday</td>
                          <td class="text-[#1D2739] py-3 ">10:00 AM</td>
                        </tr>
                        <tr class="">
                          <td class="text-[#1D2739] py-3  pl-4">Wednesday</td>
                          <td class="text-[#1D2739] py-3 ">10:00 AM</td>
                        </tr>
                      </tbody>
                    </table>
                   <div class="mt-5">
                      <button @click="showBookingModal = true" class="mt-4 w-full bg-[#292929]  text-white py-4 rounded-md">Schedule a visit</button>
                   </div>
                  </div>
                 </section>
            
                  <!-- House Rules -->
                <section v-if="property?.rules?.length">
                  <h2 class="text-sm font-medium text-[#1D2739] mt-6 border-[0.5px] py-3 px-3 rounded-lg border-gray-50">House Rules</h2>
                  <div class="">
                    <ul v-if="property?.rules?.length" class="space-y-1">
                      <p class="border-[0.5px] rounded-lg border-gray-50 py-3 text-sm pl-4">{{property?.rules[0]?.rule }}</p>
                      <p class="border-[0.5px] rounded-lg border-gray-50 py-3 text-sm pl-4">{{property?.rules[1]?.rule }}</p>
                      <div class="border-[0.5px] rounded-lg border-gray-50 py-3">
                          <p class="py-3 text-sm pl-4">Other rules</p>
                        <div class="pl-5">
                          <ul class="list-disc ml-5 space-y-4 text-sm">
                          <li v-for="(item, idx) in otherRules" :key="idx" class="text-[#1D2739] leading-snug">{{item.rule}}</li>
                           </ul>
                        </div>
                      </div>
                    </ul>
                  </div>
                </section>
    
                  <CoreModal
                  :isOpen="showBookingModal"
                  @close="showBookingModal = false"
                  >
                    <BookingModal class="lg:w-4/12 m-6 lg:m-0" />
                  </CoreModal>
    </main>
    </template>
    
    <script setup lang="ts">
    const showBookingModal = ref(false);
    const props = defineProps({
        property: {
          type: Object,
          default: () => {}
        }
      })
    
      const otherRules = computed(() => {
        if(props.property.rules.length > 2){
          return props.property.rules.slice(2)
        }
      })
    
      const formattedRoomData = computed(() => {
    if(props.property.rooms){
      return props.property.rooms.map(room => {
        return {
          occupant: room.occupantName || "No occupant",
          roomOccupied: room.name,
          availableFrom: room.availability === "available_now"
            ? "Available now"
            : room.availableFrom
              ? new Date(room.availableFrom).toLocaleDateString()
              : "Not available"
        };
      });
    }
    });
    </script>
    