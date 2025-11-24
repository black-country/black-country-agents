<!-- <template>
  <main>
    <div class="flex items-center p-4 border-gray-25 border-t-[0.5px] relative border-gray-200">
      <button
        @click="triggerFileInput"
        :disabled="loading || isSending || !isConnected"
        class="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition-colors absolute top-7 left-12 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg v-if="!loading" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.33325 10.0005V12.1206C3.33325 14.8247 3.33325 16.1769 4.07164 17.0926C4.22082 17.2776 4.38934 17.4462 4.57436 17.5954C5.49018 18.3338 6.84227 18.3338 9.54642 18.3338C10.1344 18.3338 10.4283 18.3338 10.6976 18.2388C10.7536 18.219 10.8084 18.1963 10.862 18.1706C11.1196 18.0475 11.3274 17.8396 11.7432 17.4239L15.6903 13.4767C16.172 12.9951 16.4128 12.7541 16.5398 12.4479C16.6666 12.1416 16.6666 11.801 16.6666 11.1197V8.3338C16.6666 5.19107 16.6666 3.61973 15.6903 2.64341C14.8077 1.76078 13.4387 1.67609 10.862 1.66797M10.8333 17.9171V17.5005C10.8333 15.1434 10.8333 13.9649 11.5655 13.2326C12.2978 12.5005 13.4763 12.5005 15.8333 12.5005H16.2499" stroke="#1D2739" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9.99992 4.99935H3.33325M6.66659 1.66602V8.33268" stroke="#1D2739" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else class="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </button>

      <input
        ref="fileInput"
        type="file"
        @change="handleFileSelect"
        class="hidden"
        accept="image/*,.pdf,.doc,.docx,.txt,.zip,.rar"
      />

      <input
        type="text"
        v-model="localMessage"
        @keydown.enter="emitMessage"
        :disabled="loading || isSending || !isConnected"
        class="flex-1 ml-4 p-2 py-6 text-white pl-20 bg-[#292929] rounded-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-[#E4E7EC]"
        :placeholder="getPlaceholder"
      />

      <button
        @click="emitMessage"
        :disabled="loading || isSending || !isConnected || !canSend"
        class="ml-4 text-white p-3 transition-colors absolute top-5 right-6 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="18" :fill="canSend ? '#5B8469' : '#9CA3AF'"/>
          <path d="M15.9247 11.5258L23.0581 15.0925C26.2581 16.6925 26.2581 19.3092 23.0581 20.9092L15.9247 24.4758C11.1247 26.8758 9.1664 24.9092 11.5664 20.1175L12.2914 18.6758C12.4747 18.3092 12.4747 17.7008 12.2914 17.3342L11.5664 15.8842C9.1664 11.0925 11.1331 9.12584 15.9247 11.5258Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12.5332 18H17.0332" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div v-if="uploadResponse && !loading" class="absolute bottom-full left-4 mb-2 bg-white border-[0.5px] border-gray-50 rounded-lg p-3 shadow-lg max-w-sm w-full">
        <div class="flex items-start gap-3">
          <div v-if="isImage" class="flex-shrink-0">
            <img 
              :src="uploadResponse.url" 
              :alt="getFileName"
              class="w-16 h-16 object-cover rounded border border-gray-200"
            />
          </div>
          

          <div v-else-if="isPDF" class="flex-shrink-0 w-16 h-16 bg-red-50 rounded border border-red-200 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <polyline points="14 2 14 8 20 8" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="12" y="16" font-size="5" text-anchor="middle" fill="#DC2626" font-weight="bold">PDF</text>
            </svg>
          </div>
          
          <div v-else class="flex-shrink-0 w-16 h-16 bg-green-50 rounded border border-green-200 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.6667 1.66699H5.00001C4.55798 1.66699 4.13406 1.84259 3.82149 2.15515C3.50893 2.46771 3.33334 2.89163 3.33334 3.33366V16.667C3.33334 17.109 3.50893 17.5329 3.82149 17.8455C4.13406 18.1581 4.55798 18.3337 5.00001 18.3337H15C15.442 18.3337 15.866 18.1581 16.1785 17.8455C16.4911 17.5329 16.6667 17.109 16.6667 16.667V6.66699L11.6667 1.66699Z" stroke="#5B8469" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11.667 1.66699V6.66699H16.667" stroke="#5B8469" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ getFileName }}
            </p>
            <p class="text-xs text-gray-500 mt-1">
              {{ getFileType }} • Ready to send
            </p>
          </div>

          <button @click="clearFile" class="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div v-if="uploadError" class="absolute bottom-full left-4 mb-2 bg-red-50 border border-red-200 rounded-lg p-3 shadow-lg flex items-center gap-2 max-w-xs">
        <svg class="flex-shrink-0 text-red-500" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="text-sm text-red-700 flex-1">{{ uploadError }}</span>
        <button @click="uploadError = ''" class="text-red-500 hover:text-red-700 flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </main>
</template> -->


