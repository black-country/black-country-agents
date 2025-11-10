<template>
	<div>
      <UiToast class="z-[9999999]" />
       <NetworkStatus />
       <NuxtPage />
	</div>
</template>

<script setup lang="ts">
import NetworkStatus from "@/components/Core/NetworkStatus.vue"
definePageMeta({
  middleware: 'auth'
})
</script>

