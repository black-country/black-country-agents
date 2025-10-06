<template>
  <div>
    <main class="p-6">
      <div class="mb-6">
        <button 
          @click="$router.back()"
          class="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-4"
        >
          <ChevronLeftIcon class="w-4 h-4" />
          <span>Back</span>
        </button>
        
        <h1 class="text-2xl font-bold text-gray-900">Application Details</h1>
      </div>

      <div class="grid grid-cols-3 gap-8">
        <!-- Left Column - Main Content -->
        <div class="col-span-2 space-y-6">
          <!-- Property Info -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-start space-x-4">
              <img 
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                alt="Property"
                class="w-24 h-20 rounded-lg object-cover"
              />
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="font-semibold text-gray-900">Luxury Home in Bali</h3>
                    <p class="text-blue-600 font-medium">₦350,000/night</p>
                    <div class="flex items-center space-x-4 mt-2 text-sm text-[#525866]">
                      <span class="flex items-center space-x-1">
                        <HomeIcon class="w-4 h-4" />
                        <span>2</span>
                      </span>
                      <span class="flex items-center space-x-1">
                        <Square3Stack3DIcon class="w-4 h-4" />
                        <span>2</span>
                      </span>
                      <span class="flex items-center space-x-1">
                        <CubeIcon class="w-4 h-4" />
                        <span>3</span>
                      </span>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <button class="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                      <ShareIcon class="w-4 h-4" />
                      <span>Share</span>
                    </button>
                    <button class="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                      <EyeIcon class="w-4 h-4" />
                      <span>View Property</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Personal Details -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Personal Details</h3>
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700">Zip code</label>
                <p class="text-sm text-gray-900">{{ application?.personalDetails.zipCode }}</p>
              </div>
            </div>
          </div>

          <!-- Meet the owner -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Meet the owner</h3>
            <div class="flex items-center space-x-3">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="John Doe"
                class="w-10 h-10 rounded-full"
              />
              <div>
                <p class="font-medium text-gray-900">John Doe</p>
                <p class="text-sm text-gray-500">Joined on Jul 2, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-8 flex justify-center space-x-4">
        <button class="px-8 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
          Reject
        </button>
        <button class="px-8 py-2 bg-[#2970FF] text-white rounded-lg hover:bg-blue-700">
          Accept
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { 
  ChevronLeftIcon,
  HomeIcon,
  Square3Stack3DIcon,
  CubeIcon,
  ShareIcon,
  EyeIcon,
  DocumentIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/vue/24/outline'
import type { Application } from '~/types'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()

// Mock application data
const application = ref<Application>({
  id: route.params.applicationId as string,
  applicantName: 'John Doe',
  applicantEmail: 'johndoe@gmail.com',
  applicantPhone: '+234709387392',
  dateApplied: '19 Nov. 23',
  status: 'Shortlisted',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  documents: [],
  offerPrice: 200000,
  personalDetails: {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phone: '+234709387392',
    currentAddress: '8502 Preston Rd. Inglewood, Maine 98380',
    country: 'Nigeria',
    state: 'Lagos',
    city: 'Bajulaye',
    localGovernment: 'Somolu',
    zipCode: '122302'
  },
  letterOfIntent: 'Figma ipsum component variant main layer. Effect layer arrange slice flatten shadow mask bullet. Pen shadow resizing frame selection arrange. Scale overflow resizing export invite device. Blur flows thumbnail variant duplicate bullet. Union stroke background. Asset scrolling background list pencil flatten shadow. Background move team rotate select. Project stroke edit component distribute background line fill stroke. Pencil thumbnail frame ellipse edit shadow resizing component. Flatten link layout select slice figma scale overflow. Object comment vector slice project background duplicate shadow project. Background move team rotate select. Project stroke edit component distribute background line fill group stroke. Pencil thumbnail frame ellipse edit shadow resizing component. Flatten link layout select slice figma scale overflow. Object comment vector slice project background duplicate shadow project. Asset scrolling background object effect outline. Export flatten distribute hand share bold. Create asset community asset follower scrolling variant auto. Image align select figma scale overflow. Object comment vector slice project background duplicate shadow project. Subtract list inspect horizontal create. List boolean selection frame content subtract stroke selection pencil inspect, Asset scrolling background object effect outline.'
})

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'Rejected': 'bg-red-100 text-red-800',
    'Shortlisted': 'bg-purple-100 text-purple-800',
    'Under Review': 'bg-yellow-100 text-yellow-800',
    'In Review': 'bg-yellow-100 text-yellow-800',
    'Accepted': 'bg-green-100 text-green-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}
</script>