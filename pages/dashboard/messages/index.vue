<!-- 
<template>
  <MessagingView title="Messages">
    <div class="h-screen flex">
      <div class="w-full lg:w-1/4 h-full sticky top-0 border-r-[0.5px] border-gray-50 overflow-y-auto custom-scrollbar">
        <ChatUserList
          :loading="loadingActiveChats"
          :users="activeChatsList"
          @selectUser="selectUser"
        />
      </div>

      <div class="lg:flex-1 flex flex-col hidden lg:block sticky top-0">
        <div class="sticky top-0 bg-white">
          <ChatHeader :selectedUser="selectedUser || roomChatsList" />
        </div>

        <section
          v-if="!roomChatsList.length && !loadingActiveChats"
         class="flex flex-col justify-between mt-32 items-center space-y-2"
       >
         <svg
           width="152"
           height="124"
           viewBox="0 0 152 124"
           fill="none"
           xmlns="http://www.w3.org/2000/svg"
         >
           <circle cx="76" cy="58" r="52" fill="#EAEAEA" />
           <circle cx="21" cy="25" r="5" fill="#BDBDBD" />
           <circle cx="18" cy="109" r="7" fill="#BDBDBD" />
           <circle cx="145" cy="41" r="7" fill="#BDBDBD" />
           <circle cx="134" cy="14" r="4" fill="#BDBDBD" />
           <g filter="url(#filter0_b_6853_118795)">
             <rect
               x="52"
               y="34"
               width="48"
               height="48"
               rx="24"
               fill="#9D9D9D"
             />
             <path
               d="M85.9598 56.9707C86.0134 57.8009 86.0134 58.6607 85.9598 59.4909C85.6856 63.7332 82.3536 67.1125 78.1706 67.3905C76.7435 67.4854 75.2536 67.4852 73.8294 67.3905C73.339 67.3579 72.8044 67.2409 72.344 67.0513C71.8318 66.8403 71.5756 66.7348 71.4454 66.7508C71.3153 66.7668 71.1264 66.9061 70.7487 67.1846C70.0827 67.6757 69.2437 68.0285 67.9994 67.9982C67.3703 67.9829 67.0557 67.9752 66.9148 67.7351C66.774 67.495 66.9494 67.1626 67.3002 66.4978C67.7867 65.5758 68.095 64.5203 67.6279 63.6746C66.8234 62.4666 66.1401 61.036 66.0402 59.4909C65.9866 58.6607 65.9866 57.8009 66.0402 56.9707C66.3144 52.7284 69.6464 49.3491 73.8294 49.0711C75.0318 48.9911 75.2812 48.9786 76.5 49.0337"
               stroke="white"
               stroke-width="2"
               stroke-linecap="round"
               stroke-linejoin="round"
             />
             <path
               d="M72.5 61H79.5M72.5 56H76"
               stroke="white"
               stroke-width="1.5"
               stroke-linecap="round"
               stroke-linejoin="round"
             />
             <path
               d="M86 51.5C86 53.433 84.433 55 82.5 55C80.567 55 79 53.433 79 51.5C79 49.567 80.567 48 82.5 48C84.433 48 86 49.567 86 51.5Z"
               stroke="white"
               stroke-width="1.5"
             />
           </g>
           <defs>
             <filter
               id="filter0_b_6853_118795"
               x="44"
               y="26"
               width="64"
               height="64"
               filterUnits="userSpaceOnUse"
               color-interpolation-filters="sRGB"
             >
               <feFlood flood-opacity="0" result="BackgroundImageFix" />
               <feGaussianBlur in="BackgroundImageFix" stdDeviation="4" />
               <feComposite
                 in2="SourceAlpha"
                 operator="in"
                 result="effect1_backgroundBlur_6853_118795"
               />
               <feBlend
                 mode="normal"
                 in="SourceGraphic"
                 in2="effect1_backgroundBlur_6853_118795"
                 result="shape"
               />
             </filter>
           </defs>
         </svg>
         <h2 class="text-[#1D2739]">No conversations found</h2>
          </section>

        <div class="flex flex-col h-full">

          <div  class="flex-1 z-10 overflow-y-auto px-4 custom-scrollbar border-[0.5px] border-gray-25">
            <ChatWindow
              class="z-1-0"
              :roomChats="roomChatsList"
              :messages="messages"
            />
        
          </div>

          <div class="border-t-[0.5px] border-gray-50 sticky bottom-0 z-10">
            <ChatMessageInput
              v-model="newMessage"
              @sendMessage="sendMessageToUser"
            />
          </div>
        </div>
      </div>
    </div>
  </MessagingView>
</template>

<script setup lang="ts">
import MessagingView from "@/layouts/MessagingView.vue";
import { useGetActiveChats } from "@/composables/modules/messages/fetchActiveChats";
import { useGetRoomChats } from "@/composables/modules/messages/fetchRoomMessages";
import { useWebSocket } from "@/composables/modules/messages/sockets";

const { loadingActiveChats, activeChatsList } = useGetActiveChats();
const { getRoomChats, loadingRoomChats, roomChatsList } = useGetRoomChats();
const { messages, newMessage, connectWebSocket, sendMessage } = useWebSocket();

const router = useRouter()

// Connect to WebSocket when the component is mounted
connectWebSocket();
const route = useRoute();

const selectedUser = ref(null);

watch(selectedUser, (newVal: any) => {
  if (newVal) {
    getRoomChats(newVal.id);
  }
});

const { $emitter } = useNuxtApp();

// Listen for the 'customEvent' globally
$emitter.on('customEvent', (payload: any) => {
  console.log(payload.response)
  getRoomChats(payload.data);
  // console.log('Received event:', payload);
});

const selectUser = (user: any) => {
  selectedUser.value = user;
};



