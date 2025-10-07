import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRouter } from "next/navigation"
<template>
  <div v-if="application" class="bg-white rounded-lg shadow">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <button @click="goBack" class="mr-4 text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 class="text-2xl font-semibold text-[#0C111D]">Application Details</h1>
        </div>
        <div class="flex gap-3">
          <button class="px-4 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50">
            Reject
          </button>
          <button class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Shortlist
          </button>
        </div>
      </div>
    </div>

    <div class="p-6">
      <!-- Property Info -->
      <div class="flex items-start justify-between mb-8">
        <div class="flex items-start">
          <img :src="application.property.image" :alt="application.property.name" class="w-20 h-20 rounded-lg mr-4" />
          <div>
            <p class="text-sm text-blue-600 font-medium">{{ application.property.price }}</p>
            <h2 class="text-xl font-semibold text-[#0C111D] mb-2">{{ application.property.name }}</h2>
            <div class="flex items-center text-sm text-gray-600 space-x-4">
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                {{ application.property.bedrooms }}
              </span>
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
                {{ application.property.bathrooms }}
              </span>
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                {{ application.property.area }}
              </span>
            </div>
            <div class="flex items-center mt-2 space-x-4">
              <button class="flex items-center text-sm text-gray-600 hover:text-gray-800">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share
              </button>
              <button class="flex items-center text-sm text-gray-600 hover:text-gray-800">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Property
              </button>
            </div>
          </div>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-600 mb-1">Offer Price</p>
          <p class="text-2xl font-bold text-[#0C111D]">{{ application.offerPrice }}</p>
          <p class="text-sm text-green-600">↓ 20%</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Personal Details -->
        <div>
          <h3 class="text-lg font-semibold text-[#0C111D] mb-4">Personal Details</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-600">Name</p>
                <p class="font-medium">{{ application.applicant.name }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Email Address</p>
                <p class="font-medium">{{ application.applicant.email }}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-600">Date Applied</p>
                <p class="font-medium">{{ application.dateApplied }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Phone Number</p>
                <p class="font-medium">{{ application.applicant.phone }}</p>
              </div>
            </div>
            <div>
              <p class="text-sm text-gray-600">Status</p>
              <StatusBadge :status="application.status" />
            </div>
          </div>

          <!-- Documents -->
          <h3 class="text-lg font-semibold text-[#0C111D] mt-8 mb-4">Documents</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-600">NIN Number</p>
                <p class="font-medium">{{ application.documents.ninNumber }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">NIN Document</p>
                <div class="flex items-center space-x-2">
                  <button class="text-blue-600 hover:text-blue-800 text-sm">{{ application.documents.ninDocument }}</button>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <p class="text-sm text-gray-600">Payslip for last 3 months</p>
              <div class="flex items-center space-x-2">
                <button class="text-blue-600 hover:text-blue-800 text-sm">{{ application.documents.payslip }}</button>
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Location Details -->
        <div>
          <h3 class="text-lg font-semibold text-[#0C111D] mb-4">Location Details</h3>
          <div class="space-y-4">
            <div>
              <p class="text-sm text-gray-600">Current Address</p>
              <p class="font-medium">{{ application.location.currentAddress }}</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-600">Country</p>
                <div class="flex items-center">
                  <span class="mr-2">{{ application.location.flag }}</span>
                  <span class="font-medium">{{ application.location.country }}</span>
                </div>
              </div>
              <div>
                <p class="text-sm text-gray-600">State</p>
                <p class="font-medium">{{ application.location.state }}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-600">City</p>
                <p class="font-medium">{{ application.location.city }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">local government</p>
                <p class="font-medium">{{ application.location.localGovernment }}</p>
              </div>
            </div>
            <div>
              <p class="text-sm text-gray-600">Zip code</p>
              <p class="font-medium">{{ application.location.zipCode }}</p>
            </div>
          </div>

          <!-- Meet the owner -->
          <h3 class="text-lg font-semibold text-[#0C111D] mt-8 mb-4">Meet the owner</h3>
          <div class="flex items-center">
            <img :src="application.owner.avatar" :alt="application.owner.name" class="w-12 h-12 rounded-full mr-3" />
            <div>
              <p class="font-medium text-[#0C111D]">{{ application.owner.name }}</p>
              <p class="text-sm text-gray-600">Joined on {{ application.owner.joinedDate }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Letter of Intent -->
      <div class="mt-8">
        <h3 class="text-lg font-semibold text-[#0C111D] mb-4">Letter of Intent</h3>
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-700 leading-relaxed">{{ application.letterOfIntent }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-12">
    <p class="text-gray-500">Application not found</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  applicationId: string
}

const props = defineProps<Props>()
const router = useRouter()
const { getApplicationById } = useApplications()

const application = computed(() => getApplicationById(props.applicationId))

const goBack = () => {
  router.push('/')
}
</script>
