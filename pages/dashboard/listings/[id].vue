<template>
  <Layout>
  <main class="max-w-7xl mx-auto">
    <section>
        <div
          class="flex justify-between max-w-7xl mx-auto items-center px-6 lg:px-0 pt-3"
        >
          <!-- Breadcrumb -->
          <div class="flex items-center space-x-4">
            <svg @click="router.back()" class="cursor-pointer"  width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="18" fill="#EAEAEA"/>
              <path d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            <a href="#" class="text-gray-500 hover:text-gray-700 text-sm"
              >Listings</a
            >
            <span class="text-gray-400 text-sm">|</span>
            <h1 class="text-gray-800 font-semibold text-sm">
              {{ propertyObj.name }}
            </h1>
          </div>

          <!-- Action Icons -->
          <div class="flex items-center space-x-3">
            <!-- Share Icon -->
            <button @click="showShareModal = true" class=" ">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="36" height="36" rx="18" fill="#EAEAEA" />
                <path
                  d="M25.5 13.417C25.5 14.7977 24.3807 15.917 23 15.917C21.6192 15.917 20.5 14.7977 20.5 13.417C20.5 12.0363 21.6192 10.917 23 10.917C24.3807 10.917 25.5 12.0363 25.5 13.417Z"
                  stroke="#1D2739"
                  stroke-width="1.5"
                />
                <path
                  d="M15.5 18C15.5 19.3807 14.3807 20.5 13 20.5C11.6193 20.5 10.5 19.3807 10.5 18C10.5 16.6192 11.6193 15.5 13 15.5C14.3807 15.5 15.5 16.6192 15.5 18Z"
                  stroke="#1D2739"
                  stroke-width="1.5"
                />
                <path
                  d="M25.5 22.583C25.5 23.9638 24.3807 25.083 23 25.083C21.6192 25.083 20.5 23.9638 20.5 22.583C20.5 21.2023 21.6192 20.083 23 20.083C24.3807 20.083 25.5 21.2023 25.5 22.583Z"
                  stroke="#1D2739"
                  stroke-width="1.5"
                />
                <path
                  d="M15.2734 16.9585L20.6901 14.459M15.2734 19.0423L20.6901 21.5419"
                  stroke="#1D2739"
                  stroke-width="1.5"
                />
              </svg>
            </button>

  
            <button
          @click="showBookingCalender = true"
          class="lg:ml-auto w-full lg:w-auto px-4 py-3 bg-[#292929] text-white text-sm rounded-md">
          Edit availability
        </button>
          </div>
        </div>
      </section>
      <!-- {{ availability }} -->
