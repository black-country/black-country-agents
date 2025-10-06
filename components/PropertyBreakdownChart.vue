<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-6">Property Breakdown</h3>
    
    <div class="flex items-center justify-center mb-6">
      <div class="relative w-48 h-48">
        <Doughnut :data="chartData" :options="chartOptions" />
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <div class="text-sm text-gray-500">Total Property</div>
            <div class="text-2xl font-bold text-gray-900">548</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span class="text-sm text-gray-600">Vacant</span>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <span class="text-sm text-gray-600">Rented</span>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-pink-500 rounded-full"></div>
          <span class="text-sm text-gray-600">Purchased</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const chartData = computed(() => ({
  datasets: [{
    data: [60, 25, 15],
    backgroundColor: ['#3B82F6', '#FBBF24', '#EC4899'],
    borderWidth: 0,
    cutout: '70%'
  }]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: false
    }
  }
}))
</script>
