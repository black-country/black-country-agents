<template>
    <div class="relative group">
      <div class="p-2 z-[9999999999px] cursor-pointer flex justify-center items-center mx-3" :class="{ 'bg-[#5B8469] rounded-lg': isActive }">
        <NuxtLink :to="to" class="relative">
          <slot></slot>
          <!-- Tooltip -->
          <div class="invisible z-[9999999999px] group-hover:visible absolute left-full ml-2 px-6 py-2.5 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
            {{ text }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup> 
  defineProps<{
    to: string;
    text: string;
    isActive?: boolean;
  }>();
  </script>