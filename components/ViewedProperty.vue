<template>
  <div>
    <PropertiesTable 
      :properties="viewedProperties" 
      @property-action="handlePropertyAction"
    />
  </div>
</template>

<script setup lang="ts">
import type { User, Property } from '~/types'
import { computed } from 'vue'
import { useProperties } from '~/composables/useProperties'

interface Props {
  user: User | undefined
}

defineProps<Props>()

const { getViewedProperties } = useProperties()
const viewedProperties = computed(() => getViewedProperties())

const handlePropertyAction = (action: string, property: Property) => {
  console.log(`Property action: ${action}`, property)
}
</script>
