<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-bold text-gray-900 mb-6">Amenities</h2>
    
    <div class="space-y-8">
      <!-- Basics -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Basics</h3>
          <button class="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
            <PlusIcon class="w-4 h-4" />
            <span class="text-sm">New Amenity</span>
          </button>
        </div>
        <div class="flex flex-wrap gap-3">
          <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200">
            <DocumentIcon class="w-4 h-4 mr-2" />
            Toilet paper
          </span>
          <span class="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200">
            <Square2StackIcon class="w-4 h-4 mr-2" />
            Towel
          </span>
          <span class="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200">
            <CubeIcon class="w-4 h-4 mr-2" />
            Pillow
          </span>
        </div>
      </div>

      <!-- Bathroom -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Bathroom</h3>
          <button class="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
            <PlusIcon class="w-4 h-4" />
            <span class="text-sm">New Amenity</span>
          </button>
        </div>
        <div class="flex flex-wrap gap-3">
          <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200">
            <BeakerIcon class="w-4 h-4 mr-2" />
            Shower
          </span>
          <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200">
            <RectangleStackIcon class="w-4 h-4 mr-2" />
            Bathtub
          </span>
          <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200">
            <FireIcon class="w-4 h-4 mr-2" />
            Hair Dryer
          </span>
          <span class="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200">
            <DropletIcon class="w-4 h-4 mr-2" />
            Hot Water
          </span>
        </div>
      </div>

      <!-- Bedroom and Laundry -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Bedroom and Laundry</h3>
          <button class="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
            <PlusIcon class="w-4 h-4" />
            <span class="text-sm">New Amenity</span>
          </button>
        </div>
        <div class="flex flex-wrap gap-3">
          <span class="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200">
            <Bars3Icon class="w-4 h-4 mr-2" />
            Hangers
          </span>
          <span class="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200">
            <SquaresPlusIcon class="w-4 h-4 mr-2" />
            Iron
          </span>
          <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200">
            <CogIcon class="w-4 h-4 mr-2" />
            Washer
          </span>
          <span class="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200">
            <SunIcon class="w-4 h-4 mr-2" />
            Dryer
          </span>
        </div>
      </div>

      <!-- Entertainment -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Entertainment</h3>
          <button class="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
            <PlusIcon class="w-4 h-4" />
            <span class="text-sm">New Amenity</span>
          </button>
        </div>
        <div class="flex flex-wrap gap-3">
          <span class="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200">
            <TvIcon class="w-4 h-4 mr-2" />
            Tv
          </span>
          <span class="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200">
            <DevicePhoneMobileIcon class="w-4 h-4 mr-2" />
            Game Console
          </span>
          <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200">
            <BookOpenIcon class="w-4 h-4 mr-2" />
            Books
          </span>
          <span class="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200">
            <PuzzlePieceIcon class="w-4 h-4 mr-2" />
            Board Games
          </span>
        </div>
      </div>

      <!-- Internet and Office -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Internet and Office</h3>
          <button class="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
            <PlusIcon class="w-4 h-4" />
            <span class="text-sm">New Amenity</span>
          </button>
        </div>
        <div class="flex flex-wrap gap-3">
          <span class="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200">
            <WifiIcon class="w-4 h-4 mr-2" />
            Wi-Fi
          </span>
          <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200">
            <BriefcaseIcon class="w-4 h-4 mr-2" />
            Dedicated Workspace
          </span>
          <span class="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200">
            <PrinterIcon class="w-4 h-4 mr-2" />
            Printer
          </span>
        </div>
      </div>

      <!-- Parking and Facilities -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Parking and Facilities</h3>
          <button class="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
            <PlusIcon class="w-4 h-4" />
            <span class="text-sm">New Amenity</span>
          </button>
        </div>
        <div class="flex flex-wrap gap-3">
          <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200">
            <MapPinIcon class="w-4 h-4 mr-2" />
            Free Parking
          </span>
          <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200">
            <BoltIcon class="w-4 h-4 mr-2" />
            EV Charger
          </span>
        </div>
      </div>

      <!-- Services -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Services</h3>
          <button class="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
            <PlusIcon class="w-4 h-4" />
            <span class="text-sm">New Amenity</span>
          </button>
        </div>
        <div class="flex flex-wrap gap-3">
          <span class="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200">
            <HeartIcon class="w-4 h-4 mr-2" />
            Pets Allowed
          </span>
          <span class="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200">
            <ClockIcon class="w-4 h-4 mr-2" />
            Long-Term Stays
          </span>
          <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200">
            <FireIcon class="w-4 h-4 mr-2" />
            Smoking Allowed
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  PlusIcon,
  DocumentIcon,
  Square2StackIcon,
  CubeIcon,
  BeakerIcon,
  RectangleStackIcon,
  FireIcon,
  Bars3Icon,
  SquaresPlusIcon,
  CogIcon,
  SunIcon,
  TvIcon,
  DevicePhoneMobileIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
  BriefcaseIcon,
  PrinterIcon,
  MapPinIcon,
  BoltIcon,
  HeartIcon,
  ClockIcon
} from '@heroicons/vue/24/outline'

// Custom icons
const DropletIcon = {
  template: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.5 8.5L12 4l4.5 4.5c2.5 2.5 2.5 6.5 0 9s-6.5 2.5-9 0-2.5-6.5 0-9z"/></svg>`
}

const WifiIcon = {
  template: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/></svg>`
}

interface Props {
  property: any
}

defineProps<Props>()
</script>