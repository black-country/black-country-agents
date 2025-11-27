<!-- <template>
    <div class="flex-1 z-10 overflow-y-auto p-4 space-y-3 bg-white" ref="chatContainer">
      <div v-if="!sortedMessagesWithHeaders.length" class="flex flex-col items-center justify-center h-full text-center py-20">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="40" fill="#F0F2F5"/>
          <path d="M60 45V60L67.5 67.5" stroke="#9CA3AF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h3 class="text-lg font-semibold text-gray-700 mt-4">No messages yet</h3>
        <p class="text-sm text-gray-500 mt-2">Start a conversation by sending a message</p>
      </div>
      
      <div v-else v-for="(msg, index) in sortedMessagesWithHeaders" :key="msg.id || msg.dateHeader">
        <div v-if="msg.isHeader" class="text-center my-6">
          <span class="bg-[#F0F2F5] rounded-full font-semibold px-3 py-2 text-xs text-[#1D2739]">
            {{ msg.dateHeader }}
          </span>
        </div>
        
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
</script> -->

<template>
  <div ref="chatContainer" class="flex-1 overflow-y-auto overflow-x-hidden p-4 bg-white">
    <!-- Loading state -->
    <div v-if="loading && !sortedMessages.length" class="flex justify-center items-center h-full">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>

    <!-- Empty state -->
    <div v-else-if="!sortedMessages.length" class="flex flex-col items-center justify-center h-full text-center">
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" class="mb-4">
        <circle cx="50" cy="50" r="40" fill="#F0F2F5"/>
        <path d="M50 35v20M50 65h.01" stroke="#9CA3AF" stroke-width="3" stroke-linecap="round"/>
      </svg>
      <h3 class="text-lg font-semibold text-gray-700">No messages yet</h3>
      <p class="text-sm text-gray-500 mt-2">Start the conversation by sending a message</p>
    </div>

    <!-- Messages - ALWAYS RENDERED -->
    <div v-else class="space-y-2 pb-4">
      <TransitionGroup name="message">
        <!-- {{ user }} -->
        <div v-for="(item, index) in sortedMessages" :key="item.id || `header-${index}`">
          <!-- {{ item }} -->
          <div v-if="item.isHeader" class="flex justify-center my-6">
            <span class="bg-gray-100 rounded-full px-4 py-1.5 text-xs font-medium text-gray-600">
              {{ item.date }}
            </span>
          </div>

          <!-- :is-mine="item.isMine === user.id" -->
          <ChatMessageBubble
            v-else
            :message="item"
            :is-mine="item.senderId === user.id"
            :status="item.status"
          />
          <!-- {{ item?.isMine }} -->
        </div>
      </TransitionGroup>
      
      <!-- Scroll anchor -->
      <div ref="scrollAnchor" class="h-px"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useUser } from '@/composables/auth/user';
import moment from 'moment';

const props = defineProps({
  messages: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const { user } = useUser();
const chatContainer = ref<HTMLElement | null>(null);
const scrollAnchor = ref<HTMLElement | null>(null);
const userScrolledUp = ref(false);
const lastMessageCount = ref(0);
const isFirstLoad = ref(true);
const route = useRoute()
const agentId = ref(route.query.agentId)

const sortedMessages = computed(() => {
  const messages = props.messages || [];
  if (!messages.length) return [];

  // Sort messages by creation time
  const sorted = [...messages].sort((a, b) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // Add date headers
  const withHeaders: any[] = [];
  let lastDate = '';

  sorted.forEach(msg => {
    const msgDate = formatDateHeader(msg.createdAt);
    
    if (msgDate !== lastDate) {
      withHeaders.push({
        isHeader: true,
        date: msgDate,
        id: `header-${msg.createdAt}`
      });
      lastDate = msgDate;
    }
    
    withHeaders.push(msg);
  });

  return withHeaders;
});

const formatDateHeader = (dateString: string): string => {
  const date = moment(dateString);
  const today = moment().startOf('day');
  const yesterday = moment().subtract(1, 'day').startOf('day');

  if (date.isSame(today, 'day')) return 'Today';
  if (date.isSame(yesterday, 'day')) return 'Yesterday';
  return date.format('MMMM D, YYYY');
};

const scrollToBottom = (behavior: ScrollBehavior = 'auto') => {
  if (!chatContainer.value) return;
  
  requestAnimationFrame(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTo({
        top: chatContainer.value.scrollHeight,
        behavior
      });
    }
  });
};

const isNearBottom = (): boolean => {
  if (!chatContainer.value) return true;
  
  const { scrollTop, scrollHeight, clientHeight } = chatContainer.value;
  const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
  
  return distanceFromBottom < 150;
};

const handleScroll = () => {
  userScrolledUp.value = !isNearBottom();
};

onMounted(() => {
  if (chatContainer.value) {
    chatContainer.value.addEventListener('scroll', handleScroll, { passive: true });
  }
  
  // Initial scroll
  nextTick(() => {
    scrollToBottom('auto');
    setTimeout(() => {
      isFirstLoad.value = false;
    }, 500);
  });
});

// Watch for new messages
watch(() => props.messages.length, (newCount, oldCount) => {
  if (isFirstLoad.value) {
    lastMessageCount.value = newCount;
    return;
  }
  
  if (newCount === oldCount || newCount === 0) return;
  
  const isNewMessage = newCount > oldCount;
  const wasAtBottom = !userScrolledUp.value;
  
  // Check if last message is mine
  const lastMessage = props.messages[props.messages.length - 1];
  const isMyMessage = lastMessage?.senderId === user.value?.id;
  
  nextTick(() => {
    if (isMyMessage || wasAtBottom) {
      scrollToBottom(isMyMessage ? 'auto' : 'smooth');
    }
  });
  
  lastMessageCount.value = newCount;
}, { flush: 'post' });

// Watch for message updates (status changes)
watch(() => props.messages.map(m => m.status).join(','), () => {
  if (isFirstLoad.value) return;
  
  if (!userScrolledUp.value && isNearBottom()) {
    nextTick(() => scrollToBottom('auto'));
  }
});
</script>

<style scoped>
.message-enter-active {
  transition: all 0.2s ease-out;
}

.message-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.message-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>