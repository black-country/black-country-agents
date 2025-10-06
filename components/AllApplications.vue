<template>
  <div>
    <ApplicationsTable 
      :applications="userApplications" 
      @application-action="handleApplicationAction"
    />
  </div>
</template>

<script setup lang="ts">
import type { User, Application } from '~/types'
import { useApplications } from '~/composables/useApplications'
import { computed } from 'vue'
import { navigateTo } from '#app'

interface Props {
  user: User | undefined
}

defineProps<Props>()

const { getUserApplications } = useApplications()
const userApplications = computed(() => getUserApplications())

const handleApplicationAction = (action: string, application: Application) => {
  if (action === 'view') {
    navigateTo(`/applications/${application.id}`)
  }
}
</script>
