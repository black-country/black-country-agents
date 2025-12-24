<template>
  <main>
    <!-- Position the toast fixed to ensure it's always on top and aligned to the right -->
     <!-- <NetworkStatus /> -->
     <UiToast class="z-[9999999]" />

    <div v-if="!showSplash" class="transition-opacity duration-700 ease-in-out">
    <NuxtLayout class="z-10">
      <CoreSplashScreen />
      <NuxtPage class="z-10" />
    </NuxtLayout>
  </div>
  </main>
</template>

<script setup lang="ts">
const showSplash = ref(true)

onMounted(() => {
  setTimeout(() => {
    showSplash.value = false
  }, 3000)
})
</script>