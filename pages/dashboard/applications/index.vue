<template>
  <div class="min-h-screen">
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <ApplicationsList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

// Page meta
definePageMeta({
  title: 'Applications Management',
  layout: 'dashboard'
})
</script>