<template>
  <main>
    <div class="flex items-center p-4 border-gray-25 border-t-[0.5px] relative border-gray-200">
      <!-- File Upload Button -->
      <button
        @click="triggerFileInput"
        :disabled="loading || isSending || !isConnected"
        class="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition-colors absolute top-7 left-12 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg v-if="!loading" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.33325 10.0005V12.1206C3.33325 14.8247 3.33325 16.1769 4.07164 17.0926C4.22082 17.2776 4.38934 17.4462 4.57436 17.5954C5.49018 18.3338 6.84227 18.3338 9.54642 18.3338C10.1344 18.3338 10.4283 18.3338 10.6976 18.2388C10.7536 18.219 10.8084 18.1963 10.862 18.1706C11.1196 18.0475 11.3274 17.8396 11.7432 17.4239L15.6903 13.4767C16.172 12.9951 16.4128 12.7541 16.5398 12.4479C16.6666 12.1416 16.6666 11.801 16.6666 11.1197V8.3338C16.6666 5.19107 16.6666 3.61973 15.6903 2.64341C14.8077 1.76078 13.4387 1.67609 10.862 1.66797M10.8333 17.9171V17.5005C10.8333 15.1434 10.8333 13.9649 11.5655 13.2326C12.2978 12.5005 13.4763 12.5005 15.8333 12.5005H16.2499" stroke="#1D2739" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9.99992 4.99935H3.33325M6.66659 1.66602V8.33268" stroke="#1D2739" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else class="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </button>

      <input
        ref="fileInput"
        type="file"
        @change="handleFileSelect"
        class="hidden"
        accept="image/*,.pdf,.doc,.docx,.txt,.zip,.rar"
      />

      <!-- Message Input -->
      <input
        type="text"
        v-model="localMessage"
        @keydown.enter="emitMessage"
        :disabled="loading || isSending || !isConnected"
        class="flex-1 ml-4 p-2 py-6 text-white pl-20 bg-[#292929] rounded-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-[#E4E7EC]"
        :placeholder="getPlaceholder"
      />

      <!-- Send Button -->
      <button
        @click="emitMessage"
        :disabled="loading || isSending || !isConnected || !canSend"
        class="ml-4 text-white p-3 transition-colors absolute top-5 right-6 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="18" :fill="canSend ? '#5B8469' : '#9CA3AF'"/>
          <path d="M15.9247 11.5258L23.0581 15.0925C26.2581 16.6925 26.2581 19.3092 23.0581 20.9092L15.9247 24.4758C11.1247 26.8758 9.1664 24.9092 11.5664 20.1175L12.2914 18.6758C12.4747 18.3092 12.4747 17.7008 12.2914 17.3342L11.5664 15.8842C9.1664 11.0925 11.1331 9.12584 15.9247 11.5258Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12.5332 18H17.0332" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- Upload Error Message -->
      <div v-if="uploadError" class="absolute bottom-full left-4 mb-2 bg-red-50 border border-red-200 rounded-lg p-3 shadow-lg flex items-center gap-2 max-w-xs">
        <svg class="flex-shrink-0 text-red-500" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="text-sm text-red-700 flex-1">{{ uploadError }}</span>
        <button @click="uploadError = ''" class="text-red-500 hover:text-red-700 flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </main>
</template>


<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useUploadFile } from "@/composables/core/upload";

const { uploadFile, loading, uploadResponse } = useUploadFile();

