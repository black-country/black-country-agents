<!-- <template>
  <main class="flex">
    <div
      :class="isMine ? 'ml-auto bg-[#91D6A8]' : 'mr-auto bg-[#EBE5E0]'"
      class="p-3 rounded-lg z-10 max-w-xs mb-2 w-full"
    >
      <p class="text-[#1D2739]">{{ message.content }}</p>
      <small class="block text-gray-500 text-right">
        <p class="flex items-center gap-x-2 justify-end">
          {{ formatDate(message.createdAt) }}
          <svg v-if="isMine" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 9.38887C2 9.38887 3 9.83333 4.33333 11.8333C4.33333 11.8333 4.52323 11.5128 4.88089 11.0017" stroke="#099137" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.3333 4.5C9.80567 5.26385 8.20793 6.86787 6.92527 8.38153" stroke="#099137" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.3335 9.38887C5.3335 9.38887 6.3335 9.83333 7.66683 11.8333C7.66683 11.8333 11.3335 6.16667 14.6668 4.5" stroke="#099137" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-if="message.status === 'sending'" class="text-gray-400">Sending...</span>
          <span v-if="message.status === 'error'" class="text-red-500">Failed to send</span>
        </p>
      </small>
    </div>
  </main>
</template>

<script setup lang="ts">
const props = defineProps({
  message: {
    type: Object,
    required: true
  },
  messages: {
    type: Array,
    required: true
  },
  isMine: {
    type: Boolean,
    required: true
  },
});

// Format the `createdAt` property
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
</script> -->


<!-- <template>
  <div :class="['flex mb-2', isMine ? 'justify-end' : 'justify-start']">
    <div :class="[
      'max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl shadow-sm',
      isMine ? 'bg-[#5B8469] text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'
    ]">
    {{ message }}

      <div v-if="isFileMessage" class="space-y-2">

        <div v-if="isImageFile" class="rounded-lg overflow-hidden">
          <img 
            :src="fileData.file.url" 
            :alt="fileData.file.original_filename || 'Image'"
            class="max-w-full h-auto max-h-80 cursor-pointer hover:opacity-90 transition-opacity"
            @click="openFile(fileData.file.secure_url)"
            loading="lazy"
          />
        </div>
        

        <div v-else class="flex items-center gap-3 p-3 rounded-lg" :class="isMine ? 'bg-white/10 border border-white/20' : 'bg-white border border-gray-200'">
          <div class="flex-shrink-0">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.667 2.66699H8.00001C7.29277 2.66699 6.61449 2.9481 6.11439 3.4482C5.61429 3.9483 5.33334 4.62657 5.33334 5.33366V26.667C5.33334 27.3741 5.61429 28.0523 6.11439 28.5524C6.61449 29.0525 7.29277 29.3337 8.00001 29.3337H24C24.7072 29.3337 25.3855 29.0525 25.8856 28.5524C26.3857 28.0523 26.6667 27.3741 26.6667 26.667V10.667L18.667 2.66699Z" 
                :stroke="isMine ? 'white' : '#5B8469'" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
              <path d="M18.667 2.66699V10.667H26.6667" 
                :stroke="isMine ? 'white' : '#5B8469'" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p :class="['text-sm font-medium truncate', isMine ? 'text-white' : 'text-gray-900']">
              {{ fileData.file.original_filename || 'File' }}
            </p>
            <p :class="['text-xs', isMine ? 'text-white/70' : 'text-gray-500']">
              {{ formatFileSize(fileData.file.bytes) }} • {{ getFileExtension(fileData.file.format || fileData.file.original_filename) }}
            </p>
          </div>
          <button 
            @click="openFile(fileData.file.secure_url)"
            :class="['flex-shrink-0 p-2 rounded-full transition-colors', isMine ? 'text-white hover:bg-white/20' : 'text-gray-600 hover:bg-gray-200']"
            title="Download file"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 13.3333V6.66667M10 13.3333L13.3333 10M10 13.3333L6.66667 10" 
                stroke="currentColor" 
                stroke-width="1.5" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
              <path d="M3.33334 13.3333V15C3.33334 15.442 3.50894 15.866 3.8215 16.1785C4.13406 16.4911 4.55798 16.6667 5.00001 16.6667H15C15.442 16.6667 15.866 16.4911 16.1785 16.1785C16.4911 15.866 16.6667 15.442 16.6667 15V13.3333" 
                stroke="currentColor" 
                stroke-width="1.5" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
            </svg>
          </button>
        </div>


        <p v-if="fileData.message" :class="['text-sm break-words', isMine ? 'text-white' : 'text-gray-800']">
          {{ fileData.message }}
        </p>
      </div>


      <p v-else :class="['text-sm break-words whitespace-pre-wrap', isMine ? 'text-white' : 'text-gray-800']">
        {{ message.content }}
      </p>


      <div :class="['flex items-center justify-end gap-1 mt-1', isMine ? 'text-white/70' : 'text-gray-500']">
        <span class="text-xs">
          {{ formatTime(message.createdAt) }}
        </span>
        <span v-if="isMine && status" class="flex items-center">

          <svg v-if="status === 'sending'" class="animate-spin h-3 w-3 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>

          <svg v-else-if="status === 'sent'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <svg v-else-if="status === 'delivered'" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 8L9.33333 11.3333L17.3333 3.33333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.66667 8L5 11.3333L6.33333 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <svg v-else-if="status === 'read'" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 8L9.33333 11.3333L17.3333 3.33333" stroke="#4CAF50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.66667 8L5 11.3333L6.33333 10" stroke="#4CAF50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <svg v-else-if="status === 'error'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7" stroke="#EF4444" stroke-width="1.5"/>
            <path d="M8 4V8M8 11H8.01" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import moment from 'moment';

