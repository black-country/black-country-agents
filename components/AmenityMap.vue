<template>
    <div class="container mx-auto -mt-28 relative">
      <div class="absolute lg:fixed top-45 left-[1068px] transform -translate-x-1/2 z-50 w-11/12 max-w-3xl bg-white rounded-lg shadow-lg p-4">
        <div class="flex items-center relative">
          <input
            v-model="location"
            type="text"
            placeholder="Enter location"
            class="bg-[#292929] pl-14 text-white py-3 rounded-md  placeholder-gray-400 focus:outline-none w-full"
          />
          <svg class="absolute left-6" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.83203 15C4.30792 15.3431 3.33203 15.8703 3.33203 16.4614C3.33203 17.4953 6.3168 18.3333 9.9987 18.3333C13.6806 18.3333 16.6654 17.4953 16.6654 16.4614C16.6654 15.8703 15.6894 15.3431 14.1654 15" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M12.0846 7.50008C12.0846 8.65066 11.1519 9.58341 10.0013 9.58341C8.85072 9.58341 7.91797 8.65066 7.91797 7.50008C7.91797 6.34949 8.85072 5.41675 10.0013 5.41675C11.1519 5.41675 12.0846 6.34949 12.0846 7.50008Z" stroke="white" stroke-width="1.5"/>
            <path d="M11.0491 14.5781C10.7681 14.8487 10.3924 15.0001 10.0015 15.0001C9.61047 15.0001 9.2348 14.8487 8.95372 14.5781C6.37989 12.0841 2.93063 9.298 4.61273 5.25319C5.52222 3.06618 7.70542 1.66675 10.0015 1.66675C12.2975 1.66675 14.4806 3.06619 15.3901 5.25319C17.0701 9.29291 13.6293 12.0927 11.0491 14.5781Z" stroke="white" stroke-width="1.5"/>
            </svg>
            
          <div class="bg-[#292929] text-white rounded-md px-4 py-3 shadow-md z-10 flex items-center gap-x-2 ml-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.33203 4.16675H16.6654" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3.33203 10H16.6654" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3.33203 15.8333H16.6654" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <button @click="toggleSidebar">{{ showDropdown ? 'Hide' : 'Open' }}</button>
          </div>
        </div>
    
   
        <div class="flex justify-around my-4">
          <button
            v-for="option in searchOptions"
            :key="option"
            @click="searchAmenities(selectedLat, selectedLon, option)"
            class="px-4 py-3 rounded transition-colors text-sm duration-200 ease-in-out "
            :class="{
              'bg-[#5B8469] text-white': selectedOption === option,
              'bg-[#E4E7EC] text-[#292929]': selectedOption !== option
            }"
          >
            {{ option }}
          </button>
        </div>
        <section v-if="showDropdown">
            <div v-if="amenities.length > 0" class="px-4 z-50 relative bg-white opacity-95 rounded-lg">
                <h3 class="text-base py-0 my-0 font-medium text-[#1D2739] mb-4">Neighborhood Amenities</h3>
                <ul class="space-y-3">
                  <li
                    v-for="amenity in amenities"
                    :key="amenity.id"
                    class="bg-white border opacity-100 border-gray-50 gap-x-4  cursor-pointer z-50 p-4 rounded-lg flex items-center"
                    @click="zoomToAmenity(amenity)"
                  >
                    <div>
                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="44" height="44" rx="22" fill="#EBF0EC"/>
                            <path d="M19.918 24.5C19.1559 24.6715 18.668 24.9351 18.668 25.2307C18.668 25.7476 20.1604 26.1667 22.0013 26.1667C23.8423 26.1667 25.3346 25.7476 25.3346 25.2307C25.3346 24.9351 24.8467 24.6715 24.0846 24.5" stroke="#5B8469" stroke-linecap="round"/>
                            <path d="M23.0404 20.7502C23.0404 21.3255 22.574 21.7918 21.9987 21.7918C21.4234 21.7918 20.957 21.3255 20.957 20.7502C20.957 20.1749 21.4234 19.7085 21.9987 19.7085C22.574 19.7085 23.0404 20.1749 23.0404 20.7502Z" fill="white" stroke="#5B8469"/>
                            <path d="M22.5226 24.2892C22.3821 24.4245 22.1942 24.5002 21.9988 24.5002C21.8033 24.5002 21.6154 24.4245 21.4749 24.2892C20.188 23.0422 18.4634 21.6491 19.3044 19.6267C19.7592 18.5332 20.8508 17.8335 21.9988 17.8335C23.1468 17.8335 24.2384 18.5332 24.6931 19.6267C25.5331 21.6466 23.8127 23.0465 22.5226 24.2892Z" stroke="#5B8469"/>
                            </svg>
                    </div>
                    
                    <div>
                        <p class="text-sm font-medium text-[#1D2739]">{{ amenity.name }}</p>
                        <p class="text-sm text-gray-600">{{amenity.display_name}}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div v-else-if="searched && amenities.length === 0">
                <p class="text-center text-red-500 py-20">No amenities found for the selected category.</p>
              </div>
        </section>
      </div>
      <div class="relative h-96 w-full mb-6 mt-28 z-10" id="map"></div>
    </div>
  </template>
  
<script setup lang="ts">
import { use_create_property } from '@/composables/modules/property/create'
import axios from "axios";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

const { setPropertyData, payload } = use_create_property();

const emit = defineEmits(['locationSelected', 'searchResult', 'amenityObj']);

