
<template>
  <!-- component -->
  <MessagingView>
    <div>
      <div class="w-full h-32" style="background-color: white"></div>
      <div class="mt-[-128px]">
        <div class="h-screen">
          <!-- Mobile View (Fixed) -->
          <div class="lg:hidden h-full w-full">
            <transition name="flip" mode="out-in">
              <!-- Chat List View -->
              <div v-if="!showChatDetail" class="h-full flex flex-col w-full overflow-hidden">
                <!-- Fixed Header -->
                <div class="flex items-center justify-between px-4 border-b bg-white w-full">
                  <h1 class="text-lg font-semibold">Messages</h1>
                  <div class="relative">
                    <button @click="toggleFilterModal" class="p-2">
                      <svg class="cursor-pointer" width="44" height="44" viewBox="0 0 44 44" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect width="44" height="44" rx="8" fill="#EAEAEA" />
                        <path d="M21.9941 22H22.0016" stroke="#1D2739" stroke-width="2.5" stroke-linecap="round"
                          stroke-linejoin="round" />
                        <path d="M21.9863 27H21.9938" stroke="#1D2739" stroke-width="2.5" stroke-linecap="round"
                          stroke-linejoin="round" />
                        <path d="M22 17H22.0075" stroke="#1D2739" stroke-width="2.5" stroke-linecap="round"
                          stroke-linejoin="round" />
                      </svg>
                    </button>

                    <div v-if="showFilterModal"
                      class="absolute right-0 mt-2 w-44 bg-white rounded-lg border-[0.5px] border-gray-25 z-20 shadow">
                      <ul>
                        <li @click="filterChats('all')"
                          class="flex items-center justify-between text-sm px-4 py-2 mb-2 border-b text-[#1D2739] last:border-b-0 border-gray-100 cursor-pointer hover:bg-gray-100">
                          All
                        </li>
                        <li @click="filterChats('read')"
                          class="flex items-center justify-between text-sm px-4 py-2 mb-2 border-b text-[#1D2739] last:border-b-0 border-gray-100 cursor-pointer hover:bg-gray-100">
                          Read
                        </li>
                        <li @click="filterChats('unread')"
                          class="flex items-center justify-between text-sm px-4 py-2 mb-2 border-b text-[#1D2739] last:border-b-0 border-gray-100 cursor-pointer hover:bg-gray-100">
                          Unread
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <!-- Search Bar - Fixed -->
                <div class="p-4 bg-white flex items-center gap-x-3 w-full">
                  <div class="relative w-full">
                    <input type="text" v-model="searchTerm" placeholder="Search"
                      class="w-full p-3 pl-12 bg-[#EAEAEA] text-sm rounded-lg text-gray-700 outline-none" />
                    <svg class="absolute top-3 left-5" width="16" height="17" viewBox="0 0 16 17" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.668 12.166L14.668 15.166" stroke="#667185" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path
                        d="M13.332 7.83398C13.332 4.52028 10.6458 1.83398 7.33203 1.83398C4.01832 1.83398 1.33203 4.52028 1.33203 7.83398C1.33203 11.1477 4.01832 13.834 7.33203 13.834C10.6458 13.834 13.332 11.1477 13.332 7.83398Z"
                        stroke="#667185" stroke-width="1.5" stroke-linejoin="round" />
                    </svg>
                  </div>
                </div>

                <!-- Scrollable Chat List -->
                <div class="flex-1 overflow-y-auto overflow-x-hidden bg-white w-full">
                  <div v-if="!loadingActiveChats && filteredChats.length" class="divide-y divide-gray-100">
                    <div v-for="chat in filteredChats" :key="chat.id" @click="openChatDetail(chat)"
                      class="flex items-center p-4 cursor-pointer hover:bg-gray-50 w-full">
                      <div class="relative shrink-0">
                        <img v-if="chat.participant?.profilePicture" :src="chat.participant?.profilePicture"
                          class="w-12 h-12 rounded-full object-cover" :alt="chat.participant?.firstName" />
                        <svg v-else class="h-16 w-16" viewBox="0 0 111 106" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M86.162 83.0406C90.5989 78.8716 94.1335 73.8369 96.5473 68.2476C98.9612 62.6584 100.203 56.6334 100.196 50.5452C100.196 25.8886 80.2096 5.90234 55.553 5.90234C30.8964 5.90234 10.9102 25.8886 10.9102 50.5452C10.9031 56.6334 12.1449 62.6584 14.5588 68.2476C16.9726 73.8369 20.5072 78.8716 24.9441 83.0406C33.2176 90.8561 44.1718 95.2034 55.553 95.1881C66.9343 95.2034 77.8885 90.8561 86.162 83.0406ZM28.7444 77.1569C31.9591 73.1351 36.0384 69.8892 40.6796 67.6602C45.3207 65.4312 50.4044 64.2763 55.553 64.2815C60.7017 64.2763 65.7854 65.4312 70.4265 67.6602C75.0676 69.8892 79.147 73.1351 82.3616 77.1569C78.8544 80.6995 74.6787 83.5104 70.0767 85.4267C65.4747 87.343 60.5381 88.3264 55.553 88.3199C50.568 88.3264 45.6313 87.343 41.0294 85.4267C36.4274 83.5104 32.2516 80.6995 28.7444 77.1569ZM72.7234 36.8089C72.7234 41.3628 70.9144 45.7301 67.6943 48.9502C64.4742 52.1703 60.1069 53.9793 55.553 53.9793C50.9992 53.9793 46.6318 52.1703 43.4118 48.9502C40.1917 45.7301 38.3827 41.3628 38.3827 36.8089C38.3827 32.2551 40.1917 27.8877 43.4118 24.6677C46.6318 21.4476 50.9992 19.6386 55.553 19.6386C60.1069 19.6386 64.4742 21.4476 67.6943 24.6677C70.9144 27.8877 72.7234 32.2551 72.7234 36.8089Z"
                            fill="#D6D0CC" />
                          <path
                            d="M105.5 50C105.5 77.6142 83.1142 100 55.5 100C27.8858 100 5.5 77.6142 5.5 50C5.5 22.3858 27.8858 0 55.5 0C83.1142 0 105.5 22.3858 105.5 50ZM11.3186 50C11.3186 74.4007 31.0993 94.1814 55.5 94.1814C79.9007 94.1814 99.6814 74.4007 99.6814 50C99.6814 25.5993 79.9007 5.81863 55.5 5.81863C31.0993 5.81863 11.3186 25.5993 11.3186 50Z"
                            fill="#F0F2F5" />
                        </svg>
                        <div v-if="chat.unread" class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full">
                        </div>
                      </div>
                      <div class="flex-1 min-w-0 ml-3">
                        <div class="flex justify-between items-start w-full">
                          <h3 class="font-medium text-sm truncate max-w-[150px]">
                            {{ chat.participant?.firstName }} {{ chat.participant?.lastName }}
                          </h3>
                          <span class="text-xs text-gray-500 shrink-0 ml-2">
                            {{ formatDate(chat.lastMessage?.createdAt) }}
                          </span>
                        </div>
                        <p class="text-sm text-gray-500 truncate pr-4">
                          {{ getMessagePreview(chat.lastMessage?.content) }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div v-else-if="loadingActiveChats" class="p-4 space-y-4">
                    <div v-for="n in 3" :key="n" class="animate-pulse flex space-x-4">
                      <div class="rounded-full bg-slate-200 h-12 w-12 shrink-0"></div>
                      <div class="flex-1 space-y-2 py-1 min-w-0">
                        <div class="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div class="h-4 bg-slate-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Chat Detail View -->
              <div v-else class="h-full flex flex-col w-full overflow-hidden">
                <!-- Fixed Header -->
                <div class="flex items-center p-4 border-b bg-white w-full">
                  <button @click="showChatDetail = false" class="p-2 shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                    </svg>
                  </button>
                  <div class="flex items-center min-w-0 ml-2">
                    <img v-if="selectedUser?.participant?.profilePicture"
                      :src="selectedUser?.participant?.profilePicture"
                      class="w-10 h-10 rounded-full object-cover shrink-0"
                      :alt="selectedUser?.participant?.firstName" />
                    <svg v-else class="h-16 w-16" viewBox="0 0 111 106" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M86.162 83.0406C90.5989 78.8716 94.1335 73.8369 96.5473 68.2476C98.9612 62.6584 100.203 56.6334 100.196 50.5452C100.196 25.8886 80.2096 5.90234 55.553 5.90234C30.8964 5.90234 10.9102 25.8886 10.9102 50.5452C10.9031 56.6334 12.1449 62.6584 14.5588 68.2476C16.9726 73.8369 20.5072 78.8716 24.9441 83.0406C33.2176 90.8561 44.1718 95.2034 55.553 95.1881C66.9343 95.2034 77.8885 90.8561 86.162 83.0406ZM28.7444 77.1569C31.9591 73.1351 36.0384 69.8892 40.6796 67.6602C45.3207 65.4312 50.4044 64.2763 55.553 64.2815C60.7017 64.2763 65.7854 65.4312 70.4265 67.6602C75.0676 69.8892 79.147 73.1351 82.3616 77.1569C78.8544 80.6995 74.6787 83.5104 70.0767 85.4267C65.4747 87.343 60.5381 88.3264 55.553 88.3199C50.568 88.3264 45.6313 87.343 41.0294 85.4267C36.4274 83.5104 32.2516 80.6995 28.7444 77.1569ZM72.7234 36.8089C72.7234 41.3628 70.9144 45.7301 67.6943 48.9502C64.4742 52.1703 60.1069 53.9793 55.553 53.9793C50.9992 53.9793 46.6318 52.1703 43.4118 48.9502C40.1917 45.7301 38.3827 41.3628 38.3827 36.8089C38.3827 32.2551 40.1917 27.8877 43.4118 24.6677C46.6318 21.4476 50.9992 19.6386 55.553 19.6386C60.1069 19.6386 64.4742 21.4476 67.6943 24.6677C70.9144 27.8877 72.7234 32.2551 72.7234 36.8089Z"
                        fill="#D6D0CC" />
                      <path
                        d="M105.5 50C105.5 77.6142 83.1142 100 55.5 100C27.8858 100 5.5 77.6142 5.5 50C5.5 22.3858 27.8858 0 55.5 0C83.1142 0 105.5 22.3858 105.5 50ZM11.3186 50C11.3186 74.4007 31.0993 94.1814 55.5 94.1814C79.9007 94.1814 99.6814 74.4007 99.6814 50C99.6814 25.5993 79.9007 5.81863 55.5 5.81863C31.0993 5.81863 11.3186 25.5993 11.3186 50Z"
                        fill="#F0F2F5" />
                    </svg>
                    <div class="ml-3 min-w-0">
                      <h2 class="font-medium text-sm truncate">{{ selectedUser?.participant?.firstName }} {{
                        selectedUser?.participant?.lastName }}</h2>
                      <p class="text-xs text-gray-500 truncate">{{ selectedUser?.participant?.status || 'Online' }}</p>
                    </div>
                  </div>
                </div>

                <!-- Scrollable Messages Area -->
                <div class="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50">
                  <ChatWindow class="z-10" :roomChats="roomChatsList" :messages="currentRoomMessages"
                    :selectedUser="selectedUser" />
                </div>

                <!-- Fixed Message Input -->
                <div class="border-t bg-white w-full">
                  <ChatMessageInput v-model="newMessage" :isConnected="isConnected"
                    :isSending="messageStatus === 'sending'" @sendMessage="sendMessageToUser" />
                </div>
              </div>
            </transition>
          </div>

          <!-- Desktop View (Original Code) -->
          <section class="hidden lg:flex h-full rounded">
            <!-- Left sidebar -->
            <div class="w-[400px] flex flex-col border-r border-gray-25">
              <!-- Search and Filter Header -->
              <div class="p-4 border-b border-gray-100">
                <div class="flex items-center space-x-4">
                  <div class="relative flex-1">
                    <input type="text" placeholder="Search" v-model="searchTerm"
                      class="w-full p-3 pl-12 bg-[#EAEAEA] text-sm rounded-lg text-gray-700 outline-none" />
                    <svg class="absolute top-3 left-5" width="16" height="17" viewBox="0 0 16 17" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.668 12.166L14.668 15.166" stroke="#667185" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path
                        d="M13.332 7.83398C13.332 4.52028 10.6458 1.83398 7.33203 1.83398C4.01832 1.83398 1.33203 4.52028 1.33203 7.83398C1.33203 11.1477 4.01832 13.834 7.33203 13.834C10.6458 13.834 13.332 11.1477 13.332 7.83398Z"
                        stroke="#667185" stroke-width="1.5" stroke-linejoin="round" />
                    </svg>
                  </div>
                  <div class="relative">
                    <button @click="toggleFilterModal" class="p-2">
                      <svg class="cursor-pointer" width="44" height="44" viewBox="0 0 44 44" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect width="44" height="44" rx="8" fill="#EAEAEA" />
                        <path d="M21.9941 22H22.0016" stroke="#1D2739" stroke-width="2.5" stroke-linecap="round"
                          stroke-linejoin="round" />
                        <path d="M21.9863 27H21.9938" stroke="#1D2739" stroke-width="2.5" stroke-linecap="round"
                          stroke-linejoin="round" />
                        <path d="M22 17H22.0075" stroke="#1D2739" stroke-width="2.5" stroke-linecap="round"
                          stroke-linejoin="round" />
                      </svg>
                    </button>

                    <div v-if="showFilterModal"
                      class="absolute right-0 mt-2 w-44 bg-white rounded-lg border-[0.5px] border-gray-25 z-20 shadow">
                      <ul>
                        <li @click="filterChats('all')"
                          class="flex items-center justify-between text-sm px-4 py-2 mb-2 border-b text-[#1D2739] last:border-b-0 border-gray-100 cursor-pointer hover:bg-gray-100">
                          All
                        </li>
                        <li @click="filterChats('read')"
                          class="flex items-center justify-between text-sm px-4 py-2 mb-2 border-b text-[#1D2739] last:border-b-0 border-gray-100 cursor-pointer hover:bg-gray-100">
                          Read
                        </li>
                        <li @click="filterChats('unread')"
                          class="flex items-center justify-between text-sm px-4 py-2 mb-2 border-b text-[#1D2739] last:border-b-0 border-gray-100 cursor-pointer hover:bg-gray-100">
                          Unread
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Chat List -->
              <div class="flex-1 overflow-y-auto">
                <div v-if="!loadingActiveChats && filteredChats.length" class="divide-y divide-gray-100">
                  <ChatUserList class="px-3 flex items-center bg-grey-light cursor-pointer"
                    :loading="loadingActiveChats" :users="filteredChats" @selectUser="selectUser" />

                </div>
              </div>
            </div>

            <!-- Right Content -->
            <div class="flex-1 flex flex-col">
              <!-- Chat Header -->
              <ChatHeader :selectedUser="selectedUser || roomChatsList" :isConnected="isConnected" />

              <!-- Chat Messages -->
              <div class="flex-1 overflow-y-auto p-4">
                <ChatWindow class="z-10" :roomChats="roomChatsList" :messages="currentRoomMessages"
                  :selectedUser="selectedUser" />
              </div>

              <!-- Message Input -->
              <div class="bg-white">
                <ChatMessageInput v-model="newMessage" :isConnected="isConnected"
                  :isSending="messageStatus === 'sending'" @sendMessage="sendMessageToUser" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </MessagingView>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import MessagingView from "@/layouts/MessagingView.vue";
import { useGetActiveChats } from "@/composables/modules/messages/fetchActiveChats";
import { useGetRoomChats } from "@/composables/modules/messages/fetchRoomMessages";
import { useWebSocket } from "@/composables/modules/messages/sockets";

// Composables
const { loadingActiveChats, activeChatsList, getActiveChats } = useGetActiveChats();
const { getRoomChats, loadingRoomChats, roomChatsList } = useGetRoomChats();
const { messagesByRoom, currentRoomMessages, setActiveRoom, socket, newMessage, isConnected, sendMessage, markMessageAsRead } = useWebSocket();

definePageMeta({
  middleware: 'auth'
})

const router = useRouter();
const route = useRoute();
const selectedUser = ref(null);
const messageStatus = ref('idle');
const showFilterModal = ref(false)
const filterStatus = ref('all')
const searchTerm = ref('');
const showChatDetail = ref(false);
const showDropdown = ref(false);

// Helper function to parse and display message preview
const getMessagePreview = (content: string) => {
  if (!content) return '';
  
  try {
    const parsed = JSON.parse(content);
    
    // Check if it's a file message
    if (parsed.type === 'file' && parsed.file) {
      const fileName = parsed.file.fileName || 'File';
      const mimetype = parsed.file.mimetype || '';
      
      // Extract file extension or type
      let fileType = 'File';
      if (mimetype.startsWith('image/')) {
        fileType = '📷 Image';
      } else if (mimetype.startsWith('video/')) {
        fileType = '🎥 Video';
      } else if (mimetype.startsWith('audio/')) {
        fileType = '🎵 Audio';
      } else if (mimetype.includes('pdf')) {
        fileType = '📄 PDF';
      } else if (mimetype.includes('document') || mimetype.includes('word')) {
        fileType = '📝 Document';
      } else if (mimetype.includes('spreadsheet') || mimetype.includes('excel')) {
        fileType = '📊 Spreadsheet';
      } else if (mimetype.includes('zip') || mimetype.includes('rar') || mimetype.includes('compressed')) {
        fileType = '🗜️ Archive';
      } else if (mimetype.includes('text/')) {
        fileType = '📄 Text file';
      } else {
        fileType = '📎 File';
      }
      
      // If there's also a message with the file
      if (parsed.message && parsed.message.trim()) {
        return `${fileType}: ${parsed.message}`;
      }
      
      return fileType;
    }
    
    // If it's a regular text message or has a message field
    return parsed.message || content;
  } catch (e) {
    // If parsing fails, it's a regular text message
    return content;
  }
};

const toggleFilterModal = () => {
  showFilterModal.value = !showFilterModal.value
}

const filterChats = (status: 'all' | 'read' | 'unread') => {
  filterStatus.value = status
  showFilterModal.value = false
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

const openChatDetail = (user: any) => {
  selectedUser.value = user;
  showChatDetail.value = true;
};

function formatDate(dateString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

// Computed property to filter the chats
const filteredChats = computed(() => {
  let filtered = activeChatsList.value;

  // Filter chats by search term if provided
  if (searchTerm.value) {
    const lowerSearchTerm = searchTerm.value.toLowerCase();
    filtered = filtered.filter(chat => {
      return (
        chat.participant?.firstName.toLowerCase().includes(lowerSearchTerm) ||
        chat.participant?.lastName.toLowerCase().includes(lowerSearchTerm) ||
        chat.lastMessage?.content.toLowerCase().includes(lowerSearchTerm) ||
        chat.participant?.email.toLowerCase().includes(lowerSearchTerm)
      );
    });
  }

  if (filterStatus.value !== 'all') {
    filtered = filtered.filter(chat =>
    filterStatus.value === 'read' ? chat?.unreadMessagesCount <= 0 : chat?.unreadMessagesCount > 0
    );
  }

  return filtered;
});

// Watch for selected user changes
// watch(selectedUser, async (newVal: any) => {
//   if (newVal?.id) {
//     try {
//       await getRoomChats(newVal.id);
//     } catch (error) {
//       console.error('Failed to fetch room chats:', error);
//     }
//   }
// });

// Watch for new messages to scroll to bottom
watch(currentRoomMessages, (newMessages) => {
  if (newMessages.length > 0) {
    scrollToBottom();
  }
}, { deep: true });

// watch(messagesByRoom, (newVal) => {
//   const currentRoomId = selectedUser.value?.id;
//   if (currentRoomId && newVal[currentRoomId]) {
//     getRoomChats(currentRoomId);
//     getActiveChats()
//   }
// }, { deep: true });

// const sendMessageToUser = async (content: string) => {
//   if (!selectedUser.value?.participant?.id || !isConnected.value) {
//     console.error('Cannot send message: No recipient selected or not connected');
//     return;
//   }

//   // Check if content is empty (for text-only messages)
//   let parsedContent;
//   try {
//     parsedContent = JSON.parse(content);
//   } catch {
//     // It's a regular text message
//     if (!content.trim()) return;
//   }

//   messageStatus.value = 'sending';
//   const userId = selectedUser.value?.participant?.id || route?.query?.userId;

//   if (!userId) {
//     console.error("Cannot send message: Invalid recipient ID");
//     return;
//   }
  
//   setActiveRoom(userId);

//   try {
//     const socketPayload = {
//       content, // This now contains either text or stringified file object
//       recipientId: selectedUser.value.participant.id,
//       recipientType: selectedUser.value.participant.role,
//       messageType: 'private',
//       room: selectedUser.value.id
//     };

//     await sendMessage(socketPayload);
//     messageStatus.value = 'sent';
//     newMessage.value = '';
//   } catch (error) {
//     console.error('Failed to send message:', error);
//     messageStatus.value = 'error';
//   }
  
//   getActiveChats();
// };

// User selection
// const selectUser = async (user: any) => {
//   selectedUser.value = user;
//   await markMessageAsRead(user.lastMessage.roomId, user.lastMessage.recipientId);
//   await nextTick();
//   const userId = user?.participant?.id
//   if (userId) {
//     router.push({ query: { userId } });
//   }
// }

const selectUser = async (user: any) => {
  selectedUser.value = user;
  
  // Only mark as read if lastMessage exists
  if (user.lastMessage?.roomId && user.lastMessage?.recipientId) {
    await markMessageAsRead(user.lastMessage.roomId, user.lastMessage.recipientId);
  }
  
  await nextTick();
  const userId = user?.participant?.id;
  
  if (userId) {
    router.push({ query: { userId } });
  }
}


watch(activeChatsList, (newChats) => {
  if (selectedUser.value) {
    const selectedChat = newChats.find(chat => chat.id === selectedUser.value.id);
    if (selectedChat) {
      selectedChat.unreadMessagesCount = 0; 
    }
  }
});

// Scroll handling
const scrollToBottom = () => {
  const chatWindow = document.querySelector('.custom-scrollbar');
  if (chatWindow) {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
};



// Event handling
const { $emitter } = useNuxtApp();
// watch(
//   activeChatsList,
//   (newVal) => {
//     console.log(newVal, "active chats (watch)");
//     const userId = route.query.userId;
//     if (userId) {
//       const user = newVal.find((u) => u?.participant?.id === userId);
//       if (user) {
//         selectUser(user);
//       } else {
//         if (newVal.length === 1) {
//           selectUser(newVal[0]);
//         }
//       }
//     }

//     if (newVal.length) {
//       selectUser(newVal[0]);
//       console.log("only one item found");
//     }
//   },
//   { immediate: true }
// );




// Update the sendMessageToUser function to prevent UI flickering:
const sendMessageToUser = async (content: string) => {
  if (!selectedUser.value?.participant?.id || !isConnected.value) {
    console.error('Cannot send message: No recipient selected or not connected');
    return;
  }

  let parsedContent;
  try {
    parsedContent = JSON.parse(content);
  } catch {
    if (!content.trim()) return;
  }

  messageStatus.value = 'sending';
  const userId = selectedUser.value?.participant?.id || route?.query?.userId;

  if (!userId) {
    console.error("Cannot send message: Invalid recipient ID");
    return;
  }
  
  setActiveRoom(userId);

  try {
    const socketPayload = {
      content,
      recipientId: selectedUser.value.participant.id,
      recipientType: selectedUser.value.participant.role,
      messageType: 'private',
      room: selectedUser.value.id
    };

    await sendMessage(socketPayload);
    messageStatus.value = 'sent';
    newMessage.value = '';
    
    // Delay the refresh slightly to prevent flickering
    setTimeout(() => {
      getActiveChats();
    }, 300);
  } catch (error) {
    console.error('Failed to send message:', error);
    messageStatus.value = 'error';
  }
};

// Update the watch for selectedUser to prevent unnecessary refreshes:
watch(selectedUser, async (newVal: any, oldVal: any) => {
  if (newVal?.id && newVal?.id !== oldVal?.id) {
    try {
      await getRoomChats(newVal.id);
    } catch (error) {
      console.error('Failed to fetch room chats:', error);
    }
  }
});

// Replace the messagesByRoom watch with this to prevent double-fetching:
watch(messagesByRoom, (newVal) => {
  const currentRoomId = selectedUser.value?.id;
  if (currentRoomId && newVal[currentRoomId]) {
    // Only fetch if we have new messages
    const hasNewMessages = newVal[currentRoomId].some(
      msg => !roomChatsList.value.some(existing => existing.id === msg.id)
    );
    if (hasNewMessages) {
      getRoomChats(currentRoomId);
    }
  }
}, { deep: true });


// User selection - FIXED with null checks
// const selectUser = async (user: any) => {
//   selectedUser.value = user;
  
//   // Only mark as read if lastMessage exists
//   if (user.lastMessage?.roomId && user.lastMessage?.recipientId) {
//     await markMessageAsRead(user.lastMessage.roomId, user.lastMessage.recipientId);
//   }
  
//   await nextTick();
//   const userId = user?.participant?.id;
  
//   if (userId) {
//     router.push({ query: { userId } });
//   }
// }

// Update the watch for activeChatsList to handle empty messages
watch(
  activeChatsList,
  (newVal) => {
    console.log(newVal, "active chats (watch)");
    const userId = route.query.userId;
    
    // Don't auto-select if we already have a selected user
    if (selectedUser.value) return;
    
    if (userId) {
      const user = newVal.find((u) => u?.participant?.id === userId);
      if (user) {
        selectUser(user);
      }
    } else if (newVal.length > 0) {
      // Select first user with valid data
      const validUser = newVal.find(u => u?.participant?.id);
      if (validUser) {
        selectUser(validUser);
      }
    }
  },
  { immediate: true }
);

// Update onMounted to handle null cases
onMounted(() => {
  console.log(activeChatsList.value, "active chats (onMounted)");
  const userId = route.query.userId;

  if (userId && activeChatsList.value?.length > 0) {
    const user = activeChatsList.value.find((u) => u?.participant?.id === userId);
    if (user) {
      selectUser(user);
    }
  }

  $emitter.on("customEvent", async (payload: any) => {
    if (payload.data) {
      await getRoomChats(payload.data);
      scrollToBottom();
    }
  });
});

onUnmounted(() => {
  // Clean up event listeners
  $emitter.off('customEvent');
});
</script>

<style scoped>
.flip-enter-active,
.flip-leave-active {
  transition: transform 0.3s ease-out;
}

.flip-enter-from {
  transform: translateX(100%);
}

.flip-leave-to {
  transform: translateX(-100%);
}

.flip-enter-to,
.flip-leave-from {
  transform: translateX(0);
}

/* Add these styles for better scrolling */
.overflow-y-auto {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

/* Add these styles to prevent horizontal overflow */
.overflow-x-hidden {
  overflow-x: hidden;
}

/* Ensure text truncation works properly */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Add smooth scrolling */
.overflow-y-auto {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}
</style>