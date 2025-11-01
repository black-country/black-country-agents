<template>
  <div class="min-h-screen bg-background flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <div class="-mt-20">
      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue';
import AppFooter from '~/components/AppFooter.vue';
</script>
