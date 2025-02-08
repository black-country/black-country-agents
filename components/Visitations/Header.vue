<template>
  <div class="lg:flex flex-wrap space-y-6 lg:space-y-0 mx-6 lg:mx-auto justify-between items-center gap-4 p-4">
    <!-- View Mode Buttons -->
    <section class="flex items-center gap-x-4">
      <button
        :class="[
          'px-10 py-3 rounded-md font-medium transition-colors text-sm',
          isGridView ? 'bg-[#5B8469] text-white' : 'bg-[#F0F2F5] text-[#1A1A1A]'
        ]"
        @click="changeViewMode('grid')"
      >
        Grid
      </button>
      <button
        :class="[
          'px-10 py-3 rounded-md font-medium transition-colors text-sm',
          !isGridView ? 'bg-[#5B8469] text-white' : 'bg-[#F0F2F5] text-[#1A1A1A]'
        ]"
        @click="changeViewMode('calendar')"
      >
        Calendar
      </button>
    </section>

    <section class="lg:flex items-center gap-x-4">
      <slot name="filters"></slot>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useGetProperties } from "@/composables/modules/property/fetchProperties";
const { propertiesList, loadingProperties } =
  useGetProperties();
import { ref, defineEmits } from 'vue'

// const emit = defineEmits(['setTab', 'viewModeChange']);

// State for toggling between Grid and Calendar views
const isGridView = ref(true);
const emit = defineEmits<{
  (e: 'viewModeChange', viewMode: string): void;
  (e: 'setTab', viewMode: string): void;
}>();

// Function to change view mode and emit the selected mode
const changeViewMode = (mode: string) => {
  isGridView.value = mode === 'grid';
  emit('setTab', mode);
};

// State for sort and property filter dropdowns
const sortOption = ref("most-recent");
const propertyOption = ref("all-properties");

// Search query state
const searchQuery = ref("");
</script>

<style scoped>
@media (max-width: 640px) {
  .flex-wrap {
    flex-direction: column;
  }
}
</style>