const props = defineProps({
  modelValue: String,
  isSending: {
    type: Boolean,
    default: false
  },
  isConnected: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['update:modelValue', 'sendMessage']);

const localMessage = ref(props.modelValue || '');
const fileInput = ref<HTMLInputElement | null>(null);
const uploadError = ref('');

watch(() => props.modelValue, (newVal) => {
  localMessage.value = newVal || '';
});

const getPlaceholder = computed(() => {
  if (!props.isConnected) return 'Not connected...';
  if (loading.value) return 'Uploading file...';
  if (props.isSending) return 'Sending...';
  return 'Type a message here...';
});

// const canSend = computed(() => {
//   return localMessage.value.trim().length > 0 && !uploadResponse.value;
// });

// Get file extension from URL or fileName
const getFileExtension = (fileNameOrUrl: string): string => {
  if (!fileNameOrUrl) return '';
  const parts = fileNameOrUrl.split('.');
  const extension = parts[parts.length - 1].toLowerCase();
  return extension.split('?')[0];
};

// Check if file is an image based on mimetype or extension
const isImage = computed(() => {
  if (!uploadResponse.value) return false;
  
  const mimetype = uploadResponse.value.mimetype || '';
  const fileName = uploadResponse.value.fileName || uploadResponse.value.url || '';
  const ext = getFileExtension(fileName);
  
  return mimetype.startsWith('image/') || 
         ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(ext);
});

// Check if file is a PDF
const isPDF = computed(() => {
  if (!uploadResponse.value) return false;
  
  const mimetype = uploadResponse.value.mimetype || '';
  const fileName = uploadResponse.value.fileName || uploadResponse.value.url || '';
  const ext = getFileExtension(fileName);
  
  return mimetype === 'application/pdf' || ext === 'pdf';
});

// Get clean file name
const getFileName = computed(() => {
  if (!uploadResponse.value) return '';
  
  const fileName = uploadResponse.value.fileName || uploadResponse.value.url || '';
  const parts = fileName.split('/');
  const fullName = parts[parts.length - 1];
  
  return fullName.replace(/^\d+-/, '');
});

// Get file type display text
const getFileType = computed(() => {
  if (!uploadResponse.value) return 'File';
  
  if (isImage.value) return 'Image';
  if (isPDF.value) return 'PDF Document';
  
  const fileName = uploadResponse.value.fileName || uploadResponse.value.url || '';
  const ext = getFileExtension(fileName).toUpperCase();
  return ext ? `${ext} File` : 'Document';
});

const triggerFileInput = () => {
  if (fileInput.value && !loading.value && !props.isSending) {
    uploadError.value = '';
    fileInput.value.click();
  }
};

// const handleFileSelect = async (event: Event) => {
//   const target = event.target as HTMLInputElement;
//   const file = target.files?.[0];
  
//   if (!file) return;

//   const maxSize = 10 * 1024 * 1024;
//   if (file.size > maxSize) {
//     uploadError.value = 'File size must be less than 10MB';
//     if (fileInput.value) {
//       fileInput.value.value = '';
//     }
//     return;
//   }

//   try {
//     await uploadFile(file);
    
//     if (uploadResponse.value) {
//       uploadError.value = '';
//       // Auto-send file after successful upload
//       await sendFileMessage();
//     }
//   } catch (error: any) {
//     console.error('File upload error:', error);
//     uploadError.value = error.message || 'Failed to upload file. Please try again.';
//     if (fileInput.value) {
//       fileInput.value.value = '';
//     }
//   }
// };

// const sendFileMessage = async () => {
//   if (!uploadResponse.value) return;

//   const content = JSON.stringify({
//     type: 'file',
//     file: {
//       url: uploadResponse.value.url,
//       fileName: uploadResponse.value.fileName,
//       mimetype: uploadResponse.value.mimetype,
//     },
//     message: localMessage.value.trim() || ''
//   });

//   emit('sendMessage', content);
  
//   // Clear everything after sending
//   localMessage.value = '';
//   emit('update:modelValue', '');
//   clearFile();
// };

// const clearFile = () => {
//   uploadResponse.value = null;
//   uploadError.value = '';
//   if (fileInput.value) {
//     fileInput.value.value = '';
//   }
// };

// Update handleFileSelect to auto-send:
const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (!file) return;

  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    uploadError.value = 'File size must be less than 10MB';
    if (fileInput.value) {
      fileInput.value.value = '';
    }
    return;
  }

  try {
    await uploadFile(file);
    
    if (uploadResponse.value) {
      uploadError.value = '';
      // Auto-send file immediately after successful upload
      await sendFileMessage();
    }
  } catch (error: any) {
    console.error('File upload error:', error);
    uploadError.value = error.message || 'Failed to upload file. Please try again.';
    if (fileInput.value) {
      fileInput.value.value = '';
    }
  }
};

// Update sendFileMessage to ensure proper cleanup:
const sendFileMessage = async () => {
  if (!uploadResponse.value) return;

  const content = JSON.stringify({
    type: 'file',
    file: {
      url: uploadResponse.value.url,
      fileName: uploadResponse.value.fileName,
      mimetype: uploadResponse.value.mimetype,
    },
    message: localMessage.value.trim() || ''
  });

  emit('sendMessage', content);
  
  // Clear everything immediately
  localMessage.value = '';
  emit('update:modelValue', '');
  
  // Use nextTick to ensure state is cleared
  await nextTick();
  clearFile();
};

// Update emitMessage to ensure input is cleared:
const emitMessage = () => {
  if (!localMessage.value.trim() || uploadResponse.value) return;
  if (!props.isConnected || props.isSending || loading.value) return;

  const content = localMessage.value.trim();
  
  emit('sendMessage', content);
  
  // Clear immediately using nextTick
  nextTick(() => {
    localMessage.value = '';
    emit('update:modelValue', '');
  });
};

// Update clearFile function:
const clearFile = () => {
  uploadResponse.value = null;
  uploadError.value = '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

// Remove the file preview from template since files auto-send
// Update the computed canSend to allow sending without file preview:
const canSend = computed(() => {
  return localMessage.value.trim().length > 0 && !loading.value;
});
// const emitMessage = () => {
//   // Only send text messages through this method
//   if (!localMessage.value.trim() || uploadResponse.value) return;
//   if (!props.isConnected || props.isSending || loading.value) return;

//   const content = localMessage.value.trim();
  
//   emit('sendMessage', content);
  
//   // Clear input immediately
//   localMessage.value = '';
//   emit('update:modelValue', '');
// };
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>