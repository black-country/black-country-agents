<!-- <template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" @click.self="closeModal">
         <slot />
    </div>
</template>


<script lang="ts" setup>
// Props for controlling the modal's visibility
const props = defineProps({
    isOpen: {
    type: Boolean,
    required: true,
    default: false
},
});

// Emit event to close the modal
const emit = defineEmits(['close']);

// Close modal function
const closeModal = () => {
emit('close');
};

</script> -->

<template>
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      @click.self="closeModal"
    >
      <!-- Added wrapper with margin/padding for spacing -->
      <div class="bg-white rounded-lg p-2 mx-4 my-4 max-h-[60%] overflow-y-auto custom-scrollbar">
        <slot />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
      default: false
    },
  });
  
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    emit('close');
  };
  </script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cccccc #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background-color: #cccccc;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cccccc;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #cccccc;
}
</style>
  