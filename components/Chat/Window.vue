<template>
    <div class="flex-1 z-10 overflow-y-auto p-4 space-y-3 bg-white" ref="chatContainer">
      <!-- Empty state when no messages -->
      <div v-if="!sortedMessagesWithHeaders.length" class="flex flex-col items-center justify-center h-full text-center py-20">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="40" fill="#F0F2F5"/>
          <path d="M60 45V60L67.5 67.5" stroke="#9CA3AF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h3 class="text-lg font-semibold text-gray-700 mt-4">No messages yet</h3>
        <p class="text-sm text-gray-500 mt-2">Start a conversation by sending a message</p>
      </div>
      
      <!-- Messages list -->
      <div v-else v-for="(msg, index) in sortedMessagesWithHeaders" :key="msg.id || msg.dateHeader">
        <!-- Display date headers -->
        <div v-if="msg.isHeader" class="text-center my-6">
          <span class="bg-[#F0F2F5] rounded-full font-semibold px-3 py-2 text-xs text-[#1D2739]">
            {{ msg.dateHeader }}
          </span>
        </div>
        
        <!-- Display chat messages -->
        <ChatMessageBubble
          v-else
          :message="msg"
          :isMine="msg.senderId === user.id"
          :status="msg.status"
          :current-user-profile="{
            profilePicture: user.profilePicture,
            firstName: user.firstName,
            lastName: user.lastName
          }"
        />
      </div>
      <div ref="scrollAnchor"></div>
    </div>
</template>
  
<script setup lang="ts">
import moment from 'moment';
import { computed, ref, watch, onMounted, nextTick } from 'vue';
import { useUser } from "@/composables/auth/user";
  
const { user } = useUser();
const props = defineProps({
  messages: {
    type: Array,
    default: () => []
  },
  roomChats: {
    type: Array,
    default: () => []
  }
});

const chatContainer = ref(null);
const scrollAnchor = ref(null);
const isInitialRender = ref(true);
  
// Merge messages and roomChats, then sort and add date headers
const sortedMessagesWithHeaders = computed(() => {
  const allMessages = [...(props.messages || []), ...(props.roomChats || [])];
  
  // Filter out any invalid messages
  const validMessages = allMessages.filter(msg => msg && msg.createdAt);
  
  if (validMessages.length === 0) return [];
  
  const sorted = validMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  
  const messagesWithHeaders = [];
  let lastDateHeader = '';
  
  sorted.forEach((msg) => {
    const messageDate = formatMessageDate(msg.createdAt);
  
    // Add a date header if it differs from the last one
    if (messageDate !== lastDateHeader) {
      messagesWithHeaders.push({ isHeader: true, dateHeader: messageDate });
      lastDateHeader = messageDate;
    }
    messagesWithHeaders.push(msg);
  });
  
  return messagesWithHeaders;
});
  
// Helper to format dates into "Today", "Yesterday", or a full date
const formatMessageDate = (date: string): string => {
  const today = moment().startOf('day');
  const messageDate = moment(date);
  
  if (messageDate.isSame(today, 'day')) {
    return 'Today';
  } else if (messageDate.isSame(today.clone().subtract(1, 'days'), 'day')) {
    return 'Yesterday';
  } else {
    return messageDate.format('MMMM D, YYYY');
  }
};

const scrollToBottom = async () => {
  await nextTick();
  if (scrollAnchor.value) {
    scrollAnchor.value.scrollIntoView({ behavior: 'auto' });
  }
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    requestAnimationFrame(() => {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    });
  }
};

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  await scrollToBottom();
  setTimeout(async () => {
    await scrollToBottom();
    isInitialRender.value = false;
  }, 500);
});
  
watch(() => [...(props.messages || []), ...(props.roomChats || [])], async () => {
  if (isInitialRender.value) return;
  await scrollToBottom();
}, { deep: true });
  
watch(() => sortedMessagesWithHeaders.value.length, async () => {
  if (isInitialRender.value) return;
  await scrollToBottom();
});
</script>