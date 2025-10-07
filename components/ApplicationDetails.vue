<template>
  <div v-if="application">
    <!-- Back Button -->
    <button @click="$router.back()" class="flex items-center gap-2 text-gray-600 hover:text-[#0C111D] mb-6">
      <ArrowLeft class="w-4 h-4" />
      Back
    </button>

    <h1 class="text-2xl font-semibold text-[#0C111D] mb-6">Application Details</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Property Info -->
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex items-start gap-4">
            <img 
              src="@/assets/img/avatar.png" 
              alt="Property" 
              class="w-20 h-20 rounded-lg object-cover"
            />
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-blue-600 font-medium">₦350,000/night</span>
                <button class="flex items-center gap-1 text-gray-600 hover:text-[#0C111D]">
                  <Share class="w-4 h-4" />
                  Share
                </button>
                <button class="flex items-center gap-1 text-gray-600 hover:text-[#0C111D]">
                  <ExternalLink class="w-4 h-4" />
                  View Property
                </button>
              </div>
              <h2 class="text-xl font-semibold mb-2">{{ application.property.name }}</h2>
              <div class="flex items-center gap-4 text-sm text-gray-600">
                <span class="flex items-center gap-1">
                  <Bed class="w-4 h-4" />
                  {{ application?.property?.specs?.bedrooms }}
                </span>
                <span class="flex items-center gap-1">
                  <Bath class="w-4 h-4" />
                  {{ application?.property?.specs?.bathrooms }}
                </span>
                <span class="flex items-center gap-1">
                  <Car class="w-4 h-4" />
                  {{ application?.property?.specs?.parking }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Personal Details -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-4">Personal Details</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="text-gray-600 block">Name</span>
              <span class="font-medium">{{ application?.personalDetails?.name }}</span>
            </div>
            <div>
              <span class="text-gray-600 block">Email Address</span>
              <span class="font-medium">{{ application?.personalDetails?.email }}</span>
            </div>
            <div>
              <span class="text-gray-600 block">Date Applied</span>
              <span class="font-medium">{{ application?.personalDetails?.dateApplied }}</span>
            </div>
            <div>
              <span class="text-gray-600 block">Phone Number</span>
              <span class="font-medium">{{ application?.personalDetails?.phone }}</span>
            </div>
          </div>
          <div class="mt-4">
            <span class="text-gray-600 block">Status</span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {{ application?.status }}
            </span>
          </div>
        </div>

        <!-- Documents -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-4">Documents</h3>
          <div class="space-y-4">
            <div>
              <span class="text-gray-600 block mb-2">NIN Number</span>
              <span class="font-medium">{{ application?.documents?.ninNumber }}</span>
            </div>
            <div>
              <span class="text-gray-600 block mb-2">NIN Document</span>
              <div class="flex gap-2">
                <button class="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                  <FileText class="w-4 h-4" />
                  NIN_front.jpg
                </button>
                <button class="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                  <FileText class="w-4 h-4" />
                  NIN_back.jpg
                </button>
              </div>
            </div>
            <div>
              <span class="text-gray-600 block mb-2">Payslip for last 3 months</span>
              <button class="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                <FileText class="w-4 h-4" />
                Payslip_qtr.pdf
              </button>
            </div>
          </div>
        </div>

        <!-- Letter of Intent -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-4">Letter of Intent</h3>
          <p class="text-gray-700 leading-relaxed">{{ application?.letterOfIntent }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <button class="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50">
            Reject
          </button>
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Shortlist
          </button>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Offer Price -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2">Offer Price</h3>
          <div class="text-2xl font-bold text-[#0C111D]">₦{{ application?.offerPrice?.toLocaleString() }}</div>
          <div class="text-sm text-gray-600 flex items-center gap-1">
            <TrendingUp class="w-4 h-4" />
            20%
          </div>
        </div>

        <!-- Location Details -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-4">Location Details</h3>
          <div class="space-y-3">
            <div>
              <span class="text-gray-600 block">Current Address</span>
              <span class="font-medium">{{ application?.locationDetails?.currentAddress }}</span>
            </div>
            <div>
              <span class="text-gray-600 block">Country</span>
              <div class="flex items-center gap-2">
                <img src="@/assets/img/avatar.png" alt="Nigeria" class="w-4 h-4" />
                <span class="font-medium">{{ application?.locationDetails?.country }}</span>
              </div>
            </div>
            <div>
              <span class="text-gray-600 block">State</span>
              <span class="font-medium">{{ application?.locationDetails?.state }}</span>
            </div>
            <div>
              <span class="text-gray-600 block">City</span>
              <span class="font-medium">{{ application?.locationDetails?.city }}</span>
            </div>
            <div>
              <span class="text-gray-600 block">Local government</span>
              <span class="font-medium">{{ application?.locationDetails?.localGovernment }}</span>
            </div>
            <div>
              <span class="text-gray-600 block">Zip code</span>
              <span class="font-medium">{{ application?.locationDetails?.zipCode }}</span>
            </div>
          </div>
        </div>

        <!-- Meet the owner -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-4">Meet the owner</h3>
          <div class="flex items-center gap-3">
            <img 
              :src="application?.user?.avatar" 
              :alt="application?.user?.name" 
              class="w-10 h-10 rounded-full"
            />
            <div>
              <div class="font-medium">{{ application?.user?.name }}</div>
              <div class="text-sm text-gray-600">Joined on {{ application?.user?.joinedOn }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  ArrowLeft, 
  Share, 
  ExternalLink, 
  Bed, 
  Bath, 
  Car, 
  FileText, 
  TrendingUp 
} from 'lucide-vue-next'
import type { Application } from '~/types'
import { useApplications } from '~/composables/useApplications'
import { computed } from 'vue'
import { defineProps } from 'vue'

interface Props {
  applicationId: string
}

const props = defineProps<Props>()

const { getApplicationById } = useApplications()
const application = computed(() => getApplicationById(props.applicationId))
</script>
