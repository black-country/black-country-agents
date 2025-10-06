<template>
  <div v-if="user" class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <FileText class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="text-sm text-gray-600">Total Application Sent</p>
            <p class="text-2xl font-semibold">{{ user.totalApplicationsSent.toLocaleString() }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Clock class="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p class="text-sm text-gray-600">Total Browsing Time</p>
            <p class="text-2xl font-semibold">{{ user.totalBrowsingTime }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <DollarSign class="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p class="text-sm text-gray-600">Total Money Spent</p>
            <p class="text-2xl font-semibold">${{ user.totalMoneySpent.toLocaleString() }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Eye class="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p class="text-sm text-gray-600">Viewed Property</p>
            <p class="text-2xl font-semibold">{{ user.viewedProperty.toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Information Sections -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Basic Information -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Basic Information</h3>
        <div class="space-y-4">
          <div class="flex justify-between">
            <span class="text-gray-600">Full Name</span>
            <span class="font-medium">{{ user.name }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Email Address</span>
            <div class="flex items-center gap-2">
              <span class="font-medium">{{ user.email }}</span>
              <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Verified</span>
            </div>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Phone Number</span>
            <div class="flex items-center gap-2">
              <span class="font-medium">{{ user.phone }}</span>
              <span class="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Pending</span>
            </div>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Location</span>
            <span class="font-medium">{{ user.location }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Date of Birth</span>
            <span class="font-medium">{{ user.dateOfBirth }}</span>
          </div>
        </div>
      </div>

      <!-- Account Information -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Account Information</h3>
        <div class="space-y-4">
          <div class="flex justify-between">
            <span class="text-gray-600">Username</span>
            <span class="font-medium">{{ user.username }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Password</span>
            <span class="font-medium">{{ user.password }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Joined on</span>
            <span class="font-medium">{{ user.joinedOn }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Last Login</span>
            <span class="font-medium">{{ user.lastLogin }}</span>
          </div>
        </div>
      </div>

      <!-- Address Information -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Address Information</h3>
        <div class="space-y-4">
          <div>
            <span class="text-gray-600 block">Current Address</span>
            <span class="font-medium">{{ user.currentAddress }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Preferred Location</span>
            <span class="font-medium">{{ user.preferredLocation }}</span>
          </div>
        </div>
      </div>

      <!-- Saved Application Info -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Saved Application Info</h3>
        <div class="space-y-4">
          <div class="flex justify-between">
            <span class="text-gray-600">NIN Number</span>
            <span class="font-medium">{{ user.ninNumber }}</span>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { FileText, Clock, DollarSign, Eye } from 'lucide-vue-next'
import type { User } from '~/types'

interface Props {
  user: User | undefined
}

defineProps<Props>()
</script>
