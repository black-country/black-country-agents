<template>
  <div class="space-y-6 container mx-auto p-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div class="flex items-center space-x-4">
        <select class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>All Product</option>
        </select>
        <select class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>Today</option>
        </select>
      </div>
    </div>

    <!-- Metrics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Total Revenue"
        value="$400,000"
        change="10.34%"
        trend="up"
        icon="dollar-sign"
      />
      <MetricCard
        title="Total Properties"
        value="548"
        change="22.9%"
        trend="up"
        icon="building"
      />
      <MetricCard
        title="Total Users"
        value="54,880"
        change="22.9%"
        trend="up"
        icon="users"
      />
      <MetricCard
        title="Total Owners"
        value="548"
        change="22.9%"
        trend="up"
        icon="user-check"
      />
      <MetricCard
        title="Total Application"
        value="240,500"
        change="22.9%"
        trend="up"
        icon="file-text"
        class="md:col-span-2 lg:col-span-1"
      />
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Rent Rate Chart -->
      <div class="lg:col-span-2">
        <RentRateChart />
      </div>
      
      <!-- Property Breakdown -->
      <div>
        <PropertyBreakdownChart />
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Total Traffic -->
      <div>
        <TrafficStatsCard />
      </div>
      
      <!-- Purchase Rate Chart -->
      <div>
        <PurchaseRateChart />
      </div>
      
      <!-- Recent Activity -->
      <!-- <div class="lg:col-span-1">
        <RecentActivityCard @view-all="toggleAllActivities" />
      </div> -->
    </div>

    <!-- Bottom Cards Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <TopAgentsCard @view-all="toggleTopOwners" />
        <RecentActivityCard @view-all="toggleAllActivities" />
      <CustomerLocationCard @view-all="toggleCustomerLocation" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';

const toggleCustomerLocation = inject('toggleCustomerLocation') as () => void;
const toggleTopOwners = inject('toggleTopOwners') as () => void;
const toggleAllActivities = inject('toggleAllActivities') as () => void;

definePageMeta({
  layout: 'dashboard'
})
</script>
