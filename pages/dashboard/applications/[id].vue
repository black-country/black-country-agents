<template>
  <div class="container mx-auto p-6">
    <ApplicationDetails :application-id="applicationId" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

definePageMeta({
  title: 'Application Details',
  layout: 'dashboard'
});

const route = useRoute();
const applicationId = route.params.id as string;
</script>


<!-- <template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ApplicationsDetails :application-id="applicationId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { definePageMeta } from '#imports';

const route = useRoute();
const applicationId = computed(() => route.params.id as string);

definePageMeta({
  title: 'Application Details'
});
</script> -->