<ListingsImageGallery v-if="propertyObj?.images" :loading="loading" :propertyObj="propertyObj" :images="allImages" class="mt-6" />
 <section v-if="!loading">
  <div class="pt-4 pb-8">
    <ListingsDetails :propertyObj="propertyObj" :loading="loading" :availability="availability" />
  </div>
 </section>
 <CoreFullScreenLoader v-else :visible="loading" text="Fetching property details" logo="" />
 <CoreModal :isOpen="showShareModal" @close="showShareModal = false">
      <div
        class="bg-white p-6 w-full m-14 lg:m-0 rounded-lg lg:w-3/12 relative space-y-10"
        @click.stop
      >
        <div class="space-y-7">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-lg pt-3 font-medium text-[#1D2739]">
                Share using
              </h2>
            </div>
            <!-- Close Button -->
            <div>
              <button class="" @click="showShareModal = false">
                <svga
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="36" height="36" rx="4" fill="#F9FAFB" />
                  <path
                    d="M23 13L13 23M13 13L23 23"
                    stroke="#344054"
                    stroke-width="1.67"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svga>
              </button>
            </div>

            <!-- Modal Content -->
          </div>

          <div class="flex justify-between mb-6">
            <!-- Instagram -->
            <div class="flex flex-col items-center space-y-2">
              <!-- <img src="/instagram-icon.svg" alt="Instagram" class="w-12 h-12 mb-2" /> -->
              <svg
                width="61"
                height="60"
                viewBox="0 0 61 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="30.125" cy="30" r="30" fill="#FEF7FF" />
                <rect
                  x="15.916"
                  y="15.085"
                  width="29.1667"
                  height="29.8295"
                  rx="8"
                  fill="url(#paint0_radial_6053_214487)"
                />
                <rect
                  x="15.916"
                  y="15.085"
                  width="29.1667"
                  height="29.8295"
                  rx="8"
                  fill="url(#paint1_radial_6053_214487)"
                />
                <rect
                  x="15.916"
                  y="15.085"
                  width="29.1667"
                  height="29.8295"
                  rx="8"
                  fill="url(#paint2_radial_6053_214487)"
                />
                <path
                  d="M37.7923 24.1407C37.7923 25.0233 37.0928 25.7387 36.2298 25.7387C35.3669 25.7387 34.6673 25.0233 34.6673 24.1407C34.6673 23.2582 35.3669 22.5427 36.2298 22.5427C37.0928 22.5427 37.7923 23.2582 37.7923 24.1407Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M30.5007 35.3268C33.3771 35.3268 35.709 32.9419 35.709 30.0001C35.709 27.0582 33.3771 24.6734 30.5007 24.6734C27.6242 24.6734 25.2923 27.0582 25.2923 30.0001C25.2923 32.9419 27.6242 35.3268 30.5007 35.3268ZM30.5007 33.1961C32.2265 33.1961 33.6257 31.7652 33.6257 30.0001C33.6257 28.235 32.2265 26.8041 30.5007 26.8041C28.7748 26.8041 27.3757 28.235 27.3757 30.0001C27.3757 31.7652 28.7748 33.1961 30.5007 33.1961Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20.084 29.574C20.084 25.9941 20.084 24.2041 20.7652 22.8368C21.3644 21.6341 22.3205 20.6562 23.4965 20.0434C24.8335 19.3467 26.5837 19.3467 30.084 19.3467H30.9173C34.4176 19.3467 36.1678 19.3467 37.5048 20.0434C38.6808 20.6562 39.6369 21.6341 40.2361 22.8368C40.9173 24.2041 40.9173 25.9941 40.9173 29.574V30.4262C40.9173 34.0061 40.9173 35.796 40.2361 37.1634C39.6369 38.3661 38.6808 39.344 37.5048 39.9568C36.1678 40.6535 34.4176 40.6535 30.9173 40.6535H30.084C26.5837 40.6535 24.8335 40.6535 23.4965 39.9568C22.3205 39.344 21.3644 38.3661 20.7652 37.1634C20.084 35.796 20.084 34.0061 20.084 30.4262V29.574ZM30.084 21.4774H30.9173C32.7019 21.4774 33.915 21.479 34.8527 21.5574C35.766 21.6337 36.2331 21.772 36.5589 21.9418C37.343 22.3504 37.9804 23.0023 38.3798 23.8041C38.5459 24.1373 38.6811 24.6151 38.7558 25.5492C38.8324 26.5082 38.834 27.7489 38.834 29.574V30.4262C38.834 32.2513 38.8324 33.492 38.7558 34.451C38.6811 35.3851 38.5459 35.8628 38.3798 36.1961C37.9804 36.9979 37.343 37.6498 36.5589 38.0584C36.2331 38.2282 35.766 38.3665 34.8527 38.4428C33.915 38.5212 32.7019 38.5228 30.9173 38.5228H30.084C28.2994 38.5228 27.0863 38.5212 26.1486 38.4428C25.2353 38.3665 24.7682 38.2282 24.4424 38.0584C23.6583 37.6498 23.0209 36.9979 22.6215 36.1961C22.4554 35.8628 22.3202 35.3851 22.2455 34.451C22.1689 33.492 22.1673 32.2513 22.1673 30.4262V29.574C22.1673 27.7489 22.1689 26.5082 22.2455 25.5492C22.3202 24.6151 22.4554 24.1373 22.6215 23.8041C23.0209 23.0023 23.6583 22.3504 24.4424 21.9418C24.7682 21.772 25.2353 21.6337 26.1486 21.5574C27.0863 21.479 28.2994 21.4774 30.084 21.4774Z"
                  fill="white"
                />
                <defs>
                  <radialGradient
                    id="paint0_radial_6053_214487"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(26.3327 37.4571) rotate(-55.9754) scale(26.9935 26.7735)"
                  >
                    <stop stop-color="#B13589" />
                    <stop offset="0.79309" stop-color="#C62F94" />
                    <stop offset="1" stop-color="#8A3AC8" />
                  </radialGradient>
                  <radialGradient
                    id="paint1_radial_6053_214487"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(25.291 45.9798) rotate(-65.6239) scale(23.9769 23.6276)"
                  >
                    <stop stop-color="#E0E8B7" />
                    <stop offset="0.444662" stop-color="#FB8A2E" />
                    <stop offset="0.71474" stop-color="#E2425C" />
                    <stop offset="1" stop-color="#E2425C" stop-opacity="0" />
                  </radialGradient>
                  <radialGradient
                    id="paint2_radial_6053_214487"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(14.3535 16.1503) rotate(-8.31232) scale(40.5299 8.85781)"
                  >
                    <stop offset="0.156701" stop-color="#406ADC" />
                    <stop offset="0.467799" stop-color="#6A45BE" />
                    <stop offset="1" stop-color="#6A45BE" stop-opacity="0" />
                  </radialGradient>
                </defs>
              </svg>

              <span class="text-sm text-[#1D2739]">Instagram</span>
            </div>
            <!-- X (Twitter) -->
            <div class="flex flex-col items-center space-y-2">
              <!-- <img src="/twitter-icon.svg" alt="Twitter" class="w-12 h-12 mb-2" /> -->
              <svg
                width="61"
                height="60"
                viewBox="0 0 61 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="30.375" cy="30" r="30" fill="#F0F2F5" />
                <rect
                  x="15.1992"
                  y="15"
                  width="30"
                  height="30"
                  rx="8"
                  fill="black"
                />
                <path
                  d="M34.527 23H36.7714L31.8682 28.6041L37.6364 36.23H33.1199L29.5824 31.6049L25.5347 36.23H23.289L28.5335 30.2358L23 23H27.6312L30.8287 27.2275L34.527 23ZM33.7393 34.8866H34.983L26.9554 24.2728H25.6209L33.7393 34.8866Z"
                  fill="white"
                />
              </svg>

              <span class="text-sm text-[#1D2739]">Twitter</span>
            </div>
            <!-- WhatsApp -->
            <div class="flex flex-col items-center space-y-2">
              <!-- <img src="/whatsapp-icon.svg" alt="WhatsApp" class="w-12 h-12 mb-2" /> -->
              <svg
                width="61"
                height="60"
                viewBox="0 0 61 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="30.375" cy="30" r="30" fill="#F0F2F5" />
                <rect
                  x="15.1992"
                  y="15"
                  width="30"
                  height="30"
                  rx="8"
                  fill="black"
                />
                <path
                  d="M34.527 23H36.7714L31.8682 28.6041L37.6364 36.23H33.1199L29.5824 31.6049L25.5347 36.23H23.289L28.5335 30.2358L23 23H27.6312L30.8287 27.2275L34.527 23ZM33.7393 34.8866H34.983L26.9554 24.2728H25.6209L33.7393 34.8866Z"
                  fill="white"
                />
              </svg>

              <span class="text-sm text-[#1D2739]">WhatsApp</span>
            </div>
            <!-- Facebook -->
            <div class="flex flex-col items-center space-y-2">
              <!-- <img src="/facebook-icon.svg" alt="Facebook" class="w-12 h-12 mb-2" /> -->
              <svg
                width="61"
                height="60"
                viewBox="0 0 61 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="30.875" cy="30" r="30" fill="#E6F1FF" />
                <rect
                  x="15.5"
                  y="15"
                  width="30"
                  height="30"
                  rx="8"
                  fill="#1877F2"
                />
                <path
                  d="M36.3359 34.3359L37.0039 30H32.8438V27.1875C32.8438 26.0039 33.4238 24.8438 35.2871 24.8438H37.1797V21.1523C37.1797 21.1523 35.4629 20.8594 33.8223 20.8594C30.3945 20.8594 28.1562 22.9336 28.1562 26.6953V30H24.3477V34.3359H28.1562V45H32.8438V34.3359H36.3359Z"
                  fill="white"
                />
              </svg>

              <span class="text-sm text-[#1D2739]">Facebook</span>
            </div>
          </div>
        </div>

        <!-- Copy Link -->
        <div class="pt-4">
          <h3 class="font-medium mb-2 text-[#1D2739]">Copy Link</h3>
          <div class="relative">
            <input
              type="text"
              class="border-[0.5px] rounded-lg w-full py-4 px-4 text-[#667185] bg-[#E4E7EC]"
              :value="shareLink"
              readonly
            />
            <button
              class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full"
              @click="copyLink"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1309 11.0152C11.2623 11.8838 9.85408 11.8838 8.98541 11.0152C8.11684 10.1466 8.11684 8.73833 8.98541 7.8697L10.9514 5.90375C11.7804 5.07467 13.1012 5.03694 13.975 5.79055M13.7037 3.15146C14.5723 2.28285 15.9806 2.28285 16.8492 3.15146C17.7178 4.02006 17.7178 5.42836 16.8492 6.29696L14.8832 8.26291C14.0542 9.092 12.7335 9.12975 11.8597 8.37608"
                  stroke="#1D2739"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M17.5 10.8333C17.5 13.976 17.5 15.5474 16.5237 16.5237C15.5474 17.5 13.976 17.5 10.8333 17.5H9.16667C6.02397 17.5 4.45262 17.5 3.47631 16.5237C2.5 15.5474 2.5 13.976 2.5 10.8333V9.16667C2.5 6.02397 2.5 4.45262 3.47631 3.47631C4.45262 2.5 6.02397 2.5 9.16667 2.5"
                  stroke="#1D2739"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </CoreModal>

    <CoreModalWithoutCloseBtn
       :isOpen="showBookingCalender"
      @close="showBookingCalender = false"
    >
      <ListingsBookingCalender />
    </CoreModalWithoutCloseBtn>
  </main>
</Layout>
</template>

<script setup lang="ts">
import { useFetchAvailabilityByHouseId } from '@/composables/modules/visitation/useFetchAvailabilityByHouseId'
import { useUserInitials } from '@/composables/core/useUserInitials'
import Layout from '@/layouts/dashboard.vue';
import { useUser } from '@/composables/auth/user'
import { useFetchProperty } from "@/composables/modules/property/fetchProperty";
const { user } = useUser()
const { propertyObj, loading } = useFetchProperty();
import { useImageExtractor } from '@/composables/core/useExtractImages'; 
const { loading: fetching, availability } = useFetchAvailabilityByHouseId()
const { extractImages } = useImageExtractor();
const allImages = computed(() => extractImages(propertyObj.value));
const router = useRouter()


definePageMeta({
     middleware: 'auth'
})

const showShareModal = ref(false);
// const showBookingModal = ref(true);

// Property Manager

const initials = ref('') as any

onMounted(() => {
  // Get initials from the composable
const { getInitials } = useUserInitials(user.value);
initials.value = getInitials.value;
})

// Similar Properties
// const similarProperties = ref([
//   {
//     id: 1,
//     image: "property1.png",
//     name: "Jason Co-living Space",
//     address: "Iconic Tower, off Ajose Adegun VI, Lagos.",
//     price: "5 bedrooms | 6 baths | 5254 sqft",
//   },
//   {
//     id: 2,
//     image: "property2.png",
//     name: "Jason Co-living Space",
//     address: "Iconic Tower, off Ajose Adegun VI, Lagos.",
//     price: "5 bedrooms | 6 baths | 5254 sqft",
//   },
//   {
//     id: 3,
//     image: "property1.png",
//     name: "Jason Co-living Space",
//     address: "Iconic Tower, off Ajose Adegun VI, Lagos.",
//     price: "5 bedrooms | 6 baths | 5254 sqft",
//   },
//   {
//     id: 4,
//     image: "property2.png",
//     name: "Jason Co-living Space",
//     address: "Iconic Tower, off Ajose Adegun VI, Lagos.",
//     price: "5 bedrooms | 6 baths | 5254 sqft",
//   },
// ]);
const route = useRoute()

const handleFavorite = () => {};

const fullUrlPath = computed(() => {
  if (process.client) { // Ensure code runs only on the client-side
    const origin = window.location.origin;
    return `${origin}${route.fullPath}`;
  }
  return ''; // Return an empty string or a default value for server-side rendering
});

// Function to copy the link to the clipboard
// const copyLink = async () => {
//   try {
//     await navigator.clipboard.writeText(shareLink.value);
//     alert("Link copied!");
//   } catch (err) {
//     alert("Failed to copy link");
//   }
// };

// The link to share
const shareLink = ref(fullUrlPath.value);

// Functions to share on different platforms
const shareOnInstagram = () => {
  // Instagram does not support direct URL sharing, so we'll just provide a message.
  alert("Please share this link on Instagram: " + shareLink.value);
};

const shareOnTwitter = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=Check%20this%20out!&url=${encodeURIComponent(
    shareLink.value
  )}`;
  window.open(twitterUrl, "_blank");
};

const shareOnWhatsApp = () => {
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    "Check this out: " + shareLink.value
  )}`;
  window.open(whatsappUrl, "_blank");
};

const shareOnFacebook = () => {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareLink.value
  )}`;
  window.open(facebookUrl, "_blank");
};

const copyLink = () => {
  navigator.clipboard.writeText(shareLink.value).then(
    () => {
      alert("Link copied to clipboard!");
    },
    (err) => {
      console.error("Could not copy text: ", err);
    }
  );
};

const showBookingCalender = ref(false)

</script>

<style scoped>
/* Additional styling for specific elements can be added here */
</style>
