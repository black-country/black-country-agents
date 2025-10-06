<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900">Rent Rate</h3>
      <div class="flex items-center space-x-4">
        <select v-model="selectedYear" class="px-3 py-1 border border-gray-300 rounded text-sm">
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
        <select v-model="selectedPeriod" class="px-3 py-1 border border-gray-300 rounded text-sm">
          <option value="Year">Year</option>
          <option value="Month">Month</option>
        </select>
      </div>
    </div>
    
    <div class="h-80">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const selectedYear = ref('2024')
const selectedPeriod = ref('Year')

const chartData = computed(() => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
    data: [800, 950, 600, 850, 550, 900, 750, 800, 750, 850, 950, 700],
    backgroundColor: '#3B82F6',
    borderRadius: 4,
    maxBarThickness: 40
  }]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true,
      max: 1000,
      ticks: {
        stepSize: 200
      }
    }
  }
}))
</script>