const showDropdown = ref(true);
const toggleSidebar = () => {
  showDropdown.value = !showDropdown.value;
};

const location = ref("");
const map = ref<any>(null);
const searched = ref(false);
const searchOptions = [
  "Hospital",
  "School",
  "Market/Shopping Plaza",
  "Police Station",
  "Restaurants/Eateries",
];
const selectedOption = ref<string | null>(null);

const loading = ref(false);
const amenities = ref<any[]>([]);
const selectedLat = ref(0);
const selectedLon = ref(0);
const searchTimeout = ref<any>(null);

onMounted(async () => {
  // Initialize map with a default transport map tile layer
  map.value = L.map("map").setView([0, 0], 13); // Center on the equator as a placeholder

  L.tileLayer(
    "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=4ac5aea846644296969cbecbe5c94229",
    {
      maxZoom: 18,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map.value);

  // Get user's current location and update the map
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      selectedLat.value = latitude;
      selectedLon.value = longitude;

      // Reverse geocoding to get the address
      try {
        const response = await axios.get(
          "https://nominatim.openstreetmap.org/reverse",
          {
            params: {
              lat: latitude,
              lon: longitude,
              format: "json",
            },
          }
        );

        // console.log(response.data, 'here ooojfgsdjkfshrgjkfghrjklrtjklegtklregtkergtkergtkregklge');
        if (response.data && response.data.display_name) {
          payload.latitude.value = response.data.lat
          payload.longitude.value = response.data.lon
          payload.address.value = response.data.display_name
          // Create an object with the necessary data
          const baseObj = {
            latitude: parseFloat(response.data.lat),
            longitude: parseFloat(response.data.lon),
            address: response.data.display_name
          };
          
          // Call setPropertyData with the new object
          console.log(baseObj, 'before setting');
          payload.latitude.value = parseFloat(response.data.lat)
          payload.longitude.value = parseFloat(response.data.lat)
          payload.address.value = parseFloat(response.data.lat)
          // setPropertyData(baseObj);
        }

        map.value.setView([latitude, longitude], 13);
        L.marker([latitude, longitude])
          .addTo(map.value)
          .bindPopup("You are here")
          .openPopup();

        // Fetch default amenities near the user's current location
        searchAmenities(latitude, longitude, "Hospital"); // Default to hospitals on load
      } catch (error) {
        console.error("Error during reverse geocoding:", error);
      }
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
});

// Watch for changes in the location input and trigger search
watch(location, (newLocation) => {
  if (newLocation) {
    // Debounce to limit the number of API calls
    if (searchTimeout.value) clearTimeout(searchTimeout.value);
    searchTimeout.value = setTimeout(() => {
      searchLocation();
    }, 500); // Adjust the debounce delay as needed
  }
});

const searchLocation = async () => {
  if (!location.value) return;
  loading.value = true;

  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: location.value,
          format: "json",
          limit: 1,
        },
      }
    );

//     const emit = defineEmits<{
//   (event: 'locationSelected', data: any): any,
//   (event: 'searchResult', data: any): any
// }>()

    console.log(response, 'res from nominatim')

    if (response.data.length > 0) {
      const place = response.data[0];
      const lat = parseFloat(place.lat);
      const lon = parseFloat(place.lon);

      const baseObj = {
        latitude: lat,
        longitude: lon,
        address: place.display_name
    };

          payload.latitude.value = baseObj.latitude
          payload.longitude.value = baseObj.longitude
          payload.address.value =  baseObj.address

      // setPropertyData(baseObj)
      map.value.setView([lat, lon], 13);
      L.marker([lat, lon])
        .addTo(map.value)
        .bindPopup(`Location: ${place.display_name}`)
        .openPopup();

      selectedLat.value = lat;
      selectedLon.value = lon;
      emit('searchResult', response.data[0] )

      // Fetch amenities near the searched location
      searchAmenities(lat, lon, "Hospital"); // Default to hospitals on search
    }
  } catch (error) {
    console.error("Error fetching location:", error);
  } finally {
    loading.value = false;
  }
};

const searchAmenities = async (
  lat: number,
  lon: number,
  amenityType: string
) => {
  loading.value = true;
  selectedOption.value = amenityType;

  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: `${amenityType} near ${lat}, ${lon}`,
          format: "json",
          limit: 5,
        },
      }
    );

    // Remove previous markers
    map.value.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        map.value.removeLayer(layer);
      }
    });

    amenities.value = response.data.map((facility: any) => ({
      ...facility,
      id: facility.place_id,
      name: facility.name,
      display_name: facility.display_name,
      lat: facility.lat,
      lon: facility.lon,
    }));

    // Add new markers for amenities
    amenities.value.forEach((facility: any) => {
      L.marker([facility.lat, facility.lon])
        .addTo(map.value)
        .bindPopup(`Amenity: ${facility.name}`);
    });

    searched.value = true;
    showDropdown.value = true;
  } catch (error) {
    console.error("Error fetching amenities:", error);
  } finally {
    loading.value = false;
  }
};

// Method to zoom to selected amenity from the list
const zoomToAmenity = (amenity: any) => {
  console.log(amenity, 'amenity selected');
  emit('amenityObj', amenity)
  // const landmarksArray = ref([]) as any;
  map.value.setView([amenity.lat, amenity.lon], 15);
  L.marker([amenity.lat, amenity.lon])
    .addTo(map.value)
    .bindPopup(`Amenity: ${amenity.name}`)
    .openPopup();
  showDropdown.value = false;
};

</script>
   