const sendMessageToUser = (message: string) => {
  const socketPayload = {
    content: message,
    recipientId: selectedUser?.value?.participant?.id,
    recipientType: selectedUser?.value?.participant?.role,
    messageType: 'private',
  };
  sendMessage(socketPayload);
};
</script>

<style scoped>
/* Custom Scrollbar for ChatWindow and ChatUserList */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px; /* Set width of the custom scrollbar */
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #6b7280; /* Set custom thumb color */
  border-radius: 10px; /* Round the scrollbar edges */
}

.custom-scrollbar::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* Set custom track color */
}

/* Hide the default scrollbar for Firefox */
.custom-scrollbar {
  scrollbar-width: thin; /* Thin scrollbar for Firefox */
  scrollbar-color: #6b7280 #f1f1f1; /* Set scrollbar colors for Firefox */
}

/* Optional: Hide the scrollbar in hover state and show custom scrollbar */
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #4b5563; /* Darker color on hover */
}

/* Sticky elements for header and footer */
.sticky {
  position: sticky;
}
</style> -->


<template>
  <MessagingView title="Messages">
    <!-- <h1>Hello {{ messages }}</h1> -->
    <div class="h-screen flex">
      <!-- Chat Users List Section -->
      <div class="w-full lg:w-1/4 h-full sticky top-0 border-r-[0.5px] border-gray-50 overflow-y-auto custom-scrollbar">
        <ChatUserList
          :loading="loadingActiveChats"
          :users="activeChatsList"
          @selectUser="selectUser"
        />
      </div>

      <!-- Main Chat Section -->
      <div class="lg:flex-1 flex flex-col hidden lg:block sticky top-0">
        <!-- Chat Header -->
        <div class="sticky top-0 bg-white z-20">
          <ChatHeader 
            :selectedUser="selectedUser || roomChatsList"
            :isConnected="isConnected" 
          />
        </div>

        <!-- Empty State -->
        <section
          v-if="!roomChatsList.length && !loadingActiveChats"
          class="flex flex-col justify-between mt-32 items-center space-y-2"
        >
          <!-- Your existing SVG and empty state content -->
          <svg><!-- Your existing SVG content --></svg>
          <h2 class="text-[#1D2739]">No conversations found</h2>
        </section>

        <!-- Chat Content -->
        <div class="flex flex-col h-full">
          <!-- Messages Window -->
          <div class="flex-1 z-10 overflow-y-auto px-4 custom-scrollbar border-[0.5px] border-gray-25">
            <ChatWindow
              class="z-10"
              :roomChats="roomChatsList"
              :messages="messages"
              :selectedUser="selectedUser"
            />
          </div>

          <!-- Message Input -->
          <div class="border-t-[0.5px] border-gray-50 sticky bottom-0 z-10 bg-white">
            <ChatMessageInput
              v-model="newMessage"
              :isConnected="isConnected"
              :isSending="messageStatus === 'sending'"
              @sendMessage="sendMessageToUser"
            />
          </div>
        </div>
      </div>
    </div>
  </MessagingView>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import MessagingView from "@/layouts/MessagingView.vue";
import { useGetActiveChats } from "@/composables/modules/messages/fetchActiveChats";
import { useGetRoomChats } from "@/composables/modules/messages/fetchRoomMessages";
import { useWebSocket } from "@/composables/modules/messages/sockets";

// Composables
const { loadingActiveChats, activeChatsList } = useGetActiveChats();
const { getRoomChats, loadingRoomChats, roomChatsList } = useGetRoomChats();
const { 
  messages, 
  newMessage, 
  isConnected, 
  sendMessage 
} = useWebSocket();

const router = useRouter();
const route = useRoute();
const selectedUser = ref(null);
const messageStatus = ref('idle');

// Watch for selected user changes
watch(selectedUser, async (newVal: any) => {
  if (newVal?.id) {
    try {
      await getRoomChats(newVal.id);
    } catch (error) {
      console.error('Failed to fetch room chats:', error);
    }
  }
});

// Watch for new messages to scroll to bottom
watch(messages, (newMessages) => {
  if (newMessages.length > 0) {
    scrollToBottom();
  }
}, { deep: true });

// Message handling
const sendMessageToUser = async (content: string) => {
  if (!selectedUser.value?.participant?.id || !isConnected.value) {
    console.error('Cannot send message: No recipient selected or not connected');
    return;
  }

  messageStatus.value = 'sending';

  try {
    const socketPayload = {
      content,
      recipientId: selectedUser.value.participant.id,
      recipientType: selectedUser.value.participant.role,
      messageType: 'private',
      room: selectedUser.value.id // Include room ID if needed
    };

    await sendMessage(socketPayload);
    messageStatus.value = 'sent';
    newMessage.value = ''; // Clear input after successful send
  } catch (error) {
    console.error('Failed to send message:', error);
    messageStatus.value = 'error';
    // Optionally show error notification to user
  }
};

// User selection
const selectUser = (user: any) => {
  selectedUser.value = user;
  // Optionally update URL
  router.push({ query: { userId: user.id }});
};

// Scroll handling
const scrollToBottom = () => {
  const chatWindow = document.querySelector('.custom-scrollbar');
  if (chatWindow) {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
};

// Event handling
const { $emitter } = useNuxtApp();

onMounted(() => {
  // Handle URL parameters
  const userId = route.query.userId;
  if (userId && activeChatsList.value) {
    const user = activeChatsList.value.find(u => u.id === userId);
    if (user) {
      selectUser(user);
    }
  }

  // Set up event listeners
  $emitter.on('customEvent', async (payload: any) => {
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
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #6b7280;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #6b7280 #f1f1f1;
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #4b5563;
}

.sticky {
  position: sticky;
}
</style>