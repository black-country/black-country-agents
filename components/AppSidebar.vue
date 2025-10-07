<template>
  <div class="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-40">
    <div class="p-4">
      <div class="flex items-center space-x-2 mb-8">
        <div class="w-8 h-8 bg-[#2970FF] rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </div>
        <div>
          <h1 class="font-bold text-[#0C111D]">Horizon</h1>
          <p class="text-xs text-gray-500">Properties</p>
        </div>
      </div>

      <nav class="space-y-2">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.name"
          :to="item.href"
          :class="[
            'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium',
            $route.path === item.href
              ? 'bg-gray-100 text-[#0C111D]'
              : 'text-[#525866] hover:bg-gray-50 hover:text-[#0C111D]'
          ]"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span>{{ item.name }}</span>
        </NuxtLink>
      </nav>
    </div>

    <!-- Upgrade Banner -->
    <div class="absolute bottom-4 left-4 right-4">
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="font-semibold text-sm text-[#0C111D] mb-1">Get horizon pro</h3>
        <p class="text-xs text-[#525866] mb-3">
          For as low as $15/month. You get a access a whole new features
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  HomeIcon, 
  UsersIcon, 
  BuildingOfficeIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  UserIcon
} from '@heroicons/vue/24/outline'

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Owners', href: '/dashboard/owners', icon: UsersIcon },
  { name: 'Properties', href: '/dashboard/properties', icon: BuildingOfficeIcon },
  { name: 'Users', href: '/dashboard/users', icon: UserGroupIcon },
  { name: 'Application', href: '/dashboard/applications', icon: Cog6ToothIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
]
</script>