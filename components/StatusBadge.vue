<template>
  <span :class="badgeClasses" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
    <span :class="dotClasses" class="w-1.5 h-1.5 rounded-full mr-1.5"></span>
    {{ statusText }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  status: 'in_review' | 'shortlisted' | 'rejected'
}

const props = defineProps<Props>()

const statusConfig = {
  in_review: {
    text: 'In review',
    badgeClass: 'bg-orange-100 text-orange-800',
    dotClass: 'bg-orange-400'
  },
  shortlisted: {
    text: 'Shortlisted',
    badgeClass: 'bg-blue-100 text-blue-800',
    dotClass: 'bg-blue-400'
  },
  rejected: {
    text: 'Rejected',
    badgeClass: 'bg-red-100 text-red-800',
    dotClass: 'bg-red-400'
  }
}

const config = computed(() => statusConfig[props.status])
const statusText = computed(() => config.value.text)
const badgeClasses = computed(() => config.value.badgeClass)
const dotClasses = computed(() => config.value.dotClass)
</script>