const props = defineProps({
  message: {
    type: Object,
    required: true
  },
  isMine: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'sent'
  },
  messages: {
    type: Array,
    default: () => []
  }
});

// Check if the message is a file message
const isFileMessage = computed(() => {
  try {
    const parsed = JSON.parse(props.message.content);
    return parsed.type === 'file' && parsed.file && parsed.file.secure_url;
  } catch {
    return false;
  }
});

// Parse file data
const fileData = computed(() => {
  if (isFileMessage.value) {
    try {
      return JSON.parse(props.message.content);
    } catch {
      return null;
    }
  }
  return null;
});

// Check if file is an image
const isImageFile = computed(() => {
  if (!fileData.value) return false;
  const resourceType = fileData.value.file.resource_type;
  const format = fileData.value.file.format?.toLowerCase();
  const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
  return resourceType === 'image' || (format && imageFormats.includes(format));
});

// Format time
const formatTime = (timestamp: string) => {
  if (!timestamp) return '';
  return moment(timestamp).format('HH:mm');
};

// Format file size
const formatFileSize = (bytes: number) => {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// Get file extension
const getFileExtension = (formatOrFilename: string) => {
  if (!formatOrFilename) return 'FILE';
  
  // If it looks like a filename with extension
  if (formatOrFilename.includes('.')) {
    const parts = formatOrFilename.split('.');
    return parts[parts.length - 1].toUpperCase();
  }
  
  // Otherwise treat it as a format
  return formatOrFilename.toUpperCase();
};

// Open file in new tab
const openFile = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
</script>

<style scoped>
.break-words {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.whitespace-pre-wrap {
  white-space: pre-wrap;
}

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
 -->


<!-- 
 <script setup lang="ts">
interface MessageFile {
  url: string;
}

interface MessageContent {
  type: 'file' | 'text';
  file?: MessageFile;
  message: string;
}

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  role: string;
  deletedAt: string | null;
  phoneNumber: string;
}

interface Room {
  id: string;
  name: string;
  ownerId: string;
  visibility: string;
  type: string;
  lastMessageAt: string;
  createdAt: string;
  deletedAt: string | null;
}

interface Message {
  id: string;
  senderId: string;
  senderType: string;
  recipientId: string;
  recipientType: string;
  content: string;
  receivedAt: string | null;
  readAt: string | null;
  roomId: string;
  createdAt: string;
  deletedAt: string | null;
  room: Room;
  participant: Participant;
}

interface Props {
  message: Message;
}

const props = defineProps<Props>();

// Parse message content
const parsedContent = computed<MessageContent>(() => {
  try {
    return JSON.parse(props.message.content);
  } catch (error) {
    // If parsing fails, treat as plain text message
    return {
      type: 'text',
      message: props.message.content
    };
  }
});

// Check if message is a file
const isFileMessage = computed(() => parsedContent.value.type === 'file');

// Get file extension
const getFileExtension = (url: string): string => {
  const parts = url.split('.');
  return parts[parts.length - 1].toLowerCase().split('?')[0];
};

// Check if file is an image
const isImage = computed(() => {
  if (!isFileMessage.value || !parsedContent.value.file?.url) return false;
  const ext = getFileExtension(parsedContent.value.file.url);
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(ext);
});

// Check if file is a PDF
const isPDF = computed(() => {
  if (!isFileMessage.value || !parsedContent.value.file?.url) return false;
  const ext = getFileExtension(parsedContent.value.file.url);
  return ext === 'pdf';
});

// Get file URL
const fileUrl = computed(() => parsedContent.value.file?.url || '');

// Format timestamp
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

// Determine if message is from current user (you can adjust this logic)
const isOwnMessage = computed(() => props.message.senderType === 'TENANT');
</script>

<template>
  <div 
    class="message-wrapper"
    :class="{ 'own-message': isOwnMessage, 'other-message': !isOwnMessage }"
  >

    <div v-if="!isOwnMessage" class="profile-picture">
      <img 
        :src="message.participant.profilePicture" 
        :alt="`${message.participant.firstName} ${message.participant.lastName}`"
      />
    </div>

    <div class="message-content">

      <div v-if="!isOwnMessage" class="sender-name">
        {{ message.participant.firstName }} {{ message.participant.lastName }}
      </div>


      <div v-if="isFileMessage && isImage" class="file-message image-message">
        <img 
          :src="fileUrl" 
          :alt="parsedContent.message || 'Image'" 
          class="message-image"
          loading="lazy"
          @error="handleImageError"
        />
        <p v-if="parsedContent.message" class="file-caption">
          {{ parsedContent.message }}
        </p>
      </div>


      <div v-else-if="isFileMessage && isPDF" class="file-message pdf-message">
        <div class="pdf-preview">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <text x="12" y="16" font-size="6" text-anchor="middle" fill="currentColor">PDF</text>
          </svg>
          <div class="pdf-info">
            <span class="pdf-label">PDF Document</span>
            <a 
              :href="fileUrl" 
              target="_blank" 
              rel="noopener noreferrer"
              class="pdf-link"
            >
              View PDF
            </a>
          </div>
        </div>
        <p v-if="parsedContent.message" class="file-caption">
          {{ parsedContent.message }}
        </p>
      </div>


      <div v-else-if="isFileMessage" class="file-message generic-file">
        <div class="file-preview">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
          </svg>
          <div class="file-info">
            <span class="file-label">File</span>
            <a 
              :href="fileUrl" 
              target="_blank" 
              rel="noopener noreferrer"
              class="file-link"
            >
              Download
            </a>
          </div>
        </div>
        <p v-if="parsedContent.message" class="file-caption">
          {{ parsedContent.message }}
        </p>
      </div>


      <div v-else class="text-message">
        {{ parsedContent.message }}
      </div>


      <div class="message-time">
        {{ formatTime(message.createdAt) }}
      </div>
    </div>

  
    <div v-if="isOwnMessage" class="profile-picture">
      <img 
        :src="message.participant.profilePicture" 
        :alt="`${message.participant.firstName} ${message.participant.lastName}`"
      />
    </div>
  </div>
</template>

<style scoped>
.message-wrapper {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  max-width: 80%;
}

.own-message {
  margin-left: auto;
  flex-direction: row-reverse;
}

.other-message {
  margin-right: auto;
}

.profile-picture {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.sender-name {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 4px;
}

.text-message {
  background-color: #f1f5f9;
  padding: 12px 16px;
  border-radius: 12px;
  word-wrap: break-word;
  color: #1e293b;
}

.own-message .text-message {
  background-color: #5B8469;
  color: white;
}

.file-message {
  background-color: #f8fafc;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.own-message .file-message {
  background-color: #dbeafe;
  border-color: #93c5fd;
}

.message-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  display: block;
  cursor: pointer;
  transition: transform 0.2s;
}

.message-image:hover {
  transform: scale(1.02);
}

.pdf-preview,
.file-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.pdf-preview svg,
.file-preview svg {
  color: #dc2626;
  flex-shrink: 0;
}

.file-preview svg {
  color: #64748b;
}

.pdf-info,
.file-info {
  flex: 1;
  min-width: 0;
}

.pdf-label,
.file-label {
  display: block;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.pdf-link,
.file-link {
  display: inline-block;
  color: #5B8469;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.pdf-link:hover,
.file-link:hover {
  color: #2563eb;
  text-decoration: underline;
}

.file-caption {
  margin-top: 8px;
  color: #475569;
  font-size: 14px;
}

.message-time {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 4px;
  text-align: right;
}

.own-message .message-time {
  text-align: left;
}

@media (max-width: 768px) {
  .message-wrapper {
    max-width: 90%;
  }

  .message-image {
    max-width: 100%;
  }
}
</style> -->

<script setup lang="ts">
interface MessageFile {
  url: string;
}

interface MessageContent {
  type: 'file' | 'text';
  file?: MessageFile;
  message: string;
}

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  role: string;
  deletedAt: string | null;
  phoneNumber: string;
}

interface Room {
  id: string;
  name: string;
  ownerId: string;
  visibility: string;
  type: string;
  lastMessageAt: string;
  createdAt: string;
  deletedAt: string | null;
}

interface Message {
  id: string;
  senderId: string;
  senderType: string;
  recipientId: string;
  recipientType: string;
  content: string;
  receivedAt: string | null;
  readAt: string | null;
  roomId: string;
  createdAt: string;
  deletedAt: string | null;
  room: Room;
  participant: Participant;
}

interface Props {
  message: Message;
  isMine?: boolean; // Prop from parent to determine if message is from current user
  currentUserProfile?: {
    profilePicture: string;
    firstName: string;
    lastName: string;
  };
}

const props = defineProps<Props>();

// Parse message content
const parsedContent = computed<MessageContent>(() => {
  try {
    return JSON.parse(props.message.content);
  } catch (error) {
    // If parsing fails, treat as plain text message
    return {
      type: 'text',
      message: props.message.content
    };
  }
});

// Check if message is a file
const isFileMessage = computed(() => parsedContent.value.type === 'file');

// Get file extension
const getFileExtension = (url: string): string => {
  const parts = url.split('.');
  return parts[parts.length - 1].toLowerCase().split('?')[0];
};

// Check if file is an image
const isImage = computed(() => {
  if (!isFileMessage.value || !parsedContent.value.file?.url) return false;
  const ext = getFileExtension(parsedContent.value.file.url);
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(ext);
});

// Check if file is a PDF
const isPDF = computed(() => {
  if (!isFileMessage.value || !parsedContent.value.file?.url) return false;
  const ext = getFileExtension(parsedContent.value.file.url);
  return ext === 'pdf';
});

// Get file URL
const fileUrl = computed(() => parsedContent.value.file?.url || '');

// Format timestamp
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

// Determine if message is from current user
const isOwnMessage = computed(() => {
  // Use isMine prop if provided (from parent component)
  if (props.isMine !== undefined) {
    return props.isMine;
  }
  // Default fallback
  return props.message.senderType === 'TENANT';
});

// Get the display profile for the message sender
const displayProfile = computed(() => {
  if (isOwnMessage.value) {
    // For own messages, use currentUserProfile if provided
    if (props.currentUserProfile) {
      return props.currentUserProfile;
    }
    // Fallback to participant if currentUserProfile not provided
    return {
      profilePicture: props.message.participant.profilePicture,
      firstName: props.message.participant.firstName,
      lastName: props.message.participant.lastName
    };
  }
  
  // For messages from others, use participant profile
  return {
    profilePicture: props.message.participant.profilePicture,
    firstName: props.message.participant.firstName,
    lastName: props.message.participant.lastName
  };
});

// State for image loading
const imageLoadError = ref(false);

// Handle image loading errors - show as downloadable file instead
const handleImageError = () => {
  imageLoadError.value = true;
};

// Check if we should show image as downloadable file
const showImageAsFile = computed(() => isImage.value && imageLoadError.value);
</script>

<template>
  <div 
    class="message-wrapper"
    :class="{ 'own-message': isOwnMessage, 'other-message': !isOwnMessage }"
  >
    <!-- Profile Picture for other users -->
    <div v-if="!isOwnMessage" class="profile-picture">
      <img 
        :src="displayProfile.profilePicture" 
        :alt="`${displayProfile.firstName} ${displayProfile.lastName}`"
      />
    </div>

    <div class="message-content">
      <!-- Sender Name for other users -->
      <div v-if="!isOwnMessage" class="sender-name">
        {{ displayProfile.firstName }} {{ displayProfile.lastName }}
      </div>

      <!-- File Message: Image -->
      <div v-if="isFileMessage && isImage && !showImageAsFile" class="file-message image-message">
        <img 
          :src="fileUrl" 
          :alt="parsedContent.message || 'Image'" 
          class="message-image"
          loading="lazy"
          @error="handleImageError"
        />
        <p v-if="parsedContent.message" class="file-caption">
          {{ parsedContent.message }}
        </p>
      </div>

      <!-- File Message: Image that failed to load (show as downloadable) -->
      <div v-else-if="isFileMessage && showImageAsFile" class="file-message image-file-fallback">
        <div class="image-preview">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          <div class="image-info">
            <span class="image-label">Image File ({{ getFileExtension(fileUrl).toUpperCase() }})</span>
            <a 
              :href="fileUrl" 
              download
              class="image-link"
            >
              Download Image
            </a>
          </div>
        </div>
        <p v-if="parsedContent.message" class="file-caption">
          {{ parsedContent.message }}
        </p>
      </div>

      <!-- File Message: PDF -->
      <div v-else-if="isFileMessage && isPDF" class="file-message pdf-message">
        <div class="pdf-preview">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <text x="12" y="16" font-size="6" text-anchor="middle" fill="currentColor">PDF</text>
          </svg>
          <div class="pdf-info">
            <span class="pdf-label">PDF Document</span>
            <a 
              :href="fileUrl" 
              target="_blank" 
              rel="noopener noreferrer"
              class="pdf-link"
            >
              View PDF
            </a>
          </div>
        </div>
        <p v-if="parsedContent.message" class="file-caption">
          {{ parsedContent.message }}
        </p>
      </div>

      <!-- File Message: Other types -->
      <div v-else-if="isFileMessage" class="file-message generic-file">
        <div class="file-preview">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
          </svg>
          <div class="file-info">
            <span class="file-label">File</span>
            <a 
              :href="fileUrl" 
              target="_blank" 
              rel="noopener noreferrer"
              class="file-link"
            >
              Download
            </a>
          </div>
        </div>
        <p v-if="parsedContent.message" class="file-caption">
          {{ parsedContent.message }}
        </p>
      </div>

      <!-- Text Message -->
      <div v-else class="text-message">
        {{ parsedContent.message }}
      </div>

      <!-- Timestamp -->
      <div class="message-time">
        {{ formatTime(message.createdAt) }}
      </div>
    </div>

    <!-- Profile Picture for own messages -->
    <div v-if="isOwnMessage" class="profile-picture">
      <img 
        :src="displayProfile.profilePicture" 
        :alt="`${displayProfile.firstName} ${displayProfile.lastName}`"
      />
    </div>
  </div>
</template>

<style scoped>
.message-wrapper {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  max-width: 80%;
}

.own-message {
  margin-left: auto;
  flex-direction: row-reverse;
}

.other-message {
  margin-right: auto;
}

.profile-picture {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.sender-name {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 4px;
}

.text-message {
  background-color: #f1f5f9;
  padding: 12px 16px;
  border-radius: 12px;
  word-wrap: break-word;
  color: #1e293b;
}

.own-message .text-message {
  background-color: #5B8469;
  color: white;
}

.file-message {
  background-color: #f8fafc;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.own-message .file-message {
  background-color: #dbeafe;
  border-color: #93c5fd;
}

.message-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  display: block;
  cursor: pointer;
  transition: transform 0.2s;
}

.message-image:hover {
  transform: scale(1.02);
}

.pdf-preview,
.file-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.pdf-preview svg,
.file-preview svg {
  color: #dc2626;
  flex-shrink: 0;
}

.file-preview svg {
  color: #64748b;
}

.image-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.image-preview svg {
  color: #10b981;
  flex-shrink: 0;
}

.image-info {
  flex: 1;
  min-width: 0;
}

.image-label {
  display: block;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.image-link {
  display: inline-block;
  color: #5B8469;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.image-link:hover {
  color: #2563eb;
  text-decoration: underline;
}

.pdf-info,
.file-info {
  flex: 1;
  min-width: 0;
}

.pdf-label,
.file-label {
  display: block;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.pdf-link,
.file-link {
  display: inline-block;
  color: #5B8469;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.pdf-link:hover,
.file-link:hover {
  color: #2563eb;
  text-decoration: underline;
}

.file-caption {
  margin-top: 8px;
  color: #475569;
  font-size: 14px;
}

.message-time {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 4px;
  text-align: right;
}

.own-message .message-time {
  text-align: left;
}

@media (max-width: 768px) {
  .message-wrapper {
    max-width: 90%;
  }

  .message-image {
    max-width: 100%;
  }
}
</style>